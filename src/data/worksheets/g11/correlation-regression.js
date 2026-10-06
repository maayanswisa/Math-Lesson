import { m, round, svgParts } from '../helpers.js';
import { exact, tf } from './shared.js';

const { svg, INK, ACCENT } = svgParts;

/** מחולל פסאודו-אקראי קבוע (כדי שהדיאגרמה תהיה זהה בכל טעינה). */
function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** מקדם המתאם של נקודות — כדי לוודא שהדיאגרמה באמת מתאימה לתשובה. */
function pearson(pts) {
  const n = pts.length;
  const mx = pts.reduce((s, p) => s + p[0], 0) / n;
  const my = pts.reduce((s, p) => s + p[1], 0) / n;
  let sxy = 0;
  let sxx = 0;
  let syy = 0;
  for (const [x, y] of pts) {
    sxy += (x - mx) * (y - my);
    sxx += (x - mx) ** 2;
    syy += (y - my) ** 2;
  }
  return sxy / Math.sqrt(sxx * syy);
}

/** דיאגרמת פיזור עם שיפוע slope ורעש noise. */
function scatter(slope, noise, seed) {
  const r = rng(seed);
  const pts = Array.from({ length: 24 }, () => {
    const x = r() * 10;
    return [x, 5 + slope * (x - 5) + (r() - 0.5) * noise];
  });
  const X = (x) => round(20 + x * 18, 1);
  const Y = (y) => round(200 - y * 18, 1);
  let body = `<line x1="20" y1="200" x2="210" y2="200" stroke="${INK}" stroke-width="1.5"/><line x1="20" y1="200" x2="20" y2="10" stroke="${INK}" stroke-width="1.5"/>`;
  for (const [x, y] of pts) body += `<circle cx="${X(x)}" cy="${Y(Math.max(0, Math.min(10.5, y)))}" r="3.4" fill="${ACCENT}" fill-opacity="0.85"/>`;
  return { fig: svg(220, 210, body), r: pearson(pts) };
}

const R_OPTIONS = ['0.95', '0.4', '0', '-0.4', '-0.95'];
/** בוחרים את מקדם המתאם הקרוב ביותר — ומוודאים שהוא אכן הקרוב. */
function guessR(slope, noise, seed, expected) {
  const { fig, r } = scatter(slope, noise, seed);
  const closest = R_OPTIONS.reduce((best, o) => (Math.abs(Number(o) - r) < Math.abs(Number(best) - r) ? o : best));
  if (closest !== expected) throw new Error(`scatter r=${r.toFixed(2)} is closest to ${closest}, not ${expected}`);
  return { q: '', figure: fig, options: R_OPTIONS.map((o) => m`$r = ${o}$`), answer: R_OPTIONS.indexOf(expected) };
}

/** קו הרגרסיה: b = r·Sy/Sx, עובר דרך (x̄, ȳ), ותחזית ל-x נתון. */
export const regression = ({ r, sx, sy, mx, my, x }) => {
  const b = (r * sy) / sx;
  const a = my - b * mx;
  return {
    q: m`$r = ${r}$, $\;S_x = ${sx}$, $\;S_y = ${sy}$, $\;\bar{x} = ${mx}$, $\;\bar{y} = ${my}$`,
    a: m`$\hat{y} =$ ${exact(b)} $x +$ ${exact(a)} $\qquad$ תחזית ל-$x = ${x}$: ${exact(round(a + b * x, 6))}`,
  };
};

export const STRENGTH = ['חיובי חזק', 'חיובי חלש', 'אין קשר לינארי', 'שלילי חלש', 'שלילי חזק'];
export const strength = (r) => ({
  q: m`$r = ${r}$`,
  options: STRENGTH,
  answer: r >= 0.7 ? 0 : r > 0.2 ? 1 : r >= -0.2 ? 2 : r > -0.7 ? 3 : 4,
});

