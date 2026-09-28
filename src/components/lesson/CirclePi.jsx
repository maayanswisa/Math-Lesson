import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';

const MAX_R = 10;
const fmt = (n, d = 2) => String(Number(n.toFixed(d)));

/**
 * סליידר לרדיוס: המעגל גדל, ולידו ההיקף "נפרש" לקו ישר ומחולק לקטרים —
 * תמיד נכנסים בו קצת יותר מ-3 קטרים. זה π.
 */
export default function CirclePi({ caption, r: r0 = 4 }) {
  const [r, setR] = useState(r0);
  const d = 2 * r;
  const C = 2 * Math.PI * r;
  const A = Math.PI * r * r;

  const barW = 240; // אורך הקו של ההיקף המקסימלי (r = MAX_R)
  const unit = barW / (2 * Math.PI * MAX_R);
  const radiusPx = Math.max(6, r * 5.5);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}

      <svg viewBox="0 0 320 190" className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
        <motion.circle
          cx="160"
          cy="68"
          initial={false}
          animate={{ r: radiusPx }}
          fill="rgba(13, 110, 110, 0.12)"
          stroke="var(--color-teal)"
          strokeWidth="3"
        />
        <motion.line
          initial={false}
          animate={{ x1: 160 - radiusPx, x2: 160 + radiusPx }}
          y1="68"
          y2="68"
          stroke="var(--color-coral)"
          strokeWidth="3"
        />
        <circle cx="160" cy="68" r="3" fill="var(--color-ink)" />
        <text x="160" y="62" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--color-coral)">
          d={d}
        </text>

        {/* ההיקף פרוש כקו, מחולק לקטעים באורך הקוטר */}
        <g transform="translate(10, 160)">
          <motion.rect
            initial={false}
            animate={{ width: C * unit }}
            height="10"
            rx="5"
            fill="var(--color-teal)"
          />
          {[1, 2, 3].map((i) => (
            <motion.line
              key={i}
              initial={false}
              animate={{ x1: i * d * unit, x2: i * d * unit }}
              y1="-6"
              y2="16"
              stroke="var(--color-coral)"
              strokeWidth="2.5"
            />
          ))}
          <motion.text initial={false} animate={{ x: C * unit + 6 }} y="9" fontSize="11" fontWeight="700" fill="var(--color-teal-dark)">
            ≈3.14 d
          </motion.text>
        </g>
        <text x="10" y="148" fontSize="11" fill="var(--color-slate)">
          ההיקף, פרוש לקו ישר (קווים אדומים = קוטר אחד):
        </text>
      </svg>

      <label className="mt-2 flex items-center gap-3 text-sm font-semibold text-[var(--color-ink)]">
        <span className="whitespace-nowrap">רדיוס:</span>
        <input
          type="range"
          dir="ltr"
          min={1}
          max={MAX_R}
          step={1}
          value={r}
          onChange={(e) => setR(Number(e.target.value))}
          className="w-full accent-[var(--color-teal)]"
        />
        <span dir="ltr" className="w-14 whitespace-nowrap text-[var(--color-teal-dark)]">
          r = {r}
        </span>
      </label>

      <div className="mt-3 grid gap-2 text-center sm:grid-cols-3">
        <span className="rounded-xl bg-[var(--color-coral)]/10 px-2 py-2 text-[var(--color-coral-dark)]">
          <MathRenderer inline>{`$d=2r=${d}$`}</MathRenderer>
        </span>
        <span className="rounded-xl bg-[var(--color-teal)]/10 px-2 py-2 text-[var(--color-teal-dark)]">
          <MathRenderer inline>{`$P=2\\pi r\\approx${fmt(C)}$`}</MathRenderer>
        </span>
        <span className="rounded-xl bg-[var(--color-violet)]/10 px-2 py-2 text-[var(--color-violet-dark)]">
          <MathRenderer inline>{`$S=\\pi r^2\\approx${fmt(A)}$`}</MathRenderer>
        </span>
      </div>
      <p className="mt-2 text-center text-sm font-semibold text-[var(--color-ink)]">
        <MathRenderer inline>{`היקף חלקי קוטר: $\\frac{${fmt(C)}}{${d}}\\approx${fmt(C / d, 4)}$ — תמיד אותו מספר, $\\pi$!`}</MathRenderer>
      </p>
    </div>
  );
}
