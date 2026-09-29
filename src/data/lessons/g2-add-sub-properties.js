import { m } from './tex.js';

export default {
  id: 'g2-add-sub-properties',
  topicId: 'g2-add-sub-properties',
  grade: 2,
  emoji: '🔄',
  title: 'תכונות של חיבור וחיסור',
  subtitle: 'פעולות הפוכות, האפס, וסדר שלא משנה',
  sections: [
    {
      id: 'inverse',
      emoji: '↩️',
      title: 'פעולות הפוכות',
      blocks: [
        {
          type: 'text',
          md: m`חיסור מבטל חיבור: $8+5=13$, ולכן $13-5=8$.

זה עוזר **לבדוק** תשובה: פתרתם $42-17=25$? בדקו: $25+17=42$ ✔️`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$36+\square=50$. מה המספר החסר?`,
        answer: 14,
        hint: m`הפוך: $50-36$`,
        explain: m`$50-36=14$`,
      },
    },
    {
      id: 'zero',
      emoji: '0️⃣',
      title: 'האפס',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'אפס לא משנה',
          md: m`$47+0=47$

$47-0=47$

$47-47=0$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $0+95$?`,
        answer: 95,
        hint: 'מוסיפים כלום.',
        explain: m`$0+95=95$`,
      },
    },
    {
      id: 'order',
      emoji: '🔀',
      title: 'שלב הבוס: הסדר לא משנה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'חוק החילוף וחוק הקיבוץ',
          md: m`**חילוף**: $3+48=48+3$ — קל יותר להתחיל מהגדול!

**קיבוץ**: $17+6+4=17+(6+4)=17+10=27$ — מחפשים חברים שיוצרים 10.`,
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'בחיסור — לא!',
          md: m`$9-4$ זה לא אותו דבר כמו $4-9$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`חשבו בדרך הקלה: $25+38+75$`,
        answer: 138,
        hint: m`$25+75=100$`,
        explain: m`$(25+75)+38=100+38=138$`,
      },
    },
  ],
};
