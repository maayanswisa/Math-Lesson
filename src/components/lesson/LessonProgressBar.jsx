import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * פס התקדמות דביק: כמה אתגרים נפתרו ומה נשאר, נקודה לכל שלב,
 * ופס דק שמתמלא עם הגלילה.
 */
export default function LessonProgressBar({ sections, solved, unlockedCount, onJump }) {
  const doneCount = sections.filter((s) => solved[s.id]).length;
  const remaining = sections.length - doneCount;
  const pct = sections.length ? doneCount / sections.length : 0;

  const { scrollYProgress } = useScroll();
  const scrollX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <div className="sticky top-0 z-20 -mx-4 bg-[var(--color-paper)]/85 px-4 pb-3 pt-3 backdrop-blur-md">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-bold text-[var(--color-ink)]">
          {remaining === 0 ? '🏁 סיימתם!' : `✅ ${doneCount} מתוך ${sections.length}`}
        </span>
        <div className="flex items-center gap-1.5" aria-label="שלבי המדריך">
          {sections.map((s, i) => {
            const isSolved = Boolean(solved[s.id]);
            const locked = i >= unlockedCount;
            return (
              <button
                key={s.id}
                type="button"
                disabled={locked}
                onClick={() => onJump(i)}
                title={locked ? 'נעול — פתרו את האתגר הקודם' : `שלב ${i + 1}`}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition ${
                  isSolved
                    ? 'bg-[var(--color-success)] text-white shadow-sm'
                    : locked
                      ? 'bg-[var(--color-mist)] text-[var(--color-slate)]/60'
                      : 'bg-white ring-2 ring-[var(--color-sunshine)]'
                }`}
              >
                {isSolved ? '✓' : locked ? '🔒' : s.emoji}
              </button>
            );
          })}
        </div>
        <span className="hidden text-xs text-[var(--color-slate)] sm:inline">
          {remaining === 0 ? 'כל האתגרים נפתרו' : `עוד ${remaining} לסיום`}
        </span>
      </div>

      <div className="mt-2 h-3 overflow-hidden rounded-full bg-[var(--color-mist)]">
        <motion.div
          className="h-full rounded-full"
          initial={false}
          animate={{ width: `${pct * 100}%` }}
          transition={{ type: 'spring', stiffness: 90, damping: 16 }}
          style={{
            backgroundImage:
              'linear-gradient(90deg, var(--color-teal), var(--color-sky), var(--color-violet), var(--color-berry))',
          }}
        />
      </div>
      <motion.div
        aria-hidden="true"
        className="mt-1 h-0.5 origin-right rounded-full bg-[var(--color-sunshine)]"
        style={{ scaleX: scrollX }}
      />
    </div>
  );
}
