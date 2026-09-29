import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';

const COLORS = ['var(--color-teal)', 'var(--color-coral)', 'var(--color-violet)', 'var(--color-sky)', 'var(--color-sunshine)', 'var(--color-berry)'];

/**
 * דיאגרמת עמודות של שכיחויות. editable — כפתורי +/− לכל עמודה.
 * relative — מציג גם שכיחות יחסית (אחוזים) ואת הסכום 100%.
 * truncate — כפתור שמתחיל את הציר ממספר גדול מאפס, כדי לראות איך זה מטעה.
 */
export default function FreqBars({ caption, items, editable = false, relative = false, truncate }) {
  const [counts, setCounts] = useState(items.map((i) => i.count));
  const [cut, setCut] = useState(false);
  const total = counts.reduce((a, b) => a + b, 0);
  const maxC = Math.max(1, ...counts);
  const base = cut && truncate ? truncate : 0;
  const height = (cnt) => `${Math.max(0, ((cnt - base) / (maxC - base || 1)) * 88)}%`;

  const change = (i, d) => setCounts((cs) => cs.map((c, j) => (j === i ? Math.max(0, Math.min(20, c + d)) : c)));

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-3 text-[var(--color-ink)]">{caption}</MathRenderer>}

      <div className="relative flex items-end justify-center gap-2 sm:gap-3" style={{ height: 150 }}>
        {counts.map((cnt, i) => (
          <div key={items[i].label} className="flex h-full w-12 flex-col items-center justify-end sm:w-14">
            <span className="text-xs font-extrabold text-[var(--color-ink)]">{cnt}</span>
            <motion.div
              className="w-full rounded-t-md"
              style={{ backgroundColor: COLORS[i % COLORS.length] }}
              initial={false}
              animate={{ height: height(cnt) }}
              transition={{ type: 'spring', stiffness: 140, damping: 20 }}
            />
          </div>
        ))}
        {base > 0 && (
          <span className="absolute bottom-0 start-0 rounded bg-[var(--color-coral)]/10 px-1 text-[10px] font-bold text-[var(--color-coral-dark)]">
            הציר מתחיל ב-{base}!
          </span>
        )}
      </div>
      <div className="flex justify-center gap-2 border-t-2 border-[var(--color-slate)] pt-1 sm:gap-3">
        {items.map((it, i) => (
          <div key={it.label} className="flex w-12 flex-col items-center sm:w-14">
            <span className="text-center text-xs font-bold leading-tight text-[var(--color-ink)]">{it.label}</span>
            {relative && total > 0 && (
              <span className="text-[11px] font-semibold text-[var(--color-violet)]">{Math.round((counts[i] / total) * 100)}%</span>
            )}
            {editable && (
              <div className="mt-1 flex gap-0.5">
                <button type="button" aria-label={`עוד ${it.label}`} onClick={() => change(i, 1)} className="h-6 w-6 rounded-md bg-[var(--color-teal)] text-sm font-bold text-white">
                  +
                </button>
                <button type="button" aria-label={`פחות ${it.label}`} onClick={() => change(i, -1)} className="h-6 w-6 rounded-md bg-white text-sm font-bold text-[var(--color-slate)] ring-1 ring-black/10">
                  −
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {truncate && (
        <div className="mt-3 flex justify-center">
          <button
            type="button"
            onClick={() => setCut((v) => !v)}
            className={`rounded-xl px-3 py-1.5 text-sm font-bold ${cut ? 'bg-[var(--color-coral)] text-white' : 'bg-white text-[var(--color-slate)] ring-1 ring-black/10'}`}
          >
            {cut ? 'הציר מתחיל מ-0 ↺' : `התחילו את הציר מ-${truncate} 🤔`}
          </button>
        </div>
      )}

      <p className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]">
        סך הכול: {total}
        {relative && total > 0 && <span className="block text-xs font-semibold text-[var(--color-violet)]">סכום כל השכיחויות היחסיות: 100%</span>}
        {cut && truncate && <span className="block text-xs font-semibold text-[var(--color-coral-dark)]">אותם מספרים בדיוק — אבל ההבדלים נראים ענקיים!</span>}
      </p>
    </div>
  );
}
