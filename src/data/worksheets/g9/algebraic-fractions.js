import { m } from '../helpers.js';
import { exact, tf } from './shared.js';

/** משוואה עם נעלם במכנה: הפתרון נבדק בהצבה, ונבדק שאינו מאפס מכנה. */
function eq(tex, sol, lhs, rhs, dens) {
  if (Math.abs(lhs(sol) - rhs(sol)) > 1e-9) throw new Error(`${sol} does not solve ${tex}`);
  if (dens.some((d) => Math.abs(d(sol)) < 1e-12)) throw new Error(`${sol} zeroes a denominator in ${tex}`);
  return { q: m`$${tex}$ $\qquad x =$ ${exact(sol)}` };
}

/** תוצאה של כפל/חילוק שברים אחרי צמצום, כביטוי ax + b — נבדק בכמה נקודות. */
function simplified(tex, f, [a, b], probes = [2.5, 4.5, 7.5]) {
  for (const x of probes) if (Math.abs(f(x) - (a * x + b)) > 1e-9) throw new Error(`wrong simplification of ${tex}`);
  return { q: m`$${tex} =$`, a: m`[[${a}]] $x +$ [[${b}]]` };
}

const undefinedAt = (tex, xs) => ({
  q: m`$${tex}$ — לאילו ערכי $x$ הביטוי לא מוגדר?`,
  a: xs.length === 1 ? m`$x =$ [[${xs[0]}]]` : m`$x_1 =$ [[${xs[0]}]] $\qquad x_2 =$ [[${xs[1]}]] $\qquad (x_1 > x_2)$`,
});

