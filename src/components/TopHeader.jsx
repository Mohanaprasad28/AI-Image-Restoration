import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Sun, 
  Moon, 
  Bell, 
  Sparkles, 
  Menu, 
  CheckCircle2, 
  Activity,
  PanelLeft
} from 'lucide-react';

export default function TopHeader({
  isDarkMode,
  setIsDarkMode,
  onOpenAuth,
  onOpenSettings,
  onOpenShortcuts,
  onToggleMobileMenu,
  onToggleSidebar,
  isSidebarCollapsed
}) {
  const { t } = useTranslation();
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-[#0B0F19]/80 dark:bg-[#0B0F19]/85 border-b border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left Side: Mobile Menu Button & Desktop Sidebar Toggle + Status */}
        <div className="flex items-center gap-3">
          {/* Mobile Drawer Hamburger */}
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop Toggle Button */}
          <button
            onClick={onToggleSidebar}
            className="hidden lg:flex p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <PanelLeft className="w-5 h-5 text-cyan-400" />
          </button>

          {/* Status Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Tesla T4 CUDA:0 Ready</span>
          </div>
        </div>

        {/* Right Side Header Controls: Notifications, Theme Toggle, Login, Get Started */}
        <div className="flex items-center gap-3">
          
          {/* NOTIFICATIONS POPUP */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-500"></span>
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-3 w-80 rounded-2xl glass-panel border border-slate-800 p-4 shadow-2xl z-50 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h4 className="text-xs font-bold text-white font-mono uppercase">{t('nav.systemLog')}</h4>
                  <span className="text-[10px] text-cyan-400 font-mono">{t('nav.liveTesla')}</span>
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{t('nav.modelLoaded')}</span>
                    </div>
                    <p className="text-[11px] text-slate-400">{t('nav.modelLoadedSub')}</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <div className="flex items-center gap-2 text-cyan-400 font-bold">
                      <Activity className="w-3.5 h-3.5" />
                      <span>{t('nav.psnrBench')}</span>
                    </div>
                    <p className="text-[11px] text-slate-400">{t('nav.psnrBenchSub')}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* DARK / LIGHT THEME TOGGLE */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
            title="Toggle Dark / Light Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* LOGIN BUTTON */}
          <button
            onClick={onOpenAuth}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 hover:text-white hover:border-slate-700 transition-all"
          >
            {t('nav.login')}
          </button>

          {/* GET STARTED CTA */}
          <button
            onClick={onOpenAuth}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('nav.getStarted')}</span>
          </button>

        </div>
      </div>
    </header>
  );
}
