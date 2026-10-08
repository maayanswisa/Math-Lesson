import { m, barChart, svgParts } from '../helpers.js';

const { svg, label, INK, SHADE } = svgParts;

const count = (data, v) => data.filter((x) => x === v).length;

/** השכיח — חייב להיות יחיד, אחרת השאלה לא הוגנת. */
function mode(data) {
  const values = [...new Set(data)];
  const best = Math.max(...values.map((v) => count(data, v)));
  const modes = values.filter((v) => count(data, v) === best);
  if (modes.length !== 1) throw new Error(`no single mode in ${data}`);
  return modes[0];
}

/** כל מספר — נוסחה נפרדת, כדי שרשימה ארוכה תישבר לשורות בטלפון. */
const list = (data) => data.map((x) => m`$${x}$`).join(',  ');

/** פיקטוגרם: כל שורה — תווית ומספר סמלים (אפשר חצאים). */
function pictogram(rows) {
  const W = 320;
  const rowH = 34;
  let body = '';
  rows.forEach(({ label: text, symbols }, r) => {
    const cy = 20 + r * rowH;
    body += label(W - 4, cy + 5, text, 'end');
    for (let i = 0; i < Math.ceil(symbols); i++) {
      const cx = 18 + i * 28;
      const half = symbols - i === 0.5;
      body += half
        ? `<path d="M ${cx},${cy - 11} A 11 11 0 0 0 ${cx},${cy + 11} Z" fill="${SHADE}" stroke="${INK}" stroke-width="1.3"/>`
        : `<circle cx="${cx}" cy="${cy}" r="11" fill="${SHADE}" stroke="${INK}" stroke-width="1.3"/>`;
    }
  });
  return svg(W, rows.length * rowH + 8, body);
}

/* ---------- נתונים ---------- */

const SHOES = [34, 35, 35, 36, 34, 35, 37, 35, 36, 35, 34, 36, 35, 37, 36];
const SPORTS = { כדורגל: 9, כדורסל: 6, שחייה: 4, טניס: 3 };
const sportsTable = `<table style="direction:rtl"><tr>${Object.keys(SPORTS).map((k) => `<th>${k}</th>`).join('')}</tr><tr>${Object.values(SPORTS)
  .map((v) => `<td>${v}</td>`)
  .join('')}</tr></table>`;
const sportNames = Object.keys(SPORTS);
const maxSport = sportNames.reduce((a, b) => (SPORTS[a] >= SPORTS[b] ? a : b));

const BOOKS = { דנה: 6, יואב: 9, נועה: 4, רון: 7 };
const bookNames = Object.keys(BOOKS);
const books = Object.values(BOOKS);

const APPLE = 4; // כל עיגול = 4 תפוחים
const PICKED = [
  { label: 'יום ראשון', symbols: 3 },
  { label: 'יום שני', symbols: 5 },
  { label: 'יום שלישי', symbols: 2.5 },
];

const QUIZ_DATA = [7, 9, 8, 9, 10, 9, 7, 8, 9, 6];

/** שכיחות יחסית באחוזים — חייבת לצאת שלמה. */
function pct(part, total) {
  const p = (part * 100) / total;
  if (!Number.isInteger(p)) throw new Error(`${part}/${total} is not a whole percent`);
  return p;
}

const TRIP = { ים: 10, הרים: 5, מדבר: 3, עיר: 2 };
const TRIP_TOTAL = Object.values(TRIP).reduce((a, b) => a + b, 0);
const tripTable = `<table style="direction:rtl"><tr>${Object.keys(TRIP).map((k) => `<th>${k}</th>`).join('')}</tr><tr>${Object.values(TRIP)
  .map((v) => `<td>${v}</td>`)
  .join('')}</tr></table>`;

/** באיזו קבוצה השכיחות היחסית גבוהה יותר? */
function whichGroup(q, [a, n], [b, k]) {
  const x = a / n;
  const y = b / k;
  return { q, options: ["ה'1", "ה'2", 'שוות'], answer: x === y ? 2 : x > y ? 0 : 1 };
}
const QUIZ_CHART = { 'כחול': 8, 'אדום': 5, 'ירוק': 10, 'צהוב': 3 };

