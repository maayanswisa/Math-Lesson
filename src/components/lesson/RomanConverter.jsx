import { useState } from 'react';
import { motion } from 'framer-motion';

const TABLE = [
  ['', 'M', 'MM', 'MMM'],
  ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'],
  ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
  ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
];
const PLACE = ['אלפים', 'מאות', 'עשרות', 'יחידות'];
const MULT = [1000, 100, 10, 1];
const COLORS = ['var(--color-violet)', 'var(--color-coral)', 'var(--color-sky-dark)', 'var(--color-teal)'];

export function toRoman(n) {
  const digits = String(n).padStart(4, '0').split('').map(Number);
  return digits.map((d, i) => TABLE[i][d]).join('');
}

/** ממיר ספרות רומיות: בוחרים מספר, ורואים אותו מפורק לאלפים/מאות/עשרות/יחידות. */
export default function RomanConverter({ caption, value: v0 = 48, max = 2030 }) {
  const [n, setN] = useState(v0);
  const digits = String(n).padStart(4, '0').split('').map(Number);
  const blocks = digits.map((d, i) => ({ d, i, roman: TABLE[i][d], value: d * MULT[i] })).filter((b) => b.d > 0);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <p className="mb-3 text-[var(--color-ink)]">{caption}</p>}

      <div className="flex items-center justify-center gap-2" dir="ltr">
        <button type="button" onClick={() => setN((x) => Math.max(1, x - 1))} className="h-9 w-9 rounded-full bg-white text-lg font-bold ring-1 ring-black/15">
          −
        </button>
        <input
          type="number"
          min={1}
          max={max}
          value={n}
          onChange={(e) => {
            const v = Math.round(Number(e.target.value));
            if (v >= 1 && v <= max) setN(v);
          }}
          aria-label="מספר"
          className="w-24 rounded-xl bg-[var(--color-mist)] py-2 text-center text-2xl font-bold outline-none focus:ring-2 focus:ring-[var(--color-teal)]"
        />
        <button type="button" onClick={() => setN((x) => Math.min(max, x + 1))} className="h-9 w-9 rounded-full bg-white text-lg font-bold ring-1 ring-black/15">
          +
        </button>
      </div>
      <input
        type="range"
        dir="ltr"
        min={1}
        max={max}
        value={n}
        onChange={(e) => setN(Number(e.target.value))}
        className="mt-3 w-full accent-[var(--color-teal)]"
        aria-label="בחירת מספר"
      />

      <div className="mt-4 flex flex-wrap justify-center gap-2" dir="ltr">
        {blocks.map((b) => (
          <motion.div
            key={`${b.i}-${b.d}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center rounded-xl px-3 py-2"
            style={{ backgroundColor: 'rgba(13,110,110,0.06)', border: `2px solid ${COLORS[b.i]}` }}
          >
            <span className="font-mono text-2xl font-extrabold" style={{ color: COLORS[b.i] }}>
              {b.roman}
            </span>
            <span className="text-sm font-bold text-[var(--color-ink)]">{b.value}</span>
            <span className="text-[10px] text-[var(--color-slate)]">{PLACE[b.i]}</span>
          </motion.div>
        ))}
      </div>

      <p className="mt-3 text-center font-mono text-3xl font-extrabold tracking-wider text-[var(--color-ink)]" dir="ltr">
        {n} = {toRoman(n)}
      </p>
    </div>
  );
}
