"use client";

import { useState } from "react";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400"],
});

function ProjectCard({ project }) {
  return (
    <Link
      href={`/Project/${project.id}`}
      className="group relative overflow-hidden rounded-2xl bg-gray-100 block transition-all duration-500 ease-out hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Hover ring */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20 group-hover:ring-white/40 transition-all duration-300" />

        {/* Content Overlay */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          {/* Top */}
          <div className="flex justify-between items-start">
            <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs font-light rounded-full border border-white/20">
              {project.category}
            </span>
            {project.year && (
              <span className="text-white/70 text-xs font-mono">{project.year}</span>
            )}
          </div>

          {/* Bottom */}
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="text-white text-xl font-normal leading-tight">{project.title}</h3>
            <p className="text-white/80 leading-relaxed text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mt-1">
              {project.desc}
            </p>
            <div className="flex mt-3 items-center justify-between">
              {project.client && (
                <span className="text-white/60 text-xs">{project.client}</span>
              )}
              <div className="ml-auto w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center transform translate-x-2 group-hover:translate-x-0 transition-transform duration-300">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ProjectsClient({ projects = [], categories = ["All"] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="py-10 sm:py-16 px-5">
      <div className="max-w-7xl mx-auto">
        {/* ── Desktop filter ── */}
        <div className="hidden md:flex justify-center mb-16">
          <div className="flex space-x-1 bg-gray-50 border border-gray-100 p-1 rounded-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 cursor-pointer rounded-full text-sm font-normal transition-colors duration-300 ease-out ${
                  activeCategory === cat
                    ? "bg-white text-gray-900 ring-1 ring-gray-200 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/70"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Mobile filter (scrollable chips) ── */}
        <div className="flex md:hidden overflow-x-auto gap-2 mb-10 pb-1 -mx-5 px-5">
          {categories.map((cat) => {
            const count = cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  isActive
                    ? "bg-gray-900 text-white border-gray-900 shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}
              >
                {cat}
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-mono leading-none ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Grid ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-4">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-300 text-sm">
            No projects in this category yet.
          </div>
        )}

        {/* Back to home */}
        <div className="mt-16 text-center">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
