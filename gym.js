let members = [
  {id:1, name:'Priya Verma',    phone:'+91 9810234567', email:'priya@mail.com',    age:28, gender:'Female', plan:'Gold',     joined:'2025-01-15', status:'Active',   color:'#f0a500'},
  {id:2, name:'Arjun Mehta',   phone:'+91 9876543210', email:'arjun@mail.com',    age:34, gender:'Male',   plan:'Platinum', joined:'2024-11-20', status:'Active',   color:'#5b8cf5'},
  {id:3, name:'Sneha Rao',     phone:'+91 9988776655', email:'sneha@mail.com',    age:26, gender:'Female', plan:'Silver',   joined:'2025-02-10', status:'Active',   color:'#3ecf8e'},
  {id:4, name:'Vikram Singh',  phone:'+91 9123456789', email:'vikram@mail.com',   age:41, gender:'Male',   plan:'Gold',     joined:'2024-09-05', status:'Inactive', color:'#e05252'},
  {id:5, name:'Kavya Nair',    phone:'+91 9345678901', email:'kavya@mail.com',    age:23, gender:'Female', plan:'Silver',   joined:'2025-03-01', status:'Active',   color:'#c77dff'},
  {id:6, name:'Rohan Das',     phone:'+91 9456781234', email:'rohan@mail.com',    age:30, gender:'Male',   plan:'Platinum', joined:'2025-01-28', status:'Active',   color:'#f0a500'},
  {id:7, name:'Meera Joshi',   phone:'+91 9567890123', email:'meera@mail.com',    age:31, gender:'Female', plan:'Gold',     joined:'2025-04-10', status:'Active',   color:'#3ecf8e'},
];
let classes = [
  {id:1, name:'Morning Yoga',  trainer:'Ms. Divya', time:'06:00', day:'Monday',    enrolled:18, capacity:20},
  {id:2, name:'Zumba Dance',   trainer:'Mr. Kiran', time:'08:30', day:'Wednesday', enrolled:24, capacity:30},
  {id:3, name:'CrossFit',      trainer:'Mr. Rahul', time:'17:00', day:'Monday',    enrolled:12, capacity:15},
  {id:4, name:'Spin Cycle',    trainer:'Ms. Pooja', time:'07:00', day:'Friday',    enrolled:10, capacity:10},
  {id:5, name:'Pilates',       trainer:'Ms. Anita', time:'10:00', day:'Saturday',  enrolled:8,  capacity:15},
  {id:6, name:'Boxing',        trainer:'Mr. Suresh',time:'19:00', day:'Thursday',  enrolled:16, capacity:20},
];
let equipment = [
  {name:'Treadmill',      qty:8,  condition:'Good',         serviced:'2025-04-01'},
  {name:'Dumbbells Set',  qty:20, condition:'Excellent',    serviced:'2025-03-15'},
  {name:'Bench Press',    qty:5,  condition:'Fair',          serviced:'2025-02-20'},
  {name:'Rowing Machine', qty:4,  condition:'Good',         serviced:'2025-04-10'},
  {name:'Leg Press',      qty:3,  condition:'Needs Repair', serviced:'2025-01-05'},
  {name:'Pull-up Bar',    qty:6,  condition:'Excellent',    serviced:'2025-04-20'},
  {name:'Kettlebells',    qty:12, condition:'Good',         serviced:'2025-03-28'},
  {name:'Battle Ropes',   qty:2,  condition:'Fair',          serviced:'2025-02-05'},
  {name:'Gymnastics Mat', qty:10, condition:'Excellent',    serviced:'2025-04-15'},
];
let payments = [
  {member:'Priya Verma',   amount:1799, plan:'Gold',     date:'2025-05-01', method:'UPI',   status:'Paid'},
  {member:'Arjun Mehta',   amount:2999, plan:'Platinum', date:'2025-05-01', method:'Card',  status:'Paid'},
  {member:'Sneha Rao',     amount:999,  plan:'Silver',   date:'2025-05-02', method:'Cash',  status:'Paid'},
  {member:'Vikram Singh',  amount:1799, plan:'Gold',     date:'2025-05-01', method:'UPI',   status:'Pending'},
  {member:'Kavya Nair',    amount:999,  plan:'Silver',   date:'2025-05-03', method:'Cash',  status:'Paid'},
  {member:'Rohan Das',     amount:2999, plan:'Platinum', date:'2025-04-01', method:'Card',  status:'Paid'},
  {member:'Meera Joshi',   amount:1799, plan:'Gold',     date:'2025-04-10', method:'NetBanking', status:'Paid'},
];

