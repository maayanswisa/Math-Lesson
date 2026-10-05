import { m, fr, mixed, cmp, bar, pie, rectModel, numberLine, valueBlank } from '../helpers.js';

/** איזה חלק צבוע? — כל שבר שווה ערך מתקבל. */
const shaded = (figure, n, d) => ({ q: '', figure, a: `[[f:${n}/${d}]]` });

/** נקודה על ישר המספרים: איזה שבר / מספר מעורב מתאים לה? */
const pointItem = (max, parts, k) => ({
  q: '',
  figure: numberLine({ max, parts, points: [{ at: k / parts, label: 'A' }] }),
  a: m`$A =$ ${valueBlank(k, parts)}`,
});

/** בין אילו שלמים נמצא השבר? */
function between(n, d) {
  const lo = Math.floor(n / d);
  return { q: m`$${fr(n, d)}$ נמצא בין [[${lo}]] ל-[[${lo + 1}]]` };
}

/**
 * איזו נקודה מתאימה למספר? — ישר עם שלוש נקודות.
 * target = [שלם, מונה, מכנה]; ks — מיקומי הנקודות A, B, C ביחידות של 1/parts.
 */
function whichPoint(max, parts, ks, [w, n, d]) {
  const labels = ['A', 'B', 'C'];
  const value = w + n / d;
  const answer = ks.findIndex((k) => Math.abs(k / parts - value) < 1e-9);
  if (answer === -1) throw new Error('no point matches the target');
  return {
    q: m`איזו נקודה מתאימה ל-$${w ? mixed(w, n, d) : fr(n, d)}$?`,
    figure: numberLine({ max, parts, points: ks.map((k, i) => ({ at: k / parts, label: labels[i] })) }),
    options: labels.map((l) => m`$${l}$`),
    answer,
  };
}

/** שבר עם מכנה 1 מוצג כמספר שלם. */
const show = (n, d) => (d === 1 ? `${n}` : fr(n, d));
const compare = ([a, b], [c, d]) => ({ q: m`$${show(a, b)}$ [[c:${cmp(a / b, c / d)}]] $${show(c, d)}$` });

