"use client";

import Link from "next/link";
import { useState, useRef } from "react";

/* ─────────────────────────────────────────────
   Nav links
───────────────────────────────────────────── */
const navLinks = [
    { label: "Home", href: "/" },
    { label: "About us", href: "#about" },
    { label: "Work", href: "/Project" },
    { label: "Product & Service", href: "/services", hasMega: true },
    { label: "Blogs", href: "/Blogs" },
];

/* ─────────────────────────────────────────────
   Produk Kara — featured software products
───────────────────────────────────────────── */
const karaProducts = [
    {
        name: "Kara POS System",
        desc: "Sistem kasir & manajemen penjualan modern untuk bisnis retail dan F&B.",
        badge: "Point of Sale",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
            </svg>
        ),
        gradient: "from-violet-500 to-indigo-600",
        href: "/services",
    },
    {
        name: "Kara Clinic",
        desc: "Sistem manajemen klinik lengkap — rekam medis, antrian & billing pasien.",
        badge: "Coming Soon",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        ),
        gradient: "from-emerald-500 to-teal-600",
        href: "/services",
        disabled: true,
    },
];

/* ─────────────────────────────────────────────
   Layanan Kara — creative & digital services
───────────────────────────────────────────── */
const karaServices = [
    {
        name: "Brand Identity",
        desc: "Logo, color palette & visual language.",
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245M21 8.25c0 2.485-2.099 4.5-4.688 4.5C14.44 12.75 12 10.735 12 8.25c0-2.486 2.44-4.5 4.313-4.5 2.588 0 4.687 2.015 4.687 4.5z" />
            </svg>
        ),
        color: "text-violet-600",
        bg: "bg-violet-50",
        href: "/services",
    },
    {
        name: "Web Development",
        desc: "Fast, modern websites & web apps.",
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
            </svg>
        ),
        color: "text-blue-600",
        bg: "bg-blue-50",
        href: "/services",
    },
    {
        name: "UI/UX Design",
        desc: "Intuitive interfaces & user research.",
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3" />
            </svg>
        ),
        color: "text-pink-600",
        bg: "bg-pink-50",
        href: "/services",
    },
    {
        name: "Photography",
        desc: "Editorial & commercial photography.",
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0zM18.75 10.5h.008v.008h-.008V10.5z" />
            </svg>
        ),
        color: "text-amber-600",
        bg: "bg-amber-50",
        href: "/services",
    },
    {
        name: "Digital Ads",
        desc: "Social media & performance campaigns.",
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5" />
            </svg>
        ),
        color: "text-green-600",
        bg: "bg-green-50",
        href: "/services",
    },
    {
        name: "Social Media Management",
        desc: "Reels, ads & corporate videos.",
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25z" />
            </svg>
        ),
        color: "text-red-600",
        bg: "bg-red-50",
        href: "/services",
    },
];

/* ─────────────────────────────────────────────
   Mega Menu Panel — two-section layout
───────────────────────────────────────────── */
function MegaMenu({ visible, onMouseEnter, onMouseLeave }) {
    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`fixed top-[59px] left-0 right-0 w-full bg-white border-b border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden transition-all duration-300 origin-top z-40 ${visible
                ? "opacity-100 scale-y-100 pointer-events-auto"
                : "opacity-0 scale-y-95 pointer-events-none"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6">
                {/* ── TOP: Produk Kara ── */}
                <div className="p-6 pb-5">
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-4">
                        Produk
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                        {karaProducts.map((product) => (
                            product.disabled ? (
                                <div
                                    key={product.name}
                                    className="group flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed opacity-70"
                                    aria-disabled="true"
                                >
                                    {/* Gradient icon box */}
                                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center text-white shadow-sm`}>
                                        {product.icon}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="text-sm font-semibold text-gray-900 leading-snug">
                                                {product.name}
                                            </p>
                                            <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500 shrink-0">
                                                {product.badge}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 leading-snug">
                                            {product.desc}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    key={product.name}
                                    href={product.href}
                                    className="group flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 border border-gray-100 hover:border-gray-200 transition-all duration-200"
                                >
                                    {/* Gradient icon box */}
                                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center text-white shadow-sm`}>
                                        {product.icon}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="text-sm font-semibold text-gray-900 group-hover:text-black leading-snug">
                                                {product.name}
                                            </p>
                                            <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500 shrink-0">
                                                {product.badge}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 leading-snug">
                                            {product.desc}
                                        </p>
                                        <span className="inline-flex items-center gap-1 mt-2 text-[11px] font-medium text-gray-400 group-hover:text-gray-700 transition-colors duration-150">
                                            Pelajari lebih lanjut
                                            <svg className="w-2.5 h-2.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </div>
                                </Link>
                            )
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-100 mx-6" />

                {/* ── BOTTOM: Layanan ── */}
                <div className="p-6 pt-5">
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-4">
                        Layanan
                    </p>

                    {/* 3-column service grid */}
                    <div className="grid grid-cols-3 gap-1">
                        {karaServices.map((service) => (
                            <Link
                                key={service.name}
                                href={service.href}
                                className="group flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-gray-50 transition-colors duration-150"
                            >
                                <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${service.bg} ${service.color} mt-0.5`}>
                                    {service.icon}
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-900 group-hover:text-black leading-snug">
                                        {service.name}
                                    </p>
                                    <p className="text-[11px] text-gray-500 leading-snug mt-0.5">
                                        {service.desc}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Footer CTA */}
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-[11px] text-gray-400">Butuh sesuatu yang custom?</p>
                        <Link
                            href="#contact"
                            className="inline-flex items-center gap-1 text-xs font-medium text-gray-900 hover:text-black group"
                        >
                            Hubungi kami
                            <svg className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Main Navbar
