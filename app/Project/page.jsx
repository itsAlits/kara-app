"use client";


import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import Navbar from "../Components/Navbar";

const playfair = Playfair_Display({
    subsets: ["latin"],
    style: ["italic"],
    weight: ["400"],
});

const projects = [
    {
        id: "01",
        title: "Brand Portrait Series",
        category: "Photography",
        desc: "Editorial portraits for a luxury fashion label.",
        image: "https://cdn.dribbble.com/userupload/41953793/file/original-be4d9fb8eff9d793c3d41cf135ff4b1c.jpg?resize=800x600&vertical=center",
        year: "2024",
        client: "Luxury Fashion Co."
    },
    {
        id: "02",
        title: "SaaS Dashboard",
        category: "Website",
        desc: "Clean analytics platform built with Next.js.",
        image: "https://cdn.dribbble.com/userupload/18414413/file/original-2bb272fa0eabf80981be1e8571957e6c.png?resize=1024x768&vertical=center",
        year: "2024",
        client: "TechAnalytics Inc."
    },
    {
        id: "03",
        title: "Lifestyle Campaign",
        category: "Photography",
        desc: "Outdoor shoot for a sportswear brand.",
        image: "https://cdn.dribbble.com/userupload/7466945/file/original-ad413804645c4b0ff8c7b5e3696e3f79.jpg?resize=1024x768&vertical=center",
        year: "2024",
        client: "ActiveWear Pro"
    },
    {
        id: "04",
        title: "E-Commerce Store",
        category: "Ads",
        desc: "Full Shopify storefront with custom theme.",
        image: "https://cdn.dribbble.com/userupload/44189133/file/original-cec53795eb9330008a098744063f7be2.png?resize=1024x768&vertical=center",
        year: "2024",
        client: "Fashion Boutique"
    },
];

const categories = ["All", "Photography", "Website", "Ads"];

function ProjectCard({ project, index }) {
    return (
        <Link
            href={`/Project/${project.id}`}
            className="group relative overflow-hidden rounded-2xl bg-gray-100 block transition-all duration-500 ease-out hover:-translate-y-1"
        >
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    {/* Top: Category & Year */}
                    <div className="flex justify-between items-start">
                        <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs font-light rounded-full border border-white/20">
                            {project.category}
                        </span>
                        <span className="text-white/70 text-xs font-mono">
                            {project.year}
                        </span>
                    </div>

                    {/* Bottom: Title & Description */}
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-white text-xl font-normal lg:font-semibold leading-tight">
                            {project.title}
                        </h3>
                        <p className="text-white/80 leading-relaxed text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            {project.desc}
                        </p>
                        <div className="flex mb-3 items-center justify-between">
                            <span className="text-white/60 text-xs">
                                {project.client}
                            </span>
                            <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center transform translate-x-2 group-hover:translate-x-0 transition-transform duration-300">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20 group-hover:ring-white/40 transition-all duration-300" />
            </div>
        </Link>
    );
}

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects = activeCategory === "All"
        ? projects
        : projects.filter(project => project.category === activeCategory);

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            {/* Hero Section */}
            <section className="relative py-24 px-5">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-normal-case lg:font-medium text-gray-600 mb-6">
                        Our Portfolio
                    </div>
                    <h1 className="text-4xl md:text-7xl font-light text-gray-900 mb-6 leading-tight">
                        Creative
                        <em className="italic font-light ml-4" style={{ fontFamily: playfair.style.fontFamily }}>
                            Work
                        </em>
                    </h1>
                    <p className=" text-base lg:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                        Discover our collection of thoughtfully crafted projects that blend creativity,
                        technology, and strategic thinking to deliver exceptional results.
                    </p>
                </div>
            </section>

            {/* Filter Section */}
            <section className="py-16 px-5">
                <div className="max-w-7xl mx-auto">

                    {/* Mobile Filter: Horizontally scrollable chips */}
                    <div className="flex md:hidden overflow-x-auto gap-2 mb-10 pb-1 -mx-5 px-5 scrollbar-hide">
                        {categories.map((category) => {
                            const count = category === "All"
                                ? projects.length
                                : projects.filter(p => p.category === category).length;
                            const isActive = activeCategory === category;
                            return (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`flex-shrink-0 cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${isActive
                                        ? "bg-gray-900 text-white border-gray-900 shadow-md"
                                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900"
                                        }`}
                                >
                                    {category}
                                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-mono leading-none ${isActive
                                        ? "bg-white/20 text-white"
                                        : "bg-gray-100 text-gray-500"
                                        }`}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Desktop Filter: Pill group (original style) */}
                    <div className="hidden md:flex justify-center mb-16">
                        <div className="flex space-x-1 bg-gray-50 border border-gray-100 p-1 rounded-full">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-6 py-2 cursor-pointer rounded-full text-sm font-normal transition-colors duration-300 ease-out ${activeCategory === category
                                        ? "bg-white text-gray-900 ring-1 ring-gray-200"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-white/70"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4">
                        {filteredProjects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                            />
                        ))}
                    </div>


                </div>
            </section>
        </div>
    );
}