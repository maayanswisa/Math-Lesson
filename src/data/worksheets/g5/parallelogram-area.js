import { m, round, parallelogramFig } from '../helpers.js';

const areaItem = (b, h) => ({ q: m`צלע $${b}$ ס״מ, והגובה אליה $${h}$ ס״מ. השטח: [[${round(b * h)}]] סמ״ר` });
const figItem = (b, h, side = null) => ({
  q: '',
  figure: parallelogramFig({ base: b, height: h, side }),
  a: m`שטח: [[${round(b * h)}]] סמ״ר`,
});

function missing(S, { b, h }) {
  const ans = b != null ? S / b : S / h;
  if (!Number.isInteger(ans)) throw new Error('not whole');
  return b != null
    ? { q: m`שטח המקבילית $${S}$ סמ״ר, והצלע $${b}$ ס״מ. הגובה לצלע הזו: [[${ans}]] ס״מ` }
    : { q: m`שטח המקבילית $${S}$ סמ״ר, והגובה $${h}$ ס״מ. הצלע שאליה הגובה: [[${ans}]] ס״מ` };
}

/** שני גבהים: צלעות a, b והגובה ל-a נתון → שטח, והגובה ל-b. */
function twoHeights(a, b, ha) {
  const S = a * ha;
  const hb = S / b;
  if (!Number.isInteger(hb) || ha > b || hb > a) throw new Error('impossible parallelogram');
  return {
    q: m`צלעות המקבילית $${a}$ ס״מ ו-$${b}$ ס״מ. הגובה לצלע של $${a}$ ס״מ הוא $${ha}$ ס״מ.`,
    a: m`השטח: [[${S}]] סמ״ר · הגובה לצלע של $${b}$ ס״מ: [[${hb}]] ס״מ`,
  };
}

const perimeter = (a, b) => ({ q: m`צלעות המקבילית $${a}$ ס״מ ו-$${b}$ ס״מ. ההיקף: [[${round(2 * (a + b))}]] ס״מ` });
const missingSide = (P, a) => ({ q: m`היקף המקבילית $${P}$ ס״מ, ואחת הצלעות $${a}$ ס״מ. הצלע השנייה: [[${P / 2 - a}]] ס״מ` });

