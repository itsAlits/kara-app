import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/app/Components/Navbar';

const projects = [
    {
        id: "01",
        title: "Brand Portrait Series",
        category: "Photography",
        desc: "Editorial portraits for a luxury fashion label.",
        image: "https://cdn.dribbble.com/userupload/41953793/file/original-be4d9fb8eff9d793c3d41cf135ff4b1c.jpg?resize=800x600&vertical=center",
        fullDesc: "This project involved creating a series of editorial portraits for a high-end luxury fashion label. The focus was on capturing the essence of elegance and sophistication through carefully composed shots that highlight the brand's aesthetic. We worked closely with the client to understand their vision and delivered a collection of images that perfectly represent their brand identity.",
        client: "Luxury Fashion Co.",
        year: "2024",
        services: ["Photography", "Post-Production", "Art Direction"],
        technologies: ["Canon EOS R5", "Adobe Lightroom", "Photoshop"],
        gallery: [
            "https://cdn.dribbble.com/userupload/41953793/file/original-be4d9fb8eff9d793c3d41cf135ff4b1c.jpg?resize=800x600&vertical=center",
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
        ]
    },
    {
        id: "02",
        title: "SaaS Dashboard",
        category: "Website",
        desc: "Clean analytics platform built with Next.js.",
        image: "https://cdn.dribbble.com/userupload/18414413/file/original-2bb272fa0eabf80981be1e8571957e6c.png?resize=1024x768&vertical=center",
        fullDesc: "A comprehensive analytics dashboard for SaaS companies, built with modern web technologies. The platform provides real-time data visualization, user management, and advanced reporting features. Designed with a focus on usability and performance, it helps businesses make data-driven decisions.",
        client: "TechAnalytics Inc.",
        year: "2024",
        services: ["UI/UX Design", "Frontend Development", "Backend Integration"],
        technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Chart.js"],
        gallery: [
            "https://cdn.dribbble.com/userupload/18414413/file/original-2bb272fa0eabf80981be1e8571957e6c.png?resize=1024x768&vertical=center",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
        ]
    },
    {
        id: "03",
        title: "Lifestyle Campaign",
        category: "Photography",
        desc: "Outdoor shoot for a sportswear brand.",
        image: "https://cdn.dribbble.com/userupload/7466945/file/original-ad413804645c4b0ff8c7b5e3696e3f79.jpg?resize=1024x768&vertical=center",
        fullDesc: "An outdoor lifestyle photography campaign for a leading sportswear brand. The project captured authentic moments of athletes in natural environments, emphasizing the brand's commitment to active living and outdoor adventures. The images were used across various marketing channels.",
        client: "ActiveWear Pro",
        year: "2024",
        services: ["Photography", "Location Scouting", "Model Coordination"],
        technologies: ["Nikon D850", "Drone Photography", "Adobe Creative Suite"],
        gallery: [
            "https://cdn.dribbble.com/userupload/7466945/file/original-ad413804645c4b0ff8c7b5e3696e3f79.jpg?resize=1024x768&vertical=center",
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
            "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800"
        ]
    },
    {
        id: "04",
        title: "E-Commerce Store",
        category: "Website",
        desc: "Full Shopify storefront with custom theme.",
        image: "https://cdn.dribbble.com/userupload/44189133/file/original-cec53795eb9330008a098744063f7be2.png?resize=1024x768&vertical=center",
        fullDesc: "A complete e-commerce solution built on Shopify with a custom theme. The store features a modern design, seamless checkout process, and integrated inventory management. Optimized for conversions and mobile performance, it provides an excellent shopping experience for customers.",
        client: "Fashion Boutique",
        year: "2024",
        services: ["E-commerce Development", "Custom Theme Design", "Payment Integration"],
        technologies: ["Shopify", "Liquid", "JavaScript", "CSS", "Shopify API"],
        gallery: [
            "https://cdn.dribbble.com/userupload/44189133/file/original-cec53795eb9330008a098744063f7be2.png?resize=1024x768&vertical=center",
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800"
        ]
    },
];

export async function generateStaticParams() {
    return projects.map((project) => ({
        id: project.id,
    }));
}

export default async function ProjectDetail({ params }) {
    const { id } = await params;
    const project = projects.find(p => p.id === id);

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-5">
                    <p className="text-xs lg:text-sm font-normal lg:font-medium uppercase tracking-widest mb-4 opacity-90">
                        {project.category}
                    </p>
                    <h1 className="text-3xl md:text-6xl font-light leading-tight mb-2 lg:mb-6">
                        {project.title}
                    </h1>
                    <p className="text-xs md:text-xl opacity-90 max-w-2xl mx-auto">
                        {project.desc}
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 px-5">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <div className="prose prose-lg max-w-none">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Project Overview</h2>
                                <p className="text-gray-700 text-sm leading-relaxed mb-8">
                                    {project.fullDesc}
                                </p>

                                {/* Gallery */}
                                <h3 className="text-xl font-semibold text-gray-900 mb-6">Project Gallery</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    {project.gallery.map((img, index) => (
                                        <div key={index} className="aspect-video relative rounded-lg overflow-hidden">
                                            <Image
                                                src={img}
                                                alt={`${project.title} - Image ${index + 1}`}
                                                fill
                                                className="object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-8 space-y-4">
                                {/* Project Info */}
                                <div className="border border-base-300 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Client</p>
                                            <p className="text-gray-900 text-sm">{project.client}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Year</p>
                                            <p className="text-gray-900 text-sm">{project.year}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Category</p>
                                            <p className="text-gray-900 text-sm">{project.category}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Services */}
                                <div className="border border-base-300 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Services</h3>
                                    <ul className="space-y-2">
                                        {project.services.map((service, index) => (
                                            <li key={index} className="text-gray-700 text-sm flex items-center">
                                                <span className="w-2 h-2 bg-gray-400 rounded-full mr-3 shrink-0"></span>
                                                {service}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Technologies */}
                                <div className="border border-base-300 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Technologies</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, index) => (
                                            <span key={index} className="px-3 py-1 bg-white text-gray-700 text-xs rounded-full border-gray-300 border">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Navigation */}
                                <div className=" rounded-lg p-6">
                                    <Link
                                        href="/#projects"
                                        className="inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                        Back to Projects
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}