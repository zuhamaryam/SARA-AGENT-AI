// ═══════════════════════════════════════════════════════════════════════
//  SARA AI — Data Layer (converted from JSX constants)
// ═══════════════════════════════════════════════════════════════════════

const PIE_COLORS = [
  "#0d9488","#3b82f6","#8b5cf6","#f59e0b",
  "#ef4444","#22c55e","#f97316","#ec4899"
];

const SESSIONS = [
  { id:"SESS-001", scammer:"+91-9876543210", type:"UPI Fraud",    threat:87, status:"active", duration:"12m 34s", entities:4, city:"Mumbai",    model:"Groq Llama3",  cost:"₹0.04" },
  { id:"SESS-002", scammer:"+91-9123456789", type:"KYC Fraud",    threat:72, status:"active", duration:"08m 12s", entities:3, city:"Delhi",     model:"Claude 3.5",   cost:"₹0.12" },
  { id:"SESS-003", scammer:"+91-8887776665", type:"Lottery Scam", threat:91, status:"active", duration:"21m 05s", entities:6, city:"Hyderabad", model:"Groq Llama3",  cost:"₹0.06" },
  { id:"SESS-004", scammer:"+91-9012345678", type:"Police Scam",  threat:95, status:"active", duration:"05m 49s", entities:2, city:"Pune",      model:"Claude 3.5",   cost:"₹0.15" },
  { id:"SESS-005", scammer:"+91-7778889990", type:"UPI Fraud",    threat:58, status:"ended",  duration:"03m 22s", entities:2, city:"Chennai",   model:"Groq Llama3",  cost:"₹0.02" },
  { id:"SESS-006", scammer:"+91-9988001122", type:"OTP Scam",     threat:76, status:"ended",  duration:"17m 00s", entities:5, city:"Jaipur",    model:"Qwen 72B",     cost:"₹0.08" },
];

const INTELLIGENCE = [
  { type:"UPI",      value:"scammer@ybl",            confidence:99,  session:"SESS-001", time:"2m ago",  severity:"high"     },
  { type:"PHONE",    value:"+91-9876543210",          confidence:100, session:"SESS-001", time:"2m ago",  severity:"medium"   },
  { type:"BANK",     value:"HDFC Bank",               confidence:95,  session:"SESS-002", time:"5m ago",  severity:"medium"   },
  { type:"URL",      value:"fake-kyc-verify.xyz",     confidence:97,  session:"SESS-002", time:"5m ago",  severity:"high"     },
  { type:"UPI",      value:"fraud2024@paytm",          confidence:98,  session:"SESS-003", time:"8m ago",  severity:"high"     },
  { type:"AADHAAR",  value:"XXXX XXXX 8821",           confidence:92,  session:"SESS-003", time:"8m ago",  severity:"critical" },
  { type:"TELEGRAM", value:"@crypto_profit99",         confidence:96,  session:"SESS-004", time:"11m ago", severity:"high"     },
  { type:"ACCOUNT",  value:"****5821",                confidence:88,  session:"SESS-004", time:"11m ago", severity:"high"     },
  { type:"IFSC",     value:"HDFC0001234",             confidence:100, session:"SESS-005", time:"18m ago", severity:"medium"   },
  { type:"EMAIL",    value:"support@fake-bank.co",    confidence:94,  session:"SESS-006", time:"22m ago", severity:"high"     },
];

