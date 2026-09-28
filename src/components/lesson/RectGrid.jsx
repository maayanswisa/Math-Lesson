import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * מלבן משבצות: סליידרים לאורך ולרוחב. מראה את השטח (כמה משבצות)
 * ואת ההיקף (כמה צלעות של משבצות מסביב) — שני דברים שונים.
 */
export default function RectGrid({ caption, l: l0 = 4, w: w0 = 3, max = 8, showPerimeter = false }) {
  const [l, setL] = useState(l0);
  const [w, setW] = useState(w0);
  const cell = Math.min(34, 280 / max);

  const sliders = [
    { label: 'אורך', value: l, set: setL, color: 'var(--color-teal)' },
    { label: 'רוחב', value: w, set: setW, color: 'var(--color-coral)' },
  ];

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <p className="mb-3 text-[var(--color-ink)]">{caption}</p>}

      <div className="flex justify-center" dir="ltr">
        <div
          className="grid gap-0.5 rounded-md p-0.5"
          style={{
            gridTemplateColumns: `repeat(${l}, ${cell}px)`,
            outline: showPerimeter ? '4px solid var(--color-violet)' : 'none',
            outlineOffset: 1,
          }}
        >
          {Array.from({ length: l * w }, (_, i) => (
            <motion.span
              key={`${l}-${w}-${i}`}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.008 }}
              className="flex items-center justify-center rounded-sm bg-[var(--color-teal)]/25 text-[10px] font-bold text-[var(--color-teal-dark)] ring-1 ring-[var(--color-teal)]/40"
              style={{ height: cell }}
            >
              {i + 1}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-1">
        {sliders.map((s) => (
          <label key={s.label} className="flex items-center gap-2 text-sm font-semibold">
            <span className="w-12" style={{ color: s.color }}>
              {s.label}
            </span>
            <input
              type="range"
              dir="ltr"
              min={1}
              max={max}
              value={s.value}
              onChange={(e) => s.set(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: s.color }}
            />
            <span className="w-6 text-center font-bold" style={{ color: s.color }}>
              {s.value}
            </span>
          </label>
        ))}
      </div>

      <div className={`mt-3 grid gap-2 text-center ${showPerimeter ? 'sm:grid-cols-2' : ''}`}>
        <p className="rounded-xl bg-[var(--color-teal)]/10 p-2 font-bold text-[var(--color-teal-dark)]">
          שטח: {l} × {w} = {l * w} משבצות
        </p>
        {showPerimeter && (
          <p className="rounded-xl bg-[var(--color-violet)]/10 p-2 font-bold text-[var(--color-violet-dark)]">
            היקף (הקו הסגול): {l} + {w} + {l} + {w} = {2 * (l + w)}
          </p>
        )}
      </div>
    </div>
  );
}
