import { Link, useParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import QuizCard from '../components/quiz/QuizCard';
import { getTopicById, GRADE_LABELS, GRADE9_TRACKS } from '../data/curriculum';
import { buildCustomQuiz, getQuestionsForTopic, SPEED_RUN_POOL_SIZE, TOPIC_QUIZ_SIZE } from '../data/questions';
import { logQuizAttempt } from '../lib/progressLog';
import { readCustomQuiz } from '../lib/customQuiz.js';

const DIFFICULTY_BANDS = [
  { id: 'all', label: 'הכל' },
  { id: 'easy', label: 'קל' },
  { id: 'medium', label: 'בינוני' },
  { id: 'hard', label: 'קשה' },
];

/**
 * Loads both the normal-size question set and a much larger pool for
 * speed-run mode, so a fast player never runs out of questions before the
 * timer ends.
 */
async function loadQuestions(topicId, isCustom, band) {
  if (isCustom) {
    const payload = readCustomQuiz();
    const questions = payload?.questions || [];
    const speedQuestions = payload?.topicIds?.length
      ? await buildCustomQuiz({ topicIds: payload.topicIds, count: SPEED_RUN_POOL_SIZE })
      : questions;
    return { questions, speedQuestions };
  }
  const pool = await getQuestionsForTopic(topicId, band, SPEED_RUN_POOL_SIZE);
  return { questions: pool.slice(0, TOPIC_QUIZ_SIZE), speedQuestions: pool };
}

export default function QuizPage() {
  const { topicId } = useParams();
  const isCustom = topicId === 'custom';
  /** Increments on "נסו שוב" to draw a fresh set of 5 from the topic bank. */
  const [drawId, setDrawId] = useState(0);
  const [band, setBand] = useState('all');

  const customPayload = useMemo(() => (isCustom ? readCustomQuiz() : null), [isCustom]);

  const topic = isCustom ? null : getTopicById(topicId);

  const [questions, setQuestions] = useState([]);
  const [speedQuestions, setSpeedQuestions] = useState([]);
  const [questionsLoading, setQuestionsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setQuestionsLoading(true);
    setLoadError(false);
    loadQuestions(topicId, isCustom, band)
      .then(({ questions: qs, speedQuestions: sqs }) => {
        if (!cancelled) {
          setQuestions(qs);
          setSpeedQuestions(sqs);
          setQuestionsLoading(false);
        }
      })
      .catch(() => {
        // e.g. a question-bank chunk failed to load (stale deploy, offline blip)
        if (!cancelled) {
          setLoadError(true);
          setQuestionsLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
    // drawId forces a new random pick for topic quizzes; custom stays fixed.
  }, [topicId, isCustom, band, drawId]);

  const handleRetry = useCallback(() => {
    if (!isCustom) setDrawId((n) => n + 1);
  }, [isCustom]);

  const title = isCustom
    ? customPayload?.title || 'מבחן מותאם'
    : topic?.title ?? topicId;

  const grade = isCustom ? customPayload?.grade ?? null : topic?.grade ?? null;

  let backHref = '/';
  if (isCustom) {
    backHref = '/custom-test';
  } else if (topic) {
    if (topic.units != null) {
      backHref = `/grade/${topic.grade}/units/${topic.units}`;
    } else if (topic.track) {
      backHref = `/grade/${topic.grade}/track/${topic.track}`;
    } else {
      backHref = `/grade/${topic.grade}/topics`;
    }
  }

  const trackLabel =
    topic?.track != null
      ? GRADE9_TRACKS.find((t) => t.id === topic.track)?.title
      : null;

  function handleComplete(result) {
    logQuizAttempt({
      topicId: isCustom ? null : topicId,
      title,
      grade,
      score: result.score,
      correctCount: result.correctCount,
      total: result.total,
      custom: isCustom,
    });
  }

  if (loadError) {
    return (
      <div className="space-y-4" dir="rtl">
        <Link to={backHref} className="text-sm text-[var(--color-teal)] hover:underline">
          ← {isCustom ? 'חזרה למחולל' : 'חזרה לנושאים'}
        </Link>
        <div className="space-y-4 rounded-2xl bg-white/80 p-8 text-center text-[var(--color-slate)] shadow-sm ring-1 ring-black/5">
          <p>אירעה שגיאה בטעינת השאלות. נסו שוב.</p>
          <button
            type="button"
            onClick={() => setDrawId((n) => n + 1)}
            className="rounded-xl bg-[var(--color-teal)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--color-teal-dark)]"
          >
            נסו שוב
          </button>
        </div>
      </div>
    );
  }

  if (isCustom && !questionsLoading && !questions.length) {
    return (
      <div className="space-y-4" dir="rtl">
        <Link to="/custom-test" className="text-sm text-[var(--color-teal)] hover:underline">
          ← חזרה למחולל
        </Link>
        <p className="rounded-2xl bg-white/80 p-8 text-[var(--color-slate)] ring-1 ring-black/5">
          לא נמצא מבחן מותאם. צרו מבחן חדש במחולל.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <Link to={backHref} className="text-sm text-[var(--color-teal)] hover:underline">
          ← {isCustom ? 'חזרה למחולל' : 'חזרה לנושאים'}
        </Link>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
          {title}
        </h1>
        {topic && (
          <p className="mt-1 text-sm text-[var(--color-slate)]">
            כיתה {GRADE_LABELS[topic.grade]}
            {topic.units != null ? ` · ${topic.units} יח״ל` : ''}
            {trackLabel ? ` · ${trackLabel}` : ''}
            {topic.cluster ? ` · ${topic.cluster}` : ''}
          </p>
        )}
        {isCustom && grade != null && !questionsLoading && (
          <p className="mt-1 text-sm text-[var(--color-slate)]">
            כיתה {GRADE_LABELS[grade]} · {questions.length} שאלות
          </p>
        )}
        {!isCustom && (
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-[var(--color-slate)]">רמת קושי:</span>
            {DIFFICULTY_BANDS.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setBand(b.id)}
                className={`flex min-h-8 items-center justify-center rounded-md px-2.5 py-1 text-xs font-semibold ${
                  band === b.id
                    ? 'bg-[var(--color-teal)] text-white'
                    : 'bg-white text-[var(--color-ink)] ring-1 ring-black/10'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {questionsLoading ? (
        <div className="rounded-2xl bg-white/80 p-8 text-center text-[var(--color-slate)] shadow-sm ring-1 ring-black/5">
          טוען שאלות…
        </div>
      ) : (
        <QuizCard
          key={`${topicId}-${band}-${drawId}`}
          questions={questions}
          speedQuestions={speedQuestions}
          topicExplanation={topic?.explanation ?? null}
          topicKeyFormulas={topic?.keyFormulas ?? null}
          grade={grade}
          onComplete={handleComplete}
          onRetry={isCustom ? undefined : handleRetry}
        />
      )}
    </div>
  );
}
