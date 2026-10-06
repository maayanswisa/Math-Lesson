import { m, round } from '../helpers.js';
import { exact, tf } from './shared.js';

/** (x - a)² עם סימן נקי: a = -3 → (x + 3)². */
const sq = (v, a) => (a === 0 ? `${v}^2` : `(${v} ${a < 0 ? '+' : '-'} ${Math.abs(a)})^2`);

/** משוואה קנונית → מרכז ורדיוס. */
const canonical = (a, b, R) => ({
  q: m`$${sq('x', a)} + ${sq('y', b)} = ${R * R}$`,
  a: m`מרכז: $($ [[${a}]] $,\,$ [[${b}]] $) \qquad R =$ [[${R}]]`,
});

/** צורה כללית x² + y² + Dx + Ey + F = 0 (משלימים לריבוע). */
function general(a, b, R) {
  const D = -2 * a;
  const E = -2 * b;
  const F = a * a + b * b - R * R;
  const term = (c, v) => (c === 0 ? '' : ` ${c < 0 ? '-' : '+'} ${Math.abs(c) === 1 ? '' : Math.abs(c)}${v}`);
  const tex = `x^2 + y^2${term(D, 'x')}${term(E, 'y')}${F === 0 ? '' : ` ${F < 0 ? '-' : '+'} ${Math.abs(F)}`} = 0`;
  return { q: m`$${tex}$`, a: m`מרכז: $($ [[${a}]] $,\,$ [[${b}]] $) \qquad R =$ [[${R}]]` };
}

/** כתיבת משוואה ממרכז ורדיוס. */
const write = (a, b, R) => ({
  q: m`מרכז $(${a}, ${b})$, רדיוס $${R}$`,
  a: m`$(x -$ [[${a}]] $)^2 + (y -$ [[${b}]] $)^2 =$ [[${R * R}]]`,
});

/** האם הנקודה על המעגל / בתוכו / מחוצה לו. */
function where([x, y], a, b, R) {
  const d2 = (x - a) ** 2 + (y - b) ** 2;
  return {
    q: m`הנקודה $(${x}, ${y})$ והמעגל $${sq('x', a)} + ${sq('y', b)} = ${R * R}$`,
    options: ['על המעגל', 'בתוך המעגל', 'מחוץ למעגל'],
    answer: d2 === R * R ? 0 : d2 < R * R ? 1 : 2,
  };
}

/** ישר אופקי y = k מול המעגל x² + y² = R². */
const horizontal = (k, R) => ({
  q: m`הישר $y = ${k}$ והמעגל $x^2 + y^2 = ${R * R}$`,
  options: ['חותך בשתי נקודות', 'משיק', 'לא נפגשים'],
  answer: Math.abs(k) < R ? 0 : Math.abs(k) === R ? 1 : 2,
});

/** משיק למעגל x² + y² = R² בנקודה (x0, y0) שעליו: מאונך לרדיוס. */
function tangentAt(x0, y0) {
  const k = -x0 / y0;
  return {
    q: m`משיק למעגל $x^2 + y^2 = ${x0 * x0 + y0 * y0}$ בנקודה $(${x0}, ${y0})$`,
    a: m`$y =$ ${exact(k)} $x +$ ${exact(round(y0 - k * x0, 6))}`,
  };
}

