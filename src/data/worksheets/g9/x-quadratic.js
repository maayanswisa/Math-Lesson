import { m } from '../helpers.js';
import { exact, poly, roots, vertex, tf } from './shared.js';

const OPEN = ['כלפי מעלה', 'כלפי מטה'];
const opens = (a, b, c) => ({ q: m`$y = ${poly([a, b, c])}$ — הפרבולה פותחת...`, options: OPEN, answer: a > 0 ? 0 : 1 });
const yInt = (a, b, c) => ({ q: m`$y = ${poly([a, b, c])}$ — חיתוך עם ציר $y$: $(0,$ [[${c}]] $)$` });
const vtx = (a, b, c) => {
  const [p, q] = vertex(a, b, c);
  return { q: m`$y = ${poly([a, b, c])}$`, a: m`קודקוד: $($ ${exact(p)} $,\,$ ${exact(q)} $)$` };
};
const value = (a, b, c, x) => ({ q: m`$y = ${poly([a, b, c])}$ $\qquad x = ${x} \Rightarrow y =$ [[${a * x * x + b * x + c}]]` });
function xInts(a, b, c) {
  const r = roots(a, b, c);
  return { q: m`$y = ${poly([a, b, c])}$`, a: m`חיתוך עם ציר $x$: $x_1 =$ ${exact(r[0])} $,\; x_2 =$ ${exact(r[1])} $\;(x_1 > x_2)$` };
}

export default {
  id: 'g9x-quadratic',
  grade: 9,
  emoji: '🌈',
  title: 'פונקציה ריבועית — בסיס',
  reminder: [
    {
      title: 'הפרבולה',
      md: m`$y = ax^2 + bx + c$. $\;a > 0$ — פותחת **למעלה** ($\cup$) · $a < 0$ — **למטה** ($\cap$)`,
    },
    {
      title: 'חיתוכים',
      md: m`**ציר $y$**: מציבים $x = 0$ ← הנקודה $(0, c)$.
**ציר $x$**: פותרים $y = 0$.`,
    },
    {
      title: 'קודקוד',
      md: m`$x = -\frac{b}{2a}$, ואת $y$ מקבלים בהצבה. $\;y = x^2 - 4x + 3$: $x = 2$, $y = -1$.`,
    },
  ],
  pages: [
    {
      title: 'צורה, חיתוך עם ציר y והצבה',
      exercises: [
        { title: 'לאן פותחת הפרבולה?', cols: 2, items: [opens(1, 2, 3), opens(-2, 0, 5), opens(-1, 4, 0), opens(3, -1, -2)] },
        { title: m`חיתוך עם ציר $y$.`, cols: 2, items: [yInt(1, -3, 5), yInt(-1, 2, -4), yInt(2, 1, 0)] },
        { title: 'הציבו וחשבו.', cols: 2, items: [value(1, 0, 0, 3), value(1, -2, 1, 4), value(-1, 0, 9, 2), value(2, 3, -1, -1)] },
      ],
    },
    {
      title: 'קודקוד וחיתוכים עם ציר x',
      exercises: [
        { title: 'מצאו את הקודקוד.', cols: 1, items: [vtx(1, -4, 3), vtx(1, 2, -3), vtx(-1, 6, -5), vtx(1, 0, -4)] },
        { title: m`חיתוכים עם ציר $x$.`, cols: 1, items: [xInts(1, -4, 3), xInts(1, 0, -9), xInts(1, 1, -6)] },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [tf(m`לפרבולה $y = -x^2$ יש מקסימום.`, true), tf(m`הפרבולה $y = x^2 + 5$ חותכת את ציר $y$ ב-$(0, 5)$.`, true)],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'לאן פותחת?', cols: 1, items: [opens(-3, 1, 2)] },
      { title: m`חיתוך עם ציר $y$ והצבה.`, cols: 2, items: [yInt(1, 4, -7), value(1, -3, 2, 5)] },
      { title: 'קודקוד.', cols: 1, items: [vtx(1, -6, 5)] },
      { title: m`חיתוכים עם ציר $x$.`, cols: 1, items: [xInts(1, -5, 4)] },
    ],
  },
};
