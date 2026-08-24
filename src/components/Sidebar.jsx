import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Home, 
  UploadCloud, 
  BarChart2, 
  History, 
  Brain, 
  HelpCircle, 
  Info, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  Cpu, 
  X
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  mobileOpen,
  setMobileOpen,
  onOpenSettings
}) {
  const { t } = useTranslation();

  const sidebarItems = [
    { id: 'home', label: t('nav.home'), icon: Home, type: 'nav', target: 'home' },
    { id: 'restore-image', label: t('nav.restoreImage'), icon: UploadCloud, type: 'nav', target: 'dashboard' },
    { id: 'analytics', label: t('nav.analytics'), icon: BarChart2, type: 'nav', target: 'analytics' },
    { id: 'history', label: t('nav.history'), icon: History, type: 'nav', target: 'history' },
    { id: 'model-info', label: t('nav.modelInfo'), icon: Brain, type: 'nav', target: 'model-info' },
    { id: 'how-it-works', label: t('nav.howItWorks'), icon: HelpCircle, type: 'nav', target: 'how-it-works' },
    { id: 'about', label: t('nav.about'), icon: Info, type: 'nav', target: 'about' },
    { id: 'settings', label: t('nav.settings'), icon: Settings, type: 'settings', target: 'settings' },
  ];

  const handleItemClick = (item) => {
    setActiveTab(item.id);
    localStorage.setItem('semicon_active_nav', item.id);

    if (item.type === 'settings') {
      onOpenSettings();
    } else {
      const section = document.getElementById(item.target || item.id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 bg-[#0B0F19]/95 dark:bg-[#0B0F19]/95 light:bg-slate-900/95 border-r border-slate-800/80 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${
          mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* TOP BRAND SECTION */}
        <div>
          <div className="h-20 px-4 flex items-center justify-between border-b border-slate-800/80">
            <div 
              className="flex items-center gap-3 overflow-hidden select-none cursor-pointer group"
              onClick={() => handleItemClick({ id: 'home' })}
            >
              <div className="relative flex items-center justify-center min-w-[42px] h-[42px] rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
                <div className="w-full h-full bg-[#0B0F19] rounded-[11px] flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                </span>
              </div>
              
              {(!isCollapsed || mobileOpen) && (
                <div className="transition-opacity duration-300 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-base tracking-tight text-white">
                      SemiconRestore
                    </span>
                    <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                      AI
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium">SwinIR PyTorch v1.2</p>
                </div>
              )}
            </div>

            {/* Mobile close button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* SIDEBAR NAVIGATION ITEMS */}
          <nav className="p-3 space-y-1.5 overflow-y-auto max-h-[calc(100vh-160px)]">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => handleItemClick(item)}
                    className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-indigo-600/10 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900/80 border border-transparent'
                    }`}
                  >
                    <Icon className={`w-5 h-5 min-w-[20px] transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-400'}`} />
                    
                    {(!isCollapsed || mobileOpen) && (
                      <span className="whitespace-nowrap truncate">{item.label}</span>
                    )}

                    {/* Active Pill Indicator */}
                    {isActive && (!isCollapsed || mobileOpen) && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
                    )}
                  </button>

                  {/* Tooltip on Collapsed Desktop view */}
                  {isCollapsed && !mobileOpen && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-semibold whitespace-nowrap shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50">
                      {item.label}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* BOTTOM COLLAPSE TOGGLE FOOTER */}
        <div className="p-3 border-t border-slate-800/80 hidden lg:block">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-all text-xs font-semibold"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5 text-cyan-400" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5 text-cyan-400" />
                <span>Collapse Sidebar</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
