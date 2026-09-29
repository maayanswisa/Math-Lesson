import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';

const KINDS = [
  { key: 'h', name: 'מאות', value: 100, color: 'var(--color-violet)' },
  { key: 't', name: 'עשרות', value: 10, color: 'var(--color-teal)' },
  { key: 'o', name: 'יחידות', value: 1, color: 'var(--color-sunshine)' },
];

function Hundred() {
  return (
    <div className="grid grid-cols-10 gap-px rounded-sm bg-[var(--color-violet)] p-px" style={{ width: 44, height: 44 }}>
      {Array.from({ length: 100 }, (_, i) => (
        <span key={i} className="bg-[#b79ae6]" />
      ))}
    </div>
  );
}
function Ten() {
  return (
    <div className="grid grid-rows-10 gap-px rounded-sm bg-[var(--color-teal)] p-px" style={{ width: 8, height: 44 }}>
      {Array.from({ length: 10 }, (_, i) => (
        <span key={i} className="bg-[#5fb3b3]" />
      ))}
    </div>
  );
}
function One() {
  return (
    <span className="inline-block rounded-sm bg-[var(--color-sunshine)] ring-1 ring-[var(--color-sunshine-dark)]" style={{ width: 8, height: 8 }} />
  );
}
const PIECE = { h: Hundred, t: Ten, o: One };

/**
 * קוביות בסיס עשר: מאות (לוח), עשרות (מוט) ויחידות (קובייה).
 * מוסיפים ומורידים — ורואים את המספר ואת הפירוק שלו.
 * hundreds=false — רק עשרות ויחידות (עד 99).
 */
export default function BaseTen({ caption, h: h0 = 0, t: t0 = 3, o: o0 = 4, hundreds = true }) {
  const [c, setC] = useState({ h: h0, t: t0, o: o0 });
  const kinds = hundreds ? KINDS : KINDS.slice(1);
  const value = c.h * 100 + c.t * 10 + c.o;
  const change = (k, d) => setC((x) => ({ ...x, [k]: Math.max(0, Math.min(9, x[k] + d)) }));

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-3 text-[var(--color-ink)]">{caption}</MathRenderer>}

      <div className="flex min-h-[70px] flex-wrap items-end justify-center gap-4" dir="ltr">
        {kinds.map((k) => {
          const P = PIECE[k.key];
          return (
            <div key={k.key} className="flex max-w-[45%] flex-wrap items-end gap-1">
              {Array.from({ length: c[k.key] }, (_, i) => (
                <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }}>
                  <P />
                </motion.div>
              ))}
            </div>
          );
        })}
      </div>

      <div className={`mt-3 grid gap-2 ${hundreds ? 'grid-cols-3' : 'grid-cols-2'}`} dir="ltr">
        {kinds.map((k) => (
          <div key={k.key} className="flex flex-col items-center gap-1 rounded-xl p-2" style={{ backgroundColor: 'var(--color-mist)' }}>
            <span className="text-xs font-bold" style={{ color: k.color }}>
              {k.name}
            </span>
            <span className="text-2xl font-extrabold" style={{ color: k.color }}>
              {c[k.key]}
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                aria-label={`פחות ${k.name}`}
                onClick={() => change(k.key, -1)}
                className="h-8 w-8 rounded-lg bg-white font-bold ring-1 ring-black/10"
              >
                −
              </button>
              <button
                type="button"
                aria-label={`עוד ${k.name}`}
                onClick={() => change(k.key, 1)}
                className="h-8 w-8 rounded-lg font-bold text-white"
                style={{ backgroundColor: k.color }}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-2xl font-extrabold text-[var(--color-ink)]">
        {value}
        <span className="block text-sm font-semibold text-[var(--color-slate)]" dir="ltr">
          {[hundreds && c.h * 100, c.t * 10, c.o].filter((x) => x !== false).join(' + ')} = {value}
        </span>
      </p>
    </div>
  );
}
