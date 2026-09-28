import { useState } from 'react';
import { motion } from 'framer-motion';
import MathRenderer from '../ui/MathRenderer';

const SIZE = 300;
const MID = SIZE / 2;
const COLORS = ['var(--color-teal)', 'var(--color-coral)', 'var(--color-violet)'];

const fmtNum = (n) => String(Number(n.toFixed(2)));

/** "y = 2x - 3" בפורמט TeX, בלי "1x" / "+ -3" / "+ 0". */
export function lineTex(m, b) {
  if (m === 0) return `y=${fmtNum(b)}`;
  const mx = m === 1 ? 'x' : m === -1 ? '-x' : `${fmtNum(m)}x`;
  if (b === 0) return `y=${mx}`;
  return `y=${mx}${b > 0 ? '+' : '-'}${fmtNum(Math.abs(b))}`;
}

function Slider({ label, value, min, max, step, onChange, color }) {
  return (
    <label className="flex items-center gap-2 text-sm font-semibold">
      <span dir="ltr" className="w-8 italic" style={{ color }}>
        {label}
      </span>
      <input
        type="range"
        dir="ltr"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{ accentColor: color }}
      />
      <span dir="ltr" className="w-10 text-end" style={{ color }}>
        {fmtNum(value)}
      </span>
    </label>
  );
}

/**
 * מערכת צירים עם ישר אחד או שניים. ישר עם editable מקבל סליידרים ל-m ול-b.
 * showIntersection — מציג את נקודת החיתוך (או "מקבילים" / "אותו ישר").
 * signOf — אינדקס ישר שעבורו צובעים את ציר x בתחומי חיוביות/שליליות.
 * points — נקודות לסימון [{ x, y, label }].
 */
