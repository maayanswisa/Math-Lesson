import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider from './LessonSlider';

const W = 320;
const PAD = 14;
const Y = 70;

/**
 * ישר מספרים מ-0 עד max, עם קפיצות: מתחילים ב-start, וקופצים jumps פעמים בגודל step
 * קדימה (או אחורה). מתאים לספירה בדילוגים, לחיבור ולחיסור.
 */
export default function JumpLine({ caption, max = 20, start: s0 = 3, step: st0 = 2, jumps: j0 = 4, back: b0 = false, steps = [1, 2, 5, 10] }) {
  const [start, setStart] = useState(s0);
  const [stepIdx, setStepIdx] = useState(Math.max(0, steps.indexOf(st0)));
  const [jumps, setJumps] = useState(j0);
  const [back, setBack] = useState(b0);

  const step = steps[stepIdx];
  const dir = back ? -1 : 1;
  const X = (v) => PAD + (v / max) * (W - 2 * PAD);
  const stops = [start];
  for (let i = 0; i < jumps; i++) {
    const nx = stops[stops.length - 1] + dir * step;
    if (nx < 0 || nx > max) break;
    stops.push(nx);
  }
  const end = stops[stops.length - 1];
  const tickEvery = max <= 20 ? 1 : max <= 100 ? 5 : 50;
  const labelEvery = max <= 20 ? 2 : max <= 100 ? 10 : 100;
  const ticks = Array.from({ length: max / tickEvery + 1 }, (_, i) => i * tickEvery);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
      <svg viewBox={`0 0 ${W} 100`} className="mx-auto w-full max-w-md" style={{ direction: 'ltr' }}>
        <line x1={PAD - 4} y1={Y} x2={W - PAD + 4} y2={Y} stroke="var(--color-ink)" strokeWidth="2" />
        {ticks.map((t) => (
          <g key={t}>
            <line x1={X(t)} y1={Y - (t % labelEvery === 0 ? 6 : 3)} x2={X(t)} y2={Y + (t % labelEvery === 0 ? 6 : 3)} stroke="var(--color-slate)" />
            {t % labelEvery === 0 && (
              <text x={X(t)} y={Y + 20} fontSize="10" textAnchor="middle" fill="var(--color-slate)">
                {t}
              </text>
            )}
          </g>
        ))}
        {stops.slice(1).map((v, i) => {
          const from = stops[i];
          const mid = (X(from) + X(v)) / 2;
          const hgt = Math.min(40, 12 + Math.abs(X(v) - X(from)) * 0.6);
          return (
            <motion.path
              key={`${i}-${from}-${v}`}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: i * 0.15, duration: 0.3 }}
              d={`M${X(from)},${Y - 4} Q${mid},${Y - 4 - hgt * 2} ${X(v)},${Y - 4}`}
              fill="none"
              stroke={back ? 'var(--color-coral)' : 'var(--color-teal)'}
              strokeWidth="2.5"
            />
          );
        })}
        <circle cx={X(start)} cy={Y} r="6" fill="var(--color-violet)" />
        <circle cx={X(end)} cy={Y} r="6" fill="var(--color-sunshine)" stroke="white" strokeWidth="2" />
        {stops.map((v, i) => (
          <text key={`l${i}`} x={X(v)} y={Y - 12} fontSize="10" fontWeight="800" textAnchor="middle" fill="var(--color-ink)">
            {i === 0 || i === stops.length - 1 ? v : ''}
          </text>
        ))}
      </svg>

      <div className="mt-1 space-y-1">
        <LessonSlider label="מתחילים" value={start} min={0} max={max} onChange={setStart} color="var(--color-violet)" width="w-20" />
        <LessonSlider
          label="קפיצה"
          value={stepIdx}
          min={0}
          max={steps.length - 1}
          onChange={setStepIdx}
          color="var(--color-teal)"
          width="w-16"
          display={step}
        />
        <LessonSlider label="כמה קפיצות" value={jumps} min={0} max={10} onChange={setJumps} color="var(--color-sunshine-dark)" width="w-20" />
      </div>
      <div className="mt-2 flex justify-center gap-2">
        {[false, true].map((v) => (
          <button
            key={String(v)}
            type="button"
            onClick={() => setBack(v)}
            className={`rounded-xl px-4 py-1.5 text-sm font-bold ${back === v ? 'bg-[var(--color-teal)] text-white' : 'bg-white text-[var(--color-slate)] ring-1 ring-black/10'}`}
          >
            {v ? 'אחורה ⬅️' : 'קדימה ➡️'}
          </button>
        ))}
      </div>

      <p className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-lg font-extrabold text-[var(--color-ink)]" dir="ltr">
        {stops.length === 2 ? `${start} ${back ? '−' : '+'} ${step} = ${end}` : stops.join(' → ')}
      </p>
      {stops.length - 1 < jumps && <p className="mt-1 text-center text-xs font-semibold text-[var(--color-coral-dark)]">הגענו לקצה הישר!</p>}
    </div>
  );
}
