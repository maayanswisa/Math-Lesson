import { c, GREEN, m, RED } from './tex.js';

export default {
  id: 'g11u4-integral-functions',
  topicId: 'g11-u4-integral-functions',
  grade: 11,
  units: 4,
  emoji: '∫',
  title: 'אינטגרל של פונקציה מורכבת ורציונלית',
  subtitle: 'חזקה של ביטוי קווי, אחד חלקי x בחזקה, ומציאת פונקציה לפי נגזרתה',
  sections: [
    {
      id: 'composite',
      emoji: '🧩',
      title: 'חזקה של ביטוי קווי',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'לא לשכוח לחלק ב-a',
          md: m`$$\int(ax+b)^n\,dx=\frac{(ax+b)^{n+1}}{${c(RED, 'a')}(n+1)}+C$$

בדיקה בגזירה: כלל השרשרת מכפיל ב-$a$ — ולכן באינטגרל מחלקים בו.`,
        },
        {
          type: 'steps',
          title: m`$\int(2x+1)^3\,dx$`,
          steps: [
            { math: m`\frac{(2x+1)^4}{4}`, note: 'מעלים את החזקה ב-1 ומחלקים בחזקה החדשה.' },
            { math: m`${c(GREEN, '\\frac{(2x+1)^4}{8}+C')}`, note: 'מחלקים גם במקדם של x (2).' },
            { math: m`\left(\frac{(2x+1)^4}{8}\right)'=\frac{4(2x+1)^3\cdot2}{8}=(2x+1)^3\ \checkmark`, note: 'בדיקה בגזירה.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהו $\int(3x-2)^4\,dx$?`,
        options: [m`$\frac{(3x-2)^5}{15}+C$`, m`$\frac{(3x-2)^5}{5}+C$`, m`$\frac{3(3x-2)^5}{5}+C$`, m`$12(3x-2)^3+C$`],
        answer: 0,
        hint: m`מחלקים ב-$5$ (החזקה החדשה) וב-$3$ (המקדם של $x$).`,
        explain: m`$\frac{(3x-2)^5}{3\cdot5}=\frac{(3x-2)^5}{15}+C$`,
      },
    },
    {
      id: 'rational',
      emoji: '➗',
      title: 'אחד חלקי x בחזקה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'כותבים כחזקה שלילית',
          md: m`$\frac{1}{x^2}=x^{-2}$, ואז כלל החזקה הרגיל:

$$\int x^{-2}\,dx=\frac{x^{-1}}{-1}+C=-\frac1x+C$$

ובאותו אופן $\int\frac{1}{(ax+b)^2}\,dx=-\frac{1}{a(ax+b)}+C$.`,
        },
        {
          type: 'steps',
          title: m`$\int\frac{4}{x^3}\,dx$`,
          steps: [
            { math: m`\int4x^{-3}\,dx=\frac{4x^{-2}}{-2}`, note: 'חזקה שלילית.' },
            { math: c(GREEN, '-\\frac{2}{x^2}+C'), note: 'חוזרים לשבר.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהו $\int\frac{1}{(x+1)^2}\,dx$?`,
        options: [m`$-\frac{1}{x+1}+C$`, m`$\frac{1}{x+1}+C$`, m`$-\frac{2}{(x+1)^3}+C$`, m`$\frac{(x+1)^3}{3}+C$`],
        answer: 0,
        hint: m`$(x+1)^{-2}$ — מעלים חזקה ל-$-1$ ומחלקים ב-$-1$.`,
        explain: m`$\frac{(x+1)^{-1}}{-1}=-\frac{1}{x+1}+C$`,
      },
    },
    {
      id: 'definite',
      emoji: '📏',
      title: 'אינטגרל מסוים',
      blocks: [
        {
          type: 'steps',
          title: m`$\int_1^2\frac{1}{x^2}\,dx$`,
          steps: [
            { math: m`\left[-\frac1x\right]_1^2`, note: 'פונקציה קדומה.' },
            { math: m`-\frac12-\left(-1\right)=${c(GREEN, '\\frac12')}`, note: 'עליון פחות תחתון.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '=',
        prompt: m`חשבו: $\int_0^1(2x+1)^2\,dx$ (אפשר שבר עשרוני)`,
        answer: 13 / 3,
        tolerance: 0.01,
        hint: m`קדומה: $\frac{(2x+1)^3}{6}$`,
        explain: m`$\frac{27}{6}-\frac{1}{6}=\frac{26}{6}=\frac{13}{3}\approx4.33$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: פונקציה לפי נגזרת ונקודה',
      blocks: [
        {
          type: 'steps',
          title: m`$f'(x)=\frac{6}{(2x-1)^2}$, והגרף עובר ב-$(1,2)$`,
          steps: [
            { math: m`f(x)=-\frac{6}{2(2x-1)}+C=-\frac{3}{2x-1}+C`, note: 'קדומה (מחלקים במקדם 2).' },
            { math: m`f(1)=-3+C=2\ \Rightarrow\ C=5`, note: 'מציבים את הנקודה.' },
            { math: c(GREEN, 'f(x)=-\\frac{3}{2x-1}+5'), note: 'הפונקציה.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'f(4) =',
        prompt: m`נתון $f'(x)=(x-1)^2$ ו-$f(1)=3$. חשבו את $f(4)$.`,
        answer: 12,
        hint: m`$f(x)=\frac{(x-1)^3}{3}+C$`,
        explain: m`$f(1)=C=3$, ולכן $f(4)=\frac{27}{3}+3=12$.`,
      },
    },
  ],
};
