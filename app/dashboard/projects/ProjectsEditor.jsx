"use client";
import { useState, useRef, useCallback } from "react";
import { SaveButton, PageHeader, Field, Input, Textarea, Card } from "../components/DashboardUI";

const CATEGORIES = ["Photography", "Website", "Design", "Ads", "Video", "Social Media"];
const CAT_COLOR = {
  Photography: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  Website:     "bg-blue-500/15 text-blue-400 border-blue-500/20",
  Design:      "bg-purple-500/15 text-purple-400 border-purple-500/20",
  Ads:         "bg-pink-500/15 text-pink-400 border-pink-500/20",
  Video:       "bg-red-500/15 text-red-400 border-red-500/20",
  "Social Media": "bg-green-500/15 text-green-400 border-green-500/20",
};

/* ─ icons ─ */
const IPlus  = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>;
const IUp    = () => <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"/></svg>;
const IDown  = () => <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>;
const ITrash = () => <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>;
const IX     = () => <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>;
const IBack  = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>;
const IImg   = () => <svg className="w-7 h-7 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>;
const ISpinner = () => <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>;

/* ─ upload helper ─ */
async function uploadFile(file) {
  const fd = new FormData(); fd.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: fd });
  const d = await res.json();
  if (res.ok && d.url) return d.url;
  throw new Error(d.error || "Upload failed");
}

