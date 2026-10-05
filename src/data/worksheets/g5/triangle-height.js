import { m, triangleFig, heightCandidates } from '../helpers.js';

const KINDS = ['חד-זוויות', 'ישר-זווית', 'קהה-זווית'];
function classify(a, b, c) {
  if (a + b + c !== 180) throw new Error(`angles ${a},${b},${c} don't sum to 180`);
  const max = Math.max(a, b, c);
  return { q: m`זוויות המשולש: $${a}°$, $${b}°$, $${c}°$`, options: KINDS, answer: max < 90 ? 0 : max === 90 ? 1 : 2 };
}

const TF = ['נכון', 'לא נכון'];
const tf = (q, truth) => ({ q, options: TF, answer: truth ? 0 : 1 });

/** איזה קטע הוא הגובה לצלע BC? feet בסדר D, E, F; הרגל של הגובה היא ax. */
function whichHeight(ax, feet) {
  const names = feet.map((f, i) => (f === 0 ? 'AB' : `A${'DEF'[i]}`));
  const answer = feet.indexOf(ax);
  if (answer === -1) throw new Error('no perpendicular candidate');
  return { q: m`איזה קטע הוא הגובה לצלע $BC$?`, figure: heightCandidates({ ax, feet }), options: names.map((n) => m`$${n}$`), answer };
}

/** במשולש הגובה לצלע b1 הוא h1. מה הגובה לצלע b2? (השטח זהה בשתי הדרכים) */
function otherHeight(b1, h1, b2) {
  const h2 = (b1 * h1) / b2;
  if (!Number.isInteger(h2) || h1 > b2 || h2 > b1) throw new Error('impossible triangle');
  return {
    q: m`במשולש, הגובה לצלע של $${b1}$ ס״מ הוא $${h1}$ ס״מ. מה הגובה לצלע של $${b2}$ ס״מ?`,
    a: m`[[${h2}]] ס״מ`,
  };
}

export default {
  id: 'g5-triangle-height',
  grade: 5,
  emoji: '📏',
  title: 'גובה של משולש',
  reminder: [
    {
      title: 'מה זה גובה?',
      md: m`**גובה** הוא קטע שיוצא מ**קודקוד** ו**מאונך** (בזווית $90°$) לצלע שמולו — או **להמשך** של הצלע.

<div class="diagram-box">${triangleFig({ base: '', height: '', apex: 0.4 })}</div>`,
    },
    {
      title: 'סוגי משולשים לפי זוויות',
      md: m`- **חד-זוויות** — כל הזוויות קטנות מ-$90°$
- **ישר-זווית** — יש זווית אחת של $90°$ בדיוק
- **קהה-זווית** — יש זווית אחת גדולה מ-$90°$`,
    },
    {
      title: 'איפה נמצאים הגבהים?',
      wide: true,
      md: m`לכל משולש יש **שלושה גבהים** — אחד לכל צלע.

**חד-זוויות**: כולם בתוך המשולש · **ישר-זווית**: שני הניצבים הם גבהים · **קהה-זווית**: שני גבהים **מחוץ** למשולש (מאריכים את הצלע בקו מקווקו).`,
    },
  ],
  pages: [
    {
      title: 'סיווג משולשים לפי זוויות',
      exercises: [
        {
          title: 'איזה משולש זה?',
          cols: 2,
          items: [
            classify(60, 60, 60),
            classify(90, 45, 45),
            classify(120, 30, 30),
            classify(100, 50, 30),
            classify(70, 60, 50),
            classify(30, 90, 60),
            classify(40, 110, 30),
            classify(80, 55, 45),
          ],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf(m`במשולש ישר-זווית יש זווית אחת של $90°$.`, true),
            tf('ייתכן משולש עם שתי זוויות ישרות.', false),
            tf(m`במשולש קהה-זווית יש זווית אחת גדולה מ-$90°$.`, true),
            tf('ייתכן משולש עם שתי זוויות קהות.', false),
            tf('לכל משולש יש שלושה גבהים.', true),
            tf('הגובה של משולש תמיד נמצא בתוך המשולש.', false),
          ],
        },
        {
          title: 'כמה זוויות חדות יש...',
          cols: 1,
          items: [
            { q: 'במשולש חד-זוויות?', a: '[[3]] זוויות חדות' },
            { q: 'במשולש ישר-זווית?', a: '[[2]] זוויות חדות' },
            { q: 'במשולש קהה-זווית?', a: '[[2]] זוויות חדות' },
          ],
        },
      ],
    },
    {
      title: 'זיהוי גבהים',
      exercises: [
        {
          title: 'בחרו את הקטע שהוא גובה (רמז: הגובה מאונך לצלע או להמשכה).',
          cols: 3,
          items: [whichHeight(60, [25, 150, 60]), whichHeight(-55, [45, -55, 110]), whichHeight(0, [0, 70, 130])],
        },
        {
          title: 'כמה מהגבהים נמצאים מחוץ למשולש?',
          cols: 1,
          items: [
            { q: 'במשולש חד-זוויות:', a: '[[0]] גבהים' },
            { q: 'במשולש קהה-זווית:', a: '[[2]] גבהים' },
          ],
        },
        {
          title: 'השטח של משולש לא משתנה — לא משנה לאיזו צלע מורידים את הגובה. מצאו את הגובה השני.',
          cols: 1,
          items: [otherHeight(10, 6, 12), otherHeight(8, 9, 12), otherHeight(15, 4, 10)],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'איזה משולש זה?', cols: 2, items: [classify(30, 60, 90), classify(95, 45, 40), classify(50, 60, 70)] },
      {
        title: 'נכון או לא נכון?',
        cols: 1,
        items: [tf('במשולש ישר-זווית, שני הניצבים הם גם גבהים.', true), tf('במשולש חד-זוויות יש גובה שנמצא מחוץ למשולש.', false)],
      },
      { title: 'בחרו את הקטע שהוא הגובה.', cols: 1, items: [whichHeight(-45, [-45, 80, 130])] },
      { title: 'ענו.', cols: 1, items: [{ q: 'כמה גבהים יש לכל משולש?', a: '[[3]]' }] },
      { title: 'מצאו את הגובה השני.', cols: 1, items: [otherHeight(12, 5, 10)] },
    ],
  },
};
