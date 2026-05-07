import Image from "next/image";

const logos = [
    { src: "/Group 9 1.png", alt: "Client logo 1", width: 120, height: 40 },
    { src: "/Group 10 1.png", alt: "Client logo 2", width: 120, height: 40 },
    { src: "/image 4.png", alt: "Client logo 3", width: 120, height: 40 },
    { src: "/logo2 1.png", alt: "Client logo 4", width: 120, height: 40 },
];

/* Duplicate the array so the marquee loops seamlessly */
const track = [...logos, ...logos, ...logos];

export default function Clients() {
    return (
        <section id="clients" className="w-full bg-white py-10 sm:py-14">

            {/* ── Label ── */}
            <p className="text-center text-xs sm:text-sm text-gray-400 font-normal mb-4 sm:mb-9 tracking-wide">
                Trusted by <span className="font-medium text-gray-500">growing brands</span> — and counting
            </p>

            {/* ── Marquee strip ── */}
            <div className="relative w-full border-y border-gray-100 overflow-hidden">

                {/* left fade */}
                <div className="pointer-events-none absolute left-0 top-0 h-full w-20 sm:w-32 z-10"
                    style={{ background: "linear-gradient(to right, white, transparent)" }} />

                {/* right fade */}
                <div className="pointer-events-none absolute right-0 top-0 h-full w-20 sm:w-32 z-10"
                    style={{ background: "linear-gradient(to left, white, transparent)" }} />

                {/* scrolling track */}
                <div className="flex items-center gap-12 sm:gap-16 py-5 sm:py-6 animate-[marquee_22s_linear_infinite] w-max">
                    {track.map((logo, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-center shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                        >
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                width={logo.width}
                                height={logo.height}
                                className="h-8 sm:h-10 w-auto object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* ── keyframe ── */}
            <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-100% / 3)); }
        }
      `}</style>
        </section>
    );
}
