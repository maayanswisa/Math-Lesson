import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g11u5-trig-advanced',
  topicId: 'g11-u5-trig-advanced',
  grade: 11,
  units: 5,
  emoji: '🌊',
  title: 'פונקציות טריגונומטריות: תכונות וטרנספורמציות',
  subtitle: 'משרעת, מחזור, הזזות — ומה קורה בהרכבה',
  sections: [
    {
      id: 'family',
      emoji: '🎛️',
      title: 'ארבעה כפתורים',
      blocks: [
        {
          type: 'sinewave',
          caption: m`$f(x)=A\sin(Bx+C)+D$ מול $\sin x$ (מקווקו). שחקו עם כל סליידר לחוד:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'מה כל אחד עושה',
          md: m`**$|A|$** — משרעת (גובה הגל) · **$B$** — מחזור $\frac{2\pi}{|B|}$ · **$C$** — הזזה אופקית · **$D$** — הזזה אנכית

טווח: $[D-|A|,\ D+|A|]$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהו המחזור של $f(x)=5\sin(4x)-1$?`,
        options: [m`$4\pi$`, m`$\frac{\pi}{2}$`, m`$2\pi$`, m`$\frac{\pi}{4}$`],
        answer: 1,
        hint: m`$\frac{2\pi}{|B|}$`,
        explain: m`$\frac{2\pi}{4}=\frac{\pi}{2}$`,
      },
    },
    {
      id: 'range',
      emoji: '↕️',
      title: 'טווח',
      blocks: [
        {
          type: 'steps',
          title: m`$f(x)=3\cos(2x)+1$`,
          steps: [
            { math: m`-1\le\cos(2x)\le1`, note: 'כל קוסינוס.' },
            { math: m`-3\le3\cos(2x)\le3`, note: m`כפול $A=3$.` },
            { math: m`${c(GREEN, '-2\\le f(x)\\le4')}`, note: m`ועוד $D=1$.` },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה הערך המקסימלי של $f(x)=2-5\sin x$?`,
        answer: 7,
        hint: m`מתי $-5\sin x$ הכי גדול?`,
        explain: m`כש-$\sin x=-1$: $2+5=7$.`,
      },
    },
    {
      id: 'symmetry',
      emoji: '🪞',
      title: 'מחזוריות וסימטריה',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'לחקור מעט — לדעת הכול',
          md: m`בזכות המחזוריות והסימטריה, מספיק לחקור את $\sin$ ב-$\left[0,\frac{\pi}{2}\right]$ — ואת השאר מקבלים משיקופים והזזות.

**רדיאנים ↔ מעלות** זה רק שינוי קנה מידה על ציר $x$: $180°=\pi$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`$\sin(\pi-x)$ שווה ל:`,
        options: [m`$\sin x$`, m`$-\sin x$`, m`$\cos x$`, m`$-\cos x$`],
        answer: 0,
        hint: m`זהות ההפרש: $\sin\pi\cos x-\cos\pi\sin x$`,
        explain: m`$0\cdot\cos x-(-1)\sin x=\sin x$ — סימטריה סביב $x=\frac{\pi}{2}$.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: הרכבה',
      blocks: [
        {
          type: 'card',
          tone: 'warn',
          title: 'לא תמיד מחזורית',
          md: m`$\sin(x^2)$ — **לא** מחזורית (הגלים נעשים צפופים יותר ויותר). אבל $(\sin x)^2$ — **כן** מחזורית, והמחזור שלה $\pi$ (לא $2\pi$!).`,
        },
        {
          type: 'steps',
          title: m`$\sqrt{\sin x}$ — איפה מוגדרת?`,
          steps: [
            { math: m`\sin x\ge0`, note: 'מה שבתוך השורש.' },
            { math: m`${c(VIOLET, '0\\le x\\le\\pi')}`, note: 'במחזור אחד.' },
            { math: m`${c(GREEN, '2\\pi k\\le x\\le\\pi+2\\pi k')}`, note: 'ובכל המחזורים.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהו המחזור של $f(x)=\sin^2x$?`,
        options: [m`$2\pi$`, m`$\pi$`, m`$\frac{\pi}{2}$`, 'אין לה מחזור'],
        answer: 1,
        hint: m`$\sin^2x=\frac{1-\cos2x}{2}$`,
        explain: m`$\cos2x$ מחזורית עם מחזור $\pi$ — וכך גם $\sin^2x$.`,
      },
    },
  ],
};
