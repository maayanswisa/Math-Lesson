import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g10u4-triangle-lines',
  topicId: 'g10-u4-triangle-lines',
  grade: 10,
  units: 4,
  emoji: '🔺',
  title: 'קווים מיוחדים במשולש',
  subtitle: 'תיכונים, חוצי זוויות, אנכים אמצעיים וגבהים',
  sections: [
    {
      id: 'four',
      emoji: '📐',
      title: 'ארבעה סוגים — ארבע נקודות מפגש',
      blocks: [
        {
          type: 'centers',
          caption: 'בחרו סוג קו והזיזו את הקודקוד C. שלושת הקווים תמיד נפגשים בנקודה אחת!',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'ההגדרות',
          md: m`**תיכון** — מקודקוד לאמצע הצלע שמולו. **חוצה זווית** — מחלק זווית לשתיים. **אנך אמצעי** — מאונך לצלע באמצעה. **גובה** — מקודקוד, מאונך לצלע שמולו.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'מפגש האנכים האמצעיים הוא מרכז של...',
        options: ['המעגל החוסם את המשולש', 'המעגל החסום במשולש', 'הכובד', 'אף מעגל'],
        answer: 0,
        hint: 'אנך אמצעי — שוויון מרחקים מהקצוות.',
        explain: 'הנקודה שווה מרחק משלושת הקודקודים — מרכז המעגל החוסם.',
      },
    },
    {
      id: 'median',
      emoji: '⚖️',
      title: 'מרכז הכובד ותיכון ליתר',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שתי תכונות',
          md: m`מרכז הכובד מחלק כל תיכון ביחס ${c(VIOLET, '2:1')} (החלק הארוך — ליד הקודקוד).

במשולש ישר-זווית: התיכון ליתר ${c(GREEN, '=\\frac12')} היתר.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`תיכון באורך $12$. מה המרחק ממרכז הכובד לקודקוד?`,
        answer: 8,
        hint: m`$\frac23$ מהתיכון.`,
        explain: m`$\frac23\cdot12=8$`,
      },
    },
    {
      id: 'bisector',
      emoji: '🏆',
      title: 'שלב הבוס: משפט חוצה הזווית',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'חוצה זווית מחלק את הצלע ביחס הצלעות',
          md: m`חוצה הזווית מ-$A$ פוגע ב-$D$ שעל $BC$:

$$\frac{BD}{DC}=\frac{AB}{AC}$$
`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$AB=6$, $AC=9$, $BC=10$. חוצה הזווית $A$ פוגע ב-$D$. מה אורך $BD$?`,
        answer: 4,
        hint: m`$BD:DC=6:9=2:3$`,
        explain: m`$\frac25\cdot10=4$`,
      },
    },
  ],
};