export default {
  id: 'g9r-algebraic-fractions',
  grade: 9,
  emoji: '➗',
  title: 'שברים אלגבריים: כפל, חילוק ומשוואות עם נעלם במכנה',
  reminder: [
    {
      title: 'תחום הגדרה',
      md: m`מכנה **אסור** שיהיה $0$. $\;\frac{5}{x - 4}$ לא מוגדר ב-$x = 4$.`,
    },
    {
      title: 'כפל וחילוק',
      md: m`**מפרקים** קודם, **מצמצמים**, ואז כופלים. חילוק = כפל בהופכי:

$\frac{x^2 - 4}{x + 3} \cdot \frac{x + 3}{x - 2} = \frac{(x + 2)(x - 2)}{x + 3} \cdot \frac{x + 3}{x - 2} = x + 2$`,
    },
    {
      title: 'משוואה עם נעלם במכנה',
      wide: true,
      md: m`כופלים את שני האגפים במכנה המשותף ופותרים. **בסוף בודקים**: פתרון שמאפס מכנה — **נפסל**.

$\frac{x^2}{x - 2} = \frac{4}{x - 2} \Rightarrow x^2 = 4 \Rightarrow x = \pm 2$, אבל $x = 2$ מאפס את המכנה ← הפתרון היחיד: $x = -2$.`,
    },
  ],
  pages: [
    {
      title: 'תחום הגדרה, כפל וחילוק',
      exercises: [
        {
          title: 'תחום ההגדרה.',
          cols: 1,
          items: [undefinedAt('\\frac{5}{x - 4}', [4]), undefinedAt('\\frac{x}{2x + 6}', [-3]), undefinedAt('\\frac{3}{x^2 - 9}', [3, -3]), undefinedAt('\\frac{x + 1}{x^2 - 5x}', [5, 0])],
        },
        {
          title: m`פשטו (התשובה מהצורה $ax + b$).`,
          cols: 1,
          items: [
            simplified('\\frac{x^2 - 4}{x + 3} \\cdot \\frac{x + 3}{x - 2}', (x) => ((x * x - 4) / (x + 3)) * ((x + 3) / (x - 2)), [1, 2]),
            simplified('\\frac{x^2 - 9}{2x} \\cdot \\frac{4x}{x - 3}', (x) => ((x * x - 9) / (2 * x)) * ((4 * x) / (x - 3)), [2, 6]),
            simplified('\\frac{x^2 + 2x}{5} \\div \\frac{x}{10}', (x) => ((x * x + 2 * x) / 5) / (x / 10), [2, 4]),
            simplified('\\frac{3x + 6}{x - 1} \\div \\frac{x + 2}{x^2 - x}', (x) => ((3 * x + 6) / (x - 1)) / ((x + 2) / (x * x - x)), [3, 0]),
          ],
        },
        {
          title: 'חשבו.',
          cols: 2,
          items: [
            { q: m`$\frac{2x}{x + 1} \div \frac{4x}{x + 1} =$ ${exact(0.5)}` },
            { q: m`$\frac{x - 5}{x + 5} \cdot \frac{x + 5}{5 - x} =$ [[-1]]` },
          ],
        },
      ],
    },
    {
      title: 'משוואות עם נעלם במכנה',
      exercises: [
        {
          title: 'פתרו (ובדקו שהפתרון לא מאפס מכנה).',
          cols: 2,
          items: [
            eq('\\frac{6}{x} = 2', 3, (x) => 6 / x, () => 2, [(x) => x]),
            eq('\\frac{3}{x - 1} = 1', 4, (x) => 3 / (x - 1), () => 1, [(x) => x - 1]),
            eq('\\frac{2}{x} + 1 = \\frac{3}{x}', 1, (x) => 2 / x + 1, (x) => 3 / x, [(x) => x]),
            eq('\\frac{x + 2}{x - 1} = 2', 4, (x) => (x + 2) / (x - 1), () => 2, [(x) => x - 1]),
            eq('\\frac{5}{x + 2} = \\frac{3}{x}', 3, (x) => 5 / (x + 2), (x) => 3 / x, [(x) => x + 2, (x) => x]),
            eq('\\frac{1}{x} + \\frac{1}{2x} = \\frac{3}{4}', 2, (x) => 1 / x + 1 / (2 * x), () => 3 / 4, [(x) => x]),
          ],
        },
        {
          title: 'פתרון שנפסל.',
          cols: 1,
          items: [
            eq('\\frac{x^2}{x - 2} = \\frac{4}{x - 2}', -2, (x) => (x * x) / (x - 2), (x) => 4 / (x - 2), [(x) => x - 2]),
            eq('\\frac{x^2 - 1}{x + 1} = 3', 4, (x) => (x * x - 1) / (x + 1), () => 3, [(x) => x + 1]),
            {
              q: m`למשוואה $\frac{x}{x - 3} = \frac{3}{x - 3}$...`,
              options: ['יש פתרון יחיד: x = 3', 'אין פתרון', 'יש אינסוף פתרונות'],
              answer: 1,
            },
          ],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [tf(m`$\frac{x + 3}{x} = 3$ לכל $x \ne 0$.`, false), tf('אחרי שכופלים במכנה המשותף, תמיד צריך לבדוק את הפתרונות.', true)],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'תחום ההגדרה.', cols: 1, items: [undefinedAt('\\frac{7}{x^2 - 16}', [4, -4])] },
      {
        title: 'פשטו.',
        cols: 1,
        items: [simplified('\\frac{x^2 - 25}{x} \\cdot \\frac{2x}{x + 5}', (x) => ((x * x - 25) / x) * ((2 * x) / (x + 5)), [2, -10])],
      },
      {
        title: 'פתרו.',
        cols: 2,
        items: [
          eq('\\frac{8}{x + 1} = 2', 3, (x) => 8 / (x + 1), () => 2, [(x) => x + 1]),
          eq('\\frac{x^2}{x + 3} = \\frac{9}{x + 3}', 3, (x) => (x * x) / (x + 3), (x) => 9 / (x + 3), [(x) => x + 3]),
        ],
      },
    ],
  },
};
