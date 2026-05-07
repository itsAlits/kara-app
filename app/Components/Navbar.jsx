"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "About us", href: "#about" },
    { label: "Work", href: "/Project" },
    { label: "Product", href: "#" },
    { label: "Team", href: "#" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

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
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="px-4 py-1.5 text-xs hover:bg-gray-100 hover:rounded-lg text-gray-600 font-normal transition-all duration-200 hover:text-black"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <Link
                        href="#contact"
                        className="hidden md:flex font-normal items-center gap-2 bg-black text-white text-xs px-4 py-2 rounded-full transition-all duration-200 hover:bg-gray-800 group shrink-0"
                    >
                        Let&apos;s Collaborate
                        <span className="w-5 h-5 bg-white text-black rounded-full flex items-center justify-center transition-transform duration-200 group-hover:-rotate-45">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3 h-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                            >
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
                        <span
                            className={`block h-0.5 bg-black rounded-full transition-all duration-300 origin-center ${isOpen ? "rotate-45 translate-y-[6px] w-5" : "w-5"
                                }`}
                        />
                        <span
                            className={`block h-0.5 bg-black rounded-full transition-all duration-300 ${isOpen ? "opacity-0 w-0" : "w-5"
                                }`}
                        />
                        <span
                            className={`block h-0.5 bg-black rounded-full transition-all duration-300 origin-center ${isOpen ? "-rotate-45 -translate-y-[6px] w-5" : "w-3"
                                }`}
                        />
                    </button>

                </div>
            </nav>

            {/* Mobile Backdrop */}
            <div
                className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsOpen(false)}
            />

            {/* Mobile Slide-down Menu */}
            <div
                className={`fixed top-[57px] left-0 right-0 z-40 md:hidden bg-white border-b border-gray-100 shadow-lg transition-all duration-300 ease-in-out ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
                    }`}
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
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3 h-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                            >
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
