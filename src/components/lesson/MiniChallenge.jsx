import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';
import { isChallengeCorrect } from '../../lib/lesson';

/**
 * "אתגר קצרצר" — שאלה אחת בסוף כל מקטע, עם פידבק מיידי.
 * טעות: רעידה + רמז, ואפשר לנסות שוב. הצלחה: onSolve({ firstTry }).
 */
export default function MiniChallenge({ challenge, solved, xpReward, onAttempt, onSolve }) {
  const [value, setValue] = useState('');
  const [wrongChoices, setWrongChoices] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [shakeKey, setShakeKey] = useState(0);
  const [justSolved, setJustSolved] = useState(false);

  const showHint = attempts > 0 && !solved;

  function submit(response) {
    const correct = isChallengeCorrect(challenge, response);
    onAttempt?.(correct);
    if (correct) {
      setJustSolved(true);
      onSolve({ firstTry: attempts === 0 });
    } else {
      setAttempts((a) => a + 1);
      setShakeKey((k) => k + 1);
      if (challenge.type === 'choice') setWrongChoices((w) => [...w, response]);
    }
  }

  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-4 shadow-md ring-2 sm:p-5 ${
        solved ? 'bg-[var(--color-success)]/5 ring-[var(--color-success)]/40' : 'bg-white ring-[var(--color-sunshine)]/60'
      }`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="rounded-full bg-[var(--color-sunshine)]/15 px-3 py-1 text-xs font-bold text-[var(--color-sunshine-dark)]">
          ⚡ אתגר קצרצר
        </span>
        {!solved && <span className="text-xs text-[var(--color-slate)]">+{xpReward} XP</span>}
      </div>

      <MathRenderer className="mb-3 text-lg font-semibold text-[var(--color-ink)]">{challenge.prompt}</MathRenderer>

      <div key={shakeKey} className={shakeKey ? 'animate-shake' : ''}>
        {challenge.type === 'choice' ? (
          <div className="grid grid-cols-2 gap-2">
            {challenge.options.map((opt, i) => {
              const isWrong = wrongChoices.includes(i);
              const isRight = solved && i === challenge.answer;
              return (
                <motion.button
                  key={i}
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  disabled={solved || isWrong}
                  onClick={() => submit(i)}
                  className={`rounded-xl px-3 py-3 text-lg font-semibold ring-1 transition ${
                    isRight
                      ? 'bg-[var(--color-success)] text-white ring-[var(--color-success)]'
                      : isWrong
                        ? 'bg-[var(--color-coral)]/10 text-[var(--color-coral)] line-through ring-[var(--color-coral)]/30'
                        : 'bg-white text-[var(--color-ink)] ring-black/10 hover:bg-[var(--color-mist)] disabled:opacity-50'
                  }`}
                >
                  <MathRenderer inline>{opt}</MathRenderer>
                </motion.button>
              );
            })}
          </div>
        ) : (
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (value.trim()) submit(value);
            }}
          >
            <label className="flex flex-1 items-center gap-2 rounded-xl bg-white px-3 ring-1 ring-black/15 focus-within:ring-2 focus-within:ring-[var(--color-teal)]" dir="ltr">
              {(challenge.label ?? 'x =') && (
                <span className="whitespace-nowrap font-bold italic text-[var(--color-slate)]">
                  {challenge.label ?? 'x ='}
                </span>
              )}
              <input
                type="text"
                inputMode="decimal"
                value={solved ? String(challenge.answer) : value}
                onChange={(e) => setValue(e.target.value)}
                disabled={solved}
                aria-label="התשובה שלכם"
                className="w-full bg-transparent py-3 text-lg font-semibold outline-none"
              />
              {challenge.suffix && (
                <span className="whitespace-nowrap font-bold text-[var(--color-slate)]">{challenge.suffix}</span>
              )}
            </label>
            <motion.button
              type="submit"
              whileTap={{ scale: 0.95 }}
              disabled={solved || !value.trim()}
              className="rounded-xl bg-[var(--color-teal)] px-5 text-sm font-bold text-white shadow-sm hover:bg-[var(--color-teal-dark)] disabled:opacity-40"
            >
              בדיקה
            </motion.button>
          </form>
        )}
      </div>

      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 rounded-xl bg-[var(--color-sky)]/10 p-3 text-sm text-[var(--color-sky-dark)]">
              <span className="font-bold">לא נורא, נסו שוב! 💪 רמז: </span>
              <MathRenderer inline>{challenge.hint}</MathRenderer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {solved && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 rounded-xl bg-[var(--color-success)]/10 p-3 text-sm text-[var(--color-success)]"
          >
            <span className="font-bold">✔️ נכון! </span>
            <MathRenderer inline className="text-[var(--color-ink)]">{challenge.explain}</MathRenderer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* תגמול קופץ — רק ברגע ההצלחה, לא כשחוזרים למדריך שכבר נפתר */}
      <AnimatePresence>
        {justSolved && (
          <motion.span
            initial={{ opacity: 0, scale: 0.4, y: 10 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.4, 1.3, 1, 1], y: [10, 0, -4, -10] }}
            transition={{ duration: 1.6, times: [0, 0.2, 0.7, 1] }}
            onAnimationComplete={() => setJustSolved(false)}
            className="pointer-events-none absolute end-4 top-3 rounded-full bg-[var(--color-sunshine)] px-3 py-1 text-sm font-extrabold text-white shadow-lg"
          >
            +{xpReward} XP ⭐
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
