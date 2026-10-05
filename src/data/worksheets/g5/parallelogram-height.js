import { m, parallelogramFig, svgParts } from '../helpers.js';

const { svg, label, INK, ACCENT } = svgParts;

/**
 * מקבילית ABCD (AB למטה) עם קטעים מקודקוד עליון אל AB או אל המשכו.
 * from: 'D' (שמאלי עליון) או 'C' (ימני עליון). feet: x של הרגליים, בסדר E, F, G.
 * הקטע שהרגל שלו מתחת לקודקוד בדיוק — הוא הגובה; רגל בקודקוד תחתון = צלע.
 */
function candidatesFig(from, feet) {
  const bw = 160;
  const s = 50;
  const hh = 80;
  const y0 = hh + 24;
  const top = from === 'D' ? s : bw + s;
  const xs = [0, bw + s, ...feet];
  const minX = Math.min(...xs) - 26;
  const maxX = Math.max(...xs) + 26;
  let body = `<polygon points="0,${y0} ${bw},${y0} ${bw + s},${y0 - hh} ${s},${y0 - hh}" fill="#eaf4fd" stroke="${INK}" stroke-width="2"/>`;
  const extR = Math.max(...feet);
  if (extR > bw) body += `<line x1="${bw}" y1="${y0}" x2="${extR + 10}" y2="${y0}" stroke="${INK}" stroke-width="1.2" stroke-dasharray="4 3"/>`;
  feet.forEach((f, i) => {
    if (f === 0 || f === bw) return; // הקטע הוא צלע המקבילית
    body += `<line x1="${top}" y1="${y0 - hh}" x2="${f}" y2="${y0}" stroke="${ACCENT}" stroke-width="1.6" stroke-dasharray="5 3"/>`;
    body += `<circle cx="${f}" cy="${y0}" r="2.8" fill="${ACCENT}"/>` + label(f, y0 + 19, 'EFG'[i], 'middle', ACCENT);
  });
  body +=
    label(-4, y0 + 18, 'A', 'end') +
    label(bw + 2, y0 + 19, 'B', 'start') +
    label(bw + s + 6, y0 - hh - 4, 'C', 'start') +
    label(s - 6, y0 - hh - 4, 'D', 'end');
  return svg(maxX - minX, y0 + 28, body, minX, 0);
}

function whichHeight(from, feet) {
  const bw = 160;
  const s = 50;
  const top = from === 'D' ? s : bw + s;
  const names = feet.map((f, i) => {
    if (f === 0) return `${from}A`;
    if (f === bw) return `${from}B`;
    return `${from}${'EFG'[i]}`;
  });
  const answer = feet.indexOf(top);
  if (answer === -1) throw new Error('no perpendicular candidate');
  return {
    q: m`איזה קטע הוא גובה לצלע $AB$?`,
    figure: candidatesFig(from, feet),
    options: names.map((n) => m`$${n}$`),
    answer,
  };
}

const TF = ['נכון', 'לא נכון'];
const tf = (q, truth) => ({ q, options: TF, answer: truth ? 0 : 1 });

/** צלעות a, b והגובה ל-a → הגובה ל-b. */
function otherHeight(a, b, ha) {
  const hb = (a * ha) / b;
  if (!Number.isInteger(hb) || ha > b || hb > a) throw new Error('impossible parallelogram');
  return {
    q: m`צלעות המקבילית $${a}$ ס״מ ו-$${b}$ ס״מ. הגובה לצלע של $${a}$ ס״מ הוא $${ha}$ ס״מ. מה הגובה לצלע של $${b}$ ס״מ?`,
    a: m`[[${hb}]] ס״מ`,
  };
}

/** שטח — כשנתונה גם צלע "מסיחה" שלא צריך. */
function areaWithDistractor(base, h, side) {
  if (h > side) throw new Error('height longer than the slanted side');
  return {
    q: m`בסיס המקבילית $${base}$ ס״מ, הגובה לבסיס $${h}$ ס״מ, והצלע השנייה $${side}$ ס״מ. מה שטח המקבילית?`,
    a: m`[[${base * h}]] סמ״ר`,
  };
}

function missingHeight(S, base) {
  const h = S / base;
  if (!Number.isInteger(h)) throw new Error('not whole');
  return { q: m`שטח המקבילית $${S}$ סמ״ר, והבסיס $${base}$ ס״מ. הגובה לבסיס: [[${h}]] ס״מ` };
}

