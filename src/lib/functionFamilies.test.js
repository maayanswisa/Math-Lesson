import { describe, expect, it } from 'vitest';
import { FAMILIES, getFamily, initialParams, num, range } from './functionFamilies';
import { findRtlIssues } from './rtlMath';

const fam = (id) => getFamily(id);

/** כל צירופי הפרמטרים בסליידרים (לכל היותר כמה מאות לכל משפחה). */
function allParams(family) {
  return family.params.reduce((acc, p) => acc.flatMap((o) => p.values.map((v) => ({ ...o, [p.key]: v }))), [{}]);
}

describe('helpers', () => {
  it('formats numbers without trailing zeros or -0', () => {
    expect([num(2), num(-0.5), num(-0), num(1 / 3), num(0.125)]).toEqual(['2', '-0.5', '0', '0.333', '0.125']);
  });
  it('builds slider values, optionally skipping 0', () => {
    expect(range(-1, 1, 0.5)).toEqual([-1, -0.5, 0, 0.5, 1]);
    expect(range(-1, 1, 0.5, { noZero: true })).toEqual([-1, -0.5, 0.5, 1]);
  });
  it('starts every family from values its sliders can reach', () => {
    for (const f of FAMILIES) for (const p of f.params) expect(p.values, `${f.id}.${p.key}`).toContain(p.initial);
  });
});

describe('formulas', () => {
  it.each([
    ['linear', { m: 1, b: 0 }, 'x', '1'],
    ['linear', { m: -1, b: 2 }, '-x+2', '-1'],
    ['linear', { m: 0, b: -3 }, '-3', '0'],
    ['quadratic', { a: 1, b: 0, c: -2 }, 'x^2-2', '2x'],
    ['quadratic', { a: -0.5, b: 3, c: 0 }, '-0.5x^2+3x', '-x+3'],
    ['exponential', { a: 1, b: 1, c: 0 }, 'e^{x}', 'e^{x}'],
    ['exponential', { a: 2, b: -1, c: 1 }, '2e^{-x}+1', '-2e^{-x}'],
    ['exponential', { a: -1, b: 0.5, c: 0 }, '-e^{0.5x}', '-0.5e^{0.5x}'],
    ['logarithmic', { a: 1, b: 1, c: 0 }, '\\ln x', '\\dfrac{1}{x}'],
    ['logarithmic', { a: -2, b: -1, c: 3 }, '-2\\ln(-x)+3', '-\\dfrac{2}{x}'],
    ['rational', { a: 1, b: 0, c: 0 }, '\\dfrac{1}{x}', '-\\dfrac{1}{x^2}'],
    ['rational', { a: -2, b: 1.5, c: -1 }, '-\\dfrac{2}{x-1.5}-1', '\\dfrac{2}{(x-1.5)^2}'],
    ['rational', { a: 3, b: -2, c: 0 }, '\\dfrac{3}{x+2}', '-\\dfrac{3}{(x+2)^2}'],
  ])('%s %o → f(x)=%s, f′(x)=%s', (id, p, tex, dtex) => {
    expect(fam(id).tex(p)).toBe(tex);
    expect(fam(id).dtex(p)).toBe(dtex);
  });
});

describe('derivatives', () => {
  it.each(FAMILIES.map((f) => [f.id, f]))('%s: df matches the slope of f', (_id, family) => {
    const h = 1e-5;
    for (const p of allParams(family)) {
      const f = family.f(p);
      const df = family.df(p);
      for (const x of [-3.3, -1.7, -0.4, 0.6, 2.1, 3.9]) {
        const y = f(x);
        if (!Number.isFinite(y) || !Number.isFinite(f(x - h)) || !Number.isFinite(f(x + h))) continue;
        const slope = (f(x + h) - f(x - h)) / (2 * h);
        expect(df(x)).toBeCloseTo(slope, 3);
      }
    }
  });
});

describe('domain', () => {
  it('ln(bx) lives on the side where bx > 0', () => {
    const pos = fam('logarithmic').f({ a: 1, b: 2, c: 0 });
    const neg = fam('logarithmic').f({ a: 1, b: -0.5, c: 0 });
    expect([Number.isNaN(pos(-1)), Number.isFinite(pos(1))]).toEqual([true, true]);
    expect([Number.isFinite(neg(-1)), Number.isNaN(neg(1))]).toEqual([true, true]);
    expect(fam('logarithmic').domain({ b: -0.5 }).set).toBe('$x<0$');
  });
  it('the rational function is undefined only at x = b', () => {
    const f = fam('rational').f({ a: 1, b: 2, c: 0 });
    expect(Number.isNaN(f(2))).toBe(true);
    expect(Number.isFinite(f(2.001))).toBe(true);
    expect(fam('rational').domain({ b: 2 }).set).toBe('$x\\ne2$');
  });
});

describe('Hebrew text reads correctly right-to-left', () => {
  it.each(FAMILIES.map((f) => [f.id, f]))('%s', (_id, family) => {
    const texts = [family.name, ...family.params.map((p) => p.hint)];
    for (const p of allParams(family)) {
      const d = family.domain(p);
      texts.push(d.set, d.why, family.range(p), family.insight(p));
    }
    const bad = [...new Set(texts)].filter((t) => findRtlIssues(t).length);
    expect(bad).toEqual([]);
  });
});
