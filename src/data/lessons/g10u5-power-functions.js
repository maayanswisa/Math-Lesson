import { m } from './tex.js';

export default {
  id: 'g10u5-power-functions',
  topicId: 'g10-u5-power-functions',
  grade: 10,
  units: 5,
  emoji: '⚡',
  title: 'פונקציות חזקה ופולינומים',
  subtitle: 'זוגיות, סימטריה וריבוי שורשים',
  sections: [
    {
      id: 'power',
      emoji: '📈',
      title: 'חזקה זוגית ואי-זוגית',
      blocks: [
        {
          type: 'transformfn',
          families: ['square', 'cube'],
          caption: m`השוו בין $x^2$ ל-$x^3$ — מה הסימטריה של כל אחת?`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שתי משפחות',
          md: m`$n$ **זוגי**: $x^n$ זוגית — סימטרית לציר $y$, "פרסה".

$n$ **אי-זוגי**: $x^n$ אי-זוגית — סימטרית לראשית, "נחש".`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`לאן הולכת $f(x)=-x^5$ כש-$x\to\infty$?`,
        options: [m`$-\infty$`, m`$+\infty$`, m`$0$`, m`$1$`],
        answer: 0,
        hint: m`$x^5$ גדל מאוד, ויש מינוס.`,
        explain: m`$-\infty$`,
      },
    },
    {
      id: 'multiplicity',
      emoji: '✖️',
      title: 'ריבוי שורשים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'חוצה או נוגע?',
          md: m`שורש בריבוי **אי-זוגי** ← הגרף **חוצה** את הציר.

ריבוי **זוגי** ← **נוגע** וחוזר.

$f(x)=(x-1)^2(x+2)$: נוגע ב-$1$, חוצה ב-$-2$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה קורה לגרף של $f(x)=x^3(x-4)^2$ ב-$x=4$?`,
        options: ['נוגע בציר וחוזר', 'חוצה את הציר', 'אסימפטוטה', 'לא מוגדר'],
        answer: 0,
        hint: m`ריבוי $2$.`,
        explain: 'ריבוי זוגי — נוגע.',
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: סקיצה מהפירוק',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'שלושה צעדים',
          md: 'שורשים וריבויים ← התנהגות בקצוות לפי האיבר המוביל ← חוצה או נוגע בכל שורש.',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`$f(x)=-(x+1)(x-2)^2$. מה הסימן של $f$ עבור $x<-1$?`,
        options: ['חיובי', 'שלילי', 'אפס', 'משתנה'],
        answer: 0,
        hint: m`הציבו $x=-2$.`,
        explain: m`$-(-1)(16)=16>0$`,
      },
    },
  ],
};
