import { m } from '../helpers.js';
import { exact, integrate, tf } from './shared.js';

/**
 * אינטגרל מסוים: value — התשובה שכתובה בדף (חישוב "ידני" מהפונקציה הקדומה),
 * ונבדקת מול אינטגרציה מספרית.
 */
function definite(tex, f, a, b, value) {
  if (Math.abs(integrate(f, a, b) - value) > 1e-6) throw new Error(`wrong integral for ${tex}`);
  return { q: m`$\displaystyle\int_{${a}}^{${b}} ${tex}\,dx =$ ${exact(value)}` };
}

/** שטח (חיובי) בין גרף לציר x — מחשבים |∫| בכל קטע שבו הסימן קבוע. */
function areaToAxis(tex, f, cuts, value) {
  let total = 0;
  for (let i = 0; i < cuts.length - 1; i++) total += Math.abs(integrate(f, cuts[i], cuts[i + 1]));
  if (Math.abs(total - value) > 1e-6) throw new Error(`wrong area for ${tex}`);
  return { q: m`$f(x) = ${tex}$, $\;${cuts[0]} \le x \le ${cuts[cuts.length - 1]}$`, a: m`השטח: ${exact(value)}` };
}

/**
 * שטח בין שני גרפים, f מעל g בקטע [a, b].
 * שני פריטים: נקודות החיתוך (שורה מתמטית נקייה), ואז השטח.
 */
function areaBetween(texF, f, texG, g, a, b, value) {
  if (Math.abs(integrate((x) => f(x) - g(x), a, b) - value) > 1e-6) throw new Error('wrong area between graphs');
  if (f((a + b) / 2) < g((a + b) / 2)) throw new Error('f is not above g');
  return [
    {
      q: m`נקודות החיתוך של $y = ${texF}$ ו-$y = ${texG}$:`,
      a: m`$x_1 =$ [[${a}]] $,\quad x_2 =$ [[${b}]] $\qquad (x_1 < x_2)$`,
    },
    { q: m`השטח ביניהם:`, a: exact(value) },
  ];
}

/** פונקציה קדומה של פולינום: מקדמים של x³, x², x. */
const anti = (tex, [c3, c2, c1]) => ({
  q: m`$\displaystyle\int (${tex})\,dx =$`,
  a: m`${exact(c3)} $x^3 +$ ${exact(c2)} $x^2 +$ ${exact(c1)} $x + C$`,
});

export default {
  id: 'g11-u4-integral',
  grade: 11,
  emoji: '∫',
  title: 'חשבון אינטגרלי',
  reminder: [
    {
      title: 'פונקציה קדומה',
      md: m`$F$ היא קדומה של $f$ אם $F'(x) = f(x)$. $\qquad \displaystyle\int x^n\,dx = \frac{x^{n+1}}{n+1} + C$

$\displaystyle\int (6x^2 + 4x)\,dx = 2x^3 + 2x^2 + C$`,
    },
    {
      title: 'אינטגרל מסוים',
      md: m`$\displaystyle\int_a^b f(x)\,dx = F(b) - F(a)$

$\displaystyle\int_0^2 3x^2\,dx = \big[x^3\big]_0^2 = 8 - 0 = 8$`,
    },
    {
      title: 'שטח',
      wide: true,
      md: m`**בין גרף לציר $x$**: כשהפונקציה מחליפה סימן — מפצלים באפסים ולוקחים **ערך מוחלט** לכל חלק.
**בין שני גרפים**: $\displaystyle\int_a^b (f - g)\,dx$ כש-$f$ **מעל** $g$; את $a, b$ מוצאים מנקודות החיתוך.`,
    },
  ],
  pages: [
    {
      title: 'פונקציה קדומה ואינטגרל מסוים',
      exercises: [
        {
          title: 'מצאו פונקציה קדומה (מקדם שלא קיים — כתבו 0).',
          cols: 1,
          items: [anti('6x^2 + 4x', [2, 2, 0]), anti('3x^2 - 2x + 5', [1, -1, 5]), anti('12x^2 - 6', [4, 0, -6]), anti('x^2 + 4x - 1', [1 / 3, 2, -1])],
        },
        {
          title: 'פונקציה קדומה שעוברת בנקודה.',
          cols: 1,
          items: [
            { q: m`$F'(x) = 2x + 3$ ו-$F(0) = 4$. $\quad F(2) =$ [[${4 + 6 + 4}]]` },
            { q: m`$F'(x) = 3x^2 - 4x$ ו-$F(1) = 2$. $\quad F(3) =$ [[${27 - 18 + 3}]]` },
          ],
        },
        {
          title: 'חשבו את האינטגרל.',
          cols: 2,
          items: [
            definite('3x^2', (x) => 3 * x * x, 0, 2, 8),
            definite('(2x + 1)', (x) => 2 * x + 1, 1, 3, 10),
            definite('(x^3 + x)', (x) => x ** 3 + x, 0, 1, 0.75),
            definite('x^2', (x) => x * x, -1, 1, 2 / 3),
            definite('(4 - 2x)', (x) => 4 - 2 * x, 0, 2, 4),
            definite('(6x^2 - 4x)', (x) => 6 * x * x - 4 * x, 1, 2, 8),
          ],
        },
      ],
    },
    {
      title: 'שטחים',
      exercises: [
        {
          title: m`שטח בין הגרף לציר $x$.`,
          cols: 1,
          items: [
            areaToAxis('4 - x^2', (x) => 4 - x * x, [-2, 2], 32 / 3),
            areaToAxis('x^2 - 4x', (x) => x * x - 4 * x, [0, 4], 32 / 3),
            areaToAxis('x^2 - 1', (x) => x * x - 1, [0, 1, 2], 2),
            areaToAxis('3x^2', (x) => 3 * x * x, [1, 2], 7),
          ],
        },
        {
          title: 'שטח בין שני גרפים.',
          cols: 1,
          items: [
            ...areaBetween('x', (x) => x, 'x^2', (x) => x * x, 0, 1, 1 / 6),
            ...areaBetween('2x', (x) => 2 * x, 'x^2', (x) => x * x, 0, 2, 4 / 3),
            ...areaBetween('4 - x^2', (x) => 4 - x * x, 'x + 2', (x) => x + 2, -2, 1, 4.5),
          ],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf(m`$\int_0^4 (x^2 - 4x)\,dx$ שווה לשטח בין הגרף לציר $x$.`, false),
            tf('לכל פונקציה יש אינסוף פונקציות קדומות (שונות בקבוע).', true),
            tf(m`$\int_a^b f(x)\,dx$ יכול להיות שלילי.`, true),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'מצאו פונקציה קדומה.', cols: 1, items: [anti('9x^2 + 2x - 3', [3, 1, -3])] },
      { title: 'חשבו.', cols: 2, items: [definite('4x^3', (x) => 4 * x ** 3, 0, 2, 16), definite('(3x^2 + 2)', (x) => 3 * x * x + 2, -1, 1, 6)] },
      { title: m`שטח בין הגרף לציר $x$.`, cols: 1, items: [areaToAxis('9 - x^2', (x) => 9 - x * x, [-3, 3], 36)] },
      { title: 'שטח בין שני גרפים.', cols: 1, items: areaBetween('3x', (x) => 3 * x, 'x^2', (x) => x * x, 0, 3, 4.5) },
    ],
  },
};

/** מחוללי פריטים — לשימוש חוזר בדפי התרגול המסכם. */
export { definite, areaToAxis, areaBetween, anti };
