import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], style: ["italic"], weight: ["400"] });

export const metadata = {
  title: "Products & Services — Kara Studio",
  description:
    "Explore Kara's software products and creative services — from POS systems to brand identity, web development, and photography.",
};

/* ── Data ──────────────────────────────────────────────────────── */
const products = [
  {
    name: "Kara POS System",
    badge: "Point of Sale",
    tagline: "Modern cashier & sales management for retail and F&B.",
    desc: "A complete point-of-sale system built for speed and simplicity. Manage inventory, track sales in real time, print receipts, and generate daily reports — all in one place.",
    features: ["Real-time inventory sync", "Multi-outlet support", "Sales analytics dashboard", "Receipt printing & digital invoices"],
    gradient: "from-violet-500 to-indigo-600",
    available: true,
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
      </svg>
    ),
  },
  {
    name: "Kara Clinic",
    badge: "Coming Soon",
    tagline: "Complete clinic management system — from queues to billing.",
    desc: "A holistic clinic solution covering patient records, appointment scheduling, treatment history, and integrated billing. Built for modern healthcare providers.",
    features: ["Electronic medical records", "Patient queue system", "Billing & invoicing", "Doctor scheduling"],
    gradient: "from-emerald-500 to-teal-600",
    available: false,
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
];

const services = [
  {
    name: "Brand Identity",
    desc: "We craft visual identities that are distinct, memorable, and built to last — from logomarks to full brand guidelines.",
    detail: "Logo design, color palette, typography system, brand guidelines PDF",
    color: "text-violet-600",
    border: "border-violet-100",
    bg: "bg-violet-50",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245M21 8.25c0 2.485-2.099 4.5-4.688 4.5C14.44 12.75 12 10.735 12 8.25c0-2.486 2.44-4.5 4.313-4.5 2.588 0 4.687 2.015 4.687 4.5z" />
      </svg>
    ),
  },
  {
    name: "Web Development",
    desc: "Fast, scalable, and visually precise — we build websites and web applications that perform as good as they look.",
    detail: "Next.js, React, custom CMS, SEO-ready, responsive across all devices",
    color: "text-blue-600",
    border: "border-blue-100",
    bg: "bg-blue-50",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
  },
  {
    name: "UI/UX Design",
    desc: "User-centered design that reduces friction, drives engagement, and translates into real business results.",
    detail: "Wireframes, interactive prototypes, usability testing, design systems",
    color: "text-pink-600",
    border: "border-pink-100",
    bg: "bg-pink-50",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3" />
      </svg>
    ),
  },
  {
    name: "Photography",
    desc: "Editorial and commercial photography that captures your brand story with intention and aesthetic precision.",
    detail: "Product shots, editorial portraits, corporate events, location sessions",
    color: "text-amber-600",
    border: "border-amber-100",
    bg: "bg-amber-50",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0zM18.75 10.5h.008v.008h-.008V10.5z" />
      </svg>
    ),
  },
  {
    name: "Digital Ads",
    desc: "Performance-driven campaigns across social platforms — targeted, measurable, and optimised for conversions.",
    detail: "Meta Ads, Google Ads, audience targeting, A/B testing, monthly reporting",
    color: "text-green-600",
    border: "border-green-100",
    bg: "bg-green-50",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5" />
      </svg>
    ),
  },
  {
    name: "Social Media Management",
    desc: "Consistent, on-brand content that builds communities, drives engagement, and keeps your audience coming back.",
    detail: "Content calendar, copywriting, graphic design, reels, monthly analytics",
    color: "text-red-600",
    border: "border-red-100",
    bg: "bg-red-50",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25z" />
      </svg>
    ),
  },
];

/* ── Page ──────────────────────────────────────────────────────── */
export default function ProductsServicesPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-500 tracking-widest uppercase mb-6">
            What We Offer
          </span>
          <h1 className="text-4xl md:text-6xl font-light text-gray-900 leading-tight mb-5">
            Products &amp;{" "}
            <em className={`italic font-light ${playfair.className}`}>Services</em>
          </h1>
          <p className="text-base lg:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            From ready-to-deploy software to hands-on creative services — everything
            your business needs to look better, run smarter, and grow faster.
          </p>
        </div>
      </section>

      {/* ── Products ─────────────────────────────────────────── */}
      <section className="px-5 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-gray-400">Our Products</p>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {products.map((p) => (
              <div
                key={p.name}
                className={`relative rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 ${p.available ? "hover:border-gray-200 hover:shadow-lg hover:shadow-gray-100/80" : "opacity-70"}`}
              >
                {/* Gradient bar */}
                <div className={`h-1 w-full bg-gradient-to-r ${p.gradient}`} />

                <div className="p-8">
                  {/* Icon + badge */}
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center text-white shadow-sm`}>
                      {p.icon}
                    </div>
                    <span className="text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-gray-100 text-gray-500">
                      {p.badge}
                    </span>
                  </div>

                  {/* Text */}
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">{p.name}</h2>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">{p.desc}</p>

                  {/* Feature list */}
                  <ul className="space-y-2 mb-7">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${p.gradient} shrink-0`} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {p.available ? (
                    <Link
                      href="#contact"
                      className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 border border-gray-200 rounded-full px-5 py-2.5 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200 group"
                    >
                      Get started
                      <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-sm text-gray-400 border border-gray-100 rounded-full px-5 py-2.5 cursor-not-allowed select-none">
                      Coming soon
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────── */}
      <section className="px-5 pb-32 bg-gray-50/60">
        <div className="max-w-6xl mx-auto pt-20">
          <div className="flex items-center gap-4 mb-3">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-gray-400">Creative Services</p>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-2">
              Everything your brand needs,{" "}
              <em className={`italic font-light ${playfair.className}`}>under one roof.</em>
            </h2>
            <p className="text-sm text-gray-500 max-w-lg">
              Each service is delivered with precision, creativity, and a deep
              understanding of what makes a brand stand out.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s) => (
              <div
                key={s.name}
                className={`group bg-white rounded-2xl border ${s.border} p-6 hover:border-gray-200 hover:shadow-md hover:shadow-gray-100/80 transition-all duration-300 cursor-default`}
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl ${s.bg} ${s.color} flex items-center justify-center mb-5`}>
                  {s.icon}
                </div>

                {/* Name */}
                <h3 className="text-sm font-semibold text-gray-900 mb-2">{s.name}</h3>

                {/* Desc */}
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{s.desc}</p>

                {/* Detail tag */}
                <p className={`text-[11px] ${s.color} font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  {s.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────── */}
      <section className="px-5 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] font-semibold tracking-widest uppercase text-gray-400 mb-5">Let&apos;s Work Together</p>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 leading-snug">
            Not sure what you need?{" "}
            <em className={`italic font-light ${playfair.className}`}>Let&apos;s talk.</em>
          </h2>
          <p className="text-sm text-gray-500 mb-8 max-w-xl mx-auto">
            We work with businesses of all sizes to find the right solution. Drop us a message
            and we&apos;ll get back to you within one business day.
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2.5 bg-gray-900 text-white text-sm font-normal px-7 py-3.5 rounded-full hover:bg-black transition-all duration-200 group"
          >
            Start a conversation
            <span className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center transition-transform duration-200 group-hover:-rotate-45">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
