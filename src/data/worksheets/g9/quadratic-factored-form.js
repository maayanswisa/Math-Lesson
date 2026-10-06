import { m, round } from '../helpers.js';
import { exact, poly, tf, factorTex } from './shared.js';

const aTex = (a) => (a === 1 ? '' : a === -1 ? '-' : String(a));
const factored = (a, r1, r2) => `${aTex(a)}${factorTex(r1)}${factorTex(r2)}`;

/** שורשים וציר סימטריה מצורת המכפלה. */
const fromFactored = (a, r1, r2) => {
  const [big, small] = r1 >= r2 ? [r1, r2] : [r2, r1];
  return {
    q: m`$y = ${factored(a, r1, r2)}$`,
    a: m`$x_1 =$ [[${big}]] $,\; x_2 =$ [[${small}]] $\;(x_1 > x_2) \qquad$ ציר הסימטריה: $x =$ ${exact((r1 + r2) / 2)}`,
  };
};

/** קודקוד מצורת המכפלה: באמצע בין השורשים. */
const vertexFromFactored = (a, r1, r2) => {
  const p = (r1 + r2) / 2;
  return { q: m`$y = ${factored(a, r1, r2)}$`, a: m`קודקוד: $($ ${exact(p)} $,\,$ ${exact(round(a * (p - r1) * (p - r2)))} $)$` };
};

/** מצורת המכפלה לסטנדרטית. */
const toStandard = (a, r1, r2) => ({
  q: m`$y = ${factored(a, r1, r2)}$`,
  a: m`$y =$ [[${a}]] $x^2 +$ [[${-a * (r1 + r2)}]] $x +$ [[${a * r1 * r2}]]`,
});

/** מסטנדרטית לצורת המכפלה (a נתון), השורשים מחושבים מהפירוק. */
function toFactored(a, r1, r2) {
  const [big, small] = r1 >= r2 ? [r1, r2] : [r2, r1];
  return {
    q: m`$y = ${poly([a, -a * (r1 + r2), a * r1 * r2])}$`,
    a: m`$y = ${aTex(a)}(x -$ [[${big}]] $)(x -$ [[${small}]] $)$`,
  };
}

/** פרבולה דרך שני שורשים ונקודה נוספת: מוצאים את a. */
function findA(r1, r2, [x0, y0]) {
  const a = y0 / ((x0 - r1) * (x0 - r2));
  return { q: m`שורשים $${r1}$ ו-$${r2}$, והפרבולה עוברת בנקודה $(${x0}, ${y0})$.`, a: m`$a =$ ${exact(a)}` };
}

export default {
  id: 'g9r-quadratic-factored-form',
  grade: 9,
  emoji: '🎯',
  title: 'פונקציה ריבועית — צורת המכפלה (לפי השורשים)',
  reminder: [
    {
      title: 'צורת המכפלה',
      md: m`$$y = a(x - m)(x - t)$$

$m$ ו-$t$ הם **השורשים** — נקודות החיתוך עם ציר $x$: $(m, 0)$ ו-$(t, 0)$.`,
    },
    {
      title: 'ציר הסימטריה והקודקוד',
      md: m`ציר הסימטריה **באמצע** בין השורשים: $x = \frac{m + t}{2}$. מציבים אותו ומקבלים את $y$ של הקודקוד.

$y = (x - 1)(x - 5)$: $\;x = 3$, $\;y = (2)(-2) = -4$ ← קודקוד $(3, -4)$`,
    },
    {
      title: 'שורש כפול',
      md: m`$y = a(x - m)^2$ — הפרבולה **משיקה** לציר $x$ בנקודה $(m, 0)$, שהיא גם הקודקוד.`,
    },
  ],
  pages: [
    {
      title: 'מצורת המכפלה',
      exercises: [
        { title: 'שורשים וציר סימטריה.', cols: 1, items: [fromFactored(1, 1, 5), fromFactored(2, -3, 1), fromFactored(-1, 4, -2), fromFactored(3, 0, 6), fromFactored(1, -5, -1)] },
        { title: 'מצאו את הקודקוד.', cols: 1, items: [vertexFromFactored(1, 1, 5), vertexFromFactored(-1, 4, -2), vertexFromFactored(2, 0, 4), vertexFromFactored(-2, -3, 1)] },
        { title: 'פתחו לצורה הסטנדרטית.', cols: 1, items: [toStandard(1, 2, 3), toStandard(1, -4, 1), toStandard(2, 3, -1), toStandard(-1, 5, 0)] },
      ],
    },
    {
      title: 'אל צורת המכפלה',
      exercises: [
        { title: 'כתבו בצורת המכפלה (השורש הגדול ראשון; מספר שלילי — עם מינוס).', cols: 1, items: [toFactored(1, 3, 2), toFactored(1, 5, -2), toFactored(2, 4, -1), toFactored(-1, 3, -3)] },
        { title: m`מצאו את $a$.`, cols: 1, items: [findA(1, 5, [0, 10]), findA(-2, 2, [0, 8]), findA(0, 4, [2, 6])] },
        {
          title: 'שורש כפול ובחירה.',
          cols: 1,
          items: [
            { q: m`$y = 2(x - 3)^2$ — באיזו נקודה הפרבולה משיקה לציר $x$?`, a: m`$($ [[3]] $,\,0)$` },
            {
              q: m`איזו פונקציה חותכת את ציר $x$ ב-$x = -1$ וב-$x = 4$?`,
              options: [m`$y = (x - 1)(x + 4)$`, m`$y = (x + 1)(x - 4)$`, m`$y = (x + 1)(x + 4)$`],
              answer: 1,
            },
            tf(m`לכל פונקציה ריבועית אפשר לכתוב צורת מכפלה.`, false),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'שורשים וציר סימטריה.', cols: 1, items: [fromFactored(1, -2, 6)] },
      { title: 'קודקוד.', cols: 1, items: [vertexFromFactored(1, -2, 6)] },
      { title: 'פתחו.', cols: 1, items: [toStandard(1, -3, 2)] },
      { title: 'כתבו בצורת המכפלה (השורש הגדול ראשון).', cols: 1, items: [toFactored(1, 7, -1)] },
      { title: m`מצאו את $a$.`, cols: 1, items: [findA(1, 3, [2, 3])] },
    ],
  },
};
