import { m } from '../helpers.js';
import { tf } from './shared.js';
import { inscribedFromCentral, centralFromInscribed, diameterTriangle } from '../g11/plane-circle.js';
import { tangentLength, tangentAngle } from '../g11/circle-tangents.js';

export default {
  id: 'g9r-circle-inscribed-tangent',
  grade: 9,
  emoji: '🎯',
  title: 'זווית היקפית ומשיק למעגל',
  reminder: [
    {
      title: 'זווית היקפית',
      md: m`הקודקוד **על המעגל**. **זווית היקפית = מחצית הזווית המרכזית** הנשענת על אותה קשת.

זוויות היקפיות על אותה קשת — **שוות**. זווית היקפית על **קוטר** — $90°$.`,
    },
    {
      title: 'משיק',
      md: m`**המשיק מאונך לרדיוס** בנקודת ההשקה.

**שני משיקים** מאותה נקודה חיצונית — **שווים באורכם**.`,
    },
  ],
  pages: [
    {
      title: 'זווית היקפית',
      exercises: [
        { title: 'השלימו.', cols: 1, items: [inscribedFromCentral(70), inscribedFromCentral(150), centralFromInscribed(25), centralFromInscribed(64)] },
        { title: 'משולש שצלע שלו היא קוטר.', cols: 1, items: [diameterTriangle(35), diameterTriangle(58)] },
        {
          title: 'זוויות על אותה קשת.',
          cols: 1,
          items: [
            { q: m`$\angle ACB$ ו-$\angle ADB$ נשענות על הקשת $AB$ (מאותו צד), $\angle ACB = 47°$. $\;\angle ADB =$ [[47]] $°$` },
            { q: m`הקשת $AB$ היא $100°$. כל זווית היקפית שנשענת עליה: [[50]] $°$` },
          ],
        },
      ],
    },
    {
      title: 'משיקים',
      exercises: [
        { title: 'אורך המשיק (המשיק מאונך לרדיוס).', cols: 1, items: [tangentLength(3, 5), tangentLength(5, 13), tangentLength(12, 15)] },
        { title: 'שני משיקים מנקודה אחת.', cols: 1, items: [tangentAngle(70), tangentAngle(50)] },
        {
          title: 'השלימו.',
          cols: 1,
          items: [
            { q: m`$PA$ ו-$PB$ משיקים למעגל, ו-$PA = 11$. $\;PB =$ [[11]]` },
            { q: m`$PA$ משיק ב-$A$, $O$ המרכז, $\angle APO = 35°$. $\;\angle AOP =$ [[${90 - 35}]] $°$` },
          ],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [tf('זווית היקפית גדולה מהזווית המרכזית על אותה קשת.', false), tf('המשיק למעגל מאונך לרדיוס בנקודת ההשקה.', true)],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'זוויות.', cols: 1, items: [inscribedFromCentral(112), diameterTriangle(41)] },
      { title: 'משיקים.', cols: 1, items: [tangentLength(8, 17), tangentAngle(80)] },
    ],
  },
};
