import { c, GREEN, m, RED, VIOLET } from './tex.js';

export default {
  id: 'g8-pythagoras',
  topicId: 'g8-pythagoras',
  grade: 8,
  emoji: '📐',
  title: 'משפט פיתגורס וגליל',
  subtitle: 'הקשר בין צלעות המשולש ישר-הזווית, ונפח ושטח של גליל',
  sections: [
    {
      id: 'names',
      emoji: '🏷️',
      title: 'ניצבים ויתר',
      blocks: [
        {
          type: 'text',
          md: m`במשולש **ישר-זווית**:
- שתי הצלעות שיוצרות את הזווית הישרה — **ניצבים** ($a$, $b$)
- הצלע שמול הזווית הישרה — **יתר** ($c$). היא **תמיד הארוכה ביותר**.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'במשולש ישר-זווית הצלעות הן 6, 8 ו-10. מה היתר?',
        options: ['6', '8', '10', 'אי אפשר לדעת'],
        answer: 2,
        hint: 'היתר הוא תמיד הצלע הארוכה ביותר.',
        explain: '10 — הצלע הארוכה ביותר, מול הזווית הישרה.',
      },
    },
    {
      id: 'theorem',
      emoji: '✨',
      title: 'המשפט',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'משפט פיתגורס',
          md: m`$$a^2+b^2=c^2$$
ריבוע ניצב + ריבוע ניצב = ריבוע היתר.`,
        },
        {
          type: 'pythagoras',
          caption: 'שנו את הניצבים וראו איך מחשבים את היתר. נסו למצוא מספרים שבהם היתר יוצא שלם!',
          a: 3,
          b: 4,
        },
      ],
      challenge: {
        type: 'number',
        label: 'c =',
        prompt: 'הניצבים במשולש ישר-זווית הם 6 ו-8. מה אורך היתר?',
        answer: 10,
        hint: m`$6^2+8^2=36+64$`,
        explain: m`$c^2=100$, ולכן $c=\sqrt{100}=10$.`,
      },
    },
    {
      id: 'leg',
      emoji: '🔎',
      title: 'מוצאים ניצב חסר',
      blocks: [
        {
          type: 'steps',
          title: 'היתר 13 וניצב אחד 5. מה הניצב השני?',
          steps: [
            { math: m`5^2+b^2=13^2`, note: 'כותבים את המשפט.' },
            { math: m`25+b^2=169`, note: 'מחשבים ריבועים.' },
            { math: m`b^2=169${c(RED, '-25')}=144`, note: m`מורידים 25 משני הצדדים — **מחסרים**, לא מחברים!` },
            { math: m`b=\sqrt{144}=${c(GREEN, '12')}`, note: 'שורש.' },
          ],
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'לזכור',
          md: m`מחפשים **יתר**? **מחברים** ריבועים. מחפשים **ניצב**? **מחסרים** מריבוע היתר.`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'b =',
        prompt: 'היתר במשולש ישר-זווית הוא 10, וניצב אחד 6. מה הניצב השני?',
        answer: 8,
        hint: m`$b^2=10^2-6^2=100-36$`,
        explain: m`$b^2=64$, ולכן $b=8$.`,
      },
    },
    {
      id: 'cylinder',
      emoji: '🥫',
      title: 'גליל',
      blocks: [
        {
          type: 'text',
          md: m`**גליל** (כמו קופסת שימורים) = שני עיגולים זהים + "עטיפה" מלבנית.`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'נוסחאות',
          md: m`**נפח** = שטח הבסיס × גובה $=\pi r^2\cdot h$

**שטח פנים** = שני בסיסים + עטיפה $=2\pi r^2+2\pi r h$`,
        },
        {
          type: 'card',
          tone: 'why',
          title: 'למה העטיפה היא $2\\pi r h$?',
          md: m`פורשים אותה — מקבלים **מלבן**. הרוחב שלו = היקף העיגול ($2\pi r$), והגובה $h$.`,
        },
        {
          type: 'steps',
          title: m`נפח גליל עם $r=3$, $h=10$`,
          steps: [
            { math: m`\pi\cdot3^2\cdot10`, note: 'מציבים.' },
            { math: m`=${c(VIOLET, '90\\pi')}\approx${c(GREEN, '282.6')}`, note: m`עם $\pi\approx3.14$.` },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה נפח גליל עם רדיוס $2$ וגובה $5$?`,
        options: [m`$10\pi$`, m`$20\pi$`, m`$40\pi$`, m`$100\pi$`],
        answer: 1,
        hint: m`$\pi r^2h=\pi\cdot2^2\cdot5$`,
        explain: m`$\pi\cdot4\cdot5=20\pi$`,
      },
    },
  ],
};
