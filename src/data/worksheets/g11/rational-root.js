import { m, round } from '../helpers.js';
import { exact, checkDeriv, argExtreme, tf } from './shared.js';

/** פונקציה עם הנגזרת שלה — הנגזרת נבדקת מול נגזרת מספרית. */
function fn(tex, f, fp, probe = [0.7, 2.3, 4.1]) {
  checkDeriv(f, fp, probe);
  return { tex, f, fp };
}

const F = {
  ratio: fn('\\frac{x + 1}{x - 1}', (x) => (x + 1) / (x - 1), (x) => -2 / (x - 1) ** 2, [0.3, 2.3, 4.1]),
  sqOver: fn('\\frac{x^2}{x + 1}', (x) => (x * x) / (x + 1), (x) => (x * x + 2 * x) / (x + 1) ** 2),
  inv: fn('\\frac{1}{x}', (x) => 1 / x, (x) => -1 / (x * x)),
  root: fn('\\sqrt{x}', Math.sqrt, (x) => 1 / (2 * Math.sqrt(x))),
  root21: fn('\\sqrt{2x + 1}', (x) => Math.sqrt(2 * x + 1), (x) => 1 / Math.sqrt(2 * x + 1)),
  xRoot: fn('x\\sqrt{x}', (x) => x * Math.sqrt(x), (x) => 1.5 * Math.sqrt(x)),
  xOverX1: fn('\\frac{x}{x + 1}', (x) => x / (x + 1), (x) => 1 / (x + 1) ** 2),
  four: fn('\\frac{4}{x}', (x) => 4 / x, (x) => -4 / (x * x)),
  xPlus4: fn('x + \\frac{4}{x}', (x) => x + 4 / x, (x) => 1 - 4 / (x * x)),
  sqOverM1: fn('\\frac{x^2}{x - 1}', (x) => (x * x) / (x - 1), (x) => (x * x - 2 * x) / (x - 1) ** 2, [0.3, 2.3, 4.1]),
  rootMinus: fn('\\sqrt{x} - x', (x) => Math.sqrt(x) - x, (x) => 1 / (2 * Math.sqrt(x)) - 1),
  quot: fn('\\frac{2x}{x^2 + 1}', (x) => (2 * x) / (x * x + 1), (x) => (2 - 2 * x * x) / (x * x + 1) ** 2),
};

const dval = (g, x) => ({ q: m`$f(x) = ${g.tex}$ $\qquad f'(${x}) =$ ${exact(g.fp(x))}` });

/** משוואת המשיק y = mx + b בנקודה x0. */
const tangent = (g, x0) => {
  const k = round(g.fp(x0));
  return { q: m`$f(x) = ${g.tex}$, משיק בנקודה שבה $x = ${x0}$`, a: m`$y =$ ${exact(k)} $x +$ ${exact(g.f(x0) - k * x0)}` };
};

/** תחום הגדרה של שורש: ax + b ≥ 0. */
function domain(tex, a, b, strict = false) {
  const sign = a > 0 ? (strict ? '>' : '≥') : strict ? '<' : '≤';
  return { q: m`$f(x) = ${tex}$`, a: m`$x$ [[i:${sign}]] [[${-b / a}]]` };
}

/** נקודת קיצון — מאומתת בחיפוש מספרי בסביבה. */
function extremum(g, x0, kind, [a, b]) {
  const found = argExtreme(g.f, a, b, kind);
  if (Math.abs(found - x0) > 1e-3) throw new Error(`extremum of ${g.tex} is not at ${x0}`);
  return { q: m`ל-$f(x) = ${g.tex}$ יש ${kind === 'max' ? 'מקסימום' : 'מינימום'} מקומי.`, a: m`$x =$ ${exact(x0)} $\qquad y =$ ${exact(g.f(x0))}` };
}

