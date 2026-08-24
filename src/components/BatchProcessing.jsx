import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Layers, 
  Play, 
  CheckCircle2, 
  Clock, 
  Download, 
  FileArchive, 
  Sparkles, 
  Loader2, 
  Trash2,
  Eye,
  RefreshCw
} from 'lucide-react';

export default function BatchProcessing({ 
  batchList, 
  onRunBatch, 
  isProcessingBatch, 
  onViewItem, 
  onDownloadSingle, 
  onDownloadZip,
  onClearBatch
}) {
  const { t } = useTranslation();
  const completedCount = batchList.filter((item) => item.status === 'Completed').length;
  const totalCount = batchList.length;

  return (
    <div className="space-y-6">
      
      {/* Batch Control Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 glass-panel p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              <span>{t('batch.title')}</span>
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              {completedCount} / {totalCount} {t('batch.restoredCount')}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {t('batch.sub')}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {batchList.length > 0 && (
            <button
              onClick={onClearBatch}
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 text-xs font-semibold transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>{t('batch.clear')}</span>
            </button>
          )}

          {completedCount > 0 && (
            <button
              onClick={onDownloadZip}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 hover:text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/10"
            >
              <FileArchive className="w-4 h-4 text-cyan-400" />
              <span>{t('batch.downloadZip')}</span>
            </button>
          )}

          <button
            onClick={onRunBatch}
            disabled={isProcessingBatch || completedCount === totalCount || totalCount === 0}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            {isProcessingBatch ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>{t('batch.processing')}</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current text-white" />
                <span>{t('batch.startBatch')}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Batch Items Queue Table / Cards */}
      {totalCount === 0 ? (
        <div className="glass-panel p-12 rounded-2xl border border-slate-800 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 mx-auto flex items-center justify-center border border-cyan-500/20">
            <Layers className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-white">{t('batch.emptyTitle')}</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {t('batch.emptySub')}
          </p>
        </div>
      ) : (
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3.5">{t('batch.colPos')}</th>
                  <th className="px-4 py-3.5">{t('batch.colFile')}</th>
                  <th className="px-4 py-3.5">{t('batch.colStatus')}</th>
                  <th className="px-4 py-3.5">{t('batch.colProgress')}</th>
                  <th className="px-4 py-3.5">{t('batch.colPsnr')}</th>
                  <th className="px-4 py-3.5">{t('batch.colProcTime')}</th>
                  <th className="px-4 py-3.5 text-right">{t('batch.colActions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {batchList.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    
                    {/* Position */}
                    <td className="px-4 py-4 text-slate-400 font-bold">
                      #{idx + 1}
                    </td>

                    {/* Image Name & Thumbnail */}
                    <td className="px-4 py-4 font-sans font-medium text-slate-200">
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.restoredUrl || item.noisyUrl} 
                          alt="Wafer preview" 
                          className="w-9 h-9 rounded-lg object-cover bg-slate-900 border border-slate-800 shrink-0"
                        />
                        <div className="truncate max-w-[200px]">
                          <p className="truncate font-semibold text-white text-xs">{item.name}</p>
                          <p className="text-[10px] text-slate-400">{item.resolution}</p>
                        </div>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-4 py-4">
                      {item.status === 'Completed' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                          <CheckCircle2 className="w-3 h-3" />
                          Completed
                        </span>
                      ) : item.status === 'Processing' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px] font-bold">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          Processing
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 text-slate-400 text-[10px] font-bold">
                          <Clock className="w-3 h-3" />
                          Queued
                        </span>
                      )}
                    </td>

                    {/* Progress Bar */}
                    <td className="px-4 py-4 w-44">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-slate-400">{item.status === 'Completed' ? '100%' : item.status === 'Processing' ? '65%' : '0%'}</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-1.5 rounded-full transition-all duration-500 ${
                              item.status === 'Completed'
                                ? 'bg-emerald-400'
                                : item.status === 'Processing'
                                ? 'bg-cyan-400 shimmer-effect'
                                : 'bg-slate-700'
                            }`}
                            style={{
                              width: item.status === 'Completed' ? '100%' : item.status === 'Processing' ? '65%' : '0%'
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    {/* PSNR / SSIM */}
                    <td className="px-4 py-4">
                      {item.status === 'Completed' ? (
                        <div>
                          <p className="text-cyan-400 font-bold">{item.psnr} dB</p>
                          <p className="text-slate-400 text-[10px]">SSIM {item.ssim}</p>
                        </div>
                      ) : (
                        <span className="text-slate-500">-</span>
                      )}
                    </td>

                    {/* Processing Time */}
                    <td className="px-4 py-4 text-slate-300">
                      {item.status === 'Completed' ? item.processingTime : item.status === 'Processing' ? 'Calculating...' : 'Pending'}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {item.status === 'Completed' && (
                          <>
                            <button
                              onClick={() => onViewItem(item)}
                              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-400 transition-colors"
                              title="Inspect in Slider Viewer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onDownloadSingle(item)}
                              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                              title="Download Restored Image"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
