// ═══════════════════════════════════════════════════════════════════════
//  SARA AI — Chat Panel
// ═══════════════════════════════════════════════════════════════════════

let chatMessages = [...CHAT_HISTORY];
let saraThinking = false;
let ttsActive    = false;
let sttActive    = false;
let ttsTimer     = null;

// Web Speech API
let recognition = null;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-IN';
}

function speakText(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'hi-IN';
  utt.rate = 0.9;
  utt.pitch = 1.1;
  const voices = window.speechSynthesis.getVoices();
  const hiVoice = voices.find(v => v.lang.startsWith('hi'));
  if (hiVoice) utt.voice = hiVoice;
  utt.onend = () => { ttsActive = false; updateTTSIndicator(); };
  window.speechSynthesis.speak(utt);
}

function updateTTSIndicator() {
  const ind = document.getElementById('speakingIndicator');
  if (!ind) return;
  ind.style.display = ttsActive || saraThinking ? 'flex' : 'none';
}

function updateWaveform() {
  const bars = document.querySelectorAll('.wave-bar');
  bars.forEach(bar => {
    if (ttsActive || saraThinking) {
      bar.classList.add('active');
      const h = Math.random() * 24 + 6;
      bar.style.height = h + 'px';
    } else {
      bar.classList.remove('active');
      bar.style.height = '4px';
    }
  });
}

setInterval(updateWaveform, 100);

function renderChatMessages() {
  const container = document.getElementById('chatMessages');
  if (!container) return;

  let html = '';
  for (const msg of chatMessages) {
    const isSara = msg.role === 'sara';
    const roleLabel = isSara
      ? `<svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="#22c55e"/></svg> SARA SHARMA`
      : `<svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="#ef4444"/></svg> SCAMMER`;
    const entHtml = (msg.entities || []).length > 0
      ? `<div class="msg-entities">${msg.entities.map(e => makeBadge('Target: ' + e, '#f59e0b')).join('')}</div>`
      : '';
    html += `
      <div class="msg-wrap-${isSara ? 'sara' : 'scammer'}">
        <div class="msg-bubble ${isSara ? 'sara' : 'scammer'}">
          <div class="msg-role ${isSara ? 'sara' : 'scammer'}">${roleLabel} · ${msg.time}</div>
          <p class="msg-text">${escapeHtml(msg.text)}</p>
          ${entHtml}
        </div>
      </div>`;
  }

  if (saraThinking) {
    html += `
      <div class="msg-wrap-sara">
        <div class="thinking-bubble">
          <div class="msg-role sara"><svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="#22c55e"/></svg> SARA SHARMA · Processing...</div>
          <div class="thinking-dots">
            <div class="thinking-dot"></div>
            <div class="thinking-dot"></div>
            <div class="thinking-dot"></div>
            <span class="thinking-label">Groq Llama3 generating response...</span>
          </div>
        </div>
      </div>`;
  }

  container.innerHTML = html;
  container.scrollTop = container.scrollHeight;
}

function simulateSara() {
  if (saraThinking) return;
  saraThinking = true;
  updateTTSIndicator();
  renderChatMessages();

  const delay = 1500 + Math.random() * 1000;
  setTimeout(() => {
    const resp = SARA_RESPONSES[Math.floor(Math.random() * SARA_RESPONSES.length)];
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    chatMessages.push({ role: 'sara', text: resp, time, entities: [] });
    saraThinking = false;
    ttsActive = true;
    updateTTSIndicator();
    renderChatMessages();
    speakText(resp);
    if (ttsTimer) clearTimeout(ttsTimer);
    ttsTimer = setTimeout(() => { ttsActive = false; updateTTSIndicator(); }, 4000);

    // Emit to socket if connected
    if (window._socket) {
      window._socket.emit('sara_message', { text: resp, time, session: window.selectedSession?.id });
    }
  }, delay);
}

function sendScammerMessage(text) {
  if (!text.trim()) return;
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  chatMessages.push({ role: 'scammer', text, time, entities: [] });
  renderChatMessages();

  if (window._socket) {
    window._socket.emit('scammer_message', { text, time, session: window.selectedSession?.id });
  }
  simulateSara();
}

