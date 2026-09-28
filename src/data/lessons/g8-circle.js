import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g8-circle',
  topicId: 'g8-circle',
  grade: 8,
  emoji: '⭕',
  title: 'המעגל והעיגול',
  subtitle: 'רדיוס, קוטר, היקף ושטח — ומאיפה בא π',
  sections: [
    {
      id: 'parts',
      emoji: '🎯',
      title: 'רדיוס וקוטר',
      blocks: [
        {
          type: 'text',
          md: m`**מעגל** = הקו העגול. **עיגול** = כל השטח שבתוכו.

- **רדיוס** $r$ — מהמרכז לקו.
- **קוטר** $d$ — מקצה לקצה, **דרך המרכז**. הוא שני רדיוסים: $d=2r$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'r =',
        prompt: 'קוטר של מעגל הוא 18 ס"מ. מה הרדיוס?',
        answer: 9,
        hint: 'הקוטר הוא פעמיים הרדיוס.',
        explain: m`$r=\frac{18}{2}=9$ ס"מ.`,
      },
    },
    {
      id: 'pi',
      emoji: '🥧',
      title: 'היקף — ומה זה π',
      blocks: [
        {
          type: 'circle',
          caption: 'שנו את הרדיוס: המעגל גדל, אבל היחס בין ההיקף לקוטר לא משתנה!',
          r: 4,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'היקף המעגל',
          md: m`ההיקף תמיד $\pi\approx3.14$ פעמים הקוטר:
$$P=\pi d=2\pi r$$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'מה היקף מעגל עם רדיוס 5?',
        options: [m`$5\pi$`, m`$10\pi$`, m`$25\pi$`, m`$2.5\pi$`],
        answer: 1,
        hint: m`$2\pi r$`,
        explain: m`$2\pi\cdot5=10\pi\approx31.4$`,
      },
    },
    {
      id: 'area',
      emoji: '🍕',
      title: 'שטח העיגול',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שטח העיגול',
          md: m`$$S=\pi r^2$$`,
        },
        {
          type: 'card',
          tone: 'why',
          title: 'למה $\\pi r^2$?',
          md: m`חותכים את העיגול להרבה משולשים דקים (כמו פיצה) ומסדרים אותם הפוך-ישר-הפוך. יוצא כמעט **מלבן**: הגובה $r$, והרוחב חצי היקף $=\pi r$. השטח: $\pi r\cdot r=\pi r^2$.`,
        },
        {
          type: 'steps',
          title: m`שטח עיגול עם קוטר $8$`,
          steps: [
            { math: m`r=8\div2=${c(VIOLET, '4')}`, note: '**קודם** רדיוס! הנוסחה משתמשת ב-$r$.' },
            { math: m`S=\pi\cdot${c(VIOLET, '4')}^2=${c(GREEN, '16\\pi')}`, note: m`$\approx50.24$` },
          ],
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'מלכודת נפוצה',
          md: m`$\pi r^2$ — **רק $r$ בריבוע**, לא $\pi$. וגם: אל תציבו קוטר במקום רדיוס!`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'מה שטח עיגול עם רדיוס 3?',
        options: [m`$6\pi$`, m`$9\pi$`, m`$3\pi$`, m`$36\pi$`],
        answer: 1,
        hint: m`$\pi r^2=\pi\cdot3^2$`,
        explain: m`$\pi\cdot9=9\pi\approx28.26$`,
      },
    },
    {
      id: 'reverse',
      emoji: '🏆',
      title: 'שלב הבוס: אחורה',
      blocks: [
        {
          type: 'steps',
          title: m`שטח עיגול הוא $49\pi$. מה ההיקף?`,
          steps: [
            { math: m`\pi r^2=49\pi\ \Rightarrow\ r^2=49`, note: m`מחלקים ב-$\pi$.` },
            { math: m`r=${c(VIOLET, '7')}`, note: 'שורש.' },
            { math: m`P=2\pi\cdot7=${c(GREEN, '14\\pi')}`, note: 'עכשיו ההיקף.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'r =',
        prompt: m`היקף מעגל הוא $20\pi$. מה הרדיוס?`,
        answer: 10,
        hint: m`$2\pi r=20\pi$`,
        explain: m`$2r=20\Rightarrow r=10$`,
      },
    },
  ],
};
