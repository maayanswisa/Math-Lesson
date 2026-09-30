import { useState } from 'react';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider, { fmt } from './LessonSlider';
import { Axes, makeScale, usePlotClip } from './PlotAxes';

const s = makeScale({ W: 300, H: 280, x0: -1, x1: 13, y0: -1, y1: 13, pad: 14 });

// קצוות תחום הפתרונות של: x+y≤10, x+2y≤16 (אם לא מוגדר אחרת), x,y≥0
const VERTS = [
  [0, 0],
  [10, 0],
  [4, 6],
  [0, 8],
];

/**
 * תכנון לינארי: תחום פתרונות (מצולע) וקו פונקציית המטרה z = ax + by.
 * מזיזים את ערך z — הקו זז במקביל, והמקסימום מתקבל בקודקוד האחרון שהוא נוגע בו.
 */
export default function LinearProgram({ caption, a = 3, b = 4 }) {
  const zMax = Math.max(...VERTS.map(([x, y]) => a * x + b * y));
  const best = VERTS.find(([x, y]) => a * x + b * y === zMax);
  const [z, setZ] = useState(Math.round(zMax / 2));
  const { defs, clip } = usePlotClip(s);
  const line = (x) => (z - a * x) / b;
  const touching = VERTS.filter(([x, y]) => a * x + b * y === z);
  const inside = z <= zMax;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
      <svg viewBox={`0 0 ${s.W} ${s.H}`} className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
        {defs}
        <Axes s={s} />
        <polygon
          points={VERTS.map(([x, y]) => `${s.sx(x)},${s.sy(y)}`).join(' ')}
          fill="rgba(13,110,110,0.18)"
          stroke="var(--color-teal)"
          strokeWidth="2"
        />
        <line x1={s.sx(-1)} y1={s.sy(line(-1))} x2={s.sx(13)} y2={s.sy(line(13))} stroke="var(--color-coral)" strokeWidth="2.5" clipPath={clip} />
        {VERTS.map(([x, y]) => (
          <g key={`${x},${y}`}>
            <circle
              cx={s.sx(x)}
              cy={s.sy(y)}
              r="5"
              fill={touching.some(([tx, ty]) => tx === x && ty === y) ? 'var(--color-coral)' : 'var(--color-teal)'}
            />
            <text x={s.sx(x) + 6} y={s.sy(y) - 6} fontSize="10" fontWeight="700" fill="var(--color-ink)">
              ({x},{y})
            </text>
          </g>
        ))}
      </svg>
      <LessonSlider label="z" value={z} min={0} max={zMax + 10} step={1} onChange={setZ} color="var(--color-coral)" />
      <div className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]">
        <MathRenderer inline>{`$${a}x+${b}y=${z}$`}</MathRenderer>
        <div className="mt-1 text-xs font-semibold text-[var(--color-slate)]">
          {!inside ? (
            'הקו כבר לא נוגע בתחום — אין פתרון עם z כזה'
          ) : z === zMax ? (
            <>
              🎉 המקסימום: <span dir="ltr">z = {fmt(zMax)}</span> בקודקוד <span dir="ltr">({best.join(',')})</span>
            </>
          ) : (
            'הגדילו את z — הקו זז במקביל. איפה הוא עוזב את התחום?'
          )}
        </div>
      </div>
    </div>
  );
}
