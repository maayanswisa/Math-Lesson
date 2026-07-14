import { Link } from 'react-router-dom';

const GRADES = [
  { n: 1, label: "א'" },
  { n: 2, label: "ב'" },
  { n: 3, label: "ג'" },
  { n: 4, label: "ד'" },
  { n: 5, label: "ה'" },
  { n: 6, label: "ו'" },
  { n: 7, label: "ז'" },
  { n: 8, label: "ח'" },
  { n: 9, label: "ט'" },
  { n: 10, label: "י'" },
  { n: 11, label: "י\"א" },
  { n: 12, label: "י\"ב" }
];

export default function HomePage() {
  return (
    <div className="space-y-12" dir="rtl">
      <section className="max-w-2xl">
        <p className="text-sm font-medium text-[var(--color-teal)]">תרגול מתמטיקה א׳–י״ב</p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-tight text-[var(--color-ink)] sm:text-5xl">
          Math Lesson
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-[var(--color-slate)]">
          בחרו כיתה, צרו מבחן מותאם, או עקבו אחר התקדמות בדשבורד הורים.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/custom-test"
            className="rounded-xl bg-[var(--color-teal)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-teal-dark)]"
          >
            מבחן מותאם אישית
          </Link>
          <Link
            to="/parent"
            className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-[var(--color-ink)] ring-1 ring-black/10 hover:ring-[var(--color-teal)]/40"
          >
            להורים ומורים
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-[var(--color-ink)]">בחרו כיתה</h2>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {GRADES.map((g) => (
            <Link
              key={g.n}
              to={`/grade/${g.n}`}
              className="rounded-xl bg-white/80 py-4 text-center text-lg font-semibold text-[var(--color-ink)] shadow-sm ring-1 ring-black/5 transition hover:ring-[var(--color-teal)]/50"
            >
              {g.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
