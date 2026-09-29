import { m } from './tex.js';

export default {
  id: 'g10u3-space-routes',
  topicId: 'g10-u3-space-routes',
  grade: 10,
  units: 3,
  emoji: '🏃',
  title: 'מסלולים ומהירות',
  subtitle: 'אורך מסלול, דרך, מהירות וזמן',
  sections: [
    {
      id: 'route',
      emoji: '🗺️',
      title: 'אורך מסלול',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'מחברים את החלקים',
          md: m`מסלול = קטעים ישרים + קשתות. רבע מעגל: $\frac{2\pi r}{4}=\frac{\pi r}{2}$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'מ׳',
        tolerance: 0.5,
        prompt: m`שביל: $100$ מטר ישר, רבע מעגל ברדיוס $20$ מטר, ועוד $50$ מטר ישר. מה אורכו? (בערך)`,
        answer: 181.42,
        hint: m`$150+10\pi$`,
        explain: m`$150+31.4\approx181.4$ מטר.`,
      },
    },
    {
      id: 'speed',
      emoji: '🏁',
      title: 'דרך, מהירות וזמן',
      blocks: [
        {
          type: 'race',
          v1: 60,
          v2: 90,
          caption: 'שתי מכוניות — שנו מהירויות וזמן:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'המשולש',
          md: m`$$s=v\cdot t\qquad v=\frac st\qquad t=\frac sv$$

**שימו לב ליחידות:** מטר לשנייה מול ק"מ לשעה!`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'דקות',
        prompt: m`רוכב אופניים במהירות $18$ קמ"ש. כמה דקות ייקח לו לעבור $6$ ק"מ?`,
        answer: 20,
        hint: m`$\frac{6}{18}$ שעה.`,
        explain: m`$\frac13$ שעה $=20$ דקות.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: הקפות',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'כמה הקפות?',
          md: m`מספר הקפות = המרחק הרצוי חלקי היקף המסלול. $5$ ק"מ במסלול של $400$ מטר: $\frac{5000}{400}=12.5$ הקפות.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'דקות',
        prompt: m`רצה מקיפה מסלול של $400$ מטר $10$ פעמים במהירות $4$ מטר לשנייה. כמה דקות היא רצה?`,
        answer: 16.67,
        tolerance: 0.02,
        hint: m`$\frac{4000}{4}=1000$ שניות.`,
        explain: m`$\frac{1000}{60}\approx16.67$ דקות.`,
      },
    },
  ],
};
