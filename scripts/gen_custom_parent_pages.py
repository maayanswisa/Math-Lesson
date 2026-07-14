# -*- coding: utf-8 -*-
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def u(s: str) -> str:
    out = []
    i = 0
    while i < len(s):
        if s[i : i + 2] == "\\u" and i + 6 <= len(s):
            h = s[i + 2 : i + 6]
            if all(c in "0123456789abcdefABCDEF" for c in h):
                out.append(chr(int(h, 16)))
                i += 6
                continue
        out.append(s[i])
        i += 1
    return "".join(out)


def w(rel, text):
    (ROOT / rel).write_text(u(text), encoding="utf-8")
    print("wrote", rel)


# Custom test page
w(
    "src/pages/CustomTestPage.jsx",
    r"""import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GRADE_LABELS, getAllTopicsForGrade } from '../data/curriculum';
import { buildCustomQuiz } from '../data/questions';

const GRADES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const COUNTS = [5, 10, 15];
const BANDS = [
  { id: 'easy', label: '\u05e7\u05dc (\u05d7\u05d9\u05de\u05d5\u05dd)', desc: 'difficulty 1' },
  { id: 'medium', label: '\u05d1\u05d9\u05e0\u05d5\u05e0\u05d9 (\u05e8\u05de\u05ea \u05db\u05d9\u05ea\u05d4)', desc: '2-3' },
  { id: 'hard', label: '\u05e7\u05e9\u05d4 (\u05d0\u05ea\u05d2\u05e8)', desc: '4-5' },
];

export default function CustomTestPage() {
  const navigate = useNavigate();
  const [grade, setGrade] = useState(9);
  const [selected, setSelected] = useState([]);
  const [count, setCount] = useState(10);
  const [band, setBand] = useState('medium');
  const [error, setError] = useState('');

  const topics = useMemo(() => getAllTopicsForGrade(grade), [grade]);

  function toggle(id) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function selectAll() {
    setSelected(topics.map((t) => t.id));
  }

  function clearAll() {
    setSelected([]);
  }

  function create() {
    setError('');
    if (!selected.length) {
      setError('\u05d1\u05d7\u05e8\u05d5 \u05dc\u05e4\u05d7\u05d5\u05ea \u05e0\u05d5\u05e9\u05d0 \u05d0\u05d7\u05d3');
      return;
    }
    const questions = buildCustomQuiz({
      topicIds: selected,
      count,
      difficultyBand: band,
    });
    if (!questions.length) {
      setError('\u05dc\u05d0 \u05e0\u05de\u05e6\u05d0\u05d5 \u05e9\u05d0\u05dc\u05d5\u05ea \u05dc\u05de\u05e1\u05e0\u05df \u05e9\u05e0\u05d1\u05d7\u05e8. \u05e0\u05e1\u05d5 \u05e8\u05de\u05ea \u05e7\u05d5\u05e9\u05d9 \u05d0\u05d7\u05e8\u05ea.');
      return;
    }
    const payload = {
      questions,
      grade,
      topicIds: selected,
      title: `\u05de\u05d1\u05d7\u05df \u05de\u05d5\u05ea\u05d0\u05dd \u2014 \u05db\u05d9\u05ea\u05d4 ${GRADE_LABELS[grade]}`,
    };
    sessionStorage.setItem('math-lesson-custom-quiz', JSON.stringify(payload));
    navigate('/quiz/custom');
  }

  return (
    <div className="space-y-8" dir="rtl">
      <div>
        <Link to="/" className="text-sm text-[var(--color-teal)] hover:underline">
          \u2190 \u05d7\u05d6\u05e8\u05d4 \u05dc\u05d1\u05d9\u05ea
        </Link>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
          \u05de\u05d7\u05d5\u05dc\u05dc \u05de\u05d1\u05d7\u05e0\u05d9\u05dd \u05de\u05d5\u05ea\u05d0\u05dd
        </h1>
        <p className="mt-2 text-[var(--color-slate)]">
          \u05d1\u05d7\u05e8\u05d5 \u05db\u05d9\u05ea\u05d4, \u05e0\u05d5\u05e9\u05d0\u05d9\u05dd, \u05de\u05e1\u05e4\u05e8 \u05e9\u05d0\u05dc\u05d5\u05ea \u05d5\u05e8\u05de\u05ea \u05e7\u05d5\u05e9\u05d9 \u2014 \u05d5\u05e6\u05e8\u05d5 \u05e1\u05d9\u05de\u05d5\u05dc\u05e6\u05d9\u05d4 \u05de\u05d5\u05ea\u05d0\u05de\u05ea.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[var(--color-ink)]">\u05db\u05d9\u05ea\u05d4</h2>
        <div className="flex flex-wrap gap-2">
          {GRADES.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => {
                setGrade(g);
                setSelected([]);
              }}
              className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                grade === g
                  ? 'bg-[var(--color-teal)] text-white'
                  : 'bg-white ring-1 ring-black/10 text-[var(--color-ink)]'
              }`}
            >
              {GRADE_LABELS[g]}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-[var(--color-ink)]">
            \u05e0\u05d5\u05e9\u05d0\u05d9\u05dd ({selected.length} \u05e0\u05d1\u05d7\u05e8\u05d5)
          </h2>
          <div className="flex gap-2 text-sm">
            <button type="button" onClick={selectAll} className="text-[var(--color-teal)] hover:underline">
              \u05d1\u05d7\u05e8 \u05d4\u05db\u05dc
            </button>
            <button type="button" onClick={clearAll} className="text-[var(--color-slate)] hover:underline">
              \u05e0\u05e7\u05d4
            </button>
          </div>
        </div>
        <div className="grid max-h-72 gap-2 overflow-y-auto rounded-2xl bg-white/80 p-4 ring-1 ring-black/5 sm:grid-cols-2">
          {topics.map((t) => {
            const on = selected.includes(t.id);
            return (
              <label
                key={t.id}
                className={`flex cursor-pointer items-start gap-2 rounded-xl px-3 py-2 ${
                  on ? 'bg-[var(--color-teal)]/10 ring-1 ring-[var(--color-teal)]/40' : 'hover:bg-[var(--color-mist)]/50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => toggle(t.id)}
                  className="mt-1 accent-[var(--color-teal)]"
                />
                <span>
                  <span className="block text-sm font-medium text-[var(--color-ink)]">{t.title}</span>
                  {t.cluster && (
                    <span className="text-xs text-[var(--color-slate)]">{t.cluster}</span>
                  )}
                </span>
              </label>
            );
          })}
          {!topics.length && (
            <p className="text-sm text-[var(--color-slate)]">\u05d0\u05d9\u05df \u05e0\u05d5\u05e9\u05d0\u05d9\u05dd \u05dc\u05db\u05d9\u05ea\u05d4 \u05d6\u05d5.</p>
          )}
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-[var(--color-ink)]">\u05de\u05e1\u05e4\u05e8 \u05e9\u05d0\u05dc\u05d5\u05ea</h2>
          <div className="flex gap-2">
            {COUNTS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCount(c)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                  count === c ? 'bg-[var(--color-teal)] text-white' : 'bg-white ring-1 ring-black/10'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-[var(--color-ink)]">\u05e8\u05de\u05ea \u05e7\u05d5\u05e9\u05d9</h2>
          <div className="flex flex-col gap-2">
            {BANDS.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setBand(b.id)}
                className={`rounded-xl px-4 py-2 text-right text-sm font-semibold ${
                  band === b.id
                    ? 'bg-[var(--color-teal)] text-white'
                    : 'bg-white text-[var(--color-ink)] ring-1 ring-black/10'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {error && <p className="text-sm text-[var(--color-coral)]">{error}</p>}

      <button
        type="button"
        onClick={create}
        className="rounded-xl bg-[var(--color-teal)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--color-teal-dark)]"
      >
        \u05e6\u05e8\u05d5 \u05de\u05d1\u05d7\u05df ({count} \u05e9\u05d0\u05dc\u05d5\u05ea)
      </button>
    </div>
  );
}
""",
)