export default function LineGraph({ caption, lines: lines0, range = 6, showIntersection, signOf, points = [] }) {
  const [lines, setLines] = useState(lines0);
  const unit = (MID - 10) / range;
  const px = (x) => MID + x * unit;
  const py = (y) => MID - y * unit;

  const update = (i, patch) => setLines((ls) => ls.map((l, j) => (j === i ? { ...l, ...patch } : l)));

  let status = null;
  if (showIntersection && lines.length >= 2) {
    const [a, b] = lines;
    if (a.m === b.m) {
      status =
        a.b === b.b
          ? { tone: 'success', text: 'אותו ישר בדיוק — אינסוף נקודות משותפות (אינסוף פתרונות)' }
          : { tone: 'coral', text: 'שיפועים שווים — הישרים מקבילים ולא נפגשים (אין פתרון)' };
    } else {
      const x = (b.b - a.b) / (a.m - b.m);
      const y = a.m * x + a.b;
      status = { tone: 'teal', text: `נחתכים בנקודה אחת: (${fmtNum(x)}, ${fmtNum(y)}) — פתרון יחיד`, x, y };
    }
  }

  let sign = null;
  if (signOf != null) {
    const { m, b } = lines[signOf];
    if (m === 0) {
      sign = { root: null, posLeft: b > 0, posRight: b > 0, zero: b === 0 };
    } else {
      const root = -b / m;
      sign = { root, posLeft: m < 0, posRight: m > 0 };
    }
  }

  const ticks = Array.from({ length: range * 2 + 1 }, (_, i) => i - range);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}

      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="mx-auto w-full max-w-xs" style={{ direction: 'ltr' }}>
        <defs>
          <clipPath id="plot-clip">
            <rect x="0" y="0" width={SIZE} height={SIZE} />
          </clipPath>
        </defs>
        {ticks.map((t) => (
          <g key={t} stroke="var(--color-mist)" strokeWidth="1">
            <line x1={px(t)} x2={px(t)} y1={0} y2={SIZE} />
            <line y1={py(t)} y2={py(t)} x1={0} x2={SIZE} />
          </g>
        ))}
        <line x1={0} x2={SIZE} y1={MID} y2={MID} stroke="var(--color-ink)" strokeWidth="1.5" />
        <line y1={0} y2={SIZE} x1={MID} x2={MID} stroke="var(--color-ink)" strokeWidth="1.5" />
        {ticks
          .filter((t) => t !== 0 && t % 2 === 0)
          .map((t) => (
            <g key={t} fontSize="10" fill="var(--color-slate)">
              <text x={px(t)} y={MID + 13} textAnchor="middle">
                {String(t).replace('-', '−')}
              </text>
              <text x={MID - 5} y={py(t) + 3} textAnchor="end">
                {String(t).replace('-', '−')}
              </text>
            </g>
          ))}
        <text x={SIZE - 6} y={MID - 6} fontSize="12" fontStyle="italic" textAnchor="end" fill="var(--color-ink)">
          x
        </text>
        <text x={MID + 6} y={12} fontSize="12" fontStyle="italic" fill="var(--color-ink)">
          y
        </text>

        {sign && (
          <g strokeWidth="6" strokeLinecap="round" opacity="0.75">
            {sign.root == null ? (
              !sign.zero && (
                <line
                  x1={0}
                  x2={SIZE}
                  y1={MID}
                  y2={MID}
                  stroke={sign.posLeft ? 'var(--color-grass)' : 'var(--color-coral)'}
                />
              )
            ) : (
              <>
                <line
                  x1={0}
                  x2={Math.max(0, Math.min(SIZE, px(sign.root)))}
                  y1={MID}
                  y2={MID}
                  stroke={sign.posLeft ? 'var(--color-grass)' : 'var(--color-coral)'}
                />
                <line
                  x1={Math.max(0, Math.min(SIZE, px(sign.root)))}
                  x2={SIZE}
                  y1={MID}
                  y2={MID}
                  stroke={sign.posRight ? 'var(--color-grass)' : 'var(--color-coral)'}
                />
              </>
            )}
          </g>
        )}

        <g clipPath="url(#plot-clip)">
          {lines.map((l, i) => {
            const color = l.color ?? COLORS[i % COLORS.length];
            if (l.vertical != null) {
              return (
                <line key={i} x1={px(l.vertical)} x2={px(l.vertical)} y1={0} y2={SIZE} stroke={color} strokeWidth="3" />
              );
            }
            const x1 = -range - 1;
            const x2 = range + 1;
            return (
              <motion.line
                key={i}
                initial={false}
                animate={{ x1: px(x1), y1: py(l.m * x1 + l.b), x2: px(x2), y2: py(l.m * x2 + l.b) }}
                transition={{ duration: 0.25 }}
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
              />
            );
          })}
        </g>

        {lines.map(
          (l, i) =>
            l.vertical == null &&
            l.showB && (
              <circle key={`b${i}`} cx={MID} cy={py(l.b)} r="5" fill={l.color ?? COLORS[i % COLORS.length]} />
            ),
        )}
        {sign?.root != null && Math.abs(sign.root) <= range && (
          <circle cx={px(sign.root)} cy={MID} r="5" fill="white" stroke="var(--color-ink)" strokeWidth="2" />
        )}
        {status?.x != null && Math.abs(status.x) <= range && Math.abs(status.y) <= range && (
          <motion.circle
            initial={false}
            animate={{ cx: px(status.x), cy: py(status.y) }}
            r="6"
            fill="var(--color-sunshine)"
            stroke="white"
            strokeWidth="2"
          />
        )}
        {points.map((p, i) => (
          <g key={`p${i}`}>
            <circle cx={px(p.x)} cy={py(p.y)} r="5" fill="var(--color-violet)" />
            {p.label && (
              <text x={px(p.x) + 8} y={py(p.y) - 8} fontSize="11" fontWeight="700" fill="var(--color-violet)">
                {p.label}
              </text>
            )}
          </g>
        ))}
      </svg>

      <div className="mt-3 space-y-3">
        {lines.map((l, i) => {
          const color = l.color ?? COLORS[i % COLORS.length];
          return (
            <div key={i} className="space-y-1">
              <div className="text-center text-lg" style={{ color }}>
                <MathRenderer inline>{`$${l.vertical != null ? `x=${l.vertical}` : lineTex(l.m, l.b)}$`}</MathRenderer>
              </div>
              {l.editable && (
                <>
                  <Slider
                    label="m"
                    value={l.m}
                    min={-3}
                    max={3}
                    step={0.5}
                    color={color}
                    onChange={(v) => update(i, { m: v })}
                  />
                  <Slider
                    label="b"
                    value={l.b}
                    min={-5}
                    max={5}
                    step={1}
                    color={color}
                    onChange={(v) => update(i, { b: v })}
                  />
                </>
              )}
            </div>
          );
        })}
      </div>

      {status && (
        <p
          className="mt-3 rounded-xl p-3 text-center text-sm font-bold"
          style={{
            backgroundColor:
              status.tone === 'coral' ? 'rgba(196, 92, 72, 0.1)' : status.tone === 'success' ? 'rgba(45, 122, 79, 0.1)' : 'rgba(13, 110, 110, 0.1)',
            color:
              status.tone === 'coral' ? 'var(--color-coral-dark)' : status.tone === 'success' ? 'var(--color-success)' : 'var(--color-teal-dark)',
          }}
        >
          {status.text}
        </p>
      )}

      {sign && (
        <p className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm font-bold">
          <span className="text-[var(--color-grass-dark)]">▬ ירוק: הגרף מעל הציר (חיובית)</span>
          <span className="text-[var(--color-coral)]">▬ אדום: מתחת לציר (שלילית)</span>
          {sign.root != null && (
            <span className="text-[var(--color-ink)]">
              ○ חיתוך עם ציר x: <span dir="ltr">x = {fmtNum(sign.root)}</span>
            </span>
          )}
        </p>
      )}
    </div>
  );
}
