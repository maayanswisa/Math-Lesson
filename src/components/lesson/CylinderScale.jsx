import { useState } from 'react';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider from './LessonSlider';
import { K, cylinderSide, fmt, halfEllipse, piTex } from './solidShapes';

const W = 340;
const H = 196;
const BASE = 158;
const OLD = '#9aa5b4';
const TEAL = 'var(--color-teal)';
const SKY = 'var(--color-sky)';
const CORAL = 'var(--color-coral)';

const MODES = [
  { id: 'mul', label: 'שינוי כפלי (פי…)' },
  { id: 'add', label: 'שינוי חיבורי (עוד…)' },
];

const parts = (r, h) => ({ bases: 2 * r * r, lateral: 2 * r * h, total: 2 * r * r + 2 * r * h, volume: r * r * h });
const ratio = (a, b) => fmt(Math.round((a / b) * 100) / 100);

/** שרטוט גליל במקום נתון. */
function Cyl({ x, r, h, s, color, label }) {
  const a = r * s;
  const b = a * K;
  return (
    <g>
      <path d={halfEllipse(x, BASE, a, b, 'back')} fill="none" stroke={color} strokeWidth="1.2" strokeDasharray="4 3" />
      <path d={cylinderSide(x, BASE, a, b, h * s)} fill={color} fillOpacity="0.18" stroke={color} strokeWidth="2" />
      <ellipse cx={x} cy={BASE - h * s} rx={a} ry={b} fill={color} fillOpacity="0.3" stroke={color} strokeWidth="2" />
      <text x={x} y={BASE + b + 13} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={color}>
        {label}
      </text>
    </g>
  );
}

/**
 * משנים את הרדיוס ו/או את הגובה של גליל — בכפל (פי k) או בחיבור (עוד d) —
 * ומשווים את שטח הבסיסים, המעטפת, שטח הפנים והנפח לפני ואחרי.
 */
export default function CylinderScale({ caption, r: r0 = 2, h: h0 = 3 }) {
  const [mode, setMode] = useState('mul');
  const [kr, setKr] = useState(2);
  const [kh, setKh] = useState(2);
  const [dr, setDr] = useState(1);
  const [dh, setDh] = useState(0);

  const r1 = mode === 'mul' ? r0 * kr : r0 + dr;
  const h1 = mode === 'mul' ? h0 * kh : h0 + dh;
  const before = parts(r0, h0);
  const after = parts(r1, h1);

  const s = Math.min(70 / Math.max(r0, r1), 120 / (Math.max(h0, h1) + 2 * K * Math.max(r0, r1)));

  let insight;
  if (mode === 'mul' && kr === kh && kr !== 1) {
    insight = `הגדלנו את כל הממדים פי ${fmt(kr)}: שטח הפנים השתנה פי ${fmt(kr * kr)} (כלומר פי ${fmt(kr)} בריבוע), והנפח פי ${fmt(kr ** 3)} (פי ${fmt(kr)} בחזקת 3).`;
  } else if (mode === 'mul' && kr === 1 && kh !== 1) {
    insight = `רק הגובה השתנה פי ${fmt(kh)}: המעטפת השתנתה פי ${fmt(kh)}, אבל הבסיסים לא השתנו — ולכן שטח הפנים השתנה פי ${ratio(after.total, before.total)} בלבד.`;
  } else if (mode === 'mul' && kh === 1 && kr !== 1) {
    insight = `רק הרדיוס השתנה פי ${fmt(kr)}: הבסיסים השתנו פי ${fmt(kr * kr)}, המעטפת פי ${fmt(kr)} — ושטח הפנים פי ${ratio(after.total, before.total)}.`;
  } else if (mode === 'mul') {
    insight = kr === 1 ? 'לא שינינו כלום — הזיזו את אחד הסליידרים.' : `שטח הפנים השתנה פי ${ratio(after.total, before.total)}.`;
  } else if (dr === 0 && dh === 0) {
    insight = 'לא שינינו כלום — הזיזו את אחד הסליידרים.';
  } else {
    insight = `בשינוי חיבורי אין "פי" קבוע — מחשבים לפני ואחרי. כאן שטח הפנים גדל ב-${fmt(after.total - before.total)}π, כלומר פי ${ratio(after.total, before.total)}.`;
  }

  const rows = [
    ['רדיוס', null, r0, r1, false],
    ['גובה', null, h0, h1, false],
    ['שני הבסיסים', '2\\pi r^2', before.bases, after.bases, true],
    ['המעטפת', '2\\pi rh', before.lateral, after.lateral, true],
    ['שטח הפנים', '2\\pi r^2+2\\pi rh', before.total, after.total, true],
    ['נפח', '\\pi r^2h', before.volume, after.volume, true],
  ];

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}

      <div className="mb-2 flex flex-wrap justify-center gap-2">
        {MODES.map((md) => (
          <button
            key={md.id}
            type="button"
            onClick={() => setMode(md.id)}
            aria-pressed={mode === md.id}
            className={`rounded-xl px-3 py-1.5 text-sm font-bold ${mode === md.id ? 'bg-[var(--color-teal)] text-white' : 'bg-white text-[var(--color-slate)] ring-1 ring-black/10'}`}
          >
            {md.label}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-md" style={{ direction: 'ltr' }} role="img" aria-label="גליל לפני השינוי ואחריו">
        <Cyl x={250} r={r0} h={h0} s={s} color={OLD} label="לפני" />
        <Cyl x={85} r={r1} h={h1} s={s} color={TEAL} label="אחרי" />
      </svg>

      <div className="mt-2 space-y-1">
        {mode === 'mul' ? (
          <>
            <LessonSlider label="רדיוס פי" value={kr} min={0.5} max={3} step={0.5} onChange={setKr} color={SKY} width="w-16" />
            <LessonSlider label="גובה פי" value={kh} min={0.5} max={3} step={0.5} onChange={setKh} color={CORAL} width="w-16" />
          </>
        ) : (
          <>
            <LessonSlider label="לרדיוס עוד" value={dr} min={0} max={4} onChange={setDr} color={SKY} width="w-16" />
            <LessonSlider label="לגובה עוד" value={dh} min={0} max={4} onChange={setDh} color={CORAL} width="w-16" />
          </>
        )}
      </div>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-center text-sm">
          <thead>
            <tr className="text-[var(--color-slate)]">
              <th className="p-1.5 text-start" />
              <th className="p-1.5">לפני</th>
              <th className="p-1.5">אחרי</th>
              <th className="p-1.5">פי כמה?</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([name, tex, b, a, isPi]) => (
              <tr key={name} className={name === 'שטח הפנים' ? 'bg-[rgba(13,110,110,0.08)] font-bold' : 'border-t border-black/5'}>
                <td className="p-1.5 text-start">
                  {name}
                  {tex && (
                    <span className="ms-1 text-xs text-[var(--color-slate)]">
                      <MathRenderer inline>{`$${tex}$`}</MathRenderer>
                    </span>
                  )}
                </td>
                <td className="p-1.5">
                  <MathRenderer inline>{`$${isPi ? piTex(b) : fmt(b)}$`}</MathRenderer>
                </td>
                <td className="p-1.5">
                  <MathRenderer inline>{`$${isPi ? piTex(a) : fmt(a)}$`}</MathRenderer>
                </td>
                <td className="p-1.5" dir="ltr">
                  {`×${ratio(a, b)}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 rounded-xl p-2.5 text-sm font-semibold text-[var(--color-ink)]" style={{ backgroundColor: 'var(--color-mist)' }}>
        {insight}
      </p>
    </div>
  );
}
