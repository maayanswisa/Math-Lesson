import { m } from './tex.js';

export default {
  id: 'g12u5-vectors-dot-product',
  topicId: 'g12-u5-vectors-dot-product',
  grade: 12,
  units: 5,
  emoji: '⊙',
  title: 'מכפלה סקלרית',
  subtitle: 'זוויות, אורכים וניצבות',
  sections: [
    {
      id: 'define',
      emoji: '📐',
      title: 'ההגדרה',
      blocks: [
        {
          type: 'vectors',
          mode: 'dot',
          caption: 'הזיזו את הווקטורים — מתי המכפלה חיובית, שלילית או אפס?',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שתי דרכים לחשב',
          md: m`$$\vec u\cdot\vec v=|\vec u||\vec v|\cos\alpha$$

ברכיבים: $(x_1,y_1)\cdot(x_2,y_2)=x_1x_2+y_1y_2$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$|\vec u|=4$, $|\vec v|=5$, והזווית ביניהם $60°$. מה $\vec u\cdot\vec v$?`,
        answer: 10,
        hint: m`$20\cdot\frac12$`,
        explain: m`$10$`,
      },
    },
    {
      id: 'perp',
      emoji: '⊥',
      title: 'ניצבות ואורך',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שני כלים',
          md: m`$\vec u\perp\vec v\iff\vec u\cdot\vec v=0$

$|\vec v|=\sqrt{\vec v\cdot\vec v}$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`לאיזה $k$ הווקטורים $(2,k)$ ו-$(3,-6)$ ניצבים?`,
        answer: 1,
        hint: m`$6-6k=0$`,
        explain: m`$k=1$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: אורך של סכום',
      blocks: [
        {
          type: 'steps',
          title: m`$|\vec u|=3$, $|\vec v|=2$, $\vec u\cdot\vec v=3$. מה $|\vec u+\vec v|$?`,
          steps: [
            { math: m`|\vec u+\vec v|^2=(\vec u+\vec v)\cdot(\vec u+\vec v)`, note: 'אורך בריבוע — מכפלה עצמית.' },
            { math: m`=9+2\cdot3+4=19`, note: 'פותחים סוגריים.' },
            { math: m`|\vec u+\vec v|=\sqrt{19}`, note: 'שורש.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        tolerance: 0.01,
        prompt: m`$|\vec u|=|\vec v|=1$ והזווית ביניהם $120°$. מה $|\vec u-\vec v|$? (בערך)`,
        answer: 1.732,
        hint: m`$1-2\cdot(-\frac12)+1=3$`,
        explain: m`$\sqrt3\approx1.73$`,
      },
    },
  ],
};
