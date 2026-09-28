import { useState } from 'react';
import { motion } from 'framer-motion';

const FACES = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

/**
 * סימולציית הטלות קובייה: מראה איך השכיחות היחסית של כל פאה
 * מתקרבת להסתברות 1/6 ככל שמטילים יותר פעמים.
 */
export default function DiceSim({ caption }) {
  const [counts, setCounts] = useState([0, 0, 0, 0, 0, 0]);
  const [last, setLast] = useState(null);
  const total = counts.reduce((a, b) => a + b, 0);

  function roll(n) {
    const next = [...counts];
    let face = 0;
    for (let i = 0; i < n; i++) {
      face = Math.floor(Math.random() * 6);
      next[face] += 1;
    }
    setCounts(next);
    setLast(face);
  }

  const six = total ? counts[5] / total : 0;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <p className="mb-3 text-[var(--color-ink)]">{caption}</p>}

      <div className="flex items-end justify-center gap-2" dir="ltr" style={{ height: 140 }}>
        {counts.map((cnt, i) => {
          const rel = total ? cnt / total : 0;
          return (
            <div key={i} className="flex w-10 flex-col items-center gap-1">
              <span className="text-[10px] font-bold text-[var(--color-slate)]">{total ? `${Math.round(rel * 100)}%` : ''}</span>
              <div className="relative flex h-24 w-full items-end overflow-hidden rounded-md bg-[var(--color-mist)]">
                {/* קו ההסתברות התיאורטית 1/6 */}
                <div className="absolute inset-x-0 border-t-2 border-dashed border-[var(--color-coral)]" style={{ bottom: `${(100 / 6) * 2}%` }} />
                <motion.div
                  className="w-full rounded-t-md"
                  style={{ backgroundColor: i === 5 ? 'var(--color-violet)' : 'var(--color-teal)' }}
                  initial={false}
                  animate={{ height: `${Math.min(100, rel * 200)}%` }}
                  transition={{ type: 'spring', stiffness: 140, damping: 20 }}
                />
              </div>
              <motion.span
                key={`${i}-${total}`}
                animate={last === i ? { scale: [1, 1.4, 1] } : {}}
                className="text-2xl leading-none"
              >
                {FACES[i]}
              </motion.span>
            </div>
          );
        })}
      </div>
      <p className="mt-1 text-center text-xs text-[var(--color-coral)]">- - - קו מקווקו = ההסתברות התיאורטית ⅙ (כ-17%)</p>

      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {[1, 10, 100, 1000].map((n) => (
          <motion.button
            key={n}
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => roll(n)}
            className="rounded-xl bg-[var(--color-teal)] px-3 py-2 text-sm font-bold text-white shadow-sm hover:bg-[var(--color-teal-dark)]"
          >
            🎲 ×{n}
          </motion.button>
        ))}
        <button
          type="button"
          onClick={() => {
            setCounts([0, 0, 0, 0, 0, 0]);
            setLast(null);
          }}
          className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-[var(--color-slate)] ring-1 ring-black/10"
        >
          ↺ איפוס
        </button>
      </div>

      <p className="mt-3 text-center text-sm font-semibold text-[var(--color-ink)]">
        {total === 0
          ? 'הטילו את הקובייה וראו מה קורה'
          : `הטלות: ${total} · יצא 6 ב-${counts[5]} מהן → שכיחות יחסית ${six.toFixed(3)} (ההסתברות: 0.167)`}
      </p>
    </div>
  );
}
