import { m } from '../helpers.js';

const THEOREMS = ['צ.ז.צ', 'ז.צ.ז', 'צ.צ.צ', 'לא ניתן לקבוע'];
const theorem = (data, which) => ({ q: m`$${data}$`, options: THEOREMS, answer: THEOREMS.indexOf(which) });
const config = (q, which) => ({ q, options: THEOREMS, answer: THEOREMS.indexOf(which) });

const TF = ['נכון', 'לא נכון'];
const tf = (q, truth) => ({ q, options: TF, answer: truth ? 0 : 1 });

/** △ABC ≅ △KLM עם מידות — חלק מהמידות במשולש השני. */
const measures = ({ AB, BC, A, B }) => ({
  q: m`$\triangle ABC \cong \triangle KLM$, $\;AB = ${AB}$, $BC = ${BC}$, $\angle A = ${A}°$, $\angle B = ${B}°$`,
  a: m`$KL =$ [[${AB}]] $\qquad LM =$ [[${BC}]] $\qquad \angle M =$ [[${180 - A - B}]] $°$`,
});

export default {
  id: 'g8-congruence',
  grade: 8,
  emoji: '🔺',
  title: 'חפיפת משולשים',
  reminder: [
    {
      title: 'משולשים חופפים',
      md: m`זהים **בצורה ובגודל**: כל הצלעות המתאימות וכל הזוויות המתאימות שוות.

$\triangle ABC \cong \triangle DEF$ — **סדר האותיות** קובע מי מתאים למי: $A \leftrightarrow D$, $B \leftrightarrow E$, $C \leftrightarrow F$.`,
    },
    {
      title: 'משפטי החפיפה',
      md: m`- **צ.ז.צ** — שתי צלעות **והזווית שביניהן**
- **ז.צ.ז** — שתי זוויות **והצלע שביניהן**
- **צ.צ.צ** — שלוש צלעות`,
    },
    {
      title: 'זהירות!',
      md: m`**ז.ז.ז אינו משפט חפיפה** — משולשים עם אותן זוויות יכולים להיות בגדלים שונים.

**צלע משותפת** וזוויות **קודקודיות** — נתונים "חינם" שכדאי לחפש בשרטוט.`,
    },
  ],
  pages: [
    {
      title: 'משפטי החפיפה והתאמה',
      exercises: [
        {
          title: m`ב-$\triangle ABC$ וב-$\triangle DEF$ ידוע: — לפי איזה משפט הם חופפים?`,
          cols: 1,
          items: [
            theorem('AB = DE,\\; \\angle B = \\angle E,\\; BC = EF', 'צ.ז.צ'),
            theorem('\\angle A = \\angle D,\\; AB = DE,\\; \\angle B = \\angle E', 'ז.צ.ז'),
            theorem('AB = DE,\\; BC = EF,\\; AC = DF', 'צ.צ.צ'),
            theorem('\\angle A = \\angle D,\\; \\angle B = \\angle E,\\; \\angle C = \\angle F', 'לא ניתן לקבוע'),
            theorem('AC = DF,\\; \\angle C = \\angle F,\\; BC = EF', 'צ.ז.צ'),
            theorem('\\angle B = \\angle E,\\; BC = EF,\\; \\angle C = \\angle F', 'ז.צ.ז'),
          ],
        },
        {
          title: m`ידוע ש-$\triangle ABC \cong \triangle DEF$. השלימו את הצלע או הזווית המתאימה (באותיות לטיניות).`,
          cols: 2,
          items: [
            { q: m`$BC =$ [[t:EF|FE]]` },
            { q: m`$AC =$ [[t:DF|FD]]` },
            { q: m`$\angle A = \angle$ [[t:D]]` },
            { q: m`$\angle C = \angle$ [[t:F]]` },
          ],
        },
        { title: 'השלימו את המידות.', cols: 1, items: [measures({ AB: 6, BC: 8, A: 50, B: 60 }), measures({ AB: 10, BC: 7, A: 35, B: 95 })] },
      ],
    },
    {
      title: 'נתון נוסף ומצבים מוכרים',
      exercises: [
        {
          title: 'איזה נתון נוסף יבטיח חפיפה?',
          cols: 1,
          items: [
            {
              q: m`ידוע $AB = DE$ ו-$\angle B = \angle E$. מה צריך עוד כדי להוכיח חפיפה לפי **צ.ז.צ**?`,
              options: [m`$BC = EF$`, m`$AC = DF$`, m`$\angle C = \angle F$`],
              answer: 0,
            },
            {
              q: m`ידוע $AB = DE$ ו-$\angle B = \angle E$. מה צריך עוד כדי להוכיח חפיפה לפי **ז.צ.ז**?`,
              options: [m`$BC = EF$`, m`$\angle A = \angle D$`, m`$AC = DF$`],
              answer: 1,
            },
            {
              q: m`ידוע $AB = DE$ ו-$AC = DF$. מה צריך עוד כדי להוכיח חפיפה לפי **צ.צ.צ**?`,
              options: [m`$\angle A = \angle D$`, m`$\angle B = \angle E$`, m`$BC = EF$`],
              answer: 2,
            },
          ],
        },
        {
          title: 'לפי איזה משפט המשולשים חופפים?',
          cols: 1,
          items: [
            config(m`במרובע $ABCD$: $AB = CD$ ו-$AD = BC$. האלכסון $AC$ יוצר את $\triangle ABC$ ו-$\triangle CDA$.`, 'צ.צ.צ'),
            config(m`הקטעים $AB$ ו-$CD$ חוצים זה את זה בנקודה $O$. המשולשים $\triangle AOC$ ו-$\triangle BOD$.`, 'צ.ז.צ'),
            config(m`$AD$ חוצה את הזווית $A$ במשולש $ABC$, ו-$AD \perp BC$. המשולשים $\triangle ABD$ ו-$\triangle ACD$.`, 'ז.צ.ז'),
          ],
        },
        {
          title: 'נכון או לא נכון?',
          cols: 1,
          items: [
            tf('שני משולשים שכל הזוויות שלהם שוות — תמיד חופפים.', false),
            tf('במשולשים חופפים, כל הצלעות המתאימות שוות.', true),
            tf('ברישום חפיפה, סדר האותיות קובע אילו קודקודים מתאימים.', true),
            tf('זוויות קודקודיות שוות זו לזו.', true),
          ],
        },
      ],
    },
  ],
  quiz: {
    exercises: [
      {
        title: 'לפי איזה משפט המשולשים חופפים?',
        cols: 1,
        items: [theorem('BC = EF,\\; \\angle C = \\angle F,\\; AC = DF', 'צ.ז.צ'), theorem('AB = DE,\\; AC = DF,\\; BC = EF', 'צ.צ.צ')],
      },
      {
        title: m`ידוע ש-$\triangle PQR \cong \triangle XYZ$. השלימו.`,
        cols: 2,
        items: [{ q: m`$QR =$ [[t:YZ|ZY]]` }, { q: m`$\angle P = \angle$ [[t:X]]` }],
      },
      { title: 'השלימו את המידות.', cols: 1, items: [measures({ AB: 5, BC: 12, A: 70, B: 45 })] },
      { title: 'לפי איזה משפט?', cols: 1, items: [config(m`$M$ אמצע $AB$ ואמצע $CD$. המשולשים $\triangle AMC$ ו-$\triangle BMD$.`, 'צ.ז.צ')] },
      { title: 'נכון או לא נכון?', cols: 1, items: [tf('ז.ז.ז הוא משפט חפיפה.', false)] },
    ],
  },
};
