import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, Search, X, Download } from 'lucide-react';
const A='#14b8a6',SK='contractscannervaultv1',SS='contractscannervaults1',SO='contractscannervaulto1';
interface Item{id:string;title:string;party:string;type:string;startDate:string;endDate:string;value:number;autoRenew:string;status:string;notes:string;isSample?:boolean;}
const SAMPLE:Item[]=
[
  {
    "id": "c1",
    "title": "Office Space Lease",
    "party": "Metro Properties Ltd",
    "type": "Lease",
    "startDate": "2025-01-01",
    "endDate": "2026-07-28",
    "value": 24000,
    "autoRenew": "Yes",
    "status": "Active",
    "notes": "3-month notice required to terminate.",
    "isSample": true
  },
  {
    "id": "c2",
    "title": "IT Support Retainer",
    "party": "TechCare Solutions",
    "type": "Service",
    "startDate": "2026-01-01",
    "endDate": "2026-12-30",
    "value": 6000,
    "autoRenew": "No",
    "status": "Active",
    "notes": "Monthly helpdesk retainer.",
    "isSample": true
  },
  {
    "id": "c3",
    "title": "Web Development",
    "party": "Pixel Agency",
    "type": "Service",
    "startDate": "2026-03-01",
    "endDate": "2026-07-31",
    "value": 15000,
    "autoRenew": "No",
    "status": "Active",
    "notes": "50% upfront, 50% on delivery.",
    "isSample": true
  },
  {
    "id": "c4",
    "title": "Software License",
    "party": "Adobe Systems",
    "type": "License",
    "startDate": "2025-06-01",
    "endDate": "2026-06-23",
    "value": 600,
    "autoRenew": "Yes",
    "status": "Active",
    "notes": "Annual Creative Cloud subscription.",
    "isSample": true
  }
];
function ld<T>(k:string,fb:T):T{try{const v=localStorage.getItem(k);return v?JSON.parse(v):fb;}catch{return fb;}}
function sv<T>(k:string,v:T){localStorage.setItem(k,JSON.stringify(v));}
function uid(){return Math.random().toString(36).slice(2,10);}
export default function App(){
  const [items,setItems]=useState<Item[]>(()=>ld(SK,[]));
  const [ob,setOb]=useState(()=>ld(SO,false));
  const [pg,setPg]=useState('dashboard');
  const [q,setQ]=useState('');
  const [modal,setModal]=useState(false);
  const [edit,setEdit]=useState<any>(null);
  const [theme,setTheme]=useState(()=>ld(SS,{theme:'system'}).theme);
  const [form,setForm]=useState<any>({title:'',party:'',type:'Service',startDate:'',endDate:'',value:0,autoRenew:'No',status:'Active',notes:''});
  const F=(k:string)=>(e:any)=>setForm((f:any)=>({...f,[k]:e.target.value}));
  const FN=(k:string)=>(e:any)=>setForm((f:any)=>({...f,[k]:+e.target.value}));
  useEffect(()=>{sv(SK,items);},[items]);
  useEffect(()=>{const el=document.documentElement;theme==='dark'?el.classList.add('dark'):theme==='light'?el.classList.remove('dark'):(window.matchMedia('(prefers-color-scheme: dark)').matches?el.classList.add('dark'):el.classList.remove('dark'));sv(SS,{theme});},[theme]);
  const start=(s:boolean)=>{if(s)setItems(SAMPLE);setOb(true);sv(SO,true);};
  const openNew=()=>{setEdit(null);setForm({title:'',party:'',type:'Service',startDate:'',endDate:'',value:0,autoRenew:'No',status:'Active',notes:''});setModal(true);};
  const openEdit=(item:any)=>{setEdit(item);setForm({...item});setModal(true);};
  const save=()=>{const item={id:edit?.id||uid(),...form};setItems(p=>edit?p.map((x:any)=>x.id===edit.id?item:x):[item,...p]);setModal(false);};
  const hasSample=items.some((i:any)=>i.isSample);
  const filtered=items.filter((i:any)=>{const qq=q.toLowerCase();return!qq||String(i.title).toLowerCase().includes(qq)||String(i.party).toLowerCase().includes(qq);});
  const exportCSV=()=>{if(!items.length)return;const r=items.map((i:any)=>[i.title,i.party,i.endDate].join(','));const el=document.createElement('a');el.href='data:text/csv;charset=utf-8,'+encodeURIComponent('title,party,endDate\n'+r.join('\n'));el.download='contracts.csv';el.click();};
  if(!ob)return(<div className="min-h-screen flex items-center justify-center p-6" style={{background:`linear-gradient(135deg,${A},${A}bb)`}}><div className="max-w-xl w-full text-center"><div className="text-6xl mb-4">📜</div><h1 className="text-3xl font-bold text-white mb-2">Contract Scanner Vault</h1><p className="text-white/80 mb-8">Organize contracts, track renewal dates, and never miss a deadline</p><div className="grid grid-cols-2 gap-4 text-left"><button onClick={()=>start(false)} className="bg-white/10 hover:bg-white/20 border-2 border-white/30 rounded-2xl p-6 text-white"><div className="text-2xl mb-2">📋</div><div className="font-semibold">Start Empty</div></button><button onClick={()=>start(true)} className="bg-white rounded-2xl p-6 text-left hover:opacity-90"><div className="text-2xl mb-2">✨</div><div className="font-semibold" style={{color:A}}>Explore Sample Workspace</div><div className="text-gray-500 text-sm mt-1">Sample contracts preloaded</div><div className="text-gray-400 text-xs mt-2">Sample data · Remove anytime</div></button></div><p className="text-white/50 text-xs mt-4">One-time paid app · No subscription · Fully unlocked</p></div></div>);
  const Nav=({id,lb}:{id:string;lb:string})=>(<button onClick={()=>setPg(id)} className={`px-3 py-2 rounded-xl text-sm font-medium ${pg===id?'text-white':'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`} style={pg===id?{backgroundColor:A}:{}}>{lb}</button>);
  return(<div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">
    <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg text-white flex items-center justify-center font-bold" style={{backgroundColor:A}}>📜</div><nav className="flex gap-1"><Nav id="dashboard" lb="Dashboard"/><Nav id='contracts' lb='Contracts'/><Nav id="reports" lb="Reports"/><Nav id="settings" lb="Settings"/><Nav id="help" lb="Help"/></nav></div>
      <div className="flex items-center gap-2"><button onClick={()=>setTheme((t:string)=>t==='dark'?'light':'dark')} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500">{theme==='dark'?'☀️':'🌙'}</button><button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium" style={{backgroundColor:A}}><Plus size={15}/>Add Contract</button></div>
    </header>
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      {pg==='dashboard'&&<>
        {hasSample&&<div className="flex items-center justify-between bg-amber-50 dark:bg-amber-900/20 border border-amber-200 rounded-xl px-4 py-3"><span className="text-amber-700 dark:text-amber-400 text-sm">✦ Sample workspace loaded</span><button onClick={()=>setItems(p=>p.filter((i:any)=>!i.isSample))} className="text-xs text-amber-600 underline">Remove</button></div>}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5"><div className="text-2xl mb-2">📜</div><div className="text-2xl font-bold">{items.length}</div><div className="text-sm text-gray-500">Total Contracts</div></div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5"><div className="text-2xl mb-2">📅</div><div className="text-lg font-bold">{new Date().toLocaleDateString('en-GB')}</div><div className="text-sm text-gray-500">Today</div></div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5"><div className="text-2xl mb-2">🔒</div><div className="text-lg font-bold">Private</div><div className="text-sm text-gray-500">Local storage only</div></div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between"><span className="font-semibold">Recent Contracts</span><button onClick={()=>setPg('contracts')} className="text-sm underline" style={{color:A}}>View all</button></div>
          {items.slice(0,5).map((item:any,i:number)=>(<div key={i} className="flex items-center gap-4 px-5 py-3.5 border-b border-gray-50 dark:border-gray-800 last:border-0">
            <div className="flex-1"><div className="flex items-center gap-2"><span className="font-medium text-sm">{item.title}</span>{item.isSample&&<span className="text-xs bg-amber-100 text-amber-700 px-1.5 rounded">✦</span>}</div><p className="text-xs text-gray-400">{item.party} · {item.endDate}</p></div>
            <button onClick={()=>openEdit(item)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-400"><Edit3 size={14}/></button>
          </div>))}
          {items.length===0&&<div className="py-10 text-center text-gray-400"><p>No contracts yet</p><button onClick={()=>{setPg('contracts');openNew();}} className="mt-3 px-4 py-2 rounded-xl text-white text-sm" style={{backgroundColor:A}}>Add First Contract</button></div>}
        </div>
      </>}
      {pg==='contracts'&&<>
        <div className="flex gap-3"><div className="relative flex-1"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search…" className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"/></div><button onClick={exportCSV} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"><Download size={14}/>CSV</button></div>
        {filtered.length===0?<div className="text-center py-16"><div className="text-5xl mb-4">📜</div><p className="font-semibold text-lg mb-5">No contracts yet</p><button onClick={openNew} className="px-5 py-2.5 rounded-xl text-white font-medium" style={{backgroundColor:A}}>Add Contract</button></div>:
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 divide-y divide-gray-50 dark:divide-gray-800">
          {filtered.map((item:any,i:number)=>(<div key={i} className="flex items-center gap-4 px-5 py-4">
            <div className="flex-1 min-w-0"><div className="flex items-center gap-2 flex-wrap"><span className="font-medium text-sm">{item.title}</span>{item.isSample&&<span className="text-xs bg-amber-100 text-amber-700 px-1.5 rounded">✦ Sample</span>}</div><p className="text-xs text-gray-400">{item.party} · {item.endDate}</p></div>
            <div className="flex gap-1 flex-shrink-0"><button onClick={()=>openEdit(item)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-400"><Edit3 size={15}/></button><button onClick={()=>setItems(p=>p.filter((x:any)=>x.id!==item.id))} className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500"><Trash2 size={15}/></button></div>
          </div>))}
        </div>}
      </>}
      
      {pg==='reports'&&<div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6"><h3 className="font-semibold mb-4">Contracts Summary</h3><p className="text-sm text-gray-500">Total contracts: {items.length}</p></div>}
      {pg==='settings'&&<div className="max-w-lg space-y-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5"><h3 className="font-semibold mb-3">Theme</h3><div className="flex gap-2">{['light','dark','system'].map(t=><button key={t} onClick={()=>setTheme(t)} className={`px-4 py-2 rounded-xl border text-sm capitalize ${theme===t?'text-white border-transparent':'border-gray-200 dark:border-gray-700'}`} style={theme===t?{backgroundColor:A}:{}}>{t}</button>)}</div></div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5"><h3 className="font-semibold mb-3">Sample Workspace</h3><div className="flex gap-2">{!hasSample&&<button onClick={()=>setItems(p=>{const f=p.filter((i:any)=>!i.isSample);return[...f,...SAMPLE];})} className="px-4 py-2 rounded-xl border border-gray-200 text-sm">Load Sample Data</button>}{hasSample&&<button onClick={()=>setItems(p=>p.filter((i:any)=>!i.isSample))} className="px-4 py-2 rounded-xl bg-red-50 text-red-600 text-sm">Remove Sample Data</button>}</div></div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5"><h3 className="font-semibold mb-2">About</h3><p className="text-sm text-gray-500">Contract Scanner Vault · v1.0</p><p className="text-sm text-green-600 mt-1">✓ One-time paid app · No subscription · Fully unlocked</p></div>
      </div>}
      {pg==='help'&&<div className="max-w-2xl space-y-3">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5"><p className="font-medium text-sm mb-1">How do I add a contract?</p><p className="text-sm text-gray-500">Click "Add Contract" top right. Fill in the form and click Save.</p></div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5"><p className="font-medium text-sm mb-1">Can I export my data?</p><p className="text-sm text-gray-500">Yes — CSV export on the Contracts page.</p></div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5"><p className="font-medium text-sm mb-1">Is my data private?</p><p className="text-sm text-gray-500">All data stays on your device. Nothing is sent to any server.</p></div>
      </div>}
    </main>
    {modal&&<div className="fixed inset-0 z-50 flex items-center justify-center p-4"><div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={()=>setModal(false)}/><div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-5"><h3 className="text-lg font-semibold">{edit?'Edit Contract':'New Contract'}</h3><button onClick={()=>setModal(false)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-400"><X size={18}/></button></div>
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 "><label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">Contract Title</label><input value={form.title||''} onChange={F('title')} placeholder="e.g. Office Lease" className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none"/></div><div className=""><label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">Other Party</label><input value={form.party||''} onChange={F('party')} placeholder="e.g. ABC Ltd" className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none"/></div><div className=""><label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">Type</label><select value={form.type||''} onChange={F('type')} className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"><option>Service</option><option>Lease</option><option>Employment</option><option>NDA</option><option>Supplier</option><option>License</option><option>Partnership</option><option>Other</option></select></div><div><label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">Start Date</label><input type="date" value={form.startDate||''} onChange={F('startDate')} className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none"/></div><div><label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">Expiry Date</label><input type="date" value={form.endDate||''} onChange={F('endDate')} className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none"/></div><div><label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">Value ($)</label><input type="number" value={form.value||0} onChange={FN('value')} className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none"/></div><div className=""><label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">Auto-Renews?</label><select value={form.autoRenew||''} onChange={F('autoRenew')} className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"><option>Yes</option><option>No</option></select></div><div className=""><label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">Status</label><select value={form.status||''} onChange={F('status')} className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"><option>Active</option><option>Pending</option><option>Expired</option><option>Terminated</option></select></div><div className="col-span-2"><label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">Key Terms / Notes</label><textarea value={form.notes||''} onChange={F('notes')} rows={2} className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm resize-none"/></div>
        <div className="col-span-2 flex gap-3 pt-2"><button onClick={()=>setModal(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm">Cancel</button><button onClick={save} className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium" style={{backgroundColor:A}}>Save Contract</button></div>
      </div>
    </div></div>}
  </div>);
}
