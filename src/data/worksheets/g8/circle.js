import { m, round, svgParts } from '../helpers.js';

const { svg, label, INK, ACCENT, SHADE } = svgParts;
const PI = 3.14;

/** משבצת בקירוב: סובלנות קטנה, כדי שגם π מדויק יותר (3.1416) יתקבל. */
const approx = (x) => `[[n:${round(x, 2)}~${round(Math.abs(x) * 0.002 + 0.01, 2)}]]`;

const circumference = (r) => ({ q: m`רדיוס $${r}$ ס״מ`, a: m`קוטר: [[${2 * r}]] ס״מ $\qquad$ היקף: ${approx(2 * PI * r)} ס״מ` });
const area = (r) => ({ q: m`רדיוס $${r}$ ס״מ. שטח העיגול: ${approx(PI * r * r)} סמ״ר` });
const areaFromD = (d) => ({ q: m`קוטר $${d}$ ס״מ. שטח העיגול: ${approx(PI * (d / 2) ** 2)} סמ״ר` });
const rFromC = (r) => ({ q: m`היקף המעגל $${round(2 * PI * r)}$ ס״מ. הרדיוס: [[n:${r}~0.05]] ס״מ` });
const rFromA = (r) => ({ q: m`שטח העיגול $${round(PI * r * r)}$ סמ״ר. הרדיוס: [[n:${r}~0.05]] ס״מ` });

const CIRCLE_FIG = svg(
  150,
  120,
  `<circle cx="70" cy="60" r="48" fill="${SHADE}" fill-opacity="0.45" stroke="${INK}" stroke-width="2"/>` +
    `<circle cx="70" cy="60" r="3" fill="${INK}"/>` +
    `<line x1="70" y1="60" x2="118" y2="60" stroke="${ACCENT}" stroke-width="2"/>` +
    label(94, 54, 'r', 'middle', ACCENT) +
    `<line x1="40" y1="97" x2="100" y2="23" stroke="${INK}" stroke-width="1.4" stroke-dasharray="4 3"/>` +
    label(108, 22, 'd', 'start'),
);

export default {
  id: 'g8-circle',
  grade: 8,
  emoji: '⭕',
  title: 'המעגל והעיגול',
  reminder: [
    {
      title: 'רדיוס וקוטר',
      md: m`<div class="diagram-box">${CIRCLE_FIG}</div>

**רדיוס** $r$ — מהמרכז לשפה. **קוטר** $d$ — מצד לצד דרך המרכז: $\;d = 2r$`,
    },
    {
      title: 'היקף ושטח',
      md: m`**היקף המעגל** $= 2\pi r = \pi d$
**שטח העיגול** $= \pi r^2$

בדף הזה $\pi \approx 3.14$. $\;r = 5$: היקף $\approx 31.4$, שטח $\approx 78.5$.`,
    },
    {
      title: 'מהיקף או משטח לרדיוס',
      wide: true,
      md: m`היקף $62.8$ ← $2 \cdot 3.14 \cdot r = 62.8$ ← $r = 10$.
שטח $28.26$ ← $3.14 \cdot r^2 = 28.26$ ← $r^2 = 9$ ← $r = 3$.`,
    },
  ],
  pages: [
    {
      title: 'היקף המעגל',
      exercises: [
        { title: m`חשבו קוטר והיקף ($\pi \approx 3.14$).`, cols: 1, items: [5, 10, 3, 7, 2.5].map(circumference) },
        { title: 'מההיקף לרדיוס.', cols: 1, items: [10, 4, 6].map(rFromC) },
        {
          title: 'בעיות.',
          cols: 1,
          items: [
            { q: m`גלגל אופניים בקוטר $70$ ס״מ. כמה ס״מ עובר הגלגל בסיבוב אחד?`, a: m`${approx(PI * 70)} ס״מ` },
            { q: m`ריצה סביב מזרקה עגולה ברדיוס $10$ מ׳. כמה מטרים בסיבוב אחד?`, a: m`${approx(2 * PI * 10)} מ׳` },
            {
              q: m`היקף חצי עיגול (הקשת והקוטר) שהרדיוס שלו $4$ ס״מ:`,
              a: m`${approx(PI * 4 + 8)} ס״מ`,
            },
          ],
        },
      ],
    },
    {
      title: 'שטח העיגול',
      exercises: [
        { title: m`חשבו את שטח העיגול ($\pi \approx 3.14$).`, cols: 1, items: [[1, 3, 10, 6].map(area), [8, 20].map(areaFromD)].flat() },
        { title: 'מהשטח לרדיוס.', cols: 1, items: [3, 5, 10].map(rFromA) },
        {
          title: 'בעיות.',
          cols: 1,
          items: [
            { q: m`פיצה בקוטר $30$ ס״מ. מה השטח שלה?`, a: m`${approx(PI * 15 * 15)} סמ״ר` },
            { q: m`ריבוע שצלעו $10$ ס״מ, ובתוכו עיגול שנוגע בכל הצלעות. מה השטח שבין העיגול לריבוע?`, a: m`${approx(100 - PI * 25)} סמ״ר` },
            {
              q: 'אם מכפילים את הרדיוס פי 2, השטח...',
              options: ['גדל פי 2', 'גדל פי 4', 'לא משתנה'],
              answer: 1,
            },
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: m`קוטר והיקף ($\pi \approx 3.14$).`, cols: 1, items: [circumference(4)] },
      { title: 'שטח.', cols: 1, items: [area(5), areaFromD(12)] },
      { title: 'מההיקף לרדיוס.', cols: 1, items: [rFromC(8)] },
      { title: 'מהשטח לרדיוס.', cols: 1, items: [rFromA(4)] },
      { title: 'בעיה.', cols: 1, items: [{ q: m`שעון עגול ברדיוס $15$ ס״מ. כמה ס״מ עובר קצה מחוג הדקות בשעה?`, a: m`${approx(2 * PI * 15)} ס״מ` }] },
    ],
  },
};
