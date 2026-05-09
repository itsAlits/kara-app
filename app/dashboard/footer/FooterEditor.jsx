"use client";

import { useState } from "react";
import { SaveButton, PageHeader, Field, Input, Card } from "../components/DashboardUI";

/* ─── LinkList must be defined OUTSIDE FooterEditor ──────────────
   Defining a component inside another component causes React to
   remount it on every render, losing input focus immediately.     */
function LinkList({ items, onUpdate, onAdd, onRemove }) {
  return (
    <div className="space-y-3">
      {items.map((link, i) => (
        <div key={i} className="flex items-center gap-3">
          <input
            value={link.label}
            onChange={(e) => onUpdate(i, "label", e.target.value)}
            placeholder="Label"
            className="flex-1 bg-[#0d0f14] border border-white/[0.08] rounded-lg px-3 py-2.5 text-white text-sm placeholder-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all"
          />
          <input
            value={link.href}
            onChange={(e) => onUpdate(i, "href", e.target.value)}
            placeholder="URL or #anchor"
            className="flex-1 bg-[#0d0f14] border border-white/[0.08] rounded-lg px-3 py-2.5 text-white text-sm placeholder-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all"
          />
          <button
            onClick={() => onRemove(i)}
            className="text-slate-600 hover:text-red-400 transition shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
      <button
        onClick={onAdd}
        className="flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 border border-indigo-500/30 rounded-lg px-3 py-1.5 transition"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Add Link
      </button>
    </div>
  );
}

export default function FooterEditor({ initialData }) {
  const [data, setData] = useState(initialData);

  function setTop(key, val) {
    setData((prev) => ({ ...prev, [key]: val }));
  }

  /* Links helpers */
  function updateLink(field, index, key, val) {
    setData((prev) => ({
      ...prev,
      [field]: prev[field].map((l, i) => (i === index ? { ...l, [key]: val } : l)),
    }));
  }

  function addLink(field) {
    setData((prev) => ({
      ...prev,
      [field]: [...prev[field], { label: "", href: "#" }],
    }));
  }

  function removeLink(field, index) {
    setData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  }

  async function handleSave() {
    const res = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "footer", data }),
    });
    if (!res.ok) throw new Error("Save failed");
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <PageHeader title="Footer" description="Edit footer links, tagline, and copyright." />
        <SaveButton onSave={handleSave} />
      </div>

      <div className="grid xl:grid-cols-2 gap-6">
        {/* Branding */}
        <Card>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5">Branding</h2>
          <div className="space-y-4">
            <Field label="Tagline">
              <Input value={data.tagline} onChange={(v) => setTop("tagline", v)} placeholder="Building brands that move people." />
            </Field>
            <Field label="Copyright">
              <Input value={data.copyright} onChange={(v) => setTop("copyright", v)} placeholder="© 2026 Kara. All rights reserved." />
            </Field>
          </div>
        </Card>

        {/* Navigation Links */}
        <Card>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5">Navigation Links</h2>
          <LinkList
            items={data.links}
            onUpdate={(i, key, val) => updateLink("links", i, key, val)}
            onAdd={() => addLink("links")}
            onRemove={(i) => removeLink("links", i)}
          />
        </Card>

        {/* Social Links */}
        <Card>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5">Social Links</h2>
          <LinkList
            items={data.socials}
            onUpdate={(i, key, val) => updateLink("socials", i, key, val)}
            onAdd={() => addLink("socials")}
            onRemove={(i) => removeLink("socials", i)}
          />
        </Card>
      </div>
    </div>
  );
}
