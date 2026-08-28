import { Link, Navigate, useParams } from 'react-router-dom';
import {
  GRADE_LABELS,
  UNIT_OPTIONS,
  GRADE9_TRACKS,
  getTopics,
  hasDirectTopics,
} from '../data/curriculum';
import { accentFor } from '../lib/palette';

export default function UnitsPage() {
  const { grade } = useParams();
  const gradeNum = Number(grade);
  const label = GRADE_LABELS[gradeNum] ?? grade;

  // Grades 1-8: go straight to topics
  if (hasDirectTopics(gradeNum)) {
    return <Navigate to={`/grade/${gradeNum}/topics`} replace />;
  }

  // Grade 9: choose track
  if (gradeNum === 9) {
    return (
      <div className="space-y-8" dir="rtl">
        <div>
          <Link to="/" className="text-sm text-[var(--color-teal)] hover:underline">
            ← חזרה לבחירת כיתה
          </Link>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
            כיתה {label} — בחרו רמה
          </h1>
          <p className="mt-2 text-[var(--color-slate)]">
            לפי תוכנית משרד החינוך: תלמידים שמיועדים ל-4/5 יח״ל או תלמידים שמיועדים ל-3 יח״ל
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {GRADE9_TRACKS.map((t, i) => {
            const count = getTopics(9, { track: t.id }).length;
            const accent = accentFor(i);
            return (
              <Link
                key={t.id}
                to={`/grade/9/track/${t.id}`}
                className="block rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg"
                style={{ borderInlineStart: `5px solid ${accent.solid}` }}
              >
                <p className="text-sm font-bold" style={{ color: accent.text }}>{count} נושאים</p>
                <h2 className="mt-2 text-xl font-semibold text-[var(--color-ink)]">{t.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-slate)]">{t.blurb}</p>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  // Grades 10-12: choose units
  return (
    <div className="space-y-8" dir="rtl">
      <div>
        <Link to="/" className="text-sm text-[var(--color-teal)] hover:underline">
          ← חזרה לבחירת כיתה
        </Link>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
          כיתה {label} — בחרו יחידות לימוד
        </h1>
        <p className="mt-2 text-[var(--color-slate)]">
          לפי תוכנית הלימודים החדשה של משרד החינוך (חטיבה עליונה)
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {UNIT_OPTIONS.map((u, i) => {
          const count = getTopics(gradeNum, { units: u.units }).length;
          const accent = accentFor(i);
          return (
            <Link
              key={u.units}
              to={`/grade/${gradeNum}/units/${u.units}`}
              className="block rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg"
              style={{ borderInlineStart: `5px solid ${accent.solid}` }}
            >
              <p className="text-sm font-bold" style={{ color: accent.text }}>
                {count} נושאים
              </p>
              <h2 className="mt-2 text-xl font-semibold text-[var(--color-ink)]">
                {u.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-slate)]">
                {u.blurb}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