// attendance: { date: { memberId: 'Present'|'Absent' } }
let attendance = {};
let nextId = 8;
let selectedAttendDate = new Date().toISOString().split('T')[0];

// ── HELPERS ──────────────────────────────────────────────────────────────────
function getInitials(n){ return n.split(' ').map(x=>x[0]).join('').toUpperCase().slice(0,2); }
function planBadge(p){
  if(p==='Gold')     return `<span class="badge badge-gold">${p}</span>`;
  if(p==='Platinum') return `<span class="badge badge-premium">${p}</span>`;
  return `<span class="badge badge-silver">${p}</span>`;
}
function statusBadge(s){
  if(s==='Active') return `<span class="badge badge-active">${s}</span>`;
  if(s==='Inactive') return `<span class="badge badge-inactive">${s}</span>`;
  return `<span class="badge badge-pending">${s}</span>`;
}
function planRevenue(p){ return p==='Platinum'?2999:p==='Gold'?1799:999; }
function calcExpiry(joined){
  const d = new Date(joined); d.setMonth(d.getMonth()+1);
  return d.toISOString().split('T')[0];
}
function condColor(c){
  return {Excellent:'var(--accent3)', Good:'#5b8cf5', Fair:'var(--accent)', 'Needs Repair':'var(--accent2)'}[c] || 'var(--muted)';
}
function condFill(c){
  return {Excellent:100, Good:75, Fair:45, 'Needs Repair':15}[c] || 50;
}
function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 2800);
}

// ── RENDER STATS ─────────────────────────────────────────────────────────────
function renderStats(){
  const active = members.filter(m=>m.status==='Active');
  document.getElementById('statTotal').textContent   = members.length;
  document.getElementById('statActive').textContent  = active.length;
  const rev = active.reduce((s,m)=>s+planRevenue(m.plan),0);
  document.getElementById('statRevenue').textContent = '₹'+rev.toLocaleString('en-IN');
  document.getElementById('statClasses').textContent = classes.length;

  const payT = payments.reduce((s,p)=>s+(p.status==='Paid'?p.amount:0),0);
  const payM = payments.filter(p=>p.status==='Paid'&&p.date.startsWith('2025-05')).reduce((s,p)=>s+p.amount,0);
  const payP = payments.filter(p=>p.status==='Pending').reduce((s,p)=>s+p.amount,0);
  document.getElementById('payTotal').textContent   = '₹'+payT.toLocaleString('en-IN');
  document.getElementById('payMonth').textContent   = '₹'+payM.toLocaleString('en-IN');
  document.getElementById('payPending').textContent = '₹'+payP.toLocaleString('en-IN');
}

// ── DASHBOARD ────────────────────────────────────────────────────────────────
function renderRecentMembers(){
  document.getElementById('recentMembersTable').innerHTML =
    members.slice(-6).reverse().map(m=>`<tr>
      <td><div class="member-cell">
        <div class="avatar" style="background:${m.color}22;color:${m.color}">${getInitials(m.name)}</div>
        <div><div>${m.name}</div><div style="font-size:11px;color:var(--muted)">${m.email}</div></div>
      </div></td>
      <td>${planBadge(m.plan)}</td>
      <td>${m.joined}</td>
      <td>${statusBadge(m.status)}</td>
    </tr>`).join('');
}
function renderDashClasses(){
  document.getElementById('dashClasses').innerHTML = classes.slice(0,6).map(c=>{
    const pct = Math.min(c.enrolled/c.capacity,1);
    const cls = pct>=1?'full':pct>=.8?'warn':'';
    return `<div class="class-item">
      <div>
        <div class="class-name">${c.name}</div>
        <div class="class-time">${c.time} · ${c.day} · ${c.trainer}</div>
      </div>
      <div style="text-align:right">
        <div style="font-size:12px;color:var(--muted)">${c.enrolled}/${c.capacity}</div>
        <div class="capacity-bar"><div class="capacity-fill ${cls}" style="width:${pct*100}%"></div></div>
      </div>
    </div>`;
  }).join('');
}
function renderRevenueBars(){
  const months = ['Dec','Jan','Feb','Mar','Apr','May'];
  const vals   = [42000,51000,48000,63000,58000,71000];
  const max    = Math.max(...vals);
  document.getElementById('revenueBars').innerHTML = months.map((m,i)=>`
    <div class="rev-bar-wrap">
      <div class="rev-val">₹${Math.round(vals[i]/1000)}k</div>
      <div class="rev-bar" style="height:${Math.round(vals[i]/max*90)}px;background:${i===5?'var(--accent)':'rgba(240,165,0,.35)'};width:100%"></div>
      <div class="rev-label">${m}</div>
    </div>`).join('');
}

