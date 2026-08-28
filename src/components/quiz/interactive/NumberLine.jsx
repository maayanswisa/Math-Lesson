import { useEffect, useState } from 'react';

export default function NumberLine({ payload = {}, correctAnswer, onAnswerReady }) {
  const min = payload.min ?? -5;
  const max = payload.max ?? 5;
  const step = payload.step ?? 0.5;
  const parsedAnswer = Number(correctAnswer);
  const target = payload.target ?? (Number.isFinite(parsedAnswer) ? parsedAnswer : min);
  const tolerance = payload.tolerance ?? step / 2 + 0.001;
  const mid = Math.round(((min + max) / 2) / step) * step;
  const [value, setValue] = useState(mid);

  function report(num) {
    onAnswerReady?.({
      value: num,
      isCorrect: Math.abs(num - target) <= tolerance,
      display: String(num),
    });
  }

  // Report the slider's initial (default) position on mount too — otherwise
  // a question whose correct answer happens to equal the midpoint shows what
  // looks like an already-correct answer, but the submit button stays
  // disabled until the student actually moves the slider.
  useEffect(() => {
    report(mid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ticks = [];
  const tickStep = step >= 1 ? 1 : step > 0 ? step : 1;
  for (let t = min; t <= max + 1e-9; t += tickStep) {
    ticks.push(Math.round(t * 1000) / 1000);
  }

  return (
    <div className="space-y-6" dir="rtl">
      <p className="text-sm text-[var(--color-slate)]">גררו את הסמן למיקום הנכון על ציר המספרים</p>
      <div className="rounded-xl bg-[var(--color-mist)]/60 px-4 py-6">
        <div className="relative mb-2 flex justify-between text-xs text-[var(--color-slate)]">
          {ticks.filter((_, i) => step >= 1 || i % 2 === 0).map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => {
            const num = Number(e.target.value);
            setValue(num);
            report(num);
          }}
          className="w-full accent-[var(--color-teal)]"
          aria-label="ציר מספרים"
        />
        <p className="mt-4 text-center font-[family-name:var(--font-display)] text-3xl text-[var(--color-teal)]">
          {value}
        </p>
      </div>
    </div>
  );
}
