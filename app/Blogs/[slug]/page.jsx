import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { getContent } from "@/app/lib/data";
import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";
import BlogTOC from "./BlogTOC";

export const dynamic = "force-dynamic";

/* ── SEO metadata ───────────────────────────────────────────── */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const content = await getContent();
  const blog = (content.blogs ?? []).find(b => b.slug === slug);
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

/* ── Parse headings from HTML ───────────────────────────────── */
function extractHeadings(html = "") {
  const headings = [];
  const regex = /<(h[23])[^>]*>(.*?)<\/h[23]>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const level = match[1].toLowerCase();
    const rawText = match[2].replace(/<[^>]+>/g, "").trim();
    const id = rawText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    headings.push({ level, text: rawText, id });
  }
  return headings;
}

/* ── Inject id attributes into headings in HTML ─────────────── */
function injectHeadingIds(html = "") {
  return html.replace(/<(h[23])([^>]*)>(.*?)<\/h[23]>/gi, (_, tag, attrs, inner) => {
    const rawText = inner.replace(/<[^>]+>/g, "").trim();
    const id = rawText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return `<${tag} id="${id}"${attrs}>${inner}</${tag}>`;
  });
}

/* ── Formatting helpers ─────────────────────────────────────── */
function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
function formatDateISO(iso) {
  return iso ? new Date(iso).toISOString() : new Date().toISOString();
}

/* ── Page ───────────────────────────────────────────────────── */
export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const content = await getContent();
  const blogs = content.blogs ?? [];
  const blog = blogs.find(b => b.slug === slug);

  if (!blog || blog.published === false) notFound();

  const idx = blogs.indexOf(blog);
  const prev = blogs[idx - 1] ?? null;
  const next = blogs[idx + 1] ?? null;

  const headings = extractHeadings(blog.content ?? "");
  const contentWithIds = injectHeadingIds(blog.content ?? "");

  /* JSON-LD structured data */
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
    <div className="min-h-screen bg-white text-gray-900">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      {/* ── Cover Hero ── */}
      <div className="relative w-full h-[55vh] min-h-[360px] overflow-hidden bg-gray-100">
        {blog.coverImage ? (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />

        {/* Back + category */}
        <div className="absolute top-0 left-0 right-0 px-6 pt-24 pb-4 max-w-6xl mx-auto flex items-end justify-between">
          <Link
            href="/Blogs"
            className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/80 hover:bg-white transition"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Blog
          </Link>
          {blog.category && (
            <span className="bg-white/80 backdrop-blur-sm border border-gray-200/80 text-xs font-semibold text-gray-700 px-4 py-2 rounded-full">
              {blog.category}
            </span>
          )}
        </div>
      </div>

      {/* ── Main content area ── */}
      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-10 pb-24">
        <div className="flex gap-12 items-start">

          {/* ── Article ── */}
          <article className="flex-1 min-w-0">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-4">
              {blog.title}
            </h1>
            {blog.excerpt && (
              <p className="text-lg text-gray-500 leading-relaxed mb-8">{blog.excerpt}</p>
            )}

            {/* Meta row */}
            <div className="flex items-center gap-6 py-5 border-y border-gray-100 mb-10 flex-wrap">
              {blog.author && (
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {blog.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Author</p>
                    <p className="text-sm font-semibold text-gray-800">{blog.author}</p>
                  </div>
                </div>
              )}
              {blog.publishedAt && (
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Published</p>
                  <time dateTime={blog.publishedAt} className="text-sm font-semibold text-gray-800">
                    {formatDate(blog.publishedAt)}
                  </time>
                </div>
              )}
              {blog.readTime && (
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Read time</p>
                  <p className="text-sm font-semibold text-gray-800">{blog.readTime} min</p>
                </div>
              )}
            </div>

            {/* Body */}
            {contentWithIds ? (
              <div
                className="blog-prose"
                dangerouslySetInnerHTML={{ __html: contentWithIds }}
              />
            ) : (
              <p className="text-gray-400 italic">No content yet.</p>
            )}

            {/* Tags */}
            {blog.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-100">
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-widest self-center mr-1">Tags:</span>
                {blog.tags.map(t => (
                  <span key={t} className="text-xs font-medium px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition cursor-default">
                    #{t}
                  </span>
                ))}
              </div>
            )}

            {/* Prev / Next */}
            {(prev || next) && (
              <div className="grid sm:grid-cols-2 gap-4 mt-12 pt-10 border-t border-gray-100">
                {prev ? (
                  <Link href={`/Blogs/${prev.slug}`} className="group flex flex-col gap-1 p-5 rounded-2xl border border-gray-100 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                      Previous
                    </span>
                    <span className="text-sm font-semibold text-gray-800 group-hover:text-black line-clamp-2">{prev.title}</span>
                  </Link>
                ) : <div />}
                {next ? (
                  <Link href={`/Blogs/${next.slug}`} className="group flex flex-col gap-1 p-5 rounded-2xl border border-gray-100 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 text-right">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 flex items-center justify-end gap-1">
                      Next
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </span>
                    <span className="text-sm font-semibold text-gray-800 group-hover:text-black line-clamp-2">{next.title}</span>
                  </Link>
                ) : <div />}
              </div>
            )}
          </article>

          {/* ── Sticky TOC sidebar ── */}
          {headings.length > 0 && (
            <aside className="hidden lg:block w-64 xl:w-72 shrink-0">
              <div className="sticky top-24">
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
