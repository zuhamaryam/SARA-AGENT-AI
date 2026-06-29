// ═══════════════════════════════════════════════════════════════════════
//  SARA AI — Complaint Modal
// ═══════════════════════════════════════════════════════════════════════

let modalStep = 1;
let modalSession = null;

function openComplaintModal(session) {
  modalSession = session;
  modalStep = 1;
  document.getElementById('complaintModal').style.display = 'flex';
  document.getElementById('modalSub').textContent =
    `Session: ${session.id} | Auto-filled from intelligence`;

  // Pre-fill description
  const intel3 = INTELLIGENCE.slice(0, 3).map(e => e.value).join(', ');
  const desc = document.getElementById('fDesc');
  if (desc) {
    desc.value = `Scammer called from ${session.scammer} posing as a bank official. ` +
      `Requested UPI transfer and Aadhaar details. Session ID: ${session.id}. ` +
      `Intelligence captured: ${intel3}.`;
  }

  // Build evidence list
  const list = document.getElementById('evidenceList');
  if (list) {
    list.innerHTML = INTELLIGENCE.slice(0, 5).map((e, i) => `
      <div class="evidence-item" style="${i === 4 ? 'border-bottom:none;' : ''}">
        <div class="evidence-left">
          ${makeBadge(e.type, e.severity === 'critical' ? '#ef4444' : e.severity === 'high' ? '#f59e0b' : '#0d9488')}
          <span class="evidence-val">${e.value}</span>
        </div>
        <span class="evidence-conf">✓ ${e.confidence}%</span>
      </div>`).join('');
  }

  setModalStep(1);
}

function closeComplaintModal() {
  document.getElementById('complaintModal').style.display = 'none';
  modalSession = null;
  modalStep = 1;
  // Reset form
  ['fName','fPhone','fEmail','fState','fType'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

function setModalStep(step) {
  modalStep = step;

  // Update step indicators
  document.querySelectorAll('.step').forEach((el, i) => {
    el.classList.remove('active','done');
    if (i + 1 < step)  el.classList.add('done');
    if (i + 1 === step) el.classList.add('active');
    const num = el.querySelector('.step-num');
    if (num) num.textContent = i + 1 < step ? '✓' : (i + 1);
  });

  // Show correct content panel
  document.getElementById('modalStep1').style.display = step === 1 ? 'block' : 'none';
  document.getElementById('modalStep2').style.display = step === 2 ? 'block' : 'none';
  document.getElementById('modalStep3').style.display = step === 3 ? 'block' : 'none';

  if (step === 3) {
    const ref = 'CC/2025/MH/' + (Math.floor(Math.random() * 900000) + 100000);
    const el = document.getElementById('refNo');
    if (el) el.textContent = ref;

    // Save to backend
    if (modalSession) {
      const payload = {
        sessionId: modalSession.id,
        scammer: modalSession.scammer,
        type: modalSession.type,
        refNo: ref,
        intelligence: INTELLIGENCE.slice(0, 5),
        name:  document.getElementById('fName')?.value,
        phone: document.getElementById('fPhone')?.value,
        email: document.getElementById('fEmail')?.value,
        state: document.getElementById('fState')?.value,
        complaintType: document.getElementById('fType')?.value,
        description:   document.getElementById('fDesc')?.value,
        timestamp: new Date().toISOString(),
      };
      fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {}); // non-blocking
    }
  }
}

function initModalListeners() {
  document.getElementById('modalClose')?.addEventListener('click', closeComplaintModal);
  document.getElementById('modalDone')?.addEventListener('click', closeComplaintModal);
  document.getElementById('modalNext1')?.addEventListener('click', () => setModalStep(2));
  document.getElementById('modalBack2')?.addEventListener('click', () => setModalStep(1));
  document.getElementById('modalSubmit')?.addEventListener('click', () => {
    setModalStep(3);
  });

  // Close on overlay click
  document.getElementById('complaintModal')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('complaintModal')) closeComplaintModal();
  });
}