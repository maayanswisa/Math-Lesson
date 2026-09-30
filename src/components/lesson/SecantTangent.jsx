import { useState } from 'react';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider, { fmt } from './LessonSlider';
import { Axes, fnPath, makeScale, usePlotClip } from './PlotAxes';

const s = makeScale({ W: 300, H: 260, x0: -1, x1: 4, y0: -1, y1: 9 });
const f = (x) => x * x;

/**
 * מיתר בין x₀ ל-x₀+h על y = x². כש-h קטן — המיתר הופך למשיק,
 * ושיפועו מתקרב לנגזרת 2x₀.
 */
export default function SecantTangent({ caption, x0: xi = 1, h: hi = 1.5 }) {
  const [x0, setX0] = useState(xi);
  const [h, setH] = useState(hi);
  const { defs, clip } = usePlotClip(s);
  const x1 = x0 + h;
  const m = (f(x1) - f(x0)) / h;
  const line = (x) => f(x0) + m * (x - x0);
  const tan = (x) => f(x0) + 2 * x0 * (x - x0);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
      <svg viewBox={`0 0 ${s.W} ${s.H}`} className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
        {defs}
        <Axes s={s} />
        <g clipPath={clip}>
          <path d={fnPath(tan, s)} fill="none" stroke="var(--color-slate)" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.6" />
          <path d={fnPath(f, s)} fill="none" stroke="var(--color-teal)" strokeWidth="3" />
          <path d={fnPath(line, s)} fill="none" stroke="var(--color-coral)" strokeWidth="2" />
          <line x1={s.sx(x0)} y1={s.sy(f(x0))} x2={s.sx(x1)} y2={s.sy(f(x0))} stroke="var(--color-sky-dark)" strokeWidth="2" strokeDasharray="3 3" />
          <line x1={s.sx(x1)} y1={s.sy(f(x0))} x2={s.sx(x1)} y2={s.sy(f(x1))} stroke="var(--color-violet)" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx={s.sx(x0)} cy={s.sy(f(x0))} r="5" fill="var(--color-ink)" />
          <circle cx={s.sx(x1)} cy={s.sy(f(x1))} r="5" fill="var(--color-coral)" />
        </g>
      </svg>
      <div className="mt-1 flex flex-wrap justify-center gap-x-4 text-xs font-bold">
        <span className="text-[var(--color-teal)]" dir="ltr">
          ━ y = x²
        </span>
        <span className="text-[var(--color-coral)]">━ מיתר</span>
        <span className="text-[var(--color-slate)]">- - - משיק</span>
      </div>
      <div className="mt-2 space-y-1">
        <LessonSlider label="x₀" value={x0} min={-0.5} max={2} step={0.5} onChange={setX0} color="var(--color-ink)" />
        <LessonSlider label="h" value={h} min={0.05} max={2} step={0.05} onChange={setH} color="var(--color-coral)" />
      </div>
      <div className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]">
        <MathRenderer inline>{`$\\frac{f(x_0+h)-f(x_0)}{h}=\\frac{${fmt(f(x1))}-${fmt(f(x0))}}{${fmt(h)}}=${fmt(m)}$`}</MathRenderer>
        <div className="mt-1 text-xs font-semibold text-[var(--color-slate)]">
          הקטינו את <span dir="ltr">h</span> — השיפוע מתקרב ל-
          <span dir="ltr">
            f′({fmt(x0)}) = {fmt(2 * x0)}
          </span>
        </div>
      </div>
    </div>
  );
}
