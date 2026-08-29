import { useEffect, useState } from 'react';
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
      display: isCorrect ? 'התאמה מלאה' : 'התאמה חלקית',
    });
  }, [placements, items, solution, onAnswerReady]);

  function onDrop(binId) {
    if (!dragging) return;
    setPlacements((p) => ({ ...p, [dragging]: binId }));
    setDragging(null);
  }

  const unplaced = items.filter((it) => !(it.id in placements));

  return (
    <div className="space-y-4" dir="rtl">
      <p className="text-sm text-[var(--color-slate)]">גררו כל פריט לתיבה המתאימה</p>
      <div className="flex min-h-14 flex-wrap gap-2 rounded-xl bg-[var(--color-mist)]/50 p-3">
        {unplaced.length === 0 ? (
          <span className="text-sm text-[var(--color-slate)]">הכל שויך — ניתן לאשר</span>
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
              <div className="mb-2 text-center text-sm font-semibold text-[var(--color-teal)]">
                <MathRenderer>{bin.label}</MathRenderer>
              </div>
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
                    title="לחצו כדי להחזיר"
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
