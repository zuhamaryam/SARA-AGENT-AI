// ═══════════════════════════════════════════════════════════════════════
//  SARA AI — Page Renderers
// ═══════════════════════════════════════════════════════════════════════

// ── SVG Icon snippets ─────────────────────────────────────────────────
const ICON = {
  dashboard:  '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
  phone:      '<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.5 9.93a19.79 19.79 0 01-3-8.59A2 2 0 013.48 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 8.91a16 16 0 006.29 6.29l1.28-1.28a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>',
  target:     '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  brain:      '<path d="M12 2a10 10 0 0110 10c0 5.52-4.48 10-10 10S2 17.52 2 12"/><path d="M12 6v6l4 2"/>',
  bar:        '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>',
  alert:      '<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  settings:   '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>',
  trending:   '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  clock:      '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  map:        '<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>',
  db:         '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
  net:        '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>',
  shield:     '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  link:       '<path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>',
  eye:        '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
};

function ico(key) {
  return `<svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${ICON[key]||''}</svg>`;
}

function sectionTitle(iconKey, title, subtitle) {
  return `
    <div class="section-title">
      <div class="section-title-row">${ico(iconKey)}<h2>${title}</h2></div>
      ${subtitle ? `<p class="section-sub">${subtitle}</p>` : ''}
    </div>`;
}

