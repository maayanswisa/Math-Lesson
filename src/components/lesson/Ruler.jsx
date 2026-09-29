import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider from './LessonSlider';

const W = 320;
const PAD = 14;
const MAX = 15;
const CM = (W - 2 * PAD) / MAX;

/**
 * mode="measure" — עיפרון ליד סרגל. שנו את האורך וקראו: מתחילים מ-0!
 * mode="broken" — קו שבור משלושה קטעים: האורך הכולל = סכום הקטעים.
 */
export default function Ruler({ caption, mode = 'measure', len: l0 = 7, parts: p0 = [3, 4, 2] }) {
  const [len, setLen] = useState(l0);
  const [parts, setParts] = useState(p0);

  if (mode === 'broken') {
    const pts = [[20, 120]];
    const angles = [-35, 30, -40];
    parts.forEach((p, i) => {
      const [x, y] = pts[pts.length - 1];
      const a = (angles[i] * Math.PI) / 180;
      pts.push([x + p * 17 * Math.cos(a), y + p * 17 * Math.sin(a)]);
    });
    const total = parts.reduce((a, b) => a + b, 0);
    const colors = ['var(--color-teal)', 'var(--color-coral)', 'var(--color-violet)'];
    return (
      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
        {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
        <svg viewBox="0 0 300 180" className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
          {parts.map((p, i) => (
            <g key={i}>
              <line x1={pts[i][0]} y1={pts[i][1]} x2={pts[i + 1][0]} y2={pts[i + 1][1]} stroke={colors[i]} strokeWidth="5" strokeLinecap="round" />
              <text
                x={(pts[i][0] + pts[i + 1][0]) / 2}
                y={(pts[i][1] + pts[i + 1][1]) / 2 - 10}
                fontSize="13"
                fontWeight="800"
                textAnchor="middle"
                fill={colors[i]}
              >
                {p}
              </text>
            </g>
          ))}
          {pts.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4" fill="var(--color-ink)" />
          ))}
        </svg>
        <div className="space-y-1">
          {parts.map((p, i) => (
            <LessonSlider
              key={i}
              label={`קטע ${i + 1}`}
              value={p}
              min={1}
              max={5}
              onChange={(v) => setParts((ps) => ps.map((x, j) => (j === i ? v : x)))}
              color={colors[i]}
              suffix=" ס״מ"
              width="w-14"
            />
          ))}
        </div>
        <p className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-lg font-extrabold text-[var(--color-ink)]">
          <span dir="ltr">
            {parts.join(' + ')} = {total} ס״מ
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
      <svg viewBox={`0 0 ${W} 110`} className="mx-auto w-full max-w-md" style={{ direction: 'ltr' }}>
        {/* העיפרון */}
        <motion.rect initial={false} animate={{ width: Math.max(1, len * CM - 14) }} x={PAD} y="18" height="16" rx="3" fill="var(--color-sunshine)" />
        <motion.polygon
          initial={false}
          animate={{ points: `${PAD + len * CM - 14},18 ${PAD + len * CM},26 ${PAD + len * CM - 14},34` }}
          fill="#f2d3a0"
          stroke="var(--color-sunshine-dark)"
        />
        <line x1={PAD} y1="10" x2={PAD} y2="50" stroke="var(--color-coral)" strokeWidth="1.5" strokeDasharray="3 3" />
        {/* הסרגל */}
        <rect x={PAD - 8} y="44" width={W - 2 * PAD + 16} height="44" rx="4" fill="#fdf6e3" stroke="var(--color-slate)" />
        {Array.from({ length: MAX * 2 + 1 }, (_, i) => i / 2).map((v) => (
          <line
            key={v}
            x1={PAD + v * CM}
            y1="44"
            x2={PAD + v * CM}
            y2={Number.isInteger(v) ? 58 : 51}
            stroke="var(--color-ink)"
            strokeWidth={Number.isInteger(v) ? 1.3 : 0.8}
          />
        ))}
        {Array.from({ length: MAX + 1 }, (_, v) => v).map((v) => (
          <text
            key={v}
            x={PAD + v * CM}
            y="72"
            fontSize="9"
            textAnchor="middle"
            fill="var(--color-ink)"
            fontWeight={v === 0 || v === len ? 800 : 400}
          >
            {v}
          </text>
        ))}
        <text x={W / 2} y="84" fontSize="8" textAnchor="middle" fill="var(--color-slate)">
          cm
        </text>
        <motion.line
          initial={false}
          animate={{ x1: PAD + len * CM, x2: PAD + len * CM }}
          y1="12"
          y2="58"
          stroke="var(--color-violet)"
          strokeWidth="2"
          strokeDasharray="3 3"
        />
      </svg>
      <LessonSlider label="אורך" value={len} min={1} max={MAX} onChange={setLen} color="var(--color-sunshine-dark)" suffix=" ס״מ" width="w-10" />
      <p className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-lg font-extrabold text-[var(--color-ink)]">
        העיפרון באורך {len} ס״מ
        <span className="block text-xs font-semibold text-[var(--color-slate)]">הקצה אחד על ה-0 — וקוראים איפה נגמר הקצה השני</span>
      </p>
    </div>
  );
}
