import { Link } from 'react-router-dom';
import { accentFor } from '../lib/palette';
import { allTopics } from '../data/curriculum';
import { TOTAL_QUESTION_COUNT } from '../data/questions';

const GRADES = [
  { n: 1, label: "א'", group: 'יסודי' },
  { n: 2, label: "ב'", group: 'יסודי' },
  { n: 3, label: "ג'", group: 'יסודי' },
  { n: 4, label: "ד'", group: 'יסודי' },
  { n: 5, label: "ה'", group: 'יסודי' },
  { n: 6, label: "ו'", group: 'יסודי' },
  { n: 7, label: "ז'", group: 'חטיבה' },
  { n: 8, label: "ח'", group: 'חטיבה' },
  { n: 9, label: "ט'", group: 'חטיבה' },
  { n: 10, label: "י'", group: 'תיכון' },
  { n: 11, label: "י\"א", group: 'תיכון' },
  { n: 12, label: "י\"ב", group: 'תיכון' },
];

const numberFormat = new Intl.NumberFormat('he-IL');

export default function HomePage() {
  const topicCount = allTopics().length;

  return (
    <div className="space-y-14" dir="rtl">
      <section className="max-w-2xl">
        <p className="inline-block rounded-full bg-[var(--color-teal)]/10 px-3 py-1 text-sm font-semibold text-[var(--color-teal-dark)]">
          תרגול מתמטיקה א׳–י״ב 🎯
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight text-[var(--color-ink)] sm:text-6xl">
          <span
            style={{
              backgroundImage:
                'linear-gradient(90deg, var(--color-teal) 0%, var(--color-sky) 40%, var(--color-violet) 75%, var(--color-berry) 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Math Lesson
          </span>
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-[var(--color-slate)]">
          בחרו כיתה, ותנו לעצמכם רגע של הצלחה: שאלות בקצב שלכם, הסברים שמבהירים כל נושא, ותחושה נהדרת עם כל תשובה נכונה.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/custom-test"
            className="rounded-2xl bg-[var(--color-teal)] px-6 py-3 text-sm font-bold text-white shadow-md shadow-[var(--color-teal)]/20 transition hover:-translate-y-0.5 hover:bg-[var(--color-teal-dark)] hover:shadow-lg"
          >
            ✨ מבחן מותאם אישית
          </Link>
          <Link
            to="/parent"
            className="rounded-2xl bg-white px-6 py-3 text-sm font-bold text-[var(--color-ink)] shadow-sm ring-2 ring-[var(--color-violet)]/30 transition hover:-translate-y-0.5 hover:ring-[var(--color-violet)]/60"
          >
            📈 ההתקדמות שלי
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <div className="rounded-2xl bg-white px-6 py-4 shadow-sm ring-1 ring-black/5">
            <span className="block text-3xl font-extrabold text-[var(--color-teal-dark)]">
              {numberFormat.format(topicCount)}
            </span>
            <span className="text-sm font-medium text-[var(--color-slate)]">נושאים</span>
          </div>
          <div className="rounded-2xl bg-white px-6 py-4 shadow-sm ring-1 ring-black/5">
            <span className="block text-3xl font-extrabold text-[var(--color-violet)]">
              {numberFormat.format(TOTAL_QUESTION_COUNT)}
            </span>
            <span className="text-sm font-medium text-[var(--color-slate)]">שאלות</span>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-5 text-xl font-bold text-[var(--color-ink)]">בחרו כיתה</h2>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {GRADES.map((g, i) => {
            const accent = accentFor(i);
            return (
              <Link
                key={g.n}
                to={`/grade/${g.n}`}
                className="group relative overflow-hidden rounded-2xl bg-white py-5 text-center shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg"
                style={{ '--tw-ring-color': accent.ring }}
              >
                <span
                  className="absolute inset-x-0 top-0 h-1.5 rounded-t-2xl transition group-hover:h-2"
                  style={{ backgroundColor: accent.solid }}
                />
                <span className="block text-2xl font-extrabold" style={{ color: accent.text }}>
                  {g.label}
                </span>
                <span className="mt-1 block text-xs font-medium text-[var(--color-slate)]">{g.group}</span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