export default {
  id: 'g11-u4-analytic-circle',
  grade: 11,
  emoji: '🧭',
  title: 'גאומטריה אנליטית של המעגל',
  reminder: [
    {
      title: 'משוואת המעגל',
      md: m`מרכז $(a, b)$ ורדיוס $R$: $\quad (x - a)^2 + (y - b)^2 = R^2$

$(x - 2)^2 + (y + 3)^2 = 25$ ← מרכז $(2, -3)$, רדיוס $5$. **שימו לב לסימן!**`,
    },
    {
      title: 'מהצורה הכללית',
      md: m`משלימים לריבוע: $\;x^2 - 6x + y^2 + 4y = 12$
$(x - 3)^2 - 9 + (y + 2)^2 - 4 = 12 \Rightarrow (x - 3)^2 + (y + 2)^2 = 25$`,
    },
    {
      title: 'ישר ומעגל',
      wide: true,
      md: m`$d$ — מרחק הישר מהמרכז: $\;d < R$ חותך ב-$2$ נקודות · $d = R$ **משיק** · $d > R$ לא נפגשים.

**משיק** בנקודה שעל המעגל — מאונך לרדיוס אליה: מכפלת השיפועים $= -1$. מעגל שמשיק לציר $x$: $R = |b|$.`,
    },
  ],
  pages: [
    {
      title: 'משוואת המעגל',
      exercises: [
        { title: 'מצאו את המרכז ואת הרדיוס.', cols: 1, items: [canonical(2, -3, 5), canonical(-1, 4, 3), canonical(0, 0, 6), canonical(5, 0, 2)] },
        { title: 'השלימו לריבוע ומצאו מרכז ורדיוס.', cols: 1, items: [general(3, -2, 5), general(-4, 0, 5), general(1, 2, 3), general(0, -5, 4)] },
        { title: 'כתבו את משוואת המעגל (מספר שלילי — עם מינוס).', cols: 1, items: [write(1, -2, 3), write(-3, 4, 6), write(0, 5, 1)] },
        {
          title: 'מעגל שמשיק לציר.',
          cols: 1,
          items: [
            { q: m`מעגל שמרכזו $(3, -4)$ משיק לציר $x$. $\quad R =$ [[4]]` },
            { q: m`מעגל שמרכזו $(-6, 2)$ משיק לציר $y$. $\quad R =$ [[6]]` },
          ],
        },
      ],
    },
    {
      title: 'נקודה, ישר ומשיק',
      exercises: [
        {
          title: 'איפה הנקודה?',
          cols: 1,
          items: [where([5, 1], 2, -3, 5), where([3, -2], 2, -3, 5), where([8, 0], 2, -3, 5), where([-1, 4], 0, 0, 5)],
        },
        { title: 'מה המצב ההדדי?', cols: 1, items: [horizontal(3, 5), horizontal(5, 5), horizontal(-6, 5), horizontal(0, 4)] },
        {
          title: 'נקודות החיתוך.',
          cols: 1,
          items: [
            { q: m`הישר $y = 3$ והמעגל $x^2 + y^2 = 25$`, a: m`$x_1 =$ [[4]] $\qquad x_2 =$ [[-4]] $\qquad (x_1 > x_2)$` },
            { q: m`הישר $y = x + 1$ והמעגל $x^2 + y^2 = 25$`, a: m`$(3,$ [[4]] $) \qquad ($ [[-4]] $,\,-3)$` },
          ],
        },
        { title: m`משוואת המשיק $y = mx + b$.`, cols: 1, items: [tangentAt(3, 4), tangentAt(-4, 3), tangentAt(6, 8)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'מרכז ורדיוס.', cols: 1, items: [canonical(-2, 5, 7), general(2, -1, 4)] },
      { title: 'כתבו את משוואת המעגל.', cols: 1, items: [write(4, -1, 5)] },
      { title: 'איפה הנקודה?', cols: 1, items: [where([1, 1], 4, 5, 5)] },
      { title: 'מה המצב ההדדי?', cols: 1, items: [horizontal(7, 7)] },
      { title: 'משוואת המשיק.', cols: 1, items: [tangentAt(5, 12)] },
      { title: 'נכון או לא נכון?', cols: 1, items: [tf(m`המעגל $(x - 3)^2 + (y - 3)^2 = 9$ משיק לשני הצירים.`, true)] },
    ],
  },
};


/** מחוללי פריטים — לשימוש חוזר בדפי התרגול המסכם. */
export { canonical, general, write, where, horizontal, tangentAt };
