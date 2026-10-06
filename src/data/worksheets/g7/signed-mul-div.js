import { m } from '../helpers.js';
import { tf, sn, ev, evItem } from './shared.js';

const mul = (a, b) => evItem(m`${sn(a)} \times ${sn(b)}`);
const div = (a, b) => {
  if (a % b) throw new Error(`${a} not divisible by ${b}`);
  return evItem(m`${sn(a)} : ${sn(b)}`);
};

/** סימן התוצאה בלבד. */
const SIGNS = ['חיובי', 'שלילי', 'אפס'];
const sign = (tex) => {
  const v = ev(tex);
  return { q: m`הסימן של $${tex}$:`, options: SIGNS, answer: v > 0 ? 0 : v < 0 ? 1 : 2 };
};

/** גורם חסר. */
const factor = (a, p) => {
  if (p % a) throw new Error(`${p} not a multiple of ${a}`);
  return { q: m`$${sn(a)} \times$ [[${p / a}]] $= ${p}$` };
};

export default {
  id: 'g7-signed-mul-div',
  grade: 7,
  emoji: '✖️',
  title: 'כפל וחילוק מספרים מכוונים',
  reminder: [
    {
      title: 'כלל הסימנים',
      md: m`* סימנים **שווים** ← תוצאה **חיובית**: $\;(-4) \cdot (-5) = 20$
* סימנים **שונים** ← תוצאה **שלילית**: $\;(-4) \cdot 5 = -20$

אותו כלל בחילוק: $(-12) : (-3) = 4$, $\;(-12) : 3 = -4$`,
    },
    {
      title: 'כמה גורמים',
      md: m`סופרים את הגורמים **השליליים**: מספר **זוגי** — התוצאה חיובית, **אי-זוגי** — שלילית.

$(-1) \cdot (-2) \cdot (-3) = -6$ (שלושה שליליים)`,
    },
  ],
  pages: [
    {
      title: 'כפל',
      exercises: [
        { title: 'כפלו.', cols: 2, items: [mul(-3, 4), mul(-5, -6), mul(7, -8), mul(-9, -9), mul(-1, 25), mul(0, -14), mul(-12, -3), mul(11, -4)] },
        { title: 'מה הסימן של התוצאה?', cols: 1, items: [sign(m`(-2) \times (-3) \times (-4)`), sign(m`(-1) \times 5 \times (-6)`), sign(m`(-7) \times 0 \times (-3)`)] },
        { title: 'חשבו.', cols: 2, items: [evItem(m`(-2) \times (-3) \times (-4)`), evItem(m`(-1) \times 5 \times (-6)`), evItem(m`3 \times (-2) \times 5`), evItem(m`(-10) \times (-10) \times (-1)`)] },
      ],
    },
    {
      title: 'חילוק ושילובים',
      exercises: [
        { title: 'חלקו.', cols: 2, items: [div(-12, -3), div(-12, 3), div(20, -4), div(-35, 5), div(-48, -6), div(0, -7), div(72, -9), div(-100, -25)] },
        { title: 'השלימו את הגורם החסר.', cols: 2, items: [factor(-4, 28), factor(6, -42), factor(-9, -81), factor(-5, 0)] },
        { title: 'חשבו.', cols: 2, items: [evItem(m`(-24) : 4 \times (-2)`), evItem(m`(-6) \times (-3) : (-9)`), evItem(m`(-40) : (-8) : (-5)`), evItem(m`7 \times (-6) : (-14)`)] },
        { title: 'נכון או לא נכון?', cols: 1, items: [tf(m`$(-5) \times (-5) = -25$`, ev('(-5) * (-5)') === -25), tf('מכפלה של ארבעה מספרים שליליים היא חיובית.', true)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'חשבו.', cols: 2, items: [mul(-8, 7), mul(-6, -11), div(-63, 9), div(-54, -6), evItem(m`(-2) \times (-5) \times (-3)`), evItem(m`(-36) : (-4) \times (-1)`)] },
      { title: 'מה הסימן?', cols: 1, items: [sign(m`(-3) \times (-3) \times (-3) \times (-3)`)] },
      { title: 'השלימו.', cols: 1, items: [factor(-7, 56)] },
    ],
  },
};
