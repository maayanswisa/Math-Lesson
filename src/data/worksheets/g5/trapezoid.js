import { m, num, round, trapezoidFig } from '../helpers.js';

const area = (a, b, h) => round(((a + b) * h) / 2);

const areaItem = (a, b, h) => ({ q: m`בסיסים $${a}$ ו-$${b}$ ס״מ, גובה $${h}$ ס״מ. השטח: [[${area(a, b, h)}]] סמ״ר` });
const figItem = (bottom, top, height, rightAngled = false) => ({
  q: '',
  figure: trapezoidFig({ bottom, top, height, rightAngled }),
  a: m`שטח: [[${area(bottom, top, height)}]] סמ״ר`,
});

function missingHeight(S, a, b) {
  const h = (2 * S) / (a + b);
  if (!Number.isInteger(h)) throw new Error('not whole');
  return { q: m`שטח הטרפז $${S}$ סמ״ר והבסיסים $${a}$ ו-$${b}$ ס״מ. הגובה: [[${h}]] ס״מ` };
}

function missingBase(S, h, known, which) {
  const other = (2 * S) / h - known;
  if (!Number.isInteger(other) || other <= 0) throw new Error('bad base');
  const knownWord = which === 'small' ? 'הבסיס הגדול' : 'הבסיס הקטן';
  const askWord = which === 'small' ? 'הבסיס הקטן' : 'הבסיס הגדול';
  return { q: m`שטח הטרפז $${S}$ סמ״ר, הגובה $${h}$ ס״מ ו${knownWord} $${known}$ ס״מ. ${askWord}: [[${other}]] ס״מ` };
}

/** טרפז ישר-זווית: בסיסים a > b, שוק מאונכת h, שוק משופעת s (נבדק בפיתגורס). */
function rightTrapezoid(a, b, h, s) {
  if ((a - b) ** 2 + h ** 2 !== s ** 2) throw new Error('impossible right trapezoid');
  return {
    q: m`טרפז ישר-זווית: בסיסים $${a}$ ו-$${b}$ ס״מ, השוק המאונכת $${h}$ ס״מ והשוק המשופעת $${s}$ ס״מ.`,
    a: m`שטח: [[${area(a, b, h)}]] סמ״ר · היקף: [[${a + b + h + s}]] ס״מ`,
  };
}

const TF = ['נכון', 'לא נכון'];
const tf = (q, truth) => ({ q, options: TF, answer: truth ? 0 : 1 });

