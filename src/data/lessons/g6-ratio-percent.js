import { m } from './tex.js';

export default {
  id: 'g6-ratio-percent',
  topicId: 'g6-ratio-percent',
  grade: 6,
  emoji: '💯',
  title: 'אחוזים',
  subtitle: 'אחוז מתוך שלם, מציאת השלם, הנחה והתייקרות',
  sections: [
    {
      id: 'part',
      emoji: '🧮',
      title: 'אחוז מכמות',
      blocks: [
        {
          type: 'text',
          md: m`אחוז = חלק מ-**100**. $25\%$ = $\frac{25}{100}$ = רבע.`,
        },
        {
          type: 'percent',
          mode: 'part',
          total: 240,
          percent: 25,
          caption: m`כמה זה אחוז מתוך $240$? הזיזו:`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $15\%$ מ-$80$?`,
        answer: 12,
        hint: m`$1\%$ מ-80 זה $0.8$.`,
        explain: m`$0.8\times15=12$`,
      },
    },
    {
      id: 'discount',
      emoji: '🏷️',
      title: 'הנחה והתייקרות',
      blocks: [
        {
          type: 'percent',
          mode: 'discount',
          total: 200,
          percent: 20,
          unit: '₪',
          caption: 'מחיר 200 ₪. בחרו אחוז הנחה:',
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'קיצור דרך',
          md: m`הנחה של $20\%$ = משלמים $80\%$: $200\times0.8=160$. התייקרות של $20\%$ = משלמים $120\%$: $200\times1.2=240$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '₪',
        prompt: 'מעיל עלה 300 ₪, והמחיר עלה ב-10%. מה המחיר החדש?',
        answer: 330,
        hint: m`$300\times1.1$`,
        explain: m`$300+30=330$ ₪.`,
      },
    },
    {
      id: 'whole',
      emoji: '🏆',
      title: 'שלב הבוס: מוצאים את השלם',
      blocks: [
        {
          type: 'steps',
          title: m`$30\%$ מהכיתה הם 9 תלמידים. כמה בכל הכיתה?`,
          steps: [
            { math: m`9:30=0.3`, note: 'כמה זה אחוז אחד.' },
            { math: m`0.3\times100=30`, note: 'מאה אחוזים — כל הכיתה.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$40\%$ מהמשכורת הם $2{,}000$ ₪. מה כל המשכורת?`,
        answer: 5000,
        hint: m`$1\%$ = $50$`,
        explain: m`$50\times100=5{,}000$ ₪.`,
      },
    },
  ],
};
