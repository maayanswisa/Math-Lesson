import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';

const SIZE = 5;
const ITEMS = [
  { r: 0, c: 0, e: '🏫', name: 'בית הספר' },
  { r: 0, c: 4, e: '🌳', name: 'העץ' },
  { r: 4, c: 0, e: '⚽', name: 'המגרש' },
  { r: 4, c: 4, e: '🏠', name: 'הבית' },
  { r: 2, c: 2, e: '🍦', name: 'הגלידה' },
];

function describe(r, c) {
  const on = ITEMS.find((it) => it.r === r && it.c === c);
  if (on) return `הארנב הגיע אל ${on.name}! ${on.e}`;
  const parts = [];
  for (const it of ITEMS) {
    if (it.r === r && Math.abs(it.c - c) === 1) parts.push(`${it.c < c ? 'מימין ל' : 'משמאל ל'}${it.name}`);
    if (it.c === c && Math.abs(it.r - r) === 1) parts.push(`${it.r < r ? 'מתחת ל' : 'מעל ל'}${it.name}`);
  }
  return parts.length ? `הארנב נמצא ${parts.join(' ו')}` : 'הזיזו את הארנב אל אחד המקומות במפה';
}

/**
 * מפה של משבצות. מזיזים ארנב בחצים (למעלה/למטה/ימינה/שמאלה),
 * ומתארים את המקום שלו ביחס לעצמים: מעל, מתחת, מימין, משמאל.
 */
export default function GridMap({ caption }) {
  const [pos, setPos] = useState({ r: 2, c: 0 });
  const [steps, setSteps] = useState(0);
  const move = (dr, dc) => {
    const r = Math.max(0, Math.min(SIZE - 1, pos.r + dr));
    const c = Math.max(0, Math.min(SIZE - 1, pos.c + dc));
    if (r === pos.r && c === pos.c) return;
    setPos({ r, c });
    setSteps((s) => s + 1);
  };
  const btn = 'h-11 w-11 rounded-xl bg-[var(--color-teal)] text-xl font-bold text-white shadow-sm hover:bg-[var(--color-teal-dark)]';

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-3 text-[var(--color-ink)]">{caption}</MathRenderer>}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="relative grid grid-cols-5 gap-1 rounded-xl bg-[#e7f3e3] p-1.5" dir="ltr">
          {Array.from({ length: SIZE * SIZE }, (_, i) => {
            const r = Math.floor(i / SIZE);
            const c = i % SIZE;
            const it = ITEMS.find((x) => x.r === r && x.c === c);
            return (
              <div key={i} className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/70 text-xl sm:h-11 sm:w-11">
                {it?.e}
              </div>
            );
          })}
          <motion.div
            className="pointer-events-none absolute flex h-10 w-10 items-center justify-center text-2xl sm:h-11 sm:w-11"
            initial={false}
            animate={{ left: `calc(6px + ${pos.c} * (100% - 12px + 4px) / 5)`, top: `calc(6px + ${pos.r} * (100% - 12px + 4px) / 5)` }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            🐰
          </motion.div>
        </div>

        <div className="grid grid-cols-3 gap-1" dir="ltr">
          <span />
          <button type="button" aria-label="למעלה" onClick={() => move(-1, 0)} className={btn}>
            ⬆
          </button>
          <span />
          <button type="button" aria-label="שמאלה" onClick={() => move(0, -1)} className={btn}>
            ⬅
          </button>
          <span />
          <button type="button" aria-label="ימינה" onClick={() => move(0, 1)} className={btn}>
            ➡
          </button>
          <span />
          <button type="button" aria-label="למטה" onClick={() => move(1, 0)} className={btn}>
            ⬇
          </button>
          <span />
        </div>
      </div>
      <p className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]">
        {describe(pos.r, pos.c)}
        <span className="block text-xs font-semibold text-[var(--color-slate)]">צעדים: {steps}</span>
      </p>
    </div>
  );
}
