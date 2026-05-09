"use client";

import { useState } from "react";
import { SaveButton, PageHeader, Field, Textarea } from "../components/DashboardUI";

export default function QuotesEditor({ initialData }) {
  const [quote, setQuote] = useState(initialData);

  async function handleSave() {
    const res = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "quote", data: quote }),
    });
    if (!res.ok) throw new Error("Save failed");
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <PageHeader title="Quote Section" description="The large statement shown between Clients and Projects." />
        <SaveButton onSave={handleSave} />
      </div>

      <div className="max-w-2xl space-y-5">
        <Field label="Quote Text" hint="This text appears as the large statement between the Clients and Projects sections.">
          <Textarea value={quote} onChange={setQuote} rows={5} placeholder="We are a digital agency that helps brands…" />
        </Field>

        {/* Live preview */}
        <div className="p-5 rounded-xl bg-[#161922] border border-white/[0.07]">
          <p className="text-xs uppercase tracking-widest text-slate-600 mb-3">Preview</p>
          <p className="text-slate-200 text-lg sm:text-xl leading-relaxed font-light">
            {quote || "Your quote will appear here…"}
          </p>
        </div>
      </div>
    </div>
  );
}
