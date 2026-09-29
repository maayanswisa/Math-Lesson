import { useState } from 'react';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider, { fmt } from './LessonSlider';

const O = { x: 120, y: 125 };
const R = 55;
const rad = (d) => (d * Math.PI) / 180;
const deg = (r) => (r * 180) / Math.PI;
const on = (a, r = R, c = O) => ({ x: c.x + r * Math.cos(rad(a)), y: c.y - r * Math.sin(rad(a)) });

function rightMark(P, dirA, dirB, size = 9) {
  // ריבוע קטן בפינה P בין שני כיוונים (וקטורי יחידה)
  const a = { x: P.x + dirA.x * size, y: P.y + dirA.y * size };
  const c = { x: P.x + dirB.x * size, y: P.y + dirB.y * size };
  const b = { x: a.x + dirB.x * size, y: a.y + dirB.y * size };
  return `M${a.x},${a.y} L${b.x},${b.y} L${c.x},${c.y}`;
}

const unit = (p, q) => {
  const dx = q.x - p.x;
  const dy = q.y - p.y;
  const L = Math.hypot(dx, dy);
  return { x: dx / L, y: dy / L };
};

/** זווית פנימית בקודקוד V של מצולע, בין השכנים P ו-Q. */
function angleAt(V, P, Q) {
  const u = unit(V, P);
  const v = unit(V, Q);
  return deg(Math.acos(Math.max(-1, Math.min(1, u.x * v.x + u.y * v.y))));
}

/**
 * mode="tangents" — שני משיקים מנקודה חיצונית: שווים באורכם, ניצבים לרדיוס,
 * ו-PO חוצה את הזווית ביניהם.
 * mode="cyclic" — מרובע חסום במעגל: סכום כל זוג זוויות נגדיות 180°.
 */
