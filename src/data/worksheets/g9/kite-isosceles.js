import { m } from '../helpers.js';
import { tf } from './shared.js';

const kiteArea = (d1, d2) => ({ q: m`דלתון עם אלכסונים $${d1}$ ו-$${d2}$. השטח: [[${(d1 * d2) / 2}]]` });

/**
 * דלתון ABCD (AB = AD, CB = CD): האלכסון הראשי AC הוא ציר סימטריה,
 * ולכן ∠B = ∠D. נתונות ∠A ו-∠C.
 */
const kiteAngles = (A, C) => ({
  q: m`בדלתון $ABCD$ ($AB = AD$, $CB = CD$): $\angle A = ${A}°$, $\angle C = ${C}°$.`,
  a: m`$\angle B =$ [[${(360 - A - C) / 2}]] $° \qquad \angle D =$ [[${(360 - A - C) / 2}]] $°$`,
});

const kitePerimeter = (a, b) => ({ q: m`בדלתון זוג צלעות שוות של $${a}$ וזוג של $${b}$. ההיקף: [[${2 * (a + b)}]]` });

/** משולש שווה-שוקיים: מזווית הראש / מזווית בסיס. */
const fromApex = (apex) => ({ q: m`משולש שווה-שוקיים, זווית הראש $${apex}°$. כל זווית בסיס: [[${(180 - apex) / 2}]] $°$` });
const fromBase = (base) => ({ q: m`משולש שווה-שוקיים, זווית בסיס $${base}°$. זווית הראש: [[${180 - 2 * base}]] $°$` });

/** במשולש שווה-שוקיים: חוצה זווית הראש = תיכון = גובה. */
const bisector = (apex, baseLen) => ({
  q: m`$AB = AC$, $\angle A = ${apex}°$, $BC = ${baseLen}$. $AD$ חוצה את זווית $A$.`,
  a: m`$BD =$ [[${baseLen / 2}]] $\quad \angle ADB =$ [[90]] $° \quad \angle BAD =$ [[${apex / 2}]] $°$`,
});

export default {
  id: 'g9r-kite-isosceles',
  grade: 9,
  emoji: '🪁',
  title: 'דלתון ומשולש שווה-שוקיים',
  reminder: [
    {
      title: 'דלתון',
      md: m`שני זוגות של **צלעות סמוכות** שוות. האלכסון **הראשי** (בין הקודקודים שבהם נפגשות צלעות שוות) הוא **ציר סימטריה**: מאונך לאלכסון המשני וחוצה אותו, וחוצה את הזוויות.

**שטח** $= \frac{d_1 \cdot d_2}{2}$. הזוויות שליד האלכסון המשני — **שוות**.`,
    },
    {
      title: 'משולש שווה-שוקיים',
      md: m`זוויות הבסיס **שוות** (ולהפך: שתי זוויות שוות ← שווה-שוקיים).

**חוצה זווית הראש = התיכון לבסיס = הגובה לבסיס** — אותו קטע.`,
    },
  ],
  pages: [
    {
      title: 'דלתון',
      exercises: [
        { title: 'שטח הדלתון.', cols: 2, items: [kiteArea(8, 12), kiteArea(10, 7), kiteArea(6, 15), kiteArea(9, 4)] },
        { title: 'זוויות בדלתון.', cols: 1, items: [kiteAngles(80, 60), kiteAngles(120, 40), kiteAngles(90, 50)] },
        { title: 'היקף.', cols: 2, items: [kitePerimeter(5, 9), kitePerimeter(7.5, 4)] },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf('בדלתון האלכסונים מאונכים זה לזה.', true),
            tf('בדלתון האלכסונים חוצים זה את זה.', false),
            tf('כל מעוין הוא גם דלתון.', true),
          ],
        },
      ],
    },
    {
      title: 'משולש שווה-שוקיים',
      exercises: [
        { title: 'זוויות.', cols: 2, items: [fromApex(40), fromApex(100), fromBase(72), fromBase(35)] },
        { title: 'חוצה הזווית הוא גם תיכון וגם גובה.', cols: 1, items: [bisector(50, 12), bisector(120, 9), bisector(36, 20)] },
        {
          title: 'הוכחה — בחרו את המשפט שמתאים.',
          cols: 1,
          items: [
            {
              q: m`במשולש $ABC$, $\angle B = \angle C$. מה אפשר להסיק?`,
              options: [m`$AB = AC$`, m`$AB = BC$`, m`$BC = AC$`],
              answer: 0,
            },
            {
              q: m`במשולש שווה-שוקיים $ABC$ ($AB = AC$), $AD$ גובה לבסיס. מה עוד נכון על $AD$?`,
              options: ['הוא גם תיכון וגם חוצה זווית', 'הוא שווה לבסיס', 'הוא מקביל לבסיס'],
              answer: 0,
            },
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'דלתון.', cols: 1, items: [kiteArea(14, 9), kiteAngles(100, 70)] },
      { title: 'משולש שווה-שוקיים.', cols: 1, items: [fromApex(64), bisector(80, 15)] },
      { title: 'נכון או לא נכון?', cols: 1, items: [tf('במשולש שווה-שוקיים, התיכון לבסיס מאונך לבסיס.', true)] },
    ],
  },
};
