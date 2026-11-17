import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Lock,
  Bell,
  Info,
  LogOut,
  Save,
  CheckCircle2,
  AlertCircle,
  Shield,
  Server,
  Database
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();

  const [profileForm, setProfileForm] = useState({
    name: user?.name || 'Dr. Sarah Jenkins',
    email: user?.email || 'sarah.jenkins@lincoln.edu',
    school: user?.school || 'Lincoln Elementary School',
    role: user?.role || 'Senior Reading Specialist'
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    reviewAlerts: true,
    oralCompleted: true,
    emailDigest: false
  });

  const [profileSuccess, setProfileSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateUser(profileForm);
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 3000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordError('');
    if (passwordForm.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New password confirmation does not match.');
      return;
    }

    setPasswordSuccess(true);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Platform Settings & Institutional Profile
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage educator account credentials, notification thresholds, and backend integration status
        </p>
      </div>

      {/* Profile Settings */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <User size={16} className="text-brand-600" />
            <span>Educator Profile Details</span>
          </h3>
          {profileSuccess && (
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle2 size={13} /> Profile updated
            </span>
          )}
        </div>

        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Institutional Campus / School
              </label>
              <input
                type="text"
                value={profileForm.school}
                onChange={(e) => setProfileForm({ ...profileForm, school: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Professional Role
              </label>
              <input
                type="text"
                value={profileForm.role}
                onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-slate-800"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Save size={14} />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Lock size={16} className="text-brand-600" />
            <span>Security & Password</span>
          </h3>
          {passwordSuccess && (
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle2 size={13} /> Password changed successfully
            </span>
          )}
        </div>

        {passwordError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
            <AlertCircle size={15} />
            <span>{passwordError}</span>
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                required
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                required
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                required
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-slate-800"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center gap-2">
          <Bell size={16} className="text-brand-600" />
          <span>Diagnostic Notification Alerts</span>
        </h3>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 cursor-pointer">
            <div>
              <p className="text-xs font-bold text-slate-800">Teacher Review Required Flag Alerts</p>
              <p className="text-[11px] text-slate-500">Notify immediately when Q&A ML ensemble confidence drops below 0.78</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.reviewAlerts}
              onChange={(e) => setNotifications({ ...notifications, reviewAlerts: e.target.checked })}
              className="w-4 h-4 text-brand-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 cursor-pointer">
            <div>
              <p className="text-xs font-bold text-slate-800">Oral Fluency ASR Run Completion</p>
              <p className="text-[11px] text-slate-500">Alert when acoustic speech-to-text transcript alignment finishes</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.oralCompleted}
              onChange={(e) => setNotifications({ ...notifications, oralCompleted: e.target.checked })}
              className="w-4 h-4 text-brand-600 rounded"
            />
          </label>
        </div>
      </div>

      {/* Application & Backend Information */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center gap-2">
          <Server size={16} className="text-brand-600" />
          <span>System Information & Backend Architecture</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block font-semibold text-[10px] uppercase">College Project</span>
            <span className="font-bold text-slate-800 block mt-0.5">Reading Skills Profile</span>
            <span className="text-[11px] text-slate-500">Frontend v1.0.0</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block font-semibold text-[10px] uppercase">FastAPI Integration</span>
            <span className="font-bold text-slate-800 block mt-0.5">http://localhost:8000</span>
            <span className="text-[11px] text-emerald-600 font-medium">Ready (Auto-fallback to Demo)</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block font-semibold text-[10px] uppercase">Benchmark Datasets</span>
            <span className="font-bold text-slate-800 block mt-0.5">SciEntsBank & Beetle</span>
            <span className="text-[11px] text-slate-500">253 Questions / 16k Answers</span>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">Institutional Session</span>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut size={14} />
            <span>Sign Out of Platform</span>
          </button>
        </div>
      </div>
    </div>
  );
}
