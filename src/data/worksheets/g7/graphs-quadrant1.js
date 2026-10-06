import { m, coordPlane } from '../helpers.js';
import { tf } from './shared.js';

const PTS = [{ x: 2, y: 5, label: 'A' }, { x: 6, y: 1, label: 'B' }, { x: 0, y: 3, label: 'C' }, { x: 4, y: 0, label: 'D' }, { x: 7, y: 7, label: 'E' }];
const read = (p) => ({ q: m`$${p.label}($ [[${p.x}]] $,$ [[${p.y}]] $)$` });

/** טבלת ערכים לפי כלל: y = a·x + b. */
const rule = (a, b, xs) => ({
  q: m`$y = ${a === 1 ? '' : a}x${b ? ` + ${b}` : ''}$: ` + xs.map((x) => m`$x = ${x} \to y =$ [[${a * x + b}]]`).join(' $\\;$ '),
});

/** איזו נקודה על הגרף של y = a·x + b? */
function onGraph(a, b, candidates) {
  const hits = candidates.filter(([x, y]) => a * x + b === y);
  if (hits.length !== 1) throw new Error('exactly one point must be on the line');
  return {
    q: m`איזו נקודה נמצאת על הגרף של $y = ${a === 1 ? '' : a}x${b ? ` + ${b}` : ''}$?`,
    options: candidates.map(([x, y]) => m`$(${x}, ${y})$`),
    answer: candidates.indexOf(hits[0]),
  };
}

/* ---------- גרף של מסע: מרחק לפי זמן ---------- */
const TRIP = coordPlane({ min: 0, max: 10, lines: [{ m: 2, b: 0 }], points: [{ x: 1, y: 2 }, { x: 2, y: 4 }, { x: 3, y: 6 }, { x: 4, y: 8 }] });

export default {
  id: 'g7-graphs-quadrant1',
  grade: 7,
  emoji: '📈',
  title: 'נקודות וגרפים ברביע הראשון',
  reminder: [
    {
      title: 'קריאת נקודה',
      md: m`$(x, y)$: מהראשית — $x$ צעדים **ימינה**, ואז $y$ צעדים **למעלה**. נקודה על ציר $x$: $(4, 0)$; על ציר $y$: $(0, 3)$.`,
    },
    {
      title: 'מטבלה לגרף',
      md: m`<table><tr><th>x</th><td>0</td><td>1</td><td>2</td><td>3</td></tr><tr><th>y</th><td>1</td><td>3</td><td>5</td><td>7</td></tr></table>

כל עמודה בטבלה היא נקודה: $(0, 1), (1, 3), (2, 5), (3, 7)$ — וכאן הן על **קו ישר** ($y = 2x + 1$).`,
    },
  ],
  pages: [
    {
      title: 'קריאת נקודות',
      exercises: [
        { title: 'מה השיעורים?', cols: 2, figure: coordPlane({ min: 0, max: 8, points: PTS }), items: PTS.map(read) },
        {
          title: 'בחרו.',
          cols: 1,
          items: [
            { q: m`איזו נקודה נמצאת על ציר $x$?`, options: [m`$(0, 5)$`, m`$(5, 0)$`, m`$(5, 5)$`], answer: 1 },
            { q: m`איזו נקודה הכי גבוהה?`, options: [m`$(8, 2)$`, m`$(1, 6)$`, m`$(5, 5)$`], answer: 1 },
          ],
        },
      ],
    },
    {
      title: 'טבלה וגרף',
      exercises: [
        { title: 'השלימו את הטבלה.', cols: 1, items: [rule(2, 1, [0, 1, 2, 3]), rule(3, 0, [1, 2, 4]), rule(1, 4, [0, 2, 5])] },
        { title: 'איזו נקודה על הגרף?', cols: 1, items: [onGraph(2, 1, [[1, 4], [2, 5], [3, 6]]), onGraph(3, 0, [[2, 5], [3, 9], [1, 4]])] },
        {
          title: 'אופניים: הגרף מראה את המרחק (ק״מ) לפי הזמן (שעות).',
          cols: 1,
          figure: TRIP,
          items: [
            { q: 'כמה ק״מ עברו אחרי 3 שעות?', a: '[[6]]' },
            { q: 'אחרי כמה שעות עברו 8 ק״מ?', a: '[[4]]' },
            { q: 'כמה ק״מ עוברים בכל שעה?', a: '[[2]]' },
          ],
        },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf(m`$(3, 5)$ ו-$(5, 3)$ הן אותה נקודה.`, false), tf(m`הראשית היא הנקודה $(0, 0)$.`, true)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'מה השיעורים?', cols: 2, figure: coordPlane({ min: 0, max: 8, points: [{ x: 3, y: 6, label: 'P' }, { x: 5, y: 0, label: 'Q' }] }), items: [read({ x: 3, y: 6, label: 'P' }), read({ x: 5, y: 0, label: 'Q' })] },
      { title: 'טבלה.', cols: 1, items: [rule(2, 3, [0, 2, 4])] },
      { title: 'איזו נקודה על הגרף?', cols: 1, items: [onGraph(1, 4, [[1, 4], [2, 6], [3, 8]])] },
    ],
  },
};
