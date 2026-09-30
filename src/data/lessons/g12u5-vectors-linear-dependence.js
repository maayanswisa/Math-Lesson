import { m } from './tex.js';

export default {
  id: 'g12u5-vectors-linear-dependence',
  topicId: 'g12-u5-vectors-linear-dependence',
  grade: 12,
  units: 5,
  emoji: '🔗',
  title: 'תלות לינארית',
  subtitle: 'צירוף לינארי ויחידות ההצגה',
  sections: [
    {
      id: 'combo',
      emoji: '🧩',
      title: 'צירוף לינארי',
      blocks: [
        {
          type: 'vectors',
          mode: 'add',
          caption: m`כל וקטור במישור — צירוף של $\vec u$ ו-$\vec v$:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'ההגדרה',
          md: m`$$\vec w=\alpha\vec u+\beta\vec v$$

במישור: שני וקטורים **לא מקבילים** "פורסים" את כל המישור, וההצגה **יחידה**.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`$\vec u=(1,0)$, $\vec v=(0,1)$. מה המקדמים של $\vec w=(3,-2)$?`,
        options: [m`$\alpha=3,\ \beta=-2$`, m`$\alpha=-2,\ \beta=3$`, m`$\alpha=3,\ \beta=2$`, 'אין הצגה'],
        answer: 0,
        hint: 'רכיב אחר רכיב.',
        explain: m`$(3,-2)=3(1,0)-2(0,1)$`,
      },
    },
    {
      id: 'dependence',
      emoji: '⚖️',
      title: 'תלויים או לא',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'תלות לינארית',
          md: m`במישור: שני וקטורים **תלויים** $\iff$ מקבילים: $\vec v=t\vec u$.

במרחב: שלושה וקטורים תלויים $\iff$ נמצאים באותו מישור.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`האם $(2,-6)$ ו-$(-1,3)$ תלויים לינארית?`,
        options: [m`כן — $(2,-6)=-2(-1,3)$`, 'לא', 'רק במרחב', 'אי אפשר לדעת'],
        answer: 0,
        hint: 'האם אחד כפולה של השני?',
        explain: 'מקבילים — תלויים.',
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: השוואת מקדמים',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'יחידות ההצגה',
          md: m`אם $\vec u,\vec v$ בלתי תלויים ו-$\alpha\vec u+\beta\vec v=\gamma\vec u+\delta\vec v$, אז $\alpha=\gamma$ ו-$\beta=\delta$. כך מוכיחים יחסי חלוקה!`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$\vec u,\vec v$ בלתי תלויים, ו-$(t-1)\vec u+3\vec v=2\vec u+(s+1)\vec v$. מה $t+s$?`,
        answer: 5,
        hint: m`$t-1=2$, $3=s+1$`,
        explain: m`$t=3$, $s=2$ ← $5$`,
      },
    },
  ],
};
