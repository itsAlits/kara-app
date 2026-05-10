"use client";

import { useState } from "react";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], style: ["italic"], weight: ["400"] });

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function BlogCard({ blog }) {
  return (
    <Link
      href={`/Blogs/${blog.slug}`}
      className="group relative overflow-hidden rounded-2xl bg-gray-100 block transition-all duration-500 ease-out hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {blog.coverImage ? (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Hover ring */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20 group-hover:ring-white/40 transition-all duration-300" />

        {/* Content overlay */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          {/* Top row */}
          <div className="flex justify-between items-start">
            {blog.category && (
              <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs font-light rounded-full border border-white/20">
                {blog.category}
              </span>
            )}
            {blog.publishedAt && (
              <span className="text-white/70 text-xs font-mono">{formatDate(blog.publishedAt)}</span>
            )}
          </div>

          {/* Bottom content */}
          <div>
            {/* Title — always visible */}
            <h3 className="text-white text-xl font-normal leading-tight">{blog.title}</h3>

            {/* Excerpt — slides in on hover */}
            <p className="text-white/80 leading-relaxed text-xs max-h-0 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 delay-100 mt-0 group-hover:mt-2 line-clamp-2">
              {blog.excerpt}
            </p>

            {/* Meta row */}
            <div className="flex mt-3 items-center justify-between">
              {blog.author && (
                <span className="text-white/60 text-xs">{blog.author}</span>
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

export default function BlogsClient({ blogs = [], categories = ["All"] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? blogs
      : blogs.filter(b => b.category === activeCategory);

  return (
    <section className="py-10 sm:py-16 px-5">
      <div className="max-w-7xl mx-auto">

        {/* Desktop filter pills */}
        <div className="hidden md:flex justify-center mb-16">
          <div className="flex space-x-1 bg-gray-50 border border-gray-100 p-1 rounded-full">
            {categories.map(cat => (
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

        {/* Mobile filter chips */}
        <div className="flex md:hidden overflow-x-auto gap-2 mb-10 pb-1 -mx-5 px-5">
          {categories.map(cat => {
            const count = cat === "All" ? blogs.length : blogs.filter(b => b.category === cat).length;
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

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-4">
            {filtered.map((blog, i) => (
              <BlogCard key={blog.slug || i} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-300 text-sm">
            No posts in this category yet.
          </div>
        )}

        {/* Back link */}
        <div className="mt-16 text-center">
          <Link
            href="/"
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
