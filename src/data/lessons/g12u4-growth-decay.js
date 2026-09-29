import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g12u4-growth-decay',
  topicId: 'g12-u4-growth-decay',
  grade: 12,
  units: 4,
  emoji: '🦠',
  title: 'בעיות גדילה ודעיכה',
  subtitle: 'אחוז קבוע בכל שלב — ריבית, חיידקים ומחצית חיים',
  sections: [
    {
      id: 'model',
      emoji: '📐',
      title: 'המודל',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: m`$N(t)=N(0)\cdot q^t$`,
          md: m`גדילה ב-$p\%$: $q=1+\frac{p}{100}$ · דעיכה ב-$p\%$: $q=1-\frac{p}{100}$

**לא** הוספה קבועה (זו חשבונית) — אלא **כפל** קבוע בכל שלב.`,
        },
        {
          type: 'growth',
          p: 20,
          caption: 'שנו את אחוז השינוי: מה קורה בחיובי? ובשלילי?',
        },
      ],
      challenge: {
        type: 'number',
        label: 'q =',
        prompt: 'ערך מכונית יורד ב-15% בכל שנה. מה יחס השינוי q?',
        answer: 0.85,
        tolerance: 0.001,
        hint: m`$1-\frac{15}{100}$`,
        explain: m`$q=0.85$`,
      },
    },
    {
      id: 'compute',
      emoji: '🏦',
      title: 'כמה יהיה?',
      blocks: [
        {
          type: 'steps',
          title: 'הפקידו 10,000 ש"ח בריבית של 5% לשנה. כמה יהיו אחרי 3 שנים?',
          steps: [
            { math: m`N(0)=10000,\ q=${c(VIOLET, '1.05')}`, note: 'מזהים.' },
            { math: m`N(3)=10000\cdot1.05^3`, note: 'מציבים.' },
            { math: m`\approx${c(GREEN, '11576')}`, note: 'ש"ח (ולא 11,500 — הריבית מצטברת על הריבית!).' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'במושבה 500 חיידקים, והיא גדלה ב-10% בכל שעה. כמה יהיו אחרי 2 שעות?',
        answer: 605,
        hint: m`$500\cdot1.1^2$`,
        explain: m`$500\cdot1.21=605$`,
      },
    },
    {
      id: 'half',
      emoji: '☢️',
      title: 'מחצית חיים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'הזמן עד שנשאר חצי',
          md: m`$$N(t)=N(0)\cdot\left(\frac12\right)^{t/T}$$

$T$ — זמן מחצית החיים. אחרי $T$ נשאר חצי, אחרי $2T$ — רבע, אחרי $3T$ — שמינית.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'מ"ג',
        prompt: 'זמן מחצית החיים של תרופה בגוף הוא 6 שעות. נטלו 80 מ"ג. כמה נשאר אחרי יממה?',
        answer: 5,
        hint: m`24 שעות = 4 מחציות: $80\cdot\left(\frac12\right)^4$`,
        explain: m`$80\cdot\frac{1}{16}=5$ מ"ג.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: מתי?',
      blocks: [
        {
          type: 'steps',
          title: 'אוכלוסייה של 1000 גדלה ב-20% בשנה. מתי תגיע ל-2000?',
          steps: [
            { math: m`1000\cdot1.2^t=2000`, note: 'המשוואה.' },
            { math: m`1.2^t=2`, note: 'מחלקים.' },
            { math: m`t=\log_{1.2}2=\frac{\log2}{\log1.2}\approx${c(GREEN, '3.8')}`, note: 'לוגריתם — כמעט 4 שנים.' },
          ],
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'יחידות זמן אחידות!',
          md: 'לפני שבונים את הפונקציה — מתרגמים הכול לאותה יחידה (שעות / ימים / שנים).',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'שנים',
        prompt: m`כמות קטנה ב-50% בכל שנה. אחרי כמה שנים תהיה $\frac18$ מההתחלה?`,
        answer: 3,
        hint: m`$0.5^t=\frac18$`,
        explain: m`$\left(\frac12\right)^3=\frac18$ — 3 שנים.`,
      },
    },
  ],
};
