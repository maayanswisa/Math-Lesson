const fmt = (n) => String(Number(Number(n).toFixed(2)));

/** סליידר אחיד להמחשות: תווית, פס, וערך. */
export default function LessonSlider({ label, value, min, max, step = 1, onChange, color = 'var(--color-teal)', suffix = '', width = 'w-10' }) {
  return (
    <label className="flex items-center gap-2 text-sm font-semibold">
      <span className={`${width} shrink-0 whitespace-nowrap`} style={{ color }}>
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
      <span dir="ltr" className="w-12 shrink-0 text-end font-bold" style={{ color }}>
        {fmt(value)}
        {suffix}
      </span>
    </label>
  );
}

export { fmt };
