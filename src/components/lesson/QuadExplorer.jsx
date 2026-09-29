import { useState } from 'react';
import { motion } from 'framer-motion';

// קודקודים (ABCD) בקואורדינטות מסך, ותכונות האלכסונים
const SHAPES = {
  parallelogram: {
    name: 'מקבילית',
    pts: [[40, 150], [200, 150], [260, 50], [100, 50]],
    props: { bisect: true, equal: false, perpendicular: false },
  },
  rectangle: {
    name: 'מלבן',
    pts: [[50, 150], [250, 150], [250, 50], [50, 50]],
    props: { bisect: true, equal: true, perpendicular: false },
  },
  rhombus: {
    name: 'מעוין',
    pts: [[150, 170], [240, 100], [150, 30], [60, 100]],
    props: { bisect: true, equal: false, perpendicular: true },
  },
  square: {
    name: 'ריבוע',
    pts: [[90, 160], [210, 160], [210, 40], [90, 40]],
    props: { bisect: true, equal: true, perpendicular: true },
  },
  kite: {
    name: 'דלתון',
    pts: [[150, 180], [230, 80], [150, 30], [70, 80]],
    props: { bisect: false, equal: false, perpendicular: true, kite: true },
  },
};

const ROWS = [
  ['bisect', 'האלכסונים חוצים זה את זה'],
  ['equal', 'האלכסונים שווים'],
  ['perpendicular', 'האלכסונים מאונכים'],
];

/** בוחרים מרובע — ורואים את האלכסונים שלו ורשימת התכונות. */
export default function QuadExplorer({ caption, shape: s0 = 'parallelogram', only }) {
  const [shape, setShape] = useState(s0);
  const S = SHAPES[shape];
  const [A, B, C, D] = S.pts;
  const inter = (() => {
    // חיתוך AC עם BD
    const [x1, y1] = A;
    const [x2, y2] = C;
    const [x3, y3] = B;
    const [x4, y4] = D;
    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    return [x1 + t * (x2 - x1), y1 + t * (y2 - y1)];
  })();
  const keys = only ?? Object.keys(SHAPES);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <p className="mb-2 text-[var(--color-ink)]">{caption}</p>}

      <div className="mb-3 flex flex-wrap justify-center gap-2">
        {keys.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setShape(k)}
            className={`rounded-xl px-3 py-1.5 text-sm font-bold ring-1 ${
              shape === k ? 'bg-[var(--color-teal)] text-white ring-[var(--color-teal)]' : 'bg-white text-[var(--color-ink)] ring-black/10'
            }`}
          >
            {SHAPES[k].name}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 300 200" className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
        <motion.polygon
          initial={false}
          animate={{ points: S.pts.map((p) => p.join(',')).join(' ') }}
          fill="rgba(13,110,110,0.1)"
          stroke="var(--color-teal)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <motion.line initial={false} animate={{ x1: A[0], y1: A[1], x2: C[0], y2: C[1] }} stroke="var(--color-coral)" strokeWidth="2.5" />
        <motion.line initial={false} animate={{ x1: B[0], y1: B[1], x2: D[0], y2: D[1] }} stroke="var(--color-violet)" strokeWidth="2.5" />
        <motion.circle initial={false} animate={{ cx: inter[0], cy: inter[1] }} r="4.5" fill="var(--color-ink)" />
        {S.props.perpendicular && (
          <rect
            x={inter[0]}
            y={inter[1] - 10}
            width="10"
            height="10"
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth="1.5"
            transform={`rotate(${(Math.atan2(C[1] - A[1], C[0] - A[0]) * 180) / Math.PI} ${inter[0]} ${inter[1]})`}
          />
        )}
      </svg>

      <ul className="mt-3 space-y-1 text-sm">
        {ROWS.map(([k, label]) => (
          <li key={k} className="flex items-center gap-2">
            <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${S.props[k] ? 'bg-[var(--color-success)] text-white' : 'bg-[var(--color-mist)] text-[var(--color-slate)]'}`}>
              {S.props[k] ? '✓' : '✗'}
            </span>
            <span className={S.props[k] ? 'font-semibold text-[var(--color-ink)]' : 'text-[var(--color-slate)] line-through'}>{label}</span>
          </li>
        ))}
        {S.props.kite && (
          <li className="text-xs text-[var(--color-slate)]">בדלתון: האלכסון הראשי (אדום) חוצה את המשני — אבל לא להפך.</li>
        )}
      </ul>
    </div>
  );
}
