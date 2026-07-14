import { useMemo, useState } from 'react';

export default function FractionPizza({ payload = {}, correctAnswer, onAnswerReady }) {
  const slices = payload.slices ?? 4;
  const targetFilled =
    payload.correctFilled ??
    (typeof correctAnswer === 'string' && correctAnswer.includes('/')
      ? Number(correctAnswer.split('/')[0])
      : 1);

  const [filled, setFilled] = useState(() => new Set());
  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const r = 95;

  const paths = useMemo(() => {
    const out = [];
    for (let i = 0; i < slices; i += 1) {
      const a0 = (Math.PI * 2 * i) / slices - Math.PI / 2;
      const a1 = (Math.PI * 2 * (i + 1)) / slices - Math.PI / 2;
      const x0 = cx + r * Math.cos(a0);
      const y0 = cy + r * Math.sin(a0);
      const x1 = cx + r * Math.cos(a1);
      const y1 = cy + r * Math.sin(a1);
      const d = `M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1} Z`;
      out.push(d);
    }
    return out;
  }, [slices, cx, cy, r]);

  function toggle(i) {
    setFilled((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      const count = next.size;
      onAnswerReady?.(
        count > 0
          ? { value: count, isCorrect: count === targetFilled, display: `${count}/${slices}` }
          : null,
      );
      return next;
    });
  }

  return (
    <div className="flex flex-col items-center gap-4" dir="rtl">
      <p className="text-sm text-[var(--color-slate)]">לחצו על הפרוסות כדי לצבע — בחרו את השבר הנכון</p>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-sm">
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            onClick={() => toggle(i)}
            className="cursor-pointer transition"
            fill={filled.has(i) ? 'var(--color-coral)' : '#f3e6d8'}
            stroke="var(--color-ink)"
            strokeWidth={2}
          />
        ))}
        <circle cx={cx} cy={cy} r={18} fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth={2} />
      </svg>
      <p className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-ink)]">
        {filled.size}/{slices}
      </p>
    </div>
  );
}