// ── MEMBERS TABLE ─────────────────────────────────────────────────────────────
function renderMembersTable(list){
  list = list || members;tent = list.length;
  document.getElementById('membersTable').innerHTML = list.map(m=>`<tr>
    <td><div class="member-cell">
      <div class="avatar" style="background:${m.color}22;color:${m.color}">${getInitials(m.name)}</div>
      <div><div style="font-weight:500">${m.name}</div><div style="font-size:11px;color:var(--muted)">${m.email}</div></div>
    </div></td>
  document.getElementById('memberCount').textCon
    <td>${m.phone}</td>
    <td>${planBadge(m.plan)}</td>
    <td>${m.joined}</td>
    <td>${calcExpiry(m.joined)}</td>
    <td>${statusBadge(m.status)}</td>
    <td style="display:flex;gap:6px">
      <button class="btn btn-sm btn-ghost" onclick="editMember(${m.id})">Edit</button>
      <button class="btn btn-sm btn-danger" onclick="deleteMember(${m.id})">Remove</button>
    </td>
  </tr>`).join('');
}
// ── CLASSES TABLE ─────────────────────────────────────────────────────────────
function renderClassesTable(){
  document.getElementById('classesTable').innerHTML = classes.map(c=>{
    const pct = c.enrolled/c.capacity;
    const st  = pct>=1?'Full':pct>=.8?'Almost Full':'Open';
    const bs  = pct>=1?'badge-inactive':pct>=.8?'badge-pending':'badge-active';
    return `<tr>
      <td><b>${c.name}</b></td>
      <td>${c.trainer}</td>
      <td>${c.time}</td>
      <td>${c.day}</td>
      <td>${c.enrolled} / ${c.capacity}</td>
      <td><span class="badge ${bs}">${st}</span></td>
      <td><button class="btn btn-sm btn-danger" onclick="deleteClass(${c.id})">Remove</button></td>
    </tr>`;
  }).join('');
}

// ── ATTENDANCE ────────────────────────────────────────────────────────────────
function renderAttendDays(){
  const today = new Date();
  let html = '';
  for(let i=6;i>=0;i--){
    const d = new Date(today); d.setDate(today.getDate()-i);
    const dateStr = d.toISOString().split('T')[0];
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const sel = dateStr===selectedAttendDate?'selected':'';
    html += `<div class="attend-day ${sel}" onclick="selectAttendDate('${dateStr}')">
      <div class="attend-day-name">${days[d.getDay()]}</div>
      <div class="attend-day-num">${d.getDate()}</div>
    </div>`;
  }
  document.getElementById('attendDays').innerHTML = html;
  document.getElementById('attendDateLabel').textContent = 'Date: '+selectedAttendDate;
}
function selectAttendDate(d){
  selectedAttendDate = d;
  renderAttendDays();
  renderAttendTable();
}
function renderAttendTable(){
  const dayData = attendance[selectedAttendDate] || {};
  document.getElementById('attendTable').innerHTML = members.map(m=>{
    const st = dayData[m.id] || 'Not Marked';
    const badge = st==='Present'?'badge-active':st==='Absent'?'badge-inactive':'badge-pending';
    return `<tr>
      <td><div class="member-cell">
        <div class="avatar" style="background:${m.color}22;color:${m.color}">${getInitials(m.name)}</div>
        ${m.name}
      </div></td>
      <td>${planBadge(m.plan)}</td>
      <td><span class="badge ${badge}">${st}</span></td>
      <td style="display:flex;gap:6px">
        <button class="btn btn-sm" style="background:rgba(62,207,142,.15);color:var(--accent3);border:none;cursor:pointer" onclick="markAttend(${m.id},'Present')">✓ Present</button>
        <button class="btn btn-sm" style="background:rgba(224,82,82,.15);color:var(--accent2);border:none;cursor:pointer" onclick="markAttend(${m.id},'Absent')">✗ Absent</button>
      </td>
    </tr>`;
  }).join('');
}
function markAttend(id, status){
  if(!attendance[selectedAttendDate]) attendance[selectedAttendDate]={};
  attendance[selectedAttendDate][id] = status;
  renderAttendTable();
  toast('Attendance marked: '+status);
}

