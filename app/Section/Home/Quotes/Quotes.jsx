import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
});

export default function Quotes({ content }) {
  const quote = typeof content === "string" ? content : "We are a digital agency that helps brands connect with their audience. Craft digital experiences that are human.";

  return (
    <section id="quotes" className="py-24 px-5 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-5xl md:text-5xl font-normal text-slate-900 leading-tight">
          {quote}
        </h2>
      </div>
    </section>
  );
}
