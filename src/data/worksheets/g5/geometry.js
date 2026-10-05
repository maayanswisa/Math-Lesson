import { m, num, boxFig } from '../helpers.js';

const rect = (l, w) => ({
  q: m`מלבן $${l} \times ${w}$ ס״מ`,
  a: m`שטח: [[${l * w}]] סמ״ר · היקף: [[${2 * (l + w)}]] ס״מ`,
});

const volume = (l, w, h) => l * w * h;
const surface = (l, w, h) => 2 * (l * w + l * h + w * h);

const boxVolumeFig = (l, w, h) => ({ q: '', figure: boxFig({ l, w, h }), a: m`נפח: [[${volume(l, w, h)}]] סמ״ק` });
const boxVolume = (l, w, h) => ({ q: m`תיבה $${l} \times ${w} \times ${h}$ ס״מ. הנפח: [[${volume(l, w, h)}]] סמ״ק` });
const boxSurface = (l, w, h) => ({ q: m`תיבה $${l} \times ${w} \times ${h}$ ס״מ. שטח הפנים: [[${surface(l, w, h)}]] סמ״ר` });
const cube = (a) => ({ q: m`קובייה שאורך מקצוע שלה $${a}$ ס״מ`, a: m`נפח: [[${a ** 3}]] סמ״ק · שטח פנים: [[${6 * a * a}]] סמ״ר` });

function missingHeight(V, l, w) {
  const h = V / (l * w);
  if (!Number.isInteger(h)) throw new Error('not whole');
  return { q: m`נפח התיבה $${V}$ סמ״ק, האורך $${l}$ ס״מ והרוחב $${w}$ ס״מ. הגובה: [[${h}]] ס״מ` };
}

/** איזה מלבן גדול יותר בשטח — עם השוואה מחושבת. */
function biggerArea(q, [a1, b1], [a2, b2]) {
  const s1 = a1 * b1;
  const s2 = a2 * b2;
  return { q, options: ['הראשון', 'השני', 'השטחים שווים'], answer: s1 === s2 ? 2 : s1 > s2 ? 0 : 1 };
}

export default {
  id: 'g5-geometry',
  grade: 5,
  emoji: '📦',
  title: 'שטח, היקף ונפח',
  reminder: [
    {
      title: 'מלבן וריבוע',
      md: m`**שטח** מלבן = אורך $\times$ רוחב (סמ״ר)
**היקף** מלבן = פעמיים (אורך + רוחב) (ס״מ)

ריבוע שצלעו $5$: שטח $25$ סמ״ר, היקף $20$ ס״מ.`,
    },
    {
      title: 'נפח תיבה',
      md: m`<div class="diagram-box">${boxFig({ l: 'אורך', w: 'רוחב', h: 'גובה' })}</div>

**נפח** = אורך $\times$ רוחב $\times$ גובה (סמ״ק) — כמה קוביות של $1$ ס״מ נכנסות בתיבה.`,
    },
    {
      title: 'שטח פנים של תיבה',
      wide: true,
      md: m`סכום השטחים של **שש הפאות** — שלושה זוגות של פאות זהות:

$5 \times 3 \times 2$: $\;2 \times (5 \times 3 + 5 \times 2 + 3 \times 2) = 2 \times 31 = 62$ סמ״ר`,
    },
  ],
  pages: [
    {
      title: 'מלבן וריבוע — שטח והיקף',
      exercises: [
        { title: 'חשבו שטח והיקף.', cols: 1, items: [rect(8, 5), rect(12, 3), rect(7, 7), rect(9, 6), rect(15, 2)] },
        {
          title: 'מצאו את הצלע החסרה.',
          cols: 1,
          items: [
            { q: m`שטח המלבן $48$ סמ״ר והאורך $8$ ס״מ. הרוחב: [[${48 / 8}]] ס״מ` },
            { q: m`היקף המלבן $30$ ס״מ והאורך $9$ ס״מ. הרוחב: [[${30 / 2 - 9}]] ס״מ` },
            { q: m`שטח הריבוע $49$ סמ״ר. אורך הצלע: [[7]] ס״מ` },
            { q: m`היקף הריבוע $36$ ס״מ. אורך הצלע: [[${36 / 4}]] ס״מ` },
          ],
        },
        {
          title: 'למי שטח גדול יותר?',
          cols: 1,
          items: [
            biggerArea(m`מלבן ראשון $9 \times 1$, מלבן שני $5 \times 5$ (לשניהם היקף $20$).`, [9, 1], [5, 5]),
            biggerArea(m`מלבן ראשון $12 \times 2$, מלבן שני $6 \times 4$.`, [12, 2], [6, 4]),
            biggerArea(m`מלבן ראשון $10 \times 3$, מלבן שני $8 \times 4$.`, [10, 3], [8, 4]),
          ],
        },
      ],
    },
    {
      title: 'נפח ושטח פנים של תיבה',
      exercises: [
        { title: 'חשבו את נפח התיבה (המידות בס״מ).', cols: 3, items: [boxVolumeFig(5, 3, 2), boxVolumeFig(4, 4, 4), boxVolumeFig(6, 2, 3)] },
        { title: 'חשבו את הנפח.', cols: 1, items: [boxVolume(10, 5, 2), boxVolume(8, 3, 4), boxVolume(12, 10, 5)] },
        { title: 'חשבו את שטח הפנים.', cols: 1, items: [boxSurface(5, 3, 2), boxSurface(6, 4, 1), boxSurface(10, 2, 3)] },
        { title: 'קובייה: חשבו נפח ושטח פנים.', cols: 1, items: [cube(3), cube(10)] },
        { title: 'מצאו את הגובה.', cols: 1, items: [missingHeight(60, 5, 3), missingHeight(72, 6, 4)] },
        {
          title: 'שאלות מילוליות.',
          cols: 1,
          items: [
            { q: m`אקווריום בצורת תיבה: $50$ ס״מ אורך, $30$ ס״מ רוחב ו-$40$ ס״מ גובה. מה נפחו?`, a: m`[[${volume(50, 30, 40)}]] סמ״ק` },
            { q: m`כמה קוביות של $1$ ס״מ נכנסות בתיבה $4 \times 3 \times 2$ ס״מ?`, a: m`[[${volume(4, 3, 2)}]] קוביות` },
            {
              q: m`עוטפים בנייר קופסה בצורת קובייה שמקצועה $${num(20)}$ ס״מ. כמה סמ״ר נייר צריך לפחות?`,
              a: m`[[${6 * 20 * 20}]] סמ״ר`,
            },
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'חשבו שטח והיקף.', cols: 1, items: [rect(11, 4)] },
      { title: 'מצאו את הצלע.', cols: 1, items: [{ q: m`היקף הריבוע $28$ ס״מ. אורך הצלע: [[${28 / 4}]] ס״מ` }] },
      { title: 'חשבו את נפח התיבה (המידות בס״מ).', cols: 1, items: [boxVolumeFig(7, 2, 5)] },
      { title: 'חשבו את שטח הפנים.', cols: 1, items: [boxSurface(4, 3, 2)] },
      { title: 'קובייה: חשבו נפח ושטח פנים.', cols: 1, items: [cube(6)] },
      { title: 'מצאו את הגובה.', cols: 1, items: [missingHeight(90, 6, 5)] },
    ],
  },
};
