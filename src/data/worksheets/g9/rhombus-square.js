import { m, round } from '../helpers.js';
import { approx, tf } from './shared.js';

/** מעוין לפי אלכסונים: צלע (פיתגורס על חצאי האלכסונים) ושטח. */
function fromDiagonals(d1, d2) {
  const s = Math.sqrt((d1 / 2) ** 2 + (d2 / 2) ** 2);
  return {
    q: m`מעוין עם אלכסונים $${d1}$ ו-$${d2}$.`,
    a: m`צלע: ${Number.isInteger(s) ? `[[${s}]]` : approx(s)} $\qquad$ שטח: [[${(d1 * d2) / 2}]] $\qquad$ היקף: ${Number.isInteger(s) ? `[[${4 * s}]]` : approx(4 * s)}`,
  };
}

const rhombusAngles = (A) => ({
  q: m`במעוין $ABCD$ (עם האלכסונים $AC$ ו-$BD$), $\angle A = ${A}°$.`,
  a: m`$\angle CAB =$ [[${A / 2}]] $° \qquad \angle B =$ [[${180 - A}]] $° \qquad \angle ABD =$ [[${(180 - A) / 2}]] $°$`,
});

const square = (a) => ({
  q: m`ריבוע שצלעו $${a}$.`,
  a: m`אלכסון $\approx$ ${approx(a * Math.SQRT2)} $\qquad$ שטח: [[${a * a}]]`,
});
const squareFromDiag = (d) => ({ q: m`אלכסון של ריבוע הוא $${d}$. שטח הריבוע: [[${round((d * d) / 2)}]]` });

const SHAPES = ['מקבילית', 'מלבן', 'מעוין', 'ריבוע'];
const which = (q, shape) => ({ q, options: SHAPES, answer: SHAPES.indexOf(shape) });

export default {
  id: 'g9r-rhombus-square',
  grade: 9,
  emoji: '🔶',
  title: 'מעוין וריבוע',
  reminder: [
    {
      title: 'מעוין',
      md: m`כל הצלעות שוות. האלכסונים **מאונכים**, **חוצים זה את זה**, ו**חוצים את הזוויות**.

**שטח** $= \frac{d_1 \cdot d_2}{2}$. צלע מהאלכסונים: פיתגורס על החצאים — אלכסונים $6, 8$ ← צלע $5$.`,
    },
    {
      title: 'ריבוע',
      md: m`ריבוע הוא **גם מלבן וגם מעוין** — יש לו את כל התכונות של שניהם.

אלכסון $= a\sqrt{2}$ · שטח $= a^2 = \frac{d^2}{2}$`,
    },
    {
      title: 'זיהוי',
      md: m`מקבילית + צלעות סמוכות שוות ← מעוין · מקבילית + אלכסונים מאונכים ← מעוין · מעוין + זווית ישרה ← ריבוע`,
    },
  ],
  pages: [
    {
      title: 'מעוין',
      exercises: [
        { title: 'צלע, שטח והיקף לפי האלכסונים.', cols: 1, items: [fromDiagonals(6, 8), fromDiagonals(10, 24), fromDiagonals(12, 16), fromDiagonals(4, 6)] },
        { title: 'זוויות במעוין.', cols: 1, items: [rhombusAngles(60), rhombusAngles(110), rhombusAngles(84)] },
        {
          title: 'נתון חסר.',
          cols: 1,
          items: [
            { q: m`שטח מעוין $48$ ואלכסון אחד $12$. האלכסון השני: [[${(2 * 48) / 12}]]` },
            { q: m`היקף מעוין $52$. אורך הצלע: [[${52 / 4}]]` },
          ],
        },
      ],
    },
    {
      title: 'ריבוע ויחסי הכלה',
      exercises: [
        { title: 'ריבוע.', cols: 1, items: [square(5), square(10), squareFromDiag(8), squareFromDiag(6)] },
        {
          title: 'מה המרובע? (הכי מדויק)',
          cols: 1,
          items: [
            which('מקבילית שהאלכסונים שלה מאונכים.', 'מעוין'),
            which('מעוין עם זווית ישרה.', 'ריבוע'),
            which('מקבילית שהאלכסונים שלה שווים ומאונכים.', 'ריבוע'),
            which('מקבילית שהאלכסונים שלה שווים.', 'מלבן'),
          ],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [tf('כל ריבוע הוא מעוין.', true), tf('כל מעוין הוא ריבוע.', false), tf('במעוין האלכסונים שווים.', false), tf('במעוין האלכסונים חוצים את הזוויות.', true)],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'מעוין.', cols: 1, items: [fromDiagonals(16, 30), rhombusAngles(70)] },
      { title: 'ריבוע.', cols: 1, items: [squareFromDiag(10)] },
      { title: 'מה המרובע?', cols: 1, items: [which('מלבן שבו האלכסונים מאונכים.', 'ריבוע')] },
    ],
  },
};
