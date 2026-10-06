import { m } from '../helpers.js';
import { tf, sn, ev, evItem } from './shared.js';

const add = (a, b) => evItem(m`${sn(a)} + ${sn(b)}`);
const sub = (a, b) => evItem(m`${sn(a)} - ${sn(b)}`);

/** חיסור כחיבור הנגדי: a − b = a + (−b). */
const asAdd = (a, b) => ({ q: m`$${sn(a)} - ${sn(b)} = ${sn(a)} +$ [[${-b}]] $=$ [[${a - b}]]` });

/** מספר חסר: a + □ = c. */
const missingAdd = (a, c) => ({ q: m`$${sn(a)} +$ [[${c - a}]] $= ${c}$` });

function word(q, answer, unit, check) {
  if (!check(answer)) throw new Error(`answer ${answer} does not fit: ${q}`);
  return { q, a: m`[[${answer}]] ${unit}` };
}

export default {
  id: 'g7-signed',
  grade: 7,
  emoji: '➕',
  title: 'חיבור וחיסור מספרים מכוונים',
  reminder: [
    {
      title: 'חיבור',
      md: m`**סימנים שווים** — מחברים ושומרים על הסימן: $(-3) + (-5) = -8$

**סימנים שונים** — מחסרים (הגדול פחות הקטן, בלי סימן) ולוקחים את הסימן של "החזק": $(-9) + 4 = -5$`,
    },
    {
      title: 'חיסור = חיבור הנגדי',
      md: m`$5 - (-3) = 5 + 3 = 8$ $\qquad$ $(-2) - 6 = (-2) + (-6) = -8$`,
    },
    {
      title: 'על ישר המספרים',
      md: m`מוסיפים מספר חיובי — זזים **ימינה**; מוסיפים שלילי — זזים **שמאלה**.`,
    },
  ],
  pages: [
    {
      title: 'חיבור',
      exercises: [
        { title: 'חברו.', cols: 2, items: [add(-3, -5), add(-9, 4), add(7, -2), add(-6, 6), add(-12, -8), add(15, -20), add(-4, 11), add(-25, 13)] },
        { title: 'השלימו.', cols: 2, items: [missingAdd(-4, 3), missingAdd(6, -2), missingAdd(-7, -10), missingAdd(-5, 0)] },
        { title: 'חשבו (שלושה מחוברים).', cols: 2, items: [evItem(m`(-2) + 5 + (-7)`), evItem(m`8 + (-3) + (-6)`), evItem(m`(-10) + (-4) + 9`), evItem(m`(-1) + (-1) + (-1)`)] },
      ],
    },
    {
      title: 'חיסור ושאלות',
      exercises: [
        { title: 'כתבו כחיבור הנגדי וחשבו.', cols: 1, items: [asAdd(5, -3), asAdd(-2, 6), asAdd(-8, -10), asAdd(4, 9)] },
        { title: 'חסרו.', cols: 2, items: [sub(3, 8), sub(-6, -6), sub(-1, 4), sub(0, -9), sub(-15, -20), sub(12, -12)] },
        {
          title: 'שאלות מילוליות.',
          cols: 1,
          items: [
            word(m`בבוקר הטמפרטורה הייתה $-3$ מעלות, ועד הצהריים עלתה ב-$8$ מעלות. מה הטמפרטורה בצהריים?`, 5, 'מעלות', (x) => x === ev('(-3) + 8')),
            word('בלילה הטמפרטורה הייתה 2 מעלות, וירדה ב-7 מעלות. מה הטמפרטורה עכשיו?', -5, 'מעלות', (x) => x === 2 - 7),
            word(m`צוללת נמצאת בגובה $-40$ מטר (מתחת לפני הים) ועולה $15$ מטר. באיזה גובה היא עכשיו?`, -25, 'מטר', (x) => x === -40 + 15),
          ],
        },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf(m`$(-4) - (-4) = -8$`, ev('(-4) - (-4)') === -8), tf(m`$a - (-b) = a + b$`, true)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'חשבו.', cols: 2, items: [add(-7, -6), add(10, -14), sub(-3, 5), sub(2, -9), evItem(m`(-5) + 8 - (-2)`), evItem(m`(-6) - 4 + (-1)`)] },
      { title: 'השלימו.', cols: 1, items: [missingAdd(-9, -2)] },
      { title: 'שאלה מילולית.', cols: 1, items: [word(m`הטמפרטורה בבוקר הייתה $-4$ מעלות, ובערב $-6$ מעלות. בכמה מעלות ירדה הטמפרטורה?`, 2, 'מעלות', (x) => x === -4 - -6)] },
    ],
  },
};
