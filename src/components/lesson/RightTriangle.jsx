import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';

const W = 300;
const H = 220;
const PAD = 30;
const fmt = (n) => String(Number(n.toFixed(2)));

/**
 * משולש ישר-זווית עם סליידרים לשני הניצבים. היתר מחושב בזמן אמת,
 * וכשיוצא מספר שלם — מתגלה "שלשה פיתגורית".
 */
export default function RightTriangle({ caption, a: a0 = 3, b: b0 = 4, max = 12 }) {
  const [a, setA] = useState(a0);
  const [b, setB] = useState(b0);
  const c = Math.hypot(a, b);
  const whole = Number.isInteger(Number(c.toFixed(6)));

  // קנה המידה מתאים את עצמו לניצבים הנוכחיים, כך שהמשולש תמיד ממלא את המסגרת
  const LEFT = 56; // מקום לתווית של a
  const scale = Math.min((W - LEFT - PAD) / b, (H - 2 * PAD) / a);
  const O = { x: LEFT, y: H - PAD }; // קודקוד הזווית הישרה
  const A = { x: O.x, y: O.y - a * scale };
  const B = { x: O.x + b * scale, y: O.y };

  const sliders = [
    { label: 'a', value: a, set: setA, color: 'var(--color-violet)' },
    { label: 'b', value: b, set: setB, color: 'var(--color-sky)' },
  ];

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}

      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
        <motion.polygon
          initial={false}
          animate={{ points: `${O.x},${O.y} ${A.x},${A.y} ${B.x},${B.y}` }}
          transition={{ duration: 0.25 }}
          fill="rgba(13, 110, 110, 0.08)"
          stroke="var(--color-teal)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <rect x={O.x} y={O.y - 12} width="12" height="12" fill="none" stroke="var(--color-teal)" strokeWidth="1.5" />
        <line x1={O.x} y1={O.y} x2={A.x} y2={A.y} stroke="var(--color-violet)" strokeWidth="4" />
        <line x1={O.x} y1={O.y} x2={B.x} y2={B.y} stroke="var(--color-sky)" strokeWidth="4" />
        <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="var(--color-coral)" strokeWidth="4" />
        <text x={O.x - 8} y={(O.y + A.y) / 2} textAnchor="end" fontSize="14" fontWeight="700" fill="var(--color-violet)">
          a={fmt(a)}
        </text>
        <text x={(O.x + B.x) / 2} y={O.y + 20} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--color-sky)">
          b={fmt(b)}
        </text>
        <text
          x={(A.x + B.x) / 2 + 8}
          y={(A.y + B.y) / 2 - 8}
          fontSize="14"
          fontWeight="700"
          fill="var(--color-coral)"
        >
          c≈{fmt(c)}
        </text>
      </svg>

      <div className="mt-2 space-y-1">
        {sliders.map((s) => (
          <label key={s.label} className="flex items-center gap-2 text-sm font-semibold">
            <span dir="ltr" className="w-20 whitespace-nowrap" style={{ color: s.color }}>
              ניצב {s.label}
            </span>
            <input
              type="range"
              dir="ltr"
              min={1}
              max={max}
              step={1}
              value={s.value}
              onChange={(e) => s.set(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: s.color }}
            />
          </label>
        ))}
      </div>

      <div className="mt-3 text-center text-lg">
        <MathRenderer inline>{`$\\textcolor{#7c4dcc}{${a}^2}+\\textcolor{#1670b3}{${b}^2}=${a * a}+${b * b}=${a * a + b * b}=\\textcolor{#c45c48}{c^2}$`}</MathRenderer>
        <p className="mt-1 text-base">
          <MathRenderer inline>{`$c=\\sqrt{${a * a + b * b}}${whole ? '=' : '\\approx'}${fmt(c)}$`}</MathRenderer>
        </p>
      </div>
      <AnimatePresence>
        {whole && (
          <motion.p
            key={`${a}-${b}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mt-2 rounded-xl bg-[var(--color-success)]/10 p-2 text-center text-sm font-bold text-[var(--color-success)]"
          >
            🎯 שלשה פיתגורית! <span dir="ltr">{a}, {b}, {fmt(c)}</span> — כל הצלעות שלמות
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
