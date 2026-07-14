import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import {
  getAttempts,
  getLinkedStudentCode,
  getOrCreateStudentCode,
  getWeakTopics,
  getWeeklySummary,
  linkStudentCode,
} from '../lib/progressLog';

export default function ParentDashboardPage() {
  const { xp, level, streak, badges, badgeDefs } = useGame();
  const studentCode = useMemo(() => getOrCreateStudentCode(), []);
  const [linkInput, setLinkInput] = useState(getLinkedStudentCode() || '');
  const [linkMsg, setLinkMsg] = useState('');
  const attempts = getAttempts();
  const weak = getWeakTopics(5);
  const week = getWeeklySummary();

  function onLink(e) {
    e.preventDefault();
    if (linkStudentCode(linkInput)) {
      setLinkMsg('הקוד נשמר במכשיר זה (בשלב הבא — סנכרון עם חשבון תלמיד)');
    }
  }

  return (
    <div className="space-y-8" dir="rtl">
      <div>
        <Link to="/" className="text-sm text-[var(--color-teal)] hover:underline">
          ← חזרה לבית
        </Link>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
          להורים ומורים
        </h1>
        <p className="mt-2 text-[var(--color-slate)]">
          מעקב אחר התקדמות התרגול במכשיר זה. דוח מייל שבועי יופעל כשיחובר Auth.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-white/90 p-5 ring-1 ring-black/5">
          <p className="text-xs text-[var(--color-slate)]">XP</p>
          <p className="mt-1 text-2xl font-semibold text-[var(--color-teal)]">{xp}</p>
          <p className="text-sm text-[var(--color-ink)]">{level.title}</p>
        </div>
        <div className="rounded-2xl bg-white/90 p-5 ring-1 ring-black/5">
          <p className="text-xs text-[var(--color-slate)]">רצף</p>
          <p className="mt-1 text-2xl font-semibold text-[var(--color-coral)]">{streak}</p>
        </div>
        <div className="rounded-2xl bg-white/90 p-5 ring-1 ring-black/5">
          <p className="text-xs text-[var(--color-slate)]">השבוע</p>
          <p className="mt-1 text-2xl font-semibold text-[var(--color-ink)]">{week.count} מבחנים</p>
          <p className="text-sm text-[var(--color-slate)]">
            ממוצע {week.avgScore}
            {week.improved ? ' · שיפור בשבוע' : ''}
          </p>
        </div>
      </section>

      <section className="rounded-2xl bg-white/90 p-6 ring-1 ring-black/5">
        <h2 className="text-lg font-semibold text-[var(--color-ink)]">קוד תלמיד</h2>
        <p className="mt-2 text-sm text-[var(--color-slate)]">
          שתפו את הקוד עם הורה/מורה כדי לקשר (מקומי כרגע):
        </p>
        <p className="mt-3 font-mono text-xl font-semibold tracking-wider text-[var(--color-teal)]">
          {studentCode}
        </p>
        <form onSubmit={onLink} className="mt-4 flex flex-wrap gap-2">
          <input
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
            placeholder="קוד לקישור"
            className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm"
          />
          <button type="submit" className="rounded-xl bg-[var(--color-teal)] px-4 py-2 text-sm font-semibold text-white">
            שמירת קישור
          </button>
        </form>
        {linkMsg && <p className="mt-2 text-sm text-[var(--color-success)]">{linkMsg}</p>}
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
                <span className="text-sm text-[var(--color-coral)]">ממוצע {t.avg}</span>
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

      {badges.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-[var(--color-ink)]">תגים</h2>
          <div className="flex flex-wrap gap-2">
            {badges.map((id) => (
              <span key={id} className="rounded-lg bg-[var(--color-coral)]/10 px-3 py-1 text-sm text-[var(--color-coral)]">
                {badgeDefs[id]?.title ?? id}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
