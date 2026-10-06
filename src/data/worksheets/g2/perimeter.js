import { m } from '../helpers.js';
import { tf, polygonFig } from './shared.js';

const sum = (a) => a.reduce((s, x) => s + x, 0);
const perim = (kind, sides) => ({ q: '', figure: polygonFig(kind, sides.map((s) => `${s}`)), a: m`היקף: [[${sum(sides)}]] ס״מ` });

const square = (a) => ({ q: m`ריבוע שצלעו $${a}$ ס״מ. ההיקף:`, a: m`[[${4 * a}]] ס״מ` });
const rect = (a, b) => ({ q: m`מלבן שצלעותיו $${a}$ ס״מ ו-$${b}$ ס״מ. ההיקף:`, a: m`[[${2 * (a + b)}]] ס״מ` });
const squareSide = (P) => {
  if (P % 4) throw new Error('perimeter must divide by 4');
  return { q: m`היקף ריבוע $${P}$ ס״מ. אורך הצלע:`, a: m`[[${P / 4}]] ס״מ` };
};

export default {
  id: 'g2-perimeter',
  grade: 2,
  emoji: '🔲',
  title: 'היקף מצולעים',
  reminder: [
    {
      title: 'מהו היקף?',
      md: m`אורך **המסגרת** של הצורה — מחברים את אורכי **כל** הצלעות: משולש עם צלעות $3, 4, 5$ ← היקף $12$ ס״מ.`,
    },
    {
      title: 'ריבוע ומלבן',
      md: m`ריבוע: $4$ צלעות שוות ← צלע $\times 4$. $\;$ מלבן: $2$ אורכים ו-$2$ רוחבים: $\;6 + 3 + 6 + 3 = 18$.`,
    },
  ],
  pages: [
    {
      title: 'מחברים צלעות',
      exercises: [
        { title: 'מה ההיקף? (האורכים בס״מ)', cols: 2, items: [perim('triangle', [3, 4, 5]), perim('rect', [6, 3, 6, 3]), perim('pentagon', [2, 3, 4, 3, 2]), perim('hexagon', [5, 5, 5, 5, 5, 5])] },
      ],
    },
    {
      title: 'ריבוע ומלבן',
      exercises: [
        { title: 'חשבו את ההיקף.', cols: 1, items: [square(5), square(10), rect(7, 2), rect(8, 4)] },
        { title: 'מצאו את הצלע.', cols: 1, items: [squareSide(20), squareSide(36)] },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf('היקף נמדד בס״מ.', true), tf(m`היקף ריבוע שצלעו $3$ ס״מ הוא $9$ ס״מ.`, 4 * 3 === 9)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'מה ההיקף?', cols: 2, items: [perim('triangle', [6, 6, 6]), perim('rect', [9, 4, 9, 4])] },
      { title: 'חשבו.', cols: 1, items: [square(7), squareSide(28)] },
    ],
  },
};
