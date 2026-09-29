import { useState } from 'react';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider, { fmt } from './LessonSlider';
import { fnPath, makeScale, usePlotClip } from './PlotAxes';

const N0 = 100;
const T_MAX = 12;

/**
 * N(t) = N(0)·qᵗ עם אחוז שינוי p לכל יחידת זמן (q = 1 + p/100).
 * מראה את הכמות אחרי t, ואת זמן ההכפלה / מחצית החיים.
 */
export default function GrowthModel({ caption, p: p0 = 20 }) {
  const [p, setP] = useState(p0);
  const [t, setT] = useState(3);
  const q = 1 + p / 100;
  const N = (x) => N0 * q ** x;
  const yMax = Math.max(220, Math.min(1000, N(T_MAX) * 1.05));
  const s = makeScale({ W: 300, H: 220, x0: -0.3, x1: T_MAX, y0: 0, y1: yMax, pad: 22 });
  const { defs, clip } = usePlotClip(s);
  const special = q > 1 ? Math.log(2) / Math.log(q) : q < 1 ? Math.log(0.5) / Math.log(q) : null;
  const target = q > 1 ? 2 * N0 : N0 / 2;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
      <svg viewBox={`0 0 ${s.W} ${s.H}`} className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
        {defs}
        <line x1={s.sx(0)} y1={s.sy(0)} x2={s.sx(T_MAX)} y2={s.sy(0)} stroke="var(--color-ink)" strokeWidth="1.5" />
        <line x1={s.sx(0)} y1={s.sy(0)} x2={s.sx(0)} y2={s.sy(yMax)} stroke="var(--color-ink)" strokeWidth="1.5" />
        {[0, 2, 4, 6, 8, 10, 12].map((x) => (
          <text key={x} x={s.sx(x)} y={s.sy(0) + 13} fontSize="9" textAnchor="middle" fill="var(--color-slate)">
            {x}
          </text>
        ))}
        <text x={s.sx(0) - 3} y={s.sy(N0) + 3} fontSize="9" textAnchor="end" fill="var(--color-slate)">
          100
        </text>
        <g clipPath={clip}>
          {special !== null && special <= T_MAX && (
            <>
              <line x1={s.sx(0)} y1={s.sy(target)} x2={s.sx(special)} y2={s.sy(target)} stroke="var(--color-sunshine)" strokeDasharray="4 3" />
              <line x1={s.sx(special)} y1={s.sy(0)} x2={s.sx(special)} y2={s.sy(target)} stroke="var(--color-sunshine)" strokeDasharray="4 3" />
            </>
          )}
          <path d={fnPath(N, s, { from: 0, step: 0.05 })} fill="none" stroke={q >= 1 ? 'var(--color-teal)' : 'var(--color-coral)'} strokeWidth="3" />
          <circle cx={s.sx(t)} cy={s.sy(N(t))} r="6" fill="var(--color-violet)" stroke="white" strokeWidth="2" />
        </g>
        <text x={s.sx(T_MAX)} y={s.sy(0) - 5} fontSize="10" fontStyle="italic" textAnchor="end" fill="var(--color-ink)">
          t
        </text>
      </svg>

      <div className="mt-2 space-y-1">
        <LessonSlider label="שינוי" value={p} min={-50} max={50} step={5} onChange={setP} color="var(--color-teal)" suffix="%" width="w-12" />
        <LessonSlider label={<i dir="ltr">t</i>} value={t} min={0} max={T_MAX} onChange={setT} color="var(--color-violet)" width="w-12" />
      </div>

      <div className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]">
        <MathRenderer inline>{`$N(${t})=100\\cdot${fmt(q)}^{${t}}\\approx${fmt(N(t))}$`}</MathRenderer>
        <div className="mt-1 text-xs font-semibold text-[var(--color-slate)]">
          {q === 1 ? (
            'בלי שינוי — הכמות קבועה'
          ) : q > 1 ? (
            <>
              גדילה: <span dir="ltr">q = {fmt(q)} &gt; 1</span> · זמן הכפלה ≈ <span dir="ltr">{fmt(special)}</span>
            </>
          ) : (
            <>
              דעיכה: <span dir="ltr">q = {fmt(q)} &lt; 1</span> · זמן מחצית חיים ≈ <span dir="ltr">{fmt(special)}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
