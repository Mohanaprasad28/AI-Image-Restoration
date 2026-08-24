import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Gauge, Activity, Zap, ShieldCheck, Award, TrendingUp, Sparkles } from 'lucide-react';

export default function QualityMetrics({ item }) {
  const { t } = useTranslation();
  const psnr = item ? item.psnr : 26.2;
  const psnrBefore = item ? item.psnrBefore : 17.8;
  const ssim = item ? item.ssim : 0.68;
  const ssimBefore = item ? item.ssimBefore : 0.38;
  const inferenceTime = item ? item.processingTime : '138 ms';
  const confidence = item ? item.confidence : 98.9;
  const rating = item ? item.qualityRating : 'A+ Excellent';

  // Animated counters simulation state
  const [animatedPsnr, setAnimatedPsnr] = useState(0);
  const [animatedSsim, setAnimatedSsim] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const steps = 30;
    const intervalTime = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setAnimatedPsnr(parseFloat((psnr * progress).toFixed(2)));
      setAnimatedSsim(parseFloat((ssim * progress).toFixed(3)));

      if (currentStep >= steps) {
        setAnimatedPsnr(psnr);
        setAnimatedSsim(ssim);
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [psnr, ssim]);

  return (
    <div className="space-y-6">
      
      {/* Metrics Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Gauge className="w-5 h-5 text-cyan-400" />
            <span>{t('metrics.title')}</span>
          </h3>
          <p className="text-xs text-slate-400">
            {t('metrics.sub')}
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          {t('metrics.iso')}
        </span>
      </div>

      {/* 5 Cards Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* CARD 1: PSNR */}
        <div className="rounded-2xl glass-panel p-5 border border-slate-800 hover:border-cyan-500/40 transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase font-mono">{t('metrics.psnr')}</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Gauge className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-3xl font-extrabold font-mono text-cyan-400">
              {animatedPsnr}
            </span>
            <span className="text-sm font-semibold text-slate-400">dB</span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono mt-2 pt-2 border-t border-slate-800">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{(psnr - psnrBefore).toFixed(2)} dB {t('metrics.psnrGain')}</span>
          </div>

          <div className="mt-2 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1.5 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min((psnr / 40) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* CARD 2: SSIM */}
        <div className="rounded-2xl glass-panel p-5 border border-slate-800 hover:border-cyan-500/40 transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase font-mono">{t('metrics.ssim')}</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Activity className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-3xl font-extrabold font-mono text-white">
              {animatedSsim}
            </span>
            <span className="text-xs text-slate-400 font-mono">/ 1.0</span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono mt-2 pt-2 border-t border-slate-800">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{(ssim - ssimBefore).toFixed(3)} {t('metrics.ssimGain')}</span>
          </div>

          <div className="mt-2 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full transition-all duration-1000"
              style={{ width: `${ssim * 100}%` }}
            ></div>
          </div>
        </div>

        {/* CARD 3: INFERENCE TIME */}
        <div className="rounded-2xl glass-panel p-5 border border-slate-800 hover:border-cyan-500/40 transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase font-mono">{t('metrics.inference')}</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Zap className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-3xl font-extrabold font-mono text-amber-400">
              {inferenceTime}
            </span>
          </div>

          <div className="text-[11px] text-slate-400 font-mono mt-2 pt-2 border-t border-slate-800">
            Tesla T4 CUDA Accelerated
          </div>

          <div className="mt-2 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-amber-400 h-1.5 rounded-full w-4/5"></div>
          </div>
        </div>

        {/* CARD 4: CONFIDENCE SCORE */}
        <div className="rounded-2xl glass-panel p-5 border border-slate-800 hover:border-cyan-500/40 transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase font-mono">{t('metrics.confidence')}</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-3xl font-extrabold font-mono text-emerald-400">
              {confidence}%
            </span>
          </div>

          <div className="text-[11px] text-emerald-400 font-mono mt-2 pt-2 border-t border-slate-800">
            {t('metrics.confidenceSub')}
          </div>

          <div className="mt-2 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-emerald-400 h-1.5 rounded-full transition-all duration-1000"
              style={{ width: `${confidence}%` }}
            ></div>
          </div>
        </div>

        {/* CARD 5: QUALITY RATING */}
        <div className="rounded-2xl glass-panel p-5 border border-slate-800 hover:border-cyan-500/40 transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase font-mono">{t('metrics.rating')}</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Award className="w-4 h-4" />
            </div>
          </div>

          <div className="mb-1">
            <span className="text-xl font-extrabold font-mono text-purple-300">
              {rating}
            </span>
          </div>

          <div className="text-[11px] text-slate-400 font-mono mt-2 pt-2 border-t border-slate-800">
            {t('metrics.ratingSub')}
          </div>

          <div className="mt-2 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-purple-500 h-1.5 rounded-full w-full"></div>
          </div>
        </div>

      </div>

    </div>
  );
}
