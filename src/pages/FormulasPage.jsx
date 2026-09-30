import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import MathRenderer from '../components/ui/MathRenderer';
import { GRADE_LABELS, GRADE9_TRACKS, getTopics } from '../data/curriculum';
import { topicsHref } from '../lib/formulaLinks';
import { accentFor } from '../lib/palette';

export default function FormulasPage() {
  const { grade, units, track } = useParams();
  const g = Number(grade);
  const u = units != null ? Number(units) : null;
  const label = GRADE_LABELS[g] ?? grade;

  const topics = useMemo(() => getTopics(g, { units: u, track: track ?? null }).filter((t) => t.keyFormulas?.length), [g, u, track]);

  const groups = useMemo(() => {
    const acc = new Map();
    for (const t of topics) {
      const key = t.cluster || '';
      if (!acc.has(key)) acc.set(key, []);
      acc.get(key).push(t);
    }
    return [...acc.entries()];
  }, [topics]);

  const trackTitle = g === 9 && track ? GRADE9_TRACKS.find((t) => t.id === track)?.title : null;
  const subtitle = u != null ? ` · ${u} יח״ל` : trackTitle ? ` · ${trackTitle}` : '';

  return (
    <div className="formula-sheet space-y-6" dir="rtl">
      <div className="print:hidden">
        <Link to={topicsHref(g, u, track)} className="text-sm text-[var(--color-teal)] hover:underline">
          ← חזרה לנושאים
        </Link>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)] print:text-2xl">
            📄 דף נוסחאות — כיתה {label}
            {subtitle}
          </h1>
          <p className="mt-1 text-sm text-[var(--color-slate)] print:hidden">כל הנוסחאות והכללים של הכיתה במקום אחד.</p>
        </div>
        <button
          onClick={() => window.print()}
          className="rounded-2xl bg-[var(--color-ink)] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 print:hidden"
        >
          🖨️ הדפסה
        </button>
      </div>

      {topics.length === 0 ? (
        <p className="rounded-2xl bg-white/80 p-6 text-[var(--color-slate)] ring-1 ring-black/5">אין עדיין נוסחאות לכיתה הזו.</p>
      ) : (
        groups.map(([cluster, list], gi) => {
          const accent = accentFor(gi);
          return (
            <section key={cluster || 'all'} className="space-y-3">
              {cluster && (
                <h2
                  className="inline-block rounded-full px-4 py-1 text-sm font-bold print:rounded-none print:bg-transparent print:px-0 print:text-base"
                  style={{ backgroundColor: accent.bg, color: accent.text }}
                >
                  {cluster}
                </h2>
              )}
              <div className="gap-4 sm:columns-2 print:columns-2 print:gap-6">
                {list.map((t) => (
                  <article
                    key={t.id}
                    className="mb-4 break-inside-avoid rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 print:mb-3 print:rounded-none print:p-0 print:shadow-none print:ring-0"
                    style={{ borderInlineStart: `4px solid ${accent.solid}` }}
                  >
                    <h3 className="text-base font-bold text-[var(--color-ink)] print:ps-2 print:text-sm">
                      <Link to={`/learn/${t.id}`} className="hover:underline print:no-underline">
                        {t.title}
                      </Link>
                    </h3>
                    <ul className="mt-2 space-y-1.5 ps-5 text-sm text-[var(--color-ink)] print:mt-1 print:space-y-0.5 print:ps-6 print:text-xs">
                      {t.keyFormulas.map((f, i) => (
                        <li key={i} className="list-disc marker:text-[var(--color-slate)]">
                          <MathRenderer inline>{f}</MathRenderer>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          );
        })
      )}

      <p className="hidden text-center text-xs text-[var(--color-slate)] print:block">מתמטיקל — תרגול מתמטיקה</p>
    </div>
  );
}
