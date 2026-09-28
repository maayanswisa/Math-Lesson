import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';

const SIZE = 300;
const MID = SIZE / 2;
const RANGE = 6;
const UNIT = (MID - 10) / RANGE;
const px = (x) => MID + x * UNIT;
const py = (y) => MID - y * UNIT;
const fmt = (n) => String(Number(n.toFixed(2)));
const signed = (n) => (n < 0 ? `-${fmt(-n)}` : `+${fmt(n)}`);

/** a·x²+b·x+c כ-TeX קריא. */
function standardTex(a, b, c) {
  const parts = [];
  parts.push(a === 1 ? 'x^2' : a === -1 ? '-x^2' : `${fmt(a)}x^2`);
  if (b) parts.push(`${b < 0 ? '-' : '+'}${Math.abs(b) === 1 ? '' : fmt(Math.abs(b))}x`);
  if (c) parts.push(signed(c));
  return `y=${parts.join('')}`;
}

function Slider({ label, value, min, max, step, onChange, color }) {
  return (
    <label className="flex items-center gap-2 text-sm font-semibold">
      <span dir="ltr" className="w-8 italic" style={{ color }}>
        {label}
      </span>
      <input
        type="range"
        dir="ltr"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{ accentColor: color }}
      />
      <span dir="ltr" className="w-10 text-end" style={{ color }}>
        {fmt(value)}
      </span>
    </label>
  );
}

/**
 * פרבולה אינטראקטיבית בשלושה ייצוגים:
 * - vertex:   y = a(x−p)² + q      — סליידרים ל-a, p, q; הקודקוד מסומן
 * - factored: y = a(x−m)(x−t)      — סליידרים ל-a, m, t; השורשים וציר הסימטריה
 * - standard: y = ax² + bx + c     — סליידרים ל-a, b, c; הדיסקרימיננטה ומספר הפתרונות
 * signs — צביעת ציר x לפי תחומי חיוביות/שליליות.
 */
