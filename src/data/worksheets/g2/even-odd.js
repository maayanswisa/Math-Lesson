import { m } from '../helpers.js';
import { tf, pairsFig } from './shared.js';

const KIND = ['זוגי', 'אי-זוגי'];
const kind = (n) => ({ q: m`$${n}$ הוא:`, options: KIND, answer: n % 2 === 0 ? 0 : 1 });

/** n עיגולים בזוגות: זוגי או אי-זוגי? */
const pairs = (n) => ({ q: m`$${n}$ עיגולים:`, figure: pairsFig(n), options: KIND, answer: n % 2 === 0 ? 0 : 1 });

const nextEven = (n) => ({ q: m`המספר הזוגי הבא אחרי $${n}$:`, a: `[[${n % 2 === 0 ? n + 2 : n + 1}]]` });
const nextOdd = (n) => ({ q: m`המספר האי-זוגי הבא אחרי $${n}$:`, a: `[[${n % 2 === 1 ? n + 2 : n + 1}]]` });
const countEven = (nums) => ({ q: m`כמה מספרים זוגיים יש ב: $${nums.join(',\\; ')}$?`, a: `[[${nums.filter((x) => x % 2 === 0).length}]]` });

export default {
  id: 'g2-even-odd',
  grade: 2,
  emoji: '👫',
  title: 'מספרים זוגיים ואי-זוגיים',
  reminder: [
    {
      title: 'זוגי ואי-זוגי',
      md: m`מספר **זוגי** — אפשר לסדר בזוגות בלי שיישאר אחד: $0, 2, 4, 6, 8, 10, \ldots$

מספר **אי-זוגי** — נשאר אחד בלי זוג: $1, 3, 5, 7, 9, \ldots$`,
    },
    {
      title: 'לפי ספרת היחידות',
      md: m`מסתכלים רק על **ספרת היחידות**: $0, 2, 4, 6, 8$ — זוגי; $1, 3, 5, 7, 9$ — אי-זוגי.

$346$ זוגי (היחידות $6$) · $\;571$ אי-זוגי (היחידות $1$)`,
    },
  ],
  pages: [
    {
      title: 'מזהים',
      exercises: [
        { title: 'סדרנו עיגולים בזוגות. המספר זוגי או אי-זוגי?', cols: 3, items: [pairs(8), pairs(7), pairs(11)] },
        { title: 'זוגי או אי-זוגי?', cols: 2, items: [kind(14), kind(27), kind(346), kind(571), kind(900), kind(83), kind(1000 - 1), kind(450)] },
      ],
    },
    {
      title: 'זוגיים ואי-זוגיים בסדרות',
      exercises: [
        { title: 'השלימו.', cols: 1, items: [nextEven(36), nextEven(49), nextOdd(70), nextOdd(125)] },
        { title: 'ספרו.', cols: 1, items: [countEven([12, 15, 20, 33, 48, 51]), countEven([101, 202, 303, 404, 505])] },
        {
          title: 'בחרו.',
          cols: 1,
          items: [
            { q: 'איזה מספר זוגי?', options: [m`$135$`, m`$247$`, m`$318$`], answer: 2 },
            { q: 'איזה מספר אי-זוגי?', options: [m`$560$`, m`$409$`, m`$782$`], answer: 1 },
          ],
        },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf('אחרי כל מספר זוגי בא מספר אי-זוגי.', true), tf(m`$0$ הוא מספר אי-זוגי.`, false), tf(m`זוגי ועוד זוגי — התוצאה זוגית.`, true)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'זוגי או אי-זוגי?', cols: 2, items: [kind(58), kind(93), kind(704), kind(865)] },
      { title: 'השלימו.', cols: 1, items: [nextEven(77), nextOdd(240)] },
      { title: 'ספרו.', cols: 1, items: [countEven([6, 11, 24, 37, 40])] },
    ],
  },
};
