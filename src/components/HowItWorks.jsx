import React from 'react';
import { useTranslation } from 'react-i18next';
import { UploadCloud, Cpu, Gauge, Download, ArrowRight } from 'lucide-react';

export default function HowItWorks({ onTryRestoration }) {
  const { t } = useTranslation();

  const steps = [
    {
      number: '01',
      title: t('how.step1Title'),
      subtitle: t('how.step1Sub'),
      description: t('how.step1Desc'),
      icon: UploadCloud,
      color: 'from-cyan-500 to-blue-500',
    },
    {
      number: '02',
      title: t('how.step2Title'),
      subtitle: t('how.step2Sub'),
      description: t('how.step2Desc'),
      icon: Cpu,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      number: '03',
      title: t('how.step3Title'),
      subtitle: t('how.step3Sub'),
      description: t('how.step3Desc'),
      icon: Gauge,
      color: 'from-indigo-600 to-purple-600',
    },
    {
      number: '04',
      title: t('how.step4Title'),
      subtitle: t('how.step4Sub'),
      description: t('how.step4Desc'),
      icon: Download,
      color: 'from-purple-600 to-cyan-400',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 relative z-10 bg-slate-950/40 border-y border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
            <span>{t('how.pill')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('how.titlePrefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{t('how.titleHighlight')}</span> {t('how.titleSuffix')}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {t('how.subtitle')}
          </p>
        </div>

        {/* Workflow Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative group">
                
                {/* Connecting Arrow for Desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-14 -right-5 z-20 text-cyan-500/40 group-hover:text-cyan-400 transition-colors">
                    <ArrowRight className="w-6 h-6 animate-pulse" />
                  </div>
                )}

                <div className="rounded-2xl glass-panel p-6 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col justify-between">
                  <div>
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl font-extrabold font-mono text-slate-600 group-hover:text-cyan-400 transition-colors">
                        {step.number}
                      </span>
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${step.color} text-white shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 stroke-[2.2]" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1">
                      {step.title}
                    </h3>

                    <p className="text-xs font-semibold text-cyan-400 mb-3 font-mono">
                      {step.subtitle}
                    </p>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                    <span>Step {step.number} Verified</span>
                  </div>
                </div>

              </div>
            );
          })}

        </div>

        {/* Bottom Call to action button */}
        <div className="mt-16 text-center">
          <button
            onClick={onTryRestoration}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-200 inline-flex items-center gap-3"
          >
            <span>{t('how.cta')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
