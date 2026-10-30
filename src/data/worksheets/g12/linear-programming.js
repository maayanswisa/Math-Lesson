import { m, svgParts } from '../helpers.js';
import { tf } from './shared.js';

const { svg, label, INK, ACCENT, SHADE } = svgParts;

/** נגרייה: x + y ≤ 10, x + 2y ≤ 16, x, y ≥ 0 — הקודקודים של תחום הפתרונות. */
const VERTS = [
  [0, 0],
  [10, 0],
  [4, 6],
  [0, 8],
];
const inRegion = ([x, y]) => x >= 0 && y >= 0 && x + y <= 10 && x + 2 * y <= 16;

/** תחום הפתרונות של הנגרייה, עם הקודקודים מסומנים. */
const REGION_FIG = (() => {
  const S = 15;
  const X = (x) => 26 + x * S;
  const Y = (y) => 196 - y * S;
  let body = '';
  for (let k = 0; k <= 12; k++) {
    body += `<line x1="${X(k)}" y1="${Y(0)}" x2="${X(k)}" y2="${Y(12)}" stroke="#eef2f6"/><line x1="${X(0)}" y1="${Y(k)}" x2="${X(12)}" y2="${Y(k)}" stroke="#eef2f6"/>`;
  }
  body += `<polygon points="${VERTS.map(([x, y]) => `${X(x)},${Y(y)}`).join(' ')}" fill="${SHADE}" fill-opacity="0.6" stroke="${ACCENT}" stroke-width="2"/>`;
  body += `<line x1="${X(0)}" y1="${Y(10)}" x2="${X(10)}" y2="${Y(0)}" stroke="${INK}" stroke-width="1.2" stroke-dasharray="4 3"/>`;
  body += `<line x1="${X(0)}" y1="${Y(8)}" x2="${X(12)}" y2="${Y(2)}" stroke="${INK}" stroke-width="1.2" stroke-dasharray="4 3"/>`;
  body += `<line x1="${X(0)}" y1="${Y(0)}" x2="${X(12.4)}" y2="${Y(0)}" stroke="${INK}" stroke-width="1.5"/><line x1="${X(0)}" y1="${Y(0)}" x2="${X(0)}" y2="${Y(12.4)}" stroke="${INK}" stroke-width="1.5"/>`;
  body += `<text x="${X(12.4)}" y="${Y(0) + 14}" font-size="12" font-style="italic" fill="${INK}">x</text><text x="${X(0) - 12}" y="${Y(12.2)}" font-size="12" font-style="italic" fill="${INK}">y</text>`;
  for (const [x, y] of VERTS) body += `<circle cx="${X(x)}" cy="${Y(y)}" r="3.4" fill="${INK}"/>` + label(X(x) + 5, Y(y) - 6, `(${x},${y})`, 'start');
  return svg(240, 220, body);
})();

const intersect = (q, [x, y]) => ({ q, a: m`$x =$ [[${x}]] $\qquad y =$ [[${y}]]` });

/** הערך המקסימלי של פונקציית המטרה בקודקודי הנגרייה. */
const maxAt = (a, b) => {
  const best = Math.max(...VERTS.map(([x, y]) => a * x + b * y));
  return { q: m`$P=${a === 1 ? '' : a}x+${b === 1 ? '' : b}y$`, a: m`הערך המקסימלי: [[${best}]]` };
};

const inside = (pt) => ({ q: m`הנקודה $(${pt[0]},${pt[1]})$`, options: ['בתחום', 'לא בתחום'], answer: inRegion(pt) ? 0 : 1 });

