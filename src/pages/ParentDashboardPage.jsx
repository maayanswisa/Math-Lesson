import { useGame } from '../context/GameContext';
import { Link } from 'react-router-dom';
import { getAttempts, getWeakTopics, getWeeklySummary } from '../lib/progressLog';
import { accentFor } from '../lib/palette';

export default function ParentDashboardPage() {
  const { xp, level, streak } = useGame();
  const attempts = getAttempts();
  const weak = getWeakTopics(5);
  const week = getWeeklySummary();

  return (
    <div className="space-y-8" dir="rtl">
      <div>
        <Link to="/" className="text-sm text-[var(--color-teal)] hover:underline">
          ← חזרה לבית
        </Link>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
          ההתקדמות שלי
        </h1>
      </div>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5" style={{ borderInlineStart: `5px solid ${accentFor(0).solid}` }}>
          <p className="text-xs text-[var(--color-slate)]">XP</p>
          <p className="mt-1 text-2xl font-extrabold" style={{ color: accentFor(0).text }}>{xp}</p>
          <p className="text-sm text-[var(--color-ink)]">{level.title}</p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5" style={{ borderInlineStart: `5px solid ${accentFor(1).solid}` }}>
          <p className="text-xs text-[var(--color-slate)]" title="מספר התשובות הנכונות ברצף, בלי טעות באמצע">
            רצף תשובות נכונות
          </p>
          <p className="mt-1 text-2xl font-extrabold" style={{ color: accentFor(1).text }}>{streak}</p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5" style={{ borderInlineStart: `5px solid ${accentFor(2).solid}` }}>
          <p className="text-xs text-[var(--color-slate)]">השבוע</p>
          <p className="mt-1 text-2xl font-extrabold" style={{ color: accentFor(2).text }}>{week.count} מבחנים</p>
          <p className="text-sm text-[var(--color-slate)]">
            ממוצע {week.avgScore}
            {week.improved ? ' · שיפור בשבוע' : ''}
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[var(--color-ink)]">נושאים לחיזוק</h2>
        {weak.length === 0 ? (
          <p className="text-sm text-[var(--color-slate)]">עדיין אין נתונים — סיימו מבחן כדי לראות דוח.</p>
        ) : (
          <ul className="space-y-2">
            {weak.map((t) => (
              <li key={t.topicId} className="flex items-center justify-between rounded-xl bg-white/90 px-4 py-3 ring-1 ring-black/5">
                <span className="text-sm font-medium text-[var(--color-ink)]">{t.title || t.topicId}</span>
                <span className="text-sm text-[var(--color-coral-dark)]">ממוצע {t.avg}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[var(--color-ink)]">מבחנים אחרונים</h2>
        {attempts.length === 0 ? (
          <p className="text-sm text-[var(--color-slate)]">אין עדיין מבחנים.</p>
        ) : (
          <ul className="space-y-2">
            {attempts.slice(0, 12).map((a) => (
              <li key={a.id} className="rounded-xl bg-white/90 px-4 py-3 ring-1 ring-black/5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-medium text-[var(--color-ink)]">{a.title || a.topicId || 'מבחן'}</span>
                  <span className="text-sm font-semibold text-[var(--color-teal)]">{a.score}</span>
                </div>
                <p className="mt-1 text-xs text-[var(--color-slate)]">
                  {a.correctCount}/{a.total} · {new Date(a.at).toLocaleString('he-IL')}
                  {a.custom ? ' · מותאם' : ''}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
