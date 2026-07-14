import { Link, useParams } from 'react-router-dom';
import { useCallback, useMemo, useState } from 'react';
import QuizCard from '../components/quiz/QuizCard';
import { getTopicById, GRADE_LABELS, GRADE9_TRACKS } from '../data/curriculum';
import { getQuestionsForTopic } from '../data/questions';
import { logQuizAttempt } from '../lib/progressLog';

function loadQuestions(topicId, isCustom) {
  if (isCustom) {
    try {
      const raw = sessionStorage.getItem('math-lesson-custom-quiz');
      return raw ? JSON.parse(raw)?.questions || [] : [];
    } catch {
      return [];
    }
  }
  return getQuestionsForTopic(topicId);
}

export default function QuizPage() {
  const { topicId } = useParams();
  const isCustom = topicId === 'custom';
  /** Increments on "נסו שוב" to draw a fresh set of 5 from the topic bank. */
  const [drawId, setDrawId] = useState(0);

  const customPayload = useMemo(() => {
    if (!isCustom) return null;
    try {
      const raw = sessionStorage.getItem('math-lesson-custom-quiz');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, [isCustom]);

  const topic = isCustom ? null : getTopicById(topicId);

  const questions = useMemo(
    () => loadQuestions(topicId, isCustom),
    // drawId forces a new random pick for topic quizzes; custom stays fixed.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional redraw
    [topicId, isCustom, drawId],
  );

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

  if (isCustom && !questions.length) {
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
        {isCustom && grade != null && (
          <p className="mt-1 text-sm text-[var(--color-slate)]">
            כיתה {GRADE_LABELS[grade]} · {questions.length} שאלות
          </p>
        )}
      </div>

      <QuizCard
        key={`${topicId}-${drawId}`}
        questions={questions}
        topicCluster={topic?.cluster ?? null}
        grade={grade}
        onComplete={handleComplete}
        onRetry={isCustom ? undefined : handleRetry}
      />
    </div>
  );
}
