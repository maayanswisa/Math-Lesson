import { m, fromRoman, toRoman } from '../helpers.js';

const rom = (s) => m`$\mathrm{${s}}$`;
const fromItem = (s) => ({ q: m`${rom(s)} $=$ [[${fromRoman(s)}]]` });
const toItem = (n) => ({ q: m`$${n} =$ [[t:${toRoman(n)}]]` });
/** חשבון עם ספרות רומיות — התשובה ברומית. */
const romanCalc = (a, sign, b, value) => ({ q: m`$\mathrm{${a}} ${sign} \mathrm{${b}} =$ [[t:${toRoman(value)}]]` });

export default {
  id: 'g5-roman-numerals',
  grade: 5,
  emoji: '🏛️',
  title: 'ספרות רומיות',
  reminder: [
    {
      title: 'הסמלים',
      wide: true,
      md: m`<table><tr><th>I</th><th>V</th><th>X</th><th>L</th><th>C</th><th>D</th><th>M</th></tr><tr><td>1</td><td>5</td><td>10</td><td>50</td><td>100</td><td>500</td><td>1000</td></tr></table>`,
    },
    {
      title: 'חיבור — קטן אחרי גדול',
      md: m`סמל קטן שבא **אחרי** סמל גדול — **מחברים**:

${rom('VI')} $= 5 + 1 = 6$ · ${rom('XV')} $= 15$ · ${rom('LXX')} $= 70$`,
    },
    {
      title: 'חיסור — קטן לפני גדול',
      md: m`סמל קטן שבא **לפני** סמל גדול — **מחסרים**:

${rom('IV')} $= 4$ · ${rom('IX')} $= 9$ · ${rom('XL')} $= 40$ · ${rom('XC')} $= 90$ · ${rom('CD')} $= 400$ · ${rom('CM')} $= 900$`,
    },
    {
      title: 'כלל חשוב',
      md: m`אותו סמל **לא חוזר יותר מ-3 פעמים** ברצף: $3 =$ ${rom('III')}, אבל $4 =$ ${rom('IV')} (לא ${rom('IIII')}).

מספר גדול כותבים חלק אחרי חלק: $1990 = 1000 + 900 + 90 =$ ${rom('MCMXC')}`,
    },
  ],
  pages: [
    {
      title: 'מספרות רומיות למספרים',
      exercises: [
        { title: 'כתבו במספרים (חיבור בלבד).', cols: 3, items: ['III', 'VII', 'XII', 'XV', 'XX', 'LX', 'CX', 'MD'].map(fromItem) },
        { title: 'כתבו במספרים (שימו לב לחיסור).', cols: 3, items: ['IV', 'IX', 'XIV', 'XIX', 'XL', 'XC', 'CD', 'CM'].map(fromItem) },
        {
          title: 'מספרים גדולים יותר.',
          cols: 3,
          items: ['XLII', 'LXXVI', 'XCIX', 'CXLV', 'CCCLXV', 'DCCC', 'MCMXC', 'MMXXVI'].map(fromItem),
        },
        {
          title: 'ענו.',
          cols: 1,
          items: [
            { q: m`בשעון כתוב ${rom('IX')}. איזו שעה זו?`, a: '[[9]]' },
            { q: m`פרק ${rom('XXIV')} בספר. מה מספר הפרק?`, a: '[[24]]' },
          ],
        },
      ],
    },
    {
      title: 'ממספרים לספרות רומיות',
      exercises: [
        { title: 'כתבו בספרות רומיות (באותיות לטיניות גדולות).', cols: 3, items: [8, 13, 24, 36, 49, 58].map(toItem) },
        { title: 'כתבו בספרות רומיות.', cols: 3, items: [90, 104, 250, 444, 999, 2024].map(toItem) },
        {
          title: 'בחרו.',
          cols: 1,
          items: [
            { q: 'איזה מספר כתוב נכון?', options: [rom('IIII'), rom('IV'), rom('VIV')], answer: 1 },
            { q: m`איך כותבים $40$?`, options: [rom('XXXX'), rom('XL'), rom('LX')], answer: 1 },
            {
              q: m`מה גדול יותר: ${rom('XC')} או ${rom('CX')}?`,
              options: [rom('XC'), rom('CX'), 'הם שווים'],
              answer: fromRoman('XC') > fromRoman('CX') ? 0 : 1,
            },
          ],
        },
        {
          title: 'חשבו, וכתבו את התשובה בספרות רומיות.',
          cols: 2,
          items: [
            romanCalc('XII', '+', 'VIII', 12 + 8),
            romanCalc('L', '-', 'X', 50 - 10),
            romanCalc('C', ':', 'II', 100 / 2),
            romanCalc('IX', '\\times', 'II', 9 * 2),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'כתבו במספרים.', cols: 3, items: ['XVII', 'XLIV', 'LXXX', 'CXC', 'MCMLXX'].map(fromItem) },
      { title: 'כתבו בספרות רומיות.', cols: 2, items: [19, 63, 400, 1500].map(toItem) },
      { title: 'בחרו.', cols: 1, items: [{ q: m`איך כותבים $9$?`, options: [rom('VIIII'), rom('IX'), rom('XI')], answer: 1 }] },
      { title: 'חשבו, וכתבו את התשובה בספרות רומיות.', cols: 1, items: [romanCalc('XX', '+', 'V', 25)] },
    ],
  },
};
