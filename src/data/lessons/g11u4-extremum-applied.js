import { c, GREEN, m } from './tex.js';

export default {
  id: 'g11u4-extremum-applied',
  topicId: 'g11-u4-extremum-applied',
  grade: 11,
  units: 4,
  emoji: '💰',
  title: 'בעיות קיצון: מספרים, כלכלה וגרפים',
  subtitle: 'אותו מתכון — משתנה, פונקציה, תחום, נגזרת, בדיקה — בשלושה סוגי בעיות',
  sections: [
    {
      id: 'numbers',
      emoji: '🔢',
      title: 'בעיות מספרים',
      blocks: [
        {
          type: 'steps',
          title: 'מכפלת שני מספרים חיוביים היא 36. מתי הסכום שלהם מינימלי?',
          steps: [
            { math: m`x,\ \frac{36}{x}\qquad (x>0)`, note: 'המספר השני — מתוך המכפלה.' },
            { math: m`S(x)=x+\frac{36}{x}`, note: 'הגודל שרוצים למזער.' },
            { math: m`S'(x)=1-\frac{36}{x^2}=0\ \Rightarrow\ x=6`, note: 'גוזרים ומשווים ל-0 (בתחום החיובי).' },
            { math: m`S(6)=${c(GREEN, '12')}`, note: 'לפני 6 הנגזרת שלילית, אחרי — חיובית: מינימום.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'סכום =',
        prompt: m`מכפלת שני מספרים חיוביים היא $49$. מהו הסכום הקטן ביותר האפשרי שלהם?`,
        answer: 14,
        hint: m`$S(x)=x+\frac{49}{x}$, והמינימום ב-$x=7$.`,
        explain: m`$S'(x)=1-\frac{49}{x^2}=0\Rightarrow x=7$, ו-$S(7)=7+7=14$.`,
      },
    },
    {
      id: 'economy',
      emoji: '💵',
      title: 'בעיות כלכליות',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'רווח = הכנסה − הוצאה',
          md: m`הכנסה = מחיר $\times$ כמות. כשהמחיר עולה — קונים פחות. הרווח ליחידה הוא המחיר פחות העלות ליחידה.`,
        },
        {
          type: 'steps',
          title: m`מחיר $p$ ש"ח, נמכרות $100-2p$ יחידות, עלות יחידה $10$ ש"ח`,
          steps: [
            { math: m`P(p)=(p-10)(100-2p)`, note: 'רווח ליחידה כפול מספר היחידות.' },
            { math: m`P'(p)=(100-2p)-2(p-10)=120-4p`, note: 'כלל המכפלה.' },
            { math: m`120-4p=0\ \Rightarrow\ ${c(GREEN, 'p=30')}`, note: 'רווח מקסימלי: 20 · 40 = 800 ש"ח.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'p =',
        prompt: m`במחיר $p$ ש"ח נמכרות $200-4p$ יחידות, ועלות כל יחידה $20$ ש"ח. באיזה מחיר הרווח מקסימלי?`,
        answer: 35,
        hint: m`$P(p)=(p-20)(200-4p)$`,
        explain: m`$P'(p)=(200-4p)-4(p-20)=280-8p=0\Rightarrow p=35$`,
      },
    },
    {
      id: 'graphs',
      emoji: '📈',
      title: 'נקודות על גרף',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'נקודה כללית על גרף',
          md: m`נקודה על הגרף של $f$ היא $(x,\,f(x))$ — משתנה אחד! כדי למזער מרחק, ממזערים את **ריבוע המרחק** (אותה נקודת מינימום, בלי שורש).`,
        },
        {
          type: 'steps',
          title: m`הנקודה על $y=\sqrt x$ הקרובה ביותר ל-$(4,0)$`,
          steps: [
            { math: m`d^2=(x-4)^2+(\sqrt x)^2=(x-4)^2+x`, note: 'ריבוע המרחק.' },
            { math: m`(d^2)'=2(x-4)+1=0\ \Rightarrow\ x=3.5`, note: 'גוזרים.' },
            { math: c(GREEN, '(3.5,\\ \\sqrt{3.5})'), note: 'הנקודה הקרובה ביותר.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'y =',
        prompt: m`מבין הנקודות על הפרבולה $y=x^2$, מהו שיעור ה-$y$ של הנקודות הקרובות ביותר לנקודה $(0,2)$?`,
        answer: 1.5,
        tolerance: 0.01,
        hint: m`$d^2=x^2+(x^2-2)^2$. נוח להציב $t=x^2$: $d^2=t+(t-2)^2$.`,
        explain: m`$d^2=t+(t-2)^2$, נגזרת $1+2(t-2)=0\Rightarrow t=1.5$, כלומר $y=x^2=1.5$.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: עלות ממוצעת',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'פונקציה רציונלית בכלכלה',
          md: m`עלות ממוצעת ליחידה היא העלות הכוללת חלקי מספר היחידות — ולכן מופיע בה $\frac{1}{x}$. מינימום של עלות ממוצעת = הכמות המשתלמת ביותר לייצור.`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'x =',
        prompt: m`העלות הממוצעת לייצור $x$ יחידות היא $A(x)=2x+\frac{50}{x}+7$ (אלפי ש"ח). כמה יחידות כדאי לייצר כדי שהעלות הממוצעת תהיה מינימלית?`,
        answer: 5,
        hint: m`$A'(x)=2-\frac{50}{x^2}$`,
        explain: m`$2-\frac{50}{x^2}=0\Rightarrow x^2=25\Rightarrow x=5$`,
      },
    },
  ],
};
