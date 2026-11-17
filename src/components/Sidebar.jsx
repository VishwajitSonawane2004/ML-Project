import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Mic,
  BrainCircuit,
  BookOpen,
  History,
  FileBarChart2,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ collapsed, setCollapsed }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Children', path: '/children', icon: Users, badge: '8' },
    { name: 'Add Child', path: '/children/add', icon: UserPlus },
    { header: 'Assessment Modules' },
    { name: 'Oral Reading', path: '/assess/oral', icon: Mic, highlight: true },
    { name: 'Q&A Comprehension', path: '/assess/qa', icon: BrainCircuit, highlight: true },
    { header: 'Knowledge & History' },
    { name: 'Question Bank', path: '/questions', icon: BookOpen, badge: '253' },
    { name: 'Assessment History', path: '/history', icon: History },
    { name: 'Reports & Analytics', path: '/reports', icon: FileBarChart2 },
    { header: 'Configuration' },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-30 h-screen transition-all duration-300 ease-in-out bg-navy-950 text-slate-300 flex flex-col border-r border-navy-850 select-none ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-navy-850">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <span className="font-bold text-white tracking-tight text-base block">
                ReadingSkills<span className="text-brand-400">.ai</span>
              </span>
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                Child Assessment
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors hidden md:flex items-center justify-center"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item, idx) => {
          if (item.header) {
            if (collapsed) return <div key={idx} className="h-2" />;
            return (
              <div
                key={idx}
                className="pt-4 pb-1.5 px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider"
              >
                {item.header}
              </div>
            );
          }

          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-navy-850'
                }`
              }
              title={collapsed ? item.name : undefined}
            >
              <Icon
                className={`w-5 h-5 shrink-0 transition-colors ${
                  item.highlight ? 'text-brand-400 group-hover:text-white' : ''
                }`}
              />

              {!collapsed && (
                <span className="flex-1 truncate">{item.name}</span>
              )}

              {!collapsed && item.badge && (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-navy-800 text-slate-300 font-mono">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* User profile card & logout */}
      <div className="p-3 border-t border-navy-850 bg-navy-900/60">
        {!collapsed ? (
          <div className="flex items-center justify-between gap-3 p-2 rounded-xl bg-navy-850/80">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-xs shrink-0">
                {user?.name ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'TE'}
              </div>
              <div className="truncate text-left leading-tight">
                <p className="text-xs font-semibold text-white truncate">{user?.name || 'Teacher'}</p>
                <p className="text-[10px] text-slate-400 truncate">{user?.role || 'Educator'}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-navy-800 rounded-lg transition-colors"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center p-2.5 text-slate-400 hover:text-red-400 hover:bg-navy-850 rounded-xl transition-colors"
            title="Sign Out"
          >
            <LogOut size={20} />
          </button>
        )}
      </div>
    </aside>
  );
}
