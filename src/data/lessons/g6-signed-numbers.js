import { m } from './tex.js';

export default {
  id: 'g6-signed-numbers',
  topicId: 'g6-signed-numbers',
  grade: 6,
  emoji: '🌡️',
  title: 'מספרים מכוונים',
  subtitle: 'מתחת לאפס — טמפרטורות, קומות וחובות',
  sections: [
    {
      id: 'meet',
      emoji: '🥶',
      title: 'מספרים שליליים',
      blocks: [
        {
          type: 'text',
          md: m`מינוס $5$ מעלות, קומה $-2$ בחניון — אלה **מספרים שליליים**, משמאל לאפס בציר.`,
        },
        {
          type: 'signed',
          mode: 'opposite',
          a: 4,
          caption: 'הזיזו — המספר והנגדי שלו באותו מרחק מאפס:',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'מה קר יותר?',
        options: [m`$-8$ מעלות`, m`$-3$ מעלות`, m`$0$ מעלות`, m`$2$ מעלות`],
        answer: 0,
        hint: 'הכי שמאלה בציר.',
        explain: m`$-8$ הכי רחוק משמאל לאפס — הכי קר.`,
      },
    },
    {
      id: 'compare',
      emoji: '⚖️',
      title: 'השוואה',
      blocks: [
        {
          type: 'card',
          tone: 'warn',
          title: 'שלילי "גדול" הוא בעצם קטן',
          md: m`$-10<-2$ — כי $-10$ נמצא יותר שמאלה. כל מספר שלילי קטן מכל מספר חיובי.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'איזה סימן מתאים?',
        options: [m`$-6<-4$`, m`$-6>-4$`, m`$-6=-4$`, 'אי אפשר להשוות'],
        answer: 0,
        hint: 'מי יותר שמאלה?',
        explain: m`$-6$ שמאלה יותר, ולכן קטן.`,
      },
    },
    {
      id: 'move',
      emoji: '🏆',
      title: 'שלב הבוס: עולים ויורדים',
      blocks: [
        {
          type: 'signed',
          a: -3,
          b: 5,
          allowSub: false,
          caption: 'מתחילים במספר ומוסיפים. לאן מגיעים?',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'מעלות',
        prompt: m`בבוקר היו $-4$ מעלות, ועד הצהריים התחמם ב-$9$ מעלות. מה הטמפרטורה?`,
        answer: 5,
        hint: m`$-4+9$`,
        explain: m`$-4+9=5$ מעלות.`,
      },
    },
  ],
};
