"use client";
import { useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { SaveButton, PageHeader, Field, Input, Textarea, Card } from "../components/DashboardUI";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div className="h-[400px] flex items-center justify-center bg-white rounded-lg text-slate-400">Loading editor...</div>
});

const CATEGORIES = ["Photography", "Website", "Design", "Marketing", "Branding", "Tips"];

/* ─ icons ─ */
const IPlus = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>;
const IBack = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>;
const ITrash = () => <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const IUp = () => <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>;
const IDown = () => <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>;
const ISpinner = () => <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>;
const IX = () => <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;

/* ─ helpers ─ */
function slugify(str) {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
async function uploadFile(file) {
  const fd = new FormData(); fd.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: fd });
  const d = await res.json();
  if (res.ok && d.url) return d.url;
  throw new Error(d.error || "Upload failed");
}

/* ─ BlogGridCard ─ */
function BlogGridCard({ blog, index, isFirst, isLast, onSelect, onMoveUp, onMoveDown, onRemove }) {
  return (
    <div
      onClick={onSelect}
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-white/[0.07] bg-[#161922] hover:border-indigo-500/40 cursor-pointer transition-all duration-200 hover:shadow-xl hover:shadow-indigo-900/20"
    >
      {/* ── Cover image ── */}
      <div className="relative w-full h-44 bg-slate-800 shrink-0 overflow-hidden">
        {blog.coverImage
          ? <img src={blog.coverImage} alt="" className="w-full h-full object-cover" />
          : <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
            <svg className="w-10 h-10 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
        }

        {/* Gradient fade at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#161922] via-[#161922]/20 to-transparent" />

        {/* Status badge — top left */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm ${blog.published
            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/25"
            : "bg-slate-700/60 text-slate-400 border border-slate-600/40"
            }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${blog.published ? "bg-emerald-400" : "bg-slate-500"}`} />
            {blog.published ? "Published" : "Draft"}
          </span>
        </div>

        {/* Edit overlay — center on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <span className="text-white text-xs font-semibold px-5 py-2 rounded-full bg-indigo-600 shadow-lg shadow-indigo-900/40">
            Edit Post
          </span>
        </div>
      </div>

      {/* ── Info ── */}
      <div className="flex flex-col gap-2 px-4 pt-3 pb-4 flex-1">
        {/* Title */}
        <p className="text-sm font-semibold text-white leading-snug line-clamp-2 min-h-[2.5rem]">
          {blog.title || <span className="text-slate-500 italic font-normal">Untitled post</span>}
        </p>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">{blog.excerpt}</p>
        )}

        {/* Meta + actions row */}
        <div className="flex items-center justify-between gap-2 pt-1 mt-auto">
          <div className="flex items-center gap-2 min-w-0">
            {blog.category && (
              <span className="text-[10px] font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full truncate">
                {blog.category}
              </span>
            )}
            {blog.readTime && (
              <span className="text-[10px] text-slate-600">{blog.readTime} min</span>
            )}
          </div>

          {/* Order + delete actions */}
          <div className="flex gap-1 shrink-0" onClick={e => e.stopPropagation()}>
            <button
              onClick={onMoveUp} disabled={isFirst}
              className="w-6 h-6 rounded-md bg-white/[0.04] hover:bg-white/10 flex items-center justify-center text-slate-500 hover:text-white disabled:opacity-20 transition"
              title="Move up"
            ><IUp /></button>
            <button
              onClick={onMoveDown} disabled={isLast}
              className="w-6 h-6 rounded-md bg-white/[0.04] hover:bg-white/10 flex items-center justify-center text-slate-500 hover:text-white disabled:opacity-20 transition"
              title="Move down"
            ><IDown /></button>
            <button
              onClick={onRemove}
              className="w-6 h-6 rounded-md bg-white/[0.04] hover:bg-red-500/20 flex items-center justify-center text-slate-500 hover:text-red-400 transition"
              title="Delete"
            ><ITrash /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─ Cover upload ─ */
function CoverUpload({ value, onChange }) {
  const ref = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  async function upload(file) {
    if (!file) return; setUploading(true); setError("");
    try { onChange(await uploadFile(file)); }
    catch (e) { setError(e.message); }
    finally { setUploading(false); if (ref.current) ref.current.value = ""; }
  }
  const onDrop = useCallback(e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files?.[0]; if (f?.type.startsWith("image/")) upload(f); }, []);

  return (
    <div>
      <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-widest">Cover Image</label>
      <Input value={value} onChange={onChange} placeholder="https://… or /uploads/photo.jpg" />
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={onDrop}
        onClick={() => ref.current?.click()}
        className={`mt-2 relative h-96 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 overflow-hidden flex items-center justify-center ${dragging ? "border-indigo-500 bg-indigo-600/10" : "border-slate-700 hover:border-slate-500 bg-[#0d0f14]"}`}
      >
        {value && <img src={value} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />}
        <div className={`relative z-10 flex flex-col items-center gap-1 ${value ? "text-white" : "text-slate-500"}`}>
          {uploading ? <ISpinner /> : <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>}
          <span className="text-xs">{uploading ? "Uploading…" : "Drop or click to upload"}</span>
        </div>
        <input ref={ref} type="file" accept="image/*" className="hidden" onChange={e => upload(e.target.files?.[0])} />
      </div>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

/* ─ Tag input ─ */
function TagInput({ value = [], onChange }) {
  const [input, setInput] = useState("");
  function add() {
    const v = input.trim().toLowerCase();
    if (v && !value.includes(v)) onChange([...value, v]);
    setInput("");
  }
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map(t => (
          <span key={t} className="flex items-center gap-1 text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700">
            #{t}
            <button onClick={() => onChange(value.filter(x => x !== t))} className="text-slate-500 hover:text-red-400 transition"><IX /></button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); add(); } }} placeholder="Add tag and press Enter…" className="flex-1 bg-[#0d0f14] border border-white/[0.08] rounded-lg px-3 py-2 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition" />
        <button onClick={add} className="px-3 py-2 text-xs font-semibold text-indigo-400 border border-indigo-500/30 rounded-lg hover:bg-indigo-600/10 transition"><IPlus /></button>
      </div>
    </div>
  );
}

/* ─ Editor panel ─ */
const TABS = ["Info", "Content", "Media", "SEO"];
function EditorPanel({ blog, onChange, onBack }) {
  const [tab, setTab] = useState("Info");
  const set = (k, v) => onChange(k, v);

  return (
    <div className="flex flex-col min-h-full">
      {/* header */}
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-white/[0.06]">
        <button onClick={onBack} className="flex items-center gap-1.5 text-slate-400 hover:text-white text-xs font-semibold px-2 py-1.5 rounded-lg hover:bg-white/5 transition">
          <IBack /> All Posts
        </button>
        <div className="w-px h-4 bg-white/10" />
        <div className="min-w-0 flex-1 flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-white truncate">{blog?.title || <span className="text-slate-500 italic font-normal">Untitled Post</span>}</h2>
          {/* publish toggle */}
          <button
            onClick={() => set("published", !blog?.published)}
            className={`shrink-0 flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 ${blog?.published ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20" : "bg-slate-700/40 text-slate-400 border-slate-600/30 hover:bg-slate-700/60"
              }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${blog?.published ? "bg-emerald-400" : "bg-slate-500"}`} />
            {blog?.published ? "Published" : "Draft"}
          </button>
        </div>
      </div>

      {/* tabs */}
      <div className="flex items-center gap-1 mb-5 bg-[#0d0f14] rounded-xl p-1 border border-white/[0.06]">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} className={`flex-1 text-xs font-semibold py-2 rounded-lg transition-all duration-200 ${tab === t ? "bg-indigo-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-300"}`}>{t}</button>
        ))}
      </div>

      <div className="flex-1 space-y-5">
        {tab === "Info" && <>
          <Field label="Title">
            <Input value={blog?.title ?? ""} onChange={v => { set("title", v); if (!blog?.slug || blog.slug === slugify(blog.title || "")) set("slug", slugify(v)); }} placeholder="Post title…" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Category">
              <select value={blog?.category ?? ""} onChange={e => set("category", e.target.value)} className="w-full bg-[#0d0f14] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition">
                <option value="">Select…</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Author">
              <Input value={blog?.author ?? ""} onChange={v => set("author", v)} placeholder="Name" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Slug" hint="Auto-generated from title">
              <Input value={blog?.slug ?? ""} onChange={v => set("slug", v)} placeholder="my-post-slug" />
            </Field>
            <Field label="Published Date">
              <input type="date" value={blog?.publishedAt ? blog.publishedAt.slice(0, 10) : ""} onChange={e => set("publishedAt", e.target.value ? new Date(e.target.value).toISOString() : "")} className="w-full bg-[#0d0f14] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition" />
            </Field>
          </div>
          <Field label="Excerpt" hint="Short teaser shown on cards">
            <Textarea value={blog?.excerpt ?? ""} onChange={v => set("excerpt", v)} rows={3} placeholder="A short teaser for the post…" />
          </Field>
          <Field label="Read Time (min)">
            <Input value={blog?.readTime ?? ""} onChange={v => set("readTime", v)} placeholder="5" />
          </Field>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-widest">Tags</label>
            <TagInput value={blog?.tags ?? []} onChange={v => set("tags", v)} />
          </div>
        </>}

        {tab === "Content" && (
          <Field label="Body" hint="Format your content visually. Headings (H2/H3) will automatically appear in the Table of Contents.">
            <div className="bg-white rounded-xl overflow-hidden border border-white/[0.08] text-gray-900">
              <ReactQuill
                theme="snow"
                value={blog?.content ?? ""}
                onChange={v => set("content", v)}
                modules={{
                  toolbar: [
                    [{ 'header': [2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    ['link', 'image'],
                    ['clean']
                  ]
                }}
              />
            </div>
            {/* Custom Quill styling for our dashboard */}
            <style jsx global>{`
              .ql-toolbar.ql-snow { border: none !important; border-bottom: 1px solid #e5e7eb !important; background: #f9fafb; padding: 12px !important; }
              .ql-container.ql-snow { border: none !important; min-height: 400px; font-family: inherit !important; font-size: 16px !important; }
              .ql-editor { min-height: 400px; padding: 24px !important; line-height: 1.8 !important; }
              .ql-editor h2 { font-weight: 700 !important; font-size: 1.5rem !important; margin-top: 1em; margin-bottom: 0.5em; }
              .ql-editor h3 { font-weight: 700 !important; font-size: 1.25rem !important; margin-top: 1em; margin-bottom: 0.5em; }
            `}</style>
          </Field>
        )}

        {tab === "Media" && (
          <CoverUpload value={blog?.coverImage ?? ""} onChange={v => set("coverImage", v)} />
        )}

        {tab === "SEO" && <>
          <Field label="Meta Title" hint="Defaults to post title if empty">
            <Input value={blog?.metaTitle ?? ""} onChange={v => set("metaTitle", v)} placeholder="SEO title…" />
          </Field>
          <Field label="Meta Description">
            <Textarea value={blog?.metaDesc ?? ""} onChange={v => set("metaDesc", v)} rows={3} placeholder="SEO description…" />
          </Field>
          <Field label="Slug">
            <Input value={blog?.slug ?? ""} onChange={v => set("slug", v)} placeholder="url-friendly-slug" />
          </Field>
          <div className="p-4 rounded-xl bg-[#0d0f14] border border-white/[0.06]">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-2">Preview URL</p>
            <p className="text-xs text-indigo-400 break-all">/Blogs/{blog?.slug || "your-slug"}</p>
          </div>
        </>}
      </div>
    </div>
  );
}

/* ─ Main Export ─ */
export default function BlogsEditor({ initialData }) {
  const [blogs, setBlogs] = useState(initialData ?? []);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [view, setView] = useState("list");

  const selected = selectedIndex !== null ? blogs[selectedIndex] : null;

  function handleChange(key, val) {
    if (selectedIndex === null) return;
    setBlogs(prev => prev.map((b, i) => i === selectedIndex ? { ...b, [key]: val } : b));
  }

  function handleAdd() {
    const b = { slug: "", title: "", category: "", author: "", excerpt: "", content: "", coverImage: "", publishedAt: new Date().toISOString(), published: false, tags: [], readTime: "", metaTitle: "", metaDesc: "" };
    setBlogs(prev => [...prev, b]);
    setSelectedIndex(blogs.length);
    setView("editor");
  }

  function handleRemove(index) {
    setBlogs(prev => prev.filter((_, i) => i !== index));
    setSelectedIndex(prev => {
      if (prev === null) return null;
      if (prev === index) { setView("list"); return null; }
      return prev > index ? prev - 1 : prev;
    });
  }

  function handleMoveUp(index) {
    if (index === 0) return;
    setBlogs(prev => { const a = [...prev];[a[index - 1], a[index]] = [a[index], a[index - 1]]; return a; });
    if (selectedIndex === index) setSelectedIndex(index - 1);
    else if (selectedIndex === index - 1) setSelectedIndex(index);
  }

  function handleMoveDown(index) {
    if (index === blogs.length - 1) return;
    setBlogs(prev => { const a = [...prev];[a[index], a[index + 1]] = [a[index + 1], a[index]]; return a; });
    if (selectedIndex === index) setSelectedIndex(index + 1);
    else if (selectedIndex === index + 1) setSelectedIndex(index);
  }

  async function handleSave() {
    const res = await fetch("/api/content", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ section: "blogs", data: blogs }) });
    if (!res.ok) throw new Error("Save failed");
  }

  const publishedCount = blogs.filter(b => b.published).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* top bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap mb-6">
        <div>
          <PageHeader title="Blog Posts" description={`${blogs.length} post${blogs.length !== 1 ? "s" : ""} · ${publishedCount} published`} />
        </div>
        <div className="flex items-center gap-2">
          {view === "list" && (
            <button onClick={handleAdd} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border border-indigo-500/40 text-indigo-400 hover:bg-indigo-600/10 hover:border-indigo-500/60 transition">
              <IPlus /> New Post
            </button>
          )}
          <SaveButton onSave={handleSave} />
        </div>
      </div>

      {/* LIST */}
      {view === "list" && (
        <>
          {blogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-24 border border-dashed border-slate-700 rounded-2xl text-slate-600">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.75}><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
              <p className="text-sm font-medium text-slate-500">No posts yet</p>
              <p className="text-xs">Click "New Post" to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {blogs.map((blog, index) => (
                <BlogGridCard
                  key={blog.slug || index} blog={blog} index={index}
                  isFirst={index === 0} isLast={index === blogs.length - 1}
                  onSelect={() => { setSelectedIndex(index); setView("editor"); }}
                  onMoveUp={() => handleMoveUp(index)}
                  onMoveDown={() => handleMoveDown(index)}
                  onRemove={() => handleRemove(index)}
                />
              ))}
              <button onClick={handleAdd} className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-700 hover:border-indigo-500/50 hover:bg-indigo-600/5 text-slate-600 hover:text-indigo-400 transition-all duration-200 min-h-[180px]">
                <IPlus /><span className="text-xs font-semibold">New Post</span>
              </button>
            </div>
          )}
        </>
      )}

      {/* EDITOR */}
      {view === "editor" && selected && (
        <Card>
          <EditorPanel blog={selected} onChange={handleChange} onBack={() => setView("list")} />
        </Card>
      )}
    </div>
  );
}
