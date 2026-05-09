import { NextResponse } from 'next/server';
import { getSession } from '@/app/lib/session';
import { getContent, updateContent } from '@/app/lib/data';

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function POST(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { section, data } = await request.json();
    if (!section || data === undefined) {
      return NextResponse.json({ error: 'Missing section or data' }, { status: 400 });
    }
    const updated = await updateContent(section, data);
    return NextResponse.json({ ok: true, _meta: updated._meta });
  } catch (err) {
    console.error('Content update error:', err);
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}
