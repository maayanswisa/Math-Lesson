import { useState } from 'react';
import { motion } from 'framer-motion';

const NAMES = { 3: 'משולש', 4: 'ריבוע', 5: 'מחומש', 6: 'משושה', 8: 'מתומן' };
const FILLS = ['#8fd3c7', '#f2b8a8', '#c9b6ee', '#a8d4f5', '#f5d58f', '#b9e0a5'];
const rad = (d) => (d * Math.PI) / 180;

/**
 * מצולעים משוכללים סביב נקודה אחת: מניחים עותקים עד שנגמר המקום,
 * ורואים אם נשאר רווח, אם יש חפיפה, או שבדיוק 360° — ריצוף.
 */
export default function TessellationPoint({ caption }) {
  const [n, setN] = useState(4);
  const angle = (180 * (n - 2)) / n;
  const fit = Math.floor(360 / angle + 1e-9);
  const gap = 360 - fit * angle;
  const S = 62;

  const polygons = Array.from({ length: fit }, (_, k) => {
    const start = k * angle;
    const ext = 360 / n;
    let x = 0;
    let y = 0;
    const pts = [[0, 0]];
    for (let i = 0; i < n - 1; i++) {
      x += S * Math.cos(rad(start + i * ext));
      y += S * Math.sin(rad(start + i * ext));
      pts.push([x, y]);
    }
    return pts.map(([px, py]) => `${px.toFixed(1)},${(-py).toFixed(1)}`).join(' ');
  });

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <p className="mb-3 text-[var(--color-ink)]">{caption}</p>}

      <div className="mb-3 flex flex-wrap justify-center gap-2">
        {[3, 4, 5, 6, 8].map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setN(k)}
            className={`rounded-xl px-3 py-1.5 text-sm font-bold ring-1 ${
              n === k ? 'bg-[var(--color-teal)] text-white ring-[var(--color-teal)]' : 'bg-white text-[var(--color-ink)] ring-black/10'
            }`}
          >
            {NAMES[k]}
          </button>
        ))}
      </div>

      <svg viewBox="-160 -160 320 320" className="mx-auto h-60 w-60" style={{ direction: 'ltr' }}>
        {polygons.map((pts, k) => (
          <motion.polygon
            key={`${n}-${k}`}
            points={pts}
            fill={FILLS[k % FILLS.length]}
            stroke="#1a2b3c"
            strokeWidth="2"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: k * 0.15 }}
            style={{ transformOrigin: '0px 0px' }}
          />
        ))}
        {gap > 0.01 && (
          <path
            d={`M0,0 L${(40 * Math.cos(rad(fit * angle))).toFixed(1)},${(-40 * Math.sin(rad(fit * angle))).toFixed(1)} A40,40 0 0,0 40,0 Z`}
            fill="rgba(196,92,72,0.35)"
            stroke="var(--color-coral)"
            strokeWidth="2"
          />
        )}
        <circle cx="0" cy="0" r="4" fill="var(--color-coral)" />
      </svg>

      <p className="mt-2 text-center text-sm font-semibold text-[var(--color-ink)]">
        זווית של {NAMES[n]} משוכלל: {Number(angle.toFixed(1))}° · נכנסים {fit} ← {fit}×{Number(angle.toFixed(1))}° = {Number((fit * angle).toFixed(1))}°
      </p>
      <p
        className={`mt-2 rounded-xl p-2 text-center text-sm font-bold ${
          gap < 0.01 ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]' : 'bg-[var(--color-coral)]/10 text-[var(--color-coral-dark)]'
        }`}
      >
        {gap < 0.01 ? '✔️ בדיוק 360° — מרצף!' : `✖️ נשאר רווח של ${Number(gap.toFixed(1))}° — לא מרצף לבד`}
      </p>
    </div>
  );
}
