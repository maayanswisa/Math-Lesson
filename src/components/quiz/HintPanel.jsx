import MathRenderer from '../ui/MathRenderer';

/** Reveal progressive hints one at a time. */
export default function HintPanel({ hints = [], revealed = 0, onReveal }) {
  if (!hints.length) return null;
  const canReveal = revealed < hints.length;

  return (
    <div className="mt-4 space-y-2 rounded-xl bg-[var(--color-mist)]/50 p-4" dir="rtl">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-[var(--color-teal)]">רמזים</p>
        {canReveal && (
          <button
            type="button"
            onClick={onReveal}
            className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-[var(--color-teal)] ring-1 ring-[var(--color-teal)]/30 hover:bg-[var(--color-teal)]/5"
          >
            {revealed === 0 ? 'רמז ראשון' : revealed === 1 ? 'רמז נוסף' : 'רמז אחרון'}
          </button>
        )}
      </div>
      {revealed === 0 && (
        <p className="text-xs text-[var(--color-slate)]">לחצו על הכפתור כדי לחשוף רמז בהדרגה</p>
      )}
      <ul className="space-y-2">
        {hints.slice(0, revealed).map((h, i) => (
          <li
            key={i}
            className={`rounded-lg px-3 py-2 text-sm ${
              i === revealed - 1
                ? 'hint-highlight bg-[var(--color-teal)]/10 ring-1 ring-[var(--color-teal)]/30'
                : 'bg-white/70'
            }`}
          >
            <span className="mb-1 block text-xs font-medium text-[var(--color-slate)]">
              רמז {i + 1}
            </span>
            <MathRenderer className="text-[var(--color-ink)]">{h}</MathRenderer>
          </li>
        ))}
      </ul>
    </div>
  );
}
