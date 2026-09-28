import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';

const fmt = (n) => String(Number(n.toFixed(2)));

/**
 * פס אחוזים עם סליידר.
 * mode 'part'     — כמה זה p% מתוך total.
 * mode 'discount' — מחיר אחרי הנחה של p% (נשאר 100−p).
 * mode 'increase' — מחיר אחרי תוספת של p% (הפס גדל מעבר ל-100%).
 */
export default function PercentBar({ caption, total = 200, unit = '', mode = 'part', percent: p0 = 25, maxPercent }) {
  const [p, setP] = useState(p0);
  const max = maxPercent ?? (mode === 'increase' ? 50 : 100);
  const factor = mode === 'discount' ? 1 - p / 100 : mode === 'increase' ? 1 + p / 100 : p / 100;
  const value = total * factor;
  const barMax = mode === 'increase' ? 1 + max / 100 : 1;

  const u = unit ? ` ${unit}` : '';
  let tex;
  if (mode === 'part') tex = `${p}\\%\\cdot${total}=${fmt(p / 100)}\\cdot${total}=\\mathbf{${fmt(value)}}`;
  else if (mode === 'discount') tex = `${total}\\cdot(1-${fmt(p / 100)})=${total}\\cdot${fmt(factor)}=\\mathbf{${fmt(value)}}`;
  else tex = `${total}\\cdot(1+${fmt(p / 100)})=${total}\\cdot${fmt(factor)}=\\mathbf{${fmt(value)}}`;

  const filled = mode === 'discount' ? 1 - p / 100 : mode === 'increase' ? 1 : p / 100;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-3 text-[var(--color-ink)]">{caption}</MathRenderer>}

      <div className="relative h-12 overflow-hidden rounded-xl bg-[var(--color-mist)]" dir="ltr">
        <motion.div
          className="absolute inset-y-0 left-0 bg-[var(--color-teal)]"
          initial={false}
          animate={{ width: `${(filled / barMax) * 100}%` }}
          transition={{ type: 'spring', stiffness: 160, damping: 22 }}
        />
        {mode === 'discount' && (
          <motion.div
            className="absolute inset-y-0"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, rgba(196,92,72,0.35) 0 6px, transparent 6px 12px)' }}
            initial={false}
            animate={{ left: `${(1 - p / 100) * 100}%`, width: `${(p / 100) * 100}%` }}
            transition={{ type: 'spring', stiffness: 160, damping: 22 }}
          />
        )}
        {mode === 'increase' && (
          <motion.div
            className="absolute inset-y-0 bg-[var(--color-sunshine)]"
            initial={false}
            animate={{ left: `${(1 / barMax) * 100}%`, width: `${(p / 100 / barMax) * 100}%` }}
            transition={{ type: 'spring', stiffness: 160, damping: 22 }}
          />
        )}
        {mode === 'increase' && (
          <div className="absolute inset-y-0 border-l-2 border-dashed border-[var(--color-ink)]" style={{ left: `${(1 / barMax) * 100}%` }} />
        )}
        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-[var(--color-ink)]">
          <span className="rounded-md bg-white/80 px-2">
            {mode === 'part' && `${p}% = ${fmt(value)}${u}`}
            {mode === 'discount' && `נשאר ${100 - p}% = ${fmt(value)}${u}`}
            {mode === 'increase' && `${100 + p}% = ${fmt(value)}${u}`}
          </span>
        </div>
      </div>

      <label className="mt-3 flex items-center gap-3 text-sm font-semibold text-[var(--color-ink)]">
        <span className="whitespace-nowrap">{mode === 'part' ? 'אחוז:' : mode === 'discount' ? 'הנחה:' : 'תוספת:'}</span>
        <input
          type="range"
          dir="ltr"
          min={0}
          max={max}
          step={5}
          value={p}
          onChange={(e) => setP(Number(e.target.value))}
          className="w-full accent-[var(--color-teal)]"
        />
        <span dir="ltr" className="w-12 text-[var(--color-teal-dark)]">
          {p}%
        </span>
      </label>

      <div className="mt-3 text-center text-lg">
        <MathRenderer inline>{`$${tex}$`}</MathRenderer>
      </div>
    </div>
  );
}
