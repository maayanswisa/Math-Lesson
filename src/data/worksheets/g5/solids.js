import { m, svgParts } from '../helpers.js';

const { svg, INK, SHADE } = svgParts;

const BASE = { 3: 'משולשת', 4: 'מרובעת', 5: 'מחומשת', 6: 'משושה', 8: 'מתומנת' };

const prism = (n) => ({ faces: n + 2, edges: 3 * n, vertices: 2 * n });
const pyramid = (n) => ({ faces: n + 1, edges: 2 * n, vertices: n + 1 });

const countItem = (kind, n) => {
  const c = kind === 'מנסרה' ? prism(n) : pyramid(n);
  return { q: m`**${kind} ${BASE[n]}**`, a: m`פאות: [[${c.faces}]] · מקצועות: [[${c.edges}]] · קודקודים: [[${c.vertices}]]` };
};

const TF = ['נכון', 'לא נכון'];
const tf = (q, truth) => ({ q, options: TF, answer: truth ? 0 : 1 });

/** מכמות מקצועות/קודקודים/פאות → כמה צלעות לבסיס. */
function baseSides(kind, what, count) {
  const f = kind === 'מנסרה' ? prism : pyramid;
  const n = [3, 4, 5, 6, 7, 8, 9, 10].find((k) => f(k)[what] === count);
  if (!n) throw new Error(`no ${kind} with ${count} ${what}`);
  const WORD = { edges: 'מקצועות', vertices: 'קודקודים', faces: 'פאות' };
  return { q: m`ל${kind} יש $${count}$ ${WORD[what]}. כמה צלעות יש למצולע שבבסיס שלה?`, a: `[[${n}]] צלעות` };
}

/* ---------- שרטוטים ---------- */

const poly = (pts, fill = '#eaf4fd') =>
  `<polygon points="${pts.map((p) => p.join(',')).join(' ')}" fill="${fill}" stroke="${INK}" stroke-width="1.8"/>`;
const dashed = (a, b) => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${INK}" stroke-width="1.1" stroke-dasharray="4 3"/>`;

/** מנסרה משולשת ופירמידה מרובעת — לתזכורת. */
const SOLIDS_FIG = svg(
  300,
  130,
  // מנסרה משולשת (בסיסים משולשים מקדימה ומאחור)
  poly([[10, 110], [80, 110], [45, 50]]) +
    poly([[80, 110], [125, 85], [90, 25], [45, 50]], SHADE) +
    dashed([10, 110], [55, 85]) +
    dashed([55, 85], [125, 85]) +
    dashed([55, 85], [90, 25]) +
    `<line x1="45" y1="50" x2="90" y2="25" stroke="${INK}" stroke-width="1.8"/>` +
    // פירמידה מרובעת
    poly([[175, 110], [255, 110], [230, 15]]) +
    poly([[255, 110], [285, 88], [230, 15]], SHADE) +
    dashed([175, 110], [205, 88]) +
    dashed([205, 88], [285, 88]) +
    dashed([205, 88], [230, 15]),
);

const NET_PYRAMID = svg(
  190,
  190,
  poly([[65, 65], [125, 65], [125, 125], [65, 125]], SHADE) +
    poly([[65, 65], [125, 65], [95, 12]]) +
    poly([[125, 65], [125, 125], [178, 95]]) +
    poly([[125, 125], [65, 125], [95, 178]]) +
    poly([[65, 125], [65, 65], [12, 95]]),
);

const NET_PRISM = svg(
  170,
  190,
  poly([[10, 50], [60, 50], [60, 140], [10, 140]]) +
    poly([[60, 50], [110, 50], [110, 140], [60, 140]]) +
    poly([[110, 50], [160, 50], [160, 140], [110, 140]]) +
    poly([[60, 50], [110, 50], [85, 7]], SHADE) +
    poly([[60, 140], [110, 140], [85, 183]], SHADE),
);

const sq = (x, y, s = 40) => poly([[x, y], [x + s, y], [x + s, y + s], [x, y + s]]);
const NET_CUBE = svg(170, 130, sq(5, 45) + sq(45, 45) + sq(85, 45) + sq(125, 45) + sq(45, 5) + sq(45, 85));

const NET_OPTIONS = ['מנסרה משולשת', 'פירמידה מרובעת', 'קובייה'];

