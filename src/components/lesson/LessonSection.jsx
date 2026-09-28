import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';
import { accentFor } from '../../lib/palette';
import LessonBlock from './LessonBlock';
import MiniChallenge from './MiniChallenge';

// כל בלוק "צף" פנימה כשהוא נכנס למסך — כך התוכן מתגלה בקצב הגלילה.
const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

/** מקטע אחד במדריך: כותרת, בלוקים קצרים, ואתגר של שאלה אחת. */
const LessonSection = forwardRef(function LessonSection(
  { section, index, total, solved, xpReward, onAttempt, onSolve },
  ref,
) {
  const accent = accentFor(index);

  return (
    <section ref={ref} id={`step-${section.id}`} className="scroll-mt-28 space-y-4">
      <motion.header {...reveal} className="flex items-center gap-3">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl shadow-sm"
          style={{ backgroundColor: accent.bg }}
          aria-hidden="true"
        >
          {section.emoji}
        </span>
        <div>
          <p className="text-xs font-bold" style={{ color: accent.text }}>
            שלב {index + 1} מתוך {total}
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-ink)]">
            <MathRenderer inline>{section.title}</MathRenderer>
          </h2>
        </div>
      </motion.header>

      {section.blocks.map((block, i) => (
        <motion.div key={i} {...reveal}>
          <LessonBlock block={block} />
        </motion.div>
      ))}

      <motion.div {...reveal}>
        <MiniChallenge
          challenge={section.challenge}
          solved={solved}
          xpReward={xpReward}
          onAttempt={onAttempt}
          onSolve={onSolve}
        />
      </motion.div>
    </section>
  );
});

export default LessonSection;
