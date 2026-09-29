import { m } from './tex.js';

export default {
  id: 'g12u4-sequences',
  topicId: 'g12-u4-sequences',
  grade: 12,
  units: 4,
  emoji: '🧭',
  title: 'תרגול מסכם — סדרות',
  subtitle: 'חשבונית והנדסית — לפעמים באותה בעיה',
  sections: [
    {
      id: 'which',
      emoji: '🔎',
      title: 'איזו סדרה?',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'תזכורת',
          md: m`**חשבונית** — מוסיפים $d$ · **הנדסית** — כופלים ב-$q$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`הסדרה $2,\ 6,\ 18,\ 54$ היא:`,
        options: ['חשבונית', 'הנדסית', 'גם וגם', 'אף אחת'],
        answer: 1,
        hint: 'מה עושים כדי לעבור מאיבר לאיבר?',
        explain: m`כופלים ב-$3$ — הנדסית.`,
      },
    },
    {
      id: 'arith',
      emoji: '🪜',
      title: 'חשבונית',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'תזכורת',
          md: m`$a_n=a_1+(n-1)d$

$S_n=\frac n2(2a_1+(n-1)d)$`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'n =',
        prompt: m`כמה איברים יש בסדרה החשבונית $7,\ 11,\ 15,\ \dots,\ 83$?`,
        answer: 20,
        hint: m`$83=7+(n-1)\cdot4$`,
        explain: m`$(n-1)\cdot4=76\Rightarrow n=20$`,
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
          md: m`$a_n=a_1q^{n-1}$

$S=\frac{a_1}{1-q}$ כש-$-1<q<1$`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'q =',
        prompt: m`סכום סדרה הנדסית אינסופית הוא $12$, והאיבר הראשון $8$. מה $q$?`,
        answer: 1 / 3,
        tolerance: 0.01,
        hint: m`$12=\frac{8}{1-q}$`,
        explain: m`$1-q=\frac23\Rightarrow q=\frac13$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: שתיהן ביחד',
      blocks: [
        {
          type: 'steps',
          title: 'שלושה מספרים הם סדרה חשבונית עם הפרש 3. אם מוסיפים 1 לראשון, הם סדרה הנדסית. מה הם?',
          steps: [
            { math: m`x,\ x+3,\ x+6`, note: 'חשבונית.' },
            { math: m`x+1,\ x+3,\ x+6`, note: 'אחרי התוספת — הנדסית.' },
            { math: m`(x+3)^2=(x+1)(x+6)`, note: 'בהנדסית: ריבוע האמצעי = מכפלת השכנים.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'x =',
        prompt: m`פתרו את המשוואה $(x+3)^2=(x+1)(x+6)$.`,
        answer: 3,
        hint: m`$x^2+6x+9=x^2+7x+6$`,
        explain: m`$x=3$: החשבונית $3,6,9$ וההנדסית $4,6,9$ (מנה $1.5$) ✓`,
      },
    },
  ],
};
