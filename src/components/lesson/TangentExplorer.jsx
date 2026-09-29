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
  // f = x³ − 3x — מקסימום ב-1−, מינימום ב-1, פיתול ב-0
  cubic: {
    tex: 'f(x)=x^3-3x',
    f: (x) => x ** 3 - 3 * x,
    d: (x) => 3 * x * x - 3,
    d2: (x) => 6 * x,
    min: -2.2,
    max: 2.2,
    view: { x0: -3, x1: 3, y0: -5, y1: 5 },
    step: 1,
    asym: [],
  },
  // f = x/√(x²+1) — אסימפטוטה y=1 בפלוס אינסוף ו-y=−1 במינוס אינסוף
  sqrtAsym: {
    tex: 'f(x)=\\frac{x}{\\sqrt{x^2+1}}',
    f: (x) => x / Math.sqrt(x * x + 1),
    d: (x) => 1 / (x * x + 1) ** 1.5,
    d2: (x) => (-3 * x) / (x * x + 1) ** 2.5,
    min: -6,
    max: 6,
    view: { x0: -7, x1: 7, y0: -2, y1: 2 },
    step: 1,
    asym: [],
    hAsym: [1, -1],
  },
  // f = sin x — והנגזרת cos x
  sin: {
    tex: 'f(x)=\\sin x',
    f: Math.sin,
    d: Math.cos,
    d2: (x) => -Math.sin(x),
    min: 0,
    max: 6.28,
    view: { x0: -0.5, x1: 7, y0: -1.6, y1: 1.6 },
    step: 1,
    asym: [],
    derivTex: "f'(x)=\\cos x",
  },
  // f = eˣ — הנגזרת שווה לפונקציה עצמה
  exp: {
    tex: 'f(x)=e^x',
    f: Math.exp,
    d: Math.exp,
    d2: Math.exp,
    min: -3,
    max: 1.8,
    view: { x0: -4, x1: 3, y0: -1, y1: 7 },
    step: 1,
    asym: [],
    hAsym: [0],
    flatTol: 0.01,
    derivTex: "f'(x)=e^x",
  },
  // f = ln x — הנגזרת 1/x
  ln: {
    tex: 'f(x)=\\ln x',
    f: (x) => (x > 0 ? Math.log(x) : NaN),
    d: (x) => 1 / x,
    d2: (x) => -1 / (x * x),
    min: 0.2,
    max: 6,
    view: { x0: -1, x1: 7, y0: -3, y1: 4 },
    step: 1,
    asym: [0],
    derivTex: "f'(x)=\\frac1x",
  },
  // f = x·e^(−x) — מקסימום ב-1, פיתול ב-2
  xexp: {
    tex: 'f(x)=xe^{-x}',
    f: (x) => x * Math.exp(-x),
    d: (x) => (1 - x) * Math.exp(-x),
    d2: (x) => (x - 2) * Math.exp(-x),
    min: -0.5,
    max: 5,
    view: { x0: -1, x1: 6, y0: -1, y1: 1 },
    step: 1,
    asym: [],
    hAsym: [0],
    flatTol: 0.01,
  },
};

/**
 * מזיזים נקודה על הגרף ורואים את המשיק בה. השיפוע של המשיק = f′(x₀).
 * כשהמשיק אופקי (f′ = 0) — נקודת קיצון.
 */
export default function TangentExplorer({ caption, fn = 'rational', x: xInit, concavity = false, showDeriv = false }) {
  const P = PRESETS[fn];
  const s = makeScale({ W: 300, H: 260, ...P.view });
  const [x0, setX0] = useState(xInit ?? (P.min + P.max) / 2);
  const { defs, clip } = usePlotClip(s);
  const x = P.skip && x0 > P.skip[0] && x0 < P.skip[1] ? (x0 < 1 ? P.skip[0] : P.skip[1]) : x0;

  const y = P.f(x);
  const m = P.d(x);
  const flat = Math.abs(m) < (P.flatTol ?? 0.06);
  const tangent = (t) => y + m * (t - x);
  const k2 = concavity && P.d2 ? P.d2(x) : null;
  const up = (t) => (P.d2(t) > 0 ? P.f(t) : NaN);
  const down = (t) => (P.d2(t) < 0 ? P.f(t) : NaN);

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
          {(P.hAsym ?? []).map((h) => (
            <line
              key={h}
              x1={s.sx(s.x0)}
              y1={s.sy(h)}
              x2={s.sx(s.x1)}
              y2={s.sy(h)}
              stroke="var(--color-coral)"
              strokeWidth="1.5"
              strokeDasharray="6 4"
            />
          ))}
          {showDeriv && (
            <path d={fnPath(P.d, s, { step: 0.01 })} fill="none" stroke="var(--color-sunshine)" strokeWidth="2.5" strokeDasharray="6 4" />
          )}
          {concavity && P.d2 ? (
            <>
              <path d={fnPath(up, s, { step: 0.01 })} fill="none" stroke="var(--color-sky)" strokeWidth="3.5" />
              <path d={fnPath(down, s, { step: 0.01 })} fill="none" stroke="var(--color-coral)" strokeWidth="3.5" />
            </>
          ) : (
            <path d={fnPath(P.f, s, { step: 0.01 })} fill="none" stroke="var(--color-teal)" strokeWidth="3" />
          )}
          <path d={fnPath(tangent, s)} fill="none" stroke={flat ? 'var(--color-success)' : 'var(--color-violet)'} strokeWidth="2.5" />
        </g>
        <circle cx={s.sx(x)} cy={s.sy(y)} r="6" fill={flat ? 'var(--color-success)' : 'var(--color-violet)'} stroke="white" strokeWidth="2" />
      </svg>

      {(concavity || showDeriv) && (
        <div className="mt-1 flex flex-wrap justify-center gap-x-4 text-xs font-bold">
          {concavity && <span className="text-[var(--color-sky-dark)]">━ קעורה כלפי מעלה ∪</span>}
          {concavity && <span className="text-[var(--color-coral)]">━ קעורה כלפי מטה ∩</span>}
          {showDeriv && (
            <span className="text-[var(--color-sunshine-dark)]">
              - - - הנגזרת <MathRenderer inline>{`$${P.derivTex ?? "f'(x)"}$`}</MathRenderer>
            </span>
          )}
        </div>
      )}

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
        {k2 !== null && (
          <span className="mt-1 block text-xs font-semibold">
            <span dir="ltr">
              f″({fmt(x)}) = {fmt(Math.abs(k2) < 0.05 ? 0 : k2)}
            </span>{' '}
            — {Math.abs(k2) < 0.05 ? 'הקעירות מתחלפת כאן: נקודת פיתול!' : k2 > 0 ? 'קעורה כלפי מעלה ∪' : 'קעורה כלפי מטה ∩'}
          </span>
        )}
      </div>
    </div>
  );
}
