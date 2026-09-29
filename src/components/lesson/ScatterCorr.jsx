import { useMemo, useState } from 'react';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider, { fmt } from './LessonSlider';
import { makeScale } from './PlotAxes';

const N = 30;

// מספרים "אקראיים" קבועים (כדי שהגרף לא יקפוץ בכל רינדור)
function seeded(seed) {
  let t = seed;
  return () => {
    t = (t * 16807) % 2147483647;
    return (t - 1) / 2147483646;
  };
}
const rnd = seeded(12345);
const gauss = () => {
  const u = Math.max(1e-9, rnd());
  const v = rnd();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};
const BASE_X = Array.from({ length: N }, () => gauss());
const NOISE = Array.from({ length: N }, () => gauss());

function stats(pts) {
  const mx = pts.reduce((s, p) => s + p[0], 0) / pts.length;
  const my = pts.reduce((s, p) => s + p[1], 0) / pts.length;
  let sxy = 0;
  let sxx = 0;
  let syy = 0;
  for (const [x, y] of pts) {
    sxy += (x - mx) * (y - my);
    sxx += (x - mx) ** 2;
    syy += (y - my) ** 2;
  }
  const r = sxy / Math.sqrt(sxx * syy);
  const b = sxy / sxx;
  return { mx, my, r, b, a: my - b * mx };
}

/**
 * דיאגרמת פיזור עם סליידר לעוצמת הקשר. מציגה את מקדם המתאם r ואת קו הרגרסיה,
 * שעובר תמיד דרך נקודת הממוצעים. כפתור "קשר לא-לינארי" — פרבולה עם r≈0.
 */
export default function ScatterCorr({ caption, strength: s0 = 0.8, regression = true }) {
  const [k, setK] = useState(s0);
  const [curve, setCurve] = useState(false);

  const pts = useMemo(() => {
    if (curve) return BASE_X.map((x, i) => [50 + x * 12, 20 + (x * 12) ** 2 / 14 + NOISE[i] * 3]);
    const noise = Math.sqrt(Math.max(0, 1 - k * k));
    return BASE_X.map((x, i) => [50 + x * 12, 50 + (k * x + noise * NOISE[i]) * 12]);
  }, [k, curve]);
  const st = stats(pts);

  const s = makeScale({ W: 300, H: 240, x0: 10, x1: 90, y0: 10, y1: 90, pad: 18 });
  const clamp = (v) => Math.min(90, Math.max(10, v));
  const lineY = (x) => st.a + st.b * x;

  const strengthWord = Math.abs(st.r) > 0.8 ? 'חזק' : Math.abs(st.r) > 0.5 ? 'בינוני' : Math.abs(st.r) > 0.2 ? 'חלש' : 'כמעט אין';

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
      <svg viewBox={`0 0 ${s.W} ${s.H}`} className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
        <line x1={s.sx(10)} y1={s.sy(10)} x2={s.sx(90)} y2={s.sy(10)} stroke="var(--color-ink)" />
        <line x1={s.sx(10)} y1={s.sy(10)} x2={s.sx(10)} y2={s.sy(90)} stroke="var(--color-ink)" />
        <text x={s.sx(90)} y={s.sy(10) + 13} fontSize="11" fontStyle="italic" textAnchor="end" fill="var(--color-ink)">
          x
        </text>
        <text x={s.sx(10) - 10} y={s.sy(90) + 4} fontSize="11" fontStyle="italic" fill="var(--color-ink)">
          y
        </text>
        {regression && !curve && (
          <line x1={s.sx(10)} y1={s.sy(clamp(lineY(10)))} x2={s.sx(90)} y2={s.sy(clamp(lineY(90)))} stroke="var(--color-coral)" strokeWidth="2.5" />
        )}
        {pts.map(([x, y], i) => (
          <circle key={i} cx={s.sx(clamp(x))} cy={s.sy(clamp(y))} r="4" fill="var(--color-teal)" opacity="0.8" />
        ))}
        {regression && !curve && (
          <>
            <circle cx={s.sx(st.mx)} cy={s.sy(st.my)} r="7" fill="var(--color-sunshine)" stroke="white" strokeWidth="2" />
            <text x={s.sx(st.mx) + 9} y={s.sy(st.my) + 18} fontSize="10" fontWeight="700" fill="var(--color-sunshine-dark)">
              (x̄, ȳ)
            </text>
          </>
        )}
      </svg>

      {!curve && <LessonSlider label="עוצמה" value={k} min={-1} max={1} step={0.1} onChange={setK} color="var(--color-teal)" width="w-14" />}
      <div className="mt-2 flex justify-center">
        <button
          type="button"
          onClick={() => setCurve((c) => !c)}
          className={`rounded-xl px-3 py-1.5 text-sm font-bold ${curve ? 'bg-[var(--color-coral)] text-white' : 'bg-white text-[var(--color-slate)] ring-1 ring-black/10'}`}
        >
          {curve ? '↺ חזרה לקשר לינארי' : 'ומה עם קשר לא-לינארי? 🤔'}
        </button>
      </div>

      <div className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]">
        <span dir="ltr">r = {fmt(st.r)}</span> —{' '}
        {curve ? 'כמעט 0, למרות שיש קשר ברור (פרבולה)!' : `קשר ${strengthWord}${Math.abs(st.r) > 0.2 ? (st.r > 0 ? ' חיובי' : ' שלילי') : ''}`}
        {regression && !curve && (
          <span className="block text-xs font-semibold text-[var(--color-coral-dark)]">קו הרגרסיה (אדום) עובר דרך נקודת הממוצעים (צהוב)</span>
        )}
      </div>
    </div>
  );
}
