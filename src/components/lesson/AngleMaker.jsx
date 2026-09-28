import { useState } from 'react';
import { motion } from 'framer-motion';

const rad = (d) => (d * Math.PI) / 180;

function kind(a) {
  if (a === 180) return { name: 'זווית שטוחה', note: 'קו ישר!', color: 'var(--color-violet)' };
  if (a === 90) return { name: 'זווית ישרה', note: 'בדיוק כמו פינה של דף', color: 'var(--color-success)' };
  if (a < 90) return { name: 'זווית חדה', note: 'קטנה מזווית ישרה', color: 'var(--color-sky-dark)' };
  return { name: 'זווית קהה', note: 'גדולה מזווית ישרה', color: 'var(--color-coral)' };
}

/** פותחים וסוגרים זווית עם סליידר, ורואים איך קוראים לה. */
export default function AngleMaker({ caption, angle: a0 = 50 }) {
  const [a, setA] = useState(a0);
  const k = kind(a);
  const O = { x: 150, y: 150 };
  const L = 120;
  const end = { x: O.x + L * Math.cos(rad(a)), y: O.y - L * Math.sin(rad(a)) };
  const r = 38;
  const arcEnd = { x: O.x + r * Math.cos(rad(a)), y: O.y - r * Math.sin(rad(a)) };

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <p className="mb-3 text-[var(--color-ink)]">{caption}</p>}

      <svg viewBox="0 0 300 170" className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
        {a === 90 ? (
          <rect x={O.x} y={O.y - 22} width="22" height="22" fill="rgba(45,122,79,0.2)" stroke="var(--color-success)" strokeWidth="2.5" />
        ) : (
          <path
            d={`M${O.x + r},${O.y} A${r},${r} 0 0,0 ${arcEnd.x.toFixed(1)},${arcEnd.y.toFixed(1)} L${O.x},${O.y} Z`}
            fill="rgba(13,110,110,0.12)"
            stroke={k.color}
            strokeWidth="3"
          />
        )}
        <line x1={O.x} y1={O.y} x2={O.x + L} y2={O.y} stroke="var(--color-ink)" strokeWidth="5" strokeLinecap="round" />
        <motion.line
          x1={O.x}
          y1={O.y}
          initial={false}
          animate={{ x2: end.x, y2: end.y }}
          transition={{ duration: 0.15 }}
          stroke="var(--color-ink)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle cx={O.x} cy={O.y} r="6" fill="var(--color-coral)" />
      </svg>

      <label className="mt-2 flex items-center gap-3 text-sm font-semibold text-[var(--color-ink)]">
        <span className="whitespace-nowrap">פותחים:</span>
        <input
          type="range"
          dir="ltr"
          min={10}
          max={180}
          step={5}
          value={a}
          onChange={(e) => setA(Number(e.target.value))}
          className="w-full accent-[var(--color-teal)]"
        />
        <span className="w-12 font-bold" dir="ltr">
          {a}°
        </span>
      </label>

      <p className="mt-3 rounded-xl p-2 text-center text-lg font-extrabold" style={{ color: k.color, backgroundColor: 'rgba(13,110,110,0.06)' }}>
        {k.name} <span className="text-sm font-semibold text-[var(--color-slate)]">— {k.note}</span>
      </p>
    </div>
  );
}
