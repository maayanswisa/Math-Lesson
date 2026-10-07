import { c, GREEN, m, RED, VIOLET } from './tex.js';

export default {
  id: 'g11u4-rational-transform',
  topicId: 'g11-u4-rational-transform',
  grade: 11,
  units: 4,
  emoji: '🔀',
  title: 'פונקציות רציונליות: טרנספורמציות ואי-שוויונות',
  subtitle: 'אחד חלקי פונקציה קווית או ריבועית, הזזת אסימפטוטות, ואי-שוויון עם שבר',
  sections: [
    {
      id: 'linear',
      emoji: '📏',
      title: 'אחד חלקי פונקציה קווית',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: '1 חלקי mx + b',
          md: m`ל-$f(x)=\frac{1}{mx+b}$ יש **אסימפטוטה מאונכת אחת** — באפס של המכנה, $x=-\frac bm$ — ו**אסימפטוטה אופקית** $y=0$.

הסימן של $f$ זהה לסימן של $mx+b$: מצד אחד של האסימפטוטה חיובית, ומהצד השני שלילית.`,
        },
        {
          type: 'steps',
          title: m`$f(x)=\frac{1}{2x-4}$`,
          steps: [
            { math: m`2x-4=0\ \Rightarrow\ ${c(RED, 'x=2')}`, note: 'אסימפטוטה מאונכת.' },
            { math: m`${c(VIOLET, 'y=0')}`, note: 'כש-x גדל מאוד, המכנה ענק והשבר מתקרב ל-0.' },
            { math: m`x>2:\ f>0\qquad x<2:\ f<0`, note: 'הסימן כמו של המכנה.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'x =',
        prompt: m`איפה האסימפטוטה המאונכת של $f(x)=\frac{1}{3x+6}$?`,
        answer: -2,
        hint: 'מאפסים את המכנה.',
        explain: m`$3x+6=0\Rightarrow x=-2$`,
      },
    },
    {
      id: 'quadratic',
      emoji: '⛰️',
      title: 'אחד חלקי פונקציה ריבועית',
      blocks: [
        {
          type: 'reciprocal',
          a: 1,
          p: 0,
          q: -4,
          caption: m`הגרף המקווקו הוא $g$, והמלא — $\frac1g$. שנו את $q$: מתי יש $2$ אסימפטוטות מאונכות, מתי $1$ ומתי אף אחת?`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'כמה אסימפטוטות?',
          md: m`מספר האסימפטוטות המאונכות של $\frac{1}{ax^2+bx+c}$ = **מספר השורשים** של $ax^2+bx+c$ ($0$, $1$ או $2$).

**הקודקוד** של הפרבולה (כשהיא לא מתאפסת בו) הופך ל**נקודת קיצון** של $\frac1g$ — מינימום של $g$ הופך למקסימום של $\frac1g$, ולהפך.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`כמה אסימפטוטות מאונכות יש ל-$f(x)=\frac{1}{x^2+4x+4}$?`,
        options: ['0', '1', '2', '3'],
        answer: 1,
        hint: m`$x^2+4x+4=(x+2)^2$`,
        explain: m`למכנה שורש אחד ($x=-2$), ולכן אסימפטוטה מאונכת אחת.`,
      },
    },
    {
      id: 'transform',
      emoji: '↔️',
      title: 'טרנספורמציות ואסימפטוטות',
      blocks: [
        {
          type: 'transformfn',
          families: ['inv'],
          fn: 'inv',
          h: 2,
          k: 1,
          caption: m`הזיזו את $\frac1x$ ימינה ולמעלה. לאן זזות האסימפטוטות?`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'הזזה מזיזה את האסימפטוטות',
          md: m`$g(x)=\frac{1}{x-p}+q$: אסימפטוטה מאונכת $x=p$, ואסימפטוטה אופקית $y=q$.

מתיחה ($a\cdot\frac{1}{x}$) לא מזיזה אסימפטוטות. שיקוף ביחס לציר $x$ הופך $y=q$ ל-$y=-q$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'y =',
        prompt: m`מהי האסימפטוטה האופקית של $g(x)=\frac{1}{x+3}-5$?`,
        answer: -5,
        hint: 'השבר שואף ל-0 באינסוף. מה נשאר?',
        explain: m`$\frac{1}{x+3}\to0$, ולכן $g\to-5$: האסימפטוטה $y=-5$.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: אי-שוויון עם שבר',
      blocks: [
        {
          type: 'card',
          tone: 'warn',
          title: 'לא כופלים במכנה!',
          md: 'הסימן של המכנה לא ידוע — כפל בו עלול להפוך את כיוון האי-שוויון. במקום זה בונים **טבלת סימנים**: אפסי המונה ואפסי המכנה מחלקים את ציר המספרים לקטעים, ובודקים את הסימן בכל קטע. אפסי המכנה **אף פעם** לא בפתרון.',
        },
        {
          type: 'steps',
          title: m`$\frac{x-1}{x+2}>0$`,
          steps: [
            { math: m`x=1,\qquad x=-2`, note: 'אפס המונה: 1. אפס המכנה: 2−.' },
            { math: m`x<-2:\ \frac{-}{-}>0\qquad -2<x<1:\ \frac{-}{+}<0\qquad x>1:\ \frac{+}{+}>0`, note: 'בודקים סימן בכל קטע.' },
            { math: c(GREEN, 'x<-2\\ \\lor\\ x>1'), note: 'הפתרון: הקטעים שבהם השבר חיובי (∨ = "או").' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה הפתרון של $\frac{x-3}{x+1}\le0$?`,
        options: [m`$-1<x\le3$`, m`$-1\le x\le3$`, m`$x<-1$ או $x\ge3$`, m`$x\le3$`],
        answer: 0,
        hint: m`$x=-1$ מאפס את המכנה — הוא לא יכול להיות בפתרון. $x=3$ מאפס את המונה — ושם השבר שווה 0.`,
        explain: m`בין $-1$ ל-$3$ השבר שלילי, ב-$x=3$ הוא $0$, ו-$x=-1$ לא בתחום: $-1<x\le3$.`,
      },
    },
  ],
};
