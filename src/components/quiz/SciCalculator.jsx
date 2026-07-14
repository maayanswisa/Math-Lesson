import { useState } from 'react';

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

function roundNice(n) {
  if (!Number.isFinite(n)) throw new Error('nan');
  return Math.round(n * 1e10) / 1e10;
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

const SQRT = '\u221A';
const TIMES = '\u00D7';
const DIV = '\u00F7';
const MINUS = '\u2212';
const PI = '\u03C0';

function safeEval(raw) {
  let s = String(raw);
  s = s.split(TIMES).join('*');
  s = s.split(DIV).join('/');
  s = s.split(MINUS).join('-');
  s = s.split(SQRT).join('sqrt');
  s = s.split(PI).join(`(${Math.PI})`);
  s = s.replace(/pi/gi, `(${Math.PI})`);

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

  s = closeOpenParens(s);
  s = s.replace(/\^/g, '**');
  // eslint-disable-next-line no-new-func
  const val = Function('"use strict"; return (' + s + ');')();
  return roundNice(val);
}

const SCI_KEYS = [
  { label: 'sin', insert: 'sin(' },
  { label: 'cos', insert: 'cos(' },
  { label: 'tan', insert: 'tan(' },
  { label: PI, insert: PI },
  { label: SQRT, insert: SQRT + '(' },
  { label: 'x^y', insert: '^' },
  { label: '(', insert: '(' },
  { label: ')', insert: ')' },
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

/** Scientific calculator - always visible, organized keypad. */
export default function SciCalculator() {
  const [expr, setExpr] = useState('');
  const [display, setDisplay] = useState('0');
  const [fresh, setFresh] = useState(true);

  function press(token) {
    setExpr((e) => (fresh ? token : e + token));
    setDisplay((d) => (fresh || d === '0' || d === 'Err' ? token : d + token));
    setFresh(false);
  }

  function clearAll() {
    setExpr('');
    setDisplay('0');
    setFresh(true);
  }

  function backspace() {
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
    try {
      const result = safeEval(expr);
      setDisplay(String(result));
      setExpr(String(result));
      setFresh(true);
    } catch {
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

  const title = '\u05de\u05d7\u05e9\u05d1\u05d5\u05df \u05de\u05d3\u05e2\u05d9';
  const sciLabel = '\u05e4\u05d5\u05e0\u05e7\u05e6\u05d9\u05d5\u05ea';
  const keyLabel = '\u05de\u05e7\u05e9\u05d9\u05dd';

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/10" dir="ltr">
      <div className="mb-3 flex items-center justify-between gap-2" dir="rtl">
        <span className="text-sm font-semibold text-[var(--color-ink)]">{title}</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={backspace}
            className="rounded-lg px-2.5 py-1 text-xs font-medium text-[var(--color-slate)] ring-1 ring-black/10 hover:bg-[var(--color-mist)]"
            aria-label="Backspace"
          >
            {'\u232B'}
          </button>
          <button
            type="button"
            onClick={clearAll}
            className="rounded-lg px-2.5 py-1 text-xs font-semibold text-[var(--color-coral)] ring-1 ring-[var(--color-coral)]/30 hover:bg-[var(--color-coral)]/10"
          >
            C
          </button>
        </div>
      </div>

      <div className="mb-3 overflow-x-auto rounded-xl bg-[var(--color-mist)]/80 px-3 py-3 text-left font-mono text-2xl tracking-wide text-[var(--color-ink)]">
        {display}
      </div>

      <p className="mb-1.5 text-right text-[10px] font-medium tracking-wider text-[var(--color-slate)]" dir="rtl">
        {sciLabel}
      </p>
      <div className="mb-3 grid grid-cols-4 gap-1.5">
        {SCI_KEYS.map((k) => (
          <button
            key={k.label}
            type="button"
            onClick={() => press(k.insert)}
            className={`rounded-xl py-2.5 ${btnClass('sci')}`}
          >
            {k.label}
          </button>
        ))}
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
