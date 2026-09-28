import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';

const COLORS = ['var(--color-teal)', 'var(--color-coral)', 'var(--color-violet)'];
const BG = ['rgba(13,110,110,0.08)', 'rgba(196,92,72,0.08)', 'rgba(124,77,204,0.08)'];

/** פס אחד של שבר: שלמים שלמים (שורה לכל שלם), מחולקים ל-d חלקים, n צבועים. */
function Bar({ n, d, color, bg, k = 1 }) {
  const wholes = Math.max(1, Math.ceil(n / d));
  const parts = d * k;
  const filled = n * k;
  return (
    <div className="space-y-1" dir="ltr">
      {Array.from({ length: wholes }, (_, w) => (
        <div key={w} className="flex h-9 overflow-hidden rounded-lg ring-2" style={{ '--tw-ring-color': color, backgroundColor: bg }}>
          {Array.from({ length: parts }, (_, i) => {
            const on = w * parts + i < filled;
            // קו עבה בגבולות החלקים המקוריים, דק בגבולות החלקים החדשים (בהרחבה)
            const major = (i + 1) % k === 0;
            return (
              <motion.div
                key={i}
                className="h-full flex-1"
                initial={false}
                animate={{ backgroundColor: on ? color : 'rgba(255,255,255,0)' }}
                transition={{ duration: 0.25, delay: on ? i * 0.02 : 0 }}
                style={{
                  borderRight: i < parts - 1 ? `${major ? 2 : 1}px ${major ? 'solid' : 'dashed'} rgba(26,43,60,${major ? 0.45 : 0.3})` : 'none',
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

function Stepper({ label, value, min, max, onChange, color }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm">
      <span className="text-[var(--color-slate)]">{label}</span>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="h-7 w-7 rounded-full bg-white font-bold ring-1 ring-black/15 disabled:opacity-30"
        disabled={value <= min}
        aria-label={`הקטנת ${label}`}
      >
        −
      </button>
      <span className="w-6 text-center font-bold" style={{ color }}>
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="h-7 w-7 rounded-full bg-white font-bold ring-1 ring-black/15 disabled:opacity-30"
        disabled={value >= max}
        aria-label={`הגדלת ${label}`}
      >
        +
      </button>
    </span>
  );
}

const frac = (n, d) => `\\frac{${n}}{${d}}`;

/**
 * פסי שברים.
 * mode 'show'    — פסים (אפשר editable עם כפתורי +/− למונה ולמכנה).
 * mode 'expand'  — שבר אחד + סליידר "חותכים כל חלק ל-k": אותו שטח צבוע, שבר שקול.
 * mode 'compare' — שני פסים ניתנים לשינוי, וסימן >,<,= ביניהם.
 */
export default function FractionBars({ caption, mode = 'show', bars: bars0, editable = false, maxD = 12 }) {
  const [bars, setBars] = useState(bars0);
  const [k, setK] = useState(1);
  const update = (i, patch) => setBars((bs) => bs.map((b, j) => (j === i ? { ...b, ...patch } : b)));

  const [a, b] = bars;
  const sign = mode === 'compare' && b ? (a.n * b.d > b.n * a.d ? '>' : a.n * b.d < b.n * a.d ? '<' : '=') : null;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-3 text-[var(--color-ink)]">{caption}</MathRenderer>}

      <div className="space-y-4">
        {bars.map((bar, i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xl" style={{ color: COLORS[i % 3] }}>
                <MathRenderer inline>
                  {mode === 'expand' && k > 1
                    ? `$${frac(bar.n, bar.d)}=${frac(`${bar.n}\\times${k}`, `${bar.d}\\times${k}`)}=${frac(bar.n * k, bar.d * k)}$`
                    : `$${frac(bar.n, bar.d)}$${bar.label ? ` — ${bar.label}` : ''}`}
                </MathRenderer>
              </span>
              {(editable || mode === 'compare') && (
                <span className="flex flex-wrap gap-2">
                  <Stepper label="מונה" value={bar.n} min={0} max={bar.d * 2} color={COLORS[i % 3]} onChange={(v) => update(i, { n: v })} />
                  <Stepper
                    label="מכנה"
                    value={bar.d}
                    min={1}
                    max={maxD}
                    color={COLORS[i % 3]}
                    onChange={(v) => update(i, { d: v, n: Math.min(bar.n, v * 2) })}
                  />
                </span>
              )}
            </div>
            <Bar n={bar.n} d={bar.d} k={mode === 'expand' ? k : 1} color={COLORS[i % 3]} bg={BG[i % 3]} />
            {sign && i === 0 && (
              <p className="py-1 text-center text-3xl font-extrabold text-[var(--color-ink)]" dir="ltr">
                <MathRenderer inline>{`$${frac(a.n, a.d)}\\ ${sign}\\ ${frac(b.n, b.d)}$`}</MathRenderer>
              </p>
            )}
          </div>
        ))}
      </div>

      {mode === 'expand' && (
        <label className="mt-4 flex items-center gap-3 text-sm font-semibold text-[var(--color-ink)]">
          <span className="whitespace-nowrap">חותכים כל חלק ל-</span>
          <input
            type="range"
            dir="ltr"
            min={1}
            max={5}
            value={k}
            onChange={(e) => setK(Number(e.target.value))}
            className="w-full accent-[var(--color-teal)]"
          />
          <span className="w-8 font-bold text-[var(--color-teal-dark)]">{k}</span>
        </label>
      )}
      {mode === 'expand' && (
        <p className="mt-2 text-center text-sm text-[var(--color-slate)]">
          {k === 1 ? 'הזיזו את הסליידר — החלקים מתחלקים, אבל השטח הצבוע לא משתנה!' : 'אותו שטח צבוע בדיוק — אלה שברים שווים.'}
        </p>
      )}
    </div>
  );
}
