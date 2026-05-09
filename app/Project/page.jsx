import { getContent } from "@/app/lib/data";
import { Playfair_Display } from "next/font/google";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ProjectsClient from "./ProjectsClient";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400"],
});

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const content = await getContent();
  const projects = content.projects ?? [];

  // Collect only categories that actually have projects
  const usedCategories = ["All", ...new Set(projects.map((p) => p.category))];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative py-24 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600 mb-6">
            Our Portfolio
          </div>
          <h1 className="text-4xl md:text-7xl font-light text-gray-900 mb-6 leading-tight">
            Creative{" "}
            <em className="italic font-light ml-2" style={{ fontFamily: playfair.style.fontFamily }}>
              Work
            </em>
          </h1>
          <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover our collection of thoughtfully crafted projects that blend creativity,
            technology, and strategic thinking to deliver exceptional results.
          </p>
        </div>
      </section>

      {/* ── Projects grid (client-side filter) ── */}
      <ProjectsClient projects={projects} categories={usedCategories} />

      <Footer />
    </div>
  );
}