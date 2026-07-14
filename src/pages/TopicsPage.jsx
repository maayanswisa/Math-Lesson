import { Link, useParams } from 'react-router-dom';
import { GRADE_LABELS, GRADE9_TRACKS, getTopics } from '../data/curriculum';
import { getAllQuestionsForTopic, TOPIC_QUIZ_SIZE } from '../data/questions';

export default function TopicsPage() {
  const { grade, units, track } = useParams();
  const gradeNum = Number(grade);
  const unitsNum = units != null ? Number(units) : null;
  const label = GRADE_LABELS[gradeNum] ?? grade;

  const topics = getTopics(gradeNum, {
    units: unitsNum,
    track: track ?? null,
  });

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
        Object.entries(byCluster).map(([cluster, list]) => (
          <section key={cluster} className="space-y-4">
            <h2 className="text-lg font-semibold text-[var(--color-ink)]">{cluster}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((t) => {
                const poolSize = getAllQuestionsForTopic(t.id).length;
                const quizSize = Math.min(TOPIC_QUIZ_SIZE, poolSize);
                return (
                  <Link
                    key={t.id}
                    to={`/quiz/${t.id}`}
                    className="block rounded-2xl bg-white/90 p-6 shadow-sm ring-1 ring-black/5 transition hover:ring-[var(--color-teal)]/40"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-semibold text-[var(--color-ink)]">{t.title}</h3>
                      <span className="shrink-0 rounded-md bg-[var(--color-mist)] px-2 py-0.5 text-xs text-[var(--color-slate)]">
                        {quizSize} מתוך {poolSize}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-slate)]">
                      {t.description}
                    </p>
                    <span className="mt-4 inline-block text-sm font-medium text-[var(--color-teal)]">
                      התחל מבחן →
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
