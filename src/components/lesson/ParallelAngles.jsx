import { useState } from 'react';

const rad = (d) => (d * Math.PI) / 180;
const PAIRS = {
  alternate: { name: 'זוויות מתחלפות', note: 'בצדדים שונים של החותך, בין המקבילים — שוות', idx: [2, 4] },
  corresponding: { name: 'זוויות מתאימות', note: 'באותו "מקום" בכל צומת — שוות', idx: [0, 4] },
  interior: { name: 'זוויות חד-צדדיות', note: 'באותו צד, בין המקבילים — משלימות ל-180°', idx: [3, 4] },
};

/**
 * שני ישרים מקבילים וחותך. סליידר לזווית החותך; בוחרים זוג זוויות
 * (מתחלפות / מתאימות / חד-צדדיות) ורואים אותן מודגשות עם הערכים.
 */
export default function ParallelAngles({ caption }) {
  const [ang, setAng] = useState(60);
  const [pair, setPair] = useState('alternate');
  const Y1 = 60;
  const Y2 = 140;
  // נקודות חיתוך של החותך עם שני הישרים
  const dx = (Y2 - Y1) / Math.tan(rad(ang));
  const X1 = 150 + dx / 2;
  const X2 = 150 - dx / 2;

  // 4 זוויות בכל צומת: 0=למעלה-ימין, 1=למעלה-שמאל, 2=למטה-שמאל, 3=למטה-ימין (צומת עליון: 0..3, תחתון: 4..7)
  const values = [ang, 180 - ang, ang, 180 - ang];
  const all = [...values, ...values];
  const sel = PAIRS[pair].idx;

  // קשת לזווית i בצומת V: בין כיוון הישר (0°/180°) לכיוון החותך (ang / ang+180)
  const arcFor = (i, V) => {
    const k = i % 4;
    const [from, to] = [
      [0, ang],
      [ang, 180],
      [180, 180 + ang],
      [180 + ang, 360],
    ][k];
    const r = 20;
    const p = (d) => `${(V.x + r * Math.cos(rad(d))).toFixed(1)},${(V.y - r * Math.sin(rad(d))).toFixed(1)}`;
    return `M${V.x},${V.y} L${p(from)} A${r},${r} 0 0,0 ${p(to)} Z`;
  };

  const top = { x: X1, y: Y1 };
  const bot = { x: X2, y: Y2 };
  const colors = ['var(--color-coral)', 'var(--color-sky)'];

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <p className="mb-2 text-[var(--color-ink)]">{caption}</p>}

      <div className="mb-3 flex flex-wrap justify-center gap-2">
        {Object.entries(PAIRS).map(([k, v]) => (
          <button
            key={k}
            type="button"
            onClick={() => setPair(k)}
            className={`rounded-xl px-3 py-1.5 text-sm font-bold ring-1 ${
              pair === k ? 'bg-[var(--color-teal)] text-white ring-[var(--color-teal)]' : 'bg-white text-[var(--color-ink)] ring-black/10'
            }`}
          >
            {v.name}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 300 200" className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
        <line x1="10" y1={Y1} x2="290" y2={Y1} stroke="var(--color-ink)" strokeWidth="3" />
        <line x1="10" y1={Y2} x2="290" y2={Y2} stroke="var(--color-ink)" strokeWidth="3" />
        <text x="280" y={Y1 - 6} fontSize="12" fill="var(--color-slate)">▶</text>
        <text x="280" y={Y2 - 6} fontSize="12" fill="var(--color-slate)">▶</text>
        <line
          x1={X1 + (Y1 - 10) / Math.tan(rad(ang))}
          y1="10"
          x2={X2 - (190 - Y2) / Math.tan(rad(ang))}
          y2="190"
          stroke="var(--color-violet)"
          strokeWidth="3"
        />
        {sel.map((i, j) => (
          <path key={i} d={arcFor(i, i < 4 ? top : bot)} fill={colors[j]} opacity="0.55" />
        ))}
        {sel.map((i, j) => {
          const V = i < 4 ? top : bot;
          const mid = [ang / 2, (ang + 180) / 2, 180 + ang / 2, (180 + ang + 360) / 2][i % 4];
          return (
            <text key={`t${i}`} x={V.x + 34 * Math.cos(rad(mid))} y={V.y - 34 * Math.sin(rad(mid)) + 4} textAnchor="middle" fontSize="12" fontWeight="800" fill={colors[j]}>
              {all[i]}°
            </text>
          );
        })}
      </svg>

      <label className="mt-2 flex items-center gap-3 text-sm font-semibold text-[var(--color-ink)]">
        <span className="whitespace-nowrap">שיפוע החותך:</span>
        <input type="range" dir="ltr" min={30} max={150} step={5} value={ang} onChange={(e) => setAng(Number(e.target.value))} className="w-full accent-[var(--color-violet)]" />
      </label>
      <p className="mt-2 text-center text-sm font-bold text-[var(--color-ink)]">
        {PAIRS[pair].name}: {PAIRS[pair].note}
      </p>
    </div>
  );
}
