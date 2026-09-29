import { useState } from 'react';
import MathRenderer from '../ui/MathRenderer';

const COLORS = ['var(--color-teal)', 'var(--color-coral)', 'var(--color-violet)', 'var(--color-sunshine)', 'var(--color-sky)', 'var(--color-berry)'];
const C = 90;
const R = 80;

function slicePath(a0, a1) {
  const p = (a) => `${C + R * Math.cos(a)},${C + R * Math.sin(a)}`;
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M${C},${C} L${p(a0)} A${R},${R} 0 ${large} 1 ${p(a1)} Z`;
}

/**
 * דיאגרמת עוגה. items: [{ label, value }]. לחיצה על פרוסה מראה את החלק שלה
 * כשבר מהשלם, וכמה זה בפועל (אם נתון total).
 */
export default function PieChart({ caption, items, total }) {
  const [sel, setSel] = useState(null);
  const sum = items.reduce((a, b) => a + b.value, 0);
  let angle = -Math.PI / 2;
  const slices = items.map((it, i) => {
    const a0 = angle;
    angle += (it.value / sum) * 2 * Math.PI;
    return { ...it, a0, a1: angle, color: COLORS[i % COLORS.length], i };
  });
  const s = sel !== null ? slices[sel] : null;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <svg viewBox="0 0 180 180" width="180" style={{ direction: 'ltr', maxWidth: '100%' }}>
          {slices.map((sl) => (
            <path
              key={sl.i}
              d={slicePath(sl.a0, sl.a1)}
              fill={sl.color}
              opacity={sel === null || sel === sl.i ? 1 : 0.35}
              stroke="white"
              strokeWidth="2"
              onClick={() => setSel(sel === sl.i ? null : sl.i)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </svg>
        <div className="space-y-1">
          {slices.map((sl) => (
            <button
              key={sl.i}
              type="button"
              onClick={() => setSel(sel === sl.i ? null : sl.i)}
              className={`flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-bold ${sel === sl.i ? 'bg-[var(--color-mist)]' : ''}`}
            >
              <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: sl.color }} />
              {sl.label}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]">
        {s ? (
          <>
            {s.label}: <MathRenderer inline>{`$\\frac{${s.value}}{${sum}}$`}</MathRenderer> מהעוגה
            {total && (
              <>
                {' '}
                — מתוך <span dir="ltr">{total}</span>, זה <span dir="ltr">{(total * s.value) / sum}</span>
              </>
            )}
          </>
        ) : (
          'לחצו על פרוסה'
        )}
      </p>
    </div>
  );
}
