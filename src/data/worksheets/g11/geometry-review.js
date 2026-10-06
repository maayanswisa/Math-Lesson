import { m } from '../helpers.js';
import { tf } from './shared.js';
import { inscribedFromCentral, centralFromInscribed, chordDistance, diameterTriangle } from './plane-circle.js';
import { tangentLength, tangentAngle, cyclicOpposite, incircleSegments } from './circle-tangents.js';
import { side, angle, circumR, triArea, paraArea } from './trig-sine.js';
import { canonical, general, write, where, horizontal, tangentAt } from './analytic-circle.js';

export default {
  id: 'g11-u4-geometry-review',
  grade: 11,
  emoji: '🧩',
  title: 'תרגול מסכם — גאומטריה (כיתה י"א)',
  reminder: [
    {
      title: 'זוויות ומיתרים במעגל',
      md: m`היקפית $= \frac{1}{2}$ מרכזית (על אותה קשת) · היקפית על קוטר $= 90°$ · אנך מהמרכז חוצה מיתר: $r^2 = d^2 + (\frac{c}{2})^2$`,
    },
    {
      title: 'משיקים ומרובע חסום',
      md: m`משיק $\perp$ רדיוס · שני משיקים מנקודה — שווים · מרובע חסום: זוויות נגדיות $= 180°$`,
    },
    {
      title: 'משפט הסינוסים ושטחים',
      md: m`$\frac{a}{\sin A} = \frac{b}{\sin B} = 2R$ $\;\cdot\;$ $S_{\triangle} = \frac{1}{2}ab\sin\gamma$ $\;\cdot\;$ $S_{\text{מקבילית}} = ab\sin\theta$`,
    },
    {
      title: 'אנליטית',
      md: m`$(x - a)^2 + (y - b)^2 = R^2$ · משלימים לריבוע · משיק $\perp$ רדיוס (מכפלת שיפועים $-1$)`,
    },
  ],
  pages: [
    {
      title: 'המעגל, משיקים ומרובע חסום',
      exercises: [
        { title: 'זוויות במעגל.', cols: 1, items: [inscribedFromCentral(142), centralFromInscribed(44), diameterTriangle(63)] },
        { title: 'מיתרים ומשיקים.', cols: 1, items: [chordDistance(10, 16), tangentLength(12, 13), tangentAngle(56)] },
        { title: 'מרובע חסום ומעגל חסום.', cols: 1, items: [cyclicOpposite(97), incircleSegments(6, 8, 10)] },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf('במעגל, זוויות היקפיות הנשענות על אותה קשת שוות זו לזו.', true),
            tf('אם במרובע זוג אחד של זוויות נגדיות משלים ל-180°, אפשר לחסום אותו במעגל.', true),
            tf('מרכז המעגל החוסם משולש ישר-זווית נמצא על אחד הניצבים.', false),
          ],
        },
      ],
    },
    {
      title: 'טריגונומטריה וגאומטריה אנליטית',
      exercises: [
        { title: 'משפט הסינוסים.', cols: 1, items: [side(9, 55, 75), angle(12, 35, 10), circumR(14, 30)] },
        { title: 'שטחים.', cols: 1, items: [triArea(8, 15, 30), triArea(10, 12, 75), paraArea(9, 4, 150)] },
        { title: 'מרכז ורדיוס.', cols: 1, items: [canonical(-5, 2, 4), general(-1, 3, 5)] },
        { title: 'משוואה, נקודה וישר.', cols: 1, items: [write(-2, -6, 3), where([4, 6], 1, 2, 5), horizontal(-8, 8)] },
        { title: m`משיק $y = mx + b$.`, cols: 1, items: [tangentAt(8, 6)] },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'המעגל.', cols: 1, items: [inscribedFromCentral(84), chordDistance(15, 18)] },
      { title: 'משיקים.', cols: 1, items: [tangentLength(8, 10), cyclicOpposite(122)] },
      { title: 'משפט הסינוסים ושטח.', cols: 1, items: [side(20, 60, 45), triArea(9, 14, 30)] },
      { title: 'אנליטית.', cols: 1, items: [general(4, 1, 2), tangentAt(-3, 4)] },
    ],
  },
};
