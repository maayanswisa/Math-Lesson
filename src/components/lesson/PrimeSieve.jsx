import { useState } from 'react';
import { motion } from 'framer-motion';

const N = 50;
const SIEVE = [2, 3, 5, 7];
const COLORS = { 2: 'var(--color-sky)', 3: 'var(--color-coral)', 5: 'var(--color-sunshine)', 7: 'var(--color-violet)' };

/**
 * הנפה של ארטוסתנס עד 50: בכל לחיצה מוחקים את הכפולות של הראשוני הבא
 * (בלי הראשוני עצמו). מה שנשאר — מספרים ראשוניים.
 */
export default function PrimeSieve({ caption }) {
  const [done, setDone] = useState(0); // כמה מהראשוניים 2,3,5,7 כבר "נופו"
  const crossedBy = {};
  for (const p of SIEVE.slice(0, done)) {
    for (let k = p * 2; k <= N; k += p) if (!crossedBy[k]) crossedBy[k] = p;
  }
  const finished = done === SIEVE.length;
  const next = SIEVE[done];

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <p className="mb-3 text-[var(--color-ink)]">{caption}</p>}

      <div className="mx-auto grid max-w-md grid-cols-10 gap-1" dir="ltr">
        {Array.from({ length: N }, (_, i) => i + 1).map((n) => {
          const by = crossedBy[n];
          const isOne = n === 1;
          const prime = finished && !by && !isOne;
          return (
            <motion.span
              key={n}
              initial={false}
              animate={{ scale: prime ? [1, 1.15, 1] : 1, opacity: by || isOne ? 0.35 : 1 }}
              transition={{ duration: 0.4, delay: prime ? n * 0.01 : 0 }}
              className={`relative flex aspect-square items-center justify-center rounded-md text-xs font-bold sm:text-sm ${
                prime ? 'bg-[var(--color-success)] text-white' : 'bg-[var(--color-mist)] text-[var(--color-ink)]'
              }`}
              style={SIEVE.includes(n) && done > SIEVE.indexOf(n) ? { boxShadow: `inset 0 0 0 2px ${COLORS[n]}` } : undefined}
            >
              {n}
              {by && (
                <span className="absolute inset-x-1 top-1/2 h-0.5 -rotate-12 rounded" style={{ backgroundColor: COLORS[by] }} />
              )}
            </motion.span>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {!finished ? (
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => setDone((d) => d + 1)}
            className="rounded-xl px-4 py-2 text-sm font-bold text-white shadow-sm"
            style={{ backgroundColor: COLORS[next] }}
          >
            מחקו את הכפולות של {next}
          </motion.button>
        ) : (
          <p className="rounded-xl bg-[var(--color-success)]/10 px-4 py-2 text-center text-sm font-bold text-[var(--color-success)]">
            🎉 הירוקים הם כל המספרים הראשוניים עד 50!
          </p>
        )}
        {done > 0 && (
          <button
            type="button"
            onClick={() => setDone(0)}
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[var(--color-slate)] ring-1 ring-black/10"
          >
            ↺ מההתחלה
          </button>
        )}
      </div>
      <p className="mt-2 text-center text-xs text-[var(--color-slate)]">1 אפור מההתחלה: הוא לא ראשוני ולא פריק.</p>
    </div>
  );
}
