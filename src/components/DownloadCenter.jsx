import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Download, 
  FileArchive, 
  FileSpreadsheet, 
  FileText, 
  Sparkles, 
  CheckCircle2,
  Package,
  ShieldCheck
} from 'lucide-react';

export default function DownloadCenter({ onDownloadZip, onShowToast }) {
  const { t } = useTranslation();

  const downloadOptions = [
    {
      title: 'Single Wafer Image Export',
      description: 'Export enhanced 256x256 / 512x512 restored inspection output in uncompressed 16-bit PNG or TIFF.',
      format: 'PNG / TIFF / JPG',
      icon: Download,
      color: 'from-cyan-500 to-blue-500',
      actionText: 'Export Selected Image',
      action: () => onShowToast?.('Exporting selected wafer image', 'info'),
    },
    {
      title: 'Batch Inspection Package',
      description: 'Bundle all active batch queue wafer files, metadata manifests, and restored maps into a single ZIP archive.',
      format: 'ZIP Package (.zip)',
      icon: FileArchive,
      color: 'from-blue-500 to-indigo-600',
      actionText: 'Download Full ZIP',
      action: onDownloadZip,
    },
    {
      title: 'Quality Metrics Audit CSV',
      description: 'Download full numerical PSNR (dB), SSIM, noise reduction percentage, and CUDA inference timing data.',
      format: 'Comma Separated Values (.csv)',
      icon: FileSpreadsheet,
      color: 'from-emerald-400 to-teal-600',
      actionText: 'Export Metrics CSV',
      action: () => onShowToast?.('Downloading Quality Metrics CSV', 'success'),
    },
    {
      title: 'Model Inspection PDF Report',
      description: 'Generate formatted deep learning QA report containing model specs, SwinIR architecture layers, and benchmarks.',
      format: 'PDF Document (.pdf)',
      icon: FileText,
      color: 'from-purple-500 to-pink-600',
      actionText: 'Generate Model PDF',
      action: () => onShowToast?.('Generating Model Technical Report PDF...', 'info'),
    },
  ];

  return (
    <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-6">
      
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-cyan-400" />
            <span>{t('download.title')}</span>
          </h3>
          <p className="text-xs text-slate-400">
            {t('download.sub')}
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          Cleanroom Certified
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {downloadOptions.map((opt, idx) => {
          const Icon = opt.icon;
          return (
            <div
              key={idx}
              className="rounded-xl glass-card p-6 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${opt.color} text-white shadow-md`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-slate-900 text-cyan-300 border border-slate-800">
                    {opt.format}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white mb-2">{opt.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{opt.description}</p>
              </div>

              <button
                onClick={opt.action}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-cyan-500/20 border border-slate-800 hover:border-cyan-500/40 text-cyan-300 font-semibold text-xs transition-all flex items-center justify-center gap-2"
              >
                <span>{opt.actionText}</span>
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
}
