import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { MotionConfig, motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { getTopicById, GRADE_LABELS } from '../data/curriculum';
import { loadWorksheet } from '../data/worksheets';
import { fireBigConfetti, fireConfetti } from '../lib/feedback';
import { logQuizAttempt } from '../lib/progressLog';
import { playCorrect, playWrong } from '../lib/sounds';
import {
  countItems,
  emptyWorksheetState,
  gradeExercise,
  isBlankEmpty,
  itemBlanks,
  itemKey,
  partOf,
  partProgress,
  readWorksheetState,
  writeWorksheetState,
  writeWorksheetSummary,
  blankKey,
  choiceKey,
} from '../lib/worksheet';
import ExerciseCard from '../components/worksheet/ExerciseCard';
import ReminderCard from '../components/worksheet/ReminderCard';

const TABS = [
  { id: 'p0', icon: '📄', label: 'עמוד 1' },
  { id: 'p1', icon: '📄', label: 'עמוד 2' },
  { id: 'quiz', icon: '🏁', label: 'מבדק' },
  { id: 'answers', icon: '🔑', label: 'תשובות' },
];

/** מוחק ערכים/סימונים של תרגיל (או של חלק שלם, בלי exIdx). */
function without(obj, prefix) {
  return Object.fromEntries(Object.entries(obj).filter(([k]) => !k.startsWith(prefix)));
}

function gradeLabel(score) {
  if (score === 100) return 'מושלם! 🏆';
  if (score >= 90) return 'מצוין! 🌟';
  if (score >= 75) return 'טוב מאוד! 👏';
  if (score >= 55) return 'בדרך הנכונה 💪';
  return 'כדאי לחזור על החומר ולנסות שוב 📚';
}

export default function WorksheetPage() {
  const { topicId } = useParams();
  const topic = getTopicById(topicId);
  const { muted, recordAnswer, recordQuizComplete } = useGame();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = TABS.some((t) => t.id === searchParams.get('tab')) ? searchParams.get('tab') : 'p0';

  const [ws, setWs] = useState(undefined); // undefined = טוען, null = אין דף
  const [state, setState] = useState(emptyWorksheetState);
  const [reminderOpen, setReminderOpen] = useState(tab === 'p0');
  const [confirmSubmit, setConfirmSubmit] = useState(0); // כמה ריקות נשארו כשביקשו להגיש
  const [revealQuizAnswers, setRevealQuizAnswers] = useState(false);
  const topRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    setWs(undefined);
    loadWorksheet(topicId)
      .then((w) => {
        if (cancelled) return;
        setWs(w);
        if (w) setState(readWorksheetState(w.id));
      })
      .catch(() => !cancelled && setWs(null));
    return () => {
      cancelled = true;
    };
  }, [topicId]);

  const save = useCallback(
    (next) => {
      setState(next);
      writeWorksheetState(ws.id, next);
    },
    [ws],
  );

  const progress = useMemo(() => {
    if (!ws) return null;
    return { p0: partProgress(ws, 'p0', state.marks), p1: partProgress(ws, 'p1', state.marks) };
  }, [ws, state.marks]);

  // סיכום קצר לרשימת דפי העבודה (נקרא בלי לטעון את תוכן הדף).
  useEffect(() => {
    if (!ws || !progress) return;
    const quizScore = state.quiz.submitted ? Math.round((state.quiz.correct / state.quiz.total) * 100) : null;
    writeWorksheetSummary(ws.id, { ...progress, quiz: quizScore, best: state.quiz.best ?? null });
  }, [ws, progress, state.quiz]);

  function goTab(id) {
    setSearchParams(id === 'p0' ? {} : { tab: id }, { replace: false });
    setReminderOpen(id === 'p0');
    setConfirmSubmit(0);
    requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }

  function handleChange(key, value) {
    const marks = { ...state.marks };
    delete marks[key];
    save({ ...state, values: { ...state.values, [key]: value }, marks });
    setConfirmSubmit(0);
  }

  /** @returns {boolean} false אם אין עדיין שום תשובה לבדוק. */
  function handleCheck(partId, exIdx) {
    const ex = partOf(ws, partId).exercises[exIdx];
    const { marks, items } = gradeExercise(ex, partId, exIdx, state.values, { skipEmpty: true });
    if (Object.keys(marks).length === 0) return false;

    const awarded = { ...state.awarded };
    items.forEach((ok, itemIdx) => {
      const k = itemKey(partId, exIdx, itemIdx);
      if (ok && !awarded[k]) {
        awarded[k] = true;
        recordAnswer(true);
      }
    });

    if (items.every(Boolean)) {
      playCorrect(muted);
      fireConfetti();
    } else if (Object.values(marks).some((v) => v === false)) {
      playWrong(muted);
    } else {
      playCorrect(muted);
    }
    save({ ...state, marks: { ...state.marks, ...marks }, awarded });
    return true;
  }

  function handleReset(partId, exIdx) {
    const prefix = `${partId}.${exIdx}.`;
    save({ ...state, values: without(state.values, prefix), marks: without(state.marks, prefix) });
  }

  function countEmptyQuizItems() {
    return ws.quiz.exercises.reduce(
      (sum, ex, exIdx) =>
        sum +
        ex.items.filter((item, itemIdx) =>
          item.options
            ? state.values[choiceKey('quiz', exIdx, itemIdx)] == null
            : itemBlanks(item).some((blank, b) => isBlankEmpty(blank, state.values[blankKey('quiz', exIdx, itemIdx, b)])),
        ).length,
      0,
    );
  }

  function handleSubmitQuiz() {
    const empty = countEmptyQuizItems();
    if (empty > 0 && confirmSubmit === 0) {
      setConfirmSubmit(empty);
      return;
    }
    setConfirmSubmit(0);

    let marks = { ...state.marks };
    let correct = 0;
    ws.quiz.exercises.forEach((ex, exIdx) => {
      const g = gradeExercise(ex, 'quiz', exIdx, state.values);
      marks = { ...marks, ...g.marks };
      correct += g.items.filter(Boolean).length;
    });
    const total = countItems(ws.quiz);
    const score = Math.round((correct / total) * 100);

    if (!state.quiz.rewarded) {
      for (let i = 0; i < correct; i++) recordAnswer(true);
      recordQuizComplete({ perfect: correct === total });
    }
    logQuizAttempt({ topicId, title: `מבדק — ${topic?.title ?? ws.title}`, grade: ws.grade, score, correctCount: correct, total });

    if (score >= 80) {
      playCorrect(muted);
      fireBigConfetti();
    } else if (score >= 55) {
      playCorrect(muted);
    } else {
      playWrong(muted);
    }

    save({
      ...state,
      marks,
      quiz: { submitted: true, correct, total, rewarded: true, best: Math.max(score, state.quiz.best ?? 0) },
    });
    requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }

  function handleRetryQuiz() {
    save({
      ...state,
      values: without(state.values, 'quiz.'),
      marks: without(state.marks, 'quiz.'),
      quiz: { ...state.quiz, submitted: false, correct: 0, total: 0 },
    });
    setRevealQuizAnswers(false);
  }

  const backHref = topic ? `/grade/${topic.grade}/worksheets` : '/';

  if (ws === undefined) {
    return (
      <div className="rounded-2xl bg-white/80 p-8 text-center text-[var(--color-slate)] shadow-sm ring-1 ring-black/5">
        טוען דף עבודה…
      </div>
    );
  }

  if (ws === null) {
    return (
      <div className="space-y-4" dir="rtl">
        <Link to={backHref} className="text-sm text-[var(--color-teal)] hover:underline">
          ← חזרה לדפי העבודה
        </Link>
        <p className="rounded-2xl bg-white/80 p-8 text-[var(--color-slate)] ring-1 ring-black/5">
          עדיין אין דף עבודה לנושא הזה.{' '}
          <Link to={`/quiz/${topicId}`} className="font-bold text-[var(--color-teal)] hover:underline">
            למבחן בנושא ←
          </Link>
        </p>
      </div>
    );
  }

  const quizScore = state.quiz.submitted ? Math.round((state.quiz.correct / state.quiz.total) * 100) : null;

  function tabBadge(id) {
    if (id === 'quiz') return quizScore == null ? `${countItems(ws.quiz)} שאלות` : `ציון ${quizScore}`;
    if (id === 'answers') return 'בסוף';
    const p = progress[id];
    return p.done === p.total ? '✓ הושלם' : `${p.done}/${p.total}`;
  }

  const practicePart = tab === 'p0' || tab === 'p1';
  const nextTab = TABS[TABS.findIndex((t) => t.id === tab) + 1];

  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto max-w-3xl space-y-6" dir="rtl">
        <div>
          <Link to={backHref} className="text-sm text-[var(--color-teal)] hover:underline">
            ← חזרה לדפי העבודה
          </Link>
          <div className="mt-4 text-center">
            <span className="inline-block rounded-full bg-[var(--color-sky)]/10 px-3 py-1 text-xs font-bold text-[var(--color-sky-dark)]">
              📝 דף עבודה · כיתה {GRADE_LABELS[ws.grade]}
            </span>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)] sm:text-4xl">
              {ws.emoji} {topic?.title ?? ws.title}
            </h1>
            {topic?.description && <p className="mt-2 text-[var(--color-slate)]">{topic.description}</p>}
          </div>
        </div>

        {/* לשוניות: עמוד 1 · עמוד 2 · מבדק · תשובות */}
        <nav
          ref={topRef}
          className="sticky top-0 z-20 -mx-4 scroll-mt-0 bg-[var(--color-paper)]/90 px-4 py-2 backdrop-blur-sm sm:mx-0 sm:rounded-2xl sm:px-2"
          aria-label="חלקי דף העבודה"
        >
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
            {TABS.map((t) => {
              const active = t.id === tab;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => goTab(t.id)}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-xl px-1 py-2 text-center ring-1 transition ${
                    active
                      ? 'bg-[var(--color-sky)] text-white shadow-md ring-[var(--color-sky)]'
                      : 'bg-white text-[var(--color-ink)] ring-black/10 hover:ring-[var(--color-sky)]/50'
                  }`}
                >
                  <span className="block text-sm font-bold sm:text-base">
                    <span aria-hidden="true" className="hidden sm:inline">
                      {t.icon}{' '}
                    </span>
                    {t.label}
                  </span>
                  <span className={`block text-[11px] ${active ? 'text-white/85' : 'text-[var(--color-slate)]'}`}>
                    {tabBadge(t.id)}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {tab !== 'answers' && (
          <ReminderCard reminder={ws.reminder} open={reminderOpen} onToggle={() => setReminderOpen((o) => !o)} />
        )}

        {practicePart && (
          <PracticePart
            ws={ws}
            partId={tab}
            state={state}
            onChange={handleChange}
            onCheck={handleCheck}
            onReset={handleReset}
          />
        )}

        {tab === 'quiz' && (
          <div className="space-y-5">
            {state.quiz.submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl bg-white p-6 text-center shadow-md ring-2 ring-[var(--color-sky)]/40"
              >
                <p className="text-sm font-bold text-[var(--color-slate)]">הציון שלך במבדק</p>
                <p className="mt-1 font-[family-name:var(--font-display)] text-5xl text-[var(--color-sky-dark)]">{quizScore}</p>
                <p className="mt-1 text-[var(--color-ink)]">
                  {state.quiz.correct} מתוך {state.quiz.total} תשובות נכונות · {gradeLabel(quizScore)}
                </p>
                <div className="mx-auto mt-3 h-2.5 max-w-xs overflow-hidden rounded-full bg-[var(--color-mist)]">
                  <div className="h-full rounded-full bg-[var(--color-sky)] transition-all duration-700" style={{ width: `${quizScore}%` }} />
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <button
                    type="button"
                    onClick={handleRetryQuiz}
                    className="rounded-xl bg-[var(--color-sky)] px-5 py-2 text-sm font-bold text-white hover:bg-[var(--color-sky-dark)]"
                  >
                    ↺ מבדק חוזר
                  </button>
                  <button
                    type="button"
                    onClick={() => goTab('answers')}
                    className="rounded-xl bg-white px-5 py-2 text-sm font-bold text-[var(--color-ink)] ring-1 ring-black/15 hover:bg-[var(--color-mist)]"
                  >
                    🔑 לתשובות
                  </button>
                </div>
                <p className="mt-3 text-xs text-[var(--color-slate)]">גללו למטה כדי לראות מה היה נכון (ירוק) ומה לא (אדום)</p>
              </motion.div>
            ) : (
              <div className="rounded-2xl bg-[var(--color-sky)]/8 p-4 text-sm text-[var(--color-ink)] ring-1 ring-[var(--color-sky)]/25">
                <span className="font-bold">🏁 מבדק מסכם · </span>
                {countItems(ws.quiz)} שאלות על כל החומר. ענו על הכול, ורק בסוף לחצו "הגשת המבדק" — אז תקבלו ציון ותראו מה
                נכון.
              </div>
            )}

            {ws.quiz.exercises.map((ex, exIdx) => (
              <ExerciseCard
                key={exIdx}
                ex={ex}
                exIdx={exIdx}
                number={`שאלה ${exIdx + 1}`}
                partId="quiz"
                values={state.values}
                marks={state.marks}
                mode="quiz"
                disabled={state.quiz.submitted}
                onChange={handleChange}
              />
            ))}

            {!state.quiz.submitted && (
              <div className="flex flex-col items-center gap-2 pt-2">
                {confirmSubmit > 0 && (
                  <p role="alert" className="text-center text-sm font-semibold text-[var(--color-coral)]">
                    {confirmSubmit === 1 ? 'נשארה שאלה אחת שלא עניתם עליה' : `נשארו ${confirmSubmit} שאלות שלא עניתם עליהן`} — ללחוץ
                    שוב כדי להגיש בכל זאת?
                  </p>
                )}
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmitQuiz}
                  className="rounded-2xl bg-[var(--color-teal)] px-10 py-3 text-base font-bold text-white shadow-md shadow-[var(--color-teal)]/20 hover:bg-[var(--color-teal-dark)]"
                >
                  {confirmSubmit > 0 ? 'כן, להגיש' : 'הגשת המבדק ✓'}
                </motion.button>
              </div>
            )}
          </div>
        )}

        {tab === 'answers' && (
          <AnswersPart
            ws={ws}
            quizLocked={!state.quiz.submitted && !revealQuizAnswers}
            onRevealQuiz={() => setRevealQuizAnswers(true)}
          />
        )}

        {nextTab && (
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={() => goTab(nextTab.id)}
              className="rounded-xl bg-white px-6 py-2.5 text-sm font-bold text-[var(--color-sky-dark)] shadow-sm ring-1 ring-[var(--color-sky)]/30 transition hover:-translate-y-0.5 hover:ring-[var(--color-sky)]/60"
            >
              ממשיכים ל{nextTab.label} ←
            </button>
          </div>
        )}
      </div>
    </MotionConfig>
  );
}

function PracticePart({ ws, partId, state, onChange, onCheck, onReset }) {
  const part = partOf(ws, partId);
  return (
    <div className="space-y-5">
      {part.title && (
        <h2 className="text-xl font-bold text-[var(--color-ink)]">
          {part.title}
        </h2>
      )}
      {part.exercises.map((ex, exIdx) => (
        <ExerciseCard
          key={`${partId}-${exIdx}`}
          ex={ex}
          exIdx={exIdx}
          number={`תרגיל ${exIdx + 1}`}
          partId={partId}
          values={state.values}
          marks={state.marks}
          mode="practice"
          onChange={onChange}
          onCheck={(i) => onCheck(partId, i)}
          onReset={(i) => onReset(partId, i)}
        />
      ))}
    </div>
  );
}

function AnswersPart({ ws, quizLocked, onRevealQuiz }) {
  const sections = [
    { id: 'p0', label: 'עמוד 1', prefix: 'תרגיל' },
    { id: 'p1', label: 'עמוד 2', prefix: 'תרגיל' },
    { id: 'quiz', label: 'מבדק', prefix: 'שאלה' },
  ];
  return (
    <div className="space-y-8">
      <p className="rounded-2xl bg-[var(--color-success)]/8 p-4 text-sm text-[var(--color-ink)] ring-1 ring-[var(--color-success)]/25">
        <span className="font-bold">🔑 מפתח תשובות · </span>
        כדאי להציץ כאן רק אחרי שניסיתם לבד. התשובות מסומנות בירוק.
      </p>
      {sections.map((s) => {
        const part = partOf(ws, s.id);
        return (
          <section key={s.id} className="space-y-4">
            <h2 className="text-xl font-bold text-[var(--color-ink)]">
              תשובות — {s.label}
              {part.title && s.id !== 'quiz' && <span className="font-normal text-[var(--color-slate)]"> · {part.title}</span>}
            </h2>
            {s.id === 'quiz' && quizLocked ? (
              <div className="rounded-2xl border-2 border-dashed border-[var(--color-slate)]/25 p-6 text-center text-[var(--color-slate)]">
                <p className="text-2xl" aria-hidden="true">
                  🔒
                </p>
                <p className="mt-1 font-semibold">התשובות למבדק ייפתחו אחרי שתגישו אותו</p>
                <button type="button" onClick={onRevealQuiz} className="mt-2 text-xs font-semibold text-[var(--color-teal)] hover:underline">
                  הורה או מורה? להצגה בכל זאת
                </button>
              </div>
            ) : (
              part.exercises.map((ex, exIdx) => (
                <ExerciseCard
                  key={exIdx}
                  ex={ex}
                  exIdx={exIdx}
                  number={`${s.prefix} ${exIdx + 1}`}
                  partId={s.id}
                  mode="answers"
                  disabled
                />
              ))
            )}
          </section>
        );
      })}
    </div>
  );
}
