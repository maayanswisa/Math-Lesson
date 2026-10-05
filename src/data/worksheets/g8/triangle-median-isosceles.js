import { m, round } from '../helpers.js';

/** במשולש שווה-שוקיים: זווית ראש → זוויות בסיס, ולהפך. */
const fromApex = (apex) => ({ q: m`זווית הראש $${apex}°$. כל זווית בסיס: [[${round((180 - apex) / 2)}]] $°$` });
const fromBase = (base) => ({ q: m`זווית בסיס $${base}°$. זווית הראש: [[${180 - 2 * base}]] $°$` });

/** תיכון לבסיס במשולש שווה-שוקיים ABC (AB = AC), AD התיכון. */
const medianToBase = (apex, bc) => ({
  q: m`$AB = AC$, $\;\angle BAC = ${apex}°$, $\;BC = ${bc}$ ס״מ, ו-$AD$ התיכון לבסיס.`,
  a: m`$BD =$ [[${bc / 2}]] $\quad \angle BAD =$ [[${apex / 2}]] $° \quad \angle ADB =$ [[90]] $°$`,
});

const TF = ['נכון', 'לא נכון'];
const tf = (q, truth) => ({ q, options: TF, answer: truth ? 0 : 1 });

/** היקף משולש שווה-שוקיים. */
const perimeter = (leg, base) => ({ q: m`שוק $${leg}$ ס״מ ובסיס $${base}$ ס״מ. ההיקף: [[${2 * leg + base}]] ס״מ` });
const legFromPerimeter = (P, base) => ({ q: m`ההיקף $${P}$ ס״מ והבסיס $${base}$ ס״מ. אורך כל שוק: [[${(P - base) / 2}]] ס״מ` });

export default {
  id: 'g8-triangle-median-isosceles',
  grade: 8,
  emoji: '🔻',
  title: 'תיכון במשולש ומשולש שווה-שוקיים',
  reminder: [
    {
      title: 'תיכון',
      md: m`**תיכון** — קטע מקודקוד ל**אמצע** הצלע שמולו. לכל משולש $3$ תיכונים.

אם $AD$ תיכון ל-$BC$, אז $BD = DC = \frac{BC}{2}$.`,
    },
    {
      title: 'משולש שווה-שוקיים',
      md: m`שתי צלעות שוות — **השוקיים**. השלישית — **הבסיס**.

**זוויות הבסיס שוות**. זווית ראש $40°$ ← כל זווית בסיס $(180 - 40) : 2 = 70°$.`,
    },
    {
      title: 'התיכון לבסיס',
      wide: true,
      md: m`במשולש שווה-שוקיים, התיכון לבסיס הוא **גם גובה וגם חוצה זווית**:

הוא מאונך לבסיס ($90°$), ומחלק את זווית הראש לשני חצאים שווים.`,
    },
  ],
  pages: [
    {
      title: 'זוויות במשולש שווה-שוקיים',
      exercises: [
        { title: 'מצאו את זוויות הבסיס.', cols: 2, items: [40, 100, 30, 90, 58, 120].map(fromApex) },
        { title: 'מצאו את זווית הראש.', cols: 2, items: [70, 45, 65, 80].map(fromBase) },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf('במשולש שווה-שוקיים, זוויות הבסיס שוות.', true),
            tf('זווית בסיס במשולש שווה-שוקיים יכולה להיות קהה.', false),
            tf('משולש שווה-צלעות הוא גם שווה-שוקיים.', true),
            tf('לכל משולש יש 3 תיכונים.', true),
            tf('התיכון לכל צלע הוא תמיד גם גובה.', false),
          ],
        },
      ],
    },
    {
      title: 'התיכון לבסיס, ומידות',
      exercises: [
        { title: 'השלימו (משולש שווה-שוקיים, $AD$ התיכון לבסיס).', cols: 1, items: [medianToBase(40, 12), medianToBase(80, 9), medianToBase(110, 20)] },
        {
          title: 'תיכון במשולש כלשהו.',
          cols: 1,
          items: [
            { q: m`$AD$ תיכון לצלע $BC$, ו-$BC = 14$ ס״מ. $\;BD =$ [[7]] ס״מ` },
            { q: m`$BE$ תיכון לצלע $AC$, ו-$AE = 4.5$ ס״מ. $\;AC =$ [[9]] ס״מ` },
            { q: m`$CF$ תיכון לצלע $AB$, ו-$AB = 2x + 6$, $\;FB = 8$. $\;x =$ [[${(16 - 6) / 2}]]` },
          ],
        },
        { title: 'היקף.', cols: 1, items: [perimeter(10, 6), perimeter(7.5, 9), legFromPerimeter(32, 8), legFromPerimeter(25, 7)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'מצאו את הזווית.', cols: 2, items: [fromApex(50), fromBase(35)] },
      { title: 'השלימו.', cols: 1, items: [medianToBase(70, 16)] },
      { title: 'תיכון.', cols: 1, items: [{ q: m`$AM$ תיכון לצלע $BC$, ו-$BM = 6.5$ ס״מ. $\;BC =$ [[13]] ס״מ` }] },
      { title: 'היקף.', cols: 1, items: [legFromPerimeter(40, 12)] },
      { title: 'נכון או לא נכון?', cols: 1, items: [tf('במשולש שווה-שוקיים, התיכון לבסיס חוצה את זווית הראש.', true)] },
    ],
  },
};
