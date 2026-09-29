import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';

const rad = (d) => (d * Math.PI) / 180;
const O = { x: 150, y: 95 };
const L = 90;

function arc(r, from, to) {
  const p = (d) => `${(O.x + r * Math.cos(rad(d))).toFixed(1)},${(O.y - r * Math.sin(rad(d))).toFixed(1)}`;
  const large = to - from > 180 ? 1 : 0;
  return `M${p(from)} A${r},${r} 0 ${large} 0 ${p(to)}`;
}

function labelAt(r, deg) {
  return { x: O.x + r * Math.cos(rad(deg)), y: O.y - r * Math.sin(rad(deg)) + 4 };
}

/**
 * שני ישרים נחתכים. α ו-β צמודות (סכומן 180°), וכל זווית שווה לזו שמולה (קודקודיות).
 * bisector — מציג גם חוצה זווית של α.
 */
export default function CrossingLines({ caption, angle: a0 = 60, bisector = false }) {
  const [a, setA] = useState(a0);
  const b = 180 - a;
  const dir = (d) => ({ x: O.x + L * Math.cos(rad(d)), y: O.y - L * Math.sin(rad(d)) });
  // ישר אחד אופקי (0°–180°), השני בזווית a
  const p1 = dir(a);
  const p2 = dir(a + 180);

  const pieces = [
    { from: 0, to: a, name: 'α', val: a, color: 'var(--color-teal)' },
    { from: a, to: 180, name: 'β', val: b, color: 'var(--color-coral)' },
    { from: 180, to: 180 + a, name: 'α', val: a, color: 'var(--color-teal)' },
    { from: 180 + a, to: 360, name: 'β', val: b, color: 'var(--color-coral)' },
  ];

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}

      <svg viewBox="0 0 300 190" className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
        {pieces.map((p, i) => (
          <path key={i} d={arc(i % 2 ? 30 : 36, p.from, p.to)} fill="none" stroke={p.color} strokeWidth="4" />
        ))}
        <line x1={O.x - 135} y1={O.y} x2={O.x + 135} y2={O.y} stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" />
        <motion.line initial={false} animate={{ x1: p2.x, y1: p2.y, x2: p1.x, y2: p1.y }} stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" />
        {bisector && (
          <motion.line
            initial={false}
            animate={{ x2: dir(a / 2).x, y2: dir(a / 2).y }}
            x1={O.x}
            y1={O.y}
            stroke="var(--color-sunshine)"
            strokeWidth="3"
            strokeDasharray="7 4"
          />
        )}
        <circle cx={O.x} cy={O.y} r="4" fill="var(--color-ink)" />
        {pieces.map((p, i) => {
          const mid = (p.from + p.to) / 2;
          const pos = labelAt(p.val < 35 ? 72 : 56, mid);
          return (
            <text key={i} x={pos.x} y={pos.y} fontSize="13" fontWeight="800" textAnchor="middle" fill={p.color} stroke="white" strokeWidth="3" paintOrder="stroke">
              {p.name}={p.val}°
            </text>
          );
        })}
      </svg>

      <label className="mt-1 flex items-center gap-2 text-sm font-semibold">
        <span className="w-16 shrink-0 text-[var(--color-teal)]">שנו את α</span>
        <input
          type="range"
          dir="ltr"
          min={20}
          max={160}
          step={5}
          value={a}
          onChange={(e) => setA(Number(e.target.value))}
          className="w-full"
          style={{ accentColor: 'var(--color-teal)' }}
        />
        <span dir="ltr" className="w-10 text-end font-bold text-[var(--color-teal)]">
          {a}°
        </span>
      </label>

      <div className="mt-3 grid gap-2 text-center text-sm font-bold sm:grid-cols-2">
        <p className="rounded-xl bg-[var(--color-mist)] p-2">
          צמודות: <span dir="ltr">α + β = {a}° + {b}° = 180°</span>
        </p>
        <p className="rounded-xl bg-[var(--color-mist)] p-2">קודקודיות (זו מול זו): שוות</p>
      </div>
      {bisector && (
        <p className="mt-2 text-center text-sm font-bold text-[var(--color-sunshine-dark)]">
          החוצה (צהוב) מחלק את α לשתי זוויות של <span dir="ltr">{a / 2}°</span>
        </p>
      )}
    </div>
  );
}
