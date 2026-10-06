import { m, lin, gcd } from '../helpers.js';

/** k(px + q): הגורם המשותף k נתון, משלימים את מה שבסוגריים. */
function inside(p, q, k) {
  return { q: m`$${lin(k * p, k * q)} = ${k}($ [[${p}]] $x +$ [[${q}]] $)$` };
}

/** מוצאים לבד את הגורם המשותף המקסימלי. */
function findGcf(p, q, k) {
  if (gcd(Math.abs(p), Math.abs(q)) !== 1) throw new Error('inner part must be reduced');
  return { q: m`$${lin(k * p, k * q)} =$ [[${k}]] $(${lin(p, 0)} +$ [[${q}]] $)$` };
}

/** שני משתנים: k(pa + qb). */
function twoVars(p, q, k) {
  const term = (c, v) => `${Math.abs(c) === 1 ? (c < 0 ? '-' : '') : c}${v}`;
  const lhs = `${term(k * p, 'a')} ${k * q < 0 ? '-' : '+'} ${term(Math.abs(k * q), 'b')}`;
  return { q: m`$${lhs} =$ [[${k}]] $(${term(p, 'a')} +$ [[${q}]] $b)$` };
}

const full = (q, options, answer) => ({ q, options, answer });

export default {
  id: 'g8-factoring',
  grade: 8,
  emoji: '🧱',
  title: 'פירוק לגורמים',
  reminder: [
    {
      title: 'הוצאת גורם משותף',
      md: m`$ab + ac = a(b + c)$

מחפשים את המספר (והמשתנה) הגדול ביותר שמחלק **את כל האיברים**: $\;6x + 9 = 3(2x + 3)$`,
    },
    {
      title: 'גם משתנה יכול להיות גורם',
      md: m`$5x^2 + 10x = 5x(x + 2)$ — הגורם המשותף הוא $5x$.`,
    },
    {
      title: 'בודקים בפתיחת סוגריים',
      md: m`$3(2x + 3) = 6x + 9$ ✓ — חזרנו לביטוי המקורי.

פירוק **מלא**: בתוך הסוגריים לא נשאר גורם משותף. $\;6x + 12 = 2(3x + 6)$ — לא מלא! המלא: $6(x + 2)$.`,
    },
  ],
  pages: [
    {
      title: 'השלמת הסוגריים',
      exercises: [
        {
          title: 'הגורם המשותף נתון. השלימו את מה שבתוך הסוגריים.',
          cols: 2,
          items: [inside(2, 3, 3), inside(1, 4, 5), inside(3, -1, 4), inside(1, -2, 6), inside(5, 2, 2), inside(2, -5, 3)],
        },
        {
          title: 'הוציאו גורם משותף מקסימלי.',
          cols: 2,
          items: [findGcf(3, 2, 4), findGcf(1, 3, 7), findGcf(2, -3, 5), findGcf(4, 1, 6), findGcf(5, -2, 3), findGcf(3, 4, 8)],
        },
        {
          title: 'שני משתנים.',
          cols: 2,
          items: [twoVars(2, -3, 6), twoVars(1, 2, 5), twoVars(3, 4, 2), twoVars(1, -1, 9)],
        },
      ],
    },
    {
      title: 'גורם עם משתנה, ופירוק מלא',
      exercises: [
        {
          title: 'הוציאו גורם משותף שכולל את $x$.',
          cols: 1,
          items: [
            { q: m`$x^2 + 7x = x(x +$ [[7]] $)$` },
            { q: m`$5x^2 + 10x =$ [[5]] $x(x +$ [[2]] $)$` },
            { q: m`$6x^2 - 9x =$ [[3]] $x($ [[2]] $x -$ [[3]] $)$` },
            { q: m`$8x^2 + 4x =$ [[4]] $x($ [[2]] $x + 1)$` },
          ],
        },
        {
          title: 'איזה פירוק הוא מלא ונכון?',
          cols: 1,
          items: [
            full(m`$6x + 12$`, [m`$2(3x + 6)$`, m`$6(x + 2)$`, m`$3(2x + 3)$`], 1),
            full(m`$4x^2 - 8x$`, [m`$4(x^2 - 2x)$`, m`$4x(x - 2)$`, m`$2x(2x - 4)$`], 1),
            full(m`$10a + 15b$`, [m`$5(2a + 3b)$`, m`$5(2a + 15b)$`, m`$10(a + 15b)$`], 0),
          ],
        },
        {
          title: 'פרקו ופתרו (מכפלה שווה לאפס).',
          cols: 1,
          items: [
            { q: m`$x^2 - 4x = 0$ — הפתרונות: $x = 0$ ו-$x =$ [[4]]` },
            { q: m`$3x^2 + 15x = 0$ — הפתרונות: $x = 0$ ו-$x =$ [[-5]]` },
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'השלימו.', cols: 2, items: [inside(3, -2, 5), findGcf(2, 5, 9)] },
      { title: 'שני משתנים.', cols: 1, items: [twoVars(3, -2, 4)] },
      { title: 'הוציאו גורם משותף שכולל את $x$.', cols: 1, items: [{ q: m`$7x^2 - 14x =$ [[7]] $x(x -$ [[2]] $)$` }] },
      { title: 'איזה פירוק הוא מלא ונכון?', cols: 1, items: [full(m`$9x + 18$`, [m`$3(3x + 6)$`, m`$9(x + 2)$`, m`$9(x + 18)$`], 1)] },
    ],
  },
};
