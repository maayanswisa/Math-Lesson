import { m } from './tex.js';

export default {
  id: 'g10u3-science-prob',
  topicId: 'g10-u3-science-prob',
  grade: 10,
  units: 3,
  emoji: '🎲',
  title: 'הסתברות בהקשר מדעי-חברתי',
  subtitle: 'לפלאס, משלים, איחוד ודו-שלבי',
  sections: [
    {
      id: 'laplace',
      emoji: '🎲',
      title: 'הגדרת לפלאס',
      blocks: [
        {
          type: 'dice',
          caption: 'כל פאה — אותו סיכוי. הטילו ובדקו:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'רצויות חלקי כל האפשרויות',
          md: m`כשכל התוצאות שוות-סיכוי: **ההסתברות** = מספר התוצאות הרצויות, חלקי מספר כל התוצאות. **מרחב המדגם** — כל התוצאות האפשריות.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה ההסתברות לקבל מספר גדול מ-$4$ בהטלת קובייה?`,
        options: [m`$\frac13$`, m`$\frac12$`, m`$\frac23$`, m`$\frac16$`],
        answer: 0,
        hint: m`$5$ או $6$.`,
        explain: m`$\frac26=\frac13$`,
      },
    },
    {
      id: 'complement',
      emoji: '🔄',
      title: 'משלים ואיחוד',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שני כללים',
          md: m`**משלים:** $P(\bar A)=1-P(A)$.

**מאורעות זרים** (לא קורים יחד): $P(A\cup B)=P(A)+P(B)$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        tolerance: 0.001,
        prompt: m`הסיכוי לגשם מחר $0.3$. מה הסיכוי שלא ירד גשם?`,
        answer: 0.7,
        hint: m`$1-0.3$`,
        explain: m`$0.7$`,
      },
    },
    {
      id: 'two-stage',
      emoji: '🏆',
      title: 'שלב הבוס: דו-שלבי',
      blocks: [
        {
          type: 'tree',
          red: 3,
          blue: 2,
          replace: true,
          caption: 'שתי הוצאות עם החזרה — כופלים לאורך הענף:',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'מטילים מטבע פעמיים. מה ההסתברות לשני "עץ"?',
        options: [m`$\frac14$`, m`$\frac12$`, m`$\frac13$`, m`$\frac34$`],
        answer: 0,
        hint: m`$\frac12\cdot\frac12$`,
        explain: m`$\frac14$`,
      },
    },
  ],
};
