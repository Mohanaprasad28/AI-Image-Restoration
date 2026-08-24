// Helper to generate SVG data URIs for semiconductor wafer inspection patterns
export const createWaferSvg = (type, isNoisy = false, seed = 1) => {
  const width = 600;
  const height = 600;

  // Render semiconductor die layout, wafer edge, interconnect tracks, contact vias, and microscopic defects
  let patternElements = '';
  
  // Wafer grid background lines
  for (let i = 40; i < width; i += 40) {
    patternElements += `<line x1="${i}" y1="0" x2="${i}" y2="${height}" stroke="${isNoisy ? '#334155' : '#1e293b'}" stroke-width="1" stroke-dasharray="${isNoisy ? '2,2' : 'none'}" />`;
    patternElements += `<line x1="0" y1="${i}" x2="${width}" y2="${i}" stroke="${isNoisy ? '#334155' : '#1e293b'}" stroke-width="1" stroke-dasharray="${isNoisy ? '2,2' : 'none'}" />`;
  }

  // Silicon Substrate Chips / Dies
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const x = 70 + c * 130;
      const y = 70 + r * 130;
      const padColor = isNoisy ? '#475569' : '#0284c7';
      const traceColor = isNoisy ? '#64748b' : '#38bdf8';
      const viaColor = isNoisy ? '#94a3b8' : '#38bdf8';

      // Die frame
      patternElements += `<rect x="${x}" y="${y}" width="100" height="100" rx="8" fill="${isNoisy ? '#1e293b' : '#0f172a'}" stroke="${padColor}" stroke-width="2" />`;
      
      // Micro-interconnect traces
      patternElements += `<path d="M${x+15} ${y+30} L${x+85} ${y+30} M${x+15} ${y+50} L${x+85} ${y+50} M${x+15} ${y+70} L${x+85} ${y+70}" stroke="${traceColor}" stroke-width="${isNoisy ? '3' : '2'}" opacity="${isNoisy ? '0.6' : '0.9'}" />`;
      patternElements += `<path d="M${x+30} ${y+15} L${x+30} ${y+85} M${x+70} ${y+15} L${x+70} ${y+85}" stroke="${traceColor}" stroke-width="${isNoisy ? '3' : '2'}" opacity="${isNoisy ? '0.6' : '0.9'}" />`;
      
      // Contact Vias / Bumps
      patternElements += `<circle cx="${x+30}" cy="${y+30}" r="6" fill="${viaColor}" />`;
      patternElements += `<circle cx="${x+70}" cy="${y+30}" r="6" fill="${viaColor}" />`;
      patternElements += `<circle cx="${x+30}" cy="${y+70}" r="6" fill="${viaColor}" />`;
      patternElements += `<circle cx="${x+70}" cy="${y+70}" r="6" fill="${viaColor}" />`;
      patternElements += `<circle cx="${x+50}" cy="${y+50}" r="10" fill="none" stroke="${viaColor}" stroke-width="2" />`;
    }
  }

  // Central alignment mark / Lithography target
  patternElements += `
    <circle cx="300" cy="300" r="230" fill="none" stroke="${isNoisy ? '#475569' : '#06b6d4'}" stroke-width="3" stroke-dasharray="10,6" />
    <circle cx="300" cy="300" r="250" fill="none" stroke="${isNoisy ? '#334155' : '#0284c7'}" stroke-width="1.5" />
    <line x1="300" y1="20" x2="300" y2="580" stroke="${isNoisy ? '#64748b' : '#06b6d4'}" stroke-width="1.5" opacity="0.7" />
    <line x1="20" y1="300" x2="580" y2="300" stroke="${isNoisy ? '#64748b' : '#06b6d4'}" stroke-width="1.5" opacity="0.7" />
  `;

  // Simulated Sensor Speckle / Grain Noise overlay if noisy
  let noiseOverlay = '';
  if (isNoisy) {
    let dots = '';
    for (let i = 0; i < 450; i++) {
      const nx = (Math.sin(i * 12.9898 + seed) * 43758.5453) % 1 * width;
      const ny = (Math.cos(i * 78.233 + seed) * 43758.5453) % 1 * height;
      const opacity = ((i % 10) / 10) * 0.7 + 0.3;
      const radius = (i % 3) + 1;
      const color = i % 2 === 0 ? '#ffffff' : '#000000';
      dots += `<circle cx="${Math.abs(nx)}" cy="${Math.abs(ny)}" r="${radius}" fill="${color}" opacity="${opacity}" />`;
    }
    // Add Gaussian blur overlay filter
    noiseOverlay = `
      <defs>
        <filter id="noiseBlur">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>
      <g filter="url(#noiseBlur)" opacity="0.85">${dots}</g>
      <g opacity="0.75">${dots}</g>
    `;
  } else {
    // Sharp restored lighting glow
    noiseOverlay = `
      <defs>
        <linearGradient id="cyanGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.05"/>
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#cyanGlow)" />
    `;
  }

  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
      <rect width="${width}" height="${height}" fill="${isNoisy ? '#090d16' : '#070a12'}" />
      ${patternElements}
      ${noiseOverlay}
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
};

export const SAMPLE_WAFER_ITEMS = [];

export const MODEL_METRICS_BENCHMARK = {
  modelName: 'SemiconSwinIR',
  architecture: 'SwinIR (Swin Transformer for Image Restoration)',
  framework: 'PyTorch 2.4.0',
  trainingDataset: '3,200 High-Res Semiconductor Inspection Images',
  epochs: 5,
  gpu: 'NVIDIA Tesla T4 (16GB VRAM)',
  avgPsnr: '26.2 dB',
  avgSsim: '0.68',
  patchSize: 1,
  embedDim: 60,
  windowSize: 8,
  depths: [6, 6, 6, 6],
  numHeads: [6, 6, 6, 6],
  upscale: 2,
  learningRate: '2e-4',
};
