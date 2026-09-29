import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';

const COUNT = 10;

/**
 * שורת דומינו = אינדוקציה. שני מתגים: "הבסיס" (הראשונה נופלת) ו"הצעד" (כל אחת מפילה את הבאה).
 * אפשר גם "לשבור" את הצעד באמצע. דוחפים — ורואים עד לאן השרשרת מגיעה.
 */
export default function DominoInduction({ caption }) {
  const [base, setBase] = useState(true);
  const [step, setStep] = useState(true);
  const [fallen, setFallen] = useState(0);
  const [running, setRunning] = useState(false);

  // אם הצעד לא תקין — השרשרת נעצרת אחרי הרביעית
  const reach = !base ? 0 : step ? COUNT : 4;

  function push() {
    setFallen(0);
    setRunning(true);
    let i = 0;
    const tick = () => {
      i += 1;
      if (i > reach) {
        setRunning(false);
        return;
      }
      setFallen(i);
      setTimeout(tick, 180);
    };
    setTimeout(tick, 150);
  }

  const toggle = (setter) => (v) => {
    setter(v);
    setFallen(0);
  };

  const done = !running && fallen > 0;
  const result = !base ? 'none' : fallen === COUNT ? 'all' : 'partial';

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-3 text-[var(--color-ink)]">{caption}</MathRenderer>}

      <div className="flex items-end justify-center gap-1.5 sm:gap-2" dir="ltr" style={{ height: 90 }}>
        {Array.from({ length: COUNT }, (_, i) => {
          const isDown = i < fallen;
          const broken = !step && i === 4;
          return (
            <div key={i} className="flex flex-col items-center">
              <motion.div
                animate={{ rotate: isDown ? 62 : 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                style={{ originX: 1, originY: 1 }}
                className={`h-14 w-4 rounded-sm sm:w-5 ${isDown ? 'bg-[var(--color-violet)]' : broken ? 'bg-[var(--color-coral)]' : 'bg-[var(--color-teal)]'}`}
              />
              <span className="mt-1 text-[10px] font-bold text-[var(--color-slate)]">{i === COUNT - 1 ? '…' : i + 1}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {[
          ['בסיס: הראשונה נופלת', base, toggle(setBase)],
          ['צעד: כל אחת מפילה את הבאה', step, toggle(setStep)],
        ].map(([label, val, set]) => (
          <button
            key={label}
            type="button"
            onClick={() => set(!val)}
            className={`rounded-xl px-3 py-2 text-sm font-bold ${val ? 'bg-[var(--color-success)]/10 text-[var(--color-success)] ring-1 ring-[var(--color-success)]/30' : 'bg-[var(--color-coral)]/10 text-[var(--color-coral-dark)] ring-1 ring-[var(--color-coral)]/30'}`}
          >
            {val ? '✔' : '✖'} {label}
          </button>
        ))}
      </div>

      <div className="mt-3 flex justify-center">
        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          disabled={running}
          onClick={push}
          className="rounded-xl bg-[var(--color-teal)] px-5 py-2 text-sm font-bold text-white shadow-sm hover:bg-[var(--color-teal-dark)] disabled:opacity-50"
        >
          👉 דחפו!
        </motion.button>
      </div>

      <p
        className={`mt-3 rounded-xl p-2 text-center text-sm font-bold ${done && result === 'all' ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]' : 'bg-[var(--color-mist)] text-[var(--color-ink)]'}`}
      >
        {!done && !running && 'בחרו מה מתקיים, ודחפו את הראשונה'}
        {running && '...'}
        {done && result === 'all' && 'כולן נפלו — בסיס + צעד: הטענה נכונה לכל n! 🎉'}
        {done && result === 'partial' && 'השרשרת נעצרה — הצעד לא עובד בכל מקום. אין הוכחה.'}
        {!running && fallen === 0 && !base && ' (בלי בסיס — אף אחת לא תיפול, גם אם הצעד תקין)'}
      </p>
    </div>
  );
}
