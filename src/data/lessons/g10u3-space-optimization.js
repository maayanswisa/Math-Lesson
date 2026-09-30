import { m } from './tex.js';

export default {
  id: 'g10u3-space-optimization',
  topicId: 'g10-u3-space-optimization',
  grade: 10,
  units: 3,
  emoji: '🏡',
  title: 'שטח והיקף — מקסימום ומינימום',
  subtitle: 'אותה גדר — איזה מלבן נותן הכי הרבה שטח?',
  sections: [
    {
      id: 'same-perimeter',
      emoji: '🧵',
      title: 'היקף קבוע',
      blocks: [
        {
          type: 'rectopt',
          P: 40,
          caption: m`$40$ מטר גדר. הזיזו את $x$ — השטח משתנה!`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שטח כפונקציה',
          md: m`צלע אחת $x$, השנייה $20-x$:

$$S(x)=x(20-x)$$

פרבולה הפוכה — המקסימום בקודקוד.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'מ"ר',
        prompt: m`מה השטח הגדול ביותר עם $40$ מטר גדר?`,
        answer: 100,
        hint: m`ריבוע $10\times10$.`,
        explain: m`$x=10$ ← $S=100$ מ"ר.`,
      },
    },
    {
      id: 'square',
      emoji: '⬛',
      title: 'הריבוע מנצח',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'כלל',
          md: m`מכל המלבנים עם היקף $P$ — לריבוע (צלע $\frac P4$) השטח הגדול ביותר. ומכל הצורות — **לעיגול**!`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'מ"ר',
        prompt: m`מה השטח המקסימלי של מלבן עם היקף $36$ מטר?`,
        answer: 81,
        hint: m`צלע $9$.`,
        explain: m`$9\times9=81$`,
      },
    },
    {
      id: 'wall',
      emoji: '🏆',
      title: 'שלב הבוס: גדר ליד קיר',
      blocks: [
        {
          type: 'rectopt',
          P: 40,
          wall: true,
          caption: 'עכשיו צד אחד צמוד לקיר — הגדר רק ל-3 צדדים:',
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'מודל חדש',
          md: m`שתי צלעות $x$ וצלע $40-2x$: $S(x)=x(40-2x)$. הקודקוד: $x=10$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'מ"ר',
        prompt: m`מה השטח המקסימלי ליד הקיר, עם $40$ מטר גדר?`,
        answer: 200,
        hint: m`$10\cdot20$`,
        explain: m`$x=10$, צלע מקבילה $20$ ← $200$ מ"ר.`,
      },
    },
  ],
};
