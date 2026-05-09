"use client";

import { useState, useRef } from "react";
import { SaveButton, PageHeader, Field, Input, Card } from "../components/DashboardUI";

/* ─── Single logo row (defined outside to avoid remount issues) ── */
function LogoRow({ logo, index, onUpdate, onRemove }) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const json = await res.json();
      if (res.ok && json.url) {
        onUpdate(index, "src", json.url);
        // Auto-fill alt from filename if empty
        if (!logo.alt) {
          const name = file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
          onUpdate(index, "alt", name);
        }
      } else {
        setError(json.error || "Upload failed");
      }
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#0d0f14] p-4 space-y-3">
      {/* Top row: preview + fields + delete */}
      <div className="flex items-center gap-3">
        {/* Logo preview thumbnail */}
        <div className="w-16 h-10 rounded-lg bg-[#161922] border border-white/[0.08] flex items-center justify-center shrink-0 overflow-hidden">
          {logo.src ? (
            <img
              src={logo.src}
              alt={logo.alt}
              className="w-full h-full object-contain p-1.5"
            />
          ) : (
            <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
        </div>

        {/* Alt text */}
        <input
          value={logo.alt}
          onChange={(e) => onUpdate(index, "alt", e.target.value)}
          placeholder="Client name (alt text)"
          className="flex-1 min-w-0 bg-[#161922] border border-white/[0.08] rounded-lg px-3 py-2.5 text-white text-sm placeholder-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all"
        />

        {/* Delete */}
        <button
          onClick={() => onRemove(index)}
          className="text-slate-600 hover:text-red-400 transition shrink-0"
          title="Remove logo"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* Image source row: URL input + Upload button */}
      <div className="flex items-center gap-2">
        <input
          value={logo.src}
          onChange={(e) => onUpdate(index, "src", e.target.value)}
          placeholder="/uploads/logo.png  or  https://…"
          className="flex-1 min-w-0 bg-[#161922] border border-white/[0.08] rounded-lg px-3 py-2 text-white text-xs placeholder-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all"
        />

        {/* Upload button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          title="Upload logo file"
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-white/[0.08] text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40 hover:bg-indigo-600/5 transition-all duration-150 disabled:opacity-50 shrink-0"
        >
          {uploading ? (
            <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          )}
          {uploading ? "Uploading…" : "Upload file"}
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/svg+xml,image/gif"
          className="hidden"
          onChange={handleUpload}
        />
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

/* ─── Main editor ──────────────────────────────────────────────── */
export default function ClientsEditor({ initialData }) {
  const [data, setData] = useState(initialData);

  function updateLogo(index, key, value) {
    setData((prev) => ({
      ...prev,
      logos: prev.logos.map((l, i) => (i === index ? { ...l, [key]: value } : l)),
    }));
  }

  function removeLogo(index) {
    setData((prev) => ({
      ...prev,
      logos: prev.logos.filter((_, i) => i !== index),
    }));
  }

  function addLogo() {
    setData((prev) => ({
      ...prev,
      logos: [...prev.logos, { src: "", alt: "" }],
    }));
  }

  async function handleSave() {
    const res = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "clients", data }),
    });
    if (!res.ok) throw new Error("Save failed");
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <PageHeader title="Clients" description="Manage the client logo marquee strip." />
        <SaveButton onSave={handleSave} />
      </div>

      <div className="grid xl:grid-cols-2 gap-6">
        {/* Marquee label */}
        <Card>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5">Section Label</h2>
          <Field label="Marquee Label" hint="Shown above the scrolling logo strip">
            <Input
              value={data.label}
              onChange={(v) => setData((p) => ({ ...p, label: v }))}
              placeholder="Trusted by growing brands — and counting"
            />
          </Field>
        </Card>

        {/* Logos list */}
        <Card className="xl:col-span-1">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500">Client Logos</h2>
            <button
              onClick={addLogo}
              className="flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 border border-indigo-500/30 rounded-lg px-3 py-1.5 transition hover:border-indigo-400/50"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Logo
            </button>
          </div>

          <div className="space-y-3">
            {data.logos.map((logo, i) => (
              <LogoRow
                key={i}
                logo={logo}
                index={i}
                onUpdate={updateLogo}
                onRemove={removeLogo}
              />
            ))}

            {data.logos.length === 0 && (
              <div className="text-center py-8 text-slate-600 text-sm border border-dashed border-white/[0.07] rounded-xl">
                No logos yet. Click "Add Logo" to get started.
              </div>
            )}
          </div>

          {data.logos.length > 0 && (
            <p className="mt-4 text-xs text-slate-600">
              Accepted formats: PNG, JPG, WebP, SVG, GIF · Max 5 MB per file
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
