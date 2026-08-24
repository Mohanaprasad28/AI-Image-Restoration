import React, { useState } from 'react';
import { X, Settings, Server, Cpu, Sliders, ShieldCheck, Check } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose, onShowToast }) {
  const [apiHost, setApiHost] = useState('http://localhost:8000');
  const [device, setDevice] = useState('cuda:0');
  const [precision, setPrecision] = useState('FP16');
  const [sensitivity, setSensitivity] = useState(0.85);

  if (!isOpen) return null;

  const handleSave = () => {
    onShowToast?.('Settings updated & applied to FastAPI engine', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg glass-panel p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">System Configuration</h3>
              <p className="text-xs text-slate-400">FastAPI backend & PyTorch inference settings</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Options */}
        <div className="space-y-4 text-xs">
          
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-300 font-mono">FASTAPI BACKEND ENDPOINT</label>
            <div className="relative">
              <Server className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={apiHost}
                onChange={(e) => setApiHost(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 font-mono text-cyan-400 focus:outline-none focus:border-cyan-500/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300 font-mono">CUDA DEVICE TARGET</label>
              <select
                value={device}
                onChange={(e) => setDevice(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 font-mono text-white focus:outline-none"
              >
                <option value="cuda:0">NVIDIA Tesla T4 (cuda:0)</option>
                <option value="cpu">CPU (Fallback PyTorch)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300 font-mono">MODEL PRECISION</label>
              <select
                value={precision}
                onChange={(e) => setPrecision(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 font-mono text-white focus:outline-none"
              >
                <option value="FP16">FP16 (Half Precision - 2x Speed)</option>
                <option value="FP32">FP32 (Single Precision)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between">
              <label className="font-semibold text-slate-300 font-mono">NOISE REDUCTION SENSITIVITY</label>
              <span className="font-mono text-cyan-400 font-bold">{sensitivity}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={sensitivity}
              onChange={(e) => setSensitivity(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

        </div>

        {/* Action */}
        <button
          onClick={handleSave}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          <span>Save System Settings</span>
        </button>

      </div>
    </div>
  );
}
