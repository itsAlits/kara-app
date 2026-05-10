"use client";

import { useEffect, useState } from "react";

export default function BlogTOC({ headings }) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    headings.forEach((h) => {
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

  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: document.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }

  return (
    <div className="text-sm">
      {/* Header */}
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-4 px-3">
        On this page
      </p>

      {/* TOC list */}
      <nav aria-label="Table of contents">
        <ul className="space-y-0.5">
          {headings.map((h) => {
            const isActive = activeId === h.id;
            const isH3 = h.level === "h3";
            return (
              <li key={h.id}>
                <button
                  onClick={() => scrollTo(h.id)}
                  className={`
                    w-full text-left leading-snug py-1.5 rounded-lg transition-all duration-200 cursor-pointer
                    flex items-start gap-2.5
                    ${isH3 ? "pl-6 pr-3 text-xs" : "px-3 text-sm"}
                    ${
                      isActive
                        ? "text-gray-900 font-semibold bg-gray-100"
                        : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"
                    }
                  `}
                >
                  {/* Active dot */}
                  <span
                    className={`mt-[5px] shrink-0 w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                      isActive ? "bg-gray-900 scale-110" : "bg-transparent"
                    }`}
                  />
                  <span className="leading-[1.4]">{h.text}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Divider */}
      <div className="my-6 border-t border-gray-100" />

      {/* Share */}
      <div className="px-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-3">
          Share
        </p>
        <button
          onClick={handleShare}
          className={`w-full flex items-center justify-center gap-2 text-xs font-medium px-4 py-2.5 rounded-xl border transition-all duration-200 ${
            copied
              ? "bg-gray-900 text-white border-gray-900"
              : "text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-900"
          }`}
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              Copy link
            </>
          )}
        </button>
      </div>
    </div>
  );
}
