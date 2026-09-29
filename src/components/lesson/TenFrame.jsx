import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';

function Frame({ filled, colorAt }) {
  return (
    <div className="grid grid-cols-5 gap-1 rounded-xl bg-[var(--color-mist)] p-1.5" dir="ltr">
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} className="flex h-8 w-8 items-center justify-center rounded-lg bg-white ring-1 ring-black/10 sm:h-9 sm:w-9">
          {i < filled && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              className="h-6 w-6 rounded-full sm:h-7 sm:w-7"
              style={{ backgroundColor: colorAt(i) }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

const btn = 'h-10 w-10 rounded-xl text-xl font-extrabold shadow-sm';

/**
 * שתי מסגרות עשר. mode="count" — מוסיפים ומורידים נקודות, ורואים "עשר ועוד".
 * mode="add" — שתי קבוצות בצבעים שונים: a + b, וממלאים קודם עשר שלם.
 */
export default function TenFrame({ caption, mode = 'count', n: n0 = 7, a: a0 = 8, b: b0 = 5 }) {
  const [n, setN] = useState(n0);
  const [a, setA] = useState(a0);
  const [b, setB] = useState(b0);

  const total = mode === 'add' ? a + b : n;
  const color = (i) => (mode === 'add' ? (i < a ? 'var(--color-teal)' : 'var(--color-coral)') : 'var(--color-violet)');

  const stepper = (label, v, set, max, col) => (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label={`פחות ${label}`}
        onClick={() => set(Math.max(0, v - 1))}
        className={`${btn} bg-white text-[var(--color-slate)] ring-1 ring-black/10`}
      >
        −
      </button>
      <span className="w-8 text-center text-2xl font-extrabold" style={{ color: col }}>
        {v}
      </span>
      <button
        type="button"
        aria-label={`עוד ${label}`}
        onClick={() => set(Math.min(max, v + 1))}
        className={`${btn} text-white`}
        style={{ backgroundColor: col }}
      >
        +
      </button>
    </div>
  );

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-3 text-[var(--color-ink)]">{caption}</MathRenderer>}

      <div className="flex flex-wrap justify-center gap-3" dir="ltr">
        <Frame filled={Math.min(10, total)} colorAt={color} />
        <Frame filled={Math.max(0, total - 10)} colorAt={(i) => color(i + 10)} />
      </div>

      <div className="mt-3 flex flex-wrap justify-center gap-4" dir="ltr">
        {mode === 'add' ? (
          <>
            {stepper('כחולות', a, (v) => setA(Math.min(v, 20 - b)), 10, 'var(--color-teal)')}
            {stepper('אדומות', b, (v) => setB(Math.min(v, 20 - a)), 10, 'var(--color-coral)')}
          </>
        ) : (
          stepper('נקודות', n, setN, 20, 'var(--color-violet)')
        )}
      </div>

      <p className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-lg font-extrabold text-[var(--color-ink)]" dir="ltr">
        {mode === 'add' ? (
          <>
            <span className="text-[var(--color-teal)]">{a}</span> + <span className="text-[var(--color-coral)]">{b}</span> = {total}
          </>
        ) : total >= 10 ? (
          `10 + ${total - 10} = ${total}`
        ) : (
          total
        )}
      </p>
      {total >= 10 && <p className="mt-1 text-center text-sm font-semibold text-[var(--color-slate)]">מסגרת אחת מלאה = עשר 🎉</p>}
    </div>
  );
}
