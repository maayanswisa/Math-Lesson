import { useEffect, useRef, useState } from 'react';

const COLORS = [
  { name: 'שחור', value: '#1a2b3c' },
  { name: 'אדום', value: '#e0483e' },
  { name: 'כחול', value: '#2f6fed' },
  { name: 'ירוק', value: '#2fa84f' },
  { name: 'כתום', value: '#f2994a' },
  { name: 'סגול', value: '#8e5fe0' },
];

const TOOLS = [
  { id: 'pen', label: 'עט' },
  { id: 'marker', label: 'מרקר' },
  { id: 'eraser', label: 'מחק' },
];

const MIN_SIZE = 1;
const MAX_SIZE = 10;
const DEFAULT_SIZE = 3;
const MARKER_ALPHA = 0.22;

/** Hold still (without moving) this long, mid-stroke, to snap the shape to a precise version. */
const HOLD_MS = 1200;
/** Movement beyond this (CSS px) resets the "holding still" timer. */
const MOVE_RESET_PX = 4;

function widthForTool(tool, size) {
  if (tool === 'eraser') return size * 5;
  if (tool === 'marker') return size * 4;
  return size;
}

// ---------- shape recognition (line / circle / triangle / rectangle) ----------

function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function pathLength(points) {
  let len = 0;
  for (let i = 1; i < points.length; i += 1) len += dist(points[i - 1], points[i]);
  return len;
}

function boundingBox(points) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const p of points) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }
  return { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY };
}

function centroid(points) {
  let sx = 0;
  let sy = 0;
  for (const p of points) {
    sx += p.x;
    sy += p.y;
  }
  return { x: sx / points.length, y: sy / points.length };
}

function convexHull(points) {
  const pts = [...points].sort((a, b) => a.x - b.x || a.y - b.y);
  if (pts.length < 3) return pts;
  const cross = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  const lower = [];
  for (const p of pts) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
    lower.push(p);
  }
  const upper = [];
  for (let i = pts.length - 1; i >= 0; i -= 1) {
    const p = pts[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
    upper.push(p);
  }
  upper.pop();
  lower.pop();
  return lower.concat(upper);
}

function perpendicularDistance(p, a, b) {
  const num = Math.abs((b.y - a.y) * p.x - (b.x - a.x) * p.y + b.x * a.y - b.y * a.x);
  const den = Math.hypot(b.y - a.y, b.x - a.x) || 1;
  return num / den;
}

function rdp(pts, eps) {
  if (pts.length < 3) return pts;
  let maxDist = 0;
  let index = 0;
  const start = pts[0];
  const end = pts[pts.length - 1];
  for (let i = 1; i < pts.length - 1; i += 1) {
    const d = perpendicularDistance(pts[i], start, end);
    if (d > maxDist) {
      maxDist = d;
      index = i;
    }
  }
  if (maxDist > eps) {
    const left = rdp(pts.slice(0, index + 1), eps);
    const right = rdp(pts.slice(index), eps);
    return left.slice(0, -1).concat(right);
  }
  return [start, end];
}

/** Simplify a closed hull by splitting at its two farthest-apart points into two open chains. */
function rdpClosed(points, epsilon) {
  if (points.length < 3) return points;
  let maxD = -1;
  let ia = 0;
  let ib = 0;
  for (let i = 0; i < points.length; i += 1) {
    for (let j = i + 1; j < points.length; j += 1) {
      const d = dist(points[i], points[j]);
      if (d > maxD) {
        maxD = d;
        ia = i;
        ib = j;
      }
    }
  }
  if (ia > ib) [ia, ib] = [ib, ia];
  const chain1 = points.slice(ia, ib + 1);
  const chain2 = points.slice(ib).concat(points.slice(0, ia + 1));
  const s1 = rdp(chain1, epsilon);
  const s2 = rdp(chain2, epsilon);
  return s1.slice(0, -1).concat(s2.slice(0, -1));
}

const CIRCLE_RATIO_MAX = 0.09;

