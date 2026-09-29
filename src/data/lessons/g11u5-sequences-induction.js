import { m } from './tex.js';

export default {
  id: 'g11u5-sequences-induction',
  topicId: 'g11-u5-sequences-induction',
  grade: 11,
  units: 5,
  emoji: '🧭',
  title: 'תרגול מסכם — סדרות ואינדוקציה',
  subtitle: 'חשבונית, הנדסית, סכום אינסופי ואינדוקציה — ביחד',
  sections: [
    {
      id: 'arith',
      emoji: '🪜',
      title: 'חשבונית',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'תזכורת',
          md: m`$a_n=a_1+(n-1)d$ · $S_n=\frac{n(a_1+a_n)}{2}$`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'd =',
        prompt: m`בסדרה חשבונית $a_3=11$ ו-$a_8=26$. מה ההפרש $d$?`,
        answer: 3,
        hint: m`בין $a_3$ ל-$a_8$ יש 5 צעדים.`,
        explain: m`$5d=26-11=15\Rightarrow d=3$`,
      },
    },
    {
      id: 'geom',
      emoji: '🌀',
      title: 'הנדסית',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'תזכורת',
          md: m`$a_n=a_1q^{n-1}$ · $S_n=\frac{a_1(q^n-1)}{q-1}$`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'q =',
        prompt: m`בסדרה הנדסית חיובית $a_2=6$ ו-$a_4=54$. מה $q$?`,
        answer: 3,
        hint: m`$a_4=a_2\cdot q^2$`,
        explain: m`$q^2=9$, ובסדרה חיובית $q=3$.`,
      },
    },
    {
      id: 'infinite',
      emoji: '♾️',
      title: 'סכום אינסופי',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'תזכורת',
          md: m`$S=\frac{a_1}{1-q}$ — רק כש-$|q|<1$`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'a₁ =',
        prompt: m`סכום סדרה הנדסית אינסופית הוא $20$, והמנה $q=0.75$. מה האיבר הראשון?`,
        answer: 5,
        hint: m`$20=\frac{a_1}{1-0.75}$`,
        explain: m`$a_1=20\cdot0.25=5$`,
      },
    },
    {
      id: 'compare',
      emoji: '💼',
      title: 'העלאה קבועה מול אחוזים',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'בחיים',
          md: 'העלאה קבועה בשקלים — סדרה **חשבונית**. העלאה באחוזים — סדרה **הנדסית**. בטווח הארוך ההנדסית מנצחת תמיד!',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`משכורת התחלתית $10{,}000$. הצעה א': תוספת $500$ בכל שנה. הצעה ב': תוספת $4\%$ בכל שנה. באיזו הצעה המשכורת בשנה ה-30 גבוהה יותר?`,
        options: ["הצעה א'", "הצעה ב'", 'הן שוות', 'אי אפשר לדעת'],
        answer: 1,
        hint: m`א': $10000+29\cdot500$. ב': $10000\cdot1.04^{29}$.`,
        explain: m`א': $24{,}500$. ב': $10000\cdot1.04^{29}\approx31{,}187$ — ההנדסית גבוהה יותר.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: אינדוקציה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'תזכורת',
          md: m`בסיס ($n=1$) + צעד ($k\to k+1$) ← נכון לכל $n$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מוכיחים ש-$6^n-1$ מתחלק ב-$5$. בשלב הצעד כותבים $6^{k+1}-1=6(6^k-1)+X$. מה $X$?`,
        options: [m`$1$`, m`$5$`, m`$6$`, m`$0$`],
        answer: 1,
        hint: m`פתחו: $6\cdot6^k-6+X=6^{k+1}-1$`,
        explain: m`$X=5$. שני המחוברים מתחלקים ב-5 (הראשון לפי ההנחה) — ולכן גם הסכום.`,
      },
    },
  ],
};
