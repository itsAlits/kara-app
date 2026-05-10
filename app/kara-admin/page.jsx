"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Invalid credentials.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* ── Left panel — branding ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[30%] shrink-0 p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0f172a 0%, #1e1b4b 60%, #0f172a 100%)" }}
      >
        {/* Subtle glow orbs */}
        <div
          className="absolute top-[-10%] left-[-10%] w-[55%] aspect-square rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[-5%] right-[-5%] w-[45%] aspect-square rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)" }}
        />

        {/* Logo */}
        <div className="relative z-10">
          <Image
            src="/Logo.png"
            alt="Kara"
            width={160}
            height={100}
            className="object-contain"

          />
        </div>

        {/* Center quote */}
        <div className="relative z-10 space-y-4">
          <p className="text-3xl WF- font-light text-white leading-snug tracking-tight">
            Manage Your Kara-App Here,<br />
            <span className="text-indigo-300">Here we gooo.</span>
          </p>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
            Your content, projects, and settings — all in one clean workspace.
          </p>
        </div>

        {/* Footer */}
        <p className="relative z-10 text-xs text-white">
          © {new Date().getFullYear()} Kara Creative Agency
        </p>
      </div>

      {/* ── Right panel — form ── */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 py-16">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="lg:hidden mb-10">
            <Image
              src="/Logo.png"
              alt="Kara"
              width={72}
              height={28}
              className="object-contain"
            />
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight mb-1">
              Welcome back
            </h1>
            <p className="text-sm text-gray-500">
              Sign in to your admin dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                autoFocus
                placeholder="your-username"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPwd ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute inset-y-0 right-0 px-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPwd ? "Hide password" : "Show password"}
                >
                  {showPwd ? (
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                <svg className="w-4 h-4 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-3 rounded-xl transition-all duration-200 mt-1"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer note */}
          <p className="text-center text-xs text-gray-400 mt-8">
            Restricted access · Kara Admin
          </p>
        </div>
      </div>
    </div>
  );
}
