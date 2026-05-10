import { NextResponse } from 'next/server';
import { decrypt } from '@/app/lib/session';

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('kara_session')?.value;
  const session = sessionCookie ? await decrypt(sessionCookie) : null;
  const isAuthenticated = !!session;

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/kara-admin', request.url));
    }
    return NextResponse.next();
  }

  // Redirect logged-in users away from login page
  if (pathname === '/kara-admin' && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/kara-admin'],
};
