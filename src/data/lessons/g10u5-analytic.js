import { m } from './tex.js';

export default {
  id: 'g10u5-analytic',
  topicId: 'g10-u5-analytic',
  grade: 10,
  units: 5,
  emoji: '📍',
  title: 'הנדסה אנליטית: הישר והמעגל',
  subtitle: 'מרחק, אמצע, מקבילים ומאונכים — ומשוואת מעגל',
  sections: [
    {
      id: 'line',
      emoji: '📏',
      title: 'ישרים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'תזכורת מהירה',
          md: m`$d=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$

$y-y_1=m(x-x_1)$

מקבילים: $m_1=m_2$ · מאונכים: $m_1m_2=-1$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהי משוואת האנך האמצעי לקטע $A(0,0)$, $B(4,2)$?`,
        options: [m`$y=-2x+5$`, m`$y=\frac12x$`, m`$y=-2x+1$`, m`$y=2x-3$`],
        answer: 0,
        hint: m`אמצע $(2,1)$, שיפוע מאונך $-2$.`,
        explain: m`$y-1=-2(x-2)$ ← $y=-2x+5$`,
      },
    },
    {
      id: 'circle',
      emoji: '⭕',
      title: 'משוואת מעגל',
      blocks: [
        {
          type: 'circleline',
          lineless: true,
          caption: m`מעגל $(x-a)^2+(y-b)^2=R^2$ — שנו מרכז ורדיוס:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'פיתגורס בתחפושת',
          md: m`כל נקודה במעגל רחוקה $R$ מהמרכז $(a,b)$:

$$(x-a)^2+(y-b)^2=R^2$$

קנוני (מרכז בראשית): $x^2+y^2=R^2$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה המרכז והרדיוס של $(x+2)^2+(y-3)^2=16$?`,
        options: [m`$(-2,3)$, $R=4$`, m`$(2,-3)$, $R=4$`, m`$(-2,3)$, $R=16$`, m`$(2,3)$, $R=4$`],
        answer: 0,
        hint: 'שימו לב לסימנים.',
        explain: m`$x+2=x-(-2)$ ← מרכז $(-2,3)$, $R=\sqrt{16}=4$.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: נקודה על המעגל',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'מציבים',
          md: m`נקודה על המעגל ← מקיימת את המשוואה. בפנים ← שמאל $<R^2$; בחוץ ← $>R^2$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`המעגל $x^2+y^2=25$. היכן הנקודה $(3,-4)$?`,
        options: ['על המעגל', 'בתוך המעגל', 'מחוץ למעגל', 'במרכז'],
        answer: 0,
        hint: m`$9+16$`,
        explain: m`$25=25$ ← על המעגל.`,
      },
    },
  ],
};
