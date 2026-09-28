import { m } from './tex.js';

export default {
  id: 'g9x-quadratic',
  topicId: 'g9x-quadratic',
  grade: 9,
  emoji: '🌈',
  title: 'פונקציה ריבועית — בסיס',
  subtitle: 'הפרבולה, הקודקוד, וחיתוכים עם הצירים',
  sections: [
    {
      id: 'parabola',
      emoji: '🥣',
      title: 'פרבולה',
      blocks: [
        {
          type: 'text',
          md: m`הגרף של $y=ax^2+bx+c$ הוא **פרבולה**:

- $a>0$ — קערה 🥣 (פותחת למעלה)
- $a<0$ — כיפה ⛰️ (פותחת למטה)`,
        },
        {
          type: 'parabola',
          mode: 'vertex',
          caption: m`שנו את $a$ וראו את הצורה משתנה:`,
          a: 1,
          p: 0,
          q: -2,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`לאן פותחת הפרבולה $y=-x^2+5$?`,
        options: ['למעלה', 'למטה', 'ימינה', 'שמאלה'],
        answer: 1,
        hint: m`$a=-1$`,
        explain: m`$a<0$ — פותחת למטה.`,
      },
    },
    {
      id: 'vertex',
      emoji: '📍',
      title: 'הקודקוד',
      blocks: [
        {
          type: 'text',
          md: '**הקודקוד** — הנקודה הכי נמוכה של הקערה (או הכי גבוהה של הכיפה). הפרבולה סימטרית סביבו.',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה נקודת המינימום של $y=x^2$?`,
        options: [m`$(0,0)$`, m`$(1,1)$`, m`$(0,1)$`, 'אין לה מינימום'],
        answer: 0,
        hint: 'איזה ערך הכי קטן יכול לקבל x²?',
        explain: m`$x^2\ge0$, והמינימום 0 מתקבל ב-$x=0$.`,
      },
    },
    {
      id: 'axes',
      emoji: '🏆',
      title: 'שלב הבוס: חיתוך עם הצירים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שני חיתוכים',
          md: m`**עם ציר $y$**: מציבים $x=0$ → מקבלים $y=c$.

**עם ציר $x$**: פותרים $ax^2+bx+c=0$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'y =',
        prompt: m`באיזה $y$ חותכת הפרבולה $y=x^2-3x+7$ את ציר $y$?`,
        answer: 7,
        hint: m`מציבים $x=0$.`,
        explain: m`$0-0+7=7$`,
      },
    },
  ],
};
