import { useState } from 'react';
import { motion } from 'framer-motion';

const pad = (n) => String(n).padStart(2, '0');

/**
 * שעון מחוגים + שעון דיגיטלי. כפתורים מזיזים את הזמן בדקה / 5 דקות / שעה,
 * ואפשר להראות גם שעון 24 שעות.
 */
export default function ClockFace({ caption, time = 3 * 60 + 35, show24 = false }) {
  // minutes since midnight
  const [t, setT] = useState(time);
  const h24 = Math.floor(t / 60) % 24;
  const min = t % 60;
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;

  const minuteAngle = min * 6;
  const hourAngle = (h24 % 12) * 30 + min * 0.5;
  const add = (d) => setT((x) => (((x + d) % 1440) + 1440) % 1440);

  const hand = (angle, len) => {
    const r = (angle * Math.PI) / 180;
    return { x2: 100 + len * Math.sin(r), y2: 100 - len * Math.cos(r) };
  };
  const mh = hand(minuteAngle, 72);
  const hh = hand(hourAngle, 46);

  const part = h24 < 5 ? 'לילה' : h24 < 12 ? 'בוקר' : h24 < 13 ? 'צהריים' : h24 < 18 ? 'אחר הצהריים' : h24 < 21 ? 'ערב' : 'לילה';

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <p className="mb-3 text-[var(--color-ink)]">{caption}</p>}

      <div className="flex flex-wrap items-center justify-center gap-6">
        <svg viewBox="0 0 200 200" className="h-48 w-48" style={{ direction: 'ltr' }}>
          <circle cx="100" cy="100" r="95" fill="white" stroke="var(--color-ink)" strokeWidth="4" />
          {Array.from({ length: 60 }, (_, i) => {
            const r = (i * 6 * Math.PI) / 180;
            const big = i % 5 === 0;
            return (
              <line
                key={i}
                x1={100 + (big ? 80 : 86) * Math.sin(r)}
                y1={100 - (big ? 80 : 86) * Math.cos(r)}
                x2={100 + 91 * Math.sin(r)}
                y2={100 - 91 * Math.cos(r)}
                stroke={big ? 'var(--color-ink)' : 'rgba(26,43,60,0.35)'}
                strokeWidth={big ? 2.5 : 1}
              />
            );
          })}
          {Array.from({ length: 12 }, (_, i) => {
            const n = i + 1;
            const r = (n * 30 * Math.PI) / 180;
            return (
              <text
                key={n}
                x={100 + 66 * Math.sin(r)}
                y={100 - 66 * Math.cos(r) + 6}
                textAnchor="middle"
                fontSize="16"
                fontWeight="700"
                fill="var(--color-ink)"
              >
                {n}
              </text>
            );
          })}
          <motion.line x1="100" y1="100" initial={false} animate={hh} stroke="var(--color-coral)" strokeWidth="7" strokeLinecap="round" />
          <motion.line x1="100" y1="100" initial={false} animate={mh} stroke="var(--color-teal)" strokeWidth="4" strokeLinecap="round" />
          <circle cx="100" cy="100" r="6" fill="var(--color-ink)" />
        </svg>

        <div className="space-y-2 text-center">
          <p className="rounded-xl bg-[var(--color-ink)] px-5 py-2 font-mono text-4xl font-bold tracking-wider text-[#8fd3c7]" dir="ltr">
            {show24 ? pad(h24) : h12}:{pad(min)}
          </p>
          <p className="text-sm text-[var(--color-slate)]">
            <span className="font-bold text-[var(--color-coral)]">מחוג קצר</span> = שעות ·{' '}
            <span className="font-bold text-[var(--color-teal-dark)]">מחוג ארוך</span> = {min} דקות
          </p>
          {show24 && <p className="text-sm font-semibold text-[var(--color-violet-dark)]">{part}</p>}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {[
          [1, 'עוד דקה'],
          [5, 'עוד 5 דקות'],
          [60, 'עוד שעה'],
          [-1, 'דקה אחורה'],
          [-5, '5 דקות אחורה'],
          [-60, 'שעה אחורה'],
        ].map(([d, label]) => (
          <motion.button
            key={d}
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => add(d)}
            className={`rounded-xl px-3 py-1.5 text-sm font-bold ${d > 0 ? 'bg-[var(--color-teal)] text-white' : 'bg-white text-[var(--color-ink)] ring-1 ring-black/15'}`}
          >
            {label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
