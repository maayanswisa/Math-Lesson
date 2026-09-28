import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';

const A = 3; // ניצב אנכי של המשולש הקטן
const B = 4; // ניצב אופקי
const MAX_K = 3;
const U = 22; // פיקסלים ליחידה

/**
 * משולש 3-4-5 ומשולש דומה לו ביחס k. כש-k שלם, הגדול מחולק לרשת של
 * משולשים קטנים — סופרים k² משולשים, ורואים למה יחס השטחים הוא k².
 */
export default function SimilarScale({ caption }) {
  const [k, setK] = useState(2);
  const H = A * MAX_K * U + 20;
  const ox = 10 + B * U + 30; // ראשית המשולש הגדול
  const oy = H - 10;

  const big = `${ox},${oy} ${ox},${oy - A * k * U} ${ox + B * k * U},${oy}`;
  const small = `10,${oy} 10,${oy - A * U} ${10 + B * U},${oy}`;

  // קווי רשת בתוך הגדול: מקבילים לשלוש הצלעות, במרווחים של משולש קטן
  const grid = [];
  for (let i = 1; i < k; i++) {
    grid.push([ox + i * B * U, oy, ox + i * B * U, oy - (k - i) * A * U]); // אנכי
    grid.push([ox, oy - i * A * U, ox + (k - i) * B * U, oy - i * A * U]); // אופקי
    grid.push([ox, oy - i * A * U, ox + i * B * U, oy]); // מקביל ליתר
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}

      <svg viewBox={`0 0 ${ox + B * MAX_K * U + 10} ${H}`} className="mx-auto w-full max-w-md" style={{ direction: 'ltr' }}>
        <polygon points={small} fill="rgba(124, 77, 204, 0.18)" stroke="var(--color-violet)" strokeWidth="2.5" />
        <motion.polygon
          initial={false}
          animate={{ points: big }}
          transition={{ type: 'spring', stiffness: 140, damping: 18 }}
          fill="rgba(13, 110, 110, 0.08)"
          stroke="var(--color-teal)"
          strokeWidth="2.5"
        />
        {Number.isInteger(k) &&
          grid.map(([x1, y1, x2, y2], i) => (
            <motion.line
              key={`${k}-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--color-violet)"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
          ))}
        <text x={10 + (B * U) / 2} y={oy + 0} dy="-4" textAnchor="middle" fontSize="11" fill="var(--color-violet-dark)">
          קטן
        </text>
      </svg>

      <label className="mt-2 flex items-center gap-3 text-sm font-semibold text-[var(--color-ink)]">
        <span className="whitespace-nowrap">יחס דמיון:</span>
        <input
          type="range"
          dir="ltr"
          min={1}
          max={MAX_K}
          step={0.5}
          value={k}
          onChange={(e) => setK(Number(e.target.value))}
          className="w-full accent-[var(--color-teal)]"
        />
        <span dir="ltr" className="w-14 whitespace-nowrap text-[var(--color-teal-dark)]">
          k = {k}
        </span>
      </label>

      <div className="mt-3 grid gap-2 text-center sm:grid-cols-3">
        <span className="rounded-xl bg-[var(--color-mist)] px-2 py-2">
          <MathRenderer inline>{`צלעות: $${A * k},\\ ${B * k},\\ ${5 * k}$`}</MathRenderer>
        </span>
        <span className="rounded-xl bg-[var(--color-teal)]/10 px-2 py-2 text-[var(--color-teal-dark)]">
          <MathRenderer inline>{`היקפים: $\\frac{${12 * k}}{12}=${k}$`}</MathRenderer>
        </span>
        <span className="rounded-xl bg-[var(--color-coral)]/10 px-2 py-2 font-bold text-[var(--color-coral-dark)]">
          <MathRenderer inline>{`שטחים: $\\frac{${6 * k * k}}{6}=${k * k}=k^2$`}</MathRenderer>
        </span>
      </div>
      {Number.isInteger(k) && k > 1 && (
        <p className="mt-2 text-center text-sm text-[var(--color-slate)]">
          ספרו: בתוך הגדול נכנסים בדיוק {k * k} משולשים קטנים.
        </p>
      )}
    </div>
  );
}
