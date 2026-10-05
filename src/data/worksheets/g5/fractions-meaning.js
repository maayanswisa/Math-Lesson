import { m, fr, mixed, bar, valueBlank } from '../helpers.js';

/** איזה חלק צבוע? — כל שבר שווה ערך מתקבל (2/4 = 1/2). */
const shaded = (n, d) => ({ q: '', figure: bar(n, d), a: `[[f:${n}/${d}]]` });

/** a : b כשבר (או כמספר מעורב כשהמנה גדולה מ-1). */
const quotient = (a, b) => ({ q: m`$${a} : ${b} =$ ${valueBlank(a, b)}` });

function partOf(n, d, whole) {
  const ans = (whole / d) * n;
  if (!Number.isInteger(ans)) throw new Error(`${n}/${d} of ${whole} is not whole`);
  return { q: m`$${fr(n, d)}$ מ-$${whole}$ הם [[${ans}]]` };
}

function findWhole(n, d, part) {
  const ans = (part / n) * d;
  if (!Number.isInteger(ans)) throw new Error(`whole for ${n}/${d}=${part} is not whole`);
  return { q: m`$${fr(n, d)}$ מהמספר הם $${part}$. המספר הוא [[${ans}]]` };
}

const toImproper = (w, n, d) => ({ q: m`$${mixed(w, n, d)} =$ [[f:${w * d + n}/${d}]]` });
const toMixed = (n, d) => ({ q: m`$${fr(n, d)} =$ [[mx:${Math.floor(n / d)} ${n % d}/${d}]]` });
const toWhole = (n, d) => ({ q: m`$${fr(n, d)} =$ [[${n / d}]]` });

