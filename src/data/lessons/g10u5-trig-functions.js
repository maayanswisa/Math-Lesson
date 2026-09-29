import { m } from './tex.js';

export default {
  id: 'g10u5-trig-functions',
  topicId: 'g10-u5-trig-functions',
  grade: 10,
  units: 5,
  emoji: '🌀',
  title: 'פונקציות טריגונומטריות על מעגל היחידה',
  subtitle: 'כל זווית — גם קהה ושלילית',
  sections: [
    {
      id: 'unit',
      emoji: '⭕',
      title: 'מעגל היחידה',
      blocks: [
        {
          type: 'unitcircle',
          angle: 35,
          caption: m`הזיזו את הזווית: הנקודה על המעגל היא $(\cos\alpha,\sin\alpha)$:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'ההגדרה',
          md: m`$\cos\alpha$ = שיעור ה-$x$, $\sin\alpha$ = שיעור ה-$y$, $\tan\alpha=\frac{\sin\alpha}{\cos\alpha}$. ומפיתגורס: $\sin^2\alpha+\cos^2\alpha=1$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`באיזה רביע $\sin$ חיובי ו-$\cos$ שלילי?`,
        options: ['שני', 'ראשון', 'שלישי', 'רביעי'],
        answer: 0,
        hint: m`$y>0$, $x<0$`,
        explain: 'למעלה משמאל — רביע שני.',
      },
    },
    {
      id: 'symmetry',
      emoji: '🪞',
      title: 'סימטריות',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'זהויות חשובות',
          md: m`$\sin(-x)=-\sin x$

$\cos(-x)=\cos x$

$\sin(180°-x)=\sin x$

$\cos(180°-x)=-\cos x$

$\sin(90°-x)=\cos x$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        tolerance: 0.001,
        prompt: m`כמה זה $\cos120°$?`,
        answer: -0.5,
        hint: m`$-\cos60°$`,
        explain: m`$-\frac12$`,
      },
    },
    {
      id: 'wave',
      emoji: '🏆',
      title: 'שלב הבוס: מחזוריות',
      blocks: [
        {
          type: 'sinewave',
          caption: 'מסובבים את המעגל — ומקבלים גל:',
        },
        {
          type: 'card',
          tone: 'key',
          title: m`כל $360°$ חוזר`,
          md: m`$\sin(x+360°)=\sin x$. ברדיאנים: $360°=2\pi$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        tolerance: 0.001,
        prompt: m`כמה זה $\sin390°$?`,
        answer: 0.5,
        hint: m`$390=360+30$`,
        explain: m`$\sin30°=\frac12$`,
      },
    },
  ],
};