/** Classify a freehand stroke as a line / circle / triangle / rectangle, or null if unclear. */
function classifyShape(rawPoints) {
  if (rawPoints.length < 4) return null;
  const bbox = boundingBox(rawPoints);
  const diag = Math.hypot(bbox.width, bbox.height);
  if (diag < 20) return null;

  const len = pathLength(rawPoints);
  const straightDist = dist(rawPoints[0], rawPoints[rawPoints.length - 1]);
  const closed = straightDist < diag * 0.25;

  if (!closed && len > 0 && len / Math.max(straightDist, 1) < 1.25) {
    return { type: 'line', a: rawPoints[0], b: rawPoints[rawPoints.length - 1] };
  }
  if (!closed) return null;

  const c = centroid(rawPoints);
  const radii = rawPoints.map((p) => dist(p, c));
  const meanR = radii.reduce((a, b) => a + b, 0) / radii.length;
  const variance = radii.reduce((a, r) => a + (r - meanR) ** 2, 0) / radii.length;
  const stdDev = Math.sqrt(variance);
  if (meanR > 0 && stdDev / meanR < CIRCLE_RATIO_MAX) {
    return {
      type: 'circle',
      cx: bbox.minX + bbox.width / 2,
      cy: bbox.minY + bbox.height / 2,
      rx: bbox.width / 2,
      ry: bbox.height / 2,
    };
  }

  const hull = convexHull(rawPoints);
  const epsilon = diag * 0.06;
  const simplified = rdpClosed(hull, epsilon);

  if (simplified.length === 3) return { type: 'triangle', points: simplified };
  if (simplified.length === 4) {
    return { type: 'rectangle', minX: bbox.minX, minY: bbox.minY, maxX: bbox.maxX, maxY: bbox.maxY };
  }
  return null;
}

function drawShape(ctx, shape) {
  ctx.beginPath();
  if (shape.type === 'line') {
    ctx.moveTo(shape.a.x, shape.a.y);
    ctx.lineTo(shape.b.x, shape.b.y);
  } else if (shape.type === 'circle') {
    ctx.ellipse(shape.cx, shape.cy, Math.max(shape.rx, 1), Math.max(shape.ry, 1), 0, 0, Math.PI * 2);
  } else if (shape.type === 'triangle') {
    ctx.moveTo(shape.points[0].x, shape.points[0].y);
    ctx.lineTo(shape.points[1].x, shape.points[1].y);
    ctx.lineTo(shape.points[2].x, shape.points[2].y);
    ctx.closePath();
  } else if (shape.type === 'rectangle') {
    ctx.rect(shape.minX, shape.minY, shape.maxX - shape.minX, shape.maxY - shape.minY);
  }
  ctx.stroke();
}

// ---------- canvas resize that preserves existing ink ----------

function resizeCanvasPreservingContent(canvas, nextW, nextH) {
  if (canvas.width === nextW && canvas.height === nextH) return;
  if (canvas.width > 0 && canvas.height > 0) {
    const snapshot = document.createElement('canvas');
    snapshot.width = canvas.width;
    snapshot.height = canvas.height;
    snapshot.getContext('2d').drawImage(canvas, 0, 0);
    canvas.width = nextW;
    canvas.height = nextH;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(snapshot, 0, 0, snapshot.width, snapshot.height, 0, 0, nextW, nextH);
  } else {
    canvas.width = nextW;
    canvas.height = nextH;
  }
}

/**
 * Digital scratchpad - fills card height; mouse / touch with HiDPI.
 * Pen and marker are drawn on separate stacked canvases so marker strokes
 * always render underneath pen ink, regardless of draw order. Holding still
 * for a moment mid-stroke snaps a rough line/circle/triangle/rectangle to a
 * precise version.
 */
