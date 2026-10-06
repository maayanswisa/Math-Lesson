import { m, round } from '../helpers.js';

/** △ABC ~ △DEF ביחס k = DE/AB. */
function sides([a, b, c], k) {
  const [d, e, f] = [a, b, c].map((x) => round(x * k));
  return {
    q: m`$\triangle ABC \sim \triangle DEF$. $\;AB = ${a}$, $BC = ${b}$, $AC = ${c}$, $\;DE = ${d}$`,
    a: m`יחס הדמיון $k =$ [[${k}]] $\qquad EF =$ [[${e}]] $\qquad DF =$ [[${f}]]`,
  };
}

const perimeterRatio = (P, k) => ({ q: m`יחס הדמיון $${k}$, היקף המשולש הקטן $${P}$ ס״מ. היקף הגדול: [[${round(P * k)}]] ס״מ` });
const areaRatio = (S, k) => ({ q: m`יחס הדמיון $${k}$, שטח המשולש הקטן $${S}$ סמ״ר. שטח הגדול: [[${round(S * k * k)}]] סמ״ר` });

/** האם המשולשים דומים לפי זוויות? (שתי זוויות שוות מספיקות) */
function byAngles([a1, b1], [a2, b2]) {
  const t1 = [a1, b1, 180 - a1 - b1].sort((x, y) => x - y);
  const t2 = [a2, b2, 180 - a2 - b2].sort((x, y) => x - y);
  const same = t1.every((v, i) => v === t2[i]);
  return {
    q: m`במשולש אחד זוויות $${a1}°$ ו-$${b1}°$, ובשני $${a2}°$ ו-$${b2}°$. האם הם דומים?`,
    options: ['כן', 'לא'],
    answer: same ? 0 : 1,
  };
}

/** האם הצלעות פרופורציוניות? */
function bySides(s1, s2) {
  const a = [...s1].sort((x, y) => x - y);
  const b = [...s2].sort((x, y) => x - y);
  const k = b[0] / a[0];
  const same = a.every((v, i) => Math.abs(v * k - b[i]) < 1e-9);
  return { q: m`צלעות: $${s1.join(', ')}$ ו-$${s2.join(', ')}$. האם המשולשים דומים?`, options: ['כן', 'לא'], answer: same ? 0 : 1 };
}

export default {
  id: 'g8-similarity',
  grade: 8,
  emoji: '🔍',
  title: 'דמיון משולשים',
  reminder: [
    {
      title: 'משולשים דומים',
      md: m`**אותה צורה**, גודל שונה (או שווה): הזוויות המתאימות **שוות**, והצלעות המתאימות **פרופורציוניות**.

$\triangle ABC \sim \triangle DEF$ — שוב, סדר האותיות קובע מי מתאים למי.`,
    },
    {
      title: 'יחס הדמיון k',
      md: m`$$k = \frac{DE}{AB} = \frac{EF}{BC} = \frac{DF}{AC}$$

$AB = 4$ ו-$DE = 6$ ← $k = 1.5$, ולכן $EF = 1.5 \cdot BC$.`,
    },
    {
      title: 'היקפים ושטחים',
      md: m`יחס ההיקפים $= k$ · יחס השטחים $= k^2$

$k = 3$ ← ההיקף גדל פי $3$, והשטח פי $9$!`,
    },
    {
      title: 'מתי משולשים דומים?',
      md: m`מספיק ש**שתי זוויות** שוות (אז גם השלישית שווה), או שכל **שלוש הצלעות** פרופורציוניות.`,
    },
  ],
  pages: [
    {
      title: 'יחס דמיון וצלעות',
      exercises: [
        { title: 'מצאו את יחס הדמיון ואת הצלעות החסרות.', cols: 1, items: [sides([4, 6, 8], 1.5), sides([5, 7, 9], 2), sides([10, 6, 12], 0.5), sides([3, 4, 5], 3)] },
        {
          title: 'מצאו את הצלע החסרה.',
          cols: 1,
          items: [
            { q: m`$\triangle ABC \sim \triangle KLM$, $\;AB = 6$, $KL = 9$, $BC = 8$. $\;LM =$ [[${(9 / 6) * 8}]]` },
            { q: m`$\triangle ABC \sim \triangle KLM$, $\;AC = 15$, $KM = 5$, $AB = 12$. $\;KL =$ [[${(5 / 15) * 12}]]` },
            { q: m`עץ מטיל צל של $12$ מ׳, ובאותו זמן מוט של $2$ מ׳ מטיל צל של $3$ מ׳. גובה העץ: [[${(2 / 3) * 12}]] מ׳` },
          ],
        },
        {
          title: 'האם המשולשים דומים?',
          cols: 1,
          items: [byAngles([50, 60], [60, 70]), byAngles([40, 80], [40, 70]), bySides([3, 4, 5], [6, 8, 10]), bySides([2, 3, 4], [4, 6, 9])],
        },
      ],
    },
    {
      title: 'היקפים ושטחים',
      exercises: [
        { title: 'יחס ההיקפים שווה ליחס הדמיון.', cols: 1, items: [perimeterRatio(12, 2), perimeterRatio(20, 1.5), perimeterRatio(30, 0.5)] },
        { title: 'יחס השטחים שווה לריבוע יחס הדמיון.', cols: 1, items: [areaRatio(5, 2), areaRatio(4, 3), areaRatio(10, 1.5)] },
        {
          title: 'מצאו את יחס הדמיון.',
          cols: 1,
          items: [
            { q: m`היקף משולש אחד $15$ ס״מ, והיקף משולש דומה לו $45$ ס״מ. $\;k =$ [[3]]` },
            { q: m`שטח משולש אחד $8$ סמ״ר, ושטח משולש דומה לו $32$ סמ״ר. $\;k =$ [[2]]` },
          ],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            { q: 'כל שני משולשים שווי-צלעות דומים זה לזה.', options: ['נכון', 'לא נכון'], answer: 0 },
            { q: 'משולשים חופפים הם גם דומים (ביחס 1).', options: ['נכון', 'לא נכון'], answer: 0 },
            { q: 'אם מגדילים כל צלע פי 2, גם השטח גדל פי 2.', options: ['נכון', 'לא נכון'], answer: 1 },
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      { title: 'מצאו את יחס הדמיון ואת הצלעות החסרות.', cols: 1, items: [sides([6, 8, 10], 2.5)] },
      { title: 'האם המשולשים דומים?', cols: 1, items: [byAngles([35, 75], [70, 75])] },
      { title: 'היקף ושטח.', cols: 1, items: [perimeterRatio(18, 3), areaRatio(6, 2)] },
      { title: 'מצאו את הצלע.', cols: 1, items: [{ q: m`$\triangle ABC \sim \triangle DEF$, $\;AB = 4$, $DE = 10$, $AC = 6$. $\;DF =$ [[${(10 / 4) * 6}]]` }] },
    ],
  },
};
