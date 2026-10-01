import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';
import { hasLesson } from '../../data/lessons';
import { correctAnswerText, solutionSteps } from '../../lib/solutionSteps';

/** רשימת שלבים ממוספרת (לסיכום המבחן — כולם גלויים). */
export function StepList({ steps, className = '' }) {
  return (
    <ol className={`space-y-2 ${className}`}>
      {steps.map((s, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-teal)]/10 text-xs font-bold text-[var(--color-teal-dark)]">
            {i + 1}
          </span>
          <MathRenderer className="min-w-0 flex-1 text-[var(--color-ink)]">{s}</MathRenderer>
        </li>
      ))}
    </ol>
  );
}

/**
 * אחרי תשובה שגויה: מה בחרת מול מה נכון, ואז "איך פותרים?" — שלב אחר שלב,
 * עם התשובה הנכונה בסוף וקישור להסבר המלא של הנושא.
 */
export default function SolutionSteps({ question, selectedIndex }) {
  const steps = solutionSteps(question);
  const correct = correctAnswerText(question);
  const chosen = typeof selectedIndex === 'number' && Array.isArray(question.options) ? question.options[selectedIndex] : null;
  const [shown, setShown] = useState(1);
  const done = shown >= steps.length;

  return (
    <div className="space-y-4">
      {correct != null && (
        <div className="grid gap-2 sm:grid-cols-2">
          {chosen != null && (
            <div className="rounded-xl bg-[var(--color-coral)]/8 px-4 py-2.5 ring-1 ring-[var(--color-coral)]/30">
              <p className="text-xs font-semibold text-[var(--color-coral-dark)]">✗ התשובה שלך</p>
              <MathRenderer className="text-[var(--color-ink)]">{chosen}</MathRenderer>
            </div>
          )}
          <div className="rounded-xl bg-[var(--color-success)]/8 px-4 py-2.5 ring-1 ring-[var(--color-success)]/40">
            <p className="text-xs font-semibold text-[var(--color-success)]">✓ התשובה הנכונה</p>
            <MathRenderer className="text-[var(--color-ink)]">{correct}</MathRenderer>
          </div>
        </div>
      )}

      {steps.length > 0 && (
        <div className="rounded-2xl bg-[var(--color-paper)] p-4 ring-1 ring-black/5">
          <p className="mb-3 text-sm font-bold text-[var(--color-teal-dark)]">🧩 איך פותרים?</p>
          <ol className="space-y-2.5">
            {steps.slice(0, shown).map((s, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-2.5"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-teal)] text-xs font-bold text-white">
                  {i + 1}
                </span>
                <MathRenderer className="min-w-0 flex-1 text-[var(--color-ink)]">{s}</MathRenderer>
              </motion.li>
            ))}
          </ol>
          {done ? (
            correct != null && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-black/5 pt-3 text-sm font-bold text-[var(--color-success)]"
              >
                ✅ ולכן התשובה:{' '}
                <MathRenderer inline className="text-[var(--color-ink)]">
                  {correct}
                </MathRenderer>
              </motion.p>
            )
          ) : (
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setShown((n) => n + 1)}
                className="rounded-lg bg-[var(--color-teal)] px-3 py-1.5 text-xs font-bold text-white hover:bg-[var(--color-teal-dark)]"
              >
                הצעד הבא ←
              </button>
              <button
                type="button"
                onClick={() => setShown(steps.length)}
                className="rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-[var(--color-teal)] ring-1 ring-[var(--color-teal)]/30"
              >
                הצג את כל הפתרון
              </button>
            </div>
          )}
        </div>
      )}

      {question.topic_id && hasLesson(question.topic_id) && (
        <a
          href={`/learn/${question.topic_id}`}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-1 text-sm font-bold text-[var(--color-sunshine-dark)] hover:underline"
        >
          📖 לחזור על הנושא בהסבר המלא (נפתח בלשונית חדשה)
        </a>
      )}
    </div>
  );
}
