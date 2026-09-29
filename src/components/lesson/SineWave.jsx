import { useState } from 'react';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider, { fmt } from './LessonSlider';
import { fnPath, makeScale, usePlotClip } from './PlotAxes';

const s = makeScale({ W: 300, H: 220, x0: -0.4, x1: 4 * Math.PI, y0: -5, y1: 5 });
const PI_TICKS = [1, 2, 3, 4];

function signed(v, tex = fmt(v)) {
  if (v === 0) return '';
  return v > 0 ? `+${tex}` : `-${tex.replace('-', '')}`;
}

/**
 * f(x) = A·sin(Bx + C) + D מול sin x (מקווקו).
 * A — משרעת, B — מחזור 2π/|B|, C — הזזה אופקית, D — הזזה אנכית.
 */
export default function SineWave({ caption }) {
  const [A, setA] = useState(2);
  const [B, setB] = useState(1);
  const [C, setC] = useState(0);
  const [D, setD] = useState(0);
  const { defs, clip } = usePlotClip(s);

  const f = (x) => A * Math.sin(B * x + C) + D;
  const period = (2 * Math.PI) / Math.abs(B);
  const tex = `f(x)=${A === 1 ? '' : A === -1 ? '-' : fmt(A)}\\sin(${B === 1 ? '' : fmt(B)}x${signed(C)})${signed(D)}`;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
      <div className="mb-1 text-center">
        <MathRenderer inline>{`$${tex}$`}</MathRenderer>
      </div>
      <svg viewBox={`0 0 ${s.W} ${s.H}`} className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
        {defs}
        {[-4, -2, 2, 4].map((y) => (
          <g key={y}>
            <line x1={s.sx(s.x0)} y1={s.sy(y)} x2={s.sx(s.x1)} y2={s.sy(y)} stroke="#eef1f5" />
            <text x={s.sx(0) - 4} y={s.sy(y) + 3} fontSize="9" textAnchor="end" fill="var(--color-slate)">
              {y}
            </text>
          </g>
        ))}
        {PI_TICKS.map((k) => (
          <g key={k}>
            <line x1={s.sx(k * Math.PI)} y1={s.sy(s.y0)} x2={s.sx(k * Math.PI)} y2={s.sy(s.y1)} stroke="#eef1f5" />
            <text x={s.sx(k * Math.PI)} y={s.sy(0) + 12} fontSize="9" textAnchor="middle" fill="var(--color-slate)">
              {k === 1 ? 'π' : `${k}π`}
            </text>
          </g>
        ))}
        <line x1={s.sx(s.x0)} y1={s.sy(0)} x2={s.sx(s.x1)} y2={s.sy(0)} stroke="var(--color-ink)" strokeWidth="1.5" />
        <line x1={s.sx(0)} y1={s.sy(s.y0)} x2={s.sx(0)} y2={s.sy(s.y1)} stroke="var(--color-ink)" strokeWidth="1.5" />
        <g clipPath={clip}>
          <line x1={s.sx(s.x0)} y1={s.sy(D)} x2={s.sx(s.x1)} y2={s.sy(D)} stroke="var(--color-sunshine)" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d={fnPath(Math.sin, s)} fill="none" stroke="var(--color-slate)" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.6" />
          <path d={fnPath(f, s, { step: 0.02 })} fill="none" stroke="var(--color-teal)" strokeWidth="3" />
        </g>
      </svg>

      <div className="mt-2 space-y-1">
        <LessonSlider label="A" value={A} min={-4} max={4} step={0.5} onChange={setA} color="var(--color-teal)" />
        <LessonSlider label="B" value={B} min={0.5} max={3} step={0.5} onChange={setB} color="var(--color-violet)" />
        <LessonSlider label="C" value={C} min={-3} max={3} step={0.5} onChange={setC} color="var(--color-coral)" />
        <LessonSlider label="D" value={D} min={-2} max={2} step={0.5} onChange={setD} color="var(--color-sunshine-dark)" />
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs font-bold">
        <div className="rounded-xl bg-[var(--color-teal)]/10 p-2 text-[var(--color-teal-dark)]">
          משרעת
          <div className="text-sm" dir="ltr">
            |A| = {fmt(Math.abs(A))}
          </div>
        </div>
        <div className="rounded-xl bg-[var(--color-violet)]/10 p-2 text-[var(--color-violet)]">
          מחזור
          <div className="text-sm" dir="ltr">
            2π/{fmt(B)} ≈ {fmt(period)}
          </div>
        </div>
        <div className="rounded-xl bg-[var(--color-sunshine)]/15 p-2 text-[var(--color-sunshine-dark)]">
          טווח
          <div className="text-sm" dir="ltr">
            [{fmt(D - Math.abs(A))}, {fmt(D + Math.abs(A))}]
          </div>
        </div>
      </div>
    </div>
  );
}
