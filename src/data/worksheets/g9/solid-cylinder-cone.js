import { m, round } from '../helpers.js';
import { approx, tf } from './shared.js';

const PI = 3.14;

const cylinder = (r, h) => ({
  q: m`גליל: רדיוס $${r}$, גובה $${h}$`,
  a: m`נפח $\approx$ ${approx(PI * r * r * h)} $\qquad$ שטח פנים $\approx$ ${approx(2 * PI * r * r + 2 * PI * r * h)}`,
});

/** חרוט: הגובה המשופע l = √(r² + h²). */
function cone(r, h) {
  const l = Math.sqrt(r * r + h * h);
  if (!Number.isInteger(l)) throw new Error('slant not whole');
  return {
    q: m`חרוט: רדיוס $${r}$, גובה $${h}$`,
    a: m`הגובה המשופע: [[${l}]] $\qquad$ נפח $\approx$ ${approx((PI * r * r * h) / 3)} $\qquad$ שטח פנים $\approx$ ${approx(PI * r * r + PI * r * l)}`,
  };
}

export default {
  id: 'g9r-solid-cylinder-cone',
  grade: 9,
  emoji: '🍦',
  title: 'גליל וחרוט — נפח ושטח פנים',
  reminder: [
    {
      title: 'גליל',
      md: m`$V = \pi r^2 h$ $\qquad S = 2\pi r^2 + 2\pi r h$ (שני בסיסים + מעטפת)`,
    },
    {
      title: 'חרוט',
      md: m`$V = \frac{1}{3}\pi r^2 h$ — שליש מהגליל המתאים.

**הגובה המשופע** $l = \sqrt{r^2 + h^2}$ $\quad$ $S = \pi r^2 + \pi r l$`,
    },
    {
      title: 'בדף הזה',
      md: m`$\pi \approx 3.14$. עגלו לשתי ספרות אחרי הנקודה (מתקבל גם חישוב עם $\pi$ מדויק יותר).`,
    },
  ],
  pages: [
    {
      title: 'גליל',
      exercises: [
        { title: 'נפח ושטח פנים.', cols: 1, items: [cylinder(2, 5), cylinder(3, 10), cylinder(1, 7), cylinder(5, 2)] },
        {
          title: 'בעיות.',
          cols: 1,
          items: [
            { q: m`כוס גלילית ברדיוס $4$ ס״מ וגובה $10$ ס״מ. כמה סמ״ק מים נכנסים בה?`, a: m`${approx(PI * 16 * 10)} סמ״ק` },
            { q: m`נפח גליל $${round(PI * 9 * 4)}$ ורדיוסו $3$. הגובה:`, a: '[[4]]' },
          ],
        },
      ],
    },
    {
      title: 'חרוט',
      exercises: [
        { title: 'גובה משופע, נפח ושטח פנים.', cols: 1, items: [cone(3, 4), cone(6, 8), cone(5, 12)] },
        {
          title: 'השלימו.',
          cols: 1,
          items: [
            { q: m`גליל וחרוט עם אותו בסיס ואותו גובה. נפח הגליל $90$. נפח החרוט: [[30]]` },
            { q: m`חרוט עם גובה משופע $10$ ורדיוס $6$. הגובה: [[8]]` },
          ],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [tf('נפח חרוט הוא שליש מנפח הגליל עם אותו בסיס וגובה.', true), tf('הגובה המשופע של חרוט קטן מהגובה שלו.', false)],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'גליל.', cols: 1, items: [cylinder(4, 6)] },
      { title: 'חרוט.', cols: 1, items: [cone(9, 12)] },
      { title: 'השלימו.', cols: 1, items: [{ q: m`חרוט וגליל עם אותו בסיס וגובה. נפח החרוט $25$. נפח הגליל: [[75]]` }] },
    ],
  },
};
