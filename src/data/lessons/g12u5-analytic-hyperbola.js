import { m } from './tex.js';

export default {
  id: 'g12u5-analytic-hyperbola',
  topicId: 'g12-u5-analytic-hyperbola',
  grade: 12,
  units: 5,
  emoji: '〰️',
  title: 'ההיפרבולה והחתכים החרוטיים',
  subtitle: 'הפרש מרחקים קבוע, אסימפטוטות — ומבט מאחד',
  sections: [
    {
      id: 'define',
      emoji: '📌',
      title: 'הפרש מרחקים',
      blocks: [
        {
          type: 'conics',
          shape: 'hyperbola',
          shapes: ['hyperbola'],
          caption: 'הזיזו את P — הפרש המרחקים לשני המוקדים קבוע:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'ההגדרה',
          md: m`$$\frac{x^2}{a^2}-\frac{y^2}{b^2}=1$$

$|PF_1-PF_2|=2a$

$c^2=a^2+b^2$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה המוקדים של $\frac{x^2}{16}-\frac{y^2}{9}=1$?`,
        options: [m`$(\pm5,0)$`, m`$(\pm\sqrt7,0)$`, m`$(\pm4,0)$`, m`$(\pm3,0)$`],
        answer: 0,
        hint: m`$c^2=16+9$`,
        explain: m`$c=5$`,
      },
    },
    {
      id: 'asymptotes',
      emoji: '✖️',
      title: 'אסימפטוטות',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שני ישרים',
          md: m`$$y=\pm\frac bax$$

רחוק מהמרכז, ההיפרבולה כמעט נוגעת בהם.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה האסימפטוטות של $\frac{x^2}{4}-\frac{y^2}{25}=1$?`,
        options: [m`$y=\pm\frac52x$`, m`$y=\pm\frac25x$`, m`$y=\pm\frac{25}{4}x$`, m`$y=\pm5x$`],
        answer: 0,
        hint: m`$a=2$, $b=5$`,
        explain: m`$\frac ba=\frac52$`,
      },
    },
    {
      id: 'unify',
      emoji: '🏆',
      title: 'שלב הבוס: כל החתכים',
      blocks: [
        {
          type: 'conics',
          caption: 'שלושת החתכים החרוטיים — השוו ביניהם:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'משוואה אחת',
          md: m`$Ax^2+By^2+Cx+Dy+E=0$:

$A=B$ — מעגל

$A,B$ באותו סימן — אליפסה

סימנים הפוכים — היפרבולה

אחד מהם $0$ — פרבולה`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה מתארת המשוואה $4x^2-9y^2=36$?`,
        options: ['היפרבולה', 'אליפסה', 'מעגל', 'פרבולה'],
        answer: 0,
        hint: 'סימנים הפוכים.',
        explain: m`$\frac{x^2}{9}-\frac{y^2}{4}=1$`,
      },
    },
  ],
};
