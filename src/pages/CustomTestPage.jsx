import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GRADE_LABELS, getAllTopicsForGrade } from '../data/curriculum';
import { buildCustomQuiz } from '../data/questions';
import { writeCustomQuiz } from '../lib/customQuiz.js';

const GRADES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const COUNTS = [5, 10, 15];
const BANDS = [
  { id: 'easy', label: 'קל (חימום)', desc: 'difficulty 1' },
  { id: 'medium', label: 'בינוני (רמת כיתה)', desc: '2-3' },
  { id: 'hard', label: 'קשה (אתגר)', desc: '4-5' },
];

export default function CustomTestPage() {
  const navigate = useNavigate();
  const [grade, setGrade] = useState(9);
  const [selected, setSelected] = useState([]);
  const [count, setCount] = useState(10);
  const [band, setBand] = useState('medium');
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);

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

  async function create() {
    setError('');
    if (!selected.length) {
      setError('בחרו לפחות נושא אחד');
      return;
    }
    setCreating(true);
    let questions;
    try {
      questions = await buildCustomQuiz({
        topicIds: selected,
        count,
        difficultyBand: band,
      });
    } catch {
      setCreating(false);
      setError('אירעה שגיאה ביצירת המבחן. נסו שוב.');
      return;
    }
    setCreating(false);
    if (!questions.length) {
      setError('לא נמצאו שאלות למסנן שנבחר. נסו רמת קושי אחרת.');
      return;
    }
    const payload = {
      questions,
      grade,
      topicIds: selected,
      title: `מבחן מותאם — כיתה ${GRADE_LABELS[grade]}`,
    };
    try {
      writeCustomQuiz(payload);
    } catch {
      setError('לא ניתן לשמור את המבחן בדפדפן הזה. נסו לצאת ממצב גלישה פרטית ולנסות שוב.');
      return;
    }
    navigate('/quiz/custom');
  }

  return (
    <div className="space-y-8" dir="rtl">
      <div>
        <Link to="/" className="text-sm text-[var(--color-teal)] hover:underline">
          ← חזרה לבית
        </Link>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
          מחולל מבחנים מותאם
        </h1>
        <p className="mt-2 text-[var(--color-slate)]">
          בחרו כיתה, נושאים, מספר שאלות ורמת קושי — וצרו סימולציה מותאמת.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[var(--color-ink)]">כיתה</h2>
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
            נושאים ({selected.length} נבחרו)
          </h2>
          <div className="flex gap-2 text-sm">
            <button type="button" onClick={selectAll} className="text-[var(--color-teal)] hover:underline">
              בחר הכל
            </button>
            <button type="button" onClick={clearAll} className="text-[var(--color-slate)] hover:underline">
              נקה
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
            <p className="text-sm text-[var(--color-slate)]">אין נושאים לכיתה זו.</p>
          )}
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-[var(--color-ink)]">מספר שאלות</h2>
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
          <h2 className="text-lg font-semibold text-[var(--color-ink)]">רמת קושי</h2>
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

      {error && <p className="text-sm text-[var(--color-coral-dark)]">{error}</p>}

      <button
        type="button"
        onClick={create}
        disabled={creating}
        className="rounded-xl bg-[var(--color-teal)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--color-teal-dark)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {creating ? 'יוצר מבחן…' : `צרו מבחן (${count} שאלות)`}
      </button>
    </div>
  );
}
