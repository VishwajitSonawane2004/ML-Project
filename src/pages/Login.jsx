import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('sarah.jenkins@lincoln.edu');
  const [password, setPassword] = useState('educator2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Frontend validation
    if (!email.trim()) {
      setError('Please provide a valid teacher email address.');
      return;
    }
    if (!password) {
      setError('Please enter your account password.');
      return;
    }

    try {
      setLoading(true);
      await login({ email: email.trim(), password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoFill = () => {
    setEmail('sarah.jenkins@lincoln.edu');
    setPassword('educator2026');
    setError('');
  };

  return (
    <div className="w-full max-w-md mx-auto text-left">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Teacher Portal Sign In
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Access child reading profiles and conduct educational assessments
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5">
          <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {forgotSent && (
        <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 flex items-start gap-2.5">
          <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
          <span>Password reset instructions have been dispatched to your email address.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Institutional Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="teacher@school.edu"
              required
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900 transition-all placeholder:text-slate-400"
            />
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900 transition-all placeholder:text-slate-400"
            />
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition-colors"
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 rounded-md"
            />
            <span className="text-slate-600 font-medium">Remember this browser</span>
          </label>

          <button
            type="button"
            onClick={() => setForgotSent(true)}
            className="text-brand-600 hover:text-brand-700 font-semibold transition-colors"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-semibold text-xs shadow-md shadow-brand-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>Sign In to Dashboard</span>
              <ArrowRight size={14} />
            </>
          )}
        </button>
      </form>

      {/* Demo Credentials Helper Pill */}
      <div className="mt-6 p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between">
        <div className="text-[11px] text-indigo-900 leading-tight">
          <span className="font-semibold block">Demo Educator Access</span>
          <span className="text-indigo-600">Preloaded credentials ready</span>
        </div>
        <button
          type="button"
          onClick={handleQuickDemoFill}
          className="px-2.5 py-1 rounded-lg bg-white border border-indigo-200 text-indigo-700 text-[11px] font-semibold hover:bg-indigo-50 transition-colors shadow-sm"
        >
          Auto-Fill Demo
        </button>
      </div>

      <p className="text-center text-xs text-slate-500 mt-6">
        Don't have an educator account?{' '}
        <Link to="/register" className="text-brand-600 font-semibold hover:underline">
          Register new teacher
        </Link>
      </p>
    </div>
  );
}
