import { c, GREEN, m, RED } from './tex.js';

export default {
  id: 'g9r-inequalities',
  topicId: 'g9r-inequalities',
  grade: 9,
  emoji: '↔️',
  title: 'אי-שוויונות',
  subtitle: 'קוויים וריבועיים — והפרבולה שעוזרת לראות את התשובה',
  sections: [
    {
      id: 'linear',
      emoji: '📏',
      title: 'אי-שוויון קווי',
      blocks: [
        {
          type: 'text',
          md: m`פותרים כמו משוואה — והתשובה היא **תחום**. כלל אחד חשוב:`,
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'כפל או חילוק בשלילי',
          md: m`**הופכים את כיוון הסימן**: $-3x<9\ \Rightarrow\ x${c(RED, '>')}-3$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה הפתרון של $4-2x\le10$?`,
        options: [m`$x\le-3$`, m`$x\ge-3$`, m`$x\ge3$`, m`$x\le3$`],
        answer: 1,
        hint: m`$-2x\le6$. מחלקים ב-$-2$...`,
        explain: m`$-2x\le6\Rightarrow x\ge-3$ (הכיוון התהפך).`,
      },
    },
    {
      id: 'quadratic',
      emoji: '🌈',
      title: 'אי-שוויון ריבועי',
      blocks: [
        {
          type: 'text',
          md: m`$x^2-4>0$ — איפה הביטוי **חיובי**? מסתכלים על הפרבולה $y=x^2-4$:`,
        },
        {
          type: 'parabola',
          mode: 'factored',
          signs: true,
          caption: m`ירוק — הפרבולה מעל ציר $x$. אדום — מתחת. שנו את השורשים ואת $a$:`,
          a: 1,
          m: -2,
          t: 2,
        },
        {
          type: 'steps',
          title: m`פותרים: $x^2-4>0$`,
          steps: [
            { math: m`x^2-4=0\ \Rightarrow\ x=\pm2`, note: 'צעד 1: השורשים.' },
            { math: m`a=1>0`, note: 'צעד 2: פותחת למעלה — שלילית **בין** השורשים, חיובית **בחוץ**.' },
            { math: m`${c(GREEN, 'x<-2')}\qquad${c(GREEN, 'x>2')}`, note: 'צעד 3: רוצים חיובי — מחוץ לשורשים: או זה, או זה.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה הפתרון של $x^2-9<0$?`,
        options: [m`$-3<x<3$`, m`$x<-3$ או $x>3$`, m`$x<3$`, 'אין פתרון'],
        answer: 0,
        hint: 'שורשים ±3, פותחת למעלה. איפה היא שלילית?',
        explain: m`פרבולה שפותחת למעלה שלילית **בין** השורשים: $-3<x<3$.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: פרבולה הפוכה',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'כש-a שלילי — הכול מתהפך',
          md: m`פרבולה שפותחת **למטה** חיובית **בין** השורשים, ושלילית בחוץ. תמיד כדאי לשרטט סקיצה קטנה!`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה הפתרון של $-(x-1)(x-5)>0$?`,
        options: [m`$1<x<5$`, m`$x<1$ או $x>5$`, m`$x>5$`, m`$x<1$`],
        answer: 0,
        hint: 'שורשים 1 ו-5, והפרבולה פותחת למטה.',
        explain: m`פותחת למטה → חיובית בין השורשים: $1<x<5$.`,
      },
    },
  ],
};
