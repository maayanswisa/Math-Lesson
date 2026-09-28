import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { getTopicById, GRADE_LABELS } from '../data/curriculum';
import { loadLesson } from '../data/lessons';
import { XP_CORRECT } from '../lib/gameConfig';
import { fireBigConfetti, fireConfetti } from '../lib/feedback';
import { readLessonProgress, writeLessonProgress } from '../lib/lesson';
import { playCorrect, playWrong } from '../lib/sounds';
import LessonComplete from '../components/lesson/LessonComplete';
import LessonProgressBar from '../components/lesson/LessonProgressBar';
import LessonSection from '../components/lesson/LessonSection';
import MathRenderer from '../components/ui/MathRenderer';

export default function LessonPage() {
  const { topicId } = useParams();
  const topic = getTopicById(topicId);
  const { muted, recordAnswer, recordQuizComplete } = useGame();

  const [lesson, setLesson] = useState(undefined); // undefined = טוען, null = אין הסבר לנושא
  const [progress, setProgress] = useState({ solved: {}, completed: false });
  const sectionRefs = useRef([]);
  const completeRef = useRef(null);
  const scrollTimer = useRef(null);
  /** עולה ב"לעבור שוב" — מאפס את המצב הפנימי של האתגרים (ניסיונות, רמזים). */
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLesson(undefined);
    loadLesson(topicId)
      .then((l) => {
        if (cancelled) return;
        setLesson(l);
        if (l) setProgress(readLessonProgress(l.id));
      })
      .catch(() => !cancelled && setLesson(null));
    return () => {
      cancelled = true;
    };
  }, [topicId]);

  useEffect(() => () => clearTimeout(scrollTimer.current), []);

  /** גלילה רכה ליעד אחרי שהקונפטי והתגמול הספיקו להופיע (והמקטע החדש כבר ב-DOM). */
  const scrollSoon = useCallback((getEl) => {
    clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => getEl()?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 900);
  }, []);

  const updateProgress = useCallback(
    (next) => {
      setProgress(next);
      writeLessonProgress(lesson.id, next);
    },
    [lesson],
  );

  const handleAttempt = useCallback(
    (correct) => {
      recordAnswer(correct);
      if (correct) playCorrect(muted);
      else playWrong(muted);
    },
    [muted, recordAnswer],
  );

  const handleSolve = useCallback(
    (index, { firstTry }) => {
      const section = lesson.sections[index];
      const solved = { ...progress.solved, [section.id]: { firstTry } };
      const allDone = lesson.sections.every((s) => solved[s.id]);

      if (allDone && !progress.completed) {
        recordQuizComplete({ perfect: lesson.sections.every((s) => solved[s.id].firstTry) });
        fireBigConfetti();
        scrollSoon(() => completeRef.current);
      } else {
        fireConfetti();
        if (index + 1 < lesson.sections.length) scrollSoon(() => sectionRefs.current[index + 1]);
      }
      updateProgress({ solved, completed: progress.completed || allDone });
    },
    [lesson, progress, recordQuizComplete, scrollSoon, updateProgress],
  );

  const handleRestart = useCallback(() => {
    updateProgress({ solved: {}, completed: progress.completed });
    setRunId((n) => n + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [progress.completed, updateProgress]);

  let backHref = '/';
  if (topic?.units != null) backHref = `/grade/${topic.grade}/units/${topic.units}`;
  else if (topic?.track) backHref = `/grade/${topic.grade}/track/${topic.track}`;
  else if (topic) backHref = `/grade/${topic.grade}/topics`;

  if (lesson === undefined) {
    return (
      <div className="rounded-2xl bg-white/80 p-8 text-center text-[var(--color-slate)] shadow-sm ring-1 ring-black/5">
        טוען הסבר…
      </div>
    );
  }

  if (lesson === null) {
    return (
      <div className="space-y-4" dir="rtl">
        <Link to={backHref} className="text-sm text-[var(--color-teal)] hover:underline">
          ← חזרה לנושאים
        </Link>
        <p className="rounded-2xl bg-white/80 p-8 text-[var(--color-slate)] ring-1 ring-black/5">
          עדיין אין הסבר מלא לנושא הזה.{' '}
          <Link to={`/quiz/${topicId}`} className="font-bold text-[var(--color-teal)] hover:underline">
            למבחן בנושא ←
          </Link>
        </p>
      </div>
    );
  }

  const { sections } = lesson;
  // המקטע הפתוח האחרון = הראשון שעוד לא נפתר; כל מה שאחריו נעול.
  const firstUnsolved = sections.findIndex((s) => !progress.solved[s.id]);
  const unlockedCount = firstUnsolved === -1 ? sections.length : firstUnsolved + 1;
  const allDone = firstUnsolved === -1;
  const lockedCount = sections.length - unlockedCount;
  const firstTryCount = sections.filter((s) => progress.solved[s.id]?.firstTry).length;

  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto max-w-2xl space-y-10" dir="rtl">
        <div>
          <Link to={backHref} className="text-sm text-[var(--color-teal)] hover:underline">
            ← חזרה לנושאים
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 text-center"
          >
            <span className="inline-block rounded-full bg-[var(--color-teal)]/10 px-3 py-1 text-xs font-bold text-[var(--color-teal-dark)]">
              📖 הסבר מלא · כיתה {GRADE_LABELS[lesson.grade]}
              {lesson.units ? ` · ${lesson.units} יח״ל` : ''}
            </span>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--color-ink)]">
              {lesson.emoji} {lesson.title}
            </h1>
            <p className="mt-2 text-[var(--color-slate)]">
              <MathRenderer inline>{lesson.subtitle}</MathRenderer>
            </p>
            <p className="mt-1 text-xs text-[var(--color-slate)]">
              {sections.length} שלבים קצרים · כ-10 דקות · גללו למטה כדי להתחיל ↓
            </p>
          </motion.div>
        </div>

        <LessonProgressBar
          sections={sections}
          solved={progress.solved}
          unlockedCount={unlockedCount}
          onJump={(i) => sectionRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        />

        {sections.slice(0, unlockedCount).map((section, i) => (
          <LessonSection
            key={`${runId}-${section.id}`}
            ref={(el) => (sectionRefs.current[i] = el)}
            section={section}
            index={i}
            total={sections.length}
            solved={Boolean(progress.solved[section.id])}
            xpReward={XP_CORRECT}
            onAttempt={handleAttempt}
            onSolve={(r) => handleSolve(i, r)}
          />
        ))}

        <AnimatePresence>
          {lockedCount > 0 && (
            <motion.div
              key="locked"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0 }}
              className="rounded-2xl border-2 border-dashed border-[var(--color-slate)]/25 p-6 text-center text-[var(--color-slate)]"
            >
              <p className="text-2xl" aria-hidden="true">
                🔒
              </p>
              <p className="mt-1 font-semibold">
                {lockedCount === 1 ? 'עוד שלב אחד מחכה לכם' : `עוד ${lockedCount} שלבים מחכים לכם`}
              </p>
              <p className="text-sm">פתרו את האתגר שלמעלה כדי לפתוח את השלב הבא</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={completeRef} className="scroll-mt-28">
          {allDone && (
            <LessonComplete
              total={sections.length}
              firstTryCount={firstTryCount}
              quizHref={`/quiz/${lesson.topicId}`}
              onRestart={handleRestart}
            />
          )}
        </div>
      </div>
    </MotionConfig>
  );
}
