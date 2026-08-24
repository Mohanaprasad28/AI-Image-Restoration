import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Sparkles, 
  Play, 
  Database, 
  Zap, 
  Gauge, 
  Cpu, 
  CheckCircle2, 
  ShieldCheck,
  ArrowRight,
  ScanLine
} from 'lucide-react';

export default function Hero({ onStartRestoration, onViewDemo }) {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-16 overflow-hidden">
      
      {/* Radial Blue & Cyan Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-cyan-500/20 via-blue-600/20 to-indigo-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT TEXT COLUMN (Wider Horizontal Spacing) */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-400 text-xs font-semibold shadow-lg shadow-cyan-500/10 animate-float">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>{t('hero.pill')}</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300 font-mono text-[11px]">{t('hero.transformer')}</span>
            </div>

            {/* Main Headline (Exactly Two Lines Without Truncation) */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.35rem] xl:text-[2.5rem] font-extrabold tracking-tight text-white leading-tight">
              <span className="block">
                AI-Powered{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 text-glow">
                  Wafer Image Restoration
                </span>
              </span>
              <span className="block mt-1">
                for Semiconductor Inspection
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {t('hero.subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onStartRestoration}
                className="px-7 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-3 group"
              >
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>{t('hero.tryAi')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onViewDemo}
                className="px-7 py-4 rounded-2xl glass-card text-slate-200 hover:text-cyan-400 font-semibold text-sm border border-slate-700 hover:border-cyan-500/40 transition-all duration-300 flex items-center gap-3 group"
              >
                <Play className="w-4 h-4 fill-current text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>{t('hero.viewDemo')}</span>
              </button>
            </div>

            {/* Quick Feature Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>{t('hero.subMicron')}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{t('hero.zeroLatency')}</span>
              </div>
            </div>

          </div>

          {/* RIGHT 3D-STYLE FLOATING WAFER CHIP GRAPHIC (Simplified by 25% - Option A) */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Outer Glowing Glass Card (Reduced size by 25% with spacious interior) */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl glass-panel p-5 shadow-2xl shadow-cyan-500/20 border border-cyan-500/30 flex flex-col justify-between group">
              
              {/* Laser Scanning Animation Line */}
              <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#06b6d4] animate-scan z-20 pointer-events-none"></div>

              {/* Card Header: Title & SwinIR Active Badge */}
              <div className="flex items-center justify-between text-xs font-mono text-cyan-400 z-10">
                <span className="flex items-center gap-1.5 font-bold">
                  <ScanLine className="w-3.5 h-3.5 animate-spin-slow" />
                  LIVE WAFER SCANNER
                </span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-bold">
                  SwinIR ACTIVE
                </span>
              </div>

              {/* Single Wafer Preview (Clean & Spacious Center) */}
              <div className="my-2 flex-1 rounded-2xl border border-slate-800/80 bg-[#070B14] p-4 flex flex-col justify-center items-center relative overflow-hidden">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0D1527] to-slate-900 border border-cyan-500/40 p-4 flex flex-col items-center justify-center shadow-xl animate-float">
                  <Cpu className="w-10 h-10 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-mono text-cyan-300 font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                    PSNR +8.6 dB
                  </span>
                </div>
              </div>

              {/* Top Right Floating GPU Badge */}
              <div className="absolute -top-3 -right-3 px-3 py-1 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-xl flex items-center gap-1.5 animate-float-reverse">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>Tesla T4 GPU</span>
              </div>

            </div>
          </div>

        </div>

        {/* STATISTICS CARDS SECTION */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
                <Database className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-slate-400">{t('hero.stat1Title')}</span>
            </div>
            <p className="text-3xl font-extrabold text-white font-mono tracking-tight">{t('hero.stat1Val')}</p>
            <p className="text-[11px] text-slate-400 mt-1">{t('hero.stat1Sub')}</p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
                <Gauge className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-slate-400">{t('hero.stat2Title')}</span>
            </div>
            <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-mono tracking-tight">
              {t('hero.stat2Val')}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">{t('hero.stat2Sub')}</p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-slate-400">{t('hero.stat3Title')}</span>
            </div>
            <p className="text-3xl font-extrabold text-white font-mono tracking-tight">{t('hero.stat3Val')}</p>
            <p className="text-[11px] text-slate-400 mt-1">{t('hero.stat3Sub')}</p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-slate-400">{t('hero.stat4Title')}</span>
            </div>
            <p className="text-3xl font-extrabold text-white font-mono tracking-tight">{t('hero.stat4Val')}</p>
            <p className="text-[11px] text-slate-400 mt-1">{t('hero.stat4Sub')}</p>
          </div>

        </div>

      </div>

    </section>
  );
}
