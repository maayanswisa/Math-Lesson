import { m } from './tex.js';

export default {
  id: 'g11u3-science-growth',
  topicId: 'g11-u3-science-growth',
  grade: 11,
  units: 3,
  emoji: '🦠',
  title: 'גדילה ודעיכה מעריכית',
  subtitle: 'אחוז קבוע בכל יחידת זמן',
  sections: [
    {
      id: 'linear-vs-exp',
      emoji: '📈',
      title: 'לינארי מול מעריכי',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שני סוגי תהליכים',
          md: m`**לינארי** — מוסיפים **אותה כמות** בכל שלב: $100, 120, 140, 160$.

**מעריכי** — כופלים **באותו מספר** בכל שלב: $100, 120, 144, 172.8$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`הסדרה $50, 100, 200, 400$ מתארת תהליך:`,
        options: ['מעריכי — כפול 2 בכל שלב', 'לינארי', 'לא זה ולא זה', 'דעיכה'],
        answer: 0,
        hint: 'בודקים יחס, לא הפרש.',
        explain: m`$\frac{100}{50}=\frac{200}{100}=2$ — יחס קבוע.`,
      },
    },
    {
      id: 'formula',
      emoji: '🧪',
      title: 'הנוסחה',
      blocks: [
        {
          type: 'growth',
          p: 20,
          caption: 'שנו את אחוז השינוי — חיובי: גדילה, שלילי: דעיכה:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'כמות התחלתית כפול מקדם בחזקת הזמן',
          md: m`$$A_t=A_0\cdot q^t$$

גדילה ב-$p\%$: $q=1+\frac{p}{100}$. דעיכה ב-$p\%$: $q=1-\frac{p}{100}$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מושבה של $500$ חיידקים גדלה ב-$10\%$ כל שעה. כמה יהיו אחרי $3$ שעות?`,
        answer: 665.5,
        tolerance: 0.01,
        hint: m`$500\cdot1.1^3$`,
        explain: m`$500\cdot1.331=665.5$`,
      },
    },
    {
      id: 'decay',
      emoji: '🏆',
      title: 'שלב הבוס: דעיכה',
      blocks: [
        {
          type: 'card',
          tone: 'warn',
          title: m`דעיכה של $20\%$ — מקדם $0.8$`,
          md: m`תרופה בדם יורדת ב-$20\%$ בשעה: $q=0.8$. אחרי שעתיים: $100\cdot0.8^2=64$ — **לא** $60$!`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'מ"ג',
        prompt: m`בגוף $200$ מ"ג תרופה, והכמות יורדת ב-$25\%$ בכל שעה. כמה נשאר אחרי $2$ שעות?`,
        answer: 112.5,
        tolerance: 0.01,
        hint: m`$200\cdot0.75^2$`,
        explain: m`$200\cdot0.5625=112.5$ מ"ג.`,
      },
    },
  ],
};
