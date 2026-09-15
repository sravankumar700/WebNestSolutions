# Quote Form Data Storage

## Where the form data is stored

The Get Quote form submits to the backend API at `/api/enquiries`.

### Primary storage
- The real database is MongoDB.
- The model is defined in [server/src/models/Enquiry.ts](server/src/models/Enquiry.ts).
- The submission logic is in [server/src/controllers/enquiryController.ts](server/src/controllers/enquiryController.ts).
- The MongoDB connection is configured in [server/src/config/db.ts](server/src/config/db.ts) and [server/.env](server/.env).

This means the normal permanent storage is:
- MongoDB database: `webnest_db`
- Collection: `enquiries`

### Local development fallback
If MongoDB is not running or the connection fails, the app now falls back to an in-memory runtime store so the form can still submit during local testing.

Important:
- This fallback is NOT permanent storage.
- The data disappears when the backend server restarts.
- It is only for development/testing when DB connectivity is unavailable.

## Current behavior in this project

1. Frontend form sends data from:
   - [client/src/components/LeadFormModal.tsx](client/src/components/LeadFormModal.tsx)
   - [client/src/pages/ContactPage.tsx](client/src/pages/ContactPage.tsx)

2. Backend receives it through:
   - [server/src/routes/enquiryRoutes.ts](server/src/routes/enquiryRoutes.ts)

3. If MongoDB is available:
   - data is saved to the `enquiries` collection

4. If MongoDB is unavailable:
   - data is stored temporarily in server memory only

## Recommended setup for production

Make sure the MongoDB URI in [server/.env](server/.env) points to a working MongoDB instance, then restart the backend server.

Without a working MongoDB connection, the form may appear to submit but the saved data will not be durable.
