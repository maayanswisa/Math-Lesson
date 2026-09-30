import { m } from './tex.js';

export default {
  id: 'g11u3-science-stddev',
  topicId: 'g11-u3-science-stddev',
  grade: 11,
  units: 3,
  emoji: '↔️',
  title: 'סטיית תקן',
  subtitle: 'כמה הנתונים מפוזרים סביב הממוצע',
  sections: [
    {
      id: 'meaning',
      emoji: '🎯',
      title: 'אותו ממוצע, פיזור שונה',
      blocks: [
        {
          type: 'spread',
          mode: 'sigma',
          values: [4, 6, 7, 8, 10],
          caption: m`מתחו את הנתונים סביב הממוצע. הממוצע לא זז — אבל $\sigma$ משתנה:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'המשמעות',
          md: m`סטיית התקן $\sigma$ — בערך "המרחק הטיפוסי" של נתון מהממוצע. באותן יחידות כמו הנתונים. $\sigma=0$ ← כל הערכים שווים.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`בשתי כיתות הממוצע $80$. בכיתה א $\sigma=3$, ובכיתה ב $\sigma=12$. מה נכון?`,
        options: ['בכיתה ב הציונים מפוזרים יותר', 'בכיתה א הציונים גבוהים יותר', 'בכיתה ב הציונים גבוהים יותר', 'אין הבדל'],
        answer: 0,
        hint: 'סטיית תקן מודדת פיזור, לא גובה.',
        explain: m`אותו ממוצע — אבל בכיתה ב הציונים רחוקים יותר מ-$80$.`,
      },
    },
    {
      id: 'compute',
      emoji: '🧮',
      title: 'חישוב',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'הנוסחה',
          md: m`$$\sigma=\sqrt{\frac{\sum(x-\bar x)^2}{n}}$$
`,
        },
        {
          type: 'steps',
          title: m`$\sigma$ של $2, 4, 9$`,
          steps: [
            { math: m`\bar x=\frac{15}{3}=5`, note: 'ממוצע.' },
            { math: m`(-3)^2+(-1)^2+4^2=26`, note: 'סכום ריבועי הסטיות.' },
            { math: m`\sigma=\sqrt{\frac{26}{3}}\approx2.94`, note: m`מחלקים ב-$n$ ומוציאים שורש.` },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה סטיית התקן של $5, 5, 11, 11$?`,
        answer: 3,
        hint: m`$\bar x=8$, כל סטייה $\pm3$.`,
        explain: m`$\sqrt{\frac{4\cdot9}{4}}=3$`,
      },
    },
    {
      id: 'change',
      emoji: '🏆',
      title: 'שלב הבוס: מוסיפים נתון',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: m`נתון בממוצע מקטין את $\sigma$`,
          md: m`נתון השווה לממוצע מוסיף סטייה $0$ — אבל מגדיל את $n$. לכן $\sigma$ **קטנה**. נתון רחוק מהממוצע — $\sigma$ גדלה.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`לנתונים עם ממוצע $50$ ו-$\sigma=6$ מוסיפים את הערך $50$. מה קורה ל-$\sigma$?`,
        options: ['קטנה', 'גדלה', 'לא משתנה', 'הופכת ל-0'],
        answer: 0,
        hint: 'נסו בהמחשה למעלה.',
        explain: 'אותו סכום סטיות, יותר נתונים — פחות פיזור.',
      },
    },
  ],
};
