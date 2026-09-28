import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';

/**
 * דוגמה פתורה שנחשפת שלב אחרי שלב. התלמיד קובע את הקצב בלחיצה,
 * והשלב האחרון שנחשף מודגש — כך העין יודעת בדיוק מה השתנה.
 */
export default function StepByStep({ title, steps }) {
  const [shown, setShown] = useState(1);
  const done = shown >= steps.length;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {title && (
        <h4 className="mb-3 font-bold text-[var(--color-ink)]">
          <MathRenderer inline>{title}</MathRenderer>
        </h4>
      )}

      <ol className="space-y-2">
        <AnimatePresence initial={false}>
          {steps.slice(0, shown).map((step, i) => {
            const current = i === shown - 1;
            return (
              <motion.li
                key={i}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: current ? 1 : 0.55, y: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className={`flex flex-col gap-1 rounded-xl px-3 py-2 sm:flex-row sm:items-center sm:gap-4 ${
                  current ? 'bg-[var(--color-teal)]/8 ring-1 ring-[var(--color-teal)]/25' : ''
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      current ? 'bg-[var(--color-teal)] text-white' : 'bg-[var(--color-mist)] text-[var(--color-slate)]'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <MathRenderer inline className="text-lg">{`$${step.math}$`}</MathRenderer>
                </span>
                {step.note && (
                  <MathRenderer inline className="text-sm text-[var(--color-slate)]">
                    {step.note}
                  </MathRenderer>
                )}
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ol>

      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="text-xs text-[var(--color-slate)]">
          שלב {shown} מתוך {steps.length}
        </span>
        {done ? (
          <button
            type="button"
            onClick={() => setShown(1)}
            className="text-sm font-semibold text-[var(--color-teal)] hover:underline"
          >
            ↺ מההתחלה
          </button>
        ) : (
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => setShown((n) => n + 1)}
            className="rounded-xl bg-[var(--color-teal)] px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-[var(--color-teal-dark)]"
          >
            לשלב הבא ←
          </motion.button>
        )}
      </div>
    </div>
  );
}
