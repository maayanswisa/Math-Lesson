import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';

const W = 320;
const MID = W / 2;
const RANGE = 10;
const UNIT = (MID - 12) / RANGE;
const X = (v) => MID + v * UNIT;
const Y = 70;
const paren = (n) => (n < 0 ? `(${n})` : String(n));

function Slider({ label, value, min, max, onChange, color }) {
  return (
    <label className="flex items-center gap-2 text-sm font-semibold">
      <span className="w-24 shrink-0" style={{ color }}>
        {label}
      </span>
      <input
        type="range"
        dir="ltr"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{ accentColor: color }}
      />
      <span dir="ltr" className="w-8 text-end font-bold" style={{ color }}>
        {value}
      </span>
    </label>
  );
}

/**
 * ציר מספרים למספרים מכוונים.
 * mode="move" — מתחילים ב-a ומחברים/מחסרים b: חץ שמראה את התזוזה (ימינה = חיובי).
 * mode="opposite" — מספר ונגדו, במרחק שווה מאפס (ערך מוחלט).
 */
export default function SignedLine({ caption, mode = 'move', a: a0 = 3, b: b0 = -5, allowSub = true }) {
  const [a, setA] = useState(a0);
  const [b, setB] = useState(b0);
  const [sub, setSub] = useState(false);

  const move = sub ? -b : b;
  const result = a + move;
  const off = Math.abs(result) > RANGE;

  const ticks = Array.from({ length: 2 * RANGE + 1 }, (_, i) => i - RANGE);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}

      <svg viewBox={`0 0 ${W} 110`} className="mx-auto w-full max-w-md" style={{ direction: 'ltr' }}>
        <rect x={X(-RANGE) - 4} y={Y - 6} width={X(0) - X(-RANGE) + 4} height="12" rx="6" fill="rgba(196,92,72,0.1)" />
        <rect x={X(0)} y={Y - 6} width={X(RANGE) - X(0) + 4} height="12" rx="6" fill="rgba(13,110,110,0.1)" />
        <line x1={X(-RANGE) - 6} y1={Y} x2={X(RANGE) + 6} y2={Y} stroke="var(--color-slate)" strokeWidth="2" />
        {ticks.map((t) => (
          <g key={t}>
            <line x1={X(t)} y1={Y - (t === 0 ? 9 : 5)} x2={X(t)} y2={Y + (t === 0 ? 9 : 5)} stroke="var(--color-slate)" strokeWidth={t === 0 ? 2.5 : 1.2} />
            {(t % 2 === 0 || t === a || t === result) && (
              <text x={X(t)} y={Y + 24} fontSize="10" textAnchor="middle" fill={t === 0 ? 'var(--color-ink)' : 'var(--color-slate)'} fontWeight={t === 0 ? 800 : 500}>
                {t}
              </text>
            )}
          </g>
        ))}

        {mode === 'move' ? (
          <>
            <circle cx={X(a)} cy={Y} r="7" fill="var(--color-teal)" />
            {move !== 0 && !off && (
              <>
                <motion.path
                  initial={false}
                  animate={{ d: `M${X(a)},${Y - 10} Q${(X(a) + X(result)) / 2},${Y - 10 - Math.min(48, 10 + Math.abs(move) * 4)} ${X(result)},${Y - 10}` }}
                  fill="none"
                  stroke={move > 0 ? 'var(--color-success)' : 'var(--color-coral)'}
                  strokeWidth="3"
                />
                <motion.circle initial={false} animate={{ cx: X(result) }} cy={Y - 10} r="4" fill={move > 0 ? 'var(--color-success)' : 'var(--color-coral)'} />
                <text x={(X(a) + X(result)) / 2} y="12" fontSize="11" fontWeight="700" textAnchor="middle" fill={move > 0 ? 'var(--color-success)' : 'var(--color-coral)'}>
                  {move > 0 ? `→ ${move}` : `${Math.abs(move)} ←`}
                </text>
              </>
            )}
            {!off && <motion.circle initial={false} animate={{ cx: X(result) }} cy={Y} r="7" fill="var(--color-violet)" stroke="white" strokeWidth="2" />}
          </>
        ) : (
          <>
            {a !== 0 && (
              <>
                <line x1={X(0)} y1={Y - 16} x2={X(a)} y2={Y - 16} stroke="var(--color-sunshine)" strokeWidth="4" strokeLinecap="round" />
                <line x1={X(0)} y1={Y - 16} x2={X(-a)} y2={Y - 16} stroke="var(--color-sunshine)" strokeWidth="4" strokeLinecap="round" />
                <text x={(X(0) + X(a)) / 2} y={Y - 24} fontSize="11" fontWeight="700" textAnchor="middle" fill="var(--color-sunshine-dark)">
                  {Math.abs(a)}
                </text>
                <text x={(X(0) + X(-a)) / 2} y={Y - 24} fontSize="11" fontWeight="700" textAnchor="middle" fill="var(--color-sunshine-dark)">
                  {Math.abs(a)}
                </text>
              </>
            )}
            <motion.circle initial={false} animate={{ cx: X(a) }} cy={Y} r="7" fill="var(--color-teal)" />
            <motion.circle initial={false} animate={{ cx: X(-a) }} cy={Y} r="7" fill="var(--color-coral)" />
          </>
        )}
      </svg>

      <div className="mt-1 space-y-1">
        {mode === 'move' ? (
          <>
            <Slider label="מתחילים ב-" value={a} min={-8} max={8} onChange={setA} color="var(--color-teal)" />
            <Slider label={sub ? 'מחסרים את' : 'מחברים את'} value={b} min={-8} max={8} onChange={setB} color="var(--color-sky-dark)" />
          </>
        ) : (
          <Slider label="המספר" value={a} min={-9} max={9} onChange={setA} color="var(--color-teal)" />
        )}
      </div>

      {mode === 'move' && allowSub && (
        <div className="mt-2 flex justify-center gap-2">
          {[false, true].map((s) => (
            <button
              key={String(s)}
              type="button"
              onClick={() => setSub(s)}
              className={`rounded-xl px-4 py-1.5 text-sm font-bold ${sub === s ? 'bg-[var(--color-teal)] text-white' : 'bg-white text-[var(--color-slate)] ring-1 ring-black/10'}`}
            >
              {s ? 'חיסור −' : 'חיבור +'}
            </button>
          ))}
        </div>
      )}

      <p className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]">
        {mode === 'move' ? (
          <>
            <span dir="ltr">
              {sub ? `${a} − ${paren(b)} = ${a} + ${paren(-b)} = ${result}` : `${a} + ${paren(b)} = ${result}`}
            </span>
            <span className="block text-xs font-semibold text-[var(--color-slate)]">
              {move === 0 ? 'לא זזים בכלל' : move > 0 ? `זזים ${move} ימינה` : `זזים ${-move} שמאלה`}
              {off && ' — יוצא מהציר!'}
            </span>
          </>
        ) : (
          <>
            <span dir="ltr">{a}</span> ו-<span dir="ltr">{-a}</span> הם מספרים נגדיים
            <span className="block">
              המרחק מאפס (ערך מוחלט): <span dir="ltr">|{a}| = |{-a}| = {Math.abs(a)}</span>
            </span>
            <span className="block text-xs font-semibold text-[var(--color-slate)]" dir="ltr">
              {a} + {paren(-a)} = 0
            </span>
          </>
        )}
      </p>
    </div>
  );
}
