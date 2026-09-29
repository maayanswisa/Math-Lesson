import { m } from './tex.js';

export default {
  id: 'g11u4-normal-regression',
  topicId: 'g11-u4-normal-regression',
  grade: 11,
  units: 4,
  emoji: '📊',
  title: 'תרגול מסכם — סטטיסטיקה',
  subtitle: 'ציוני תקן, התפלגות נורמלית, מתאם ורגרסיה',
  sections: [
    {
      id: 'z',
      emoji: '📏',
      title: 'ציון תקן',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'תזכורת',
          md: m`$z=\frac{x-\bar x}{\sigma}$ — כמה סטיות תקן מעל (או מתחת) לממוצע. ללא יחידות, ולכן משווה בין קבוצות שונות.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`נועה קיבלה $80$ במתמטיקה (ממוצע $70$, סטיית תקן $5$) ו-$85$ באנגלית (ממוצע $75$, סטיית תקן $10$). באיזה מקצוע הישגה היחסי גבוה יותר?`,
        options: ['מתמטיקה', 'אנגלית', 'שווה', 'אי אפשר לדעת'],
        answer: 0,
        hint: m`$z_{\text{math}}=\frac{80-70}{5}$, $z_{\text{eng}}=\frac{85-75}{10}$`,
        explain: m`במתמטיקה $z=2$, באנגלית $z=1$ — במתמטיקה גבוה יותר.`,
      },
    },
    {
      id: 'normal',
      emoji: '🔔',
      title: 'התפלגות נורמלית',
      blocks: [
        {
          type: 'bell',
          mode: 'rule',
          mean: 70,
          sd: 10,
          caption: 'תזכורת: השטח מתחת לעקומה = אחוז הנתונים.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '%',
        prompt: m`בהתפלגות נורמלית, כמה אחוזים מהנתונים נמצאים מעל הממוצע?`,
        answer: 50,
        hint: 'העקומה סימטרית.',
        explain: 'חצי מהשטח מכל צד של הממוצע: 50%.',
      },
    },
    {
      id: 'corr',
      emoji: '🔗',
      title: 'מקדם מתאם',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'תזכורת',
          md: m`$-1\le r\le1$ · ללא יחידות · $r=0$ אין קשר **לינארי** · מתאם ≠ סיבתיות`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מדדו גובה בס"מ ומשקל בק"ג וקיבלו $r=0.7$. מה יהיה $r$ אם נמדוד את הגובה במטרים?`,
        options: [m`$0.007$`, m`$0.7$`, m`$70$`, m`$-0.7$`],
        answer: 1,
        hint: 'r ללא יחידות.',
        explain: m`שינוי יחידות לא משנה את $r$: עדיין $0.7$.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: ניבוי',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'תזכורת',
          md: m`$b=r\cdot\frac{S_y}{S_x}$ · הקו עובר דרך $(\bar x,\bar y)$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$\bar x=20$, $\bar y=50$, $r=-0.6$, $S_x=5$, $S_y=10$. מה הניבוי של $y$ עבור $x=25$?`,
        answer: 44,
        hint: m`$b=-0.6\cdot\frac{10}{5}=-1.2$`,
        explain: m`$\hat y=50-1.2\cdot5=44$`,
      },
    },
  ],
};
