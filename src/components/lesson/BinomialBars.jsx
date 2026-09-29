import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider, { fmt } from './LessonSlider';

const small = (v) => (v < 0.01 ? v.toFixed(4) : fmt(v));

function choose(n, k) {
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return Math.round(r);
}

/**
 * התפלגות בינומית: n ניסויים בלתי תלויים עם הסתברות הצלחה p.
 * עמודה לכל k — ההסתברות לבדיוק k הצלחות: C(n,k)·pᵏ·(1−p)ⁿ⁻ᵏ. לוחצים על עמודה כדי לראות את החישוב.
 */
export default function BinomialBars({ caption, n: n0 = 5, p: p0 = 0.5, k: k0 = 2 }) {
  const [n, setN] = useState(n0);
  const [p, setP] = useState(p0);
  const [kRaw, setK] = useState(k0);
  const k = Math.min(kRaw, n);

  const probs = Array.from({ length: n + 1 }, (_, i) => choose(n, i) * p ** i * (1 - p) ** (n - i));
  const max = Math.max(...probs);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-3 text-[var(--color-ink)]">{caption}</MathRenderer>}

      <div className="flex items-end justify-center gap-1" dir="ltr" style={{ height: 140 }}>
        {probs.map((pr, i) => (
          <button
            key={i}
            type="button"
            aria-label={`k=${i}`}
            onClick={() => setK(i)}
            className="flex h-full min-w-0 flex-1 flex-col items-center justify-end"
            style={{ maxWidth: 36 }}
          >
            <motion.div
              className="w-full rounded-t-md"
              style={{ backgroundColor: i === k ? 'var(--color-violet)' : 'var(--color-teal)' }}
              initial={false}
              animate={{ height: `${(pr / max) * 88}%` }}
              transition={{ type: 'spring', stiffness: 140, damping: 20 }}
            />
            <span className={`mt-1 text-[10px] font-bold ${i === k ? 'text-[var(--color-violet)]' : 'text-[var(--color-slate)]'}`}>{i}</span>
          </button>
        ))}
      </div>
      <p className="mt-1 text-center text-xs text-[var(--color-slate)]">מספר ההצלחות k — לחצו על עמודה</p>

      <div className="mt-2 space-y-1">
        <LessonSlider label="n" value={n} min={1} max={12} onChange={setN} color="var(--color-teal)" />
        <LessonSlider label="p" value={p} min={0.05} max={0.95} step={0.05} onChange={setP} color="var(--color-coral)" />
      </div>

      <div className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]">
        <MathRenderer inline>{`$P(X=${k})=\\binom{${n}}{${k}}\\cdot${fmt(p)}^{${k}}\\cdot${fmt(1 - p)}^{${n - k}}$`}</MathRenderer>
        <div className="mt-1">
          <MathRenderer
            inline
          >{`$=${choose(n, k)}\\cdot${small(p ** k)}\\cdot${small((1 - p) ** (n - k))}\\approx${probs[k].toFixed(3)}$`}</MathRenderer>
        </div>
        <div className="mt-1 text-xs font-semibold text-[var(--color-slate)]">
          <span dir="ltr">{choose(n, k)}</span> מסלולים בעץ עם בדיוק <span dir="ltr">{k}</span> הצלחות — לכל אחד אותה הסתברות
        </div>
      </div>
    </div>
  );
}
