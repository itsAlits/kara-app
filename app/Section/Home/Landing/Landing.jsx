"use client";

import { Playfair_Display } from "next/font/google";
import Link from "next/link";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400"],
});

/* ---------- tiny avatar data ---------- */
const avatars = [
  { id: 1, bg: "#c084fc", letter: "A" },
  { id: 2, bg: "#60a5fa", letter: "M" },
  { id: 3, bg: "#34d399", letter: "J" },
  { id: 4, bg: "#fb923c", letter: "S" },
];

/* ---------- star SVG ---------- */
function Star({ filled }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`w-4 h-4 ${filled ? "fill-amber-400" : "fill-gray-200"}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.168c.969 0 1.371 1.24.588 1.81l-3.374 2.452a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.352 2.7c-.785.57-1.84-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.657 9.393c-.783-.57-.38-1.81.588-1.81h4.168a1 1 0 00.95-.69L9.049 2.927z" />
    </svg>
  );
}

export default function Landing() {
  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-57px)] mt-20 flex items-center justify-center bg-white overflow-hidden"
    >

      {/* ── Floating pill badge ── */}
      <div className="absolute top-6 sm:top-10 left-1/2 -translate-x-1/2 whitespace-nowrap flex items-center gap-1.5 sm:gap-2 bg-white border border-gray-100 shadow-sm rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-[12px] sm:text-xs font-medium text-gray-600 animate-[fadeSlideDown_0.7s_ease_both] z-10">
        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
        Now available for new projects
        <span className="text-gray-300">·</span>
        <span className="text-indigo-500 font-semibold">2026</span>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 mt-8 lg:mt-0 flex flex-col items-center text-center px-5 sm:px-8 max-w-6xl mx-auto pt-16 pb-24 sm:pt-20 sm:pb-20 w-full">

        {/* headline */}
        <h1 className="text-[2.2rem] leading-[1.15] sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-gray-900 mb-5 sm:mb-6 animate-[fadeSlideUp_0.8s_ease_both]">
          Turn visitors into customers{" "}
          <span className="hidden sm:inline"><br /></span>
          with{" "}
          <em
            className="italic font-light"
            style={{ fontFamily: playfair.style.fontFamily }}
          >
            thoughtful design
          </em>
        </h1>

        {/* sub-headline */}
        <p className="max-w-xs sm:max-w-xl text-sm sm:text-base lg:text-lg text-gray-500 leading-relaxed mb-8 sm:mb-10 animate-[fadeSlideUp_0.9s_ease_both]">
          We partner with ambitious brands to build stunning products — from
          bold identity systems to pixel-perfect interfaces.
        </p>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto animate-[fadeSlideUp_1s_ease_both]">

          {/* primary button */}
          <Link
            href="#contact"
            id="hero-cta-primary"
            className="group relative flex items-center justify-center gap-3 bg-gray-900 text-white text-sm font-medium px-6 lg:py-3.5 py-2.5 rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gray-900/20 hover:-translate-y-0.5 w-full sm:w-auto"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
              style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)" }}
            />
            Get Started
            <span className="w-7 h-7 bg-white text-gray-900 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:-rotate-45 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </Link>

          {/* secondary button */}
          <Link
            href="#work"
            id="hero-cta-secondary"
            className="flex items-center justify-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 group w-full sm:w-auto"
          >
            <span className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-gray-900 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            View our work
          </Link>
        </div>

        {/* social proof */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-3 sm:gap-6 animate-[fadeSlideUp_1.1s_ease_both]">

          {/* avatar stack */}
          <div className="flex -space-x-2.5">
            {avatars.map((av) => (
              <div
                key={av.id}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-semibold shadow-sm"
                style={{ background: av.bg }}
              >
                {av.letter}
              </div>
            ))}
          </div>

          {/* divider — desktop only */}
          <div className="hidden sm:block w-px h-8 bg-gray-200" />

          {/* stars + label */}
          <div className="flex flex-col items-center sm:items-start gap-0.5">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4].map((i) => <Star key={i} filled />)}
              <Star filled={false} />
            </div>
            <p className="text-xs text-gray-500 mt-3 lg:mt-1">
              Trusted by <span className="font-semibold text-gray-800">200+</span> happy clients
            </p>
          </div>
        </div>
      </div>


      {/* ── keyframes ── */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
