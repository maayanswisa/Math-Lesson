import { useEffect, useRef, useState } from 'react';

/** Digital scratchpad - fills card height; mouse / touch with HiDPI. */
export default function Scratchpad() {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const ctxRef = useRef(null);
  const drawing = useRef(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!open) return undefined;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return undefined;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;

    const applySize = () => {
      const ratio = window.devicePixelRatio || 1;
      const w = Math.max(1, Math.floor(wrap.clientWidth));
      const h = Math.max(1, Math.floor(wrap.clientHeight));
      const nextW = Math.round(w * ratio);
      const nextH = Math.round(h * ratio);
      if (canvas.width !== nextW || canvas.height !== nextH) {
        canvas.width = nextW;
        canvas.height = nextH;
      }
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#1a2b3c';
      ctx.lineWidth = 2.2;
    };

    applySize();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(applySize) : null;
    ro?.observe(wrap);
    window.addEventListener('resize', applySize);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', applySize);
    };
  }, [open]);

  function pos(e) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  function start(e) {
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;
    drawing.current = true;
    try {
      canvas.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  }

  function move(e) {
    if (!drawing.current) return;
    e.preventDefault();
    const ctx = ctxRef.current;
    if (!ctx) return;
    const p = pos(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  }

  function end(e) {
    if (!drawing.current) return;
    drawing.current = false;
    const canvas = canvasRef.current;
    if (canvas && e?.pointerId != null) {
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    }
  }

  function clear() {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="h-full w-full rounded-xl bg-[var(--color-mist)]/70 px-3 py-2 text-sm text-[var(--color-slate)] ring-1 ring-black/5"
      >
        {'\u05e4\u05ea\u05d7\u05d5 \u05d0\u05ea \u05dc\u05d5\u05d7 \u05d4\u05d8\u05d9\u05d5\u05d8\u05d4'}
      </button>
    );
  }

  return (
    <div
      className="flex h-full min-h-[11rem] flex-col overflow-hidden rounded-xl bg-white ring-1 ring-black/10"
      dir="rtl"
    >
      <div className="flex shrink-0 items-center justify-between border-b border-black/5 px-3 py-2">
        <span className="text-sm font-semibold text-[var(--color-ink)]">{'\u05d8\u05d9\u05d5\u05d8\u05d4'}</span>
        <div className="flex gap-2">
          <button type="button" onClick={clear} className="text-xs text-[var(--color-slate)] hover:text-[var(--color-teal)]">
            {'\u05e0\u05e7\u05d4'}
          </button>
          <button type="button" onClick={() => setOpen(false)} className="text-xs text-[var(--color-slate)] hover:text-[var(--color-teal)]">
            {'\u05e1\u05d2\u05d5\u05e8'}
          </button>
        </div>
      </div>
      <div ref={wrapRef} className="relative min-h-[10rem] flex-1 bg-[#fbfcfd]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block touch-none cursor-crosshair"
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerCancel={end}
        />
      </div>
    </div>
  );
}
