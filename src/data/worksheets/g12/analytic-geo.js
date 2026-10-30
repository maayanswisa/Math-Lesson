import { m } from '../helpers.js';
import { exact, tf } from './shared.js';

const P = ([x, y]) => `(${x},${y})`;

const distance = (a, b) => {
  const d = Math.hypot(b[0] - a[0], b[1] - a[1]);
  if (!Number.isInteger(d)) throw new Error('distance not whole');
  return { q: m`$A${P(a)}$, $\;B${P(b)}$`, a: m`המרחק $AB$: [[${d}]]` };
};

const midpoint = (a, b) => ({
  q: m`$A${P(a)}$, $\;B${P(b)}$`,
  a: m`האמצע: $($ [[${(a[0] + b[0]) / 2}]] $,\,$ [[${(a[1] + b[1]) / 2}]] $)$`,
});

const slope = (a, b) => ({ q: m`$A${P(a)}$, $\;B${P(b)}$`, a: m`השיפוע: ${exact((b[1] - a[1]) / (b[0] - a[0]))}` });

/** משוואת הישר דרך שתי נקודות: y = mx + b. */
const lineThrough = (a, b) => {
  const s = (b[1] - a[1]) / (b[0] - a[0]);
  return { q: m`הישר שעובר דרך $${P(a)}$ ודרך $${P(b)}$`, a: m`$y =$ ${exact(s)}$x\,+$ ${exact(a[1] - s * a[0])}` };
};

/** משולש בין הישר y = mx + b לבין הצירים. */
const axisTriangle = (s, b) => {
  const x0 = -b / s;
  return {
    q: m`הישר $y=${s}x+${b}$ והצירים יוצרים משולש.`,
    a: m`החיתוך עם ציר $x$: [[${x0}]] $\qquad$ החיתוך עם ציר $y$: [[${b}]] $\qquad$ השטח: ${exact(Math.abs(x0 * b) / 2)}`,
  };
};

export default {
  id: 'g12-u3-analytic-geo',
  grade: 12,
  emoji: '📍',
  title: 'גאומטריה אנליטית — ישר',
  reminder: [
    {
      title: 'מרחק ואמצע',
      md: m`$$d=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$$

$$M=\left(\frac{x_1+x_2}{2},\ \frac{y_1+y_2}{2}\right)$$`,
    },
    {
      title: 'שיפוע ומשוואה',
      md: m`$$m=\frac{y_2-y_1}{x_2-x_1}$$

$y=mx+b$ — $b$ הוא החיתוך עם ציר $y$.

דרך נקודה: $y-y_1=m(x-x_1)$`,
    },
    {
      title: 'מקבילים, ניצבים וחיתוכים',
      wide: true,
      md: m`מקבילים: $m_1=m_2$. $\;$ ניצבים: $m_1\cdot m_2=-1$

חיתוך עם ציר $y$ — מציבים $x=0$. חיתוך עם ציר $x$ — מציבים $y=0$. שני ישרים — משווים את ה-$y$.`,
    },
  ],
  pages: [
    {
      title: 'מרחק, אמצע ושיפוע',
      exercises: [
        { title: 'חשבו את המרחק בין הנקודות.', cols: 2, items: [distance([1, 2], [4, 6]), distance([-2, 1], [4, 9]), distance([0, 0], [5, 12]), distance([3, -1], [-3, 7])] },
        { title: 'מצאו את אמצע הקטע.', cols: 2, items: [midpoint([2, 4], [6, 10]), midpoint([-3, 5], [1, -1]), midpoint([0, 7], [8, 3]), midpoint([-4, -2], [4, 6])] },
        { title: 'חשבו את השיפוע.', cols: 2, items: [slope([1, 2], [3, 8]), slope([-1, 4], [3, 2]), slope([2, 5], [6, 5]), slope([0, -3], [2, 1])] },
        {
          title: 'הפוך: נתון האמצע.',
          cols: 1,
          items: [{ q: m`$A(2,5)$, והנקודה $M(4,1)$ היא אמצע הקטע $AB$. מצאו את $B$.`, a: m`$B$: $($ [[6]] $,\,$ [[-3]] $)$` }],
        },
      ],
    },
    {
      title: 'משוואת ישר',
      exercises: [
        { title: m`מצאו את משוואת הישר, בצורה $y=mx+b$.`, cols: 1, items: [lineThrough([0, 3], [2, 7]), lineThrough([1, 1], [3, 5]), lineThrough([-2, 4], [2, 2])] },
        {
          title: 'מקבילים וניצבים.',
          cols: 1,
          items: [
            { q: m`השיפוע של ישר שמקביל ל-$y=3x-2$:`, a: m`השיפוע: [[3]]` },
            { q: m`השיפוע של ישר שניצב ל-$y=2x+1$:`, a: m`השיפוע: [[-0.5]]` },
            { q: m`ישר שניצב ל-$y=3x-2$ ועובר דרך $(3,0)$.`, a: m`$y =$ [[n:-0.333~0.004]]$x\,+$ [[1]]` },
          ],
        },
        {
          title: 'נקודות חיתוך ושטחים.',
          cols: 1,
          items: [
            { q: m`נקודת החיתוך של $y=2x-1$ עם $y=-x+5$`, a: m`$($ [[2]] $,\,$ [[3]] $)$` },
            axisTriangle(-2, 8),
            axisTriangle(-3, 6),
          ],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [tf(m`הישרים $y=2x+1$ ו-$y=2x-3$ מקבילים.`, true), tf(m`הישרים $y=2x$ ו-$y=-2x$ ניצבים זה לזה.`, false), tf(m`הנקודה $(6,4)$ נמצאת על הישר $y=\frac12x+1$.`, true)],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'מרחק ואמצע.', cols: 2, items: [distance([2, 1], [8, 9]), midpoint([-2, 7], [6, 3])] },
      { title: 'משוואת ישר.', cols: 1, items: [lineThrough([0, -1], [2, 5])] },
      { title: 'שטח.', cols: 1, items: [axisTriangle(-1, 4)] },
    ],
  },
};
