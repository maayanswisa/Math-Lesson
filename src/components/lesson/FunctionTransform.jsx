import { useState } from 'react';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider, { fmt } from './LessonSlider';
import { Axes, fnPath, makeScale, usePlotClip } from './PlotAxes';

const s = makeScale({ W: 300, H: 280, x0: -6, x1: 6, y0: -6, y1: 6 });

const FAMILIES = {
  square: { name: 'x²', f: (x) => x * x, tex: (i) => `${i}^2` },
  cube: { name: 'x³', f: (x) => x ** 3, tex: (i) => `${i}^3` },
  abs: { name: '|x|', f: (x) => Math.abs(x), tex: (i) => `\\left|${i}\\right|` },
  sqrt: { name: '√x', f: (x) => (x >= 0 ? Math.sqrt(x) : NaN), tex: (i) => `\\sqrt{${i}}` },
  inv: { name: '1/x', f: (x) => 1 / x, tex: (i) => `\\frac{1}{${i}}` },
};

const inner = (h) => (h === 0 ? 'x' : `(x${h > 0 ? '-' : '+'}${fmt(Math.abs(h))})`);
const innerFrac = (h) => (h === 0 ? 'x' : `x${h > 0 ? '-' : '+'}${fmt(Math.abs(h))}`);

/**
 * משפחות פונקציות ו-y = a·f(x−h)+k.
 * הגרף המקורי מקווקו, והגרף המוזז מלא. families — אילו פונקציות להציג.
 */
export default function FunctionTransform({ caption, families = ['square', 'cube', 'abs', 'sqrt', 'inv'], fn: f0, a: a0 = 1, h: h0 = 0, k: k0 = 0 }) {
  const [fn, setFn] = useState(f0 ?? families[0]);
  const [a, setA] = useState(a0);
  const [h, setH] = useState(h0);
  const [k, setK] = useState(k0);
  const { defs, clip } = usePlotClip(s);
  const F = FAMILIES[fn];
  const g = (x) => a * F.f(x - h) + k;
  const A = a === 1 ? '' : a === -1 ? '-' : fmt(a);
  const arg = fn === 'inv' || fn === 'sqrt' ? innerFrac(h) : fn === 'abs' ? innerFrac(h) : inner(h);
  const tex = `y=${A}${F.tex(arg)}${k ? (k > 0 ? '+' : '-') + fmt(Math.abs(k)) : ''}`;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
      {families.length > 1 && (
        <div className="mb-2 flex flex-wrap justify-center gap-2" dir="ltr">
          {families.map((key) => (
            <button
              key={key}
              onClick={() => setFn(key)}
              className={`rounded-full px-3 py-1 text-sm font-bold ${fn === key ? 'bg-[var(--color-teal)] text-white' : 'bg-[var(--color-mist)] text-[var(--color-ink)]'}`}
            >
              {FAMILIES[key].name}
            </button>
          ))}
        </div>
      )}
      <svg viewBox={`0 0 ${s.W} ${s.H}`} className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
        {defs}
        <Axes s={s} />
        <g clipPath={clip}>
          <path d={fnPath(F.f, s, { step: 0.01 })} fill="none" stroke="var(--color-slate)" strokeWidth="2" strokeDasharray="5 4" opacity="0.6" />
          <path d={fnPath(g, s, { step: 0.01 })} fill="none" stroke="var(--color-teal)" strokeWidth="3" />
        </g>
      </svg>
      <div className="mt-2 space-y-1">
        <LessonSlider label="a" value={a} min={-3} max={3} step={0.5} onChange={(v) => setA(v === 0 ? 0.5 : v)} color="var(--color-violet)" />
        <LessonSlider label="h" value={h} min={-4} max={4} step={1} onChange={setH} color="var(--color-sky-dark)" />
        <LessonSlider label="k" value={k} min={-4} max={4} step={1} onChange={setK} color="var(--color-coral)" />
      </div>
      <div className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]">
        <MathRenderer inline>{`$${tex}$`}</MathRenderer>
        <div className="mt-1 text-xs font-semibold text-[var(--color-slate)]">
          <span dir="ltr">h</span> — הזזה ימינה/שמאלה · <span dir="ltr">k</span> — למעלה/למטה · <span dir="ltr">a</span> — מתיחה והיפוך
        </div>
      </div>
    </div>
  );
}
