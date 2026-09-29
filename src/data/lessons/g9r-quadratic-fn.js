import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g9r-quadratic-fn',
  topicId: 'g9r-quadratic-fn',
  grade: 9,
  emoji: '🌈',
  title: 'הפונקציה הריבועית',
  subtitle: 'פרבולה, קודקוד, ציר סימטריה, וייצוג סטנדרטי מול קודקודי',
  sections: [
    {
      id: 'shape',
      emoji: '🥣',
      title: 'פרבולה — קערה או כיפה',
      blocks: [
        {
          type: 'text',
          md: m`הגרף של $y=ax^2+bx+c$ הוא **פרבולה**. המקדם $a$ קובע את הכיוון:

- $a>0$ — פותחת **למעלה** 🥣 (יש לה **מינימום**)
- $a<0$ — פותחת **למטה** ⛰️ (יש לה **מקסימום**)`,
        },
        {
          type: 'parabola',
          mode: 'vertex',
          caption: m`שנו את $a$ — מה קורה כש-$a$ שלילי? כש-$a$ גדול?`,
          a: 1,
          p: 0,
          q: 0,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`לפרבולה $y=-2x^2+3$ יש:`,
        options: ['מינימום', 'מקסימום', 'גם וגם', 'אף אחד'],
        answer: 1,
        hint: m`מה הסימן של $a$?`,
        explain: m`$a=-2<0$ — פותחת למטה, ולכן יש לה מקסימום.`,
      },
    },
    {
      id: 'vertex-form',
      emoji: '📍',
      title: 'הייצוג הקודקודי',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: m`$y=a(x-p)^2+q$`,
          md: m`הקודקוד הוא **ישירות** $(p,q)$. שימו לב לסימן: $(x${c(VIOLET, '-3')})^2$ → $p=${c(VIOLET, '3')}$.`,
        },
        {
          type: 'parabola',
          mode: 'vertex',
          caption: m`הזיזו את $p$ ואת $q$ — הקודקוד (אדום) זז איתם:`,
          a: 1,
          p: 2,
          q: -3,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהו הקודקוד של $y=(x+4)^2-1$?`,
        options: [m`$(4,-1)$`, m`$(-4,-1)$`, m`$(4,1)$`, m`$(-4,1)$`],
        answer: 1,
        hint: m`$(x+4)=(x-(-4))$`,
        explain: m`$p=-4$, $q=-1$: הקודקוד $(-4,-1)$.`,
      },
    },
    {
      id: 'standard',
      emoji: '🏆',
      title: 'שלב הבוס: קודקוד מהייצוג הסטנדרטי',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'ציר הסימטריה',
          md: m`$$x=-\frac{b}{2a}$$
הקודקוד נמצא עליו. מציבים את ה-$x$ הזה בפונקציה כדי לקבל את ה-$y$.`,
        },
        {
          type: 'steps',
          title: m`הקודקוד של $y=x^2-6x+5$`,
          steps: [
            { math: m`x=-\frac{-6}{2\cdot1}=3`, note: 'ציר הסימטריה.' },
            { math: m`y=9-18+5=-4`, note: m`מציבים $x=3$.` },
            { math: m`${c(GREEN, '(3,-4)')}`, note: 'הקודקוד — מינימום ($a>0$).' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        prompt: m`מהו ה-$x$ של קודקוד הפרבולה $y=2x^2+8x-1$?`,
        answer: -2,
        hint: m`$-\frac{b}{2a}=-\frac{8}{4}$`,
        explain: m`$x=-\frac{8}{2\cdot2}=-2$`,
      },
    },
  ],
};
