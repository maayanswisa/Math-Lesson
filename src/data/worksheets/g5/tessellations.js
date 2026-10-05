import { m, svgParts } from '../helpers.js';

const { svg, INK, SHADE } = svgParts;

/** זווית של מצולע משוכלל בן n צלעות. */
const angle = (n) => 180 - 360 / n;
const NAME = { 3: 'משולש שווה-צלעות', 4: 'ריבוע', 5: 'מחומש משוכלל', 6: 'משושה משוכלל', 8: 'מתומן משוכלל' };
const PLURAL = { 3: 'משולשים שווי-צלעות', 4: 'ריבועים', 6: 'משושים משוכללים', 8: 'מתומנים משוכללים' };

const TF = ['נכון', 'לא נכון'];
const tf = (q, truth) => ({ q, options: TF, answer: truth ? 0 : 1 });

function aroundPoint(n) {
  const k = 360 / angle(n);
  if (!Number.isInteger(k)) throw new Error(`${n}-gon does not tile`);
  return { q: m`ריצוף ב${PLURAL[n]} (כל זווית $${angle(n)}°$): סביב כל נקודה נפגשים`, a: `[[${k}]]` };
}

const tilesAlone = (n) => ({
  q: m`${NAME[n]} (כל זווית $${angle(n)}°$) — האם אפשר לרצף בו לבד?`,
  options: ['כן', 'לא'],
  answer: 360 % angle(n) === 0 ? 0 : 1,
});

/** ריצוף משולב: given = [[n, כמות], ...], חסרים מצולעים מסוג missing. */
function mixed(given, missing) {
  const used = given.reduce((s, [n, c]) => s + c * angle(n), 0);
  const k = (360 - used) / angle(missing);
  if (!Number.isInteger(k) || k < 1) throw new Error('mixed tiling does not close');
  const words = given.map(([n, c]) => (c === 1 ? `${NAME[n]} אחד` : `$${c}$ ${PLURAL[n]}`)).join(' ו-');
  return { q: m`סביב נקודה אחת נפגשים ${words}. כמה ${PLURAL[missing]} צריך להוסיף?`, a: `[[${k}]]` };
}

const regularPerimeter = (n, side) => ({ q: m`${NAME[n]} שצלעו $${side}$ ס״מ. ההיקף: [[${n * side}]] ס״מ` });
const regularSide = (n, P) => ({ q: m`היקף ${NAME[n]} הוא $${P}$ ס״מ. אורך הצלע: [[${P / n}]] ס״מ` });

/** ריצוף משושים קטן — לתזכורת. */
function hexTiling() {
  const r = 18;
  const w = Math.sqrt(3) * r;
  const hex = (cx, cy) =>
    `<polygon points="${Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i + Math.PI / 6;
      return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
    }).join(' ')}" fill="${(cx + cy) % 3 < 1.5 ? SHADE : '#fff'}" stroke="${INK}" stroke-width="1.4"/>`;
  let body = '';
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 5; col++) body += hex(22 + col * w + (row % 2) * (w / 2), 22 + row * 1.5 * r);
  }
  return svg(Math.round(5 * w + w / 2 + 10), 100, body);
}

export default {
  id: 'g5-tessellations',
  grade: 5,
  emoji: '🐝',
  title: 'ריצופים ומצולעים משוכללים',
  reminder: [
    {
      title: 'מושגים',
      md: m`**צורות חופפות** — אותו גודל ואותה צורה בדיוק.

**מצולע משוכלל** — **כל הצלעות** שוות **וגם כל הזוויות** שוות (משולש שווה-צלעות, ריבוע, משושה משוכלל...).`,
    },
    {
      title: 'ריצוף',
      md: m`<div class="diagram-box">${hexTiling()}</div>

כיסוי המישור בצורות **בלי רווחים ובלי חפיפות**. סביב כל נקודת מפגש — סכום הזוויות הוא $360°$.`,
    },
    {
      title: 'מי מרצף לבד?',
      wide: true,
      md: m`רק שלושה מצולעים משוכללים: **משולש** ($6 \times 60° = 360°$), **ריבוע** ($4 \times 90° = 360°$), **משושה** ($3 \times 120° = 360°$).

**מחומש** ($108°$) לא מרצף — $360$ לא מתחלק ב-$108$.`,
    },
  ],
  pages: [
    {
      title: 'מצולעים משוכללים וחפיפה',
      exercises: [
        {
          title: 'נכון או לא נכון?',
          cols: 2,
          items: [
            tf('ריבוע הוא מצולע משוכלל.', true),
            tf('מלבן שאינו ריבוע הוא מצולע משוכלל.', false),
            tf('מעוין שאינו ריבוע הוא מצולע משוכלל.', false),
            tf('משולש שווה-צלעות הוא מצולע משוכלל.', true),
            tf('שתי צורות חופפות הן באותו גודל ובאותה צורה.', true),
            tf('כל שני ריבועים חופפים זה לזה.', false),
          ],
        },
        { title: 'חשבו את ההיקף.', cols: 1, items: [regularPerimeter(6, 4), regularPerimeter(8, 3), regularPerimeter(5, 2.5)] },
        { title: 'מצאו את אורך הצלע.', cols: 1, items: [regularSide(5, 35), regularSide(3, 27), regularSide(6, 42)] },
        {
          title: 'כמה צלעות?',
          cols: 3,
          items: [
            { q: 'למחומש יש [[5]] צלעות' },
            { q: 'למשושה יש [[6]] צלעות' },
            { q: 'למתומן יש [[8]] צלעות' },
          ],
        },
      ],
    },
    {
      title: 'ריצוף',
      exercises: [
        { title: 'כמה מצולעים נפגשים סביב נקודה אחת?', cols: 1, items: [3, 4, 6].map(aroundPoint) },
        { title: 'האם המצולע המשוכלל מרצף לבד?', cols: 1, items: [3, 4, 5, 6, 8].map(tilesAlone) },
        {
          title: 'ריצוף משולב: כמה חסרים כדי להשלים $360°$?',
          cols: 1,
          items: [mixed([[6, 2]], 3), mixed([[3, 3]], 4), mixed([[8, 2]], 4), mixed([[6, 1], [4, 2]], 3)],
        },
        {
          title: 'השלימו את הזווית החסרה סביב הנקודה.',
          cols: 1,
          items: [
            { q: m`סביב נקודה נפגשות $4$ זוויות: $90°$, $90°$, $120°$ ועוד [[${360 - 300}]] מעלות` },
            { q: m`סביב נקודה נפגשות $3$ זוויות: $150°$, $150°$ ועוד [[${360 - 300}]] מעלות` },
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'נכון או לא נכון?', cols: 2, items: [tf('מצולע משוכלל — כל הצלעות שוות וכל הזוויות שוות.', true), tf('בריצוף מותר שיהיו רווחים קטנים בין הצורות.', false)] },
      { title: 'כמה מצולעים נפגשים סביב נקודה אחת?', cols: 1, items: [aroundPoint(6)] },
      { title: 'האם המצולע מרצף לבד?', cols: 1, items: [tilesAlone(5)] },
      { title: 'ריצוף משולב.', cols: 1, items: [mixed([[3, 4]], 6)] },
      { title: 'חשבו את ההיקף.', cols: 1, items: [regularPerimeter(6, 7)] },
    ],
  },
};
