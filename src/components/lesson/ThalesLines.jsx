import { useState } from 'react';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider, { fmt } from './LessonSlider';

/**
 * משפט תאלס: שתי שוקיים מקודקוד A, וישר DE המקביל ל-BC.
 * משנים את מיקום הישר ורואים שהיחסים על שתי השוקיים שווים.
 */
export default function ThalesLines({ caption, AB = 10, AC = 8 }) {
  const [t, setT] = useState(0.4);
  const A = { x: 150, y: 15 };
  const B = { x: 30, y: 215 };
  const C = { x: 280, y: 215 };
  const D = { x: A.x + t * (B.x - A.x), y: A.y + t * (B.y - A.y) };
  const E = { x: A.x + t * (C.x - A.x), y: A.y + t * (C.y - A.y) };
  const AD = t * AB;
  const DB = AB - AD;
  const AE = t * AC;
  const EC = AC - AE;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
      <svg viewBox="0 0 310 240" className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
        <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="rgba(13,110,110,0.05)" stroke="var(--color-ink)" strokeWidth="1.5" />
        <polygon points={`${A.x},${A.y} ${D.x},${D.y} ${E.x},${E.y}`} fill="rgba(124,77,204,0.14)" />
        <line x1={A.x} y1={A.y} x2={D.x} y2={D.y} stroke="var(--color-violet)" strokeWidth="4" />
        <line x1={D.x} y1={D.y} x2={B.x} y2={B.y} stroke="var(--color-coral)" strokeWidth="4" />
        <line x1={A.x} y1={A.y} x2={E.x} y2={E.y} stroke="var(--color-violet)" strokeWidth="4" />
        <line x1={E.x} y1={E.y} x2={C.x} y2={C.y} stroke="var(--color-coral)" strokeWidth="4" />
        <line x1={D.x} y1={D.y} x2={E.x} y2={E.y} stroke="var(--color-teal)" strokeWidth="3" />
        <line x1={B.x} y1={B.y} x2={C.x} y2={C.y} stroke="var(--color-teal)" strokeWidth="3" />
        {[
          [A, 'A', -4, -4],
          [B, 'B', -16, 4],
          [C, 'C', 6, 4],
          [D, 'D', -16, 0],
          [E, 'E', 8, 0],
        ].map(([P, l, dx, dy]) => (
          <text key={l} x={P.x + dx} y={P.y + dy} fontSize="13" fontWeight="700" fill="var(--color-ink)">
            {l}
          </text>
        ))}
      </svg>
      <LessonSlider label="DE" value={t} min={0.15} max={0.85} step={0.05} onChange={setT} display="" />
      <div className="mt-3 grid grid-cols-2 gap-2 text-center text-sm" dir="ltr">
        <div className="rounded-xl bg-[var(--color-mist)] p-2">
          <MathRenderer inline>{`$\\frac{AD}{DB}=\\frac{${fmt(AD)}}{${fmt(DB)}}=${fmt(AD / DB)}$`}</MathRenderer>
        </div>
        <div className="rounded-xl bg-[var(--color-mist)] p-2">
          <MathRenderer inline>{`$\\frac{AE}{EC}=\\frac{${fmt(AE)}}{${fmt(EC)}}=${fmt(AE / EC)}$`}</MathRenderer>
        </div>
      </div>
      <p className="mt-2 text-center text-xs font-semibold text-[var(--color-slate)]">
        <span dir="ltr">DE ∥ BC</span> — היחסים על שתי השוקיים תמיד שווים
      </p>
    </div>
  );
}
