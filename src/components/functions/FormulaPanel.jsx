import MathRenderer from '../ui/MathRenderer';

/** הנוסחה עם הערכים שנבחרו, ומתג "הצג נגזרת" שמוסיף את f' — הכלל, הנוסחה, ותובנה. */
export default function FormulaPanel({ family, params, showDerivative, onToggleDerivative }) {
  return (
    <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-[var(--color-slate)]">הפונקציה</p>
        <button
          type="button"
          role="switch"
          aria-checked={showDerivative}
          onClick={onToggleDerivative}
          className="flex items-center gap-2 rounded-full text-sm font-bold text-[var(--color-ink)]"
        >
          <span
            className={`relative h-6 w-11 rounded-full transition ${showDerivative ? 'bg-[var(--color-coral)]' : 'bg-black/15'}`}
            aria-hidden="true"
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${showDerivative ? 'start-[1.375rem]' : 'start-0.5'}`}
            />
          </span>
          הצג נגזרת
        </button>
      </div>

      <div className="mt-3 overflow-x-auto overflow-y-hidden py-2 text-xl text-[var(--color-teal-dark)] sm:text-2xl">
        <MathRenderer inline>{`$f(x)=${family.tex(params)}$`}</MathRenderer>
      </div>

      {showDerivative && (
        <div className="mt-3 space-y-2 border-t border-black/5 pt-3">
          <div className="overflow-x-auto overflow-y-hidden py-2 text-xl text-[var(--color-coral-dark)] sm:text-2xl">
            <MathRenderer inline>{`$f'(x)=${family.dtex(params)}$`}</MathRenderer>
          </div>
          <p className="text-sm text-[var(--color-slate)]">
            כלל הגזירה: <MathRenderer inline>{`$${family.derivativeRule}$`}</MathRenderer>
          </p>
          <MathRenderer className="rounded-2xl bg-[var(--color-coral)]/8 p-3 text-sm text-[var(--color-ink)]">
            {`💡 ${family.insight(params)}`}
          </MathRenderer>
        </div>
      )}
    </div>
  );
}
