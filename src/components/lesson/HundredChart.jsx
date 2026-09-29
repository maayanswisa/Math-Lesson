import { useState } from 'react';
import MathRenderer from '../ui/MathRenderer';

/**
 * לוח המאה (1–100). בוחרים דילוג (2, 5, 10...) — והמספרים בספירה נצבעים,
 * ורואים את הדגם. mode="evenodd" — זוגיים ואי-זוגיים בשני צבעים.
 * לחיצה על מספר מסמנת אותו ומראה את העשרות והיחידות שלו.
 */
export default function HundredChart({ caption, mode = 'skip', step: s0 = 10, steps = [2, 5, 10] }) {
  const [step, setStep] = useState(s0);
  const [picked, setPicked] = useState(null);

  const style = (n) => {
    if (n === picked) return { backgroundColor: 'var(--color-sunshine)', color: 'white' };
    if (mode === 'evenodd')
      return n % 2 === 0
        ? { backgroundColor: 'rgba(13,110,110,0.18)', color: 'var(--color-teal-dark)' }
        : { backgroundColor: 'rgba(196,92,72,0.14)', color: 'var(--color-coral-dark)' };
    if (n % step === 0) return { backgroundColor: 'var(--color-violet)', color: 'white' };
    return {};
  };

  return (
    <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
      {mode === 'skip' && (
        <div className="mb-2 flex flex-wrap justify-center gap-2">
          {steps.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStep(s)}
              className={`rounded-xl px-3 py-1.5 text-sm font-bold ${step === s ? 'bg-[var(--color-violet)] text-white' : 'bg-white text-[var(--color-slate)] ring-1 ring-black/10'}`}
            >
              בקפיצות של {s}
            </button>
          ))}
        </div>
      )}
      <div className="mx-auto grid max-w-sm grid-cols-10 gap-0.5" dir="ltr">
        {Array.from({ length: 100 }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setPicked(n === picked ? null : n)}
            className="flex aspect-square items-center justify-center rounded text-[11px] font-bold text-[var(--color-ink)] ring-1 ring-black/5 sm:text-xs"
            style={style(n)}
          >
            {n}
          </button>
        ))}
      </div>
      <p className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]">
        {picked !== null ? (
          <>
            <span dir="ltr">{picked}</span> = {Math.floor(picked / 10)} עשרות ו-{picked % 10} יחידות
            {mode === 'evenodd' && ` — ${picked % 2 === 0 ? 'זוגי' : 'אי-זוגי'}`}
          </>
        ) : mode === 'evenodd' ? (
          'ירוק — זוגיים (מתחלקים לזוגות), אדום — אי-זוגיים. לחצו על מספר'
        ) : (
          `כל ${step} צבועים. איזה דגם אתם רואים? לחצו על מספר`
        )}
      </p>
    </div>
  );
}
