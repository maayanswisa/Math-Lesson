import { useState } from 'react';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider, { fmt } from './LessonSlider';
import { Axes, makeScale, usePlotClip } from './PlotAxes';

const s = makeScale({ W: 300, H: 300, x0: -8, x1: 8, y0: -8, y1: 8 });

const sgn = (v) => (v === 0 ? '' : v > 0 ? `-${fmt(v)}` : `+${fmt(-v)}`);

/**
 * מעגל (x−a)² + (y−b)² = R² וישר y = mx + k.
 * משווים את המרחק d ממרכז המעגל לישר עם הרדיוס: d<R חותך, d=R משיק, d>R לא נפגשים.
 * lineless — רק המעגל (בלי ישר).
 */
export default function CircleLine({ caption, a: a0 = 1, b: b0 = 1, R: R0 = 3, m: m0 = 0, k: k0 = 5, lineless = false }) {
  const [a, setA] = useState(a0);
  const [b, setB] = useState(b0);
  const [R, setR] = useState(R0);
  const [m, setM] = useState(m0);
  const [k, setK] = useState(k0);
  const { defs, clip } = usePlotClip(s);

  const d = Math.abs(m * a - b + k) / Math.sqrt(m * m + 1);
  const eps = 0.02;
  const state = d < R - eps ? 'cut' : d <= R + eps ? 'tangent' : 'none';

  // נקודות חיתוך: מציבים y = mx + k במשוואת המעגל
  const A2 = 1 + m * m;
  const B2 = 2 * (m * (k - b) - a);
  const C2 = a * a + (k - b) ** 2 - R * R;
  const disc = B2 * B2 - 4 * A2 * C2;
  const xs =
    disc < -1e-6
      ? []
      : Math.abs(disc) < 1e-6 || state === 'tangent'
        ? [-B2 / (2 * A2)]
        : [(-B2 - Math.sqrt(disc)) / (2 * A2), (-B2 + Math.sqrt(disc)) / (2 * A2)];

  // רגל האנך מהמרכז לישר
  const fx = (a + m * (b - k)) / A2;
  const foot = { x: fx, y: m * fx + k };

  const circleTex = `(x${sgn(a)})^2+(y${sgn(b)})^2=${fmt(R * R)}`;
  const kTex = k === 0 ? '' : k > 0 ? `+${fmt(k)}` : `-${fmt(-k)}`;
  const lineTex = `y=${m === 0 ? '' : m === 1 ? 'x' : m === -1 ? '-x' : `${fmt(m)}x`}${m === 0 ? fmt(k) : kTex}`;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
      <svg viewBox={`0 0 ${s.W} ${s.H}`} className="mx-auto w-full max-w-xs" style={{ direction: 'ltr' }}>
        {defs}
        <Axes s={s} />
        <g clipPath={clip}>
          <circle cx={s.sx(a)} cy={s.sy(b)} r={s.sx(R) - s.sx(0)} fill="rgba(13,110,110,0.08)" stroke="var(--color-teal)" strokeWidth="3" />
          <line x1={s.sx(a)} y1={s.sy(b)} x2={s.sx(a + R)} y2={s.sy(b)} stroke="var(--color-sunshine)" strokeWidth="2" />
          <circle cx={s.sx(a)} cy={s.sy(b)} r="4" fill="var(--color-teal)" />
          {!lineless && (
            <>
              <line x1={s.sx(-8)} y1={s.sy(m * -8 + k)} x2={s.sx(8)} y2={s.sy(m * 8 + k)} stroke="var(--color-violet)" strokeWidth="2.5" />
              <line x1={s.sx(a)} y1={s.sy(b)} x2={s.sx(foot.x)} y2={s.sy(foot.y)} stroke="var(--color-coral)" strokeWidth="2" strokeDasharray="5 4" />
              {xs.map((x) => (
                <circle key={x} cx={s.sx(x)} cy={s.sy(m * x + k)} r="5" fill="var(--color-coral)" stroke="white" strokeWidth="2" />
              ))}
            </>
          )}
        </g>
      </svg>

      <div className="mt-2 space-y-1">
        <LessonSlider label="a" value={a} min={-4} max={4} onChange={setA} color="var(--color-teal)" />
        <LessonSlider label="b" value={b} min={-4} max={4} onChange={setB} color="var(--color-teal)" />
        <LessonSlider label="R" value={R} min={1} max={5} onChange={setR} color="var(--color-sunshine-dark)" />
        {!lineless && (
          <>
            <LessonSlider label="m" value={m} min={-2} max={2} step={0.5} onChange={setM} color="var(--color-violet)" />
            <LessonSlider label="k" value={k} min={-7} max={7} onChange={setK} color="var(--color-violet)" />
          </>
        )}
      </div>

      <div className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]">
        <MathRenderer inline>{`$${circleTex}$`}</MathRenderer>
        {!lineless && (
          <>
            <div>
              <MathRenderer inline>{`$${lineTex}$`}</MathRenderer>
            </div>
            <div
              className={`mt-1 ${state === 'cut' ? 'text-[var(--color-success)]' : state === 'tangent' ? 'text-[var(--color-violet)]' : 'text-[var(--color-coral-dark)]'}`}
            >
              <span dir="ltr">
                d = {fmt(d)} {state === 'cut' ? '<' : state === 'tangent' ? '=' : '>'} R = {R}
              </span>{' '}
              — {state === 'cut' ? 'הישר חותך בשתי נקודות' : state === 'tangent' ? 'הישר משיק (נקודה אחת)' : 'אין נקודות משותפות'}
            </div>
          </>
        )}
        {lineless && (
          <div className="mt-1 text-xs font-semibold text-[var(--color-slate)]">
            מרכז{' '}
            <span dir="ltr">
              ({a}, {b})
            </span>
            , רדיוס {R}
          </div>
        )}
      </div>
    </div>
  );
}
