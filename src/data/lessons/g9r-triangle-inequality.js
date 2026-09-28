import { m } from './tex.js';

export default {
  id: 'g9r-triangle-inequality',
  topicId: 'g9r-triangle-inequality',
  grade: 9,
  emoji: '🔺',
  title: 'אי-שוויון המשולש',
  subtitle: 'מתי שלוש צלעות סוגרות משולש, ומה מול מה',
  sections: [
    {
      id: 'rule',
      emoji: '📏',
      title: 'לא כל שלוש צלעות סוגרות',
      blocks: [
        {
          type: 'triangle',
          caption: 'שנו את אורכי הצלעות — מתי נוצר משולש?',
          a: 5,
          b: 4,
          c: 3,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'אי-שוויון המשולש',
          md: m`**כל צלע קטנה מסכום שתי האחרות.** מספיק לבדוק את **הארוכה**: $3,4,9$ — $9>3+4$, אין משולש.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'אילו אורכים יכולים להיות צלעות של משולש?',
        options: ['2, 3, 6', '4, 5, 9', '5, 6, 10', '1, 1, 3'],
        answer: 2,
        hint: 'בדקו את הצלע הארוכה מול סכום שתי האחרות.',
        explain: '10 < 5 + 6 = 11 ✔️. (ב-4,5,9: 9 = 9 — "נשטח" לקו)',
      },
    },
    {
      id: 'range',
      emoji: '↔️',
      title: 'הטווח של הצלע השלישית',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'בין ההפרש לסכום',
          md: m`אם שתי צלעות הן $a$ ו-$b$, הצלע השלישית $c$:

$$|a-b|<c<a+b$$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'שתי צלעות במשולש הן 7 ו-3. מה יכולה להיות הצלע השלישית?',
        options: ['3', '4', '8', '10'],
        answer: 2,
        hint: m`$7-3<c<7+3$`,
        explain: '4 < c < 10 — רק 8 מתאים.',
      },
    },
    {
      id: 'opposite',
      emoji: '🏆',
      title: 'שלב הבוס: מה מול מה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'צלעות וזוויות',
          md: '**מול הצלע הארוכה — הזווית הגדולה**, ולהפך. (בכלי למעלה — העיגול הצהוב!)',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`במשולש $ABC$: $AB=5$, $BC=8$, $AC=6$. איזו זווית הכי גדולה?`,
        options: [m`$\angle A$`, m`$\angle B$`, m`$\angle C$`, 'כולן שוות'],
        answer: 0,
        hint: m`הצלע הארוכה היא $BC$. איזה קודקוד מולה?`,
        explain: m`$BC$ הארוכה ביותר, ומולה הזווית $\angle A$.`,
      },
    },
  ],
};
