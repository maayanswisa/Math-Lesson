import { useState } from 'react';
import { motion } from 'framer-motion';

// מקומות: 6 = מיליונים … 0 = יחידות, −1 = עשיריות …
const PLACE_NAMES = {
  6: 'מיליונים',
  5: 'מאות אלפים',
  4: 'עשרות אלפים',
  3: 'אלפים',
  2: 'מאות',
  1: 'עשרות',
  0: 'יחידות',
  '-1': 'עשיריות',
  '-2': 'מאיות',
  '-3': 'אלפיות',
};

/** "3.4" → { digits: "34", point: 1 } (point = כמה ספרות לפני הנקודה) */
function parse(str) {
  const [i, f = ''] = String(str).split('.');
  return { digits: i + f, point: i.length };
}

function toText(digits, point) {
  const padded = point <= 0 ? '0'.repeat(1 - point) + digits : digits;
  const p = Math.max(point, 1);
  const withEnd = padded.length < p ? padded + '0'.repeat(p - padded.length) : padded;
  let int = withEnd.slice(0, p).replace(/^0+(?=\d)/, '');
  let fr = withEnd.slice(p).replace(/0+$/, '');
  int = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return fr ? `${int}.${fr}` : int;
}

/**
 * טבלת ערך המקום. כפתורי ×10 / ÷10 מזיזים את הספרות מקום אחד —
 * רואים שבכפל ב-10 כל ספרה "עולה" מקום, ובחילוק "יורדת".
 * places — אילו מקומות להציג, מהגדול לקטן.
 */
export default function PlaceValue({ caption, start = '3.4', places = [3, 2, 1, 0, -1, -2, -3], shift = true }) {
  const init = parse(start);
  const [point, setPoint] = useState(init.point);
  const { digits } = init;

  const hi = Math.max(...places);
  const lo = Math.min(...places);
  // ספרה i נמצאת במקום point-1-i
  const cells = places.map((p) => {
    const i = point - 1 - p;
    const d = i >= 0 && i < digits.length ? digits[i] : null;
    return { p, d };
  });
  // הספרה הגבוהה נמצאת במקום point−1 והנמוכה ב-point−len; אסור שייצאו מהטבלה
  const canMul = point <= hi;
  const canDiv = point - digits.length - 1 >= lo;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <p className="mb-3 text-[var(--color-ink)]">{caption}</p>}

      <div className="overflow-x-auto">
        <div className="mx-auto flex w-fit" dir="ltr">
          {cells.map(({ p, d }) => (
            <div key={p} className="flex items-stretch">
              {p === -1 && <div className="flex w-3 items-end justify-center pb-2 text-3xl font-extrabold text-[var(--color-coral)]">.</div>}
              <div
                className={`flex w-12 flex-col items-center rounded-lg sm:w-16 ${p >= 0 ? 'bg-[var(--color-teal)]/8' : 'bg-[var(--color-violet)]/8'} mx-0.5`}
              >
                <span className="h-9 px-0.5 pt-1 text-center text-[9px] leading-tight text-[var(--color-slate)] sm:text-[10px]">
                  {PLACE_NAMES[p]}
                </span>
                <motion.span
                  key={`${p}-${point}`}
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className={`pb-2 font-mono text-3xl font-bold ${d == null ? 'text-black/15' : 'text-[var(--color-ink)]'}`}
                >
                  {d ?? '0'}
                </motion.span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-3 text-center font-mono text-2xl font-bold text-[var(--color-teal-dark)]" dir="ltr">
        {toText(digits, point)}
      </p>

      {shift && (
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            disabled={!canMul}
            onClick={() => setPoint((x) => x + 1)}
            className="rounded-xl bg-[var(--color-teal)] px-4 py-2 text-sm font-bold text-white disabled:opacity-40"
          >
            × 10
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            disabled={!canDiv}
            onClick={() => setPoint((x) => x - 1)}
            className="rounded-xl bg-[var(--color-violet)] px-4 py-2 text-sm font-bold text-white disabled:opacity-40"
          >
            ÷ 10
          </motion.button>
          <button
            type="button"
            onClick={() => setPoint(init.point)}
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[var(--color-slate)] ring-1 ring-black/10"
          >
            ↺ מההתחלה
          </button>
        </div>
      )}
    </div>
  );
}
