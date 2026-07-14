# -*- coding: utf-8 -*-
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

grades = [
    (1, "\u05d0'"),
    (2, "\u05d1'"),
    (3, "\u05d2'"),
    (4, "\u05d3'"),
    (5, "\u05d4'"),
    (6, "\u05d5'"),
    (7, "\u05d6'"),
    (8, "\u05d7'"),
    (9, "\u05d8'"),
    (10, "\u05d9'"),
    (11, '\u05d9"\u05d0'),
    (12, '\u05d9"\u05d1'),
]

eyebrow = "\u05ea\u05e8\u05d2\u05d5\u05dc \u05de\u05ea\u05de\u05d8\u05d9\u05e7\u05d4 \u05d0\u05f3\u2013\u05d9\u05f4\u05d1"
blurb = "\u05d1\u05d7\u05e8\u05d5 \u05db\u05d9\u05ea\u05d4, \u05e6\u05e8\u05d5 \u05de\u05d1\u05d7\u05df \u05de\u05d5\u05ea\u05d0\u05dd, \u05d0\u05d5 \u05e2\u05e7\u05d1\u05d5 \u05d0\u05d7\u05e8 \u05d4\u05ea\u05e7\u05d3\u05de\u05d5\u05ea \u05d1\u05d3\u05e9\u05d1\u05d5\u05e8\u05d3 \u05d4\u05d5\u05e8\u05d9\u05dd."
btn1 = "\u05de\u05d1\u05d7\u05df \u05de\u05d5\u05ea\u05d0\u05dd \u05d0\u05d9\u05e9\u05d9\u05ea"
btn2 = "\u05dc\u05d4\u05d5\u05e8\u05d9\u05dd \u05d5\u05de\u05d5\u05e8\u05d9\u05dd"
choose = "\u05d1\u05d7\u05e8\u05d5 \u05db\u05d9\u05ea\u05d4"

grade_lines = ",\n".join(
    f"  {{ n: {n}, label: {json.dumps(lab, ensure_ascii=False)} }}" for n, lab in grades
)

home = f"""import {{ Link }} from 'react-router-dom';

const GRADES = [
{grade_lines}
];

export default function HomePage() {{
  return (
    <div className="space-y-12" dir="rtl">
      <section className="max-w-2xl">
        <p className="text-sm font-medium text-[var(--color-teal)]">{eyebrow}</p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-tight text-[var(--color-ink)] sm:text-5xl">
          Math Lesson
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-[var(--color-slate)]">
          {blurb}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/custom-test"
            className="rounded-xl bg-[var(--color-teal)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-teal-dark)]"
          >
            {btn1}
          </Link>
          <Link
            to="/parent"
            className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-[var(--color-ink)] ring-1 ring-black/10 hover:ring-[var(--color-teal)]/40"
          >
            {btn2}
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-[var(--color-ink)]">{choose}</h2>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {{GRADES.map((g) => (
            <Link
              key={{g.n}}
              to={{`/grade/${{g.n}}`}}
              className="rounded-xl bg-white/80 py-4 text-center text-lg font-semibold text-[var(--color-ink)] shadow-sm ring-1 ring-black/5 transition hover:ring-[var(--color-teal)]/50"
            >
              {{g.label}}
            </Link>
          ))}}
        </div>
      </section>
    </div>
  );
}}
"""

out = ROOT / "src/pages/HomePage.jsx"
out.write_text(home, encoding="utf-8")
print("ok", btn1 in out.read_text(encoding="utf-8"))
