"use client";

import { useState } from "react";
import { SaveButton, PageHeader, Field, Input, Textarea, Card } from "../components/DashboardUI";

const VARIANTS = [
  { value: "dark-large", label: "Dark (large featured)" },
  { value: "light-small", label: "Light (small)" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

function TestimonialCard({ item, index, onChange, onRemove, isFirst, isLast, onMoveUp, onMoveDown }) {
  function set(key, val) {
    onChange(index, key, val);
  }

  return (
    <Card>
      <div className="flex items-start justify-between mb-4">
        <span className="text-xs font-mono text-slate-500 bg-slate-800 border border-slate-700 rounded-lg px-2 py-1">
          #{index + 1}
        </span>
        <div className="flex items-center gap-1">
          <button disabled={isFirst} onClick={onMoveUp} className="p-1.5 text-slate-500 hover:text-white disabled:opacity-30 transition">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button disabled={isLast} onClick={onMoveDown} className="p-1.5 text-slate-500 hover:text-white disabled:opacity-30 transition">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button onClick={() => onRemove(index)} className="p-1.5 text-slate-500 hover:text-red-400 transition">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <Field label="Headline Quote">
          <Textarea value={item.quote} onChange={(v) => set("quote", v)} rows={2} placeholder="Customer's key quote headline…" />
        </Field>
        <Field label="Body Text">
          <Textarea value={item.body} onChange={(v) => set("body", v)} rows={2} placeholder="More detail about the experience…" />
        </Field>
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Author Name">
            <Input value={item.author} onChange={(v) => set("author", v)} placeholder="Name" />
          </Field>
          <Field label="Role / Company">
            <Input value={item.role} onChange={(v) => set("role", v)} placeholder="CEO of Company" />
          </Field>
          <Field label="Card Style">
            <select
              value={item.variant}
              onChange={(e) => set("variant", e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 transition"
            >
              {VARIANTS.map((v) => (
                <option key={v.value} value={v.value}>{v.label}</option>
              ))}
            </select>
          </Field>
        </div>
      </div>
    </Card>
  );
}

export default function TestimonialsEditor({ initialData }) {
  const [data, setData] = useState(initialData);

  function setTop(key, val) {
    setData((prev) => ({ ...prev, [key]: val }));
  }

  function setStat(key, val) {
    setData((prev) => ({ ...prev, stat: { ...prev.stat, [key]: val } }));
  }

  function handleChange(index, key, val) {
    setData((prev) => ({
      ...prev,
      items: prev.items.map((t, i) => (i === index ? { ...t, [key]: val } : t)),
    }));
  }

  function handleRemove(index) {
    setData((prev) => ({ ...prev, items: prev.items.filter((_, i) => i !== index) }));
  }

  function handleAdd() {
    setData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { id: `t${Date.now()}`, quote: "", body: "", author: "", role: "", variant: "light" },
      ],
    }));
  }

  function handleMoveUp(index) {
    if (index === 0) return;
    setData((prev) => {
      const arr = [...prev.items];
      [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
      return { ...prev, items: arr };
    });
  }

  function handleMoveDown(index) {
    setData((prev) => {
      const arr = [...prev.items];
      if (index >= arr.length - 1) return prev;
      [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
      return { ...prev, items: arr };
    });
  }

  async function handleSave() {
    const res = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "testimonials", data }),
    });
    if (!res.ok) throw new Error("Save failed");
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <PageHeader title="Testimonials" description="Manage customer stories, stats, and the section heading." />
        <div className="flex items-center gap-3">
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-indigo-500/40 text-indigo-400 hover:bg-indigo-600/10 transition"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add
          </button>
          <SaveButton onSave={handleSave} />
        </div>
      </div>

      {/* Top row: section header + stat card */}
      <div className="grid xl:grid-cols-2 gap-6 mb-6">
        {/* Section header */}
        <Card>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5">Section Header</h2>
          <div className="space-y-4">
            <Field label="Eyebrow">
              <Input value={data.eyebrow} onChange={(v) => setTop("eyebrow", v)} placeholder="Customer stories" />
            </Field>
            <Field label="Heading">
              <Input value={data.heading} onChange={(v) => setTop("heading", v)} placeholder="What our satisfied customers are saying" />
            </Field>
            <Field label="Sub-heading">
              <Textarea value={data.subheading} onChange={(v) => setTop("subheading", v)} rows={2} placeholder="Clear, confident feedback…" />
            </Field>
          </div>
        </Card>

        {/* Stat card */}
        <Card>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5">Stat Card</h2>
          <div className="space-y-4">
            <Field label="Stat Value" hint="e.g. 91%">
              <Input value={data.stat.value} onChange={(v) => setStat("value", v)} placeholder="91%" />
            </Field>
            <Field label="Stat Label">
              <Textarea value={data.stat.label} onChange={(v) => setStat("label", v)} rows={3} placeholder="Clients recommend…" />
            </Field>
          </div>
        </Card>
      </div>

      {/* Customer stories — full width */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5">Customer Stories</h2>
        <div className="grid sm:grid-cols-2 xl:grid-cols-2 gap-4">
          {data.items.map((item, index) => (
            <TestimonialCard
              key={item.id || index}
              item={item}
              index={index}
              onChange={handleChange}
              onRemove={handleRemove}
              onMoveUp={() => handleMoveUp(index)}
              onMoveDown={() => handleMoveDown(index)}
              isFirst={index === 0}
              isLast={index === data.items.length - 1}
            />
          ))}
          {data.items.length === 0 && (
            <div className="col-span-full text-center py-10 text-slate-600 text-sm border border-dashed border-white/[0.07] rounded-xl">
              No testimonials yet. Click "Add" to create one.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
