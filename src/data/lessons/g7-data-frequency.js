import { m } from './tex.js';

const TD = "style='padding:4px 12px;border:1px solid #dde'";
const TABLE = `<div class='diagram-box'><table style='border-collapse:collapse;text-align:center;font-weight:700'><tr><td ${TD}>ספורט</td><td ${TD}>סימון</td><td ${TD}>שכיחות</td></tr><tr><td ${TD}>⚽ כדורגל</td><td ${TD} dir='ltr'>||||| |||</td><td ${TD}>8</td></tr><tr><td ${TD}>🏀 כדורסל</td><td ${TD} dir='ltr'>|||||</td><td ${TD}>5</td></tr><tr><td ${TD}>🏊 שחייה</td><td ${TD} dir='ltr'>||||</td><td ${TD}>4</td></tr><tr><td ${TD}>🎾 טניס</td><td ${TD} dir='ltr'>|||</td><td ${TD}>3</td></tr></table></div>`;

const ITEMS = [
  { label: '⚽', count: 8 },
  { label: '🏀', count: 5 },
  { label: '🏊', count: 4 },
  { label: '🎾', count: 3 },
];

export default {
  id: 'g7-data-frequency',
  topicId: 'g7-data-frequency',
  grade: 7,
  emoji: '📊',
  title: 'איסוף וייצוג נתונים, ושכיחות',
  subtitle: 'טבלת שכיחויות, דיאגרמת עמודות — ואיך גרף יכול להטעות',
  sections: [
    {
      id: 'table',
      emoji: '📋',
      title: 'טבלת שכיחויות',
      blocks: [
        {
          type: 'text',
          md: m`שאלנו 20 תלמידים: "מה הספורט האהוב עליכם?" וסימנו קו על כל תשובה:

${TABLE}`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שכיחות',
          md: '**שכיחות** = כמה פעמים ערך מופיע בנתונים. סכום כל השכיחויות = מספר המשתתפים.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'מה השכיחות של שחייה?',
        answer: 4,
        hint: 'חפשו את השורה של שחייה.',
        explain: '4 תלמידים בחרו בשחייה.',
      },
    },
    {
      id: 'bars',
      emoji: '📊',
      title: 'דיאגרמת עמודות',
      blocks: [
        {
          type: 'bars',
          items: ITEMS,
          editable: true,
          caption: 'אותם נתונים בדיאגרמה. שנו תשובות עם + ו-− וראו איך הדיאגרמה משתנה:',
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'דרכים להציג',
          md: '**עמודות** — להשוות בין קטגוריות. **עוגה** — לראות חלקים מתוך שלם. **פיקטוגרם** — ציורים במקום עמודות.',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'לפי הנתונים המקוריים, איזה ענף הוא השכיח ביותר?',
        options: ['כדורגל', 'כדורסל', 'שחייה', 'טניס'],
        answer: 0,
        hint: 'העמודה הגבוהה ביותר.',
        explain: 'כדורגל — 8 תלמידים, העמודה הגבוהה ביותר.',
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: גרף מטעה',
      blocks: [
        {
          type: 'bars',
          items: [
            { label: 'חברה א', count: 52 },
            { label: 'חברה ב', count: 55 },
            { label: 'חברה ג', count: 58 },
          ],
          truncate: 50,
          caption: 'אחוזי שביעות רצון משלוש חברות. לחצו על הכפתור — ואז החזירו:',
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'שימו לב לציר!',
          md: 'כשציר לא מתחיל ב-0, הבדלים קטנים נראים ענקיים. תמיד בודקים מאיפה מתחיל הציר.',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'בגרף שבו הציר מתחיל ב-50, העמודה של חברה ג נראית פי 4 מזו של חברה א. מה נכון?',
        options: ['חברה ג באמת טובה פי 4', 'ההבדל האמיתי קטן: 58 מול 52', 'לחברה א אין לקוחות מרוצים', 'הנתונים שגויים'],
        answer: 1,
        hint: 'הסתכלו על המספרים עצמם.',
        explain: 'ההבדל האמיתי הוא 6 נקודות בלבד. הציר "החתוך" מגדיל אותו לעין.',
      },
    },
  ],
};
