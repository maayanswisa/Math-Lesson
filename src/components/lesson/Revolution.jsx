import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';
import { fnPath, makeScale } from './PlotAxes';

const SHAPES = {
  cylinder: { name: 'גליל', tex: 'f(x)=2', f: () => 2, a: 0, b: 4, V: '\\pi\\int_0^4 2^2\\,dx=16\\pi', simple: 'V=\\pi r^2h' },
  cone: { name: 'חרוט', tex: 'f(x)=\\frac{x}{2}', f: (x) => x / 2, a: 0, b: 4, V: '\\pi\\int_0^4 \\frac{x^2}{4}\\,dx=\\frac{16\\pi}{3}', simple: 'V=\\frac13\\pi r^2h' },
  bowl: { name: 'קערה', tex: 'f(x)=\\sqrt{x}', f: (x) => Math.sqrt(Math.max(0, x)), a: 0, b: 4, V: '\\pi\\int_0^4 x\\,dx=8\\pi' },
  sphere: {
    name: 'כדור',
    tex: 'f(x)=\\sqrt{4-x^2}',
    f: (x) => Math.sqrt(Math.max(0, 4 - x * x)),
    a: -2,
    b: 2,
    V: '\\pi\\int_{-2}^{2}(4-x^2)\\,dx=\\frac{32\\pi}{3}',
    simple: 'V=\\frac43\\pi r^3',
  },
};

const s = makeScale({ W: 300, H: 200, x0: -2.6, x1: 4.6, y0: -2.8, y1: 2.8 });

/**
 * מסובבים גרף סביב ציר x: כל פרוסה היא עיגול ברדיוס f(x), בשטח π·f(x)².
 * הנפח = הצטברות שטחי הפרוסות: V = π∫f(x)²dx.
 */
export default function Revolution({ caption, shape: s0 = 'cone', elementary = false }) {
  const [key, setKey] = useState(s0);
  const S = SHAPES[key];
  const slices = Array.from({ length: 9 }, (_, i) => S.a + ((S.b - S.a) * (i + 0.5)) / 9);
  const rx = (r) => Math.max(1.5, (s.sx(r) - s.sx(0)) * 0.28);
  const ry = (r) => s.sy(0) - s.sy(r);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}

      <div className="mb-2 flex flex-wrap justify-center gap-2">
        {Object.entries(SHAPES)
          .filter(([, v]) => !elementary || v.simple)
          .map(([k, v]) => (
          <button
            key={k}
            type="button"
            onClick={() => setKey(k)}
            className={`rounded-xl px-3 py-1.5 text-sm font-bold ${key === k ? 'bg-[var(--color-teal)] text-white' : 'bg-white text-[var(--color-slate)] ring-1 ring-black/10'}`}
          >
            {v.name}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${s.W} ${s.H}`} className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
        <line x1={s.sx(s.x0)} y1={s.sy(0)} x2={s.sx(s.x1)} y2={s.sy(0)} stroke="var(--color-ink)" strokeWidth="1.5" />
        <text x={s.sx(s.x1) - 2} y={s.sy(0) - 5} fontSize="11" fontStyle="italic" fontWeight="700" textAnchor="end" fill="var(--color-ink)">
          x
        </text>
        {slices.map((x) => {
          const r = S.f(x);
          return (
            <motion.ellipse
              key={`${key}${x}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              cx={s.sx(x)}
              cy={s.sy(0)}
              rx={rx(r)}
              ry={ry(r)}
              fill="rgba(124,77,204,0.12)"
              stroke="var(--color-violet)"
              strokeWidth="1.2"
            />
          );
        })}
        <path
          d={fnPath((x) => (x < S.a || x > S.b ? NaN : -S.f(x)), s, { step: 0.02 })}
          fill="none"
          stroke="var(--color-teal)"
          strokeWidth="2"
          strokeDasharray="5 4"
        />
        <path d={fnPath((x) => (x < S.a || x > S.b ? NaN : S.f(x)), s, { step: 0.02 })} fill="none" stroke="var(--color-teal)" strokeWidth="3.5" />
      </svg>

      <div className="mt-2 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]">
        {elementary ? (
          <>
            <MathRenderer inline>{`$${S.simple}$`}</MathRenderer>
            <div className="mt-1 text-xs font-semibold text-[var(--color-slate)]">כל פרוסה (סגול) היא עיגול — הגוף בנוי מהמון עיגולים דקים</div>
          </>
        ) : (
          <>
            <MathRenderer inline>{`$${S.tex}$`}</MathRenderer>
            <div className="mt-1">
              <MathRenderer inline>{`$V=${S.V}$`}</MathRenderer>
            </div>
            <div className="mt-1 text-xs font-semibold text-[var(--color-slate)]">
              כל פרוסה (סגול) היא עיגול ברדיוס <span dir="ltr">f(x)</span> ובשטח <span dir="ltr">π·f(x)²</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
