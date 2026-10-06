import { m } from '../helpers.js';
import { exact, poly, roots, tf } from './shared.js';

/** פתרון ax² + bx + c = 0: שני שורשים (מהגדול לקטן), אחד, או אין. */
function solve(a, b, c) {
  const r = roots(a, b, c);
  const tex = m`$${poly([a, b, c])} = 0$`;
  if (r.length === 2) return { q: tex, a: m`$x_1 =$ ${exact(r[0])} $\qquad x_2 =$ ${exact(r[1])} $\qquad (x_1 > x_2)$` };
  if (r.length === 1) return { q: tex, a: m`$x =$ ${exact(r[0])}` };
  throw new Error('no roots — use discriminant() instead');
}

const COUNT = ['שני פתרונות', 'פתרון אחד', 'אין פתרון'];

/** הדיסקרימיננטה + מספר הפתרונות — שני פריטים. */
const discriminant = (a, b, c) => {
  const D = b * b - 4 * a * c;
  return [
    { q: m`$${poly([a, b, c])} = 0$ $\qquad \Delta = b^2 - 4ac =$ [[${D}]]` },
    { q: 'כמה פתרונות יש למשוואה?', options: COUNT, answer: D > 0 ? 0 : D === 0 ? 1 : 2 },
  ];
};

/** חיתוך ישר ופרבולה: y = ax² + bx + c ו-y = kx + d. */
function lineParabola([a, b, c], [k, d]) {
  const r = roots(a, b - k, c - d);
  if (r.length !== 2) throw new Error('need two intersection points');
  return {
    q: m`$y = ${poly([a, b, c])}$ ו-$y = ${poly([k, d])}$`,
    a: m`$x_1 =$ ${exact(r[0])} $\qquad x_2 =$ ${exact(r[1])} $\qquad (x_1 > x_2)$`,
  };
}

export default {
  id: 'g9r-quad-eq',
  grade: 9,
  emoji: '✳️',
  title: 'משוואות ריבועיות',
  reminder: [
    {
      title: 'נוסחת השורשים',
      md: m`$$ax^2 + bx + c = 0 \;\Rightarrow\; x_{1,2} = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

$x^2 - 5x + 6 = 0$: $\;x = \frac{5 \pm \sqrt{25 - 24}}{2} = \frac{5 \pm 1}{2}$ ← $3$ או $2$`,
    },
    {
      title: 'הדיסקרימיננטה',
      md: m`$\Delta = b^2 - 4ac$: $\;\Delta > 0$ — שני פתרונות · $\Delta = 0$ — פתרון אחד · $\Delta < 0$ — אין פתרון`,
    },
    {
      title: 'דרכים מהירות',
      md: m`**גורם משותף**: $x^2 - 7x = 0 \Rightarrow x(x - 7) = 0$
**פירוק טרינום**: $x^2 + x - 12 = (x + 4)(x - 3) = 0$
**הוצאת שורש**: $x^2 = 49 \Rightarrow x = \pm 7$`,
    },
  ],
  pages: [
    {
      title: 'פתרון משוואות',
      exercises: [
        { title: 'פתרו בדרך מהירה (פירוק או שורש).', cols: 1, items: [solve(1, -7, 0), solve(1, 0, -49), solve(1, 1, -12), solve(2, -8, 0), solve(1, -6, 9)] },
        { title: 'פתרו בנוסחת השורשים (אם צריך — עגלו לשתי ספרות).', cols: 1, items: [solve(1, -5, 6), solve(2, 3, -2), solve(3, -10, 3), solve(1, 2, -4), solve(-1, 4, 5)] },
      ],
    },
    {
      title: 'הדיסקרימיננטה, ישר ופרבולה, ובעיות',
      exercises: [
        { title: 'כמה פתרונות?', cols: 2, items: [...discriminant(1, 4, 4), ...discriminant(1, 3, 5), ...discriminant(2, -3, -5)] },
        { title: 'נקודות החיתוך של הישר והפרבולה (ערכי x).', cols: 1, items: [lineParabola([1, 0, 0], [1, 2]), lineParabola([1, -2, -3], [0, 0]), lineParabola([1, 0, -1], [2, 2])] },
        {
          title: 'בעיות.',
          cols: 1,
          items: [
            { q: 'מכפלת שני מספרים טבעיים עוקבים היא 72. מהו המספר הקטן?', a: `[[${roots(1, 1, -72)[0]}]]` },
            { q: 'אורך מלבן גדול מרוחבו ב-3 ס״מ, ושטחו 40 סמ״ר. מה הרוחב?', a: m`[[${roots(1, 3, -40)[0]}]] ס״מ` },
            { q: 'ניצב אחד במשולש ישר-זווית ארוך מהשני ב-7, והיתר 13. מה אורך הניצב הקצר?', a: `[[${roots(2, 14, 49 - 169)[0]}]]` },
          ],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [tf(m`למשוואה $x^2 + 9 = 0$ יש שני פתרונות.`, false), tf(m`אם $\Delta = 0$, הפרבולה משיקה לציר $x$.`, true)],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'פתרו.', cols: 1, items: [solve(1, -2, -15), solve(1, 0, -64), solve(2, -5, 2)] },
      { title: 'כמה פתרונות?', cols: 2, items: discriminant(1, -6, 10) },
      { title: 'חיתוך ישר ופרבולה.', cols: 1, items: [lineParabola([1, 0, -4], [3, 0])] },
      { title: 'בעיה.', cols: 1, items: [{ q: 'ריבוע של מספר חיובי גדול ממנו ב-30. מהו המספר?', a: `[[${roots(1, -1, -30)[0]}]]` }] },
    ],
  },
};

