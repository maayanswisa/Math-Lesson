import { m, fr, round, cmp, reduce, grid100 } from '../helpers.js';

const shadedPct = (n) => ({ q: '', figure: grid100(n), a: m`[[${n}]] $\%$` });

/** p% = p/100 = עשרוני */
const pctToFracDec = (p) => ({ q: m`$${p}\% =$ [[fx:${p}/{100}]] $=$ [[${round(p / 100)}]]` });

/** p% כשבר מצומצם */
function pctToReduced(p) {
  const [n, d] = reduce(p, 100);
  return { q: m`$${p}\% =$ [[fx:${n}/${d}]]` };
}

/** עשרוני או שבר → אחוזים */
const decToPct = (s) => ({ q: m`$${s} =$ [[${round(Number(s) * 100)}]] $\%$` });
const fracToPct = (n, d) => ({ q: m`$${fr(n, d)} =$ [[${round((n / d) * 100)}]] $\%$` });

function pctOf(p, q) {
  const ans = round((p * q) / 100);
  if (!Number.isInteger(ans)) throw new Error(`${p}% of ${q} is not whole`);
  return { q: m`$${p}\%$ מ-$${q}$ הם [[${ans}]]` };
}

const complete = (p) => ({ q: m`$${p}\% +$ [[${100 - p}]] $\% = 100\%$` });

/** השוואה בין ייצוגים: כל צד הוא [טקסט LaTeX, ערך]. */
const compare = ([ta, va], [tb, vb]) => ({ q: m`$${ta}$ [[c:${cmp(va, vb)}]] $${tb}$` });
const pct = (p) => [m`${p}\%`, p / 100];
const frac = (n, d) => [fr(n, d), n / d];
const dec = (s) => [s, Number(s)];

export default {
  id: 'g5-percent-intro',
  grade: 5,
  emoji: '💯',
  title: 'אחוזים — היכרות ראשונה',
  reminder: [
    {
      title: 'מה זה אחוז?',
      md: m`**אחוז** הוא חלק אחד ממאה: $1\% = ${fr(1, 100)} = 0.01$

$37\% = ${fr(37, 100)} = 0.37$ · $100\%$ = **השלם כולו**`,
    },
    {
      title: 'אחוזים "ידידותיים"',
      md: m`$50\% = ${fr(1, 2)}$ · $25\% = ${fr(1, 4)}$ · $75\% = ${fr(3, 4)}$

$10\% = ${fr(1, 10)}$ · $20\% = ${fr(1, 5)}$`,
    },
    {
      title: 'אחוז מכמות',
      md: m`$10\%$ מ-$80$: מחלקים ב-$10$ ← $8$. ואז $30\%$ מ-$80$ = $3 \times 8 = 24$.

$25\%$ מ-$80$ = רבע מ-$80$ = $80 : 4 = 20$.`,
    },
    {
      title: 'מעשרוני לאחוזים',
      md: m`כופלים ב-$100$: $0.45 = 45\%$ · $0.3 = 30\%$ · $0.06 = 6\%$

משבר: מרחיבים למכנה $100$: $${fr(3, 4)} = ${fr(75, 100)} = 75\%$`,
    },
  ],
  pages: [
    {
      title: 'אחוזים, שברים ושברים עשרוניים',
      exercises: [
        {
          title: 'איזה אחוז מהריבוע צבוע? (בריבוע יש $100$ משבצות)',
          cols: 2,
          items: [shadedPct(37), shadedPct(50), shadedPct(8), shadedPct(75)],
        },
        {
          title: 'כתבו כשבר עם מכנה $100$ וכשבר עשרוני.',
          cols: 2,
          items: [pctToFracDec(37), pctToFracDec(9), pctToFracDec(81), pctToFracDec(5)],
        },
        {
          title: 'כתבו כשבר פשוט מצומצם.',
          cols: 3,
          items: [50, 25, 75, 10, 20, 40].map(pctToReduced),
        },
        {
          title: 'כתבו באחוזים.',
          cols: 3,
          items: [decToPct('0.45'), decToPct('0.3'), fracToPct(3, 4), fracToPct(1, 5), fracToPct(7, 10), decToPct('0.06')],
        },
      ],
    },
    {
      title: 'חישוב אחוזים מכמות',
      exercises: [
        {
          title: 'חשבו.',
          cols: 2,
          items: [pctOf(10, 80), pctOf(50, 64), pctOf(25, 40), pctOf(75, 20), pctOf(20, 45), pctOf(1, 300), pctOf(30, 70), pctOf(100, 56)],
        },
        {
          title: 'כמה חסר ל-$100\%$?',
          cols: 2,
          items: [complete(35), complete(72), complete(8), complete(50)],
        },
        {
          title: 'השוו: בחרו $<$, $=$ או $>$.',
          cols: 3,
          items: [
            compare(pct(25), frac(1, 4)),
            compare(dec('0.3'), pct(3)),
            compare(frac(1, 2), pct(45)),
            compare(dec('0.07'), pct(70)),
            compare(frac(3, 5), pct(60)),
            compare(pct(20), dec('0.25')),
          ],
        },
        {
          title: 'שאלות מילוליות.',
          cols: 1,
          items: [
            { q: m`חולצה עולה $120$ ש״ח, ויש עליה הנחה של $25\%$. כמה ש״ח ההנחה?`, a: m`[[${(120 * 25) / 100}]] ש״ח` },
            { q: m`חולצה עולה $120$ ש״ח, ויש עליה הנחה של $25\%$. כמה עולה החולצה אחרי ההנחה?`, a: m`[[${120 - (120 * 25) / 100}]] ש״ח` },
            { q: m`בבית הספר $600$ תלמידים, ו-$10\%$ מהם מגיעים באופניים. כמה תלמידים מגיעים באופניים?`, a: m`[[${(600 * 10) / 100}]] תלמידים` },
            { q: m`בכיתה $25$ תלמידים, ו-$20$ מהם הגישו שיעורי בית. כמה אחוזים מהתלמידים הגישו?`, a: m`[[${(20 / 25) * 100}]] $\%$` },
            { q: m`בכיתה $40\%$ בנים. כמה אחוזים בנות?`, a: m`[[60]] $\%$` },
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'איזה אחוז מהריבוע צבוע?', cols: 1, items: [shadedPct(64)] },
      { title: 'כתבו כשבר עם מכנה $100$ וכשבר עשרוני.', cols: 1, items: [pctToFracDec(23)] },
      { title: 'כתבו כשבר פשוט מצומצם.', cols: 2, items: [75, 20].map(pctToReduced) },
      { title: 'כתבו באחוזים.', cols: 2, items: [decToPct('0.9'), fracToPct(2, 5)] },
      { title: 'חשבו.', cols: 2, items: [pctOf(25, 60), pctOf(10, 250), pctOf(50, 90)] },
      { title: 'השוו: בחרו $<$, $=$ או $>$.', cols: 3, items: [compare(dec('0.5'), pct(5)), compare(frac(3, 4), pct(75))] },
      {
        title: 'שאלות מילוליות.',
        cols: 1,
        items: [
          { q: m`משחק עולה $80$ ש״ח, ויש עליו הנחה של $50\%$. כמה עולה המשחק אחרי ההנחה?`, a: m`[[${80 - 40}]] ש״ח` },
          { q: m`במבחן $20$ שאלות. נועה ענתה נכון על $15$ מהן. כמה אחוזים מהשאלות ענתה נכון?`, a: m`[[${(15 / 20) * 100}]] $\%$` },
        ],
      },
    ],
  },
};
