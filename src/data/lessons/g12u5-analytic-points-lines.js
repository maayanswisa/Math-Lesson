import { m } from './tex.js';

export default {
  id: 'g12u5-analytic-points-lines',
  topicId: 'g12-u5-analytic-points-lines',
  grade: 12,
  units: 5,
  emoji: '📍',
  title: 'נקודות וישרים',
  subtitle: 'חלוקת קטע, מרחק נקודה מישר ומקום גאומטרי',
  sections: [
    {
      id: 'divide',
      emoji: '✂️',
      title: 'חלוקת קטע ביחס',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: m`יחס $m:n$`,
          md: m`$P$ מחלק את $AB$ ביחס $m:n$ (מ-$A$):

$$P=\left(\frac{nx_1+mx_2}{m+n},\frac{ny_1+my_2}{m+n}\right)$$
`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`$A(0,0)$, $B(9,6)$. $P$ מחלק את $AB$ ביחס $1:2$ מ-$A$. מהו $P$?`,
        options: [m`$(3,2)$`, m`$(6,4)$`, m`$(4.5,3)$`, m`$(2,3)$`],
        answer: 0,
        hint: 'שליש מהדרך.',
        explain: m`$\frac13(9,6)=(3,2)$`,
      },
    },
    {
      id: 'distance',
      emoji: '📏',
      title: 'מרחק נקודה מישר',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'הנוסחה',
          md: m`ישר $ax+by+c=0$, נקודה $(x_0,y_0)$:

$$d=\frac{|ax_0+by_0+c|}{\sqrt{a^2+b^2}}$$
`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה המרחק של $(1,2)$ מהישר $3x+4y+4=0$?`,
        answer: 3,
        hint: m`$\frac{|3+8+4|}{5}$`,
        explain: m`$\frac{15}{5}=3$`,
      },
    },
    {
      id: 'locus',
      emoji: '🏆',
      title: 'שלב הבוס: מקום גאומטרי',
      blocks: [
        {
          type: 'steps',
          title: m`מקום הנקודות שוות המרחק מ-$A(0,0)$ ו-$B(4,2)$`,
          steps: [
            { math: m`x^2+y^2=(x-4)^2+(y-2)^2`, note: 'מרחק בריבוע משני הצדדים.' },
            { math: m`0=-8x+16-4y+4`, note: 'הריבועים מצטמצמים.' },
            { math: m`y=-2x+5`, note: 'ישר — האנך האמצעי!' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מקום הנקודות שמרחקן מהישר $y=0$ שווה למרחקן מהישר $x=0$ הוא:`,
        options: [m`$y=\pm x$`, m`$y=x$ בלבד`, m`$x=0$`, 'מעגל'],
        answer: 0,
        hint: m`$|y|=|x|$`,
        explain: 'חוצי הזוויות בין הצירים.',
      },
    },
  ],
};
