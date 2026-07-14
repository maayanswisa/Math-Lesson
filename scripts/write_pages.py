# -*- coding: utf-8 -*-
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]


def U(s: str) -> str:
    return re.sub(r"\\u([0-9a-fA-F]{4})", lambda m: chr(int(m.group(1), 16)), s)


units_page = U(r'''import { Link, Navigate, useParams } from 'react-router-dom';
import {
  GRADE_LABELS,
  UNIT_OPTIONS,
  GRADE9_TRACKS,
  getTopics,
  isHighSchool,
  isMiddleSchool,
} from '../data/curriculum';

export default function UnitsPage() {
  const { grade } = useParams();
  const gradeNum = Number(grade);
  const label = GRADE_LABELS[gradeNum] ?? grade;

  // Grades 7-8: go straight to topics
  if (gradeNum === 7 || gradeNum === 8) {
    return <Navigate to={`/grade/${gradeNum}/topics`} replace />;
  }

  // Elementary (1-6): coming soon
  if (!isHighSchool(gradeNum) && !isMiddleSchool(gradeNum)) {
    return (
      <div className="space-y-6" dir="rtl">
        <Link to="/" className="text-sm text-[var(--color-teal)] hover:underline">
          \u2190 \u05d7\u05d6\u05e8\u05d4 \u05dc\u05d1\u05d9\u05ea
        </Link>
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
          \u05db\u05d9\u05ea\u05d4 {label}
        </h1>
        <p className="rounded-2xl bg-white/80 p-8 text-[var(--color-slate)] ring-1 ring-black/5">
          \u05ea\u05d5\u05db\u05e0\u05d9\u05ea \u05d4\u05dc\u05d9\u05de\u05d5\u05d3\u05d9\u05dd \u05dc\u05d9\u05e1\u05d5\u05d3\u05d9 (\u05d0\u05f3\u2013\u05d5\u05f3) \u05ea\u05ea\u05d5\u05d5\u05e1\u05e3 \u05d1\u05e9\u05dc\u05d1 \u05d4\u05d1\u05d0.
          \u05db\u05e8\u05d2\u05e2 \u05e0\u05d9\u05ea\u05df \u05dc\u05ea\u05e8\u05d2\u05dc \u05db\u05d9\u05ea\u05d5\u05ea \u05d6\u05f3\u2013\u05d9\u05f4\u05d1.
        </p>
      </div>
    );
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
''')

topics_page = U(r'''import { Link, useParams } from 'react-router-dom';
import { GRADE_LABELS, GRADE9_TRACKS, getTopics } from '../data/curriculum';
import { getQuestionsForTopic } from '../data/questions';

export default function TopicsPage() {
  const { grade, units, track } = useParams();
  const gradeNum = Number(grade);
  const unitsNum = units != null ? Number(units) : null;
  const label = GRADE_LABELS[gradeNum] ?? grade;

  const topics = getTopics(gradeNum, {
    units: unitsNum,
    track: track ?? null,
  });

  const byCluster = topics.reduce((acc, t) => {
    const key = t.cluster || '\u05e0\u05d5\u05e9\u05d0\u05d9\u05dd';
    if (!acc[key]) acc[key] = [];
    acc[key].push(t);
    return acc;
  }, {});

  const backHref =
    gradeNum <= 8
      ? '/'
      : gradeNum === 9
        ? '/grade/9'
        : `/grade/${gradeNum}`;

  const trackTitle =
    gradeNum === 9 && track
      ? GRADE9_TRACKS.find((t) => t.id === track)?.title
      : null;

  const subtitle =
    unitsNum != null
      ? `${unitsNum} \u05d9\u05d7\u05f4\u05dc`
      : trackTitle
        ? trackTitle
        : '\u05ea\u05d5\u05db\u05e0\u05d9\u05ea \u05d7\u05d8\u05d9\u05d1\u05ea \u05d4\u05d1\u05d9\u05e0\u05d9\u05d9\u05dd';

  return (
    <div className="space-y-8" dir="rtl">
      <div>
        <Link to={backHref} className="text-sm text-[var(--color-teal)] hover:underline">
          \u2190 \u05d7\u05d6\u05e8\u05d4
        </Link>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
          \u05db\u05d9\u05ea\u05d4 {label} \u00b7 {subtitle}
        </h1>
        <p className="mt-2 text-[var(--color-slate)]">
          \u05d1\u05d7\u05e8\u05d5 \u05e0\u05d5\u05e9\u05d0 \u05d5\u05d4\u05ea\u05d7\u05d9\u05dc\u05d5 \u05de\u05d1\u05d7\u05df \u05ea\u05e8\u05d2\u05d5\u05dc
        </p>
      </div>

      {topics.length === 0 ? (
        <p className="rounded-2xl bg-white/80 p-8 text-[var(--color-slate)] ring-1 ring-black/5">
          \u05dc\u05d0 \u05e0\u05de\u05e6\u05d0\u05d5 \u05e0\u05d5\u05e9\u05d0\u05d9\u05dd \u05dc\u05de\u05e1\u05dc\u05d5\u05dc \u05d6\u05d4.
        </p>
      ) : (
        Object.entries(byCluster).map(([cluster, list]) => (
          <section key={cluster} className="space-y-4">
            <h2 className="text-lg font-semibold text-[var(--color-ink)]">{cluster}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((t) => {
                const qCount = getQuestionsForTopic(t.id).length;
                return (
                  <Link
                    key={t.id}
                    to={`/quiz/${t.id}`}
                    className="block rounded-2xl bg-white/90 p-6 shadow-sm ring-1 ring-black/5 transition hover:ring-[var(--color-teal)]/40"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-semibold text-[var(--color-ink)]">{t.title}</h3>
                      <span className="shrink-0 rounded-md bg-[var(--color-mist)] px-2 py-0.5 text-xs text-[var(--color-slate)]">
                        {qCount} \u05e9\u05d0\u05dc\u05d5\u05ea
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-slate)]">
                      {t.description}
                    </p>
                    <span className="mt-4 inline-block text-sm font-medium text-[var(--color-teal)]">
                      \u05d4\u05ea\u05d7\u05dc \u05de\u05d1\u05d7\u05df \u2190
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
''')

