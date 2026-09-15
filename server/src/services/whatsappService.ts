import { SiteSettings } from '../models/SiteSettings';

type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  budget?: string;
  businessName?: string;
  message?: string;
  source?: string;
};

const getWhatsAppSettings = async () => {
  const settings = await SiteSettings.findOne().lean();

  return {
    enabled: settings?.whatsappEnabled ?? false,
    alertNumber: settings?.whatsappAlertNumber || process.env.WHATSAPP_ALERT_NUMBER || '',
    customerTemplate: settings?.whatsappCustomerTemplate || process.env.WHATSAPP_CUSTOMER_TEMPLATE || '',
    webhookVerifyToken: settings?.whatsappWebhookVerifyToken || process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || 'webnest-whatsapp-webhook',
  };
};

const normalizeWhatsAppNumber = (value?: string) => {
  if (!value) return '';
  const digitsOnly = value.replace(/\D/g, '');
  if (!digitsOnly) return '';
  return digitsOnly.startsWith('00') ? `+${digitsOnly.slice(2)}` : `+${digitsOnly}`;
};

const sendWhatsAppRequest = async (payload: Record<string, unknown>) => {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    return {
      ok: false,
      skipped: true,
      reason: 'WhatsApp Cloud API is not configured. Set WHATSAPP_TOKEN and WHATSAPP_PHONE_NUMBER_ID.',
    };
  }

  const response = await fetch(`https://graph.facebook.com/v19.0/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    return { ok: false, skipped: false, reason: data?.error?.message || 'Unknown WhatsApp error.' };
  }

  return { ok: true, skipped: false, data };
};

export const sendInternalLeadAlert = async (lead: LeadPayload) => {
  const settings = await getWhatsAppSettings();
  if (!settings.enabled) {
    return { ok: false, skipped: true, reason: 'WhatsApp notifications are disabled in settings.' };
  }

  const alertNumber = settings.alertNumber;
  if (!alertNumber) {
    return { ok: false, skipped: true, reason: 'WHATSAPP_ALERT_NUMBER is not configured.' };
  }

  const message = [
    'New project enquiry received!',
    `Name: ${lead.name || 'Not provided'}`,
    `Email: ${lead.email || 'Not provided'}`,
    `Phone: ${lead.phone || 'Not provided'}`,
    `Service: ${lead.service || 'General Enquiry'}`,
    `Budget: ${lead.budget || 'Not provided'}`,
    `Business: ${lead.businessName || 'Not provided'}`,
    `Source: ${lead.source || 'Website Form'}`,
  ].join('\n');

  return sendWhatsAppRequest({
    messaging_product: 'whatsapp',
    to: normalizeWhatsAppNumber(alertNumber),
    type: 'text',
    text: { body: message },
  });
};

export const sendCustomerLeadConfirmation = async (lead: LeadPayload) => {
  const settings = await getWhatsAppSettings();
  if (!settings.enabled) {
    return { ok: false, skipped: true, reason: 'WhatsApp notifications are disabled in settings.' };
  }

  const customerPhone = normalizeWhatsAppNumber(lead.phone);
  const templateName = settings.customerTemplate;

  if (!customerPhone) {
    return { ok: false, skipped: true, reason: 'No customer phone number available for WhatsApp confirmation.' };
  }

  if (!templateName) {
    return { ok: false, skipped: true, reason: 'WHATSAPP_CUSTOMER_TEMPLATE is not configured.' };
  }

  return sendWhatsAppRequest({
    messaging_product: 'whatsapp',
    to: customerPhone,
    type: 'template',
    template: {
      name: templateName,
      language: { code: 'en' },
      components: [
        {
          type: 'body',
          parameters: [
            { type: 'text', text: lead.name || 'there' },
            { type: 'text', text: lead.service || 'your project' },
          ],
        },
      ],
    },
  });
};

export const sendLeadNotifications = async (lead: LeadPayload) => {
  const internalResult = await sendInternalLeadAlert(lead);
  const customerResult = await sendCustomerLeadConfirmation(lead);

  return {
    internal: internalResult,
    customer: customerResult,
  };
};

export const verifyWebhook = async (mode: string, token: string, challenge: string) => {
  const settings = await getWhatsAppSettings();
  const verifyToken = settings.webhookVerifyToken || process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || 'webnest-whatsapp-webhook';

  if (mode === 'subscribe' && token === verifyToken) {
    return challenge;
  }

  return null;
};
