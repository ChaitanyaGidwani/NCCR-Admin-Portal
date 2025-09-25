// NCCR Portal v2 - shared JS
const STORAGE_USER_KEY = "nccr_user_v2";
const STORAGE_DATA_KEY = "nccr_demo_data_v2";

function isLoggedIn(){ return !!localStorage.getItem(STORAGE_USER_KEY); }
function getUser(){ const s = localStorage.getItem(STORAGE_USER_KEY); return s?JSON.parse(s):null; }
function requireAuth(redirect="/login.html"){ if(!isLoggedIn()){ location.href = redirect; } else { const u=getUser(); const el=document.getElementById('header-user'); if(el) el.textContent = u.name; } }
function logout(){ localStorage.removeItem(STORAGE_USER_KEY); location.href='/login.html'; }

function ensureDemoData(){
  if(!localStorage.getItem(STORAGE_DATA_KEY)){
    const data = {
      projects: [
        {id:"P-001", name:"Mangrove Restore — Andhra", location:"Krishna, Andhra Pradesh", status:"Pending", hectares:120, credits:5000, ngo:"Coastal Guardians"},
        {id:"P-002", name:"Seagrass Pilot — Kerala", location:"Kochi, Kerala", status:"Approved", hectares:45, credits:3750, ngo:"BlueEarth NGO"},
        {id:"P-003", name:"Dune Stabilization — Odisha", location:"Puri, Odisha", status:"Rejected", hectares:60, credits:6000, ngo:"Mangrove Trust"},
        {id:"P-004", name:"Mangrove Restore — TN", location:"Chennai, Tamil Nadu", status:"Approved", hectares:90, credits:4200, ngo:"GreenCoast"},
        {id:"P-005", name:"Seagrass Expand — Goa", location:"Goa", status:"Pending", hectares:30, credits:1500, ngo:"BlueEarth NGO"}
      ],
      ngos: [
        {id:"N-01", name:"Coastal Guardians", projects:5, email:"contact@cg.org", phone:"+91 98765 43210"},
        {id:"N-02", name:"BlueEarth NGO", projects:3, email:"info@blueearth.org", phone:"+91 91234 56789"},
        {id:"N-03", name:"Mangrove Trust", projects:7, email:"hello@mangrove.org", phone:"+91 99876 54321"},
        {id:"N-04", name:"GreenCoast", projects:2, email:"team@greencoast.org", phone:"+91 91111 22222"}
      ],
      credits: [
        {id:"C-1001", project:"P-001", amount:5000, owner:"Coastal Guardians", issued:"2025-02-10"},
        {id:"C-1002", project:"P-002", amount:3750, owner:"BlueEarth NGO", issued:"2025-03-05"},
        {id:"C-1003", project:"P-003", amount:6000, owner:"Mangrove Trust", issued:"2025-04-01"},
        {id:"C-1004", project:"P-004", amount:4200, owner:"GreenCoast", issued:"2025-05-10"},
        {id:"C-1005", project:"P-005", amount:1500, owner:"BlueEarth NGO", issued:"2025-06-12"}
      ],
      trades: []
    };
    localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(data));
  }
  return JSON.parse(localStorage.getItem(STORAGE_DATA_KEY));
}

function saveData(data){ localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(data)); }
function formatNumber(n){ return n.toLocaleString(); }

// Nav highlight
function highlightNav(){
  const path = location.pathname.split("/").pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(a=>{
    if(a.getAttribute('href') === path) a.classList.add('active'); else a.classList.remove('active');
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  const logoutBtn = document.getElementById('logout-btn');
  if(logoutBtn) logoutBtn.addEventListener('click', logout);
  highlightNav();
});

// Export utilities for pages
window.NCCR = {
  ensureDemoData, getUser, saveData, formatNumber
};
