"use client";

import { Playfair_Display } from "next/font/google";
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400"],
});
import Link from "next/link";

const pillColour = {
  Photography: "bg-white/20 text-white border border-white/30",
  Website: "bg-white/20 text-white border border-white/30",
  Ads: "bg-white/20 text-white border border-white/30",
  Design: "bg-white/20 text-white border border-white/30",
  Video: "bg-white/20 text-white border border-white/30",
  "Social Media": "bg-white/20 text-white border border-white/30",
};

function ProjectCard({ project, className = "" }) {
  return (
    <Link href={`/Project/${project.id}`} className={`group relative overflow-hidden rounded-lg bg-gray-100 cursor-pointer block ${className}`}>
      {/* Image */}
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      {/* Persistent bottom gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
      {/* Hover full overlay */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
        {/* Top row: number + category */}
        <div className="flex items-center justify-between">
          <span className="text-white/50 font-mono text-xs font-medium">{project.id}</span>
          <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full backdrop-blur-sm ${pillColour[project.category] || "bg-white/20 text-white border border-white/30"}`}>
            {project.category}
          </span>
        </div>
        {/* Bottom row: title + arrow */}
        <div className="flex items-end justify-between gap-3">
          <div>
            <h3 className="text-white font-normal text-base sm:text-lg leading-snug mb-0.5">
              {project.title}
            </h3>
            <div className="max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500">
              <p className="text-white/70 text-xs leading-relaxed max-w-[200px] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 pt-0.5">
                {project.desc}
              </p>
            </div>
          </div>
          <span className="shrink-0 w-9 h-9 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-300 group-hover:-rotate-45 group-hover:bg-white group-hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Projects({ content = [] }) {
  const projects = Array.isArray(content) ? content : [];

  return (
    <section id="projects" className="w-full bg-white py-20 sm:py-28 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-gray-400 font-medium mb-3">
              Recent Work
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-normal tracking-tight text-gray-900 leading-[1.1]">
              Projects that
              <em className="italic font-light ml-2" style={{ fontFamily: playfair.style.fontFamily }}>
                speak for themselves
              </em>
            </h2>
          </div>
          <Link
            href="/Project"
            className="group hidden sm:flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors duration-200 shrink-0 pb-1"
          >
            See all projects
            <span className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-gray-900 transition-all duration-200 group-hover:-rotate-45">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>

        {projects.length > 0 ? (
          <div className="flex flex-col gap-4">
            {/* Row 1 */}
            <div className="flex flex-col sm:flex-row gap-4">
              {projects[0] && <ProjectCard project={projects[0]} className="h-64 sm:h-80 sm:flex-2" />}
              {projects[1] && <ProjectCard project={projects[1]} className="h-64 sm:h-80 sm:flex-1" />}
            </div>
            {/* Row 2 */}
            {(projects[2] || projects[3]) && (
              <div className="flex flex-col sm:flex-row gap-4">
                {projects[2] && <ProjectCard project={projects[2]} className="h-64 sm:h-80 sm:flex-1" />}
                {projects[3] && <ProjectCard project={projects[3]} className="h-64 sm:h-80 sm:flex-2" />}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-300 text-sm">No projects added yet.</div>
        )}

        {/* Mobile CTA */}
        <div className="flex sm:hidden justify-center mt-8">
          <Link
            href="#contact"
            className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors duration-200"
          >
            See all projects
            <span className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-gray-900 transition-all duration-200 group-hover:-rotate-45">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
