import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  SlidersHorizontal, 
  Info, 
  Download, 
  Sparkles,
  Layers,
  Clock,
  ShieldCheck,
  Cpu,
  Move,
  Eye,
  X,
  Gauge,
  Activity
} from 'lucide-react';

export default function RestorationResults({ item, onDownload }) {
  const { t } = useTranslation();
  const [sliderPos, setSliderPos] = useState(50);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPos, setPanPos] = useState({ x: 0, y: 0 });
  const [isDraggingPan, setIsDraggingPan] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullResModal, setShowFullResModal] = useState(false);

  const containerRef = useRef(null);

  if (!item) return null;

  // Mouse wheel zoom
  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoomLevel((prev) => Math.min(prev + 0.25, 4));
    } else {
      setZoomLevel((prev) => Math.max(prev - 0.25, 1));
    }
  };

  // Double click reset
  const handleDoubleClick = () => {
    setZoomLevel(1);
    setPanPos({ x: 0, y: 0 });
  };

  // Zoom controls
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.5, 1));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanPos({ x: 0, y: 0 });
  };

  // Pan dragging logic
  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setIsDraggingPan(true);
      setDragStart({ x: e.clientX - panPos.x, y: e.clientY - panPos.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDraggingPan && zoomLevel > 1) {
      setPanPos({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => setIsDraggingPan(false);

  return (
    <div className={`space-y-6 transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-50 bg-[#0B0F19] p-6 overflow-auto' : ''}`}>
      
      {/* Top Inspector Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>{item.name}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {t('results.restored')}
              </span>
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              {t('results.defectType')} <span className="text-slate-200">{item.defectType || 'SEM Sensor Noise'}</span> | {t('results.date')} {item.date}
            </p>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex flex-wrap items-center gap-2">
          
          <div className="flex items-center bg-slate-900/90 rounded-xl p-1 border border-slate-800 text-xs">
            <button
              onClick={handleZoomOut}
              className="p-2 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-all"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            <span className="px-3 font-mono font-bold text-cyan-300 min-w-[50px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>

            <button
              onClick={handleZoomIn}
              className="p-2 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-all"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            <button
              onClick={handleResetZoom}
              className="p-2 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded-lg border-l border-slate-800 transition-all"
              title="Reset Zoom & Pan"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setShowFullResModal(true)}
            className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 text-xs font-semibold transition-all flex items-center gap-2"
          >
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>View Full Resolution</span>
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
            title={isFullscreen ? 'Exit Fullscreen' : t('results.fullscreen')}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => onDownload(item)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>{t('results.downloadImg')}</span>
          </button>

        </div>
      </div>

      {/* BEFORE / AFTER INTERACTIVE COMPARISON VIEWER */}
      <div 
        ref={containerRef}
        onWheel={handleWheel}
        onDoubleClick={handleDoubleClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative w-full h-[480px] sm:h-[540px] rounded-2xl glass-panel border border-slate-800 overflow-hidden cursor-crosshair select-none group"
      >
        
        {/* Container zoom & pan transform wrapper */}
        <div 
          className="w-full h-full relative transition-transform duration-75"
          style={{
            transform: `scale(${zoomLevel}) translate(${panPos.x / zoomLevel}px, ${panPos.y / zoomLevel}px)`,
            transformOrigin: 'center center',
          }}
        >
          {/* RIGHT: AFTER (RESTORED IMAGE) - FULL WIDTH BASE */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={item.restoredUrl} 
              alt="Restored Semiconductor Wafer" 
              className="w-full h-full object-contain bg-[#070A12]"
            />
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-cyan-500/20 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold shadow-lg flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Right: Restored Image (SemiconSwinIR)</span>
            </div>
          </div>

          {/* LEFT: BEFORE (ORIGINAL NOISY IMAGE) - CLIPPED BY SLIDER */}
          <div 
            className="absolute inset-y-0 left-0 h-full overflow-hidden border-r-2 border-cyan-400 shadow-[0_0_15px_#06b6d4]"
            style={{ width: `${sliderPos}%` }}
          >
            <img 
              src={item.noisyUrl} 
              alt="Original Noisy Raw SEM Inspection Image" 
              className="w-full h-full object-contain bg-[#090D16] min-w-full"
              style={{ width: containerRef.current ? containerRef.current.clientWidth : '100%' }}
            />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-300 text-xs font-mono font-bold shadow-lg">
              <span>Left: Original Image (Noisy SEM)</span>
            </div>
          </div>
        </div>

        {/* CENTER: SLIDER HANDLE BAR */}
        <div 
          className="absolute inset-y-0 z-30 pointer-events-none flex items-center justify-center"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-0.5 h-full bg-cyan-400 shadow-[0_0_12px_#06b6d4]"></div>
          <div className="absolute w-9 h-9 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shadow-2xl slider-handle pointer-events-auto cursor-ew-resize hover:scale-110 transition-transform">
            <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
          </div>
        </div>

        {/* Slider mouse drag trigger area overlay */}
        <input 
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={(e) => setSliderPos(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
        />

        {/* Hint helper */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-800 text-[11px] text-slate-300 font-mono flex items-center gap-2 pointer-events-none shadow-xl">
          <Move className="w-3.5 h-3.5 text-cyan-400" />
          <span>Drag slider to compare • Mouse Wheel Zoom ({Math.round(zoomLevel * 100)}%) • Click-drag Pan • Double-click reset</span>
        </div>

      </div>

      {/* METADATA / IMAGE INFORMATION GRID BELOW COMPARISON */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        
        {/* PSNR */}
        <div className="p-4 rounded-xl glass-panel border border-slate-800 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400">
            <Gauge className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-mono">PSNR</p>
            <p className="text-base font-extrabold font-mono text-cyan-400">{item.psnr} dB</p>
          </div>
        </div>

        {/* SSIM */}
        <div className="p-4 rounded-xl glass-panel border border-slate-800 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-mono">SSIM</p>
            <p className="text-base font-extrabold font-mono text-white">{item.ssim}</p>
          </div>
        </div>

        {/* NOISE REDUCTION % */}
        <div className="p-4 rounded-xl glass-panel border border-slate-800 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-mono">Noise Reduction %</p>
            <p className="text-base font-extrabold font-mono text-emerald-400">+{item.noiseReduction}%</p>
          </div>
        </div>

        {/* PROCESSING TIME */}
        <div className="p-4 rounded-xl glass-panel border border-slate-800 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-mono">Processing Time</p>
            <p className="text-base font-extrabold font-mono text-amber-400">{item.processingTime}</p>
          </div>
        </div>

        {/* MODEL USED */}
        <div className="p-4 rounded-xl glass-panel border border-slate-800 flex items-center gap-3 col-span-2 sm:col-span-1">
          <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-mono">Model Used</p>
            <p className="text-base font-extrabold font-mono text-cyan-300">SemiconSwinIR</p>
          </div>
        </div>

      </div>

      {/* FULL RESOLUTION INSPECTOR MODAL */}
      {showFullResModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white font-mono">{item.name} - Full Resolution Wafer Inspection</h3>
            </div>
            <button
              onClick={() => setShowFullResModal(false)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden">
            <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col justify-center items-center space-y-2">
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-mono">Original Noisy Input</span>
              <img src={item.noisyUrl} alt="Original" className="max-h-[80%] object-contain rounded-xl border border-slate-800" />
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col justify-center items-center space-y-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-xs font-mono font-bold">Restored Output (SemiconSwinIR)</span>
              <img src={item.restoredUrl} alt="Restored" className="max-h-[80%] object-contain rounded-xl border border-cyan-500/30 glow-box-cyan" />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
