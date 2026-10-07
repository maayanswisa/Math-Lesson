import { m } from '../helpers.js';
import { exact, numDeriv, tf } from './shared.js';

/** תחום הגדרה מהצורה x ≤ k או x ≥ k (שורש של ביטוי קווי). */
function domainLinear(tex, inside, sign, k) {
  // בדיקה: בצד הנכון של k הביטוי חיובי, ובצד השני שלילי
  const okSide = sign.includes('≤') || sign.includes('<') ? k - 1 : k + 1;
  const badSide = sign.includes('≤') || sign.includes('<') ? k + 1 : k - 1;
  if (!(inside(okSide) > 0 && inside(badSide) < 0)) throw new Error(`wrong domain for ${tex}`);
  if (inside(k) !== 0) throw new Error(`k must zero the expression in ${tex}`);
  return { q: m`$${tex}$`, a: m`$x$ [[i:${sign}]] [[${k}]]` };
}

/** משוואה עם שורש: התשובה נבדקת בהצבה במשוואה המקורית. */
function rootEq(tex, lhs, rhs, solution) {
  if (Math.abs(lhs(solution) - rhs(solution)) > 1e-9) throw new Error(`${solution} does not solve ${tex}`);
  return { q: m`$${tex}$`, a: m`$x =$ [[${solution}]]` };
}

/** בחירה: כמה פתרונות אמיתיים (אחרי בדיקה). candidates — מה שיוצא אחרי העלאה בריבוע. */
function extraneous(tex, lhs, rhs, candidates, options) {
  const real = candidates.filter((x) => Number.isFinite(lhs(x)) && Math.abs(lhs(x) - rhs(x)) < 1e-9);
  const key = real.length ? real.join(',') : 'none';
  const answer = options.findIndex(([, k]) => k === key);
  if (answer < 0) throw new Error(`no option matches ${key} for ${tex}`);
  return { q: m`$${tex}$`, options: options.map(([l]) => l), answer };
}

/** שיפוע משיק לפונקציית שורש. */
const slope = (tex, f, x0, value) => {
  if (Math.abs(numDeriv(f, x0) - value) > 1e-6) throw new Error(`wrong slope for ${tex}`);
  return { q: m`$f(x)=${tex}$, שיפוע המשיק ב-$x=${x0}$:`, a: exact(value) };
};

export default {
  id: 'g11-u4-root-equations',
  grade: 11,
  emoji: '√',
  title: 'פונקציות שורש: תחום, משוואות ומשיק',
  reminder: [
    {
      title: 'תחום הגדרה',
      md: m`$\sqrt{q(x)}$: $q(x)\ge0$. שורש במכנה: $q(x)>0$.`,
    },
    {
      title: 'משוואה עם שורש',
      md: m`מבודדים את השורש, מעלים בריבוע, פותרים — ו**בודקים** כל פתרון במשוואה המקורית. שורש לא יכול להיות שווה למספר שלילי!`,
    },
    {
      title: 'נגזרת ומשיק',
      md: m`$\left(\sqrt{q}\right)'=\dfrac{q'}{2\sqrt q}$ · משיק: $y-f(x_0)=f'(x_0)(x-x_0)$`,
    },
  ],
  pages: [
    {
      title: 'תחום הגדרה',
      exercises: [
        {
          title: 'תחום ההגדרה (בחרו סימן והשלימו מספר).',
          cols: 2,
          items: [
            domainLinear(m`\sqrt{10-2x}`, (x) => 10 - 2 * x, '≤', 5),
            domainLinear(m`\sqrt{3x-12}`, (x) => 3 * x - 12, '≥', 4),
            domainLinear(m`\dfrac{1}{\sqrt{x+3}}`, (x) => x + 3, '>', -3),
            domainLinear(m`\dfrac{5}{\sqrt{8-x}}`, (x) => 8 - x, '<', 8),
          ],
        },
        {
          title: 'תחום הגדרה של שורש של ביטוי ריבועי.',
          cols: 1,
          items: [
            { q: m`$\sqrt{x^2-16}$`, options: [m`$-4\le x\le4$`, m`$x\le-4$ או $x\ge4$`, m`$x\ge4$`], answer: 1 },
            { q: m`$\sqrt{4-x^2}$`, options: [m`$-2\le x\le2$`, m`$x\le2$`, m`$x\le-2$ או $x\ge2$`], answer: 0 },
          ],
        },
      ],
    },
    {
      title: 'משוואות ומשיק',
      exercises: [
        {
          title: 'פתרו.',
          cols: 2,
          items: [
            rootEq(m`\sqrt{x+3}=4`, (x) => Math.sqrt(x + 3), () => 4, 13),
            rootEq(m`\sqrt{2x+1}=3`, (x) => Math.sqrt(2 * x + 1), () => 3, 4),
            rootEq(m`\sqrt{5-x}=x+1`, (x) => Math.sqrt(5 - x), (x) => x + 1, 1),
            rootEq(m`\sqrt{2x-1}=x-2`, (x) => Math.sqrt(2 * x - 1), (x) => x - 2, 5),
          ],
        },
        {
          title: 'כמה פתרונות? (אחרי בדיקה)',
          cols: 1,
          items: [
            extraneous(m`\sqrt{x+6}=x`, (x) => Math.sqrt(x + 6), (x) => x, [3, -2], [
              [m`$x=3$ ו-$x=-2$`, '3,-2'],
              [m`$x=3$ בלבד`, '3'],
              [m`$x=-2$ בלבד`, '-2'],
              ['אין פתרון', 'none'],
            ]),
            extraneous(m`\sqrt{x+1}=-3`, (x) => Math.sqrt(x + 1), () => -3, [8], [
              [m`$x=8$`, '8'],
              [m`$x=-10$`, '-10'],
              ['אין פתרון', 'none'],
            ]),
          ],
        },
        { title: 'שיפוע משיק.', cols: 2, items: [slope(m`\sqrt{3x+1}`, (x) => Math.sqrt(3 * x + 1), 5, 3 / 8), slope(m`\sqrt x`, (x) => Math.sqrt(x), 4, 1 / 4), slope(m`\sqrt{x+5}`, (x) => Math.sqrt(x + 5), 4, 1 / 6)] },
        {
          title: 'משוואת משיק.',
          cols: 1,
          items: [{ q: m`המשיק לגרף $f(x)=\sqrt x$ ב-$x=4$: $\;y=mx+n$`, a: m`$m =$ ${exact(0.25)} $,\quad n =$ [[1]]` }],
        },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf(m`$\sqrt{x^2}=x$ לכל $x$.`, false), tf(m`$\sqrt{x-2}$ מוגדרת ב-$x=2$.`, true)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'תחום הגדרה.', cols: 1, items: [domainLinear(m`\sqrt{12-3x}`, (x) => 12 - 3 * x, '≤', 4)] },
      { title: 'פתרו.', cols: 1, items: [rootEq(m`\sqrt{x+7}=x+1`, (x) => Math.sqrt(x + 7), (x) => x + 1, 2)] },
      { title: 'שיפוע משיק.', cols: 1, items: [slope(m`\sqrt{2x+1}`, (x) => Math.sqrt(2 * x + 1), 4, 1 / 3)] },
    ],
  },
};
