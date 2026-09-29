import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider, { fmt } from './LessonSlider';

const W = 300;
const H = 200;
const PAD = 22;
const N = 10;

/**
 * איברי סדרה כעמודות (n, aₙ). mode="arith" — הפרש d; mode="geom" — מנה q.
 * sums — מציג גם את הסכומים החלקיים Sₙ, ובהנדסית עם |q|<1 את הגבול a₁/(1−q).
 */
export default function SequencePlot({ caption, mode = 'arith', a1: a0 = 2, d: d0 = 3, q: q0 = 0.5, sums = false }) {
  const [a1, setA1] = useState(a0);
  const [d, setD] = useState(d0);
  const [q, setQ] = useState(q0);
  const [showS, setShowS] = useState(false);

  const term = (n) => (mode === 'arith' ? a1 + (n - 1) * d : a1 * q ** (n - 1));
  const terms = Array.from({ length: N }, (_, i) => term(i + 1));
  const partial = terms.map((_, i) => terms.slice(0, i + 1).reduce((a, b) => a + b, 0));
  const limit = mode === 'geom' && Math.abs(q) < 1 ? a1 / (1 - q) : null;
  const vals = showS ? partial : terms;
  const extra = showS && limit !== null ? [limit] : [];
  const hi = Math.max(1, ...vals, ...extra);
  const lo = Math.min(0, ...vals, ...extra);
  const sy = (v) => H - PAD - ((v - lo) / (hi - lo)) * (H - 2 * PAD);
  const bw = (W - 2 * PAD) / N;
  const sx = (i) => PAD + i * bw + bw / 2;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}

      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
        <line x1={PAD} y1={sy(0)} x2={W - 6} y2={sy(0)} stroke="var(--color-ink)" strokeWidth="1.5" />
        {limit !== null && showS && (
          <>
            <line x1={PAD} y1={sy(limit)} x2={W - 6} y2={sy(limit)} stroke="var(--color-coral)" strokeWidth="2" strokeDasharray="6 4" />
            <text x={W - 8} y={sy(limit) - 5} fontSize="10" fontWeight="700" textAnchor="end" fill="var(--color-coral)">
              S = {fmt(limit)}
            </text>
          </>
        )}
        {vals.map((v, i) => (
          <g key={i}>
            <motion.rect
              initial={false}
              animate={{ y: Math.min(sy(v), sy(0)), height: Math.max(1, Math.abs(sy(v) - sy(0))) }}
              x={sx(i) - bw * 0.3}
              width={bw * 0.6}
              rx="3"
              fill={showS ? 'var(--color-violet)' : 'var(--color-teal)'}
              opacity="0.85"
            />
            <text x={sx(i)} y={H - 6} fontSize="9" textAnchor="middle" fill="var(--color-slate)">
              {i + 1}
            </text>
            <text x={sx(i)} y={v >= 0 ? sy(v) - 3 : sy(v) + 10} fontSize="8.5" fontWeight="700" textAnchor="middle" fill="var(--color-ink)">
              {fmt(v)}
            </text>
          </g>
        ))}
      </svg>

      <div className="mt-2 space-y-1">
        <LessonSlider label="a₁" value={a1} min={-5} max={10} step={1} onChange={setA1} color="var(--color-teal)" />
        {mode === 'arith' ? (
          <LessonSlider label="d" value={d} min={-3} max={5} step={0.5} onChange={setD} color="var(--color-violet)" />
        ) : (
          <LessonSlider label="q" value={q} min={-1.5} max={2} step={0.1} onChange={setQ} color="var(--color-violet)" />
        )}
      </div>

      {sums && (
        <div className="mt-2 flex justify-center gap-2">
          {[false, true].map((v) => (
            <button
              key={String(v)}
              type="button"
              onClick={() => setShowS(v)}
              className={`rounded-xl px-3 py-1.5 text-sm font-bold ${showS === v ? 'bg-[var(--color-teal)] text-white' : 'bg-white text-[var(--color-slate)] ring-1 ring-black/10'}`}
            >
              {v ? (
                <>
                  סכומים <i dir="ltr">Sₙ</i>
                </>
              ) : (
                <>
                  איברים <i dir="ltr">aₙ</i>
                </>
              )}
            </button>
          ))}
        </div>
      )}

      <div className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]">
        <MathRenderer inline>
          {mode === 'arith'
            ? `$a_n=${fmt(a1)}+(n-1)\\cdot${d < 0 ? `(${fmt(d)})` : fmt(d)}$`
            : `$a_n=${fmt(a1)}\\cdot${q < 0 ? `(${fmt(q)})` : fmt(q)}^{n-1}$`}
        </MathRenderer>
        <div className="mt-1 text-xs font-semibold text-[var(--color-slate)]">
          {mode === 'arith' ? (
            showS ? (
              'הסכומים יוצרים פרבולה'
            ) : (
              'העמודות עולות (או יורדות) באותה כמות — על קו ישר'
            )
          ) : limit !== null && showS ? (
            <>
              <span dir="ltr">|q| &lt; 1</span> — הסכומים מתקרבים לגבול <span dir="ltr">a₁/(1−q) = {fmt(limit)}</span>
            </>
          ) : Math.abs(q) < 1 ? (
            <>
              <span dir="ltr">|q| &lt; 1</span> — האיברים דועכים לאפס
            </>
          ) : (
            <>
              <span dir="ltr">|q| ≥ 1</span> — האיברים לא דועכים
            </>
          )}
        </div>
      </div>
    </div>
  );
}
