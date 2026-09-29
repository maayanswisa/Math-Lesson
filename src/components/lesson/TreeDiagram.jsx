import { useState } from 'react';
import MathRenderer from '../ui/MathRenderer';

const frac = (n, d) => `\\frac{${n}}{${d}}`;
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
const simplify = (n, d) => {
  if (n === 0) return '0';
  const g = gcd(n, d);
  return d / g === 1 ? String(n / g) : frac(n / g, d / g);
};

/**
 * דיאגרמת עץ לשתי הוצאות מתוך שקית (אדום/כחול), עם או בלי החזרה.
 * על כל ענף — ההסתברות; בסוף כל מסלול — המכפלה.
 */
export default function TreeDiagram({ caption, red: r0 = 3, blue: b0 = 2, replace: rep0 = false }) {
  const [red, setRed] = useState(r0);
  const [blue, setBlue] = useState(b0);
  const [replace, setReplace] = useState(rep0);
  const n = red + blue;
  const n2 = replace ? n : n - 1;

  const first = [
    { c: 'R', k: red },
    { c: 'B', k: blue },
  ];
  const paths = [];
  for (const f of first) {
    const redLeft = replace ? red : red - (f.c === 'R' ? 1 : 0);
    const blueLeft = replace ? blue : blue - (f.c === 'B' ? 1 : 0);
    for (const s of [
      { c: 'R', k: redLeft },
      { c: 'B', k: blueLeft },
    ]) {
      paths.push({ f, s, num: f.k * s.k, den: n * n2 });
    }
  }
  const color = (c) => (c === 'R' ? 'var(--color-coral)' : 'var(--color-sky)');
  const emoji = (c) => (c === 'R' ? '🔴' : '🔵');

  // מיקומים בעץ (LTR): שורש משמאל, שלב 1 באמצע, שלב 2 מימין
  const Y1 = [60, 180];
  const Y2 = [30, 90, 150, 210];

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}

      <div className="mb-3 flex flex-wrap items-center justify-center gap-3 text-sm font-semibold">
        <span className="flex items-center gap-1">
          🔴
          <button type="button" className="h-7 w-7 rounded-full ring-1 ring-black/15" onClick={() => setRed((x) => Math.max(1, x - 1))}>−</button>
          <span className="w-4 text-center">{red}</span>
          <button type="button" className="h-7 w-7 rounded-full ring-1 ring-black/15" onClick={() => setRed((x) => Math.min(6, x + 1))}>+</button>
        </span>
        <span className="flex items-center gap-1">
          🔵
          <button type="button" className="h-7 w-7 rounded-full ring-1 ring-black/15" onClick={() => setBlue((x) => Math.max(1, x - 1))}>−</button>
          <span className="w-4 text-center">{blue}</span>
          <button type="button" className="h-7 w-7 rounded-full ring-1 ring-black/15" onClick={() => setBlue((x) => Math.min(6, x + 1))}>+</button>
        </span>
        <button
          type="button"
          onClick={() => setReplace((x) => !x)}
          className={`rounded-xl px-3 py-1.5 font-bold ring-1 ${replace ? 'bg-[var(--color-violet)] text-white ring-[var(--color-violet)]' : 'bg-white ring-black/15'}`}
        >
          {replace ? 'עם החזרה ↩️' : 'בלי החזרה'}
        </button>
      </div>

      <div className="overflow-x-auto">
        <svg viewBox="0 0 330 240" className="mx-auto w-full min-w-[300px] max-w-md" style={{ direction: 'ltr' }}>
          {first.map((f, i) => (
            <g key={f.c}>
              <line x1="20" y1="120" x2="120" y2={Y1[i]} stroke={color(f.c)} strokeWidth="3" />
              <foreignObject x="40" y={(120 + Y1[i]) / 2 - (i ? -2 : 26)} width="60" height="26">
                <div style={{ textAlign: 'center', fontSize: 13, fontWeight: 700 }}>
                  <MathRenderer inline>{`$${frac(f.k, n)}$`}</MathRenderer>
                </div>
              </foreignObject>
              <text x="130" y={Y1[i] + 6} fontSize="18">{emoji(f.c)}</text>
            </g>
          ))}
          {paths.map((p, j) => {
            const i = j < 2 ? 0 : 1;
            return (
              <g key={j}>
                <line x1="155" y1={Y1[i]} x2="235" y2={Y2[j]} stroke={color(p.s.c)} strokeWidth="2.5" />
                <foreignObject x="165" y={(Y1[i] + Y2[j]) / 2 - (j % 2 ? -1 : 25)} width="56" height="26">
                  <div style={{ textAlign: 'center', fontSize: 12, fontWeight: 700 }}>
                    <MathRenderer inline>{`$${frac(p.s.k, n2)}$`}</MathRenderer>
                  </div>
                </foreignObject>
                <text x="242" y={Y2[j] + 6} fontSize="15">{emoji(p.s.c)}</text>
                <foreignObject x="262" y={Y2[j] - 13} width="66" height="28">
                  <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--color-violet-dark)' }}>
                    <MathRenderer inline>{`$=${simplify(p.num, p.den)}$`}</MathRenderer>
                  </div>
                </foreignObject>
              </g>
            );
          })}
          <circle cx="20" cy="120" r="5" fill="var(--color-ink)" />
        </svg>
      </div>
      <p className="mt-2 text-center text-sm text-[var(--color-slate)]">
        {replace ? 'עם החזרה — בשלב השני השקית זהה לגמרי.' : 'בלי החזרה — בשלב השני יש כדור אחד פחות, וההסתברויות משתנות!'}
      </p>
    </div>
  );
}