export default {
  id: 'g5-data-frequency',
  grade: 5,
  emoji: '📊',
  title: 'שכיחות, שכיח וקריאת נתונים',
  reminder: [
    {
      title: 'שכיחות ושכיח',
      md: m`**שכיחות** — כמה פעמים ערך מופיע בנתונים.

**השכיח** — הערך שמופיע **הכי הרבה פעמים**. בנתונים $3, 5, 5, 2, 5$ השכיח הוא $5$ (מופיע $3$ פעמים).`,
    },
    {
      title: 'טבלת שכיחויות',
      md: m`מסדרים את הנתונים בטבלה: כל ערך ומספר הפעמים שהוא מופיע.

**בדיקה**: סכום השכיחויות = מספר כל הנתונים.`,
    },
    {
      title: 'דיאגרמת עמודות',
      md: m`גובה כל עמודה = הכמות. קוראים את הגובה מול **הציר** שבצד.

העמודה הגבוהה ביותר — הכמות הגדולה ביותר.`,
    },
    {
      title: 'שכיחות יחסית',
      md: m`איזה **חלק** מכל הנתונים: השכיחות **חלקי** מספר כל הנתונים — כשבר או כאחוז.

$8$ מתוך $20$: $\;\frac{8}{20} = \frac{2}{5} = 40\%$. סכום כל השכיחויות היחסיות: $100\%$.`,
    },
    {
      title: 'פיקטוגרמה',
      md: m`כל סמל מייצג **כמות קבועה** (כתוב במקרא). חצי סמל = חצי מהכמות.

אם כל סמל = $4$, אז $2$ וחצי סמלים $= 4 + 4 + 2 = 10$.`,
    },
  ],
  pages: [
    {
      title: 'טבלת שכיחויות, שכיח ושכיחות יחסית',
      exercises: [
        {
          title: m`אלה מידות הנעליים של $${SHOES.length}$ ילדים בכיתה. השלימו את טבלת השכיחויות.`,
          figure: list(SHOES),
          cols: 2,
          items: [
            ...[34, 35, 36, 37].map((v) => ({ q: m`מידה $${v}$: [[${count(SHOES, v)}]] ילדים` })),
            { q: m`בסך הכול: [[${SHOES.length}]] ילדים` },
            { q: m`השכיח (המידה הנפוצה ביותר): [[${mode(SHOES)}]]` },
            { q: m`השכיחות היחסית של המידה השכיחה: [[f:${count(SHOES, mode(SHOES))}/${SHOES.length}]]` },
          ],
        },
        {
          title: 'מה השכיח?',
          cols: 2,
          items: [
            [3, 5, 5, 2, 5, 3],
            [7, 8, 8, 9, 7, 8, 6],
            [12, 15, 12, 18, 15, 15, 20],
            [1, 1, 2, 3, 2, 1, 4, 1],
          ].map((d) => ({ q: m`${list(d)} $\;\to\;$ השכיח: [[${mode(d)}]]` })),
        },
        {
          title: 'תלמידי הכיתה בחרו את ענף הספורט האהוב עליהם:',
          figure: sportsTable,
          cols: 1,
          items: [
            { q: 'כמה תלמידים ענו על השאלה?', a: m`[[${Object.values(SPORTS).reduce((a, b) => a + b, 0)}]] תלמידים` },
            { q: 'מה הענף השכיח?', options: sportNames, answer: sportNames.indexOf(maxSport) },
            { q: 'בכמה תלמידים יותר בחרו בכדורגל מאשר בטניס?', a: m`[[${SPORTS['כדורגל'] - SPORTS['טניס']}]] תלמידים` },
          ],
        },
      ],
    },
    {
      title: 'דיאגרמות, פיקטוגרמה ושכיחות יחסית',
      exercises: [
        {
          title: 'הדיאגרמה מראה כמה ספרים קרא כל ילד בחופשה.',
          figure: barChart({ labels: bookNames, values: books, step: 1 }),
          cols: 1,
          items: [
            { q: 'כמה ספרים קרא יואב?', a: m`[[${BOOKS['יואב']}]] ספרים` },
            { q: 'מי קרא הכי מעט ספרים?', options: bookNames, answer: books.indexOf(Math.min(...books)) },
            { q: 'כמה ספרים קראו כל הילדים יחד?', a: m`[[${books.reduce((a, b) => a + b, 0)}]] ספרים` },
            { q: 'בכמה ספרים יותר קרא יואב מנועה?', a: m`[[${BOOKS['יואב'] - BOOKS['נועה']}]] ספרים` },
          ],
        },
        {
          title: m`הפיקטוגרמה מראה כמה תפוחים נקטפו בכל יום. כל עיגול מייצג $${APPLE}$ תפוחים.`,
          figure: pictogram(PICKED),
          cols: 1,
          items: [
            ...PICKED.map((r) => ({ q: `ב${r.label} נקטפו`, a: m`[[${r.symbols * APPLE}]] תפוחים` })),
            { q: 'כמה תפוחים נקטפו בשלושת הימים יחד?', a: m`[[${PICKED.reduce((s, r) => s + r.symbols * APPLE, 0)}]] תפוחים` },
          ],
        },
        {
          title: m`שאלנו $${TRIP_TOTAL}$ ילדים לאן הם רוצים לצאת לטיול. השלימו את השכיחות היחסית — כשבר וכאחוז.`,
          figure: tripTable,
          cols: 1,
          items: [
            ...Object.entries(TRIP).map(([k, v]) => ({ q: m`${k}: [[f:${v}/${TRIP_TOTAL}]] $=$ [[${pct(v, TRIP_TOTAL)}]] $\%$` })),
            { q: m`סכום כל השכיחויות היחסיות: [[${Object.values(TRIP).reduce((s, v) => s + pct(v, TRIP_TOTAL), 0)}]] $\%$` },
          ],
        },
        {
          title: 'מהשכיחות היחסית לשכיחות, והשוואה בין קבוצות.',
          cols: 1,
          items: [
            { q: m`בכיתה $40$ תלמידים, ו-$25\%$ מהם הולכים ברגל לבית הספר. כמה תלמידים הולכים ברגל?`, a: m`[[${(40 * 25) / 100}]] תלמידים` },
            { q: m`$6$ תלמידים קיבלו $100$ במבחן, והשכיחות היחסית של הציון $100$ היא $\frac{1}{5}$. כמה תלמידים בכיתה?`, a: m`[[${6 * 5}]] תלמידים` },
            whichGroup(m`בכיתה ה'1 מנגנים $6$ מתוך $24$ תלמידים, ובכיתה ה'2 — $8$ מתוך $40$. באיזו כיתה השכיחות היחסית של המנגנים גבוהה יותר?`, [6, 24], [8, 40]),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      {
        title: m`ציוני $${QUIZ_DATA.length}$ תלמידים בבוחן:`,
        figure: list(QUIZ_DATA),
        cols: 2,
        items: [
          { q: m`כמה תלמידים קיבלו $9$? [[${count(QUIZ_DATA, 9)}]]` },
          { q: m`כמה תלמידים קיבלו $7$? [[${count(QUIZ_DATA, 7)}]]` },
          { q: m`השכיח: [[${mode(QUIZ_DATA)}]]` },
          { q: m`השכיחות היחסית של הציון $9$: [[${pct(count(QUIZ_DATA, 9), QUIZ_DATA.length)}]] $\%$` },
        ],
      },
      {
        title: 'הדיאגרמה מראה את הצבע האהוב על תלמידי הכיתה.',
        figure: barChart({ labels: Object.keys(QUIZ_CHART), values: Object.values(QUIZ_CHART), step: 1 }),
        cols: 1,
        items: [
          { q: 'כמה תלמידים בחרו בכחול?', a: m`[[${QUIZ_CHART['כחול']}]]` },
          {
            q: 'איזה צבע הוא השכיח?',
            options: Object.keys(QUIZ_CHART),
            answer: Object.values(QUIZ_CHART).indexOf(Math.max(...Object.values(QUIZ_CHART))),
          },
          { q: 'כמה תלמידים בכיתה?', a: m`[[${Object.values(QUIZ_CHART).reduce((a, b) => a + b, 0)}]]` },
        ],
      },
      {
        title: m`כל עיגול מייצג $10$ מבקרים בספרייה.`,
        figure: pictogram([{ label: 'יום ראשון', symbols: 4.5 }]),
        cols: 1,
        items: [{ q: 'כמה מבקרים היו ביום ראשון?', a: m`[[${4.5 * 10}]] מבקרים` }],
      },
    ],
  },
};
