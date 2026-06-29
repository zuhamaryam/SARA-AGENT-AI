// ═══════════════════════════════════════════════════════════════════════
//  SARA AI — Charts (Chart.js wrappers replacing recharts)
// ═══════════════════════════════════════════════════════════════════════

// Global chart registry to destroy before re-render
const _charts = {};

function destroyChart(id) {
  if (_charts[id]) { _charts[id].destroy(); delete _charts[id]; }
}

function createChart(id, config) {
  destroyChart(id);
  const canvas = document.getElementById(id);
  if (!canvas) return;
  _charts[id] = new Chart(canvas, config);
  return _charts[id];
}

const GRID_COLOR  = '#1e293b';
const TICK_COLOR  = '#64748b';
const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const baseScales = {
  x: { grid: { color: GRID_COLOR }, ticks: { color: TICK_COLOR, font: { size: 11, family: FONT_FAMILY } }, border: { display: false } },
  y: { grid: { color: GRID_COLOR }, ticks: { color: TICK_COLOR, font: { size: 11, family: FONT_FAMILY } }, border: { display: false } },
};

const baseTooltip = {
  backgroundColor: '#0f172a',
  borderColor: '#1e293b',
  borderWidth: 1,
  titleColor: '#94a3b8',
  bodyColor: '#f1f5f9',
  padding: 10,
};

const baseLegend = {
  labels: { color: '#94a3b8', font: { size: 11, family: FONT_FAMILY }, boxWidth: 12, usePointStyle: true }
};

