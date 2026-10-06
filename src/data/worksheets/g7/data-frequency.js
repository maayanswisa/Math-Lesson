import { m, barChart } from '../helpers.js';
import { tf } from './shared.js';

/* ---------- נתונים ---------- */

/** מספר האחים של 20 תלמידים. */
const SIBLINGS = [2, 1, 3, 0, 2, 2, 1, 4, 2, 3, 1, 2, 0, 1, 2, 3, 2, 1, 5, 2];
const freq = (data, v) => data.filter((x) => x === v).length;
const VALUES = [0, 1, 2, 3, 4, 5];

/** רשימת נתונים ארוכה: כל מספר בנוסחה משלו, כדי שהשורה תוכל להישבר במסך צר. */
const list = (data) => data.map((x) => `$${x}$`).join(', ');

/** ספורט אהוב — לדיאגרמה. */
const SPORT = { כדורגל: 9, כדורסל: 6, שחייה: 4, טניס: 3, ריצה: 8 };

function mode(data) {
  const counts = new Map();
  for (const x of data) counts.set(x, (counts.get(x) ?? 0) + 1);
  const max = Math.max(...counts.values());
  const modes = [...counts].filter(([, c]) => c === max);
  if (modes.length !== 1) throw new Error('mode must be unique');
  return modes[0][0];
}

/** שאלה בחירה עם תשובה יחידה מהנתונים. */
function only(arr, pred) {
  const hits = arr.map((x, i) => (pred(x, i) ? i : -1)).filter((i) => i >= 0);
  if (hits.length !== 1) throw new Error('expected exactly one');
  return hits[0];
}

const SPORT_NAMES = Object.keys(SPORT);
const SPORT_VALUES = Object.values(SPORT);

/** נתוני המבדק: ציוני בוחן (1–5) של 15 תלמידים. */
const QUIZ_GRADES = [4, 5, 3, 4, 2, 4, 5, 3, 4, 1, 3, 4, 5, 4, 3];

export default {
  id: 'g7-data-frequency',
  grade: 7,
  emoji: '📊',
  title: 'איסוף וייצוג נתונים, ושכיחות',
  reminder: [
    {
      title: 'טבלת שכיחויות',
      md: m`**שכיחות** — כמה פעמים הופיע ערך. סכום כל השכיחויות $=$ מספר הנתונים.

נתונים $2, 1, 2, 3, 2$: הערך $2$ — שכיחות $3$; $1$ — $1$; $3$ — $1$.`,
    },
    {
      title: 'שכיח',
      md: m`**השכיח** — הערך עם השכיחות הגבוהה ביותר (בדוגמה: $2$). בדיאגרמת עמודות — העמודה הגבוהה ביותר.`,
    },
  ],
  pages: [
    {
      title: 'טבלת שכיחויות',
      exercises: [
        {
          title: m`שאלנו $20$ תלמידים כמה אחים יש להם: ` + list(SIBLINGS),
          cols: 3,
          items: VALUES.map((v) => ({ q: m`מספר אחים $${v}$:`, a: `[[${freq(SIBLINGS, v)}]]` })),
        },
        {
          title: 'לפי הטבלה.',
          cols: 1,
          items: [
            { q: 'השכיח (מספר האחים הנפוץ ביותר):', a: `[[${mode(SIBLINGS)}]]` },
            { q: 'כמה תלמידים עם 3 אחים או יותר?', a: `[[${SIBLINGS.filter((x) => x >= 3).length}]]` },
            { q: 'כמה אחים יש לכל התלמידים יחד?', a: `[[${SIBLINGS.reduce((s, x) => s + x, 0)}]]` },
          ],
        },
      ],
    },
    {
      title: 'דיאגרמת עמודות',
      exercises: [
        {
          title: 'הספורט האהוב על תלמידי הכיתה.',
          cols: 1,
          figure: barChart({ labels: SPORT_NAMES, values: SPORT_VALUES, step: 2 }),
          items: [
            { q: 'כמה תלמידים בחרו בכדורסל?', a: `[[${SPORT.כדורסל}]]` },
            { q: 'כמה תלמידים ענו בסך הכול?', a: `[[${SPORT_VALUES.reduce((s, x) => s + x, 0)}]]` },
            { q: 'מה השכיח?', options: SPORT_NAMES, answer: only(SPORT_VALUES, (v) => v === Math.max(...SPORT_VALUES)) },
            { q: 'בכמה הכדורגל פופולרי יותר מהטניס?', a: `[[${SPORT.כדורגל - SPORT.טניס}]]` },
          ],
        },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf('סכום השכיחויות שווה למספר הנתונים.', true), tf('השכיח הוא הערך הגדול ביותר בנתונים.', false)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      {
        title: m`ציוני בוחן של $15$ תלמידים: ` + list(QUIZ_GRADES),
        cols: 3,
        items: [1, 2, 3, 4, 5].map((v) => ({ q: m`ציון $${v}$:`, a: `[[${freq(QUIZ_GRADES, v)}]]` })),
      },
      { title: 'השכיח.', cols: 1, items: [{ q: 'הציון השכיח:', a: `[[${mode(QUIZ_GRADES)}]]` }] },
    ],
  },
};
