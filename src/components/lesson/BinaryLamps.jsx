import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';

/**
 * שיטה בינארית: שורה של נורות. כל נורה שווה פי 2 מהנורה שמימינה (1, 2, 4, 8...).
 * מדליקים ומכבים — ורואים את המספר בבסיס 2 ובבסיס 10.
 */
export default function BinaryLamps({ caption, bits: b0 = 4, value: v0 = 11 }) {
  const [on, setOn] = useState(() => Array.from({ length: b0 }, (_, i) => (v0 >> (b0 - 1 - i)) & 1));
  const weights = on.map((_, i) => 2 ** (on.length - 1 - i));
  const value = on.reduce((s, b, i) => s + b * weights[i], 0);
  const toggle = (i) => setOn((a) => a.map((b, j) => (j === i ? 1 - b : b)));

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-3 text-[var(--color-ink)]">{caption}</MathRenderer>}
      <div className="flex justify-center gap-2" dir="ltr">
        {on.map((b, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="text-xs font-bold text-[var(--color-slate)]">{weights[i]}</span>
            <motion.button
              type="button"
              aria-label={`נורה ${weights[i]}`}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggle(i)}
              className="flex h-12 w-12 items-center justify-center rounded-full text-2xl shadow-sm ring-1 ring-black/10"
              style={{ backgroundColor: b ? '#ffe27a' : 'var(--color-mist)' }}
            >
              {b ? '💡' : '⚫'}
            </motion.button>
            <span className="text-lg font-extrabold text-[var(--color-ink)]">{b}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]" dir="ltr">
        {on.join('')}₂ ={' '}
        {on
          .map((b, i) => (b ? weights[i] : null))
          .filter((x) => x !== null)
          .join(' + ') || '0'}{' '}
        = <span className="text-lg text-[var(--color-violet)]">{value}</span>
      </p>
      <p className="mt-1 text-center text-xs font-semibold text-[var(--color-slate)]">לחצו על הנורות. בבסיס 2 יש רק שתי ספרות: 0 (כבוי) ו-1 (דולק)</p>
    </div>
  );
}
