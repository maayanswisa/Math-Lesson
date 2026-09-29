import { m } from './tex.js';

export default {
  id: 'g10u5-poly-investigation',
  topicId: 'g10-u5-poly-investigation',
  grade: 10,
  units: 5,
  emoji: '🕵️',
  title: 'חקירת פולינום ופונקציה קדומה',
  subtitle: 'חקירה מלאה, תחום סגור — וחזרה אחורה מהנגזרת',
  sections: [
    {
      id: 'investigate',
      emoji: '⛰️',
      title: 'חקירה מלאה',
      blocks: [
        {
          type: 'tangent',
          fn: 'cubic',
          concavity: true,
          caption: m`$f(x)=x^3-3x$ — קיצון, עלייה וירידה:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'הסדר',
          md: 'תחום ← זוגיות ← חיתוכים עם הצירים ← נגזרת וקיצון ← עלייה/ירידה ← סקיצה.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה ערך המקסימום המקומי של $f(x)=-x^3+3x^2$?`,
        answer: 4,
        hint: m`$f'=-3x^2+6x=0$ ← $x=0,2$`,
        explain: m`$f(2)=-8+12=4$`,
      },
    },
    {
      id: 'closed',
      emoji: '🔒',
      title: 'בתחום סגור',
      blocks: [
        {
          type: 'card',
          tone: 'warn',
          title: 'הקצוות משתתפים!',
          md: m`מוחלט ב-$[a,b]$: משווים את $f$ בנקודות הקיצון **ובשני הקצוות**.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה המינימום המוחלט של $f(x)=x^2-4x$ בתחום $[0,5]$?`,
        answer: -4,
        hint: m`$f(0)=0$, $f(2)=-4$, $f(5)=5$`,
        explain: m`$-4$ ב-$x=2$.`,
      },
    },
    {
      id: 'antiderivative',
      emoji: '🏆',
      title: 'שלב הבוס: פונקציה קדומה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'גזירה הפוכה',
          md: m`$F$ קדומה ל-$f$ אם $F'=f$. $\left(\frac{x^{n+1}}{n+1}\right)'=x^n$, ולכן קדומה ל-$x^n$ היא $\frac{x^{n+1}}{n+1}+C$.

נתונה נקודה ← מוצאים את $C$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$F'(x)=6x^2-2$ ו-$F(1)=5$. כמה זה $F(2)$?`,
        answer: 17,
        hint: m`$F=2x^3-2x+C$, $C=5$`,
        explain: m`$16-4+5=17$`,
      },
    },
  ],
};
