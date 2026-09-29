import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';

const SIZE = 300;
const R = 6;
const UNIT = (SIZE - 24) / (2 * R);
const px = (v) => SIZE / 2 + v * UNIT;
const py = (v) => SIZE / 2 - v * UNIT;
const SHAPE = [
  [1, 1],
  [4, 1],
  [1, 3],
];
const NAMES = ['A', 'B', 'C'];

const MODES = {
  move: 'הזזה',
  reflect: 'שיקוף',
  rotate: 'סיבוב',
};

function apply(mode, p, { dx, dy, axis, turns }) {
  const [x, y] = p;
  if (mode === 'move') return [x + dx, y + dy];
  if (mode === 'reflect') return axis === 'y' ? [-x, y] : [x, -y];
  let q = [x, y];
  for (let i = 0; i < turns; i++) q = [-q[1], q[0]]; // 90° נגד כיוון השעון סביב הראשית
  return q;
}

/**
 * משולש על משבצות: הזזה, שיקוף וסיבוב. המקור נשאר מקווקו,
 * ורואים שהתמונה חופפת לו — רק המקום או הכיוון משתנים.
 */
export default function TransformGrid({ caption, mode: m0 = 'move', modes = ['move', 'reflect', 'rotate'] }) {
  const [mode, setMode] = useState(m0);
  const [dx, setDx] = useState(-5);
  const [dy, setDy] = useState(-2);
  const [axis, setAxis] = useState('y');
  const [turns, setTurns] = useState(1);

  const img = SHAPE.map((p) => apply(mode, p, { dx, dy, axis, turns }));
  const grid = Array.from({ length: 2 * R + 1 }, (_, i) => i - R);
  const pts = (arr) => arr.map(([x, y]) => `${px(x)},${py(y)}`).join(' ');

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}

      {modes.length > 1 && (
        <div className="mb-2 flex justify-center gap-2">
          {modes.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setMode(k)}
              className={`rounded-xl px-3 py-1.5 text-sm font-bold ${mode === k ? 'bg-[var(--color-teal)] text-white' : 'bg-white text-[var(--color-slate)] ring-1 ring-black/10'}`}
            >
              {MODES[k]}
            </button>
          ))}
        </div>
      )}

      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="mx-auto w-full max-w-xs" style={{ direction: 'ltr' }}>
        {grid.map((g) => (
          <g key={g}>
            <line x1={px(g)} y1={py(-R)} x2={px(g)} y2={py(R)} stroke="#e3e8ee" />
            <line x1={px(-R)} y1={py(g)} x2={px(R)} y2={py(g)} stroke="#e3e8ee" />
          </g>
        ))}
        <line x1={px(-R)} y1={py(0)} x2={px(R)} y2={py(0)} stroke="var(--color-slate)" strokeWidth={mode === 'reflect' && axis === 'x' ? 4 : 1.5} />
        <line x1={px(0)} y1={py(-R)} x2={px(0)} y2={py(R)} stroke="var(--color-slate)" strokeWidth={mode === 'reflect' && axis === 'y' ? 4 : 1.5} />
        {mode === 'reflect' && (
          <text x={axis === 'y' ? px(0) + 5 : px(R) - 4} y={axis === 'y' ? py(R) + 12 : py(0) - 6} fontSize="10" fontWeight="700" textAnchor={axis === 'y' ? 'start' : 'end'} fill="var(--color-slate)">
            ציר השיקוף
          </text>
        )}
        {mode === 'rotate' && <circle cx={px(0)} cy={py(0)} r="5" fill="var(--color-sunshine)" />}

        <polygon points={pts(SHAPE)} fill="rgba(13,110,110,0.1)" stroke="var(--color-teal)" strokeWidth="2" strokeDasharray="5 4" />
        {SHAPE.map(([x, y], i) => (
          <text key={i} x={px(x) + (i === 1 ? 6 : -12)} y={py(y) + (i === 2 ? -4 : 14)} fontSize="11" fontWeight="700" fill="var(--color-teal)">
            {NAMES[i]}
          </text>
        ))}

        <motion.polygon initial={false} animate={{ points: pts(img) }} fill="rgba(124,77,204,0.25)" stroke="var(--color-violet)" strokeWidth="3" />
        {img.map(([x, y], i) => (
          <motion.text key={i} initial={false} animate={{ x: px(x) + 5, y: py(y) - 5 }} fontSize="11" fontWeight="800" fill="var(--color-violet)" stroke="white" strokeWidth="3" paintOrder="stroke">
            {NAMES[i]}′
          </motion.text>
        ))}
      </svg>

      <div className="mt-2 space-y-1">
        {mode === 'move' && (
          <>
            {[
              ['ימינה/שמאלה', dx, setDx, 'var(--color-teal)'],
              ['למעלה/למטה', dy, setDy, 'var(--color-sky-dark)'],
            ].map(([label, v, set, color]) => (
              <label key={label} className="flex items-center gap-2 text-sm font-semibold">
                <span className="w-24 shrink-0" style={{ color }}>
                  {label}
                </span>
                <input type="range" dir="ltr" min={-6} max={2} value={v} onChange={(e) => set(Number(e.target.value))} className="w-full" style={{ accentColor: color }} />
                <span dir="ltr" className="w-8 text-end font-bold" style={{ color }}>
                  {v}
                </span>
              </label>
            ))}
          </>
        )}
        {mode === 'reflect' && (
          <div className="flex justify-center gap-2">
            {['y', 'x'].map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAxis(a)}
                className={`rounded-xl px-3 py-1.5 text-sm font-bold ${axis === a ? 'bg-[var(--color-violet)] text-white' : 'bg-white text-[var(--color-slate)] ring-1 ring-black/10'}`}
              >
                שיקוף בציר <span dir="ltr">{a}</span>
              </button>
            ))}
          </div>
        )}
        {mode === 'rotate' && (
          <div className="flex flex-wrap justify-center gap-2">
            {[1, 2, 3].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTurns(t)}
                className={`rounded-xl px-3 py-1.5 text-sm font-bold ${turns === t ? 'bg-[var(--color-violet)] text-white' : 'bg-white text-[var(--color-slate)] ring-1 ring-black/10'}`}
              >
                <span dir="ltr">{t * 90}°</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]">
        {mode === 'move' && 'הזזה: כל הנקודות זזות אותו מרחק ובאותו כיוון'}
        {mode === 'reflect' && 'שיקוף: כמו במראה — כל נקודה במרחק שווה מהציר, בצד השני'}
        {mode === 'rotate' && (
          <>
            סיבוב של <span dir="ltr">{turns * 90}°</span> נגד כיוון השעון סביב הראשית (הנקודה הצהובה)
          </>
        )}
        <span className="block text-xs font-semibold text-[var(--color-slate)]">
          המקור (מקווקו) והתמונה (סגול) — חופפים: אותו גודל ואותה צורה
        </span>
      </p>
    </div>
  );
}
