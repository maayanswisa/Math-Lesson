import { m } from './tex.js';

export default {
  id: 'g11u3-space-similarity',
  topicId: 'g11-u3-space-similarity',
  grade: 11,
  units: 3,
  emoji: '🔍',
  title: 'דמיון משולשים',
  subtitle: 'אותה צורה, גודל אחר',
  sections: [
    {
      id: 'define',
      emoji: '🔺',
      title: 'מה זה דומים',
      blocks: [
        {
          type: 'similar',
          caption: 'הגדילו — הזוויות נשארות, הצלעות גדלות באותו יחס:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'משפט ז.ז',
          md: m`מספיק ששתי זוויות שוות — והמשולשים דומים. יחס הצלעות המתאימות — **יחס הדמיון** $k$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`משולשים דומים. צלעות הקטן: $3, 4, 5$. הצלע הקצרה בגדול: $9$. מה הצלע הארוכה בגדול?`,
        answer: 15,
        hint: m`$k=3$`,
        explain: m`$5\cdot3=15$`,
      },
    },
    {
      id: 'shadow',
      emoji: '🌳',
      title: 'צל ועץ',
      blocks: [
        {
          type: 'thales',
          caption: 'קו מקביל לבסיס יוצר משולש דומה:',
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'שימוש מעשי',
          md: m`מקל באורך $1$ מטר מטיל צל $1.5$ מטר. עץ מטיל באותו רגע צל $12$ מטר ← גובה העץ $\frac{12}{1.5}=8$ מטר.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'מ׳',
        prompt: m`אדם בגובה $1.8$ מטר מטיל צל $2.4$ מטר. בניין מטיל צל $40$ מטר. מה גובה הבניין?`,
        answer: 30,
        hint: m`$\frac{1.8}{2.4}=\frac{h}{40}$`,
        explain: m`$h=30$ מטר.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: היקף ושטח',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: m`$k$ ו-$k^2$`,
          md: m`יחס היקפים $=k$. יחס שטחים $=k^2$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`יחס הדמיון $2$. שטח המשולש הגדול $48$. מה שטח הקטן?`,
        answer: 12,
        hint: m`$\frac{48}{4}$`,
        explain: m`$12$`,
      },
    },
  ],
};
