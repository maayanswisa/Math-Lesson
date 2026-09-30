import { useState } from 'react';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider, { fmt } from './LessonSlider';
import { Axes, makeScale } from './PlotAxes';

const s = makeScale({ W: 300, H: 280, x0: -6, x1: 6, y0: -6, y1: 6 });

const cx = (a, b) => `${fmt(a)}${b < 0 ? '-' : '+'}${fmt(Math.abs(b))}i`;

function Arrow({ x, y, color, label, dash }) {
  return (
    <g>
      <line x1={s.sx(0)} y1={s.sy(0)} x2={s.sx(x)} y2={s.sy(y)} stroke={color} strokeWidth="2.5" strokeDasharray={dash ? '5 4' : undefined} />
      <circle cx={s.sx(x)} cy={s.sy(y)} r="5" fill={color} />
      {label && (
        <text x={s.sx(x) + 7} y={s.sy(y) - 6} fontSize="12" fontWeight="700" fill={color}>
          {label}
        </text>
      )}
    </g>
  );
}

/**
 * מישור גאוס. mode='basic' — z=a+bi, הצמוד והערך המוחלט;
 * mode='polar' — כפל: הרדיוסים מוכפלים והזוויות מתחברות;
 * mode='roots' — שורשי היחידה מסדר n: מצולע משוכלל על מעגל היחידה.
 */
export default function ComplexPlane({ caption, mode = 'basic' }) {
  const [a, setA] = useState(3);
  const [b, setB] = useState(2);
  const [r1, setR1] = useState(2);
  const [t1, setT1] = useState(30);
  const [r2, setR2] = useState(1.5);
  const [t2, setT2] = useState(60);
  const [n, setN] = useState(6);
  const rad = (d) => (d * Math.PI) / 180;

  let body;
  let controls;
  let readout;
  if (mode === 'basic') {
    body = (
      <>
        <line x1={s.sx(a)} y1={s.sy(b)} x2={s.sx(a)} y2={s.sy(-b)} stroke="var(--color-slate)" strokeDasharray="3 3" />
        <Arrow x={a} y={-b} color="var(--color-coral)" label="z̄" dash />
        <Arrow x={a} y={b} color="var(--color-teal)" label="z" />
      </>
    );
    controls = (
      <>
        <LessonSlider label="a" value={a} min={-5} max={5} step={1} onChange={setA} color="var(--color-sky-dark)" />
        <LessonSlider label="b" value={b} min={-5} max={5} step={1} onChange={setB} color="var(--color-violet)" />
      </>
    );
    readout = `z=${cx(a, b)}\\quad \\bar z=${cx(a, -b)}\\quad |z|=\\sqrt{${a * a}+${b * b}}=${fmt(Math.hypot(a, b))}`;
  } else if (mode === 'polar') {
    const z1 = [r1 * Math.cos(rad(t1)), r1 * Math.sin(rad(t1))];
    const z2 = [r2 * Math.cos(rad(t2)), r2 * Math.sin(rad(t2))];
    const r = r1 * r2;
    const t = t1 + t2;
    const z = [r * Math.cos(rad(t)), r * Math.sin(rad(t))];
    body = (
      <>
        <Arrow x={z1[0]} y={z1[1]} color="var(--color-sky-dark)" label="z₁" />
        <Arrow x={z2[0]} y={z2[1]} color="var(--color-coral)" label="z₂" />
        <Arrow x={z[0]} y={z[1]} color="var(--color-violet)" label="z₁z₂" />
      </>
    );
    controls = (
      <>
        <LessonSlider label="r₁" value={r1} min={0.5} max={3} step={0.5} onChange={setR1} color="var(--color-sky-dark)" />
        <LessonSlider label="θ₁" value={t1} min={0} max={180} step={15} onChange={setT1} color="var(--color-sky-dark)" suffix="°" />
        <LessonSlider label="r₂" value={r2} min={0.5} max={2} step={0.5} onChange={setR2} color="var(--color-coral)" />
        <LessonSlider label="θ₂" value={t2} min={0} max={180} step={15} onChange={setT2} color="var(--color-coral)" suffix="°" />
      </>
    );
    readout = `r=${fmt(r1)}\\cdot${fmt(r2)}=${fmt(r)}\\qquad \\theta=${t1}°+${t2}°=${t}°`;
  } else {
    const pts = Array.from({ length: n }, (_, k) => [4 * Math.cos((2 * Math.PI * k) / n), 4 * Math.sin((2 * Math.PI * k) / n)]);
    body = (
      <>
        <circle cx={s.sx(0)} cy={s.sy(0)} r={s.sx(4) - s.sx(0)} fill="none" stroke="var(--color-slate)" strokeDasharray="4 4" />
        <polygon
          points={pts.map(([x, y]) => `${s.sx(x)},${s.sy(y)}`).join(' ')}
          fill="rgba(124,77,204,0.12)"
          stroke="var(--color-violet)"
          strokeWidth="2"
        />
        {pts.map(([x, y], k) => (
          <circle key={k} cx={s.sx(x)} cy={s.sy(y)} r="5" fill="var(--color-teal)" />
        ))}
      </>
    );
    controls = <LessonSlider label="n" value={n} min={2} max={12} step={1} onChange={setN} color="var(--color-violet)" />;
    readout = `z^{${n}}=1:\\quad z_k=\\cos\\frac{360°k}{${n}}+i\\sin\\frac{360°k}{${n}}`;
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
      <svg viewBox={`0 0 ${s.W} ${s.H}`} className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
        <Axes s={s} xLabel="Re" yLabel="Im" />
        {body}
      </svg>
      <div className="mt-2 space-y-1">{controls}</div>
      <div className="mt-3 overflow-x-auto rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]" dir="ltr">
        <MathRenderer inline>{`$${readout}$`}</MathRenderer>
      </div>
      {mode === 'polar' && (
        <p className="mt-2 text-center text-xs font-semibold text-[var(--color-slate)]">בכפל: הרדיוסים מוכפלים — והזוויות מתחברות</p>
      )}
      {mode === 'roots' && (
        <p className="mt-2 text-center text-xs font-semibold text-[var(--color-slate)]">
          השורשים יוצרים מצולע משוכלל, במרווחים של <span dir="ltr">{fmt(360 / n)}°</span>
        </p>
      )}
    </div>
  );
}
