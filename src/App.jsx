import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Dashboard from './components/Dashboard';
import LiveAnalytics from './components/LiveAnalytics';
import RestorationHistory from './components/RestorationHistory';
import DownloadCenter from './components/DownloadCenter';
import ModelInfo from './components/ModelInfo';
import About from './components/About';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import SettingsModal from './components/SettingsModal';
import ShortcutsModal from './components/ShortcutsModal';
import Toast from './components/Toast';
import ParticleBackground from './components/ParticleBackground';
import { SAMPLE_WAFER_ITEMS } from './data/sampleWafers';

export default function App() {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('semicon_active_nav') || 'home';
  });
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);

  // Sync dark/light theme class on html document
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Global Keyboard Shortcuts Listener ('?' key)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        setShortcutsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setAuthOpen(false);
        setSettingsOpen(false);
        setShortcutsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleStartRestoration = () => {
    setActiveTab('restore-image');
    localStorage.setItem('semicon_active_nav', 'restore-image');
    const el = document.getElementById('dashboard');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadZip = () => {
    showToast('Generating complete ZIP archive of wafer restoration batch...', 'success');
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = SAMPLE_WAFER_ITEMS[0].restoredUrl;
      link.download = 'SemiconRestore_All_Batch_Wafer_Files.zip';
      link.click();
    }, 800);
  };

  return (
    <div className="relative min-h-screen bg-[#0B0F19] dark:bg-[#0B0F19] light:bg-slate-50 transition-colors duration-300">
      
      {/* Particle & Silicon Circuit Grid Canvas Background */}
      <ParticleBackground isDarkMode={isDarkMode} />

      {/* Collapsible Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      {/* Main Container adjusting for Left Sidebar Width */}
      <div className={`transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        
        {/* Top Header Controls */}
        <TopHeader
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          onOpenAuth={() => setAuthOpen(true)}
          onOpenSettings={() => setSettingsOpen(true)}
          onOpenShortcuts={() => setShortcutsOpen(true)}
          onToggleMobileMenu={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isSidebarCollapsed={isSidebarCollapsed}
        />

        {/* Main Content Sections */}
        <main className="relative z-10 space-y-12">
          <Hero
            onStartRestoration={handleStartRestoration}
            onViewDemo={() => {
              setActiveTab('restore-image');
              localStorage.setItem('semicon_active_nav', 'restore-image');
              showToast('Loaded Live Wafer Scanner Demo', 'info');
            }}
          />

          <Features />

          <HowItWorks onTryRestoration={handleStartRestoration} />

          <Dashboard onShowToast={showToast} />

          <LiveAnalytics />

          <RestorationHistory
            onViewItem={(item) => {
              setSelectedHistoryItem(item);
              setActiveTab('restore-image');
              localStorage.setItem('semicon_active_nav', 'restore-image');
              const el = document.getElementById('dashboard');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              showToast(`Inspecting ${item.name} in Before/After Slider`, 'info');
            }}
            onShowToast={showToast}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <DownloadCenter
              onDownloadZip={handleDownloadZip}
              onShowToast={showToast}
            />
          </div>

          <ModelInfo />

          <About />
        </main>

        {/* Footer */}
        <Footer
          onOpenShortcuts={() => setShortcutsOpen(true)}
          onOpenSettings={() => setSettingsOpen(true)}
        />

      </div>

      {/* Modals & Floating Notifications */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onShowToast={showToast}
      />

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onShowToast={showToast}
      />

      <ShortcutsModal
        isOpen={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
