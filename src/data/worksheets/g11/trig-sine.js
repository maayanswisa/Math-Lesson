import { m, round } from '../helpers.js';
import { approx, exact, sinD, asinD, tf } from './shared.js';

/** משפט הסינוסים — מציאת צלע: a / sin A = b / sin B. */
const side = (a, A, B) => ({
  q: m`$a = ${a}$, $\;\angle A = ${A}°$, $\;\angle B = ${B}°$`,
  a: m`$b \approx$ ${approx((a * sinD(B)) / sinD(A))} $\qquad \angle C =$ [[${180 - A - B}]] $°$`,
});

/** משפט הסינוסים — מציאת זווית חדה. */
function angle(a, A, b) {
  const v = (b * sinD(A)) / a;
  if (v >= 1) throw new Error('no triangle');
  return { q: m`$a = ${a}$, $\;b = ${b}$, $\;\angle A = ${A}°$ ($\angle B$ חדה)`, a: m`$\angle B \approx$ ${approx(asinD(v), 1, 0.15)} $°$` };
}

/** רדיוס המעגל החוסם: a / sin A = 2R. */
const circumR = (a, A) => ({ q: m`$a = ${a}$, $\;\angle A = ${A}°$. $\quad R =$ ${A === 30 || A === 90 ? exact(a / (2 * sinD(A))) : approx(a / (2 * sinD(A)))}` });

const triArea = (a, b, g) => ({
  q: m`צלעות $${a}$ ו-$${b}$, והזווית ביניהן $${g}°$. השטח:`,
  a: g === 30 || g === 90 || g === 150 ? exact(round(0.5 * a * b * sinD(g), 6)) : approx(0.5 * a * b * sinD(g)),
});
const paraArea = (a, b, t) => ({ q: m`מקבילית: צלעות $${a}$ ו-$${b}$, הזווית ביניהן $${t}°$. השטח:`, a: approx(a * b * sinD(t)) });

export default {
  id: 'g11-u4-trig-sine',
  grade: 11,
  emoji: '📐',
  title: 'טריגונומטריה במישור: משפט הסינוסים ושטחי צורות',
  reminder: [
    {
      title: 'משפט הסינוסים',
      md: m`$$\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} = 2R$$

$a$ — הצלע **מול** הזווית $A$. $R$ — רדיוס המעגל החוסם.`,
    },
    {
      title: 'שטחים',
      md: m`**משולש**: $S = \frac{1}{2}ab\sin\gamma$ ($\gamma$ — הזווית **בין** $a$ ל-$b$)
**מקבילית**: $S = ab\sin\theta$

$\sin 30° = 0.5$ · $\sin 90° = 1$ · $\sin 150° = 0.5$`,
    },
    {
      title: 'זהירות במציאת זווית',
      wide: true,
      md: m`ל-$\sin B = 0.77$ יש **שתי** זוויות במשולש: $B \approx 50.4°$ או $B \approx 129.6°$ ($180° - 50.4°$). צריך לבדוק מה מתאים לנתונים.

בדף הזה עגלו צלעות ושטחים לשתי ספרות אחרי הנקודה, וזוויות — לספרה אחת.`,
    },
  ],
  pages: [
    {
      title: 'משפט הסינוסים',
      exercises: [
        { title: 'מצאו את הצלע $b$ ואת הזווית $C$.', cols: 1, items: [side(8, 40, 60), side(10, 30, 45), side(12, 70, 50), side(5, 35, 100)] },
        { title: 'מצאו את הזווית $B$.', cols: 1, items: [angle(10, 40, 12), angle(9, 50, 7), angle(15, 30, 20)] },
        { title: 'רדיוס המעגל החוסם.', cols: 2, items: [circumR(10, 30), circumR(8, 90), circumR(12, 50), circumR(7, 70)] },
      ],
    },
    {
      title: 'שטחי משולש ומקבילית',
      exercises: [
        { title: 'שטח משולש.', cols: 1, items: [triArea(6, 8, 30), triArea(10, 4, 90), triArea(5, 7, 60), triArea(9, 12, 150), triArea(6, 6, 45)] },
        { title: 'שטח מקבילית.', cols: 1, items: [paraArea(5, 7, 45), paraArea(10, 6, 30), paraArea(8, 9, 120)] },
        {
          title: 'מהשטח לזווית או לצלע.',
          cols: 1,
          items: [
            { q: m`שטח משולש $12$, שתי צלעות $6$ ו-$8$, הזווית ביניהן חדה. מה הזווית?`, a: m`[[${round(asinD((2 * 12) / 48))}]] $°$` },
            { q: m`שטח משולש $20$, צלע $8$, והזווית בינה לבין הצלע השנייה $30°$. מה אורך הצלע השנייה?`, a: `[[${(2 * 20) / (8 * 0.5)}]]` },
          ],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf(m`במשולש, מול הזווית הגדולה ביותר נמצאת הצלע הארוכה ביותר.`, true),
            tf(m`$\sin 120° = \sin 60°$`, true),
            tf(m`שטח משולש שתי צלעותיו $5$ ו-$8$ יכול להיות $25$.`, false),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'מצאו את הצלע $b$ ואת הזווית $C$.', cols: 1, items: [side(14, 50, 65)] },
      { title: 'מצאו את הזווית $B$.', cols: 1, items: [angle(11, 45, 9)] },
      { title: 'רדיוס המעגל החוסם.', cols: 1, items: [circumR(9, 30)] },
      { title: 'שטחים.', cols: 1, items: [triArea(7, 10, 30), paraArea(6, 11, 70)] },
    ],
  },
};

/** מחוללי פריטים — לשימוש חוזר בדפי התרגול המסכם. */
export { side, angle, circumR, triArea, paraArea };
