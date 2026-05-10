import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { getContent } from "@/app/lib/data";
import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";
import BlogTOC from "./BlogTOC";

export const dynamic = "force-dynamic";

/* ── SEO metadata ────────────────────────────────────────────── */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const content = await getContent();
  const blog = (content.blogs ?? []).find((b) => b.slug === slug);
  if (!blog) return {};

  const headersList = await headers();
  const host = headersList.get("host") ?? "karacreative.id";
  const proto = host.includes("localhost") ? "http" : "https";
  const siteUrl = `${proto}://${host}`;
  const pageUrl = `${siteUrl}/Blogs/${slug}`;
  const ogImage = blog.coverImage || `${siteUrl}/og-default.jpg`;

  return {
    title: blog.metaTitle || `${blog.title} — Kara Blog`,
    description: blog.metaDesc || blog.excerpt || "",
    keywords: blog.tags?.join(", ") || "",
    authors: blog.author ? [{ name: blog.author }] : [],
    alternates: { canonical: pageUrl },
    openGraph: {
      type: "article",
      url: pageUrl,
      title: blog.metaTitle || blog.title,
      description: blog.metaDesc || blog.excerpt || "",
      images: [{ url: ogImage, width: 1200, height: 630, alt: blog.title }],
      publishedTime: blog.publishedAt,
      authors: blog.author ? [blog.author] : [],
      tags: blog.tags ?? [],
      siteName: "Kara",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.metaTitle || blog.title,
      description: blog.metaDesc || blog.excerpt || "",
      images: [ogImage],
    },
  };
}

/* ── Decode common HTML entities ────────────────────────────── */
function decodeEntities(str = "") {
  return str
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .trim();
}

