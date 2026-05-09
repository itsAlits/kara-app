"use client";

import { useState, useRef } from "react";
import { SaveButton, PageHeader, Field, Input, Textarea, Card } from "../components/DashboardUI";

const CATEGORIES = ["Photography", "Website", "Design", "Ads", "Video", "Social Media"];

function ProjectCard({ project, index, onChange, onRemove, onMoveUp, onMoveDown, isFirst, isLast }) {
  const fileInputRef = useRef(null);
  const galleryFileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [expanded, setExpanded] = useState(false);

  function set(key, val) {
    onChange(index, key, val);
  }

  async function uploadFile(file, onSuccess) {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (res.ok && data.url) {
      onSuccess(data.url);
    } else {
      throw new Error(data.error || "Upload failed");
    }
  }

  async function handleCoverUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
    try {
      await uploadFile(file, (url) => set("image", url));
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleGalleryUpload(e) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploadingGallery(true);
    try {
      const urls = await Promise.all(
        files.map(
          (f) =>
            new Promise((resolve, reject) => {
              uploadFile(f, resolve).catch(reject);
            })
        )
      );
      set("gallery", [...(project.gallery ?? []), ...urls]);
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploadingGallery(false);
      if (galleryFileRef.current) galleryFileRef.current.value = "";
    }
  }

  function removeGalleryImage(imgIndex) {
    set("gallery", (project.gallery ?? []).filter((_, i) => i !== imgIndex));
  }

  function updateTag(field, index2, val) {
    const arr = [...(project[field] ?? [])];
    arr[index2] = val;
    set(field, arr);
  }

  function addTag(field) {
    set(field, [...(project[field] ?? []), ""]);
  }

  function removeTag(field, i) {
    set(field, (project[field] ?? []).filter((_, idx) => idx !== i));
  }

  return (
    <Card>
      {/* Card header */}
      <div className="flex items-start justify-between mb-4">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-3 flex-1 min-w-0 text-left"
        >
          <span className="text-xs font-mono text-slate-500 bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 shrink-0">
            {project.id || String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-sm font-medium text-white truncate">
            {project.title || "Untitled Project"}
          </span>
          <svg
            className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className="flex items-center gap-1 ml-2">
          <button disabled={isFirst} onClick={onMoveUp} className="p-1.5 text-slate-500 hover:text-white disabled:opacity-30 transition" title="Move up">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
          </button>
          <button disabled={isLast} onClick={onMoveDown} className="p-1.5 text-slate-500 hover:text-white disabled:opacity-30 transition" title="Move down">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          <button onClick={() => onRemove(index)} className="p-1.5 text-slate-500 hover:text-red-400 transition" title="Delete">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      </div>

      {expanded && (
        <div className="space-y-5 pt-2 border-t border-slate-800">
          {/* Basic info */}
          <div className="grid sm:grid-cols-2 gap-4 pt-4">
            <Field label="Project Title">
              <Input value={project.title} onChange={(v) => set("title", v)} placeholder="Project name" />
            </Field>
            <Field label="Category">
              <select
                value={project.category}
                onChange={(e) => set("category", e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 transition"
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Client Name">
              <Input value={project.client ?? ""} onChange={(v) => set("client", v)} placeholder="Client or company" />
            </Field>
            <Field label="Year">
              <Input value={project.year ?? ""} onChange={(v) => set("year", v)} placeholder="2024" />
            </Field>
          </div>

          <Field label="Short Description" hint="Shown on cards & hero overlay">
            <Textarea value={project.desc} onChange={(v) => set("desc", v)} rows={2} placeholder="Brief description" />
          </Field>

          <Field label="Full Description" hint="Shown on the detail page">
            <Textarea value={project.fullDesc ?? ""} onChange={(v) => set("fullDesc", v)} rows={4} placeholder="In-depth project overview for the detail page…" />
          </Field>

          {/* Cover image */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-widest">Cover Image</label>
            <div className="flex gap-3">
              <Input value={project.image} onChange={(v) => set("image", v)} placeholder="https://… or /uploads/photo.jpg" />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-slate-700 text-slate-300 hover:border-indigo-500/50 hover:text-indigo-400 transition disabled:opacity-60 shrink-0"
              >
                {uploading ? <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>
                  : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>}
                Upload
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
            </div>
            {uploadError && <p className="mt-1.5 text-xs text-red-400">{uploadError}</p>}
            {project.image && (
              <div className="mt-3 relative w-full h-36 rounded-xl overflow-hidden border border-slate-700 bg-slate-800">
                <img src={project.image} alt="Cover" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Gallery */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-widest">Gallery Images</label>
              <button
                onClick={() => galleryFileRef.current?.click()}
                disabled={uploadingGallery}
                className="flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 border border-indigo-500/30 rounded-lg px-3 py-1.5 transition"
              >
                {uploadingGallery ? "Uploading…" : "+ Add Photos"}
              </button>
              <input ref={galleryFileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryUpload} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(project.gallery ?? []).map((img, gi) => (
                <div key={gi} className="relative aspect-video rounded-xl overflow-hidden bg-slate-800 group">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => removeGalleryImage(gi)}
                    className="absolute top-1 right-1 w-5 h-5 bg-red-500/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  >
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                </div>
              ))}
              {!(project.gallery?.length) && (
                <p className="col-span-3 text-center text-slate-600 text-xs py-4 border border-dashed border-slate-700 rounded-xl">
                  No gallery images yet.
                </p>
              )}
            </div>
            <p className="mt-2 text-xs text-slate-600">You can also add a gallery image URL manually:</p>
            <div className="flex gap-2 mt-2">
              <input
                placeholder="https://…"
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    set("gallery", [...(project.gallery ?? []), e.target.value.trim()]);
                    e.target.value = "";
                  }
                }}
              />
              <span className="text-xs text-slate-600 self-center">Press Enter</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-widest">Services</label>
              <button onClick={() => addTag("services")} className="text-xs font-medium text-indigo-400 hover:text-indigo-300 border border-indigo-500/30 rounded-lg px-3 py-1.5 transition">+ Add</button>
            </div>
            <div className="space-y-2">
              {(project.services ?? []).map((s, si) => (
                <div key={si} className="flex items-center gap-2">
                  <input
                    value={s}
                    onChange={(e) => updateTag("services", si, e.target.value)}
                    placeholder="e.g. Photography"
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition"
                  />
                  <button onClick={() => removeTag("services", si)} className="text-slate-500 hover:text-red-400 transition">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-widest">Tools / Technologies</label>
              <button onClick={() => addTag("technologies")} className="text-xs font-medium text-indigo-400 hover:text-indigo-300 border border-indigo-500/30 rounded-lg px-3 py-1.5 transition">+ Add</button>
            </div>
            <div className="space-y-2">
              {(project.technologies ?? []).map((t, ti) => (
                <div key={ti} className="flex items-center gap-2">
                  <input
                    value={t}
                    onChange={(e) => updateTag("technologies", ti, e.target.value)}
                    placeholder="e.g. Figma"
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition"
                  />
                  <button onClick={() => removeTag("technologies", ti)} className="text-slate-500 hover:text-red-400 transition">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

export default function ProjectsEditor({ initialData }) {
  const [projects, setProjects] = useState(initialData);

  function handleChange(index, key, val) {
    setProjects((prev) => prev.map((p, i) => (i === index ? { ...p, [key]: val } : p)));
  }

  function handleRemove(index) {
    setProjects((prev) => prev.filter((_, i) => i !== index));
  }

  function handleAdd() {
    const newId = String(projects.length + 1).padStart(2, "0");
    setProjects((prev) => [...prev, {
      id: newId, title: "", category: "Photography", desc: "",
      image: "", fullDesc: "", client: "", year: new Date().getFullYear().toString(),
      services: [], technologies: [], gallery: [],
    }]);
  }

  function handleMoveUp(index) {
    if (index === 0) return;
    setProjects((prev) => { const a = [...prev]; [a[index - 1], a[index]] = [a[index], a[index - 1]]; return a; });
  }

  function handleMoveDown(index) {
    if (index === projects.length - 1) return;
    setProjects((prev) => { const a = [...prev]; [a[index], a[index + 1]] = [a[index + 1], a[index]]; return a; });
  }

  async function handleSave() {
    const res = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "projects", data: projects }),
    });
    if (!res.ok) throw new Error("Save failed");
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <PageHeader title="Projects" description="Add, edit, reorder and delete portfolio projects. Click a card to expand its fields." />
        <div className="flex items-center gap-3">
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-indigo-500/40 text-indigo-400 hover:bg-indigo-600/10 transition"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Add
          </button>
          <SaveButton onSave={handleSave} />
        </div>
      </div>

      <div className="space-y-4">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id || index}
            project={project}
            index={index}
            onChange={handleChange}
            onRemove={handleRemove}
            onMoveUp={() => handleMoveUp(index)}
            onMoveDown={() => handleMoveDown(index)}
            isFirst={index === 0}
            isLast={index === projects.length - 1}
          />
        ))}
        {projects.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm border border-dashed border-slate-700 rounded-2xl">
            No projects yet. Click "Add" to create your first one.
          </div>
        )}
      </div>
    </div>
  );
}