/* ─ Project Grid Card ─ */
function ProjectGridCard({ project, index, isFirst, isLast, onSelect, onMoveUp, onMoveDown, onRemove }) {
  const cc = CAT_COLOR[project.category] ?? "bg-slate-700/40 text-slate-400 border-slate-600/20";
  return (
    <div
      onClick={onSelect}
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-white/[0.07] bg-[#161922] hover:border-indigo-500/40 hover:bg-[#1a1d27] cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-indigo-900/10"
    >
      {/* Cover */}
      <div className="relative w-full h-40 bg-slate-800 shrink-0">
        {project.image
          ? <img src={project.image} alt="" className="w-full h-full object-cover"/>
          : <div className="w-full h-full flex items-center justify-center opacity-40"><IImg/></div>
        }
        {/* overlay actions */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <span className="text-white text-xs font-semibold px-4 py-1.5 rounded-full bg-indigo-600/80 backdrop-blur-sm">Edit</span>
        </div>
        {/* move/delete – top-right */}
        <div className="absolute top-1.5 right-1.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10" onClick={e=>e.stopPropagation()}>
          <button onClick={onMoveUp} disabled={isFirst} className="w-6 h-6 rounded-md bg-black/60 backdrop-blur-sm flex items-center justify-center text-slate-300 hover:text-white disabled:opacity-20 transition"><IUp/></button>
          <button onClick={onMoveDown} disabled={isLast} className="w-6 h-6 rounded-md bg-black/60 backdrop-blur-sm flex items-center justify-center text-slate-300 hover:text-white disabled:opacity-20 transition"><IDown/></button>
          <button onClick={onRemove} className="w-6 h-6 rounded-md bg-black/60 backdrop-blur-sm flex items-center justify-center text-slate-400 hover:text-red-400 transition"><ITrash/></button>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1 flex-1">
        <p className="text-sm font-semibold text-white truncate leading-snug">
          {project.title || <span className="text-slate-500 italic font-normal">Untitled</span>}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cc}`}>{project.category}</span>
          {project.client && <span className="text-[10px] text-slate-500 truncate">{project.client}</span>}
          {project.year && <span className="text-[10px] text-slate-600 ml-auto">{project.year}</span>}
        </div>
        {project.desc && <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2 mt-0.5">{project.desc}</p>}
      </div>
    </div>
  );
}

/* ─ CoverDropzone ─ */
function CoverDropzone({ value, onChange }) {
  const ref = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  async function upload(file) {
    if (!file) return;
    setUploading(true); setError("");
    try { onChange(await uploadFile(file)); }
    catch(e) { setError(e.message); }
    finally { setUploading(false); if(ref.current) ref.current.value=""; }
  }

  const onDrop = useCallback(e => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f?.type.startsWith("image/")) upload(f);
  }, []);

  return (
    <div>
      <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-widest">Cover Image</label>
      <Input value={value} onChange={onChange} placeholder="https://… or /uploads/photo.jpg"/>
      <div
        onDragOver={e=>{e.preventDefault();setDragging(true);}} onDragLeave={()=>setDragging(false)} onDrop={onDrop}
        onClick={()=>ref.current?.click()}
        className={`mt-3 relative flex flex-col items-center justify-center gap-2 h-44 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 overflow-hidden ${
          dragging ? "border-indigo-500 bg-indigo-600/10" : "border-slate-700 hover:border-slate-500 bg-[#0d0f14]"
        }`}
      >
        {value && <img src={value} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50"/>}
        <div className={`relative z-10 flex flex-col items-center gap-1.5 ${value?"text-white":"text-slate-500"}`}>
          {uploading ? <ISpinner/> : <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>}
          <span className="text-xs font-medium">{uploading?"Uploading…":"Drop or click to upload"}</span>
        </div>
        <input ref={ref} type="file" accept="image/*" className="hidden" onChange={e=>upload(e.target.files?.[0])}/>
      </div>
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

/* ─ GallerySection ─ */
function GallerySection({ project, set }) {
  const ref = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload(e) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    try {
      const urls = await Promise.all(files.map(uploadFile));
      set("gallery", [...(project.gallery ?? []), ...urls]);
    } catch(err) { setError(err.message); }
    finally { setUploading(false); if(ref.current) ref.current.value=""; }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Gallery</label>
        <button onClick={()=>ref.current?.click()} disabled={uploading} className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 border border-indigo-500/30 hover:border-indigo-500/60 rounded-lg px-3 py-1.5 transition">
          {uploading ? <><ISpinner/> Uploading…</> : <><IPlus/> Add Photos</>}
        </button>
        <input ref={ref} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload}/>
      </div>
      {error && <p className="mb-2 text-xs text-red-400">{error}</p>}
      {(project.gallery?.length ?? 0) > 0 ? (
        <div className="grid grid-cols-3 gap-2">
          {project.gallery.map((img, gi) => (
            <div key={gi} className="relative aspect-video rounded-lg overflow-hidden bg-slate-800 group border border-white/[0.06]">
              <img src={img} alt="" className="w-full h-full object-cover"/>
              <button onClick={()=>set("gallery",project.gallery.filter((_,i)=>i!==gi))} className="absolute top-1 right-1 w-5 h-5 bg-red-500/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <IX/>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 py-6 rounded-xl border border-dashed border-slate-700 bg-[#0d0f14] text-slate-600">
          <IImg/><span className="text-xs">No gallery images yet</span>
        </div>
      )}
      <input placeholder="Or paste URL and press Enter…" className="mt-3 w-full bg-[#0d0f14] border border-white/[0.08] rounded-lg px-3 py-2 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition"
        onKeyDown={e=>{if(e.key==="Enter"&&e.target.value.trim()){set("gallery",[...(project.gallery??[]),e.target.value.trim()]);e.target.value="";}}}/>
    </div>
  );
}

/* ─ TagList ─ */
function TagList({ label, field, project, set }) {
  const items = project[field] ?? [];
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{label}</label>
        <button onClick={()=>set(field,[...items,""])} className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 border border-indigo-500/30 hover:border-indigo-500/60 rounded-lg px-3 py-1.5 transition">+ Add</button>
      </div>
      <div className="space-y-2">
        {items.map((s,si) => (
          <div key={si} className="flex items-center gap-2">
            <input value={s} onChange={e=>{const a=[...items];a[si]=e.target.value;set(field,a);}} placeholder={field==="services"?"e.g. Brand Photography":"e.g. Figma"} className="flex-1 bg-[#0d0f14] border border-white/[0.08] rounded-lg px-3 py-2 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition"/>
            <button onClick={()=>set(field,items.filter((_,i)=>i!==si))} className="p-1.5 rounded text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition"><IX/></button>
          </div>
        ))}
        {items.length===0 && <p className="text-xs text-slate-600 py-2 text-center border border-dashed border-slate-800 rounded-lg">None added yet</p>}
      </div>
    </div>
  );
}

/* ─ EditorPanel ─ */
const TABS = ["Info","Media","Tags"];
function EditorPanel({ project, onChange, onBack }) {
  const [tab, setTab] = useState("Info");
  const set = (k,v) => onChange(k,v);

  return (
    <div className="flex flex-col min-h-full">
      {/* header */}
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-white/[0.06] shrink-0">
        <button onClick={onBack} className="flex items-center gap-1.5 text-slate-400 hover:text-white transition text-xs font-semibold shrink-0 px-2 py-1.5 rounded-lg hover:bg-white/5">
          <IBack/> All Projects
        </button>
        <div className="w-px h-4 bg-white/10"/>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold text-white truncate">{project?.title || <span className="text-slate-500 italic font-normal">Untitled Project</span>}</h2>
        </div>
      </div>

      {/* tabs */}
      <div className="flex items-center gap-1 mb-5 bg-[#0d0f14] rounded-xl p-1 border border-white/[0.06] shrink-0">
        {TABS.map(t => (
          <button key={t} onClick={()=>setTab(t)} className={`flex-1 text-xs font-semibold py-2 rounded-lg transition-all duration-200 ${tab===t?"bg-indigo-600 text-white shadow-sm":"text-slate-500 hover:text-slate-300"}`}>{t}</button>
        ))}
      </div>

      {/* content */}
      <div className="flex-1 space-y-5">
        {tab==="Info" && <>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Title"><Input value={project?.title??""} onChange={v=>set("title",v)} placeholder="Project name"/></Field>
            <Field label="Category">
              <select value={project?.category} onChange={e=>set("category",e.target.value)} className="w-full bg-[#0d0f14] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition">
                {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Client"><Input value={project?.client??""} onChange={v=>set("client",v)} placeholder="Client name"/></Field>
            <Field label="Year"><Input value={project?.year??""} onChange={v=>set("year",v)} placeholder="2024"/></Field>
          </div>
          <Field label="Short Description" hint="Shown on cards & hero overlay">
            <Textarea value={project?.desc??""} onChange={v=>set("desc",v)} rows={2} placeholder="Brief description…"/>
          </Field>
          <Field label="Full Description" hint="Shown on the detail page">
            <Textarea value={project?.fullDesc??""} onChange={v=>set("fullDesc",v)} rows={4} placeholder="In-depth overview…"/>
          </Field>
        </>}

        {tab==="Media" && <>
          <CoverDropzone value={project?.image??""} onChange={v=>set("image",v)}/>
          <div className="border-t border-white/[0.06] pt-5">
            <GallerySection project={project} set={set}/>
          </div>
        </>}

        {tab==="Tags" && <>
          <TagList label="Services" field="services" project={project} set={set}/>
          <div className="border-t border-white/[0.06] pt-5">
            <TagList label="Tools / Technologies" field="technologies" project={project} set={set}/>
          </div>
        </>}
      </div>
    </div>
  );
}

/* ─ Main Export ─ */
export default function ProjectsEditor({ initialData }) {
  const [projects, setProjects] = useState(initialData ?? []);
  const [selectedIndex, setSelectedIndex] = useState(null);
  // "list" | "editor"
  const [view, setView] = useState("list");

  const selected = selectedIndex !== null ? projects[selectedIndex] : null;

  function handleChange(key, val) {
    if (selectedIndex === null) return;
    setProjects(prev => prev.map((p,i) => i===selectedIndex ? {...p,[key]:val} : p));
  }

  function handleAdd() {
    const p = {
      id: String(Date.now()).slice(-4), title:"", category:"Photography",
      desc:"", image:"", fullDesc:"", client:"",
      year: String(new Date().getFullYear()),
      services:[], technologies:[], gallery:[],
    };
    setProjects(prev=>[...prev,p]);
    setSelectedIndex(projects.length);
    setView("editor");
  }

  function handleRemove(index) {
    setProjects(prev=>prev.filter((_,i)=>i!==index));
    setSelectedIndex(prev=>{
      if(prev===null) return null;
      if(prev===index){ setView("list"); return null; }
      return prev>index ? prev-1 : prev;
    });
  }

  function handleMoveUp(index) {
    if(index===0) return;
    setProjects(prev=>{const a=[...prev];[a[index-1],a[index]]=[a[index],a[index-1]];return a;});
    if(selectedIndex===index) setSelectedIndex(index-1);
    else if(selectedIndex===index-1) setSelectedIndex(index);
  }

  function handleMoveDown(index) {
    if(index===projects.length-1) return;
    setProjects(prev=>{const a=[...prev];[a[index],a[index+1]]=[a[index+1],a[index]];return a;});
    if(selectedIndex===index) setSelectedIndex(index+1);
    else if(selectedIndex===index+1) setSelectedIndex(index);
  }

  async function handleSave() {
    const res = await fetch("/api/content",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({section:"projects",data:projects})});
    if(!res.ok) throw new Error("Save failed");
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between gap-3 flex-wrap mb-6">
        {view==="list" ? (
          <PageHeader title="Projects" description={`${projects.length} project${projects.length!==1?"s":""} · click a card to edit`}/>
        ) : (
          <PageHeader title="Projects" description="Editing project"/>
        )}
        <div className="flex items-center gap-2">
          {view==="list" && (
            <button onClick={handleAdd} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border border-indigo-500/40 text-indigo-400 hover:bg-indigo-600/10 hover:border-indigo-500/60 transition">
              <IPlus/> New Project
            </button>
          )}
          <SaveButton onSave={handleSave}/>
        </div>
      </div>

      {/* ── LIST VIEW: grid ── */}
      {view==="list" && (
        <>
          {projects.length===0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-24 text-center border border-dashed border-slate-700 rounded-2xl text-slate-600">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.75}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
              <div>
                <p className="text-sm font-medium text-slate-500">No projects yet</p>
                <p className="text-xs mt-0.5">Click "New Project" to get started</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {projects.map((project,index) => (
                <ProjectGridCard
                  key={project.id||index}
                  project={project}
                  index={index}
                  isFirst={index===0}
                  isLast={index===projects.length-1}
                  onSelect={()=>{ setSelectedIndex(index); setView("editor"); }}
                  onMoveUp={()=>handleMoveUp(index)}
                  onMoveDown={()=>handleMoveDown(index)}
                  onRemove={()=>handleRemove(index)}
                />
              ))}
              {/* Add new card */}
              <button
                onClick={handleAdd}
                className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-700 hover:border-indigo-500/50 hover:bg-indigo-600/5 text-slate-600 hover:text-indigo-400 transition-all duration-200 aspect-video sm:aspect-auto min-h-[140px]"
              >
                <IPlus/>
                <span className="text-xs font-semibold">Add Project</span>
              </button>
            </div>
          )}
        </>
      )}

      {/* ── EDITOR VIEW ── */}
      {view==="editor" && selected && (
        <Card>
          <EditorPanel
            project={selected}
            onChange={handleChange}
            onBack={()=>setView("list")}
          />
        </Card>
      )}
    </div>
  );
}
