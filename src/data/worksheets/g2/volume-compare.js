import { svgParts } from '../helpers.js';
import { tf, towersFig, cubeStackFig } from './shared.js';

/** מגדלים: באיזה יותר קוביות (נפח גדול יותר)? */
function biggestTower(heights) {
  const max = Math.max(...heights);
  if (heights.filter((h) => h === max).length !== 1) throw new Error('unique max');
  const names = 'ABCDE'.slice(0, heights.length).split('');
  return { q: '', figure: towersFig(heights), options: names, answer: heights.indexOf(max) };
}
const towerCount = (heights) => ({ q: '', figure: towersFig(heights), a: heights.map((h, i) => `${'ABCDE'[i]}: [[${h}]]`).join(' · ') });

/** שני מבנים בשרטוט אחד: A משמאל, B מימין (שרטוט אחד — כך הסדר לא תלוי בכיוון הדף). */
function pairFig(a, b) {
  const { svg, label } = svgParts;
  const A = cubeStackFig(...a, 18);
  const B = cubeStackFig(...b, 18);
  const size = (s) => s.match(/width="([\d.]+)" height="([\d.]+)"/).slice(1).map(Number);
  const [wa, ha] = size(A);
  const [wb, hb] = size(B);
  const h = Math.max(ha, hb);
  const place = (s, x, hh) => s.replace('<svg ', `<svg x="${x}" y="${h - hh}" `);
  return svg(wa + wb + 40, h + 26, place(A, 0, ha) + place(B, wa + 40, hb) + label(wa / 2, h + 20, 'A') + label(wa + 40 + wb / 2, h + 20, 'B'));
}

/** שני מבנים של קוביות: באיזה יותר? */
function compareStacks(a, b) {
  const [va, vb] = [a[0] * a[1] * a[2], b[0] * b[1] * b[2]];
  return { q: '', figure: pairFig(a, b), options: ['ב-A יותר', 'ב-B יותר', 'שווים'], answer: va > vb ? 0 : va < vb ? 1 : 2 };
}

export default {
  id: 'g2-volume-compare',
  grade: 2,
  emoji: '🥛',
  title: 'השוואת נפחים',
  reminder: [
    {
      title: 'נפח',
      md: 'נפח — **כמה מקום** תופס הגוף (או כמה אפשר למלא בו). מבנה עם יותר קוביות שוות — הנפח שלו גדול יותר.',
    },
    {
      title: 'השוואה בעזרת מתווך',
      md: 'כשאי אפשר להשוות ישירות — משתמשים ב**מתווך**: ממלאים כל כלי בכוסות מים וסופרים כמה כוסות נכנסו. כלי שנכנסו בו יותר כוסות — גדול יותר.',
    },
  ],
  pages: [
    {
      title: 'מגדלים ומבנים',
      exercises: [
        { title: 'כמה קוביות בכל מגדל?', cols: 1, items: [towerCount([3, 5, 2, 4]), towerCount([6, 1, 4])] },
        { title: 'לאיזה מגדל הנפח הגדול ביותר?', cols: 2, items: [biggestTower([4, 7, 5]), biggestTower([6, 3, 2, 5])] },
        { title: 'באיזה מבנה יותר קוביות?', cols: 1, items: [compareStacks([2, 1, 2], [3, 1, 2]), compareStacks([2, 2, 1], [4, 1, 1])] },
      ],
    },
    {
      title: 'השוואה בעזרת מתווך',
      exercises: [
        {
          title: 'ענו.',
          cols: 1,
          items: [
            { q: 'בקנקן א׳ נכנסו 6 כוסות מים, ובקנקן ב׳ — 9 כוסות. לאיזה קנקן נפח גדול יותר?', options: ['קנקן א׳', 'קנקן ב׳', 'שווים'], answer: 6 > 9 ? 0 : 1 },
            { q: 'בדלי נכנסו 12 כוסות, ובסיר — 12 כוסות. מה נכון?', options: ['לדלי נפח גדול יותר', 'לסיר נפח גדול יותר', 'הנפחים שווים'], answer: 2 },
            { q: 'בבקבוק נכנסות 4 כוסות. כמה כוסות נכנסות ב-3 בקבוקים כאלה?', a: '[[12]]' },
          ],
        },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf('כלי גבוה יותר תמיד מכיל יותר מים.', false), tf('אפשר להשוות נפחים בעזרת כוס מדידה.', true)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'כמה קוביות?', cols: 1, items: [towerCount([5, 2, 6])] },
      { title: 'לאיזה מגדל הנפח הגדול ביותר?', cols: 1, items: [biggestTower([3, 8, 6])] },
      { title: 'מתווך.', cols: 1, items: [{ q: 'בצנצנת נכנסו 5 כפות סוכר ובקערה 11 כפות. כמה כפות יותר נכנסו בקערה?', a: '[[6]]' }] },
    ],
  },
};
