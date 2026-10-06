import { m, num } from '../helpers.js';
import { tf } from './shared.js';

const sqrt = (n) => {
  const r = Math.sqrt(n);
  if (!Number.isInteger(r)) throw new Error(`${n} is not a perfect square`);
  return { q: m`$\sqrt{${num(n)}} =$ [[${r}]]` };
};

/** בין אילו שלמים עוקבים? */
const between = (n) => {
  const lo = Math.floor(Math.sqrt(n));
  if (lo * lo === n) throw new Error(`${n} is a perfect square`);
  return { q: m`[[${lo}]] $< \sqrt{${n}} <$ [[${lo + 1}]]` };
};

const squareSide = (area) => ({ q: m`שטח ריבוע $${area}$ סמ״ר. אורך הצלע:`, a: m`[[${Math.sqrt(area)}]] ס״מ` });
const squarePerimeter = (area) => ({ q: m`שטח ריבוע $${area}$ סמ״ר. ההיקף:`, a: m`[[${4 * Math.sqrt(area)}]] ס״מ` });
const cubeEdge = (vol) => {
  const e = Math.round(Math.cbrt(vol));
  if (e ** 3 !== vol) throw new Error(`${vol} is not a cube`);
  return { q: m`נפח קובייה $${num(vol)}$ סמ״ק. אורך המקצוע:`, a: m`[[${e}]] ס״מ` };
};

export default {
  id: 'g7-square-roots',
  grade: 7,
  emoji: '√',
  title: 'שורשים ריבועיים',
  reminder: [
    {
      title: 'שורש ריבועי',
      md: m`$\sqrt{49}$ הוא המספר **האי-שלילי** שבריבוע נותן $49$: $\;\sqrt{49} = 7$ כי $7^2 = 49$.

מספרים ריבועיים: ${[1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144].map((x) => `$${x}$`).join(', ')}`,
    },
    {
      title: 'אומדן',
      md: m`$\sqrt{30}$: $\;25 < 30 < 36$, ולכן $5 < \sqrt{30} < 6$.`,
    },
    {
      title: 'ריבוע וקובייה',
      md: m`ריבוע בשטח $S$ ← צלע $\sqrt{S}$. $\;$ קובייה בנפח $V$ ← המקצוע הוא המספר שבחזקת $3$ נותן $V$: $\;V = 27$ ← $3$.`,
    },
  ],
  pages: [
    {
      title: 'חישוב ואומדן',
      exercises: [
        { title: 'חשבו.', cols: 2, items: [sqrt(64), sqrt(121), sqrt(9), sqrt(400), sqrt(1), sqrt(169), sqrt(0), sqrt(2500), sqrt(144)] },
        { title: 'בין אילו מספרים שלמים עוקבים?', cols: 2, items: [between(30), between(50), between(10), between(90), between(2), between(140)] },
        {
          title: 'חשבו.',
          cols: 2,
          items: [
            { q: m`$\sqrt{9} + \sqrt{16} =$ [[7]]` },
            { q: m`$\sqrt{9 + 16} =$ [[5]]` },
            { q: m`$(\sqrt{13})^2 =$ [[13]]` },
            { q: m`$2 \cdot \sqrt{36} =$ [[12]]` },
          ],
        },
      ],
    },
    {
      title: 'שטח ריבוע ונפח קובייה',
      exercises: [
        { title: 'ריבועים.', cols: 1, items: [squareSide(81), squareSide(225), squarePerimeter(49), squarePerimeter(100)] },
        { title: 'קוביות.', cols: 1, items: [cubeEdge(8), cubeEdge(64), cubeEdge(1000)] },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf(m`$\sqrt{9} + \sqrt{16} = \sqrt{25}$`, Math.sqrt(9) + Math.sqrt(16) === Math.sqrt(25)),
            tf(m`$\sqrt{100} = 10$`, true),
            tf(m`$\sqrt{50}$ קרוב יותר ל-$7$ מאשר ל-$8$.`, Math.abs(Math.sqrt(50) - 7) < Math.abs(Math.sqrt(50) - 8)),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'חשבו.', cols: 2, items: [sqrt(81), sqrt(196), sqrt(900)] },
      { title: 'אמדו.', cols: 2, items: [between(20), between(70)] },
      { title: 'ריבוע וקובייה.', cols: 1, items: [squareSide(144), cubeEdge(125)] },
    ],
  },
};