export default {
  id: 'g5-parallelogram-area',
  grade: 5,
  emoji: '▱',
  title: 'שטח מקבילית',
  reminder: [
    {
      title: 'שטח מקבילית',
      md: m`**שטח** = **צלע** $\times$ **הגובה לאותה צלע**

<div class="diagram-box">${parallelogramFig({ base: 'צלע', height: 'גובה' })}</div>`,
    },
    {
      title: 'למה זה עובד?',
      md: m`גוזרים את המשולש מצד אחד של המקבילית ומעבירים אותו לצד השני — ומקבלים **מלבן** עם אותו בסיס ואותו גובה.

שימו לב: **הצלע המשופעת** לא משתתפת בחישוב השטח!`,
    },
    {
      title: 'שני גבהים',
      md: m`לכל זוג צלעות יש גובה משלו. השטח יוצא **אותו דבר** בשתי הדרכים:

$10 \times 3 = 6 \times 5 = 30$`,
    },
    {
      title: 'היקף',
      md: m`במקבילית הצלעות הנגדיות שוות, ולכן ההיקף הוא **פעמיים** סכום שתי צלעות סמוכות.

צלעות $8$ ו-$5$ ס״מ: $2 \times (8 + 5) = 26$ ס״מ`,
    },
  ],
  pages: [
    {
      title: 'שטח מקבילית',
      exercises: [
        {
          title: 'חשבו את שטח המקבילית.',
          cols: 2,
          items: [areaItem(8, 5), areaItem(12, 7), areaItem(9, 6), areaItem(15, 4), areaItem(6.5, 4), areaItem(20, 11)],
        },
        {
          title: 'חשבו את השטח לפי השרטוט (המידות בס״מ, השרטוט לא בקנה מידה).',
          cols: 3,
          items: [figItem(10, 6), figItem(7, 4), figItem(9, 4, 5)],
        },
        {
          title: 'בחרו את התשובה הנכונה.',
          cols: 1,
          items: [
            {
              q: 'שטח מקבילית שווה לשטח של מלבן עם...',
              options: ['אותו בסיס ואותו גובה', 'אותו בסיס ואותה צלע משופעת', 'אותו היקף'],
              answer: 0,
            },
            {
              q: 'מכפילים פי $2$ את הגובה של מקבילית, והצלע אליה הוא יורד לא משתנה. מה קורה לשטח?',
              options: ['גדל פי 2', 'גדל פי 4', 'לא משתנה'],
              answer: 0,
            },
            {
              q: m`צלעות מקבילית הן $8$ ס״מ ו-$5$ ס״מ. איזה שטח **לא** ייתכן?`,
              options: [m`$20$ סמ״ר`, m`$36$ סמ״ר`, m`$50$ סמ״ר`],
              answer: 2,
            },
          ],
        },
        {
          title: 'מצאו את המידה החסרה.',
          cols: 1,
          items: [missing(48, { b: 8 }), missing(72, { h: 9 }), missing(45, { b: 9 }), missing(100, { h: 4 })],
        },
      ],
    },
    {
      title: 'שני גבהים, והיקף',
      exercises: [
        {
          title: 'חשבו את השטח ואת הגובה השני.',
          cols: 1,
          items: [twoHeights(10, 6, 3), twoHeights(12, 8, 4), twoHeights(15, 10, 6), twoHeights(9, 6, 4)],
        },
        {
          title: 'חשבו את ההיקף.',
          cols: 2,
          items: [perimeter(8, 5), perimeter(12, 7), perimeter(6.5, 4), { q: m`מקבילית שכל צלעותיה $9$ ס״מ (מעוין). ההיקף: [[36]] ס״מ` }],
        },
        {
          title: 'מצאו את הצלע החסרה.',
          cols: 1,
          items: [missingSide(30, 9), missingSide(50, 15), missingSide(24, 7)],
        },
        {
          title: 'שאלות מילוליות.',
          cols: 1,
          items: [
            { q: m`חלקת דשא בצורת מקבילית: צלע $25$ מ׳, והגובה אליה $12$ מ׳. מה שטח החלקה?`, a: m`[[${25 * 12}]] מ״ר` },
            { q: m`שטח חלקה $300$ מ״ר. שק דשן אחד מספיק ל-$50$ מ״ר. כמה שקים צריך לכל החלקה?`, a: m`[[${300 / 50}]] שקים` },
            {
              q: m`למלבן ולמקבילית אותו בסיס ($12$ ס״מ) ואותו גובה ($5$ ס״מ). מה שטח המקבילית?`,
              a: m`[[${12 * 5}]] סמ״ר`,
            },
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'חשבו את שטח המקבילית.', cols: 2, items: [areaItem(11, 6), areaItem(7.5, 4), areaItem(20, 9)] },
      { title: 'חשבו את השטח לפי השרטוט (המידות בס״מ).', cols: 1, items: [figItem(12, 5, 7)] },
      { title: 'מצאו את הגובה.', cols: 1, items: [missing(56, { b: 8 })] },
      { title: 'חשבו את השטח ואת הגובה השני.', cols: 1, items: [twoHeights(16, 10, 5)] },
      { title: 'חשבו את ההיקף.', cols: 2, items: [perimeter(9, 4), perimeter(12.5, 7.5)] },
      {
        title: 'בחרו.',
        cols: 1,
        items: [
          {
            q: m`למקבילית ולמלבן יש בסיס $10$ ס״מ וגובה $4$ ס״מ. מה נכון?`,
            options: ['לשניהם אותו שטח', 'למלבן שטח גדול יותר', 'למקבילית שטח גדול יותר'],
            answer: 0,
          },
        ],
      },
    ],
  },
};
