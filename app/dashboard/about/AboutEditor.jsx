"use client";

import { useState } from "react";
import { SaveButton, PageHeader, Field, Input, Textarea, Card } from "../components/DashboardUI";

export default function AboutEditor({ initialData }) {
  const [data, setData] = useState(initialData);

  function set(key, val) {
    setData((prev) => ({ ...prev, [key]: val }));
  }

  async function handleSave() {
    const res = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "about", data }),
    });
    if (!res.ok) throw new Error("Save failed");
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <PageHeader title="About Section" description="Edit the agency description and values." />
        <SaveButton onSave={handleSave} />
      </div>

      <div className="grid xl:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-sm font-semibold text-white mb-5">Heading</h2>
          <div className="space-y-4">
            <Field label="Eyebrow Label" hint="Small uppercase text above the heading">
              <Input value={data.eyebrow} onChange={(v) => set("eyebrow", v)} placeholder="About Kara" />
            </Field>
            <Field label="Main Heading" hint="The word 'brand' will appear italic">
              <Textarea value={data.heading} onChange={(v) => set("heading", v)} rows={2} placeholder="A creative agency built to make your brand look premium…" />
            </Field>
            <Field label="Body Paragraph">
              <Textarea value={data.body} onChange={(v) => set("body", v)} rows={3} placeholder="Kara blends photography, digital experiences…" />
            </Field>
          </div>
        </Card>

        <Card>
          <h2 className="text-sm font-semibold text-white mb-5">Values Cards</h2>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Focus Card Title">
                <Input value={data.focusTitle} onChange={(v) => set("focusTitle", v)} placeholder="Our focus" />
              </Field>
              <Field label="Approach Card Title">
                <Input value={data.approachTitle} onChange={(v) => set("approachTitle", v)} placeholder="Our approach" />
              </Field>
            </div>
            <Field label="Focus Description">
              <Textarea value={data.focusText} onChange={(v) => set("focusText", v)} rows={3} placeholder="We help brands stand out…" />
            </Field>
            <Field label="Approach Description">
              <Textarea value={data.approachText} onChange={(v) => set("approachText", v)} rows={3} placeholder="Every project begins with strategy…" />
            </Field>
          </div>
        </Card>
      </div>
    </div>
  );
}
