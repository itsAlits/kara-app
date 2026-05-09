"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

/* ─── Nav config ─────────────────────────────────────────────── */
const navGroups = [
  {
    label: "General",
    items: [
      {
        label: "Overview",
        href: "/dashboard",
        exact: true,
        icon: (
          <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        ),
      },
    ],
  },
  {
    label: "Content",
    items: [
      {
        label: "Hero",
        href: "/dashboard/hero",
        icon: (
          <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.168c.969 0 1.371 1.24.588 1.81l-3.374 2.452a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118L12 15.347l-3.352 2.7c-.785.57-1.84-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L4.657 9.393c-.783-.57-.38-1.81.588-1.81h4.168a1 1 0 00.95-.69L11.049 2.927z" />
          </svg>
        ),
      },
      {
        label: "Clients",
        href: "/dashboard/clients",
        icon: (
          <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        ),
      },
      {
        label: "Projects",
        href: "/dashboard/projects",
        icon: (
          <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        ),
      },
      {
        label: "Blogs",
        href: "/dashboard/blogs",
        icon: (
          <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        ),
      },
      {
        label: "Quote",
        href: "/dashboard/quotes",
        icon: (
          <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        ),
      },
      {
        label: "About",
        href: "/dashboard/about",
        icon: (
          <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      },
      {
        label: "Testimonials",
        href: "/dashboard/testimonials",
        icon: (
          <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
          </svg>
        ),
      },
      {
        label: "Footer",
        href: "/dashboard/footer",
        icon: (
          <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        ),
      },
    ],
  },
  {
    label: "Support",
    items: [
      {
        label: "View Live Site",
        href: "/",
        external: true,
        icon: (
          <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        ),
      },
    ],
  },
];

/* ─── Sidebar ─────────────────────────────────────────────────── */
function Sidebar({ collapsed, onToggle, onClose, mobile }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  function isActive(item) {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  }

  return (
    <aside
      className="flex flex-col h-full bg-[#0d0f14] border-r border-white/[0.06] overflow-hidden transition-all duration-300 ease-in-out"
      style={{ width: collapsed ? "64px" : "240px" }}
    >
      {/* Logo row */}
      <div className="flex items-center h-14 border-b border-white/[0.06] shrink-0 px-3 gap-2">
        {/* Logo icon — always visible, centered in collapsed mode */}
        <div
          className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0 transition-all duration-300"
          style={{ margin: collapsed ? "0 auto" : "0" }}
        >
          <span className="text-white text-xs font-bold">K</span>
        </div>

        {/* Brand name — hidden when collapsed */}
        <span
          className="text-white font-semibold text-sm tracking-tight whitespace-nowrap flex-1 min-w-0 overflow-hidden transition-all duration-300"
          style={{ opacity: collapsed ? 0 : 1, maxWidth: collapsed ? "0px" : "200px" }}
        >
          Kara Admin
        </span>

        {/* Collapse toggle — hidden when collapsed (topbar handles that) */}
        {!mobile && !collapsed && (
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg text-slate-600 hover:text-white hover:bg-white/5 transition-all duration-200 shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Mobile close */}
        {mobile && (
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-600 hover:text-white hover:bg-white/5 transition shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-1">
            {!collapsed && (
              <p className="px-4 pt-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                {group.label}
              </p>
            )}
            {collapsed && <div className="mx-3 my-2 h-px bg-white/[0.06]" />}
            {group.items.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  onClick={mobile ? onClose : undefined}
                  title={collapsed ? item.label : undefined}
                  className={`flex items-center gap-3 mx-2 px-2.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 group relative ${
                    active
                      ? "bg-indigo-600/15 text-indigo-400"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  <span className={`shrink-0 transition-colors ${active ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"}`}>
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <span className="overflow-hidden whitespace-nowrap transition-all duration-200">
                      {item.label}
                    </span>
                  )}
                  {active && !collapsed && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                  )}
                  {/* Tooltip for collapsed mode */}
                  {collapsed && (
                    <span className="absolute left-full ml-3 px-2 py-1 rounded-md bg-slate-800 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 shadow-lg z-50">
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User / Logout */}
      <div className="border-t border-white/[0.06] p-3 shrink-0">
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          title={collapsed ? "Log out" : undefined}
          className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm font-medium text-slate-500 hover:text-red-400 hover:bg-red-500/[0.07] transition-all duration-150 group"
        >
          <svg className="w-[18px] h-[18px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {!collapsed && <span className="whitespace-nowrap">{loggingOut ? "Logging out…" : "Log Out"}</span>}
        </button>
      </div>
    </aside>
  );
}

/* ─── Top bar ─────────────────────────────────────────────────── */
function Topbar({ onMenuClick, collapsed, onToggle }) {
  const pathname = usePathname();

  const pageLabel = (() => {
    if (pathname === "/dashboard") return "Overview";
    const seg = pathname.split("/").at(-1);
    return seg ? seg.charAt(0).toUpperCase() + seg.slice(1) : "Dashboard";
  })();

  return (
    <header className="h-14 bg-[#0d0f14] border-b border-white/[0.06] flex items-center px-5 gap-4 shrink-0">
      {/* Mobile hamburger */}
      <button onClick={onMenuClick} className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Desktop: toggle collapse */}
      {collapsed && (
        <button onClick={onToggle} className="hidden lg:flex p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm min-w-0">
        <span className="text-slate-600 hidden sm:inline">Kara Admin</span>
        <span className="text-slate-700 hidden sm:inline">/</span>
        <span className="text-white font-medium truncate">{pageLabel}</span>
      </div>

      <div className="flex-1" />

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Live site badge */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 border border-white/[0.06] transition-all duration-150"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live Site
        </Link>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
          <span className="text-indigo-400 text-xs font-semibold">A</span>
        </div>
      </div>
    </header>
  );
}

/* ─── Main layout ─────────────────────────────────────────────── */
export default function DashboardLayoutClient({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <div className="flex h-screen bg-[#0d0f14] overflow-hidden" style={{ fontFamily: "var(--font-poppins, system-ui, sans-serif)" }}>

      {/* ── Desktop Sidebar ── */}
      <div className="hidden lg:flex shrink-0">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
      </div>

      {/* ── Mobile Sidebar Overlay ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 flex lg:hidden"
          style={{ animation: "fadeIn 0.15s ease" }}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 flex" style={{ animation: "slideInLeft 0.2s ease" }}>
            <Sidebar collapsed={false} onClose={() => setMobileOpen(false)} mobile />
          </div>
        </div>
      )}

      {/* ── Main column ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar
          onMenuClick={() => setMobileOpen(true)}
          collapsed={collapsed}
          onToggle={() => setCollapsed((v) => !v)}
        />

        {/* Page content */}
        <main
          key={pathname}
          className="flex-1 overflow-y-auto bg-[#10121a]"
          style={{ animation: "pageFadeIn 0.22s ease" }}
        >
          {children}
        </main>
      </div>

      {/* ── Global animations ── */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }
        @keyframes pageFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
