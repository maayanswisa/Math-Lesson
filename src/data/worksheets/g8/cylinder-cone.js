import { m, round, svgParts } from '../helpers.js';

const { svg, label, INK, ACCENT, SHADE } = svgParts;
const PI = 3.14;

/** משבצת בקירוב: סובלנות קטנה, כדי שגם π מדויק יותר (3.1416) יתקבל. */
const approx = (x) => `[[n:${round(x, 2)}~${round(Math.abs(x) * 0.002 + 0.01, 2)}]]`;

/** שטח הפנים חלקי π: שני בסיסים ועוד המעטפת. */
const surf = (r, h) => 2 * r * r + 2 * r * h;

const net = (r, h) => ({
  q: m`גליל: רדיוס $${r}$ ס״מ, גובה $${h}$ ס״מ. מלבן המעטפת:`,
  a: m`צלע אחת: [[${h}]] ס״מ $\qquad$ הצלע השנייה: ${approx(2 * PI * r)} ס״מ`,
});

const cylinder = (r, h, given = 'r') => ({
  q: given === 'd' ? m`גליל: קוטר $${2 * r}$ ס״מ, גובה $${h}$ ס״מ` : m`גליל: רדיוס $${r}$ ס״מ, גובה $${h}$ ס״מ`,
  a: m`נפח: ${approx(PI * r * r * h)} סמ״ק $\qquad$ מעטפת: ${approx(2 * PI * r * h)} סמ״ר $\qquad$ שטח פנים: ${approx(PI * surf(r, h))} סמ״ר`,
});

const cone = (r, h) => ({
  q: m`חרוט: רדיוס $${r}$ ס״מ, גובה $${h}$ ס״מ`,
  a: m`נפח: ${approx((PI * r * r * h) / 3)} סמ״ק $\qquad$ שטח החתך הצירי: [[${r * h}]] סמ״ר`,
});

const NET_FIG = svg(
  170,
  132,
  `<circle cx="85" cy="18" r="16" fill="${SHADE}" fill-opacity="0.45" stroke="${INK}" stroke-width="2"/>` +
    `<rect x="20" y="34" width="130" height="62" fill="${SHADE}" fill-opacity="0.25" stroke="${INK}" stroke-width="2"/>` +
    `<circle cx="85" cy="112" r="16" fill="${SHADE}" fill-opacity="0.45" stroke="${INK}" stroke-width="2"/>` +
    label(85, 70, '2πr', 'middle', ACCENT) +
    label(156, 70, 'h', 'start'),
);

const SECTION_FIG = svg(
  150,
  128,
  `<polygon points="75,8 15,108 135,108" fill="${SHADE}" fill-opacity="0.35" stroke="${ACCENT}" stroke-width="2"/>` +
    `<line x1="75" y1="8" x2="75" y2="108" stroke="${INK}" stroke-width="1.4" stroke-dasharray="4 3"/>` +
    label(80, 66, 'h', 'start') +
    label(75, 124, '2r', 'middle', ACCENT),
);

