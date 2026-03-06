'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/metrics-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? 'Error');
      setLoading(false);
    }
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: '#080808',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '360px', padding: '0 1.5rem' }}>

        <p style={{ color: '#555', fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '2rem', textAlign: 'center' }}>
          Métricas
        </p>

        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Contraseña"
            autoFocus
            required
            style={{
              width: '100%',
              background: '#111',
              border: `1px solid ${error ? 'rgba(239,68,68,0.5)' : '#1A1A1A'}`,
              borderRadius: '12px',
              padding: '14px 16px',
              color: '#F2F0E9',
              fontSize: '0.9rem',
              outline: 'none',
              boxSizing: 'border-box',
              fontFamily: 'monospace',
              letterSpacing: '0.1em',
            }}
          />
        </div>

        {error && (
          <p style={{ color: 'rgba(239,68,68,0.8)', fontSize: '0.8rem', fontFamily: 'monospace', marginBottom: '1rem', textAlign: 'center' }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            background: loading ? '#1A1A1A' : '#F5A623',
            color: loading ? '#555' : '#080808',
            border: 'none',
            borderRadius: '12px',
            padding: '14px',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background 0.15s',
            fontFamily: 'monospace',
            letterSpacing: '0.05em',
          }}
        >
          {loading ? '...' : 'Entrar'}
        </button>

      </form>
    </main>
  );
}
