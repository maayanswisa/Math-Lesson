import { useState } from 'react';
import MathRenderer from '../ui/MathRenderer';

const N = 3;
const U = 22;

// הטלה איזומטרית: עמודה c (ימינה), שורה r (קדימה, לכיוון הצופה), קומה z (למעלה)
const iso = (c, r, z) => ({ x: 150 + (c - r) * U * 0.87, y: 150 + (c + r) * U * 0.5 - z * U });

function Cube({ c, r, z }) {
  const p = (dc, dr, dz) => iso(c + dc, r + dr, z + dz);
  const pts = (arr) => arr.map((q) => `${q.x},${q.y}`).join(' ');
  return (
    <g stroke="var(--color-ink)" strokeWidth="1">
      <polygon points={pts([p(0, 0, 1), p(1, 0, 1), p(1, 1, 1), p(0, 1, 1)])} fill="#9fd8d0" />
      <polygon points={pts([p(0, 1, 0), p(1, 1, 0), p(1, 1, 1), p(0, 1, 1)])} fill="#5bb3a8" />
      <polygon points={pts([p(1, 0, 0), p(1, 1, 0), p(1, 1, 1), p(1, 0, 1)])} fill="#2f8f84" />
    </g>
  );
}

function View({ title, cells }) {
  return (
    <div className="flex flex-col items-center">
      <span className="mb-1 text-xs font-bold text-[var(--color-slate)]">{title}</span>
      <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${cells[0].length}, 1rem)` }} dir="ltr">
        {cells.flat().map((on, i) => (
          <div key={i} className={`h-4 w-4 rounded-sm ${on ? 'bg-[var(--color-teal)]' : 'bg-[var(--color-mist)]'}`} />
        ))}
      </div>
    </div>
  );
}

/**
 * מבנה קוביות על לוח 3×3: לוחצים על משבצת בלוח הבקרה כדי להוסיף קומה (עד 3, ואז מתאפס).
 * רואים את המבנה בתלת-ממד ואת שלושת המבטים: מלפנים, מהצד ומלמעלה.
 */
export default function CubeViews({
  caption,
  heights: h0 = [
    [2, 3, 1],
    [1, 1, 0],
    [1, 0, 0],
  ],
}) {
  const [h, setH] = useState(h0);
  const bump = (r, c) => setH((old) => old.map((row, i) => row.map((v, j) => (i === r && j === c ? (v + 1) % 4 : v))));
  const total = h.flat().reduce((a, b) => a + b, 0);
  const levels = [3, 2, 1];
  // מלפנים: לכל עמודה — הגובה המקסימלי לאורך השורות
  const front = levels.map((z) => [0, 1, 2].map((c) => Math.max(...h.map((row) => row[c])) >= z));
  const side = levels.map((z) => [2, 1, 0].map((r) => Math.max(...h[r]) >= z));
  const top = [0, 1, 2].map((r) => [0, 1, 2].map((c) => h[r][c] > 0));

  const cubes = [];
  for (let r = N - 1; r >= 0; r--) for (let c = 0; c < N; c++) for (let z = 0; z < h[r][c]; z++) cubes.push({ r, c, z });
  cubes.sort((A, B) => A.r + A.c - (B.r + B.c) || A.z - B.z);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
      <svg viewBox="30 40 240 190" className="mx-auto w-full max-w-xs" style={{ direction: 'ltr' }}>
        {[0, 1, 2, 3].map((i) => {
          const a = iso(i, 0, 0);
          const b = iso(i, N, 0);
          const c = iso(0, i, 0);
          const d = iso(N, i, 0);
          return (
            <g key={i} stroke="#c9d3de">
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
              <line x1={c.x} y1={c.y} x2={d.x} y2={d.y} />
            </g>
          );
        })}
        {cubes.map((q) => (
          <Cube key={`${q.r}-${q.c}-${q.z}`} {...q} />
        ))}
      </svg>
      <div className="mt-2 flex flex-wrap items-start justify-center gap-5">
        <div className="flex flex-col items-center">
          <span className="mb-1 text-xs font-bold text-[var(--color-violet)]">לחצו להוספת קומה</span>
          <div className="grid grid-cols-3 gap-1" dir="ltr">
            {[0, 1, 2].map((r) =>
              [0, 1, 2].map((c) => (
                <button
                  key={`${r}${c}`}
                  onClick={() => bump(r, c)}
                  className="h-8 w-8 rounded-md bg-[var(--color-mist)] text-sm font-bold text-[var(--color-ink)]"
                >
                  {h[r][c] || ''}
                </button>
              )),
            )}
          </div>
        </div>
        <View title="מלפנים" cells={front} />
        <View title="מהצד (ימין)" cells={side} />
        <View title="מלמעלה" cells={top} />
      </div>
      <p className="mt-3 text-center text-sm font-bold text-[var(--color-ink)]">
        סך הכול <span dir="ltr">{total}</span> קוביות
      </p>
    </div>
  );
}
