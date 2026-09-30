import { m } from './tex.js';

export default {
  id: 'g12u5-complex',
  topicId: 'g12-u5-complex',
  grade: 12,
  units: 5,
  emoji: '📍',
  title: 'מקומות גאומטריים במישור גאוס',
  subtitle: 'מעגל, אנך אמצעי ומעגל אפולוניוס',
  sections: [
    {
      id: 'circle',
      emoji: '⭕',
      title: 'מעגל',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: m`$|z-a|$ = מרחק`,
          md: m`$|z-a|$ — המרחק בין $z$ ל-$a$. לכן $|z-a|=R$ — **מעגל** במרכז $a$ ברדיוס $R$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה מתאר $|z-3+2i|=4$?`,
        options: [m`מעגל במרכז $3-2i$ ברדיוס $4$`, m`מעגל במרכז $-3+2i$ ברדיוס $4$`, m`מעגל במרכז $3-2i$ ברדיוס $16$`, 'ישר'],
        answer: 0,
        hint: m`$|z-(3-2i)|$`,
        explain: m`מרכז $(3,-2)$, רדיוס $4$.`,
      },
    },
    {
      id: 'bisector',
      emoji: '↔️',
      title: 'אנך אמצעי',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שוויון מרחקים',
          md: m`$|z-a|=|z-b|$ — כל הנקודות שוות המרחק מ-$a$ ומ-$b$: **האנך האמצעי**.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה מתאר $|z-2|=|z+2|$?`,
        options: ['הציר המדומה', 'הציר הממשי', m`מעגל ברדיוס $2$`, m`הישר $y=x$`],
        answer: 0,
        hint: m`שוויון מרחקים מ-$2$ ומ-$-2$.`,
        explain: m`האנך האמצעי: $x=0$.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: אפולוניוס ואי-שוויון המשולש',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שני כלים',
          md: m`**מעגל אפולוניוס:** $|z-a|=k|z-b|$ ($k\ne1$) — מעגל.

**אי-שוויון המשולש:** $|z_1+z_2|\le|z_1|+|z_2|$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$|z|=3$. מה הערך הגדול ביותר של $|z+4i|$?`,
        answer: 7,
        hint: m`$|z+4i|\le|z|+|4i|$`,
        explain: m`$3+4=7$, כש-$z=3i$.`,
      },
    },
  ],
};
