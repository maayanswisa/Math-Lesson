import { m } from './tex.js';

export default {
  id: 'g10u4-trig',
  topicId: 'g10-u4-trig',
  grade: 10,
  units: 4,
  emoji: '📐',
  title: 'טריגונומטריה במשולש ישר-זווית',
  subtitle: 'סינוס, קוסינוס, טנגנס — ושטח משולש',
  sections: [
    {
      id: 'define',
      emoji: '🔺',
      title: 'שלושה יחסים',
      blocks: [
        {
          type: 'trigratio',
          angle: 35,
          caption: 'שנו את הזווית ואת היתר. מה משתנה ומה לא?',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'ההגדרות',
          md: m`$\sin\alpha$ = הניצב **מול** הזווית חלקי היתר

$\cos\alpha$ = הניצב **ליד** הזווית חלקי היתר

$\tan\alpha$ = הניצב **מול** חלקי הניצב **ליד**`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        tolerance: 0.05,
        prompt: m`יתר $10$, זווית $30°$. מה אורך הניצב שמול הזווית?`,
        answer: 5,
        hint: m`$10\sin30°$`,
        explain: m`$10\cdot0.5=5$`,
      },
    },
    {
      id: 'identities',
      emoji: '🔗',
      title: 'זהויות',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'חובה לדעת',
          md: m`$\sin^2\alpha+\cos^2\alpha=1$

$\tan\alpha=\frac{\sin\alpha}{\cos\alpha}$

$\sin(90°-\alpha)=\cos\alpha$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        tolerance: 0.001,
        prompt: m`$\sin\alpha=0.6$ ($\alpha$ חדה). מה $\cos\alpha$?`,
        answer: 0.8,
        hint: m`$\sqrt{1-0.36}$`,
        explain: m`$\sqrt{0.64}=0.8$`,
      },
    },
    {
      id: 'area',
      emoji: '🏆',
      title: 'שלב הבוס: שטח משולש',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שתי צלעות וזווית ביניהן',
          md: m`$$S=\frac12ab\sin\gamma$$

זווית קהה: $\sin(180°-\alpha)=\sin\alpha$ — אז $\sin150°=\sin30°=\frac12$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה שטח משולש עם צלעות $8$ ו-$10$ וזווית $150°$ ביניהן?`,
        answer: 20,
        hint: m`$\frac12\cdot8\cdot10\cdot\frac12$`,
        explain: m`$20$`,
      },
    },
  ],
};
