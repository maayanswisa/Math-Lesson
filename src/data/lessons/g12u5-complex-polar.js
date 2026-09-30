import { m } from './tex.js';

export default {
  id: 'g12u5-complex-polar',
  topicId: 'g12-u5-complex-polar',
  grade: 12,
  units: 5,
  emoji: '🧭',
  title: 'הצגה קוטבית, דה-מואבר ושורשים',
  subtitle: 'אורך וזווית במקום a ו-b',
  sections: [
    {
      id: 'quadratic',
      emoji: '🔢',
      title: 'משוואה ריבועית בלי פתרון ממשי',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'עכשיו יש פתרון!',
          md: m`$x^2+2x+5=0$: $\Delta=-16$ ← $x=\frac{-2\pm4i}{2}=-1\pm2i$ — שני פתרונות צמודים.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה הפתרונות של $x^2+9=0$?`,
        options: [m`$\pm3i$`, m`$\pm3$`, m`$\pm9i$`, 'אין פתרון'],
        answer: 0,
        hint: m`$x^2=-9$`,
        explain: m`$x=\pm3i$`,
      },
    },
    {
      id: 'polar',
      emoji: '🔄',
      title: 'הצגה קוטבית וכפל',
      blocks: [
        {
          type: 'complex',
          mode: 'polar',
          caption: 'שני מרוכבים ומכפלתם. מה קורה לאורך ולזווית?',
        },
        {
          type: 'card',
          tone: 'key',
          title: m`$r$ ו-$\theta$`,
          md: m`$z=r(\cos\theta+i\sin\theta)$

בכפל: $r_1r_2$, והזוויות מתחברות $\theta_1+\theta_2$.

**דה-מואבר:** $z^n=r^n(\cos n\theta+i\sin n\theta)$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`$z=2(\cos30°+i\sin30°)$. מה $z^3$?`,
        options: [m`$8i$`, m`$8$`, m`$6i$`, m`$-8$`],
        answer: 0,
        hint: m`$2^3(\cos90°+i\sin90°)$`,
        explain: m`$8(0+i)=8i$`,
      },
    },
    {
      id: 'roots',
      emoji: '🏆',
      title: 'שלב הבוס: שורשי יחידה',
      blocks: [
        {
          type: 'complex',
          mode: 'roots',
          caption: m`הפתרונות של $z^n=1$ — מצולע משוכלל על המעגל:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: m`$n$ שורשים`,
          md: m`ל-$z^n=w$ יש בדיוק $n$ פתרונות, מפוזרים שווה על מעגל — הפרש זוויות $\frac{360°}{n}$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '°',
        prompt: m`מה הזווית בין שני שורשים סמוכים של $z^8=1$?`,
        answer: 45,
        hint: m`$\frac{360}{8}$`,
        explain: m`$45°$`,
      },
    },
  ],
};
