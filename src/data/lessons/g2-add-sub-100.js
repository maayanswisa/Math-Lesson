import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g2-add-sub-100',
  topicId: 'g2-add-sub-100',
  grade: 2,
  emoji: '➕',
  title: 'חיבור וחיסור עד 100',
  subtitle: 'עשרות עם עשרות, יחידות עם יחידות',
  sections: [
    {
      id: 'add',
      emoji: '➕',
      title: 'מחברים בחלקים',
      blocks: [
        {
          type: 'steps',
          title: m`$34+25$`,
          steps: [
            { math: m`${c(VIOLET, '30+20')}=50`, note: 'עשרות עם עשרות.' },
            { math: m`${c(VIOLET, '4+5')}=9`, note: 'יחידות עם יחידות.' },
            { math: m`50+9=${c(GREEN, '59')}`, note: 'מחברים הכול.' },
          ],
        },
        {
          type: 'baseten',
          hundreds: false,
          t: 3,
          o: 4,
          caption: 'נסו: התחילו ב-34 והוסיפו 2 מוטות ו-5 קוביות:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $42+36$?`,
        answer: 78,
        hint: m`$40+30$ ו-$2+6$`,
        explain: m`$70+8=78$`,
      },
    },
    {
      id: 'sub',
      emoji: '➖',
      title: 'מחסרים',
      blocks: [
        {
          type: 'steps',
          title: m`$67-24$`,
          steps: [
            { math: m`60-20=40`, note: 'עשרות.' },
            { math: m`7-4=3`, note: 'יחידות.' },
            { math: m`${c(GREEN, '43')}`, note: 'ביחד.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $85-43$?`,
        answer: 42,
        hint: m`$80-40$ ו-$5-3$`,
        explain: m`$40+2=42$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: בכמה יותר?',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שאלות השוואה',
          md: m`"לדנה 45 מדבקות ולרון 30. בכמה יותר יש לדנה?" — מחסרים: $45-30=15$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'בכיתה א׳ 28 תלמידים, ובכיתה ב׳ 33. בכמה תלמידים יותר בכיתה ב׳?',
        answer: 5,
        hint: m`$33-28$`,
        explain: m`$33-28=5$`,
      },
    },
  ],
};
