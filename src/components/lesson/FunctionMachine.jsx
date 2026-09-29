import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';

function ruleTex(a, b) {
  const ax = a === 1 ? 'x' : a === -1 ? '-x' : `${a}x`;
  if (b === 0) return `y=${ax}`;
  return `y=${ax}${b > 0 ? '+' : '-'}${Math.abs(b)}`;
}

/**
 * "מכונת פונקציה": מכניסים x, יוצא y לפי הכלל y = ax + b.
 * כל קלט נרשם בטבלה. hidden — הכלל מוסתר, ומנחשים אותו מהטבלה.
 */
export default function FunctionMachine({ caption, a = 2, b = 1, hidden = false, min = 0, max = 6 }) {
  const [x, setX] = useState(min + 1);
  const [rows, setRows] = useState([]);
  const [shown, setShown] = useState(!hidden);
  const y = a * x + b;

  function run() {
    setRows((r) => (r.some(([rx]) => rx === x) ? r : [...r, [x, y]].sort((p, q) => p[0] - q[0])));
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-3 text-[var(--color-ink)]">{caption}</MathRenderer>}

      <div className="flex items-center justify-center gap-2" dir="ltr">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-teal)] text-lg font-extrabold text-white shadow">{x}</div>
        <span className="text-2xl text-[var(--color-slate)]">→</span>
        <div className="flex min-w-32 flex-col items-center rounded-2xl bg-[var(--color-violet)] px-4 py-2 text-white shadow-md">
          <span className="text-xs font-semibold opacity-80">⚙️ מכונה</span>
          {shown ? (
            <MathRenderer inline className="font-bold">{`$${ruleTex(a, b)}$`}</MathRenderer>
          ) : (
            <span className="text-lg font-extrabold">?</span>
          )}
        </div>
        <span className="text-2xl text-[var(--color-slate)]">→</span>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={rows.length}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex h-12 min-w-12 items-center justify-center rounded-xl bg-[var(--color-sunshine)] px-2 text-lg font-extrabold text-white shadow"
          >
            {rows.some(([rx]) => rx === x) ? y : '?'}
          </motion.div>
        </AnimatePresence>
      </div>

      <label className="mt-3 flex items-center gap-2 text-sm font-semibold">
        <span className="w-14 shrink-0 text-[var(--color-teal)]">
          קלט <i>x</i>
        </span>
        <input
          type="range"
          dir="ltr"
          min={min}
          max={max}
          value={x}
          onChange={(e) => setX(Number(e.target.value))}
          className="w-full"
          style={{ accentColor: 'var(--color-teal)' }}
        />
        <span dir="ltr" className="w-8 text-end font-bold text-[var(--color-teal)]">
          {x}
        </span>
      </label>

      <div className="mt-2 flex flex-wrap justify-center gap-2">
        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          onClick={run}
          className="rounded-xl bg-[var(--color-teal)] px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-[var(--color-teal-dark)]"
        >
          ▶ הפעילו את המכונה
        </motion.button>
        {hidden && !shown && (
          <button
            type="button"
            onClick={() => setShown(true)}
            className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-[var(--color-slate)] ring-1 ring-black/10"
          >
            👀 גלו את הכלל
          </button>
        )}
      </div>

      {rows.length > 0 && (
        <div className="mt-3 flex justify-center overflow-x-auto">
          <table dir="ltr" className="border-collapse text-center text-sm font-bold">
            <tbody>
              <tr>
                <th className="border border-black/10 bg-[var(--color-teal)]/10 px-2 py-1 italic text-[var(--color-teal-dark)]">x</th>
                {rows.map(([rx]) => (
                  <td key={rx} className="border border-black/10 px-2 py-1">
                    {rx}
                  </td>
                ))}
              </tr>
              <tr>
                <th className="border border-black/10 bg-[var(--color-sunshine)]/15 px-2 py-1 italic text-[var(--color-sunshine-dark)]">y</th>
                {rows.map(([rx, ry]) => (
                  <td key={rx} className="border border-black/10 px-2 py-1">
                    {ry}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-2 text-center text-xs text-[var(--color-slate)]">לכל קלט יוצא פלט אחד בלבד — זו פונקציה</p>
    </div>
  );
}
