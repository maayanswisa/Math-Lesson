import { useRef, useState } from 'react';
import MathRenderer from '../ui/MathRenderer';
import { Axes, makeScale, usePlotClip } from '../lesson/PlotAxes';
import { asymptoteTex, excludedRanges, num } from '../../lib/functionFamilies';

const s = makeScale({ W: 360, H: 360, x0: -6, x1: 6, y0: -6, y1: 6, pad: 16 });

const COLORS = { f: 'var(--color-teal)', df: 'var(--color-coral)', tangent: 'var(--color-sunshine)' };

/**
 * מסלול SVG לעקומה: דגימה צפופה, ועוד נקודות שמתקרבות לנקודות השבירה (אסימפטוטה, קצה תחום)
 * כדי שהענפים יגיעו עד שולי הגרף. העט מורם כשהערך לא מוגדר או כשעוברים נקודת שבירה.
 */
function curvePath(f, breaks) {
  const xs = [];
  for (let i = 0; i <= 720; i++) xs.push(s.x0 + (i / 720) * (s.x1 - s.x0));
  for (const b of breaks) for (let k = 1; k <= 8; k++) xs.push(b - 10 ** -k, b + 10 ** -k);
  xs.sort((a, b) => a - b);

  const limit = (s.y1 - s.y0) * 2;
  let d = '';
  let pen = false;
  let prev = null;
  for (const x of xs) {
    if (x < s.x0 || x > s.x1) continue;
    const y = f(x);
    const crossed = prev !== null && breaks.some((b) => prev < b && x > b);
    prev = x;
    if (!Number.isFinite(y) || y > s.y1 + limit || y < s.y0 - limit) {
      pen = false;
      continue;
    }
    d += `${pen && !crossed ? 'L' : 'M'}${s.sx(x).toFixed(2)},${s.sy(y).toFixed(2)}`;
    pen = true;
  }
  return d;
}

const clampX = (x) => Math.min(s.x1, Math.max(s.x0, x));

/** x של הסמן לפי מיקום העכבר / האצבע, מעוגל ל-0.05. */
function pointerX(e, svg) {
  const r = svg.getBoundingClientRect();
  const px = ((e.clientX - r.left) / r.width) * s.W;
  const x = s.x0 + ((px - s.sx(s.x0)) / (s.sx(s.x1) - s.sx(s.x0))) * (s.x1 - s.x0);
  return Math.round(clampX(x) * 20) / 20;
}

/**
 * הגרף של f (ואם ביקשו — גם של f'), עם אסימפטוטות, הצללה של מה שמחוץ לתחום,
 * וסמן: מזיזים עליו עכבר או אצבע ורואים את הערך — וכשהנגזרת מוצגת, גם את המשיק.
 */