# Fix arrow direction for RTL CTA - use ? as before
topics_page = topics_page.replace('\u05d4\u05ea\u05d7\u05dc \u05de\u05d1\u05d7\u05df \u2190', '\u05d4\u05ea\u05d7\u05dc \u05de\u05d1\u05d7\u05df \u2192')

quiz_page = U(r'''import { Link, useParams } from 'react-router-dom';
import QuizCard from '../components/quiz/QuizCard';
import { getTopicById, GRADE_LABELS, GRADE9_TRACKS } from '../data/curriculum';
import { getQuestionsForTopic } from '../data/questions';

export default function QuizPage() {
  const { topicId } = useParams();
  const topic = getTopicById(topicId);
  const questions = getQuestionsForTopic(topicId);

  const title = topic?.title ?? topicId;

  let backHref = '/';
  if (topic) {
    if (topic.units != null) {
      backHref = `/grade/${topic.grade}/units/${topic.units}`;
    } else if (topic.track) {
      backHref = `/grade/${topic.grade}/track/${topic.track}`;
    } else {
      backHref = `/grade/${topic.grade}/topics`;
    }
  }

  const trackLabel =
    topic?.track != null
      ? GRADE9_TRACKS.find((t) => t.id === topic.track)?.title
      : null;

  function handleComplete(result) {
    console.log('\u05ea\u05d5\u05e6\u05d0\u05ea \u05de\u05d1\u05d7\u05df:', { topicId, ...result });
  }

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <Link to={backHref} className="text-sm text-[var(--color-teal)] hover:underline">
          \u2190 \u05d7\u05d6\u05e8\u05d4 \u05dc\u05e0\u05d5\u05e9\u05d0\u05d9\u05dd
        </Link>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
          {title}
        </h1>
        {topic && (
          <p className="mt-1 text-sm text-[var(--color-slate)]">
            \u05db\u05d9\u05ea\u05d4 {GRADE_LABELS[topic.grade]}
            {topic.units != null ? ` \u00b7 ${topic.units} \u05d9\u05d7\u05f4\u05dc` : ''}
            {trackLabel ? ` \u00b7 ${trackLabel}` : ''}
            {topic.cluster ? ` \u00b7 ${topic.cluster}` : ''}
          </p>
        )}
      </div>

      <QuizCard questions={questions} onComplete={handleComplete} />
    </div>
  );
}
''')

(ROOT / "src/pages/UnitsPage.jsx").write_text(units_page, encoding="utf-8")
(ROOT / "src/pages/TopicsPage.jsx").write_text(topics_page, encoding="utf-8")
(ROOT / "src/pages/QuizPage.jsx").write_text(quiz_page, encoding="utf-8")
print("pages written")
for f in ["UnitsPage.jsx", "TopicsPage.jsx", "QuizPage.jsx"]:
    t = (ROOT / "src/pages" / f).read_text(encoding="utf-8")
    print(f, "heb", sum(1 for c in t if "\u0590" <= c <= "\u05FF"), "qmarks", t.count("?"))
