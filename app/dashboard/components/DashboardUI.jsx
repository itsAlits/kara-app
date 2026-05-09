"use client";

import { useState } from "react";

/* ─── Save Button ──────────────────────────────────────────────── */
export function SaveButton({ onSave }) {
  const [state, setState] = useState("idle"); // idle | saving | saved | error

  async function handleClick() {
    setState("saving");
    try {
      await onSave();
      setState("saved");
      setTimeout(() => setState("idle"), 2000);
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 2500);
    }
  }

  const label = { idle: "Save Changes", saving: "Saving…", saved: "Saved!", error: "Failed — Retry" }[state];
  const colors = {
    idle:   "bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-500",
    saving: "bg-indigo-600/60 text-white/60 border-indigo-500/40 cursor-wait",
    saved:  "bg-emerald-600 text-white border-emerald-500",
    error:  "bg-red-600 text-white border-red-500",
  }[state];

  return (
    <button
      onClick={handleClick}
      disabled={state === "saving"}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 shrink-0 ${colors}`}
      style={{ minWidth: "130px" }}
    >
      {state === "saving" && (
        <svg className="animate-spin w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {state === "saved" && (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
      {label}
    </button>
  );
}

/* ─── Page Header ──────────────────────────────────────────────── */
export function PageHeader({ title, description }) {
  return (
    <div className="min-w-0">
      <h1 className="text-xl font-semibold text-white leading-tight">{title}</h1>
      {description && <p className="mt-0.5 text-sm text-slate-500 truncate">{description}</p>}
    </div>
  );
}

/* ─── Section wrapper — full-width, no max-w ──────────────────── */
export function PageWrapper({ children }) {
  return (
    <div className="p-6 lg:p-8">
      {children}
    </div>
  );
}

/* ─── Top bar row for page header + action buttons ───────────── */
export function PageTopBar({ children }) {
  return (
    <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
      {children}
    </div>
  );
}

/* ─── Card ─────────────────────────────────────────────────────── */
export function Card({ children, className = "" }) {
  return (
    <div className={`bg-[#161922] border border-white/[0.07] rounded-xl p-6 ${className}`}>
      {children}
    </div>
  );
}

/* ─── Card Section Title ────────────────────────────────────────── */
export function SectionTitle({ children }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5">
      {children}
    </h2>
  );
}

/* ─── Field (label + children) ─────────────────────────────────── */
export function Field({ label, hint, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-widest">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-slate-600">{hint}</p>}
    </div>
  );
}

/* ─── Input ─────────────────────────────────────────────────────── */
export function Input({ value = "", onChange, placeholder = "" }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-[#0d0f14] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-white text-sm placeholder-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-150"
    />
  );
}

/* ─── Textarea ──────────────────────────────────────────────────── */
export function Textarea({ value = "", onChange, placeholder = "", rows = 3 }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-[#0d0f14] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-white text-sm placeholder-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-150 resize-none leading-relaxed"
    />
  );
}