const CHAT_HISTORY = [
  { role:"scammer", text:"Hello, I am calling from SBI fraud department. Your account will be blocked in 2 hours unless you verify your KYC immediately.", time:"12:01 PM", entities:["SBI","KYC"] },
  { role:"sara",    text:"Arre bhai, kya hua? Account band ho jayega? Main toh bahut dara hui hoon. Suresh ji bhi ghar pe nahi hain abhi...", time:"12:01 PM", entities:[] },
  { role:"scammer", text:"Yes madam, you must send ₹5000 to this UPI ID: verify@okhdfcbank for KYC verification. It will be refunded in 24 hours.", time:"12:02 PM", entities:["verify@okhdfcbank","₹5000"] },
  { role:"sara",    text:"Ek minute beta, mera chashma dhundhti hoon. UPI ID kya tha? Mera PhonePe thoda slow hai aajkal... aur ye ₹5000 refund bhi hoga na? Suresh ji return karenge kal toh unhe bata dun?", time:"12:02 PM", entities:[] },
  { role:"scammer", text:"Yes yes, full refund. Also give me your Aadhaar number for verification. Our officer ID is EMP-8821.", time:"12:03 PM", entities:["EMP-8821","Aadhaar"] },
  { role:"sara",    text:"Aadhaar... hanji, wo toh almari mein rakha hai. Thoda ruko. Aur aapka naam kya hai beta? Aur ye bank ka phone number kya hai officially? Mera beta CA hai, unhe bhi check karna hoga.", time:"12:03 PM", entities:[] },
];

const SARA_RESPONSES = [
  "Haan beta, mujhe samajh nahi aa raha... Suresh ji se puchna padega. Aap apna naam bataiye pehle?",
  "Arre, itni jaldi? Mera phone toh charge ho raha hai aajkal bahut slow... aap apna UPI ID dobara batao?",
  "Beta, main toh ghabra gayi hoon. Ye paise kis account mein bhejne hain? Aur aapka employee number kya hai officially?",
  "OTP? Hanji, thodi der mein aayega... mera network thoda weak hai. Aap kahan se call kar rahe ho? Kaunsi branch?",
  "Suresh ji ne kaha tha ke bank kabhi OTP nahi mangta phone pe. Aap sure ho? Apna ID card dikhaoge mujhe?",
];

const ANALYTICS_WEEKLY = [
  { day:"Mon", sessions:42, entities:186, threats:8,  cost:2.34 },
  { day:"Tue", sessions:58, entities:241, threats:14, cost:3.12 },
  { day:"Wed", sessions:71, entities:318, threats:19, cost:4.56 },
  { day:"Thu", sessions:65, entities:287, threats:16, cost:3.89 },
  { day:"Fri", sessions:89, entities:412, threats:23, cost:5.67 },
  { day:"Sat", sessions:112,entities:521, threats:31, cost:7.23 },
  { day:"Sun", sessions:94, entities:438, threats:28, cost:6.45 },
];

const SCAM_PIE   = [
  { name:"UPI Fraud", value:38 }, { name:"KYC Fraud", value:22 },
  { name:"Lottery Scam", value:15 }, { name:"Police Scam", value:12 },
  { name:"OTP Scam", value:8 }, { name:"Investment", value:5 },
];
const MODEL_PIE  = [
  { name:"Groq Llama3", value:52 }, { name:"Claude 3.5", value:28 },
  { name:"Qwen 72B", value:14 },    { name:"Local", value:6 },
];
const SEVERITY_PIE = [
  { name:"Critical", value:12 }, { name:"High", value:34 },
  { name:"Medium", value:41 },   { name:"Low", value:13 },
];

const CITY_DATA = [
  { name:"Mumbai",    value:189, color:"#0d9488" },
  { name:"Delhi",     value:156, color:"#3b82f6" },
  { name:"Bangalore", value:134, color:"#8b5cf6" },
  { name:"Hyderabad", value:112, color:"#f59e0b" },
  { name:"Chennai",   value:98,  color:"#ef4444" },
  { name:"Pune",      value:87,  color:"#22c55e" },
  { name:"Jaipur",    value:76,  color:"#f97316" },
  { name:"Kolkata",   value:65,  color:"#ec4899" },
];

const TREEMAP_DATA = [
  { name:"UPI IDs",           size:412, color:"#0d9488" },
  { name:"Phone Numbers",     size:387, color:"#3b82f6" },
  { name:"Bank Names",        size:298, color:"#8b5cf6" },
  { name:"URLs",              size:201, color:"#f59e0b" },
  { name:"Telegram",          size:167, color:"#ef4444" },
  { name:"Email IDs",         size:134, color:"#22c55e" },
  { name:"Aadhaar (masked)",  size:98,  color:"#f97316" },
  { name:"IFSC Codes",        size:87,  color:"#ec4899" },
  { name:"Account Nos.",      size:76,  color:"#06b6d4" },
  { name:"WhatsApp",          size:54,  color:"#a78bfa" },
];

