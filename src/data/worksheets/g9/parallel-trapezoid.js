import { m, svgParts } from '../helpers.js';
import { tf } from './shared.js';

const { svg, label, INK, ACCENT } = svgParts;

/** שני ישרים מקבילים וחותך — זווית נתונה ליד הצומת העליון. */
const TRANSVERSAL = svg(
  240,
  150,
  `<line x1="10" y1="45" x2="230" y2="45" stroke="${INK}" stroke-width="2"/>` +
    `<line x1="10" y1="110" x2="230" y2="110" stroke="${INK}" stroke-width="2"/>` +
    `<line x1="70" y1="140" x2="170" y2="10" stroke="${ACCENT}" stroke-width="2"/>` +
    label(128, 38, '1') +
    label(107, 60, '2') +
    label(95, 103, '3') +
    label(74, 127, '4') +
    label(222, 40, 'a', 'end') +
    label(222, 105, 'b', 'end'),
);

const angles = (g) => ({
  q: m`$a \parallel b$, $\;\angle 1 = ${g}°$`,
  figure: TRANSVERSAL,
  a: m`$\angle 2 =$ [[${180 - g}]] $° \quad \angle 3 =$ [[${g}]] $° \quad \angle 4 =$ [[${180 - g}]] $°$`,
});

const isoTrapezoid = (base) => ({
  q: m`בטרפז שווה-שוקיים $ABCD$ ($AB \parallel CD$, $AB$ הבסיס הגדול), $\;\angle A = ${base}°$.`,
  a: m`$\angle B =$ [[${base}]] $° \quad \angle C =$ [[${180 - base}]] $° \quad \angle D =$ [[${180 - base}]] $°$`,
});

const midline = (a, b) => ({ q: m`בסיסי הטרפז $${a}$ ו-$${b}$. קטע האמצעים: [[${(a + b) / 2}]]` });
const otherBase = (mid, a) => ({ q: m`קטע האמצעים בטרפז $${mid}$, ובסיס אחד $${a}$. הבסיס השני: [[${2 * mid - a}]]` });
const area = (a, b, h) => ({ q: m`בסיסים $${a}$ ו-$${b}$, גובה $${h}$. שטח הטרפז: [[${((a + b) / 2) * h}]]` });

export default {
  id: 'g9r-parallel-trapezoid',
  grade: 9,
  emoji: '🛤️',
  title: 'ישרים מקבילים וטרפז',
  reminder: [
    {
      title: 'ישרים מקבילים וחותך',
      md: m`<div class="diagram-box">${TRANSVERSAL}</div>

**מתאימות** שוות · **מתחלפות** שוות · **חד-צדדיות** משלימות ל-$180°$. ולהפך: אם מתחלפות שוות — הישרים מקבילים.`,
    },
    {
      title: 'טרפז שווה-שוקיים',
      md: m`זוויות הבסיס שוות, האלכסונים שווים. זוויות ליד אותה שוק משלימות ל-$180°$.`,
    },
    {
      title: 'קטע אמצעים בטרפז',
      md: m`מחבר את אמצעי השוקיים, **מקביל לבסיסים** ושווה ל**ממוצע** שלהם: $\frac{a + b}{2}$.

שטח טרפז $=$ קטע האמצעים $\times$ הגובה.`,
    },
  ],
  pages: [
    {
      title: 'זוויות בין מקבילים',
      exercises: [
        { title: 'מצאו את הזוויות.', cols: 2, items: [angles(115), angles(110), angles(128)] },
        {
          title: 'מקבילים או לא?',
          cols: 1,
          items: [
            { q: m`שתי זוויות מתחלפות הן $72°$ ו-$72°$. האם הישרים מקבילים?`, options: ['כן', 'לא'], answer: 0 },
            { q: m`שתי זוויות חד-צדדיות הן $95°$ ו-$95°$. האם הישרים מקבילים?`, options: ['כן', 'לא'], answer: 95 + 95 === 180 ? 0 : 1 },
            { q: m`שתי זוויות חד-צדדיות הן $70°$ ו-$110°$. האם הישרים מקבילים?`, options: ['כן', 'לא'], answer: 0 },
          ],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [tf('זוויות מתאימות בין ישרים מקבילים שוות.', true), tf('זוויות חד-צדדיות בין ישרים מקבילים שוות.', false)],
        },
      ],
    },
    {
      title: 'טרפז',
      exercises: [
        { title: 'זוויות בטרפז שווה-שוקיים.', cols: 1, items: [isoTrapezoid(70), isoTrapezoid(55), isoTrapezoid(82)] },
        { title: 'קטע אמצעים בטרפז.', cols: 2, items: [midline(10, 6), midline(15, 8), otherBase(9, 12), otherBase(7.5, 5)] },
        { title: 'שטח טרפז.', cols: 1, items: [area(10, 6, 4), area(13, 7, 5), area(9, 4, 6)] },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [tf('בטרפז שווה-שוקיים האלכסונים שווים.', true), tf('קטע האמצעים בטרפז שווה לבסיס הגדול פחות הקטן.', false)],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'זוויות בין מקבילים.', cols: 1, items: [angles(124)] },
      { title: 'טרפז שווה-שוקיים.', cols: 1, items: [isoTrapezoid(64)] },
      { title: 'קטע אמצעים ושטח.', cols: 1, items: [midline(18, 10), otherBase(11, 16), area(12, 8, 7)] },
    ],
  },
};
