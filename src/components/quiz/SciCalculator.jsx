import { useState } from 'react';

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

function toDeg(rad) {
  return (rad * 180) / Math.PI;
}

function roundNice(n) {
  if (!Number.isFinite(n)) throw new Error('nan');
  return Math.round(n * 1e10) / 1e10;
}

function factorial(n) {
  const r = Math.round(n);
  if (r < 0 || r > 1000) throw new Error('range');
  let result = 1;
  for (let i = 2; i <= r; i += 1) result *= i;
  return result;
}

function replaceFn(s, prefix, fn) {
  const start = s.indexOf(prefix);
  if (start < 0) return s;
  let depth = 0;
  const open = start + prefix.length - 1;
  for (let i = open; i < s.length; i += 1) {
    if (s[i] === '(') depth += 1;
    else if (s[i] === ')') {
      depth -= 1;
      if (depth === 0) {
        const inner = s.slice(open + 1, i);
        const result = fn(inner);
        return `${s.slice(0, start)}(${result})${s.slice(i + 1)}`;
      }
    }
  }
  // Missing closing paren(s): treat rest of string as the argument
  const inner = s.slice(open + 1);
  const result = fn(inner);
  return `${s.slice(0, start)}(${result})`;
}

function closeOpenParens(s) {
  let depth = 0;
  for (let i = 0; i < s.length; i += 1) {
    if (s[i] === '(') depth += 1;
    else if (s[i] === ')') depth -= 1;
  }
  if (depth > 0) return s + ')'.repeat(depth);
  return s;
}

const SQRT = '√';
const TIMES = '×';
const DIV = '÷';
const MINUS = '−';
const PI = 'π';
const EULER = 'ℯ';

function safeEval(raw) {
  let s = String(raw);
  s = s.split(TIMES).join('*');
  s = s.split(DIV).join('/');
  s = s.split(MINUS).join('-');
  s = s.split(SQRT).join('sqrt');
  s = s.split(PI).join(`(${Math.PI})`);
  s = s.split(EULER).join(`(${Math.E})`);
  s = s.replace(/pi/gi, `(${Math.PI})`);

  // Postfix operators on plain numeric literals, resolved before function parsing.
  s = s.replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');
  s = s.replace(/(\d+(?:\.\d+)?)!/g, (_, numStr) => String(factorial(parseFloat(numStr))));

  // Inverse-trig prefixes must be consumed before the plain sin/cos/tan loops below,
  // since e.g. "asin(" contains "sin(" as a substring and would otherwise be mismatched.
  while (s.includes('asin(')) {
    s = replaceFn(s, 'asin(', (inner) => toDeg(Math.asin(safeEval(inner))));
  }
  while (s.includes('acos(')) {
    s = replaceFn(s, 'acos(', (inner) => toDeg(Math.acos(safeEval(inner))));
  }
  while (s.includes('atan(')) {
    s = replaceFn(s, 'atan(', (inner) => toDeg(Math.atan(safeEval(inner))));
  }
  while (s.includes('sqrt(')) {
    s = replaceFn(s, 'sqrt(', (inner) => Math.sqrt(safeEval(inner)));
  }
  while (s.includes('sin(')) {
    s = replaceFn(s, 'sin(', (inner) => Math.sin(toRad(safeEval(inner))));
  }
  while (s.includes('cos(')) {
    s = replaceFn(s, 'cos(', (inner) => Math.cos(toRad(safeEval(inner))));
  }
  while (s.includes('tan(')) {
    s = replaceFn(s, 'tan(', (inner) => Math.tan(toRad(safeEval(inner))));
  }
  while (s.includes('log(')) {
    s = replaceFn(s, 'log(', (inner) => Math.log10(safeEval(inner)));
  }
  while (s.includes('ln(')) {
    s = replaceFn(s, 'ln(', (inner) => Math.log(safeEval(inner)));
  }

  s = closeOpenParens(s);
  s = s.replace(/\^/g, '**');
  // eslint-disable-next-line no-new-func
  const val = Function('"use strict"; return (' + s + ');')();
  return roundNice(val);
}

