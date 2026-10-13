import MathRenderer from '../ui/MathRenderer';
import { FAMILIES } from '../../lib/functionFamilies';

/** בחירת משפחת פונקציות: שם ונוסחה כללית לכל אחת. */
export default function FamilyPicker({ value, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5" role="group" aria-label="סוג הפונקציה">
      {FAMILIES.map((f) => {
        const active = f.id === value;
        return (
          <button
            key={f.id}
            type="button"
            onClick={() => onChange(f.id)}
            aria-pressed={active}
            aria-label={`פונקציה ${f.name}: ${f.general}`}
            className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-3 text-center transition ${
              active
                ? 'bg-[var(--color-teal)] text-white shadow-md'
                : 'bg-white text-[var(--color-ink)] shadow-sm ring-1 ring-black/5 hover:-translate-y-0.5 hover:ring-[var(--color-teal)]/40'
            }`}
          >
            <span className="text-sm font-bold">{f.name}</span>
            <span className={`text-xs ${active ? 'text-white/90' : 'text-[var(--color-slate)]'}`}>
              <MathRenderer inline>{`$${f.general}$`}</MathRenderer>
            </span>
          </button>
        );
      })}
    </div>
  );
}
