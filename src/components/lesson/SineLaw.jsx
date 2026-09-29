import { useState } from 'react';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider, { fmt } from './LessonSlider';

const C0 = { x: 150, y: 125 };
const PX = 95; // פיקסלים לרדיוס
const rad = (d) => (d * Math.PI) / 180;

/**
 * משולש חסום במעגל ברדיוס R. משנים שתי זוויות — ורואים שכל צלע חלקי הסינוס
 * של הזווית שמולה יוצא תמיד 2R. ובונוס: שטח = ½·a·b·sin C.
 */
export default function SineLaw({ caption, showArea = false }) {
  const [A, setA] = useState(50);
  const [B, setB] = useState(70);
  const [R, setR] = useState(5);
  const Cang = 180 - A - B;
  const ok = Cang >= 10;

  // מיקום על המעגל: הקשת שמול כל זווית היא פי 2 ממנה
  const base = 210;
  const P = (t) => ({ x: C0.x + PX * Math.cos(rad(t)), y: C0.y - PX * Math.sin(rad(t)) });
  const vB = P(base);
  const vC = P(base + 2 * A);
  const vA = P(base + 2 * A + 2 * B);

  const a = 2 * R * Math.sin(rad(A));
  const b = 2 * R * Math.sin(rad(B));
  const c = 2 * R * Math.sin(rad(Cang));
  const area = 0.5 * a * b * Math.sin(rad(Cang));

  const mid = (p, q) => ({ x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 });
  const push = (p) => {
    const dx = p.x - C0.x;
    const dy = p.y - C0.y;
    const L = Math.hypot(dx, dy) || 1;
    return { x: C0.x + (dx / L) * (L + 14), y: C0.y + (dy / L) * (L + 14) };
  };

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
      <svg viewBox="0 0 300 250" className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
        <circle cx={C0.x} cy={C0.y} r={PX} fill="none" stroke="var(--color-slate)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1={C0.x} y1={C0.y} x2={C0.x + PX} y2={C0.y} stroke="var(--color-sunshine)" strokeWidth="2" />
        <text x={C0.x + PX / 2} y={C0.y - 5} fontSize="11" fontWeight="700" textAnchor="middle" fill="var(--color-sunshine-dark)">
          R
        </text>
        {ok && (
          <>
            <polygon points={[vA, vB, vC].map((p) => `${p.x},${p.y}`).join(' ')} fill="rgba(13,110,110,0.08)" stroke="none" />
            <line x1={vB.x} y1={vB.y} x2={vC.x} y2={vC.y} stroke="var(--color-teal)" strokeWidth="3" />
            <line x1={vC.x} y1={vC.y} x2={vA.x} y2={vA.y} stroke="var(--color-violet)" strokeWidth="3" />
            <line x1={vA.x} y1={vA.y} x2={vB.x} y2={vB.y} stroke="var(--color-coral)" strokeWidth="3" />
            {[
              ['A', vA],
              ['B', vB],
              ['C', vC],
            ].map(([n, p]) => {
              const q = push(p);
              return (
                <text key={n} x={q.x} y={q.y + 4} fontSize="13" fontWeight="800" textAnchor="middle" fill="var(--color-ink)">
                  {n}
                </text>
              );
            })}
            {[
              ['a', mid(vB, vC), 'var(--color-teal)'],
              ['b', mid(vC, vA), 'var(--color-violet)'],
              ['c', mid(vA, vB), 'var(--color-coral)'],
            ].map(([n, p, col]) => (
              <text
                key={n}
                x={p.x}
                y={p.y + 4}
                fontSize="12"
                fontStyle="italic"
                fontWeight="800"
                textAnchor="middle"
                fill={col}
                stroke="white"
                strokeWidth="3"
                paintOrder="stroke"
              >
                {n}
              </text>
            ))}
          </>
        )}
      </svg>

      <div className="space-y-1">
        <LessonSlider label={<span dir="ltr">∠A</span>} value={A} min={20} max={120} step={5} onChange={setA} color="var(--color-teal)" suffix="°" />
        <LessonSlider label={<span dir="ltr">∠B</span>} value={B} min={20} max={120} step={5} onChange={setB} color="var(--color-violet)" suffix="°" />
        <LessonSlider label="R" value={R} min={2} max={8} onChange={setR} color="var(--color-sunshine-dark)" />
      </div>

      {ok ? (
        <div className="mt-3 space-y-1 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]" dir="ltr">
          <div>
            <span className="text-[var(--color-teal)]">
              a/sin{A}° = {fmt(a)}/{fmt(Math.sin(rad(A)))}
            </span>{' '}
            ={' '}
            <span className="text-[var(--color-violet)]">
              b/sin{B}° = {fmt(b)}/{fmt(Math.sin(rad(B)))}
            </span>{' '}
            ={' '}
            <span className="text-[var(--color-coral)]">
              c/sin{Cang}° = {fmt(c)}/{fmt(Math.sin(rad(Cang)))}
            </span>
          </div>
          <div className="text-base text-[var(--color-success)]">= {2 * R} = 2R</div>
          {showArea && (
            <div className="text-[var(--color-sunshine-dark)]">
              S = ½·a·b·sin C = ½·{fmt(a)}·{fmt(b)}·{fmt(Math.sin(rad(Cang)))} ≈ {fmt(area)}
            </div>
          )}
        </div>
      ) : (
        <p className="mt-3 rounded-xl bg-[var(--color-coral)]/10 p-2 text-center text-sm font-bold text-[var(--color-coral-dark)]">
          סכום שתי הזוויות גדול מדי — לא נשאר מקום לזווית שלישית!
        </p>
      )}
    </div>
  );
}
