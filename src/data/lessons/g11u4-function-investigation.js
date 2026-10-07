import { c, GREEN, m, RED, VIOLET } from './tex.js';

export default {
  id: 'g11u4-function-investigation',
  topicId: 'g11-u4-function-investigation',
  grade: 11,
  units: 4,
  emoji: '🔍',
  title: 'חקירת פונקציה מלאה',
  subtitle: 'רשימת בדיקה קבועה — ואיך קוראים מידע משרטוט נתון',
  sections: [
    {
      id: 'plan',
      emoji: '📋',
      title: 'רשימת החקירה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'חמישה שלבים',
          md: m`1. **תחום הגדרה**
2. **חיתוך עם הצירים**: $x=0$ (ציר $y$), $f(x)=0$ (ציר $x$)
3. **אסימפטוטות**: מאונכות (אפסי המכנה) ואופקיות (התנהגות באינסוף)
4. **נגזרת**: נקודות קיצון ותחומי עלייה וירידה
5. **סקיצה**`,
        },
        {
          type: 'steps',
          title: m`$f(x)=x+\frac4x$`,
          steps: [
            { math: m`x\ne0`, note: 'תחום. אין חיתוך עם ציר y.' },
            { math: m`x+\frac4x=0\Rightarrow x^2=-4`, note: 'אין פתרון — אין חיתוך עם ציר x.' },
            { math: m`${c(RED, 'x=0')}`, note: 'אסימפטוטה מאונכת.' },
            { math: m`f'(x)=1-\frac{4}{x^2}=0\Rightarrow x=\pm2`, note: 'נקודות חשודות.' },
            { math: m`${c(VIOLET, '(-2,-4)\\ \\max')}\qquad ${c(GREEN, '(2,4)\\ \\min')}`, note: 'עולה ב-x<−2 וב-x>2; יורדת ב-−2<x<0 וב-0<x<2.' },
          ],
        },
        {
          type: 'tangent',
          fn: 'rational',
          x: 3,
          caption: 'השוו את הסקיצה לגרף: איפה המשיק אופקי, ואיפה האסימפטוטה?',
        },
      ],
      challenge: {
        type: 'number',
        label: 'y =',
        prompt: m`מהו ערך המינימום של $f(x)=x+\frac9x$ בתחום $x>0$?`,
        answer: 6,
        hint: m`$f'(x)=1-\frac{9}{x^2}=0\Rightarrow x=3$`,
        explain: m`$f(3)=3+3=6$`,
      },
    },
    {
      id: 'asymptotes',
      emoji: '📏',
      title: 'אסימפטוטות והתנהגות',
      blocks: [
        {
          type: 'tangent',
          fn: 'quotient',
          x: 3,
          caption: m`$f(x)=\frac{x^2}{x-1}$: אסימפטוטה מאונכת $x=1$, אבל **אין** אסימפטוטה אופקית — מעלת המונה גדולה ממעלת המכנה, והפונקציה גדלה בלי גבול.`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'אסימפטוטה אופקית — לפי המעלות',
          md: m`- מעלת המונה **קטנה** ממעלת המכנה ← $y=0$
- מעלות **שוות** ← $y=$ יחס המקדמים המובילים
- מעלת המונה **גדולה** ← אין אסימפטוטה אופקית`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהן האסימפטוטות של $f(x)=\frac{2x+1}{x-3}$?`,
        options: [m`$x=3,\ y=2$`, m`$x=-3,\ y=2$`, m`$x=3,\ y=0$`, m`$x=3,\ y=\frac13$`],
        answer: 0,
        hint: 'מכנה מתאפס ב-3; המעלות שוות.',
        explain: m`מאונכת $x=3$; אופקית — יחס המקדמים $\frac21=2$.`,
      },
    },
    {
      id: 'root',
      emoji: '√',
      title: 'חקירת פונקציית שורש',
      blocks: [
        {
          type: 'steps',
          title: m`$f(x)=x\sqrt{4-x}$`,
          steps: [
            { math: m`x\le4`, note: 'תחום.' },
            { math: m`(0,0),\ (4,0)`, note: 'חיתוך עם ציר x.' },
            { math: m`f'(x)=\frac{8-3x}{2\sqrt{4-x}}=0\Rightarrow x=\frac83`, note: 'קיצון פנימי: מקסימום.' },
            { math: m`(4,0)`, note: 'בקצה התחום: מינימום קצה.' },
          ],
        },
        {
          type: 'tangent',
          fn: 'root',
          x: 1,
          caption: 'הזיזו את הנקודה עד הקצה x=4 — מה קורה לשיפוע?',
        },
      ],
      challenge: {
        type: 'number',
        label: 'נקודות',
        prompt: m`בכמה נקודות חותך הגרף של $f(x)=x\sqrt{4-x}$ את ציר $x$?`,
        answer: 2,
        hint: m`$x\sqrt{4-x}=0$ — מתי מכפלה מתאפסת?`,
        explain: m`$x=0$ או $\sqrt{4-x}=0\Rightarrow x=4$. שתי נקודות.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: שרטוט נתון',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'מה קוראים מהשרטוט?',
          md: m`- **אסימפטוטות** — קווים שהגרף מתקרב אליהם
- **נקודות קיצון** — "פסגות" ו"עמקים"
- **סימן הנגזרת** — איפה הגרף עולה ואיפה יורד
- **נקודות חיתוך** — עם הצירים

ואז משלבים עם האלגברה: מזהים איזו פונקציה מתאימה, או מוצאים פרמטר.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`בשרטוט: אסימפטוטה מאונכת $x=1$, ונקודת מקסימום בראשית $(0,0)$. איזו פונקציה מתאימה?`,
        options: [m`$\frac{x^2}{x-1}$`, m`$\frac{x^2}{x+1}$`, m`$\frac{x}{x-1}$`, m`$\frac{x-1}{x^2}$`],
        answer: 0,
        hint: m`בדקו: איפה המכנה מתאפס? ואיפה $f'=0$?`,
        explain: m`$\frac{x^2}{x-1}$: אסימפטוטה $x=1$, ו-$f'=\frac{x^2-2x}{(x-1)^2}$ מתאפסת ב-$0$ — שם מקסימום $(0,0)$. ל-$\frac{x}{x-1}$ אין קיצון בכלל.`,
      },
    },
  ],
};
