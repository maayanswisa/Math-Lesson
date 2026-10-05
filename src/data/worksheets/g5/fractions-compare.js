import { m, fr, cmp, gcd, reduce } from '../helpers.js';

const compare = ([a, b], [c, d]) => ({ q: m`$${fr(a, b)}$ [[c:${cmp(a / b, c / d)}]] $${fr(c, d)}$` });
const vsHalf = (a, b) => ({ q: m`$${fr(a, b)}$ [[c:${cmp(a / b, 1 / 2)}]] $${fr(1, 2)}$` });

/** כמה חסר לשלם: a/b + ? = 1. */
function toWhole(a, b) {
  const [n, d] = reduce(b - a, b);
  return { q: m`$${fr(a, b)} +$ [[f:${n}/${d}]] $= 1$` };
}

/** הרחבה למכנה נתון: a/b = ?/target. */
function expandTo(a, b, target) {
  if (target % b !== 0) throw new Error(`${target} is not a multiple of ${b}`);
  return { q: m`$${fr(a, b)} =$ [[fx:${(a * target) / b}/{${target}}]]` };
}

/** בחירת השבר הגדול/הקטן ביותר מתוך רשימה. */
function pick(question, fracs, which) {
  const values = fracs.map(([a, b]) => a / b);
  const target = which === 'max' ? Math.max(...values) : Math.min(...values);
  if (values.filter((v) => v === target).length !== 1) throw new Error('ambiguous pick');
  return { q: question, options: fracs.map(([a, b]) => m`$${fr(a, b)}$`), answer: values.indexOf(target) };
}

/** סידור מהקטן לגדול. */
function order(fracs) {
  const sorted = [...fracs].sort((x, y) => x[0] / x[1] - y[0] / y[1]);
  return {
    q: m`$${fracs.map(([a, b]) => fr(a, b)).join(',\\quad ')}$`,
    a: sorted.map(([a, b]) => `[[fx:${a}/${b}]]`).join(' $<$ '),
  };
}

const lcm = (a, b) => (a * b) / gcd(a, b);
const WHO = (x, y) => (Math.abs(x - y) < 1e-9 ? 2 : x > y ? 0 : 1);

