import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g5-median-average',
  topicId: 'g5-median-average',
  grade: 5,
  emoji: '⚖️',
  title: 'ממוצע וחציון',
  subtitle: 'שתי דרכים לתאר ערך "טיפוסי" של נתונים',
  sections: [
    {
      id: 'average',
      emoji: '🍬',
      title: 'ממוצע = לחלק שווה בשווה',
      blocks: [
        {
          type: 'text',
          md: m`לדני 2 סוכריות, לרוני 5 ולמאיה 8. אם יחלקו את **כל** הסוכריות **שווה בשווה** — כמה יקבל כל אחד? זה הממוצע!`,
        },
        {
          type: 'steps',
          title: 'הממוצע של 2, 5, 8',
          steps: [
            { math: m`2+5+8=${c(VIOLET, '15')}`, note: 'מחברים את כולם.' },
            { math: m`15\div${c(VIOLET, '3')}=${c(GREEN, '5')}`, note: 'מחלקים במספר הערכים (3 ילדים).' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה הממוצע של הציונים $80,\ 90,\ 70$?`,
        answer: 80,
        hint: m`$80+90+70=240$, ועכשיו מחלקים ב-3.`,
        explain: m`$240\div3=80$`,
      },
    },
    {
      id: 'median',
      emoji: '🎯',
      title: 'חציון = האמצעי',
      blocks: [
        {
          type: 'steps',
          title: m`החציון של $14,\ 6,\ 19,\ 8,\ 12$`,
          steps: [
            { math: m`6,\ 8,\ 12,\ 14,\ 19`, note: '**קודם** מסדרים מהקטן לגדול!' },
            { math: m`6,\ 8,\ ${c(GREEN, '12')},\ 14,\ 19`, note: 'לוקחים את האמצעי: שניים משמאלו, שניים מימינו.' },
          ],
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'מלכודת',
          md: 'שוכחים לסדר! האמצעי של הרשימה **הלא** מסודרת (19) הוא **לא** החציון.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה החציון של $9,\ 2,\ 7,\ 4,\ 5$?`,
        answer: 5,
        hint: 'סדרו קודם.',
        explain: m`$2,4,5,7,9$ — האמצעי הוא 5.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'עובדה על הממוצע',
          md: 'הממוצע תמיד **בין** הקטן ביותר לגדול ביותר — אבל לא חייב להיות אחד המספרים. הממוצע של 1 ו-2 הוא 1.5.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'הממוצע של 4 מספרים הוא 10. מה הסכום שלהם?',
        answer: 40,
        hint: 'ממוצע = סכום ÷ כמות. אז סכום = ?',
        explain: '10 × 4 = 40.',
      },
    },
  ],
};