export default {
  id: 'g11-u4-rational-root',
  grade: 11,
  emoji: '📈',
  title: 'חדו״א של פונקציה רציונלית ופונקציית שורש',
  reminder: [
    {
      title: 'כלל המנה',
      md: m`$$\left(\frac{p}{q}\right)' = \frac{p'q - pq'}{q^2}$$

$\left(\frac{x + 1}{x - 1}\right)' = \frac{1 \cdot (x - 1) - (x + 1) \cdot 1}{(x - 1)^2} = \frac{-2}{(x - 1)^2}$`,
    },
    {
      title: 'נגזרת של שורש',
      md: m`$(\sqrt{x})' = \frac{1}{2\sqrt{x}}$ $\qquad$ $(\sqrt{g(x)})' = \frac{g'(x)}{2\sqrt{g(x)}}$

תחום הגדרה: מה שבתוך השורש $\ge 0$ (ובמכנה — $> 0$).`,
    },
    {
      title: 'משיק',
      md: m`שיפוע המשיק בנקודה $x_0$ הוא $f'(x_0)$. מציבים: $y - f(x_0) = f'(x_0)(x - x_0)$.`,
    },
    {
      title: 'אסימפטוטות וקיצון',
      md: m`**אנכית**: באפס של המכנה. **אופקית** ב-$\frac{ax + b}{cx + d}$: $\;y = \frac{a}{c}$.

**קיצון**: $f' = 0$ (ובודקים שהסימן מתחלף) — או **בקצה תחום ההגדרה**.`,
    },
  ],
  pages: [
    {
      title: 'נגזרות, תחום הגדרה ומשיק',
      exercises: [
        {
          title: 'חשבו את הנגזרת בנקודה (אפשר לכתוב שבר, למשל 1/4).',
          cols: 1,
          items: [dval(F.ratio, 3), dval(F.ratio, 0), dval(F.sqOver, 1), dval(F.inv, 2), dval(F.root, 4), dval(F.root21, 4), dval(F.xRoot, 4), dval(F.quot, 0)],
        },
        {
          title: 'מצאו את תחום ההגדרה.',
          cols: 2,
          items: [
            domain('\\sqrt{x - 3}', 1, -3),
            domain('\\sqrt{6 - 2x}', -2, 6),
            domain('\\frac{1}{\\sqrt{x + 2}}', 1, 2, true),
            domain('\\sqrt{4x + 8}', 4, 8),
          ],
        },
        { title: m`מצאו את משוואת המשיק $y = mx + b$.`, cols: 1, items: [tangent(F.xOverX1, 0), tangent(F.root, 4), tangent(F.four, 2), tangent(F.ratio, 2)] },
      ],
    },
    {
      title: 'אסימפטוטות, עלייה וירידה, קיצון',
      exercises: [
        {
          title: 'מצאו את האסימפטוטות.',
          cols: 1,
          items: [
            { q: m`$f(x) = \frac{2x + 1}{x - 3}$`, a: m`אנכית: $x =$ [[3]] $\qquad$ אופקית: $y =$ [[2]]` },
            { q: m`$f(x) = \frac{x - 4}{2x + 6}$`, a: m`אנכית: $x =$ [[-3]] $\qquad$ אופקית: $y =$ [[0.5]]` },
            { q: m`$f(x) = \frac{5}{x + 1}$`, a: m`אנכית: $x =$ [[-1]] $\qquad$ אופקית: $y =$ [[0]]` },
          ],
        },
        {
          title: 'מצאו את נקודת הקיצון.',
          cols: 1,
          items: [
            extremum(F.xPlus4, 2, 'min', [0.5, 5]),
            extremum(F.xPlus4, -2, 'max', [-5, -0.5]),
            extremum(F.sqOverM1, 0, 'max', [-0.9, 0.9]),
            extremum(F.sqOverM1, 2, 'min', [1.1, 5]),
            extremum(F.rootMinus, 0.25, 'max', [0, 3]),
          ],
        },
        {
          title: 'בחרו.',
          cols: 1,
          items: [
            { q: m`בתחום $x > 2$, הפונקציה $f(x) = x + \frac{4}{x}$...`, options: ['עולה', 'יורדת'], answer: F.xPlus4.fp(3) > 0 ? 0 : 1 },
            { q: m`$f(x) = \sqrt{x} - x$ מוגדרת ב-$x \ge 0$. מה יש לה בקצה התחום, ב-$x = 0$?`, options: ['מינימום', 'מקסימום', 'אין קיצון'], answer: 0 },
            tf(m`לפונקציה $f(x) = \frac{x + 1}{x - 1}$ אין נקודות קיצון.`, true),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'חשבו את הנגזרת בנקודה.', cols: 1, items: [dval(F.sqOver, 0), dval(F.root21, 0)] },
      { title: 'מצאו את תחום ההגדרה.', cols: 1, items: [domain('\\sqrt{10 - 5x}', -5, 10)] },
      { title: 'מצאו את משוואת המשיק.', cols: 1, items: [tangent(F.inv, 1)] },
      { title: 'מצאו את האסימפטוטות.', cols: 1, items: [{ q: m`$f(x) = \frac{3x - 2}{x + 4}$`, a: m`אנכית: $x =$ [[-4]] $\qquad$ אופקית: $y =$ [[3]]` }] },
      { title: 'מצאו את נקודת הקיצון.', cols: 1, items: [extremum(F.quot, 1, 'max', [0, 5])] },
    ],
  },
};

/** מחוללי פריטים — לשימוש חוזר בדפי התרגול המסכם. */
export { fn, F, dval, tangent, domain, extremum };