export default {
  id: 'g5-parallelogram-height',
  grade: 5,
  emoji: '📐',
  title: 'גובה של מקבילית',
  reminder: [
    {
      title: 'גובה במקבילית',
      md: m`**גובה** הוא קטע **מאונך** בין שתי צלעות **מקבילות** — בין הבסיס לצלע שמולו.

<div class="diagram-box">${parallelogramFig({ base: 'בסיס', height: 'גובה' })}</div>`,
    },
    {
      title: 'הצלע המשופעת היא לא הגובה',
      md: m`הצלע המשופעת **ארוכה יותר** מהגובה. רק ב**מלבן** הצלעות עצמן הן הגבהים.

אפשר להוריד את הגובה **מכל נקודה** על הצלע שמול הבסיס — כל הגבהים האלה שווים.`,
    },
    {
      title: 'שני גבהים',
      wide: true,
      md: m`למקבילית יש **שני זוגות** של צלעות מקבילות, ולכן שני גבהים — אחד לכל זוג.

השטח יוצא אותו דבר בשתי הדרכים: צלעות $10$ ו-$6$, גבהים $3$ ו-$5$: $\;10 \times 3 = 6 \times 5 = 30$.`,
    },
  ],
  pages: [
    {
      title: 'זיהוי גובה',
      exercises: [
        {
          title: 'בחרו את הקטע שהוא גובה (מאונך לצלע $AB$ או להמשכה).',
          cols: 3,
          items: [whichHeight('D', [0, 50, 110]), whichHeight('D', [100, 0, 50]), whichHeight('C', [210, 160, 120])],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf('הגובה של מקבילית הוא תמיד אחת הצלעות שלה.', false),
            tf('במלבן, הצלעות הן גם הגבהים.', true),
            tf('למקבילית יש גובה לכל זוג של צלעות מקבילות.', true),
            tf('במקבילית שאינה מלבן, הגובה ארוך יותר מהצלע המשופעת.', false),
            tf('אפשר להוריד גובה לבסיס מכל נקודה על הצלע שמול הבסיס.', true),
          ],
        },
        {
          title: 'בחרו.',
          cols: 1,
          items: [
            {
              q: m`במקבילית $ABCD$, מאיזו נקודה אפשר להוריד גובה לצלע $AB$?`,
              options: [m`רק מ-$D$`, m`רק מ-$C$`, m`מכל נקודה על הצלע $DC$`],
              answer: 2,
            },
            {
              q: m`במקבילית שאינה מלבן, הצלע המשופעת היא $7$ ס״מ. איזה אורך יכול להיות הגובה לבסיס?`,
              options: [m`$5$ ס״מ`, m`$7$ ס״מ`, m`$9$ ס״מ`],
              answer: 0,
            },
          ],
        },
      ],
    },
    {
      title: 'חישובים עם גבהים',
      exercises: [
        {
          title: 'שימו לב איזה נתון צריך — ואיזה לא.',
          cols: 1,
          items: [areaWithDistractor(10, 3, 6), areaWithDistractor(12, 5, 8), areaWithDistractor(9, 4, 7)],
        },
        {
          title: 'מצאו את הגובה השני.',
          cols: 1,
          items: [otherHeight(12, 9, 6), otherHeight(10, 8, 4), otherHeight(14, 7, 6), otherHeight(15, 12, 8)],
        },
        {
          title: 'מצאו את הגובה.',
          cols: 1,
          items: [missingHeight(48, 12), missingHeight(63, 9), missingHeight(100, 20)],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'בחרו את הקטע שהוא גובה לצלע $AB$.', cols: 1, items: [whichHeight('C', [90, 210, 160])] },
      {
        title: 'נכון או לא נכון?',
        cols: 1,
        items: [tf('הצלע המשופעת של מקבילית היא אחד הגבהים שלה.', false), tf('למקבילית יש שני גבהים — אחד לכל זוג צלעות מקבילות.', true)],
      },
      { title: 'מה שטח המקבילית?', cols: 1, items: [areaWithDistractor(14, 5, 9)] },
      { title: 'מצאו את הגובה השני.', cols: 1, items: [otherHeight(18, 12, 8)] },
      { title: 'מצאו את הגובה.', cols: 1, items: [missingHeight(54, 9)] },
    ],
  },
};
