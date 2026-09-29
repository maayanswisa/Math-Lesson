import { c, GREEN, m, RED } from './tex.js';

export default {
  id: 'g7-pythagorean',
  topicId: 'g7-pythagorean',
  grade: 7,
  emoji: '📐',
  title: 'משפט פיתגורס ושימושיו',
  subtitle: 'הקשר בין צלעות משולש ישר-זווית — ומרחק במערכת צירים',
  sections: [
    {
      id: 'theorem',
      emoji: '✨',
      title: 'המשפט',
      blocks: [
        {
          type: 'text',
          md: m`במשולש **ישר-זווית**: שתי הצלעות שיוצרות את הזווית הישרה הן **ניצבים** ($a$, $b$), והצלע שמולה — הארוכה ביותר — היא **היתר** ($c$).`,
        },
        {
          type: 'pythagoras',
          caption: 'שנו את הניצבים. הריבוע על היתר שווה תמיד לסכום שני הריבועים האחרים:',
          a: 3,
          b: 4,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'משפט פיתגורס',
          md: m`$$a^2+b^2=c^2$$`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'c =',
        prompt: 'הניצבים במשולש ישר-זווית הם 5 ו-12. מה אורך היתר?',
        answer: 13,
        hint: m`$25+144$`,
        explain: m`$c^2=169$, ולכן $c=13$.`,
      },
    },
    {
      id: 'leg',
      emoji: '🔎',
      title: 'מוצאים ניצב',
      blocks: [
        {
          type: 'steps',
          title: 'יתר 10, ניצב 6. מה הניצב השני?',
          steps: [
            { math: m`6^2+b^2=10^2`, note: 'כותבים את המשפט.' },
            { math: m`b^2=100${c(RED, '-36')}=64`, note: 'מחפשים ניצב — **מחסרים**.' },
            { math: m`b=${c(GREEN, '8')}`, note: 'שורש.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'b =',
        prompt: 'היתר 17 וניצב אחד 8. מה הניצב השני?',
        answer: 15,
        hint: m`$289-64$`,
        explain: m`$b^2=225$, ולכן $b=15$.`,
      },
    },
    {
      id: 'coords',
      emoji: '🗺️',
      title: 'מרחק בין נקודות',
      blocks: [
        {
          type: 'coords',
          distance: true,
          x: -2,
          y: -1,
          x2: 2,
          y2: 2,
          caption: 'הקטע בין שתי נקודות הוא יתר של משולש ישר-זווית (הקווים הצהובים הם הניצבים). הזיזו את הנקודות:',
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'הניצבים',
          md: m`ניצב אופקי = ההפרש ב-$x$. ניצב אנכי = ההפרש ב-$y$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה המרחק בין $(1,1)$ ל-$(7,9)$?`,
        answer: 10,
        hint: m`ניצבים: $7-1=6$ ו-$9-1=8$.`,
        explain: m`$\sqrt{36+64}=\sqrt{100}=10$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: קיצור דרך',
      blocks: [
        {
          type: 'text',
          md: 'מגרש מלבני 30 על 40 מטר. נועה הולכת מפינה לפינה לאורך הצלעות. יואב חוצה באלכסון. כמה מטרים חוסך יואב?',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'מטר',
        prompt: 'כמה מטרים חוסך יואב?',
        answer: 20,
        hint: m`האלכסון: $\sqrt{30^2+40^2}$. נועה הולכת $30+40$.`,
        explain: m`אלכסון $\sqrt{2500}=50$. נועה: $70$. חיסכון: $70-50=20$ מטר.`,
      },
    },
  ],
};