export default {
  id: 'g5-solids',
  grade: 5,
  emoji: '🔺',
  title: 'גופים: פירמידות ומנסרות ישרות',
  reminder: [
    {
      title: 'פאה, מקצוע, קודקוד',
      md: m`- **פאה** — משטח שטוח של הגוף
- **מקצוע** — קו שבו נפגשות שתי פאות
- **קודקוד** — נקודה שבה נפגשים מקצועות`,
    },
    {
      title: 'מנסרה ופירמידה',
      md: m`<div class="diagram-box">${SOLIDS_FIG}</div>

**מנסרה** — **שני** בסיסים זהים ומקבילים, ופאות צדדיות **מלבניות**.
**פירמידה** — בסיס **אחד**, ופאות צדדיות **משולשות** שנפגשות בקודקוד אחד (פסגה).`,
    },
    {
      title: 'סופרים בלי לטעות (לבסיס יש n צלעות)',
      wide: true,
      md: m`<table><tr><th></th><th>פאות</th><th>מקצועות</th><th>קודקודים</th></tr><tr><th>מנסרה</th><td>n + 2</td><td>3 × n</td><td>2 × n</td></tr><tr><th>פירמידה</th><td>n + 1</td><td>2 × n</td><td>n + 1</td></tr></table>

למשל, מנסרה משולשת ($n = 3$): $5$ פאות, $9$ מקצועות, $6$ קודקודים.`,
    },
  ],
  pages: [
    {
      title: 'מנסרות ופירמידות — ספירה',
      exercises: [
        { title: 'מנסרות: השלימו.', cols: 1, items: [3, 4, 5, 6].map((n) => countItem('מנסרה', n)) },
        { title: 'פירמידות: השלימו.', cols: 1, items: [3, 4, 5, 6].map((n) => countItem('פירמידה', n)) },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf('קובייה היא מנסרה מרובעת.', true),
            tf('לפירמידה יש שני בסיסים.', false),
            tf('הפאות הצדדיות של מנסרה ישרה הן מלבנים.', true),
            tf('הפאות הצדדיות של פירמידה הן משולשים.', true),
            tf('לכל פירמידה יש מספר זוגי של קודקודים.', false),
          ],
        },
      ],
    },
    {
      title: 'זיהוי גופים ופריסות',
      exercises: [
        {
          title: 'איזה גוף זה?',
          cols: 1,
          items: [
            {
              q: 'לגוף שני בסיסים בצורת משושה ו-6 פאות צדדיות מלבניות.',
              options: ['מנסרה משושה', 'פירמידה משושה', 'מנסרה מחומשת'],
              answer: 0,
            },
            {
              q: 'לגוף בסיס אחד בצורת מחומש ו-5 פאות צדדיות משולשות.',
              options: ['מנסרה מחומשת', 'פירמידה מרובעת', 'פירמידה מחומשת'],
              answer: 2,
            },
            {
              q: m`לגוף $6$ פאות, $12$ מקצועות ו-$8$ קודקודים.`,
              options: ['פירמידה מרובעת', 'מנסרה מרובעת', 'מנסרה משולשת'],
              answer: [
                pyramid(4),
                prism(4),
                prism(3),
              ].findIndex((c) => c.faces === 6 && c.edges === 12 && c.vertices === 8),
            },
          ],
        },
        {
          title: 'כמה צלעות יש למצולע שבבסיס?',
          cols: 1,
          items: [baseSides('מנסרה', 'edges', 15), baseSides('פירמידה', 'edges', 10), baseSides('מנסרה', 'vertices', 12), baseSides('פירמידה', 'vertices', 7)],
        },
        {
          title: 'פריסות: השלימו.',
          cols: 1,
          items: [
            { q: 'בפריסה של קובייה יש [[6]] ריבועים.' },
            { q: 'בפריסה של פירמידה מרובעת יש ריבוע אחד ו-[[4]] משולשים.' },
            { q: 'בפריסה של מנסרה משולשת יש [[2]] משולשים ו-[[3]] מלבנים.' },
            { q: 'בפריסה של פירמידה משולשת יש [[4]] משולשים.' },
          ],
        },
        {
          title: 'לאיזה גוף מתאימה הפריסה?',
          cols: 2,
          items: [
            { q: '', figure: NET_PYRAMID, options: NET_OPTIONS, answer: 1 },
            { q: '', figure: NET_PRISM, options: NET_OPTIONS, answer: 0 },
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'השלימו.', cols: 1, items: [countItem('מנסרה', 5), countItem('פירמידה', 4)] },
      {
        title: 'איזה גוף זה?',
        cols: 1,
        items: [
          {
            q: 'לגוף בסיס אחד בצורת משולש ושלוש פאות צדדיות משולשות.',
            options: ['מנסרה משולשת', 'פירמידה משולשת', 'פירמידה מרובעת'],
            answer: 1,
          },
        ],
      },
      { title: 'כמה צלעות יש למצולע שבבסיס?', cols: 1, items: [baseSides('מנסרה', 'edges', 18)] },
      { title: 'לאיזה גוף מתאימה הפריסה?', cols: 1, items: [{ q: '', figure: NET_CUBE, options: NET_OPTIONS, answer: 2 }] },
      {
        title: 'נכון או לא נכון?',
        cols: 1,
        items: [tf(m`למנסרה משושה יש $${prism(6).faces}$ פאות.`, true), tf(m`לפירמידה מרובעת יש $${pyramid(4).edges + 1}$ מקצועות.`, false)],
      },
    ],
  },
};
