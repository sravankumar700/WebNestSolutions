import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/api';
import { Button } from '../components/Button';
import { Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';
import { SEO } from '../components/SEO';
import { ThemeToggle } from '../components/ThemeToggle';
import blackLogo from '../assets/webnest-icon-removebg-preview.png';

interface AdminLoginProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onLoginSuccess: (user: any) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ theme, onToggleTheme, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await loginAdmin(email, password);
      onLoginSuccess(res.data.user);
      navigate('/admin');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please verify admin credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-950 flex items-center justify-center p-4 relative overflow-hidden">
      <SEO title="Admin Login" />

      <div className="absolute top-4 right-4">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>

      <div className="bg-charcoal-900 border border-charcoal-800 rounded-3xl p-8 sm:p-10 w-full max-w-md shadow-2xl relative z-10 space-y-6">
        
        {/* Official Logo Header */}
        <div className="text-center space-y-3 flex flex-col items-center justify-center">
          <img src={blackLogo} alt="WebNest Logo Mark" className="brand-logo h-12 w-auto object-contain mb-1" />
          <div className="leading-none font-display">
            <div className="font-extrabold text-2xl text-white tracking-tight">WebNest</div>
            <div className="font-bold text-xs text-warmNeutral-400 tracking-[0.2em] uppercase mt-1">SOLUTIONS</div>
          </div>
          <p className="text-xs text-warmNeutral-500 pt-1">Sign in to manage projects, services, enquiries & settings.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-cream-200 mb-1.5">Admin Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-warmNeutral-500 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                placeholder="Your admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-charcoal-950 border border-charcoal-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-brandRed-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-cream-200 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-warmNeutral-500 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-charcoal-950 border border-charcoal-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-brandRed-500 transition-colors"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center justify-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </span>
              ) : (
                'Sign In to Admin Portal'
              )}
            </Button>
          </div>
        </form>

        <div className="text-center pt-2 border-t border-charcoal-800 text-[11px] text-warmNeutral-500">
          <span>Protected Session (JWT + HTTP-Only Cookie)</span>
        </div>

      </div>
    </div>
  );
};
