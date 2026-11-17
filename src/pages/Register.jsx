import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, User, School, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    school: '',
    role: 'Teacher',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName.trim()) {
      setError('Please provide your full legal or professional name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Please enter a valid academic/institutional email address.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Password confirmation does not match.');
      return;
    }

    try {
      setLoading(true);
      await register({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        school: formData.school.trim() || 'Lincoln Elementary School',
        role: formData.role,
        password: formData.password
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please check form entries.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto text-left">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Educator Registration
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Create an institutional account to manage children reading assessments
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5">
          <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Full Name & Title
          </label>
          <div className="relative">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Dr. Robert Vance"
              required
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900 transition-all placeholder:text-slate-400"
            />
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Institutional Email
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="teacher@school.edu"
              required
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900 transition-all placeholder:text-slate-400"
            />
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* School & Role Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              School / Center
            </label>
            <div className="relative">
              <input
                type="text"
                name="school"
                value={formData.school}
                onChange={handleChange}
                placeholder="Lincoln Elementary"
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900 transition-all placeholder:text-slate-400"
              />
              <School className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900 transition-all"
            >
              <option value="Teacher">Teacher</option>
              <option value="Senior Reading Specialist">Reading Specialist</option>
              <option value="Speech Language Pathologist">Speech Pathologist</option>
              <option value="School Psychologist">School Psychologist</option>
            </select>
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Password (min 6 characters)
          </label>
          <div className="relative">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••••••"
              required
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900 transition-all placeholder:text-slate-400"
            />
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••••••"
              required
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900 transition-all placeholder:text-slate-400"
            />
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-semibold text-xs shadow-md shadow-brand-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer pt-2"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>Complete Educator Registration</span>
              <ArrowRight size={14} />
            </>
          )}
        </button>
      </form>

      <p className="text-center text-xs text-slate-500 mt-5">
        Already registered?{' '}
        <Link to="/login" className="text-brand-600 font-semibold hover:underline">
          Sign in here
        </Link>
      </p>
    </div>
  );
}
