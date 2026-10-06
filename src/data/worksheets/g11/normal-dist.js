import { m, round } from '../helpers.js';
import { exact, Phi, tf } from './shared.js';

/** הסתברות מהטבלה: 4 ספרות, עם סובלנות קטנה להבדלי עיגול בין טבלאות. */
const table = (p) => `[[n:${round(p, 4)}~0.002]]`;

export const zScore = (x, mean, sd) => ({ q: m`$\bar{x} = ${mean}$, $\;\sigma = ${sd}$, $\;x = ${x}$ $\qquad z =$ ${exact((x - mean) / sd)}` });
export const fromZ = (z, mean, sd) => ({ q: m`$\bar{x} = ${mean}$, $\;\sigma = ${sd}$, $\;z = ${z}$ $\qquad x =$ ${exact(mean + z * sd)}` });

export const below = (z) => ({ q: m`$P(Z < ${z}) =$ ${table(Phi(z))}` });
export const above = (z) => ({ q: m`$P(Z > ${z}) =$ ${table(1 - Phi(z))}` });
export const between = (a, b) => ({ q: m`$P(${a} < Z < ${b}) =$ ${table(Phi(b) - Phi(a))}` });

/** הסתברות לערך מקורי: ממירים לציון תקן ומשתמשים בטבלה. */
export const realAbove = (what, x, mean, sd, unit) => ({
  q: m`${what}: ממוצע $${mean}$${unit}, סטיית תקן $${sd}$${unit}. איזה אחוז מעל $${x}$${unit}?`,
  a: m`$z =$ ${exact((x - mean) / sd)} $\qquad$ אחוז: [[n:${round((1 - Phi((x - mean) / sd)) * 100, 2)}~0.2]] $\%$`,
});

/** איפה התלמיד "טוב יותר" ביחס לכיתה — לפי ציון התקן. */
export function compareZ([s1, x1, m1, sd1], [s2, x2, m2, sd2]) {
  const z1 = (x1 - m1) / sd1;
  const z2 = (x2 - m2) / sd2;
  if (z1 === z2) throw new Error('equal z');
  return {
    q: m`ב${s1}: $${x1}$ (ממוצע $${m1}$, סטיית תקן $${sd1}$). ב${s2}: $${x2}$ (ממוצע $${m2}$, סטיית תקן $${sd2}$). איפה המיקום היחסי גבוה יותר?`,
    options: [`ב${s1}`, `ב${s2}`],
    answer: z1 > z2 ? 0 : 1,
  };
}

export default {
  id: 'g11-u4-normal-dist',
  grade: 11,
  emoji: '🔔',
  title: 'התפלגות נורמלית וציוני תקן',
  reminder: [
    {
      title: 'ציון תקן',
      md: m`$$z = \frac{x - \bar{x}}{\sigma}$$

כמה סטיות תקן הערך רחוק מהממוצע (ולאיזה כיוון). ממוצע $70$, $\sigma = 10$, $x = 85$ ← $z = 1.5$.`,
    },
    {
      title: 'העקומה הנורמלית',
      md: m`**סימטרית** סביב הממוצע: ממוצע = חציון = שכיח. השטח מתחת לעקומה $= 1$.

בקירוב: $68\%$ בין $\pm 1\sigma$ · $95\%$ בין $\pm 2\sigma$ · $99.7\%$ בין $\pm 3\sigma$`,
    },
    {
      title: 'שימוש בטבלה',
      wide: true,
      md: m`הטבלה נותנת $\Phi(z) = P(Z < z)$. $\;P(Z > z) = 1 - \Phi(z)$ $\;\cdot\;$ $P(a < Z < b) = \Phi(b) - \Phi(a)$ $\;\cdot\;$ $\Phi(-z) = 1 - \Phi(z)$

$\Phi(1) \approx 0.8413$ · $\Phi(1.5) \approx 0.9332$ · $\Phi(2) \approx 0.9772$ (כתבו $4$ ספרות אחרי הנקודה)`,
    },
  ],
  pages: [
    {
      title: 'ציוני תקן',
      exercises: [
        { title: 'חשבו את ציון התקן.', cols: 2, items: [zScore(85, 70, 10), zScore(60, 70, 10), zScore(74, 80, 4), zScore(130, 100, 15), zScore(50, 50, 7)] },
        { title: 'מציון תקן לערך.', cols: 2, items: [fromZ(2, 70, 10), fromZ(-0.5, 70, 10), fromZ(1.2, 160, 5), fromZ(-2, 100, 15)] },
        {
          title: 'איפה המיקום היחסי גבוה יותר?',
          cols: 1,
          items: [compareZ(['מתמטיקה', 80, 70, 5], ['אנגלית', 85, 75, 10]), compareZ(['ריצה', 62, 60, 4], ['קפיצה', 3.6, 3.2, 0.5])],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf('הממוצע של ציוני התקן הוא 0, וסטיית התקן שלהם 1.', true),
            tf('ציון תקן שלילי פירושו ערך מתחת לממוצע.', true),
            tf('לציון תקן יש אותן יחידות כמו לנתונים המקוריים.', false),
          ],
        },
      ],
    },
    {
      title: 'הסתברויות בהתפלגות נורמלית',
      exercises: [
        { title: 'היעזרו בטבלה (4 ספרות אחרי הנקודה).', cols: 2, items: [below(1), below(-0.5), above(1.5), above(-1), between(-1, 1), between(0, 2)] },
        {
          title: 'מהסתברות לציון תקן.',
          cols: 1,
          items: [
            { q: m`$P(Z < z) = 0.9772$ $\qquad z =$ [[n:2~0.01]]` },
            { q: m`$P(Z < z) = 0.8413$ $\qquad z =$ [[n:1~0.01]]` },
            { q: m`$P(Z > z) = 0.5$ $\qquad z =$ [[0]]` },
          ],
        },
        {
          title: 'בעיות.',
          cols: 1,
          items: [
            realAbove('גובה תלמידים', 186, 170, 8, ' ס״מ'),
            realAbove('ציוני מבחן', 85, 70, 10, ''),
            {
              q: m`משקל תפוחים מתפלג נורמלית עם ממוצע $150$ גרם וסטיית תקן $20$ גרם. איזה אחוז מהתפוחים שוקלים בין $130$ ל-$170$ גרם?`,
              a: m`[[n:${round((Phi(1) - Phi(-1)) * 100, 2)}~0.3]] $\%$`,
            },
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'ציוני תקן.', cols: 2, items: [zScore(91, 75, 8), fromZ(-1.5, 60, 6)] },
      { title: 'היעזרו בטבלה.', cols: 2, items: [below(2), above(0.5), between(-2, 1)] },
      { title: 'בעיה.', cols: 1, items: [realAbove('זמני ריצה', 13, 12, 0.5, ' שניות')] },
      { title: 'איפה המיקום היחסי גבוה יותר?', cols: 1, items: [compareZ(['כיתה א׳', 78, 70, 4], ['כיתה ב׳', 88, 80, 8])] },
    ],
  },
};
