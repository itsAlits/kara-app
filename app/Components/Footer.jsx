import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className=" text-slate-900">
            <div className="max-w-7xl mx-auto px-5 py-20">
                <div className="rounded-2xl border border-slate-200 bg-white p-10 md:p-14">
                    <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                        <div className="max-w-3xl">
                            <p className="text-xs uppercase tracking-[0.24em] text-gray-400 font-medium mb-3">
                                Kara Agency
                            </p>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-slate-900 leading-tight lg:leading-14">
                                Innovative solutions for bold brands.
                            </h2>
                            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-500">
                                Looking to elevate your brand? We craft immersive experiences that captivate, engage, and make your business unforgettable in every interaction.
                            </p>
                            <Link
                                href="#contact"
                                className="hidden md:flex w-fit mt-4 font-normal items-center gap-2 bg-black text-white text-xs px-4 py-3 rounded-full transition-all duration-200 hover:bg-gray-800 group shrink-0"
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

                        </div>
                        <Image src="/mail.svg" alt="Mail" width={400} height={400} />
                    </div>
                </div>

                <div className="mt-40 border-t lg:border-t-0 border-gray-200 pt-10 lg:pt-0 grid gap-10 lg:grid-cols-5 text-sm text-slate-600">
                    <div className="lg:col-span-2">
                        <Image src="/Logo.png" alt="Kara Logo" width={150} height={30} className="mb-6" />
                        <p className="max-w-sm mt-4 leading-relaxed">
                            Empowering brands with minimalist, intentional digital experiences that feel premium and timeless.
                        </p>
                    </div>

                    <div>
                        <div className="font-semibold text-slate-900 mb-3">Sitemap</div>
                        <ul className="space-y-2.5">
                            <li>
                                <Link href="#about" className="transition hover:text-slate-900">About</Link>
                            </li>
                            <li>
                                <Link href="#work" className="transition hover:text-slate-900">Work</Link>
                            </li>
                            <li>
                                <Link href="#services" className="transition hover:text-slate-900">Services</Link>
                            </li>
                            <li>
                                <Link href="#pricing" className="transition hover:text-slate-900">Pricing</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <div className="font-semibold text-slate-900 mb-3">Other Pages</div>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#contact" className="transition hover:text-slate-900">Contact Us</Link>
                            </li>
                            <li>
                                <Link href="/404" className="transition hover:text-slate-900">Error 404</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <div className="font-semibold text-slate-900 mb-3">Contact Details</div>
                        <p className="leading-relaxed">
                            Blahbatuh, Gianyar, Bali
                        </p>
                        <p className="mt-4 leading-relaxed">
                            karatech.official@gmail.com
                            <br />
                            0823-4246-3664
                        </p>
                    </div>
                </div>

                <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
                    <span>©2026 Kara. All Rights Reserved</span>
                    <span className="flex flex-wrap items-center gap-4">
                        <Link href="#" className="transition hover:text-slate-900">Style Guide</Link>
                        <Link href="#" className="transition hover:text-slate-900">Licenses</Link>
                    </span>
                </div>
            </div>
        </footer>
    );
}
