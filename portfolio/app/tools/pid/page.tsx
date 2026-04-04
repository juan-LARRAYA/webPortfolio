'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

type Mode = 'rockwell' | 'siemens';

const PLANT_TAU = 3.0;
const PLANT_GAIN = 1.0;
const DT = 0.05;
const HISTORY_S = 20;
const HISTORY_N = Math.round(HISTORY_S / DT);

const C = {
  bg: 'var(--bg-dark)', bg2: 'var(--bg-medium)', border: 'var(--border-color)',
  text: 'var(--text-primary)', muted: 'var(--accent-muted)',
  amber: 'var(--accent-amber)', cyan: 'var(--accent-cyan)', green: 'var(--accent-green)', purple: 'var(--accent-purple)',
};

interface Params {
  kp: number; ki: number; kd: number;
  kpS: number; ti: number; td: number;
  sp: number;
}

interface HistoryPoint { t: number; sp: number; pv: number; out: number; }

interface SimState {
  t: number; pv: number; integral: number; prevError: number;
  history: HistoryPoint[];
}

function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }

function pidStep(mode: Mode, params: Params, sim: SimState, dt = DT): number {
  const error = params.sp - sim.pv;
  const newIntegral = sim.integral + error * dt;
  const derivative = dt > 0 ? (error - sim.prevError) / dt : 0;
  sim.prevError = error;

  let out: number;
  if (mode === 'rockwell') {
    out = params.kp * error + params.ki * newIntegral + params.kd * derivative;
  } else {
    const intTerm = params.ti > 0 ? newIntegral / params.ti : 0;
    out = params.kpS * (error + intTerm + params.td * derivative);
  }

  const clamped = clamp(out, 0, 100);
  if (clamped === out || (out > 100 && error < 0) || (out < 0 && error > 0)) {
    sim.integral = newIntegral;
  }
  return clamped;
}

function plantStep(pv: number, out: number, dt = DT): number {
  return pv + (PLANT_GAIN * out - pv) / PLANT_TAU * dt;
}

function Chart({ history }: { history: HistoryPoint[] }) {
  if (history.length < 2) return (
    <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ color: C.text, fontFamily: 'monospace', fontSize: 12 }}>Iniciando simulación...</span>
    </div>
  );

  const W = 600, H = 200;
  const PAD = { top: 10, right: 10, bottom: 24, left: 38 };
  const cw = W - PAD.left - PAD.right;
  const ch = H - PAD.top - PAD.bottom;
  const tEnd = history[history.length - 1].t;
  const tStart = tEnd - HISTORY_S;
  const xS = (t: number) => PAD.left + ((t - tStart) / HISTORY_S) * cw;
  const yS = (v: number) => PAD.top + ch - (clamp(v, 0, 110) / 110) * ch;

  const toPath = (pts: { t: number; v: number }[]) =>
    pts.filter(p => p.t >= tStart)
      .map((p, i) => `${i === 0 ? 'M' : 'L'}${xS(p.t).toFixed(1)},${yS(p.v).toFixed(1)}`)
      .join(' ');

  const spPath  = toPath(history.map(p => ({ t: p.t, v: p.sp })));
  const pvPath  = toPath(history.map(p => ({ t: p.t, v: p.pv })));
  const outPath = toPath(history.map(p => ({ t: p.t, v: p.out })));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
      {[0, 25, 50, 75, 100].map(v => (
        <g key={v}>
          <line x1={PAD.left} y1={yS(v)} x2={PAD.left + cw} y2={yS(v)} stroke="var(--border-color)" strokeWidth="1" />
          <text x={PAD.left - 5} y={yS(v) + 4} textAnchor="end" fill="var(--text-subtle)" fontSize="9" fontFamily="monospace">{v}</text>
        </g>
      ))}
      {[0, 5, 10, 15, 20].map(offset => (
        <text key={offset} x={xS(Math.max(tStart, tEnd - HISTORY_S + offset))} y={H - 5}
          textAnchor="middle" fill="var(--text-subtle)" fontSize="9" fontFamily="monospace">
          {(tEnd - HISTORY_S + offset).toFixed(0)}s
        </text>
      ))}
      <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={PAD.top + ch} stroke="var(--border-color-subtle)" strokeWidth="1" />
      <line x1={PAD.left} y1={PAD.top + ch} x2={PAD.left + cw} y2={PAD.top + ch} stroke="var(--border-color-subtle)" strokeWidth="1" />
      {outPath && <path d={outPath} fill="none" stroke={C.amber} strokeWidth="1.5" opacity="0.7" />}
      {spPath  && <path d={spPath}  fill="none" stroke={C.cyan}  strokeWidth="1.5" strokeDasharray="6,4" />}
      {pvPath  && <path d={pvPath}  fill="none" stroke={C.green} strokeWidth="2" />}
      {/* Current time — top right */}
      <text x={PAD.left + cw} y={PAD.top + 10} textAnchor="end"
        fill="var(--accent-muted)" fontSize="10" fontFamily="monospace">
        t = {tEnd.toFixed(1)}s
      </text>
    </svg>
  );
}

