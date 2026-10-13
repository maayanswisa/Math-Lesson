import MathRenderer from '../ui/MathRenderer';
import { asymptoteTex } from '../../lib/functionFamilies';

function Row({ label, children }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
      <dt className="w-28 shrink-0 font-bold text-[var(--color-ink)]">{label}</dt>
      <dd className="text-[var(--color-ink)]">{children}</dd>
    </div>
  );
}

/** תחום הגדרה (ולמה), טווח ואסימפטוטות — מתעדכנים עם הפרמטרים. */
export default function DomainInfo({ family, params }) {
  const domain = family.domain(params);
  const asymptotes = family.asymptotes(params);

  return (
    <div className="rounded-3xl bg-[var(--color-sky)]/8 p-4 ring-1 ring-[var(--color-sky)]/25 sm:p-5">
      <p className="mb-3 flex items-center gap-2 font-bold text-[var(--color-sky-dark)]">
        <span aria-hidden="true">📐</span> תחום הגדרה ותכונות
      </p>
      <dl className="space-y-3 text-sm">
        <Row label="תחום הגדרה">
          <MathRenderer inline className="font-bold">
            {domain.set}
          </MathRenderer>
          <MathRenderer inline className="mt-0.5 block text-[var(--color-slate)]">
            {domain.why}
          </MathRenderer>
        </Row>
        <Row label="טווח">
          <MathRenderer inline>{family.range(params)}</MathRenderer>
        </Row>
        <Row label="אסימפטוטות">
          {asymptotes.length === 0 ? (
            <span className="text-[var(--color-slate)]">אין</span>
          ) : (
            <MathRenderer inline>
              {asymptotes.map((a) => `${a.axis === 'x' ? 'אנכית' : 'אופקית'} $${asymptoteTex(a)}$`).join(' · ')}
            </MathRenderer>
          )}
        </Row>
      </dl>
    </div>
  );
}
