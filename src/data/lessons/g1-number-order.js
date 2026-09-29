import { m } from './tex.js';

export default {
  id: 'g1-number-order',
  topicId: 'g1-number-order',
  grade: 1,
  emoji: '🐊',
  title: 'סדר המספרים עד 100',
  subtitle: 'גדול, קטן, לפני, אחרי ובין',
  sections: [
    {
      id: 'compare',
      emoji: '🐊',
      title: 'גדול או קטן?',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'משווים עשרות קודם',
          md: m`$47$ או $52$? ב-52 יש 5 עשרות, ב-47 רק 4. לכן $52>47$.

אם העשרות שוות — משווים את היחידות: $36<39$.`,
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'התנין הרעב 🐊',
          md: m`הפה של הסימן תמיד פתוח אל המספר **הגדול**: $8>3$ וגם $3<8$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'איזה מספר גדול יותר?',
        options: ['68', '86', 'הם שווים', 'אי אפשר לדעת'],
        answer: 1,
        hint: 'השוו את העשרות.',
        explain: m`ב-86 יש 8 עשרות, ב-68 רק 6: $86>68$.`,
      },
    },
    {
      id: 'neighbors',
      emoji: '🏘️',
      title: 'לפני, אחרי ובין',
      blocks: [
        {
          type: 'text',
          md: m`המספר **שאחרי** 29 הוא 30. המספר **שלפני** 40 הוא 39.

בין $45$ ל-$47$ נמצא $46$.`,
        },
        {
          type: 'hundred',
          step: 10,
          caption: 'בלוח המאה: לחצו על מספר. מה לפניו ומה אחריו?',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'איזה מספר בא מיד אחרי 59?',
        answer: 60,
        hint: 'מוסיפים 1.',
        explain: m`$59+1=60$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: מסדרים',
      blocks: [
        {
          type: 'text',
          md: m`מהקטן לגדול: $12,\ 21,\ 35,\ 53$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'איזה מספר הכי קטן?',
        options: ['41', '14', '44', '40'],
        answer: 1,
        hint: 'למי יש הכי מעט עשרות?',
        explain: 'ל-14 יש רק עשרת אחת — הוא הקטן ביותר.',
      },
    },
  ],
};
