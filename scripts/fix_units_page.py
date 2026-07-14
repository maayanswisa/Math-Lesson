# -*- coding: utf-8 -*-
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]


def U(s: str) -> str:
    return re.sub(r"\\u([0-9a-fA-F]{4})", lambda m: chr(int(m.group(1), 16)), s)


jsx = r'''import { Link, Navigate, useParams } from 'react-router-dom';
import {
  GRADE_LABELS,
  UNIT_OPTIONS,
  GRADE9_TRACKS,
  getTopics,
  isElementary,
} from '../data/curriculum';

export default function UnitsPage() {
  const { grade } = useParams();
  const gradeNum = Number(grade);
  const label = GRADE_LABELS[gradeNum] ?? grade;

  // Grades 1-8: go straight to topics
  if (isElementary(gradeNum) || gradeNum === 7 || gradeNum === 8) {
    return <Navigate to={`/grade/${gradeNum}/topics`} replace />;
  }

  // Grade 9: choose track
  if (gradeNum === 9) {
    return (
      <div className="space-y-8" dir="rtl">
        <div>
          <Link to="/" className="text-sm text-[var(--color-teal)] hover:underline">
            \u2190 \u05d7\u05d6\u05e8\u05d4 \u05dc\u05d1\u05d7\u05d9\u05e8\u05ea \u05db\u05d9\u05ea\u05d4
          </Link>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
            \u05db\u05d9\u05ea\u05d4 {label} \u2014 \u05d1\u05d7\u05e8\u05d5 \u05e8\u05de\u05d4
          </h1>
          <p className="mt-2 text-[var(--color-slate)]">
            \u05dc\u05e4\u05d9 \u05ea\u05d5\u05db\u05e0\u05d9\u05ea \u05de\u05e9\u05e8\u05d3 \u05d4\u05d7\u05d9\u05e0\u05d5\u05da: \u05e8\u05de\u05d4 \u05e8\u05d2\u05d9\u05dc\u05d4 \u05d0\u05d5 \u05e8\u05de\u05d4 \u05de\u05e6\u05d5\u05de\u05e6\u05de\u05ea
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {GRADE9_TRACKS.map((t) => {
            const count = getTopics(9, { track: t.id }).length;
            return (
              <Link
                key={t.id}
                to={`/grade/9/track/${t.id}`}
                className="block rounded-2xl bg-white/90 p-6 shadow-sm ring-1 ring-black/5 transition hover:ring-[var(--color-teal)]/40"
              >
                <p className="text-sm font-medium text-[var(--color-teal)]">{count} \u05e0\u05d5\u05e9\u05d0\u05d9\u05dd</p>
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
          \u2190 \u05d7\u05d6\u05e8\u05d4 \u05dc\u05d1\u05d7\u05d9\u05e8\u05ea \u05db\u05d9\u05ea\u05d4
        </Link>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
          \u05db\u05d9\u05ea\u05d4 {label} \u2014 \u05d1\u05d7\u05e8\u05d5 \u05d9\u05d7\u05d9\u05d3\u05d5\u05ea \u05dc\u05d9\u05de\u05d5\u05d3
        </h1>
        <p className="mt-2 text-[var(--color-slate)]">
          \u05dc\u05e4\u05d9 \u05ea\u05d5\u05db\u05e0\u05d9\u05ea \u05d4\u05dc\u05d9\u05de\u05d5\u05d3\u05d9\u05dd \u05d4\u05d7\u05d3\u05e9\u05d4 \u05e9\u05dc \u05de\u05e9\u05e8\u05d3 \u05d4\u05d7\u05d9\u05e0\u05d5\u05da (\u05d7\u05d8\u05d9\u05d1\u05d4 \u05e2\u05dc\u05d9\u05d5\u05e0\u05d4)
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {UNIT_OPTIONS.map((u) => {
          const count = getTopics(gradeNum, { units: u.units }).length;
          return (
            <Link
              key={u.units}
              to={`/grade/${gradeNum}/units/${u.units}`}
              className="block rounded-2xl bg-white/90 p-6 shadow-sm ring-1 ring-black/5 transition hover:ring-[var(--color-teal)]/40"
            >
              <p className="text-sm font-medium text-[var(--color-teal)]">
                {count} \u05e0\u05d5\u05e9\u05d0\u05d9\u05dd
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
'''

out = ROOT / "src/pages/UnitsPage.jsx"
out.write_text(U(jsx), encoding="utf-8")
text = out.read_text(encoding="utf-8")
assert "\u05d1\u05d7\u05e8\u05d5 \u05e8\u05de\u05d4" in text
assert "isElementary" in text
print("UnitsPage OK")