export default {
  id: 'g5-fractions-meaning',
  grade: 5,
  emoji: '🍕',
  title: 'שברים — משמעות וייצוגים',
  reminder: [
    {
      title: 'שבר כחלק משלם',
      md: m`<div class="diagram-box">${bar(3, 4, 160)}</div>

**המכנה** — לכמה חלקים **שווים** חילקנו. **המונה** — כמה חלקים לקחנו. כאן צבוע $${fr(3, 4)}$.`,
    },
    {
      title: 'שבר כמנה (תוצאת חילוק)',
      md: m`$3$ פיצות מחלקים ל-$4$ ילדים: כל ילד מקבל $3 : 4 = ${fr(3, 4)}$ פיצה.

$7 : 2 = ${fr(7, 2)} = ${mixed(3, 1, 2)}$`,
    },
    {
      title: 'חלק מכמות, ומציאת השלם',
      md: m`$${fr(3, 4)}$ מ-$20$: מחלקים ל-$4$ ← $5$, ולוקחים $3$ חלקים ← $15$.

אם $${fr(2, 5)}$ מהכיתה הם $10$ ילדים: $${fr(1, 5)}$ הוא $5$, והשלם הוא $5 \times 5 = 25$.`,
    },
    {
      title: 'מספר מעורב ↔ שבר מדומה',
      md: m`$${mixed(2, 3, 4)} = ${fr('2 \\times 4 + 3', 4)} = ${fr(11, 4)}$

$${fr(17, 5)}$: $17 : 5 = 3$ שארית $2$, ולכן $${fr(17, 5)} = ${mixed(3, 2, 5)}$`,
    },
  ],
  pages: [
    {
      title: 'חלק משלם, מנה וחלק מכמות',
      exercises: [
        {
          title: 'איזה חלק מהרצועה צבוע? כתבו שבר.',
          cols: 2,
          items: [shaded(3, 4), shaded(2, 5), shaded(5, 8), shaded(1, 3), shaded(4, 6), shaded(7, 10)],
        },
        {
          title: 'כתבו את תוצאת החילוק כשבר או כמספר מעורב.',
          cols: 2,
          items: [quotient(3, 4), quotient(5, 8), quotient(2, 7), quotient(9, 4)],
        },
        {
          title: 'חשבו את החלק מהכמות.',
          cols: 2,
          items: [partOf(1, 4, 20), partOf(3, 4, 20), partOf(2, 5, 30), partOf(5, 6, 36), partOf(3, 8, 40), partOf(7, 10, 50), partOf(2, 3, 27), partOf(4, 9, 45)],
        },
        {
          title: 'שאלות מילוליות.',
          cols: 1,
          items: [
            {
              q: m`$4$ פיצות מחלקים שווה בשווה בין $5$ ילדים. איזה חלק מפיצה מקבל כל ילד?`,
              a: m`[[f:4/5]] פיצה`,
            },
            { q: m`בכיתה $28$ תלמידים, ו-$${fr(3, 7)}$ מהם בנים. כמה בנים בכיתה?`, a: m`[[12]] בנים` },
            { q: m`לנועה $60$ ש״ח. היא הוציאה $${fr(2, 5)}$ מהכסף. כמה ש״ח הוציאה?`, a: m`[[24]] ש״ח` },
            { q: m`לנועה $60$ ש״ח. היא הוציאה $${fr(2, 5)}$ מהכסף. כמה ש״ח נשארו לה?`, a: m`[[36]] ש״ח` },
          ],
        },
      ],
    },
    {
      title: 'מציאת השלם, ומספרים מעורבים',
      exercises: [
        {
          title: 'מצאו את השלם.',
          cols: 1,
          items: [findWhole(1, 3, 8), findWhole(2, 5, 10), findWhole(3, 4, 27), findWhole(5, 6, 40)],
        },
        {
          title: 'כתבו כשבר מדומה.',
          cols: 3,
          items: [toImproper(2, 3, 4), toImproper(1, 2, 5), toImproper(3, 1, 3), toImproper(4, 5, 6), toImproper(5, 1, 2), toImproper(2, 7, 8)],
        },
        {
          title: 'כתבו כמספר מעורב.',
          cols: 3,
          items: [toMixed(17, 5), toMixed(9, 4), toMixed(23, 6), toMixed(11, 3), toMixed(15, 7), toMixed(29, 10)],
        },
        {
          title: 'כמה שלמים?',
          cols: 2,
          items: [
            toWhole(12, 4),
            toWhole(20, 5),
            toWhole(18, 3),
            toWhole(40, 8),
            { q: m`ב-$3$ שלמים יש [[12]] רבעים` },
            { q: m`ב-$${mixed(2, 1, 2)}$ יש [[5]] חצאים` },
          ],
        },
        {
          title: 'שאלה מילולית.',
          cols: 1,
          items: [{ q: m`$${fr(3, 8)}$ מהתלמידים בשכבה הם $18$ תלמידים. כמה תלמידים יש בשכבה?`, a: m`[[48]] תלמידים` }],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'איזה חלק מהרצועה צבוע?', cols: 2, items: [shaded(3, 8), shaded(2, 6)] },
      { title: 'חשבו את החלק מהכמות.', cols: 2, items: [partOf(3, 5, 40), partOf(5, 8, 64)] },
      { title: 'מצאו את השלם.', cols: 1, items: [findWhole(2, 3, 14)] },
      { title: 'כתבו כשבר מדומה.', cols: 2, items: [toImproper(3, 2, 5), toImproper(4, 1, 6)] },
      { title: 'כתבו כמספר מעורב.', cols: 2, items: [toMixed(19, 4), toMixed(31, 8)] },
      {
        title: 'שאלות מילוליות.',
        cols: 1,
        items: [
          { q: m`$6$ עוגות מחלקים שווה בשווה ל-$8$ ילדים. איזה חלק מעוגה מקבל כל ילד?`, a: m`[[f:6/8]] עוגה` },
          { q: m`בספר $120$ עמודים. דני קרא $${fr(3, 4)}$ מהספר. כמה עמודים נשארו לו לקרוא?`, a: m`[[30]] עמודים` },
        ],
      },
    ],
  },
};
