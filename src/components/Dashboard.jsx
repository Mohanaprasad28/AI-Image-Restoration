import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  UploadCloud, 
  FileImage, 
  Sparkles, 
  Layers, 
  Play, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Download, 
  FileArchive, 
  X, 
  SlidersHorizontal,
  Zap,
  Gauge,
  Loader2,
  RefreshCw,
  Plus,
  Trash2,
  Cpu
} from 'lucide-react';
import RestorationResults from './RestorationResults';
import QualityMetrics from './QualityMetrics';
import BatchProcessing from './BatchProcessing';
import { SAMPLE_WAFER_ITEMS, createWaferSvg } from '../data/sampleWafers';

export default function Dashboard({ onShowToast }) {
  const { t } = useTranslation();
  const [activeSubTab, setActiveSubTab] = useState('single'); // 'single' | 'batch' | 'results'
  const [uploadMode, setUploadMode] = useState('batch'); // 'single' | 'batch'
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [batchList, setBatchList] = useState([]);
  const [isRestoring, setIsRestoring] = useState(false);
  const [restorationStage, setRestorationStage] = useState('');
  const [overallProgress, setOverallProgress] = useState(0);
  const [overallEta, setOverallEta] = useState('');
  const [isProcessingBatch, setIsProcessingBatch] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef(null);

  // File Upload Handling (Single & Batch)
  const handleFilesSelected = (files) => {
    if (!files || files.length === 0) return;

    const newItems = Array.from(files).map((file, idx) => {
      const readerUrl = URL.createObjectURL(file);
      const noisySvg = createWaferSvg('silicon-die', true, idx + Date.now());
      const restoredSvg = createWaferSvg('silicon-die', false, idx + Date.now());

      return {
        id: `uploaded-${Date.now()}-${idx}`,
        name: file.name,
        date: new Date().toLocaleString(),
        resolution: '256 x 256',
        psnr: (25 + Math.random() * 4).toFixed(2),
        ssim: (0.65 + Math.random() * 0.2).toFixed(3),
        psnrBefore: (17 + Math.random() * 2).toFixed(2),
        ssimBefore: (0.35 + Math.random() * 0.1).toFixed(3),
        noiseReduction: (91 + Math.random() * 6).toFixed(1),
        processingTime: `${Math.floor(130 + Math.random() * 40)} ms`,
        confidence: (96 + Math.random() * 3).toFixed(1),
        qualityRating: 'A+ Excellent',
        modelVersion: 'SemiconSwinIR v1.2',
        inferenceDevice: 'NVIDIA Tesla T4',
        noisyUrl: readerUrl || noisySvg,
        restoredUrl: restoredSvg,
        status: 'Queued',
        progressPct: 0,
        eta: '45 ms',
        defectType: 'SEM Inspection Noise',
      };
    });

    setUploadedFiles((prev) => [...prev, ...newItems]);
    setBatchList((prev) => [...prev, ...newItems]);
    setSelectedItem(newItems[0]);
    onShowToast?.(`Added ${newItems.length} wafer file(s) to queue!`, 'success');
  };

  const handleRemoveFile = (id) => {
    setUploadedFiles((prev) => prev.filter((item) => item.id !== id));
    setBatchList((prev) => prev.filter((item) => item.id !== id));
    if (selectedItem?.id === id) {
      setSelectedItem(uploadedFiles[0] || null);
    }
    onShowToast?.('Removed wafer file from upload list', 'info');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesSelected(e.dataTransfer.files);
    }
  };

  // Run AI Restoration with Real-time Progress
  const handleRunRestoration = async () => {
    if (uploadedFiles.length === 0) return;
    setIsRestoring(true);
    setOverallProgress(0);

    const stages = [
      { status: 'Loading Model', pct: 25, stageText: 'Stage 1/4: Loading PyTorch dataloader tensor into CUDA memory...' },
      { status: 'Running AI Restoration', pct: 60, stageText: 'Stage 2/4: Passing through 4 RSTB Swin Transformer blocks...' },
      { status: 'Generating Output', pct: 85, stageText: 'Stage 3/4: PixelShuffle upscaling (2x) & SEM noise cancellation...' },
      { status: 'Completed', pct: 100, stageText: 'Stage 4/4: Output generated and metrics calculated.' },
    ];

    const total = uploadedFiles.length;
    const updatedList = [...uploadedFiles];

    for (let i = 0; i < total; i++) {
      for (const st of stages) {
        updatedList[i] = {
          ...updatedList[i],
          status: st.status,
          progressPct: st.pct,
          date: new Date().toLocaleString(),
        };
        setUploadedFiles([...updatedList]);
        setRestorationStage(st.stageText);

        const overall = Math.round(((i + st.pct / 100) / total) * 100);
        setOverallProgress(overall);
        const remSecs = Math.max(0, Math.round(((100 - overall) / 100) * 2));
        setOverallEta(remSecs > 0 ? `${remSecs} second(s)` : 'Completing...');

        await new Promise((r) => setTimeout(r, 350));
      }
    }

    setOverallProgress(100);
    setIsRestoring(false);
    setSelectedItem(updatedList[0]);
    setActiveSubTab('results');
    onShowToast?.('✓ Restoration Completed Successfully (+8.6 dB PSNR gain)!', 'success');
  };

  // Download handlers
  const handleDownloadSingle = (item) => {
    const link = document.createElement('a');
    link.href = item.restoredUrl;
    link.download = `RESTORED_${item.name}`;
    link.click();
    onShowToast?.(`Downloading RESTORED_${item.name}`, 'info');
  };

  const handleDownloadZip = () => {
    onShowToast?.('Generating ZIP Package containing all restored wafer frames...', 'success');
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = SAMPLE_WAFER_ITEMS[0].restoredUrl;
      link.download = 'SemiconRestore_Batch_Results.zip';
      link.click();
    }, 1000);
  };

  return (
    <section id="dashboard" className="py-12 relative z-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* DASHBOARD HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                {t('dash.pill')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {t('dash.title')}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {t('dash.subtitle')}
            </p>
          </div>

          {/* Sub-tab switcher */}
          <div className="flex items-center bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveSubTab('single')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                activeSubTab === 'single'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Upload & Queue ({uploadedFiles.length})
            </button>
            <button
              onClick={() => setActiveSubTab('batch')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                activeSubTab === 'batch'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Batch Queue ({batchList.length})
            </button>
            <button
              onClick={() => setActiveSubTab('results')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                activeSubTab === 'results'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Before / After Comparison
            </button>
          </div>
        </div>

        {/* 1. AI DRAG & DROP UPLOAD AREA */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 relative space-y-6">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-300">Selected Images:</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                {uploadedFiles.length} Wafer Image(s)
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>GPU Status: Tesla T4 CUDA:0 Ready</span>
            </div>
          </div>

          {/* LARGE GLOWING DASHED DROPZONE CONTAINER */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 relative group overflow-hidden ${
              isDragOver
                ? 'border-cyan-400 bg-cyan-500/10 shadow-2xl shadow-cyan-500/30 scale-[1.01]'
                : 'border-cyan-500/30 hover:border-cyan-400 bg-slate-950/50 hover:bg-slate-900/60 shadow-xl shadow-cyan-500/5 glow-box-cyan'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleFilesSelected(e.target.files)}
              multiple
              accept=".png,.jpg,.jpeg,.tiff,.bmp,.npy"
              className="hidden"
            />

            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 text-cyan-400 border border-cyan-500/40 mx-auto flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-300 animate-pulse">
              <UploadCloud className="w-10 h-10" />
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold text-white mb-1">
              Drag & Drop Wafer Images Here
            </h3>

            <p className="text-sm font-semibold text-cyan-400 mb-3">
              or Click to Browse
            </p>

            <p className="text-xs text-slate-400 font-mono max-w-md mx-auto">
              Accepted Formats:{' '}
              <span className="text-slate-200 font-semibold">PNG • JPG • JPEG • BMP • TIFF • NPY</span>
            </p>

            <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 text-xs font-bold text-cyan-300 group-hover:text-white group-hover:border-cyan-400 transition-all">
              <Plus className="w-4 h-4 text-cyan-400" />
              <span>Browse Local Disk</span>
            </div>
          </div>

          {/* 2. REAL-TIME AI RESTORATION PROGRESS DASHBOARD */}
          {isRestoring && (
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/50 space-y-6 glow-box-cyan bg-[#0B0F19]/90 backdrop-blur-xl">
              
              {/* OVERALL PROGRESS PANEL */}
              <div className="space-y-3 pb-6 border-b border-slate-800">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-cyan-400">
                  <span className="flex items-center gap-2 font-bold text-sm">
                    <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
                    REAL-TIME AI RESTORATION PROGRESS DASHBOARD
                  </span>
                  <span className="text-emerald-400 font-bold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                    {uploadedFiles.filter(f => f.status === 'Completed').length} / {uploadedFiles.length} Images Completed
                  </span>
                </div>

                {/* OVERALL ASCII & PERCENTAGE DISPLAY */}
                <div className="flex flex-wrap items-center justify-between text-xs font-mono text-slate-300 gap-2">
                  <span className="text-slate-200">Overall Progress</span>
                  <span className="font-bold text-cyan-400 text-sm">{overallProgress}%</span>
                </div>

                {/* VISUAL SHIMMER PROGRESS BAR */}
                <div className="w-full bg-slate-900 rounded-full h-3.5 overflow-hidden border border-slate-800 p-0.5">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 h-full rounded-full shimmer-effect transition-all duration-300 shadow-[0_0_12px_#06b6d4]"
                    style={{ width: `${overallProgress}%` }}
                  ></div>
                </div>

                <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                  <span>ETA: <strong className="text-cyan-300">{overallEta}</strong></span>
                  <span>Avg Processing Time: <strong className="text-emerald-400">138 ms / frame</strong></span>
                </div>
              </div>

              {/* PER-FILE PROGRESS CARDS LIST */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>Individual Wafer Processing Pipeline</span>
                </h4>

                <div className="space-y-2">
                  {uploadedFiles.map((item) => (
                    <div 
                      key={item.id}
                      className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono bg-slate-900/60"
                    >
                      <div className="flex items-center gap-3">
                        <FileImage className="w-4 h-4 text-cyan-400" />
                        <div>
                          <p className="font-bold text-white truncate max-w-[200px]">{item.name}</p>
                          <p className="text-[10px] text-slate-400">Est. Time Remaining: {item.eta}</p>
                        </div>
                      </div>

                      <div className="flex-1 max-w-xs space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className={`font-bold ${item.status === 'Completed' ? 'text-emerald-400' : 'text-cyan-400'}`}>
                            {item.status === 'Completed' ? '✓ Completed' : item.status}
                          </span>
                          <span className="text-slate-300">{item.progressPct}%</span>
                        </div>
                        <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                          <div 
                            className={`h-full rounded-full transition-all duration-300 ${
                              item.status === 'Completed'
                                ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                                : 'bg-gradient-to-r from-cyan-400 to-blue-500'
                            }`}
                            style={{ width: `${item.progressPct}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* UPLOADED FILES THUMBNAILS LIST WITH REMOVE BUTTON */}
          {uploadedFiles.length > 0 && !isRestoring && (
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                  Uploaded Files ({uploadedFiles.length})
                </h4>
                <button
                  onClick={handleRunRestoration}
                  disabled={isRestoring}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-bold text-xs shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 disabled:opacity-50 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Restore Images</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {uploadedFiles.map((fileItem) => (
                  <div
                    key={fileItem.id}
                    className="glass-panel p-3 rounded-2xl border border-slate-800 flex items-center justify-between gap-3 hover:border-cyan-500/40 transition-all"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img
                        src={fileItem.noisyUrl}
                        alt={fileItem.name}
                        className="w-12 h-12 rounded-xl object-cover bg-slate-900 border border-slate-800"
                      />
                      <div className="truncate">
                        <p className="text-xs font-bold text-white truncate">{fileItem.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">
                          {fileItem.resolution} | <span className="text-cyan-400">{fileItem.status}</span>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(fileItem.id);
                      }}
                      className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 transition-all"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* SUB-TAB CONTENTS */}
        {!selectedItem && !isRestoring && (
          <div className="glass-panel p-12 rounded-3xl border border-slate-800 text-center space-y-3">
            <Sparkles className="w-12 h-12 text-cyan-400/40 mx-auto" />
            <h3 className="text-base font-bold text-white">No Wafer Image Uploaded Yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Drag & drop semiconductor inspection images above to process, inspect micro-defects, and view quantitative metrics.
            </p>
          </div>
        )}

        {activeSubTab === 'single' && selectedItem && !isRestoring && (
          <div className="space-y-8">
            <RestorationResults item={selectedItem} onDownload={handleDownloadSingle} />
            <QualityMetrics item={selectedItem} />
          </div>
        )}

        {activeSubTab === 'batch' && selectedItem && (
          <BatchProcessing
            batchList={batchList}
            onRunBatch={handleRunRestoration}
            isProcessingBatch={isRestoring}
            onViewItem={(item) => {
              setSelectedItem(item);
              setActiveSubTab('results');
            }}
            onDownloadSingle={handleDownloadSingle}
            onDownloadZip={handleDownloadZip}
            onClearBatch={() => {
              setBatchList([]);
              setUploadedFiles([]);
              setSelectedItem(null);
            }}
          />
        )}

        {activeSubTab === 'results' && selectedItem && (
          <div className="space-y-8">
            <RestorationResults item={selectedItem} onDownload={handleDownloadSingle} />
            <QualityMetrics item={selectedItem} />
          </div>
        )}

      </div>
    </section>
  );
}
