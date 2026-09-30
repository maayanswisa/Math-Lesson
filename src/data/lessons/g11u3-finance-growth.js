import { m } from './tex.js';

export default {
  id: 'g11u3-finance-growth',
  topicId: 'g11-u3-finance-growth',
  grade: 11,
  units: 3,
  emoji: '🏦',
  title: 'ריבית, פחת ואינפלציה',
  subtitle: 'גדילה ודעיכה מעריכית בכסף',
  sections: [
    {
      id: 'interest',
      emoji: '💰',
      title: 'ריבית דריבית',
      blocks: [
        {
          type: 'growth',
          p: 10,
          caption: 'חיסכון של מאה שקלים בריבית שנתית. שנו את הריבית:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'ריבית על ריבית',
          md: m`$$A_t=A_0\cdot\left(1+\frac{p}{100}\right)^t$$

$1{,}000$ ₪ ב-$10\%$: שנה — $1{,}100$, שנתיים — $1{,}210$ (הריבית מרוויחה ריבית!).`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '₪',
        prompt: m`הפקדתי $5{,}000$ ₪ בריבית $4\%$ לשנה. כמה יהיה אחרי $2$ שנים?`,
        answer: 5408,
        hint: m`$5000\cdot1.04^2$`,
        explain: m`$5000\cdot1.0816=5408$ ₪.`,
      },
    },
    {
      id: 'depreciation',
      emoji: '🚗',
      title: 'פחת',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'ערך שיורד באחוז קבוע',
          md: m`מכונית ב-$100{,}000$ ₪ מאבדת $15\%$ בשנה: $q=0.85$. אחרי $3$ שנים: $100{,}000\cdot0.85^3\approx61{,}413$ ₪.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '₪',
        prompt: m`טלפון ב-$4{,}000$ ₪ מאבד $20\%$ מערכו בכל שנה. מה ערכו אחרי $2$ שנים?`,
        answer: 2560,
        hint: m`$4000\cdot0.8^2$`,
        explain: m`$4000\cdot0.64=2560$ ₪.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: אינפלציה',
      blocks: [
        {
          type: 'card',
          tone: 'warn',
          title: 'עלייה ואז ירידה — לא חוזרים להתחלה!',
          md: m`מחיר עלה ב-$10\%$ ואז ירד ב-$10\%$: $100\cdot1.1\cdot0.9=99$. הפסדנו $1\%$!`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '₪',
        prompt: m`סל קניות עלה $500$ ₪. האינפלציה $3\%$ לשנה. כמה יעלה אחרי $3$ שנים? (בערך)`,
        answer: 546.36,
        tolerance: 0.1,
        hint: m`$500\cdot1.03^3$`,
        explain: m`$500\cdot1.0927\approx546.4$ ₪.`,
      },
    },
  ],
};
