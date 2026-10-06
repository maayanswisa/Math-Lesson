import { m } from '../helpers.js';
import { exact, tf } from './shared.js';

/** אסימפטוטה אנכית יחידה. */
const vAsym = (tex, x0) => ({ q: m`$f(x) = ${tex}$ $\qquad x =$ [[${x0}]]` });

/** שתי אסימפטוטות אנכיות. */
const vAsym2 = (tex, big, small) => ({ q: m`$f(x) = ${tex}$`, a: m`$x_1 =$ [[${big}]] $\qquad x_2 =$ [[${small}]] $\qquad (x_1 > x_2)$` });

const value = (tex, f, x) => ({ q: m`$f(x) = ${tex}$ $\qquad f(${x}) =$ ${exact(f(x))}` });

/** תחום חיוביות/שליליות של 1/(ax + b): אותו סימן כמו המכנה. */
function signs(tex, a, b) {
  const x0 = -b / a;
  const pos = a > 0 ? '>' : '<';
  const neg = a > 0 ? '<' : '>';
  return { q: m`$f(x) = ${tex}$`, a: m`חיובית: $x$ [[i:${pos}]] [[${x0}]] $\qquad$ שלילית: $x$ [[i:${neg}]] [[${x0}]]` };
}

const MINMAX = ['מינימום', 'מקסימום'];
/**
 * g בעלת קיצון (x0, y0) עם y0 ≠ 0 → ל-f = 1/g קיצון מהסוג ההפוך ב-(x0, 1/y0).
 * שני פריטים: סוג הקיצון (בחירה) והערך שלו.
 */
const flipExtreme = (kind, x0, y0) => [
  {
    q: m`ל-$g$ יש ${kind} בנקודה $(${x0}, ${y0})$. מה יש ל-$f = \frac{1}{g}$ ב-$x = ${x0}$?`,
    options: MINMAX,
    answer: kind === 'מקסימום' ? 0 : 1,
  },
  { q: m`$f(${x0}) =$ ${exact(1 / y0)}` },
];

