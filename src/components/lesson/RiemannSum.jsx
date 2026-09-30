import { useState } from 'react';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider, { fmt } from './LessonSlider';
import { Axes, fnPath, makeScale, usePlotClip } from './PlotAxes';

// poly: f(x) = 0.5x² + 1, הקדומה x³/6 + x;  exp: f(x) = eˣ, הקדומה eˣ
const FNS = {
  poly: {
    f: (x) => 0.5 * x * x + 1,
    F: (x) => x ** 3 / 6 + x,
    tex: 'f(x)=\\frac12x^2+1',
    s: makeScale({ W: 300, H: 240, x0: -0.5, x1: 4.5, y0: -0.5, y1: 11 }),
    bMax: 4,
  },
  exp: {
    f: (x) => Math.exp(x),
    F: (x) => Math.exp(x),
    tex: 'f(x)=e^x',
    s: makeScale({ W: 300, H: 240, x0: -0.3, x1: 2.7, y0: -0.5, y1: 11 }),
    bMax: 2.5,
  },
};

/**
 * קירוב ההצטברות במלבנים: מחלקים את [0, b] ל-n קטעים, ובכל קטע מלבן בגובה f בקצה השמאלי.
 * ככל ש-n גדל — הסכום מתקרב לאינטגרל F(b) − F(0).
 */
export default function RiemannSum({ caption, fn = 'poly' }) {
  const { f, F, tex, s, bMax } = FNS[fn];
  const [n, setN] = useState(4);
  const [b, setB] = useState(Math.min(3, bMax));
  const { defs, clip } = usePlotClip(s);

  const h = b / n;
  const rects = Array.from({ length: n }, (_, i) => i * h);
  const approx = rects.reduce((sum, x) => sum + f(x) * h, 0);
  const exact = F(b) - F(0);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
      <div className="mb-1 text-center">
        <MathRenderer inline>{`$${tex}$`}</MathRenderer>
      </div>
      <svg viewBox={`0 0 ${s.W} ${s.H}`} className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
        {defs}
        <Axes s={s} labelEvery={1} />
        <g clipPath={clip}>
          {rects.map((x) => (
            <rect
              key={x}
              x={s.sx(x)}
              y={s.sy(f(x))}
              width={s.sx(x + h) - s.sx(x)}
              height={s.sy(0) - s.sy(f(x))}
              fill="rgba(124,77,204,0.22)"
              stroke="var(--color-violet)"
              strokeWidth={n > 30 ? 0.3 : 1}
            />
          ))}
          <path d={fnPath(f, s)} fill="none" stroke="var(--color-teal)" strokeWidth="3" />
          <line x1={s.sx(b)} y1={s.sy(0)} x2={s.sx(b)} y2={s.sy(f(b))} stroke="var(--color-coral)" strokeWidth="2" strokeDasharray="4 3" />
        </g>
      </svg>

      <div className="mt-2 space-y-1">
        <LessonSlider label="מלבנים" value={n} min={1} max={60} onChange={setN} color="var(--color-violet)" width="w-16" />
        <LessonSlider
          label={<span dir="ltr">x = b</span>}
          value={b}
          min={0.5}
          max={bMax}
          step={0.5}
          onChange={setB}
          color="var(--color-coral)"
          width="w-16"
        />
      </div>

      <div className="mt-3 grid gap-2 text-center text-sm font-bold sm:grid-cols-2">
        <div className="rounded-xl bg-[var(--color-violet)]/10 p-2 text-[var(--color-violet)]">
          <div className="text-xs font-semibold">סכום המלבנים</div>
          <span dir="ltr">{fmt(approx)}</span>
        </div>
        <div className="rounded-xl bg-[var(--color-success)]/10 p-2 text-[var(--color-success)]">
          <div className="text-xs font-semibold">ההצטברות המדויקת</div>
          <MathRenderer inline>{`$F_0(${fmt(b)})=\\int_0^{${fmt(b)}}f(u)\\,du=${fmt(exact)}$`}</MathRenderer>
        </div>
      </div>
      <p className="mt-2 text-center text-xs font-semibold text-[var(--color-slate)]">
        {n < 10 ? 'הוסיפו מלבנים — הקירוב משתפר' : `הפער: ${fmt(Math.abs(exact - approx))} — ככל שיותר מלבנים, הפער קטן`}
      </p>
    </div>
  );
}
