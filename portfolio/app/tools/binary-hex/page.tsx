'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

type Base = 'bin' | 'dec' | 'hex' | 'oct';

interface Conversion {
  base: Base;
  label: string;
  prefix: string;
  radix: number;
  pattern: RegExp;
  color: string;
}

const CONVERSIONS: Conversion[] = [
  { base: 'bin', label: 'Binario', prefix: '0b', radix: 2, pattern: /^[01]*$/, color: '#00D4FF' },
  { base: 'dec', label: 'Decimal', prefix: '', radix: 10, pattern: /^[0-9]*$/, color: '#F5A623' },
  { base: 'hex', label: 'Hexadecimal', prefix: '0x', radix: 16, pattern: /^[0-9a-fA-F]*$/, color: '#A78BFA' },
  { base: 'oct', label: 'Octal', prefix: '0o', radix: 8, pattern: /^[0-7]*$/, color: '#34D399' },
];

function toBase(decValue: number, radix: number): string {
  if (!Number.isFinite(decValue) || decValue < 0) return '';
  return decValue.toString(radix).toUpperCase();
}

function parseToDec(value: string, radix: number): number | null {
  if (!value) return null;
  const n = parseInt(value, radix);
  return isNaN(n) ? null : n;
}

export default function BinaryHexPage() {
  const [activeBase, setActiveBase] = useState<Base>('dec');
  const [inputValue, setInputValue] = useState('');
  const [decValue, setDecValue] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const activeConv = CONVERSIONS.find((c) => c.base === activeBase)!;

  const handleInput = useCallback((value: string, conv: Conversion) => {
    setInputValue(value);
    setError('');

    if (!value) {
      setDecValue(null);
      return;
    }

    if (!conv.pattern.test(value)) {
      setError(`Valor inválido para base ${conv.radix}`);
      setDecValue(null);
      return;
    }

    const dec = parseToDec(value, conv.radix);
    if (dec === null) {
      setError('No se pudo convertir');
      setDecValue(null);
    } else {
      setDecValue(dec);
    }
  }, []);

  const switchBase = (conv: Conversion) => {
    if (decValue !== null) {
      const newVal = toBase(decValue, conv.radix);
      setInputValue(newVal);
    } else {
      setInputValue('');
    }
    setActiveBase(conv.base);
    setError('');
  };

  const copyValue = (text: string, base: Base) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(base);
      setTimeout(() => setCopied(null), 1500);
    });
  };

  return (
    <main style={{ background: '#080808', minHeight: '100vh', color: '#F2F0E9' }}>
      {/* Header */}
      <div className="border-b px-8 py-5 flex items-center justify-between" style={{ borderColor: '#1A1A1A' }}>
        <Link
          href="/tools"
          className="text-sm font-mono tracking-[0.2em] uppercase transition-colors duration-200"
          style={{ color: '#555555' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#00D4FF'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#555555'; }}
        >
          ← Herramientas
        </Link>
        <span className="text-xs font-mono tracking-[0.3em] uppercase" style={{ color: '#00D4FF' }}>
          Conversor de Bases
        </span>
      </div>

      <div className="max-w-2xl mx-auto px-8 py-16">
        <p className="text-xs font-mono tracking-[0.4em] uppercase mb-3" style={{ color: '#00D4FF' }}>
          Herramienta
        </p>
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#F2F0E9' }}>
          Conversor de Bases
        </h1>
        <p className="text-sm mb-10" style={{ color: '#555555' }}>
          Binario · Decimal · Hexadecimal · Octal — conversión instantánea.
        </p>

        {/* Base selector */}
        <div className="grid grid-cols-4 gap-2 mb-8">
          {CONVERSIONS.map((conv) => (
            <button
              key={conv.base}
              onClick={() => switchBase(conv)}
              className="py-3 px-2 rounded-sm border font-mono text-xs tracking-widest uppercase transition-all duration-200"
              style={{
                borderColor: activeBase === conv.base ? conv.color : '#1A1A1A',
                color: activeBase === conv.base ? conv.color : '#555555',
                background: activeBase === conv.base ? `${conv.color}11` : 'transparent',
              }}
            >
              {conv.label}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="mb-2">
          <label className="text-xs font-mono tracking-widest uppercase block mb-3" style={{ color: activeConv.color }}>
            Ingresá en {activeConv.label}
            {activeConv.prefix && (
              <span style={{ color: '#555555' }}> ({activeConv.prefix}...)</span>
            )}
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleInput(e.target.value, activeConv)}
            placeholder={activeBase === 'bin' ? '1010' : activeBase === 'hex' ? 'FF' : activeBase === 'oct' ? '17' : '42'}
            className="w-full px-4 py-4 rounded-sm border font-mono text-2xl outline-none transition-all duration-200"
            style={{
              background: '#111111',
              borderColor: error ? '#EF4444' : activeConv.color,
              color: '#F2F0E9',
              boxShadow: error ? '0 0 10px rgba(239,68,68,0.15)' : `0 0 10px ${activeConv.color}22`,
            }}
            spellCheck={false}
            autoComplete="off"
          />
          {error && (
            <p className="text-xs font-mono mt-2" style={{ color: '#EF4444' }}>{error}</p>
          )}
        </div>

        {/* Results */}
        {decValue !== null && (
          <div className="mt-8 space-y-3">
            <p className="text-xs font-mono tracking-widest uppercase mb-5" style={{ color: '#555555' }}>
              Resultado
            </p>
            {CONVERSIONS.filter((c) => c.base !== activeBase).map((conv) => {
              const result = toBase(decValue, conv.radix);
              const displayVal = conv.prefix + result;
              return (
                <div
                  key={conv.base}
                  className="flex items-center justify-between p-4 rounded-sm border group transition-all duration-200"
                  style={{ borderColor: '#1A1A1A', background: '#111111' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = conv.color; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#1A1A1A'; }}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span
                      className="text-xs font-mono tracking-widest uppercase shrink-0 w-8"
                      style={{ color: conv.color }}
                    >
                      {conv.base.toUpperCase()}
                    </span>
                    <span
                      className="font-mono text-lg truncate"
                      style={{ color: '#F2F0E9' }}
                    >
                      {displayVal}
                    </span>
                  </div>
                  <button
                    onClick={() => copyValue(result, conv.base)}
                    className="text-xs font-mono tracking-widest uppercase shrink-0 ml-4 px-3 py-1 rounded-sm border transition-all duration-200"
                    style={{
                      borderColor: copied === conv.base ? conv.color : '#1A1A1A',
                      color: copied === conv.base ? conv.color : '#555555',
                      background: copied === conv.base ? `${conv.color}11` : 'transparent',
                    }}
                  >
                    {copied === conv.base ? '✓ Copiado' : 'Copiar'}
                  </button>
                </div>
              );
            })}

            {/* Decimal value always visible */}
            {activeBase !== 'dec' && (
              <p className="text-xs font-mono pt-2" style={{ color: '#555555' }}>
                Valor decimal: {decValue}
              </p>
            )}
          </div>
        )}

        {/* Quick reference */}
        <details className="mt-12">
          <summary
            className="text-xs font-mono tracking-widest uppercase cursor-pointer transition-colors duration-200"
            style={{ color: '#555555' }}
          >
            Referencia rápida ↓
          </summary>
          <div className="mt-4 p-4 rounded-sm border" style={{ borderColor: '#1A1A1A', background: '#111111' }}>
            <table className="w-full text-xs font-mono" style={{ color: '#555555' }}>
              <thead>
                <tr className="border-b" style={{ borderColor: '#1A1A1A' }}>
                  <th className="text-left py-2" style={{ color: '#F2F0E9' }}>Dec</th>
                  <th className="text-left py-2" style={{ color: '#00D4FF' }}>Bin</th>
                  <th className="text-left py-2" style={{ color: '#A78BFA' }}>Hex</th>
                  <th className="text-left py-2" style={{ color: '#34D399' }}>Oct</th>
                </tr>
              </thead>
              <tbody>
                {[0,1,2,4,8,10,15,16,32,64,128,255].map((n) => (
                  <tr key={n} className="border-b" style={{ borderColor: '#1A1A1A' }}>
                    <td className="py-1">{n}</td>
                    <td className="py-1">{n.toString(2)}</td>
                    <td className="py-1">{n.toString(16).toUpperCase()}</td>
                    <td className="py-1">{n.toString(8)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </div>

      <footer className="border-t px-8 py-8 text-center" style={{ borderColor: '#1A1A1A' }}>
        <p className="text-xs font-mono" style={{ color: '#1A1A1A' }}>
          juanlarraya.com.ar/tools/binary-hex
        </p>
      </footer>
    </main>
  );
}
