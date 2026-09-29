import { useState } from 'react';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider, { fmt } from './LessonSlider';
import { Axes, makeScale } from './PlotAxes';

const s = makeScale({ W: 300, H: 300, x0: -8, x1: 8, y0: -8, y1: 8 });
const par = (n) => (n < 0 ? `(${n})` : n);

function Arrow({ from = [0, 0], to, color, width = 3, dash }) {
  const [x1, y1] = [s.sx(from[0]), s.sy(from[1])];
  const [x2, y2] = [s.sx(to[0]), s.sy(to[1])];
  const L = Math.hypot(x2 - x1, y2 - y1);
  if (L < 1) return null;
  const ux = (x2 - x1) / L;
  const uy = (y2 - y1) / L;
  const head = `${x2},${y2} ${x2 - 10 * ux + 5 * uy},${y2 - 10 * uy - 5 * ux} ${x2 - 10 * ux - 5 * uy},${y2 - 10 * uy + 5 * ux}`;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2 - 8 * ux} y2={y2 - 8 * uy} stroke={color} strokeWidth={width} strokeDasharray={dash} />
      <polygon points={head} fill={color} />
    </g>
  );
}

/**
 * שני וקטורים במישור. mode="add" — חיבור (כלל המקבילית) והכפלה בסקלר k.
 * mode="dot" — מכפלה סקלרית, הזווית ביניהם, וזיהוי ניצבות.
 */
export default function VectorPlane({ caption, mode = 'add', u: u0 = [3, 1], v: v0 = [1, 3] }) {
  const [u, setU] = useState(u0);
  const [v, setV] = useState(v0);
  const [k, setK] = useState(1);

  const sum = [u[0] + v[0], u[1] + v[1]];
  const ku = [k * u[0], k * u[1]];
  const dot = u[0] * v[0] + u[1] * v[1];
  const lu = Math.hypot(...u);
  const lv = Math.hypot(...v);
  const ang = lu && lv ? (Math.acos(Math.max(-1, Math.min(1, dot / (lu * lv)))) * 180) / Math.PI : 0;
  const setC = (setter, i) => (val) => setter((w) => (i === 0 ? [val, w[1]] : [w[0], val]));

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
      <svg viewBox={`0 0 ${s.W} ${s.H}`} className="mx-auto w-full max-w-xs" style={{ direction: 'ltr' }}>
        <Axes s={s} />
        {mode === 'add' ? (
          <>
            <Arrow from={u} to={sum} color="var(--color-coral)" width={2} dash="5 4" />
            <Arrow from={v} to={sum} color="var(--color-teal)" width={2} dash="5 4" />
            {k !== 1 && <Arrow to={ku} color="var(--color-sunshine)" width={5} />}
            <Arrow to={sum} color="var(--color-violet)" width={3.5} />
          </>
        ) : null}
        <Arrow to={u} color="var(--color-teal)" />
        <Arrow to={v} color="var(--color-coral)" />
        <text x={s.sx(u[0]) + 6} y={s.sy(u[1]) - 4} fontSize="13" fontWeight="800" fill="var(--color-teal)">
          u
        </text>
        <text x={s.sx(v[0]) + 6} y={s.sy(v[1]) - 4} fontSize="13" fontWeight="800" fill="var(--color-coral)">
          v
        </text>
        {mode === 'add' && (
          <text x={s.sx(sum[0]) + 6} y={s.sy(sum[1]) - 4} fontSize="12" fontWeight="800" fill="var(--color-violet)">
            u+v
          </text>
        )}
      </svg>

      <div className="mt-2 grid gap-1 sm:grid-cols-2 sm:gap-x-4">
        <LessonSlider label={<span dir="ltr">u₁</span>} value={u[0]} min={-4} max={4} onChange={setC(setU, 0)} color="var(--color-teal)" />
        <LessonSlider label={<span dir="ltr">u₂</span>} value={u[1]} min={-4} max={4} onChange={setC(setU, 1)} color="var(--color-teal)" />
        <LessonSlider label={<span dir="ltr">v₁</span>} value={v[0]} min={-4} max={4} onChange={setC(setV, 0)} color="var(--color-coral)" />
        <LessonSlider label={<span dir="ltr">v₂</span>} value={v[1]} min={-4} max={4} onChange={setC(setV, 1)} color="var(--color-coral)" />
        {mode === 'add' && <LessonSlider label="k" value={k} min={-2} max={2} step={0.5} onChange={setK} color="var(--color-sunshine-dark)" />}
      </div>

      <div className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]">
        {mode === 'add' ? (
          <>
            <MathRenderer inline>{`$\\vec u+\\vec v=(${u[0]}+${par(v[0])},\\ ${u[1]}+${par(v[1])})=(${sum[0]},${sum[1]})$`}</MathRenderer>
            {k !== 1 && (
              <div className="mt-1 text-[var(--color-sunshine-dark)]">
                <MathRenderer inline>{`$${fmt(k)}\\vec u=(${fmt(ku[0])},${fmt(ku[1])})$`}</MathRenderer> — {k > 0 ? 'אותו כיוון' : 'כיוון הפוך'}, פי{' '}
                <span dir="ltr">{fmt(Math.abs(k))}</span> באורך
              </div>
            )}
          </>
        ) : (
          <>
            <MathRenderer inline>{`$\\vec u\\cdot\\vec v=${u[0]}\\cdot${par(v[0])}+${u[1]}\\cdot${par(v[1])}=${dot}$`}</MathRenderer>
            <div className={`mt-1 ${dot === 0 ? 'text-[var(--color-success)]' : ''}`}>
              הזווית: <span dir="ltr">{fmt(ang)}°</span> — {dot === 0 ? 'ניצבים! ⟂' : dot > 0 ? 'חדה (מכפלה חיובית)' : 'קהה (מכפלה שלילית)'}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
