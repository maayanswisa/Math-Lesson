import { m } from './tex.js';

export default {
  id: 'g12u5-vectors-algebraic',
  topicId: 'g12-u5-vectors-algebraic',
  grade: 12,
  units: 5,
  emoji: '🧊',
  title: 'וקטורים במרחב — הצגה אלגברית',
  subtitle: 'קואורדינטות, ישרים ומישורים',
  sections: [
    {
      id: 'coords',
      emoji: '📍',
      title: 'שלוש קואורדינטות',
      blocks: [
        {
          type: 'space',
          mode: 'coords',
          caption: m`תיבה לאורך הצירים — הקודקוד הרחוק ב-$(a,b,c)$. סובבו:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'בין שתי נקודות',
          md: m`$\overrightarrow{AB}=(x_2-x_1,\ y_2-y_1,\ z_2-z_1)$

$|\overrightarrow{AB}|=\sqrt{\Delta x^2+\Delta y^2+\Delta z^2}$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה המרחק בין $(1,2,3)$ ל-$(3,5,9)$?`,
        answer: 7,
        hint: m`$\sqrt{4+9+36}$`,
        explain: m`$\sqrt{49}=7$`,
      },
    },
    {
      id: 'line',
      emoji: '📏',
      title: 'ישר במרחב',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'נקודה + כיוון',
          md: m`$$(x,y,z)=(x_0,y_0,z_0)+t(v_1,v_2,v_3)$$

כל ערך של $t$ נותן נקודה על הישר.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`הישר $(1,0,2)+t(2,1,-1)$. איזו נקודה עליו?`,
        options: [m`$(5,2,0)$`, m`$(3,1,3)$`, m`$(2,1,-1)$`, m`$(5,2,4)$`],
        answer: 0,
        hint: m`נסו $t=2$.`,
        explain: m`$(1+4,\ 2,\ 2-2)=(5,2,0)$`,
      },
    },
    {
      id: 'plane',
      emoji: '🏆',
      title: 'שלב הבוס: מישור',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'וקטור נורמל',
          md: m`מישור $Ax+By+Cz+D=0$ — הווקטור $(A,B,C)$ **ניצב** למישור. מקבלים את $D$ מהצבת נקודה.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מישור ניצב לווקטור $(1,2,2)$ ועובר ב-$(1,1,1)$: $x+2y+2z+D=0$. מה $D$?`,
        answer: -5,
        hint: m`$1+2+2+D=0$`,
        explain: m`$D=-5$`,
      },
    },
  ],
};
