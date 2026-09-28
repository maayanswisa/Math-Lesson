import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';

const CELL_BG = ['rgba(124, 77, 204, 0.14)', 'rgba(31, 143, 224, 0.14)', 'rgba(226, 160, 32, 0.18)', 'rgba(63, 161, 90, 0.16)'];

/**
 * "מודל השטח": מלבן שצלעותיו הן הסוגריים, וכל תא הוא מכפלה של איבר באיבר.
 * לוחצים על תא כדי לחשוף אותו; כשכל התאים גלויים מופיעה התוצאה.
 * rows / cols — האיברים (TeX) שבכל סוגריים; cells[r][c] — המכפלה (TeX).
 */
export default function AreaModel({ caption, rows, cols, cells, result }) {
  const total = rows.length * cols.length;
  const [shown, setShown] = useState(() => new Set());
  const allShown = shown.size === total;

  const reveal = (key) => setShown((s) => new Set(s).add(key));
  const revealAll = () => setShown(new Set(rows.flatMap((_, r) => cols.map((__, c) => `${r}-${c}`))));

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-3 text-[var(--color-ink)]">{caption}</MathRenderer>}

      <div dir="ltr" className="mx-auto grid w-fit gap-1" style={{ gridTemplateColumns: `auto repeat(${cols.length}, minmax(4.5rem, 1fr))` }}>
        <span />
        {cols.map((col, c) => (
          <span key={c} className="py-1 text-center text-lg font-bold text-[var(--color-sky-dark)]">
            <MathRenderer inline>{`$${col}$`}</MathRenderer>
          </span>
        ))}
        {rows.map((row, r) => (
          <div key={r} className="contents">
            <span className="flex items-center justify-end pe-2 text-lg font-bold text-[var(--color-violet-dark)]">
              <MathRenderer inline>{`$${row}$`}</MathRenderer>
            </span>
            {cols.map((_, c) => {
              const key = `${r}-${c}`;
              const open = shown.has(key);
              return (
                <motion.button
                  key={key}
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => reveal(key)}
                  disabled={open}
                  className="flex h-16 items-center justify-center rounded-xl border-2 border-dashed border-black/10 text-lg font-semibold"
                  style={{ backgroundColor: open ? CELL_BG[(r * cols.length + c) % CELL_BG.length] : 'white' }}
                >
                  {open ? (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <MathRenderer inline>{`$${cells[r][c]}$`}</MathRenderer>
                    </motion.span>
                  ) : (
                    <span className="text-sm text-[var(--color-slate)]">?</span>
                  )}
                </motion.button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-3 text-center">
        {allShown ? (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-lg font-bold text-[var(--color-success)]">
            <MathRenderer inline>{`$${result}$`}</MathRenderer>
          </motion.p>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-[var(--color-slate)]">לחצו על כל תא: איבר מהשורה כפול איבר מהעמודה</p>
            <button type="button" onClick={revealAll} className="text-sm font-semibold text-[var(--color-teal)] hover:underline">
              חשפו הכול
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
