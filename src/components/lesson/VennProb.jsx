import { useState } from 'react';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider, { fmt } from './LessonSlider';

/**
 * דיאגרמת ון עם סליידרים ל-P(A), P(B) ו-P(A∩B).
 * מחשבת איחוד, הסתברות מותנית, ובודקת אי-תלות: P(A∩B) = P(A)·P(B)?
 */
export default function VennProb({ caption, pa: a0 = 0.5, pb: b0 = 0.4, pab: ab0 = 0.2 }) {
  const [pa, setPa] = useState(a0);
  const [pb, setPb] = useState(b0);
  const [pabRaw, setPab] = useState(ab0);

  // החיתוך חסום: לא יותר מהקטן מביניהם, ולא פחות ממה שנדרש כדי שהאיחוד ≤ 1
  const lo = Math.max(0, pa + pb - 1);
  const hi = Math.min(pa, pb);
  const pab = Math.min(hi, Math.max(lo, pabRaw));
  const union = pa + pb - pab;
  const aGivenB = pb > 0 ? pab / pb : 0;
  const indep = Math.abs(pab - pa * pb) < 0.005;

  // מרחק בין מרכזי העיגולים לפי גודל החיתוך (הדמיה, לא בקנה מידה מדויק)
  const rA = 35 + pa * 45;
  const rB = 35 + pb * 45;
  const overlap = hi > 0 ? pab / hi : 0;
  const gap = rA + rB - overlap * Math.min(rA, rB) * 1.6 - 4;
  const cxA = Math.max(10 + rA, 150 - gap / 2);
  const cxB = Math.min(290 - rB, 150 + gap / 2);
  const midX = (cxA + rA + cxB - rB) / 2;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
      <svg viewBox="0 0 300 180" className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
        <rect x="4" y="4" width="292" height="172" rx="12" fill="rgba(74,93,115,0.05)" stroke="var(--color-slate)" />
        <text x="14" y="22" fontSize="12" fontWeight="700" fill="var(--color-slate)">
          U
        </text>
        <circle cx={cxA} cy="92" r={rA} fill="rgba(13,110,110,0.25)" stroke="var(--color-teal)" strokeWidth="2" />
        <circle cx={cxB} cy="92" r={rB} fill="rgba(196,92,72,0.22)" stroke="var(--color-coral)" strokeWidth="2" />
        <text x={cxA - rA * 0.45} y="96" fontSize="14" fontWeight="800" textAnchor="middle" fill="var(--color-teal-dark)">
          A
        </text>
        <text x={cxB + rB * 0.45} y="96" fontSize="14" fontWeight="800" textAnchor="middle" fill="var(--color-coral-dark)">
          B
        </text>
        {pab > 0 && (
          <text x={midX} y="96" fontSize="11" fontWeight="800" textAnchor="middle" fill="var(--color-ink)">
            {fmt(pab)}
          </text>
        )}
      </svg>

      <div className="mt-2 space-y-1">
        <LessonSlider
          label={<span dir="ltr">P(A)</span>}
          value={pa}
          min={0.05}
          max={0.95}
          step={0.05}
          onChange={setPa}
          color="var(--color-teal)"
          width="w-14"
        />
        <LessonSlider
          label={<span dir="ltr">P(B)</span>}
          value={pb}
          min={0.05}
          max={0.95}
          step={0.05}
          onChange={setPb}
          color="var(--color-coral)"
          width="w-14"
        />
        <LessonSlider
          label={<span dir="ltr">P(A∩B)</span>}
          value={pab}
          min={0}
          max={0.95}
          step={0.01}
          onChange={setPab}
          color="var(--color-violet)"
          width="w-14"
        />
      </div>

      <div className="mt-3 grid gap-2 text-center text-sm font-bold sm:grid-cols-3">
        <div className="rounded-xl bg-[var(--color-mist)] p-2" dir="ltr">
          <div className="text-xs font-semibold text-[var(--color-slate)]">P(A∪B)</div>
          {fmt(pa)} + {fmt(pb)} − {fmt(pab)} = {fmt(union)}
        </div>
        <div className="rounded-xl bg-[var(--color-mist)] p-2" dir="ltr">
          <div className="text-xs font-semibold text-[var(--color-slate)]">P(A|B)</div>
          {fmt(pab)} / {fmt(pb)} = {fmt(aGivenB)}
        </div>
        <div
          className={`rounded-xl p-2 ${indep ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]' : 'bg-[var(--color-coral)]/10 text-[var(--color-coral-dark)]'}`}
        >
          <div className="text-xs font-semibold" dir="ltr">
            P(A)·P(B) = {fmt(pa * pb)}
          </div>
          {indep ? 'בלתי תלויים ✔' : pab === 0 ? 'זרים (ולכן תלויים)' : 'תלויים'}
        </div>
      </div>
    </div>
  );
}
