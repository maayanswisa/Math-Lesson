import { m } from './tex.js';

export default {
  id: 'g12u5-analytic-parabola',
  topicId: 'g12-u5-analytic-parabola',
  grade: 12,
  units: 5,
  emoji: '📡',
  title: 'הפרבולה כמקום גאומטרי',
  subtitle: 'מוקד, מדריך ומשוואה קנונית',
  sections: [
    {
      id: 'define',
      emoji: '🎯',
      title: 'מוקד ומדריך',
      blocks: [
        {
          type: 'conics',
          shape: 'parabola',
          shapes: ['parabola'],
          caption: 'הזיזו את P על הפרבולה — המרחק מהמוקד תמיד שווה למרחק מהמדריך:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'ההגדרה',
          md: m`פרבולה — כל הנקודות שמרחקן מנקודה (**מוקד**) שווה למרחקן מישר (**מדריך**).

$$y^2=2px$$

מוקד $\left(\frac p2,0\right)$, מדריך $x=-\frac p2$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה המוקד של $y^2=12x$?`,
        options: [m`$(3,0)$`, m`$(6,0)$`, m`$(12,0)$`, m`$(0,3)$`],
        answer: 0,
        hint: m`$2p=12$`,
        explain: m`$p=6$ ← מוקד $(3,0)$.`,
      },
    },
    {
      id: 'point',
      emoji: '📍',
      title: 'מרחק מהמוקד',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'קיצור דרך',
          md: m`המרחק של נקודה על הפרבולה מהמוקד $=$ המרחק שלה מהמדריך $=x+\frac p2$. בלי שורשים!`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`הנקודה $(4,y)$ על $y^2=8x$. מה מרחקה מהמוקד?`,
        answer: 6,
        hint: m`$p=4$, $x+\frac p2$`,
        explain: m`$4+2=6$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: ישר ופרבולה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'מצב הדדי',
          md: m`מציבים את הישר בפרבולה ומקבלים משוואה ריבועית: $\Delta>0$ — חותך, $\Delta=0$ — **משיק**, $\Delta<0$ — לא נפגשים.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`לאיזה $k$ הישר $y=x+k$ משיק לפרבולה $y^2=4x$?`,
        answer: 1,
        hint: m`$(x+k)^2=4x$ ← $x^2+(2k-4)x+k^2=0$, $\Delta=0$`,
        explain: m`$(2k-4)^2-4k^2=0$ ← $16-16k=0$ ← $k=1$`,
      },
    },
  ],
};