export default function CircleTangents({ caption, mode = 'tangents' }) {
  const [d, setD] = useState(2); // מרחק P מהמרכז, ביחידות של רדיוס
  const [t, setT] = useState(70); // מיקום קודקוד D במרובע

  if (mode === 'cyclic') {
    const A = on(200);
    const B = on(320);
    const C = on(20);
    const D = on(t);
    const angs = { A: angleAt(A, D, B), B: angleAt(B, A, C), C: angleAt(C, B, D), D: angleAt(D, C, A) };
    const pts = { A, B, C, D };
    return (
      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
        {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
        <svg viewBox="0 0 240 250" className="mx-auto w-full max-w-xs" style={{ direction: 'ltr' }}>
          <circle cx={O.x} cy={O.y} r={R} fill="none" stroke="var(--color-slate)" strokeWidth="2" />
          <polygon
            points={[A, B, C, D].map((p) => `${p.x},${p.y}`).join(' ')}
            fill="rgba(13,110,110,0.1)"
            stroke="var(--color-teal)"
            strokeWidth="2.5"
          />
          {Object.entries(pts).map(([n, p]) => {
            const out = on(deg(Math.atan2(O.y - p.y, p.x - O.x)), R + 10);
            const anchor = out.x < O.x - 15 ? 'end' : out.x > O.x + 15 ? 'start' : 'middle';
            const col = n === 'A' || n === 'C' ? 'var(--color-violet)' : 'var(--color-coral)';
            return (
              <g key={n}>
                <circle cx={p.x} cy={p.y} r="4" fill={col} />
                <text x={out.x} y={out.y + (out.y > O.y ? 12 : out.y < O.y - R ? -2 : 4)} fontSize="12" fontWeight="800" textAnchor={anchor} fill={col}>
                  {n} {Math.round(angs[n])}°
                </text>
              </g>
            );
          })}
        </svg>
        <LessonSlider label="הזיזו D" value={t} min={35} max={165} onChange={setT} color="var(--color-coral)" width="w-16" />
        <div className="mt-3 grid gap-2 text-center text-sm font-bold sm:grid-cols-2">
          <p className="rounded-xl bg-[var(--color-violet)]/10 p-2 text-[var(--color-violet)]" dir="ltr">
            ∠A + ∠C = {Math.round(angs.A)}° + {Math.round(angs.C)}° = {Math.round(angs.A + angs.C)}°
          </p>
          <p className="rounded-xl bg-[var(--color-coral)]/10 p-2 text-[var(--color-coral-dark)]" dir="ltr">
            ∠B + ∠D = {Math.round(angs.B)}° + {Math.round(angs.D)}° = {Math.round(angs.B + angs.D)}°
          </p>
        </div>
      </div>
    );
  }

  const P = { x: O.x + d * R * 0.95, y: O.y };
  const dist = d * R * 0.95;
  const alpha = deg(Math.acos(R / dist)); // הזווית במרכז בין OP לרדיוס לנקודת ההשקה
  const T1 = on(alpha);
  const T2 = on(-alpha);
  const len = Math.sqrt(dist * dist - R * R) / R; // ביחידות של רדיוס
  const half = 90 - alpha;
  const W = Math.max(240, P.x + 20);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
      <svg viewBox={`0 0 ${W} 250`} className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
        <circle cx={O.x} cy={O.y} r={R} fill="rgba(13,110,110,0.06)" stroke="var(--color-slate)" strokeWidth="2" />
        <line x1={P.x} y1={P.y} x2={T1.x} y2={T1.y} stroke="var(--color-violet)" strokeWidth="3" />
        <line x1={P.x} y1={P.y} x2={T2.x} y2={T2.y} stroke="var(--color-violet)" strokeWidth="3" />
        <line x1={O.x} y1={O.y} x2={T1.x} y2={T1.y} stroke="var(--color-teal)" strokeWidth="2" />
        <line x1={O.x} y1={O.y} x2={T2.x} y2={T2.y} stroke="var(--color-teal)" strokeWidth="2" />
        <line x1={O.x} y1={O.y} x2={P.x} y2={P.y} stroke="var(--color-sunshine)" strokeWidth="2" strokeDasharray="6 4" />
        <path d={rightMark(T1, unit(T1, O), unit(T1, P))} fill="none" stroke="var(--color-coral)" strokeWidth="2" />
        <path d={rightMark(T2, unit(T2, O), unit(T2, P))} fill="none" stroke="var(--color-coral)" strokeWidth="2" />
        <circle cx={O.x} cy={O.y} r="4" fill="var(--color-ink)" />
        <circle cx={P.x} cy={P.y} r="5" fill="var(--color-violet)" />
        <text x={O.x - 14} y={O.y + 4} fontSize="12" fontWeight="700" fill="var(--color-ink)">
          O
        </text>
        <text x={P.x + 7} y={P.y + 4} fontSize="12" fontWeight="700" fill="var(--color-violet)">
          P
        </text>
        <text x={T1.x - 4} y={T1.y - 8} fontSize="12" fontWeight="700" fill="var(--color-teal)">
          A
        </text>
        <text x={T2.x - 4} y={T2.y + 18} fontSize="12" fontWeight="700" fill="var(--color-teal)">
          B
        </text>
      </svg>
      <LessonSlider label="מרחק P" value={d} min={1.2} max={3} step={0.1} onChange={setD} color="var(--color-violet)" width="w-16" />
      <div className="mt-3 grid gap-2 text-center text-sm font-bold sm:grid-cols-3">
        <p className="rounded-xl bg-[var(--color-violet)]/10 p-2 text-[var(--color-violet)]">
          <span dir="ltr">PA = PB = {fmt(len)}</span>
          <span className="block text-xs">משיקים שווים</span>
        </p>
        <p className="rounded-xl bg-[var(--color-coral)]/10 p-2 text-[var(--color-coral-dark)]">
          <span dir="ltr">OA ⊥ PA</span>
          <span className="block text-xs">רדיוס ניצב למשיק</span>
        </p>
        <p className="rounded-xl bg-[var(--color-sunshine)]/15 p-2 text-[var(--color-sunshine-dark)]">
          <span dir="ltr">∠APO = ∠BPO = {fmt(half)}°</span>
          <span className="block text-xs">PO חוצה את הזווית</span>
        </p>
      </div>
      <p className="mt-2 text-center text-xs text-[var(--color-slate)]">הרדיוס = 1 יחידה</p>
    </div>
  );
}
