import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Sparkles, 
  Layers, 
  Zap, 
  ZoomIn, 
  SlidersHorizontal, 
  Download, 
  History, 
  BarChart3, 
  Cpu, 
  ShieldCheck, 
  SunMoon, 
  Smartphone 
} from 'lucide-react';

export default function Features() {
  const { t } = useTranslation();

  const featuresList = [
    {
      icon: Sparkles,
      title: 'AI Image Restoration',
      description: 'SwinIR deep transformer model trained specifically to eliminate sensor grain, E-beam shot noise, and lithography blur.',
      color: 'from-cyan-500 to-blue-600',
      badge: 'PyTorch Core',
    },
    {
      icon: Layers,
      title: 'Batch Image Processing',
      description: 'Upload and restore multiple 200mm/300mm wafer dies simultaneously with automated queue orchestration.',
      color: 'from-blue-500 to-indigo-600',
      badge: 'Parallel AI Queue',
    },
    {
      icon: Zap,
      title: 'Fast GPU Inference',
      description: 'Accelerated PyTorch CUDA execution yielding sub-150ms restoration times per high-resolution wafer frame.',
      color: 'from-amber-400 to-orange-500',
      badge: 'Tesla T4 Speed',
    },
    {
      icon: ZoomIn,
      title: 'Zoom & Pan Viewer',
      description: 'Interactive high-magnification inspector tool allowing microscopic analysis of silicon trace geometries.',
      color: 'from-emerald-400 to-teal-600',
      badge: 'Pixel Precision',
    },
    {
      icon: SlidersHorizontal,
      title: 'Before / After Comparison',
      description: 'Smooth interactive slider overlay comparing noisy raw sensor input directly against AI restored output.',
      color: 'from-purple-500 to-pink-600',
      badge: 'Real-time Slider',
    },
    {
      icon: Download,
      title: 'Download Results',
      description: 'Export restored high-res images in PNG, TIFF, JPG format or package full inspection runs as ZIP archives.',
      color: 'from-cyan-400 to-teal-500',
      badge: 'ZIP & High-Res Export',
    },
    {
      icon: History,
      title: 'Restoration History',
      description: 'Persistent audit trial storing past restoration metrics, original files, dates, and defect logs with quick search.',
      color: 'from-[#00F0FF] to-blue-500',
      badge: 'Full Audit Log',
    },
    {
      icon: BarChart3,
      title: 'PSNR & SSIM Analysis',
      description: 'Automated quantitative validation computing exact Peak Signal-to-Noise Ratio and Structural Similarity Index.',
      color: 'from-blue-600 to-cyan-400',
      badge: 'Scientific Metrics',
    },
    {
      icon: Cpu,
      title: 'Semiconductor Optimized',
      description: 'Tailored loss functions preserving sub-micron copper interconnect lines, gate contacts, and wafer alignment marks.',
      color: 'from-cyan-500 to-emerald-500',
      badge: 'Sub-Micron Preserved',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Processing',
      description: 'Enterprise-ready encrypted data pipeline ensuring proprietary IC designs remain fully confidential and isolated.',
      color: 'from-emerald-500 to-green-600',
      badge: 'SOC2 Ready',
    },
    {
      icon: SunMoon,
      title: 'Dark / Light Theme',
      description: 'Ultra-modern glassmorphic interface supporting seamless dark mode and clean daylight themes for cleanroom labs.',
      color: 'from-amber-400 to-cyan-500',
      badge: 'Cleanroom UI',
    },
    {
      icon: Smartphone,
      title: 'Responsive Design',
      description: 'Fluid responsive layout adapted for high-resolution 4K monitor workstations, tablets, and mobile devices.',
      color: 'from-indigo-500 to-purple-600',
      badge: 'Multi-Device',
    },
  ];

  return (
    <section id="features" className="py-24 relative z-10">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
            <span>{t('features.pill')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('features.titlePrefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{t('features.titleHighlight')}</span> {t('features.titleSuffix')}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {t('features.subtitle')}
          </p>
        </div>

        {/* 12 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl glass-panel p-6 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} text-slate-950 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span className="text-[10px] font-bold font-mono uppercase px-2.5 py-1 rounded-md bg-slate-900/90 text-cyan-400 border border-cyan-500/30">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="font-semibold">{t('features.explore')}</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
