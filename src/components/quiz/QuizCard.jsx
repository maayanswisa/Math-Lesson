import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, Reorder, useDragControls } from 'framer-motion';
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
import { SPEED_RUN_SECONDS } from '../../lib/gameConfig';
import { getHintsForQuestion } from '../../lib/hints';
import { shouldShowStudyMorePopup } from '../../lib/promo';
import { readJSON, writeJSON } from '../../lib/storage.js';

const OPTION_LABELS = ['א', 'ב', 'ג', 'ד'];
const TOOL_ORDER_KEY = 'math-lesson-tool-order-v1';

function shuffleArray(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function loadToolOrder() {
  const saved = readJSON(TOOL_ORDER_KEY, null);
  if (Array.isArray(saved) && saved.length === 2 && saved.includes('scratchpad') && saved.includes('calculator')) {
    return saved;
  }
  return ['scratchpad', 'calculator'];
}

/** Panel wrapped for mobile drag-to-reorder — drag only starts from the handle, not the tool itself. */
function ReorderablePanel({ value, label, children }) {
  const controls = useDragControls();
  return (
    <Reorder.Item
      as="div"
      value={value}
      dragListener={false}
      dragControls={controls}
      className="rounded-2xl bg-white shadow-sm ring-1 ring-black/10"
    >
      <div
        onPointerDown={(e) => controls.start(e)}
        className="flex touch-none cursor-grab items-center justify-center gap-1.5 rounded-t-2xl border-b border-black/5 py-2 text-xs font-medium text-[var(--color-slate)] active:cursor-grabbing"
      >
        <span aria-hidden="true">⠿</span>
        גררו לסידור מחדש · {label}
      </div>
      <div className="p-1">{children}</div>
    </Reorder.Item>
  );
}

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

function ExplanationButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-[var(--color-teal)] ring-1 ring-[var(--color-teal)]/30 transition hover:bg-[var(--color-teal)]/5"
    >
      <span aria-hidden="true">📘</span> צפייה בהסבר
    </button>
  );
}

function KeyFormulasList({ items, className = '' }) {
  return (
    <div className={`rounded-xl bg-[var(--color-paper)] p-4 ring-1 ring-black/5 ${className}`}>
      <p className="mb-2 text-sm font-semibold text-[var(--color-teal)]">נוסחאות וטיפים לזכור</p>
      <ul className="space-y-1.5 text-sm text-[var(--color-ink)]">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-teal)]" />
            <MathRenderer className="min-w-0 flex-1">{item}</MathRenderer>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExplanationModal({ explanation, keyFormulas, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="explanation-modal-title"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
        dir="rtl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="סגירה"
          className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-lg text-[var(--color-slate)] transition hover:bg-[var(--color-paper)]"
        >
          ✕
        </button>
        <h3 id="explanation-modal-title" className="mb-4 pl-8 text-lg font-semibold text-[var(--color-ink)]">
          הסבר הנושא
        </h3>
        {explanation && <MathRenderer className="text-[var(--color-slate)]">{explanation}</MathRenderer>}
        {keyFormulas && keyFormulas.length > 0 && <KeyFormulasList items={keyFormulas} className="mt-4" />}
      </motion.div>
    </div>
  );
}

const INTERACTIVE_COMPONENTS = {
  fractionPizza: FractionPizza,
  numberLine: NumberLine,
  dragMatch: DragMatch,
};

function QuestionBody({ question, mcqIndex, onMcqSelect, onInteractiveReady, locked }) {
  const type = question.type || 'mcq';
  const Interactive = INTERACTIVE_COMPONENTS[type];
  if (Interactive) {
    return (
      <div className="mt-6">
        <Interactive key={question.id} payload={question.payload} correctAnswer={question.correctAnswer} onAnswerReady={onInteractiveReady} />
      </div>
    );
  }
  return <McqOptions options={question.options} selectedIndex={mcqIndex} onSelect={onMcqSelect} disabled={locked} />;
}

