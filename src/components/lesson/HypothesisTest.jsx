import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider, { fmt } from './LessonSlider';

function choose(n, k) {
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return r;
}

/**
 * מבחן השערות על מטבע: H₀ — המטבע הוגן (p = 0.5). מטילים n פעמים ורואים k פעמים "עץ".
 * העמודות: ההתפלגות בהנחה ש-H₀ נכונה. הזנב הצבוע (k ומעלה) = ערך p.
 * אם ערך p קטן מ-α — דוחים את H₀.
 */
export default function HypothesisTest({ caption, n = 20, k: k0 = 15, alpha: a0 = 0.05 }) {
  const [k, setK] = useState(k0);
  const [alpha, setAlpha] = useState(a0);

  const probs = Array.from({ length: n + 1 }, (_, i) => choose(n, i) / 2 ** n);
  const max = Math.max(...probs);
  const pValue = probs.slice(k).reduce((x, y) => x + y, 0);
  const reject = pValue < alpha;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-3 text-[var(--color-ink)]">{caption}</MathRenderer>}

      <div className="flex items-end justify-center gap-px sm:gap-0.5" dir="ltr" style={{ height: 130 }}>
        {probs.map((pr, i) => (
          <div key={i} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end" style={{ maxWidth: 16 }}>
            <motion.div
              className="w-full rounded-t-sm"
              style={{ backgroundColor: i >= k ? (reject ? 'var(--color-coral)' : 'var(--color-sunshine)') : 'var(--color-teal)' }}
              initial={false}
              animate={{ height: `${(pr / max) * 90}%`, opacity: i >= k ? 1 : 0.55 }}
            />
            {i % 5 === 0 && <span className="mt-0.5 text-[9px] font-bold text-[var(--color-slate)]">{i}</span>}
          </div>
        ))}
      </div>
      <p className="mt-1 text-center text-xs text-[var(--color-slate)]">
        מספר ה"עץ" מתוך <span dir="ltr">{n}</span> הטלות, אם המטבע הוגן
      </p>

      <div className="mt-2 space-y-1">
        <LessonSlider label="נצפה" value={k} min={10} max={n} onChange={setK} color="var(--color-violet)" width="w-12" />
        <LessonSlider label="α" value={alpha} min={0.01} max={0.1} step={0.01} onChange={setAlpha} color="var(--color-coral)" width="w-12" />
      </div>

      <div
        className={`mt-3 rounded-xl p-2 text-center text-sm font-bold ${reject ? 'bg-[var(--color-coral)]/10 text-[var(--color-coral-dark)]' : 'bg-[var(--color-success)]/10 text-[var(--color-success)]'}`}
      >
        <span dir="ltr">
          p-value = P(X ≥ {k}) ≈ {pValue < 0.001 ? pValue.toFixed(5) : pValue.toFixed(3)} {reject ? '<' : '≥'} α = {fmt(alpha)}
        </span>
        <span className="mt-1 block">
          {reject ? (
            <>
              דוחים את <span dir="ltr">H₀</span> — תוצאה כזו נדירה מדי למטבע הוגן
            </>
          ) : (
            <>
              לא דוחים את <span dir="ltr">H₀</span> — התוצאה סבירה גם למטבע הוגן
            </>
          )}
        </span>
      </div>
    </div>
  );
}
