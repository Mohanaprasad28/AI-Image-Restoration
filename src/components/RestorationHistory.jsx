import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  History, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Download, 
  Trash2, 
  Eye, 
  FileSpreadsheet, 
  CheckCircle2,
  Calendar,
  Layers,
  Clock,
  Sparkles
} from 'lucide-react';
import { SAMPLE_WAFER_ITEMS } from '../data/sampleWafers';

export default function RestorationHistory({ onViewItem, onShowToast }) {
  const { t } = useTranslation();
  const [historyList, setHistoryList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('date'); // 'date' | 'psnr' | 'ssim' | 'name'
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterType, setFilterType] = useState('all');

  // Filtering
  const filteredList = historyList.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.defectType.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterType === 'high-psnr') return matchesSearch && item.psnr >= 27.0;
    if (filterType === 'fast') return matchesSearch && parseInt(item.processingTime) < 140;
    return matchesSearch;
  });

  // Sorting
  const sortedList = [...filteredList].sort((a, b) => {
    let valA = a[sortKey];
    let valB = b[sortKey];

    if (sortKey === 'psnr' || sortKey === 'ssim') {
      valA = parseFloat(valA);
      valB = parseFloat(valB);
    }

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Delete item
  const handleDelete = (id, name) => {
    setHistoryList((prev) => prev.filter((item) => item.id !== id));
    onShowToast?.(`Deleted record ${name} from history`, 'info');
  };

  // Download item
  const handleDownload = (item) => {
    const link = document.createElement('a');
    link.href = item.restoredUrl;
    link.download = `RESTORED_${item.name}`;
    link.click();
    onShowToast?.(`Downloading ${item.name}`, 'info');
  };

  // Export History CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Filename', 'Date', 'Resolution', 'PSNR_dB', 'SSIM', 'Noise_Reduction_Pct', 'Processing_Time', 'Defect_Type'];
    const rows = historyList.map((item) => [
      item.id,
      `"${item.name}"`,
      `"${item.date}"`,
      `"${item.resolution}"`,
      item.psnr,
      item.ssim,
      item.noiseReduction,
      `"${item.processingTime}"`,
      `"${item.defectType}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'SemiconRestore_Audit_History.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast?.('Exported Restoration History CSV report', 'success');
  };

  return (
    <section id="history" className="py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                {t('history.pill')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {t('history.title')}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {t('history.sub')}
            </p>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 hover:text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/10"
          >
            <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
            <span>{t('history.exportCsv')}</span>
          </button>
        </div>

        {/* SEARCH, SORT & FILTER TOOLBAR */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('history.searchPlaceholder')}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
              <Filter className="w-3.5 h-3.5 text-cyan-400 ml-2" />
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1 rounded-lg transition-all ${filterType === 'all' ? 'bg-cyan-500/20 text-cyan-400 font-semibold' : 'text-slate-400'}`}
              >
                {t('history.filterAll')}
              </button>
              <button
                onClick={() => setFilterType('high-psnr')}
                className={`px-3 py-1 rounded-lg transition-all ${filterType === 'high-psnr' ? 'bg-cyan-500/20 text-cyan-400 font-semibold' : 'text-slate-400'}`}
              >
                {t('history.filterHighPsnr')}
              </button>
              <button
                onClick={() => setFilterType('fast')}
                className={`px-3 py-1 rounded-lg transition-all ${filterType === 'fast' ? 'bg-cyan-500/20 text-cyan-400 font-semibold' : 'text-slate-400'}`}
              >
                {t('history.filterFast')}
              </button>
            </div>

            {/* Sort Controls */}
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>{t('history.sortBy')}</span>
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500/50"
              >
                <option value="date">Date</option>
                <option value="psnr">PSNR (dB)</option>
                <option value="ssim">SSIM</option>
                <option value="name">Filename</option>
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400"
                title="Toggle sort direction"
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* HISTORY TABLE */}
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3.5">Thumbnail</th>
                  <th className="px-4 py-3.5">Filename</th>
                  <th className="px-4 py-3.5">Date & Time</th>
                  <th className="px-4 py-3.5">PSNR</th>
                  <th className="px-4 py-3.5">SSIM</th>
                  <th className="px-4 py-3.5">Proc Time</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {sortedList.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-slate-400">
                      No restoration history records match your search criteria.
                    </td>
                  </tr>
                ) : (
                  sortedList.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                      
                      {/* Thumbnail */}
                      <td className="px-4 py-3.5">
                        <img
                          src={item.restoredUrl}
                          alt="Thumbnail"
                          className="w-10 h-10 rounded-lg object-cover bg-slate-900 border border-slate-800"
                        />
                      </td>

                      {/* Filename */}
                      <td className="px-4 py-3.5 font-sans font-medium text-slate-200">
                        <p className="truncate max-w-[200px] text-white font-semibold text-xs">{item.name}</p>
                        <p className="text-[10px] text-slate-400">{item.defectType}</p>
                      </td>

                      {/* Date */}
                      <td className="px-4 py-3.5 text-slate-400 text-[11px]">
                        {item.date}
                      </td>

                      {/* PSNR */}
                      <td className="px-4 py-3.5 font-bold text-cyan-400">
                        {item.psnr} dB
                      </td>

                      {/* SSIM */}
                      <td className="px-4 py-3.5 text-slate-300">
                        {item.ssim}
                      </td>

                      {/* Processing Time */}
                      <td className="px-4 py-3.5 text-slate-400">
                        {item.processingTime}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onViewItem(item)}
                            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-400 transition-colors"
                            title="Inspect in Slider Viewer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDownload(item)}
                            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                            title="Download Image"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id, item.name)}
                            className="p-2 rounded-lg bg-slate-900 hover:bg-rose-500/20 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
                            title="Delete Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
