import { m, lin, round, coordPlane } from '../helpers.js';

const pt = ([x, y]) => `(${x}, ${y})`;
const slope = ([x1, y1], [x2, y2]) => round((y2 - y1) / (x2 - x1));

const slopeItem = (p, q) => ({ q: m`$${pt(p)}$ ו-$${pt(q)}$`, a: m`$m =$ [[${slope(p, q)}]]` });

/** ישר עם שיפוע m שעובר בנקודה p: y = mx + b. */
const fromSlope = (k, [x, y]) => ({
  q: m`שיפוע $${k}$, עובר בנקודה $${pt([x, y])}$`,
  a: m`$y =$ [[${k}]] $x +$ [[${round(y - k * x)}]]`,
});

const fromTwo = (p, q) => {
  const k = slope(p, q);
  return { q: m`עובר בנקודות $${pt(p)}$ ו-$${pt(q)}$`, a: m`$y =$ [[${k}]] $x +$ [[${round(p[1] - k * p[0])}]]` };
};

/** נקודת החיתוך של שני ישרים. */
function meet([m1, b1], [m2, b2]) {
  const x = (b2 - b1) / (m1 - m2);
  if (!Number.isInteger(x)) throw new Error('intersection is not on the grid');
  return { x, y: m1 * x + b1 };
}
const meetItem = (l1, l2) => {
  const { x, y } = meet(l1, l2);
  return { q: m`$y = ${lin(...l1)}$ ו-$y = ${lin(...l2)}$`, a: m`$($ [[${x}]] $,\,$ [[${y}]] $)$` };
};
const meetGraph = (l1, l2) => {
  const { x, y } = meet(l1, l2);
  return {
    q: '',
    figure: coordPlane({ lines: [{ m: l1[0], b: l1[1] }, { m: l2[0], b: l2[1] }] }),
    a: m`$($ [[${x}]] $,\,$ [[${y}]] $)$`,
  };
};

const parallel = ([k, b0], [x, y]) => ({
  q: m`מקביל ל-$y = ${lin(k, b0)}$ ועובר בנקודה $${pt([x, y])}$`,
  a: m`$y =$ [[${k}]] $x +$ [[${round(y - k * x)}]]`,
});

export default {
  id: 'g8-linear-eq-of-line',
  grade: 8,
  emoji: '📐',
  title: 'מציאת משוואת הקו הישר וגרפים של שתי פונקציות',
  reminder: [
    {
      title: 'שיפוע דרך שתי נקודות',
      md: m`$$m = \frac{y_2 - y_1}{x_2 - x_1}$$

$(1, 2)$ ו-$(3, 8)$: $\; m = \frac{8 - 2}{3 - 1} = \frac{6}{2} = 3$`,
    },
    {
      title: 'מציאת b',
      md: m`יודעים את $m$? מציבים נקודה של הישר ב-$y = mx + b$:

$m = 3$, נקודה $(1, 2)$: $\; 2 = 3 \cdot 1 + b \Rightarrow b = -1$ ← $y = 3x - 1$`,
    },
    {
      title: 'ישרים מיוחדים',
      md: m`$y = k$ — ישר **אופקי** (שיפוע $0$) · $x = k$ — ישר **אנכי** (לא פונקציה)

ישרים **מקבילים** — אותו שיפוע.`,
    },
    {
      title: 'חיתוך שני ישרים',
      md: m`משווים: $\; 2x + 1 = -x + 7 \Rightarrow 3x = 6 \Rightarrow x = 2$, ואז $y = 2 \cdot 2 + 1 = 5$ ← $(2, 5)$`,
    },
  ],
  pages: [
    {
      title: 'שיפוע ומשוואת ישר',
      exercises: [
        {
          title: 'מצאו את השיפוע של הישר שעובר בשתי הנקודות.',
          cols: 2,
          items: [slopeItem([1, 2], [3, 8]), slopeItem([0, 5], [2, 1]), slopeItem([-1, 4], [3, 4]), slopeItem([2, -1], [6, 1]), slopeItem([-2, -3], [1, 3])],
        },
        {
          title: 'מצאו את משוואת הישר לפי שיפוע ונקודה.',
          cols: 1,
          items: [fromSlope(2, [1, 5]), fromSlope(3, [2, 4]), fromSlope(-1, [3, 1]), fromSlope(0.5, [4, 0])],
        },
        {
          title: 'מצאו את משוואת הישר שעובר בשתי הנקודות.',
          cols: 1,
          items: [fromTwo([0, 1], [2, 7]), fromTwo([1, 1], [3, -3]), fromTwo([-2, 0], [2, 4])],
        },
      ],
    },
    {
      title: 'ישרים מיוחדים, מקבילים ונחתכים',
      exercises: [
        {
          title: 'בחרו את המשוואה המתאימה.',
          cols: 1,
          items: [
            { q: m`הישר שעובר בנקודות $(3, 5)$ ו-$(7, 5)$`, options: [m`$y = 5$`, m`$x = 5$`, m`$y = 5x$`], answer: 0 },
            { q: m`הישר האנכי שעובר בנקודה $(-2, 4)$`, options: [m`$y = -2$`, m`$x = -2$`, m`$x = 4$`], answer: 1 },
            { q: m`ישר עם שיפוע $0$ שעובר בנקודה $(6, -3)$`, options: [m`$x = 6$`, m`$y = 6$`, m`$y = -3$`], answer: 2 },
          ],
        },
        {
          title: 'מצאו את משוואת הישר המקביל.',
          cols: 1,
          items: [parallel([3, -2], [0, 5]), parallel([-2, 1], [1, 4]), parallel([0.5, 3], [2, 0])],
        },
        {
          title: 'מצאו את נקודת החיתוך של שני הישרים.',
          cols: 1,
          items: [meetItem([2, 1], [-1, 7]), meetItem([1, -3], [-2, 6]), meetItem([3, 0], [1, 4]), meetItem([-1, 2], [1, -4])],
        },
        {
          title: 'מצאו את נקודת החיתוך לפי הגרף.',
          cols: 2,
          items: [meetGraph([1, 1], [-1, 5]), meetGraph([2, -3], [0, 1])],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'מצאו את השיפוע.', cols: 1, items: [slopeItem([-1, 7], [2, -2])] },
      { title: 'מצאו את משוואת הישר.', cols: 1, items: [fromSlope(4, [1, 1]), fromTwo([0, -2], [3, 4])] },
      { title: 'מצאו את משוואת הישר המקביל.', cols: 1, items: [parallel([-1, 6], [2, 3])] },
      { title: 'מצאו את נקודת החיתוך.', cols: 1, items: [meetItem([2, -1], [-1, 5])] },
      {
        title: 'בחרו.',
        cols: 1,
        items: [{ q: m`הישר שעובר בנקודות $(4, 1)$ ו-$(4, -3)$`, options: [m`$y = 4$`, m`$x = 4$`, m`$y = x$`], answer: 1 }],
      },
    ],
  },
};
