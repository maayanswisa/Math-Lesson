import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g4-add-sub-million',
  topicId: 'g4-add-sub-million',
  grade: 4,
  emoji: '➕',
  title: 'חיבור וחיסור עד מיליון',
  subtitle: 'אסטרטגיות חכמות, חוק החילוף והקיבוץ',
  sections: [
    {
      id: 'strategy',
      emoji: '🧠',
      title: 'עיגול ותיקון',
      blocks: [
        {
          type: 'steps',
          title: m`$3{,}625+1{,}297$`,
          steps: [
            { math: m`1{,}297=${c(VIOLET, '1{,}300')}-3`, note: 'קרוב למספר עגול.' },
            { math: m`3{,}625+1{,}300=4{,}925`, note: 'מחברים את העגול.' },
            { math: m`4{,}925-3=${c(GREEN, '4{,}922')}`, note: 'ומתקנים.' },
          ],
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'בחיסור — מזיזים את שניהם',
          md: m`$5{,}002-1{,}998=5{,}004-2{,}000=3{,}004$ — מוסיפים לשניהם אותו מספר, וההפרש לא משתנה.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`חשבו: $8{,}450+2{,}999$`,
        answer: 11449,
        hint: m`$+3{,}000$ ואז $-1$`,
        explain: m`$11{,}450-1=11{,}449$`,
      },
    },
    {
      id: 'laws',
      emoji: '🔀',
      title: 'חילוף וקיבוץ',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שני חוקים',
          md: m`**חילוף**: $a+b=b+a$

**קיבוץ**: $(a+b)+c=a+(b+c)$ — מחפשים זוגות שיוצאים עגולים.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`חשבו בדרך הקלה: $2{,}350+4{,}800+650$`,
        answer: 7800,
        hint: m`$2{,}350+650=3{,}000$`,
        explain: m`$3{,}000+4{,}800=7{,}800$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: משוואה',
      blocks: [
        {
          type: 'text',
          md: m`$\square+45{,}000=120{,}000$ — מה חסר? הפעולה ההפוכה: $120{,}000-45{,}000=75{,}000$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$350{,}000-\square=128{,}000$. מה המספר החסר?`,
        answer: 222000,
        hint: m`$350{,}000-128{,}000$`,
        explain: m`$222{,}000$`,
      },
    },
  ],
};