/* ── Slug from plain text ─────────────────────────────────────── */
function toSlug(text = "") {
  return decodeEntities(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/* ── Parse headings from HTML ────────────────────────────────── */
function extractHeadings(html = "") {
  const headings = [];
  const regex = /<(h[23])[^>]*>(.*?)<\/h[23]>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const level = match[1].toLowerCase();
    const rawText = match[2].replace(/<[^>]+>/g, "");
    const text = decodeEntities(rawText);
    const id = toSlug(rawText);
    headings.push({ level, text, id });
  }
  return headings;
}

/* ── Inject id attributes into headings in HTML ──────────────── */
function injectHeadingIds(html = "") {
  return html.replace(/<(h[23])([^>]*)>(.*?)<\/h[23]>/gi, (_, tag, attrs, inner) => {
    const rawText = inner.replace(/<[^>]+>/g, "");
    const id = toSlug(rawText);
    return `<${tag} id="${id}"${attrs}>${inner}</${tag}>`;
  });
}

/* ── Helpers ─────────────────────────────────────────────────── */
function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
function formatDateISO(iso) {
  return iso ? new Date(iso).toISOString() : new Date().toISOString();
}

/* ── Page ────────────────────────────────────────────────────── */
export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const content = await getContent();
  const blogs = content.blogs ?? [];
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog || blog.published === false) notFound();

  const idx = blogs.indexOf(blog);
  const prev = blogs[idx - 1] ?? null;
  const next = blogs[idx + 1] ?? null;

  const headings = extractHeadings(blog.content ?? "");
  const contentWithIds = injectHeadingIds(blog.content ?? "");

  /* JSON-LD */
  const headersList = await headers();
  const host = headersList.get("host") ?? "karacreative.id";
  const proto = host.includes("localhost") ? "http" : "https";
  const siteUrl = `${proto}://${host}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt || "",
    image: blog.coverImage ? [blog.coverImage] : [],
    datePublished: formatDateISO(blog.publishedAt),
    dateModified: formatDateISO(blog.publishedAt),
    author: { "@type": "Person", name: blog.author || "Kara Studio" },
    publisher: {
      "@type": "Organization",
      name: "Kara",
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/Blogs/${slug}` },
    keywords: blog.tags?.join(", ") || "",
    articleSection: blog.category || "",
  };

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ overflowX: 'clip' }}>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      {/* ════════════════════════════════════════════════════════
          HERO — full-bleed cinematic cover
      ════════════════════════════════════════════════════════ */}
      {/* Hero — full-bleed cinematic cover */}
      <div className="relative w-full h-[56vh] min-h-[380px] max-h-[600px] overflow-hidden bg-gray-950">
        {blog.coverImage ? (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="absolute inset-0 w-full h-full object-cover opacity-65"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950" />
        )}

        {/* Gradient overlay — dark at top for readability, white at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/5 to-black/40" />

        {/* Back nav — sits below the navbar (navbar ~64px tall) */}
        <div className="absolute top-20 left-0 right-0 z-10 px-5 sm:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link
              href="/Blogs"
              className="inline-flex items-center gap-2 text-xs font-normal text-white/90 bg-black/20 hover:bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              All Articles
            </Link>

          </div>
        </div>
      </div>

      {/* Content area — clean break below hero */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-10 pb-24">

        {/* Two-column grid: article + sticky sidebar */}
        <div className="flex gap-12 xl:gap-16 items-start">

          {/* ══════ ARTICLE ══════ */}
          <article className="flex-1 min-w-0">

            {/* Title + excerpt */}
            <header className="mb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.15] tracking-tight text-gray-900 mb-4">
                {blog.title}
              </h1>
              {blog.excerpt && (
                <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-normal">
                  {blog.excerpt}
                </p>
              )}
            </header>

            {/* ── Meta strip ── */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-5 border-y border-gray-100 mb-10">
              {blog.author && (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex w-9 h-9 rounded-full bg-gray-900 items-center justify-center text-white text-sm font-bold shrink-0">
                    {blog.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold leading-none mb-0.5">
                      Author
                    </p>
                    <p className="text-sm font-semibold text-gray-800">{blog.author}</p>
                  </div>
                </div>
              )}

              {blog.publishedAt && (
                <div className="pl-6 border-l border-gray-100">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold leading-none mb-0.5">
                    Published
                  </p>
                  <time dateTime={blog.publishedAt} className="text-sm font-semibold text-gray-800">
                    {formatDate(blog.publishedAt)}
                  </time>
                </div>
              )}

              {blog.readTime && (
                <div className="pl-6 border-l border-gray-100">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold leading-none mb-0.5">
                    Read time
                  </p>
                  <p className="text-sm font-semibold text-gray-800">{blog.readTime} min</p>
                </div>
              )}
            </div>

            {/* ── Mobile TOC (inline, before body) ── */}
            {headings.length > 0 && (
              <div className="lg:hidden mb-8 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-3">
                  In this article
                </p>
                <ul className="space-y-1">
                  {headings.map((h) => (
                    <li key={h.id} className={h.level === "h3" ? "ml-4" : ""}>
                      <a
                        href={`#${h.id}`}
                        className={`block text-sm py-1 text-gray-500 hover:text-gray-900 transition-colors leading-snug ${h.level === "h3" ? "text-xs" : ""}`}
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ── Body content ── */}
            <div className="blog-prose min-w-0 w-full">
              {contentWithIds ? (
                <div dangerouslySetInnerHTML={{ __html: contentWithIds }} />
              ) : (
                <p className="text-gray-400 italic">No content yet.</p>
              )}
            </div>

            {/* ── Tags ── */}
            {blog.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-100">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest self-center mr-1">
                  Tags:
                </span>
                {blog.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-medium px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors cursor-default"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}

            {/* ── Prev / Next navigation ── */}
            {(prev || next) && (
              <div className="grid sm:grid-cols-2 gap-4 mt-12 pt-10 border-t border-gray-100">
                {prev ? (
                  <Link
                    href={`/Blogs/${prev.slug}`}
                    className="group flex flex-col gap-2 p-5 rounded-2xl border border-gray-100 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
                  >
                    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </span>
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 line-clamp-2 leading-snug transition-colors">
                      {prev.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}

                {next ? (
                  <Link
                    href={`/Blogs/${next.slug}`}
                    className="group flex flex-col gap-2 p-5 rounded-2xl border border-gray-100 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 text-right"
                  >
                    <span className="flex items-center justify-end gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Next
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 line-clamp-2 leading-snug transition-colors">
                      {next.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            )}
          </article>

          {/* Sticky TOC sidebar — desktop only */}
          {headings.length > 0 && (
            <aside className="hidden lg:block w-60 xl:w-72 shrink-0 self-start sticky top-24">
              <div className="max-h-[calc(100vh-7rem)] overflow-y-auto pt-2 pb-4 pr-1">
                <BlogTOC headings={headings} />
              </div>
            </aside>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
