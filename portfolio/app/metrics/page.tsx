import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import LoginForm from './LoginForm';

interface Visit {
  id: string;
  created_at: string;
  browser: string | null;
  os: string | null;
  device_type: string | null;
  language: string | null;
  screen_width: number | null;
  screen_height: number | null;
  referrer: string | null;
  country: string | null;
  page_path: string | null;
}

function countBy<T>(arr: T[], key: keyof T): Record<string, number> {
  return arr.reduce((acc, item) => {
    const val = String(item[key] ?? 'Unknown');
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

function topN(counts: Record<string, number>, n = 5) {
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n);
}

function sessionToken(password: string): string {
  return crypto.createHmac('sha256', password).update('metrics_session_v1').digest('hex');
}

export default async function MetricsPage() {
  const password = process.env.METRICS_PASSWORD;
  const cookieStore = await cookies();
  const session = cookieStore.get('metrics_session');

  const authenticated =
    password &&
    session?.value &&
    crypto.timingSafeEqual(
      Buffer.from(session.value),
      Buffer.from(sessionToken(password))
    );

  if (!authenticated) {
    return <LoginForm />;
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: visits } = await supabase
    .from('visits')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(500);

  const all: Visit[] = visits || [];
  const total = all.length;
  const recent = all.slice(0, 20);

  const byCountry = topN(countBy(all, 'country'));
  const byBrowser = topN(countBy(all, 'browser'));
  const byDevice = topN(countBy(all, 'device_type'));
  const byLang = topN(countBy(all, 'language'));

  const card = { background: '#111', border: '1px solid #1A1A1A', borderRadius: '12px', padding: '1.5rem' };
  const label = { color: '#555', fontSize: '0.75rem', fontFamily: 'monospace', marginBottom: '0.75rem', textTransform: 'uppercase' as const, letterSpacing: '0.1em' };
  const value = { color: '#F2F0E9', fontSize: '2.5rem', fontWeight: 700, fontFamily: 'monospace' };

  return (
    <main style={{ minHeight: '100vh', background: '#080808', color: '#F2F0E9', padding: '3rem 2rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Métricas</h1>
        <p style={{ color: '#555', fontFamily: 'monospace', fontSize: '0.8rem', marginBottom: '3rem' }}>
          Últimas {total} visitas registradas
        </p>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div style={card}>
            <p style={label}>Total visitas</p>
            <p style={value}>{total}</p>
          </div>
          <div style={card}>
            <p style={label}>Países</p>
            <p style={value}>{Object.keys(countBy(all, 'country')).length}</p>
          </div>
          <div style={card}>
            <p style={label}>Mobile</p>
            <p style={value}>{all.filter(v => v.device_type === 'mobile').length}</p>
          </div>
          <div style={card}>
            <p style={label}>Desktop</p>
            <p style={value}>{all.filter(v => v.device_type === 'desktop').length}</p>
          </div>
        </div>

        {/* Breakdown grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { title: 'Por País', data: byCountry },
            { title: 'Por Browser', data: byBrowser },
            { title: 'Por Dispositivo', data: byDevice },
            { title: 'Por Idioma', data: byLang },
          ].map(({ title, data }) => (
            <div key={title} style={card}>
              <p style={label}>{title}</p>
              {data.map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ color: '#aaa', fontSize: '0.875rem' }}>{k}</span>
                  <span style={{ color: '#F5A623', fontWeight: 600, fontFamily: 'monospace' }}>{v}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Recent visits table */}
        <div style={card}>
          <p style={label}>Últimas 20 visitas</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', fontFamily: 'monospace' }}>
              <thead>
                <tr style={{ color: '#555', textAlign: 'left' }}>
                  {['Fecha', 'País', 'Browser', 'OS', 'Dispositivo', 'Idioma', 'Pantalla', 'Ruta'].map(h => (
                    <th key={h} style={{ padding: '0.4rem 0.75rem', whiteSpace: 'nowrap', fontWeight: 400 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent.map((v) => (
                  <tr key={v.id} style={{ borderTop: '1px solid #1A1A1A' }}>
                    <td style={{ padding: '0.5rem 0.75rem', color: '#666', whiteSpace: 'nowrap' }}>
                      {new Date(v.created_at).toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' })}
                    </td>
                    <td style={{ padding: '0.5rem 0.75rem', color: '#F2F0E9' }}>{v.country ?? '—'}</td>
                    <td style={{ padding: '0.5rem 0.75rem', color: '#F2F0E9' }}>{v.browser ?? '—'}</td>
                    <td style={{ padding: '0.5rem 0.75rem', color: '#aaa' }}>{v.os ?? '—'}</td>
                    <td style={{ padding: '0.5rem 0.75rem', color: '#aaa' }}>{v.device_type ?? '—'}</td>
                    <td style={{ padding: '0.5rem 0.75rem', color: '#aaa' }}>{v.language ?? '—'}</td>
                    <td style={{ padding: '0.5rem 0.75rem', color: '#aaa', whiteSpace: 'nowrap' }}>
                      {v.screen_width && v.screen_height ? `${v.screen_width}×${v.screen_height}` : '—'}
                    </td>
                    <td style={{ padding: '0.5rem 0.75rem', color: '#F5A623' }}>{v.page_path ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}
