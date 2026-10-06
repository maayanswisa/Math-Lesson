import { m, cmp } from '../helpers.js';
import { tf } from './shared.js';

const parts = (n) => {
  const [h, t, u] = String(n).padStart(3, '0').split('').map(Number);
  return { q: m`$${n} =$ [[${h}]] מאות, [[${t}]] עשרות ו-[[${u}]] יחידות` };
};
const compose = (h, t, u) => ({ q: m`$${h}$ מאות, $${t}$ עשרות, $${u}$ יחידות $=$ [[${h * 100 + t * 10 + u}]]` });
const expanded = (n) => {
  const [h, t, u] = String(n).split('').map(Number);
  return { q: m`$${n} =$ [[${h * 100}]] $+$ [[${t * 10}]] $+$ [[${u}]]` };
};
const compare = (a, b) => ({ q: m`$${a}$ [[c:${cmp(a, b)}]] $${b}$` });
const around = (n) => ({ q: m`לפני $${n}$: [[${n - 1}]] · אחרי $${n}$: [[${n + 1}]]` });

/** המספר הגדול / הקטן ביותר מהספרות. */
function fromDigits(digits, biggest) {
  const sorted = [...digits].sort((a, b) => (biggest ? b - a : a - b));
  if (!biggest && sorted[0] === 0) [sorted[0], sorted[1]] = [sorted[1], sorted[0]];
  return { q: m`המספר ${biggest ? 'הגדול' : 'הקטן'} ביותר מהספרות $${digits.join(', ')}$ (כל ספרה פעם אחת):`, a: `[[${sorted.join('')}]]` };
}

export default {
  id: 'g2-numbers-1000',
  grade: 2,
  emoji: '🔢',
  title: 'מספרים עד 1,000',
  reminder: [
    {
      title: 'מאות, עשרות, יחידות',
      md: m`<table><tr><th>מאות</th><th>עשרות</th><th>יחידות</th></tr><tr><td>3</td><td>4</td><td>7</td></tr></table>

$347 = 300 + 40 + 7$ — שלוש מאות ארבעים ושבע.`,
    },
    {
      title: 'השוואה',
      md: m`$>$ גדול מ- · $<$ קטן מ-. קודם משווים את **המאות**, אם שוות — את העשרות, ואז את היחידות.

$472 > 427$: המאות שוות ($4$), אבל $7$ עשרות $> 2$ עשרות.`,
    },
  ],
  pages: [
    {
      title: 'מבנה המספר',
      exercises: [
        { title: 'פרקו.', cols: 1, items: [parts(347), parts(605), parts(890), parts(1000 - 1)] },
        { title: 'הרכיבו.', cols: 1, items: [compose(2, 5, 8), compose(7, 0, 4), compose(4, 6, 0)] },
        { title: 'כתבו כסכום.', cols: 1, items: [expanded(538), expanded(906), expanded(271)] },
      ],
    },
    {
      title: 'השוואה וסדר',
      exercises: [
        { title: 'השוו: בחרו $<$, $=$ או $>$.', cols: 2, items: [compare(472, 427), compare(399, 400), compare(650, 605), compare(818, 818), compare(99, 190), compare(731, 713)] },
        { title: 'לפני ואחרי.', cols: 1, items: [around(400), around(299), around(510)] },
        { title: 'בנו מספרים.', cols: 1, items: [fromDigits([5, 2, 8], true), fromDigits([5, 2, 8], false), fromDigits([0, 7, 3], false)] },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf(m`במספר $508$ יש $0$ עשרות.`, true), tf(m`$1{,}000$ הוא $10$ מאות.`, true), tf(m`$690 < 609$`, 690 < 609)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'פרקו והרכיבו.', cols: 1, items: [parts(762), compose(3, 0, 9)] },
      { title: 'השוו.', cols: 2, items: [compare(581, 518), compare(300, 299)] },
      { title: 'לפני ואחרי.', cols: 1, items: [around(700)] },
      { title: 'בנו מספר.', cols: 1, items: [fromDigits([4, 1, 9], true)] },
    ],
  },
};
