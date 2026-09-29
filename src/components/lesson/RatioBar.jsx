import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider from './LessonSlider';

const gcd = (a, b) => (b ? gcd(b, a % b) : a);

/**
 * חלוקה לפי יחס a:b. הרצועה מחולקת ל-(a+b) חלקים שווים; כל צד מקבל את החלקים שלו.
 * total — הכמות שמחלקים.
 */
export default function RatioBar({ caption, a: a0 = 2, b: b0 = 3, total: t0 = 40, labels = ['🔵', '🔴'] }) {
  const [a, setA] = useState(a0);
  const [b, setB] = useState(b0);
  const [total, setTotal] = useState(t0);
  const parts = a + b;
  const part = total / parts;
  const g = gcd(a, b);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-3 text-[var(--color-ink)]">{caption}</MathRenderer>}
      <div className="flex h-12 w-full overflow-hidden rounded-xl ring-1 ring-black/10" dir="ltr">
        {Array.from({ length: parts }, (_, i) => (
          <motion.div
            key={`${parts}-${i}`}
            layout
            className="flex flex-1 items-center justify-center border-r border-white/70 text-xs font-bold text-white last:border-r-0"
            style={{ backgroundColor: i < a ? 'var(--color-sky)' : 'var(--color-coral)' }}
          >
            {Number.isInteger(part) ? part : part.toFixed(1)}
          </motion.div>
        ))}
      </div>
      <div className="mt-3 space-y-1">
        <LessonSlider label={labels[0]} value={a} min={1} max={6} onChange={setA} color="var(--color-sky-dark)" />
        <LessonSlider label={labels[1]} value={b} min={1} max={6} onChange={setB} color="var(--color-coral)" />
        <LessonSlider label="סך הכול" value={total} min={10} max={120} step={10} onChange={setTotal} color="var(--color-violet)" width="w-14" />
      </div>
      <p className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]">
        <span dir="ltr">
          {a} : {b}
        </span>
        {g > 1 && (
          <>
            {' '}
            ={' '}
            <span dir="ltr">
              {a / g} : {b / g}
            </span>{' '}
            (אחרי צמצום)
          </>
        )}
        <span className="block">
          {parts} חלקים, כל חלק <span dir="ltr">{Number.isInteger(part) ? part : part.toFixed(2)}</span> ←{' '}
          <span className="text-[var(--color-sky-dark)]">
            {labels[0]} <span dir="ltr">{+(a * part).toFixed(2)}</span>
          </span>
          ,{' '}
          <span className="text-[var(--color-coral-dark)]">
            {labels[1]} <span dir="ltr">{+(b * part).toFixed(2)}</span>
          </span>
        </span>
      </p>
    </div>
  );
}
