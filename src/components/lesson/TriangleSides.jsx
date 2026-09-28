import { useState } from 'react';
import { motion } from 'framer-motion';

const W = 300;
const H = 190;
const COLORS = { a: 'var(--color-teal)', b: 'var(--color-sky)', c: 'var(--color-coral)' };

/**
 * שלוש צלעות עם סליידרים. אם אפשר — מצייר את המשולש ומסמן את הזווית הגדולה
 * (מול הצלע הארוכה). אם לא — מראה למה הצלעות "לא נסגרות".
 */
export default function TriangleSides({ caption, a: a0 = 5, b: b0 = 4, c: c0 = 3 }) {
  const [a, setA] = useState(a0);
  const [b, setB] = useState(b0);
  const [c, setC] = useState(c0);
  const sides = { a, b, c };
  const sorted = Object.entries(sides).sort((x, y) => y[1] - x[1]);
  const [longName, long] = sorted[0];
  const others = sorted[1][1] + sorted[2][1];
  const ok = long < others;
  const flat = long === others;

  // מציירים עם הצלע a כבסיס; הקודקוד העליון מחוק הקוסינוסים
  let tri = null;
  if (ok) {
    const cosB = (a * a + c * c - b * b) / (2 * a * c); // זווית בקצה השמאלי, בין a ל-c
    const angB = Math.acos(Math.max(-1, Math.min(1, cosB)));
    const P0 = { x: 0, y: 0 };
    const P1 = { x: a, y: 0 };
    const P2 = { x: c * Math.cos(angB), y: c * Math.sin(angB) };
    const xs = [P0.x, P1.x, P2.x];
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const k = Math.min((W - 40) / (maxX - minX), (H - 40) / Math.max(P2.y, 0.1));
    const T = (p) => ({ x: 20 + (p.x - minX) * k, y: H - 20 - p.y * k });
    tri = [T(P0), T(P1), T(P2)];
  }

  // הזווית הגדולה נמצאת מול הצלע הארוכה: a מול הקודקוד העליון, b מול P1, c מול P0
  const oppositeVertex = { a: 2, b: 0, c: 1 }[longName];

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <p className="mb-2 text-[var(--color-ink)]">{caption}</p>}

      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
        {tri ? (
          <>
            <motion.polygon
              initial={false}
              animate={{ points: tri.map((p) => `${p.x},${p.y}`).join(' ') }}
              fill="rgba(13,110,110,0.08)"
              stroke="none"
            />
            <motion.line initial={false} animate={{ x1: tri[0].x, y1: tri[0].y, x2: tri[1].x, y2: tri[1].y }} stroke={COLORS.a} strokeWidth="5" strokeLinecap="round" />
            <motion.line initial={false} animate={{ x1: tri[1].x, y1: tri[1].y, x2: tri[2].x, y2: tri[2].y }} stroke={COLORS.b} strokeWidth="5" strokeLinecap="round" />
            <motion.line initial={false} animate={{ x1: tri[2].x, y1: tri[2].y, x2: tri[0].x, y2: tri[0].y }} stroke={COLORS.c} strokeWidth="5" strokeLinecap="round" />
            <motion.circle initial={false} animate={{ cx: tri[oppositeVertex].x, cy: tri[oppositeVertex].y }} r="14" fill="rgba(226,160,32,0.35)" stroke="var(--color-sunshine)" strokeWidth="2" />
          </>
        ) : (
          <>
            <line x1="20" y1="120" x2={20 + long * 18} y2="120" stroke={COLORS[longName]} strokeWidth="6" strokeLinecap="round" />
            <line x1="20" y1="150" x2={20 + sorted[1][1] * 18} y2="150" stroke={COLORS[sorted[1][0]]} strokeWidth="6" strokeLinecap="round" />
            <line x1={20 + sorted[1][1] * 18} y1="150" x2={20 + others * 18} y2="150" stroke={COLORS[sorted[2][0]]} strokeWidth="6" strokeLinecap="round" />
            <text x="20" y="105" fontSize="12" fontWeight="700" fill="var(--color-coral)">
              {flat ? 'בדיוק שווים — המשולש "נשטח" לקו ישר' : 'שתי הקצרות ביחד קצרות מדי — לא נסגר!'}
            </text>
          </>
        )}
      </svg>

      <div className="mt-2 space-y-1">
        {Object.entries(sides).map(([name, v]) => (
          <label key={name} className="flex items-center gap-2 text-sm font-semibold">
            <span dir="ltr" className="w-6 italic" style={{ color: COLORS[name] }}>
              {name}
            </span>
            <input
              type="range"
              dir="ltr"
              min={1}
              max={12}
              value={v}
              onChange={(e) => ({ a: setA, b: setB, c: setC })[name](Number(e.target.value))}
              className="w-full"
              style={{ accentColor: COLORS[name] }}
            />
            <span className="w-6 text-center font-bold" style={{ color: COLORS[name] }}>
              {v}
            </span>
          </label>
        ))}
      </div>

      <p
        className={`mt-3 rounded-xl p-2 text-center text-sm font-bold ${
          ok ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]' : 'bg-[var(--color-coral)]/10 text-[var(--color-coral-dark)]'
        }`}
        dir="rtl"
      >
        <span dir="ltr">
          {long} {ok ? '<' : flat ? '=' : '>'} {sorted[1][1]} + {sorted[2][1]}
        </span>{' '}
        {ok ? '✔️ יש משולש' : '✖️ אין משולש'}
      </p>
      {ok && <p className="mt-1 text-center text-xs text-[var(--color-slate)]">העיגול הצהוב: הזווית הגדולה — תמיד מול הצלע הארוכה ({longName})</p>}
    </div>
  );
}
