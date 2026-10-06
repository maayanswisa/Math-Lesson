import { m, coordPlane } from '../helpers.js';
import { tf } from './shared.js';

const t = (x) => (x < 0 ? `-${-x}` : `${x}`);

const P1 = [{ x: 2, y: 3, label: 'A' }, { x: -4, y: 1, label: 'B' }, { x: -3, y: -5, label: 'C' }, { x: 5, y: -2, label: 'D' }, { x: 0, y: 4, label: 'E' }, { x: -2, y: 0, label: 'F' }];
const P2 = [{ x: -5, y: 4, label: 'K' }, { x: 3, y: -4, label: 'L' }, { x: 0, y: -3, label: 'M' }];

const read = (p) => ({ q: m`$${p.label}($ [[${p.x}]] $,$ [[${p.y}]] $)$` });

const QUADS = ['רביע I', 'רביע II', 'רביע III', 'רביע IV', 'על אחד הצירים'];
function quadrant(x, y) {
  const answer = x === 0 || y === 0 ? 4 : x > 0 ? (y > 0 ? 0 : 3) : y > 0 ? 1 : 2;
  return { q: m`הנקודה $(${t(x)}, ${t(y)})$ נמצאת ב:`, options: QUADS, answer };
}

/** מרחק אופקי/אנכי בין שתי נקודות על אותו קו. */
const dist = (a, b) => {
  if (a[0] !== b[0] && a[1] !== b[1]) throw new Error('points must share x or y');
  return { q: m`המרחק בין $(${t(a[0])}, ${t(a[1])})$ ל-$(${t(b[0])}, ${t(b[1])})$:`, a: `[[${Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])}]]` };
};

export default {
  id: 'g7-coordinates',
  grade: 7,
  emoji: '📍',
  title: 'מערכת צירים',
  reminder: [
    {
      title: 'שיעורי נקודה',
      md: m`$(x, y)$: קודם $x$ — כמה ימינה (או שמאלה, אם שלילי), אחר כך $y$ — כמה למעלה (או למטה).

ראשית הצירים: $(0, 0)$.`,
    },
    {
      title: 'רביעים',
      md: m`רביע I: $(+, +)$ · רביע II: $(-, +)$ · רביע III: $(-, -)$ · רביע IV: $(+, -)$

נקודה על ציר $x$: $y = 0$. נקודה על ציר $y$: $x = 0$. נקודות על הצירים לא שייכות לאף רביע.`,
    },
  ],
  pages: [
    {
      title: 'קריאת נקודות',
      exercises: [
        { title: 'מה השיעורים של כל נקודה?', cols: 2, figure: coordPlane({ points: P1 }), items: P1.map(read) },
        { title: 'באיזה רביע?', cols: 1, items: [quadrant(3, -7), quadrant(-1, -1), quadrant(-6, 2), quadrant(0, -5), quadrant(4, 4)] },
      ],
    },
    {
      title: 'מרחקים וצורות',
      exercises: [
        { title: 'מרחקים לאורך קווי הרשת.', cols: 1, items: [dist([1, 2], [6, 2]), dist([-3, 4], [-3, -2]), dist([-5, -1], [2, -1])] },
        {
          title: 'מלבן.',
          cols: 1,
          items: [
            { q: m`שלושה קודקודים של מלבן: $(-2, 1)$, $(4, 1)$, $(4, 5)$. הקודקוד הרביעי:`, a: m`$($ [[-2]] $,$ [[5]] $)$` },
            { q: m`אורך המלבן הזה: [[6]] · רוחבו: [[4]] · שטחו: [[24]]` },
          ],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf(m`הנקודה $(0, 7)$ נמצאת על ציר $y$.`, true),
            tf(m`בנקודות של רביע II שיעור ה-$x$ חיובי.`, false),
            tf(m`$(3, -2)$ ו-$(-2, 3)$ הן אותה נקודה.`, false),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'מה השיעורים?', cols: 3, figure: coordPlane({ points: P2 }), items: P2.map(read) },
      { title: 'באיזה רביע?', cols: 1, items: [quadrant(-8, -3), quadrant(5, -1)] },
      { title: 'מרחק.', cols: 1, items: [dist([-4, 3], [5, 3])] },
    ],
  },
};
