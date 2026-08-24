import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  Legend
} from 'recharts';
import { Activity, BarChart3, TrendingUp, Cpu, Gauge, Zap } from 'lucide-react';

export default function LiveAnalytics() {
  const { t } = useTranslation();

  // Training Loss curve over 5 epochs
  const lossData = [
    { epoch: 'Epoch 1', trainLoss: 0.0482, valLoss: 0.0512 },
    { epoch: 'Epoch 2', trainLoss: 0.0295, valLoss: 0.0310 },
    { epoch: 'Epoch 3', trainLoss: 0.0184, valLoss: 0.0198 },
    { epoch: 'Epoch 4', trainLoss: 0.0121, valLoss: 0.0135 },
    { epoch: 'Epoch 5', trainLoss: 0.0086, valLoss: 0.0094 },
  ];

  // PSNR & SSIM improvement curves over epochs
  const metricData = [
    { epoch: 'Epoch 1', psnr: 19.4, ssim: 0.45 },
    { epoch: 'Epoch 2', psnr: 22.1, ssim: 0.54 },
    { epoch: 'Epoch 3', psnr: 24.5, ssim: 0.62 },
    { epoch: 'Epoch 4', psnr: 25.8, ssim: 0.66 },
    { epoch: 'Epoch 5', psnr: 26.2, ssim: 0.68 },
  ];

  // Restoration time per resolution
  const timeData = [
    { res: '128 x 128', time: 64 },
    { res: '256 x 256', time: 138 },
    { res: '512 x 512', time: 285 },
    { res: '1024 x 1024', time: 610 },
  ];

  // Dataset distribution pie chart
  const pieData = [
    { name: 'Silicon Substrate (200mm)', value: 1200, color: '#06B6D4' },
    { name: 'EUV Mask Reticle (300mm)', value: 950, color: '#3B82F6' },
    { name: 'Copper Interconnect Dies', value: 650, color: '#6366F1' },
    { name: 'Gallium Nitride (GaN)', value: 400, color: '#10B981' },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-3 rounded-xl border border-slate-800 text-xs font-mono space-y-1 shadow-2xl">
          <p className="font-bold text-white">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: <span className="font-bold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section id="analytics" className="py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                {t('analytics.pill')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {t('analytics.title')}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {t('analytics.sub')}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-slate-900/90 px-3.5 py-2 rounded-xl border border-slate-800">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Tesla T4 • PyTorch 2.4.0</span>
          </div>
        </div>

        {/* 2x2 CHARTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* CHART 1: TRAINING LOSS */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span>{t('analytics.chart1Title')}</span>
                </h3>
                <p className="text-xs text-slate-400">{t('analytics.chart1Sub')}</p>
              </div>
              <span className="text-xs font-mono text-cyan-400">Final Loss: 0.0086</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lossData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="epoch" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="trainLoss" name="Train Loss" stroke="#06B6D4" strokeWidth={2.5} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="valLoss" name="Val Loss" stroke="#3B82F6" strokeWidth={2.5} strokeDasharray="4 4" dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CHART 2: PSNR & SSIM IMPROVEMENT */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-blue-400" />
                  <span>{t('analytics.chart2Title')}</span>
                </h3>
                <p className="text-xs text-slate-400">{t('analytics.chart2Sub')}</p>
              </div>
              <span className="text-xs font-mono text-emerald-400">Peak PSNR: 26.2 dB</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={metricData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="epoch" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis yAxisId="left" stroke="#06B6D4" tick={{ fontSize: 11 }} domain={[15, 30]} />
                  <YAxis yAxisId="right" orientation="right" stroke="#10B981" tick={{ fontSize: 11 }} domain={[0, 1]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line yAxisId="left" type="monotone" dataKey="psnr" name="PSNR (dB)" stroke="#06B6D4" strokeWidth={2.5} dot={{ r: 4 }} />
                  <Line yAxisId="right" type="monotone" dataKey="ssim" name="SSIM Score" stroke="#10B981" strokeWidth={2.5} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CHART 3: RESTORATION TIME PER RESOLUTION */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>{t('analytics.chart3Title')}</span>
                </h3>
                <p className="text-xs text-slate-400">{t('analytics.chart3Sub')}</p>
              </div>
              <span className="text-xs font-mono text-amber-400">Sub-150ms @ 256x256</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="res" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="time" name="Inference Time (ms)" fill="#3B82F6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CHART 4: DATASET DISTRIBUTION */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                  <span>{t('analytics.chart4Title')}</span>
                </h3>
                <p className="text-xs text-slate-400">{t('analytics.chart4Sub')}</p>
              </div>
              <span className="text-xs font-mono text-slate-300">Total: 3,200</span>
            </div>

            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={45}
                    paddingAngle={4}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
