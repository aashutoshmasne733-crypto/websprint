import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { Minimize2 } from 'lucide-react';

export default function Layout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-ink flex font-mono selection:bg-yellow selection:text-ink">
      {/* Sidebar - only show if not in Fullscreen Mode */}
      {!isFullscreen && (
        <Sidebar
          isOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isFullscreen ? 'lg:pl-0' : 'lg:pl-72'}`}>
        <TopBar
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          isFullscreen={isFullscreen}
          onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        />

        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto space-y-6 relative">
          <Outlet />

          {/* Floating Minimize Button in Fullscreen Focus Mode */}
          {isFullscreen && (
            <button
              onClick={() => setIsFullscreen(false)}
              className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl border-3 border-ink bg-yellow text-ink shadow-hard hover:shadow-hard-lg font-heading font-bold text-sm hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5"
              title="Minimize Fullscreen"
            >
              <Minimize2 className="w-4 h-4 stroke-[2.5]" />
              Exit Focus Mode
            </button>
          )}
        </main>
      </div>
    </div>
  );
}
