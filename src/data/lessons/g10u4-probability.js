import { m } from './tex.js';

export default {
  id: 'g10u4-probability',
  topicId: 'g10-u4-probability',
  grade: 10,
  units: 4,
  emoji: '🎲',
  title: 'הסתברות: מאורעות וכללים',
  subtitle: 'איחוד, חיתוך, מותנית ואי-תלות',
  sections: [
    {
      id: 'union',
      emoji: '⭕',
      title: 'איחוד וחיתוך',
      blocks: [
        {
          type: 'venn',
          pa: 0.5,
          pb: 0.4,
          pab: 0.2,
          caption: 'שנו את ההסתברויות — החיתוך נספר פעמיים, אז מחסירים אותו:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'כלל החיבור',
          md: m`$$P(A\cup B)=P(A)+P(B)-P(A\cap B)$$
`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        tolerance: 0.001,
        prompt: m`$P(A)=0.6$, $P(B)=0.5$, $P(A\cap B)=0.3$. מה $P(A\cup B)$?`,
        answer: 0.8,
        hint: m`$0.6+0.5-0.3$`,
        explain: m`$0.8$`,
      },
    },
    {
      id: 'conditional',
      emoji: '🔍',
      title: 'הסתברות מותנית',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'בתוך B',
          md: m`$$P(A/B)=\frac{P(A\cap B)}{P(B)}$$

"בהינתן ש-$B$ קרה" — מצמצמים את העולם ל-$B$.`,
        },
        {
          type: 'tree',
          red: 3,
          blue: 2,
          replace: false,
          caption: 'בלי החזרה — ההסתברות בשלב השני תלויה בראשון:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        tolerance: 0.001,
        prompt: m`$P(A\cap B)=0.12$, $P(B)=0.4$. מה $P(A/B)$?`,
        answer: 0.3,
        hint: m`$\frac{0.12}{0.4}$`,
        explain: m`$0.3$`,
      },
    },
    {
      id: 'independent',
      emoji: '🏆',
      title: 'שלב הבוס: אי-תלות',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'בלתי תלויים',
          md: m`$A$ ו-$B$ בלתי תלויים $\Leftrightarrow P(A\cap B)=P(A)\cdot P(B)\Leftrightarrow P(A/B)=P(A)$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`$P(A)=0.5$, $P(B)=0.4$, $P(A\cap B)=0.2$. האם הם בלתי תלויים?`,
        options: [m`כן — $0.5\cdot0.4=0.2$`, 'לא', 'רק אם הם זרים', 'אי אפשר לדעת'],
        answer: 0,
        hint: 'בודקים מכפלה.',
        explain: m`$0.2=0.2$ ✓`,
      },
    },
  ],
};
