import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';

const W = 320;
const H = 190;
const PAD = 24;
const fmt = (n) => String(Number(n.toFixed(2)));

/**
 * משולש / מקבילית / טרפז עם סליידרים לבסיס, לגובה ולהזזת הקודקוד העליון.
 * הגובה מסורטט תמיד (מקווקו, עם זווית ישרה) — גם כשהוא נופל מחוץ לצורה —
 * ורואים שהזזת הקודקוד לא משנה את השטח.
 */
export default function ShapeArea({ caption, shape = 'triangle', base: b0 = 6, height: h0 = 4, shift: s0 = 2, top: t0 = 3 }) {
  const [base, setBase] = useState(b0);
  const [height, setHeight] = useState(h0);
  const [shift, setShift] = useState(s0);
  const [top, setTop] = useState(t0);

  // נקודות בקואורדינטות מתמטיות (y למעלה)
  let pts;
  let foot; // נקודה עליונה שממנה יורד הגובה
  if (shape === 'triangle') {
    pts = [
      [0, 0],
      [base, 0],
      [shift, height],
    ];
    foot = shift;
  } else if (shape === 'parallelogram') {
    pts = [
      [0, 0],
      [base, 0],
      [base + shift, height],
      [shift, height],
    ];
    foot = shift;
  } else {
    pts = [
      [0, 0],
      [base, 0],
      [shift + top, height],
      [shift, height],
    ];
    foot = shift;
  }

  const xs = pts.map((p) => p[0]).concat([foot]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const scale = Math.min((W - 2 * PAD) / Math.max(maxX - minX, 1), (H - 2 * PAD) / Math.max(height, 1), 34);
  const ox = PAD + ((W - 2 * PAD) - (maxX - minX) * scale) / 2 - minX * scale;
  const toPx = ([x, y]) => [ox + x * scale, H - PAD - y * scale];
  const poly = pts.map((p) => toPx(p).join(',')).join(' ');
  const [fx, fy] = toPx([foot, 0]);
  const [, ty] = toPx([foot, height]);
  const outside = foot < 0 || foot > base;

  let area;
  let tex;
  if (shape === 'triangle') {
    area = (base * height) / 2;
    tex = `\\frac{${base}\\times${height}}{2}=${fmt(area)}`;
  } else if (shape === 'parallelogram') {
    area = base * height;
    tex = `${base}\\times${height}=${fmt(area)}`;
  } else {
    area = ((base + top) * height) / 2;
    tex = `\\frac{(${base}+${top})\\times${height}}{2}=${fmt(area)}`;
  }

  const sliders = [
    { label: shape === 'trapezoid' ? 'בסיס גדול' : 'בסיס', value: base, set: setBase, min: 2, max: 9, color: 'var(--color-sky)' },
    shape === 'trapezoid' && { label: 'בסיס קטן', value: top, set: setTop, min: 1, max: 8, color: 'var(--color-grass)' },
    { label: 'גובה', value: height, set: setHeight, min: 1, max: 6, color: 'var(--color-coral)' },
    { label: 'הזזת הקודקוד', value: shift, set: setShift, min: -3, max: 10, color: 'var(--color-violet)' },
  ].filter(Boolean);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}

      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
        {outside && (
          <line
            x1={Math.min(fx, toPx([0, 0])[0])}
            x2={Math.max(fx, toPx([base, 0])[0])}
            y1={fy}
            y2={fy}
            stroke="var(--color-sky)"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
        )}
        <motion.polygon
          initial={false}
          animate={{ points: poly }}
          transition={{ duration: 0.2 }}
          fill="rgba(13, 110, 110, 0.12)"
          stroke="var(--color-teal)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <line x1={toPx([0, 0])[0]} x2={toPx([base, 0])[0]} y1={fy} y2={fy} stroke="var(--color-sky)" strokeWidth="4" />
        {shape === 'trapezoid' && (
          <line x1={toPx([shift, height])[0]} x2={toPx([shift + top, height])[0]} y1={ty} y2={ty} stroke="var(--color-grass)" strokeWidth="4" />
        )}
        <line x1={fx} x2={fx} y1={ty} y2={fy} stroke="var(--color-coral)" strokeWidth="2.5" strokeDasharray="6 4" />
        <rect x={fx} y={fy - 10} width="10" height="10" fill="none" stroke="var(--color-coral)" strokeWidth="1.5" />
        <text x={fx + 6} y={(ty + fy) / 2} fontSize="13" fontWeight="700" fill="var(--color-coral)">
          {height}
        </text>
        <text x={(toPx([0, 0])[0] + toPx([base, 0])[0]) / 2} y={fy + 17} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--color-sky)">
          {base}
        </text>
      </svg>

      <div className="mt-2 space-y-1">
        {sliders.map((s) => (
          <label key={s.label} className="flex items-center gap-2 text-sm font-semibold">
            <span className="w-24 whitespace-nowrap" style={{ color: s.color }}>
              {s.label}
            </span>
            <input
              type="range"
              dir="ltr"
              min={s.min}
              max={s.max}
              step={1}
              value={s.value}
              onChange={(e) => s.set(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: s.color }}
            />
          </label>
        ))}
      </div>

      <p className="mt-3 text-center text-lg">
        <MathRenderer inline>{`שטח: $${tex}$`}</MathRenderer>
      </p>
      {outside && (
        <p className="mt-1 text-center text-sm font-semibold text-[var(--color-coral)]">
          הגובה נפל מחוץ לצורה — מאריכים את הבסיס (הקו המקווקו הכחול)
        </p>
      )}
    </div>
  );
}
