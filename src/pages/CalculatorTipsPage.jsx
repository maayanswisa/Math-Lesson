import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, MODELS, TIPS } from '../data/calculatorTips';
import { readJSON, writeJSON } from '../lib/storage';
import { accentFor } from '../lib/palette';

const MODEL_KEY = 'calculator-model';

const count = (s, ch) => s.split(ch).length - 1;

/**
 * טקסט עברי עם קטעים לועזיים (1-VAR, x!, a² + b²): כל קטע לועזי עטוף ב-bdi משמאל
 * לימין, כדי שהדפדפן לא "יהפוך" אותו. סוגריים לא מאוזנים נשארים מחוץ לקטע.
 */
function bidi(text) {
  const parts = [];
  // מינוס צמוד למספר נכלל בקטע — אבל לא מקף אחרי אות עברית (כמו "מ-ALPHA")
  const re = /(?:(?<=^|\s)[-−])?[A-Za-z0-9][^֐-׿]*/g;
  let from = 0;
  let m;
  while ((m = re.exec(text))) {
    let run = m[0].replace(/[\s,.;:—(]+$/, '');
    const open = run.lastIndexOf('(');
    if (open !== -1 && run.indexOf(')', open) === -1) run = run.slice(0, open).replace(/[\s,.;:—]+$/, '');
    while (run.endsWith(')') && count(run, '(') < count(run, ')')) run = run.slice(0, -1).trimEnd();
    parts.push(text.slice(from, m.index), <bdi key={m.index} dir="ltr">{run}</bdi>);
    from = m.index + run.length;
    re.lastIndex = from;
  }
  parts.push(text.slice(from));
  return parts;
}

/** צבע מקש לפי סוגו — כמו על המחשבון. */
function keyStyle(k) {
  if (k === 'SHIFT') return 'bg-[var(--color-sunshine)] text-white';
  if (k === 'ALPHA') return 'bg-[var(--color-berry)] text-white';
  if (k === 'AC' || k === '=') return 'bg-[var(--color-teal)] text-white';
  if (/^[0-9.]$/.test(k)) return 'bg-white text-[var(--color-ink)]';
  return 'bg-[var(--color-mist)] text-[var(--color-ink)]';
}

function Keys({ keys }) {
  return (
    <span dir="ltr" className="inline-flex flex-wrap items-center gap-1">
      {keys.map((k, i) => (
        <kbd key={i} className={`min-w-7 rounded-md px-1.5 py-0.5 text-center font-mono text-xs font-bold shadow-[0_2px_0_rgba(0,0,0,0.18)] ring-1 ring-black/10 ${keyStyle(k)}`}>
          {k}
        </kbd>
      ))}
    </span>
  );
}

function TipCard({ tip, model, accent }) {
  const steps = tip.shared ?? tip.steps[model];
  return (
    <article className="break-inside-avoid rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5" style={{ borderInlineStart: `4px solid ${accent.solid}` }}>
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-bold text-[var(--color-ink)]">{tip.title}</h3>
        <span className="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold" style={{ backgroundColor: accent.bg, color: accent.text }}>
          {tip.grades}
        </span>
      </div>
      <p className="mt-1 text-sm text-[var(--color-slate)]">{bidi(tip.why)}</p>
      <ol className="mt-3 space-y-2">
        {steps.map((s, i) => (
          <li key={i} className="text-sm text-[var(--color-ink)]">
            <span className="font-semibold">{i + 1}. </span>
            {bidi(s.text)}
            <div className="mt-1">
              <Keys keys={s.keys} />
            </div>
          </li>
        ))}
      </ol>
      {tip.example && (
        <div className="mt-3 rounded-xl bg-[var(--color-sunshine)]/10 p-2.5 text-sm">
          <span className="font-bold">נסו: </span>
          <bdi>{tip.example.task}</bdi>
          <span className="font-bold"> ← </span>
          <bdi className="font-bold text-[var(--color-teal-dark)]">{tip.example.result}</bdi>
          {tip.example.note && <p className="mt-1 text-xs text-[var(--color-slate)]">💡 {bidi(tip.example.note)}</p>}
        </div>
      )}
    </article>
  );
}

export default function CalculatorTipsPage() {
  const [model, setModelState] = useState(() => readJSON(MODEL_KEY, 'es'));
  const [category, setCategory] = useState('all');
  const setModel = (m) => {
    setModelState(m);
    writeJSON(MODEL_KEY, m);
  };

  const shown = CATEGORIES.filter((c) => category === 'all' || c.id === category);

  return (
    <div className="space-y-6" dir="rtl">
      <Link to="/" className="text-sm text-[var(--color-teal)] hover:underline">
        ← חזרה לדף הבית
      </Link>
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)] sm:text-4xl">🧮 הסודות של המחשבון</h1>
        <p className="mt-2 text-[var(--color-slate)]">איך לחשב זוויות, לפתור משוואות, לחשב ממוצע ועוד — לחיצה אחרי לחיצה.</p>
      </div>

      <div className="rounded-2xl bg-white/80 p-3 ring-1 ring-black/5">
        <p className="mb-2 text-sm font-bold text-[var(--color-ink)]">איזה מחשבון יש לכם? (כתוב בפינה העליונה)</p>
        <div className="flex flex-wrap gap-2">
          {MODELS.map((m) => (
            <button
              key={m.id}
              onClick={() => setModel(m.id)}
              aria-pressed={model === m.id}
              className={`rounded-xl px-4 py-2 text-sm font-bold ring-1 transition ${model === m.id ? 'bg-[var(--color-teal)] text-white ring-transparent' : 'bg-white text-[var(--color-ink)] ring-black/10'}`}
            >
              <span dir="ltr">Casio {m.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {[{ id: 'all', label: 'הכל', emoji: '✨' }, ...CATEGORIES].map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            aria-pressed={category === c.id}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold ring-1 transition ${category === c.id ? 'bg-[var(--color-ink)] text-white ring-transparent' : 'bg-white text-[var(--color-ink)] ring-black/10'}`}
          >
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      {shown.map((c) => {
        const accent = accentFor(CATEGORIES.indexOf(c));
        return (
          <section key={c.id} className="space-y-3">
            <h2 className="inline-block rounded-full px-4 py-1 text-sm font-bold" style={{ backgroundColor: accent.bg, color: accent.text }}>
              {c.emoji} {c.label}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {TIPS.filter((t) => t.category === c.id).map((t) => (
                <TipCard key={t.id} tip={t} model={model} accent={accent} />
              ))}
            </div>
          </section>
        );
      })}

      <p className="text-center text-xs text-[var(--color-slate)]">המקשים המוצגים הם של מחשבוני Casio. בדגמים אחרים הסדר עשוי להיות שונה.</p>
    </div>
  );
}
