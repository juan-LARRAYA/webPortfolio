import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function parseUserAgent(ua: string) {
  let browser = 'Unknown';
  let os = 'Unknown';
  let device_type = 'desktop';

  // Browser
  if (ua.includes('Edg/')) browser = 'Edge';
  else if (ua.includes('OPR/') || ua.includes('Opera')) browser = 'Opera';
  else if (ua.includes('Chrome/')) browser = 'Chrome';
  else if (ua.includes('Firefox/')) browser = 'Firefox';
  else if (ua.includes('Safari/') && !ua.includes('Chrome')) browser = 'Safari';

  // OS — Android must be checked before Linux (Android UA strings contain "Linux")
  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac OS X')) os = 'macOS';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

  // Device type
  if (ua.includes('Mobile') || ua.includes('Android') || ua.includes('iPhone')) {
    device_type = 'mobile';
  } else if (ua.includes('iPad') || ua.includes('Tablet')) {
    device_type = 'tablet';
  }

  return { browser, os, device_type };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const ua = req.headers.get('user-agent') || body.user_agent || '';
    const parsed = parseUserAgent(ua);

    // Override OS with client-provided platform when UA is ambiguous (e.g. Android UA contains "Linux")
    let os = parsed.os;
    const clientPlatform: string = (body.client_platform || '').toLowerCase();
    if (clientPlatform === 'android') os = 'Android';
    else if (clientPlatform === 'linux') os = 'Linux';
    else if (clientPlatform === 'macintel' || clientPlatform === 'macos') os = 'macOS';
    else if (clientPlatform === 'win32' || clientPlatform === 'windows') os = 'Windows';
    else if (clientPlatform === 'iphone' || clientPlatform === 'ipad') os = 'iOS';

    const { browser, device_type } = parsed;

    // Vercel provides these headers automatically in production
    const country = req.headers.get('x-vercel-ip-country') || null;

    const { error } = await supabase.from('visits').insert({
      browser,
      os,
      device_type,
      language: body.language || null,
      screen_width: body.screen_width || null,
      screen_height: body.screen_height || null,
      referrer: body.referrer || null,
      country,
      page_path: body.page_path || '/',
    });

    if (error) {
      // Log details server-side for debugging (check terminal/Vercel logs)
      console.error('[track] Supabase error:', error.message, '| code:', error.code);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[track] Unexpected error:', e);
    return NextResponse.json({ ok: true }); // always 200 to client
  }
}
