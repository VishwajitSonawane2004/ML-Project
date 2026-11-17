import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ collapsed }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const profileRef = useRef(null);
  const notifyRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (notifyRef.current && !notifyRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute breadcrumbs from path
  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path === '/dashboard') return { title: 'Dashboard Overview', category: 'Analytics' };
    if (path === '/children') return { title: 'Children Directory', category: 'Students' };
    if (path === '/children/add') return { title: 'Register New Child', category: 'Students' };
    if (path.startsWith('/children/')) return { title: 'Child Skills Profile', category: 'Profiles' };
    if (path === '/assess/oral') return { title: 'Oral Reading Fluency Assessment', category: 'Module 1' };
    if (path.startsWith('/assess/oral/result')) return { title: 'Oral Fluency Analysis', category: 'Module 1' };
    if (path === '/assess/qa') return { title: 'Q&A Reading Comprehension', category: 'Module 2' };
    if (path.startsWith('/assess/qa/result')) return { title: 'Comprehension Classification', category: 'Module 2' };
    if (path === '/questions') return { title: 'Benchmark Question Bank', category: 'Datasets' };
    if (path === '/history') return { title: 'Assessment Records', category: 'History' };
    if (path === '/reports') return { title: 'Performance Reports & Exports', category: 'Reports' };
    if (path === '/settings') return { title: 'Platform Settings', category: 'Account' };
    return { title: 'Reading Skills Platform', category: 'Home' };
  };

  const breadcrumb = getBreadcrumbs();

  const notifications = [
    {
      id: 1,
      title: 'ML Classification Complete',
      desc: 'Liam Chen Q&A assessment requires teacher review.',
      time: '12m ago',
      type: 'warning',
      unread: true
    },
    {
      id: 2,
      title: 'Acoustic Model Finished',
      desc: 'Zara Al-Mansoor achieved 135 Est. WPM (3.5% WER).',
      time: '1h ago',
      type: 'success',
      unread: true
    },
    {
      id: 3,
      title: 'SciEntsBank Synced',
      desc: '253 benchmark science reading items loaded.',
      time: '1d ago',
      type: 'info',
      unread: false
    }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/children?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header
      className={`fixed top-0 right-0 z-20 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-300 ease-in-out flex items-center justify-between px-6 ${
        collapsed ? 'left-20' : 'left-64'
      }`}
    >
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <span>{breadcrumb.category}</span>
          <span>/</span>
          <span className="text-slate-600 font-semibold">{breadcrumb.title}</span>
        </div>
        <h1 className="text-lg font-bold text-slate-800 tracking-tight leading-none mt-0.5">
          {breadcrumb.title}
        </h1>
      </div>

      {/* Center/Right Items */}
      <div className="flex items-center gap-4">
        {/* Demonstration Mode Pill */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100/80 text-[11px] font-medium text-indigo-700">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
          <span>Demo Data Mode</span>
        </div>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search children, passages..."
            className="w-64 pl-9 pr-4 py-1.5 text-xs bg-slate-100/80 border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-700 placeholder:text-slate-400"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2 pointer-events-none" />
        </form>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifyRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-600 ring-2 ring-white"></span>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-2 z-50 text-left animate-in fade-in-50 duration-200">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Notifications
                </span>
                <span className="text-[10px] bg-brand-50 text-brand-700 font-semibold px-2 py-0.5 rounded-full">
                  2 New
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3 text-xs hover:bg-slate-50 transition-colors flex gap-3 ${
                      n.unread ? 'bg-indigo-50/30' : ''
                    }`}
                  >
                    <div className="mt-0.5">
                      {n.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                      {n.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                      {n.type === 'info' && <Info className="w-4 h-4 text-blue-500" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800">{n.title}</p>
                      <p className="text-slate-500 mt-0.5 text-[11px] leading-tight">{n.desc}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-slate-100 text-center">
                <Link
                  to="/history"
                  onClick={() => setNotificationsOpen(false)}
                  className="text-xs text-brand-600 font-medium hover:underline block py-1"
                >
                  View All Assessment Logs
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200"></div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-100 transition-colors text-left"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
              {user?.name ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'TJ'}
            </div>
            <div className="hidden sm:block leading-tight">
              <span className="text-xs font-semibold text-slate-800 block">
                {user?.name || 'Dr. Sarah Jenkins'}
              </span>
              <span className="text-[10px] text-slate-500 block">
                {user?.role || 'Senior Teacher'}
              </span>
            </div>
            <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-2 z-50 text-left animate-in fade-in-50 duration-200">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-800">{user?.name || 'Dr. Sarah Jenkins'}</p>
                <p className="text-[11px] text-slate-500 truncate">{user?.email || 'sarah.jenkins@lincoln.edu'}</p>
                <span className="inline-block mt-1.5 px-2 py-0.5 text-[10px] font-semibold text-brand-700 bg-brand-50 rounded-md">
                  {user?.school || 'Lincoln Elementary'}
                </span>
              </div>

              <div className="py-1">
                <Link
                  to="/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-brand-600 transition-colors"
                >
                  <User size={15} />
                  <span>Profile Overview</span>
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-brand-600 transition-colors"
                >
                  <Settings size={15} />
                  <span>Settings & Preferences</span>
                </Link>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    logout();
                    navigate('/login');
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors text-left font-medium"
                >
                  <LogOut size={15} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
