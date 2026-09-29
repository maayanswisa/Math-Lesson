import { m } from './tex.js';

export default {
  id: 'g10u4-extremum-problems',
  topicId: 'g10-u4-extremum-problems',
  grade: 10,
  units: 4,
  emoji: '📦',
  title: 'בעיות ערך קיצון',
  subtitle: 'הכי גדול, הכי קטן, הכי משתלם',
  sections: [
    {
      id: 'steps',
      emoji: '🪜',
      title: 'חמשת השלבים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'המתכון',
          md: m`משתנה ← פונקציה (בעזרת האילוץ) ← תחום ← $f'(x)=0$ ← בדיקת סוג הקיצון (וקצוות).`,
        },
        {
          type: 'rectopt',
          P: 40,
          caption: 'דוגמה: מלבן עם היקף 40 — מתי השטח מקסימלי?',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`סכום שני מספרים חיוביים הוא $20$. מה המכפלה הגדולה ביותר?`,
        answer: 100,
        hint: m`$f(x)=x(20-x)$, $f'=20-2x$`,
        explain: m`$x=10$ ← $100$`,
      },
    },
    {
      id: 'box',
      emoji: '📦',
      title: 'קופסה מקרטון',
      blocks: [
        {
          type: 'boxopt',
          L: 12,
          caption: 'גוזרים ריבועים בפינות ומקפלים. מה גודל החיתוך האופטימלי?',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מקרטון $12\times12$ גוזרים ריבועים בצלע $x$. באיזה $x$ הנפח מקסימלי?`,
        answer: 2,
        hint: m`$V=x(12-2x)^2$`,
        explain: m`$V'=(12-2x)(12-6x)=0$ ← $x=2$`,
      },
    },
    {
      id: 'economy',
      emoji: '🏆',
      title: 'שלב הבוס: רווח מקסימלי',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'רווח = הכנסה פחות עלות',
          md: m`מוכרים $x$ יחידות. מחיר ליחידה $100-x$, עלות ליחידה $20$: רווח $R(x)=x(100-x)-20x$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`לפי $R(x)=80x-x^2$ — כמה יחידות למכור לרווח מקסימלי?`,
        answer: 40,
        hint: m`$R'=80-2x$`,
        explain: m`$x=40$, רווח $1{,}600$.`,
      },
    },
  ],
};
