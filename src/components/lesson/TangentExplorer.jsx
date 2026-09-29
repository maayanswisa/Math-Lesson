import { useState } from 'react';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider, { fmt } from './LessonSlider';
import { Axes, fnPath, makeScale, usePlotClip } from './PlotAxes';

/** פונקציות מוכנות: הפונקציה, הנגזרת, התחום לסליידר, ומסגרת השרטוט. */
const PRESETS = {
  // f = x + 4/x — אסימפטוטה ב-0, קיצון ב-±2
  rational: {
    tex: 'f(x)=x+\\frac{4}{x}',
    f: (x) => x + 4 / x,
    d: (x) => 1 - 4 / (x * x),
    min: 0.5,
    max: 6,
    view: { x0: -6, x1: 6, y0: -10, y1: 10 },
    step: 2,
    asym: [0],
  },
  // f = x²/(x−1) — אסימפטוטה ב-1, מקסימום ב-0 ומינימום ב-2
  quotient: {
    tex: 'f(x)=\\frac{x^2}{x-1}',
    f: (x) => (x * x) / (x - 1),
    d: (x) => (x * x - 2 * x) / (x - 1) ** 2,
    min: -3,
    max: 5,
    skip: [0.75, 1.25],
    view: { x0: -4, x1: 6, y0: -8, y1: 10 },
    step: 2,
    asym: [1],
  },
  // f = x·√(4−x) — מוגדרת עד 4, מקסימום ב-8/3, ובקצה התחום
  root: {
    tex: 'f(x)=x\\sqrt{4-x}',
    f: (x) => (x <= 4 ? x * Math.sqrt(4 - x) : NaN),
    d: (x) => (8 - 3 * x) / (2 * Math.sqrt(4 - x)),
    min: -1,
    max: 3.9,
    view: { x0: -2, x1: 5, y0: -4, y1: 4 },
    step: 1,
    asym: [],
  },
};

/**
 * מזיזים נקודה על הגרף ורואים את המשיק בה. השיפוע של המשיק = f′(x₀).
 * כשהמשיק אופקי (f′ = 0) — נקודת קיצון.
 */
export default function TangentExplorer({ caption, fn = 'rational', x: xInit }) {
  const P = PRESETS[fn];
  const s = makeScale({ W: 300, H: 260, ...P.view });
  const [x0, setX0] = useState(xInit ?? (P.min + P.max) / 2);
  const { defs, clip } = usePlotClip(s);
  const x = P.skip && x0 > P.skip[0] && x0 < P.skip[1] ? (x0 < 1 ? P.skip[0] : P.skip[1]) : x0;

  const y = P.f(x);
  const m = P.d(x);
  const flat = Math.abs(m) < 0.06;
  const tangent = (t) => y + m * (t - x);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
      <div className="mb-1 text-center">
        <MathRenderer inline>{`$${P.tex}$`}</MathRenderer>
      </div>

      <svg viewBox={`0 0 ${s.W} ${s.H}`} className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
        {defs}
        <Axes s={s} step={P.step} labelEvery={1} />
        <g clipPath={clip}>
          {P.asym.map((a) => (
            <line
              key={a}
              x1={s.sx(a)}
              y1={s.sy(s.y0)}
              x2={s.sx(a)}
              y2={s.sy(s.y1)}
              stroke="var(--color-coral)"
              strokeWidth="1.5"
              strokeDasharray="6 4"
            />
          ))}
          <path d={fnPath(P.f, s, { step: 0.01 })} fill="none" stroke="var(--color-teal)" strokeWidth="3" />
          <path d={fnPath(tangent, s)} fill="none" stroke={flat ? 'var(--color-success)' : 'var(--color-violet)'} strokeWidth="2.5" />
        </g>
        <circle cx={s.sx(x)} cy={s.sy(y)} r="6" fill={flat ? 'var(--color-success)' : 'var(--color-violet)'} stroke="white" strokeWidth="2" />
      </svg>

      <LessonSlider label="x₀" value={x0} min={P.min} max={P.max} step={0.05} onChange={setX0} color="var(--color-violet)" />

      <div
        className={`mt-3 rounded-xl p-2 text-center text-sm font-bold ${flat ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]' : 'bg-[var(--color-mist)] text-[var(--color-ink)]'}`}
      >
        <span dir="ltr">
          f({fmt(x)}) = {fmt(y)} · f′({fmt(x)}) = {fmt(flat ? 0 : m)}
        </span>
        <span className="block text-xs font-semibold">
          {flat ? 'המשיק אופקי — כאן נקודת קיצון!' : m > 0 ? 'שיפוע חיובי — הפונקציה עולה כאן' : 'שיפוע שלילי — הפונקציה יורדת כאן'}
        </span>
      </div>
    </div>
  );
}
