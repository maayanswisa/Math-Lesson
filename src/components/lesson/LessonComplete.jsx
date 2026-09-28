import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/** מסך הסיום: כוכבים לפי הצלחות בניסיון ראשון, והזמנה להמשיך למבחן. */
export default function LessonComplete({ total, firstTryCount, quizHref, onRestart }) {
  const ratio = total ? firstTryCount / total : 0;
  const stars = ratio === 1 ? 3 : ratio >= 0.5 ? 2 : 1;

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 140, damping: 16 }}
      className="rounded-3xl bg-white p-6 text-center shadow-lg ring-1 ring-black/5 sm:p-8"
    >
      <div className="flex justify-center gap-2 text-5xl" aria-label={`${stars} כוכבים מתוך 3`}>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            initial={{ scale: 0, rotate: -40 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3 + i * 0.2, type: 'spring', stiffness: 260, damping: 12 }}
            className={i < stars ? '' : 'opacity-20 grayscale'}
          >
            ⭐
          </motion.span>
        ))}
      </div>
      <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
        כל הכבוד! סיימתם את ההסבר 🎉
      </h2>
      <p className="mt-2 text-[var(--color-slate)]">
        פתרתם {firstTryCount} מתוך {total} אתגרים כבר בניסיון הראשון.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          to={quizHref}
          className="rounded-xl bg-[var(--color-teal)] px-6 py-3 text-sm font-bold text-white shadow hover:bg-[var(--color-teal-dark)]"
        >
          עכשיו למבחן בנושא ←
        </Link>
        <button
          type="button"
          onClick={onRestart}
          className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-[var(--color-slate)] ring-1 ring-black/10 hover:bg-[var(--color-mist)]"
        >
          ↺ לעבור שוב על ההסבר
        </button>
      </div>
    </motion.section>
  );
}
