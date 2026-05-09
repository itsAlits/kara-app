import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";
import { getContent } from "@/app/lib/data";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  // During build, read from content.json to generate paths
  const { getContent: gc } = await import("@/app/lib/data");
  const content = await gc();
  return (content.projects ?? []).map((p) => ({ id: p.id }));
}

export default async function ProjectDetail({ params }) {
  const { id } = await params;
  const content = await getContent();
  const projects = content.projects ?? [];
  const project = projects.find((p) => p.id === id);

  if (!project) notFound();

  const gallery = project.gallery ?? [project.image];
  const services = project.services ?? [];
  const technologies = project.technologies ?? [];

  // Prev / Next navigation
  const idx = projects.indexOf(project);
  const prev = projects[idx - 1] ?? null;
  const next = projects[idx + 1] ?? null;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative h-[65vh] flex items-end overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 pb-12 sm:pb-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/60 text-xs font-medium mb-6">
            <Link href="/#projects" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/Project" className="hover:text-white transition-colors">Projects</Link>
            <span>/</span>
            <span className="text-white/90 truncate max-w-[160px]">{project.title}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/20 mb-4">
                {project.category}
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-light text-white leading-tight">
                {project.title}
              </h1>
              {project.desc && (
                <p className="mt-3 text-white/70 text-sm sm:text-base max-w-2xl leading-relaxed">
                  {project.desc}
                </p>
              )}
            </div>

            {/* Quick meta pills */}
            <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end sm:gap-2 shrink-0">
              {project.client && (
                <div className="flex items-center gap-2 text-white/80 text-xs bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5">
                  <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {project.client}
                </div>
              )}
              {project.year && (
                <div className="flex items-center gap-2 text-white/80 text-xs bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5">
                  <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {project.year}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-16 sm:py-24 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              {project.fullDesc && (
                <div>
                  <h2 className="text-xs uppercase tracking-[0.24em] text-gray-400 font-medium mb-4">Project Overview</h2>
                  <p className="text-gray-700 text-base leading-relaxed">{project.fullDesc}</p>
                </div>
              )}

              {/* Gallery */}
              {gallery.length > 0 && (
                <div>
                  <h2 className="text-xs uppercase tracking-[0.24em] text-gray-400 font-medium mb-6">Gallery</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {gallery.map((img, i) => (
                      <div
                        key={i}
                        className={`relative overflow-hidden rounded-2xl bg-gray-100 ${i === 0 ? "sm:col-span-2 aspect-video" : "aspect-[4/3]"}`}
                      >
                        <img
                          src={img}
                          alt={`${project.title} — image ${i + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-5">

                {/* Project details */}
                {(project.client || project.year || project.category) && (
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 space-y-4">
                    <h3 className="text-xs uppercase tracking-[0.24em] text-gray-400 font-medium">Project Details</h3>
                    {project.client && (
                      <div>
                        <p className="text-xs text-gray-400 mb-0.5">Client</p>
                        <p className="text-sm font-medium text-gray-900">{project.client}</p>
                      </div>
                    )}
                    {project.year && (
                      <div>
                        <p className="text-xs text-gray-400 mb-0.5">Year</p>
                        <p className="text-sm font-medium text-gray-900">{project.year}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Category</p>
                      <p className="text-sm font-medium text-gray-900">{project.category}</p>
                    </div>
                  </div>
                )}

                {/* Services */}
                {services.length > 0 && (
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                    <h3 className="text-xs uppercase tracking-[0.24em] text-gray-400 font-medium mb-4">Services</h3>
                    <ul className="space-y-2.5">
                      {services.map((s, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies / Tools */}
                {technologies.length > 0 && (
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                    <h3 className="text-xs uppercase tracking-[0.24em] text-gray-400 font-medium mb-4">Tools Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((t, i) => (
                        <span key={i} className="px-3 py-1 bg-white text-gray-700 text-xs rounded-full border border-gray-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Back */}
                <Link
                  href="/Project"
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors group"
                >
                  <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  All Projects
                </Link>
              </div>
            </div>
          </div>

          {/* ── Prev / Next navigation ── */}
          {(prev || next) && (
            <div className="mt-20 pt-10 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prev ? (
                <Link
                  href={`/Project/${prev.id}`}
                  className="group flex items-center gap-4 rounded-2xl border border-gray-100 hover:border-gray-300 p-5 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-gray-900 group-hover:bg-gray-900 transition-all duration-200 shrink-0">
                    <svg className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-400 mb-0.5">Previous</p>
                    <p className="text-sm font-medium text-gray-900 truncate">{prev.title}</p>
                  </div>
                </Link>
              ) : <div />}

              {next ? (
                <Link
                  href={`/Project/${next.id}`}
                  className="group flex items-center gap-4 rounded-2xl border border-gray-100 hover:border-gray-300 p-5 transition-all duration-200 sm:flex-row-reverse sm:text-right"
                >
                  <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-gray-900 group-hover:bg-gray-900 transition-all duration-200 shrink-0">
                    <svg className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-400 mb-0.5">Next</p>
                    <p className="text-sm font-medium text-gray-900 truncate">{next.title}</p>
                  </div>
                </Link>
              ) : <div />}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}