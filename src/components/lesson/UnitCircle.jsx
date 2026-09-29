import { useState } from 'react';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider, { fmt } from './LessonSlider';

const O = { x: 130, y: 120 };
const R = 90;
const rad = (d) => (d * Math.PI) / 180;
const pt = (deg, r = R) => ({ x: O.x + r * Math.cos(rad(deg)), y: O.y - r * Math.sin(rad(deg)) });

function arc(deg, r) {
  const e = pt(deg, r);
  const large = ((deg % 360) + 360) % 360 > 180 ? 1 : 0;
  return `M${O.x + r},${O.y} A${r},${r} 0 ${large} 0 ${e.x},${e.y}`;
}

/**
 * מעגל היחידה: נקודה בזווית α היא (cos α, sin α).
 * mode="double" — מוסיף את הזווית 2α ומראה ש-sin 2α = 2·sin α·cos α.
 */
export default function UnitCircle({ caption, mode = 'basic', angle: a0 = 35 }) {
  const [a, setA] = useState(a0);
  const P = pt(a);
  const c = Math.cos(rad(a));
  const sn = Math.sin(rad(a));
  const P2 = pt(2 * a);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
      <svg viewBox="0 0 260 240" className="mx-auto w-full max-w-xs" style={{ direction: 'ltr' }}>
        <line x1={O.x - R - 15} y1={O.y} x2={O.x + R + 15} y2={O.y} stroke="var(--color-slate)" />
        <line x1={O.x} y1={O.y - R - 15} x2={O.x} y2={O.y + R + 15} stroke="var(--color-slate)" />
        <circle cx={O.x} cy={O.y} r={R} fill="none" stroke="var(--color-ink)" strokeWidth="1.5" />
        <path d={arc(a, 22)} fill="none" stroke="var(--color-violet)" strokeWidth="2.5" />
        {mode === 'double' && (
          <>
            <path d={arc(2 * a, 34)} fill="none" stroke="var(--color-sunshine)" strokeWidth="2.5" />
            <line x1={O.x} y1={O.y} x2={P2.x} y2={P2.y} stroke="var(--color-sunshine)" strokeWidth="2.5" />
            <line x1={P2.x} y1={O.y} x2={P2.x} y2={P2.y} stroke="var(--color-sunshine)" strokeWidth="2" strokeDasharray="4 3" />
            <circle cx={P2.x} cy={P2.y} r="5" fill="var(--color-sunshine)" />
          </>
        )}
        <line x1={O.x} y1={O.y} x2={P.x} y2={P.y} stroke="var(--color-ink)" strokeWidth="2.5" />
        <line x1={O.x} y1={O.y} x2={P.x} y2={O.y} stroke="var(--color-sky)" strokeWidth="4" />
        <line x1={P.x} y1={O.y} x2={P.x} y2={P.y} stroke="var(--color-coral)" strokeWidth="4" />
        <circle cx={P.x} cy={P.y} r="5.5" fill="var(--color-violet)" />
        <text x={(O.x + P.x) / 2} y={O.y + (sn >= 0 ? 15 : -7)} fontSize="11" fontWeight="700" textAnchor="middle" fill="var(--color-sky-dark)">
          cos
        </text>
        <text
          x={P.x + (c >= 0 ? 6 : -6)}
          y={(O.y + P.y) / 2 + 4}
          fontSize="11"
          fontWeight="700"
          textAnchor={c >= 0 ? 'start' : 'end'}
          fill="var(--color-coral)"
        >
          sin
        </text>
        <text x={O.x + 26} y={O.y - 6} fontSize="11" fontWeight="700" fill="var(--color-violet)">
          α
        </text>
      </svg>

      <LessonSlider label="α" value={a} min={0} max={mode === 'double' ? 170 : 360} step={5} onChange={setA} color="var(--color-violet)" suffix="°" />

      <div className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]" dir="ltr">
        <div>
          <span className="text-[var(--color-sky-dark)]">
            cos {a}° = {fmt(c)}
          </span>{' '}
          ·{' '}
          <span className="text-[var(--color-coral)]">
            sin {a}° = {fmt(sn)}
          </span>
        </div>
        {mode === 'double' ? (
          <div className="mt-1 text-[var(--color-sunshine-dark)]">
            sin {2 * a}° = {fmt(Math.sin(rad(2 * a)))} = 2 · {fmt(sn)} · {fmt(c)}
          </div>
        ) : (
          <div className="mt-1 text-xs text-[var(--color-slate)]">
            cos² + sin² = {fmt(c * c)} + {fmt(sn * sn)} = 1
          </div>
        )}
      </div>
    </div>
  );
}
