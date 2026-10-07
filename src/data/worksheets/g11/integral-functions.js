import { m } from '../helpers.js';
import { exact, integrate, numDeriv, tf } from './shared.js';

/** קדומה של (ax+b)^n: משלימים את המכנה. נבדק בגזירה מספרית. */
function composite(a, b, n) {
  const den = a * (n + 1);
  const F = (x) => (a * x + b) ** (n + 1) / den;
  const f = (x) => (a * x + b) ** n;
  for (const x of [0.3, 1.7]) if (Math.abs(numDeriv(F, x) - f(x)) > 1e-4) throw new Error('wrong antiderivative');
  const inner = `${a === 1 ? '' : a}x${b < 0 ? '-' : '+'}${Math.abs(b)}`;
  return { q: m`$\displaystyle\int(${inner})^{${n}}\,dx=\frac{(${inner})^{${n + 1}}}{\square}+C$`, a: m`$\square =$ [[${den}]]` };
}

/** קדומה של k/x^n = k·x^(−n): המקדם והחזקה של התשובה c·x^p. */
function rational(k, n) {
  const p = 1 - n;
  const c = k / p;
  const F = (x) => c * x ** p;
  for (const x of [0.7, 2.3]) if (Math.abs(numDeriv(F, x) - k / x ** n) > 1e-4) throw new Error('wrong rational antiderivative');
  return { q: m`$\displaystyle\int\frac{${k}}{x^{${n}}}\,dx=c\cdot x^{p}+C$`, a: m`$c =$ ${exact(c)} $,\quad p =$ [[${p}]]` };
}

/** אינטגרל מסוים — נבדק באינטגרציה מספרית. */
function definite(tex, f, a, b, value) {
  if (Math.abs(integrate(f, a, b) - value) > 1e-6) throw new Error(`wrong integral for ${tex}`);
  return { q: m`$\displaystyle\int_{${a}}^{${b}}${tex}\,dx=$ ${exact(value)}` };
}

/** f לפי f′ ונקודה: מבקשים את f(x1). F קדומה בלי C. */
function fromDerivative(fpTex, F, x0, y0, x1) {
  const C = y0 - F(x0);
  return { q: m`$f'(x)=${fpTex}$ ו-$f(${x0})=${y0}$. חשבו את $f(${x1})$.`, a: exact(F(x1) + C) };
}

export default {
  id: 'g11-u4-integral-functions',
  grade: 11,
  emoji: '∫',
  title: 'אינטגרל של פונקציה מורכבת ורציונלית',
  reminder: [
    {
      title: 'פונקציה מורכבת',
      md: m`$\displaystyle\int(ax+b)^n\,dx=\frac{(ax+b)^{n+1}}{a(n+1)}+C$ — לא לשכוח לחלק ב-$a$!`,
    },
    {
      title: 'פונקציה רציונלית',
      md: m`כותבים כחזקה שלילית: $\frac{1}{x^2}=x^{-2}$, ואז $\int x^{-2}\,dx=-\frac1x+C$.`,
    },
    {
      title: 'f לפי f′ ונקודה',
      md: m`מוצאים קדומה עם $+C$, ומציבים את הנקודה כדי למצוא את $C$.`,
    },
  ],
  pages: [
    {
      title: 'פונקציות קדומות',
      exercises: [
        { title: 'השלימו את המכנה.', cols: 1, items: [composite(2, 1, 3), composite(3, -2, 4), composite(1, -3, 5), composite(4, -1, 2)] },
        { title: 'כתבו כ-$c\\cdot x^p$.', cols: 1, items: [rational(1, 2), rational(6, 2), rational(1, 3), rational(4, 3)] },
      ],
    },
    {
      title: 'אינטגרל מסוים ומציאת f',
      exercises: [
        {
          title: 'חשבו.',
          cols: 2,
          items: [
            definite(m`\frac{1}{x^2}`, (x) => 1 / x ** 2, 1, 2, 0.5),
            definite(m`\frac{2}{x^2}`, (x) => 2 / x ** 2, 1, 2, 1),
            definite(m`(2x+1)^2`, (x) => (2 * x + 1) ** 2, 0, 1, 13 / 3),
            definite(m`(3x+1)^2`, (x) => (3 * x + 1) ** 2, 0, 1, 7),
          ],
        },
        {
          title: 'מצאו את הערך.',
          cols: 1,
          items: [
            fromDerivative(m`3(x-2)^2`, (x) => (x - 2) ** 3, 2, 5, 3),
            fromDerivative(m`(x-1)^2`, (x) => (x - 1) ** 3 / 3, 1, 3, 4),
            fromDerivative(m`-\frac{1}{x^2}`, (x) => 1 / x, 1, 3, 2),
          ],
        },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf(m`$\int(2x+1)^3\,dx=\frac{(2x+1)^4}{4}+C$`, false), tf(m`$\int\frac{1}{x^2}\,dx=-\frac1x+C$`, true)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'קדומות.', cols: 1, items: [composite(5, 2, 3), rational(9, 4)] },
      { title: 'חשבו.', cols: 1, items: [definite(m`\frac{4}{x^3}`, (x) => 4 / x ** 3, 1, 2, 1.5), fromDerivative(m`\frac{6}{(2x-1)^2}`, (x) => -3 / (2 * x - 1), 1, 2, 2)] },
    ],
  },
};
