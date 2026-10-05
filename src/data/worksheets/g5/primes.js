import { m, num } from '../helpers.js';

const divisors = (n) => Array.from({ length: n }, (_, i) => i + 1).filter((d) => n % d === 0);
const isPrime = (n) => divisors(n).length === 2;
const nextPrime = (n) => {
  let k = n + 1;
  while (!isPrime(k)) k++;
  return k;
};

const KINDS = ['ראשוני', 'פריק', 'לא ראשוני ולא פריק'];
const kind = (n) => ({ q: m`$${n}$`, options: KINDS, answer: n === 1 ? 2 : isPrime(n) ? 0 : 1 });

const divCount = (n) => ({ q: m`למספר $${n}$ יש`, a: m`[[${divisors(n).length}]] מחלקים` });

const YES_NO = ['כן', 'לא'];
const divisible = (n, k) => ({ q: m`האם $${num(n)}$ מתחלק ב-$${k}$?`, options: YES_NO, answer: n % k === 0 ? 0 : 1 });

/** ספרה חסרה: pattern כמו "24_" — כל הספרות שבמקום _ נותנות מספר שמתחלק ב-k. */
function missingDigit(pattern, k) {
  const [before, after] = pattern.split('_');
  const ok = [...'0123456789'].filter((d) => !(before === '' && d === '0') && Number(before + d + after) % k === 0);
  if (ok.length === 0) throw new Error(`no digit fits ${pattern} for ${k}`);
  return { q: (before ? m`$${before}$` : '') + `[[n:${ok.join('|')}]]` + (after ? m`$${after}$` : '') };
}

/** פירוק לגורמים: הגורמים הנתונים לפני ואחרי המשבצת, והחסר מחושב. */
function factor(n, before, after = []) {
  const known = [...before, ...after].reduce((a, b) => a * b, 1);
  const missing = n / known;
  if (!Number.isInteger(missing) || !isPrime(missing)) throw new Error(`bad factorization of ${n}`);
  const pre = before.map((f) => `${f} \\times `).join('');
  const post = after.map((f) => ` \\times ${f}`).join('');
  return { q: m`$${n} = ${pre}$ [[${missing}]]` + (post ? m` $${post}$` : '') };
}

export default {
  id: 'g5-primes',
  grade: 5,
  emoji: '🧩',
  title: 'מספרים ראשוניים ומספרים פריקים',
  reminder: [
    {
      title: 'ראשוני או פריק?',
      md: m`**ראשוני** — יש לו בדיוק **שני** מחלקים: $1$ והמספר עצמו. $2, 3, 5, 7, 11, 13, 17, 19, \ldots$

**פריק** — יש לו **יותר** משני מחלקים: $12$ מתחלק ב-$1, 2, 3, 4, 6, 12$.

המספר $1$ — לא ראשוני ולא פריק.`,
    },
    {
      title: 'סימני התחלקות',
      md: m`- ב-$2$: ספרת האחדות **זוגית**
- ב-$5$: ספרת האחדות $0$ או $5$ · ב-$10$: ספרת האחדות $0$
- ב-$3$ / ב-$9$: **סכום הספרות** מתחלק ב-$3$ / ב-$9$
- ב-$4$: **שתי הספרות האחרונות** מתחלקות ב-$4$
- ב-$6$: מתחלק ב-$2$ **וגם** ב-$3$`,
    },
    {
      title: 'פירוק לגורמים ראשוניים',
      wide: true,
      md: m`מפרקים שוב ושוב עד שכל הגורמים ראשוניים: $60 = 6 \times 10 = 2 \times 3 \times 2 \times 5 = 2 \times 2 \times 3 \times 5$`,
    },
  ],
  pages: [
    {
      title: 'ראשוניים, פריקים ומחלקים',
      exercises: [
        {
          title: 'ראשוני, פריק, או לא זה ולא זה?',
          cols: 2,
          items: [29, 51, 37, 91, 1, 2, 57, 83].map(kind),
        },
        {
          title: 'כמה מחלקים יש למספר?',
          cols: 2,
          items: [12, 7, 16, 30, 36, 25].map(divCount),
        },
        {
          title: 'מהו המספר הראשוני הבא?',
          cols: 2,
          items: [13, 23, 31, 47].map((n) => ({ q: m`הראשוני הבא אחרי $${n}$ הוא`, a: `[[${nextPrime(n)}]]` })),
        },
        {
          title: 'ענו.',
          cols: 1,
          items: [
            {
              q: m`כמה מספרים ראשוניים יש בין $1$ ל-$20$?`,
              a: `[[${Array.from({ length: 20 }, (_, i) => i + 1).filter(isPrime).length}]]`,
            },
            { q: 'מהו המספר הראשוני הזוגי היחיד?', a: '[[2]]' },
            { q: m`מהו המספר הראשוני הגדול ביותר שקטן מ-$50$?`, a: '[[47]]' },
          ],
        },
      ],
    },
    {
      title: 'סימני התחלקות ופירוק לגורמים',
      exercises: [
        {
          title: 'האם המספר מתחלק? היעזרו בסימני ההתחלקות.',
          cols: 2,
          items: [
            divisible(4236, 3),
            divisible(5712, 9),
            divisible(7350, 5),
            divisible(918, 4),
            divisible(2024, 4),
            divisible(1236, 6),
            divisible(3415, 2),
            divisible(8091, 9),
          ],
        },
        {
          title: m`השלימו ספרה כך שהמספר יתחלק ב-$3$ (אם יש כמה אפשרויות — מספיקה אחת).`,
          cols: 3,
          items: [missingDigit('24_', 3), missingDigit('1_5', 3), missingDigit('70_', 3)],
        },
        {
          title: m`השלימו ספרה כך שהמספר יתחלק ב-$9$.`,
          cols: 3,
          items: [missingDigit('35_', 9), missingDigit('4_7', 9), missingDigit('2_34', 9)],
        },
        {
          title: 'השלימו את הגורם הראשוני החסר.',
          cols: 2,
          items: [
            factor(12, [2, 2]),
            factor(30, [2], [5]),
            factor(18, [2, 3]),
            factor(20, [2, 2]),
            factor(42, [2, 3]),
            factor(45, [3, 3]),
            factor(60, [2, 2], [5]),
            factor(70, [2], [7]),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'ראשוני, פריק, או לא זה ולא זה?', cols: 2, items: [41, 49, 1, 53, 87].map(kind) },
      { title: 'כמה מחלקים יש למספר?', cols: 2, items: [18, 13].map(divCount) },
      {
        title: 'האם המספר מתחלק?',
        cols: 2,
        items: [divisible(3141, 3), divisible(7326, 9), divisible(1114, 4), divisible(2505, 10)],
      },
      { title: 'השלימו את הגורם הראשוני החסר.', cols: 2, items: [factor(28, [2, 2]), factor(90, [2, 3], [5])] },
      { title: m`השלימו ספרה כך שהמספר יתחלק ב-$3$.`, cols: 2, items: [missingDigit('5_1', 3)] },
    ],
  },
};
