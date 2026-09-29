import { m } from './tex.js';

export default {
  id: 'g4-data-pictograph-pie',
  topicId: 'g4-data-pictograph-pie',
  grade: 4,
  emoji: '🥧',
  title: 'פיקטוגרם ודיאגרמת עוגה',
  subtitle: 'ציורים שכל אחד שווה כמה — ועוגה של חלקים',
  sections: [
    {
      id: 'picto',
      emoji: '🖼️',
      title: 'פיקטוגרם',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'מקרא: כל 📚 = 10 ספרים',
          md: 'כיתה א׳: 📚📚📚📚\n\nכיתה ב׳: 📚📚📚📚📚📚\n\nכיתה ג׳: 📚📚📚 ועוד חצי 📚',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'כמה ספרים קראה כיתה ג׳?',
        answer: 35,
        hint: 'שלושה ציורים ועוד חצי ציור.',
        explain: m`$3\times10+5=35$`,
      },
    },
    {
      id: 'pie',
      emoji: '🥧',
      title: 'דיאגרמת עוגה',
      blocks: [
        {
          type: 'pie',
          items: [
            { label: '🍕 פיצה', value: 2 },
            { label: '🍝 פסטה', value: 1 },
            { label: '🍔 המבורגר', value: 1 },
          ],
          total: 40,
          caption: '40 תלמידים בחרו מאכל אהוב. לחצו על פרוסה:',
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'עוגה מראה חלקים',
          md: 'העוגה כולה = כל התלמידים. פרוסה של חצי = חצי מהתלמידים.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'בעוגה, הפיצה תופסת חצי. כמה תלמידים מתוך 40 בחרו פיצה?',
        answer: 20,
        hint: 'חצי מ-40.',
        explain: m`$40:2=20$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: רבע מהעוגה',
      blocks: [
        {
          type: 'text',
          md: 'בעוגה, הפסטה תופסת **רבע**. כדי לדעת כמה תלמידים — צריך לדעת את **הסך הכול**, ולחלק ב-4.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'בסקר השתתפו 80 ילדים, ורבע מהעוגה הוא "טניס". כמה ילדים בחרו טניס?',
        answer: 20,
        hint: m`$80:4$`,
        explain: m`$80:4=20$`,
      },
    },
  ],
};
