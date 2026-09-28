import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';

const W = 320;
const H = 200;
const MARGIN = 28;
const EXT = 0.45; // אורך המשך הבסיס, ביחידות של אורך הבסיס
const rad = (d) => (d * Math.PI) / 180;

/** קשת זווית סביב נקודה, בין שתי זוויות (מעלות, נגד כיוון השעון; y כלפי מעלה). */
function arc(center, r, fromDeg, toDeg) {
  const p = (d) => `${center.x + r * Math.cos(rad(d))},${center.y - r * Math.sin(rad(d))}`;
  const large = Math.abs(toDeg - fromDeg) > 180 ? 1 : 0;
  return `M${p(fromDeg)} A${r},${r} 0 ${large} 0 ${p(toDeg)}`;
}

/**
 * משולש עם סליידרים לשתי זוויות. הזווית החיצונית בקודקוד B
 * (בין המשך הבסיס לצלע) שווה תמיד לסכום A + C — הזוויות הרחוקות.
 */
export default function ExteriorAngle({ caption }) {
  const [A, setA] = useState(50);
  const [B, setB] = useState(70);
  const C = 180 - A - B;
  const ext = 180 - B;

  // במרחב יחידה: בסיס מ-(0,0) ל-(1,0); הקודקוד העליון הוא חיתוך הקרניים
  // מ-P1 בזווית A ומ-P2 בזווית 180−B. אחר כך משנים קנה מידה שייכנס למסגרת
  // (בלי לעוות — כך הזוויות המצוירות נשארות נכונות).
  const t = Math.sin(rad(B)) / Math.sin(rad(A + B));
  const u = { x: t * Math.cos(rad(A)), y: t * Math.sin(rad(A)) };
  const minX = Math.min(0, u.x);
  const maxX = Math.max(1 + EXT, u.x);
  const k = Math.min((W - 2 * MARGIN) / (maxX - minX), (H - 2 * MARGIN) / u.y);
  const toPx = (p) => ({ x: MARGIN + (p.x - minX) * k, y: H - MARGIN - p.y * k });
  const P1 = toPx({ x: 0, y: 0 });
  const P2 = toPx({ x: 1, y: 0 });
  const clampedTop = toPx(u);
  const extEnd = toPx({ x: 1 + EXT, y: 0 });
  const BASE_Y = P1.y;

  const topDirFromP1 = A; // כיוון מ-P1 לקודקוד
  const dirTopToP1 = 180 + A;
  const dirTopToP2 = 360 - B;

  const setAngle = (setter, other) => (v) => {
    setter(Math.min(v, 170 - other));
  };

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}

      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
        <line x1={P2.x} y1={BASE_Y} x2={extEnd.x} y2={BASE_Y} stroke="var(--color-coral)" strokeWidth="2" strokeDasharray="5 4" />
        <motion.polygon
          initial={false}
          animate={{ points: `${P1.x},${P1.y} ${P2.x},${P2.y} ${clampedTop.x},${clampedTop.y}` }}
          transition={{ duration: 0.2 }}
          fill="rgba(13, 110, 110, 0.06)"
          stroke="var(--color-teal)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path d={arc(P1, 26, 0, topDirFromP1)} fill="none" stroke="var(--color-violet)" strokeWidth="3" />
        <path d={arc(P2, 22, 180 - B, 180)} fill="none" stroke="var(--color-slate)" strokeWidth="2" />
        <path d={arc(P2, 34, 0, 180 - B)} fill="none" stroke="var(--color-coral)" strokeWidth="3.5" />
        <path d={arc(clampedTop, 22, dirTopToP1, dirTopToP2)} fill="none" stroke="var(--color-sky)" strokeWidth="3" />

        <text x={P1.x + 32} y={BASE_Y - 8} fontSize="13" fontWeight="700" fill="var(--color-violet)">
          A={A}°
        </text>
        <text x={P2.x - 12} y={BASE_Y - 26} fontSize="11" textAnchor="end" fill="var(--color-slate)">
          B={B}°
        </text>
        <text x={P2.x + 40} y={BASE_Y - 20} fontSize="13" fontWeight="700" fill="var(--color-coral)">
          {ext}°
        </text>
        <text x={clampedTop.x} y={clampedTop.y - 8} fontSize="13" fontWeight="700" textAnchor="middle" fill="var(--color-sky)">
          C={C}°
        </text>
      </svg>

      <div className="mt-2 space-y-1">
        {[
          { label: 'A', value: A, set: setAngle(setA, B), color: 'var(--color-violet)' },
          { label: 'B', value: B, set: setAngle(setB, A), color: 'var(--color-slate)' },
        ].map((s) => (
          <label key={s.label} className="flex items-center gap-2 text-sm font-semibold">
            <span dir="ltr" className="w-16 whitespace-nowrap" style={{ color: s.color }}>
              זווית {s.label}
            </span>
            <input
              type="range"
              dir="ltr"
              min={20}
              max={130}
              step={5}
              value={s.value}
              onChange={(e) => s.set(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: s.color }}
            />
          </label>
        ))}
      </div>

      <div className="mt-3 text-center text-lg">
        <MathRenderer inline>{`$\\textcolor{#7c4dcc}{${A}°}+\\textcolor{#1670b3}{${C}°}=\\textcolor{#c45c48}{${ext}°}$`}</MathRenderer>
        <p className="mt-1 text-sm text-[var(--color-slate)]">הזווית החיצונית (אדום) = סכום שתי הזוויות הרחוקות ממנה</p>
      </div>
    </div>
  );
}
