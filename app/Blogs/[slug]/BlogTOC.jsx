"use client";

import { useEffect, useState } from "react";

export default function BlogTOC({ headings }) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      entries => {
        // Pick the topmost visible heading
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    headings.forEach(h => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  }

  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-4">
        Table of Contents
      </p>
      <nav>
        <ul className="space-y-1">
          {headings.map(h => {
            const isActive = activeId === h.id;
            const isH3 = h.level === "h3";
            return (
              <li key={h.id} className={isH3 ? "ml-3" : ""}>
                <button
                  onClick={() => scrollTo(h.id)}
                  className={`
                    w-full text-left text-sm leading-snug py-1.5 px-3 rounded-lg transition-all duration-200 cursor-pointer
                    ${isActive
                      ? "text-gray-900 font-semibold bg-gray-100"
                      : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"}
                    ${isH3 ? "text-xs" : ""}
                  `}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <span className="inline-block w-1 h-1 rounded-full bg-gray-900 mr-2 mb-0.5" />
                  )}
                  {h.text}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Share section */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-3">Share</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: document.title, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
            className="flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-gray-900 px-3 py-2 rounded-lg border border-gray-200 hover:border-gray-400 transition"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Copy link
          </button>
        </div>
      </div>
    </div>
  );
}