export default {
  id: 'g8-cylinder-cone',
  grade: 8,
  emoji: '🥫',
  title: 'גליל וחרוט',
  reminder: [
    {
      title: 'גליל',
      md: m`<div class="diagram-box">${NET_FIG}</div>

**נפח** $= \pi r^2 \cdot h$
**מעטפת** (מלבן) $= 2\pi r \cdot h$
**שטח פנים** $= 2\pi r^2 + 2\pi r h$`,
    },
    {
      title: 'חרוט',
      md: m`<div class="diagram-box">${SECTION_FIG}</div>

**נפח** $= \frac{\pi r^2 \cdot h}{3}$ — שליש מהגליל עם אותו בסיס וגובה.
**חתך צירי** — משולש שווה-שוקיים: בסיס $2r$, גובה $h$, שטח $r \cdot h$.`,
    },
    {
      title: 'יחידות ושינוי ממדים',
      wide: true,
      md: m`$1$ ליטר $= 1{,}000$ סמ״ק. $\;1$ מ׳ $= 100$ ס״מ. בדף הזה $\pi \approx 3.14$.
מכפילים את $r$ ואת $h$ פי $k$ ← שטח הפנים פי $k^2$, הנפח פי $k^3$.`,
    },
  ],
  pages: [
    {
      title: 'גליל',
      exercises: [
        { title: m`פריסה: מה המידות של מלבן המעטפת? ($\pi \approx 3.14$)`, cols: 1, items: [net(2, 5), net(5, 8), net(3, 10)] },
        { title: 'נפח, שטח המעטפת ושטח הפנים.', cols: 1, items: [cylinder(1, 4), cylinder(3, 5), cylinder(4, 10), cylinder(5, 6, 'd')] },
        {
          title: 'בעיות.',
          cols: 1,
          items: [
            {
              q: m`כוס גלילית בלי מכסה: רדיוס $4$ ס״מ, גובה $10$ ס״מ. כמה סמ״ר פלסטיק יש בכוס?`,
              a: m`${approx(PI * (4 * 4 + 2 * 4 * 10))} סמ״ר`,
            },
            { q: m`דוד מים גלילי: רדיוס $30$ ס״מ, גובה $1$ מ׳. כמה ליטרים נכנסים בו?`, a: m`${approx((PI * 30 * 30 * 100) / 1000)} ליטר` },
            { q: m`נפח גליל $${round(PI * 9 * 5)}$ סמ״ק, והרדיוס שלו $3$ ס״מ. הגובה:`, a: '[[5]] ס״מ' },
            { q: m`צובעים את המעטפת של עמוד גלילי: קוטר $40$ ס״מ, גובה $3$ מ׳. כמה מ״ר צובעים?`, a: m`${approx(2 * PI * 0.2 * 3)} מ״ר` },
          ],
        },
      ],
    },
    {
      title: 'חרוט ושינוי ממדים',
      exercises: [
        { title: m`נפח החרוט ושטח החתך הצירי ($\pi \approx 3.14$).`, cols: 1, items: [cone(3, 4), cone(6, 5), cone(2, 9), cone(5, 12)] },
        {
          title: 'החתך הצירי.',
          cols: 1,
          items: [
            { q: m`החתך הצירי של חרוט הוא משולש שבסיסו $10$ ס״מ וגובהו $12$ ס״מ. הרדיוס: [[5]] ס״מ $\qquad$ הקו היוצר: [[13]] ס״מ` },
            { q: m`שטח החתך הצירי של חרוט הוא $40$ סמ״ר, והרדיוס $5$ ס״מ. הגובה: [[8]] ס״מ` },
            { q: 'החתך הצירי של חרוט הוא תמיד משולש…', options: ['שווה-שוקיים', 'שווה-צלעות', 'ישר-זווית'], answer: 0 },
          ],
        },
        {
          title: 'גליל וחרוט עם אותו בסיס ואותו גובה.',
          cols: 1,
          items: [
            { q: m`נפח הגליל $90$ סמ״ק. נפח החרוט: [[30]] סמ״ק` },
            { q: m`נפח החרוט $25$ סמ״ק. נפח הגליל: [[75]] סמ״ק` },
          ],
        },
        {
          title: m`שינוי ממדים (התשובות כמקדם של $\pi$).`,
          cols: 1,
          items: [
            {
              q: m`גליל: $r = 2$, $h = 5$. שטח הפנים: [[${surf(2, 5)}]]$\pi$. מכפילים את $r$ ואת $h$ פי $3$: שטח הפנים [[${surf(6, 15)}]]$\pi$, כלומר פי [[${surf(6, 15) / surf(2, 5)}]]`,
            },
            { q: m`גליל: $r = 3$, $h = 4$. מוסיפים $1$ לרדיוס. שטח הפנים לפני: [[${surf(3, 4)}]]$\pi$ $\qquad$ אחרי: [[${surf(4, 4)}]]$\pi$` },
            { q: 'מכפילים רק את הגובה של גליל פי 2. שטח הפנים…', options: ['גדל פי 2', 'גדל פי 4', 'גדל, אבל פחות מפי 2'], answer: 2 },
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'פריסה.', cols: 1, items: [net(4, 6)] },
      { title: 'גליל.', cols: 1, items: [cylinder(2, 7)] },
      { title: 'חרוט.', cols: 1, items: [cone(3, 8)] },
      { title: 'השלימו.', cols: 1, items: [{ q: m`חרוט וגליל עם אותו בסיס וגובה. נפח הגליל $60$ סמ״ק. נפח החרוט: [[20]] סמ״ק` }] },
      { title: 'שינוי ממדים.', cols: 1, items: [{ q: m`גליל: $r = 1$, $h = 2$. שטח הפנים: [[${surf(1, 2)}]]$\pi$. מכפילים את $r$ ואת $h$ פי $2$: פי [[4]]` }] },
    ],
  },
};
