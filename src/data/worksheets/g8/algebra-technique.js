import { m, lin, gcd } from '../helpers.js';

/** (ax + b)(cx + d) = ac·x² + (ad + bc)·x + bd — שלושה מקדמים למילוי. */
const expand = ([a, b], [c, d]) => ({
  q: m`$(${lin(a, b)})(${lin(c, d)}) =$`,
  a: m`[[${a * c}]] $x^2 +$ [[${a * d + b * c}]] $x +$ [[${b * d}]]`,
});

/** ax² + bx = 0 → x = 0 או x = -b/a. */
function zeroProduct(a, b) {
  const r = -b / a;
  if (!Number.isInteger(r)) throw new Error('root not whole');
  const tex = `${a === 1 ? '' : a}x^2 ${b < 0 ? '-' : '+'} ${Math.abs(b)}x = 0`;
  return { q: m`$${tex}$ — הפתרון ששונה מ-$0$: $\;x =$ [[${r}]]` };
}

/** הוצאת גורם משותף: k·(px + q) — הגורם והאיבר החסר. */
function commonFactor(p, q, k) {
  if (gcd(Math.abs(p), Math.abs(q)) !== 1) throw new Error('inner part must be fully reduced');
  return { q: m`$${lin(k * p, k * q)} =$ [[${k}]] $(${lin(p, 0)}$ $+$ [[${q}]] $)$` };
}

export default {
  id: 'g8-algebra-technique',
  grade: 8,
  emoji: '🔧',
  title: 'טכניקה אלגברית: פילוג מורחב, פירוק וצמצום שברים',
  reminder: [
    {
      title: 'חוק הפילוג המורחב',
      md: m`כל איבר בסוגריים הראשונים כופלים בכל איבר בשניים:

$(x + 2)(x + 3) = x^2 + 3x + 2x + 6 = x^2 + 5x + 6$`,
    },
    {
      title: 'שימו לב לסימנים',
      md: m`$(x - 4)(x + 1) = x^2 + x - 4x - 4 = x^2 - 3x - 4$

במשבצות כותבים את המקדם **עם הסימן**: $-3$ ו-$-4$.`,
    },
    {
      title: 'מכפלה שווה לאפס',
      md: m`$x^2 - 5x = 0 \;\Rightarrow\; x(x - 5) = 0 \;\Rightarrow\; x = 0$ או $x = 5$`,
    },
    {
      title: 'צמצום שבר אלגברי',
      md: m`מפרקים לגורמים ומצמצמים גורם משותף:

$\frac{2x + 4}{x + 2} = \frac{2(x + 2)}{x + 2} = 2$ (כש-$x \ne -2$)`,
    },
  ],
  pages: [
    {
      title: 'פילוג מורחב',
      exercises: [
        {
          title: 'פתחו סוגריים וכנסו איברים דומים.',
          cols: 1,
          items: [
            expand([1, 2], [1, 3]),
            expand([1, -4], [1, 1]),
            expand([2, 1], [1, 3]),
            expand([1, 5], [1, -5]),
            expand([3, -2], [2, 1]),
            expand([1, -3], [1, -3]),
          ],
        },
        {
          title: 'השלימו.',
          cols: 1,
          items: [
            { q: m`$(x + 4)^2 = x^2 +$ [[8]] $x +$ [[16]]` },
            { q: m`$(x - 1)(x + 6) = x^2 +$ [[5]] $x +$ [[-6]]` },
            { q: m`$2(x + 3)(x - 1) =$ [[2]] $x^2 +$ [[4]] $x +$ [[-6]]` },
          ],
        },
      ],
    },
    {
      title: 'גורם משותף, משוואות וצמצום',
      exercises: [
        { title: 'הוציאו גורם משותף מקסימלי.', cols: 2, items: [commonFactor(2, 3, 3), commonFactor(1, 2, 5), commonFactor(3, -4, 2), commonFactor(2, -1, 7)] },
        {
          title: 'הוציאו גורם משותף שכולל את $x$.',
          cols: 1,
          items: [
            { q: m`$x^2 + 5x = x($ $x +$ [[5]] $)$` },
            { q: m`$3x^2 - 6x =$ [[3]] $x(x -$ [[2]] $)$` },
            { q: m`$4x^2 + 10x =$ [[2]] $x($ [[2]] $x + 5)$` },
          ],
        },
        { title: 'פתרו.', cols: 1, items: [zeroProduct(1, -5), zeroProduct(1, 7), zeroProduct(2, -8), zeroProduct(3, 12)] },
        {
          title: 'צמצמו.',
          cols: 2,
          items: [
            { q: m`$\frac{2x + 4}{x + 2} =$ [[2]]` },
            { q: m`$\frac{3x - 6}{x - 2} =$ [[3]]` },
            { q: m`$\frac{x^2 + 3x}{x} = x +$ [[3]]` },
            { q: m`$\frac{5x + 10}{5} = x +$ [[2]]` },
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'פתחו סוגריים.', cols: 1, items: [expand([1, 6], [1, -2]), expand([2, -3], [1, 4])] },
      { title: 'הוציאו גורם משותף מקסימלי.', cols: 1, items: [commonFactor(3, 5, 4)] },
      { title: 'פתרו.', cols: 1, items: [zeroProduct(1, -9)] },
      { title: 'צמצמו.', cols: 1, items: [{ q: m`$\frac{4x + 12}{x + 3} =$ [[4]]` }] },
    ],
  },
};
