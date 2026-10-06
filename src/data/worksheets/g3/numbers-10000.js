import { m, num, cmp } from '../helpers.js';
import { tf } from './shared.js';

function digitValue(n, d) {
  const s = String(n);
  if (s.split(String(d)).length !== 2) throw new Error(`digit ${d} must appear once in ${n}`);
  return d * 10 ** (s.length - 1 - s.indexOf(String(d)));
}
const valueItem = (n, d) => ({ q: m`במספר $${num(n)}$ הספרה $${d}$ שווה [[${digitValue(n, d)}]]` });

const parts = (n) => {
  const [t, h, te, u] = String(n).padStart(4, '0').split('').map(Number);
  return { q: m`$${num(n)} =$ [[${t}]] אלפים, [[${h}]] מאות, [[${te}]] עשרות ו-[[${u}]] יחידות` };
};
const compose = (t, h, te, u) => ({ q: m`$${t}$ אלפים, $${h}$ מאות, $${te}$ עשרות ו-$${u}$ יחידות $=$ [[${t * 1000 + h * 100 + te * 10 + u}]]` });
const compare = (a, b) => ({ q: m`$${num(a)}$ [[c:${cmp(a, b)}]] $${num(b)}$` });

const UNIT = { 10: 'לעשרות', 100: 'למאות', 1000: 'לאלפים' };
const roundTo = (n, u) => ({ q: m`${UNIT[u]}: $${num(n)} \approx$ [[${Math.round(n / u) * u}]]` });

export default {
  id: 'g3-numbers-10000',
  grade: 3,
  emoji: '🔢',
  title: 'מספרים עד 10,000',
  reminder: [
    {
      title: 'מבנה עשרוני',
      md: m`<table><tr><th>אלפים</th><th>מאות</th><th>עשרות</th><th>יחידות</th></tr><tr><td>2</td><td>3</td><td>5</td><td>6</td></tr></table>

$2{,}356 = 2{,}000 + 300 + 50 + 6$ — וגם: $23$ מאות ו-$56$ יחידות.`,
    },
    {
      title: 'השוואה',
      md: m`$>$ גדול מ- · $<$ קטן מ-. משווים משמאל: קודם האלפים, אחר כך המאות...

$3{,}480 > 3{,}408$: האלפים והמאות שווים, אבל $8$ עשרות $> 0$ עשרות.`,
    },
    {
      title: 'עיגול',
      md: m`מסתכלים על הספרה **שמימין** למקום: $5$ ומעלה — למעלה, $4$ ומטה — למטה.

$2{,}356$: לעשרות $2{,}360$ · למאות $2{,}400$ · לאלפים $2{,}000$`,
    },
  ],
  pages: [
    {
      title: 'מבנה עשרוני',
      exercises: [
        { title: 'כמה שווה הספרה?', cols: 2, items: [valueItem(4627, 6), valueItem(3815, 3), valueItem(9071, 7), valueItem(5284, 4)] },
        { title: 'פרקו.', cols: 1, items: [parts(2356), parts(7409), parts(6050)] },
        { title: 'הרכיבו את המספר.', cols: 1, items: [compose(3, 4, 2, 8), compose(5, 0, 6, 3), compose(8, 7, 0, 0)] },
        {
          title: 'פירוק אחר.',
          cols: 1,
          items: [
            { q: m`$2{,}356 =$ [[23]] מאות ו-$56$ יחידות` },
            { q: m`$4{,}700 =$ [[47]] מאות` },
            { q: m`$3{,}000 =$ [[300]] עשרות` },
          ],
        },
      ],
    },
    {
      title: 'השוואה, עיגול וכפל ב-10 וב-100',
      exercises: [
        { title: 'השוו: בחרו $<$, $=$ או $>$.', cols: 2, items: [compare(3480, 3408), compare(999, 1000), compare(6250, 6205), compare(7000, 7000), compare(4099, 4100), compare(8765, 8756)] },
        { title: 'עגלו.', cols: 2, items: [roundTo(2356, 10), roundTo(2356, 100), roundTo(2356, 1000), roundTo(4849, 100), roundTo(7505, 1000), roundTo(1995, 10)] },
        {
          title: 'כפל ב-10 וב-100.',
          cols: 2,
          items: [
            { q: m`$45 \times 10 =$ [[450]]` },
            { q: m`$38 \times 100 =$ [[3800]]` },
            { q: m`$600 \times 10 =$ [[6000]]` },
            { q: m`$7 \times 100 =$ [[700]]` },
          ],
        },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf(m`המספר הגדול ביותר בעל ארבע ספרות הוא $9{,}999$.`, true), tf(m`$5{,}010 < 5{,}001$`, false)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'כמה שווה הספרה?', cols: 1, items: [valueItem(6392, 9)] },
      { title: 'פרקו והרכיבו.', cols: 1, items: [parts(4508), compose(9, 1, 3, 0)] },
      { title: 'השוו.', cols: 2, items: [compare(5430, 5403), compare(2999, 3001)] },
      { title: 'עגלו.', cols: 2, items: [roundTo(6743, 100), roundTo(3482, 1000)] },
    ],
  },
};
