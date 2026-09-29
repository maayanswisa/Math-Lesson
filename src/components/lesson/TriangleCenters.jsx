import { useState } from 'react';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider from './LessonSlider';

const MODES = {
  median: { name: 'תיכונים', point: 'מפגש התיכונים (כובד)', color: 'var(--color-teal)' },
  altitude: { name: 'גבהים', point: 'מפגש הגבהים', color: 'var(--color-coral)' },
  bisector: { name: 'חוצי זוויות', point: 'מרכז המעגל החסום', color: 'var(--color-violet)' },
  perp: { name: 'אנכים אמצעיים', point: 'מרכז המעגל החוסם', color: 'var(--color-sky-dark)' },
};

const mid = (P, Q) => ({ x: (P.x + Q.x) / 2, y: (P.y + Q.y) / 2 });
const dist = (P, Q) => Math.hypot(P.x - Q.x, P.y - Q.y);
// היטל של P על הישר QR
function foot(P, Q, R) {
  const dx = R.x - Q.x;
  const dy = R.y - Q.y;
  const t = ((P.x - Q.x) * dx + (P.y - Q.y) * dy) / (dx * dx + dy * dy);
  return { x: Q.x + t * dx, y: Q.y + t * dy };
}

/**
 * ארבעה סוגי קווים מיוחדים במשולש — ובכל סוג שלושת הקווים נפגשים בנקודה אחת.
 * מזיזים את הקודקוד C ורואים שהמפגש נשמר.
 */
export default function TriangleCenters({ caption, mode: m0 = 'median', modes = Object.keys(MODES) }) {
  const [mode, setMode] = useState(m0);
  const [cx, setCx] = useState(120);
  const [cy, setCy] = useState(40);
  const A = { x: 40, y: 200 };
  const B = { x: 260, y: 200 };
  const C = { x: cx, y: cy };
  const a = dist(B, C);
  const b = dist(A, C);
  const c = dist(A, B);
  const M = MODES[mode];

  let segs = [];
  let P;
  let circle = null;
  if (mode === 'median') {
    segs = [
      [A, mid(B, C)],
      [B, mid(A, C)],
      [C, mid(A, B)],
    ];
    P = { x: (A.x + B.x + C.x) / 3, y: (A.y + B.y + C.y) / 3 };
  } else if (mode === 'altitude') {
    segs = [
      [A, foot(A, B, C)],
      [B, foot(B, A, C)],
      [C, foot(C, A, B)],
    ];
    // מפגש הגבהים = A+B+C−2O
    const d = 2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
    const ux = ((A.x ** 2 + A.y ** 2) * (B.y - C.y) + (B.x ** 2 + B.y ** 2) * (C.y - A.y) + (C.x ** 2 + C.y ** 2) * (A.y - B.y)) / d;
    const uy = ((A.x ** 2 + A.y ** 2) * (C.x - B.x) + (B.x ** 2 + B.y ** 2) * (A.x - C.x) + (C.x ** 2 + C.y ** 2) * (B.x - A.x)) / d;
    P = { x: A.x + B.x + C.x - 2 * ux, y: A.y + B.y + C.y - 2 * uy };
    segs.push(...[A, B, C].map((V) => [V, P]));
  } else if (mode === 'bisector') {
    P = { x: (a * A.x + b * B.x + c * C.x) / (a + b + c), y: (a * A.y + b * B.y + c * C.y) / (a + b + c) };
    const s = (a + b + c) / 2;
    const area = Math.abs((B.x - A.x) * (C.y - A.y) - (C.x - A.x) * (B.y - A.y)) / 2;
    circle = { ...P, r: area / s };
    const onSide = (V, Q, R, lq, lr) => ({ x: Q.x + ((R.x - Q.x) * lq) / (lq + lr), y: Q.y + ((R.y - Q.y) * lq) / (lq + lr) });
    segs = [
      [A, onSide(A, B, C, c, b)],
      [B, onSide(B, A, C, c, a)],
      [C, onSide(C, A, B, b, a)],
    ];
  } else {
    const d = 2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
    P = {
      x: ((A.x ** 2 + A.y ** 2) * (B.y - C.y) + (B.x ** 2 + B.y ** 2) * (C.y - A.y) + (C.x ** 2 + C.y ** 2) * (A.y - B.y)) / d,
      y: ((A.x ** 2 + A.y ** 2) * (C.x - B.x) + (B.x ** 2 + B.y ** 2) * (A.x - C.x) + (C.x ** 2 + C.y ** 2) * (B.x - A.x)) / d,
    };
    circle = { ...P, r: dist(P, A) };
    segs = [mid(A, B), mid(B, C), mid(A, C)].map((Mp) => [Mp, P]);
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
      {modes.length > 1 && (
        <div className="mb-2 flex flex-wrap justify-center gap-2">
          {modes.map((k) => (
            <button
              key={k}
              onClick={() => setMode(k)}
              className={`rounded-full px-3 py-1 text-sm font-bold ${mode === k ? 'bg-[var(--color-teal)] text-white' : 'bg-[var(--color-mist)] text-[var(--color-ink)]'}`}
            >
              {MODES[k].name}
            </button>
          ))}
        </div>
      )}
      <svg viewBox="-20 -60 340 290" className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
        {circle && <circle cx={circle.x} cy={circle.y} r={circle.r} fill="none" stroke={M.color} strokeWidth="1.5" strokeDasharray="5 4" />}
        <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="rgba(13,110,110,0.06)" stroke="var(--color-ink)" strokeWidth="2" />
        {segs.map(([P1, P2], i) => (
          <line key={i} x1={P1.x} y1={P1.y} x2={P2.x} y2={P2.y} stroke={M.color} strokeWidth="2" />
        ))}
        <circle cx={P.x} cy={P.y} r="6" fill={M.color} stroke="white" strokeWidth="2" />
        {[
          [A, 'A', -14, 14],
          [B, 'B', 6, 14],
          [C, 'C', -4, -8],
        ].map(([V, l, dx, dy]) => (
          <text key={l} x={V.x + dx} y={V.y + dy} fontSize="13" fontWeight="700" fill="var(--color-ink)">
            {l}
          </text>
        ))}
      </svg>
      <div className="mt-2 space-y-1">
        <LessonSlider label="C ↔" value={cx} min={-10} max={300} step={5} onChange={setCx} display="" />
        <LessonSlider label="C ↕" value={-cy} min={-150} max={-5} step={5} onChange={(v) => setCy(-v)} display="" />
      </div>
      <p className="mt-2 text-center text-sm font-bold" style={{ color: M.color }}>
        ● {M.point} — שלושת הקווים תמיד נפגשים בנקודה אחת
      </p>
    </div>
  );
}
