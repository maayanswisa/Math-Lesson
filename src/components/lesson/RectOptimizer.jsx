import { useState } from 'react';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider, { fmt } from './LessonSlider';
import { Axes, fnPath, makeScale } from './PlotAxes';

/**
 * מלבן עם היקף קבוע P (או גדר ל-3 צדדים ליד קיר, wall).
 * משנים צלע x ורואים את המלבן ואת גרף השטח S(x) — פרבולה הפוכה.
 */
export default function RectOptimizer({ caption, P = 40, wall = false }) {
  const xMax = P / 2;
  const [x, setX] = useState(P / 8);
  const other = wall ? P - 2 * x : P / 2 - x;
  const S = (t) => (wall ? t * (P - 2 * t) : t * (P / 2 - t));
  const best = P / 4;
  const sMax = S(best);
  const s = makeScale({ W: 300, H: 180, x0: 0, x1: xMax, y0: 0, y1: sMax * 1.15, pad: 26 });
  const scale = Math.min(200 / Math.max(other, 0.1), 110 / Math.max(x, 0.1));
  const rw = other * scale;
  const rh = x * scale;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
      <svg viewBox="0 0 300 150" className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
        {wall && <line x1={150 - rw / 2 - 12} y1={10} x2={150 + rw / 2 + 12} y2={10} stroke="var(--color-slate)" strokeWidth="6" />}
        <rect
          x={150 - rw / 2}
          y={12}
          width={Math.max(rw, 1)}
          height={Math.max(rh, 1)}
          fill="rgba(13,110,110,0.15)"
          stroke="var(--color-teal)"
          strokeWidth="2.5"
        />
        {wall && <line x1={150 - rw / 2} y1={12} x2={150 + rw / 2} y2={12} stroke="white" strokeWidth="3" />}
        <text x={150} y={12 + rh + 16} fontSize="11" fontWeight="700" textAnchor="middle" fill="var(--color-coral)">
          {fmt(other)}
        </text>
        <text x={150 - rw / 2 - 6} y={12 + rh / 2 + 4} fontSize="11" fontWeight="700" textAnchor="end" fill="var(--color-violet)">
          x = {fmt(x)}
        </text>
      </svg>
      <LessonSlider label="x" value={x} min={0.5} max={xMax - 0.5} step={0.5} onChange={setX} color="var(--color-violet)" />
      <svg viewBox={`0 0 ${s.W} ${s.H}`} className="mx-auto mt-2 w-full max-w-sm" style={{ direction: 'ltr' }}>
        <Axes s={s} step={xMax / 10} yStep={sMax / 4} labelEvery={2} yLabel="S" />
        <path d={fnPath(S, s)} fill="none" stroke="var(--color-teal)" strokeWidth="2.5" />
        <line x1={s.sx(x)} y1={s.sy(0)} x2={s.sx(x)} y2={s.sy(S(x))} stroke="var(--color-violet)" strokeDasharray="4 3" />
        <circle cx={s.sx(x)} cy={s.sy(S(x))} r="5" fill="var(--color-violet)" />
      </svg>
      <div className="mt-2 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]">
        <MathRenderer inline>{`$S=${fmt(x)}\\cdot${fmt(other)}=${fmt(S(x))}$`}</MathRenderer>
        <div className="mt-1 text-xs font-semibold text-[var(--color-slate)]">
          {Math.abs(x - best) < 1e-9 ? '🎉 זה השטח המקסימלי!' : 'הזיזו את x — מתי השטח הכי גדול?'}
        </div>
      </div>
    </div>
  );
}
