import { m } from './tex.js';

export default {
  id: 'g10u5-extremum-problems',
  topicId: 'g10-u5-extremum-problems',
  grade: 10,
  units: 5,
  emoji: '🎯',
  title: 'בעיות ערך קיצון',
  subtitle: 'גאומטריה, אנליטית, פיזיקה וכלכלה',
  sections: [
    {
      id: 'geometry',
      emoji: '📦',
      title: 'גאומטריה',
      blocks: [
        {
          type: 'boxopt',
          L: 12,
          caption: 'הקופסה הקלאסית: חותכים ריבועים בפינות:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'המתכון',
          md: m`משתנה ← פונקציה לפי האילוץ ← **תחום** ← $f'=0$ ← סוג הקיצון (וקצוות בתחום סגור).`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מלבן חסום מתחת לפרבולה $y=12-x^2$ (צלע אחת על ציר $x$, סימטרי). מה השטח המקסימלי?`,
        answer: 32,
        hint: m`$S=2x(12-x^2)$, $S'=24-6x^2$`,
        explain: m`$x=2$ ← $S=4\cdot8=32$`,
      },
    },
    {
      id: 'analytic',
      emoji: '📍',
      title: 'מרחק מינימלי',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'טריק',
          md: m`ממזערים את $d^2$ במקום $d$ — אותה נקודה, בלי שורש.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        tolerance: 0.001,
        prompt: m`איזו נקודה על $y=\sqrt x$ הכי קרובה ל-$(2,0)$? תנו את $x$.`,
        answer: 1.5,
        hint: m`$d^2=(x-2)^2+x$`,
        explain: m`$2(x-2)+1=0$ ← $x=1.5$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: כלכלה',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'מחיר מול כמות',
          md: m`כרטיס ב-$50$ ₪ — $400$ קונים. כל $1$ ₪ הנחה מוסיף $10$ קונים. הכנסה: $R(x)=(50-x)(400+10x)$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '₪',
        prompt: m`באיזה מחיר כרטיס ההכנסה מקסימלית?`,
        answer: 45,
        hint: m`$R'=-400+500-20x=0$ ← $x=5$`,
        explain: m`$50-5=45$ ₪.`,
      },
    },
  ],
};
