import { m } from './tex.js';

export default {
  id: 'g10u5-loci-congruence4',
  topicId: 'g10-u5-loci-congruence4',
  grade: 10,
  units: 5,
  emoji: '📍',
  title: 'מקומות גאומטריים ומשפט חפיפה רביעי',
  subtitle: 'נקודות מפגש במשולש, וחפיפה בצ.צ.ז',
  sections: [
    {
      id: 'loci',
      emoji: '🗺️',
      title: 'מקום גאומטרי',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שלושה מקומות',
          md: m`**מעגל** — כל הנקודות במרחק $R$ מנקודה.

**אנך אמצעי** — שוות מרחק משני קצות קטע.

**חוצה זווית** — שוות מרחק משתי שוקי הזווית.`,
        },
        {
          type: 'centers',
          modes: ['perp', 'bisector'],
          mode: 'perp',
          caption: 'מפגש שני סוגי המקומות במשולש — ומעגלים שנולדים מהם:',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'הנקודה שווה מרחק משלוש הצלעות של המשולש היא:',
        options: ['מפגש חוצי הזוויות', 'מפגש האנכים האמצעיים', 'מפגש התיכונים', 'מפגש הגבהים'],
        answer: 0,
        hint: 'מרחק מצלעות ← חוצה זווית.',
        explain: 'מרכז המעגל החסום.',
      },
    },
    {
      id: 'centroid',
      emoji: '⚖️',
      title: 'מרכז הכובד',
      blocks: [
        {
          type: 'centers',
          modes: ['median'],
          caption: 'התיכונים נפגשים במרכז הכובד:',
        },
        {
          type: 'card',
          tone: 'key',
          title: m`$2:1$`,
          md: m`מרכז הכובד מחלק כל תיכון ביחס $2:1$ מהקודקוד.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`המרחק ממרכז הכובד לאמצע הצלע הוא $5$. מה אורך התיכון?`,
        answer: 15,
        hint: m`זה השליש הקצר.`,
        explain: m`$3\cdot5=15$`,
      },
    },
    {
      id: 'congruence',
      emoji: '🏆',
      title: 'שלב הבוס: משפט חפיפה רביעי',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'צ.צ.ז',
          md: m`שתי צלעות שוות, וזווית שווה **מול הצלע הגדולה** מביניהן ← המשולשים חופפים.`,
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'מול הצלע הקטנה — לא!',
          md: m`אם הזווית מול הצלע הקטנה, יש שני משולשים אפשריים — המשפט לא עובד.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`במשולשים $AB=DE=7$, $AC=DF=5$, $\angle C=\angle F$. חופפים?`,
        options: [m`כן — הזווית מול הצלע הגדולה ($7$)`, 'לא', 'רק אם ישרי-זווית', 'אי אפשר לדעת'],
        answer: 0,
        hint: m`מה מול $\angle C$?`,
        explain: m`$\angle C$ מול $AB=7$ — הגדולה ← צ.צ.ז.`,
      },
    },
  ],
};
