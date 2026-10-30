import { useEffect, useRef, useState } from 'react';
import MathRenderer from '../ui/MathRenderer';
import LessonSlider from './LessonSlider';
import { K, approx, piTex } from './solidShapes';

const W = 340;
const H = 270;
const TEAL = 'var(--color-teal)';
const SKY = 'var(--color-sky)';
const CORAL = 'var(--color-coral)';
const INK = 'var(--color-ink)';

const ease = (t) => t * t * (3 - 2 * t);

/**
 * גליל שנפרס: חותכים את המעטפת לאורך קו ישר (באדום) ו"מיישרים" אותה —
 * היא מתעקלת פחות ופחות עד שהיא מלבן שאורכו היקף הבסיס, והבסיסים נפתחים
 * למעלה ולמטה. הפריסה עצמה: המעטפת היא קשת באורך קבוע 2πr, ברדיוס שגדל
 * מ-r עד אין-סוף (הנקודה האחורית נשארת במקום).
 */
export default function CylinderNet({ caption, r: r0 = 3, h: h0 = 5, open = 0 }) {
  const [r, setR] = useState(r0);
  const [h, setH] = useState(h0);
  const [t, setT] = useState(open);
  const [playing, setPlaying] = useState(false);
  const raf = useRef(0);
  const tRef = useRef(open);
  useEffect(() => {
    tRef.current = t;
  }, [t]);

  // אנימציה: מ-t הנוכחי אל 1 (פריסה) או אל 0 (סגירה)
  useEffect(() => {
    if (!playing) return undefined;
    const target = tRef.current < 0.5 ? 1 : 0;
    let last = performance.now();
    const step = (now) => {
      const dt = (now - last) / 1600;
      last = now;
      const next = target === 1 ? Math.min(1, tRef.current + dt) : Math.max(0, tRef.current - dt);
      tRef.current = next;
      setT(next);
      if (next === target) setPlaying(false);
      else raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [playing]);

  // קנה מידה: הפריסה כולה (רוחב 2πr, גובה h + 4r) נכנסת בשרטוט
  const s = Math.min(300 / (2 * Math.PI * r), 228 / (h + 4 * r), 34);
  const cx = W / 2;
  const netTop = (H - 14 - (h + 4 * r) * s) / 2 + 2;
  const rectTop = netTop + 2 * r * s;
  const rectBottom = rectTop + h * s;
  const yBase = rectBottom + r * K * s; // ממרכז הבסיס התחתון של הגליל הסגור
  const u = ease(t);

  // המעטפת: לכל נקודה לאורך הקשת (אורך קשת q מהנקודה האחורית) — מיקום X ועומק Z
  const rho = t < 0.999 ? r / (1 - t) : Infinity;
  const N = 72;
  const sheet = Array.from({ length: N + 1 }, (_, i) => {
    const q = -Math.PI * r + (2 * Math.PI * r * i) / N;
    if (!Number.isFinite(rho)) return [q, -r];
    const a = q / rho;
    return [rho * Math.sin(a), -r + rho * (1 - Math.cos(a))];
  });
  const scr = ([X, Z], Y) => [cx + X * s, yBase - Y * s + Z * K * s];
  const topPts = sheet.map((p) => scr(p, h));
  const botPts = sheet.map((p) => scr(p, 0));
  const xy = (p) => p.map((v) => v.toFixed(1)).join(' ');
  // רצועות דקות — כך גם הגליל הסגור (שבו החלק הקדמי והאחורי חופפים) נצבע
  const strips = topPts.slice(0, -1).map((p, i) => `M${xy(p)} L${xy(topPts[i + 1])} L${xy(botPts[i + 1])} L${xy(botPts[i])} Z`);
  const curve = (pts) => `M${pts.map(xy).join(' L')}`;
  const seams = [0, N].map((i) => [topPts[i], botPts[i]]);
  // קווי המתאר מהצדדים: הנקודות הקיצוניות משמאל ומימין
  const xs = topPts.map((p) => p[0]);
  const sides = [xs.indexOf(Math.min(...xs)), xs.indexOf(Math.max(...xs))].map((i) => [topPts[i], botPts[i]]);

  // הבסיסים: מאליפסה על הגליל אל עיגול שלם שנוגע במלבן
  const lerp = (a, b) => a + (b - a) * u;
  const rx = r * s;
  const ry = lerp(r * K * s, r * s);
  const topC = lerp(yBase - h * s, rectTop - r * s);
  const botC = lerp(yBase, rectBottom + r * s);
  const flat = t > 0.97;

  const lateral = 2 * r * h;
  const total = 2 * r * r + lateral;

  const readouts = [
    ['היקף הבסיס', '2\\pi r', 2 * r, 'ס״מ'],
    ['שטח בסיס אחד', '\\pi r^2', r * r, 'סמ״ר'],
    ['שטח המעטפת', '2\\pi r\\cdot h', lateral, 'סמ״ר'],
    ['שטח הפנים', '2\\pi r^2+2\\pi rh', total, 'סמ״ר'],
    ['נפח', '\\pi r^2\\cdot h', r * r * h, 'סמ״ק'],
  ];

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
      {caption && <MathRenderer className="mb-2 text-[var(--color-ink)]">{caption}</MathRenderer>}

      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-md" style={{ direction: 'ltr' }} role="img" aria-label="פריסה של גליל">
        <defs>
          <marker id="cn-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill={CORAL} />
          </marker>
        </defs>

        {/* בסיס תחתון (מאחור), המעטפת, ובסיס עליון */}
        <ellipse cx={cx} cy={botC} rx={rx} ry={ry} fill={SKY} fillOpacity="0.22" stroke={SKY} strokeWidth="2" />
        <g fill={TEAL} fillOpacity={0.09 + 0.12 * u} stroke="none">
          {strips.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        <path d={curve(topPts)} fill="none" stroke={TEAL} strokeWidth="2" strokeLinejoin="round" />
        <path d={curve(botPts)} fill="none" stroke={TEAL} strokeWidth="2" strokeLinejoin="round" />
        {sides.map(([a, b], i) => (
          <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={TEAL} strokeWidth="2" />
        ))}
        {seams.map(([a, b], i) => (
          <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={CORAL} strokeWidth="2.6" strokeDasharray={t < 0.02 ? '5 3' : undefined} />
        ))}
        <ellipse cx={cx} cy={topC} rx={rx} ry={ry} fill={SKY} fillOpacity="0.22" stroke={SKY} strokeWidth="2" />

        {/* רדיוס על הבסיס העליון */}
        <line x1={cx} y1={topC} x2={cx + rx} y2={topC} stroke={INK} strokeWidth="1.6" />
        <circle cx={cx} cy={topC} r="2.2" fill={INK} />
        <text x={cx + rx / 2} y={topC - 5} textAnchor="middle" fontSize="12" fontWeight="700" fontStyle="italic" fill={INK}>
          r
        </text>

        {flat ? (
          <g>
            <line x1={cx - Math.PI * r * s} y1={rectBottom + 9} x2={cx + Math.PI * r * s} y2={rectBottom + 9} stroke={CORAL} strokeWidth="1.5" markerStart="url(#cn-arrow)" markerEnd="url(#cn-arrow)" />
            {/* מלבן צר — התווית מימין לו; רחב — מתחת לחץ, משמאל לעיגול התחתון */}
            {Math.PI * r * s <= 95 ? (
              <text x={cx + Math.PI * r * s + 5} y={rectBottom + 13} fontSize="11" fontWeight="700" fill={CORAL}>
                {`2πr ≈ ${approx(2 * r)}`}
              </text>
            ) : (
              <text x={cx - Math.PI * r * s} y={rectBottom + 24} fontSize="11" fontWeight="700" fill={CORAL}>
                {`2πr ≈ ${approx(2 * r)}`}
              </text>
            )}
            <line x1={cx + Math.PI * r * s - 8} y1={rectTop + 2} x2={cx + Math.PI * r * s - 8} y2={rectBottom - 2} stroke={TEAL} strokeWidth="1.4" />
            <text x={cx + Math.PI * r * s - 12} y={(rectTop + rectBottom) / 2 + 4} textAnchor="end" fontSize="12" fontWeight="700" fill={TEAL}>
              {`h = ${h}`}
            </text>
          </g>
        ) : (
          <text x={cx + rx + 6} y={yBase - (h * s) / 2} fontSize="12" fontWeight="700" fill={TEAL}>
            {`h = ${h}`}
          </text>
        )}
      </svg>

      <div className="mt-1 flex justify-center">
        <button
          type="button"
          onClick={() => setPlaying(true)}
          disabled={playing}
          className="rounded-xl bg-[var(--color-teal)] px-4 py-1.5 text-sm font-bold text-white disabled:opacity-60"
        >
          {t < 0.5 ? '▶ פרסו את הגליל' : '◀ סגרו בחזרה'}
        </button>
      </div>

      <div className="mt-3 space-y-1">
        <LessonSlider label="פריסה" value={Math.round(t * 100)} min={0} max={100} onChange={(v) => setT(v / 100)} color={CORAL} suffix="%" width="w-14" />
        <LessonSlider label="רדיוס r" value={r} min={1} max={5} onChange={setR} color={SKY} width="w-14" />
        <LessonSlider label="גובה h" value={h} min={1} max={10} onChange={setH} color={TEAL} width="w-14" />
      </div>

      <div className="mt-3 grid gap-1.5 sm:grid-cols-2">
        {readouts.map(([name, tex, coef, unit], i) => (
          <div
            key={name}
            className={`rounded-xl p-2 text-sm ${i === readouts.length - 1 ? 'sm:col-span-2' : ''}`}
            style={{ backgroundColor: 'var(--color-mist)' }}
          >
            <span className="font-bold text-[var(--color-ink)]">{name}: </span>
            <MathRenderer inline>{`$${tex}=${piTex(coef)}\\approx${approx(coef)}$`}</MathRenderer> <span className="text-[var(--color-slate)]">{unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