export default {
  id: 'g5-trapezoid',
  grade: 5,
  emoji: '⏢',
  title: 'טרפז — גובה ושטח',
  reminder: [
    {
      title: 'חלקי הטרפז',
      md: m`<div class="diagram-box">${trapezoidFig({ bottom: 'בסיס גדול', top: 'בסיס קטן', height: 'גובה' })}</div>

שתי הצלעות **המקבילות** הן **הבסיסים**, שתי האחרות — **שוקיים**. **הגובה** הוא המרחק המאונך בין הבסיסים.`,
    },
    {
      title: 'שטח טרפז',
      md: m`**שטח** = (בסיס גדול + בסיס קטן) $\times$ גובה $: 2$

בסיסים $10$ ו-$6$, גובה $4$: $\;(10 + 6) \times 4 : 2 = 32$ סמ״ר`,
    },
    {
      title: 'טרפזים מיוחדים',
      wide: true,
      md: m`**טרפז ישר-זווית** — שוק אחת מאונכת לבסיסים, והיא גם **הגובה**.
**טרפז שווה-שוקיים** — שתי השוקיים שוות באורכן.`,
    },
  ],
  pages: [
    {
      title: 'שטח טרפז',
      exercises: [
        {
          title: 'חשבו את שטח הטרפז.',
          cols: 2,
          items: [areaItem(10, 6, 4), areaItem(12, 8, 5), areaItem(9, 5, 6), areaItem(15, 7, 4), areaItem(20, 10, 3), areaItem(7, 3, 5)],
        },
        {
          title: 'חשבו את השטח לפי השרטוט (המידות בס״מ, השרטוט לא בקנה מידה).',
          cols: 3,
          items: [figItem(12, 6, 5), figItem(10, 4, 6), figItem(8, 5, 4, true)],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf('בטרפז יש בדיוק זוג אחד של צלעות מקבילות.', true),
            tf('הגובה של טרפז הוא תמיד אחת השוקיים.', false),
            tf('בטרפז ישר-זווית, השוק המאונכת לבסיסים היא גם הגובה.', true),
            tf('בטרפז שווה-שוקיים, שני הבסיסים שווים.', false),
          ],
        },
      ],
    },
    {
      title: 'נתון חסר, היקף ובעיות',
      exercises: [
        { title: 'מצאו את הגובה.', cols: 1, items: [missingHeight(40, 12, 8), missingHeight(63, 10, 8), missingHeight(30, 9, 3)] },
        {
          title: 'מצאו את הבסיס החסר.',
          cols: 1,
          items: [missingBase(36, 4, 12, 'small'), missingBase(55, 5, 7, 'big'), missingBase(24, 3, 10, 'small')],
        },
        {
          title: 'חשבו את ההיקף.',
          cols: 1,
          items: [
            { q: m`צלעות הטרפז: $10$, $5$, $6$ ו-$5$ ס״מ. ההיקף: [[26]] ס״מ` },
            { q: m`טרפז שווה-שוקיים: בסיסים $12$ ו-$6$ ס״מ, כל שוק $5$ ס״מ. ההיקף: [[${12 + 6 + 5 + 5}]] ס״מ` },
          ],
        },
        { title: 'טרפז ישר-זווית: חשבו שטח והיקף.', cols: 1, items: [rightTrapezoid(9, 5, 3, 5)] },
        {
          title: 'שאלות מילוליות.',
          cols: 1,
          items: [
            { q: m`ערוגה בצורת טרפז: בסיסים $6$ ו-$4$ מ׳, גובה $3$ מ׳. מה שטח הערוגה?`, a: m`[[${area(6, 4, 3)}]] מ״ר` },
            { q: m`חלון בצורת טרפז: בסיסים $80$ ו-$60$ ס״מ, גובה $50$ ס״מ. מה שטח החלון?`, a: m`[[${area(80, 60, 50)}]] סמ״ר` },
            {
              q: m`למקבילית ולטרפז אותו גובה, $6$ ס״מ. בסיס המקבילית $9$ ס״מ, ובסיסי הטרפז $12$ ו-$6$ ס״מ. למי שטח גדול יותר?`,
              options: ['למקבילית', 'לטרפז', 'השטחים שווים'],
              answer: 9 * 6 === area(12, 6, 6) ? 2 : 9 * 6 > area(12, 6, 6) ? 0 : 1,
            },
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'חשבו את שטח הטרפז.', cols: 1, items: [areaItem(14, 6, 5)] },
      { title: 'חשבו את השטח לפי השרטוט (המידות בס״מ).', cols: 1, items: [figItem(11, 5, 4)] },
      { title: 'מצאו את הנתון החסר.', cols: 1, items: [missingHeight(45, 10, 8), missingBase(28, 4, 9, 'small')] },
      { title: 'טרפז ישר-זווית: חשבו שטח והיקף.', cols: 1, items: [rightTrapezoid(12, 8, 3, 5)] },
      { title: 'נכון או לא נכון?', cols: 1, items: [tf('הגובה של טרפז הוא המרחק המאונך בין שני הבסיסים.', true)] },
      {
        title: 'שאלה מילולית.',
        cols: 1,
        items: [{ q: m`גג בצורת טרפז: בסיסים $${num(12)}$ ו-$8$ מ׳, גובה $5$ מ׳. כמה מ״ר רעפים צריך?`, a: m`[[${area(12, 8, 5)}]] מ״ר` }],
      },
    ],
  },
};
