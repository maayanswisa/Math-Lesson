import { m } from '../helpers.js';
import { exact, near, PI, tf } from './shared.js';

const box = (a, b, c) => ({
  q: m`תיבה: $${a}$ על $${b}$ על $${c}$ ס״מ`,
  a: m`נפח (סמ״ק): [[${a * b * c}]] $\qquad$ שטח פנים (סמ״ר): [[${2 * (a * b + a * c + b * c)}]]`,
});

const diagonal = (a, b, c) => ({ q: m`תיבה: $${a}$ על $${b}$ על $${c}$ ס״מ`, a: m`האלכסון (ס״מ): ${exact(Math.sqrt(a * a + b * b + c * c))}` });

const cylinder = (r, h) => ({
  q: m`גליל: רדיוס $${r}$ ס״מ, גובה $${h}$ ס״מ`,
  a: m`נפח (סמ״ק): ${near(PI * r * r * h)} $\qquad$ מעטפת (סמ״ר): ${near(2 * PI * r * h)} $\qquad$ שטח פנים (סמ״ר): ${near(2 * PI * r * r + 2 * PI * r * h)}`,
});

/** פירמידה ריבועית ישרה: צלע בסיס a, גובה h (גובה הפאה שלם). */
const pyramid = (a, h) => {
  const hf = Math.sqrt(h * h + (a / 2) ** 2);
  if (!Number.isInteger(hf)) throw new Error('apothem not whole');
  return {
    q: m`פירמידה ריבועית ישרה: צלע הבסיס $${a}$ ס״מ, גובה $${h}$ ס״מ`,
    a: m`נפח (סמ״ק): ${exact((a * a * h) / 3)} $\qquad$ גובה הפאה (ס״מ): [[${hf}]] $\qquad$ שטח פנים (סמ״ר): [[${a * a + 2 * a * hf}]]`,
  };
};

/** חרוט: רדיוס r, גובה h (קו היוצר שלם). */
const cone = (r, h) => {
  const l = Math.sqrt(r * r + h * h);
  if (!Number.isInteger(l)) throw new Error('slant not whole');
  return {
    q: m`חרוט: רדיוס $${r}$ ס״מ, גובה $${h}$ ס״מ`,
    a: m`קו היוצר (ס״מ): [[${l}]] $\qquad$ נפח (סמ״ק): ${near((PI * r * r * h) / 3)} $\qquad$ שטח פנים (סמ״ר): ${near(PI * r * r + PI * r * l)}`,
  };
};

const sphere = (r) => ({ q: m`כדור: רדיוס $${r}$ ס״מ`, a: m`נפח (סמ״ק): ${near((4 / 3) * PI * r ** 3)} $\qquad$ שטח פנים (סמ״ר): ${near(4 * PI * r * r)}` });

export default {
  id: 'g12-u3-solids',
  grade: 12,
  emoji: '🧊',
  title: 'גופים במרחב: נפח ושטח פנים',
  reminder: [
    {
      title: 'מנסרה וגליל',
      md: m`**נפח:** שטח הבסיס $\times$ הגובה

**מעטפת:** היקף הבסיס $\times$ הגובה

**שטח פנים:** המעטפת ועוד שני בסיסים

גליל: $V=\pi r^2h$, $\;$ מעטפת $2\pi rh$`,
    },
    {
      title: 'פירמידה וחרוט',
      md: m`**נפח:** $\frac13$ $\times$ שטח הבסיס $\times$ הגובה

גובה הפאה בפירמידה ריבועית: $\sqrt{h^2+(a/2)^2}$

חרוט: קו יוצר $\ell=\sqrt{r^2+h^2}$, $\;$ מעטפת $\pi r\ell$`,
    },
    {
      title: 'עוד',
      wide: true,
      md: m`אלכסון של תיבה: $\sqrt{a^2+b^2+c^2}$

כדור: $V=\frac43\pi r^3$, $\;$ $S=4\pi r^2$

בדף הזה $\pi\approx3.14$`,
    },
  ],
  pages: [
    {
      title: 'תיבה, מנסרה וגליל',
      exercises: [
        { title: 'נפח ושטח פנים של תיבה.', cols: 1, items: [box(4, 3, 2), box(10, 5, 2), box(6, 6, 6)] },
        { title: 'האלכסון של התיבה.', cols: 2, items: [diagonal(3, 4, 12), diagonal(2, 3, 6), diagonal(1, 2, 2), diagonal(2, 2, 2)] },
        {
          title: 'מנסרה משולשת.',
          cols: 1,
          items: [
            {
              q: m`הבסיס — משולש ישר-זווית עם צלעות $3$, $4$, $5$ ס״מ. גובה המנסרה $10$ ס״מ.`,
              a: m`שטח הבסיס (סמ״ר): [[6]] $\qquad$ נפח (סמ״ק): [[60]] $\qquad$ שטח פנים (סמ״ר): [[132]]`,
            },
            {
              q: m`הבסיס — משולש ישר-זווית עם ניצבים $6$ ו-$8$ ס״מ. גובה המנסרה $5$ ס״מ.`,
              a: m`היתר (ס״מ): [[10]] $\qquad$ נפח (סמ״ק): [[120]] $\qquad$ שטח פנים (סמ״ר): [[168]]`,
            },
          ],
        },
        { title: m`גליל ($\pi\approx3.14$).`, cols: 1, items: [cylinder(3, 10), cylinder(5, 4), cylinder(2, 7)] },
      ],
    },
    {
      title: 'פירמידה, חרוט וכדור',
      exercises: [
        { title: 'פירמידה ריבועית ישרה.', cols: 1, items: [pyramid(6, 4), pyramid(10, 12), pyramid(16, 6)] },
        { title: m`חרוט ($\pi\approx3.14$).`, cols: 1, items: [cone(6, 8), cone(5, 12), cone(3, 4)] },
        { title: m`כדור ($\pi\approx3.14$).`, cols: 1, items: [sphere(3), sphere(6)] },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf('נפח של חרוט הוא שליש מנפח הגליל שיש לו אותו בסיס ואותו גובה.', true),
            tf('בחרוט, קו היוצר קצר מהגובה.', false),
            tf('המעטפת של גליל פרוסה היא מלבן.', true),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'תיבה.', cols: 1, items: [box(5, 4, 3)] },
      { title: 'גליל.', cols: 1, items: [cylinder(4, 6)] },
      { title: 'פירמידה.', cols: 1, items: [pyramid(8, 3)] },
      { title: 'חרוט.', cols: 1, items: [cone(9, 12)] },
    ],
  },
};
