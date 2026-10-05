import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';
import { choiceKey, hasBlanks, itemStatus, parseTemplate } from '../../lib/worksheet';
import TemplateLine from './TemplateLine';

const GRID = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  // פריטים קצרים (3/10 = __): שני טורים גם בטלפון, כמו בחוברת
  3: 'grid-cols-2 lg:grid-cols-3',
};

/**
 * שרטוטים ופריטי השוואה (שבר, 3 כפתורים, שבר) רחבים מדי לשני טורים
 * בטלפון צר — שם הם מקבלים טור אחד.
 */
function gridClass(ex) {
  const cols = ex.cols ?? 2;
  if (cols === 3 && ex.items.some((item) => item.figure)) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
  if (cols === 3 && ex.items.some((item) => /\[\[[ci]:/.test(item.q))) {
    return 'grid-cols-1 min-[440px]:grid-cols-2 lg:grid-cols-3';
  }
  return GRID[cols];
}

const STATUS_RING = {
  right: 'bg-[var(--color-success)]/5 ring-[var(--color-success)]/50',
  wrong: 'bg-[var(--color-coral)]/5 ring-[var(--color-coral)]/50',
};

function Choices({ item, k, value, mark, disabled, showAnswers, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {item.options.map((opt, i) => {
        const picked = value === i;
        const isAnswer = showAnswers && i === item.answer;
        const cls = isAnswer
          ? 'bg-[var(--color-success)] text-white ring-[var(--color-success)]'
          : picked
            ? mark === true
              ? 'bg-[var(--color-success)] text-white ring-[var(--color-success)]'
              : mark === false
                ? 'bg-[var(--color-coral)] text-white ring-[var(--color-coral)]'
                : 'bg-[var(--color-sky)] text-white ring-[var(--color-sky)]'
            : 'bg-white text-[var(--color-ink)] ring-black/15 hover:bg-[var(--color-mist)]';
        return (
          <button
            key={i}
            type="button"
            disabled={disabled || showAnswers}
            onClick={() => onChange(k, i)}
            className={`rounded-xl px-3.5 py-1.5 text-base font-semibold ring-1 transition disabled:cursor-default ${cls}`}
          >
            <MathRenderer inline>{opt}</MathRenderer>
          </button>
        );
      })}
    </div>
  );
}

function Item({ item, number, at, values, marks, disabled, showAnswers, onChange }) {
  const [partId, exIdx, itemIdx] = at;
  const status = showAnswers ? null : itemStatus(item, partId, exIdx, itemIdx, marks);
  const lineProps = { at, values, marks, disabled, showAnswers, onChange };
  const qBlankCount = parseTemplate(item.q).filter((s) => s.type === 'blank').length;
  // שאלה "ארוכה" (שאלה מילולית / בחירה): השאלה בבלוק נפרד, המשבצות בשורה מתחתיה.
  const isLong = Boolean(item.a || item.options) && !hasBlanks(item.q);

  return (
    <div
      className={`flex min-w-0 items-start gap-2 rounded-xl p-2 ring-1 transition sm:gap-2.5 sm:p-2.5 ${
        STATUS_RING[status] ?? 'ring-transparent'
      }`}
    >
      <span
        className={`mt-1.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
          status === 'right'
            ? 'bg-[var(--color-success)]'
            : status === 'wrong'
              ? 'bg-[var(--color-coral)]'
              : 'bg-[var(--color-teal)]'
        }`}
      >
        {status === 'right' ? '✓' : number}
      </span>
      <div className="min-w-0 flex-1 space-y-2">
        {isLong ? (
          <MathRenderer className="text-base text-[var(--color-ink)]">{item.q}</MathRenderer>
        ) : (
          <TemplateLine template={item.q} {...lineProps} />
        )}
        {item.figure && <MathRenderer className="ws-figure">{item.figure}</MathRenderer>}
        {item.a && (
          <div className="flex flex-wrap items-center gap-2">
            {isLong && item.q && <span className="text-sm font-bold text-[var(--color-slate)]">תשובה:</span>}
            <TemplateLine template={item.a} blankOffset={qBlankCount} {...lineProps} />
          </div>
        )}
        {item.options && (
          <Choices
            item={item}
            k={choiceKey(partId, exIdx, itemIdx)}
            value={values?.[choiceKey(partId, exIdx, itemIdx)]}
            mark={marks?.[choiceKey(partId, exIdx, itemIdx)]}
            disabled={disabled}
            showAnswers={showAnswers}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
}

/**
 * תרגיל בדף העבודה: הוראה, פריטים ממוספרים, וכפתור "בדיקה".
 * mode: 'practice' (בדיקה לכל תרגיל) | 'quiz' (בדיקה רק בהגשת המבדק) | 'answers' (מפתח תשובות).
 */
export default function ExerciseCard({
  ex,
  exIdx,
  number,
  partId,
  values = {},
  marks = {},
  mode = 'practice',
  disabled = false,
  onChange,
  onCheck,
  onReset,
}) {
  const showAnswers = mode === 'answers';
  const statuses = ex.items.map((item, i) => itemStatus(item, partId, exIdx, i, marks));
  const right = statuses.filter((s) => s === 'right').length;
  const wrong = statuses.filter((s) => s === 'wrong').length;
  const allRight = right === ex.items.length;
  const [notice, setNotice] = useState(null);

  const feedback = notice
    ? { tone: 'info', text: notice }
    : allRight
      ? { tone: 'good', text: '🎉 מצוין! כל התשובות נכונות' }
      : wrong > 0
        ? { tone: 'bad', text: `${right} נכונות · ${wrong} לתיקון — תקנו את המסומן באדום ובדקו שוב` }
        : right > 0
          ? { tone: 'info', text: `${right} נכונות — השלימו את השאר` }
          : null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`rounded-2xl bg-white p-4 shadow-sm ring-1 sm:p-5 ${
        !showAnswers && allRight ? 'ring-[var(--color-success)]/50' : 'ring-black/5'
      }`}
    >
      <header className="mb-3 flex items-start gap-3">
        <span className="shrink-0 rounded-lg bg-[var(--color-sky)] px-2.5 py-1 text-sm font-bold text-white">
          {number}
        </span>
        <MathRenderer className="min-w-0 flex-1 pt-0.5 text-base font-semibold text-[var(--color-ink)]">
          {ex.title}
        </MathRenderer>
        {!showAnswers && mode === 'quiz' && disabled && (
          <span className="shrink-0 rounded-full bg-[var(--color-mist)] px-2.5 py-1 text-xs font-bold text-[var(--color-slate)]">
            {right}/{ex.items.length}
          </span>
        )}
      </header>

      {ex.figure && <MathRenderer className="ws-figure mb-3">{ex.figure}</MathRenderer>}

      <div className={`grid gap-2 ${gridClass(ex)}`}>
        {ex.items.map((item, itemIdx) => (
          <Item
            key={itemIdx}
            item={item}
            number={itemIdx + 1}
            at={[partId, exIdx, itemIdx]}
            values={values}
            marks={marks}
            disabled={disabled}
            showAnswers={showAnswers}
            onChange={onChange}
          />
        ))}
      </div>

      {mode === 'practice' && (
        <footer className="mt-4 flex flex-wrap items-center gap-3">
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => setNotice(onCheck(exIdx) ? null : 'מלאו תשובה אחת לפחות ואז לחצו על בדיקה')}
            className="rounded-xl bg-[var(--color-sky)] px-6 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-[var(--color-sky-dark)]"
          >
            בדיקה
          </motion.button>
          {feedback && (
            <span
              role="status"
              className={`text-sm font-semibold ${
                feedback.tone === 'good'
                  ? 'text-[var(--color-success)]'
                  : feedback.tone === 'bad'
                    ? 'text-[var(--color-coral)]'
                    : 'text-[var(--color-slate)]'
              }`}
            >
              {feedback.text}
            </span>
          )}
          <button
            type="button"
            onClick={() => {
              setNotice(null);
              onReset(exIdx);
            }}
            className="ms-auto text-xs font-semibold text-[var(--color-slate)] hover:text-[var(--color-coral)]"
          >
            ↺ ניקוי
          </button>
        </footer>
      )}
    </motion.section>
  );
}