export default {
  id: 'g11-u4-precalc-rational',
  grade: 11,
  emoji: '📉',
  title: 'קדם-אנליזה של פונקציה רציונלית',
  reminder: [
    {
      title: 'תחום הגדרה ואסימפטוטות',
      md: m`$f(x) = \frac{1}{g(x)}$ מוגדרת כש-$g(x) \ne 0$.

בכל **אפס של $g$** — **אסימפטוטה אנכית**. כש-$g(x) \to \pm\infty$ — אסימפטוטה **אופקית** $y = 0$.`,
    },
    {
      title: 'סימן ואפסים',
      md: m`$f$ **אף פעם לא $0$** — אין חיתוך עם ציר $x$.

**הסימן של $f$ = הסימן של $g$**: איפה ש-$g$ חיובית, גם $f$ חיובית.`,
    },
    {
      title: 'מונוטוניות וקיצון — הפוכים',
      wide: true,
      md: m`כש-$g$ **עולה**, $f$ **יורדת** (ולהפך) — בתחום שבו $g \ne 0$.

**מקסימום** של $g$ ← **מינימום** של $f$, בערך $\frac{1}{g}$. $\;$ למשל: $g$ מקסימום $(2, 4)$ ← $f$ מינימום $(2, \frac{1}{4})$.`,
    },
  ],
  pages: [
    {
      title: 'תחום, אסימפטוטות וסימן',
      exercises: [
        {
          title: 'מצאו את האסימפטוטה האנכית.',
          cols: 2,
          items: [vAsym('\\frac{1}{x - 3}', 3), vAsym('\\frac{1}{x + 2}', -2), vAsym('\\frac{1}{2x - 6}', 3), vAsym('\\frac{1}{x^2}', 0)],
        },
        {
          title: 'שתי אסימפטוטות אנכיות.',
          cols: 1,
          items: [vAsym2('\\frac{1}{x^2 - 4}', 2, -2), vAsym2('\\frac{1}{x^2 - 4x + 3}', 3, 1), vAsym2('\\frac{1}{x^2 + x - 6}', 2, -3)],
        },
        {
          title: 'חשבו (אפשר לכתוב שבר, למשל 1/2).',
          cols: 2,
          items: [
            value('\\frac{1}{x - 1}', (x) => 1 / (x - 1), 3),
            value('\\frac{1}{x - 1}', (x) => 1 / (x - 1), 0),
            value('\\frac{1}{x^2 + 1}', (x) => 1 / (x * x + 1), 2),
            value('\\frac{1}{x^2 - 4}', (x) => 1 / (x * x - 4), 1),
          ],
        },
        {
          title: 'תחומי חיוביות ושליליות.',
          cols: 1,
          items: [signs('\\frac{1}{x - 2}', 1, -2), signs('\\frac{1}{4 - x}', -1, 4), signs('\\frac{3}{2x + 6}', 2, 6)],
        },
      ],
    },
    {
      title: 'מונוטוניות וקיצון — מ-g ל-f',
      exercises: [
        {
          title: m`מה סוג הקיצון של $f = \frac{1}{g}$, ומה ערכו?`,
          cols: 2,
          items: [flipExtreme('מקסימום', 2, 4), flipExtreme('מינימום', -1, 2), flipExtreme('מקסימום', 0, -5), flipExtreme('מינימום', 3, 0.5)].flat(),
        },
        {
          title: 'בחרו.',
          cols: 1,
          items: [
            { q: m`בקטע שבו $g$ עולה (ו-$g \ne 0$), הפונקציה $f = \frac{1}{g}$...`, options: ['עולה', 'יורדת', 'קבועה'], answer: 1 },
            {
              q: m`כמה אסימפטוטות אנכיות יש ל-$f(x) = \frac{1}{x^2 + 4}$?`,
              options: ['אף אחת', 'אחת', 'שתיים'],
              answer: 0,
            },
            { q: m`מה האסימפטוטה האופקית של $f(x) = \frac{1}{x^2 - 9}$?`, options: [m`$y = 0$`, m`$y = 9$`, m`$y = 1$`], answer: 0 },
          ],
        },
        {
          title: m`$f(x) = \frac{1}{x^2 - 6x + 5}$. (רמז: ל-$g(x) = x^2 - 6x + 5$ יש מינימום ב-$x = 3$.)`,
          cols: 1,
          items: [
            { q: 'האסימפטוטות האנכיות:', a: m`$x_1 =$ [[5]] $\qquad x_2 =$ [[1]] $\qquad (x_1 > x_2)$` },
            { q: m`ל-$f$ יש קיצון ב-$x = 3$. מה ערך $f$ שם?`, a: m`$f(3) =$ ${exact(1 / (9 - 18 + 5))}` },
            { q: 'מה סוג הקיצון?', options: ['מינימום', 'מקסימום'], answer: 1 },
          ],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf(m`הגרף של $f = \frac{1}{g}$ לא חותך את ציר $x$.`, true),
            tf(m`$f(x) = \frac{1}{x - 3}$ מקבלת את הערך $0$ ב-$x = 3$.`, false),
            tf(m`אם $g(x) > 0$ לכל $x$, אז גם $f = \frac{1}{g}$ חיובית לכל $x$.`, true),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'מצאו את האסימפטוטות האנכיות.', cols: 1, items: [vAsym('\\frac{1}{3x - 12}', 4), vAsym2('\\frac{1}{x^2 - 2x - 8}', 4, -2)] },
      { title: 'חשבו.', cols: 1, items: [value('\\frac{1}{x + 3}', (x) => 1 / (x + 3), 1)] },
      { title: 'תחומי חיוביות ושליליות.', cols: 1, items: [signs('\\frac{1}{x + 5}', 1, 5)] },
      { title: m`מה סוג הקיצון של $f = \frac{1}{g}$, ומה ערכו?`, cols: 2, items: flipExtreme('מינימום', 1, 4) },
      { title: 'נכון או לא נכון?', cols: 1, items: [tf(m`אם $g$ יורדת בקטע (ו-$g \ne 0$), אז $f = \frac{1}{g}$ עולה בו.`, true)] },
    ],
  },
};

/** מחוללי פריטים — לשימוש חוזר בדפי התרגול המסכם. */
export { vAsym, vAsym2, value, signs, flipExtreme };