export default function FunctionPlot({ family, params, showDerivative }) {
  const svgRef = useRef(null);
  const [hx, setHx] = useState(null);
  const { defs, clip } = usePlotClip(s);

  const f = family.f(params);
  const df = family.df(params);
  const asymptotes = family.asymptotes(params);
  const excluded = excludedRanges(family, params);
  const breaks = [
    ...asymptotes.filter((a) => a.axis === 'x').map((a) => a.at),
    ...excluded.flat().filter(Number.isFinite),
  ];

  const y = hx === null ? NaN : f(hx);
  const slope = hx === null ? NaN : df(hx);
  const traced = Number.isFinite(y);

  return (
    <div className="rounded-3xl bg-white p-3 shadow-sm ring-1 ring-black/5 sm:p-5">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${s.W} ${s.H}`}
        className="mx-auto block w-full max-w-md cursor-crosshair select-none"
        style={{ direction: 'ltr', touchAction: 'pan-y' }}
        role="img"
        aria-label={`גרף הפונקציה f(x) = ${family.tex(params)}`}
        onPointerMove={(e) => setHx(pointerX(e, svgRef.current))}
        onPointerDown={(e) => setHx(pointerX(e, svgRef.current))}
        onPointerLeave={(e) => e.pointerType === 'mouse' && setHx(null)}
      >
        {defs}
        {excluded.map(([from, to], i) => {
          const a = s.sx(clampX(from));
          const b = s.sx(clampX(to));
          return <rect key={i} x={Math.min(a, b)} y={s.sy(s.y1)} width={Math.abs(b - a)} height={s.sy(s.y0) - s.sy(s.y1)} fill="var(--color-coral)" opacity="0.07" />;
        })}
        <Axes s={s} />

        <g clipPath={clip}>
          {asymptotes.map((a) =>
            a.axis === 'x' ? (
              <line key={`v${a.at}`} x1={s.sx(a.at)} y1={s.sy(s.y0)} x2={s.sx(a.at)} y2={s.sy(s.y1)} stroke="var(--color-slate)" strokeWidth="1.5" strokeDasharray="5 4" />
            ) : (
              <line key={`h${a.at}`} x1={s.sx(s.x0)} y1={s.sy(a.at)} x2={s.sx(s.x1)} y2={s.sy(a.at)} stroke="var(--color-slate)" strokeWidth="1.5" strokeDasharray="5 4" />
            ),
          )}

          {showDerivative && <path d={curvePath(df, breaks)} fill="none" stroke={COLORS.df} strokeWidth="2.5" strokeLinejoin="round" />}
          <path d={curvePath(f, breaks)} fill="none" stroke={COLORS.f} strokeWidth="3.5" strokeLinejoin="round" />

          {traced && (
            <g>
              <line x1={s.sx(hx)} y1={s.sy(s.y0)} x2={s.sx(hx)} y2={s.sy(s.y1)} stroke="var(--color-slate)" strokeWidth="1" opacity="0.35" />
              {showDerivative && Number.isFinite(slope) && (
                <>
                  <line
                    x1={s.sx(s.x0)}
                    y1={s.sy(y + slope * (s.x0 - hx))}
                    x2={s.sx(s.x1)}
                    y2={s.sy(y + slope * (s.x1 - hx))}
                    stroke={COLORS.tangent}
                    strokeWidth="2"
                  />
                  <circle cx={s.sx(hx)} cy={s.sy(slope)} r="5" fill={COLORS.df} stroke="white" strokeWidth="2" />
                </>
              )}
              <circle cx={s.sx(hx)} cy={s.sy(y)} r="6" fill={COLORS.f} stroke="white" strokeWidth="2" />
            </g>
          )}
        </g>

        {/* התוויות בפינות שבהן אין את שמות הצירים (x מימין, y למעלה) */}
        {asymptotes.map((a) => (
          <text
            key={`t${a.axis}${a.at}`}
            x={a.axis === 'x' ? s.sx(a.at) + 4 : s.sx(s.x0) + 4}
            y={a.axis === 'x' ? s.sy(s.y0) - 6 : s.sy(a.at) - 5}
            textAnchor="start"
            fontSize="10"
            fontWeight="700"
            fill="var(--color-slate)"
          >
            {asymptoteTex(a)}
          </text>
        ))}
      </svg>

      <div className="mt-2 flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm font-bold">
        <span style={{ color: COLORS.f }}>
          ━ <MathRenderer inline>{'$f(x)$'}</MathRenderer>
        </span>
        {showDerivative && (
          <>
            <span style={{ color: COLORS.df }}>
              ━ <MathRenderer inline>{"$f'(x)$"}</MathRenderer>
            </span>
            <span style={{ color: COLORS.tangent }}>━ המשיק בנקודה</span>
          </>
        )}
        {asymptotes.length > 0 && <span className="text-[var(--color-slate)]">- - - אסימפטוטה</span>}
      </div>

      <div className="mt-3 min-h-[3rem] rounded-2xl bg-[var(--color-mist)] px-3 py-2 text-center text-sm text-[var(--color-ink)]" aria-live="polite">
        {hx === null ? (
          <span className="text-[var(--color-slate)]">העבירו את העכבר או האצבע על הגרף כדי לראות ערכים 👆</span>
        ) : !traced ? (
          <MathRenderer inline>{`$x=${num(hx)}$ — מחוץ לתחום ההגדרה`}</MathRenderer>
        ) : (
          <MathRenderer inline>
            {`$x=${num(hx)}$ · $f(x)=${num(y)}$` +
              (showDerivative && Number.isFinite(slope) ? ` · $f'(x)=${num(slope)}$ — שיפוע המשיק` : '')}
          </MathRenderer>
        )}
      </div>
    </div>
  );
}
