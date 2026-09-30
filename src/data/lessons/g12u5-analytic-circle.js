import { m } from './tex.js';

export default {
  id: 'g12u5-analytic-circle',
  topicId: 'g12-u5-analytic-circle',
  grade: 12,
  units: 5,
  emoji: '⭕',
  title: 'המעגל',
  subtitle: 'משוואה, משיק ומצבים הדדיים',
  sections: [
    {
      id: 'equation',
      emoji: '✏️',
      title: 'משוואת מעגל',
      blocks: [
        {
          type: 'circleline',
          caption: 'מעגל וישר — שנו ובדקו: חותך, משיק או נפרד?',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'מרכז ורדיוס',
          md: m`$$(x-a)^2+(y-b)^2=R^2$$

מצורה מפותחת — משלימים לריבוע: $x^2-6x+y^2+2y=6$ ← $(x-3)^2+(y+1)^2=16$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה המרכז והרדיוס של $x^2+y^2-4x+10y+20=0$?`,
        options: [m`$(2,-5)$, $R=3$`, m`$(-2,5)$, $R=3$`, m`$(2,-5)$, $R=9$`, m`$(4,-10)$, $R=20$`],
        answer: 0,
        hint: m`$(x-2)^2+(y+5)^2=9$`,
        explain: m`$4+25-20=9$`,
      },
    },
    {
      id: 'tangent',
      emoji: '📏',
      title: 'משיק',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'ניצב לרדיוס',
          md: m`המשיק בנקודה $P$ ניצב לרדיוס $MP$: $m_{tangent}\cdot m_{MP}=-1$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה המשיק למעגל $x^2+y^2=25$ בנקודה $(3,4)$?`,
        options: [m`$y=-\frac34x+\frac{25}{4}$`, m`$y=\frac43x$`, m`$y=\frac34x+\frac74$`, m`$y=-\frac43x+8$`],
        answer: 0,
        hint: m`שיפוע הרדיוס $\frac43$ ← משיק $-\frac34$.`,
        explain: m`$y-4=-\frac34(x-3)$`,
      },
    },
    {
      id: 'two',
      emoji: '🏆',
      title: 'שלב הבוס: שני מעגלים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: m`לפי מרחק המרכזים $d$`,
          md: m`$d>R_1+R_2$ — נפרדים

$d=R_1+R_2$ — משיקים מבחוץ

$|R_1-R_2|<d<R_1+R_2$ — נחתכים

$d=|R_1-R_2|$ — משיקים מבפנים`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מעגל במרכז $(0,0)$ ברדיוס $3$, ומעגל במרכז $(8,6)$ ברדיוס $7$. מה המצב?`,
        options: ['משיקים מבחוץ', 'נחתכים', 'נפרדים', 'אחד בתוך השני'],
        answer: 0,
        hint: m`$d=10$`,
        explain: m`$d=10=3+7$`,
      },
    },
  ],
};
