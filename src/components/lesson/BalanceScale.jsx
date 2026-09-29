import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';

const HALF_BEAM = 88; // px — חצי המרחק בין מרכזי הכפות (11rem / 2)
const MAX_TILT = 14; // מעלות

function Pan({ x, units, offset }) {
  return (
    <motion.div
      animate={{ y: offset }}
      transition={{ type: 'spring', stiffness: 120, damping: 14 }}
      className="flex w-28 flex-col items-center"
    >
      <div className="flex min-h-16 flex-wrap-reverse content-start items-end justify-center gap-1 px-1 pb-1">
        <AnimatePresence>
          {Array.from({ length: x }, (_, i) => (
            <motion.span
              key={`x${i}`}
              layout
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, y: -30, opacity: 0 }}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-violet)] font-bold italic text-white shadow"
            >
              x
            </motion.span>
          ))}
          {Array.from({ length: units }, (_, i) => (
            <motion.span
              key={`u${i}`}
              layout
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, y: -30, opacity: 0 }}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-sunshine)] text-xs font-bold text-white shadow-sm"
            >
              1
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
      <div className="h-2 w-full rounded-full bg-[var(--color-slate)]/70" />
    </motion.div>
  );
}

function sideTex({ x, units }) {
  const parts = [];
  if (x) parts.push(x === 1 ? 'x' : `${x}x`);
  if (units || !x) parts.push(String(units));
  return parts.join('+');
}

/**
 * מאזניים אינטראקטיביים: המחשה ל"למה" עושים אותה פעולה בשני הצדדים.
 * משקל של x = הפתרון, כך שהמאזניים מאוזנים רק כשהשוויון נכון.
 */
export default function BalanceScale({ caption, solution, left: left0, right: right0 }) {
  const [left, setLeft] = useState(left0);
  const [right, setRight] = useState(right0);
  const [msg, setMsg] = useState(null);

  const weight = (s) => s.x * solution + s.units;
  const diff = weight(left) - weight(right);
  const tilt = Math.max(-MAX_TILT, Math.min(MAX_TILT, diff * 5)); // חיובי = שמאל כבד
  const drop = HALF_BEAM * Math.sin((tilt * Math.PI) / 180);

  const solved = left.x === 1 && left.units === 0 && right.x === 0 && diff === 0;
  const canRemoveBoth = left.units > 0 && right.units > 0 && diff === 0;
  const canRemoveX = left.x > 0 && right.x > 0 && diff === 0;
  // x-ים רק משמאל ומספרים רק מימין — אפשר לחלק את שני הצדדים ל-left.x קבוצות שוות
  const canDivide = left.x > 1 && left.units === 0 && right.x === 0 && right.units % left.x === 0 && diff === 0;

  function removeBoth() {
    setLeft((s) => ({ ...s, units: s.units - 1 }));
    setRight((s) => ({ ...s, units: s.units - 1 }));
    setMsg(null);
  }

  function removeXBoth() {
    setLeft((s) => ({ ...s, x: s.x - 1 }));
    setRight((s) => ({ ...s, x: s.x - 1 }));
    setMsg(null);
  }

  function divideBoth() {
    const k = left.x;
    setLeft({ x: 1, units: 0 });
    setRight((s) => ({ ...s, units: s.units / k }));
    setMsg(null);
  }

  function removeLeftOnly() {
    setLeft((s) => ({ ...s, units: s.units - 1 }));
    setMsg('אוי! הורדנו רק מצד אחד — המאזניים כבר לא מאוזנים, והשוויון נשבר.');
  }

  function reset() {
    setLeft(left0);
    setRight(right0);
    setMsg(null);
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-3 text-[var(--color-ink)]">{caption}</MathRenderer>}

      {/* המאזניים עצמם — LTR כדי שצד שמאל של המשוואה יהיה בצד שמאל */}
      <div dir="ltr" className="flex flex-col items-center">
        <div className="flex w-[18rem] items-end justify-between">
          <Pan {...left} offset={drop} />
          <Pan {...right} offset={-drop} />
        </div>
        <motion.div
          animate={{ rotate: -tilt }}
          transition={{ type: 'spring', stiffness: 120, damping: 14 }}
          className="-mt-1 h-2 w-[13rem] rounded-full bg-[var(--color-ink)]"
        />
        <div className="h-10 w-0 border-x-[14px] border-b-[40px] border-x-transparent border-b-[var(--color-ink)]" />

        <div className="mt-3 text-xl">
          <MathRenderer inline>{`$${sideTex(left)} ${diff === 0 ? '=' : '\\neq'} ${sideTex(right)}$`}</MathRenderer>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {solved ? (
          <motion.p
            key="solved"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-3 rounded-xl bg-[var(--color-success)]/10 p-3 text-center font-bold text-[var(--color-success)]"
          >
            🎉 הקופסה שווה {right.units}! כלומר <span dir="ltr">x = {right.units}</span>
          </motion.p>
        ) : msg ? (
          <motion.p
            key="msg"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 rounded-xl bg-[var(--color-coral)]/10 p-3 text-center text-sm font-semibold text-[var(--color-coral-dark)]"
          >
            {msg}
          </motion.p>
        ) : null}
      </AnimatePresence>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {diff === 0 && !solved ? (
          <>
            {canRemoveX && (
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={removeXBoth}
                className="rounded-xl bg-[var(--color-violet)] px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-[var(--color-violet-dark)]"
              >
                הורידו <i dir="ltr">x</i> משני הצדדים
              </motion.button>
            )}
            {canDivide && (
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={divideBoth}
                className="rounded-xl bg-[var(--color-violet)] px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-[var(--color-violet-dark)]"
              >
                חלקו את שני הצדדים ב-{left.x}
              </motion.button>
            )}
            {!canDivide && (
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={removeBoth}
                disabled={!canRemoveBoth}
                className="rounded-xl bg-[var(--color-teal)] px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-[var(--color-teal-dark)] disabled:opacity-40"
              >
                הורידו 1 משני הצדדים
              </motion.button>
            )}
            {!solved && left.units > 0 && (
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={removeLeftOnly}
                className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-[var(--color-coral)] ring-1 ring-[var(--color-coral)]/40 hover:bg-[var(--color-coral)]/5"
              >
                הורידו 1 רק משמאל
              </motion.button>
            )}
          </>
        ) : null}
        {(diff !== 0 || solved) && (
          <button
            type="button"
            onClick={reset}
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[var(--color-slate)] ring-1 ring-black/10 hover:bg-[var(--color-mist)]"
          >
            ↺ להתחיל מחדש
          </button>
        )}
      </div>
    </div>
  );
}
