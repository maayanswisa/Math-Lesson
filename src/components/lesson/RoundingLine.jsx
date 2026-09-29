import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider from './LessonSlider';

const W = 320;
const PAD = 26;
const Y = 64;
const NAMES = { 10: 'עשרות', 100: 'מאות', 1000: 'אלפים', 10000: 'עשרות אלפים', 100000: 'מאות אלפים' };
const fmtN = (n) => n.toLocaleString('en-US');

/**
 * עיגול על ישר: המספר יושב בין שני מספרים "עגולים". לאיזה מהם הוא קרוב יותר?
 * האמצע הוא נקודת ההכרעה — מהאמצע ומעלה מעגלים למעלה.
 */
export default function RoundingLine({ caption, value: v0 = 347812, units = [1000, 10000, 100000], unit: u0 }) {
  const [unit, setUnit] = useState(u0 ?? units[0]);
  const [offset, setOffset] = useState(0);
  const value = v0 + offset * (unit / 10);
  const lo = Math.floor(value / unit) * unit;
  const hi = lo + unit;
  const mid = lo + unit / 2;
  const rounded = value - lo >= unit / 2 ? hi : lo;
  const X = (v) => PAD + ((v - lo) / unit) * (W - 2 * PAD);
  const digit = Math.floor(((value - lo) / unit) * 10);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}

      <div className="mb-2 flex flex-wrap justify-center gap-2">
        {units.map((u) => (
          <button
            key={u}
            type="button"
            onClick={() => {
              setUnit(u);
              setOffset(0);
            }}
            className={`rounded-xl px-3 py-1.5 text-sm font-bold ${unit === u ? 'bg-[var(--color-teal)] text-white' : 'bg-white text-[var(--color-slate)] ring-1 ring-black/10'}`}
          >
            ל{NAMES[u]}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} 110`} className="mx-auto w-full max-w-md" style={{ direction: 'ltr' }}>
        <line x1={PAD} y1={Y} x2={W - PAD} y2={Y} stroke="var(--color-ink)" strokeWidth="2" />
        {Array.from({ length: 11 }, (_, i) => lo + (i * unit) / 10).map((t, i) => (
          <line
            key={i}
            x1={X(t)}
            y1={Y - (i % 5 === 0 ? 9 : 4)}
            x2={X(t)}
            y2={Y + (i % 5 === 0 ? 9 : 4)}
            stroke={i === 5 ? 'var(--color-sunshine-dark)' : 'var(--color-slate)'}
            strokeWidth={i === 5 ? 2 : 1}
          />
        ))}
        <text x={X(lo)} y={Y + 26} fontSize="10" fontWeight="700" textAnchor="middle" fill="var(--color-ink)">
          {fmtN(lo)}
        </text>
        <text x={X(hi)} y={Y + 26} fontSize="10" fontWeight="700" textAnchor="middle" fill="var(--color-ink)">
          {fmtN(hi)}
        </text>
        <text x={X(mid)} y={Y + 26} fontSize="9" textAnchor="middle" fill="var(--color-sunshine-dark)">
          אמצע
        </text>
        <motion.path
          initial={false}
          animate={{ d: `M${X(value)},${Y - 12} Q${(X(value) + X(rounded)) / 2},${Y - 44} ${X(rounded)},${Y - 12}` }}
          fill="none"
          stroke="var(--color-success)"
          strokeWidth="2.5"
          strokeDasharray="5 4"
        />
        <circle cx={X(rounded)} cy={Y} r="7" fill="var(--color-success)" />
        <motion.circle initial={false} animate={{ cx: X(value) }} cy={Y} r="7" fill="var(--color-violet)" stroke="white" strokeWidth="2" />
        <motion.text
          initial={false}
          animate={{ x: X(value) }}
          y={Y - 16}
          fontSize="10"
          fontWeight="800"
          textAnchor="middle"
          fill="var(--color-violet)"
        >
          {fmtN(value)}
        </motion.text>
      </svg>

      <LessonSlider label="הזיזו" value={offset} min={-9} max={9} onChange={setOffset} color="var(--color-violet)" width="w-12" display="" />

      <p className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]">
        <span dir="ltr">{fmtN(value)}</span> מעוגל ל{NAMES[unit]}:{' '}
        <span className="text-[var(--color-success)]" dir="ltr">
          {fmtN(rounded)}
        </span>
        <span className="block text-xs font-semibold text-[var(--color-slate)]">
          הספרה שאחרי מקום העיגול: {digit} — {digit >= 5 ? '5 ומעלה, מעגלים למעלה' : '4 ומטה, מעגלים למטה'}
        </span>
      </p>
    </div>
  );
}
