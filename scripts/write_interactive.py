# -*- coding: utf-8 -*-
"""Write remaining gamification files with UTF-8 Hebrew."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def U(s: str) -> str:
    out = []
    i = 0
    while i < len(s):
        if s[i : i + 2] == "\\u" and i + 6 <= len(s):
            hexpart = s[i + 2 : i + 6]
            if all(c in "0123456789abcdefABCDEF" for c in hexpart):
                out.append(chr(int(hexpart, 16)))
                i += 6
                continue
        out.append(s[i])
        i += 1
    return "".join(out)


def w(rel: str, content: str):
    path = ROOT / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(U(content), encoding="utf-8")
    print("wrote", rel)


w(
    "src/components/quiz/interactive/FractionPizza.jsx",
    r'''import { useMemo, useState } from 'react';

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
      <p className="text-sm text-[var(--color-slate)]">
        \u05dc\u05d7\u05e6\u05d5 \u05e2\u05dc \u05d4\u05e4\u05e8\u05d5\u05e1\u05d5\u05ea \u05db\u05d3\u05d9 \u05dc\u05e6\u05d1\u05e2 \u2014 \u05d1\u05d7\u05e8\u05d5 \u05d0\u05ea \u05d4\u05e9\u05d1\u05e8 \u05d4\u05e0\u05db\u05d5\u05df
      </p>
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
''',
)

w(
    "src/components/quiz/interactive/NumberLine.jsx",
    r'''import { useState } from 'react';

export default function NumberLine({ payload = {}, correctAnswer, onAnswerReady }) {
  const min = payload.min ?? -5;
  const max = payload.max ?? 5;
  const step = payload.step ?? 0.5;
  const target = payload.target ?? Number(correctAnswer);
  const tolerance = payload.tolerance ?? step / 2 + 0.001;
  const mid = Math.round(((min + max) / 2) / step) * step;
  const [value, setValue] = useState(mid);

  function update(v) {
    const num = Number(v);
    setValue(num);
    onAnswerReady?.({
      value: num,
      isCorrect: Math.abs(num - target) <= tolerance,
      display: String(num),
    });
  }

  // initial report
  if (value === mid && typeof window !== 'undefined') {
    // deferred via onChange only — report once on first render path
  }

  const ticks = [];
  for (let t = min; t <= max + 1e-9; t += step >= 1 ? 1 : step) {
    ticks.push(Math.round(t * 1000) / 1000);
  }

  return (
    <div className="space-y-6" dir="rtl">
      <p className="text-sm text-[var(--color-slate)]">
        \u05d2\u05e8\u05e8\u05d5 \u05d0\u05ea \u05d4\u05e1\u05de\u05df \u05dc\u05de\u05d9\u05e7\u05d5\u05dd \u05d4\u05e0\u05db\u05d5\u05df \u05e2\u05dc \u05e6\u05d9\u05e8 \u05d4\u05de\u05e1\u05e4\u05e8\u05d9\u05dd
      </p>
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
          onChange={(e) => update(e.target.value)}
          onMouseUp={() => update(value)}
          onTouchEnd={() => update(value)}
          className="w-full accent-[var(--color-teal)]"
          aria-label="\u05e6\u05d9\u05e8 \u05de\u05e1\u05e4\u05e8\u05d9\u05dd"
        />
        <p className="mt-4 text-center font-[family-name:var(--font-display)] text-3xl text-[var(--color-teal)]">
          {value}
        </p>
      </div>
    </div>
  );
}
''',
)

w(
    "src/components/quiz/interactive/DragMatch.jsx",
    r'''import { useEffect, useState } from 'react';
import MathRenderer from '../../ui/MathRenderer';

export default function DragMatch({ payload = {}, onAnswerReady }) {
  const items = payload.items ?? [];
  const bins = payload.bins ?? [];
  const solution = payload.solution ?? {};
  const [placements, setPlacements] = useState({});
  const [dragging, setDragging] = useState(null);

  useEffect(() => {
    const placedCount = Object.keys(placements).length;
    if (placedCount < items.length) {
      onAnswerReady?.(null);
      return;
    }
    const isCorrect = items.every((it) => placements[it.id] === solution[it.id]);
    onAnswerReady?.({
      value: placements,
      isCorrect,
      display: isCorrect ? '\u05d4\u05ea\u05d0\u05de\u05d4 \u05de\u05dc\u05d0\u05d4' : '\u05d4\u05ea\u05d0\u05de\u05d4 \u05d7\u05dc\u05e7\u05d9\u05ea',
    });
  }, [placements, items, solution, onAnswerReady]);

  function onDrop(binId) {
    if (!dragging) return;
    setPlacements((p) => ({ ...p, [dragging]: binId }));
    setDragging(null);
  }

  const unplaced = items.filter((it) => !placements[it.id]);

  return (
    <div className="space-y-4" dir="rtl">
      <p className="text-sm text-[var(--color-slate)]">\u05d2\u05e8\u05e8\u05d5 \u05db\u05dc \u05e4\u05e8\u05d9\u05d8 \u05dc\u05ea\u05d9\u05d1\u05d4 \u05d4\u05de\u05ea\u05d0\u05d9\u05de\u05d4</p>
      <div className="flex min-h-14 flex-wrap gap-2 rounded-xl bg-[var(--color-mist)]/50 p-3">
        {unplaced.length === 0 ? (
          <span className="text-sm text-[var(--color-slate)]">\u05d4\u05db\u05dc \u05e9\u05d5\u05d9\u05da \u2014 \u05e0\u05d9\u05ea\u05df \u05dc\u05d0\u05e9\u05e8</span>
        ) : (
          unplaced.map((it) => (
            <button
              key={it.id}
              type="button"
              draggable
              onDragStart={() => setDragging(it.id)}
              onDragEnd={() => setDragging(null)}
              className="cursor-grab rounded-lg bg-white px-3 py-2 text-sm font-medium shadow-sm ring-1 ring-black/10 active:cursor-grabbing"
            >
              <MathRenderer>{it.label}</MathRenderer>
            </button>
          ))
        )}
      </div>
      <div className={`grid gap-3 ${bins.length > 2 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
        {bins.map((bin) => {
          const inBin = items.filter((it) => placements[it.id] === bin.id);
          return (
            <div
              key={bin.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(bin.id)}
              className="min-h-28 rounded-2xl border-2 border-dashed border-[var(--color-teal)]/40 bg-white/80 p-3"
            >
              <p className="mb-2 text-center text-sm font-semibold text-[var(--color-teal)]">
                <MathRenderer>{bin.label}</MathRenderer>
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {inBin.map((it) => (
                  <button
                    key={it.id}
                    type="button"
                    onClick={() =>
                      setPlacements((p) => {
                        const n = { ...p };
                        delete n[it.id];
                        return n;
                      })
                    }
                    className="rounded-lg bg-[var(--color-teal)]/10 px-3 py-1.5 text-sm ring-1 ring-[var(--color-teal)]/30"
                    title="\u05dc\u05d7\u05e6\u05d5 \u05db\u05d3\u05d9 \u05dc\u05d4\u05d7\u05d6\u05d9\u05e8"
                  >
                    <MathRenderer>{it.label}</MathRenderer>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
''',
)

print("interactive components done")