// ── PAYMENTS TABLE ────────────────────────────────────────────────────────────
function renderPayments(){
  document.getElementById('paymentsTable').innerHTML = payments.map(p=>`<tr>
    <td><b>${p.member}</b></td>
    <td style="font-weight:600;color:var(--accent)">₹${p.amount.toLocaleString('en-IN')}</td>
    <td>${planBadge(p.plan)}</td>
    <td>${p.date}</td>
    <td><span style="font-size:12px;color:var(--muted)">${p.method||'—'}</span></td>
    <td>${statusBadge(p.status)}</td>
  </tr>`).join('');
}

// ── EQUIPMENT ─────────────────────────────────────────────────────────────────
function renderEquipment(){
  document.getElementById('equipGrid').innerHTML = equipment.map(e=>`
    <div class="equip-item">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div class="equip-name">${e.name}</div>
        <div style="font-size:12px;color:var(--muted);background:var(--surface);padding:2px 8px;border-radius:20px">×${e.qty}</div>
      </div>
      <div style="font-size:12px;margin-top:4px;color:${condColor(e.condition)};font-weight:600">${e.condition}</div>
      <div style="font-size:11px;color:var(--muted);margin-top:2px">Last serviced: ${e.serviced}</div>
      <div class="equip-bar"><div class="equip-fill" style="width:${condFill(e.condition)}%;background:${condColor(e.condition)}"></div></div>
    </div>`).join('');
}

// ── ACTIONS ───────────────────────────────────────────────────────────────────
function addMember(){
  const name = document.getElementById('mName').value.trim();
  if(!name){ alert('Name is required.'); return; }
  const colors = ['#f0a500','#5b8cf5','#3ecf8e','#e05252','#c77dff','#ff9f43','#00cec9'];
  members.push({
    id: nextId++,
    name,
    phone:  document.getElementById('mPhone').value || '—',
    email:  document.getElementById('mEmail').value || '—',
    age:    +document.getElementById('mAge').value || 0,
    gender: document.getElementById('mGender').value,
    plan:   document.getElementById('mPlan').value,
    joined: document.getElementById('mDate').value || new Date().toISOString().split('T')[0],
    status: 'Active',
    color:  colors[Math.floor(Math.random()*colors.length)]
  });
  closeModal('addMemberModal');
  ['mName','mPhone','mEmail','mAge'].forEach(id=>document.getElementById(id).value='');
  renderAll();
  toast('Member added successfully!');
}
function deleteMember(id){
  if(!confirm('Remove this member?')) return;
  members = members.filter(m=>m.id!==id);
  renderAll();
  toast('Member removed.');
}
function editMember(id){
  const m = members.find(x=>x.id===id); if(!m) return;
  document.getElementById('eMid').value    = id;
  document.getElementById('eMname').value  = m.name;
  document.getElementById('eMphone').value = m.phone;
  document.getElementById('eMplan').value  = m.plan;
  document.getElementById('eMstatus').value= m.status;
  openModal('editMemberModal');
}
function saveMember(){
  const id = +document.getElementById('eMid').value;
  const m  = members.find(x=>x.id===id); if(!m) return;
  m.name   = document.getElementById('eMname').value || m.name;
  m.phone  = document.getElementById('eMphone').value || m.phone;
  m.plan   = document.getElementById('eMplan').value;
  m.status = document.getElementById('eMstatus').value;
  closeModal('editMemberModal');
  renderAll();
  toast('Member updated!');
}
function addClass(){
  const name = document.getElementById('cName').value.trim();
  if(!name){ alert('Class name is required.'); return; }
  classes.push({
    id:       classes.length+1,
    name,
    trainer:  document.getElementById('cTrainer').value || 'TBD',
    time:     document.getElementById('cTime').value || '10:00',
    day:      document.getElementById('cDay').value,
    enrolled: 0,
    capacity: +document.getElementById('cCap').value || 20
  });
  closeModal('addClassModal');
  ['cName','cTrainer'].forEach(id=>document.getElementById(id).value='');
  renderAll();
  toast('Class added!');
}
function deleteClass(id){
  classes = classes.filter(c=>c.id!==id);
  renderAll();
  toast('Class removed.');
}
function addEquipment(){
  const name = document.getElementById('eName').value.trim();
  if(!name){ alert('Equipment name required.'); return; }
  equipment.push({
    name,
    qty:       +document.getElementById('eQty').value || 1,
    condition: document.getElementById('eCond').value,
    serviced:  document.getElementById('eService').value || new Date().toISOString().split('T')[0]
  });
  closeModal('addEquipModal');
  document.getElementById('eName').value='';
  renderEquipment();
  toast('Equipment added!');
}
function addPayment(){
  const member = document.getElementById('pMember').value;
  const amount = +document.getElementById('pAmount').value;
  if(!member || !amount){ alert('Member and amount required.'); return; }
  const mem = members.find(m=>m.name===member);
  payments.unshift({
    member, amount, plan: mem?mem.plan:'—',
    date:   document.getElementById('pDate').value || new Date().toISOString().split('T')[0],
    method: document.getElementById('pMethod').value,
    status: document.getElementById('pStatus').value
  });
  closeModal('addPaymentModal');
  renderAll();
  toast('Payment recorded!');
}