// ── Sessions & Threats Area Chart ─────────────────────────────────────
function renderSessionsChart() {
  createChart('chartSessions', {
    type: 'line',
    data: {
      labels: ANALYTICS_WEEKLY.map(d => d.day),
      datasets: [
        {
          label: 'Sessions',
          data: ANALYTICS_WEEKLY.map(d => d.sessions),
          borderColor: '#0d9488',
          backgroundColor: 'rgba(13,148,136,.18)',
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 0,
        },
        {
          label: 'Threats',
          data: ANALYTICS_WEEKLY.map(d => d.threats),
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239,68,68,.13)',
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 0,
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { tooltip: baseTooltip, legend: baseLegend },
      scales: baseScales,
    }
  });
}

// ── Entities Bar Chart ─────────────────────────────────────────────────
function renderEntitiesChart() {
  createChart('chartEntities', {
    type: 'bar',
    data: {
      labels: ANALYTICS_WEEKLY.map(d => d.day),
      datasets: [{
        label: 'Entities',
        data: ANALYTICS_WEEKLY.map(d => d.entities),
        backgroundColor: PIE_COLORS,
        borderRadius: 4,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { tooltip: baseTooltip, legend: { display: false } },
      scales: baseScales,
    }
  });
}

// ── Pie Charts ──────────────────────────────────────────────────────────
function renderPieChart(id, data) {
  createChart(id, {
    type: 'doughnut',
    data: {
      labels: data.map(d => d.name),
      datasets: [{
        data: data.map(d => d.value),
        backgroundColor: PIE_COLORS,
        borderWidth: 2,
        borderColor: '#0f172a',
        hoverOffset: 6,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: '40%',
      plugins: {
        tooltip: baseTooltip,
        legend: { position: 'bottom', labels: { ...baseLegend.labels, boxWidth: 8, padding: 8 } }
      }
    }
  });
}

// ── Radar Chart ─────────────────────────────────────────────────────────
function renderRadarChart() {
  createChart('chartRadar', {
    type: 'radar',
    data: {
      labels: RADAR_DATA.map(d => d.metric),
      datasets: [
        {
          label: 'Sara AI',
          data: RADAR_DATA.map(d => d.sara),
          borderColor: '#0d9488',
          backgroundColor: 'rgba(13,148,136,.2)',
          borderWidth: 2,
          pointRadius: 3,
        },
        {
          label: 'Baseline',
          data: RADAR_DATA.map(d => d.baseline),
          borderColor: '#8b5cf6',
          backgroundColor: 'rgba(139,92,246,.12)',
          borderWidth: 2,
          pointRadius: 3,
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { tooltip: baseTooltip, legend: baseLegend },
      scales: {
        r: {
          grid: { color: '#1e293b' },
          ticks: { color: '#475569', backdropColor: 'transparent', font: { size: 9 } },
          pointLabels: { color: '#94a3b8', font: { size: 10, family: FONT_FAMILY } },
          suggestedMin: 0, suggestedMax: 100,
        }
      }
    }
  });
}

// ── Threat Timeline Line Chart ──────────────────────────────────────────
function renderTimelineChart() {
  createChart('chartTimeline', {
    type: 'line',
    data: {
      labels: TIMELINE_DATA.map(d => d.time),
      datasets: [{
        label: 'Threat Score',
        data: TIMELINE_DATA.map(d => d.threat),
        borderColor: '#ef4444',
        borderWidth: 3,
        tension: 0.4,
        fill: false,
        pointRadius: 3,
        pointBackgroundColor: '#ef4444',
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { tooltip: baseTooltip, legend: { display: false } },
      scales: { ...baseScales, y: { ...baseScales.y, min: 0, max: 100 } }
    }
  });
}

// ── Treemap (manual SVG since Chart.js doesn't have treemap built-in) ──
function renderTreemap(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const W = container.clientWidth || 700;
  const H = 350;
  const total = TREEMAP_DATA.reduce((s, d) => s + d.size, 0);

  // Simple squarify
  function layout(data, x, y, w, h) {
    const rects = [];
    let remaining = data.slice().sort((a, b) => b.size - a.size);
    let cx = x, cy = y, cw = w, ch = h;
    while (remaining.length > 0) {
      const isRow = cw >= ch;
      let row = [];
      let rowSum = 0;
      for (let i = 0; i < remaining.length; i++) {
        const test = [...row, remaining[i]];
        const testSum = rowSum + remaining[i].size;
        const dim = isRow ? ch : cw;
        const rowWidth = (testSum / total) * (isRow ? cw : ch);
        const worst = Math.max(...test.map(d => {
          const dh = (d.size / testSum) * dim;
          const dw = rowWidth;
          return Math.max(dw / dh, dh / dw);
        }));
        if (row.length > 0 && worst > Math.max(...row.map(d => {
          const prevSum = rowSum;
          const prevWidth = (prevSum / total) * (isRow ? cw : ch);
          const dh = (d.size / prevSum) * dim;
          return Math.max(prevWidth / dh, dh / prevWidth);
        }))) break;
        row.push(remaining[i]);
        rowSum += remaining[i].size;
      }
      const rowWidth = (rowSum / total) * (isRow ? cw : ch);
      let off = 0;
      for (const d of row) {
        const frac = d.size / rowSum;
        const rw = isRow ? rowWidth : frac * cw;
        const rh = isRow ? frac * ch : rowWidth;
        const rx = isRow ? cx : cx + off;
        const ry = isRow ? cy + off : cy;
        rects.push({ ...d, x: rx, y: ry, w: rw, h: rh });
        off += isRow ? rh : rw;
      }
      if (isRow) { cx += rowWidth; cw -= rowWidth; }
      else        { cy += rowWidth; ch -= rowWidth; }
      remaining = remaining.slice(row.length);
    }
    return rects;
  }

  const rects = layout(TREEMAP_DATA, 0, 0, W, H);
  let svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="border-radius:8px;overflow:hidden;">`;
  for (const r of rects) {
    svg += `<rect x="${r.x+1}" y="${r.y+1}" width="${r.w-2}" height="${r.h-2}" fill="${r.color}" rx="4" style="opacity:.9"/>`;
    if (r.w > 60 && r.h > 30) {
      svg += `<text x="${r.x+r.w/2}" y="${r.y+r.h/2-4}" fill="white" text-anchor="middle" font-size="11" font-weight="700" font-family="${FONT_FAMILY}">${r.name}</text>`;
      svg += `<text x="${r.x+r.w/2}" y="${r.y+r.h/2+10}" fill="rgba(255,255,255,.7)" text-anchor="middle" font-size="10" font-family="${FONT_FAMILY}">${r.size}</text>`;
    }
  }
  svg += '</svg>';
  container.innerHTML = svg;
}

// ── City Bar (horizontal) ───────────────────────────────────────────────
function renderCityChart() {
  createChart('chartCity', {
    type: 'bar',
    data: {
      labels: CITY_DATA.map(d => d.name),
      datasets: [{
        label: 'Sessions',
        data: CITY_DATA.map(d => d.value),
        backgroundColor: CITY_DATA.map(d => d.color),
        borderRadius: { topRight: 4, bottomRight: 4 },
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true, maintainAspectRatio: false,
      plugins: { tooltip: baseTooltip, legend: { display: false } },
      scales: {
        x: { ...baseScales.x },
        y: { ...baseScales.y, ticks: { color: '#94a3b8', font: { size: 11 } } }
      }
    }
  });
}

// ── Region Stacked Bar ──────────────────────────────────────────────────
function renderRegionChart() {
  const regionData = [
    { region:"North", upi:45, kyc:28, lottery:18, police:9 },
    { region:"South", upi:38, kyc:22, lottery:25, police:15 },
    { region:"East",  upi:52, kyc:31, lottery:12, police:5 },
    { region:"West",  upi:41, kyc:19, lottery:22, police:18 },
  ];
  createChart('chartRegion', {
    type: 'bar',
    data: {
      labels: regionData.map(d => d.region),
      datasets: [
        { label:'UPI',     data: regionData.map(d=>d.upi),     backgroundColor:'#0d9488', stack:'s' },
        { label:'KYC',     data: regionData.map(d=>d.kyc),     backgroundColor:'#3b82f6', stack:'s' },
        { label:'Lottery', data: regionData.map(d=>d.lottery), backgroundColor:'#f59e0b', stack:'s' },
        { label:'Police',  data: regionData.map(d=>d.police),  backgroundColor:'#ef4444', stack:'s', borderRadius: { topLeft: 4, topRight: 4 } },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { tooltip: baseTooltip, legend: baseLegend },
      scales: baseScales,
    }
  });
}

// ── Peak Hours ──────────────────────────────────────────────────────────
function renderPeakChart() {
  const peakData = [
    {h:"6am",s:12},{h:"8am",s:28},{h:"10am",s:67},{h:"12pm",s:89},
    {h:"2pm",s:78},{h:"4pm",s:94},{h:"6pm",s:112},{h:"8pm",s:98},
    {h:"10pm",s:56},{h:"12am",s:21},{h:"2am",s:8},{h:"4am",s:5},
  ];
  createChart('chartPeak', {
    type: 'line',
    data: {
      labels: peakData.map(d => d.h),
      datasets: [{
        label: 'Sessions',
        data: peakData.map(d => d.s),
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245,158,11,.2)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { tooltip: baseTooltip, legend: { display: false } },
      scales: baseScales,
    }
  });
}

// ── Model Cost Bar ──────────────────────────────────────────────────────
function renderModelCostChart() {
  const mData = [
    { model:"Local", cost:0, sessions:312 },
    { model:"Groq Llama3", cost:0.04, sessions:1847 },
    { model:"Qwen 72B", cost:0.09, sessions:523 },
    { model:"Claude 3.5", cost:0.18, sessions:341 },
  ];
  createChart('chartModelCost', {
    type: 'bar',
    data: {
      labels: mData.map(d => d.model),
      datasets: [{
        label: '₹ Cost/Session',
        data: mData.map(d => d.cost),
        backgroundColor: ['#22c55e','#0d9488','#3b82f6','#f59e0b'],
        borderRadius: 4,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { tooltip: baseTooltip, legend: { display: false } },
      scales: baseScales,
    }
  });
}

// ── Model Latency Area ──────────────────────────────────────────────────
function renderLatencyChart() {
  const lData = [
    { p:"p50", groq:185, qwen:720, claude:1340 },
    { p:"p75", groq:280, qwen:950, claude:1820 },
    { p:"p90", groq:420, qwen:1200, claude:2400 },
    { p:"p95", groq:580, qwen:1500, claude:3100 },
    { p:"p99", groq:890, qwen:2100, claude:4800 },
  ];
  createChart('chartLatency', {
    type: 'line',
    data: {
      labels: lData.map(d => d.p),
      datasets: [
        { label:'Groq', data: lData.map(d=>d.groq), borderColor:'#0d9488', backgroundColor:'rgba(13,148,136,.13)', fill:true, tension:0.4, borderWidth:2, pointRadius:3 },
        { label:'Qwen', data: lData.map(d=>d.qwen), borderColor:'#3b82f6', backgroundColor:'rgba(59,130,246,.13)', fill:true, tension:0.4, borderWidth:2, pointRadius:3 },
        { label:'Claude',data: lData.map(d=>d.claude), borderColor:'#8b5cf6', backgroundColor:'rgba(139,92,246,.13)', fill:true, tension:0.4, borderWidth:2, pointRadius:3 },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { tooltip: baseTooltip, legend: baseLegend },
      scales: { ...baseScales, y: { ...baseScales.y, ticks: { ...baseScales.y.ticks, callback: v => v+'ms' } } }
    }
  });
}

// ── Extraction Speed Horizontal Bar ────────────────────────────────────
function renderSpeedChart() {
  createChart('chartSpeed', {
    type: 'bar',
    data: {
      labels: ['Regex','Keyword','spaCy NER','LLM Fallback'],
      datasets: [{
        label: 'ms',
        data: [0.8, 2, 45, 380],
        backgroundColor: ['#22c55e','#3b82f6','#0d9488','#f59e0b'],
        borderRadius: { topRight: 4, bottomRight: 4 },
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true, maintainAspectRatio: false,
      plugins: { tooltip: baseTooltip, legend: { display: false } },
      scales: {
        x: { ...baseScales.x },
        y: { ...baseScales.y, ticks: { color:'#94a3b8', font:{ size:11 } } }
      }
    }
  });
}

// ── Pattern Co-occurrence Radar ──────────────────────────────────────────
function renderCooccurrenceChart() {
  const coData = [
    { pattern:"UPI + OTP", sessions:89 },
    { pattern:"KYC + Aadhaar", sessions:67 },
    { pattern:"Police + Fine", sessions:54 },
    { pattern:"Lottery + Tax", sessions:48 },
    { pattern:"Bank + Block", sessions:73 },
    { pattern:"Refund + Transfer", sessions:61 },
  ];
  createChart('chartCooccurrence', {
    type: 'radar',
    data: {
      labels: coData.map(d => d.pattern),
      datasets: [{
        label: 'Co-occurrence',
        data: coData.map(d => d.sessions),
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139,92,246,.2)',
        borderWidth: 2,
        pointRadius: 3,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { tooltip: baseTooltip, legend: { display: false } },
      scales: {
        r: {
          grid: { color: '#1e293b' },
          ticks: { color: '#475569', backdropColor: 'transparent', font: { size: 9 } },
          pointLabels: { color: '#94a3b8', font: { size: 9, family: FONT_FAMILY } },
        }
      }
    }
  });
}

// ── Pattern Detection Rate Line ──────────────────────────────────────────
function renderPatternRateChart() {
  const prData = [
    { week:"W1", regex:78, spacy:45, llm:12 },
    { week:"W2", regex:84, spacy:52, llm:18 },
    { week:"W3", regex:89, spacy:61, llm:24 },
    { week:"W4", regex:92, spacy:68, llm:31 },
    { week:"W5", regex:95, spacy:74, llm:38 },
    { week:"W6", regex:97, spacy:81, llm:45 },
  ];
  createChart('chartPatternRate', {
    type: 'line',
    data: {
      labels: prData.map(d => d.week),
      datasets: [
        { label:'Regex', data: prData.map(d=>d.regex), borderColor:'#22c55e', borderWidth:2, tension:0.3, pointRadius:0 },
        { label:'spaCy', data: prData.map(d=>d.spacy), borderColor:'#0d9488', borderWidth:2, tension:0.3, pointRadius:0 },
        { label:'LLM',   data: prData.map(d=>d.llm),   borderColor:'#8b5cf6', borderWidth:2, tension:0.3, pointRadius:0 },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { tooltip: baseTooltip, legend: baseLegend },
      scales: { ...baseScales, y: { ...baseScales.y, ticks: { ...baseScales.y.ticks, callback: v => v+'%' } } }
    }
  });
}

// ── Complaints Bar ───────────────────────────────────────────────────────
function renderComplaintsChart() {
  const cData = [
    { day:"Week 1", filed:12, resolved:8 },
    { day:"Week 2", filed:19, resolved:14 },
    { day:"Week 3", filed:27, resolved:21 },
    { day:"Week 4", filed:34, resolved:28 },
  ];
  createChart('chartComplaints', {
    type: 'bar',
    data: {
      labels: cData.map(d => d.day),
      datasets: [
        { label:'Filed',    data: cData.map(d=>d.filed),    backgroundColor:'#ef4444', borderRadius:4 },
        { label:'Resolved', data: cData.map(d=>d.resolved), backgroundColor:'#22c55e', borderRadius:4 },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { tooltip: baseTooltip, legend: baseLegend },
      scales: baseScales,
    }
  });
}