import MathRenderer from '../ui/MathRenderer';
import LessonSlider from '../lesson/LessonSlider';
import { num } from '../../lib/functionFamilies';

const PARAM_COLORS = ['var(--color-teal)', 'var(--color-sky)', 'var(--color-violet)'];

/**
 * סליידר לכל פרמטר. הסליידר זז על רשימת ערכים (ולא על טווח רציף),
 * כדי שאפשר יהיה לדלג על 0 כשהוא היה הופך את הפונקציה לסוג אחר.
 */
export default function ParamControls({ family, params, onChange, onReset }) {
  return (
    <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-[var(--color-slate)]">הפרמטרים</p>
        <button
          type="button"
          onClick={onReset}
          className="rounded-full px-3 py-1 text-xs font-bold text-[var(--color-teal)] ring-1 ring-[var(--color-teal)]/30 hover:bg-[var(--color-teal)]/8"
        >
          ↺ איפוס
        </button>
      </div>

      <div className="space-y-4">
        {family.params.map((p, i) => {
          const color = PARAM_COLORS[i % PARAM_COLORS.length];
          const index = Math.max(0, p.values.indexOf(params[p.key]));
          return (
            <div key={p.key}>
              <LessonSlider
                label={<MathRenderer inline>{`$${p.key}$`}</MathRenderer>}
                value={index}
                min={0}
                max={p.values.length - 1}
                onChange={(k) => onChange(p.key, p.values[k])}
                color={color}
                display={num(p.values[index])}
                width="w-6"
                ariaLabel={`הפרמטר ${p.key}`}
              />
              <MathRenderer inline className="mt-0.5 block ps-8 text-xs text-[var(--color-slate)]">
                {p.hint}
              </MathRenderer>
            </div>
          );
        })}
      </div>
    </div>
  );
}
