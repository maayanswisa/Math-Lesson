import { m } from './tex.js';

export default {
  id: 'g6-number-line-density',
  topicId: 'g6-number-line-density',
  grade: 6,
  emoji: '🔎',
  title: 'צפיפות בציר המספרים',
  subtitle: 'בין כל שני מספרים יש עוד מספר',
  sections: [
    {
      id: 'zoom',
      emoji: '🔍',
      title: 'זום פנימה',
      blocks: [
        {
          type: 'zoomline',
          from: 0,
          to: 1,
          caption: 'לחצו על קטע כדי להגדיל אותו. תמיד אפשר לחלק שוב ל-10:',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`כמה מספרים יש בין $0.3$ ל-$0.4$?`,
        options: ['אין בכלל', m`$9$`, m`$10$`, 'אינסוף'],
        answer: 3,
        hint: m`$0.31$, $0.311$, $0.3111$...`,
        explain: 'תמיד אפשר להגדיל עוד — יש אינסוף מספרים.',
      },
    },
    {
      id: 'between',
      emoji: '↔️',
      title: 'מספר באמצע',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'הממוצע תמיד באמצע',
          md: m`בין $a$ ל-$b$ נמצא $\frac{a+b}{2}$. בין $\frac12$ ל-$\frac34$: $\frac{0.5+0.75}{2}=0.625$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`איזה מספר נמצא בדיוק באמצע בין $2.4$ ל-$2.5$?`,
        answer: 2.45,
        tolerance: 0.0001,
        hint: m`$\frac{2.4+2.5}{2}$`,
        explain: m`$2.45$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: השוואה',
      blocks: [
        {
          type: 'card',
          tone: 'warn',
          title: 'לא לפי אורך!',
          md: m`$0.5>0.4999$ — משווים ספרה ספרה משמאל: עשיריות קודם.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'מה המספר הגדול ביותר?',
        options: [m`$0.7$`, m`$0.69$`, m`$0.699$`, m`$0.07$`],
        answer: 0,
        hint: 'עשיריות קודם.',
        explain: m`$0.7=0.700>0.699$`,
      },
    },
  ],
};
