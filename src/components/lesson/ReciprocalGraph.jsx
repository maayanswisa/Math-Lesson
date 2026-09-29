import { useState } from 'react';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider, { fmt } from './LessonSlider';
import { Axes, fnPath, makeScale, usePlotClip } from './PlotAxes';

const s = makeScale({ W: 300, H: 280, x0: -6, x1: 6, y0: -5, y1: 5 });

function gTex(a, p, q) {
  const A = a === 1 ? '' : a === -1 ? '-' : fmt(a);
  const inner = p === 0 ? 'x^2' : `(x${p > 0 ? '-' : '+'}${fmt(Math.abs(p))})^2`;
  const Q = q === 0 ? '' : `${q > 0 ? '+' : '-'}${fmt(Math.abs(q))}`;
  return `${A}${inner}${Q}`;
}

/**
 * קדם-אנליזה של f = 1/g, כאשר g(x) = a(x−p)² + q.
 * רואים את g (מקווקו) ואת f יחד: אסימפטוטות מאונכות באפסי g,
 * אותו סימן, מונוטוניות הפוכה, ו-f→0 כש-g→∞.
 */
export default function ReciprocalGraph({ caption, a: a0 = 1, p: p0 = 0, q: q0 = -4 }) {
  const [a, setA] = useState(a0);
  const [p, setP] = useState(p0);
  const [q, setQ] = useState(q0);
  const { defs, clip } = usePlotClip(s);

  const g = (x) => a * (x - p) ** 2 + q;
  const f = (x) => 1 / g(x);
  const disc = -q / a;
  const roots = disc > 0 ? [p - Math.sqrt(disc), p + Math.sqrt(disc)] : disc === 0 ? [p] : [];

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}

      <svg viewBox={`0 0 ${s.W} ${s.H}`} className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
        {defs}
        <Axes s={s} />
        <g clipPath={clip}>
          <line x1={s.sx(s.x0)} y1={s.sy(0)} x2={s.sx(s.x1)} y2={s.sy(0)} stroke="var(--color-sunshine)" strokeWidth="3" opacity="0.45" />
          {roots.map((r) => (
            <line
              key={r}
              x1={s.sx(r)}
              y1={s.sy(s.y0)}
              x2={s.sx(r)}
              y2={s.sy(s.y1)}
              stroke="var(--color-coral)"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
          ))}
          <path d={fnPath(g, s)} fill="none" stroke="var(--color-violet)" strokeWidth="2" strokeDasharray="5 4" opacity="0.7" />
          <path d={fnPath(f, s, { step: 0.01 })} fill="none" stroke="var(--color-teal)" strokeWidth="3" />
        </g>
      </svg>
      <div className="mt-1 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs font-bold">
        <span className="text-[var(--color-violet)]" dir="ltr">
          - - - g(x)
        </span>
        <span className="text-[var(--color-teal)]" dir="ltr">
          ━ f(x) = 1/g(x)
        </span>
        <span className="text-[var(--color-coral)]">- - - אסימפטוטה מאונכת</span>
        <span className="text-[var(--color-sunshine-dark)]">
          ━ אסימפטוטה אופקית <span dir="ltr">y=0</span>
        </span>
      </div>

      <div className="mt-2 space-y-1">
        <LessonSlider label="a" value={a} min={-2} max={2} step={0.5} onChange={(v) => setA(v === 0 ? 0.5 : v)} color="var(--color-violet)" />
        <LessonSlider label="p" value={p} min={-3} max={3} step={0.5} onChange={setP} color="var(--color-sky-dark)" />
        <LessonSlider label="q" value={q} min={-4} max={4} step={0.5} onChange={setQ} color="var(--color-coral)" />
      </div>

      <div className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]">
        <MathRenderer inline>{`$g(x)=${gTex(a, p, q)}$`}</MathRenderer>
        <div className="mt-1 text-xs font-semibold text-[var(--color-slate)]">
          {roots.length === 0 ? (
            <>
              ל-<i>g</i> אין אפסים ← ל-<i>f</i> אין אסימפטוטה מאונכת, והיא מוגדרת לכל <i>x</i>
            </>
          ) : (
            <>
              אפסי <i>g</i>: <span dir="ltr">{roots.map((r) => `x=${fmt(r)}`).join(', ')}</span> ← שם ל-<i>f</i> אסימפטוטות מאונכות
            </>
          )}
        </div>
      </div>
    </div>
  );
}