// ════════════════════════════════════════════════════════════════════════
//  DASHBOARD PAGE
// ════════════════════════════════════════════════════════════════════════
function renderDashboard() {
  const s = window.selectedSession || SESSIONS[0];

  return `
    <div class="flex-col">
      <!-- Stats Row -->
      <div class="grid-auto">
        ${statCard('Live Sessions', window.liveCount || 4, '+2', '#0d9488', true, ICON.phone)}
        ${statCard('Intel Extracted', (window.totalIntel || 1842).toLocaleString(), '+127', '#3b82f6', false, ICON.target)}
        ${statCard('Avg Threat', '76.4', '+8.2', '#ef4444', false, ICON.alert)}
        ${statCard('Cost Today', '₹4.23', '-12%', '#22c55e', false, ICON.db)}
        ${statCard('Sara Accuracy', '97.3%', '+0.4%', '#8b5cf6', false, ICON.shield)}
        ${statCard('Uptime', '99.97%', '', '#0d9488', false, ICON.trending)}
      </div>

      <!-- Main Grid -->
      <div class="dashboard-main">
        ${buildChatPanel(s)}

        <div class="intel-panel">
          <!-- Live Intel Feed -->
          <div class="card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              ${sectionTitle('target','Live Intelligence Feed','')}
              <span class="badge badge-green">● LIVE</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:8px;max-height:340px;overflow-y:auto;">
              ${INTELLIGENCE.map(e => `
                <div class="intel-item${e.severity==='critical' ? ' critical' : ''}">
                  ${makeBadge(e.type, e.severity==='critical' ? '#ef4444' : e.severity==='high' ? '#f59e0b' : '#0d9488')}
                  <div style="flex:1;min-width:0;">
                    <div class="intel-value">${e.value}</div>
                    <div class="intel-meta">${e.session} · ${e.time}</div>
                  </div>
                  <div class="intel-conf">${e.confidence}%</div>
                </div>`).join('')}
            </div>
          </div>

          <!-- Report Card -->
          <div class="card">
            ${sectionTitle('alert','Report to Cybercrime','')}
            <p style="font-size:12px;color:#64748b;margin-bottom:12px;">File instant FIR with captured intelligence auto-filled</p>
            <button class="report-card-btn" onclick="openComplaintModal(window.selectedSession||SESSIONS[0])">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                ${ICON.alert}
              </svg>
              File Cybercrime Complaint
            </button>
            <div class="portal-quick-grid">
              ${CYBERCRIME_PORTALS.slice(0,4).map(p => `
                <a href="${p.url}" target="_blank" class="portal-quick">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${ICON.net}</svg>
                  <span>${p.name.split(' ').slice(0,2).join(' ')}</span>
                </a>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

function statCard(label, value, delta, color, glow, iconPath) {
  const sign = delta.startsWith && delta.startsWith('+') ? '#22c55e' : delta.startsWith && delta.startsWith('-') ? '#ef4444' : '#22c55e';
  return `
    <div class="card stat-card${glow ? ' glow' : ''}">
      <div class="stat-card-header">
        <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2">${iconPath||''}</svg>
        <span class="stat-label">${label}</span>
      </div>
      <div class="stat-value" style="color:${color};">${value}</div>
      ${delta ? `<div class="stat-delta" style="color:${sign};">${delta} from yesterday</div>` : ''}
    </div>`;
}

// ════════════════════════════════════════════════════════════════════════
//  SESSIONS PAGE
// ════════════════════════════════════════════════════════════════════════
function renderSessions() {
  const active = SESSIONS.filter(s => s.status === 'active').length;
  return `
    <div class="flex-col">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div>
          <h2 style="font-size:18px;font-weight:800;color:#f1f5f9;margin:0;">Live Sessions</h2>
          <p style="font-size:12px;color:#64748b;margin:4px 0 0;">${active} active · ${SESSIONS.length} total today</p>
        </div>
        <span class="badge badge-green">● ${window.liveCount||4} Live</span>
      </div>

      <div class="grid-sessions">
        ${SESSIONS.map(s => `
          <div class="card session-card${window.selectedSession?.id === s.id ? ' selected' : ''}"
               onclick="selectSession('${s.id}')">
            <div class="session-card-header">
              <div style="display:flex;align-items:center;gap:8px;">
                <span class="pulse-dot ${s.status==='active' ? 'green' : 'slate'}"></span>
                <div>
                  <div class="session-id">${s.id}</div>
                  <div class="session-num">${s.scammer}</div>
                </div>
              </div>
              ${makeBadge(s.status, s.status==='active' ? '#22c55e' : '#64748b')}
            </div>
            <div class="session-badges">
              ${makeBadge(s.type, '#f59e0b')}
              ${makeBadge(s.city, '#3b82f6')}
              ${makeBadge(s.model, '#8b5cf6')}
            </div>
            <div>
              <div class="session-threat-row">
                <span class="session-threat-label">Threat Score</span>
                <span class="session-threat-label mono" style="color:${s.threat>=80?'#ef4444':'#f59e0b'};">${s.threat}/100</span>
              </div>
              ${makeThreatBar(s.threat)}
            </div>
            <div class="session-meta">
              <span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                ${s.duration}
              </span>
              <span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${ICON.target}</svg>
                ${s.entities} entities
              </span>
              <span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${ICON.db}</svg>
                ${s.cost}
              </span>
            </div>
            <button class="report-btn" onclick="event.stopPropagation();openComplaintModal(SESSIONS.find(x=>x.id==='${s.id}'))">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${ICON.alert}</svg>
              Report to Cybercrime
            </button>
          </div>`).join('')}
      </div>
    </div>`;
}

function selectSession(id) {
  window.selectedSession = SESSIONS.find(s => s.id === id) || SESSIONS[0];
  navigateTo('dashboard');
}

// ════════════════════════════════════════════════════════════════════════
//  INTELLIGENCE PAGE
// ════════════════════════════════════════════════════════════════════════
function renderIntelligence() {
  const intelItems = [
    { label:'UPI IDs', count:412, color:'#0d9488' },
    { label:'Phone Nos.', count:387, color:'#3b82f6' },
    { label:'Bank Names', count:298, color:'#8b5cf6' },
    { label:'URLs', count:201, color:'#ef4444' },
    { label:'Telegram', count:167, color:'#f59e0b' },
    { label:'Aadhaar (masked)', count:98, color:'#f97316' },
  ];

  return `
    <div class="flex-col">
      ${sectionTitle('target','Intelligence Database',`${(window.totalIntel||1842).toLocaleString()} entities extracted · Zero hallucination guaranteed`)}

      <div class="grid-auto">
        ${intelItems.map(item => `
          <div class="card intel-mini">
            <div class="intel-mini-count" style="color:${item.color};">${item.count}</div>
            <div class="intel-mini-label">${item.label}</div>
          </div>`).join('')}
      </div>

      <div class="card">
        ${sectionTitle('eye','All Extracted Entities','')}
        <div class="overflowx">
          <table class="data-table">
            <thead>
              <tr>
                ${['Type','Value','Confidence','Session','Time','Severity','Action'].map(h => `<th>${h}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${INTELLIGENCE.map((e,i) => `
                <tr>
                  <td>${makeBadge(e.type, PIE_COLORS[i%8])}</td>
                  <td class="mono" style="color:#e2e8f0;">${e.value}</td>
                  <td class="mono" style="color:${e.confidence>95?'#22c55e':'#f59e0b'};">${e.confidence}%</td>
                  <td class="mono teal">${e.session}</td>
                  <td style="color:#64748b;">${e.time}</td>
                  <td>${makeBadge(e.severity, e.severity==='critical'?'#ef4444':e.severity==='high'?'#f59e0b':'#0d9488')}</td>
                  <td>
                    <button onclick="openComplaintModal(SESSIONS[0])" style="background:rgba(239,68,68,.13);border:1px solid rgba(239,68,68,.27);border-radius:6px;color:#ef4444;cursor:pointer;font-size:10px;padding:2px 8px;display:inline-flex;align-items:center;gap:4px;">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${ICON.alert}</svg> Report
                    </button>
                  </td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
}

// ════════════════════════════════════════════════════════════════════════
//  MEMORY PAGE
// ════════════════════════════════════════════════════════════════════════
function renderMemory() {
  return `
    <div class="flex-col">
      ${sectionTitle('brain','Hindsight Memory Engine','PGVector + Redis persistent memory — learns from every scam')}
      <div class="grid-2">
        <div class="card">
          ${sectionTitle('db','Learned Patterns','')}
          ${MEMORY_PATTERNS.map((p,i) => `
            <div class="pattern-row">
              <span class="pattern-id" style="background:${PIE_COLORS[i%8]}22;color:${PIE_COLORS[i%8]};border:1px solid ${PIE_COLORS[i%8]}44;">${p.id}</span>
              <div style="flex:1;">
                <div class="pattern-name">${p.pattern}</div>
                <div class="pattern-meta">${p.sessions} matches · ${p.lastSeen}</div>
              </div>
              <span class="pattern-conf">${p.confidence}%</span>
              <div class="conf-bar">${makeThreatBar(p.confidence)}</div>
            </div>`).join('')}
        </div>

        <div class="card">
          ${sectionTitle('net','Semantic Similarity Search','')}
          <p style="font-size:12px;color:#64748b;margin-bottom:12px;">How Hindsight finds similar past scams in real-time</p>
          <div class="embedding-box">
            <div class="embed-label">Query embedding (current scammer message):</div>
            <div class="embed-val">[0.234, -0.891, 0.567, 0.123, -0.445, 0.789, 0.312, -0.654, 0.901, ...]</div>
          </div>
          ${[
            ['SESS-042: UPI fraud, verify@paytm', 0.94],
            ['SESS-031: KYC scam, bank block threat', 0.89],
            ['SESS-019: Police impersonation + fine', 0.82],
          ].map(([label, score]) => `
            <div class="similarity-row">
              <span class="sim-label">${label}</span>
              <span class="sim-score">${score}</span>
              <div class="sim-bar"><div class="sim-fill" style="width:${score*100}%;"></div></div>
            </div>`).join('')}
          <div class="cache-info">
            ✓ Retrieved in 23ms via PGVector cosine similarity<br/>
            ✓ Boosted by shared entities: verify@paytm (+0.1)<br/>
            ✓ Cached in Redis for next 60 minutes
          </div>
        </div>
      </div>
    </div>`;
}

// ════════════════════════════════════════════════════════════════════════
//  ANALYTICS PAGE
// ════════════════════════════════════════════════════════════════════════
let analyticsTab = 'overview';

function renderAnalytics() {
  const tabs = ['overview','intelligence','models','geography','patterns'];
  return `
    <div class="flex-col">
      <div class="tab-bar">
        ${tabs.map(t => `
          <button class="tab-btn${analyticsTab===t?' active':''}" onclick="setAnalyticsTab('${t}')">${t}</button>
        `).join('')}
      </div>
      <div id="analyticsContent"></div>
    </div>`;
}

function setAnalyticsTab(tab) {
  analyticsTab = tab;
  // Re-render just the tab bar active state
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent === tab);
  });
  renderAnalyticsContent();
}

function renderAnalyticsContent() {
  const container = document.getElementById('analyticsContent');
  if (!container) return;

  if (analyticsTab === 'overview') {
    container.innerHTML = `
      <div class="flex-col">
        <div class="grid-2">
          <div class="card">
            ${sectionTitle('trending','Sessions & Threats (7 days)','')}
            <div class="chart-container" style="height:200px;"><canvas id="chartSessions"></canvas></div>
          </div>
          <div class="card">
            ${sectionTitle('bar','Entities Extracted Daily','')}
            <div class="chart-container" style="height:200px;"><canvas id="chartEntities"></canvas></div>
          </div>
        </div>
        <div class="grid-3">
          <div class="card">
            ${sectionTitle('eye','Scam Types','')}
            <div class="chart-container" style="height:180px;"><canvas id="chartPieScam"></canvas></div>
          </div>
          <div class="card">
            ${sectionTitle('brain','AI Models Used','')}
            <div class="chart-container" style="height:180px;"><canvas id="chartPieModel"></canvas></div>
          </div>
          <div class="card">
            ${sectionTitle('alert','Threat Severity','')}
            <div class="chart-container" style="height:180px;"><canvas id="chartPieSev"></canvas></div>
          </div>
        </div>
        <div class="grid-2">
          <div class="card">
            ${sectionTitle('net','Sara Performance Radar','vs baseline AI')}
            <div class="chart-container" style="height:220px;"><canvas id="chartRadar"></canvas></div>
          </div>
          <div class="card">
            ${sectionTitle('trending','Threat Score Timeline (SESS-003)','Real-time threat escalation')}
            <div class="chart-container" style="height:220px;"><canvas id="chartTimeline"></canvas></div>
          </div>
        </div>
      </div>`;
    setTimeout(() => {
      renderSessionsChart();
      renderEntitiesChart();
      renderPieChart('chartPieScam', SCAM_PIE);
      renderPieChart('chartPieModel', MODEL_PIE);
      renderPieChart('chartPieSev', SEVERITY_PIE);
      renderRadarChart();
      renderTimelineChart();
    }, 50);

  } else if (analyticsTab === 'intelligence') {
    container.innerHTML = `
      <div class="flex-col">
        <div class="card">
          ${sectionTitle('db','Intelligence Treemap — Entity Distribution','Size = count extracted')}
          <div id="treemapContainer" style="height:350px;"></div>
        </div>
        <div class="grid-2">
          <div class="card">
            ${sectionTitle('target','Extraction Confidence Heatmap','')}
            <div style="display:flex;flex-direction:column;gap:8px;">
              ${INTELLIGENCE.slice(0,8).map((e,i) => `
                <div style="display:flex;align-items:center;gap:12px;">
                  ${makeBadge(e.type, PIE_COLORS[i%8])}
                  <div style="flex:1;height:6px;background:#1e293b;border-radius:3px;overflow:hidden;">
                    <div style="height:100%;width:${e.confidence}%;background:${PIE_COLORS[i%8]};border-radius:3px;transition:width .5s;"></div>
                  </div>
                  <span class="mono s400" style="width:32px;font-size:11px;">${e.confidence}%</span>
                </div>`).join('')}
            </div>
          </div>
          <div class="card">
            ${sectionTitle('clock','Extraction Speed by Method','')}
            <div class="chart-container" style="height:200px;"><canvas id="chartSpeed"></canvas></div>
          </div>
        </div>
      </div>`;
    setTimeout(() => {
      renderTreemap('treemapContainer');
      renderSpeedChart();
    }, 50);

  } else if (analyticsTab === 'models') {
    container.innerHTML = `
      <div class="flex-col">
        <div class="grid-2">
          <div class="card">
            ${sectionTitle('db','Cost per Session by Model','')}
            <div class="chart-container" style="height:250px;"><canvas id="chartModelCost"></canvas></div>
          </div>
          <div class="card">
            ${sectionTitle('trending','Model Latency Distribution','')}
            <div class="chart-container" style="height:250px;"><canvas id="chartLatency"></canvas></div>
          </div>
        </div>
        <div class="card">
          ${sectionTitle('net','CascadeFlow Escalation Tree','Model selection routing visualization')}
          <div class="cascade-tree">
            <div class="cascade-node" style="background:rgba(13,148,136,.13);border:2px solid #0d9488;color:#0d9488;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;vertical-align:middle;margin-right:6px;">${ICON.db}</svg>
              New Request
            </div>
            <div class="cascade-line"></div>
            <div class="cascade-node" style="background:#1e293b;border:1px solid #334155;color:#cbd5e1;font-weight:500;font-size:12px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;vertical-align:middle;margin-right:4px;">${ICON.brain}</svg>
              Local Processing (0ms, ₹0)
            </div>
            <div class="cascade-split">
              <div class="cascade-split-branch">
                <div class="cascade-line"></div>
                <div class="cascade-leaf" style="background:rgba(34,197,94,.13);border:1px solid rgba(34,197,94,.27);color:#22c55e;">Quality ≥ 0.9 → Done</div>
              </div>
              <div class="cascade-split-branch">
                <div class="cascade-line"></div>
                <div class="cascade-leaf" style="background:rgba(245,158,11,.13);border:1px solid rgba(245,158,11,.27);color:#f59e0b;">Quality &lt; 0.9 → Escalate</div>
              </div>
            </div>
            <div class="cascade-line"></div>
            <div class="cascade-node" style="background:rgba(59,130,246,.13);border:1px solid rgba(59,130,246,.27);color:#3b82f6;font-size:12px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;vertical-align:middle;margin-right:4px;">${ICON.trending}</svg>
              Groq Llama3 (180ms avg, ₹0.04/session)
            </div>
            <div class="cascade-split">
              <div class="cascade-split-branch">
                <div class="cascade-line"></div>
                <div class="cascade-leaf" style="background:rgba(34,197,94,.13);border:1px solid rgba(34,197,94,.27);color:#22c55e;">Quality ≥ 0.82 → Done</div>
              </div>
              <div class="cascade-split-branch">
                <div class="cascade-line"></div>
                <div class="cascade-leaf" style="background:rgba(245,158,11,.13);border:1px solid rgba(245,158,11,.27);color:#f59e0b;">Quality &lt; 0.82 → Escalate</div>
              </div>
            </div>
            <div class="cascade-line"></div>
            <div class="cascade-node" style="background:rgba(139,92,246,.13);border:1px solid rgba(139,92,246,.27);color:#8b5cf6;font-size:12px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;vertical-align:middle;margin-right:4px;">${ICON.brain}</svg>
              Claude 3.5 Sonnet (1.3s avg, ₹0.18/session)
            </div>
          </div>
        </div>
      </div>`;
    setTimeout(() => { renderModelCostChart(); renderLatencyChart(); }, 50);

  } else if (analyticsTab === 'geography') {
    container.innerHTML = `
      <div class="flex-col">
        <div class="card">
          ${sectionTitle('map','Scam Origins by City','Session volume heatmap')}
          <div class="chart-container" style="height:280px;"><canvas id="chartCity"></canvas></div>
        </div>
        <div class="grid-2">
          <div class="card">
            ${sectionTitle('bar','Scam Type by Region','')}
            <div class="chart-container" style="height:220px;"><canvas id="chartRegion"></canvas></div>
          </div>
          <div class="card">
            ${sectionTitle('clock','Peak Scam Hours (IST)','')}
            <div class="chart-container" style="height:220px;"><canvas id="chartPeak"></canvas></div>
          </div>
        </div>
      </div>`;
    setTimeout(() => { renderCityChart(); renderRegionChart(); renderPeakChart(); }, 50);

  } else if (analyticsTab === 'patterns') {
    container.innerHTML = `
      <div class="flex-col">
        <div class="card">
          ${sectionTitle('brain','Hindsight Memory — Learned Patterns','PGVector similarity search results')}
          <div style="display:flex;flex-direction:column;gap:10px;">
            ${MEMORY_PATTERNS.map((p,i) => `
              <div style="display:flex;align-items:center;gap:12px;background:#1e293b;border-radius:8px;padding:12px 16px;border:1px solid #334155;">
                <span style="background:${PIE_COLORS[i%8]}22;color:${PIE_COLORS[i%8]};border:1px solid ${PIE_COLORS[i%8]}44;border-radius:8px;padding:4px 10px;font-size:11px;font-family:monospace;flex-shrink:0;">${p.id}</span>
                <div style="flex:1;">
                  <div style="font-size:13px;font-weight:600;color:#e2e8f0;">${p.pattern}</div>
                  <div style="font-size:11px;color:#64748b;">${p.sessions} sessions matched · Last: ${p.lastSeen}</div>
                </div>
                <div style="text-align:right;flex-shrink:0;">
                  <div style="font-size:14px;font-weight:700;color:#0d9488;font-family:monospace;">${p.confidence}%</div>
                  <div style="font-size:10px;color:#64748b;">confidence</div>
                </div>
                <div style="width:80px;">${makeThreatBar(p.confidence)}</div>
              </div>`).join('')}
          </div>
        </div>
        <div class="grid-2">
          <div class="card">
            ${sectionTitle('net','Pattern Co-occurrence','')}
            <div class="chart-container" style="height:220px;"><canvas id="chartCooccurrence"></canvas></div>
          </div>
          <div class="card">
            ${sectionTitle('trending','Pattern Detection Rate','')}
            <div class="chart-container" style="height:220px;"><canvas id="chartPatternRate"></canvas></div>
          </div>
        </div>
      </div>`;
    setTimeout(() => { renderCooccurrenceChart(); renderPatternRateChart(); }, 50);
  }
}

// ════════════════════════════════════════════════════════════════════════
//  CYBERCRIME PAGE
// ════════════════════════════════════════════════════════════════════════
function renderCybercrime() {
  const portalColors = PIE_COLORS;
  return `
    <div class="flex-col">
      ${sectionTitle('alert','Cybercrime Reporting Center','Direct integration with national law enforcement portals')}

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px;">
        ${CYBERCRIME_PORTALS.map((p,i) => `
          <div class="card portal-card" style="border:1px solid ${portalColors[i]}33;">
            <div class="portal-card-header">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${portalColors[i]}" stroke-width="2">${ICON.shield}</svg>
              <div>
                <div class="portal-card-name">${p.name}</div>
                <div class="portal-card-desc">${p.desc}</div>
              </div>
            </div>
            <a href="${p.url}" target="_blank" rel="noopener" class="portal-visit"
               style="background:${portalColors[i]}22;border-color:${portalColors[i]}44;color:${portalColors[i]};">
              Visit Portal →
            </a>
          </div>`).join('')}
      </div>

      <div class="card">
        ${sectionTitle('db','Quick Complaint — Auto-fill from Sara AI Session','')}
        <p style="font-size:12px;color:#64748b;margin-bottom:16px;">Select a session below to auto-fill all evidence captured by Sara AI</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;">
          ${SESSIONS.map(s => `
            <button class="session-report-btn" onclick="openComplaintModal(SESSIONS.find(x=>x.id==='${s.id}'))">
              <div class="session-report-id">${s.id}</div>
              <div class="session-report-type">${s.type}</div>
              <div class="session-report-ent">${s.entities} entities captured</div>
              <div class="session-report-cta">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;vertical-align:middle;margin-right:4px;">${ICON.alert}</svg>
                File Complaint →
              </div>
            </button>`).join('')}
        </div>
      </div>

      <div class="card">
        ${sectionTitle('bar','Complaints Filed (Last 30 Days)','')}
        <div class="chart-container" style="height:200px;"><canvas id="chartComplaints"></canvas></div>
      </div>
    </div>`;
}

// ════════════════════════════════════════════════════════════════════════
//  SETTINGS PAGE
// ════════════════════════════════════════════════════════════════════════
function renderSettings() {
  const sections = [
    { title:'AI Model Config', fields:[
      { label:'Primary Model',    value:'Groq Llama3 (Tier 2)',         type:'text' },
      { label:'Fallback Model',   value:'Claude 3.5 Sonnet (Tier 4)',   type:'text' },
      { label:'Monthly Budget (₹)',value:'5000',                        type:'number' },
      { label:'Max Latency (ms)', value:'2000',                        type:'number' },
    ]},
    { title:'Sara Persona', fields:[
      { label:"Sara's Name",    value:'Sara Sharma', type:'text' },
      { label:'Age',            value:'47',          type:'number' },
      { label:'City',           value:'Jaipur',      type:'text' },
      { label:'Husband Name',   value:'Suresh ji',   type:'text' },
    ]},
    { title:'Safety Filters', fields:[
      { label:'AI Reveal Protection',  value:'Triple-layer (Active)', type:'text' },
      { label:'Injection Detection',   value:'Enabled',              type:'text' },
      { label:'Abuse Threshold',       value:'85',                   type:'number' },
      { label:'Auto-End Threat',       value:'90',                   type:'number' },
    ]},
    { title:'Webhook Config', fields:[
      { label:'Webhook URL',     value:'https://your-server.com/webhook', type:'text' },
      { label:'Secret Key',      value:'whsec_••••••••',                 type:'password' },
      { label:'Events',          value:'session, intel, pattern',         type:'text' },
      { label:'Retry Attempts',  value:'5',                              type:'number' },
    ]},
  ];

  return `
    <div class="flex-col">
      ${sectionTitle('settings','Platform Settings','')}
      <div class="grid-2">
        ${sections.map(sec => `
          <div class="card">
            <div class="settings-card-title">${sec.title}</div>
            <div style="display:flex;flex-direction:column;gap:12px;">
              ${sec.fields.map(f => `
                <div class="settings-group">
                  <label class="settings-label">${f.label}</label>
                  <input type="${f.type}" value="${f.value}" />
                </div>`).join('')}
            </div>
            <button class="settings-save" onclick="saveSetting(this)">Save Changes</button>
          </div>`).join('')}
      </div>
    </div>`;
}

function saveSetting(btn) {
  btn.textContent = 'Saved!';
  btn.style.background = '#22c55e';
  setTimeout(() => {
    btn.textContent = 'Save Changes';
    btn.style.background = '';
  }, 1500);
}