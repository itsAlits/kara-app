import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
});

export default function Quotes() {
    return (
        <section id="quotes" className="py-24 px-5 bg-white">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl sm:text-5xl md:text-5xl font-normal text-slate-900 leading-tight">
                    We are a digital agency that helps <span className="italic" style={{ fontFamily: playfair.style.fontFamily }}>brands</span> connect with their audience. Craft digital experiences that are human.
                </h2>
            </div>
        </section>
    );
}
