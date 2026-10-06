import { m, round, boxFig } from '../helpers.js';
import { exact, tf } from './shared.js';

const box = (l, w, h, fig = false) => ({
  q: fig ? '' : m`תיבה $${l} \times ${w} \times ${h}$`,
  figure: fig ? boxFig({ l, w, h }) : undefined,
  a: m`נפח: [[${l * w * h}]] $\qquad$ שטח פנים: [[${2 * (l * w + l * h + w * h)}]]`,
});

/** מנסרה משולשת ישרה שבסיסה משולש ישר-זווית עם ניצבים a, b (יתר c). */
function triPrism(a, b, h) {
  const c = Math.sqrt(a * a + b * b);
  if (!Number.isInteger(c)) throw new Error('hypotenuse not whole');
  const base = (a * b) / 2;
  return {
    q: m`מנסרה ישרה שבסיסה משולש ישר-זווית עם ניצבים $${a}$ ו-$${b}$, וגובה המנסרה $${h}$.`,
    a: m`שטח הבסיס: [[${base}]] $\quad$ נפח: [[${base * h}]] $\quad$ שטח פנים: [[${2 * base + (a + b + c) * h}]]`,
  };
}

/** פירמידה ריבועית: צלע בסיס a, גובה H — נפח, ואפותמה / מקצוע צדדי בפיתגורס. */
function squarePyramid(a, H) {
  const apothem = Math.sqrt(H * H + (a / 2) ** 2);
  return {
    q: m`פירמידה ישרה שבסיסה ריבוע עם צלע $${a}$, וגובהה $${H}$.`,
    a: m`נפח: ${exact((a * a * H) / 3)} $\qquad$ גובה הפאה הצדדית: ${Number.isInteger(apothem) ? `[[${apothem}]]` : `[[n:${round(apothem, 2)}~0.02]]`}`,
  };
}

export default {
  id: 'g9r-solid-prism-pyramid',
  grade: 9,
  emoji: '🔺',
  title: 'תיבה, מנסרה ופירמידה — נפח ושטח פנים',
  reminder: [
    {
      title: 'תיבה ומנסרה',
      md: m`**נפח מנסרה** (כל צורת בסיס) $=$ שטח הבסיס $\times$ גובה. תיבה: $V = abc$.

**שטח פנים** $= 2 \times$ שטח בסיס $+$ היקף הבסיס $\times$ גובה.`,
    },
    {
      title: 'פירמידה',
      md: m`$V = \frac{1}{3} \times$ שטח הבסיס $\times$ גובה — שליש מהמנסרה עם אותו בסיס וגובה.

בפירמידה ריבועית: **גובה הפאה הצדדית** $= \sqrt{H^2 + (\frac{a}{2})^2}$ (פיתגורס).`,
    },
  ],
  pages: [
    {
      title: 'תיבה ומנסרה',
      exercises: [
        { title: 'תיבה: נפח ושטח פנים.', cols: 1, items: [box(5, 4, 3), box(10, 2, 6), box(4, 4, 4)] },
        { title: 'לפי השרטוט.', cols: 2, items: [box(6, 3, 2, true), box(8, 5, 4, true)] },
        { title: 'מנסרה משולשת ישרה.', cols: 1, items: [triPrism(3, 4, 10), triPrism(6, 8, 5), triPrism(5, 12, 2)] },
      ],
    },
    {
      title: 'פירמידה',
      exercises: [
        { title: 'פירמידה ריבועית.', cols: 1, items: [squarePyramid(6, 4), squarePyramid(10, 12), squarePyramid(8, 3), squarePyramid(4, 6)] },
        {
          title: 'השלימו.',
          cols: 1,
          items: [
            { q: m`פירמידה ומנסרה עם אותו בסיס ואותו גובה. נפח המנסרה $60$. נפח הפירמידה: [[20]]` },
            { q: m`פירמידה שבסיסה משולש בשטח $15$, וגובהה $8$. הנפח: [[${(15 * 8) / 3}]]` },
            { q: m`תיבה שנפחה $120$ ובסיסה $6 \times 5$. הגובה: [[${120 / 30}]]` },
          ],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [tf('נפח פירמידה הוא שליש מנפח המנסרה עם אותו בסיס ואותו גובה.', true), tf('גובה הפירמידה שווה לגובה הפאה הצדדית.', false)],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'תיבה.', cols: 1, items: [box(7, 3, 2)] },
      { title: 'מנסרה משולשת.', cols: 1, items: [triPrism(9, 12, 4)] },
      { title: 'פירמידה ריבועית.', cols: 1, items: [squarePyramid(12, 8)] },
    ],
  },
};
