import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider from './LessonSlider';

/**
 * חילוק עם שארית: מסדרים n פריטים בקבוצות של k. מה שלא נכנס לקבוצה מלאה — השארית.
 */
export default function DivGroups({ caption, n: n0 = 23, k: k0 = 5, emoji = '🍪' }) {
  const [n, setN] = useState(n0);
  const [k, setK] = useState(k0);
  const q = Math.floor(n / k);
  const r = n % k;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-3 text-[var(--color-ink)]">{caption}</MathRenderer>}
      <div className="flex flex-wrap justify-center gap-2" dir="ltr">
        {Array.from({ length: q }, (_, g) => (
          <motion.div
            key={`${g}-${k}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex max-w-[7.5rem] flex-wrap justify-center gap-0.5 rounded-xl bg-[var(--color-teal)]/10 p-1.5 ring-1 ring-[var(--color-teal)]/30"
          >
            {Array.from({ length: k }, (_, i) => (
              <span key={i} className="text-lg leading-none">
                {emoji}
              </span>
            ))}
          </motion.div>
        ))}
        {r > 0 && (
          <div className="flex flex-wrap justify-center gap-0.5 rounded-xl bg-[var(--color-coral)]/10 p-1.5 ring-2 ring-dashed ring-[var(--color-coral)]/50">
            {Array.from({ length: r }, (_, i) => (
              <span key={i} className="text-lg leading-none">
                {emoji}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="mt-3 space-y-1">
        <LessonSlider label="כמה יש" value={n} min={1} max={40} onChange={setN} color="var(--color-violet)" width="w-16" />
        <LessonSlider label="בכל קבוצה" value={k} min={2} max={9} onChange={setK} color="var(--color-teal)" width="w-16" />
      </div>
      <p className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-lg font-extrabold text-[var(--color-ink)]">
        <span dir="ltr">
          {n} : {k} = {q}
        </span>
        {r > 0 && (
          <>
            {' '}
            <span className="text-[var(--color-coral-dark)]">(שארית {r})</span>
          </>
        )}
        <span className="block text-xs font-semibold text-[var(--color-slate)]" dir="ltr">
          {q} × {k} + {r} = {n}
        </span>
      </p>
    </div>
  );
}
