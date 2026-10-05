import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GRADE_LABELS, hasDirectTopics } from '../data/curriculum';
import { getWorksheetTopics } from '../data/worksheets';
import { readWorksheetSummaries } from '../lib/worksheet';
import { accentFor } from '../lib/palette';

function Pill({ label, value, done }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
        done ? 'bg-[var(--color-success)]/12 text-[var(--color-success)]' : 'bg-[var(--color-mist)] text-[var(--color-slate)]'
      }`}
    >
      {label} {value}
    </span>
  );
}

export default function WorksheetsPage() {
  const { grade } = useParams();
  const gradeNum = Number(grade);
  const label = GRADE_LABELS[gradeNum] ?? grade;
  const topics = useMemo(() => getWorksheetTopics(gradeNum), [gradeNum]);
  const summaries = useMemo(() => readWorksheetSummaries(), []);

  const byCluster = topics.reduce((acc, t) => {
    const key = t.cluster || 'נושאים';
    (acc[key] ??= []).push(t);
    return acc;
  }, {});

  const topicsHref = hasDirectTopics(gradeNum) ? `/grade/${gradeNum}/topics` : `/grade/${gradeNum}`;

  return (
    <div className="space-y-8" dir="rtl">
      <div>
        <Link to={topicsHref} className="text-sm text-[var(--color-teal)] hover:underline">
          ← חזרה לנושאים
        </Link>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
          כיתה {label} · דפי עבודה ומבדקים
        </h1>
        <p className="mt-2 text-[var(--color-slate)]">בכל נושא: חוברת קטנה שעובדים עליה ישר במסך, ובודקים לבד.</p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full bg-[#fff8e1] px-3 py-1 text-[var(--color-sunshine-dark)] ring-1 ring-[var(--color-sunshine)]/40">💡 תזכורת</span>
          <span className="rounded-full bg-white px-3 py-1 text-[var(--color-sky-dark)] ring-1 ring-[var(--color-sky)]/30">📄 2 עמודי תרגול</span>
          <span className="rounded-full bg-white px-3 py-1 text-[var(--color-teal-dark)] ring-1 ring-[var(--color-teal)]/30">🏁 מבדק עם ציון</span>
          <span className="rounded-full bg-white px-3 py-1 text-[var(--color-success)] ring-1 ring-[var(--color-success)]/30">🔑 תשובות בסוף</span>
        </div>
      </div>

      {topics.length === 0 ? (
        <p className="rounded-2xl bg-white/80 p-8 text-[var(--color-slate)] ring-1 ring-black/5">
          דפי העבודה לכיתה הזו בהכנה — בינתיים אפשר לתרגל{' '}
          <Link to={topicsHref} className="font-bold text-[var(--color-teal)] hover:underline">
            במבחני הנושאים
          </Link>
          .
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
                  const accent = accentFor(clusterIdx + i);
                  const s = summaries[t.id];
                  const pageDone = (p) => p && p.done === p.total;
                  return (
                    <Link
                      key={t.id}
                      to={`/worksheet/${t.id}`}
                      className="group flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg"
                      style={{ borderInlineStart: `5px solid ${accent.solid}` }}
                    >
                      <h3 className="text-lg font-semibold text-[var(--color-ink)]">{t.title}</h3>
                      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[var(--color-slate)]">{t.description}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {s ? (
                          <>
                            <Pill label="עמוד 1" value={pageDone(s.p0) ? '✓' : `${s.p0?.done ?? 0}/${s.p0?.total ?? '–'}`} done={pageDone(s.p0)} />
                            <Pill label="עמוד 2" value={pageDone(s.p1) ? '✓' : `${s.p1?.done ?? 0}/${s.p1?.total ?? '–'}`} done={pageDone(s.p1)} />
                            <Pill label="מבדק" value={s.best != null ? s.best : '–'} done={s.best != null && s.best >= 80} />
                          </>
                        ) : (
                          <span className="text-xs text-[var(--color-slate)]">עוד לא התחלתם</span>
                        )}
                      </div>
                      <span className="mt-3 text-sm font-bold transition group-hover:translate-x-[-4px]" style={{ color: accent.text }}>
                        {s ? 'להמשיך ←' : 'לפתוח את הדף ←'}
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
