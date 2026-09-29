import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g11u5-probability',
  topicId: 'g11-u5-probability',
  grade: 11,
  units: 5,
  emoji: '🎲',
  title: 'הסתברות: חוקים, תלות והסתברות מותנית',
  subtitle: 'איחוד וחיתוך, בהינתן ש..., ומתי מאורעות בלתי תלויים',
  sections: [
    {
      id: 'rules',
      emoji: '📏',
      title: 'חוקי היסוד',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'מה תמיד נכון',
          md: m`$0\le P(A)\le1$

$P(U)=1$

$P(\emptyset)=0$

$P(\bar A)=1-P(A)$

**איחוד**: $P(A\cup B)=P(A)+P(B)-P(A\cap B)$ — מחסרים את החיתוך כי ספרנו אותו פעמיים.`,
        },
        {
          type: 'venn',
          caption: 'שנו את ההסתברויות וראו את האיחוד:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$P(A)=0.5$, $P(B)=0.4$, $P(A\cap B)=0.1$. מה $P(A\cup B)$?`,
        answer: 0.8,
        tolerance: 0.001,
        hint: m`$0.5+0.4-0.1$`,
        explain: m`$P(A\cup B)=0.8$`,
      },
    },
    {
      id: 'conditional',
      emoji: '🔎',
      title: 'הסתברות מותנית',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'בהינתן ש-B קרה',
          md: m`$$P(A/B)=\frac{P(A\cap B)}{P(B)}$$

מצמצמים את העולם ל-$B$ בלבד — ושואלים איזה חלק ממנו הוא גם $A$.`,
        },
        {
          type: 'steps',
          title: 'בכיתה 30 תלמידים: 12 בנות, מתוכן 9 אוהבות מתמטיקה. בוחרים בת — מה הסיכוי שהיא אוהבת מתמטיקה?',
          steps: [
            { math: m`P(B)=\frac{12}{30},\ P(A\cap B)=\frac{9}{30}`, note: 'B = בת, A = אוהבת מתמטיקה.' },
            { math: m`P(A/B)=\frac{9/30}{12/30}=${c(GREEN, '\\frac34')}`, note: 'או ישר: 9 מתוך 12.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$P(A\cap B)=0.12$ ו-$P(B)=0.4$. מה $P(A/B)$?`,
        answer: 0.3,
        tolerance: 0.001,
        hint: m`$\frac{0.12}{0.4}$`,
        explain: m`$0.3$`,
      },
    },
    {
      id: 'independent',
      emoji: '🔗',
      title: 'אי-תלות',
      blocks: [
        {
          type: 'venn',
          pa: 0.5,
          pb: 0.4,
          pab: 0.1,
          caption: m`הזיזו את $P(A\cap B)$ עד שיופיע "בלתי תלויים ✔". באיזה ערך זה קורה?`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שלושה תנאים שקולים',
          md: m`$P(A\cap B)=P(A)\cdot P(B)$ ⟺ $P(A/B)=P(A)$ ⟺ $P(A/B)=P(A/\bar B)$

במילים: לדעת ש-$B$ קרה **לא משנה** את הסיכוי של $A$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`$P(A)=0.3$, $P(B)=0.5$, $P(A\cap B)=0.15$. האם $A$ ו-$B$ בלתי תלויים?`,
        options: ['כן', 'לא', 'הם זרים', 'אי אפשר לדעת'],
        answer: 0,
        hint: m`$0.3\cdot0.5=?$`,
        explain: m`$0.3\cdot0.5=0.15=P(A\cap B)$ ✓`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: לא להפוך',
      blocks: [
        {
          type: 'card',
          tone: 'warn',
          title: m`$P(A/B)\neq P(B/A)$`,
          md: m`הסיכוי שכדורסלן הוא גבוה — גבוה מאוד. הסיכוי שאדם גבוה הוא כדורסלן — נמוך מאוד. אלה שתי שאלות **שונות**!`,
        },
        {
          type: 'steps',
          title: m`$P(A)=0.9$, $P(B)=0.01$, $P(A\cap B)=0.009$`,
          steps: [
            { math: m`P(A/B)=\frac{0.009}{0.01}=${c(VIOLET, '0.9')}`, note: 'גבוה.' },
            { math: m`P(B/A)=\frac{0.009}{0.9}=${c(VIOLET, '0.01')}`, note: 'נמוך מאוד.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$P(A)=0.6$, $P(B)=0.2$, $P(A\cap B)=0.15$. מה $P(B/A)$?`,
        answer: 0.25,
        tolerance: 0.001,
        hint: m`מחלקים ב-$P(A)$ — לא ב-$P(B)$!`,
        explain: m`$\frac{0.15}{0.6}=0.25$ (ואילו $P(A/B)=0.75$)`,
      },
    },
  ],
};
