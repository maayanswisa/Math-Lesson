import { m } from './tex.js';

export default {
  id: 'g10u4-precalculus',
  topicId: 'g10-u4-precalculus',
  grade: 10,
  units: 4,
  emoji: '🔭',
  title: 'קדם-אנליזה: משפחות וטרנספורמציות',
  subtitle: 'הזזות, שיקופים, מתיחות וזוגיות',
  sections: [
    {
      id: 'families',
      emoji: '👪',
      title: 'משפחות פונקציות',
      blocks: [
        {
          type: 'transformfn',
          caption: m`בחרו פונקציה בסיסית ושנו את $a$, $h$, $k$. המקווקו — המקור:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'הכללים',
          md: m`$f(x)+k$ — למעלה/למטה

$f(x-h)$ — ימינה ב-$h$ (שימו לב למינוס!)

$a\cdot f(x)$ — מתיחה; $a<0$ — שיקוף בציר $x$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`איך מתקבל $y=(x+3)^2-1$ מ-$y=x^2$?`,
        options: [m`$3$ שמאלה ו-$1$ למטה`, m`$3$ ימינה ו-$1$ למטה`, m`$3$ שמאלה ו-$1$ למעלה`, m`$1$ ימינה ו-$3$ למטה`],
        answer: 0,
        hint: m`$x+3=x-(-3)$`,
        explain: m`$h=-3$ (שמאלה), $k=-1$ (למטה).`,
      },
    },
    {
      id: 'domain',
      emoji: '🚧',
      title: 'תחום הגדרה',
      blocks: [
        {
          type: 'transformfn',
          families: ['sqrt', 'inv'],
          caption: 'שורש ושבר — יש ערכים אסורים:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'מה אסור',
          md: m`מתחת לשורש — לא שלילי: $\sqrt{x-2}$ ← $x\ge2$. במכנה — לא אפס: $\frac{1}{x+1}$ ← $x\ne-1$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה תחום ההגדרה של $f(x)=\sqrt{6-2x}$?`,
        options: [m`$x\le3$`, m`$x\ge3$`, m`$x\le6$`, m`כל $x$`],
        answer: 0,
        hint: m`$6-2x\ge0$`,
        explain: m`$x\le3$`,
      },
    },
    {
      id: 'parity',
      emoji: '🏆',
      title: 'שלב הבוס: זוגיות',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שני סוגי סימטריה',
          md: m`**זוגית:** $f(-x)=f(x)$ — סימטרית לציר $y$ (כמו $x^2$).

**אי-זוגית:** $f(-x)=-f(x)$ — סימטרית לראשית (כמו $x^3$).`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`$f(x)=x^3-4x$ היא:`,
        options: ['אי-זוגית', 'זוגית', 'לא זוגית ולא אי-זוגית', 'גם וגם'],
        answer: 0,
        hint: m`$f(-x)=-x^3+4x$`,
        explain: m`$f(-x)=-(x^3-4x)=-f(x)$`,
      },
    },
  ],
};
