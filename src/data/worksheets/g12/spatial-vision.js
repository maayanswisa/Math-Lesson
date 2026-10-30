import { m, svgParts } from '../helpers.js';
import { tf } from './shared.js';

const { svg, INK, ACCENT, SHADE } = svgParts;

/** מבט מלמעלה עם מספר הקומות בכל משבצת (0 — משבצת ריקה). */
function heightMap(rows) {
  const S = 30;
  let body = '';
  rows.forEach((row, r) =>
    row.forEach((v, c) => {
      if (!v) return;
      body += `<rect x="${4 + c * S}" y="${4 + r * S}" width="${S}" height="${S}" fill="${SHADE}" fill-opacity="0.5" stroke="${INK}" stroke-width="1.5"/>`;
      body += `<text x="${4 + c * S + S / 2}" y="${4 + r * S + S / 2 + 6}" text-anchor="middle" font-size="16" font-weight="700" fill="${INK}">${v}</text>`;
    }),
  );
  return `<div class="diagram-box">${svg(rows[0].length * S + 8, rows.length * S + 8, body)}</div>`;
}

const countItem = (rows) => ({ q: 'מכמה קוביות בנוי המבנה?', figure: heightMap(rows), a: m`מספר הקוביות: [[${rows.flat().reduce((a, b) => a + b, 0)}]]` });

/** פריסה על משבצות: cells — [[עמודה, שורה]]. */
function netFig(cells) {
  const S = 22;
  const cols = Math.max(...cells.map((p) => p[0])) + 1;
  const rows = Math.max(...cells.map((p) => p[1])) + 1;
  const body = cells.map(([x, y]) => `<rect x="${3 + x * S}" y="${3 + y * S}" width="${S}" height="${S}" fill="${SHADE}" fill-opacity="0.45" stroke="${ACCENT}" stroke-width="1.6"/>`).join('');
  return `<div class="diagram-box">${svg(cols * S + 6, rows * S + 6, body)}</div>`;
}

const netItem = (cells, isNet) => ({ q: 'האם זו פריסה של קובייה?', figure: netFig(cells), options: ['כן', 'לא'], answer: isNet ? 0 : 1 });

/** קובייה n×n×n שנצבעה מבחוץ — כמה קוביות קטנות עם k פאות צבועות. */
const painted = (n) => ({ three: 8, two: 12 * (n - 2), one: 6 * (n - 2) ** 2, zero: (n - 2) ** 3 });
const paintItem = (n) => {
  const p = painted(n);
  return {
    q: m`קובייה של $${n}\times${n}\times${n}$ קוביות קטנות נצבעה מבחוץ.`,
    a: m`שלוש פאות צבועות: [[${p.three}]] $\qquad$ שתיים: [[${p.two}]] $\qquad$ אחת: [[${p.one}]] $\qquad$ בלי צבע: [[${p.zero}]]`,
  };
};

const solidCount = (name, F, V, E) => ({ q: name, a: m`פאות: [[${F}]] $\qquad$ קודקודים: [[${V}]] $\qquad$ מקצועות: [[${E}]]` });

