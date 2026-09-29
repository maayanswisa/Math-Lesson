import { useState } from 'react';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider, { fmt } from './LessonSlider';
import { Axes, fnPath, makeScale, usePlotClip } from './PlotAxes';

// f(x) = x² − 2x − 3 = (x+1)(x−3), והקדומה F(x) = x³/3 − x² − 3x
const f = (x) => x * x - 2 * x - 3;
const F = (x) => x ** 3 / 3 - x * x - 3 * x;
const ROOTS = [-1, 3];

const SIGNED = makeScale({ W: 300, H: 260, x0: -3, x1: 6, y0: -5, y1: 8 });
const BETWEEN = makeScale({ W: 300, H: 260, x0: -3, x1: 4, y0: -1, y1: 9 });

// בין גרפים: f = x + 3 מעל g = x² + 1, נחתכים ב-1− וב-2
const top = (x) => x + 3;
const bottom = (x) => x * x + 1;

function areaPath(s, from, to, hi, lo) {
  if (to <= from) return '';
  const n = 60;
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const x = from + ((to - from) * i) / n;
    pts.push(`${s.sx(x).toFixed(1)},${s.sy(hi(x)).toFixed(1)}`);
  }
  for (let i = n; i >= 0; i--) {
    const x = from + ((to - from) * i) / n;
    pts.push(`${s.sx(x).toFixed(1)},${s.sy(lo(x)).toFixed(1)}`);
  }
  return `M${pts.join('L')}Z`;
}

/**
 * mode="signed" — אינטגרל מסוים מול שטח: חלק מעל הציר (ירוק) נספר בחיוב,
 * חלק מתחת (אדום) בשלילה. השטח האמיתי = סכום הערכים המוחלטים.
 * mode="between" — השטח בין שני גרפים.
 */
export default function AreaIntegral({ caption, mode = 'signed', a: a0 = 0, b: b0 = 4 }) {
  const [a, setA] = useState(a0);
  const [b, setB] = useState(b0);
  const s = mode === 'between' ? BETWEEN : SIGNED;
  const { defs, clip } = usePlotClip(s);

  if (mode === 'between') {
    return (
      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
        {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
        <svg viewBox={`0 0 ${s.W} ${s.H}`} className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
          {defs}
          <Axes s={s} labelEvery={1} />
          <g clipPath={clip}>
            <path d={areaPath(s, -1, 2, top, bottom)} fill="rgba(124,77,204,0.25)" />
            <path d={fnPath(top, s)} fill="none" stroke="var(--color-teal)" strokeWidth="3" />
            <path d={fnPath(bottom, s)} fill="none" stroke="var(--color-coral)" strokeWidth="3" />
          </g>
          {[-1, 2].map((x) => (
            <circle key={x} cx={s.sx(x)} cy={s.sy(top(x))} r="5" fill="var(--color-ink)" />
          ))}
          <text x={s.sx(3.3)} y={s.sy(6.9)} fontSize="12" fontWeight="700" fill="var(--color-teal)">
            f
          </text>
          <text x={s.sx(2.6)} y={s.sy(8.4)} fontSize="12" fontWeight="700" fill="var(--color-coral)">
            g
          </text>
        </svg>
        <div className="mt-2 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]">
          <MathRenderer inline>{String.raw`$\int_{-1}^{2}\big[(x+3)-(x^2+1)\big]dx=\int_{-1}^{2}(-x^2+x+2)\,dx=4.5$`}</MathRenderer>
          <div className="mt-1 text-xs font-semibold text-[var(--color-slate)]">העליון פחות התחתון, בין נקודות החיתוך</div>
        </div>
      </div>
    );
  }

  const lo = Math.min(a, b);
  const hi = Math.max(a, b);
  const cuts = [lo, ...ROOTS.filter((r) => r > lo && r < hi), hi];
  let area = 0;
  const pieces = [];
  for (let i = 0; i < cuts.length - 1; i++) {
    const v = F(cuts[i + 1]) - F(cuts[i]);
    area += Math.abs(v);
    pieces.push([cuts[i], cuts[i + 1], v]);
  }
  const signed = F(b) - F(a);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
      <div className="mb-1 text-center">
        <MathRenderer inline>{'$f(x)=x^2-2x-3$'}</MathRenderer>
      </div>
      <svg viewBox={`0 0 ${s.W} ${s.H}`} className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
        {defs}
        <Axes s={s} />
        <g clipPath={clip}>
          {pieces.map(([x1, x2, v]) => (
            <path key={x1} d={areaPath(s, x1, x2, f, () => 0)} fill={v >= 0 ? 'rgba(45,122,79,0.3)' : 'rgba(196,92,72,0.3)'} />
          ))}
          <path d={fnPath(f, s)} fill="none" stroke="var(--color-teal)" strokeWidth="3" />
        </g>
        {[a, b].map((x, i) => (
          <line
            key={i}
            x1={s.sx(x)}
            y1={s.sy(s.y0)}
            x2={s.sx(x)}
            y2={s.sy(s.y1)}
            stroke="var(--color-violet)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
        ))}
      </svg>
      <div className="mt-2 space-y-1">
        <LessonSlider label="a" value={a} min={-3} max={6} step={0.5} onChange={setA} color="var(--color-violet)" />
        <LessonSlider label="b" value={b} min={-3} max={6} step={0.5} onChange={setB} color="var(--color-violet)" />
      </div>
      <div className="mt-3 grid gap-2 text-center text-sm font-bold sm:grid-cols-2">
        <div className="rounded-xl bg-[var(--color-mist)] p-2">
          <div className="text-xs font-semibold text-[var(--color-slate)]">האינטגרל (עם סימן)</div>
          <MathRenderer inline>{`$\\int_{${fmt(a)}}^{${fmt(b)}}f(x)\\,dx=${fmt(signed)}$`}</MathRenderer>
        </div>
        <div className="rounded-xl bg-[var(--color-success)]/10 p-2 text-[var(--color-success)]">
          <div className="text-xs font-semibold">השטח (תמיד חיובי)</div>
          <span dir="ltr">
            {pieces.map(([, , v]) => `|${fmt(v)}|`).join(' + ')} = {fmt(area)}
          </span>
        </div>
      </div>
      {pieces.length > 1 && (
        <p className="mt-2 text-center text-xs font-semibold text-[var(--color-coral-dark)]">הפונקציה חוצה את הציר בתחום — מפצלים בנקודת החיתוך!</p>
      )}
    </div>
  );
}
