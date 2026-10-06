import { m } from '../helpers.js';
import { tf, solidFig, SOLID_NAMES } from './shared.js';

/** מה שם הגוף? שלוש אפשרויות, בסדר משתנה. */
const ALL = Object.keys(SOLID_NAMES);
function nameIt(kind, k) {
  const others = ALL.filter((x) => x !== kind);
  const options = [kind, others[k % others.length], others[(k + 3) % others.length]];
  const shift = k % 3;
  const rotated = [...options.slice(shift), ...options.slice(0, shift)];
  return { q: '', figure: solidFig(kind), options: rotated.map((x) => SOLID_NAMES[x]), answer: rotated.indexOf(kind) };
}

/** תכונות: מתגלגל? יש לו קודקודים? */
const ROLLS = { sphere: true, cylinder: true, cone: true, cube: false, box: false, pyramid: false, prism: false };
const rolls = (kind) => ({ q: `${SOLID_NAMES[kind]}:`, options: ['מתגלגל', 'לא מתגלגל'], answer: ROLLS[kind] ? 0 : 1 });

const count = (q, n) => ({ q, a: `[[${n}]]` });

export default {
  id: 'g2-solids',
  grade: 2,
  emoji: '🧊',
  title: 'גופים',
  reminder: [
    {
      title: 'גופים עם פאות שטוחות',
      md: m`**קובייה** — $6$ פאות ריבועיות שוות. **תיבה** — $6$ פאות מלבניות. **פירמידה** — בסיס, ופאות משולשות שנפגשות בקודקוד. **מנסרה** — שני בסיסים זהים ופאות מלבניות.`,
    },
    {
      title: 'גופים עגולים',
      md: '**כדור** — עגול לגמרי, בלי פאות שטוחות. **גליל** — שני בסיסים עגולים (כמו פחית). **חרוט** — בסיס עגול וחוד (כמו גביע גלידה). הם יכולים להתגלגל.',
    },
  ],
  pages: [
    {
      title: 'מזהים גופים',
      exercises: [
        { title: 'מה שם הגוף?', cols: 3, items: [nameIt('cube', 0), nameIt('cylinder', 1), nameIt('cone', 2), nameIt('sphere', 3), nameIt('pyramid', 4), nameIt('box', 5)] },
        {
          title: 'למה זה דומה?',
          cols: 1,
          items: [
            { q: 'פחית שתייה דומה ל:', options: ['כדור', 'גליל', 'קובייה'], answer: 1 },
            { q: 'קופסת נעליים דומה ל:', options: ['תיבה', 'חרוט', 'כדור'], answer: 0 },
            { q: 'גביע גלידה דומה ל:', options: ['גליל', 'פירמידה', 'חרוט'], answer: 2 },
          ],
        },
      ],
    },
    {
      title: 'תכונות ומיון',
      exercises: [
        { title: 'האם הגוף מתגלגל?', cols: 2, items: [rolls('sphere'), rolls('cube'), rolls('cylinder'), rolls('pyramid')] },
        { title: 'ספרו.', cols: 1, items: [count('כמה פאות יש לקובייה?', 6), count('כמה קודקודים יש לקובייה?', 8), count('כמה בסיסים עגולים יש לגליל?', 2), count('כמה פאות שטוחות יש לכדור?', 0)] },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf('לכדור אין קודקודים.', true), tf('לחרוט יש שני בסיסים עגולים.', false), tf('כל הפאות של קובייה הן ריבועים.', true)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'מה שם הגוף?', cols: 3, items: [nameIt('prism', 1), nameIt('sphere', 2), nameIt('cylinder', 4)] },
      { title: 'האם הגוף מתגלגל?', cols: 1, items: [rolls('cone')] },
      { title: 'ספרו.', cols: 1, items: [count('כמה פאות יש לתיבה?', 6)] },
    ],
  },
};
