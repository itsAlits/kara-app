import Link from "next/link";
import { getContent } from "@/app/lib/data";
import { Playfair_Display } from "next/font/google";
import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";
import BlogsClient from "./BlogsClient";

const playfair = Playfair_Display({ subsets: ["latin"], style: ["italic"], weight: ["400"] });

export const metadata = {
  title: "Blog — Kara",
  description: "Insights, stories and creative perspectives from the Kara team.",
};

export const dynamic = "force-dynamic";

export default async function BlogsPage() {
  const content = await getContent();
  const blogs = (content.blogs ?? []).filter(b => b.published !== false);
  const categories = ["All", ...new Set(blogs.map(b => b.category).filter(Boolean))];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative py-24 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600 mb-6">
            Our Journal
          </div>
          <h1 className="text-4xl md:text-7xl font-light text-gray-900 mb-6 leading-tight">
            Stories &amp;{" "}
            <em className="italic font-light ml-2" style={{ fontFamily: playfair.style.fontFamily }}>
              Insights
            </em>
          </h1>
          <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Creative perspectives, design thinking, and behind-the-scenes looks from the Kara studio.
          </p>
        </div>
      </section>

      {/* ── Filtered grid ── */}
      <BlogsClient blogs={blogs} categories={categories} />

      <Footer />
    </div>
  );
}
