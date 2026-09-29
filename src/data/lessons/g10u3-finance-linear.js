import { m } from './tex.js';

export default {
  id: 'g10u3-finance-linear',
  topicId: 'g10-u3-finance-linear',
  grade: 10,
  units: 3,
  emoji: '📈',
  title: 'מודל לינארי בהקשר כלכלי',
  subtitle: 'ערך התחלתי + קצב קבוע',
  sections: [
    {
      id: 'model',
      emoji: '💰',
      title: 'y = mx + b',
      blocks: [
        {
          type: 'line',
          lines: [{ m: 2, b: 1 }],
          caption: m`חיסכון: התחלה $b$ ועוד $m$ בכל חודש. שנו ובדקו:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שתי משמעויות',
          md: m`$b$ — **ערך התחלתי** (כש-$x=0$). $m$ — **קצב שינוי**: בכמה $y$ משתנה כש-$x$ גדל ב-$1$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מנוי חדר כושר: $150$ ₪ דמי הרשמה ועוד $90$ ₪ לחודש. מה המודל?`,
        options: [m`$y=90x+150$`, m`$y=150x+90$`, m`$y=240x$`, m`$y=90x-150$`],
        answer: 0,
        hint: 'מה משתנה כל חודש ומה משלמים פעם אחת?',
        explain: m`קצב $90$ לחודש, ערך התחלתי $150$.`,
      },
    },
    {
      id: 'slope',
      emoji: '📐',
      title: 'שיפוע משתי נקודות',
      blocks: [
        {
          type: 'steps',
          title: m`אחרי $2$ חודשים היו בחשבון $700$ ₪, ואחרי $5$ חודשים — $1{,}300$ ₪`,
          steps: [
            { math: m`m=\frac{1300-700}{5-2}=200`, note: 'קצב החיסכון לחודש.' },
            { math: m`700=200\cdot2+b\Rightarrow b=300`, note: 'מציבים נקודה.' },
            { math: m`y=200x+300`, note: 'המודל המלא.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '₪',
        prompt: m`לפי $y=200x+300$ — כמה יהיה בחשבון אחרי שנה ($12$ חודשים)?`,
        answer: 2700,
        hint: m`$200\cdot12+300$`,
        explain: m`$2{,}700$ ₪.`,
      },
    },
    {
      id: 'compare',
      emoji: '🏆',
      title: 'שלב הבוס: איזו תוכנית משתלמת?',
      blocks: [
        {
          type: 'line',
          lines: [
            { m: 1, b: 2 },
            { m: 2, b: 0 },
          ],
          showIntersection: true,
          caption: 'שתי תוכניות: נקודת החיתוך — שם הן עולות אותו דבר:',
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'נקודת חיתוך',
          md: m`משווים: $m_1x+b_1=m_2x+b_2$. שיפועים שווים ← ישרים **מקבילים** — אין חיתוך, אחת תמיד זולה יותר.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'דקות',
        prompt: m`תוכנית א: $50+0.2x$ ₪. תוכנית ב: $20+0.5x$ ₪ ($x$ — דקות שיחה). באיזו כמות דקות הן שוות?`,
        answer: 100,
        hint: m`$50+0.2x=20+0.5x$`,
        explain: m`$30=0.3x\Rightarrow x=100$ דקות.`,
      },
    },
  ],
};