export default {
  id: 'g5-fractions-models',
  grade: 5,
  emoji: '🥧',
  title: 'ייצוג שברים במודלים שונים ועל ישר המספרים',
  reminder: [
    {
      title: 'אותו שבר — שלושה מודלים',
      wide: true,
      md: m`<div class="diagram-box">${pie(3, 4, 30)}&nbsp;&nbsp;&nbsp;${rectModel(3, 2, 2, 22)}&nbsp;&nbsp;&nbsp;${bar(3, 4, 140)}</div>

בכל אחד מהם צבוע $${fr(3, 4)}$: חילקנו את השלם ל-$4$ חלקים **שווים** ולקחנו $3$.`,
    },
    {
      title: 'שבר על ישר המספרים',
      md: m`מחלקים כל שלם על הישר ל**מכנה** חלקים שווים, וסופרים **מונה** קפיצות מ-$0$.

$${fr(7, 4)}$: כל שלם מחולק ל-$4$, סופרים $7$ קפיצות ← בין $1$ ל-$2$.`,
    },
    {
      title: 'שברים גדולים מ-1',
      md: m`$${fr(7, 4)} = ${mixed(1, 3, 4)}$ — שלם אחד ועוד $${fr(3, 4)}$.

כדי לדעת בין אילו שלמים: מחלקים מונה במכנה. $7 : 4 = 1$ שארית $3$ ← בין $1$ ל-$2$.`,
    },
  ],
  pages: [
    {
      title: 'מודל עוגה, מודל מלבני ורצועה',
      exercises: [
        {
          title: 'איזה חלק מהעוגה צבוע?',
          cols: 3,
          items: [shaded(pie(1, 4), 1, 4), shaded(pie(2, 3), 2, 3), shaded(pie(5, 6), 5, 6), shaded(pie(3, 8), 3, 8), shaded(pie(4, 5), 4, 5), shaded(pie(7, 10), 7, 10)],
        },
        {
          title: 'איזה חלק מהמלבן צבוע?',
          cols: 3,
          items: [shaded(rectModel(5, 2, 4), 5, 8), shaded(rectModel(4, 3, 3), 4, 9), shaded(rectModel(7, 2, 6), 7, 12), shaded(rectModel(9, 3, 5), 9, 15)],
        },
        {
          title: 'איזה חלק מהרצועה צבוע, ואיזה חלק לא צבוע?',
          cols: 2,
          items: [
            { q: '', figure: bar(2, 5), a: m`צבוע: [[f:2/5]] · לא צבוע: [[f:3/5]]` },
            { q: '', figure: bar(5, 6), a: m`צבוע: [[f:5/6]] · לא צבוע: [[f:1/6]]` },
            { q: '', figure: bar(3, 9), a: m`צבוע: [[f:3/9]] · לא צבוע: [[f:6/9]]` },
          ],
        },
        {
          title: 'ענו.',
          cols: 1,
          items: [
            {
              q: m`באיזה מודל צבוע $${fr(1, 2)}$?`,
              figure: `<div class="diagram-box">${pie(2, 6, 30)}&nbsp;&nbsp;&nbsp;&nbsp;${rectModel(3, 2, 3, 20)}&nbsp;&nbsp;&nbsp;&nbsp;${bar(4, 6, 120)}</div>`,
              options: ['בעוגה', 'במלבן', 'ברצועה'],
              answer: 1,
            },
            {
              q: m`עוגה חולקה ל-$8$ חלקים שווים, ונאכלו $3$ חלקים. איזה חלק מהעוגה **נשאר**?`,
              a: m`[[f:5/8]] עוגה`,
            },
          ],
        },
      ],
    },
    {
      title: 'ישר המספרים — גם שברים גדולים מ-1',
      exercises: [
        {
          title: 'איזה מספר מתאים לנקודה $A$? (שבר או מספר מעורב)',
          cols: 2,
          items: [pointItem(1, 4, 3), pointItem(1, 5, 2), pointItem(2, 4, 7), pointItem(2, 3, 5), pointItem(3, 2, 5), pointItem(2, 6, 9)],
        },
        {
          title: 'בין אילו מספרים שלמים נמצא השבר?',
          cols: 2,
          items: [between(7, 4), between(11, 3), between(9, 2), between(13, 5), between(17, 6), between(23, 10)],
        },
        {
          title: 'בחרו את הנקודה המתאימה.',
          cols: 1,
          items: [
            whichPoint(2, 4, [3, 5, 6], [0, 5, 4]),
            whichPoint(2, 3, [2, 4, 5], [1, 2, 3]),
            whichPoint(3, 2, [5, 3, 4], [0, 5, 2]),
          ],
        },
        {
          title: 'השוו בעזרת ישר המספרים: בחרו $<$, $=$ או $>$.',
          cols: 3,
          items: [compare([7, 4], [3, 2]), compare([5, 3], [2, 1]), compare([9, 4], [2, 1]), compare([6, 4], [3, 2])],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'איזה חלק צבוע?', cols: 3, items: [shaded(pie(3, 5), 3, 5), shaded(rectModel(5, 2, 3), 5, 6), shaded(bar(7, 8), 7, 8)] },
      { title: 'איזה מספר מתאים לנקודה $A$?', cols: 2, items: [pointItem(2, 5, 8), pointItem(3, 4, 10)] },
      { title: 'בין אילו מספרים שלמים נמצא השבר?', cols: 2, items: [between(9, 4), between(14, 3)] },
      { title: 'בחרו את הנקודה המתאימה.', cols: 1, items: [whichPoint(2, 6, [5, 8, 11], [0, 8, 6])] },
      { title: 'בחרו $<$, $=$ או $>$.', cols: 2, items: [compare([5, 4], [4, 3]), compare([10, 4], [5, 2])] },
    ],
  },
};