export default {
  id: 'g12-u3-spatial-vision',
  grade: 12,
  emoji: '🧱',
  title: 'ראייה מרחבית',
  reminder: [
    {
      title: 'מבטים וספירה',
      md: m`מלפנים ומהצד — הגובה הגדול ביותר בכל טור. מלמעלה — איפה יש קוביות.

מספר הקוביות $=$ סכום המספרים במבט מלמעלה.`,
    },
    {
      title: 'צביעת קובייה',
      md: m`קובייה של $n\times n\times n$:

$8$ פינות — $3$ פאות צבועות

$12(n-2)$ — שתי פאות. $\;6(n-2)^2$ — פאה אחת. $\;(n-2)^3$ — בלי צבע.`,
    },
    {
      title: 'פריסות וכלל אוילר',
      wide: true,
      md: m`לקובייה $11$ פריסות. בפריסה, פאות נגדיות לא נוגעות זו בזו, ואין ריבוע של $2\times2$.

פאות $+$ קודקודים $-$ מקצועות $=$ $2$`,
    },
  ],
  pages: [
    {
      title: 'מבטים, ספירה וצביעה',
      exercises: [
        {
          title: 'במבט מלמעלה כתוב בכל משבצת כמה קומות יש בה.',
          cols: 3,
          items: [
            countItem([
              [2, 3, 1],
              [1, 1, 0],
              [1, 0, 0],
            ]),
            countItem([
              [3, 2],
              [2, 1],
            ]),
            countItem([
              [1, 2, 3, 2],
              [0, 1, 2, 1],
            ]),
          ],
        },
        {
          title: 'מבטים.',
          cols: 1,
          items: [
            { q: 'מאיזה מבט רואים את השטח שהמבנה תופס על הרצפה?', options: ['מלמעלה', 'מלפנים', 'מהצד'], answer: 0 },
            { q: 'במבט מלפנים רואים בכל טור…', options: ['את הגובה הגדול ביותר בטור', 'את מספר הקוביות בטור', 'את הגובה הקטן ביותר בטור'], answer: 0 },
          ],
        },
        { title: 'צובעים קובייה גדולה.', cols: 1, items: [paintItem(3), paintItem(4)] },
        {
          title: 'קוביות בתוך תיבה.',
          cols: 1,
          items: [
            { q: m`תיבה בנויה מקוביות קטנות: $5$ באורך, $4$ ברוחב ו-$3$ בגובה.`, a: m`כל הקוביות: [[60]] $\qquad$ קוביות שלא נוגעות בחוץ: [[6]]` },
            { q: m`קובייה גדולה בנויה מ-$5\times5\times5$ קוביות קטנות.`, a: m`קוביות שלא נוגעות בחוץ: [[27]]` },
          ],
        },
      ],
    },
    {
      title: 'פריסות, פאות ומקצועות',
      exercises: [
        {
          title: 'האם זו פריסה של קובייה?',
          cols: 3,
          items: [
            netItem(
              [
                [1, 0],
                [0, 1],
                [1, 1],
                [2, 1],
                [1, 2],
                [1, 3],
              ],
              true,
            ),
            netItem(
              [
                [0, 0],
                [1, 0],
                [0, 1],
                [1, 1],
                [2, 1],
                [3, 1],
              ],
              false,
            ),
            netItem(
              [
                [0, 0],
                [0, 1],
                [1, 1],
                [2, 1],
                [3, 1],
                [3, 2],
              ],
              true,
            ),
            netItem(
              [
                [0, 0],
                [1, 0],
                [2, 0],
                [3, 0],
                [4, 0],
                [2, 1],
              ],
              false,
            ),
            netItem(
              [
                [0, 0],
                [1, 0],
                [1, 1],
                [2, 1],
                [2, 2],
                [3, 2],
              ],
              true,
            ),
            netItem(
              [
                [1, 0],
                [0, 1],
                [1, 1],
                [2, 1],
                [3, 1],
                [1, 2],
              ],
              true,
            ),
          ],
        },
        {
          title: 'כמה פאות, קודקודים ומקצועות?',
          cols: 1,
          items: [solidCount('קובייה', 6, 8, 12), solidCount('מנסרה משולשת', 5, 6, 9), solidCount('פירמידה ריבועית', 5, 5, 8), solidCount('מנסרה שהבסיס שלה מחומש', 7, 10, 15)],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [tf('בפריסה של קובייה, פאות נגדיות יכולות לגעת זו בזו.', false), tf('לכל קובייה יש 12 מקצועות.', true)],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      {
        title: 'מכמה קוביות בנוי המבנה?',
        cols: 3,
        items: [
          countItem([
            [2, 2, 1],
            [3, 1, 0],
          ]),
        ],
      },
      { title: 'צובעים קובייה גדולה.', cols: 1, items: [paintItem(5)] },
      { title: 'כמה פאות, קודקודים ומקצועות?', cols: 1, items: [solidCount('פירמידה שהבסיס שלה משושה', 7, 7, 12)] },
    ],
  },
};