// ── SEARCH ───────────────────────────────────────────────────────────────────
function searchMembers(q){
  if(!q.trim()){ renderMembersTable(); return; }
  const res = members.filter(m=>
    m.name.toLowerCase().includes(q.toLowerCase()) ||
    m.email.toLowerCase().includes(q.toLowerCase()) ||
    m.phone.includes(q)
  );
  renderMembersTable(res);
  showPage('members', document.querySelectorAll('.nav-item')[1]);
}

// ── MODAL ─────────────────────────────────────────────────────────────────────
function openModal(id){
  document.getElementById(id).classList.add('open');
  if(id==='addMemberModal'){
    document.getElementById('mDate').value = new Date().toISOString().split('T')[0];
  }
  if(id==='addPaymentModal'){
    document.getElementById('pDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('pMember').innerHTML = members.map(m=>`<option>${m.name}</option>`).join('');
    const sel = document.getElementById('pMember');
    if(sel.options.length>0){
      const m = members.find(x=>x.name===sel.value);
      document.getElementById('pAmount').value = m?planRevenue(m.plan):'';
    }
    sel.onchange=()=>{
      const m=members.find(x=>x.name===sel.value);
      document.getElementById('pAmount').value=m?planRevenue(m.plan):'';
    };
  }
  if(id==='addEquipModal'){
    document.getElementById('eService').value = new Date().toISOString().split('T')[0];
  }
}
function closeModal(id){ document.getElementById(id).classList.remove('open'); }

// close on backdrop click
document.querySelectorAll('.modal-backdrop').forEach(m=>{
  m.addEventListener('click',e=>{ if(e.target===m) m.classList.remove('open'); });
});

// ── NAVIGATION ───────────────────────────────────────────────────────────────
function showPage(page, el){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  document.getElementById('page-'+page).classList.add('active');
  if(el) el.classList.add('active');
  const titles = {
    dashboard:'Dashboard', members:'Members', classes:'Class Schedule',
    attendance:'Attendance', payments:'Payments', equipment:'Equipment', plans:'Membership Plans'
  };
  document.getElementById('pageTitle').textContent = titles[page] || page;
  if(page==='attendance'){ renderAttendDays(); renderAttendTable(); }
}

// ── RENDER ALL ───────────────────────────────────────────────────────────────
function renderAll() {
    try {
        renderStats();
        console.log("✓ renderStats");

        renderRecentMembers();
        console.log("✓ renderRecentMembers");

        renderDashClasses();
        console.log("✓ renderDashClasses");

        renderRevenueBars();
        console.log("✓ renderRevenueBars");

        renderMembersTable();
        console.log("✓ renderMembersTable");

        renderClassesTable();
        console.log("✓ renderClassesTable");

        renderPayments();
        console.log("✓ renderPayments");

        renderEquipment();
        console.log("✓ renderEquipment");

    } catch (error) {
        alert("JavaScript Error:\n\n" + error.message);
        console.error(error);
    }
}

renderAll();
showPage('dashboard');