export default {
  id: 'g5-fractions-compare',
  grade: 5,
  emoji: '⚖️',
  title: 'השוואה בין שברים',
  reminder: [
    {
      title: 'אותו מכנה / אותו מונה',
      md: m`**אותו מכנה** — גדול יותר השבר עם **המונה הגדול**: $${fr(5, 8)} > ${fr(3, 8)}$.

**אותו מונה** — גדול יותר השבר עם **המכנה הקטן** (החלקים גדולים יותר): $${fr(3, 5)} > ${fr(3, 7)}$.`,
    },
    {
      title: 'השוואה לחצי',
      md: m`כופלים את המונה ב-$2$ ומשווים למכנה:

$${fr(4, 9)} < ${fr(1, 2)}$ כי $4 \times 2 = 8 < 9$ · $${fr(5, 8)} > ${fr(1, 2)}$ כי $10 > 8$.`,
    },
    {
      title: 'השלמה לשלם',
      md: m`$${fr(7, 8)}$ חסר לו $${fr(1, 8)}$ לשלם, ול-$${fr(5, 6)}$ חסר $${fr(1, 6)}$.

$${fr(1, 8)} < ${fr(1, 6)}$ — לכן $${fr(7, 8)}$ **קרוב יותר** לשלם: $${fr(7, 8)} > ${fr(5, 6)}$.`,
    },
    {
      title: 'מכנה משותף',
      md: m`מרחיבים לאותו מכנה ואז משווים מונים:

$${fr(2, 3)} = ${fr(8, 12)}$, $\;${fr(3, 4)} = ${fr(9, 12)}$, ולכן $${fr(2, 3)} < ${fr(3, 4)}$.`,
    },
  ],
  pages: [
    {
      title: 'אותו מכנה, אותו מונה, חצי ושלם',
      exercises: [
        {
          title: 'אותו מכנה: בחרו $<$, $=$ או $>$.',
          cols: 3,
          items: [
            compare([3, 7], [5, 7]),
            compare([9, 10], [7, 10]),
            compare([11, 12], [5, 12]),
            compare([1, 4], [3, 4]),
            compare([8, 9], [2, 9]),
            compare([6, 13], [7, 13]),
          ],
        },
        {
          title: 'אותו מונה: בחרו $<$, $=$ או $>$.',
          cols: 3,
          items: [
            compare([3, 5], [3, 7]),
            compare([2, 9], [2, 3]),
            compare([5, 8], [5, 6]),
            compare([1, 10], [1, 4]),
            compare([7, 12], [7, 9]),
            compare([4, 5], [4, 11]),
          ],
        },
        {
          title: 'השוו לחצי.',
          cols: 3,
          items: [vsHalf(3, 8), vsHalf(5, 9), vsHalf(6, 12), vsHalf(4, 7), vsHalf(7, 15), vsHalf(11, 20)],
        },
        {
          title: 'כמה חסר לשלם?',
          cols: 3,
          items: [toWhole(7, 8), toWhole(4, 5), toWhole(2, 3), toWhole(9, 10), toWhole(5, 12), toWhole(3, 4)],
        },
        {
          title: 'השוו בעזרת ההשלמה לשלם.',
          cols: 3,
          items: [compare([7, 8], [5, 6]), compare([8, 9], [9, 10]), compare([3, 4], [4, 5])],
        },
      ],
    },
    {
      title: 'מכנה משותף וסידור',
      exercises: [
        {
          title: 'הרחיבו למכנה הנתון.',
          cols: 3,
          items: [expandTo(2, 3, 12), expandTo(3, 4, 12), expandTo(1, 2, 10), expandTo(3, 5, 10), expandTo(5, 6, 18), expandTo(4, 9, 18)],
        },
        {
          title: 'מכנים שונים: בחרו $<$, $=$ או $>$ (היעזרו במכנה משותף).',
          cols: 3,
          items: [
            compare([2, 3], [3, 4]),
            compare([1, 2], [3, 5]),
            compare([5, 6], [7, 9]),
            compare([3, 4], [5, 8]),
            compare([2, 5], [3, 10]),
            compare([4, 6], [2, 3]),
            compare([7, 12], [2, 3]),
          ],
        },
        {
          title: 'בחרו.',
          cols: 1,
          items: [
            pick('מהו השבר הגדול ביותר?', [[3, 8], [1, 2], [2, 5], [5, 12]], 'max'),
            pick('מהו השבר הקטן ביותר?', [[2, 3], [5, 6], [7, 12], [3, 4]], 'min'),
            {
              q: m`איזה שבר נמצא בין $${fr(1, 4)}$ ל-$${fr(3, 4)}$?`,
              options: [m`$${fr(1, 8)}$`, m`$${fr(5, 8)}$`, m`$${fr(7, 8)}$`, m`$${fr(9, 10)}$`],
              answer: 1,
            },
          ],
        },
        {
          title: 'סדרו מהקטן לגדול.',
          cols: 1,
          items: [order([[1, 2], [1, 3], [1, 6]]), order([[3, 4], [5, 8], [1, 2]]), order([[2, 3], [5, 9], [7, 9]])],
        },
        {
          title: 'שאלות מילוליות.',
          cols: 1,
          items: [
            {
              q: m`דנה אכלה $${fr(3, 8)}$ פיצה, ויואב אכל $${fr(1, 4)}$ מפיצה באותו גודל. מי אכל יותר?`,
              options: ['דנה', 'יואב', 'אכלו אותה כמות'],
              answer: WHO(3 / 8, 1 / 4),
            },
            {
              q: m`רון רץ $${fr(2, 3)}$ ק״מ, ומיכל רצה $${fr(4, 6)}$ ק״מ. מי רץ יותר?`,
              options: ['רון', 'מיכל', 'רצו אותו מרחק'],
              answer: WHO(2 / 3, 4 / 6),
            },
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      {
        title: 'בחרו $<$, $=$ או $>$.',
        cols: 3,
        items: [
          compare([5, 9], [7, 9]),
          compare([4, 7], [4, 9]),
          compare([3, 4], [7, 10]),
          compare([5, 10], [1, 2]),
          compare([2, 3], [5, 7]),
          compare([11, 12], [9, 10]),
        ],
      },
      { title: 'הרחיבו למכנה הנתון.', cols: 2, items: [expandTo(3, 4, lcm(4, 5)), expandTo(2, 5, lcm(4, 5))] },
      { title: 'בחרו.', cols: 1, items: [pick('מהו השבר הגדול ביותר?', [[4, 5], [7, 10], [3, 4], [11, 20]], 'max')] },
      { title: 'סדרו מהקטן לגדול.', cols: 1, items: [order([[2, 5], [1, 2], [3, 10]])] },
      {
        title: 'שאלה מילולית.',
        cols: 1,
        items: [
          {
            q: m`בבקבוק אחד יש $${fr(3, 5)}$ ליטר מים, ובבקבוק שני $${fr(5, 8)}$ ליטר. באיזה בקבוק יש יותר מים?`,
            options: ['בראשון', 'בשני', 'אותה כמות'],
            answer: WHO(3 / 5, 5 / 8),
          },
        ],
      },
    ],
  },
};
