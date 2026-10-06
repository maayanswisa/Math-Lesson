import { m } from '../helpers.js';
import { tf, polygonFig } from './shared.js';

const BY_SIDES = ['שווה-צלעות', 'שווה-שוקיים', 'שונה-צלעות'];

/** סיווג משולש לפי אורכי צלעות (שווה-צלעות הוא גם שווה-שוקיים — כאן בוחרים את השם המדויק). */
function classify(a, b, c) {
  const distinct = new Set([a, b, c]).size;
  return { q: '', figure: polygonFig('triangle', [`${a} ס״מ`, `${b} ס״מ`, `${c} ס״מ`]), options: BY_SIDES, answer: distinct === 1 ? 0 : distinct === 2 ? 1 : 2 };
}

/** צלעות וקודקודים של מצולע. */
const POLY = { משולש: 3, מרובע: 4, מחומש: 5, משושה: 6 };
const sides = (name) => ({ q: `כמה צלעות וכמה קודקודים יש ל${name}?`, a: m`צלעות: [[${POLY[name]}]] · קודקודים: [[${POLY[name]}]]` });
const nameBySides = (n) => {
  const names = Object.keys(POLY);
  return { q: m`למצולע יש $${n}$ צלעות. מה שמו?`, options: names, answer: names.findIndex((k) => POLY[k] === n) };
};

export default {
  id: 'g2-triangles',
  grade: 2,
  emoji: '🔺',
  title: 'מצולעים ומשולשים',
  reminder: [
    {
      title: 'מצולעים',
      md: m`צורה סגורה שכל צלעותיה **קטעים ישרים**. משולש — $3$ צלעות, מרובע — $4$, מחומש — $5$, משושה — $6$. מספר הקודקודים שווה למספר הצלעות.`,
    },
    {
      title: 'סוגי משולשים לפי צלעות',
      md: m`**שווה-צלעות** — כל $3$ הצלעות שוות. **שווה-שוקיים** — $2$ צלעות שוות. **שונה-צלעות** — כל הצלעות שונות.`,
    },
    {
      title: 'פירוק והרכבה',
      md: 'ריבוע שחותכים באלכסון — מתקבלים 2 משולשים. משני משולשים זהים אפשר להרכיב מרובע.',
    },
  ],
  pages: [
    {
      title: 'מצולעים',
      exercises: [
        { title: 'צלעות וקודקודים.', cols: 1, items: [sides('משולש'), sides('מחומש'), sides('משושה')] },
        { title: 'מה השם?', cols: 2, items: [nameBySides(4), nameBySides(6), nameBySides(3), nameBySides(5)] },
        {
          title: 'פירוק והרכבה.',
          cols: 1,
          items: [
            { q: 'חותכים ריבוע לאורך האלכסון. אילו צורות מתקבלות?', options: ['2 משולשים', '2 ריבועים', 'משולש וריבוע'], answer: 0 },
            { q: 'מחברים 2 ריבועים זהים צלע אל צלע. מה מתקבל?', options: ['משולש', 'מלבן', 'מחומש'], answer: 1 },
          ],
        },
      ],
    },
    {
      title: 'סוגי משולשים',
      exercises: [
        { title: 'איזה משולש?', cols: 3, items: [classify(5, 5, 5), classify(6, 4, 6), classify(3, 4, 5), classify(7, 7, 3), classify(8, 6, 5), classify(9, 9, 9)] },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf('למשולש יש 3 קודקודים.', true), tf('עיגול הוא מצולע.', false), tf('במשולש שווה-צלעות כל הצלעות שוות.', true)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'איזה משולש?', cols: 3, items: [classify(4, 4, 6), classify(10, 10, 10), classify(2, 5, 6)] },
      { title: 'צלעות וקודקודים.', cols: 1, items: [sides('מרובע')] },
    ],
  },
};
