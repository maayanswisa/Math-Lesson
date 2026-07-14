import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';
import FractionPizza from './interactive/FractionPizza';
import NumberLine from './interactive/NumberLine';
import DragMatch from './interactive/DragMatch';
import HintPanel from './HintPanel';
import Scratchpad from './Scratchpad';
import SciCalculator from './SciCalculator';
import StudyMorePopup from './StudyMorePopup';
import { useGame } from '../../context/GameContext';
import { fireBigConfetti, fireConfetti } from '../../lib/feedback';
import { playCorrect, playWrong } from '../../lib/sounds';
import { MAX_HEARTS, SPEED_RUN_SECONDS } from '../../lib/gameConfig';
import { getHintsForQuestion } from '../../lib/hints';
import { shouldShowStudyMorePopup } from '../../lib/promo';

const OPTION_LABELS = ['א', 'ב', 'ג', 'ד'];

function McqOptions({ options = [], selectedIndex, onSelect, disabled }) {
  return (
    <fieldset className="mt-6 space-y-3 border-0 p-0" disabled={disabled}>
      <legend className="sr-only">בחרו תשובה</legend>
      {options.map((opt, optIdx) => {
        const selected = selectedIndex === optIdx;
        return (
          <button
            key={optIdx}
            type="button"
            onClick={() => onSelect(optIdx)}
            disabled={disabled}
            className={`flex w-full items-start gap-3 rounded-xl px-4 py-3.5 text-right transition ${
              selected
                ? 'bg-[var(--color-teal)]/10 ring-2 ring-[var(--color-teal)]'
                : 'bg-[var(--color-paper)] ring-1 ring-black/8 hover:ring-[var(--color-teal)]/40'
            }`}
            aria-pressed={selected}
          >
            <span
              className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm font-semibold ${
                selected
                  ? 'bg-[var(--color-teal)] text-white'
                  : 'bg-white text-[var(--color-slate)] ring-1 ring-black/10'
              }`}
            >
              {OPTION_LABELS[optIdx]}
            </span>
            <MathRenderer className="min-w-0 flex-1 pt-0.5">{opt}</MathRenderer>
          </button>
        );
      })}
    </fieldset>
  );
}

function QuestionBody({ question, mcqIndex, onMcqSelect, onInteractiveReady, locked }) {
  const type = question.type || 'mcq';
  if (type === 'fractionPizza') {
    return (
      <div className="mt-6">
        <FractionPizza key={question.id} payload={question.payload} correctAnswer={question.correctAnswer} onAnswerReady={onInteractiveReady} />
      </div>
    );
  }
  if (type === 'numberLine') {
    return (
      <div className="mt-6">
        <NumberLine key={question.id} payload={question.payload} correctAnswer={question.correctAnswer} onAnswerReady={onInteractiveReady} />
      </div>
    );
  }
  if (type === 'dragMatch') {
    return (
      <div className="mt-6">
        <DragMatch key={question.id} payload={question.payload} onAnswerReady={onInteractiveReady} />
      </div>
    );
  }
  return <McqOptions options={question.options} selectedIndex={mcqIndex} onSelect={onMcqSelect} disabled={locked} />;
}

const BONUS_QUESTION = {
  id: 'bonus-easy',
  type: 'mcq',
  question_text: 'שאלת בונוס: כמה זה $2+2$?',
  options: ['$4$', '$3$', '$5$', '$22$'],
  correct_index: 0,
  explanation: '$2+2=4$ — לב חזר!',
};

export default function QuizCard({
  questions = [],
  topicCluster = null,
  grade = null,
  onComplete,
  /** Parent redraws questions (topic bank); omit for custom quizzes. */
  onRetry,
}) {
  const { muted, recordAnswer, recordQuizComplete } = useGame();
  const total = questions.length;
  const [mode, setMode] = useState('normal');
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mcqIndex, setMcqIndex] = useState(null);
  const [interactiveAnswer, setInteractiveAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const answersRef = useRef([]);
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [phase, setPhase] = useState('quiz');
  const [feedback, setFeedback] = useState(null);
  const [shake, setShake] = useState(false);
  const [sessionXp, setSessionXp] = useState(0);
  const [sessionBadges, setSessionBadges] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(SPEED_RUN_SECONDS);
  const [timedOut, setTimedOut] = useState(false);
  const finishedRef = useRef(false);
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [showPromo, setShowPromo] = useState(false);

  const current = phase === 'bonus' ? BONUS_QUESTION : questions[currentIndex];
  const hints = useMemo(() => getHintsForQuestion(current), [current]);
  const onInteractiveReady = useCallback((ans) => setInteractiveAnswer(ans), []);

  useEffect(() => {
    setHintsRevealed(0);
  }, [current?.id]);

  function setAnswersBoth(next) {
    answersRef.current = next;
    setAnswers(next);
  }

  function finishQuiz(finalAnswers, reason = 'complete') {
    if (finishedRef.current) return;
    finishedRef.current = true;
    if (reason === 'timeout') setTimedOut(true);
    const correctCount = finalAnswers.filter((a) => a.isCorrect).length;
    const wrongCount = finalAnswers.length - correctCount;
    const score = finalAnswers.length === 0 ? 0 : Math.round((correctCount / Math.max(total, 1)) * 100);
    const perfect = correctCount === total && total > 0 && reason !== 'timeout';
    const { xpGained, newBadges } = recordQuizComplete({ score, topicCluster, perfect });
    setSessionXp((x) => x + xpGained);
    setSessionBadges((b) => [...b, ...newBadges]);
    if (perfect || score >= 80) fireBigConfetti();
    if (shouldShowStudyMorePopup(wrongCount)) setShowPromo(true);
    setPhase('summary');
    onComplete?.({ score, correctCount, total, answers: finalAnswers, timedOut: reason === 'timeout' });
  }

  useEffect(() => {
    if (!started || mode !== 'speed') return undefined;
    if (phase === 'summary' || phase === 'outOfHearts') return undefined;
    if (finishedRef.current) return undefined;
    if (secondsLeft > 0) {
      const t = setTimeout(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
      return () => clearTimeout(t);
    }
    finishQuiz(answersRef.current, 'timeout');
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, mode, phase, secondsLeft]);

  const summary = useMemo(() => {
    if (phase !== 'summary') return null;
    const correctCount = answers.filter((a) => a.isCorrect).length;
    const score = total === 0 ? 0 : Math.round((correctCount / Math.max(total, 1)) * 100);
    return { correctCount, score };
  }, [phase, answers, total]);

  function canSubmit() {
    if (!current) return false;
    const type = current.type || 'mcq';
    if (type === 'mcq') return mcqIndex !== null;
    return interactiveAnswer != null;
  }

  function evaluateCurrent() {
    const type = current.type || 'mcq';
    if (type === 'mcq') return { isCorrect: mcqIndex === current.correct_index, selected: mcqIndex };
    return { isCorrect: Boolean(interactiveAnswer?.isCorrect), selected: interactiveAnswer?.value };
  }

  function submitAnswer() {
    if (mode === 'speed' && secondsLeft <= 0) return;
    if (!canSubmit() || !current) return;
    const { isCorrect, selected } = evaluateCurrent();

    if (phase === 'bonus') {
      if (isCorrect) {
        playCorrect(muted);
        fireConfetti();
        setHearts((h) => Math.min(MAX_HEARTS, h + 1));
        setPhase('quiz');
        setMcqIndex(null);
        setFeedback(null);
      } else {
        playWrong(muted);
        setShake(true);
        setTimeout(() => setShake(false), 500);
        setPhase('outOfHearts');
      }
      return;
    }

    const { xpGained, newBadges } = recordAnswer(isCorrect);
    setSessionXp((x) => x + xpGained);
    setSessionBadges((b) => [...b, ...newBadges]);

    const entry = {
      questionId: current.id,
      selectedIndex: typeof selected === 'number' ? selected : null,
      selectedValue: selected,
      isCorrect,
    };
    setAnswersBoth([...answersRef.current, entry]);

    if (isCorrect) {
      playCorrect(muted);
      fireConfetti();
    } else {
      playWrong(muted);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      const nextHearts = hearts - 1;
      setHearts(nextHearts);
      if (nextHearts <= 0) {
        setFeedback({ isCorrect: false, explanation: current.explanation, xpGained: 0, newBadges: [] });
        setPhase('outOfHearts');
        return;
      }
    }

    setFeedback({ isCorrect, explanation: current.explanation, xpGained, newBadges });
    setPhase('feedback');
  }

  function goNext() {
    setFeedback(null);
    setMcqIndex(null);
    setInteractiveAnswer(null);
    if (currentIndex >= total - 1) {
      finishQuiz(answersRef.current);
      return;
    }
    setCurrentIndex((i) => i + 1);
    setPhase('quiz');
  }

  function restart() {
    if (onRetry) {
      onRetry();
      return;
    }
    finishedRef.current = false;
    setCurrentIndex(0);
    setMcqIndex(null);
    setInteractiveAnswer(null);
    setAnswersBoth([]);
    setHearts(MAX_HEARTS);
    setPhase('quiz');
    setFeedback(null);
    setSessionXp(0);
    setSessionBadges([]);
    setSecondsLeft(SPEED_RUN_SECONDS);
    setTimedOut(false);
    setShowPromo(false);
    setStarted(false);
  }

  function start(selectedMode) {
    finishedRef.current = false;
    setTimedOut(false);
    setMode(selectedMode);
    setStarted(true);
    setSecondsLeft(SPEED_RUN_SECONDS);
  }

  if (!total) {
    return (
      <div className="rounded-2xl bg-white/80 p-8 text-center text-[var(--color-slate)] shadow-sm ring-1 ring-black/5">
        אין שאלות להצגה בנושא זה.
      </div>
    );
  }

  if (!started) {
    return (
      <div className="mx-auto max-w-lg space-y-4 rounded-2xl bg-white/90 p-8 text-center shadow-sm ring-1 ring-black/5" dir="rtl">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-ink)]">מוכנים להתחיל?</h2>
        <p className="text-[var(--color-slate)]">יש לכם {MAX_HEARTS} לבבות. כל טעות מורידה לב. תשובות נכונות מעניקות XP!</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button type="button" onClick={() => start('normal')} className="rounded-xl bg-[var(--color-teal)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--color-teal-dark)]">
            משימה רגילה
          </button>
          <button type="button" onClick={() => start('speed')} className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[var(--color-ink)] ring-1 ring-black/10 hover:ring-[var(--color-teal)]/40">
            Speed Run — {SPEED_RUN_SECONDS} שניות
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'outOfHearts') {
    return (
      <div className="mx-auto max-w-lg space-y-4 rounded-2xl bg-white/90 p-8 text-center shadow-sm ring-1 ring-black/5" dir="rtl">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-coral)]">נגמרו הלבבות</h2>
        <p className="text-[var(--color-slate)]">פתרו שאלת בונוס קלה כדי להחזיר לב אחד, או סיימו את המשימה.</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button type="button" onClick={() => { setMcqIndex(null); setPhase('bonus'); }} className="rounded-xl bg-[var(--color-teal)] px-6 py-3 text-sm font-semibold text-white">
            שאלת בונוס (+ לב)
          </button>
          <button type="button" onClick={() => finishQuiz(answersRef.current)} className="rounded-xl bg-white px-6 py-3 text-sm font-semibold ring-1 ring-black/10">
            סיום המשימה
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'summary' && summary) {
    return (
      <div className="mx-auto w-full max-w-3xl space-y-6" dir="rtl">
        {showPromo && <StudyMorePopup onClose={() => setShowPromo(false)} />}
        <section className="rounded-2xl bg-white/90 p-8 text-center shadow-sm ring-1 ring-black/5">
          <p className="text-sm font-medium tracking-wide text-[var(--color-teal)]">סיכום המבחן</p>
          {timedOut && (
            <p className="mt-3 text-lg font-semibold text-[var(--color-coral)]">הזמן הסתיים</p>
          )}
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl text-[var(--color-ink)]">
            הציון שלך: {summary.score}
          </h2>
          <p className="mt-3 text-[var(--color-slate)]">
            עניתם נכון על {summary.correctCount} מתוך {total} שאלות
            {timedOut ? ' (עד שנגמר הזמן)' : ''}
          </p>
          <p className="mt-2 text-lg font-semibold text-[var(--color-teal)]">+{sessionXp} XP במשימה זו</p>
          {sessionBadges.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {sessionBadges.map((b) => (
                <span key={b.id} className="rounded-lg bg-[var(--color-coral)]/10 px-3 py-1 text-sm font-medium text-[var(--color-coral)]">
                  תג חדש: {b.title}
                </span>
              ))}
            </div>
          )}
          <div className="mx-auto mt-6 h-3 w-full max-w-md overflow-hidden rounded-full bg-[var(--color-mist)]">
            <div className="h-full rounded-full bg-[var(--color-teal)] transition-all duration-700" style={{ width: `${summary.score}%` }} />
          </div>
          <button type="button" onClick={restart} className="mt-8 rounded-xl bg-[var(--color-teal)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-teal-dark)]">
            נסו שוב
          </button>
        </section>
        <section className="space-y-4">
          <h3 className="px-1 text-lg font-semibold text-[var(--color-ink)]">פירוט תשובות</h3>
          {questions.map((q, i) => {
            const userAnswer = answers[i];
            if (!userAnswer) return null;
            const wrong = !userAnswer.isCorrect;
            return (
              <article key={q.id} className={`rounded-2xl bg-white/90 p-6 shadow-sm ring-1 ${wrong ? 'ring-[var(--color-coral)]/35' : 'ring-[var(--color-success)]/35'}`}>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-[var(--color-slate)]">שאלה {i + 1}</span>
                  <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${wrong ? 'bg-[var(--color-coral)]/10 text-[var(--color-coral)]' : 'bg-[var(--color-success)]/10 text-[var(--color-success)]'}`}>
                    {wrong ? 'טעות' : 'נכון'}
                  </span>
                </div>
                <MathRenderer className="text-[var(--color-ink)]">{q.question_text}</MathRenderer>
                {(q.type || 'mcq') === 'mcq' && q.options ? (
                  <ul className="mt-4 space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isCorrectOpt = optIdx === q.correct_index;
                      const isSelected = userAnswer?.selectedIndex === optIdx;
                      let style = 'border border-black/8 bg-[var(--color-paper)]';
                      if (isCorrectOpt) style = 'border border-[var(--color-success)]/40 bg-[var(--color-success)]/8';
                      else if (isSelected && wrong) style = 'border border-[var(--color-coral)]/40 bg-[var(--color-coral)]/8';
                      return (
                        <li key={optIdx} className={`flex items-start gap-3 rounded-xl px-4 py-3 ${style}`}>
                          <span className="mt-0.5 shrink-0 text-sm font-semibold text-[var(--color-slate)]">{OPTION_LABELS[optIdx]}.</span>
                          <MathRenderer className="min-w-0 flex-1">{opt}</MathRenderer>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
                <div className="mt-5 border-t border-black/5 pt-4">
                  <p className="mb-2 text-sm font-semibold text-[var(--color-teal)]">פתרון מפורט</p>
                  <MathRenderer className="text-[var(--color-slate)]">{q.explanation}</MathRenderer>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl" dir="rtl">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-sm text-[var(--color-slate)]">
        <span>
          {phase === 'bonus' ? 'שאלת בונוס' : `שאלה ${Math.min(currentIndex + 1, total)} מתוך ${total}`}
        </span>
        <div className="flex items-center gap-3">
          {mode === 'speed' && (
            <span className={`rounded-md px-2 py-0.5 font-semibold ${secondsLeft <= 0 ? 'bg-[var(--color-coral)] text-white' : 'bg-[var(--color-coral)]/10 text-[var(--color-coral)]'}`}>
              {secondsLeft <= 0 ? 'הזמן הסתיים' : `${secondsLeft}s`}
            </span>
          )}
          <span className="tracking-widest text-[var(--color-coral)]" aria-label={`${hearts} לבבות`}>
            {'♥'.repeat(hearts)}
            <span className="opacity-30">{'♥'.repeat(Math.max(0, MAX_HEARTS - hearts))}</span>
          </span>
        </div>
      </div>
      <div className="mb-6 h-2.5 overflow-hidden rounded-full bg-[var(--color-mist)]">
        <div className="h-full rounded-full bg-[var(--color-teal)] transition-all duration-500 ease-out" style={{ width: `${(answers.length / total) * 100}%` }} role="progressbar" aria-valuenow={answers.length} aria-valuemin={0} aria-valuemax={total} />
      </div>
      <AnimatePresence mode="wait">
        <motion.article
          key={phase === 'bonus' ? 'bonus' : `${current?.id}-${phase === 'feedback' ? 'fb' : 'q'}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className={`rounded-2xl bg-white/90 p-6 shadow-sm ring-1 ring-black/5 sm:p-8 ${shake ? 'animate-shake' : ''}`}
        >
          <MathRenderer className="text-lg text-[var(--color-ink)] sm:text-xl">{current.question_text}</MathRenderer>
          {phase === 'feedback' ? (
            <div className="mt-6 space-y-4">
              <p className={`text-lg font-semibold ${feedback?.isCorrect ? 'text-[var(--color-success)]' : 'text-[var(--color-coral)]'}`}>
                {feedback?.isCorrect ? 'נכון!' : 'לא בדיוק'}
                {feedback?.xpGained ? ` | +${feedback.xpGained} XP` : ''}
              </p>
              {feedback?.newBadges?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {feedback.newBadges.map((b) => (
                    <span key={b.id} className="rounded-lg bg-[var(--color-coral)]/10 px-2 py-1 text-sm">תג: {b.title}</span>
                  ))}
                </div>
              )}
              <MathRenderer className="text-[var(--color-slate)]">{feedback?.explanation}</MathRenderer>
              <button type="button" onClick={goNext} className="rounded-xl bg-[var(--color-teal)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--color-teal-dark)]">
                {currentIndex >= total - 1 ? 'לסיכום' : 'השאלה הבאה'}
              </button>
            </div>
          ) : (
            <>
              <QuestionBody question={current} mcqIndex={mcqIndex} onMcqSelect={setMcqIndex} onInteractiveReady={onInteractiveReady} locked={false} />
              {phase !== 'bonus' && (
                <HintPanel
                  hints={hints}
                  revealed={hintsRevealed}
                  onReveal={() => setHintsRevealed((n) => Math.min(hints.length, n + 1))}
                />
              )}
              <div className="mt-8 flex justify-start">
                <button type="button" disabled={!canSubmit() || (mode === 'speed' && secondsLeft <= 0)} onClick={submitAnswer} className="rounded-xl bg-[var(--color-teal)] px-6 py-3 text-sm font-semibold text-white transition enabled:hover:bg-[var(--color-teal-dark)] disabled:cursor-not-allowed disabled:opacity-40">
                  {phase === 'bonus' ? 'אישור בונוס' : 'בדקו תשובה'}
                </button>
              </div>
            </>
          )}
        </motion.article>
      </AnimatePresence>

      {(phase === 'quiz' || phase === 'feedback') && (
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          <Scratchpad />
          <SciCalculator />
        </div>
      )}
    </div>
  );
}
