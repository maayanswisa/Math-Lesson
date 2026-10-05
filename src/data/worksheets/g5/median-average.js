import { m, round } from '../helpers.js';

const sum = (d) => d.reduce((a, b) => a + b, 0);
function mean(d) {
  const x = round(sum(d) / d.length);
  if (!Number.isInteger(x)) throw new Error(`mean of ${d} is not whole`);
  return x;
}
function median(d) {
  const s = [...d].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : round((s[mid - 1] + s[mid]) / 2);
}

const list = (d) => d.join(',\\;\\;');
const meanItem = (d) => ({ q: m`$${list(d)}$ $\;\to\;$ ממוצע: [[${mean(d)}]]` });
const medianItem = (d) => ({ q: m`$${list(d)}$ $\;\to\;$ חציון: [[${median(d)}]]` });
const bothItem = (d) => ({ q: m`$${list(d)}$ $\;\to\;$ ממוצע: [[${mean(d)}]] · חציון: [[${median(d)}]]` });

/** ממוצע של n מספרים ידוע, וחסר מספר אחד. */
function missingValue(avg, known) {
  const x = avg * (known.length + 1) - sum(known);
  return {
    q: m`הממוצע של $${known.length + 1}$ מספרים הוא $${avg}$. ${known.length === 1 ? 'אחד מהם' : 'המספרים הידועים'}: $${list(known)}$. מה המספר החסר?`,
    a: `[[${x}]]`,
  };
}

const TF = ['נכון', 'לא נכון'];
const tf = (q, truth) => ({ q, options: TF, answer: truth ? 0 : 1 });

const RAIN = [2, 0, 5, 3, 0, 1, 3];
const RUN = [3, 5, 4, 6, 2];

export default {
  id: 'g5-median-average',
  grade: 5,
  emoji: '⚖️',
  title: 'ממוצע וחציון (העשרה)',
  reminder: [
    {
      title: 'ממוצע',
      md: m`1. מחברים את **כל** הערכים
2. מחלקים ב**מספר** הערכים

$80, 90, 70$: $\;(80 + 90 + 70) : 3 = 240 : 3 = 80$`,
    },
    {
      title: 'חציון',
      md: m`**ממיינים** מהקטן לגדול, ולוקחים את **האמצעי**: $\;6, 8, \mathbf{12}, 14, 19$ ← החציון $12$.

כשמספר הערכים **זוגי** — יש שני אמצעיים, והחציון הוא הממוצע שלהם: $2, \mathbf{4}, \mathbf{6}, 8$ ← $5$.`,
    },
    {
      title: 'כדאי לזכור',
      wide: true,
      md: m`הממוצע תמיד נמצא **בין** הערך הקטן ביותר לגדול ביותר — אבל הוא לא חייב להיות אחד הערכים.

אם יודעים את הממוצע ואת מספר הערכים, יודעים גם את **הסכום**: ממוצע $\times$ מספר הערכים.`,
    },
  ],
  pages: [
    {
      title: 'ממוצע',
      exercises: [
        {
          title: 'חשבו את הממוצע.',
          cols: 2,
          items: [[4, 6, 8], [10, 20, 30, 40], [7, 9, 11, 13, 15], [80, 90, 70], [3, 5, 6, 10], [12, 15, 18]].map(meanItem),
        },
        {
          title: 'מהממוצע לסכום.',
          cols: 1,
          items: [
            { q: m`הממוצע של $4$ מספרים הוא $9$. מה הסכום שלהם?`, a: `[[${4 * 9}]]` },
            { q: m`הממוצע של $5$ ציונים הוא $80$. מה סכום הציונים?`, a: `[[${5 * 80}]]` },
          ],
        },
        {
          title: 'מצאו את המספר החסר.',
          cols: 1,
          items: [missingValue(10, [8, 12]), missingValue(15, [10, 20, 12]), missingValue(6, [4, 5, 9, 6])],
        },
        {
          title: 'שאלות מילוליות.',
          cols: 1,
          items: [
            { q: m`דנה קיבלה במבחנים $85$, $90$ ו-$95$. מה הממוצע שלה?`, a: `[[${mean([85, 90, 95])}]]` },
            {
              q: m`בשבוע אחד ירדו כל יום (במ״מ) $${list(RAIN)}$ גשם. מה הממוצע היומי?`,
              a: m`[[${mean(RAIN)}]] מ״מ`,
            },
          ],
        },
      ],
    },
    {
      title: 'חציון, והשוואה לממוצע',
      exercises: [
        {
          title: 'מצאו את החציון (זכרו למיין קודם!).',
          cols: 2,
          items: [[6, 8, 12, 14, 19], [9, 3, 7, 5, 1], [20, 15, 30, 25, 10, 35, 40], [4, 4, 7, 9, 9]].map(medianItem),
        },
        {
          title: 'מספר זוגי של נתונים: החציון הוא הממוצע של שני האמצעיים.',
          cols: 2,
          items: [[2, 4, 6, 8], [10, 20, 40, 50], [3, 7, 9, 11, 15, 17]].map(medianItem),
        },
        {
          title: 'חשבו גם ממוצע וגם חציון.',
          cols: 1,
          items: [[5, 6, 7, 8, 9], [2, 3, 4, 5, 36], [10, 10, 20, 40]].map(bothItem),
        },
        {
          title: 'בחרו.',
          cols: 1,
          items: [
            {
              q: 'מוסיפים לנתונים מספר שגדול מהממוצע. מה קורה לממוצע?',
              options: ['גדל', 'קטן', 'לא משתנה'],
              answer: mean([4, 6, 8, 10]) > mean([4, 6, 8]) ? 0 : 1,
            },
            tf('הממוצע חייב להיות אחד המספרים בנתונים.', false),
            tf('לפני שמוצאים חציון, צריך למיין את הנתונים.', true),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'חשבו את הממוצע.', cols: 2, items: [[6, 8, 10], [12, 14, 16, 18, 20]].map(meanItem) },
      { title: 'מצאו את המספר החסר.', cols: 1, items: [missingValue(20, [15, 25])] },
      { title: 'מצאו את החציון.', cols: 2, items: [[11, 3, 8, 15, 6], [4, 6, 10, 12]].map(medianItem) },
      {
        title: 'שאלה מילולית.',
        cols: 1,
        items: [{ q: m`יואב רץ בחמישה ימים $${list(RUN)}$ ק״מ. מה הממוצע היומי?`, a: m`[[${mean(RUN)}]] ק״מ` }],
      },
      { title: 'נכון או לא נכון?', cols: 1, items: [tf('הממוצע תמיד נמצא בין המספר הקטן ביותר למספר הגדול ביותר.', true)] },
    ],
  },
};
