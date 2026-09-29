import { useState } from 'react';
import { motion } from 'framer-motion';

const R = 100;
const C = { x: 150, y: 125 };
const rad = (d) => (d * Math.PI) / 180;
const onCircle = (deg, r = R) => ({ x: C.x + r * Math.cos(rad(deg)), y: C.y - r * Math.sin(rad(deg)) });
const angleAt = (V, P, Q) => {
  const a1 = Math.atan2(-(P.y - V.y), P.x - V.x);
  const a2 = Math.atan2(-(Q.y - V.y), Q.x - V.x);
  let d = Math.abs(a1 - a2) * (180 / Math.PI);
  if (d > 180) d = 360 - d;
  return d;
};

/**
 * משפטי מעגל.
 * mode 'inscribed' — קשת AB קבועה; מזיזים את P על המעגל: הזווית ההיקפית APB
 *   תמיד חצי מהזווית המרכזית AOB. אפשר גם לשנות את גודל הקשת (עד קוטר → 90°).
 * mode 'chord' — מזיזים מיתר קרוב/רחוק מהמרכז: האנך מהמרכז חוצה אותו,
 *   ומיתר קרוב למרכז ארוך יותר.
 */
export default function CircleTheorems({ caption, mode = 'inscribed' }) {
  const [arc, setArc] = useState(100); // גודל הקשת AB במעלות
  const [pos, setPos] = useState(0.5); // מיקום P לאורך הקשת הגדולה (0..1)
  const [dist, setDist] = useState(50); // מרחק המיתר מהמרכז (באחוזים מהרדיוס)

  if (mode === 'chord') {
    const dd = (dist / 100) * R;
    const half = Math.sqrt(R * R - dd * dd);
    const y = C.y + dd;
    const A = { x: C.x - half, y };
    const B = { x: C.x + half, y };
    const len = (2 * half) / R;
    return (
      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
        {caption && <p className="mb-2 text-[var(--color-ink)]">{caption}</p>}
        <svg viewBox="0 0 300 250" className="mx-auto w-full max-w-xs" style={{ direction: 'ltr' }}>
          <circle cx={C.x} cy={C.y} r={R} fill="rgba(13,110,110,0.06)" stroke="var(--color-teal)" strokeWidth="3" />
          <motion.line initial={false} animate={{ x1: A.x, x2: B.x, y1: y, y2: y }} stroke="var(--color-coral)" strokeWidth="4" />
          <motion.line initial={false} animate={{ y2: y }} x1={C.x} y1={C.y} x2={C.x} stroke="var(--color-violet)" strokeWidth="2.5" strokeDasharray="5 4" />
          {dd > 4 && <rect x={C.x} y={y - 10} width="10" height="10" fill="none" stroke="var(--color-violet)" strokeWidth="1.5" />}
          <circle cx={C.x} cy={C.y} r="4" fill="var(--color-ink)" />
          <text x={C.x - 8} y={C.y - 6} fontSize="12" fontWeight="700" fill="var(--color-ink)">O</text>
          <text x={(A.x + C.x) / 2} y={y + 18} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--color-coral)">{(len / 2).toFixed(2)}</text>
          <text x={(B.x + C.x) / 2} y={y + 18} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--color-coral)">{(len / 2).toFixed(2)}</text>
        </svg>
        <label className="mt-2 flex items-center gap-3 text-sm font-semibold text-[var(--color-ink)]">
          <span className="whitespace-nowrap">מרחק מהמרכז:</span>
          <input type="range" dir="ltr" min={0} max={95} step={5} value={dist} onChange={(e) => setDist(Number(e.target.value))} className="w-full accent-[var(--color-violet)]" />
        </label>
        <p className="mt-2 text-center text-sm font-semibold text-[var(--color-ink)]">
          אורך המיתר: {len.toFixed(2)} רדיוסים {dist === 0 ? '— זה הקוטר, המיתר הארוך ביותר!' : ''}
        </p>
        <p className="mt-1 text-center text-xs text-[var(--color-slate)]">האנך מהמרכז (סגול) חוצה את המיתר לשני חלקים שווים</p>
      </div>
    );
  }

  const aDeg = 270 - arc / 2;
  const bDeg = 270 + arc / 2;
  const A = onCircle(aDeg);
  const B = onCircle(bDeg);
  // P נע על הקשת הגדולה — מ-B, דרך למעלה, עד A (לא נוגע בקצוות)
  const P = onCircle(bDeg + (0.05 + 0.9 * pos) * (360 - arc));
  const central = arc;
  const inscribed = angleAt(P, A, B);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <p className="mb-2 text-[var(--color-ink)]">{caption}</p>}
      <svg viewBox="0 0 300 250" className="mx-auto w-full max-w-xs" style={{ direction: 'ltr' }}>
        <circle cx={C.x} cy={C.y} r={R} fill="rgba(13,110,110,0.05)" stroke="var(--color-teal)" strokeWidth="3" />
        <path
          d={`M${A.x},${A.y} A${R},${R} 0 ${arc > 180 ? 1 : 0},0 ${B.x},${B.y}`}
          fill="none"
          stroke="var(--color-sunshine)"
          strokeWidth="6"
        />
        <line x1={C.x} y1={C.y} x2={A.x} y2={A.y} stroke="var(--color-violet)" strokeWidth="2.5" />
        <line x1={C.x} y1={C.y} x2={B.x} y2={B.y} stroke="var(--color-violet)" strokeWidth="2.5" />
        <motion.line initial={false} animate={{ x1: P.x, y1: P.y }} x2={A.x} y2={A.y} stroke="var(--color-coral)" strokeWidth="2.5" />
        <motion.line initial={false} animate={{ x1: P.x, y1: P.y }} x2={B.x} y2={B.y} stroke="var(--color-coral)" strokeWidth="2.5" />
        <circle cx={C.x} cy={C.y} r="4" fill="var(--color-violet)" />
        <motion.circle initial={false} animate={{ cx: P.x, cy: P.y }} r="6" fill="var(--color-coral)" />
        <circle cx={A.x} cy={A.y} r="4" fill="var(--color-ink)" />
        <circle cx={B.x} cy={B.y} r="4" fill="var(--color-ink)" />
        <text x={A.x - 14} y={A.y + 14} fontSize="12" fontWeight="700">A</text>
        <text x={B.x + 6} y={B.y + 14} fontSize="12" fontWeight="700">B</text>
        <text x={C.x + 6} y={C.y - 6} fontSize="12" fontWeight="700" fill="var(--color-violet)">O</text>
        <motion.text initial={false} animate={{ x: P.x + (P.x < C.x ? -16 : 8), y: P.y + (P.y < C.y ? -6 : 16) }} fontSize="12" fontWeight="700" fill="var(--color-coral)">
          P
        </motion.text>
      </svg>

      <div className="mt-2 space-y-1">
        <label className="flex items-center gap-2 text-sm font-semibold">
          <span className="w-24 whitespace-nowrap text-[var(--color-coral)]">מזיזים את P</span>
          <input type="range" dir="ltr" min={0} max={1} step={0.01} value={pos} onChange={(e) => setPos(Number(e.target.value))} className="w-full accent-[var(--color-coral)]" />
        </label>
        <label className="flex items-center gap-2 text-sm font-semibold">
          <span className="w-24 whitespace-nowrap text-[var(--color-sunshine-dark)]">גודל הקשת</span>
          <input type="range" dir="ltr" min={40} max={180} step={10} value={arc} onChange={(e) => setArc(Number(e.target.value))} className="w-full accent-[var(--color-sunshine)]" />
        </label>
      </div>

      <div className="mt-3 grid gap-2 text-center text-sm font-bold sm:grid-cols-2">
        <span className="rounded-xl bg-[var(--color-violet)]/10 p-2 text-[var(--color-violet-dark)]">זווית מרכזית AOB: {central.toFixed(0)}°</span>
        <span className="rounded-xl bg-[var(--color-coral)]/10 p-2 text-[var(--color-coral-dark)]">זווית היקפית APB: {inscribed.toFixed(0)}°</span>
      </div>
      <p className="mt-2 text-center text-sm font-semibold text-[var(--color-ink)]">
        {arc === 180 ? 'AB הוא קוטר — הזווית ההיקפית ישרה (90°)!' : 'ההיקפית תמיד חצי מהמרכזית — לא משנה איפה P.'}
      </p>
    </div>
  );
}
