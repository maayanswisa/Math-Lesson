import { m } from '../helpers.js';
import { tf } from './shared.js';

const PROPS = ['כפל ב-1', 'כפל ב-0', 'חוק החילוף', 'חוק הקיבוץ'];
const prop = (tex, answer) => ({ q: m`$${tex}$`, options: PROPS, answer });

/** פריט קצר: התשובה מחושבת מהתרגיל. */
const item = (tex, fn) => ({ q: m`$${tex} =$ [[${fn()}]]` });

export default {
  id: 'g2-mul-div-properties',
  grade: 2,
  emoji: '🧷',
  title: 'תכונות של כפל וחילוק',
  reminder: [
    {
      title: '0 ו-1',
      md: m`$a \times 1 = a$ · $a : 1 = a$ · $a : a = 1$ (כש-$a \ne 0$) · $a \times 0 = 0$ · $0 : a = 0$

**אי אפשר לחלק ב-$0$!**`,
    },
    {
      title: 'חילוף וקיבוץ (בכפל)',
      md: m`**חילוף**: $3 \times 8 = 8 \times 3$

**קיבוץ**: $2 \times 7 \times 5 = 7 \times (2 \times 5) = 7 \times 10 = 70$`,
    },
  ],
  pages: [
    {
      title: '0 ו-1',
      exercises: [
        {
          title: 'חשבו.',
          cols: 3,
          items: [
            item('9 \\times 1', () => 9 * 1),
            item('9 \\times 0', () => 9 * 0),
            item('0 \\times 46', () => 0),
            item('25 : 1', () => 25),
            item('25 : 25', () => 1),
            item('0 : 8', () => 0),
            item('1 \\times 100', () => 100),
            item('73 : 73', () => 1),
            item('1 \\times 0', () => 0),
          ],
        },
        {
          title: 'השלימו.',
          cols: 3,
          items: [
            { q: m`$14 \times$ [[1]] $= 14$` },
            { q: m`$14 \times$ [[0]] $= 0$` },
            { q: m`$14 :$ [[14]] $= 1$` },
          ],
        },
      ],
    },
    {
      title: 'חילוף וקיבוץ',
      exercises: [
        {
          title: 'השלימו בעזרת חוק החילוף.',
          cols: 2,
          items: [
            { q: m`$3 \times 8 = 8 \times$ [[3]]` },
            { q: m`$5 \times 9 =$ [[9]] $\times 5$` },
          ],
        },
        {
          title: 'חשבו בדרך נוחה.',
          cols: 2,
          items: [
            item('2 \\times 7 \\times 5', () => 2 * 7 * 5),
            item('5 \\times 3 \\times 2', () => 5 * 3 * 2),
            item('4 \\times 5 \\times 3', () => 4 * 5 * 3),
            item('10 \\times 4 \\times 2', () => 10 * 4 * 2),
          ],
        },
        { title: 'איזו תכונה?', cols: 1, items: [prop('6 \\times 4 = 4 \\times 6', 2), prop('38 \\times 1 = 38', 0), prop('(3 \\times 2) \\times 5 = 3 \\times (2 \\times 5)', 3), prop('17 \\times 0 = 0', 1)] },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf(m`$12 : 12 = 0$`, false), tf(m`$0 : 5 = 0$`, true), tf(m`$8 : 2 = 2 : 8$`, false)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'חשבו.', cols: 3, items: [item('47 \\times 0', () => 0), item('47 \\times 1', () => 47), item('47 : 47', () => 1)] },
      { title: 'בדרך נוחה.', cols: 1, items: [item('5 \\times 8 \\times 2', () => 80)] },
      { title: 'איזו תכונה?', cols: 1, items: [prop('7 \\times 3 = 3 \\times 7', 2)] },
    ],
  },
};
