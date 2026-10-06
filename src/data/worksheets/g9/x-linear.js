import { m, lin, round, coordPlane } from '../helpers.js';
import { tf } from './shared.js';

const mb = (a, b) => ({ q: m`$y = ${lin(a, b)}$`, a: m`$m =$ [[${a}]] $\qquad b =$ [[${b}]]` });
const graph = (a, b) => ({ q: '', figure: coordPlane({ lines: [{ m: a, b }] }), a: m`$m =$ [[${a}]] $\qquad b =$ [[${b}]]` });
const value = (a, b, x) => ({ q: m`$y = ${lin(a, b)}$ $\qquad x = ${x} \Rightarrow y =$ [[${round(a * x + b)}]]` });
const TREND = ['עולה', 'יורדת', 'קבועה'];
const trend = (a, b) => ({ q: m`$y = ${lin(a, b)}$`, options: TREND, answer: a > 0 ? 0 : a < 0 ? 1 : 2 });

export default {
  id: 'g9x-linear',
  grade: 9,
  emoji: '📈',
  title: 'פונקציה קווית',
  reminder: [
    {
      title: 'y = mx + b',
      md: m`$m$ — **השיפוע**: בכמה $y$ משתנה כש-$x$ גדל ב-$1$.
$b$ — היכן הקו **חותך את ציר $y$**: בנקודה $(0, b)$.`,
    },
    {
      title: 'עולה או יורדת',
      md: m`$m > 0$ עולה · $m < 0$ יורדת · $m = 0$ קבועה (קו אופקי)`,
    },
    {
      title: 'מהחיים',
      md: m`מונית: $10$ ש״ח פתיחה ו-$4$ ש״ח לק״מ ← $y = 4x + 10$. השיפוע הוא **המחיר לק״מ**, ו-$b$ הוא **מחיר הפתיחה**.`,
    },
  ],
  pages: [
    {
      title: 'שיפוע ונקודת חיתוך',
      exercises: [
        { title: m`מצאו את $m$ ואת $b$.`, cols: 2, items: [mb(2, 1), mb(-3, 5), mb(1, -4), mb(0, 6)] },
        { title: 'עולה, יורדת או קבועה?', cols: 2, items: [trend(4, -2), trend(-1, 3), trend(0, -5)] },
        { title: 'הציבו וחשבו.', cols: 2, items: [value(2, 1, 3), value(-3, 5, 2), value(4, -1, 0), value(0.5, 2, 6)] },
      ],
    },
    {
      title: 'גרפים ושימושים',
      exercises: [
        { title: m`מצאו $m$ ו-$b$ לפי הגרף.`, cols: 2, items: [graph(2, -1), graph(-1, 3)] },
        {
          title: m`חוג ספורט: $50$ ש״ח דמי הרשמה ועוד $30$ ש״ח לכל חודש: $y = 30x + 50$.`,
          cols: 1,
          items: [
            { q: m`כמה עולים $4$ חודשים?`, a: m`[[${30 * 4 + 50}]] ש״ח` },
            { q: m`אחרי כמה חודשים התשלום הכולל יהיה $260$ ש״ח?`, a: m`[[${(260 - 50) / 30}]] חודשים` },
            { q: 'מה מייצג המספר 30?', options: ['התשלום לכל חודש', 'דמי ההרשמה', 'מספר החודשים'], answer: 0 },
          ],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [tf(m`הקו $y = 3x$ עובר בראשית הצירים.`, true), tf(m`הקו $y = -2x + 1$ עולה.`, false)],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: m`מצאו $m$ ו-$b$.`, cols: 2, items: [mb(-2, 7), mb(5, 0)] },
      { title: 'הציבו.', cols: 1, items: [value(3, -2, 4)] },
      { title: 'לפי הגרף.', cols: 1, items: [graph(1, 2)] },
      { title: m`חנייה: $y = 8x + 5$ ($x$ — שעות).`, cols: 1, items: [{ q: m`כמה עולות $3$ שעות חנייה?`, a: m`[[${8 * 3 + 5}]] ש״ח` }] },
    ],
  },
};
