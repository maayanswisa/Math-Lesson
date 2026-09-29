import { c, GREEN, m, VIOLET } from './tex.js';

const TD = "style='padding:4px 10px;border:1px solid #dde'";
const TABLE = `<div class='diagram-box'><table dir='ltr' style='border-collapse:collapse;text-align:center;font-weight:700'><tr><td ${TD}><i>x</i></td>${[0, 1, 2, 3]
  .map((x) => `<td ${TD}>${x}</td>`)
  .join('')}</tr><tr><td ${TD}><i>y</i></td>${[0, 1, 2, 3].map((x) => `<td ${TD}>${2 * x + 1}</td>`).join('')}</tr></table></div>`;

export default {
  id: 'g7-functions-intro',
  topicId: 'g7-functions-intro',
  grade: 7,
  emoji: '⚙️',
  title: 'מבוא לפונקציות',
  subtitle: 'מכונה שלכל קלט נותנת פלט אחד — בנוסחה, בטבלה ובגרף',
  sections: [
    {
      id: 'machine',
      emoji: '🏭',
      title: 'מכונה',
      blocks: [
        {
          type: 'text',
          md: m`**פונקציה** היא כמו מכונה: מכניסים מספר ($x$, הקלט), והיא מוציאה מספר ($y$, הפלט) לפי כלל קבוע. הכלל החשוב: **לכל קלט יוצא פלט אחד בלבד.**`,
        },
        {
          type: 'machine',
          caption: m`המכונה $y=2x+1$. נסו כמה קלטים:`,
          a: 2,
          b: 1,
        },
      ],
      challenge: {
        type: 'number',
        label: 'y =',
        prompt: m`הכלל הוא $y=3x-2$. מה יוצא כשמכניסים $x=5$?`,
        answer: 13,
        hint: m`$3\times5-2$`,
        explain: m`$15-2=13$`,
      },
    },
    {
      id: 'representations',
      emoji: '🎭',
      title: 'שלושה ייצוגים',
      blocks: [
        {
          type: 'text',
          md: m`את אותה פונקציה אפשר להציג בשלוש דרכים:

**נוסחה:** $y=2x+1$

**טבלה:**

${TABLE}`,
        },
        {
          type: 'line',
          caption: m`**גרף:** כל עמודה בטבלה היא נקודה, והנקודות יושבות על קו ישר:`,
          lines: [{ m: 2, b: 1 }],
          points: [
            { x: 0, y: 1, label: '(0,1)' },
            { x: 1, y: 3, label: '(1,3)' },
            { x: 2, y: 5, label: '(2,5)' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`איזו נקודה נמצאת על הגרף של $y=2x+1$?`,
        options: [m`$(3,6)$`, m`$(3,7)$`, m`$(7,3)$`, m`$(4,8)$`],
        answer: 1,
        hint: m`הציבו את $x$ של כל נקודה ובדקו את $y$.`,
        explain: m`$2\times3+1=7$, ולכן $(3,7)$ על הגרף.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: גלו את הכלל',
      blocks: [
        {
          type: 'machine',
          caption: 'הכלל מוסתר! הכניסו כמה מספרים, הסתכלו בטבלה — ונחשו:',
          a: 3,
          b: 2,
          hidden: true,
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'איך מגלים?',
          md: m`בודקים בכמה $y$ עולה כש-$x$ עולה ב-$1$ — זה המספר שכופל את $x$. ואז בודקים מה יוצא ב-$x=0$ — זה המספר שמוסיפים.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'מכניסים 0 — יוצא 2. מכניסים 1 — יוצא 5. מכניסים 2 — יוצא 8. מה הכלל?',
        options: [m`$y=x+2$`, m`$y=3x+2$`, m`$y=2x+3$`, m`$y=5x$`],
        answer: 1,
        hint: m`$y$ עולה ב-$3$ בכל צעד, ומתחיל ב-$2$.`,
        explain: m`עולה ב-$${c(VIOLET, '3')}$ בכל צעד, ומתחיל ב-$${c(GREEN, '2')}$: $y=3x+2$.`,
      },
    },
  ],
};
