import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider from './LessonSlider';

const NAMES = { 3: 'משולש', 4: 'מרובע', 5: 'מחומש', 6: 'משושה', 7: 'משובע', 8: 'מתומן', 9: 'מתושע', 10: 'מעושר' };
const C = { x: 130, y: 115 };
const R = 90;

/**
 * מצולע משוכלל עם n קודקודים וכל האלכסונים שלו. אפשר לראות רק את האלכסונים
 * מקודקוד אחד (n−3) — ולגלות למה בסך הכול יש n(n−3)/2.
 */
export default function PolygonDiagonals({ caption, n: n0 = 5 }) {
  const [n, setN] = useState(n0);
  const [fromOne, setFromOne] = useState(false);
  const pts = Array.from({ length: n }, (_, i) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
    return { x: C.x + R * Math.cos(a), y: C.y + R * Math.sin(a) };
  });
  const diags = [];
  for (let i = 0; i < n; i++)
    for (let j = i + 2; j < n; j++) {
      if (i === 0 && j === n - 1) continue;
      if (fromOne && i !== 0) continue;
      diags.push([i, j]);
    }
  const total = (n * (n - 3)) / 2;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
      <svg viewBox="0 0 260 230" className="mx-auto w-full max-w-xs" style={{ direction: 'ltr' }}>
        <polygon points={pts.map((p) => `${p.x},${p.y}`).join(' ')} fill="rgba(13,110,110,0.08)" stroke="var(--color-teal)" strokeWidth="3" />
        {diags.map(([i, j], k) => (
          <motion.line
            key={`${n}-${i}-${j}-${fromOne}`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: k * 0.03 }}
            x1={pts[i].x}
            y1={pts[i].y}
            x2={pts[j].x}
            y2={pts[j].y}
            stroke="var(--color-coral)"
            strokeWidth="2"
          />
        ))}
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={i === 0 && fromOne ? 7 : 5} fill={i === 0 && fromOne ? 'var(--color-violet)' : 'var(--color-ink)'} />
        ))}
      </svg>
      <LessonSlider label="קודקודים" value={n} min={3} max={10} onChange={setN} color="var(--color-teal)" width="w-16" />
      <div className="mt-2 flex justify-center gap-2">
        {[false, true].map((v) => (
          <button
            key={String(v)}
            type="button"
            onClick={() => setFromOne(v)}
            className={`rounded-xl px-3 py-1.5 text-sm font-bold ${fromOne === v ? 'bg-[var(--color-coral)] text-white' : 'bg-white text-[var(--color-slate)] ring-1 ring-black/10'}`}
          >
            {v ? 'רק מקודקוד אחד' : 'כל האלכסונים'}
          </button>
        ))}
      </div>
      <p className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]">
        {NAMES[n]}: {fromOne ? `מקודקוד אחד יוצאים ${n - 3} אלכסונים` : `${total} אלכסונים`}
        <span className="block text-xs font-semibold text-[var(--color-slate)]">
          {fromOne ? 'לא לשכנים ולא לעצמו — לכל השאר' : 'אלכסון מחבר שני קודקודים שאינם שכנים'}
        </span>
      </p>
    </div>
  );
}
