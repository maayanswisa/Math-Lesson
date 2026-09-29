import { m } from './tex.js';

export default {
  id: 'g10u3-finance',
  topicId: 'g10-u3-finance',
  grade: 10,
  units: 3,
  emoji: '🧭',
  title: 'תרגול מסכם — פיננסי-כלכלי',
  subtitle: 'נתונים, מודל לינארי, רווח ומדדי מרכז — ביחד',
  sections: [
    {
      id: 'data',
      emoji: '📊',
      title: 'קריאת נתונים',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'תזכורת',
          md: m`אחוז שינוי = השינוי חלקי הערך הישן, כפול $100\%$. כמות מאחוז: $\frac{p}{100}\times$ סך הכול.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '%',
        prompt: m`מחיר הדלק עלה מ-$6$ ₪ ל-$7.5$ ₪ לליטר. בכמה אחוזים?`,
        answer: 25,
        hint: m`$\frac{1.5}{6}$`,
        explain: m`$25\%$`,
      },
    },
    {
      id: 'linear',
      emoji: '📈',
      title: 'מודל לינארי',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'תזכורת',
          md: m`$y=mx+b$: $b$ התחלה, $m$ קצב.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'חודשים',
        prompt: m`דנה חוסכת לפי $y=150x+600$. אחרי כמה חודשים יהיו לה $3{,}000$ ₪?`,
        answer: 16,
        hint: m`$150x=2400$`,
        explain: m`$x=16$`,
      },
    },
    {
      id: 'profit',
      emoji: '💹',
      title: 'רווח',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'תזכורת',
          md: m`אחוז רווח מחושב מתוך **העלות**.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '₪',
        prompt: m`חנות קונה חולצה ב-$60$ ₪ ורוצה רווח של $35\%$. באיזה מחיר למכור?`,
        answer: 81,
        hint: m`$60\times1.35$`,
        explain: m`$81$ ₪.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: ממוצע משוקלל',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'תזכורת',
          md: m`$\bar x=\frac{n_1\bar x_1+n_2\bar x_2}{n_1+n_2}$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '₪',
        prompt: m`ב-$4$ ימי חול ההכנסה הממוצעת $2{,}000$ ₪, וביום שישי $5{,}000$ ₪. מה ההכנסה הממוצעת ליום ב-$5$ הימים?`,
        answer: 2600,
        hint: m`$\frac{8000+5000}{5}$`,
        explain: m`$2{,}600$ ₪.`,
      },
    },
  ],
};
