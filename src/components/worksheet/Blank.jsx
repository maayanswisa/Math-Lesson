import MathRenderer from '../ui/MathRenderer';
import { blankAnswerMarkdown } from '../../lib/worksheet';

/** צבע המשבצת לפי הסימון: נכון / טעות / עוד לא נבדק. */
function tone(mark) {
  if (mark === true) return 'bg-[var(--color-success)]/10 text-[var(--color-success)] ring-2 ring-[var(--color-success)]';
  if (mark === false) return 'bg-[var(--color-coral)]/10 text-[var(--color-coral-dark)] ring-2 ring-[var(--color-coral)]';
  return 'bg-white text-[var(--color-ink)] ring-1 ring-black/20 focus:ring-2 focus:ring-[var(--color-sky)]';
}

function Box({ value, onChange, mark, disabled, chars, label, small = false, numeric = true }) {
  return (
    <input
      type="text"
      inputMode={numeric ? 'decimal' : 'text'}
      autoComplete="off"
      dir="ltr"
      value={value ?? ''}
      disabled={disabled}
      aria-label={label}
      onChange={(e) => onChange(e.target.value)}
      style={{ width: `calc(${Math.max(2, chars)}ch + ${small ? 1 : 1.25}rem)` }}
      className={`rounded-lg text-center font-semibold outline-none transition disabled:opacity-100 ${
        small ? 'h-8 text-[15px]' : 'h-9 text-base'
      } ${tone(mark)}`}
    />
  );
}

/** חלק של שבר: נתון (טקסט) או משבצת. */
function FracPart({ part, value, onChange, mark, disabled, label }) {
  if (part.fixed) {
    return <span className="flex h-8 min-w-[2rem] items-center justify-center px-1 text-[15px] font-semibold">{part.value}</span>;
  }
  return (
    <Box small value={value} onChange={onChange} mark={mark} disabled={disabled} chars={Math.max(2, String(part.value).length)} label={label} />
  );
}

function Fraction({ blank, value = {}, onChange, mark, disabled }) {
  const set = (k) => (v) => onChange({ ...value, [k]: v });
  return (
    <span className="mx-0.5 inline-flex flex-col items-stretch gap-0.5 align-middle" dir="ltr">
      <FracPart part={blank.n} value={value.n} onChange={set('n')} mark={mark} disabled={disabled} label="מונה" />
      <span className="h-[2px] rounded bg-[var(--color-ink)]" aria-hidden="true" />
      <FracPart part={blank.d} value={value.d} onChange={set('d')} mark={mark} disabled={disabled} label="מכנה" />
    </span>
  );
}

/** בחירת סימן: < = > להשוואה, או < ≤ > ≥ לאי-שוויון. */
function Compare({ signs, value, onChange, mark, disabled }) {
  const ring =
    mark === true
      ? 'ring-2 ring-[var(--color-success)]'
      : mark === false
        ? 'ring-2 ring-[var(--color-coral)]'
        : 'ring-1 ring-black/15';
  return (
    <span dir="ltr" role="radiogroup" aria-label="סימן השוואה" className={`mx-1 inline-flex overflow-hidden rounded-lg bg-white align-middle ${ring}`}>
      {signs.map((s) => {
        const on = value === s;
        return (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={on}
            disabled={disabled}
            onClick={() => onChange(s)}
            className={`h-9 w-9 text-lg font-bold transition ${
              on
                ? mark === false
                  ? 'bg-[var(--color-coral)] text-white'
                  : mark === true
                    ? 'bg-[var(--color-success)] text-white'
                    : 'bg-[var(--color-sky)] text-white'
                : 'text-[var(--color-slate)] hover:bg-[var(--color-mist)]'
            }`}
          >
            {s}
          </button>
        );
      })}
    </span>
  );
}

/**
 * משבצת אחת בתרגיל. במצב showAnswer מוצגת התשובה הנכונה במקום משבצת.
 */
export default function Blank({ blank, value, onChange, mark, disabled, showAnswer }) {
  if (showAnswer) {
    return (
      <span className="mx-0.5 inline-block rounded-md bg-[var(--color-success)]/12 px-1.5 py-0.5 font-bold text-[var(--color-success)]" dir="ltr">
        <MathRenderer inline>{blankAnswerMarkdown(blank)}</MathRenderer>
      </span>
    );
  }

  switch (blank.kind) {
    case 'fraction':
      return <Fraction blank={blank} value={value} onChange={onChange} mark={mark} disabled={disabled} />;
    case 'mixed':
    case 'value': // שלם + שבר; ב-value אפשר למלא רק חלק מהם
      return (
        <span className="mx-0.5 inline-flex items-center gap-1 align-middle" dir="ltr">
          {blank.w?.fixed ? (
            <span className="text-lg font-semibold">{blank.w.value}</span>
          ) : (
            <Box
              value={value?.w}
              onChange={(v) => onChange({ ...value, w: v })}
              mark={mark}
              disabled={disabled}
              chars={blank.w ? String(blank.w.value).length : 2}
              label="שלם"
            />
          )}
          <Fraction blank={blank} value={value} onChange={onChange} mark={mark} disabled={disabled} />
        </span>
      );
    case 'compare':
      return <Compare signs={blank.signs} value={value} onChange={onChange} mark={mark} disabled={disabled} />;
    case 'text':
      return (
        <Box
          value={value}
          onChange={onChange}
          mark={mark}
          disabled={disabled}
          chars={Math.max(5, ...blank.answers.map((a) => a.length + 1))}
          label="תשובה"
          numeric={false}
        />
      );
    default:
      return (
        <Box value={value} onChange={onChange} mark={mark} disabled={disabled} chars={blank.width <= 3 ? 4 : blank.width + 2} label="תשובה" />
      );
  }
}