function toggleSTT() {
  if (!recognition) {
    // Fallback simulation
    sttActive = !sttActive;
    const sttBtn = document.getElementById('sttBtn');
    const input  = document.getElementById('chatInput');
    if (sttBtn) sttBtn.classList.toggle('active', sttActive);
    if (sttActive && input) {
      input.placeholder = 'Listening... (STT active)';
      setTimeout(() => {
        input.value = 'Madam aapko abhi ₹5000 transfer karne honge verify@ybl pe';
        sttActive = false;
        if (sttBtn) sttBtn.classList.remove('active');
        input.placeholder = 'Type scammer message...';
      }, 2000);
    }
    return;
  }

  if (sttActive) {
    recognition.stop();
    sttActive = false;
  } else {
    sttActive = true;
    recognition.start();
  }
  const sttBtn = document.getElementById('sttBtn');
  const input  = document.getElementById('chatInput');
  if (sttBtn) sttBtn.classList.toggle('active', sttActive);
  if (input)  input.placeholder = sttActive ? 'Listening... (STT active)' : 'Type scammer message...';
}

if (recognition) {
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    const input = document.getElementById('chatInput');
    if (input) input.value = transcript;
    sttActive = false;
    const sttBtn = document.getElementById('sttBtn');
    if (sttBtn) sttBtn.classList.remove('active');
  };
  recognition.onend = () => {
    sttActive = false;
    const sttBtn = document.getElementById('sttBtn');
    if (sttBtn) sttBtn.classList.remove('active');
  };
}

function initChatListeners() {
  const sendBtn = document.getElementById('sendBtn');
  const saraBtn = document.getElementById('saraReplyBtn');
  const input   = document.getElementById('chatInput');
  const sttBtn  = document.getElementById('sttBtn');

  if (sendBtn) sendBtn.addEventListener('click', () => {
    const val = input?.value || '';
    if (val.trim()) { sendScammerMessage(val); input.value = ''; }
  });
  if (input) input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && input.value.trim()) { sendScammerMessage(input.value); input.value = ''; }
  });
  if (saraBtn) saraBtn.addEventListener('click', () => simulateSara());
  if (sttBtn)  sttBtn.addEventListener('click',  () => toggleSTT());
}

function escapeHtml(str) {
  return str
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

function buildChatPanel(session) {
  return `
    <div class="card chat-panel" style="height:100%;">
      <div class="chat-header">
        <div class="chat-header-left">
          <span class="pulse-dot green"></span>
          <span class="chat-title">${session.id} — ${session.scammer}</span>
        </div>
        <div class="chat-header-right">
          <div class="speaking-indicator" id="speakingIndicator" style="display:none;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M19.07 4.93a10 10 0 010 14.14"/>
              <path d="M15.54 8.46a5 5 0 010 7.07"/>
            </svg>
            SARA SPEAKING
          </div>
          ${makeBadge(session.type, '#f59e0b')}
          ${makeBadge('Threat: ' + session.threat, session.threat >= 70 ? '#ef4444' : '#f59e0b')}
        </div>
      </div>

      <!-- Waveform -->
      <div class="waveform">
        ${Array.from({length:20}, (_,i) => `<div class="wave-bar" style="animation-delay:${i*0.05}s;"></div>`).join('')}
      </div>

      <!-- Messages -->
      <div class="chat-messages" id="chatMessages"></div>

      <!-- Input -->
      <div class="chat-input-area">
        <div class="analyst-label">Analyst Override — Type as scammer to test Sara's responses</div>
        <div class="input-row">
          <button class="stt-btn" id="sttBtn" title="Speech to Text">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
              <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"/>
            </svg>
          </button>
          <input class="chat-input" id="chatInput" placeholder="Type scammer message..." autocomplete="off"/>
          <button class="btn btn-red" id="sendBtn">Send</button>
          <button class="btn btn-teal" id="saraReplyBtn">Sara Reply</button>
        </div>
        <div class="chat-footer-info">
          <span>STT: Web Speech API</span>
          <span class="sep">|</span>
          <span>TTS: speechSynthesis</span>
          <span class="sep">|</span>
          <span>LLM: ${session.model || 'Groq Llama3'}</span>
          <span class="sep">|</span>
          <span class="green">CascadeFlow ✓</span>
        </div>
      </div>
    </div>`;
}