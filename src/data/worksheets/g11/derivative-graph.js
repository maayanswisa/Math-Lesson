import { m, coordPlane } from '../helpers.js';
import { exact, tf } from './shared.js';

/** סוג הנקודה של f ב-x0, לפי החלפת הסימן של f′ (נבדק מספרית). */
const KINDS = ['מקסימום', 'מינימום', 'אין קיצון'];
function kindAt(fp, x0) {
  const l = fp(x0 - 1e-3);
  const r = fp(x0 + 1e-3);
  return l > 0 && r < 0 ? 0 : l < 0 && r > 0 ? 1 : 2;
}
const kind = (fpTex, fp, x0) => ({ q: m`$f'(x)=${fpTex}$. מה יש ל-$f$ ב-$x=${x0}$?`, options: KINDS, answer: kindAt(fp, x0) });

/** תחום עלייה/ירידה: בוחרים את התחום שבו f′ חיובית/שלילית (נבדק על רשת). */
function interval(fpTex, fp, wantUp, options) {
  const xs = Array.from({ length: 161 }, (_, i) => -10 + i * 0.125).filter((x) => Math.abs(fp(x)) > 1e-9);
  const fits = options.map(([, inSet]) => xs.every((x) => (wantUp ? fp(x) > 0 : fp(x) < 0) === inSet(x)));
  if (fits.filter(Boolean).length !== 1) throw new Error(`expected exactly one interval for ${fpTex}`);
  return { q: m`$f'(x)=${fpTex}$. באיזה תחום $f$ ${wantUp ? 'עולה' : 'יורדת'}?`, options: options.map(([l]) => l), answer: fits.indexOf(true) };
}

const slopeAt = (fpTex, fp, x0) => ({ q: m`$f'(x)=${fpTex}$. שיפוע המשיק לגרף $f$ ב-$x=${x0}$:`, a: exact(fp(x0)) });

/* גרף הנגזרת: ישר — f′(x) = 2 − x */
const FP_LINE = coordPlane({ min: -6, max: 6, lines: [{ m: -1, b: 2 }] });
const fpLine = (x) => 2 - x;

export default {
  id: 'g11-u4-derivative-graph',
  grade: 11,
  emoji: '🪞',
  title: 'גרף הפונקציה וגרף הנגזרת',
  reminder: [
    {
      title: 'מה גרף הנגזרת אומר',
      md: m`$f'$ מעל הציר ← $f$ עולה · $f'$ מתחת לציר ← $f$ יורדת

$f'$ חוצה מ-$+$ ל-$-$ ← מקסימום · מ-$-$ ל-$+$ ← מינימום · נוגעת בלי לחצות ← אין קיצון`,
    },
    {
      title: 'ערך = שיפוע',
      md: m`$f'(x_0)$ הוא שיפוע המשיק לגרף $f$ ב-$x_0$. המקסימום של $f'$ הוא נקודת פיתול של $f$ — לא קיצון.`,
    },
  ],
  pages: [
    {
      title: 'עלייה, ירידה וקיצון',
      exercises: [
        {
          title: 'בחרו את התחום.',
          cols: 1,
          items: [
            interval(m`(x-3)(x+1)`, (x) => (x - 3) * (x + 1), false, [
              [m`$-1<x<3$`, (x) => x > -1 && x < 3],
              [m`$x<-1$ או $x>3$`, (x) => x < -1 || x > 3],
              [m`$x>3$`, (x) => x > 3],
            ]),
            interval(m`-(x-1)(x-5)`, (x) => -(x - 1) * (x - 5), true, [
              [m`$x<1$ או $x>5$`, (x) => x < 1 || x > 5],
              [m`$1<x<5$`, (x) => x > 1 && x < 5],
              [m`$x<3$`, (x) => x < 3],
            ]),
          ],
        },
        {
          title: 'מה יש ל-$f$ בנקודה?',
          cols: 1,
          items: [
            kind(m`(x-3)(x+1)`, (x) => (x - 3) * (x + 1), 3),
            kind(m`(x-3)(x+1)`, (x) => (x - 3) * (x + 1), -1),
            kind(m`x^2(x-2)`, (x) => x * x * (x - 2), 0),
            kind(m`x^2(x-2)`, (x) => x * x * (x - 2), 2),
            kind(m`(x-4)^2`, (x) => (x - 4) ** 2, 4),
          ],
        },
      ],
    },
    {
      title: 'קריאת גרף הנגזרת',
      exercises: [
        {
          title: 'בשרטוט: הגרף של הנגזרת $f\'$ (ישר).',
          cols: 1,
          figure: FP_LINE,
          items: [
            { q: m`איפה $f'$ חותכת את ציר $x$?`, a: m`$x =$ [[2]]` },
            { q: m`מה יש ל-$f$ שם?`, options: KINDS, answer: kindAt(fpLine, 2) },
            { q: m`שיפוע המשיק לגרף $f$ ב-$x=-1$:`, a: exact(fpLine(-1)) },
          ],
        },
        { title: 'שיפוע משיק.', cols: 2, items: [slopeAt(m`2x-4`, (x) => 2 * x - 4, 5), slopeAt(m`x^2-3x`, (x) => x * x - 3 * x, 4), slopeAt(m`\dfrac{6}{x}`, (x) => 6 / x, 3)] },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf(m`בנקודת המקסימום של גרף $f'$ יש ל-$f$ מקסימום.`, false),
            tf(m`אם $f'(x)<0$ לכל $x$, ל-$f$ אין נקודות קיצון.`, true),
            tf(m`אם $f'(2)=0$ ו-$f'$ לא מחליפה סימן ב-$2$, אין שם קיצון.`, true),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      {
        title: 'גרף הנגזרת.',
        cols: 1,
        items: [
          kind(m`(x+2)(x-4)`, (x) => (x + 2) * (x - 4), -2),
          interval(m`(x+2)(x-4)`, (x) => (x + 2) * (x - 4), true, [
            [m`$-2<x<4$`, (x) => x > -2 && x < 4],
            [m`$x<-2$ או $x>4$`, (x) => x < -2 || x > 4],
            [m`$x>-2$`, (x) => x > -2],
          ]),
          slopeAt(m`3x^2-12`, (x) => 3 * x * x - 12, 1),
        ],
      },
    ],
  },
};
