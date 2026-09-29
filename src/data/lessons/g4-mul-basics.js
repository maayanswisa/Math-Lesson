import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g4-mul-basics',
  topicId: 'g4-mul-basics',
  grade: 4,
  emoji: '✖️',
  title: 'כפל מספרים טבעיים',
  subtitle: 'כפל דו-ספרתי, חוק הפילוג, וטריקים חכמים',
  sections: [
    {
      id: 'area',
      emoji: '🟩',
      title: 'כפל במלבן',
      blocks: [
        {
          type: 'area',
          caption: m`מפרקים: $23=20+3$ ו-$14=10+4$. לחצו על כל חלק:`,
          rows: ['20', '3'],
          cols: ['10', '4'],
          cells: [
            ['200', '80'],
            ['30', '12'],
          ],
          result: m`23\times14=200+80+30+12=322`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $32\times14$?`,
        answer: 448,
        hint: m`$32\times10+32\times4$`,
        explain: m`$320+128=448$`,
      },
    },
    {
      id: 'distributive',
      emoji: '🧠',
      title: 'חוק הפילוג',
      blocks: [
        {
          type: 'steps',
          title: m`$32\times19$`,
          steps: [
            { math: m`32\times${c(VIOLET, '(20-1)')}`, note: '19 קרוב ל-20.' },
            { math: m`640-32`, note: 'חוק הפילוג.' },
            { math: c(GREEN, '608'), note: 'הרבה יותר קל!' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`חשבו: $25\times99$`,
        answer: 2475,
        hint: m`$25\times100-25$`,
        explain: m`$2{,}500-25=2{,}475$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: להגדיל ולהקטין',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'פי 2 ופחות פי 2',
          md: m`$25\times36=100\times9=900$ — הכפלנו את 25 פי 4, וחילקנו את 36 ב-4. המכפלה לא השתנתה!

זכרו גם: כפול $0$ — תמיד $0$. כפול $1$ — לא משתנה.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`חשבו בדרך הקלה: $50\times48$`,
        answer: 2400,
        hint: m`$100\times24$`,
        explain: m`$50\times48=100\times24=2{,}400$`,
      },
    },
  ],
};
