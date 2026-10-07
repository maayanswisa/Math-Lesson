import { m } from '../helpers.js';
import { exact, tf } from './shared.js';

/** אסימפטוטה מאונכת של 1/(mx+b). */
const vertLinear = (mm, b) => ({ q: m`$f(x)=\dfrac{1}{${mm}x${b < 0 ? '-' : '+'}${Math.abs(b)}}$`, a: m`$x =$ ${exact(-b / mm)}` });

/** אסימפטוטות של 1/(x−p)+q. */
function shifted(p, q) {
  const den = p === 0 ? 'x' : `x${p > 0 ? '-' : '+'}${Math.abs(p)}`;
  const tail = q === 0 ? '' : `${q > 0 ? '+' : '-'}${Math.abs(q)}`;
  return { q: m`$g(x)=\dfrac{1}{${den}}${tail}$`, a: m`$x =$ [[${p}]] $,\quad y =$ [[${q}]]` };
}

/** כמה אסימפטוטות מאונכות ל-1/(ax²+bx+c)? */
function countVA(a, b, c) {
  const d = b * b - 4 * a * c;
  const n = d > 0 ? 2 : d === 0 ? 1 : 0;
  const poly = `${a === 1 ? '' : a}x^2${b ? `${b > 0 ? '+' : '-'}${Math.abs(b) === 1 ? '' : Math.abs(b)}x` : ''}${c ? `${c > 0 ? '+' : '-'}${Math.abs(c)}` : ''}`;
  return { q: m`$f(x)=\dfrac{1}{${poly}}$`, a: m`אסימפטוטות מאונכות: [[${n}]]` };
}

/**
 * אי-שוויון עם שבר: בוחרים את הפתרון. holds(x) — האם x מקיים את האי-שוויון
 * (false כשהמכנה מתאפס). בודקים על רשת נקודות שבדיוק אפשרות אחת מתאימה.
 */
function inequality(tex, holds, options) {
  const xs = Array.from({ length: 161 }, (_, i) => -10 + i * 0.125);
  const fits = options.map(([, inSet]) => xs.every((x) => holds(x) === inSet(x)));
  if (fits.filter(Boolean).length !== 1) throw new Error(`expected exactly one matching option for ${tex}`);
  return { q: m`$${tex}$`, options: options.map(([label]) => label), answer: fits.indexOf(true) };
}

const frac = (num, den) => (x) => (den(x) === 0 ? null : num(x) / den(x));
const gt0 = (f) => (x) => f(x) !== null && f(x) > 0;
const le0 = (f) => (x) => f(x) !== null && f(x) <= 0;
const ge = (f, k) => (x) => f(x) !== null && f(x) >= k;

export default {
  id: 'g11-u4-rational-transform',
  grade: 11,
  emoji: '🔀',
  title: 'פונקציות רציונליות: טרנספורמציות ואי-שוויונות',
  reminder: [
    {
      title: 'אחד חלקי פונקציה',
      md: m`$\dfrac{1}{mx+b}$: אסימפטוטה מאונכת $x=-\frac bm$, אופקית $y=0$.

$\dfrac{1}{ax^2+bx+c}$: מספר האסימפטוטות המאונכות = מספר השורשים של המכנה.`,
    },
    {
      title: 'טרנספורמציות',
      md: m`$\dfrac{1}{x-p}+q$: אסימפטוטות $x=p$ ו-$y=q$. מתיחה לא מזיזה אסימפטוטות.`,
    },
    {
      title: 'אי-שוויון עם שבר',
      md: m`לא כופלים במכנה! מעבירים הכל לאגף אחד, מוצאים אפסי מונה ומכנה, ובונים טבלת סימנים. אפסי המכנה — אף פעם לא בפתרון.`,
    },
  ],
  pages: [
    {
      title: 'אסימפטוטות',
      exercises: [
        { title: 'מצאו את האסימפטוטה המאונכת.', cols: 2, items: [vertLinear(2, -6), vertLinear(3, 6), vertLinear(4, -2), vertLinear(5, 10)] },
        { title: 'מצאו את שתי האסימפטוטות.', cols: 1, items: [shifted(4, 2), shifted(-3, -1), shifted(1, -5), shifted(-2, 3)] },
        { title: 'כמה אסימפטוטות מאונכות?', cols: 2, items: [countVA(1, 0, 1), countVA(1, -5, 6), countVA(1, 4, 4), countVA(1, 0, -9)] },
      ],
    },
    {
      title: 'אי-שוויונות',
      exercises: [
        {
          title: 'פתרו את האי-שוויון.',
          cols: 1,
          items: [
            inequality(m`\frac{x-1}{x+2}>0`, gt0(frac((x) => x - 1, (x) => x + 2)), [
              [m`$-2<x<1$`, (x) => x > -2 && x < 1],
              [m`$x<-2$ או $x>1$`, (x) => x < -2 || x > 1],
              [m`$x>1$`, (x) => x > 1],
            ]),
            inequality(m`\frac{x+3}{x-2}\le0`, le0(frac((x) => x + 3, (x) => x - 2)), [
              [m`$-3\le x<2$`, (x) => x >= -3 && x < 2],
              [m`$-3\le x\le2$`, (x) => x >= -3 && x <= 2],
              [m`$x\le-3$ או $x>2$`, (x) => x <= -3 || x > 2],
            ]),
            inequality(m`\frac{2}{x-3}\ge1`, ge(frac(() => 2, (x) => x - 3), 1), [
              [m`$x\le5$`, (x) => x <= 5],
              [m`$x<3$ או $x\ge5$`, (x) => x < 3 || x >= 5],
              [m`$3<x\le5$`, (x) => x > 3 && x <= 5],
            ]),
            inequality(m`\frac{x^2-4}{x}>0`, gt0(frac((x) => x * x - 4, (x) => x)), [
              [m`$-2<x<0$ או $x>2$`, (x) => (x > -2 && x < 0) || x > 2],
              [m`$x<-2$ או $0<x<2$`, (x) => x < -2 || (x > 0 && x < 2)],
              [m`$x>2$`, (x) => x > 2],
            ]),
          ],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf(m`מותר לכפול את שני האגפים של $\frac{x-1}{x+2}>0$ ב-$(x+2)$ בלי לשנות את הכיוון.`, false),
            tf(m`לגרף של $\frac{1}{x^2+4}$ אין אסימפטוטה מאונכת.`, true),
            tf(m`שיקוף של $\frac1x+2$ ביחס לציר $x$ נותן אסימפטוטה אופקית $y=-2$.`, true),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'אסימפטוטות.', cols: 1, items: [vertLinear(3, -12), shifted(-5, 4), countVA(1, -2, -3)] },
      {
        title: 'פתרו.',
        cols: 1,
        items: [
          inequality(m`\frac{x-4}{x+1}<0`, (x) => x !== -1 && (x - 4) / (x + 1) < 0, [
            [m`$-1<x<4$`, (x) => x > -1 && x < 4],
            [m`$-1\le x\le4$`, (x) => x >= -1 && x <= 4],
            [m`$x<-1$ או $x>4$`, (x) => x < -1 || x > 4],
          ]),
        ],
      },
    ],
  },
};

