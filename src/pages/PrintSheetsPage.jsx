import { Link, Navigate, useParams } from 'react-router-dom';
import { GRADE_LABELS, hasDirectTopics } from '../data/curriculum';
import { bookletFile, getPrintSheets, sheetFile } from '../data/printSheets';
import { accentFor } from '../lib/palette';

/** שם קובץ להורדה — בלי תווים שאסורים בשמות קבצים */
const fileName = (s) => `${s.replace(/[:/\\?*"<>|]/g, ' -').replace(/\s+/g, ' ').trim()}.pdf`;

function FileButtons({ href, download, accent }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <a
        href={href}
        target="_blank"
        rel="noopener"
        className="rounded-full px-4 py-1.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5"
        style={{ backgroundColor: accent.solid }}
      >
        פתיחה
      </a>
      <a
        href={href}
        download={download}
        className="rounded-full bg-white px-4 py-1.5 text-sm font-bold shadow-sm ring-1 ring-black/10 transition hover:-translate-y-0.5"
        style={{ color: accent.text }}
      >
        הורדה ⬇
      </a>
    </div>
  );
}

export default function PrintSheetsPage() {
  const { grade } = useParams();
  const gradeNum = Number(grade);
  const label = GRADE_LABELS[gradeNum] ?? grade;
  const sheets = getPrintSheets(gradeNum);

  if (sheets.length === 0) return <Navigate to={`/grade/${gradeNum}`} replace />;

  const backHref = hasDirectTopics(gradeNum) ? `/grade/${gradeNum}/topics` : `/grade/${gradeNum}`;
  const booklets = [
    {
      kind: 'student',
      icon: '📘',
      title: 'חוברת לתלמיד',
      text: `כל ${sheets.length} הדפים ברצף — ${sheets.length * 2} עמודי תרגול, בלי התשובות.`,
    },
    {
      kind: 'answers',
      icon: '🔑',
      title: 'חוברת תשובות',
      text: `עמוד תשובות לכל דף — ${sheets.length} עמודים, לבדיקה עצמית או למורה.`,
    },
  ];

  return (
    <div className="space-y-8" dir="rtl">
      <div>
        <Link to={backHref} className="text-sm text-[var(--color-teal)] hover:underline">
          ← חזרה לנושאים
        </Link>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
          כיתה {label} · דפי תרגילים להדפסה
        </h1>
        <p className="mt-2 text-[var(--color-slate)]">
          {sheets.length} דפי עבודה לפי תכנית הלימודים של משרד החינוך. כל דף: שני עמודי תרגול ועמוד תשובות.
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full bg-white px-3 py-1 text-[var(--color-sky-dark)] ring-1 ring-[var(--color-sky)]/30">🖨️ מוכן להדפסה, A4</span>
          <span className="rounded-full bg-[#fff8e1] px-3 py-1 text-[var(--color-sunshine-dark)] ring-1 ring-[var(--color-sunshine)]/40">⭐ שלוש רמות קושי</span>
          <span className="rounded-full bg-white px-3 py-1 text-[var(--color-success)] ring-1 ring-[var(--color-success)]/30">🔑 תשובות לכל דף</span>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2">
        {booklets.map((b, i) => {
          const accent = accentFor(i + 3);
          return (
            <div
              key={b.kind}
              className="flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-2"
              style={{ '--tw-ring-color': accent.ring }}
            >
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl" style={{ backgroundColor: accent.bg }}>
                  {b.icon}
                </span>
                <div className="min-w-0">
                  <h2 className="text-lg font-bold text-[var(--color-ink)]">{b.title}</h2>
                  <p className="text-sm text-[var(--color-slate)]">{b.text}</p>
                </div>
              </div>
              <FileButtons href={bookletFile(gradeNum, b.kind)} download={fileName(`${b.title} - כיתה ${label}`)} accent={accent} />
            </div>
          );
        })}
      </section>

      <section className="space-y-4">
        <h2 className="inline-block rounded-full bg-[var(--color-mist)] px-4 py-1.5 text-sm font-bold text-[var(--color-ink)]">
          כל הדפים לפי הסדר
        </h2>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sheets.map((s, i) => {
            const accent = accentFor(i);
            return (
              <li
                key={s.no}
                className="flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5"
                style={{ borderInlineStart: `5px solid ${accent.solid}` }}
              >
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                  <span className="rounded-full px-2.5 py-0.5" style={{ backgroundColor: accent.bg, color: accent.text }}>
                    דף {s.no}
                  </span>
                  <span className="rounded-full bg-[var(--color-mist)] px-2.5 py-0.5 text-[var(--color-slate)]">{s.tag}</span>
                </div>
                <h3 className="mt-2 text-lg font-semibold text-[var(--color-ink)]">{s.title}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[var(--color-slate)]">{s.topics.join(' · ')}</p>
                <FileButtons href={sheetFile(gradeNum, s.no)} download={fileName(`דף ${s.no} - ${s.title}`)} accent={accent} />
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