w(
    "src/pages/ParentDashboardPage.jsx",
    r"""import { useMemo, useState } from 'react';
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
      setLinkMsg('\u05d4\u05e7\u05d5\u05d3 \u05e0\u05e9\u05de\u05e8 \u05d1\u05de\u05db\u05e9\u05d9\u05e8 \u05d6\u05d4 (\u05d1\u05e9\u05dc\u05d1 \u05d4\u05d1\u05d0 \u2014 \u05e1\u05e0\u05db\u05e8\u05d5\u05df \u05e2\u05dd \u05d7\u05e9\u05d1\u05d5\u05df \u05ea\u05dc\u05de\u05d9\u05d3)');
    }
  }

  return (
    <div className="space-y-8" dir="rtl">
      <div>
        <Link to="/" className="text-sm text-[var(--color-teal)] hover:underline">
          \u2190 \u05d7\u05d6\u05e8\u05d4 \u05dc\u05d1\u05d9\u05ea
        </Link>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
          \u05dc\u05d4\u05d5\u05e8\u05d9\u05dd \u05d5\u05de\u05d5\u05e8\u05d9\u05dd
        </h1>
        <p className="mt-2 text-[var(--color-slate)]">
          \u05de\u05e2\u05e7\u05d1 \u05d0\u05d7\u05e8 \u05d4\u05ea\u05e7\u05d3\u05de\u05d5\u05ea \u05d4\u05ea\u05e8\u05d2\u05d5\u05dc \u05d1\u05de\u05db\u05e9\u05d9\u05e8 \u05d6\u05d4. \u05d3\u05d5\u05d7 \u05de\u05d9\u05d9\u05dc \u05e9\u05d1\u05d5\u05e2\u05d9 \u05d9\u05d5\u05e4\u05e2\u05dc \u05db\u05e9\u05d9\u05d7\u05d5\u05d1\u05e8 Auth.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-white/90 p-5 ring-1 ring-black/5">
          <p className="text-xs text-[var(--color-slate)]">XP</p>
          <p className="mt-1 text-2xl font-semibold text-[var(--color-teal)]">{xp}</p>
          <p className="text-sm text-[var(--color-ink)]">{level.title}</p>
        </div>
        <div className="rounded-2xl bg-white/90 p-5 ring-1 ring-black/5">
          <p className="text-xs text-[var(--color-slate)]">\u05e8\u05e6\u05e3</p>
          <p className="mt-1 text-2xl font-semibold text-[var(--color-coral)]">{streak}</p>
        </div>
        <div className="rounded-2xl bg-white/90 p-5 ring-1 ring-black/5">
          <p className="text-xs text-[var(--color-slate)]">\u05d4\u05e9\u05d1\u05d5\u05e2</p>
          <p className="mt-1 text-2xl font-semibold text-[var(--color-ink)]">{week.count} \u05de\u05d1\u05d7\u05e0\u05d9\u05dd</p>
          <p className="text-sm text-[var(--color-slate)]">
            \u05de\u05de\u05d5\u05e6\u05e2 {week.avgScore}
            {week.improved ? ' \u00b7 \u05e9\u05d9\u05e4\u05d5\u05e8 \u05d1\u05e9\u05d1\u05d5\u05e2' : ''}
          </p>
        </div>
      </section>

      <section className="rounded-2xl bg-white/90 p-6 ring-1 ring-black/5">
        <h2 className="text-lg font-semibold text-[var(--color-ink)]">\u05e7\u05d5\u05d3 \u05ea\u05dc\u05de\u05d9\u05d3</h2>
        <p className="mt-2 text-sm text-[var(--color-slate)]">
          \u05e9\u05ea\u05e4\u05d5 \u05d0\u05ea \u05d4\u05e7\u05d5\u05d3 \u05e2\u05dd \u05d4\u05d5\u05e8\u05d4/\u05de\u05d5\u05e8\u05d4 \u05db\u05d3\u05d9 \u05dc\u05e7\u05e9\u05e8 (\u05de\u05e7\u05d5\u05de\u05d9 \u05db\u05e8\u05d2\u05e2):
        </p>
        <p className="mt-3 font-mono text-xl font-semibold tracking-wider text-[var(--color-teal)]">
          {studentCode}
        </p>
        <form onSubmit={onLink} className="mt-4 flex flex-wrap gap-2">
          <input
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
            placeholder="\u05e7\u05d5\u05d3 \u05dc\u05e7\u05d9\u05e9\u05d5\u05e8"
            className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm"
          />
          <button type="submit" className="rounded-xl bg-[var(--color-teal)] px-4 py-2 text-sm font-semibold text-white">
            \u05e9\u05de\u05d9\u05e8\u05ea \u05e7\u05d9\u05e9\u05d5\u05e8
          </button>
        </form>
        {linkMsg && <p className="mt-2 text-sm text-[var(--color-success)]">{linkMsg}</p>}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[var(--color-ink)]">\u05e0\u05d5\u05e9\u05d0\u05d9\u05dd \u05dc\u05d7\u05d9\u05d6\u05d5\u05e7</h2>
        {weak.length === 0 ? (
          <p className="text-sm text-[var(--color-slate)]">\u05e2\u05d3\u05d9\u05d9\u05df \u05d0\u05d9\u05df \u05e0\u05ea\u05d5\u05e0\u05d9\u05dd \u2014 \u05e1\u05d9\u05d9\u05de\u05d5 \u05de\u05d1\u05d7\u05df \u05db\u05d3\u05d9 \u05dc\u05e8\u05d0\u05d5\u05ea \u05d3\u05d5\u05d7.</p>
        ) : (
          <ul className="space-y-2">
            {weak.map((t) => (
              <li key={t.topicId} className="flex items-center justify-between rounded-xl bg-white/90 px-4 py-3 ring-1 ring-black/5">
                <span className="text-sm font-medium text-[var(--color-ink)]">{t.title || t.topicId}</span>
                <span className="text-sm text-[var(--color-coral)]">\u05de\u05de\u05d5\u05e6\u05e2 {t.avg}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[var(--color-ink)]">\u05de\u05d1\u05d7\u05e0\u05d9\u05dd \u05d0\u05d7\u05e8\u05d5\u05e0\u05d9\u05dd</h2>
        {attempts.length === 0 ? (
          <p className="text-sm text-[var(--color-slate)]">\u05d0\u05d9\u05df \u05e2\u05d3\u05d9\u05d9\u05df \u05de\u05d1\u05d7\u05e0\u05d9\u05dd.</p>
        ) : (
          <ul className="space-y-2">
            {attempts.slice(0, 12).map((a) => (
              <li key={a.id} className="rounded-xl bg-white/90 px-4 py-3 ring-1 ring-black/5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-medium text-[var(--color-ink)]">{a.title || a.topicId || '\u05de\u05d1\u05d7\u05df'}</span>
                  <span className="text-sm font-semibold text-[var(--color-teal)]">{a.score}</span>
                </div>
                <p className="mt-1 text-xs text-[var(--color-slate)]">
                  {a.correctCount}/{a.total} \u00b7 {new Date(a.at).toLocaleString('he-IL')}
                  {a.custom ? ' \u00b7 \u05de\u05d5\u05ea\u05d0\u05dd' : ''}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {badges.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-[var(--color-ink)]">\u05ea\u05d2\u05d9\u05dd</h2>
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
""",
)

print("pages ok")
