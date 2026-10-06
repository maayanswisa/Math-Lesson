import { m, cmp } from '../helpers.js';
import { tf, rulerFig } from './shared.js';

const measure = (from, to) => ({ q: '', figure: rulerFig(from, to, 12), a: m`[[${to - from}]] ס״מ` });

const UNITS = ['ס״מ', 'מטר'];
const unit = (thing, answer) => ({ q: `באיזו יחידה נוח למדוד את ${thing}?`, options: UNITS, answer });

/** המרה ממטרים לס״מ ולהפך. */
const toCm = (mtr) => ({ q: m`$${mtr}$ מטר $=$ [[${mtr * 100}]] ס״מ` });
const toM = (cm) => ({ q: m`$${cm}$ ס״מ $=$ [[${cm / 100}]] מטר` });
const compareLen = (a, ua, b, ub) => {
  const va = ua === 'מ' ? a * 100 : a;
  const vb = ub === 'מ' ? b * 100 : b;
  const name = (u) => (u === 'מ' ? 'מטר' : 'ס״מ');
  return { q: m`$${a}$ ${name(ua)} [[c:${cmp(va, vb)}]] $${b}$ ${name(ub)}` };
};

export default {
  id: 'g2-length-measure',
  grade: 2,
  emoji: '📏',
  title: 'מדידת אורך: ס״מ ומטר',
  reminder: [
    {
      title: 'סנטימטר',
      md: m`מודדים בסרגל, **מתחילים מה-$0$**. אם הקטע מתחיל במספר אחר — מחסרים: מ-$3$ עד $8$ ← $5$ ס״מ.`,
    },
    {
      title: 'מטר',
      md: m`$1$ מטר $= 100$ ס״מ. מודדים במטרים דברים ארוכים: אורך כיתה, גובה עץ.`,
    },
  ],
  pages: [
    {
      title: 'מדידה בסרגל',
      exercises: [
        { title: 'מה אורך הקטע?', cols: 1, items: [measure(0, 7), measure(0, 11), measure(3, 8), measure(2, 12), measure(5, 9)] },
        {
          title: 'סרטוט.',
          cols: 1,
          items: [
            { q: m`רוצים לסרטט קטע באורך $6$ ס״מ, ומתחילים ב-$2$ על הסרגל. איפה מסיימים?`, a: '[[8]]' },
            { q: m`קטע מתחיל ב-$0$ ומסתיים ב-$9$. מה אורכו?`, a: m`[[9]] ס״מ` },
          ],
        },
      ],
    },
    {
      title: 'מטר וסנטימטר',
      exercises: [
        { title: 'באיזו יחידה?', cols: 1, items: [unit('אורך של עיפרון', 0), unit('אורך של חצר בית הספר', 1), unit('רוחב של מחק', 0), unit('גובה של בניין', 1)] },
        { title: 'המירו.', cols: 2, items: [toCm(1), toCm(3), toM(200), toM(500)] },
        { title: 'השוו.', cols: 1, items: [compareLen(1, 'מ', 90, 'ס'), compareLen(2, 'מ', 200, 'ס'), compareLen(150, 'ס', 1, 'מ')] },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf('מטר ארוך מסנטימטר.', true), tf(m`$1$ מטר $= 10$ ס״מ.`, false)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'מה אורך הקטע?', cols: 1, items: [measure(0, 5), measure(4, 11)] },
      { title: 'המירו והשוו.', cols: 1, items: [toCm(4), compareLen(3, 'מ', 250, 'ס')] },
    ],
  },
};
