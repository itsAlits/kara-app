import { getContent } from "@/app/lib/data";
import Link from "next/link";

const STAT_COLORS = [
  { bg: "bg-indigo-600/10", border: "border-indigo-500/20", icon: "bg-indigo-600/20", text: "text-indigo-400" },
  { bg: "bg-violet-600/10", border: "border-violet-500/20", icon: "bg-violet-600/20", text: "text-violet-400" },
  { bg: "bg-emerald-600/10", border: "border-emerald-500/20", icon: "bg-emerald-600/20", text: "text-emerald-400" },
  { bg: "bg-amber-600/10",  border: "border-amber-500/20",  icon: "bg-amber-600/20",  text: "text-amber-400"  },
];

const SECTION_ICONS = {
  Hero:         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.168c.969 0 1.371 1.24.588 1.81l-3.374 2.452a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118L12 15.347l-3.352 2.7c-.785.57-1.84-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L4.657 9.393c-.783-.57-.38-1.81.588-1.81h4.168a1 1 0 00.95-.69L11.049 2.927z"/></svg>,
  Clients:      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>,
  Projects:     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>,
  Quote:        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>,
  About:        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  Testimonials: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/></svg>,
  Footer:       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7"/></svg>,
};

export default async function DashboardOverview() {
  const content = await getContent();
  const lastMod = content._meta?.lastModified
    ? new Date(content._meta.lastModified).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })
    : "Never";

  const stats = [
    { label: "Content Sections", value: "7",
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>,
    },
    { label: "Projects", value: String(content.projects?.length ?? 0),
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>,
    },
    { label: "Testimonials", value: String(content.testimonials?.items?.length ?? 0),
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/></svg>,
    },
    { label: "Client Logos", value: String(content.clients?.logos?.length ?? 0),
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>,
    },
  ];

  const sections = [
    { label: "Hero",         href: "/dashboard/hero",         desc: "Badge, headline, CTA buttons" },
    { label: "Clients",      href: "/dashboard/clients",      desc: "Marquee logos & label" },
    { label: "Projects",     href: "/dashboard/projects",     desc: "Add, edit & delete projects" },
    { label: "Quote",        href: "/dashboard/quotes",       desc: "Large statement quote" },
    { label: "About",        href: "/dashboard/about",        desc: "Agency description & values" },
    { label: "Testimonials", href: "/dashboard/testimonials", desc: "Customer stories & stats" },
    { label: "Footer",       href: "/dashboard/footer",       desc: "Links & copyright" },
  ];

  return (
    <div className="p-6 lg:p-8">

      {/* ── Page title ── */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">Overview</h1>
        <p className="mt-1 text-sm text-slate-500">
          Last updated <span className="text-slate-300">{lastMod}</span>
          {content._meta?.lastModifiedBy && (
            <> · by <span className="text-slate-300">{content._meta.lastModifiedBy}</span></>
          )}
        </p>
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
        {stats.map((s, i) => {
          const c = STAT_COLORS[i];
          return (
            <div key={s.label} className={`rounded-xl border ${c.border} ${c.bg} p-5 flex flex-col gap-4`}>
              <div className={`w-9 h-9 rounded-lg ${c.icon} flex items-center justify-center ${c.text}`}>
                {s.icon}
              </div>
              <div>
                <div className="text-2xl font-semibold text-white">{s.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Section divider ── */}
      <div className="flex items-center gap-3 mb-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-600">Edit Sections</p>
        <div className="flex-1 h-px bg-white/[0.05]" />
      </div>

      {/* ── Sections grid ── */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group flex items-center justify-between rounded-xl border border-white/[0.07] hover:border-indigo-500/30 bg-[#161922] hover:bg-indigo-600/[0.05] p-5 transition-all duration-200"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-slate-500 group-hover:text-indigo-400 group-hover:border-indigo-500/30 group-hover:bg-indigo-600/10 transition-all duration-200 shrink-0">
                {SECTION_ICONS[s.label] ?? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="12" cy="12" r="10"/></svg>
                )}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-white">{s.label}</div>
                <div className="text-xs text-slate-600 truncate">{s.desc}</div>
              </div>
            </div>
            <svg
              className="w-4 h-4 text-slate-700 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all duration-200 shrink-0 ml-3"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>

      {/* ── Quick link to live site ── */}
      <div className="mt-8 flex items-center justify-between p-4 rounded-xl border border-white/[0.05] bg-[#161922]">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm text-slate-400">Your website is live</span>
        </div>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          View site
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
