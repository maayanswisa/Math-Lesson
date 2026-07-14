# -*- coding: utf-8 -*-
"""Generate QuizCard.jsx with UTF-8 Hebrew."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def w(rel, text):
    p = ROOT / rel
    p.write_text(text, encoding="utf-8")
    print("wrote", rel, len(text))


# Short Hebrew helpers
def h(*codes):
    return "".join(chr(c) if isinstance(c, int) else c for c in codes)


# Using \u in Python string literals (ASCII source)
T = {
    "choose": "\u05d1\u05d7\u05e8\u05d5 \u05ea\u05e9\u05d5\u05d1\u05d4",
    "no_q": "\u05d0\u05d9\u05df \u05e9\u05d0\u05dc\u05d5\u05ea \u05dc\u05d4\u05e6\u05d2\u05d4 \u05d1\u05e0\u05d5\u05e9\u05d0 \u05d6\u05d4.",
    "ready": "\u05de\u05d5\u05db\u05e0\u05d9\u05dd \u05dc\u05d4\u05ea\u05d7\u05d9\u05dc?",
    "ready_p": "\u05d9\u05e9 \u05dc\u05db\u05dd {n} \u05dc\u05d1\u05d1\u05d5\u05ea. \u05db\u05dc \u05d8\u05e2\u05d5\u05ea \u05de\u05d5\u05e8\u05d9\u05d3\u05d4 \u05dc\u05d1. \u05ea\u05e9\u05d5\u05d1\u05d5\u05ea \u05e0\u05db\u05d5\u05e0\u05d5\u05ea \u05de\u05e2\u05e0\u05d9\u05e7\u05d5\u05ea XP!",
    "normal": "\u05de\u05e9\u05d9\u05de\u05d4 \u05e8\u05d2\u05d9\u05dc\u05d4",
    "speed": "Speed Run \u2014 {n} \u05e9\u05e0\u05d9\u05d5\u05ea",
    "no_hearts": "\u05e0\u05d2\u05de\u05e8\u05d5 \u05d4\u05dc\u05d1\u05d1\u05d5\u05ea",
    "no_hearts_p": "\u05e4\u05ea\u05e8\u05d5 \u05e9\u05d0\u05dc\u05ea \u05d1\u05d5\u05e0\u05d5\u05e1 \u05e7\u05dc\u05d4 \u05db\u05d3\u05d9 \u05dc\u05d4\u05d7\u05d6\u05d9\u05e8 \u05dc\u05d1 \u05d0\u05d7\u05d3, \u05d0\u05d5 \u05e1\u05d9\u05d9\u05de\u05d5 \u05d0\u05ea \u05d4\u05de\u05e9\u05d9\u05de\u05d4.",
    "bonus_btn": "\u05e9\u05d0\u05dc\u05ea \u05d1\u05d5\u05e0\u05d5\u05e1 (+ \u05dc\u05d1)",
    "end_btn": "\u05e1\u05d9\u05d5\u05dd \u05d4\u05de\u05e9\u05d9\u05de\u05d4",
    "summary": "\u05e1\u05d9\u05db\u05d5\u05dd \u05d4\u05de\u05d1\u05d7\u05df",
    "score": "\u05d4\u05e6\u05d9\u05d5\u05df \u05e9\u05dc\u05da:",
    "answered": "\u05e2\u05e0\u05d9\u05ea\u05dd \u05e0\u05db\u05d5\u05df \u05e2\u05dc {c} \u05de\u05ea\u05d5\u05da {t} \u05e9\u05d0\u05dc\u05d5\u05ea",
    "xp_session": "+{x} XP \u05d1\u05de\u05e9\u05d9\u05de\u05d4 \u05d6\u05d5",
    "new_badge": "\u05ea\u05d2 \u05d7\u05d3\u05e9:",
    "retry": "\u05e0\u05e1\u05d5 \u05e9\u05d5\u05d1",
    "detail": "\u05e4\u05d9\u05e8\u05d5\u05d8 \u05ea\u05e9\u05d5\u05d1\u05d5\u05ea",
    "q_n": "\u05e9\u05d0\u05dc\u05d4",
    "wrong": "\u05d8\u05e2\u05d5\u05ea",
    "right": "\u05e0\u05db\u05d5\u05df",
    "sol": "\u05e4\u05ea\u05e8\u05d5\u05df \u05de\u05e4\u05d5\u05e8\u05d8",
    "bonus_q": "\u05e9\u05d0\u05dc\u05ea \u05d1\u05d5\u05e0\u05d5\u05e1",
    "of": "\u05de\u05ea\u05d5\u05da",
    "correct_bang": "\u05e0\u05db\u05d5\u05df!",
    "not_exact": "\u05dc\u05d0 \u05d1\u05d3\u05d9\u05d5\u05e7",
    "badge": "\u05ea\u05d2:",
    "to_sum": "\u05dc\u05e1\u05d9\u05db\u05d5\u05dd",
    "next_q": "\u05d4\u05e9\u05d0\u05dc\u05d4 \u05d4\u05d1\u05d0\u05d4",
    "check": "\u05d1\u05d3\u05e7\u05d5 \u05ea\u05e9\u05d5\u05d1\u05d4",
    "confirm_b": "\u05d0\u05d9\u05e9\u05d5\u05e8 \u05d1\u05d5\u05e0\u05d5\u05e1",
    "bonus_text": "\u05e9\u05d0\u05dc\u05ea \u05d1\u05d5\u05e0\u05d5\u05e1: \u05db\u05de\u05d4 \u05d6\u05d4 $2+2$?",
    "bonus_exp": "$2+2=4$ \u2014 \u05dc\u05d1 \u05d7\u05d6\u05e8!",
    "hearts": "\u05dc\u05d1\u05d1\u05d5\u05ea",
}

# Build QuizCard - keep logic in English, inject Hebrew
src = r'''import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';
import FractionPizza from './interactive/FractionPizza';
import NumberLine from './interactive/NumberLine';
import DragMatch from './interactive/DragMatch';
import { useGame } from '../../context/GameContext';
import { fireBigConfetti, fireConfetti } from '../../lib/feedback';
import { playCorrect, playWrong } from '../../lib/sounds';
import { MAX_HEARTS, SPEED_RUN_SECONDS } from '../../lib/gameConfig';

const OPTION_LABELS = ['\u05d0', '\u05d1', '\u05d2', '\u05d3'];

function McqOptions({ options = [], selectedIndex, onSelect, disabled }) {
  return (
    <fieldset className="mt-6 space-y-3 border-0 p-0" disabled={disabled}>
      <legend className="sr-only">''' + T["choose"] + r'''</legend>
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
  return (
    <McqOptions options={question.options} selectedIndex={mcqIndex} onSelect={onMcqSelect} disabled={locked} />
  );
}

const BONUS_QUESTION = {
  id: 'bonus-easy',
  type: 'mcq',
  question_text: ''' + repr(T["bonus_text"])[1:-1].encode().decode('unicode_escape') if False else T["bonus_text"].replace('\\', '\\\\').replace("'", "\\'") + r''',
  options: ['$4$', '$3$', '$5$', '$22$'],
  correct_index: 0,
  explanation: ''' + T["bonus_exp"].replace('\\', '\\\\') + r''',
};
'''

# The BONUS part got messy. Simpler approach: write the whole file as a list of lines using T dict.
print("regen approach 2")

lines = []
# Actually write file completely in Python triple quotes with ONLY {T[...]} insertions outside of JS template literals

quiz = """import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';
import FractionPizza from './interactive/FractionPizza';
import NumberLine from './interactive/NumberLine';
import DragMatch from './interactive/DragMatch';
import { useGame } from '../../context/GameContext';
import { fireBigConfetti, fireConfetti } from '../../lib/feedback';
import { playCorrect, playWrong } from '../../lib/sounds';
import { MAX_HEARTS, SPEED_RUN_SECONDS } from '../../lib/gameConfig';

