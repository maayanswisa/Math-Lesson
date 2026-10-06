import { m } from '../helpers.js';
import { poly, tf } from './shared.js';

/** (ax + b)² או (ax + b)(ax - b) → מקדמים. */
const square = (a, b) => ({
  q: m`$(${poly([a, b])})^2 =$`,
  a: m`[[${a * a}]] $x^2 +$ [[${2 * a * b}]] $x +$ [[${b * b}]]`,
});
const diffSq = (a, b) => ({ q: m`$(${poly([a, b])})(${poly([a, -b])}) =$`, a: m`[[${a * a}]] $x^2 +$ [[0]] $x +$ [[${-b * b}]]` });

/** טרינום x² + (p+q)x + pq = (x + p)(x + q), p ≥ q. */
function trinomial(p, q) {
  const [P, Q] = p >= q ? [p, q] : [q, p];
  return { q: m`$${poly([1, P + Q, P * Q])} = (x +$ [[${P}]] $)(x +$ [[${Q}]] $)$ $\quad (p \ge q)$` };
}

/** a² - b² = (a + b)(a - b). */
const diffFactor = (k) => ({ q: m`$x^2 - ${k * k} = (x +$ [[${k}]] $)(x -$ [[${k}]] $)$` });
const perfect = (k) => ({ q: m`$${poly([1, 2 * k, k * k])} = (x +$ [[${k}]] $)^2$` });

/** צמצום (x² - k²)/(x + k) = x - k וכו'. */
const reduceFrac = (num, den, ans) => ({ q: m`$\frac{${num}}{${den}} = x +$ [[${ans}]]` });

export default {
  id: 'g9r-factor-expand',
  grade: 9,
  emoji: '🧮',
  title: 'נוסחאות הכפל המקוצר ופירוק',
  reminder: [
    {
      title: 'נוסחאות הכפל המקוצר',
      md: m`$(a + b)^2 = a^2 + 2ab + b^2$
$(a - b)^2 = a^2 - 2ab + b^2$
$(a + b)(a - b) = a^2 - b^2$`,
    },
    {
      title: 'פירוק טרינום',
      md: m`$x^2 + bx + c = (x + p)(x + q)$, כש-$p + q = b$ ו-$p \cdot q = c$.

$x^2 + 5x + 6$: $\;3 + 2 = 5$, $3 \cdot 2 = 6$ ← $(x + 3)(x + 2)$`,
    },
    {
      title: 'צמצום שבר אלגברי',
      wide: true,
      md: m`מפרקים מונה ומכנה, ומצמצמים גורם משותף: $\;\frac{x^2 - 9}{x + 3} = \frac{(x + 3)(x - 3)}{x + 3} = x - 3$ (כש-$x \ne -3$)

פירוק לפי קבוצות: $\;ax + ay + bx + by = a(x + y) + b(x + y) = (x + y)(a + b)$`,
    },
  ],
  pages: [
    {
      title: 'פתיחת סוגריים בנוסחאות',
      exercises: [
        { title: 'פתחו לפי נוסחאות הכפל המקוצר (מקדם שלילי — עם מינוס).', cols: 1, items: [square(1, 3), square(1, -5), square(2, 1), square(3, -2), square(1, 0.5)] },
        { title: 'הפרש ריבועים.', cols: 1, items: [diffSq(1, 4), diffSq(2, 3), diffSq(5, 1)] },
        {
          title: 'חשבו בעזרת הנוסחאות (בלי מחשבון).',
          cols: 2,
          items: [
            { q: m`$101^2 = (100 + 1)^2 =$ [[${101 ** 2}]]` },
            { q: m`$49 \cdot 51 = (50 - 1)(50 + 1) =$ [[${49 * 51}]]` },
            { q: m`$99^2 =$ [[${99 ** 2}]]` },
            { q: m`$102 \cdot 98 =$ [[${102 * 98}]]` },
          ],
        },
      ],
    },
    {
      title: 'פירוק לגורמים וצמצום',
      exercises: [
        {
          title: m`פרקו טרינום (מספר שלילי — עם מינוס; המספר הגדול ראשון).`,
          cols: 1,
          items: [trinomial(3, 2), trinomial(5, -2), trinomial(-4, -3), trinomial(6, -1), trinomial(-7, 2)],
        },
        { title: 'הפרש ריבועים וריבוע שלם.', cols: 2, items: [diffFactor(5), diffFactor(9), perfect(3), perfect(-4)] },
        {
          title: 'צמצמו.',
          cols: 1,
          items: [
            reduceFrac('x^2 - 9', 'x + 3', -3),
            reduceFrac('x^2 + 5x + 6', 'x + 2', 3),
            reduceFrac('x^2 - 4x + 4', 'x - 2', -2),
            reduceFrac('x^2 - x - 12', 'x - 4', 3),
          ],
        },
        {
          title: 'פירוק לפי קבוצות.',
          cols: 1,
          items: [
            { q: m`$xy + 3x + 2y + 6 = (x +$ [[2]] $)(y +$ [[3]] $)$` },
            { q: m`$ab - 5a + 4b - 20 = (a +$ [[4]] $)(b -$ [[5]] $)$` },
          ],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [tf(m`$(a + b)^2 = a^2 + b^2$`, false), tf(m`$x^2 + 9$ אפשר לפרק ל-$(x + 3)(x - 3)$`, false), tf(m`$(x - 5)^2 = (5 - x)^2$`, true)],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'פתחו.', cols: 1, items: [square(1, -6), diffSq(3, 2)] },
      { title: 'פרקו.', cols: 1, items: [trinomial(4, -3), diffFactor(7), perfect(5)] },
      { title: 'צמצמו.', cols: 1, items: [reduceFrac('x^2 - 16', 'x - 4', 4)] },
      { title: 'חשבו בלי מחשבון.', cols: 1, items: [{ q: m`$31 \cdot 29 =$ [[${31 * 29}]]` }] },
    ],
  },
};