export default function QuizCard({
  questions = [],
  /** Much larger question pool for speed-run mode, so it never runs out before the timer ends. */
  speedQuestions = [],
  topicExplanation = null,
  topicKeyFormulas = null,
  grade = null,
  onComplete,
  /** Parent redraws questions (topic bank); omit for custom quizzes. */
  onRetry,
}) {
  const { muted, recordAnswer, recordQuizComplete } = useGame();
  const [mode, setMode] = useState('normal');
  const [started, setStarted] = useState(false);
  const [activeQuestions, setActiveQuestions] = useState(questions);
  const total = activeQuestions.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mcqIndex, setMcqIndex] = useState(null);
  const [interactiveAnswer, setInteractiveAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const answersRef = useRef([]);
  const shakeTimeoutRef = useRef(null);
  const [phase, setPhase] = useState('quiz');
  const [feedback, setFeedback] = useState(null);
  const [shake, setShake] = useState(false);
  const [sessionXp, setSessionXp] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(SPEED_RUN_SECONDS);
  const [timedOut, setTimedOut] = useState(false);
  const finishedRef = useRef(false);
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [showPromo, setShowPromo] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [toolOrder, setToolOrder] = useState(loadToolOrder);
  const hasTopicExplanation = Boolean(topicExplanation) || Boolean(topicKeyFormulas && topicKeyFormulas.length > 0);

  useEffect(() => {
    writeJSON(TOOL_ORDER_KEY, toolOrder);
  }, [toolOrder]);

  const showCalculator = grade != null && Number(grade) >= 7;
  const current = activeQuestions[currentIndex];
  const hints = useMemo(() => getHintsForQuestion(current), [current]);
  const onInteractiveReady = useCallback((ans) => setInteractiveAnswer(ans), []);

  useEffect(() => {
    setHintsRevealed(0);
  }, [current?.id]);

  useEffect(() => {
    return () => {
      if (shakeTimeoutRef.current) clearTimeout(shakeTimeoutRef.current);
    };
  }, []);

  function setAnswersBoth(next) {
    answersRef.current = next;
    setAnswers(next);
  }

  function finishQuiz(finalAnswers, reason = 'complete') {
    if (finishedRef.current) return;
    finishedRef.current = true;
    if (reason === 'timeout') setTimedOut(true);
    // Use the number of questions actually answered, not the pool size — a
    // speed run can loop through the pool multiple times before time is up.
    const answeredCount = finalAnswers.length;
    const correctCount = finalAnswers.filter((a) => a.isCorrect).length;
    const wrongCount = answeredCount - correctCount;
    const score = answeredCount === 0 ? 0 : Math.round((correctCount / answeredCount) * 100);
    const perfect = correctCount === answeredCount && answeredCount > 0 && reason !== 'timeout';
    const { xpGained } = recordQuizComplete({ perfect });
    setSessionXp((x) => x + xpGained);
    if (perfect || score >= 80) fireBigConfetti();
    if (shouldShowStudyMorePopup(wrongCount)) setShowPromo(true);
    setPhase('summary');
    onComplete?.({ score, correctCount, total: answeredCount, answers: finalAnswers, timedOut: reason === 'timeout' });
  }

  useEffect(() => {
    if (!started || mode !== 'speed') return undefined;
    if (phase === 'summary') return undefined;
    if (finishedRef.current) return undefined;
    if (secondsLeft > 0) {
      const t = setTimeout(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
      return () => clearTimeout(t);
    }
    finishQuiz(answersRef.current, 'timeout');
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, mode, phase, secondsLeft]);

  // Speed run: answering a question submits it automatically — no "check answer" click.
  useEffect(() => {
    if (mode !== 'speed' || phase !== 'quiz') return;
    if (!canSubmit()) return;
    submitAnswer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, phase, mcqIndex, interactiveAnswer]);

  // Speed run: briefly show correct/wrong, then move on automatically — no "next question" click.
  useEffect(() => {
    if (mode !== 'speed' || phase !== 'feedback') return undefined;
    const t = setTimeout(() => goNext(), 550);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, phase, feedback]);

  const summary = useMemo(() => {
    if (phase !== 'summary') return null;
    const answeredCount = answers.length;
    const correctCount = answers.filter((a) => a.isCorrect).length;
    const score = answeredCount === 0 ? 0 : Math.round((correctCount / answeredCount) * 100);
    return { correctCount, score, answeredCount };
  }, [phase, answers]);

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

    const { xpGained } = recordAnswer(isCorrect);
    setSessionXp((x) => x + xpGained);

    const entry = {
      questionId: current.id,
      question: current,
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
      if (shakeTimeoutRef.current) clearTimeout(shakeTimeoutRef.current);
      shakeTimeoutRef.current = setTimeout(() => setShake(false), 500);
    }

    setFeedback({ isCorrect, explanation: current.explanation, xpGained });
    setPhase('feedback');
  }

  function goNext() {
    setFeedback(null);
    setMcqIndex(null);
    setInteractiveAnswer(null);
    if (currentIndex >= total - 1) {
      if (mode === 'speed') {
        // Speed run only ends on timeout — loop back through a reshuffled
        // pool instead of stopping once the pool is exhausted.
        setActiveQuestions((qs) => shuffleArray(qs));
        setCurrentIndex(0);
        setPhase('quiz');
        return;
      }
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
    setActiveQuestions(questions);
    setCurrentIndex(0);
    setMcqIndex(null);
    setInteractiveAnswer(null);
    setAnswersBoth([]);
    setPhase('quiz');
    setFeedback(null);
    setSessionXp(0);
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
    setCurrentIndex(0);
    setActiveQuestions(
      selectedMode === 'speed' && speedQuestions.length > questions.length
        ? shuffleArray(speedQuestions)
        : questions,
    );
  }

  if (!total) {
    return (
      <div className="rounded-2xl bg-white/80 p-8 text-center text-[var(--color-slate)] shadow-sm ring-1 ring-black/5">
        אין שאלות להצגה בנושא זה.
      </div>
    );
  }

  if (!started) {
    const hasExplanation = Boolean(topicExplanation) || Boolean(topicKeyFormulas && topicKeyFormulas.length > 0);
    const startButtons = (
      <div className="mx-auto grid max-w-xs grid-cols-2 gap-3">
        <button type="button" onClick={() => start('normal')} className="flex min-h-16 flex-col items-center justify-center rounded-xl bg-[var(--color-teal)] px-3 py-3 text-sm font-semibold text-white hover:bg-[var(--color-teal-dark)]">
          התחל מבחן
        </button>
        <button type="button" onClick={() => start('speed')} className="flex min-h-16 flex-col items-center justify-center gap-0.5 rounded-xl bg-[var(--color-teal)] px-3 py-3 text-white hover:bg-[var(--color-teal-dark)]">
          <span className="text-sm font-semibold">מבחן מהיר</span>
          <span className="text-xs font-normal text-white/80">כמה שאלות תפתרו בדקה?</span>
        </button>
      </div>
    );
    return (
      <div className="mx-auto max-w-lg space-y-5 rounded-2xl bg-white/90 p-8 text-center shadow-sm ring-1 ring-black/5" dir="rtl">
        {hasExplanation && startButtons}
        {hasExplanation && (
          <div className="space-y-4 text-right">
            {topicExplanation && (
              <MathRenderer className="text-[var(--color-slate)]">{topicExplanation}</MathRenderer>
            )}
            {topicKeyFormulas && topicKeyFormulas.length > 0 && <KeyFormulasList items={topicKeyFormulas} />}
          </div>
        )}
        {startButtons}
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
            <p className="mt-3 text-lg font-semibold text-[var(--color-coral-dark)]">הזמן הסתיים</p>
          )}
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl text-[var(--color-ink)]">
            הציון שלך: {summary.score}
          </h2>
          <p className="mt-3 text-[var(--color-slate)]">
            עניתם נכון על {summary.correctCount} מתוך {summary.answeredCount} שאלות
            {timedOut ? ' (עד שנגמר הזמן)' : ''}
          </p>
          <p className="mt-2 text-lg font-semibold text-[var(--color-teal)]">+{sessionXp} XP במשימה זו</p>
          <div className="mx-auto mt-6 h-3 w-full max-w-md overflow-hidden rounded-full bg-[var(--color-mist)]">
            <div className="h-full rounded-full bg-[var(--color-teal)] transition-all duration-700" style={{ width: `${summary.score}%` }} />
          </div>
          <button type="button" onClick={restart} className="mt-8 rounded-xl bg-[var(--color-teal)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-teal-dark)]">
            נסו שוב
          </button>
        </section>
        <section className="space-y-4">
          <h3 className="px-1 text-lg font-semibold text-[var(--color-ink)]">פירוט תשובות</h3>
          {answers.map((userAnswer, i) => {
            const q = userAnswer.question;
            if (!q) return null;
            const wrong = !userAnswer.isCorrect;
            return (
              <article key={`${q.id}-${i}`} className={`rounded-2xl bg-white/90 p-6 shadow-sm ring-1 ${wrong ? 'ring-[var(--color-coral)]/35' : 'ring-[var(--color-success)]/35'}`}>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-[var(--color-slate)]">שאלה {i + 1}</span>
                  <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${wrong ? 'bg-[var(--color-coral)]/10 text-[var(--color-coral-dark)]' : 'bg-[var(--color-success)]/10 text-[var(--color-success)]'}`}>
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
    <div className="mx-auto w-full max-w-2xl lg:max-w-none lg:flex lg:items-stretch lg:gap-6" dir="rtl">
      <div className="min-w-0 lg:flex-1">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-sm text-[var(--color-slate)]">
          <span>
            {mode === 'speed'
              ? `שאלה ${answers.length + 1}`
              : `שאלה ${Math.min(currentIndex + 1, total)} מתוך ${total}`}
          </span>
          <div className="flex items-center gap-3">
            {mode === 'speed' && (
              <span className={`rounded-md px-2 py-0.5 font-semibold ${secondsLeft <= 0 ? 'bg-[var(--color-coral)] text-white' : 'bg-[var(--color-coral)]/10 text-[var(--color-coral-dark)]'}`}>
                {secondsLeft <= 0 ? 'הזמן הסתיים' : `${secondsLeft}s`}
              </span>
            )}
          </div>
        </div>
        <div className="mb-6 h-2.5 overflow-hidden rounded-full bg-[var(--color-mist)]">
          <div
            className="h-full rounded-full bg-[var(--color-teal)] transition-all duration-500 ease-out"
            style={{ width: `${mode === 'speed' ? (secondsLeft / SPEED_RUN_SECONDS) * 100 : (answers.length / total) * 100}%` }}
            role="progressbar"
            aria-valuenow={mode === 'speed' ? secondsLeft : answers.length}
            aria-valuemin={0}
            aria-valuemax={mode === 'speed' ? SPEED_RUN_SECONDS : total}
          />
        </div>
        <AnimatePresence mode="wait">
          <motion.article
            key={`${current?.id}-${phase === 'feedback' ? 'fb' : 'q'}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className={`rounded-2xl bg-white/90 p-6 shadow-sm ring-1 ring-black/5 sm:p-8 ${shake ? 'animate-shake' : ''}`}
          >
            <MathRenderer className="text-lg text-[var(--color-ink)] sm:text-xl">{current.question_text}</MathRenderer>
            {phase === 'feedback' ? (
              <div className="mt-6 space-y-4">
                {mode !== 'speed' && (
                  <>
                    <p className={`text-lg font-semibold ${feedback?.isCorrect ? 'text-[var(--color-success)]' : 'text-[var(--color-coral-dark)]'}`}>
                      {feedback?.isCorrect ? 'נכון!' : 'לא בדיוק'}
                      {feedback?.xpGained ? ` | +${feedback.xpGained} XP` : ''}
                    </p>
                    <MathRenderer className="text-[var(--color-slate)]">{feedback?.explanation}</MathRenderer>
                  </>
                )}
                {mode !== 'speed' && (
                  <button type="button" onClick={goNext} className="rounded-xl bg-[var(--color-teal)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--color-teal-dark)]">
                    {currentIndex >= total - 1 ? 'לסיכום' : 'השאלה הבאה'}
                  </button>
                )}
              </div>
            ) : (
              <>
                <QuestionBody question={current} mcqIndex={mcqIndex} onMcqSelect={setMcqIndex} onInteractiveReady={onInteractiveReady} locked={false} />
                <HintPanel
                  hints={hints}
                  revealed={hintsRevealed}
                  onReveal={() => setHintsRevealed((n) => Math.min(hints.length, n + 1))}
                />
                {mode !== 'speed' && (
                  <div className="mt-8 flex justify-start">
                    <button type="button" disabled={!canSubmit()} onClick={submitAnswer} className="rounded-xl bg-[var(--color-teal)] px-6 py-3 text-sm font-semibold text-white transition enabled:hover:bg-[var(--color-teal-dark)] disabled:cursor-not-allowed disabled:opacity-40">
                      בדקו תשובה
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.article>
        </AnimatePresence>
      </div>

      {(phase === 'quiz' || phase === 'feedback') && (
        <>
          {/* מובייל: כלים בעמודה אחת, ברוחב מלא; אם יש מחשבון — אפשר לגרור ולסדר מחדש */}
          <div className="mt-4 flex flex-col lg:hidden">
            {hasTopicExplanation && <ExplanationButton onClick={() => setShowExplanation(true)} />}
            {showCalculator ? (
              <Reorder.Group axis="y" values={toolOrder} onReorder={setToolOrder} as="div" className="space-y-3">
                {toolOrder.map((key) =>
                  key === 'scratchpad' ? (
                    <ReorderablePanel key="scratchpad" value="scratchpad" label="לוח טיוטה">
                      <Scratchpad />
                    </ReorderablePanel>
                  ) : (
                    <ReorderablePanel key="calculator" value="calculator" label="מחשבון">
                      <SciCalculator />
                    </ReorderablePanel>
                  ),
                )}
              </Reorder.Group>
            ) : (
              <Scratchpad />
            )}
          </div>

          {/* מסך רחב: הכלים בסרגל צד קבוע, ליד השאלה */}
          <div className="hidden gap-3 lg:sticky lg:top-4 lg:flex lg:w-72 lg:shrink-0 lg:flex-col">
            {hasTopicExplanation && <ExplanationButton onClick={() => setShowExplanation(true)} />}
            <div className="lg:min-h-0 lg:flex-1">
              <Scratchpad />
            </div>
            {showCalculator && <SciCalculator />}
          </div>
        </>
      )}

      {showExplanation && (
        <ExplanationModal
          explanation={topicExplanation}
          keyFormulas={topicKeyFormulas}
          onClose={() => setShowExplanation(false)}
        />
      )}
    </div>
  );
}
