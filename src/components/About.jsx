import React from 'react';
import { useTranslation } from 'react-i18next';
import { Cpu, ShieldCheck, Sparkles, Code2, Database, Layers } from 'lucide-react';

export default function About() {
  const { t } = useTranslation();

  const stack = [
    { name: 'React 18', desc: 'Component Architecture', color: 'from-cyan-500 to-blue-500' },
    { name: 'Tailwind CSS', desc: 'Ultra-Modern SaaS Styling', color: 'from-blue-500 to-indigo-500' },
    { name: 'FastAPI', desc: 'Async Python Inference Server', color: 'from-emerald-400 to-teal-600' },
    { name: 'PyTorch 2.4', desc: 'Deep Learning Engine', color: 'from-amber-400 to-orange-500' },
    { name: 'SwinIR', desc: 'Swin Transformer Architecture', color: 'from-purple-500 to-indigo-600' },
  ];

  return (
    <section id="about" className="py-20 relative z-10 bg-slate-950/40 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Banner */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 relative overflow-hidden text-center max-w-4xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mx-auto flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Cpu className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              {t('about.pill')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t('about.titlePrefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">{t('about.titleSuffix')}</span>
            </h2>
          </div>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            {t('about.desc')}
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="space-y-4">
          <h3 className="text-center text-xs font-mono uppercase tracking-widest text-slate-400">
            {t('about.stackTitle')}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {stack.map((item, idx) => (
              <div
                key={idx}
                className="glass-panel p-5 rounded-2xl border border-slate-800 text-center hover:border-cyan-500/40 transition-all duration-300 group"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} text-white mx-auto flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                  <Code2 className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white mb-0.5">{item.name}</h4>
                <p className="text-[11px] text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
