import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { GRADE_LABELS } from '../data/curriculum';
import { hasLesson } from '../data/lessons';
import { searchTopics, topicPlace } from '../lib/search';
import { accentFor } from '../lib/palette';

const EXAMPLES = ['שברים', 'משפט הסינוסים', 'פיתגורס', 'אחוזים', 'נגזרת', 'היקף ושטח'];
const GRADES = Object.keys(GRADE_LABELS).map(Number);

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const grade = params.get('grade') ? Number(params.get('grade')) : null;

  const results = useMemo(() => searchTopics(q, { grade }), [q, grade]);

  const update = (next) => {
    const p = new URLSearchParams(params);
    for (const [k, v] of Object.entries(next)) {
      if (v === '' || v == null) p.delete(k);
      else p.set(k, String(v));
    }
    setParams(p, { replace: true });
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <Link to="/" className="text-sm text-[var(--color-teal)] hover:underline">
          ← חזרה
        </Link>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">🔍 חיפוש נושא</h1>
      </div>

      <div className="space-y-3">
        <input
          type="search"
          autoFocus
          value={q}
          onChange={(e) => update({ q: e.target.value })}
          placeholder='למשל: "משפט הסינוסים" או "שברים"'
          aria-label="חיפוש נושא"
          className="w-full rounded-2xl bg-white px-5 py-4 text-lg shadow-sm ring-2 ring-[var(--color-teal)]/25 outline-none focus:ring-[var(--color-teal)]/60"
        />
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-[var(--color-slate)]">כיתה:</span>
          <button
            onClick={() => update({ grade: '' })}
            className={`rounded-full px-3 py-1 text-sm font-bold ${grade == null ? 'bg-[var(--color-teal)] text-white' : 'bg-white text-[var(--color-ink)] ring-1 ring-black/10'}`}
          >
            הכול
          </button>
          {GRADES.map((g) => (
            <button
              key={g}
              onClick={() => update({ grade: g === grade ? '' : g })}
              className={`min-w-9 rounded-full px-2.5 py-1 text-sm font-bold ${grade === g ? 'bg-[var(--color-teal)] text-white' : 'bg-white text-[var(--color-ink)] ring-1 ring-black/10'}`}
            >
              {GRADE_LABELS[g]}
            </button>
          ))}
        </div>
      </div>

      {q.trim() === '' ? (
        <div className="rounded-2xl bg-white/80 p-6 ring-1 ring-black/5">
          <p className="text-[var(--color-slate)]">הקלידו שם של נושא, מושג או משפט. אפשר לנסות:</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => update({ q: ex })}
                className="rounded-full bg-[var(--color-teal)]/10 px-3 py-1 text-sm font-bold text-[var(--color-teal-dark)] hover:bg-[var(--color-teal)]/20"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      ) : results.length === 0 ? (
        <p className="rounded-2xl bg-white/80 p-6 text-[var(--color-slate)] ring-1 ring-black/5">
          לא נמצאו נושאים עבור "{q}"{grade != null ? ` בכיתה ${GRADE_LABELS[grade]}` : ''}. נסו מילה אחרת או מילה אחת בלבד.
        </p>
      ) : (
        <>
          <p className="text-sm text-[var(--color-slate)]">
            נמצאו <span dir="ltr">{results.length}</span> נושאים
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {results.map(({ topic: t }, i) => {
              const accent = accentFor(t.grade + i);
              return (
                <div
                  key={t.id}
                  className="group relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ borderInlineStart: `5px solid ${accent.solid}` }}
                >
                  <span
                    className="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold"
                    style={{ backgroundColor: accent.bg, color: accent.text }}
                  >
                    {topicPlace(t)}
                    {t.cluster ? ` · ${t.cluster}` : ''}
                  </span>
                  <h2 className="mt-2 text-lg font-semibold text-[var(--color-ink)]">{t.title}</h2>
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[var(--color-slate)]">{t.description}</p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                    {hasLesson(t.id) && (
                      <Link
                        to={`/learn/${t.id}`}
                        className="relative z-10 inline-flex items-center gap-1 rounded-full bg-[var(--color-sunshine)]/15 px-3 py-1 text-sm font-bold text-[var(--color-sunshine-dark)] hover:bg-[var(--color-sunshine)]/25"
                      >
                        📖 הסבר מלא
                      </Link>
                    )}
                    <Link
                      to={`/quiz/${t.id}`}
                      className="inline-flex items-center rounded-full px-3 py-1 text-sm font-bold transition after:absolute after:inset-0 group-hover:brightness-95"
                      style={{ color: accent.text, backgroundColor: accent.bg }}
                    >
                      התחל מבחן
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
