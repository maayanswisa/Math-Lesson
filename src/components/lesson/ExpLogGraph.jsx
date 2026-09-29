import { useState } from 'react';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider, { fmt } from './LessonSlider';
import { Axes, fnPath, makeScale, usePlotClip } from './PlotAxes';

const s = makeScale({ W: 300, H: 280, x0: -4, x1: 5, y0: -4, y1: 5 });
const BASES = [0.25, 0.5, 0.75, 1.5, 2, 3, 4];

/**
 * y = aˣ, ואפשר להוסיף את y = logₐx — השיקוף שלה בישר y = x (פונקציה הפוכה).
 */
export default function ExpLogGraph({ caption, a: a0 = 2, showLog = false }) {
  const [i, setI] = useState(Math.max(0, BASES.indexOf(a0)));
  const [log, setLog] = useState(showLog);
  const { defs, clip } = usePlotClip(s);
  const a = BASES[i];
  const exp = (x) => a ** x;
  const lg = (x) => (x > 0 ? Math.log(x) / Math.log(a) : NaN);
  const up = a > 1;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}
      <svg viewBox={`0 0 ${s.W} ${s.H}`} className="mx-auto w-full max-w-sm" style={{ direction: 'ltr' }}>
        {defs}
        <Axes s={s} labelEvery={1} />
        <g clipPath={clip}>
          {log && <path d={fnPath((x) => x, s)} fill="none" stroke="var(--color-slate)" strokeWidth="1.5" strokeDasharray="4 4" />}
          <path d={fnPath(exp, s, { step: 0.02 })} fill="none" stroke="var(--color-teal)" strokeWidth="3" />
          {log && <path d={fnPath(lg, s, { from: 0.001, step: 0.005 })} fill="none" stroke="var(--color-violet)" strokeWidth="3" />}
          <circle cx={s.sx(0)} cy={s.sy(1)} r="5" fill="var(--color-teal)" />
          {log && <circle cx={s.sx(1)} cy={s.sy(0)} r="5" fill="var(--color-violet)" />}
        </g>
      </svg>
      <div className="mt-1 flex flex-wrap justify-center gap-x-4 text-xs font-bold">
        <span className="text-[var(--color-teal)]">
          ━ <MathRenderer inline>{`$y=${fmt(a)}^x$`}</MathRenderer>
        </span>
        {log && (
          <span className="text-[var(--color-violet)]">
            ━ <MathRenderer inline>{`$y=\\log_{${fmt(a)}}x$`}</MathRenderer>
          </span>
        )}
        {log && (
          <span className="text-[var(--color-slate)]">
            - - - <span dir="ltr">y = x</span>
          </span>
        )}
      </div>

      <div className="mt-2">
        <LessonSlider label="a" value={i} min={0} max={BASES.length - 1} onChange={setI} color="var(--color-teal)" display={fmt(a)} />
      </div>

      <div className="mt-2 flex justify-center">
        <button
          type="button"
          onClick={() => setLog((v) => !v)}
          className={`rounded-xl px-3 py-1.5 text-sm font-bold ${log ? 'bg-[var(--color-violet)] text-white' : 'bg-white text-[var(--color-slate)] ring-1 ring-black/10'}`}
        >
          {log ? 'הסתירו את הלוגריתם' : 'הראו גם את הלוגריתם 🪞'}
        </button>
      </div>

      <div className="mt-3 rounded-xl bg-[var(--color-mist)] p-2 text-center text-sm font-bold text-[var(--color-ink)]">
        {up ? (
          <>
            <span dir="ltr">a &gt; 1</span> — הפונקציה <span className="text-[var(--color-success)]">עולה</span> (גדילה)
          </>
        ) : (
          <>
            <span dir="ltr">0 &lt; a &lt; 1</span> — הפונקציה <span className="text-[var(--color-coral)]">יורדת</span> (דעיכה)
          </>
        )}
        <span className="block text-xs font-semibold text-[var(--color-slate)]">
          {log ? (
            <>
              המעריכית חותכת ב-<span dir="ltr">(0,1)</span> והלוגריתמית ב-<span dir="ltr">(1,0)</span> — תמונת מראה בישר <span dir="ltr">y = x</span>
            </>
          ) : (
            <>
              תמיד חיובית, חותכת ב-<span dir="ltr">(0,1)</span>, ואסימפטוטה <span dir="ltr">y = 0</span>
            </>
          )}
        </span>
      </div>
    </div>
  );
}