/** Each key has a primary action, and optionally a shift (SHIFT-key) alternate. */
const SCI_KEYS = [
  { primary: { label: 'sin', insert: 'sin(' }, shift: { label: 'sin⁻¹', insert: 'asin(' } },
  { primary: { label: 'cos', insert: 'cos(' }, shift: { label: 'cos⁻¹', insert: 'acos(' } },
  { primary: { label: 'tan', insert: 'tan(' }, shift: { label: 'tan⁻¹', insert: 'atan(' } },
  { primary: { label: PI, insert: PI }, shift: { label: EULER, insert: EULER } },
  { primary: { label: SQRT, insert: SQRT + '(' }, shift: { label: 'x²', insert: '^2', suffix: true } },
  { primary: { label: 'x^y', insert: '^' } },
  { primary: { label: '(', insert: '(' } },
  { primary: { label: ')', insert: ')' } },
  { primary: { label: 'log', insert: 'log(' }, shift: { label: 'ln', insert: 'ln(' } },
  { primary: { label: '%', insert: '%', suffix: true } },
  { primary: { label: '±', action: 'negate' } },
  { primary: { label: 'x!', insert: '!', suffix: true } },
];

const NUM_ROWS = [
  [
    { label: '7', insert: '7' },
    { label: '8', insert: '8' },
    { label: '9', insert: '9' },
    { label: DIV, insert: DIV, kind: 'op' },
  ],
  [
    { label: '4', insert: '4' },
    { label: '5', insert: '5' },
    { label: '6', insert: '6' },
    { label: TIMES, insert: TIMES, kind: 'op' },
  ],
  [
    { label: '1', insert: '1' },
    { label: '2', insert: '2' },
    { label: '3', insert: '3' },
    { label: MINUS, insert: MINUS, kind: 'op' },
  ],
  [
    { label: '0', insert: '0' },
    { label: '.', insert: '.' },
    { label: '=', insert: '=', kind: 'eq' },
    { label: '+', insert: '+', kind: 'op' },
  ],
];