export default function Scratchpad() {
  const penCanvasRef = useRef(null);
  const markerCanvasRef = useRef(null);
  const wrapRef = useRef(null);
  const penCtxRef = useRef(null);
  const markerCtxRef = useRef(null);
  const drawing = useRef(false);
  const strokePointsRef = useRef([]);
  const holdTimerRef = useRef(null);
  const shapeLockedRef = useRef(false);
  const preStrokeSnapshotRef = useRef(null);
  const [open, setOpen] = useState(true);
  const [tool, setTool] = useState('pen');
  const [color, setColor] = useState(COLORS[0].value);
  const [size, setSize] = useState(DEFAULT_SIZE);
  const toolRef = useRef(tool);
  const colorRef = useRef(color);
  const sizeRef = useRef(size);

  useEffect(() => {
    toolRef.current = tool;
  }, [tool]);

  useEffect(() => {
    colorRef.current = color;
  }, [color]);

  useEffect(() => {
    sizeRef.current = size;
  }, [size]);

  useEffect(() => {
    if (!open) return undefined;
    const penCanvas = penCanvasRef.current;
    const markerCanvas = markerCanvasRef.current;
    const wrap = wrapRef.current;
    if (!penCanvas || !markerCanvas || !wrap) return undefined;
    penCtxRef.current = penCanvas.getContext('2d');
    markerCtxRef.current = markerCanvas.getContext('2d');

    const applySize = () => {
      const ratio = window.devicePixelRatio || 1;
      const w = Math.max(1, Math.floor(wrap.clientWidth));
      const h = Math.max(1, Math.floor(wrap.clientHeight));
      const nextW = Math.round(w * ratio);
      const nextH = Math.round(h * ratio);
      // Resizing a <canvas> wipes its bitmap — preserve existing ink across
      // legitimate layout changes (this can fire often while the sidebar's
      // height tracks the question card, e.g. when a hint/feedback panel
      // changes its height) instead of silently erasing the student's work.
      for (const canvas of [penCanvas, markerCanvas]) {
        resizeCanvasPreservingContent(canvas, nextW, nextH);
      }
      // Use the actual buffer/CSS ratio (not the raw devicePixelRatio) so drawing
      // coordinates line up exactly with the rounded canvas buffer size — otherwise
      // rounding error compounds across the canvas and strokes drift off-pointer.
      for (const ctx of [penCtxRef.current, markerCtxRef.current]) {
        ctx.setTransform(nextW / w, 0, 0, nextH / h, 0, 0);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
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
    const canvas = penCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  /** Returns the context(s) to draw on for the current tool, pre-styled. */
  function activeContexts() {
    const currentTool = toolRef.current;
    if (currentTool === 'eraser') {
      const ctxs = [penCtxRef.current, markerCtxRef.current];
      for (const ctx of ctxs) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.globalAlpha = 1;
        ctx.lineWidth = widthForTool('eraser', sizeRef.current);
      }
      return ctxs;
    }
    if (currentTool === 'marker') {
      const ctx = markerCtxRef.current;
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = MARKER_ALPHA;
      ctx.lineWidth = widthForTool('marker', sizeRef.current);
      ctx.strokeStyle = colorRef.current;
      return [ctx];
    }
    const ctx = penCtxRef.current;
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    ctx.lineWidth = widthForTool('pen', sizeRef.current);
    ctx.strokeStyle = colorRef.current;
    return [ctx];
  }

  function clearHoldTimer() {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  }

  function attemptShapeSnap() {
    holdTimerRef.current = null;
    if (!drawing.current || shapeLockedRef.current) return;
    if (toolRef.current === 'eraser') return;
    const shape = classifyShape(strokePointsRef.current);
    if (!shape) return;
    const isMarker = toolRef.current === 'marker';
    const ctx = isMarker ? markerCtxRef.current : penCtxRef.current;
    if (!ctx || !preStrokeSnapshotRef.current) return;
    // Undo the rough freehand ink drawn so far, then draw the precise shape in its place.
    ctx.putImageData(preStrokeSnapshotRef.current, 0, 0);
    drawShape(ctx, shape);
    shapeLockedRef.current = true;
  }

  function armHoldTimer() {
    clearHoldTimer();
    holdTimerRef.current = setTimeout(attemptShapeSnap, HOLD_MS);
  }

  function start(e) {
    e.preventDefault();
    const canvas = penCanvasRef.current;
    if (!canvas) return;
    const ctxs = activeContexts();
    if (!ctxs.length) return;
    drawing.current = ctxs;
    shapeLockedRef.current = false;
    strokePointsRef.current = [];
    try {
      canvas.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    const p = pos(e);
    strokePointsRef.current.push(p);

    if (toolRef.current !== 'eraser') {
      const targetCanvas = toolRef.current === 'marker' ? markerCanvasRef.current : penCanvasRef.current;
      const targetCtx = toolRef.current === 'marker' ? markerCtxRef.current : penCtxRef.current;
      preStrokeSnapshotRef.current = targetCtx.getImageData(0, 0, targetCanvas.width, targetCanvas.height);
      armHoldTimer();
    } else {
      preStrokeSnapshotRef.current = null;
    }

    for (const ctx of ctxs) {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      // draw a dot on tap, not just on drag
      ctx.lineTo(p.x + 0.01, p.y + 0.01);
      ctx.stroke();
    }
  }

  function move(e) {
    if (!drawing.current) return;
    e.preventDefault();
    if (shapeLockedRef.current) return;
    const p = pos(e);

    if (toolRef.current !== 'eraser') {
      const pts = strokePointsRef.current;
      const last = pts[pts.length - 1];
      if (last && dist(p, last) > MOVE_RESET_PX) {
        armHoldTimer();
      }
    }
    strokePointsRef.current.push(p);

    for (const ctx of drawing.current) {
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    }
  }

  function end(e) {
    clearHoldTimer();
    if (!drawing.current) return;
    drawing.current = false;
    shapeLockedRef.current = false;
    strokePointsRef.current = [];
    preStrokeSnapshotRef.current = null;
    const canvas = penCanvasRef.current;
    if (canvas && e?.pointerId != null) {
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    }
  }

  function clear() {
    for (const [canvas, ctx] of [
      [penCanvasRef.current, penCtxRef.current],
      [markerCanvasRef.current, markerCtxRef.current],
    ]) {
      if (!canvas || !ctx) continue;
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="h-full w-full rounded-xl bg-[var(--color-mist)]/70 px-3 py-2 text-sm text-[var(--color-slate)] ring-1 ring-black/5"
      >
        {'פתחו את לוח הטיוטה'}
      </button>
    );
  }

  return (
    <div
      className="flex h-full min-h-[16rem] flex-col overflow-hidden rounded-xl bg-white ring-1 ring-black/10"
      dir="rtl"
    >
      <div className="flex shrink-0 items-center justify-between border-b border-black/5 px-3 py-2">
        <span className="text-sm font-semibold text-[var(--color-ink)]">{'טיוטה'}</span>
        <div className="flex gap-2">
          <button type="button" onClick={clear} className="text-xs text-[var(--color-slate)] hover:text-[var(--color-teal)]">
            {'נקה הכל'}
          </button>
          <button type="button" onClick={() => setOpen(false)} className="text-xs text-[var(--color-slate)] hover:text-[var(--color-teal)]">
            {'מזער'}
          </button>
        </div>
      </div>

      <div className="flex shrink-0 gap-1.5 border-b border-black/5 px-3 py-2">
        {TOOLS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTool(t.id)}
            className={`flex-1 rounded-lg px-2 py-1.5 text-xs font-medium transition ${
              tool === t.id
                ? 'bg-[var(--color-teal)] text-white'
                : 'bg-[var(--color-paper)] text-[var(--color-slate)] hover:bg-[var(--color-mist)]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex shrink-0 items-center gap-2 border-b border-black/5 px-3 py-2">
        <span className="shrink-0 text-xs text-[var(--color-slate)]">{'עובי'}</span>
        <input
          type="range"
          min={MIN_SIZE}
          max={MAX_SIZE}
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="h-1.5 w-full flex-1 accent-[var(--color-teal)]"
          aria-label="עובי החוד"
        />
        <span
          className="shrink-0 rounded-full bg-[var(--color-ink)]"
          style={{
            width: Math.max(4, Math.min(18, size * 1.6)),
            height: Math.max(4, Math.min(18, size * 1.6)),
          }}
        />
      </div>

      {tool !== 'eraser' && (
        <div className="flex shrink-0 items-center gap-1.5 border-b border-black/5 px-3 py-2">
          {COLORS.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setColor(c.value)}
              aria-label={c.name}
              className={`h-5 w-5 shrink-0 rounded-full ring-2 transition ${
                color === c.value ? 'ring-[var(--color-teal)]' : 'ring-transparent hover:ring-black/15'
              }`}
              style={{ backgroundColor: c.value }}
            />
          ))}
        </div>
      )}

      <div ref={wrapRef} className="relative min-h-[15rem] flex-1 bg-[#fbfcfd]">
        <canvas ref={markerCanvasRef} className="absolute inset-0 block h-full w-full" />
        <canvas
          ref={penCanvasRef}
          className="absolute inset-0 block h-full w-full touch-none cursor-crosshair"
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerCancel={end}
        />
      </div>
    </div>
  );
}
