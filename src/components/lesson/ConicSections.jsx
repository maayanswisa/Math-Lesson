import { useState } from 'react';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider, { fmt } from './LessonSlider';
import { Axes, makeScale, usePlotClip } from './PlotAxes';

const s = makeScale({ W: 300, H: 280, x0: -7, x1: 7, y0: -6, y1: 6 });

const NAMES = { parabola: 'פרבולה', ellipse: 'אליפסה', hyperbola: 'היפרבולה' };

// מסלול פרמטרי כמחרוזת SVG
function curve(pt, t0, t1, n = 240) {
  let d = '';
  for (let i = 0; i <= n; i++) {
    const [x, y] = pt(t0 + ((t1 - t0) * i) / n);
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    d += `${d ? 'L' : 'M'}${s.sx(x).toFixed(1)},${s.sy(y).toFixed(1)}`;
  }
  return d;
}

/**
 * חתכי חרוט כמקום גאומטרי: נקודה P רצה על העקומה (סליידר t), ורואים את המרחקים
 * שמגדירים אותה — מוקד ומדריך בפרבולה, סכום מרחקים באליפסה, הפרש מרחקים בהיפרבולה.
 */
export default function ConicSections({ caption, shape: s0 = 'ellipse', shapes = ['parabola', 'ellipse', 'hyperbola'] }) {
  const [shape, setShape] = useState(s0);
  const [t, setT] = useState(0.8);
  const [p, setP] = useState(2);
  const [a, setA] = useState(5);
  const [b, setB] = useState(3);
  const { defs, clip } = usePlotClip(s);

  let path;
  let P;
  let F = [];
  let tex;
  let info;
  let extra = null;
  if (shape === 'parabola') {
    // y² = 2px, פרמטר: x = y²/(2p)
    const pt = (u) => [(u * u) / (2 * p), u];
    path = curve(pt, -6, 6);
    const u = (t - 1) * 5;
    P = pt(u);
    F = [[p / 2, 0]];
    const dF = Math.hypot(P[0] - p / 2, P[1]);
    extra = (
      <>
        <line
          x1={s.sx(-p / 2)}
          y1={s.sy(6)}
          x2={s.sx(-p / 2)}
          y2={s.sy(-6)}
          stroke="var(--color-sunshine-dark)"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        <line x1={s.sx(P[0])} y1={s.sy(P[1])} x2={s.sx(-p / 2)} y2={s.sy(P[1])} stroke="var(--color-sunshine-dark)" strokeWidth="2.5" />
        <text x={s.sx(-p / 2) - 12} y={s.sy(P[1]) + 4} fontSize="11" fontWeight="700" fill="var(--color-sunshine-dark)">
          D
        </text>
      </>
    );
    tex = `y^2=${fmt(2 * p)}x`;
    info = `PF=${fmt(dF)}=PD`;
  } else if (shape === 'ellipse') {
    const A = a;
    const B = Math.min(b, a - 0.5);
    const c = Math.sqrt(A * A - B * B);
    const pt = (u) => [A * Math.cos(u), B * Math.sin(u)];
    path = curve(pt, 0, 2 * Math.PI);
    P = pt(t * Math.PI);
    F = [
      [-c, 0],
      [c, 0],
    ];
    const d1 = Math.hypot(P[0] + c, P[1]);
    const d2 = Math.hypot(P[0] - c, P[1]);
    tex = `\\frac{x^2}{${fmt(A * A)}}+\\frac{y^2}{${fmt(B * B)}}=1`;
    info = `PF_1+PF_2=${fmt(d1)}+${fmt(d2)}=${fmt(d1 + d2)}=2a`;
  } else {
    const c = Math.sqrt(a * a + b * b);
    const branch = (sgn) => (u) => [sgn * a * Math.cosh(u), b * Math.sinh(u)];
    path = curve(branch(1), -2.5, 2.5) + curve(branch(-1), -2.5, 2.5);
    P = branch(1)((t - 1) * 1.6);
    F = [
      [-c, 0],
      [c, 0],
    ];
    const d1 = Math.hypot(P[0] + c, P[1]);
    const d2 = Math.hypot(P[0] - c, P[1]);
    extra = [1, -1].map((sg) => (
      <line
        key={sg}
        x1={s.sx(-7)}
        y1={s.sy((sg * -7 * b) / a)}
        x2={s.sx(7)}
        y2={s.sy((sg * 7 * b) / a)}
        stroke="var(--color-slate)"
        strokeWidth="1.5"
        strokeDasharray="5 4"
      />
    ));
    tex = `\\frac{x^2}{${fmt(a * a)}}-\\frac{y^2}{${fmt(b * b)}}=1`;
    info = `|PF_1-PF_2|=|${fmt(d1)}-${fmt(d2)}|=${fmt(Math.abs(d1 - d2))}=2a`;
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
      {shapes.length > 1 && (
        <div className="mb-2 flex flex-wrap justify-center gap-2">
          {shapes.map((k) => (
            <button
              key={k}
              onClick={() => setShape(k)}
              className={`rounded-full px-3 py-1 text-sm font-bold ${shape === k ? 'bg-[var(--color-teal)] text-white' : 'bg-[var(--color-mist)] text-[var(--color-ink)]'}`}
            >
              {NAMES[k]}
            </button>
          ))}
        </div>
      )}
      <svg viewBox={`0 0 ${s.W} ${s.H}`} className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
        {defs}
        <Axes s={s} />
        <g clipPath={clip}>
          {extra}
          <path d={path} fill="none" stroke="var(--color-teal)" strokeWidth="3" />
          {F.map(([fx, fy]) => (
            <line key={fx} x1={s.sx(fx)} y1={s.sy(fy)} x2={s.sx(P[0])} y2={s.sy(P[1])} stroke="var(--color-coral)" strokeWidth="2" />
          ))}
          {F.map(([fx, fy]) => (
            <circle key={`f${fx}`} cx={s.sx(fx)} cy={s.sy(fy)} r="5" fill="var(--color-coral)" />
          ))}
          <circle cx={s.sx(P[0])} cy={s.sy(P[1])} r="6" fill="var(--color-violet)" stroke="white" strokeWidth="2" />
        </g>
      </svg>
      <div className="mt-2 space-y-1">
        <LessonSlider label="P" value={t} min={0.05} max={1.95} step={0.05} onChange={setT} color="var(--color-violet)" display="" />
        {shape === 'parabola' ? (
          <LessonSlider label="p" value={p} min={1} max={4} step={0.5} onChange={setP} color="var(--color-sunshine-dark)" />
        ) : (
          <>
            <LessonSlider label="a" value={a} min={2} max={6} step={0.5} onChange={setA} color="var(--color-sky-dark)" />
            <LessonSlider label="b" value={b} min={1} max={5} step={0.5} onChange={setB} color="var(--color-coral)" />
          </>
        )}
      </div>
      <div className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]" dir="ltr">
        <MathRenderer inline>{`$${tex}$`}</MathRenderer>
        <div className="mt-1">
          <MathRenderer inline>{`$${info}$`}</MathRenderer>
        </div>
      </div>
      <p className="mt-2 text-center text-xs font-semibold text-[var(--color-slate)]">
        {shape === 'parabola'
          ? 'המרחק מהמוקד שווה למרחק מהמדריך (הקו המקווקו)'
          : shape === 'ellipse'
            ? 'סכום המרחקים משני המוקדים קבוע'
            : 'הפרש המרחקים משני המוקדים קבוע · הקווים המקווקווים — אסימפטוטות'}
      </p>
    </div>
  );
}
