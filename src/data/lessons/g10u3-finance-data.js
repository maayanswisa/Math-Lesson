import { m } from './tex.js';

export default {
  id: 'g10u3-finance-data',
  topicId: 'g10-u3-finance-data',
  grade: 10,
  units: 3,
  emoji: '📊',
  title: 'קריאת נתונים והסקת מסקנות',
  subtitle: 'עמודות, עוגה, גרפים — ושינוי נושא נוסחה',
  sections: [
    {
      id: 'bars',
      emoji: '📊',
      title: 'דיאגרמת עמודות',
      blocks: [
        {
          type: 'bars',
          items: [
            { label: 'ינו׳', count: 12 },
            { label: 'פבר׳', count: 9 },
            { label: 'מרץ', count: 15 },
            { label: 'אפר׳', count: 18 },
          ],
          truncate: 8,
          caption: 'הכנסות של חנות (באלפי ₪). נסו את הכפתור — ציר שלא מתחיל באפס מגזים הבדלים:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'אחוז שינוי',
          md: m`**אחוז שינוי** = השינוי חלקי הערך הישן, כפול $100\%$.

ממרץ לאפריל: $\frac{18-15}{15}\times100\%=20\%$ עלייה.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '%',
        prompt: 'בכמה אחוזים ירדו ההכנסות מינואר לפברואר?',
        answer: 25,
        hint: m`$\frac{12-9}{12}$`,
        explain: m`$\frac{3}{12}=0.25=25\%$`,
      },
    },
    {
      id: 'pie',
      emoji: '🥧',
      title: 'דיאגרמת עיגול',
      blocks: [
        {
          type: 'pie',
          items: [
            { label: '🏠 דיור', value: 2 },
            { label: '🛒 מזון', value: 1 },
            { label: '🚌 תחבורה', value: 1 },
          ],
          total: 12000,
          caption: 'הוצאות משפחה בחודש: 12,000 ₪. לחצו על פרוסה:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'מאחוז לכמות',
          md: m`כל הגזרות יחד $=100\%$. כמות $=\frac{p}{100}\times$ הסך הכול.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '₪',
        prompt: m`אם החלק של דיור יירד ל-$40\%$, כמה ₪ יוצאו על דיור (מתוך $12{,}000$)?`,
        answer: 4800,
        hint: m`$0.4\times12{,}000$`,
        explain: m`$4{,}800$ ₪.`,
      },
    },
    {
      id: 'formula',
      emoji: '🏆',
      title: 'שלב הבוס: שינוי נושא נוסחה',
      blocks: [
        {
          type: 'steps',
          title: m`$P=a+b\cdot n$ (מחיר מונית: $a$ פתיחה, $b$ לק"מ). מבודדים את $n$:`,
          steps: [
            { math: m`P-a=b\cdot n`, note: m`מחסירים $a$ משני האגפים.` },
            { math: m`n=\frac{P-a}{b}`, note: m`מחלקים ב-$b$.` },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ק"מ',
        prompt: m`מונית: פתיחה $12$ ₪ ועוד $4$ ₪ לק"מ. שילמתי $60$ ₪. כמה ק"מ נסעתי?`,
        answer: 12,
        hint: m`$n=\frac{60-12}{4}$`,
        explain: m`$\frac{48}{4}=12$ ק"מ.`,
      },
    },
  ],
};