const RADAR_DATA = [
  { metric:"UPI Detection",   sara:95, baseline:70 },
  { metric:"Phone Validation",sara:100,baseline:85 },
  { metric:"URL Scanning",    sara:88, baseline:60 },
  { metric:"AADHAAR Masking", sara:92, baseline:75 },
  { metric:"Bank ID",         sara:90, baseline:80 },
  { metric:"Persona Hold",    sara:97, baseline:55 },
];

const TIMELINE_DATA = [
  { time:"00:00", threat:10 }, { time:"01:00", threat:18 }, { time:"02:00", threat:42 },
  { time:"03:00", threat:75 }, { time:"04:00", threat:68 }, { time:"05:00", threat:82 },
  { time:"06:00", threat:95 }, { time:"07:00", threat:87 }, { time:"08:00", threat:71 },
  { time:"09:00", threat:60 }, { time:"10:00", threat:45 }, { time:"11:00", threat:38 },
];

const CYBERCRIME_PORTALS = [
  { name:"National Cybercrime Portal", url:"https://cybercrime.gov.in", desc:"File FIR online - Ministry of Home Affairs" },
  { name:"CERT-In",                   url:"https://cert-in.org.in",   desc:"Computer Emergency Response Team India" },
  { name:"RBI Ombudsman",             url:"https://rbi.org.in",       desc:"Report banking fraud & UPI scams" },
  { name:"TRAI DND",                  url:"https://trai.gov.in",      desc:"Block spam calls & SMS" },
  { name:"I4C Helpline",              url:"tel:1930",                  desc:"Cyber Crime Helpline: 1930 (24/7)" },
];

const MEMORY_PATTERNS = [
  { id:"PAT-001", pattern:"UPI refund trick",       sessions:23, lastSeen:"2h ago",  confidence:94 },
  { id:"PAT-002", pattern:"Fake KYC officer",        sessions:41, lastSeen:"30m ago", confidence:98 },
  { id:"PAT-003", pattern:"Police intimidation",     sessions:17, lastSeen:"1h ago",  confidence:91 },
  { id:"PAT-004", pattern:"Lottery winner script",   sessions:29, lastSeen:"45m ago", confidence:96 },
  { id:"PAT-005", pattern:"OTP phishing flow",       sessions:35, lastSeen:"15m ago", confidence:97 },
];

// Utility: threat bar color
function threatColor(score) {
  if (score >= 90) return '#ef4444';
  if (score >= 70) return '#f59e0b';
  if (score >= 50) return '#f97316';
  return '#22c55e';
}

// Utility: badge color by severity
function severityColor(sev) {
  if (sev === 'critical') return '#ef4444';
  if (sev === 'high')     return '#f59e0b';
  return '#0d9488';
}

// Utility: build badge HTML
function makeBadge(text, color) {
  const r = parseInt(color.slice(1,3),16);
  const g = parseInt(color.slice(3,5),16);
  const b = parseInt(color.slice(5,7),16);
  return `<span class="badge badge-sm" style="background:rgba(${r},${g},${b},.13);border-color:rgba(${r},${g},${b},.27);color:${color};">${text}</span>`;
}

// Utility: threat bar HTML
function makeThreatBar(score) {
  const c = threatColor(score);
  return `<div class="threat-bar"><div class="threat-bar-fill" style="width:${score}%;background:${c};box-shadow:0 0 8px ${c};"></div></div>`;
}

// Section title helper
function makeSectionTitle(iconSvg, title, subtitle) {
  return `
    <div class="section-title">
      <div class="section-title-row">
        ${iconSvg ? `<svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${iconSvg}</svg>` : ''}
        <h2>${title}</h2>
      </div>
      ${subtitle ? `<p class="section-sub">${subtitle}</p>` : ''}
    </div>`;
}