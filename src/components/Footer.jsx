import React from 'react';
import { useTranslation } from 'react-i18next';
import { Cpu, Github, Linkedin, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Footer({ onOpenShortcuts, onOpenSettings }) {
  const { t } = useTranslation();

  return (
    <footer className="relative z-10 border-t border-slate-800/80 bg-[#070A12] py-16 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* LOGO & ABOUT */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1px]">
                <div className="w-full h-full bg-[#0B0F19] rounded-[11px] flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                SemiconRestore <span className="text-cyan-400">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('footer.desc')}
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{t('footer.status')}</span>
            </div>
          </div>

          {/* PRODUCT LINKS */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">{t('footer.col1')}</h4>
            <ul className="space-y-2">
              <li><a href="#dashboard" className="hover:text-cyan-400 transition-colors">AI Wafer Restoration</a></li>
              <li><a href="#dashboard" className="hover:text-cyan-400 transition-colors">Batch Processing Queue</a></li>
              <li><a href="#analytics" className="hover:text-cyan-400 transition-colors">PSNR & SSIM Analytics</a></li>
              <li><a href="#model-info" className="hover:text-cyan-400 transition-colors">SwinIR Model Specs</a></li>
              <li><button onClick={onOpenSettings} className="hover:text-cyan-400 transition-colors text-left">FastAPI Endpoint Setup</button></li>
            </ul>
          </div>

          {/* RESOURCES & DOCUMENTATION */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">{t('footer.col2')}</h4>
            <ul className="space-y-2">
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"><Github className="w-3.5 h-3.5" /> GitHub Repository</a></li>
              <li><a href="#model-info" className="hover:text-cyan-400 transition-colors">Documentation</a></li>
              <li><button onClick={onOpenShortcuts} className="hover:text-cyan-400 transition-colors text-left">Keyboard Shortcuts (?)</button></li>
              <li><a href="#about" className="hover:text-cyan-400 transition-colors">API Architecture</a></li>
            </ul>
          </div>

          {/* LEGAL & CONTACT */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">{t('footer.col3')}</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#about" className="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
              <li><a href="#about" className="hover:text-cyan-400 transition-colors">Contact Engineering</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"><Linkedin className="w-3.5 h-3.5" /> LinkedIn</a></li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>{t('footer.rights')}</p>
          <div className="flex items-center gap-6">
            <span>SOC2 Type II Certified</span>
            <span>ISO-17025 Compliant</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
