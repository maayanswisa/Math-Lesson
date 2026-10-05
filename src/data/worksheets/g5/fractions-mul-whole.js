import { m, fr, mixed, cmp, valueBlank } from '../helpers.js';

/** k × n/d */
const mulFrac = (k, n, d) => ({ q: m`$${k} \times ${fr(n, d)} =$ ${valueBlank(k * n, d)}` });

/** k × w n/d */
const mulMixed = (k, w, n, d) => ({ q: m`$${k} \times ${mixed(w, n, d)} =$ ${valueBlank(k * (w * d + n), d)}` });

/** חיבור חוזר → כפל: n/d + n/d + ... = [k] × n/d = [?] */
const repeated = (k, n, d) => ({
  q: m`$${Array(k).fill(fr(n, d)).join(' + ')} =$ [[${k}]] $\times ${fr(n, d)} =$ ${valueBlank(k * n, d)}`,
});

/** השוואת מכפלה למספר. */
const compareProduct = (k, [w, n, d], target) => ({
  q: m`$${k} \times ${w ? mixed(w, n, d) : fr(n, d)}$ [[c:${cmp((k * (w * d + n)) / d, target)}]] $${target}$`,
});

export default {
  id: 'g5-fractions-mul-whole',
  grade: 5,
  emoji: '🍰',
  title: 'כפל שלם בשבר ובמספר מעורב',
  reminder: [
    {
      title: 'כפל = חיבור חוזר',
      md: m`$3 \times ${fr(2, 5)} = ${fr(2, 5)} + ${fr(2, 5)} + ${fr(2, 5)} = ${fr(6, 5)} = ${mixed(1, 1, 5)}$`,
    },
    {
      title: 'הכלל',
      md: m`כופלים את **המונה** בשלם — **המכנה נשאר**:

$4 \times ${fr(3, 8)} = ${fr('4 \\times 3', 8)} = ${fr(12, 8)} = ${mixed(1, 1, 2)}$`,
    },
    {
      title: 'שלם כפול מספר מעורב',
      md: m`כופלים את השלמים ואת השבר **בנפרד** ומחברים:

$3 \times ${mixed(2, 1, 4)} = 3 \times 2 + 3 \times ${fr(1, 4)} = 6 + ${fr(3, 4)} = ${mixed(6, 3, 4)}$`,
    },
    {
      title: 'קשר לחלק מכמות',
      md: m`$12 \times ${fr(3, 4)}$ זה כמו $${fr(3, 4)}$ מ-$12$: $12 : 4 = 3$, ו-$3 \times 3 = 9$.`,
    },
  ],
  pages: [
    {
      title: 'כפל שלם בשבר',
      exercises: [
        {
          title: 'מחיבור חוזר לכפל. השלימו.',
          cols: 1,
          items: [repeated(3, 2, 7), repeated(4, 1, 5), repeated(5, 2, 9), repeated(2, 3, 8)],
        },
        {
          title: 'חשבו (תוצאה גדולה מ-$1$ — כמספר מעורב או שלם).',
          cols: 2,
          items: [mulFrac(3, 1, 4), mulFrac(2, 2, 5), mulFrac(4, 3, 8), mulFrac(5, 2, 3), mulFrac(6, 3, 4), mulFrac(7, 1, 7), mulFrac(3, 5, 6), mulFrac(10, 3, 10)],
        },
        {
          title: 'חשבו — התוצאה מספר שלם.',
          cols: 2,
          items: [mulFrac(12, 3, 4), mulFrac(30, 2, 5), mulFrac(18, 5, 6), mulFrac(21, 2, 3)],
        },
        {
          title: 'שאלות מילוליות.',
          cols: 1,
          items: [
            { q: m`כל ילד מקבל $${fr(3, 4)}$ כוס מיץ. כמה כוסות מיץ צריך ל-$6$ ילדים?`, a: m`${valueBlank(18, 4)} כוסות` },
            { q: m`במתכון לעוגה אחת יש $${fr(2, 3)}$ כוס קמח. כמה כוסות קמח צריך ל-$9$ עוגות?`, a: m`${valueBlank(18, 3)} כוסות` },
          ],
        },
      ],
    },
    {
      title: 'כפל שלם במספר מעורב',
      exercises: [
        {
          title: 'חשבו.',
          cols: 2,
          items: [mulMixed(2, 1, 1, 4), mulMixed(3, 2, 1, 3), mulMixed(4, 1, 2, 5), mulMixed(2, 3, 3, 4), mulMixed(5, 1, 1, 2), mulMixed(3, 4, 2, 7)],
        },
        {
          title: 'השלימו את המספר החסר.',
          cols: 2,
          items: [
            { q: m`[[4]] $\times ${fr(3, 5)} = ${fr(12, 5)}$` },
            { q: m`$3 \times$ [[fx:2/{7}]] $= ${fr(6, 7)}$` },
            { q: m`[[6]] $\times ${fr(1, 2)} = 3$` },
            { q: m`$5 \times$ [[fx:3/{8}]] $= ${fr(15, 8)}$` },
          ],
        },
        {
          title: 'בלי לחשב עד הסוף — בחרו $<$, $=$ או $>$.',
          cols: 3,
          items: [
            compareProduct(4, [0, 2, 3], 2),
            compareProduct(5, [0, 1, 5], 1),
            compareProduct(3, [0, 3, 10], 1),
            compareProduct(6, [0, 1, 2], 3),
            compareProduct(2, [1, 3, 4], 4),
            compareProduct(7, [0, 2, 7], 2),
          ],
        },
        {
          title: 'שאלות מילוליות.',
          cols: 1,
          items: [
            { q: m`דני רץ כל יום $${mixed(2, 1, 2)}$ ק״מ. כמה ק״מ ירוץ ב-$4$ ימים?`, a: m`${valueBlank(4 * 5, 2)} ק״מ` },
            { q: m`בבקבוק יש $${mixed(1, 1, 4)}$ ליטר. כמה ליטרים יש ב-$6$ בקבוקים?`, a: m`${valueBlank(6 * 5, 4)} ליטר` },
            { q: m`שיעור נמשך $${fr(3, 4)}$ שעה. כמה שעות נמשכים $5$ שיעורים?`, a: m`${valueBlank(15, 4)} שעות` },
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'חשבו.', cols: 2, items: [mulFrac(3, 2, 7), mulFrac(4, 5, 6), mulFrac(8, 3, 4), mulFrac(6, 2, 3)] },
      { title: 'חשבו.', cols: 2, items: [mulMixed(3, 1, 1, 5), mulMixed(2, 4, 2, 3)] },
      { title: 'השלימו את המספר החסר.', cols: 1, items: [{ q: m`[[5]] $\times ${fr(2, 9)} = ${fr(10, 9)}$` }] },
      { title: 'בחרו $<$, $=$ או $>$.', cols: 1, items: [compareProduct(3, [0, 2, 5], 1)] },
      {
        title: 'שאלות מילוליות.',
        cols: 1,
        items: [
          { q: m`כל אחד מ-$8$ ילדים מקבל $${fr(1, 4)}$ פיצה. כמה פיצות צריך?`, a: m`${valueBlank(8, 4)} פיצות` },
          { q: m`ציפור עפה $${mixed(1, 2, 3)}$ ק״מ בדקה. כמה ק״מ תעוף ב-$3$ דקות?`, a: m`${valueBlank(3 * 5, 3)} ק״מ` },
        ],
      },
    ],
  },
};
