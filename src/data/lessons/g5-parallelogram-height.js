import { m } from './tex.js';

const TWO_HEIGHTS = `<div class='diagram-box'><svg viewBox='0 0 230 120' width='230' xmlns='http://www.w3.org/2000/svg' style='direction:ltr'><polygon points='20,100 160,100 210,20 70,20' fill='rgba(13,110,110,0.1)' stroke='#0d6e6e' stroke-width='2.5'/><line x1='90' y1='20' x2='90' y2='100' stroke='#c45c48' stroke-width='2.5' stroke-dasharray='5 3'/><rect x='90' y='88' width='12' height='12' fill='none' stroke='#c45c48'/><line x1='160' y1='100' x2='102' y2='63.8' stroke='#7c4dcc' stroke-width='2.5' stroke-dasharray='5 3'/><text x='96' y='70' font-size='11' font-weight='700' fill='#c45c48'>1</text><text x='128' y='92' font-size='11' font-weight='700' fill='#7c4dcc'>2</text></svg></div>`;

export default {
  id: 'g5-parallelogram-height',
  topicId: 'g5-parallelogram-height',
  grade: 5,
  emoji: '▱',
  title: 'גובה של מקבילית',
  subtitle: 'המרחק הישר בין הבסיסים — ולא הצלע המשופעת',
  sections: [
    {
      id: 'what',
      emoji: '📏',
      title: 'מה זה גובה במקבילית?',
      blocks: [
        {
          type: 'text',
          md: m`**מקבילית** = מרובע עם **שני זוגות** של צלעות מקבילות.

**הגובה** = המרחק **הישר** (בזווית $90°$) בין שני בסיסים מקבילים.`,
        },
        {
          type: 'shape',
          shape: 'parallelogram',
          caption: 'הזיזו את הקודקוד — הצלע המשופעת מתארכת, אבל הגובה?',
          base: 6,
          height: 3,
          shift: 2,
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'מלכודת',
          md: 'הצלע המשופעת **אינה** הגובה! היא תמיד ארוכה יותר ממנו.',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'במקבילית, מה ארוך יותר?',
        options: ['הגובה', 'הצלע המשופעת', 'תמיד שווים', 'אי אפשר לדעת'],
        answer: 1,
        hint: 'הדרך הישרה (הגובה) היא הקצרה ביותר.',
        explain: 'הגובה הוא המרחק הקצר ביותר בין הבסיסים — הצלע המשופעת ארוכה ממנו (אלא אם המקבילית היא מלבן).',
      },
    },
    {
      id: 'two',
      emoji: '✌️',
      title: 'שני גבהים',
      blocks: [
        {
          type: 'text',
          md: m`למקבילית **שני זוגות** בסיסים — ולכן **שני גבהים**: אחד לכל זוג.

${TWO_HEIGHTS}`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'כמה גבהים שונים יש למקבילית?',
        answer: 2,
        hint: 'כמה זוגות של צלעות מקבילות?',
        explain: '2 זוגות בסיסים — 2 גבהים.',
      },
    },
    {
      id: 'rectangle',
      emoji: '🏆',
      title: 'שלב הבוס: מתי הצלע היא הגובה?',
      blocks: [
        {
          type: 'text',
          md: 'הזיזו את הקודקוד עד שהצלע המשופעת עומדת **ישר**. מה קיבלתם?',
        },
        {
          type: 'shape',
          shape: 'parallelogram',
          caption: 'נסו להביא את "הזזת הקודקוד" ל-0:',
          base: 6,
          height: 3,
          shift: 2,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'מלבן',
          md: 'מלבן הוא מקבילית שכל הזוויות שלה ישרות — ולכן אצלו **הצלע היא הגובה**.',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'באיזו מקבילית הצלע הצדדית שווה בדיוק לגובה?',
        options: ['בכל מקבילית', 'במלבן', 'אף פעם', 'רק במעוין'],
        answer: 1,
        hint: 'מתי הצלע עומדת ישר, בזווית של 90°?',
        explain: 'במלבן הזוויות ישרות, ולכן הצלע הצדדית מאונכת לבסיס — היא הגובה.',
      },
    },
  ],
};
