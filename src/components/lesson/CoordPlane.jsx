import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';

const SIZE = 300;
const MID = SIZE / 2;
const fmt = (n) => String(Number(n.toFixed(2)));

function quadrant(x, y) {
  if (x === 0 && y === 0) return 'ראשית הצירים';
  if (x === 0) return 'על ציר y';
  if (y === 0) return 'על ציר x';
  if (x > 0) return y > 0 ? 'רביע I' : 'רביע IV';
  return y > 0 ? 'רביע II' : 'רביע III';
}

function Slider({ label, value, min, max, onChange, color }) {
  return (
    <label className="flex items-center gap-2 text-sm font-semibold">
      <span dir="ltr" className="w-12 shrink-0 whitespace-nowrap italic" style={{ color }}>
        {label}
      </span>
      <input
        type="range"
        dir="ltr"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{ accentColor: color }}
      />
      <span dir="ltr" className="w-8 text-end font-bold" style={{ color }}>
        {value}
      </span>
    </label>
  );
}

/**
 * מערכת צירים עם נקודה שמזיזים בסליידרים ורואים באיזה רביע היא.
 * distance — נקודה שנייה, והמרחק ביניהן כיתר של משולש ישר-זווית (פיתגורס).
 * firstOnly — מציג רק את הרביע הראשון (x, y חיוביים).
 */
export default function CoordPlane({ caption, x: x0 = 2, y: y0 = 3, range = 6, distance = false, x2: x20 = -2, y2: y20 = -1, firstOnly = false }) {
  const [x, setX] = useState(x0);
  const [y, setY] = useState(y0);
  const [x2, setX2] = useState(x20);
  const [y2, setY2] = useState(y20);

  const lo = firstOnly ? 0 : -range;
  const span = range - lo;
  const unit = (SIZE - 24) / span;
  const px = (v) => 12 + (v - lo) * unit;
  const py = (v) => SIZE - 12 - (v - lo) * unit;
  const grid = Array.from({ length: span + 1 }, (_, i) => lo + i);

  const dx = Math.abs(x2 - x);
  const dy = Math.abs(y2 - y);
  const d = Math.sqrt(dx * dx + dy * dy);

  const labelFor = (vx, vy, color, name) => {
    const right = vx < range - 2;
    return (
      <motion.text
        initial={false}
        animate={{ x: px(vx) + (right ? 9 : -9), y: py(vy) + (vy > range - 1 ? 16 : -8) }}
        fontSize="12"
        fontWeight="800"
        textAnchor={right ? 'start' : 'end'}
        fill={color}
        stroke="white"
        strokeWidth="3"
        paintOrder="stroke"
      >
        {name}({vx}, {vy})
      </motion.text>
    );
  };

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}

      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="mx-auto w-full max-w-xs" style={{ direction: 'ltr' }}>
        {grid.map((g) => (
          <g key={g}>
            <line x1={px(g)} y1={py(lo)} x2={px(g)} y2={py(range)} stroke="#e3e8ee" strokeWidth="1" />
            <line x1={px(lo)} y1={py(g)} x2={px(range)} y2={py(g)} stroke="#e3e8ee" strokeWidth="1" />
            {g !== 0 && g % (range > 6 ? 2 : 1) === 0 && (
              <>
                <text x={px(g)} y={py(0) + 13} fontSize="9" textAnchor="middle" fill="var(--color-slate)">
                  {g}
                </text>
                <text x={px(0) - 5} y={py(g) + 3} fontSize="9" textAnchor="end" fill="var(--color-slate)">
                  {g}
                </text>
              </>
            )}
          </g>
        ))}
        <line x1={px(lo)} y1={py(0)} x2={px(range)} y2={py(0)} stroke="var(--color-ink)" strokeWidth="2" />
        <line x1={px(0)} y1={py(lo)} x2={px(0)} y2={py(range)} stroke="var(--color-ink)" strokeWidth="2" />
        <text x={px(range) - 4} y={py(0) - 6} fontSize="12" fontStyle="italic" fontWeight="700" textAnchor="end" fill="var(--color-ink)">
          x
        </text>
        <text x={px(0) + 6} y={py(range) + 12} fontSize="12" fontStyle="italic" fontWeight="700" fill="var(--color-ink)">
          y
        </text>
        {!firstOnly &&
          !distance &&
          [
            ['I', range / 2, range / 2],
            ['II', -range / 2, range / 2],
            ['III', -range / 2, -range / 2],
            ['IV', range / 2, -range / 2],
          ].map(([n, qx, qy]) => (
            <text key={n} x={px(qx)} y={py(qy) + 8} fontSize="22" fontWeight="800" textAnchor="middle" fill="rgba(74,93,115,0.15)">
              {n}
            </text>
          ))}

        {distance ? (
          <>
            <motion.polyline
              initial={false}
              animate={{ points: `${px(x)},${py(y)} ${px(x2)},${py(y)} ${px(x2)},${py(y2)}` }}
              fill="none"
              stroke="var(--color-sunshine)"
              strokeWidth="3"
              strokeDasharray="6 4"
            />
            <motion.line initial={false} animate={{ x1: px(x), y1: py(y), x2: px(x2), y2: py(y2) }} stroke="var(--color-violet)" strokeWidth="3.5" />
            <motion.circle initial={false} animate={{ cx: px(x2), cy: py(y2) }} r="6" fill="var(--color-coral)" />
            {labelFor(x2, y2, 'var(--color-coral)', 'B')}
          </>
        ) : (
          <>
            <motion.line initial={false} animate={{ x1: px(x), y1: py(0), x2: px(x), y2: py(y) }} stroke="var(--color-teal)" strokeWidth="2" strokeDasharray="4 3" />
            <motion.line initial={false} animate={{ x1: px(0), y1: py(y), x2: px(x), y2: py(y) }} stroke="var(--color-sky)" strokeWidth="2" strokeDasharray="4 3" />
          </>
        )}
        <motion.circle initial={false} animate={{ cx: px(x), cy: py(y) }} r="6" fill="var(--color-teal)" />
        {labelFor(x, y, 'var(--color-teal-dark)', distance ? 'A' : '')}
      </svg>

      <div className="mt-2 space-y-1">
        <Slider label={distance ? 'A: x' : 'x'} value={x} min={lo} max={range} onChange={setX} color="var(--color-teal)" />
        <Slider label={distance ? 'A: y' : 'y'} value={y} min={lo} max={range} onChange={setY} color="var(--color-sky-dark)" />
        {distance && (
          <>
            <Slider label="B: x" value={x2} min={lo} max={range} onChange={setX2} color="var(--color-coral)" />
            <Slider label="B: y" value={y2} min={lo} max={range} onChange={setY2} color="var(--color-coral-dark)" />
          </>
        )}
      </div>

      <p className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]">
        {distance ? (
          <>
            ניצבים: <span dir="ltr">{dx}</span> ו-<span dir="ltr">{dy}</span> · המרחק:{' '}
            <span dir="ltr">
              √({dx}² + {dy}²) = √{dx * dx + dy * dy} {Number.isInteger(d) ? `= ${d}` : `≈ ${fmt(d)}`}
            </span>
          </>
        ) : (
          <>
            הנקודה <span dir="ltr">({x}, {y})</span> — {quadrant(x, y)}
            <span className="block text-xs font-semibold text-[var(--color-slate)]">
              קודם <span dir="ltr">x</span> (ימינה/שמאלה), אחר כך <span dir="ltr">y</span> (למעלה/למטה)
            </span>
          </>
        )}
      </p>
    </div>
  );
}
