import { c, GREEN, m, RED, SKY } from './tex.js';

export default {
  id: 'g11u3-finance',
  topicId: 'g11-u3-finance',
  grade: 11,
  units: 3,
  emoji: '🧾',
  title: 'תרגול מסכם — פיננסי-כלכלי',
  subtitle: 'ריבית, פחת, רבעונים וסטיית תקן — בשאלות כמו בבגרות',
  sections: [
    {
      id: 'interest',
      emoji: '🏦',
      title: 'ריבית דריבית',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'תזכורת',
          md: m`$$M_n=M_0\cdot\left(1+\frac{p}{100}\right)^{n}$$

בפחת — מחסרים: $1-\frac{p}{100}$`,
        },
        {
          type: 'steps',
          title: m`הלוואה של $30{,}000$ ₪ בריבית של $6\%$ בשנה. כמה יחזירו אחרי $2$ שנים בתשלום אחד?`,
          steps: [
            { math: m`30{,}000\cdot1.06^2=30{,}000\cdot1.1236`, note: '' },
            { math: m`=${c(GREEN, '33{,}708')}`, note: '₪ — מתוכם 3,708 ₪ ריבית.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '₪ =',
        prompt: m`מפקידים $8{,}000$ ₪ בריבית של $5\%$ בשנה. כמה כסף יהיה אחרי $2$ שנים?`,
        answer: 8820,
        hint: m`$8{,}000\cdot1.05^2$`,
        explain: m`$8{,}000\cdot1.1025=8{,}820$ ₪`,
      },
    },
    {
      id: 'depreciation',
      emoji: '💻',
      title: 'פחת',
      blocks: [
        {
          type: 'steps',
          title: m`מחשב שעולה $6{,}000$ ₪ מאבד $25\%$ מערכו בכל שנה. אחרי כמה שנים ערכו יהיה פחות מ-$2{,}000$ ₪?`,
          steps: [
            { math: m`6{,}000\cdot0.75^3=2{,}531.25`, note: 'אחרי 3 שנים — עדיין יותר.' },
            { math: m`6{,}000\cdot0.75^4\approx${c(GREEN, '1{,}898.44')}`, note: 'אחרי 4 שנים — פחות מ-2,000 ₪.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '₪ =',
        prompt: m`רכב שעולה $80{,}000$ ₪ מאבד $10\%$ מערכו בכל שנה. מה ערכו אחרי $3$ שנים?`,
        answer: 58320,
        hint: m`$80{,}000\cdot0.9^3$`,
        explain: m`$80{,}000\cdot0.729=58{,}320$ ₪`,
      },
    },
    {
      id: 'quartile',
      emoji: '🧱',
      title: 'רבעונים',
      blocks: [
        {
          type: 'steps',
          title: m`מחירי דירות באזור, באלפי ₪, ממוינים: $900,\ 1{,}100,\ 1{,}200,\ 1{,}400,\ 1{,}500,\ 1{,}700,\ 2{,}000,\ 2{,}600$`,
          steps: [
            { math: m`\frac{8}{4}=2\ \Rightarrow\ Q_1=\frac{1{,}100+1{,}200}{2}=${c(SKY, '1{,}150')}`, note: '' },
            { math: m`\frac{16}{4}=4\ \Rightarrow\ Q_2=\frac{1{,}400+1{,}500}{2}=1{,}450`, note: 'החציון.' },
            { math: m`\frac{24}{4}=6\ \Rightarrow\ Q_3=\frac{1{,}700+2{,}000}{2}=${c(SKY, '1{,}850')}`, note: '' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'אלף ₪ =',
        prompt: 'לפי מחירי הדירות שלמעלה — מה הטווח הבין-רבעוני?',
        answer: 700,
        hint: m`$Q_3-Q_1$`,
        explain: m`$1{,}850-1{,}150=700$ אלף ₪`,
      },
    },
    {
      id: 'stddev',
      emoji: '📊',
      title: 'סטיית תקן',
      blocks: [
        {
          type: 'steps',
          title: m`הוצאות חודשיות על אוכל, באלפי ₪: $3,\ 4,\ 5,\ 6,\ 7$`,
          steps: [
            { math: m`\bar{x}=${c(SKY, '5')}`, note: '' },
            { math: m`\sigma=\sqrt{\frac{4+1+0+1+4}{5}}=\sqrt2\approx${c(GREEN, '1.41')}`, note: '' },
          ],
        },
        {
          type: 'card',
          tone: 'key',
          title: 'המחירים עלו ב-5%',
          md: m`כל ההוצאות גדלו פי $1.05$ — גם הממוצע וגם סטיית התקן: $\bar{x}=5.25$, $\sigma\approx1.48$`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'σ =',
        prompt: m`סטיית התקן של מחירי מוצר בחנויות שונות היא $40$ ₪. כל החנויות העלו את המחיר ב-$15$ ₪. מה סטיית התקן עכשיו?`,
        answer: 40,
        hint: 'תוספת קבועה לכולם.',
        explain: 'המרחקים מהממוצע לא השתנו — סטיית התקן נשארה 40 ₪.',
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: איזו הצעה?',
      blocks: [
        {
          type: 'text',
          md: m`לקוח מקבל שתי הצעות לחיסכון של $50{,}000$ ₪ לשלוש שנים. הצעה א': $3\%$ בכל שנה. הצעה ב': $2\%$ בשנה הראשונה, $3\%$ בשנייה ו-$4\%$ בשלישית.`,
        },
        {
          type: 'steps',
          title: 'משווים',
          steps: [
            { math: m`50{,}000\cdot1.03^3\approx${c(GREEN, '54{,}636.35')}`, note: 'הצעה א׳.' },
            { math: m`50{,}000\cdot1.02\cdot1.03\cdot1.04\approx${c(RED, '54{,}631.20')}`, note: 'הצעה ב׳.' },
            { math: m`54{,}636.35>54{,}631.20`, note: 'הצעה א׳ קצת טובה יותר — אף שהממוצע של האחוזים זהה.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מחיר מוצר עלה ב-$10\%$ ואחר כך ירד ב-$10\%$. מה קרה למחיר בסך הכול?`,
        options: [m`ירד ב-$1\%$`, 'לא השתנה', m`עלה ב-$1\%$`, m`ירד ב-$10\%$`],
        answer: 0,
        hint: m`$1.1\cdot0.9$`,
        explain: m`$1.1\cdot0.9=0.99$ — ירידה של $1\%$`,
      },
    },
  ],
};
