import { m } from '../helpers.js';
import { tf, at } from './shared.js';

const t = (x) => (x < 0 ? `-${-x}` : `${x}`);

/** שני ביטויים ממעלה ראשונה שווים לכל x ⇔ שווים בשתי הצבות שונות (בודקים בשלוש). */
const same = (p, q) => [0, 1, -2].every((x) => at(p, { x }) === at(q, { x }));

const ID = ['זהות', 'לא זהות'];
const identity = (p, q) => ({ q: m`$${p} \;\overset{?}{=}\; ${q}$`, options: ID, answer: same(p, q) ? 0 : 1 });

/** הצבה בשני הביטויים. */
const compare = (p, q, x) => ({
  q: m`$x = ${t(x)}$:`,
  a: m`$${p} =$ [[${at(p, { x })}]] $\qquad ${q} =$ [[${at(q, { x })}]]`,
});

/** מספר חסר שהופך את השוויון לזהות: k(x + □) = kx + c. */
const fillId = (k, c) => {
  if (c % k) throw new Error('must divide');
  return { q: m`$${k}(x +$ [[${c / k}]] $) = ${k}x ${c < 0 ? '-' : '+'} ${Math.abs(c)}$` };
};

export default {
  id: 'g7-algebra-identity',
  grade: 7,
  emoji: '🟰',
  title: 'שוויון בין ביטויים (זהות)',
  reminder: [
    {
      title: 'מהי זהות?',
      md: m`שוויון שנכון **לכל** ערך של המשתנה: $\;2(x + 3) = 2x + 6$ — זהות.`,
    },
    {
      title: 'איך בודקים?',
      md: m`**לפשט**: פותחים סוגריים ומכנסים — אם יוצא אותו ביטוי, זו זהות.

**להציב**: מספיקה הצבה **אחת** שבה הביטויים שונים כדי לדעת שזו **לא** זהות. $\;$ ($x + x = x^2$? כש-$x = 3$: $6 \ne 9$ — לא זהות.)`,
    },
  ],
  pages: [
    {
      title: 'בדיקה בהצבה',
      exercises: [
        { title: 'הציבו בשני הביטויים.', cols: 1, items: [compare('2(x + 3)', '2x + 6', 4), compare('x + x', 'x^2', 3), compare('3x - x', '2x', -5), compare('(x + 1)^2', 'x^2 + 1', 2)] },
        {
          title: 'מה אפשר להסיק?',
          cols: 1,
          items: [
            { q: m`הביטויים $x + x$ ו-$x^2$ שונים כש-$x = 3$. לכן:`, options: ['הם לא זהים', 'הם זהים', 'אי אפשר לדעת'], answer: 0 },
            { q: m`הביטויים $3x - x$ ו-$2x$ שווים כש-$x = -5$. לכן:`, options: ['הם בהכרח זהים', 'צריך לבדוק עוד (או לפשט)', 'הם לא זהים'], answer: 1 },
          ],
        },
      ],
    },
    {
      title: 'זהות או לא?',
      exercises: [
        { title: 'זהות או לא?', cols: 1, items: [identity('2(x + 3)', '2x + 6'), identity('4x - x', '4'), identity('5 - (x - 2)', '7 - x'), identity('3(x - 2)', '3x - 2'), identity('x + 2x + 3', '3(x + 1)'), identity('-(4 - x)', 'x - 4')] },
        { title: 'השלימו כך שתתקבל זהות.', cols: 2, items: [fillId(3, 15), fillId(5, -10), fillId(4, 28), fillId(2, -14)] },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf('זהות נכונה לכל הצבה.', true), tf(m`$x \cdot x = 2x$ היא זהות.`, same('xx', '2x'))] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'הציבו.', cols: 1, items: [compare('3(x - 1)', '3x - 1', 2)] },
      { title: 'זהות או לא?', cols: 1, items: [identity('6x - 2(x + 1)', '4x - 2'), identity('2x + 3x', '5x^2'), identity('8 - (3 - x)', 'x + 5')] },
      { title: 'השלימו.', cols: 1, items: [fillId(6, 42)] },
    ],
  },
};
