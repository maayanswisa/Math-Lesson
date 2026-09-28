import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g9r-quadratic-factored-form',
  topicId: 'g9r-quadratic-factored-form',
  grade: 9,
  emoji: '✂️',
  title: 'פונקציה ריבועית — צורת המכפלה',
  subtitle: 'קוראים את השורשים ישר מהנוסחה, וציר הסימטריה באמצע',
  sections: [
    {
      id: 'roots',
      emoji: '👀',
      title: 'השורשים — בלי לפתור כלום',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: m`$y=a(x-m)(x-t)$`,
          md: m`$m$ ו-$t$ הם **השורשים** — נקודות החיתוך עם ציר $x$. למה? מציבים $y=0$: מכפלה שווה אפס → $x=m$ או $x=t$.`,
        },
        {
          type: 'parabola',
          mode: 'factored',
          caption: m`שנו את $m$ ו-$t$ — הנקודות הצהובות זזות בדיוק אליהם:`,
          a: 1,
          m: -1,
          t: 3,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהם השורשים של $y=2(x-5)(x+1)$?`,
        options: [m`$5$ ו-$-1$`, m`$-5$ ו-$1$`, m`$5$ ו-$1$`, m`$2,\ 5,\ -1$`],
        answer: 0,
        hint: m`$(x+1)=(x-(-1))$`,
        explain: m`$x-5=0\Rightarrow x=5$; $x+1=0\Rightarrow x=-1$. ה-2 לא משפיע על השורשים.`,
      },
    },
    {
      id: 'axis',
      emoji: '🪞',
      title: 'ציר הסימטריה — בדיוק באמצע',
      blocks: [
        {
          type: 'text',
          md: m`הפרבולה סימטרית, ולכן ציר הסימטריה (הקו הסגול) נמצא **באמצע בין השורשים**:

$$x=\frac{m+t}{2}$$`,
        },
        {
          type: 'steps',
          title: m`הקודקוד של $y=(x-1)(x-5)$`,
          steps: [
            { math: m`x=\frac{1+5}{2}=${c(VIOLET, '3')}`, note: 'באמצע בין 1 ל-5.' },
            { math: m`y=(3-1)(3-5)=2\cdot(-2)=-4`, note: 'מציבים.' },
            { math: m`${c(GREEN, '(3,-4)')}`, note: 'הקודקוד.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        prompt: m`מהו ה-$x$ של הקודקוד של $y=(x+2)(x-6)$?`,
        answer: 2,
        hint: m`השורשים $-2$ ו-$6$. מה באמצע?`,
        explain: m`$\frac{-2+6}{2}=2$`,
      },
    },
    {
      id: 'convert',
      emoji: '🏆',
      title: 'שלב הבוס: מעבר בין צורות',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'ממכפלה לסטנדרטית',
          md: m`פותחים סוגריים: $(x-2)(x-3)=x^2-5x+6$.`,
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'מסטנדרטית למכפלה',
          md: m`מפרקים (טרינום או נוסחת השורשים): $x^2-5x+6=(x-2)(x-3)$.`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שורש כפול',
          md: m`כש-$\Delta=0$ השורשים מתלכדים: $y=a(x-m)^2$ — הפרבולה **נוגעת** בציר $x$ בקודקוד.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`איזו פונקציה חותכת את ציר $x$ ב-$x=4$ וב-$x=-3$, ופותחת למטה?`,
        options: [m`$y=(x-4)(x+3)$`, m`$y=-(x-4)(x+3)$`, m`$y=-(x+4)(x-3)$`, m`$y=(x+4)(x-3)$`],
        answer: 1,
        hint: m`השורשים קובעים את הסוגריים, ו-$a<0$ קובע את הכיוון.`,
        explain: m`$(x-4)(x+3)$ נותן את השורשים 4 ו-−3, והמינוס — פתיחה למטה.`,
      },
    },
  ],
};
