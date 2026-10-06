import { m, barChart } from '../helpers.js';
import { tf, pictogram } from './shared.js';

/** תשובה יחידה מהנתונים (זורק אם יש תיקו). */
function only(arr, pred) {
  const hits = arr.map((x, i) => (pred(x, i) ? i : -1)).filter((i) => i >= 0);
  if (hits.length !== 1) throw new Error('expected exactly one');
  return hits[0];
}
const argmax = (a) => only(a, (x) => x === Math.max(...a));
const argmin = (a) => only(a, (x) => x === Math.min(...a));

/* פרי אהוב — דיאגרמת עמודות */
const FRUITS = ['תפוח', 'בננה', 'ענבים', 'אבטיח'];
const FRUIT_VOTES = [6, 9, 4, 7];

/* חיות מחמד — פיקטוגרם: כל עיגול = 2 ילדים */
const PETS = ['כלב', 'חתול', 'דג', 'ארנב'];
const PET_KIDS = [8, 6, 3, 4];

/* מבדק: צבע אהוב — טבלה */
const COLORS = ['כחול', 'אדום', 'ירוק'];
const COLOR_VOTES = [7, 5, 8];
const COLOR_TABLE = `<table style="direction:rtl"><tr>${COLORS.map((c) => `<th>${c}</th>`).join('')}</tr><tr>${COLOR_VOTES.map((v) => `<td>${v}</td>`).join('')}</tr></table>`;

export default {
  id: 'g2-data',
  grade: 2,
  emoji: '📊',
  title: 'טבלה, דיאגרמה ופיקטוגרם',
  reminder: [
    {
      title: 'דיאגרמת עמודות',
      md: 'כל עמודה מראה **כמה** — קוראים את הגובה שלה מול המספרים בצד. העמודה הגבוהה ביותר — הכי הרבה.',
    },
    {
      title: 'פיקטוגרם',
      md: m`כל סמל מייצג **כמה פריטים** (כתוב במקרא). אם כל עיגול $= 2$ ילדים, אז $3$ עיגולים $= 6$ ילדים, וחצי עיגול $= 1$.`,
    },
  ],
  pages: [
    {
      title: 'דיאגרמת עמודות',
      exercises: [
        {
          title: 'שאלנו ילדים: איזה פרי אתם הכי אוהבים?',
          cols: 1,
          figure: barChart({ labels: FRUITS, values: FRUIT_VOTES, step: 1 }),
          items: [
            { q: 'כמה ילדים בחרו בבננה?', a: `[[${FRUIT_VOTES[1]}]]` },
            { q: 'כמה ילדים בחרו בענבים?', a: `[[${FRUIT_VOTES[2]}]]` },
            { q: 'איזה פרי הכי אהוב?', options: FRUITS, answer: argmax(FRUIT_VOTES) },
            { q: 'איזה פרי הכי פחות אהוב?', options: FRUITS, answer: argmin(FRUIT_VOTES) },
            { q: 'כמה ילדים ענו בסך הכול?', a: `[[${FRUIT_VOTES.reduce((s, x) => s + x, 0)}]]` },
            { q: 'בכמה יותר ילדים בחרו בבננה מאשר בתפוח?', a: `[[${FRUIT_VOTES[1] - FRUIT_VOTES[0]}]]` },
          ],
        },
      ],
    },
    {
      title: 'פיקטוגרם וטבלה',
      exercises: [
        {
          title: m`חיות המחמד של ילדי הכיתה. כל עיגול $= 2$ ילדים.`,
          cols: 1,
          figure: pictogram(PETS.map((p, i) => ({ label: p, symbols: PET_KIDS[i] / 2 }))),
          items: [
            { q: 'לכמה ילדים יש כלב?', a: `[[${PET_KIDS[0]}]]` },
            { q: 'לכמה ילדים יש דג?', a: `[[${PET_KIDS[2]}]]` },
            { q: 'לכמה ילדים יש חתול או ארנב?', a: `[[${PET_KIDS[1] + PET_KIDS[3]}]]` },
            { q: 'איזו חיה הכי נפוצה?', options: PETS, answer: argmax(PET_KIDS) },
          ],
        },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf('בפיקטוגרם, חצי עיגול מייצג ילד אחד (כשעיגול = 2 ילדים).', true), tf('בדיאגרמת עמודות, העמודה הנמוכה מראה את הכי הרבה.', false)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      {
        title: m`הטבלה מראה את הצבע האהוב על ילדי הכיתה.`,
        cols: 1,
        figure: COLOR_TABLE,
        items: [
          { q: 'כמה ילדים בחרו באדום?', a: `[[${COLOR_VOTES[1]}]]` },
          { q: 'איזה צבע הכי אהוב?', options: COLORS, answer: argmax(COLOR_VOTES) },
          { q: 'כמה ילדים ענו בסך הכול?', a: `[[${COLOR_VOTES.reduce((s, x) => s + x, 0)}]]` },
          { q: m`בפיקטוגרם כל סמל $= 2$ ילדים. כמה סמלים יצטרכו לצבע הירוק?`, a: `[[${COLOR_VOTES[2] / 2}]]` },
        ],
      },
    ],
  },
};