───────────────────────────────────────────── */
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [megaOpen, setMegaOpen] = useState(false);
    const leaveTimer = useRef(null);

    const handleMouseEnter = () => {
        clearTimeout(leaveTimer.current);
        setMegaOpen(true);
    };

    const handleMouseLeave = () => {
        leaveTimer.current = setTimeout(() => setMegaOpen(false), 150);
    };

    return (
        <>
            <nav className="w-full fixed top-0 bg-white border-b border-gray-100 px-6 py-3 z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center group shrink-0">
                        <img
                            src="/Logo.png"
                            alt="Kara Logo"
                            className="h-9 w-auto object-contain"
                        />
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center px-2 py-1.5">
                        {navLinks.map((link) =>
                            link.hasMega ? (
                                /* ── Product trigger ── */
                                <div
                                    key={link.label}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <button
                                        className={`inline-flex items-center gap-1 px-4 py-1.5 text-xs rounded-lg font-normal transition-all duration-200 cursor-pointer ${megaOpen
                                            ? "bg-gray-100 text-black"
                                            : "text-gray-600 hover:bg-gray-100 hover:text-black"
                                            }`}
                                    >
                                        {link.label}
                                        <svg
                                            className={`w-3 h-3 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2.5}
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </button>
                                </div>
                            ) : (
                                /* ── Regular link ── */
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="px-4 py-1.5 text-xs hover:bg-gray-100 hover:rounded-lg text-gray-600 font-normal transition-all duration-200 hover:text-black"
                                >
                                    {link.label}
                                </Link>
                            )
                        )}
                    </div>

                    {/* Desktop CTA */}
                    <Link
                        href="#contact"
                        className="hidden md:flex font-normal items-center gap-2 bg-black text-white text-xs px-4 py-2 rounded-full transition-all duration-200 hover:bg-gray-800 group shrink-0"
                    >
                        Let&apos;s Collaborate
                        <span className="w-5 h-5 bg-white text-black rounded-full flex items-center justify-center transition-transform duration-200 group-hover:-rotate-45">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </span>
                    </Link>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden flex flex-col justify-center gap-[4px] w-7 h-7 p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                    >
                        <span className={`block h-0.5 bg-black rounded-full transition-all duration-300 origin-center ${isOpen ? "rotate-45 translate-y-[6px] w-5" : "w-5"}`} />
                        <span className={`block h-0.5 bg-black rounded-full transition-all duration-300 ${isOpen ? "opacity-0 w-0" : "w-5"}`} />
                        <span className={`block h-0.5 bg-black rounded-full transition-all duration-300 origin-center ${isOpen ? "-rotate-45 -translate-y-[6px] w-5" : "w-3"}`} />
                    </button>

                </div>
            </nav>

            {/* Desktop Mega Menu Overlay */}
            <MegaMenu
                visible={megaOpen}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />

            {/* Mobile Backdrop */}
            <div
                className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={() => setIsOpen(false)}
            />

            {/* Mobile Slide-down Menu */}
            <div
                className={`fixed top-[57px] left-0 right-0 z-40 md:hidden bg-white border-b border-gray-100 shadow-lg transition-all duration-300 ease-in-out ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-0.5">

                    {/* Mobile Nav Links */}
                    {navLinks.map((link, i) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center px-4 py-3 text-sm text-gray-600 font-normal rounded-xl hover:bg-gray-50 hover:text-black transition-all duration-200"
                            style={{ transitionDelay: isOpen ? `${i * 30}ms` : "0ms" }}
                        >
                            <span className="font-normal">{link.label}</span>
                        </Link>
                    ))}

                    {/* Divider */}
                    <div className="h-px bg-gray-100 my-2" />

                    {/* Mobile CTA */}
                    <Link
                        href="#contact"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center gap-2 bg-black text-white text-sm font-normal px-5 py-3 rounded-full transition-all duration-200 hover:bg-gray-800 group mx-2"
                    >
                        Let&apos;s Collaborate
                        <span className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center transition-transform duration-200 group-hover:-rotate-45">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </span>
                    </Link>

                    <div className="pb-2" />
                </div>
            </div>
        </>
    );
}
