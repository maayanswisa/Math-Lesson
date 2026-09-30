import { m } from './tex.js';

export default {
  id: 'g12u5-analytic-ellipse',
  topicId: 'g12-u5-analytic-ellipse',
  grade: 12,
  units: 5,
  emoji: '🥚',
  title: 'האליפסה',
  subtitle: 'סכום מרחקים קבוע משני מוקדים',
  sections: [
    {
      id: 'define',
      emoji: '📌',
      title: 'שני מסמרים וחוט',
      blocks: [
        {
          type: 'conics',
          shape: 'ellipse',
          shapes: ['ellipse'],
          caption: 'הזיזו את P — סכום המרחקים לשני המוקדים לא משתנה:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'ההגדרה',
          md: m`$$\frac{x^2}{a^2}+\frac{y^2}{b^2}=1$$

$PF_1+PF_2=2a$

המוקדים ב-$(\pm c,0)$, כאשר $c^2=a^2-b^2$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה המוקדים של $\frac{x^2}{25}+\frac{y^2}{9}=1$?`,
        options: [m`$(\pm4,0)$`, m`$(\pm5,0)$`, m`$(\pm3,0)$`, m`$(0,\pm4)$`],
        answer: 0,
        hint: m`$c^2=25-9$`,
        explain: m`$c=4$`,
      },
    },
    {
      id: 'sum',
      emoji: '➕',
      title: 'סכום המרחקים',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'בלי לחשב מרחקים',
          md: m`לכל נקודה על האליפסה, $PF_1+PF_2=2a$ — אורך הציר הגדול.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$P$ על $\frac{x^2}{36}+\frac{y^2}{20}=1$, ו-$PF_1=4$. מה $PF_2$?`,
        answer: 8,
        hint: m`$2a=12$`,
        explain: m`$12-4=8$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: בונים משוואה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'מהנתונים למשוואה',
          md: m`נתונים $a$ ו-$c$ ← $b^2=a^2-c^2$ ← מציבים במשוואה הקנונית.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`אליפסה קנונית עם מוקדים $(\pm3,0)$ וציר גדול באורך $10$. מה משוואתה?`,
        options: [
          m`$\frac{x^2}{25}+\frac{y^2}{16}=1$`,
          m`$\frac{x^2}{100}+\frac{y^2}{9}=1$`,
          m`$\frac{x^2}{25}+\frac{y^2}{34}=1$`,
          m`$\frac{x^2}{16}+\frac{y^2}{25}=1$`,
        ],
        answer: 0,
        hint: m`$a=5$, $b^2=25-9$`,
        explain: m`$b^2=16$`,
      },
    },
  ],
};
