import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  RotateCcw,
  FolderGit2,
  Briefcase,
  BarChart3,
  User,
  Settings,
  LogOut,
  Flame,
  Zap,
  X
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [streakCount, setStreakCount] = useState(12);
  const [showStreakBonus, setShowStreakBonus] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Courses', path: '/courses', icon: BookOpen },
    { label: 'My Learning', path: '/my-learning', icon: GraduationCap },
    { label: 'Revision', path: '/revision', icon: RotateCcw, badge: '3 Queue' },
    { label: 'Projects', path: '/projects', icon: FolderGit2 },
    { label: 'Interview Prep', path: '/interview-prep', icon: Briefcase },
    { label: 'Analytics', path: '/analytics', icon: BarChart3 },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  const handleIncrementStreak = () => {
    setStreakCount((prev) => prev + 1);
    setShowStreakBonus(true);
    setTimeout(() => setShowStreakBonus(false), 2500);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-ink/60 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* Main Sidebar Container */}
      <aside
        className={`
          fixed top-0 left-0 bottom-0 z-50 w-72 bg-cardWhite border-r-2 md:border-r-[3px] border-ink flex flex-col justify-between h-screen overflow-y-auto transition-transform duration-300 ease-in-out select-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Top Header & Logo */}
        <div className="p-5 border-b-2 md:border-b-[3px] border-ink flex items-center justify-between">
          <NavLink to="/dashboard" className="flex items-center gap-2.5 group">
            {/* Brain SVG Icon */}
            <div className="w-10 h-10 rounded-lg bg-yellow border-2 border-ink flex items-center justify-center shadow-hard-sm group-hover:rotate-6 transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#111111"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
                <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
                <path d="M15 13a3 3 0 1 0-6 0" />
                <path d="M12 18v3" />
              </svg>
            </div>
            {/* Logo Wordmark: "ADAPT" (violet) + "LEARN" (red) in ALL CAPITAL LETTERS */}
            <span className="font-heading text-2xl font-black tracking-tight leading-none uppercase">
              <span className="text-violet">ADAPT</span>
              <span className="text-red">LEARN</span>
            </span>
          </NavLink>

          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg border-2 border-ink bg-white text-ink shadow-hard-sm active:translate-x-0.5 active:translate-y-0.5"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="py-4 px-3 space-y-1 flex-1">
          <div className="px-3 py-1.5 text-[11px] font-mono font-bold tracking-widest text-ink/60 uppercase">
            HQ Navigation
          </div>

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => onClose && onClose()}
              className={({ isActive }) => `
                flex items-center justify-between px-3.5 py-2.5 rounded-lg font-heading text-sm md:text-base font-bold transition-all duration-150 border-2 border-transparent uppercase
                ${
                  isActive
                    ? 'bg-red text-white border-ink shadow-hard-sm translate-x-1'
                    : 'text-ink hover:bg-background hover:border-ink hover:shadow-hard-sm hover:translate-x-0.5'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-5 h-5 stroke-[2.5] ${isActive ? 'text-white' : 'text-ink'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-ink ${isActive ? 'bg-yellow text-ink' : 'bg-violet text-white'}`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Daily Streak Widget Card (Yellow background, black border) */}
        <div className="p-3">
          <div className="relative p-4 bg-yellow text-ink border-2 md:border-[3px] border-ink rounded-xl shadow-hard-sm space-y-2">
            {showStreakBonus && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red text-white text-xs font-mono font-bold px-2 py-0.5 rounded border border-ink animate-bounce shadow-hard-sm">
                +1 STREAK BOOST! 🔥
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red border-2 border-ink flex items-center justify-center text-white shadow-hard-sm">
                  <Flame className="w-5 h-5 fill-yellow text-red stroke-[2]" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-ink/80">Daily Streak</div>
                  <div className="font-heading text-base font-black text-ink">{streakCount} Days Active</div>
                </div>
              </div>
            </div>

            <p className="text-xs font-mono text-ink/80 leading-snug">
              Earth-1610 supercharged logic! Keep learning daily.
            </p>

            <button
              onClick={handleIncrementStreak}
              className="w-full py-1.5 px-3 bg-white hover:bg-cardWhite text-ink font-heading text-xs font-bold border-2 border-ink rounded-lg shadow-hard-sm active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-1.5 uppercase"
            >
              <Zap className="w-3.5 h-3.5 text-violet fill-violet" />
              Claim Daily Boost
            </button>
          </div>
        </div>

        {/* Bottom Pinned Actions: Settings & Logout */}
        <div className="p-3 border-t-2 md:border-t-[3px] border-ink space-y-1 bg-background/50">
          <NavLink
            to="/settings"
            onClick={() => onClose && onClose()}
            className={({ isActive }) => `
              flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-heading text-sm font-bold transition-all border-2 border-transparent uppercase
              ${isActive ? 'bg-ink text-white border-ink' : 'text-ink hover:bg-white hover:border-ink hover:shadow-hard-sm'}
            `}
          >
            <Settings className="w-5 h-5 stroke-[2.5]" />
            <span>Settings</span>
          </NavLink>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-heading text-sm font-bold text-red hover:bg-red/10 border-2 border-transparent hover:border-red transition-all uppercase"
          >
            <LogOut className="w-5 h-5 stroke-[2.5]" />
            <span>HQ Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
