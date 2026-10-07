import { c, GREEN, m, RED, VIOLET } from './tex.js';

export default {
  id: 'g11u4-rational-params',
  topicId: 'g11-u4-rational-params',
  grade: 11,
  units: 4,
  emoji: '🔑',
  title: 'חדו״א עם פרמטרים',
  subtitle: 'כל נתון הוא משוואה: נקודה, קיצון, שיפוע משיק ואסימפטוטה',
  sections: [
    {
      id: 'point',
      emoji: '📍',
      title: 'נקודה על הגרף',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'מנתון למשוואה',
          md: m`- הגרף עובר ב-$(x_0,y_0)$ ← $f(x_0)=y_0$
- קיצון ב-$x_0$ ← $f'(x_0)=0$
- שיפוע המשיק ב-$x_0$ הוא $m$ ← $f'(x_0)=m$
- אסימפטוטה מאונכת $x=x_0$ ← המכנה מתאפס ב-$x_0$`,
        },
        {
          type: 'steps',
          title: m`$f(x)=\frac{ax+1}{x-2}$ עובר בנקודה $(3,10)$`,
          steps: [
            { math: m`f(3)=\frac{3a+1}{3-2}=10`, note: 'מציבים את הנקודה.' },
            { math: m`3a+1=10\ \Rightarrow\ ${c(GREEN, 'a=3')}`, note: 'פותרים.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'a =',
        prompt: m`הגרף של $f(x)=\frac{a}{x+1}$ עובר בנקודה $(1,4)$. מצאו את $a$.`,
        answer: 8,
        hint: m`$f(1)=\frac a2=4$`,
        explain: m`$\frac{a}{2}=4\Rightarrow a=8$`,
      },
    },
    {
      id: 'extremum',
      emoji: '⛰️',
      title: 'קיצון נתון',
      blocks: [
        {
          type: 'tangent',
          fn: 'rational',
          x: 3,
          caption: m`כאן $a=4$: $f(x)=x+\frac4x$. איפה המשיק אופקי? זה המקום שבו $f'=0$.`,
        },
        {
          type: 'steps',
          title: m`ל-$f(x)=x+\frac ax$ יש קיצון ב-$x=3$`,
          steps: [
            { math: m`f'(x)=1-\frac{a}{x^2}`, note: 'גוזרים (a הוא מספר קבוע).' },
            { math: m`f'(3)=1-\frac a9=0`, note: 'קיצון: הנגזרת מתאפסת.' },
            { math: c(GREEN, 'a=9'), note: 'ואז בודקים: f′ מחליפה סימן ב-3 — אכן קיצון.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'a =',
        prompt: m`לפונקציה $f(x)=x+\frac ax$ יש נקודת קיצון ב-$x=2$. מצאו את $a$.`,
        answer: 4,
        hint: m`$f'(2)=1-\frac a4=0$`,
        explain: m`$1-\frac a4=0\Rightarrow a=4$`,
      },
    },
    {
      id: 'slope',
      emoji: '📐',
      title: 'שיפוע משיק נתון',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'משיק מקביל לישר',
          md: m`ישרים מקבילים — **אותו שיפוע**. משיק מקביל ל-$y=5-2x$ ← $f'(x_0)=-2$. משיק מקביל לציר $x$ ← $f'(x_0)=0$.`,
        },
        {
          type: 'steps',
          title: m`$f(x)=\frac ax$, שיפוע המשיק ב-$x=2$ הוא $-3$`,
          steps: [
            { math: m`f'(x)=-\frac{a}{x^2}`, note: 'גוזרים.' },
            { math: m`f'(2)=-\frac a4=-3`, note: 'משווים לשיפוע הנתון.' },
            { math: c(GREEN, 'a=12'), note: 'פותרים.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'a =',
        prompt: m`המשיק לגרף $f(x)=1+\frac ax$ בנקודה שבה $x=1$ מקביל לישר $y=5-2x$. מצאו את $a$.`,
        answer: 2,
        hint: m`$f'(x)=-\frac{a}{x^2}$, והשיפוע הנדרש $-2$.`,
        explain: m`$f'(1)=-a=-2\Rightarrow a=2$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: אסימפטוטות עם פרמטרים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שבר של שני ביטויים קוויים',
          md: m`$f(x)=\frac{ax+b}{cx+d}$: אסימפטוטה **מאונכת** כש-$cx+d=0$, ואסימפטוטה **אופקית** $y=\frac ac$ (היחס בין המקדמים של $x$).`,
        },
        {
          type: 'steps',
          title: m`$f(x)=\frac{ax+3}{2x-b}$: אסימפטוטות $x=4$ ו-$y=3$`,
          steps: [
            { math: m`2\cdot4-b=0\ \Rightarrow\ ${c(RED, 'b=8')}`, note: 'המכנה מתאפס ב-4.' },
            { math: m`\frac a2=3\ \Rightarrow\ ${c(VIOLET, 'a=6')}`, note: 'האסימפטוטה האופקית.' },
            { math: m`f(x)=\frac{6x+3}{2x-8}`, note: 'בודקים: המונה לא מתאפס ב-4 (27 ≠ 0) — אז זו באמת אסימפטוטה.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'a =',
        prompt: m`לפונקציה $f(x)=\frac{ax-1}{x+5}$ יש אסימפטוטה אופקית $y=2$. מצאו את $a$.`,
        answer: 2,
        hint: m`היחס בין המקדמים של $x$: $\frac a1$.`,
        explain: m`$\frac a1=2\Rightarrow a=2$`,
      },
    },
  ],
};
