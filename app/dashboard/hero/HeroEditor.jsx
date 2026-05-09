"use client";

import { useState } from "react";
import { SaveButton, PageHeader, Field, Input, Textarea, Card } from "../components/DashboardUI";

export default function HeroEditor({ initialData }) {
  const [data, setData] = useState(initialData);

  function set(key, val) {
    setData((prev) => ({ ...prev, [key]: val }));
  }

  async function handleSave() {
    const res = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "hero", data }),
    });
    if (!res.ok) throw new Error("Save failed");
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <PageHeader
          title="Hero Section"
          description="Edit the top banner of your website."
        />
        <SaveButton onSave={handleSave} />
      </div>

      <div className="grid xl:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-sm font-semibold text-white mb-5">Availability Badge</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Badge Text">
              <Input value={data.badge} onChange={(v) => set("badge", v)} placeholder="Now available for new projects" />
            </Field>
            <Field label="Year">
              <Input value={data.badgeYear} onChange={(v) => set("badgeYear", v)} placeholder="2026" />
            </Field>
          </div>
        </Card>

        <Card>
          <h2 className="text-sm font-semibold text-white mb-5">Headline</h2>
          <div className="space-y-4">
            <Field label="Main Headline" hint="The bold text before the italic part">
              <Input value={data.headline} onChange={(v) => set("headline", v)} placeholder="Turn visitors into customers" />
            </Field>
            <Field label="Italic Accent" hint="Shown in italic Playfair font">
              <Input value={data.headlineItalic} onChange={(v) => set("headlineItalic", v)} placeholder="thoughtful design" />
            </Field>
            <Field label="Sub-headline">
              <Textarea value={data.subheadline} onChange={(v) => set("subheadline", v)} placeholder="We partner with ambitious brands…" rows={3} />
            </Field>
          </div>
        </Card>

        <Card>
          <h2 className="text-sm font-semibold text-white mb-5">Call-to-Action Buttons</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Primary Button">
              <Input value={data.ctaPrimary} onChange={(v) => set("ctaPrimary", v)} placeholder="Get Started" />
            </Field>
            <Field label="Secondary Button">
              <Input value={data.ctaSecondary} onChange={(v) => set("ctaSecondary", v)} placeholder="View our work" />
            </Field>
          </div>
        </Card>

        <Card>
          <h2 className="text-sm font-semibold text-white mb-5">Social Proof</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Label">
              <Input value={data.socialProofLabel} onChange={(v) => set("socialProofLabel", v)} placeholder="Trusted by" />
            </Field>
            <Field label="Brand Name">
              <Input value={data.socialProofBrand} onChange={(v) => set("socialProofBrand", v)} placeholder="Big Brands" />
            </Field>
            <Field label="Location">
              <Input value={data.socialProofLocation} onChange={(v) => set("socialProofLocation", v)} placeholder="in Bali" />
            </Field>
          </div>
        </Card>
      </div>
    </div>
  );
}
