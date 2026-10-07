import { m } from '../helpers.js';
import { exact, integrate, tf } from './shared.js';

/** שטח (חיובי) בין גרף לציר x: סכום |∫| בכל קטע שבו הסימן קבוע. cuts — נקודות הפיצול. */
function areaToAxis(tex, f, cuts, value) {
  let total = 0;
  for (let i = 0; i < cuts.length - 1; i++) total += Math.abs(integrate(f, cuts[i], cuts[i + 1]));
  if (Math.abs(total - value) > 1e-6) throw new Error(`wrong area for ${tex}`);
  return { q: m`$y=${tex}$, ציר $x$, $\;${cuts[0]}\le x\le${cuts[cuts.length - 1]}$`, a: m`השטח: ${exact(value)}` };
}

/** אינטגרל מסוים מול שטח: מבקשים את שניהם — כדי לראות את הקיזוז. */
function signedVsArea(tex, f, a, b, cut) {
  const signed = integrate(f, a, b);
  const area = Math.abs(integrate(f, a, cut)) + Math.abs(integrate(f, cut, b));
  return { q: m`$y=${tex}$ בתחום $[${a},${b}]$`, a: m`האינטגרל: ${exact(Math.round(signed * 1e6) / 1e6)} $\;\cdot\;$ השטח: ${exact(Math.round(area * 1e6) / 1e6)}` };
}

/** שטח בין שני גרפים (f מעל g). */
function between(texF, f, texG, g, a, b, value) {
  if (Math.abs(integrate((x) => f(x) - g(x), a, b) - value) > 1e-6) throw new Error('wrong area between graphs');
  if (f((a + b) / 2) < g((a + b) / 2)) throw new Error('f is not above g');
  return { q: m`$y=${texF}$ ו-$y=${texG}$ (נקודות החיתוך: $${a}$ ו-$${b}$)`, a: m`השטח: ${exact(value)}` };
}

/** פרמטר: ∫₀ᵏ f = S → k (נבדק). */
function paramK(tex, f, S, k) {
  if (Math.abs(integrate(f, 0, k) - S) > 1e-6) throw new Error(`k=${k} does not give ${S}`);
  return { q: m`$\displaystyle\int_0^k${tex}\,dx=${S}$, $\;k>0$`, a: m`$k =$ ${exact(k)}` };
}

export default {
  id: 'g11-u4-areas',
  grade: 11,
  emoji: '🟩',
  title: 'חישובי שטחים מתקדמים',
  reminder: [
    {
      title: 'מתחת לציר ומפוצל',
      md: m`מתחת לציר $x$ האינטגרל שלילי — השטח הוא הערך המוחלט. כשהגרף חוצה את הציר — מפצלים באפסים ומחברים שטחים.`,
    },
    {
      title: 'בין גרפים ועם משיק',
      md: m`$\int_a^b[f(x)-g(x)]\,dx$ כש-$f$ מעל $g$. משיק: $y-f(x_0)=f'(x_0)(x-x_0)$, ואז שטח בין הגרף למשיק.`,
    },
    {
      title: 'פרמטר וגרף הנגזרת',
      md: m`שטח עם פרמטר: מבטאים בעזרתו ומשווים לנתון. $\;\int_a^bf'(x)\,dx=f(b)-f(a)$.`,
    },
  ],
  pages: [
    {
      title: 'מתחת לציר ושטח מפוצל',
      exercises: [
        {
          title: 'חשבו את השטח.',
          cols: 1,
          items: [
            areaToAxis(m`x^2-9`, (x) => x * x - 9, [-3, 3], 36),
            areaToAxis(m`x^2-2x`, (x) => x * x - 2 * x, [0, 2], 4 / 3),
            areaToAxis(m`x^2-1`, (x) => x * x - 1, [0, 1, 2], 2),
            areaToAxis(m`2x-2`, (x) => 2 * x - 2, [0, 1, 3], 5),
          ],
        },
        {
          title: 'אינטגרל מול שטח.',
          cols: 1,
          items: [signedVsArea(m`x-2`, (x) => x - 2, 0, 4, 2), signedVsArea(m`x^3`, (x) => x ** 3, -1, 1, 0)],
        },
      ],
    },
    {
      title: 'בין גרפים, משיק ופרמטר',
      exercises: [
        {
          title: 'שטח בין גרפים.',
          cols: 1,
          items: [
            between(m`x`, (x) => x, m`x^2`, (x) => x * x, 0, 1, 1 / 6),
            between(m`2x`, (x) => 2 * x, m`x^2`, (x) => x * x, 0, 2, 4 / 3),
            between(m`4`, () => 4, m`x^2`, (x) => x * x, -2, 2, 32 / 3),
          ],
        },
        {
          title: 'שטח עם משיק.',
          cols: 1,
          items: [
            { q: m`$y=x^2$, המשיק לה ב-$x=1$, וציר $y$. משוואת המשיק: $y=mx+n$`, a: m`$m =$ [[2]] $,\quad n =$ [[-1]] $\;\cdot\;$ השטח: ${exact(integrate((x) => (x - 1) ** 2, 0, 1))}` },
            { q: m`$y=x^2$, המשיק לה ב-$x=2$, וציר $y$:`, a: m`השטח: ${exact(Math.round(integrate((x) => (x - 2) ** 2, 0, 2) * 1e6) / 1e6)}` },
          ],
        },
        { title: 'מצאו את $k$.', cols: 2, items: [paramK('2x', (x) => 2 * x, 9, 3), paramK('3x^2', (x) => 3 * x * x, 27, 3), paramK('x', (x) => x, 8, 4)] },
        {
          title: 'גרף הנגזרת.',
          cols: 1,
          items: [
            { q: m`$f(0)=2$ ו-$\int_0^4f'(x)\,dx=-5$. חשבו את $f(4)$.`, a: '[[-3]]' },
            { q: m`$f(1)=4$, והשטח בין גרף $f'$ (מעל הציר) לציר $x$ בתחום $[1,3]$ הוא $6$. חשבו את $f(3)$.`, a: '[[10]]' },
          ],
        },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf('שטח יכול להיות שלילי.', false), tf(m`אם $\int_a^bf(x)\,dx=0$, בהכרח $f=0$ בכל התחום.`, false)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'חשבו.', cols: 1, items: [areaToAxis(m`x^2-4`, (x) => x * x - 4, [-2, 2], 32 / 3), between(m`3x`, (x) => 3 * x, m`x^2`, (x) => x * x, 0, 3, 4.5)] },
      { title: 'מצאו את $k$.', cols: 1, items: [paramK('4x^3', (x) => 4 * x ** 3, 16, 2)] },
    ],
  },
};
