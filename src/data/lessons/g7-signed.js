import { c, GREEN, m, RED } from './tex.js';

export default {
  id: 'g7-signed',
  topicId: 'g7-signed',
  grade: 7,
  emoji: '↔️',
  title: 'חיבור וחיסור מספרים מכוונים',
  subtitle: 'תנועה על ציר המספרים — וחיסור שהופך לחיבור',
  sections: [
    {
      id: 'add',
      emoji: '🚶',
      title: 'חיבור = הליכה על הציר',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'לאן הולכים?',
          md: m`מחברים מספר **חיובי** — זזים **ימינה** ➡️

מחברים מספר **שלילי** — זזים **שמאלה** ⬅️`,
        },
        {
          type: 'signed',
          caption: 'שנו את נקודת ההתחלה ואת המספר שמחברים. לאן מגיעים?',
          a: 3,
          b: -5,
          allowSub: false,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $-4+7$?`,
        answer: 3,
        hint: m`מתחילים ב-$-4$ וזזים 7 צעדים ימינה.`,
        explain: m`$-4\to-3\to\dots\to3$. התשובה $3$.`,
      },
    },
    {
      id: 'signs',
      emoji: '⚖️',
      title: 'סימנים שונים: מי חזק יותר?',
      blocks: [
        {
          type: 'text',
          md: m`דמיינו $+$ כמטבע של שקל ו-$-$ כחוב של שקל. $(-7)+3$: חוב של 7 ומטבעות של 3 — שלושה מבטלים שלושה, ונשאר חוב של 4.`,
        },
        {
          type: 'steps',
          title: m`$(-7)+3$`,
          steps: [
            { math: m`|{-7}|=7,\ \ |3|=3`, note: 'מסתכלים על הערכים המוחלטים.' },
            { math: m`7-3=4`, note: 'מחסרים את הקטן מהגדול.' },
            { math: c(RED, '-4'), note: 'הסימן — של מי שהיה "חזק" יותר (ה-7, שלילי).' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $(-15)+6$?`,
        answer: -9,
        hint: 'חוב של 15, מטבעות של 6. מה נשאר?',
        explain: m`$15-6=9$, והסימן של ה-15 (שלילי): $-9$.`,
      },
    },
    {
      id: 'subtract',
      emoji: '🔄',
      title: 'חיסור = חיבור הנגדי',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'הכלל הקסום',
          md: m`$$a-b=a+(-b)$$
במקום לחסר — מחברים את ה**נגדי**. לכן חיסור של שלילי הוא חיבור: $3-(-5)=3+5=${c(GREEN, '8')}$`,
        },
        {
          type: 'signed',
          caption: 'עברו ל"חיסור −" ובחרו מספר שלילי. לאיזה כיוון זזים?',
          a: 3,
          b: -5,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $-2-(-9)$?`,
        answer: 7,
        hint: m`$-(-9)$ הופך ל-$+9$.`,
        explain: m`$-2-(-9)=-2+9=7$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: שרשרת',
      blocks: [
        {
          type: 'steps',
          title: m`$-3+8-(-2)-10$`,
          steps: [
            { math: m`-3+8+2-10`, note: 'הופכים כל חיסור לחיבור הנגדי.' },
            { math: m`${c(GREEN, '(8+2)')}+${c(RED, '(-3-10)')}`, note: 'מקבצים חיוביים לחוד ושליליים לחוד.' },
            { math: m`10+(-13)=${c(RED, '-3')}`, note: 'וחיבור אחד אחרון.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $6-(-4)+(-12)-1$?`,
        answer: -3,
        hint: m`$6+4-12-1$`,
        explain: m`$6+4=10$, ו-$10-12-1=-3$.`,
      },
    },
  ],
};
