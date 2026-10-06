import { m } from '../helpers.js';
import { tf, doubleBarChart } from './shared.js';

/* ---------- נתונים ---------- */

const CLASSES = ['ג׳1', 'ג׳2', 'ג׳3', 'ג׳4'];
const BOYS = [14, 12, 16, 10];
const GIRLS = [12, 15, 10, 14];
const CLASS_CHART = doubleBarChart({ labels: CLASSES, series: [{ name: 'בנים', values: BOYS }, { name: 'בנות', values: GIRLS }], step: 2 });

const DAYS = ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳'];
const SOLD = { morning: [30, 45, 25, 40, 50], evening: [20, 35, 40, 30, 45] };
const SALES_CHART = doubleBarChart({ labels: DAYS, series: [{ name: 'בוקר', values: SOLD.morning }, { name: 'ערב', values: SOLD.evening }], step: 10 });

const FRUITS = ['תפוח', 'בננה', 'ענבים'];
const VOTES = { g3: [8, 12, 6], g4: [10, 7, 9] };
const FRUIT_CHART = doubleBarChart({ labels: FRUITS, series: [{ name: 'כיתה ג׳', values: VOTES.g3 }, { name: 'כיתה ד׳', values: VOTES.g4 }], step: 2 });

const sum = (a) => a.reduce((s, x) => s + x, 0);
/** האינדקס היחיד שמקיים את התנאי (זורק אם אין בדיוק אחד — כדי שלשאלה תהיה תשובה אחת). */
function only(a, pred) {
  const hits = a.map((x, i) => (pred(x, i) ? i : -1)).filter((i) => i >= 0);
  if (hits.length !== 1) throw new Error(`expected exactly one match, got ${hits.length}`);
  return hits[0];
}
const argmax = (a) => only(a, (x) => x === Math.max(...a));
const argmin = (a) => only(a, (x) => x === Math.min(...a));

/** קריאת שתי העמודות של קבוצה אחת בדיאגרמה. */
const readGroup = (i) => ({ q: `${CLASSES[i]}: בנים [[${BOYS[i]}]] בנות [[${GIRLS[i]}]]` });

export default {
  id: 'g3-data',
  grade: 3,
  emoji: '📊',
  title: 'דיאגרמת עמודות כפולה',
  reminder: [
    {
      title: 'קוראים דיאגרמה כפולה',
      md: m`בכל קבוצה יש **שתי עמודות** — אחת לכל סדרה. **המקרא** אומר איזה צבע שייך למה.

קוראים את גובה העמודה מול הקווים והמספרים בציר.`,
    },
    {
      title: 'שאלות נפוצות',
      md: m`**כמה בסך הכול?** — מחברים. **בכמה יותר?** — מחסרים. **הכי הרבה / הכי מעט?** — העמודה הגבוהה / הנמוכה ביותר.`,
    },
  ],
  pages: [
    {
      title: 'בנים ובנות בכיתות ג׳',
      exercises: [
        {
          title: 'הדיאגרמה מראה כמה בנים וכמה בנות בכל כיתה. קראו אותה.',
          cols: 2,
          figure: CLASS_CHART,
          items: CLASSES.map((_, i) => readGroup(i)),
        },
        {
          title: 'ענו לפי הדיאגרמה.',
          cols: 1,
          items: [
            { q: m`כמה תלמידים בכיתה ג׳1 בסך הכול?`, a: `[[${BOYS[0] + GIRLS[0]}]]` },
            { q: m`בכמה הבנות בג׳2 רבות מהבנים בג׳2?`, a: `[[${GIRLS[1] - BOYS[1]}]]` },
            { q: 'באיזו כיתה הכי מעט בנים?', options: CLASSES, answer: argmin(BOYS) },
            { q: 'באיזו כיתה הכי הרבה בנות?', options: CLASSES, answer: argmax(GIRLS) },
            { q: 'באיזו כיתה ההפרש בין מספר הבנים למספר הבנות הכי גדול?', options: CLASSES, answer: argmax(BOYS.map((b, i) => Math.abs(b - GIRLS[i]))) },
          ],
        },
      ],
    },
    {
      title: 'מכירות בקפיטריה',
      exercises: [
        {
          title: 'כמה כריכים נמכרו בבוקר ובערב בכל יום?',
          cols: 1,
          figure: SALES_CHART,
          items: [
            { q: 'כמה כריכים נמכרו ביום ב׳ בבוקר?', a: `[[${SOLD.morning[1]}]]` },
            { q: 'כמה כריכים נמכרו ביום ג׳ בסך הכול?', a: `[[${SOLD.morning[2] + SOLD.evening[2]}]]` },
            { q: 'כמה כריכים נמכרו בבוקר בכל השבוע?', a: `[[${sum(SOLD.morning)}]]` },
            { q: 'באיזה יום נמכרו בערב יותר כריכים מאשר בבוקר?', options: DAYS, answer: only(SOLD.evening, (e, i) => e > SOLD.morning[i]) },
            { q: 'באיזה יום נמכרו הכי מעט כריכים בערב?', options: DAYS, answer: argmin(SOLD.evening) },
          ],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf('ביום ה׳ נמכרו הכי הרבה כריכים בבוקר.', argmax(SOLD.morning) === 4),
            tf('ביום א׳ נמכרו בערב יותר כריכים מאשר בבוקר.', SOLD.evening[0] > SOLD.morning[0]),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      {
        title: 'הפרי האהוב בכיתות ג׳ ו-ד׳.',
        cols: 1,
        figure: FRUIT_CHART,
        items: [
          { q: 'כמה תלמידים בכיתה ד׳ בחרו בענבים?', a: `[[${VOTES.g4[2]}]]` },
          { q: 'כמה תלמידים בשתי הכיתות בחרו בבננה?', a: `[[${VOTES.g3[1] + VOTES.g4[1]}]]` },
          { q: 'כמה תלמידים יש בכיתה ג׳ (כולם בחרו פרי)?', a: `[[${sum(VOTES.g3)}]]` },
          { q: 'איזה פרי אהוב ביותר בכיתה ד׳?', options: FRUITS, answer: argmax(VOTES.g4) },
        ],
      },
    ],
  },
};
