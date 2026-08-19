import React, { useState, useEffect } from 'react';
import { Search, Bell, Menu, Sparkles, ShieldCheck, X, Sun, Moon, Maximize2, Minimize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TopBar({ onOpenMobileSidebar, isFullscreen, onToggleFullscreen }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  
  // Theme state check
  const [theme, setTheme] = useState(() => {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  });

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const notifications = [
    { id: 1, title: 'New Quest Available!', desc: 'Quantum Algorithms Module 4 is ready for battle.', time: '10m ago' },
    { id: 2, title: 'Revision Reminder', desc: '5 items in your Revision Queue need attention.', time: '1h ago' },
    { id: 3, title: 'Spider-Sense Achievement', desc: 'You hit a 12-day streak boost!', time: '1d ago' },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-cardWhite border-b-2 md:border-b-[3px] border-ink px-4 md:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Left: Mobile Menu Toggle & Search Bar (hidden in Fullscreen mode) */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        {!isFullscreen && (
          <>
            <button
              onClick={onOpenMobileSidebar}
              className="lg:hidden p-2 rounded-lg border-2 border-ink bg-white text-ink shadow-hard-sm active:translate-x-0.5 active:translate-y-0.5"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink opacity-70 stroke-[2.5]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ADAPTLEARN courses, skills, concepts..."
                className="w-full pl-10 pr-4 py-2 border-2 border-ink rounded-xl bg-white text-xs md:text-sm font-mono text-ink placeholder:text-ink/40 shadow-hard-sm focus:shadow-hard focus:outline-none transition-all"
              />
            </form>
          </>
        )}
        {isFullscreen && (
          <div className="font-heading text-lg font-black tracking-tight uppercase select-none">
            <span className="text-violet">ADAPT</span>
            <span className="text-red">LEARN</span> <span className="text-yellow text-xs font-mono lowercase border border-ink px-2 py-0.5 rounded ml-2">Focus Mode Active</span>
          </div>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 select-none">
        {/* Fullscreen / Focus Mode Toggle */}
        <button
          onClick={onToggleFullscreen}
          className="p-2 rounded-lg border-2 border-ink bg-white text-ink shadow-hard-sm active:translate-x-0.5 active:translate-y-0.5 transition-colors"
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen / Focus Mode'}
        >
          {isFullscreen ? <Minimize2 className="w-5 h-5 stroke-[2.5]" /> : <Maximize2 className="w-5 h-5 stroke-[2.5]" />}
        </button>

        {/* Theme Toggle (Light/Dark) */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg border-2 border-ink bg-white text-ink shadow-hard-sm active:translate-x-0.5 active:translate-y-0.5 transition-colors"
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {theme === 'light' ? <Moon className="w-5 h-5 stroke-[2.5]" /> : <Sun className="w-5 h-5 stroke-[2.5]" />}
        </button>

        {/* Notification Bell Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg border-2 border-ink bg-white hover:bg-yellow text-ink shadow-hard-sm active:translate-x-0.5 active:translate-y-0.5 transition-colors"
          >
            <Bell className="w-5 h-5 stroke-[2.5]" />
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red text-white text-[10px] font-mono font-bold rounded-full border-2 border-ink flex items-center justify-center shadow-xs">
              3
            </span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 md:w-96 bg-cardWhite border-2 md:border-[3px] border-ink rounded-xl shadow-hard-lg z-50 p-4 space-y-3 font-mono">
              <div className="flex items-center justify-between border-b-2 border-ink pb-2">
                <span className="font-heading font-bold text-sm text-ink">Multiverse Alerts</span>
                <button onClick={() => setShowNotifications(false)}>
                  <X className="w-4 h-4 text-ink" />
                </button>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2.5 rounded-lg border-2 border-ink bg-white text-ink shadow-hard-sm space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold font-heading">
                      <span>{n.title}</span>
                      <span className="text-[10px] opacity-60">{n.time}</span>
                    </div>
                    <p className="text-xs opacity-85">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Hero Avatar */}
        <div
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2.5 p-1 rounded-xl border-2 border-ink bg-white text-ink shadow-hard-sm hover:bg-background cursor-pointer"
        >
          <div className="relative w-8 h-8 rounded-lg bg-violet border-2 border-ink flex items-center justify-center text-white font-heading font-black text-sm">
            N
            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green rounded-full border border-ink" />
          </div>
        </div>
      </div>
    </header>
  );
}
