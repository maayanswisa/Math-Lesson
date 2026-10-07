import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MathRenderer from '../components/ui/MathRenderer';
import LessonBlock from '../components/lesson/LessonBlock';
import { getTopicById } from '../data/curriculum';
import { loadCheatSheet } from '../data/cheatsheets';
import { hasLesson } from '../data/lessons';
import { hasWorksheet } from '../data/worksheets';
import { topicsHref } from '../lib/formulaLinks';

/**
 * בטלפון הטבלה נפרסת לכרטיסים: stack="columns" — כרטיס לכל עמודה (למשל לכל סוג מכנה),
 * stack="rows" — כרטיס לכל שורה (למשל לכל טרנספורמציה).
 */
function StackedCards({ head, rows, stack }) {
  const cards =
    stack === 'columns'
      ? head.slice(1).map((title, i) => ({ title, lines: rows.map((r) => [r[0], r[i + 1]]) }))
      : rows.map((r) => ({ title: r[0], lines: r.slice(1).map((cell, i) => [head[i + 1], cell]) }));
  return (
    <div className="space-y-3 sm:hidden print:hidden">
      {cards.map((card, i) => (
        <div key={i} className="rounded-2xl bg-white p-3 ring-1 ring-black/5">
          <p className="mb-2 font-bold text-[var(--color-ink)]">
            <MathRenderer inline>{card.title}</MathRenderer>
          </p>
          <dl className="space-y-1.5 text-sm">
            {card.lines.map(([label, value], j) => (
              <div key={j}>
                <dt className="font-semibold text-[var(--color-slate)]">
                  <MathRenderer inline>{label}</MathRenderer>
                </dt>
                <dd className="text-[var(--color-ink)]">
                  <MathRenderer inline>{value}</MathRenderer>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}

/** טבלת השוואה: כל תא הוא markdown עם נוסחאות. במסך רחב ובהדפסה — טבלה; בטלפון — כרטיסים. */
function CheatTable({ head, rows, stack = 'rows' }) {
  return (
    <>
      <StackedCards head={head} rows={rows} stack={stack} />
      <CheatTableGrid head={head} rows={rows} />
    </>
  );
}

function CheatTableGrid({ head, rows }) {
  return (
    <div className="hidden overflow-x-auto rounded-2xl bg-white ring-1 ring-black/5 sm:block print:block print:overflow-visible">
      <table className="w-full min-w-[34rem] border-collapse text-sm print:min-w-0">
        <thead>
          <tr className="bg-[var(--color-mist)]">
            {head.map((h, i) => (
              <th key={i} className="border-b border-black/10 px-3 py-2 text-start font-bold text-[var(--color-ink)]">
                <MathRenderer inline>{h}</MathRenderer>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="align-top odd:bg-white even:bg-[var(--color-paper)]/60">
              {row.map((cell, c) => (
                <td key={c} className={`border-b border-black/5 px-3 py-2 ${c === 0 ? 'font-semibold text-[var(--color-slate)]' : 'text-[var(--color-ink)]'}`}>
                  <MathRenderer inline>{cell}</MathRenderer>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CheatSheetPage() {
  const { topicId } = useParams();
  const topic = getTopicById(topicId);
  const [sheet, setSheet] = useState(undefined);

  useEffect(() => {
    let alive = true;
    loadCheatSheet(topicId).then((s) => alive && setSheet(s));
    return () => {
      alive = false;
    };
  }, [topicId]);

  if (sheet === undefined) {
    return <div className="rounded-2xl bg-white/80 p-8 text-center text-[var(--color-slate)] ring-1 ring-black/5">טוען…</div>;
  }
  if (!sheet || !topic) {
    return (
      <div className="space-y-4" dir="rtl">
        <p className="rounded-2xl bg-white/80 p-6 text-[var(--color-slate)] ring-1 ring-black/5">אין עדיין דף עזר לנושא הזה.</p>
        <Link to="/" className="text-sm text-[var(--color-teal)] hover:underline">
          ← חזרה לדף הבית
        </Link>
      </div>
    );
  }

  return (
    <div className="cheat-sheet space-y-6" dir="rtl">
      <div className="flex flex-wrap items-center justify-between gap-2 print:hidden">
        <Link to={topicsHref(topic.grade, topic.units ?? null, null)} className="text-sm text-[var(--color-teal)] hover:underline">
          ← חזרה לנושאים
        </Link>
        <div className="flex flex-wrap gap-2 text-sm font-bold">
          {hasLesson(topicId) && (
            <Link to={`/learn/${topicId}`} className="rounded-full bg-[var(--color-sunshine)]/15 px-3 py-1 text-[var(--color-sunshine-dark)]">
              📖 הסבר מלא
            </Link>
          )}
          {hasWorksheet(topicId) && (
            <Link to={`/worksheet/${topicId}`} className="rounded-full bg-[var(--color-sky)]/12 px-3 py-1 text-[var(--color-sky-dark)]">
              📝 דף עבודה
            </Link>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[var(--color-slate)]">{topic.title}</p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)] print:text-2xl">
            <span aria-hidden="true">{sheet.emoji} </span>
            <MathRenderer inline>{sheet.title}</MathRenderer>
          </h1>
          <p className="mt-2 text-[var(--color-slate)] print:text-sm">{sheet.subtitle}</p>
        </div>
        <button
          onClick={() => window.print()}
          className="rounded-2xl bg-[var(--color-ink)] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 print:hidden"
        >
          🖨️ הדפסה
        </button>
      </div>

      {sheet.sections.map((section, i) => (
        <section key={i} className="space-y-3 break-inside-avoid-page">
          <h2 className="flex items-center gap-2 text-xl font-bold text-[var(--color-ink)]">
            <span aria-hidden="true">{section.emoji}</span>
            <MathRenderer inline>{section.title}</MathRenderer>
          </h2>
          {section.blocks.map((block, j) =>
            block.type === 'table' ? (
              <CheatTable key={j} head={block.head} rows={block.rows} stack={block.stack} />
            ) : (
              <div key={j} className={block.type === 'card' || block.type === 'steps' ? '' : 'print:hidden'}>
                <LessonBlock block={block} />
              </div>
            ),
          )}
        </section>
      ))}

      <p className="hidden text-center text-xs text-[var(--color-slate)] print:block">מתמטיקל — תרגול מתמטיקה</p>
    </div>
  );
}
