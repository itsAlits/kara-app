import { NextResponse } from 'next/server';
import { verifyCredentials } from '@/app/lib/auth';
import { createSession } from '@/app/lib/session';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const user = verifyCredentials(username, password);
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    await createSession(user.username);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
