import React from 'react';
import { X, Keyboard } from 'lucide-react';

export default function ShortcutsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Ctrl + Enter', desc: 'Run AI Restoration on active file' },
    { key: 'Ctrl + B', desc: 'Switch to Batch Processing Queue' },
    { key: 'Ctrl + D', desc: 'Download Restored Image / ZIP' },
    { key: 'Ctrl + S', desc: 'Open System Settings' },
    { key: 'Esc', desc: 'Close open modals / Reset Inspector Zoom' },
    { key: '?', desc: 'Toggle keyboard shortcuts menu' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md glass-panel p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Keyboard Shortcuts</h3>
              <p className="text-xs text-slate-400">Cleanroom productivity commands</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {shortcuts.map((sc, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs"
            >
              <span className="text-slate-300 font-medium">{sc.desc}</span>
              <kbd className="px-2.5 py-1 rounded bg-slate-950 border border-slate-700 text-cyan-400 font-mono font-bold text-[11px]">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
