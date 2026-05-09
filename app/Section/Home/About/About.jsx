import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
});

export default function About({ content = {} }) {
  const {
    eyebrow = "About Kara",
    heading = "A creative agency built to make your brand look premium, clear, and unforgettable.",
    body = "Kara blends photography, digital experiences, advertising, and social media management into cohesive brand work that feels modern, intentional, and easy to scale.",
    focusTitle = "Our focus",
    focusText = "We help brands stand out with striking visual storytelling, performance-led websites, and campaigns designed to grow awareness and engagement.",
    approachTitle = "Our approach",
    approachText = "Every project begins with strategy, then moves into refined design and execution so your brand experience is consistent across every channel.",
  } = content;

  return (
    <section id="about" className="py-20 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          <div className="space-y-6">
            <div className="text-xs uppercase tracking-[0.24em] text-gray-400 font-medium mb-3">
              {eyebrow}
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-normal text-slate-900 leading-tight max-w-3xl">
                A creative agency built to make your{" "}
                <span className="italic" style={{ fontFamily: playfair.style.fontFamily }}>
                  brand
                </span>{" "}
                look premium, clear, and unforgettable.
              </h2>
              <p className="mt-4 text-base sm:text-sm text-gray-600 max-w-2xl">{body}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 mt-16">
              <div className="rounded-3xl bg-white">
                <div className="text-xs uppercase tracking-[0.24em] text-gray-400 font-semibold mb-3">
                  {focusTitle}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{focusText}</p>
              </div>
              <div className="rounded-3xl bg-white">
                <div className="text-xs uppercase tracking-[0.24em] text-gray-400 font-semibold mb-3">
                  {approachTitle}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{approachText}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              src="/Oke.svg"
              alt="Rushing creative work"
              className="w-72 lg:w-117.5"
              width={470}
              height={400}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
