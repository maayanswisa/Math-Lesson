import { m } from '../helpers.js';
import { tf, brokenLineFig } from './shared.js';

const sum = (a) => a.reduce((s, x) => s + x, 0);
const total = (lengths) => ({ q: '', figure: brokenLineFig(lengths), a: m`האורך הכולל: [[${sum(lengths)}]] ס״מ` });

/** קטע חסר: האורך הכולל ידוע. */
const missingPart = (known, totalLen) => ({
  q: m`קו שבור באורך $${totalLen}$ ס״מ, עם קטעים של $${known.join(',\\; ')}$ ס״מ ועוד קטע אחד. אורך הקטע החסר:`,
  a: m`[[${totalLen - sum(known)}]] ס״מ`,
});

/** השוואה בין שני קווים שבורים. */
function longer(a, b) {
  const [sa, sb] = [sum(a), sum(b)];
  return {
    q: m`קו א׳: קטעים של $${a.join(',\\; ')}$ ס״מ. קו ב׳: קטעים של $${b.join(',\\; ')}$ ס״מ. איזה קו ארוך יותר?`,
    options: ['קו א׳', 'קו ב׳', 'שווים'],
    answer: sa > sb ? 0 : sa < sb ? 1 : 2,
  };
}

export default {
  id: 'g2-broken-lines',
  grade: 2,
  emoji: '〰️',
  title: 'קווים שבורים',
  reminder: [
    {
      title: 'קו שבור',
      md: 'קו שבנוי מכמה **קטעים ישרים** שמחוברים זה לזה בקצוות.',
    },
    {
      title: 'אורך קו שבור',
      md: m`מודדים כל קטע ו**מחברים**: קטעים של $3$, $5$ ו-$2$ ס״מ ← $3 + 5 + 2 = 10$ ס״מ.`,
    },
  ],
  pages: [
    {
      title: 'אורך כולל',
      exercises: [
        { title: 'מה האורך הכולל של הקו השבור?', cols: 1, items: [total([3, 5, 2]), total([4, 4, 6, 1]), total([7, 2, 5])] },
        { title: 'חשבו.', cols: 1, items: [{ q: m`קו שבור עם $4$ קטעים, כל אחד באורך $5$ ס״מ:`, a: m`[[20]] ס״מ` }, { q: m`קו שבור עם קטעים של $8, 3, 9$ ס״מ:`, a: m`[[${8 + 3 + 9}]] ס״מ` }] },
      ],
    },
    {
      title: 'קטע חסר והשוואה',
      exercises: [
        { title: 'מצאו את הקטע החסר.', cols: 1, items: [missingPart([4, 3], 12), missingPart([6, 2, 5], 20), missingPart([10], 17)] },
        { title: 'איזה ארוך יותר?', cols: 1, items: [longer([3, 4, 5], [6, 5]), longer([2, 2, 2, 2], [4, 4]), longer([7, 1], [3, 3, 3])] },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf('קו שבור בנוי מקטעים ישרים.', true), tf('לקו שבור עם יותר קטעים יש תמיד אורך גדול יותר.', false)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'אורך כולל.', cols: 1, items: [total([6, 3, 4])] },
      { title: 'קטע חסר.', cols: 1, items: [missingPart([5, 5], 16)] },
      { title: 'איזה ארוך יותר?', cols: 1, items: [longer([9, 2], [4, 4, 4])] },
    ],
  },
};
