import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider, { fmt } from './LessonSlider';
import { fnPath, makeScale } from './PlotAxes';

/**
 * מגזרים ריבועים בצד x מפינות של גיליון L×L ומקפלים לתיבה פתוחה.
 * הנפח V(x) = x(L−2x)² — רואים את הגיליון ואת גרף הנפח עם הנקודה הנוכחית.
 */
export default function BoxOptimizer({ caption, L = 12 }) {
  const [x, setX] = useState(1);
  const V = (t) => t * (L - 2 * t) ** 2;
  const best = L / 6;
  const vmax = V(best);
  const isBest = Math.abs(x - best) < 1e-9;

  const k = 150 / L; // קנה מידה לגיליון
  const g = makeScale({ W: 150, H: 150, x0: 0, x1: L / 2, y0: 0, y1: vmax * 1.15, pad: 12 });

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}

      <div className="flex flex-wrap items-start justify-center gap-4" dir="ltr">
        <svg viewBox="-6 -6 162 162" width="150" style={{ maxWidth: '45%' }}>
          <rect x="0" y="0" width={L * k} height={L * k} fill="rgba(13,110,110,0.08)" stroke="var(--color-teal)" strokeWidth="2" />
          <motion.rect
            initial={false}
            animate={{ x: x * k, y: x * k, width: (L - 2 * x) * k, height: (L - 2 * x) * k }}
            fill="rgba(124,77,204,0.25)"
            stroke="var(--color-violet)"
            strokeWidth="2"
            strokeDasharray="5 3"
          />
          {[
            [0, 0],
            [L - x, 0],
            [0, L - x],
            [L - x, L - x],
          ].map(([cx, cy], i) => (
            <motion.rect
              key={i}
              initial={false}
              animate={{ x: cx * k, y: cy * k, width: x * k, height: x * k }}
              fill="white"
              stroke="var(--color-coral)"
              strokeWidth="2"
            />
          ))}
          <text x={(L * k) / 2} y={(L * k) / 2 + 4} fontSize="11" fontWeight="700" textAnchor="middle" fill="var(--color-violet)">
            {fmt(L - 2 * x)}
          </text>
          <text x={(x * k) / 2} y={(x * k) / 2 + 4} fontSize="10" fontWeight="700" textAnchor="middle" fill="var(--color-coral)">
            x
          </text>
        </svg>

        <svg viewBox={`0 0 ${g.W} ${g.H}`} width="150" style={{ maxWidth: '45%' }}>
          <line x1={g.sx(0)} y1={g.sy(0)} x2={g.sx(L / 2)} y2={g.sy(0)} stroke="var(--color-ink)" />
          <line x1={g.sx(0)} y1={g.sy(0)} x2={g.sx(0)} y2={g.sy(g.y1)} stroke="var(--color-ink)" />
          <path d={fnPath(V, g)} fill="none" stroke="var(--color-teal)" strokeWidth="2.5" />
          <line x1={g.sx(best)} y1={g.sy(0)} x2={g.sx(best)} y2={g.sy(vmax)} stroke="var(--color-success)" strokeDasharray="3 3" />
          <motion.circle
            initial={false}
            animate={{ cx: g.sx(x), cy: g.sy(V(x)) }}
            r="5"
            fill={isBest ? 'var(--color-success)' : 'var(--color-violet)'}
          />
          <text x={g.sx(L / 2) - 2} y={g.sy(0) - 4} fontSize="10" fontStyle="italic" textAnchor="end" fill="var(--color-ink)">
            x
          </text>
          <text x={g.sx(0) + 4} y={g.sy(g.y1) + 10} fontSize="10" fontStyle="italic" fill="var(--color-ink)">
            V
          </text>
        </svg>
      </div>

      <div className="mt-2">
        <LessonSlider label="x" value={x} min={0.5} max={L / 2 - 0.5} step={0.5} onChange={setX} color="var(--color-coral)" />
      </div>

      <p
        className={`mt-3 rounded-xl p-2 text-center text-sm font-bold ${isBest ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]' : 'bg-[var(--color-mist)] text-[var(--color-ink)]'}`}
      >
        <span dir="ltr">
          V = {fmt(x)} · {fmt(L - 2 * x)}² = {fmt(V(x))}
        </span>
        <span className="block text-xs font-semibold">
          {isBest ? 'זה הנפח המקסימלי! 🎉' : 'גזירה קטנה מדי — תיבה רדודה. גדולה מדי — הבסיס קטן. איפה האיזון?'}
        </span>
      </p>
    </div>
  );
}
