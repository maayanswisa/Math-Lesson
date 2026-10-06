import { m } from '../helpers.js';
import { vAsym2, signs, flipExtreme } from './precalc-rational.js';
import { fn, dval, tangent, domain, extremum } from './rational-root.js';
import { optimum } from './extremum-3d.js';
import { definite, areaToAxis, areaBetween, anti } from './integral.js';

/** פונקציות חדשות לתרגול המסכם — כל נגזרת נבדקת מספרית. */
const G = {
  ratio: fn('\\frac{x - 2}{x + 3}', (x) => (x - 2) / (x + 3), (x) => 5 / (x + 3) ** 2),
  root: fn('\\sqrt{3x + 1}', (x) => Math.sqrt(3 * x + 1), (x) => 3 / (2 * Math.sqrt(3 * x + 1))),
  xPlus9: fn('x + \\frac{9}{x}', (x) => x + 9 / x, (x) => 1 - 9 / (x * x)),
  twoRoot: fn('2\\sqrt{x} - x', (x) => 2 * Math.sqrt(x) - x, (x) => 1 / Math.sqrt(x) - 1),
  inv2: fn('\\frac{2}{x}', (x) => 2 / x, (x) => -2 / (x * x)),
};

export default {
  id: 'g11-u4-analysis-review',
  grade: 11,
  emoji: '🧠',
  title: 'תרגול מסכם — פונקציות וחדו״א',
  reminder: [
    {
      title: 'קדם-אנליזה של 1/g',
      md: m`אסימפטוטה אנכית באפסי $g$ · אותו סימן כמו $g$ · מונוטוניות **הפוכה** · מקסימום של $g$ ← מינימום של $f$ בערך $\frac{1}{g}$.`,
    },
    {
      title: 'נגזרות ומשיק',
      md: m`$\left(\frac{p}{q}\right)' = \frac{p'q - pq'}{q^2}$ $\;\cdot\;$ $(\sqrt{g})' = \frac{g'}{2\sqrt{g}}$

משיק בנקודה $x_0$: שיפוע $f'(x_0)$, ועובר דרך $(x_0, f(x_0))$.`,
    },
    {
      title: 'קיצון',
      md: m`משתנה ← פונקציה של משתנה אחד (בעזרת האילוץ) ← תחום ← $f' = 0$ ← בדיקה, **כולל קצוות**.`,
    },
    {
      title: 'אינטגרלים',
      md: m`$\int x^n\,dx = \frac{x^{n+1}}{n+1} + C$ $\;\cdot\;$ שטח לציר: $|\int|$ בכל קטע סימן $\;\cdot\;$ בין גרפים: $\int (\text{עליונה} - \text{תחתונה})$`,
    },
  ],
  pages: [
    {
      title: 'פונקציות ונגזרות',
      exercises: [
        {
          title: m`קדם-אנליזה של $f = \frac{1}{g}$.`,
          cols: 1,
          items: [vAsym2('\\frac{1}{x^2 - 5x + 6}', 3, 2), signs('\\frac{2}{x - 7}', 1, -7), ...flipExtreme('מקסימום', 1, 8)],
        },
        { title: 'נגזרת בנקודה.', cols: 1, items: [dval(G.ratio, 2), dval(G.root, 5), dval(G.xPlus9, 3)] },
        { title: 'תחום הגדרה.', cols: 2, items: [domain('\\sqrt{2x - 8}', 2, -8), domain('\\sqrt{12 - 3x}', -3, 12)] },
        { title: m`משוואת המשיק $y = mx + b$.`, cols: 1, items: [tangent(G.ratio, -2), tangent(G.inv2, 1)] },
        { title: 'נקודות קיצון.', cols: 1, items: [extremum(G.xPlus9, 3, 'min', [0.5, 8]), extremum(G.twoRoot, 1, 'max', [0, 5])] },
      ],
    },
    {
      title: 'בעיות קיצון ואינטגרלים',
      exercises: [
        {
          title: 'בעיות קיצון.',
          cols: 1,
          items: [
            optimum(m`$x$ ו-$y$ חיוביים, ו-$x + 2y = 24$. מה הערך הגדול ביותר של $xy$?`, (y) => y * (24 - 2 * y), [0, 12], 'max', 6, (y) => m`$y =$ [[${y}]] $\quad x =$ [[${24 - 2 * y}]] $\quad xy =$ [[${y * (24 - 2 * y)}]]`),
            optimum(
              m`מקרטון $24 \times 24$ גוזרים ריבועים בצלע $x$ מהפינות לקופסה פתוחה. מה הנפח הגדול ביותר?`,
              (x) => x * (24 - 2 * x) ** 2,
              [0, 12],
              'max',
              4,
              (x) => m`$x =$ [[${x}]] $\qquad V =$ [[${x * (24 - 2 * x) ** 2}]]`,
            ),
            optimum(
              m`תיבה סגורה עם בסיס ריבועי, ששטח הפנים שלה $150$. מה הנפח הגדול ביותר?`,
              (a) => 37.5 * a - 0.5 * a ** 3,
              [0.1, 8.6],
              'max',
              5,
              (a) => m`$a =$ [[${a}]] $\quad h =$ [[${(150 - 2 * a * a) / (4 * a)}]] $\quad V =$ [[${37.5 * a - 0.5 * a ** 3}]]`,
            ),
          ],
        },
        { title: 'פונקציה קדומה.', cols: 1, items: [anti('3x^2 + 8x - 2', [1, 4, -2])] },
        { title: 'אינטגרל מסוים.', cols: 2, items: [definite('(3x^2 - 2x)', (x) => 3 * x * x - 2 * x, 0, 3, 18), definite('(2x - 1)', (x) => 2 * x - 1, 1, 4, 12)] },
        {
          title: 'שטחים.',
          cols: 1,
          items: [areaToAxis('x^2 - 2x', (x) => x * x - 2 * x, [0, 2], 4 / 3), ...areaBetween('6 - x', (x) => 6 - x, 'x^2', (x) => x * x, -3, 2, 125 / 6)],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'קדם-אנליזה.', cols: 1, items: [vAsym2('\\frac{1}{x^2 - 9}', 3, -3)] },
      { title: 'נגזרת ומשיק.', cols: 1, items: [dval(G.root, 1), tangent(G.xPlus9, 1)] },
      {
        title: 'בעיית קיצון.',
        cols: 1,
        items: [optimum(m`היקף מלבן $28$. מה השטח הגדול ביותר?`, (x) => x * (14 - x), [0, 14], 'max', 7, (x) => m`[[${x * (14 - x)}]]`)],
      },
      { title: 'שטח בין גרפים.', cols: 1, items: areaBetween('4x', (x) => 4 * x, 'x^2', (x) => x * x, 0, 4, 32 / 3) },
    ],
  },
};
