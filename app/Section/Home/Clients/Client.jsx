
export default function Clients({ content }) {
  const {
    label = "Trusted by growing brands \u2014 and counting",
    logos = [],
  } = content ?? {};

  const track = [...logos, ...logos, ...logos];

  return (
    <section id="clients" className="w-full bg-white py-10 sm:py-14">
      {/* ── Label ── */}
      <p className="text-center text-xs sm:text-sm text-gray-400 font-normal mb-4 sm:mb-9 tracking-wide">
        {label}
      </p>

      {/* ── Marquee strip ── */}
      <div className="relative w-full border-y border-gray-100 overflow-hidden">
        {/* left fade */}
        <div
          className="pointer-events-none absolute left-0 top-0 h-full w-20 sm:w-32 z-10"
          style={{ background: "linear-gradient(to right, white, transparent)" }}
        />
        {/* right fade */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-20 sm:w-32 z-10"
          style={{ background: "linear-gradient(to left, white, transparent)" }}
        />

        {track.length > 0 ? (
          <div className="flex items-center gap-12 sm:gap-16 py-5 sm:py-6 animate-[marquee_22s_linear_infinite] w-max">
            {track.map((logo, i) => (
              <div
                key={i}
                className="flex items-center justify-center shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-sm text-gray-300">No client logos yet.</div>
        )}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-100% / 3)); }
        }
      `}</style>
    </section>
  );
}