export default {
  id: 'g12-u3-linear-programming',
  grade: 12,
  emoji: '🏭',
  title: 'תכנון לינארי',
  reminder: [
    {
      title: 'מילים ← סימנים',
      md: m`"לכל היותר" ← $\le$

"לפחות" ← $\ge$

כמויות: $x\ge0$ וגם $y\ge0$`,
    },
    {
      title: 'הכלל',
      md: 'הערך הגדול ביותר — או הקטן ביותר — של פונקציית המטרה מתקבל בקודקוד של תחום הפתרונות. מציבים את כל הקודקודים ובוחרים.',
    },
    {
      title: 'קודקוד — חיתוך של שני ישרים',
      wide: true,
      md: m`פותרים מערכת של שתי משוואות. למשל $x+y=10$ ו-$x+2y=16$: מחסרים ומקבלים $y=6$, ואז $x=4$.`,
    },
  ],
  pages: [
    {
      title: 'אילוצים וקודקודים',
      exercises: [
        {
          title: m`$x$ — שולחנות, $y$ — כיסאות. איזה אי-שוויון מתאים?`,
          cols: 1,
          items: [
            { q: 'מייצרים לפחות 3 כיסאות.', options: [m`$y\ge3$`, m`$y\le3$`, m`$x\ge3$`], answer: 0 },
            { q: 'בסך הכול לכל היותר 10 רהיטים.', options: [m`$x+y\le10$`, m`$x+y\ge10$`, m`$x\le10$`], answer: 0 },
            { q: 'מספר השולחנות לא עולה על פי 2 ממספר הכיסאות.', options: [m`$x\le2y$`, m`$y\le2x$`, m`$x\ge2y$`], answer: 0 },
          ],
        },
        {
          title: m`נגרייה: $x+y\le10$, $\;x+2y\le16$, $\;x\ge0$, $\;y\ge0$. האם הנקודה בתחום הפתרונות?`,
          figure: `<div class="diagram-box">${REGION_FIG}</div>`,
          cols: 2,
          items: [inside([5, 4]), inside([8, 4]), inside([0, 8]), inside([6, 5])],
        },
        {
          title: 'מצאו את נקודת החיתוך.',
          cols: 1,
          items: [
            intersect(m`$x+y=10$ $\quad$ $x+2y=16$`, [4, 6]),
            intersect(m`$x+y=8$ $\quad$ $2x+y=12$`, [4, 4]),
            intersect(m`$2x+y=20$ $\quad$ $x+y=14$`, [6, 8]),
            intersect(m`$x+3y=15$ $\quad$ $x+y=7$`, [3, 4]),
          ],
        },
      ],
    },
    {
      title: 'פונקציית המטרה',
      exercises: [
        {
          title: m`בתחום של הנגרייה, הקודקודים $(0,0)$, $(10,0)$, $(4,6)$, $(0,8)$. מצאו את הערך המקסימלי.`,
          cols: 2,
          items: [maxAt(3, 4), maxAt(5, 2), maxAt(1, 3), maxAt(2, 2)],
        },
        {
          title: 'בעיות.',
          cols: 1,
          items: [
            {
              q: m`מאפייה: עוגה מרוויחה $30$ ₪ ופשטידה $20$ ₪. אילוצים: $2x+y\le20$ (שעות תנור), $x+y\le14$ (קמח), $x,y\ge0$. כמה מכל אחת כדאי לאפות?`,
              a: m`עוגות: [[6]] $\qquad$ פשטידות: [[8]] $\qquad$ הרווח (₪): [[340]]`,
            },
            {
              q: m`הסעה: $x+y\ge6$, $\;x\le5$, $\;y\le4$. העלות (אלפי ₪): $C=2x+3y$. הקודקודים: $(2,4)$, $(5,1)$, $(5,4)$.`,
              a: m`העלות המינימלית: [[13]] $\qquad$ מספר האוטובוסים הגדולים: [[5]]`,
            },
          ],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf('הערך המקסימלי של פונקציית המטרה יכול להתקבל בנקודה שבתוך התחום ולא בקודקוד.', false),
            tf('נקודה שמקיימת רק חלק מהאילוצים אינה בתחום הפתרונות.', true),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'מצאו את נקודת החיתוך.', cols: 1, items: [intersect(m`$x+y=9$ $\quad$ $x+2y=13$`, [5, 4])] },
      { title: 'בתחום של הנגרייה — מה הערך המקסימלי?', cols: 2, items: [maxAt(4, 3), maxAt(1, 2)] },
      {
        title: 'בעיה.',
        cols: 1,
        items: [
          {
            q: m`רווח: $P=40x+30y$. אילוצים: $x+y\le8$, $\;2x+y\le12$, $\;x,y\ge0$. הקודקודים: $(0,0)$, $(6,0)$, $(4,4)$, $(0,8)$.`,
            a: m`הרווח המקסימלי: [[280]]`,
          },
        ],
      },
    ],
  },
};