export default {
  id: 'g11-u4-correlation-regression',
  grade: 11,
  emoji: '📊',
  title: 'קשר בין משתנים: מקדם מתאם וקו רגרסיה',
  reminder: [
    {
      title: 'מקדם המתאם r',
      md: m`תמיד בין $-1$ ל-$1$, ללא יחידות.

$r$ קרוב ל-$1$ — קשר לינארי **חיובי חזק** · קרוב ל-$-1$ — **שלילי חזק** · קרוב ל-$0$ — **אין קשר לינארי** (אבל ייתכן קשר אחר!)`,
    },
    {
      title: 'מתאם ≠ סיבתיות',
      md: m`קשר סטטיסטי **לא** מוכיח שמשתנה אחד **גורם** לשני — אולי יש משתנה שלישי שמשפיע על שניהם.`,
    },
    {
      title: 'קו הרגרסיה',
      wide: true,
      md: m`$\hat{y} = bx + a$, עם שיפוע $\;b = r \cdot \frac{S_y}{S_x}$. הקו **עובר דרך נקודת הממוצעים** $(\bar{x}, \bar{y})$, ולכן $a = \bar{y} - b\bar{x}$.

$r = 0.8$, $S_x = 4$, $S_y = 10$, $\bar{x} = 20$, $\bar{y} = 50$ ← $b = 2$, $a = 10$ ← $\hat{y} = 2x + 10$`,
    },
  ],
  pages: [
    {
      title: 'מקדם המתאם',
      exercises: [
        {
          title: 'איזה מקדם מתאם מתאים לדיאגרמה?',
          cols: 3,
          items: [guessR(0.9, 1.2, 7, '0.95'), guessR(-0.9, 1.2, 11, '-0.95'), guessR(0, 6, 5, '0')],
        },
        { title: 'תארו את הקשר.', cols: 2, items: [0.92, -0.85, 0.05, 0.3, -0.35].map(strength) },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf(m`ייתכן מקדם מתאם $r = 1.3$.`, false),
            tf('אם r = 0, אין שום קשר בין המשתנים.', false),
            tf('מתאם גבוה בין מכירות גלידה לבין טביעות מוכיח שגלידה גורמת לטביעה.', false),
            tf(m`$r = -0.9$ מעיד על קשר חזק יותר מ-$r = 0.5$.`, true),
          ],
        },
      ],
    },
    {
      title: 'קו הרגרסיה וניבוי',
      exercises: [
        {
          title: 'מצאו את קו הרגרסיה וחשבו תחזית.',
          cols: 1,
          items: [
            regression({ r: 0.8, sx: 4, sy: 10, mx: 20, my: 50, x: 25 }),
            regression({ r: -0.6, sx: 5, sy: 15, mx: 10, my: 80, x: 12 }),
            regression({ r: 0.5, sx: 2, sy: 6, mx: 7, my: 30, x: 9 }),
          ],
        },
        {
          title: 'השלימו.',
          cols: 1,
          items: [
            { q: m`קו הרגרסיה הוא $\hat{y} = 3x + 4$, ו-$\bar{x} = 5$. $\quad \bar{y} =$ [[${3 * 5 + 4}]]` },
            { q: m`$b = 2$, $\;S_x = 3$, $\;S_y = 10$. $\quad r =$ [[${(2 * 3) / 10}]]` },
            {
              q: m`$r$ ושיפוע קו הרגרסיה תמיד...`,
              options: ['באותו סימן', 'בסימנים הפוכים', 'שווים זה לזה'],
              answer: 0,
            },
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'איזה מקדם מתאם מתאים לדיאגרמה?', cols: 1, items: [guessR(-0.9, 1.2, 23, '-0.95')] },
      { title: 'תארו את הקשר.', cols: 2, items: [-0.97, 0.3].map(strength) },
      { title: 'קו רגרסיה ותחזית.', cols: 1, items: [regression({ r: 0.9, sx: 3, sy: 6, mx: 10, my: 40, x: 12 })] },
      { title: 'נכון או לא נכון?', cols: 1, items: [tf(m`קו הרגרסיה עובר דרך הנקודה $(\bar{x}, \bar{y})$.`, true)] },
    ],
  },
};
