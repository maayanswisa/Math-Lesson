import { c, GREEN, m, RED } from './tex.js';

export default {
  id: 'g11u4-areas',
  topicId: 'g11-u4-areas',
  grade: 11,
  units: 4,
  emoji: '🟩',
  title: 'חישובי שטחים מתקדמים',
  subtitle: 'מתחת לציר, שטח מפוצל, שטח עם משיק, פרמטר, וגרף הנגזרת',
  sections: [
    {
      id: 'below',
      emoji: '⬇️',
      title: 'שטח מתחת לציר x',
      blocks: [
        {
          type: 'integral',
          mode: 'signed',
          a: 0,
          b: 4,
          caption: 'החלק הירוק (מעל הציר) נספר בחיוב, והאדום (מתחת לציר) — בשלילה. שטח הוא תמיד חיובי!',
        },
        {
          type: 'steps',
          title: m`השטח בין $y=x^2-3x$ לציר $x$`,
          steps: [
            { math: m`x^2-3x=0\ \Rightarrow\ x=0,\ x=3`, note: 'נקודות החיתוך עם הציר.' },
            { math: m`\int_0^3(x^2-3x)\,dx=9-13.5=${c(RED, '-4.5')}`, note: 'הגרף מתחת לציר — האינטגרל שלילי.' },
            { math: m`S=|-4.5|=${c(GREEN, '4.5')}`, note: 'השטח — הערך המוחלט.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'S =',
        prompt: m`חשבו את השטח הכלוא בין $y=x^2-4$ לציר $x$. (אפשר שבר עשרוני)`,
        answer: 32 / 3,
        tolerance: 0.01,
        hint: m`חיתוך ב-$\pm2$; $\int_{-2}^2(x^2-4)\,dx$ שלילי.`,
        explain: m`$\int_{-2}^{2}(x^2-4)\,dx=\frac{16}{3}-16=-\frac{32}{3}$, השטח $\frac{32}{3}\approx10.67$.`,
      },
    },
    {
      id: 'split',
      emoji: '✂️',
      title: 'שטח מפוצל',
      blocks: [
        {
          type: 'card',
          tone: 'warn',
          title: 'אינטגרל אחד "מקזז"',
          md: m`כשהגרף חוצה את הציר בתוך התחום — **מפצלים** באפס ומחברים את השטחים. אינטגרל אחד על כל התחום מחסר את החלק שמתחת לציר.`,
        },
        {
          type: 'steps',
          title: m`$f(x)=x^2-1$ בתחום $[0,2]$`,
          steps: [
            { math: m`\int_0^1(x^2-1)\,dx=-\frac23\ \Rightarrow\ S_1=\frac23`, note: 'מתחת לציר.' },
            { math: m`\int_1^2(x^2-1)\,dx=\frac43\ \Rightarrow\ S_2=\frac43`, note: 'מעל הציר.' },
            { math: m`S=\frac23+\frac43=${c(GREEN, '2')}`, note: 'סכום השטחים. (אינטגרל אחד על [0, 2] היה נותן רק 2/3!)' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'S =',
        prompt: m`חשבו את סך השטחים הכלואים בין $y=2x-2$, ציר $x$, והישרים $x=0$ ו-$x=3$.`,
        answer: 5,
        hint: 'הישר חותך את הציר ב-x=1. שני משולשים.',
        explain: m`בין $0$ ל-$1$: משולש בשטח $1$. בין $1$ ל-$3$: משולש בשטח $\frac{2\cdot4}{2}=4$. סך הכל $5$.`,
      },
    },
    {
      id: 'tangent',
      emoji: '📐',
      title: 'שטח עם משיק',
      blocks: [
        {
          type: 'steps',
          title: m`$y=x^2$, המשיק ב-$x=1$, וציר $y$`,
          steps: [
            { math: m`y=2x-1`, note: 'משוואת המשיק: f(1)=1, f′(1)=2.' },
            { math: m`\int_0^1\left[x^2-(2x-1)\right]dx=\int_0^1(x-1)^2\,dx`, note: 'הפרבולה מעל המשיק.' },
            { math: m`=\left[\frac{(x-1)^3}{3}\right]_0^1=${c(GREEN, '\\frac13')}`, note: 'השטח.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'S =',
        prompt: m`חשבו את השטח הכלוא בין $y=x^2$, המשיק לה בנקודה שבה $x=2$, וציר $y$. (אפשר שבר עשרוני)`,
        answer: 8 / 3,
        tolerance: 0.01,
        hint: m`המשיק: $y=4x-4$. $\int_0^2(x-2)^2\,dx$`,
        explain: m`$\int_0^2(x^2-4x+4)\,dx=\left[\frac{(x-2)^3}{3}\right]_0^2=0-\left(-\frac83\right)=\frac83\approx2.67$`,
      },
    },
    {
      id: 'parameter',
      emoji: '🔑',
      title: 'שטח עם פרמטר',
      blocks: [
        {
          type: 'steps',
          title: m`השטח מתחת ל-$y=x$ בין $0$ ל-$k$ הוא $8$`,
          steps: [
            { math: m`\int_0^kx\,dx=\frac{k^2}{2}`, note: 'השטח בעזרת k.' },
            { math: m`\frac{k^2}{2}=8\ \Rightarrow\ ${c(GREEN, 'k=4')}`, note: 'k חיובי.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'k =',
        prompt: m`נתון $\int_0^k3x^2\,dx=27$ ($k>0$). מצאו את $k$.`,
        answer: 3,
        hint: m`$\int_0^k3x^2\,dx=k^3$`,
        explain: m`$k^3=27\Rightarrow k=3$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: שטח מגרף הנגזרת',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'השטח מתחת ל-f′ = השינוי ב-f',
          md: m`$$\int_a^b f'(x)\,dx=f(b)-f(a)$$

אם יודעים את $f(a)$ ואת השטח מתחת לגרף הנגזרת (עם סימן) — יודעים את $f(b)$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'f(3) =',
        prompt: m`נתון $f(1)=4$, והשטח בין גרף $f'$ לציר $x$ בתחום $1\le x\le3$ הוא $6$ (הגרף של $f'$ מעל הציר). חשבו את $f(3)$.`,
        answer: 10,
        hint: m`$f(3)-f(1)=\int_1^3f'(x)\,dx=6$`,
        explain: m`$f(3)=f(1)+6=10$`,
      },
    },
  ],
};
