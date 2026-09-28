import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';

const XChip = ({ delay = 0 }) => (
  <motion.span
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay, type: 'spring', stiffness: 260, damping: 18 }}
    className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-violet)] font-bold italic text-white shadow"
  >
    x
  </motion.span>
);

const UnitChip = ({ delay = 0 }) => (
  <motion.span
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay, type: 'spring', stiffness: 260, damping: 18 }}
    className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-sunshine)] text-xs font-bold text-white shadow-sm"
  >
    1
  </motion.span>
);

/**
 * המחשה לחוק הפילוג: k חבילות של (x + units), ואז "מסדרים לפי סוג"
 * ורואים שיצא kx + k·units — כלומר המספר שבחוץ כפל כל איבר.
 */
export default function GroupsVisual({ k, xs = 1, units }) {
  const [sorted, setSorted] = useState(false);
  const inner = `${xs === 1 ? '' : xs}x+${units}`;
  const result = `${k * xs}x+${k * units}`;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      <div className="mb-3 text-center text-xl">
        <MathRenderer inline>{`$${k}(${inner})${sorted ? `=\\textcolor{#7c4dcc}{${k * xs}x}+\\textcolor{#b97e12}{${k * units}}` : ''}$`}</MathRenderer>
      </div>

      <div dir="ltr" className="flex min-h-40 flex-col items-center justify-center gap-2">
        <AnimatePresence mode="wait">
          {!sorted ? (
            <motion.div
              key="packs"
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-2"
            >
              {Array.from({ length: k }, (_, g) => (
                <motion.div
                  key={g}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: g * 0.25 }}
                  className="flex items-center gap-1.5 rounded-xl border-2 border-dashed border-[var(--color-teal)]/40 px-3 py-1.5"
                >
                  <span className="text-lg text-[var(--color-teal)]">(</span>
                  {Array.from({ length: xs }, (_, i) => (
                    <XChip key={`x${i}`} delay={g * 0.25 + 0.1} />
                  ))}
                  <span className="font-bold text-[var(--color-slate)]">+</span>
                  {Array.from({ length: units }, (_, i) => (
                    <UnitChip key={`u${i}`} delay={g * 0.25 + 0.15 + i * 0.05} />
                  ))}
                  <span className="text-lg text-[var(--color-teal)]">)</span>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="sorted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="flex items-center gap-1.5">
                {Array.from({ length: k * xs }, (_, i) => (
                  <XChip key={i} delay={i * 0.08} />
                ))}
                <span className="ms-2 font-bold text-[var(--color-violet)]">= {k * xs}x</span>
              </div>
              <div className="flex items-center gap-1.5">
                {Array.from({ length: k * units }, (_, i) => (
                  <UnitChip key={i} delay={0.2 + i * 0.06} />
                ))}
                <span className="ms-2 font-bold text-[var(--color-sunshine-dark)]">= {k * units}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 flex justify-center">
        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          onClick={() => setSorted((s) => !s)}
          className="rounded-xl bg-[var(--color-teal)] px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-[var(--color-teal-dark)]"
        >
          {sorted ? '↺ חזרה לחבילות' : 'סדרו לפי סוג ←'}
        </motion.button>
      </div>
      {sorted && (
        <p className="mt-3 text-center text-sm text-[var(--color-slate)]" dir="rtl">
          <MathRenderer inline>{`קיבלנו $${result}$ — כל אחד מהאיברים נכפל ב-${k}.`}</MathRenderer>
        </p>
      )}
    </div>
  );
}
