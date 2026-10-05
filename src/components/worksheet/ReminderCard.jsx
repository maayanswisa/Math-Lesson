import { AnimatePresence, motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';

/**
 * "תזכורת לפני שמתחילים" — תיבה צהובה עם עיקרי החומר הנלמד.
 * reminder: [{ title, md }] — כל פריט הוא תת-תיבה (כלל, דוגמה פתורה...).
 */
export default function ReminderCard({ reminder, open, onToggle }) {
  return (
    <section className="overflow-hidden rounded-2xl bg-[#fff8e1] shadow-sm ring-1 ring-[var(--color-sunshine)]/50">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-start sm:px-5"
      >
        <span className="flex items-center gap-2 font-bold text-[var(--color-sunshine-dark)]">
          <span aria-hidden="true" className="text-xl">
            💡
          </span>
          תזכורת — מה צריך לזכור לפני שמתחילים
        </span>
        <span className="shrink-0 text-xs font-semibold text-[var(--color-slate)]">{open ? 'הסתרה ▲' : 'הצגה ▼'}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="grid gap-3 px-4 pb-4 sm:grid-cols-2 sm:px-5 sm:pb-5">
              {reminder.map((r, i) => (
                <div
                  key={i}
                  className={`rounded-xl bg-white/80 p-3.5 ring-1 ring-[var(--color-sunshine)]/30 ${
                    r.wide ? 'sm:col-span-2' : ''
                  }`}
                >
                  {r.title && <p className="mb-1.5 text-sm font-bold text-[var(--color-ink)]">{r.title}</p>}
                  <MathRenderer className="text-[15px] text-[var(--color-ink)]">{r.md}</MathRenderer>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