const OPTION_LABELS = ['\u05d0', '\u05d1', '\u05d2', '\u05d3'];

function McqOptions({ options = [], selectedIndex, onSelect, disabled }) {
  return (
    <fieldset className="mt-6 space-y-3 border-0 p-0" disabled={disabled}>
      <legend className="sr-only">__CHOOSE__</legend>
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
  question_text: '__BONUS_TEXT__',
  options: ['$4$', '$3$', '$5$', '$22$'],
  correct_index: 0,
  explanation: '__BONUS_EXP__',
};

export default function QuizCard({ questions = [], topicCluster = null, onComplete }) {
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
  const finishedRef = useRef(false);

  const current = phase === 'bonus' ? BONUS_QUESTION : questions[currentIndex];
  const onInteractiveReady = useCallback((ans) => setInteractiveAnswer(ans), []);

  function setAnswersBoth(next) {
    answersRef.current = next;
    setAnswers(next);
  }

  function finishQuiz(finalAnswers) {
    if (finishedRef.current) return;
    finishedRef.current = true;
    const correctCount = finalAnswers.filter((a) => a.isCorrect).length;
    const score = finalAnswers.length === 0 ? 0 : Math.round((correctCount / Math.max(total, 1)) * 100);
    const perfect = correctCount === total && total > 0;
    const { xpGained, newBadges } = recordQuizComplete({ score, topicCluster, perfect });
    setSessionXp((x) => x + xpGained);
    setSessionBadges((b) => [...b, ...newBadges]);
    if (perfect || score >= 80) fireBigConfetti();
    setPhase('summary');
    onComplete?.({ score, correctCount, total, answers: finalAnswers });
  }

  useEffect(() => {
    if (!started || mode !== 'speed' || phase === 'summary' || phase === 'outOfHearts') return undefined;
    if (secondsLeft <= 0) {
      finishQuiz(answersRef.current);
      return undefined;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
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
    setStarted(true);
  }

  function start(selectedMode) {
    finishedRef.current = false;
    setMode(selectedMode);
    setStarted(true);
    setSecondsLeft(SPEED_RUN_SECONDS);
  }

  if (!total) {
    return (
      <div className="rounded-2xl bg-white/80 p-8 text-center text-[var(--color-slate)] shadow-sm ring-1 ring-black/5">
        __NO_Q__
      </div>
    );
  }

  if (!started) {
    return (
      <div className="mx-auto max-w-lg space-y-4 rounded-2xl bg-white/90 p-8 text-center shadow-sm ring-1 ring-black/5" dir="rtl">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-ink)]">__READY__</h2>
        <p className="text-[var(--color-slate)]">__READY_P__</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button type="button" onClick={() => start('normal')} className="rounded-xl bg-[var(--color-teal)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--color-teal-dark)]">
            __NORMAL__
          </button>
          <button type="button" onClick={() => start('speed')} className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[var(--color-ink)] ring-1 ring-black/10 hover:ring-[var(--color-teal)]/40">
            __SPEED__
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'outOfHearts') {
    return (
      <div className="mx-auto max-w-lg space-y-4 rounded-2xl bg-white/90 p-8 text-center shadow-sm ring-1 ring-black/5" dir="rtl">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-coral)]">__NO_HEARTS__</h2>
        <p className="text-[var(--color-slate)]">__NO_HEARTS_P__</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button type="button" onClick={() => { setMcqIndex(null); setPhase('bonus'); }} className="rounded-xl bg-[var(--color-teal)] px-6 py-3 text-sm font-semibold text-white">
            __BONUS_BTN__
          </button>
          <button type="button" onClick={() => finishQuiz(answersRef.current)} className="rounded-xl bg-white px-6 py-3 text-sm font-semibold ring-1 ring-black/10">
            __END_BTN__
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'summary' && summary) {
    return (
      <div className="mx-auto w-full max-w-3xl space-y-6" dir="rtl">
        <section className="rounded-2xl bg-white/90 p-8 text-center shadow-sm ring-1 ring-black/5">
          <p className="text-sm font-medium tracking-wide text-[var(--color-teal)]">__SUMMARY__</p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl text-[var(--color-ink)]">
            __SCORE__ {summary.score}
          </h2>
          <p className="mt-3 text-[var(--color-slate)]">
            __ANSWERED_PREFIX__{summary.correctCount}__ANSWERED_MID__{total}__ANSWERED_SUFFIX__
          </p>
          <p className="mt-2 text-lg font-semibold text-[var(--color-teal)]">+{sessionXp} XP __XP_SUFFIX__</p>
          {sessionBadges.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {sessionBadges.map((b) => (
                <span key={b.id} className="rounded-lg bg-[var(--color-coral)]/10 px-3 py-1 text-sm font-medium text-[var(--color-coral)]">
                  __NEW_BADGE__ {b.title}
                </span>
              ))}
            </div>
          )}
          <div className="mx-auto mt-6 h-3 w-full max-w-md overflow-hidden rounded-full bg-[var(--color-mist)]">
            <div className="h-full rounded-full bg-[var(--color-teal)] transition-all duration-700" style={{ width: `${summary.score}%` }} />
          </div>
          <button type="button" onClick={restart} className="mt-8 rounded-xl bg-[var(--color-teal)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-teal-dark)]">
            __RETRY__
          </button>
        </section>
        <section className="space-y-4">
          <h3 className="px-1 text-lg font-semibold text-[var(--color-ink)]">__DETAIL__</h3>
          {questions.map((q, i) => {
            const userAnswer = answers[i];
            if (!userAnswer) return null;
            const wrong = !userAnswer.isCorrect;
            return (
              <article key={q.id} className={`rounded-2xl bg-white/90 p-6 shadow-sm ring-1 ${wrong ? 'ring-[var(--color-coral)]/35' : 'ring-[var(--color-success)]/35'}`}>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-[var(--color-slate)]">__Q_N__ {i + 1}</span>
                  <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${wrong ? 'bg-[var(--color-coral)]/10 text-[var(--color-coral)]' : 'bg-[var(--color-success)]/10 text-[var(--color-success)]'}`}>
                    {wrong ? '__WRONG__' : '__RIGHT__'}
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
                  <p className="mb-2 text-sm font-semibold text-[var(--color-teal)]">__SOL__</p>
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
          {phase === 'bonus' ? '__BONUS_Q__' : `__Q_N__ ${Math.min(currentIndex + 1, total)} __OF__ ${total}`}
        </span>
        <div className="flex items-center gap-3">
          {mode === 'speed' && (
            <span className="rounded-md bg-[var(--color-coral)]/10 px-2 py-0.5 font-semibold text-[var(--color-coral)]">{secondsLeft}s</span>
          )}
          <span className="tracking-widest text-[var(--color-coral)]" aria-label={`${hearts} __HEARTS__`}>
            {'\\u2665'.repeat ? null : null}
            {'?'.repeat(hearts)}
            <span className="opacity-30">{'?'.repeat(Math.max(0, MAX_HEARTS - hearts))}</span>
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
                {feedback?.isCorrect ? '__CORRECT__' : '__NOT_EXACT__'}
                {feedback?.xpGained ? ` | +${feedback.xpGained} XP` : ''}
              </p>
              {feedback?.newBadges?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {feedback.newBadges.map((b) => (
                    <span key={b.id} className="rounded-lg bg-[var(--color-coral)]/10 px-2 py-1 text-sm">__BADGE__ {b.title}</span>
                  ))}
                </div>
              )}
              <MathRenderer className="text-[var(--color-slate)]">{feedback?.explanation}</MathRenderer>
              <button type="button" onClick={goNext} className="rounded-xl bg-[var(--color-teal)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--color-teal-dark)]">
                {currentIndex >= total - 1 ? '__TO_SUM__' : '__NEXT_Q__'}
              </button>
            </div>
          ) : (
            <>
              <QuestionBody question={current} mcqIndex={mcqIndex} onMcqSelect={setMcqIndex} onInteractiveReady={onInteractiveReady} locked={false} />
              <div className="mt-8 flex justify-start">
                <button type="button" disabled={!canSubmit()} onClick={submitAnswer} className="rounded-xl bg-[var(--color-teal)] px-6 py-3 text-sm font-semibold text-white transition enabled:hover:bg-[var(--color-teal-dark)] disabled:cursor-not-allowed disabled:opacity-40">
                  {phase === 'bonus' ? '__CONFIRM_B__' : '__CHECK__'}
                </button>
              </div>
            </>
          )}
        </motion.article>
      </AnimatePresence>
    </div>
  );
}
"""

# Fix OPTION_LABELS - in the template I used \\u05d0 which in a normal Python string becomes Hebrew - good.
# Fix the garbage line with repeat
quiz = quiz.replace("{'\\\\u2665'.repeat ? null : null}\n            ", "")

replacements = {
    "__CHOOSE__": T["choose"],
    "__NO_Q__": T["no_q"],
    "__READY__": T["ready"],
    "__READY_P__": T["ready_p"].replace("{n}", "{MAX_HEARTS}"),
    "__NORMAL__": T["normal"],
    "__SPEED__": T["speed"].replace("{n}", "{SPEED_RUN_SECONDS}"),
    "__NO_HEARTS__": T["no_hearts"],
    "__NO_HEARTS_P__": T["no_hearts_p"],
    "__BONUS_BTN__": T["bonus_btn"],
    "__END_BTN__": T["end_btn"],
    "__SUMMARY__": T["summary"],
    "__SCORE__": T["score"],
    "__ANSWERED_PREFIX__": "\u05e2\u05e0\u05d9\u05ea\u05dd \u05e0\u05db\u05d5\u05df \u05e2\u05dc ",
    "__ANSWERED_MID__": " \u05de\u05ea\u05d5\u05da ",
    "__ANSWERED_SUFFIX__": " \u05e9\u05d0\u05dc\u05d5\u05ea",
    "__XP_SUFFIX__": "\u05d1\u05de\u05e9\u05d9\u05de\u05d4 \u05d6\u05d5",
    "__NEW_BADGE__": T["new_badge"],
    "__RETRY__": T["retry"],
    "__DETAIL__": T["detail"],
    "__Q_N__": T["q_n"],
    "__WRONG__": T["wrong"],
    "__RIGHT__": T["right"],
    "__SOL__": T["sol"],
    "__BONUS_Q__": T["bonus_q"],
    "__OF__": T["of"],
    "__CORRECT__": T["correct_bang"],
    "__NOT_EXACT__": T["not_exact"],
    "__BADGE__": T["badge"],
    "__TO_SUM__": T["to_sum"],
    "__NEXT_Q__": T["next_q"],
    "__CHECK__": T["check"],
    "__CONFIRM_B__": T["confirm_b"],
    "__BONUS_TEXT__": T["bonus_text"],
    "__BONUS_EXP__": T["bonus_exp"],
    "__HEARTS__": T["hearts"],
}

# Fix READY_P and SPEED to use JSX expressions
quiz = quiz.replace("__READY_P__", T["ready_p"].replace("{n}", "' + MAX_HEARTS + '"))
# Better: use placeholder that becomes JSX
quiz = quiz.replace(
    T["ready_p"].replace("{n}", "' + MAX_HEARTS + '"),
    "\u05d9\u05e9 \u05dc\u05db\u05dd {MAX_HEARTS} \u05dc\u05d1\u05d1\u05d5\u05ea. \u05db\u05dc \u05d8\u05e2\u05d5\u05ea \u05de\u05d5\u05e8\u05d9\u05d3\u05d4 \u05dc\u05d1. \u05ea\u05e9\u05d5\u05d1\u05d5\u05ea \u05e0\u05db\u05d5\u05e0\u05d5\u05ea \u05de\u05e2\u05e0\u05d9\u05e7\u05d5\u05ea XP!",
)

for k, v in replacements.items():
    quiz = quiz.replace(k, v)

# Fix ready paragraph to interpolate MAX_HEARTS in JSX
quiz = quiz.replace(
    "\u05d9\u05e9 \u05dc\u05db\u05dd {MAX_HEARTS} \u05dc\u05d1\u05d1\u05d5\u05ea. \u05db\u05dc \u05d8\u05e2\u05d5\u05ea \u05de\u05d5\u05e8\u05d9\u05d3\u05d4 \u05dc\u05d1. \u05ea\u05e9\u05d5\u05d1\u05d5\u05ea \u05e0\u05db\u05d5\u05e0\u05d5\u05ea \u05de\u05e2\u05e0\u05d9\u05e7\u05d5\u05ea XP!",
    "{\\`\\u05d9\\u05e9 \\u05dc\\u05db\\u05dd ${MAX_HEARTS} \\u05dc\\u05d1\\u05d1\\u05d5\\u05ea. \\u05db\\u05dc \\u05d8\\u05e2\\u05d5\\u05ea \\u05de\\u05d5\\u05e8\\u05d9\\u05d3\\u05d4 \\u05dc\\u05d1. \\u05ea\\u05e9\\u05d5\\u05d1\\u05d5\\u05ea \\u05e0\\u05db\\u05d5\\u05e0\\u05d5\\u05ea \\u05de\\u05e2\\u05e0\\u05d9\\u05e7\\u05d5\\u05ea XP!\\`}",
)

# Simpler fix for ready_p - do after all replacements manually
ready_fixed = (
    "\u05d9\u05e9 \u05dc\u05db\u05dd {MAX_HEARTS} \u05dc\u05d1\u05d1\u05d5\u05ea. "
    "\u05db\u05dc \u05d8\u05e2\u05d5\u05ea \u05de\u05d5\u05e8\u05d9\u05d3\u05d4 \u05dc\u05d1. "
    "\u05ea\u05e9\u05d5\u05d1\u05d5\u05ea \u05e0\u05db\u05d5\u05e0\u05d5\u05ea \u05de\u05e2\u05e0\u05d9\u05e7\u05d5\u05ea XP!"
)
# Replace paragraph content with JSX: ?? ??? {MAX_HEARTS} ?????...
jsx_ready = (
    "\u05d9\u05e9 \u05dc\u05db\u05dd {MAX_HEARTS} \u05dc\u05d1\u05d1\u05d5\u05ea. "
    "\u05db\u05dc \u05d8\u05e2\u05d5\u05ea \u05de\u05d5\u05e8\u05d9\u05d3\u05d4 \u05dc\u05d1. "
    "\u05ea\u05e9\u05d5\u05d1\u05d5\u05ea \u05e0\u05db\u05d5\u05e0\u05d5\u05ea \u05de\u05e2\u05e0\u05d9\u05e7\u05d5\u05ea XP!"
)
# In the output file we need literal: ?? ??? {MAX_HEARTS} ?????
quiz = quiz.replace(ready_fixed, "\u05d9\u05e9 \u05dc\u05db\u05dd {MAX_HEARTS} \u05dc\u05d1\u05d1\u05d5\u05ea. \u05db\u05dc \u05d8\u05e2\u05d5\u05ea \u05de\u05d5\u05e8\u05d9\u05d3\u05d4 \u05dc\u05d1. \u05ea\u05e9\u05d5\u05d1\u05d5\u05ea \u05e0\u05db\u05d5\u05e0\u05d5\u05ea \u05de\u05e2\u05e0\u05d9\u05e7\u05d5\u05ea XP!")

speed_text = T["speed"].replace("{n}", "{SPEED_RUN_SECONDS}")
quiz = quiz.replace(speed_text, "Speed Run \u2014 {SPEED_RUN_SECONDS} \u05e9\u05e0\u05d9\u05d5\u05ea")

w("src/components/quiz/QuizCard.jsx", quiz)
# verify
text = (ROOT / "src/components/quiz/QuizCard.jsx").read_text(encoding="utf-8")
assert "fractionPizza" in text
assert "\u05e0\u05db\u05d5\u05df" in text
assert "MAX_HEARTS" in text
print("QuizCard OK")
