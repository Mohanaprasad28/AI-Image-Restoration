import React from 'react';
import { useTranslation } from 'react-i18next';
import { Cpu, Layers, Database, Gauge, Activity, Zap, CheckCircle2, Terminal } from 'lucide-react';
import { MODEL_METRICS_BENCHMARK } from '../data/sampleWafers';

export default function ModelInfo() {
  const { t } = useTranslation();

  const specs = [
    { label: 'Model Name', value: MODEL_METRICS_BENCHMARK.modelName, icon: Cpu, color: 'text-cyan-400' },
    { label: 'Architecture', value: 'SwinIR Transformer', icon: Layers, color: 'text-blue-400' },
    { label: 'Framework', value: MODEL_METRICS_BENCHMARK.framework, icon: Terminal, color: 'text-indigo-400' },
    { label: 'Training Dataset', value: MODEL_METRICS_BENCHMARK.trainingDataset, icon: Database, color: 'text-emerald-400' },
    { label: 'Training Epochs', value: `${MODEL_METRICS_BENCHMARK.epochs} Epochs`, icon: Activity, color: 'text-purple-400' },
    { label: 'Inference GPU', value: MODEL_METRICS_BENCHMARK.gpu, icon: Zap, color: 'text-amber-400' },
    { label: 'Average PSNR', value: MODEL_METRICS_BENCHMARK.avgPsnr, icon: Gauge, color: 'text-cyan-400' },
    { label: 'Average SSIM', value: MODEL_METRICS_BENCHMARK.avgSsim, icon: CheckCircle2, color: 'text-emerald-400' },
  ];

  return (
    <section id="model-info" className="py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                {t('model.pill')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {t('model.title')}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {t('model.sub')}
            </p>
          </div>
        </div>

        {/* 8 Specs Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">PARAM #{idx+1}</span>
                </div>

                <p className="text-xs font-semibold text-slate-400 uppercase font-mono mb-1">{item.label}</p>
                <p className="text-xl font-extrabold text-white font-mono">{item.value}</p>
              </div>
            );
          })}
        </div>

        {/* HYPERPARAMETERS ARCHITECTURE SUMMARY PANEL */}
        <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span>Neural Network Configuration Parameters (config.py)</span>
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">RSTB BLOCK DEPTHS</span>
              <span className="text-cyan-300 font-bold text-sm">[6, 6, 6, 6]</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">ATTENTION HEADS</span>
              <span className="text-cyan-300 font-bold text-sm">[6, 6, 6, 6]</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">WINDOW SIZE</span>
              <span className="text-cyan-300 font-bold text-sm">8 x 8</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">EMBEDDING DIMENSION</span>
              <span className="text-cyan-300 font-bold text-sm">60</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
