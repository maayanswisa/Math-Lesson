import { m } from './tex.js';

export default {
  id: 'g11u3-science-prob',
  topicId: 'g11-u3-science-prob',
  grade: 11,
  units: 3,
  emoji: '🎲',
  title: 'מאורעות תלויים ובלתי תלויים',
  subtitle: 'כופלים הסתברויות — ו"לפחות אחד" דרך המשלים',
  sections: [
    {
      id: 'independent',
      emoji: '🪙',
      title: 'בלתי תלויים',
      blocks: [
        {
          type: 'coins',
          caption: 'הטלה אחת לא משפיעה על הבאה:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'כלל הכפל',
          md: m`$A$ ו-$B$ בלתי תלויים:

$$P(A\cap B)=P(A)\cdot P(B)$$

קובייה ומטבע: הסיכוי ל-$6$ **וגם** עץ הוא $\frac16\cdot\frac12=\frac1{12}$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        tolerance: 0.001,
        prompt: m`הסיכוי שדנה תגיע בזמן $0.9$, ושיואב יגיע בזמן $0.8$ (בלתי תלויים). מה הסיכוי ששניהם יגיעו בזמן?`,
        answer: 0.72,
        hint: m`$0.9\cdot0.8$`,
        explain: m`$0.72$`,
      },
    },
    {
      id: 'at-least',
      emoji: '🔄',
      title: 'לפחות אחד',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'דרך המשלים',
          md: m`"לפחות אחד" $=1-$ "אף אחד".

$3$ הטלות מטבע, לפחות פעם עץ: $1-\left(\frac12\right)^3=\frac78$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        tolerance: 0.001,
        prompt: m`מנורה נשרפת בסיכוי $0.1$. יש $2$ מנורות בלתי תלויות. מה הסיכוי שלפחות אחת תעבוד?`,
        answer: 0.99,
        hint: m`$1-0.1\cdot0.1$`,
        explain: m`$1-0.01=0.99$`,
      },
    },
    {
      id: 'dependent',
      emoji: '🏆',
      title: 'שלב הבוס: עם החזרה ובלי',
      blocks: [
        {
          type: 'tree',
          red: 3,
          blue: 2,
          replace: false,
          caption: 'שקית עם שלושה אדומים ושני כחולים. החליפו בין עם החזרה לבלי החזרה:',
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'בלי החזרה — תלויים',
          md: m`עם החזרה: $\frac35\cdot\frac35$. בלי החזרה: $\frac35\cdot\frac24$ — בשלב השני נשארו פחות כדורים!`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`בשקית $3$ אדומים ו-$2$ כחולים. מוציאים שניים **בלי החזרה**. מה הסיכוי ששניהם אדומים?`,
        options: [m`$\frac{3}{10}$`, m`$\frac{9}{25}$`, m`$\frac{6}{25}$`, m`$\frac35$`],
        answer: 0,
        hint: m`$\frac35\cdot\frac24$`,
        explain: m`$\frac{6}{20}=\frac{3}{10}$`,
      },
    },
  ],
};
