import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GRADE_LABELS, GRADE9_TRACKS, getTopics } from '../data/curriculum';
import { getAllQuestionsForTopic, TOPIC_QUIZ_SIZE } from '../data/questions';
import { accentFor } from '../lib/palette';

export default function TopicsPage() {
  const { grade, units, track } = useParams();
  const gradeNum = Number(grade);
  const unitsNum = units != null ? Number(units) : null;
  const label = GRADE_LABELS[gradeNum] ?? grade;

  const topics = useMemo(
    () => getTopics(gradeNum, { units: unitsNum, track: track ?? null }),
    [gradeNum, unitsNum, track],
  );

  /** topicId -> pool size, filled in once the grade's question bank chunk loads. */
  const [poolSizes, setPoolSizes] = useState({});

  useEffect(() => {
    let cancelled = false;
    // allSettled (not all) so one topic's failed chunk load doesn't blank
    // out every other topic's already-successful count.
    Promise.allSettled(topics.map(async (t) => [t.id, (await getAllQuestionsForTopic(t.id)).length])).then(
      (results) => {
        if (cancelled) return;
        const entries = results.filter((r) => r.status === 'fulfilled').map((r) => r.value);
        setPoolSizes(Object.fromEntries(entries));
      },
    );
    return () => {
      cancelled = true;
    };
  }, [topics]);

  const byCluster = topics.reduce((acc, t) => {
    const key = t.cluster || 'נושאים';
    if (!acc[key]) acc[key] = [];
    acc[key].push(t);
    return acc;
  }, {});

  const backHref =
    gradeNum <= 8
      ? '/'
      : gradeNum === 9
        ? '/grade/9'
        : `/grade/${gradeNum}`;

  const trackTitle =
    gradeNum === 9 && track
      ? GRADE9_TRACKS.find((t) => t.id === track)?.title
      : null;

  const subtitle =
    unitsNum != null
      ? `${unitsNum} יח״ל`
      : trackTitle
        ? trackTitle
        : gradeNum <= 6
          ? 'תוכנית היסודי'
          : 'תוכנית חטיבת הביניים';

  return (
    <div className="space-y-8" dir="rtl">
      <div>
        <Link to={backHref} className="text-sm text-[var(--color-teal)] hover:underline">
          ← חזרה
        </Link>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
          כיתה {label} · {subtitle}
        </h1>
        <p className="mt-2 text-[var(--color-slate)]">
          בחרו נושא והתחילו מבחן תרגול
        </p>
      </div>

      {topics.length === 0 ? (
        <p className="rounded-2xl bg-white/80 p-8 text-[var(--color-slate)] ring-1 ring-black/5">
          לא נמצאו נושאים למסלול זה.
        </p>
      ) : (
        Object.entries(byCluster).map(([cluster, list], clusterIdx) => {
          const clusterAccent = accentFor(clusterIdx);
          return (
            <section key={cluster} className="space-y-4">
              <h2
                className="inline-block rounded-full px-4 py-1.5 text-sm font-bold"
                style={{ backgroundColor: clusterAccent.bg, color: clusterAccent.text }}
              >
                {cluster}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((t, i) => {
                  const poolSize = poolSizes[t.id];
                  const quizSize = poolSize == null ? null : Math.min(TOPIC_QUIZ_SIZE, poolSize);
                  const accent = accentFor(clusterIdx + i);
                  return (
                    <Link
                      key={t.id}
                      to={`/quiz/${t.id}`}
                      className="group block overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg"
                      style={{ borderInlineStart: `5px solid ${accent.solid}` }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg font-semibold text-[var(--color-ink)]">{t.title}</h3>
                        <span
                          className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold"
                          style={{ backgroundColor: accent.bg, color: accent.text }}
                        >
                          {poolSize == null ? '…' : `${quizSize} מתוך ${poolSize}`}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--color-slate)]">
                        {t.description}
                      </p>
                      <span
                        className="mt-4 inline-flex items-center gap-1 text-sm font-bold transition group-hover:gap-2"
                        style={{ color: accent.text }}
                      >
                        התחל מבחן →
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}