function Slider({
  label, value, min, max, step, color, onChange,
}: {
  label: string; value: number; min: number; max: number; step: number;
  color: string;
  onChange: (v: number) => void;
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ color, fontFamily: 'monospace', fontSize: 14, fontWeight: 700 }}>{label}</span>
        <input
          type="number"
          value={value}
          onChange={e => onChange(parseFloat(e.target.value) || 0)}
          style={{
            width: 72, textAlign: 'right', padding: '4px 8px',
            background: C.bg, border: `1px solid ${color}`,
            color: C.text, fontFamily: 'monospace', fontSize: 13,
            borderRadius: 2, outline: 'none',
          }}
          step={step} min={min} max={max}
        />
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        style={{ width: '100%', accentColor: color, cursor: 'pointer' }}
      />
    </div>
  );
}

export default function PIDPage() {
  const [mode, setMode] = useState<Mode>('rockwell');
  const [params, setParams] = useState<Params>({
    kp: 2, ki: 0.5, kd: 0.1,
    kpS: 2, ti: 2, td: 0.1,
    sp: 80,
  });
  const [display, setDisplay] = useState({ sp: 80, pv: 0, out: 0 });
  const [history, setHistory] = useState<HistoryPoint[]>([]);
  const [running, setRunning] = useState(true);
  const [simSpeed, setSimSpeed] = useState(1);

  const simRef     = useRef<SimState>({ t: 0, pv: 0, integral: 0, prevError: 0, history: [] });
  const paramsRef  = useRef(params);
  const modeRef    = useRef(mode);
  const runningRef = useRef(running);
  const speedRef   = useRef(1);

  useEffect(() => { paramsRef.current = params; }, [params]);
  useEffect(() => { modeRef.current = mode; }, [mode]);
  useEffect(() => { runningRef.current = running; }, [running]);
  useEffect(() => { speedRef.current = simSpeed; }, [simSpeed]);

  const resetSim = useCallback(() => {
    const sim = simRef.current;
    sim.t = 0; sim.pv = 0; sim.integral = 0; sim.prevError = 0;
    sim.history.length = 0;
    setHistory([]);
    setDisplay({ sp: paramsRef.current.sp, pv: 0, out: 0 });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!runningRef.current) return;
      const sim = simRef.current;
      const p   = paramsRef.current;
      const m   = modeRef.current;

      const eff = DT * speedRef.current;
      const out = pidStep(m, p, sim, eff);
      sim.pv = plantStep(sim.pv, out, eff);
      sim.t += eff;
      sim.history.push({ t: sim.t, sp: p.sp, pv: sim.pv, out });
      if (sim.history.length > HISTORY_N + 50) sim.history.splice(0, 50);

      setHistory(sim.history.slice(-HISTORY_N));
      setDisplay({ sp: p.sp, pv: sim.pv, out });
    }, DT * 1000);
    return () => clearInterval(interval);
  }, []);

  const setParam = (key: keyof Params, value: number) =>
    setParams(prev => ({ ...prev, [key]: value }));

  const isRockwell = mode === 'rockwell';
  const error = display.sp - display.pv;

  const rockwellSliders = [
    { key: 'kp' as const, label: 'Kp', min: 0, max: 20, step: 0.1,  color: C.amber  },
    { key: 'ki' as const, label: 'Ki', min: 0, max: 5,  step: 0.01, color: C.cyan   },
    { key: 'kd' as const, label: 'Kd', min: 0, max: 2,  step: 0.01, color: C.purple },
  ];
  const siemensSliders = [
    { key: 'kpS' as const, label: 'Kp',     min: 0,   max: 20, step: 0.1,  color: C.amber  },
    { key: 'ti'  as const, label: 'Ti (s)', min: 0.1, max: 20, step: 0.1,  color: C.cyan   },
    { key: 'td'  as const, label: 'Td (s)', min: 0,   max: 5,  step: 0.05, color: C.purple },
  ];
  const sliders = isRockwell ? rockwellSliders : siemensSliders;

  const panel: React.CSSProperties = {
    padding: 24, borderRadius: 2, border: `1px solid ${C.border}`, background: C.bg2,
  };
  const btn = (): React.CSSProperties => ({
    flex: 1, padding: '10px 0', border: `1px solid ${C.border}`, borderRadius: 2,
    background: C.bg2, color: C.text,
    fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase',
    cursor: 'pointer', transition: 'border-color 0.2s, color 0.2s',
  });

  return (
    <main style={{ background: C.bg, minHeight: '100vh', color: C.text }}>

      {/* ── Header ── */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link
          href="/tools"
          style={{ color: C.text, fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = C.amber; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = C.text; }}
        >
          ← Herramientas
        </Link>
        <span style={{ color: C.amber, fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase' }}>
          Simulador PID
        </span>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: 1024, margin: '0 auto', padding: '48px 32px 64px' }}>

        <p style={{ color: C.amber, fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 12 }}>
          Control Industrial
        </p>
        <h1 style={{ color: C.text, fontSize: 36, fontWeight: 700, margin: '0 0 8px' }}>Simulador PID</h1>
        <p style={{ color: C.text, fontSize: 14, margin: '0 0 40px' }}>
          Ajustá los parámetros y observá SP · PV · OUT en tiempo real. Comparé el modo Rockwell vs Siemens.
        </p>

        {/* ── Mode toggle ── */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
          {(['rockwell', 'siemens'] as Mode[]).map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); resetSim(); }}
              style={{
                padding: '8px 20px', borderRadius: 2, cursor: 'pointer',
                border: `1px solid ${mode === m ? C.amber : C.border}`,
                background: mode === m ? 'rgba(var(--accent-amber-rgb), 0.09)' : C.bg2,
                color: mode === m ? C.amber : C.text,
                fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase',
                transition: 'all 0.2s',
              }}
            >
              {m === 'rockwell' ? 'Rockwell' : 'Siemens'}
            </button>
          ))}
        </div>

        {/* ── Two-column grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24, marginBottom: 24 }}>

          {/* Left: Parameters */}
          <div style={panel}>
            <p style={{ color: C.text, fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 20 }}>
              Parámetros del controlador
            </p>

            {sliders.map(sl => (
              <Slider key={sl.key} label={sl.label} value={params[sl.key]}
                min={sl.min} max={sl.max} step={sl.step} color={sl.color}
                onChange={v => setParam(sl.key, v)} />
            ))}

            {/* SP */}
            <div style={{ marginTop: 8, paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
              <Slider label="SP — Setpoint" value={params.sp}
                min={0} max={100} step={1} color={C.cyan}
                onChange={v => setParam('sp', v)} />
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <button
                onClick={() => setRunning(r => !r)}
                style={btn()}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = C.amber; el.style.color = C.amber; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = C.border; el.style.color = C.text; }}
              >
                {running ? '⏸ Pausar' : '▶ Reanudar'}
              </button>
              <button
                onClick={resetSim}
                style={btn()}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--accent-red)'; el.style.color = 'var(--accent-red)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = C.border; el.style.color = C.text; }}
              >
                ↺ Reiniciar
              </button>
            </div>

            {/* Sim speed */}
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
              <p style={{ color: C.text, fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>
                Tiempo de simulación
              </p>
              <div style={{ display: 'flex', gap: 6 }}>
                {([0.25, 0.5, 1, 2, 4] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => setSimSpeed(s)}
                    style={{
                      flex: 1, padding: '6px 0', borderRadius: 2, cursor: 'pointer',
                      border: `1px solid ${simSpeed === s ? C.amber : C.border}`,
                      background: simSpeed === s ? 'rgba(var(--accent-amber-rgb), 0.09)' : C.bg,
                      color: simSpeed === s ? C.amber : C.text,
                      fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.1em',
                      transition: 'all 0.15s',
                    }}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Formula + SP/PV/OUT + error */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Formula */}
            <div style={panel}>
              <p style={{ color: C.text, fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
                Fórmula — {isRockwell ? 'Rockwell · Paralela' : 'Siemens · Serie'}
              </p>
              {isRockwell ? (
                <>
                  <p style={{ fontFamily: 'monospace', fontSize: 14, color: C.text, marginBottom: 12, lineHeight: 1.6 }}>
                    u(t) = <span style={{ color: C.amber }}>Kp</span>·e(t)
                    {' '}+ <span style={{ color: C.cyan }}>Ki</span>·∫e(t)dt
                    {' '}+ <span style={{ color: C.purple }}>Kd</span>·ė(t)
                  </p>
                  <ul style={{ color: C.text, fontSize: 13, listStyle: 'none', padding: 0, margin: 0, lineHeight: 1.8 }}>
                    <li>• Ganancias <strong>independientes</strong> entre sí</li>
                    <li>• Cambiar Kp <strong>no afecta</strong> la acción I ni D</li>
                    <li>• Típico en Studio 5000 — bloque PIDE</li>
                  </ul>
                </>
              ) : (
                <>
                  <p style={{ fontFamily: 'monospace', fontSize: 14, color: C.text, marginBottom: 12, lineHeight: 1.6 }}>
                    u(t) = <span style={{ color: C.amber }}>Kp</span>·[e(t)
                    {' '}+ (1/<span style={{ color: C.cyan }}>Ti</span>)·∫e(t)dt
                    {' '}+ <span style={{ color: C.purple }}>Td</span>·ė(t)]
                  </p>
                  <ul style={{ color: C.text, fontSize: 13, listStyle: 'none', padding: 0, margin: 0, lineHeight: 1.8 }}>
                    <li>• Las tres acciones <strong>dependen de Kp</strong></li>
                    <li>• <strong>Ti</strong> menor = mayor acción integral</li>
                    <li>• Típico en TIA Portal — PID_Compact</li>
                  </ul>
                </>
              )}
            </div>

            {/* SP / PV / OUT */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              {([
                { label: 'SP',  value: display.sp,  color: C.cyan,  colorRgb: '--accent-cyan-rgb'  },
                { label: 'PV',  value: display.pv,  color: C.green, colorRgb: '--accent-green-rgb' },
                { label: 'OUT', value: display.out, color: C.amber, colorRgb: '--accent-amber-rgb' },
              ]).map(item => (
                <div key={item.label} style={{
                  padding: 16, borderRadius: 2, textAlign: 'center',
                  border: `1px solid rgba(var(${item.colorRgb}), 0.27)`,
                  background: `rgba(var(${item.colorRgb}), 0.04)`,
                }}>
                  <p style={{ color: item.color, fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>
                    {item.label}
                  </p>
                  <p style={{ color: item.color, fontFamily: 'monospace', fontSize: 28, fontWeight: 700, margin: 0 }}>
                    {item.value.toFixed(1)}
                  </p>
                </div>
              ))}
            </div>

            {/* Error bar */}
            <div style={panel}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ color: C.text, fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  Error · SP − PV
                </span>
                <span style={{ color: Math.abs(error) < 1 ? C.green : C.amber, fontFamily: 'monospace', fontSize: 13, fontWeight: 700 }}>
                  {error > 0 ? '+' : ''}{error.toFixed(2)}
                </span>
              </div>
              <div style={{ height: 6, borderRadius: 2, overflow: 'hidden', background: C.border }}>
                <div style={{
                  height: '100%', borderRadius: 2,
                  width: `${clamp(Math.abs(error), 0, 100)}%`,
                  background: Math.abs(error) < 1 ? C.green : C.amber,
                  transition: 'width 0.1s, background 0.3s',
                }} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Chart ── */}
        <div style={{ ...panel, marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 12 }}>
            <span style={{ color: C.text, fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Salida</span>
            {([
              { color: C.cyan,  label: 'SP',  dash: true },
              { color: C.green, label: 'PV',  dash: false },
              { color: C.amber, label: 'OUT', dash: false },
            ] as const).map(leg => (
              <span key={leg.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'monospace', fontSize: 11, color: leg.color }}>
                <svg width="20" height="10">
                  <line x1="0" y1="5" x2="20" y2="5" stroke={leg.color}
                    strokeWidth={leg.label === 'PV' ? 2 : 1.5}
                    strokeDasharray={leg.dash ? '5,3' : undefined} />
                </svg>
                {leg.label}
              </span>
            ))}
          </div>
          <Chart history={history} />
        </div>

        {/* ── Tips ── */}
        <details>
          <summary
            style={{ color: C.text, fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', userSelect: 'none' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = C.amber; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = C.text; }}
          >
            Guía de sintonía ↓
          </summary>
          <div style={{ marginTop: 16, padding: 20, borderRadius: 2, border: `1px solid ${C.border}`, background: C.bg2, fontSize: 12, fontFamily: 'monospace', color: C.text, lineHeight: 1.8 }}>
            <p style={{ margin: '0 0 6px' }}><span style={{ color: C.amber }}>Kp alto</span> → respuesta más rápida, puede oscilar o inestabilizarse.</p>
            <p style={{ margin: '0 0 6px' }}><span style={{ color: C.cyan }}>Ki alto / Ti bajo</span> → elimina el error estacionario, puede oscilar si es excesivo.</p>
            <p style={{ margin: '0 0 12px' }}><span style={{ color: C.purple }}>Kd alto / Td alto</span> → amortigua sobreimpulsos, sensible al ruido.</p>
            <p style={{ margin: '0 0 6px', paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
              Método Ziegler-Nichols: subí solo Kp hasta que el sistema oscile con periodo Pu.
              Luego: Kp = 0.6·Kc, Ti = Pu/2, Td = Pu/8.
            </p>
            <p style={{ margin: 0 }}>Planta: 1° orden — τ = {PLANT_TAU}s, ganancia = {PLANT_GAIN}</p>
          </div>
        </details>
      </div>

      <footer style={{ borderTop: `1px solid ${C.border}`, padding: '32px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'monospace', fontSize: 11, color: C.border, margin: 0 }}>
          juanlarraya.com.ar/tools/pid
        </p>
      </footer>
    </main>
  );
}
