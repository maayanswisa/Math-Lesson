import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g8-factoring',
  topicId: 'g8-factoring',
  grade: 8,
  emoji: '🧩',
  title: 'פירוק לגורמים',
  subtitle: 'הפעולה ההפוכה לפתיחת סוגריים: הוצאת גורם משותף',
  sections: [
    {
      id: 'reverse',
      emoji: '🔄',
      title: 'פתיחת סוגריים — ברוורס',
      blocks: [
        {
          type: 'text',
          md: m`פתיחת סוגריים: $3(2x+5)\ \to\ 6x+15$.

**פירוק לגורמים** הולך בכיוון ההפוך: $6x+15\ \to\ 3(2x+5)$. הופכים **סכום** ל**מכפלה**.`,
        },
        {
          type: 'area',
          caption: m`מלבן ששטחו $6x+15$ ואחת הצלעות שלו $3$. מה הצלע השנייה?`,
          rows: ['3'],
          cols: ['2x', '5'],
          cells: [['6x', '15']],
          result: m`6x+15=3(2x+5)`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה מתקבל כשפותחים את $4(x+3)$?`,
        options: [m`$4x+3$`, m`$4x+12$`, m`$x+12$`, m`$4x+7$`],
        answer: 1,
        hint: 'מתחילים מהכיוון המוכר — פתיחת סוגריים.',
        explain: m`$4x+12$ — ולכן הפירוק של $4x+12$ הוא $4(x+3)$.`,
      },
    },
    {
      id: 'gcf',
      emoji: '🔍',
      title: 'איך מוצאים את הגורם המשותף',
      blocks: [
        {
          type: 'text',
          md: m`שואלים: **מה מחלק את כל האיברים?** — מספר, $x$, או שניהם.`,
        },
        {
          type: 'steps',
          title: m`מפרקים: $8x+12$`,
          steps: [
            { math: m`8=${c(VIOLET, '4')}\cdot2,\quad 12=${c(VIOLET, '4')}\cdot3`, note: 'המספר הגדול שמחלק את שניהם: 4.' },
            { math: m`${c(VIOLET, '4')}(2x+3)`, note: 'מוציאים 4, ובסוגריים מה שנשאר מכל איבר.' },
            { math: m`4\cdot2x+4\cdot3=8x+12\ ${c(GREEN, '\\checkmark')}`, note: '**תמיד** בודקים — פותחים בחזרה.' },
          ],
        },
        {
          type: 'steps',
          title: m`גם $x$ יכול להיות גורם: $x^2+7x$`,
          steps: [
            { math: m`x^2=${c(VIOLET, 'x')}\cdot x,\quad 7x=7\cdot${c(VIOLET, 'x')}`, note: m`$x$ מופיע בשניהם.` },
            { math: m`${c(VIOLET, 'x')}(x+7)`, note: 'מוציאים אותו החוצה.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהו הפירוק המלא של $10x-15$?`,
        options: [m`$10(x-15)$`, m`$5(2x-3)$`, m`$5(2x-15)$`, m`$2(5x-15)$`],
        answer: 1,
        hint: 'איזה מספר מחלק גם את 10 וגם את 15?',
        explain: m`$5\cdot2x-5\cdot3=10x-15$ ✔️ — הגורם המשותף הוא 5.`,
      },
    },
    {
      id: 'mixed',
      emoji: '🏆',
      title: 'שלב הבוס: מספר וגם x',
      blocks: [
        {
          type: 'steps',
          title: m`מפרקים: $6x^2+9x$`,
          steps: [
            { math: m`6x^2=${c(VIOLET, '3x')}\cdot2x,\quad 9x=${c(VIOLET, '3x')}\cdot3`, note: m`גם 3 וגם $x$ משותפים — מוציאים $3x$.` },
            { math: c(GREEN, '3x(2x+3)'), note: m`בדיקה: $3x\cdot2x+3x\cdot3=6x^2+9x$ ✔️` },
          ],
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'איך יודעים שסיימנו?',
          md: m`בסוגריים **לא** נשאר שום דבר משותף. $2x+3$ — אין מספר או $x$ שמחלק את שניהם. ✔️`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהו הפירוק המלא של $4x^2-8x$?`,
        options: [m`$4(x^2-2x)$`, m`$x(4x-8)$`, m`$4x(x-2)$`, m`$2x(2x-8)$`],
        answer: 2,
        hint: m`הגורם המשותף הכי גדול כולל גם מספר וגם $x$.`,
        explain: m`$4x(x-2)$ — שאר האפשרויות משאירות משהו משותף בתוך הסוגריים.`,
      },
    },
  ],
};