/** Scientific calculator - always visible, organized keypad, SHIFT for inverse functions. */
export default function SciCalculator() {
  const [expr, setExpr] = useState('');
  const [display, setDisplay] = useState('0');
  const [fresh, setFresh] = useState(true);
  const [shift, setShift] = useState(false);
  const [solved, setSolved] = useState(null);
  const [open, setOpen] = useState(true);

  function press(token) {
    setSolved(null);
    setExpr((e) => (fresh ? token : e + token));
    setDisplay((d) => (fresh || d === '0' || d === 'Err' ? token : d + token));
    setFresh(false);
  }

  function pressSuffix(token) {
    if (!expr) return;
    setSolved(null);
    setExpr((e) => e + token);
    setDisplay((d) => (d === '0' || d === 'Err' ? d : d + token));
    setFresh(false);
  }

  function toggleSign() {
    if (!expr) return;
    setSolved(null);
    setExpr((e) => (e.startsWith(MINUS) ? e.slice(1) : MINUS + e));
    setDisplay((d) => (d === '0' ? d : d.startsWith(MINUS) ? d.slice(1) : MINUS + d));
  }

  function handleSci(variant) {
    if (variant.action === 'negate') {
      toggleSign();
    } else if (variant.suffix) {
      pressSuffix(variant.insert);
    } else {
      press(variant.insert);
    }
    setShift(false);
  }

  function clearAll() {
    setExpr('');
    setDisplay('0');
    setFresh(true);
    setShift(false);
    setSolved(null);
  }

  function backspace() {
    setSolved(null);
    if (fresh) {
      clearAll();
      return;
    }
    setExpr((e) => e.slice(0, -1));
    setDisplay((d) => {
      const next = d.slice(0, -1);
      return next || '0';
    });
  }

  function evaluate() {
    if (!expr || (solved && fresh)) return;
    try {
      const result = safeEval(expr);
      setSolved({ expr, result: String(result) });
      setDisplay(String(result));
      setExpr(String(result));
      setFresh(true);
    } catch {
      setSolved(null);
      setDisplay('Err');
      setFresh(true);
    }
  }

  function btnClass(kind) {
    if (kind === 'op') {
      return 'bg-[var(--color-teal)]/12 font-semibold text-[var(--color-teal)] hover:bg-[var(--color-teal)]/20';
    }
    if (kind === 'eq') {
      return 'bg-[var(--color-teal)] font-semibold text-white hover:bg-[var(--color-teal-dark)]';
    }
    if (kind === 'sci') {
      return 'bg-[var(--color-mist)] text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-teal)]/10';
    }
    return 'bg-[var(--color-paper)] font-medium text-[var(--color-ink)] hover:bg-[var(--color-mist)]';
  }

  const title = 'מחשבון מדעי';
  const sciLabel = 'פונקציות';
  const keyLabel = 'מקשים';

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        dir="rtl"
        className="w-full rounded-xl bg-[var(--color-mist)]/70 px-3 py-2.5 text-sm font-medium text-[var(--color-slate)] ring-1 ring-black/5 hover:bg-[var(--color-mist)]"
      >
        {'פתחו את המחשבון'}
      </button>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/10" dir="ltr">
      <div className="mb-3 flex items-center justify-between gap-2" dir="rtl">
        <span className="text-sm font-semibold text-[var(--color-ink)]">{title}</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShift((s) => !s)}
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold ring-1 ${
              shift
                ? 'bg-[var(--color-teal)] text-white ring-[var(--color-teal)]'
                : 'text-[var(--color-teal)] ring-[var(--color-teal)]/40 hover:bg-[var(--color-teal)]/10'
            }`}
          >
            SHIFT
          </button>
          <button
            type="button"
            onClick={backspace}
            className="rounded-lg px-2.5 py-1 text-xs font-medium text-[var(--color-slate)] ring-1 ring-black/10 hover:bg-[var(--color-mist)]"
            aria-label="Backspace"
          >
            {'⌫'}
          </button>
          <button
            type="button"
            onClick={clearAll}
            className="rounded-lg px-2.5 py-1 text-xs font-semibold text-[var(--color-coral-dark)] ring-1 ring-[var(--color-coral)]/30 hover:bg-[var(--color-coral)]/10"
          >
            C
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-lg px-2.5 py-1 text-xs font-medium text-[var(--color-slate)] ring-1 ring-black/10 hover:bg-[var(--color-mist)]"
          >
            {'מזער'}
          </button>
        </div>
      </div>

      <div className="mb-3 min-h-[4.5rem] overflow-x-auto rounded-xl bg-[var(--color-mist)]/80 px-3 py-2.5 text-left font-mono text-[var(--color-ink)]">
        {solved ? (
          <>
            <div className="truncate text-sm text-[var(--color-slate)]">{solved.expr}</div>
            <div className="text-2xl tracking-wide">{'= ' + solved.result}</div>
          </>
        ) : (
          <div className="py-2 text-2xl tracking-wide">{display}</div>
        )}
      </div>

      <p className="mb-1.5 text-right text-[10px] font-medium tracking-wider text-[var(--color-slate)]" dir="rtl">
        {sciLabel}
        {shift ? ` • SHIFT` : ''}
      </p>
      <div className="mb-3 grid grid-cols-4 gap-1.5">
        {SCI_KEYS.map((k, idx) => {
          const variant = shift && k.shift ? k.shift : k.primary;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSci(variant)}
              className={`rounded-xl py-2.5 ${btnClass('sci')} ${shift && k.shift ? 'ring-1 ring-[var(--color-teal)]/50' : ''}`}
            >
              {variant.label}
            </button>
          );
        })}
      </div>

      <p className="mb-1.5 text-right text-[10px] font-medium tracking-wider text-[var(--color-slate)]" dir="rtl">
        {keyLabel}
      </p>
      <div className="grid grid-cols-4 gap-1.5">
        {NUM_ROWS.flat().map((k) => (
          <button
            key={k.label + k.insert}
            type="button"
            onClick={() => (k.insert === '=' ? evaluate() : press(k.insert))}
            className={`rounded-xl py-3 text-base ${btnClass(k.kind)}`}
          >
            {k.label}
          </button>
        ))}
      </div>
    </div>
  );
}
