import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Derive a session token from the password so we never store the password itself in the cookie
function sessionToken(password: string): string {
  return crypto.createHmac('sha256', password).update('metrics_session_v1').digest('hex');
}

export async function POST(req: NextRequest) {
  const expected = process.env.METRICS_PASSWORD;
  if (!expected) {
    return NextResponse.json({ error: 'Not configured' }, { status: 500 });
  }

  const { password } = await req.json().catch(() => ({ password: '' }));

  // Hash both to equal length, then timing-safe compare
  const inputHash = crypto.createHash('sha256').update(password ?? '').digest();
  const expectedHash = crypto.createHash('sha256').update(expected).digest();
  const valid = crypto.timingSafeEqual(inputHash, expectedHash);

  if (!valid) {
    return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
  }

  const token = sessionToken(expected);
  const res = NextResponse.json({ ok: true });

  res.cookies.set('metrics_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/metrics',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return res;
}
