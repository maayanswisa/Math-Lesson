import { m, lin, coordPlane } from '../helpers.js';

const KINDS = ['פתרון יחיד', 'אין פתרון', 'אינסוף פתרונות'];
const kindOf = ([m1, b1], [m2, b2]) => (m1 !== m2 ? 0 : b1 !== b2 ? 1 : 2);

/** שני ישרים בצורה y = mx + b. */
const pair = (l1, l2) => ({ q: m`$y = ${lin(...l1)}$ $\quad$ ו- $\quad y = ${lin(...l2)}$`, options: KINDS, answer: kindOf(l1, l2) });

/** מערכת בצורה ax + by = c: מעבירים ל-y = mx + b כדי לסווג. */
function standard([a1, b1, c1], [a2, b2, c2]) {
  const toLine = (a, b, c) => [-a / b, c / b];
  const row = (a, b, c) => `${a === 1 ? '' : a}x ${b < 0 ? '-' : '+'} ${Math.abs(b) === 1 ? '' : Math.abs(b)}y &= ${c}`;
  return {
    q: m`$\begin{cases} ${row(a1, b1, c1)} \\ ${row(a2, b2, c2)} \end{cases}$`,
    options: KINDS,
    answer: kindOf(toLine(a1, b1, c1), toLine(a2, b2, c2)),
  };
}

const graphPair = (l1, l2) => ({
  q: '',
  figure: coordPlane({ lines: [{ m: l1[0], b: l1[1] }, { m: l2[0], b: l2[1] }] }),
  options: KINDS,
  answer: kindOf(l1, l2),
});

export default {
  id: 'g8-system-solutions',
  grade: 8,
  emoji: '🔀',
  title: 'מספר הפתרונות של מערכת משוואות',
  reminder: [
    {
      title: 'לפי השיפועים',
      md: m`- **שיפועים שונים** ← הישרים נחתכים ← **פתרון יחיד**
- **אותו שיפוע, $b$ שונה** ← ישרים מקבילים ← **אין פתרון**
- **אותו שיפוע ואותו $b$** ← אותו ישר ← **אינסוף פתרונות**`,
    },
    {
      title: 'לפי הפתרון האלגברי',
      md: m`כשפותרים ו-$x$ "נעלם":

$0 = 5$ (פסוק **שקר**) ← **אין פתרון**
$0 = 0$ (פסוק **אמת**) ← **אינסוף פתרונות**`,
    },
    {
      title: 'מצורה רגילה לצורת שיפוע',
      wide: true,
      md: m`מבודדים את $y$: $\;2x + 4y = 6 \Rightarrow 4y = -2x + 6 \Rightarrow y = -\frac{1}{2}x + \frac{3}{2}$`,
    },
  ],
  pages: [
    {
      title: 'סיווג לפי שיפוע ו-b',
      exercises: [
        {
          title: 'כמה פתרונות יש למערכת?',
          cols: 1,
          items: [pair([2, 1], [-1, 4]), pair([3, 1], [3, -2]), pair([-2, 5], [-2, 5]), pair([0.5, 1], [2, 1]), pair([4, 0], [4, 7])],
        },
        {
          title: 'כמה פתרונות יש למערכת? (קודם בודדו את $y$)',
          cols: 1,
          items: [standard([2, 4, 6], [1, 2, 3]), standard([1, 1, 5], [1, 1, 8]), standard([1, 1, 4], [1, -1, 2]), standard([3, -1, 2], [6, -2, 4])],
        },
        {
          title: 'פתרו ובחרו.',
          cols: 1,
          items: [
            { q: m`פתרנו מערכת והגענו ל-$0 = 7$.`, options: KINDS, answer: 1 },
            { q: m`פתרנו מערכת והגענו ל-$0 = 0$.`, options: KINDS, answer: 2 },
            { q: m`פתרנו מערכת והגענו ל-$x = 0$.`, options: KINDS, answer: 0 },
          ],
        },
      ],
    },
    {
      title: 'גרפים ופרמטרים',
      exercises: [
        {
          title: 'כמה פתרונות יש למערכת לפי הגרף?',
          cols: 3,
          items: [graphPair([1, 2], [1, -2]), graphPair([2, -1], [-1, 2]), graphPair([-0.5, 3], [-0.5, 3])],
        },
        {
          title: 'מצאו את המספר החסר.',
          cols: 1,
          items: [
            { q: m`$y = ax + 1$ ו-$y = 3x + 5$ — אין פתרון. $\quad a =$ [[3]]` },
            { q: m`$y = 2x + b$ ו-$y = 2x + 4$ — אינסוף פתרונות. $\quad b =$ [[4]]` },
            { q: m`$y = -x + 6$ ו-$y = ax - 2$ — אין פתרון. $\quad a =$ [[-1]]` },
          ],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            { q: 'לשני ישרים עם שיפועים שונים יש תמיד נקודת חיתוך אחת.', options: ['נכון', 'לא נכון'], answer: 0 },
            { q: 'לשני ישרים מקבילים ושונים יש אינסוף נקודות משותפות.', options: ['נכון', 'לא נכון'], answer: 1 },
            { q: 'אם שתי המשוואות מתארות את אותו ישר — כל נקודה על הישר היא פתרון של המערכת.', options: ['נכון', 'לא נכון'], answer: 0 },
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'כמה פתרונות יש למערכת?', cols: 1, items: [pair([-3, 2], [-3, 2]), pair([1, 4], [-1, 4]), pair([0.5, -1], [0.5, 3])] },
      { title: 'כמה פתרונות יש למערכת?', cols: 1, items: [standard([4, 2, 8], [2, 1, 3])] },
      { title: 'לפי הגרף.', cols: 1, items: [graphPair([-1, 3], [-1, -1])] },
      { title: 'מצאו את המספר החסר.', cols: 1, items: [{ q: m`$y = 5x + b$ ו-$y = 5x - 2$ — אינסוף פתרונות. $\quad b =$ [[-2]]` }] },
    ],
  },
};