export default function ParabolaGraph({ caption, mode = 'vertex', a: a0 = 1, p: p0 = 0, q: q0 = 0, m: m0 = -2, t: t0 = 2, b: b0 = 0, c: c0 = -4, signs = false }) {
  const [a, setA] = useState(a0);
  const [p, setP] = useState(p0);
  const [q, setQ] = useState(q0);
  const [m, setM] = useState(m0);
  const [t, setT] = useState(t0);
  const [b, setB] = useState(b0);
  const [c, setC] = useState(c0);

  // הכול נמיר לצורה סטנדרטית A,B,C
  let A = a;
  let B;
  let C;
  if (mode === 'vertex') {
    B = -2 * a * p;
    C = a * p * p + q;
  } else if (mode === 'factored') {
    B = -a * (m + t);
    C = a * m * t;
  } else {
    B = b;
    C = c;
  }
  const f = (x) => A * x * x + B * x + C;
  const vx = -B / (2 * A);
  const vy = f(vx);
  const disc = B * B - 4 * A * C;
  const roots = disc > 1e-9 ? [(-B - Math.sqrt(disc)) / (2 * A), (-B + Math.sqrt(disc)) / (2 * A)].sort((x, y) => x - y) : Math.abs(disc) <= 1e-9 ? [vx] : [];

  const pts = [];
  for (let i = 0; i <= 120; i++) {
    const x = -RANGE - 0.5 + ((2 * RANGE + 1) * i) / 120;
    pts.push(`${i ? 'L' : 'M'}${px(x).toFixed(1)},${Math.max(-400, Math.min(700, py(f(x)))).toFixed(1)}`);
  }
  const d = pts.join(' ');

  let tex;
  if (mode === 'vertex') tex = `y=${a === 1 ? '' : a === -1 ? '-' : fmt(a)}(x${signed(-p)})^2${q ? signed(q) : ''}`;
  else if (mode === 'factored') tex = `y=${a === 1 ? '' : a === -1 ? '-' : fmt(a)}(x${signed(-m)})(x${signed(-t)})`;
  else tex = standardTex(A, B, C);
  tex = tex.replace(/\(x\+0\)/g, 'x').replace(/x\+0\)/g, 'x)');

  // תחומי סימן לאורך ציר x
  const segments = [];
  if (signs) {
    const cuts = [-RANGE - 1, ...roots.filter((r) => Math.abs(r) < RANGE + 1), RANGE + 1];
    for (let i = 0; i < cuts.length - 1; i++) {
      const mid = (cuts[i] + cuts[i + 1]) / 2;
      const val = f(mid);
      if (Math.abs(val) > 1e-9) segments.push({ x1: cuts[i], x2: cuts[i + 1], pos: val > 0 });
    }
  }

  const ticks = Array.from({ length: RANGE * 2 + 1 }, (_, i) => i - RANGE);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}

      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="mx-auto w-full max-w-xs" style={{ direction: 'ltr' }}>
        <defs>
          <clipPath id="parabola-clip">
            <rect x="0" y="0" width={SIZE} height={SIZE} />
          </clipPath>
        </defs>
        {ticks.map((tk) => (
          <g key={tk} stroke="var(--color-mist)" strokeWidth="1">
            <line x1={px(tk)} x2={px(tk)} y1={0} y2={SIZE} />
            <line y1={py(tk)} y2={py(tk)} x1={0} x2={SIZE} />
          </g>
        ))}
        <line x1={0} x2={SIZE} y1={MID} y2={MID} stroke="var(--color-ink)" strokeWidth="1.5" />
        <line y1={0} y2={SIZE} x1={MID} x2={MID} stroke="var(--color-ink)" strokeWidth="1.5" />
        {ticks
          .filter((tk) => tk && tk % 2 === 0)
          .map((tk) => (
            <g key={tk} fontSize="10" fill="var(--color-slate)">
              <text x={px(tk)} y={MID + 13} textAnchor="middle">
                {String(tk).replace('-', '−')}
              </text>
              <text x={MID - 5} y={py(tk) + 3} textAnchor="end">
                {String(tk).replace('-', '−')}
              </text>
            </g>
          ))}

        {segments.map((s, i) => (
          <line
            key={i}
            x1={px(s.x1)}
            x2={px(s.x2)}
            y1={MID}
            y2={MID}
            stroke={s.pos ? 'var(--color-grass)' : 'var(--color-coral)'}
            strokeWidth="6"
            opacity="0.75"
          />
        ))}

        {Math.abs(vx) <= RANGE && (
          <line x1={px(vx)} x2={px(vx)} y1={0} y2={SIZE} stroke="var(--color-violet)" strokeWidth="1.5" strokeDasharray="5 4" />
        )}
        <g clipPath="url(#parabola-clip)">
          <motion.path initial={false} animate={{ d }} transition={{ duration: 0.2 }} fill="none" stroke="var(--color-teal)" strokeWidth="3" />
        </g>
        {roots
          .filter((r) => Math.abs(r) <= RANGE)
          .map((r, i) => (
            <circle key={i} cx={px(r)} cy={MID} r="5.5" fill="var(--color-sunshine)" stroke="white" strokeWidth="2" />
          ))}
        {Math.abs(vx) <= RANGE && Math.abs(vy) <= RANGE && <circle cx={px(vx)} cy={py(vy)} r="5.5" fill="var(--color-coral)" stroke="white" strokeWidth="2" />}
        {Math.abs(C) <= RANGE && <circle cx={MID} cy={py(C)} r="4" fill="var(--color-sky)" />}
      </svg>

      <div className="mt-2 text-center text-lg text-[var(--color-teal-dark)]">
        <MathRenderer inline>{`$${tex}$`}</MathRenderer>
      </div>

      <div className="mt-2 space-y-1">
        <Slider label="a" value={a} min={-3} max={3} step={0.5} color="var(--color-teal)" onChange={(v) => setA(v === 0 ? (a > 0 ? -0.5 : 0.5) : v)} />
        {mode === 'vertex' && (
          <>
            <Slider label="p" value={p} min={-4} max={4} step={1} color="var(--color-coral)" onChange={setP} />
            <Slider label="q" value={q} min={-5} max={5} step={1} color="var(--color-violet)" onChange={setQ} />
          </>
        )}
        {mode === 'factored' && (
          <>
            <Slider label="m" value={m} min={-5} max={5} step={1} color="var(--color-sunshine-dark)" onChange={setM} />
            <Slider label="t" value={t} min={-5} max={5} step={1} color="var(--color-sunshine-dark)" onChange={setT} />
          </>
        )}
        {mode === 'standard' && (
          <>
            <Slider label="b" value={b} min={-6} max={6} step={1} color="var(--color-coral)" onChange={setB} />
            <Slider label="c" value={c} min={-6} max={6} step={1} color="var(--color-violet)" onChange={setC} />
          </>
        )}
      </div>

      <div className="mt-3 flex flex-wrap justify-center gap-2 text-sm font-semibold">
        <span className="rounded-lg bg-[var(--color-coral)]/10 px-2 py-1 text-[var(--color-coral-dark)]">
          ● קודקוד <span dir="ltr">({fmt(vx)}, {fmt(vy)})</span> — {A > 0 ? 'מינימום' : 'מקסימום'}
        </span>
        <span className="rounded-lg bg-[var(--color-sunshine)]/15 px-2 py-1 text-[var(--color-sunshine-dark)]">
          ● {roots.length === 0 ? 'אין חיתוך עם ציר x' : roots.length === 1 ? <>נוגעת בציר x ב-<span dir="ltr">x={fmt(roots[0])}</span></> : <>שורשים: <span dir="ltr">x={fmt(roots[0])}, x={fmt(roots[1])}</span></>}
        </span>
        {mode === 'standard' && (
          <span className="rounded-lg bg-[var(--color-violet)]/10 px-2 py-1 text-[var(--color-violet-dark)]">
            <MathRenderer inline>{`$\\Delta=b^2-4ac=${fmt(disc)}$`}</MathRenderer> {disc > 1e-9 ? '> 0' : Math.abs(disc) <= 1e-9 ? '= 0' : '< 0'}
          </span>
        )}
      </div>
      {signs && (
        <p className="mt-2 text-center text-xs font-semibold">
          <span className="text-[var(--color-grass-dark)]">▬ ירוק: y&gt;0</span> ·{' '}
          <span className="text-[var(--color-coral)]">▬ אדום: y&lt;0</span>
        </p>
      )}
    </div>
  );
}
