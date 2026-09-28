import { useState } from 'react';
import MathRenderer from '../ui/MathRenderer';

const COS = Math.cos(Math.PI / 6);
const SIN = 0.5;

/**
 * תיבה שבנויה מקוביות יחידה (שרטוט איזומטרי). סליידרים לאורך, רוחב וגובה —
 * סופרים את הקוביות ורואים שהנפח הוא אורך × רוחב × גובה.
 */
export default function BoxVolume({ caption, l: l0 = 4, w: w0 = 3, h: h0 = 2, max = 6 }) {
  const [l, setL] = useState(l0);
  const [w, setW] = useState(w0);
  const [h, setH] = useState(h0);

  const s = Math.min(24, 190 / ((l + w) * COS + 1), 170 / ((l + w) * SIN + h + 1));
  const iso = (x, y, z) => [(x - y) * COS * s, (x + y) * SIN * s - z * s];
  const pts = (arr) => arr.map((p) => iso(...p).map((v) => v.toFixed(1)).join(',')).join(' ');

  // ציור מאחור לפנים: קודם x+y+z קטנים
  const cubes = [];
  for (let z = 0; z < h; z++) for (let y = 0; y < w; y++) for (let x = 0; x < l; x++) cubes.push([x, y, z]);
  cubes.sort((a, b) => a[0] + a[1] + a[2] - (b[0] + b[1] + b[2]) || a[2] - b[2]);

  const all = [
    iso(0, 0, 0),
    iso(l, 0, 0),
    iso(0, w, 0),
    iso(l, w, 0),
    iso(0, 0, h),
    iso(l, w, h),
  ];
  const minX = Math.min(...all.map((p) => p[0]));
  const maxX = Math.max(...all.map((p) => p[0]));
  const minY = Math.min(...all.map((p) => p[1]));
  const maxY = Math.max(...all.map((p) => p[1]));
  const vb = `${(minX - 8).toFixed(0)} ${(minY - 8).toFixed(0)} ${(maxX - minX + 16).toFixed(0)} ${(maxY - minY + 16).toFixed(0)}`;

  const sliders = [
    { label: 'אורך', value: l, set: setL, color: 'var(--color-teal)' },
    { label: 'רוחב', value: w, set: setW, color: 'var(--color-sky)' },
    { label: 'גובה', value: h, set: setH, color: 'var(--color-coral)' },
  ];

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}

      <svg viewBox={vb} className="mx-auto h-52 w-full max-w-sm">
        {cubes.map(([x, y, z]) => (
          <g key={`${x}-${y}-${z}`} stroke="rgba(26,43,60,0.55)" strokeWidth="0.8" strokeLinejoin="round">
            {/* עליון */}
            <polygon points={pts([[x, y, z + 1], [x + 1, y, z + 1], [x + 1, y + 1, z + 1], [x, y + 1, z + 1]])} fill="#8fd3c7" />
            {/* צד ימני (פונה ל-x) */}
            <polygon points={pts([[x + 1, y, z], [x + 1, y + 1, z], [x + 1, y + 1, z + 1], [x + 1, y, z + 1]])} fill="#2a9d8f" />
            {/* צד שמאלי (פונה ל-y) */}
            <polygon points={pts([[x, y + 1, z], [x + 1, y + 1, z], [x + 1, y + 1, z + 1], [x, y + 1, z + 1]])} fill="#52b8a9" />
          </g>
        ))}
      </svg>

      <div className="mt-2 space-y-1">
        {sliders.map((sl) => (
          <label key={sl.label} className="flex items-center gap-2 text-sm font-semibold">
            <span className="w-12" style={{ color: sl.color }}>
              {sl.label}
            </span>
            <input
              type="range"
              dir="ltr"
              min={1}
              max={max}
              value={sl.value}
              onChange={(e) => sl.set(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: sl.color }}
            />
            <span className="w-6 text-center font-bold" style={{ color: sl.color }}>
              {sl.value}
            </span>
          </label>
        ))}
      </div>

      <p className="mt-3 text-center text-lg">
        <MathRenderer inline>{`נפח: $${l}\\times${w}\\times${h}=\\mathbf{${l * w * h}}$ קוביות`}</MathRenderer>
      </p>
    </div>
  );
}
