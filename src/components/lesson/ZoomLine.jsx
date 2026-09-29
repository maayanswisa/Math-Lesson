import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';

const W = 320;
const PAD = 20;
const trim = (n) => String(Number(n.toFixed(8)));

/**
 * צפיפות: קטע על ישר המספרים מחולק ל-10. לוחצים על קטע קטן — ומגדילים אותו,
 * ושוב יש בו 10 חלקים. תמיד אפשר למצוא עוד מספר בין שני מספרים.
 */
export default function ZoomLine({ caption, from = 0, to = 1 }) {
  const [range, setRange] = useState([from, to]);
  const [lo, hi] = range;
  const step = (hi - lo) / 10;
  const X = (v) => PAD + ((v - lo) / (hi - lo)) * (W - 2 * PAD);
  const depth = Math.round(Math.log10((to - from) / (hi - lo)));

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
      <svg viewBox={`0 0 ${W} 90`} className="mx-auto w-full max-w-md" style={{ direction: 'ltr' }}>
        <line x1={PAD} y1="40" x2={W - PAD} y2="40" stroke="var(--color-ink)" strokeWidth="2" />
        {Array.from({ length: 10 }, (_, i) => (
          <motion.rect
            key={`${lo}-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            x={X(lo + i * step) + 1}
            y="28"
            width={X(lo + step) - X(lo) - 2}
            height="24"
            rx="4"
            fill={i % 2 ? 'rgba(124,77,204,0.15)' : 'rgba(13,110,110,0.15)'}
            style={{ cursor: depth < 3 ? 'zoom-in' : 'default' }}
            onClick={() => depth < 3 && setRange([lo + i * step, lo + (i + 1) * step])}
          />
        ))}
        {Array.from({ length: 11 }, (_, i) => lo + i * step).map((v, i) => (
          <g key={i}>
            <line
              x1={X(v)}
              y1={i % 5 === 0 ? 30 : 34}
              x2={X(v)}
              y2={i % 5 === 0 ? 50 : 46}
              stroke="var(--color-ink)"
              strokeWidth={i % 5 === 0 ? 1.8 : 1}
            />
            {(i % 5 === 0 || depth === 0) && (
              <text x={X(v)} y="68" fontSize={depth > 1 ? 8 : 9} fontWeight={i % 10 === 0 ? 800 : 400} textAnchor="middle" fill="var(--color-ink)">
                {trim(v)}
              </text>
            )}
          </g>
        ))}
      </svg>
      <div className="flex justify-center gap-2">
        <button
          type="button"
          onClick={() => setRange([from, to])}
          disabled={depth === 0}
          className="rounded-xl bg-white px-3 py-1.5 text-sm font-semibold text-[var(--color-slate)] ring-1 ring-black/10 disabled:opacity-40"
        >
          ↺ חזרה להתחלה
        </button>
      </div>
      <p className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]">
        {depth < 3 ? 'לחצו על אחד הקטעים כדי להגדיל אותו 🔍' : 'אפשר היה להמשיך עוד ועוד — לעולם לא נגמרים המספרים!'}
        <span className="block text-xs font-semibold text-[var(--color-slate)]">
          בין <span dir="ltr">{trim(lo)}</span> ל-<span dir="ltr">{trim(hi)}</span> יש עוד 9 מספרים בקפיצות של <span dir="ltr">{trim(step)}</span>
        </span>
      </p>
    </div>
  );
}
