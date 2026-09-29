import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g11u5-trig-identities',
  topicId: 'g11-u5-trig-identities',
  grade: 11,
  units: 5,
  emoji: '🔣',
  title: 'זהויות טריגונומטריות ויישומן',
  subtitle: 'סכום והפרש זוויות, זווית כפולה, וגאומטריה במרחב',
  sections: [
    {
      id: 'unit',
      emoji: '⭕',
      title: 'מעגל היחידה',
      blocks: [
        {
          type: 'unitcircle',
          caption: m`נקודה על מעגל היחידה בזווית $\alpha$ היא $(\cos\alpha,\sin\alpha)$. סובבו:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שתי עובדות יסוד',
          md: m`$\sin^2\alpha+\cos^2\alpha=1$ (פיתגורס במעגל!)

$\sin(-\alpha)=-\sin\alpha$

$\cos(-\alpha)=\cos\alpha$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$\sin\alpha=0.6$ ו-$\alpha$ חדה. מה $\cos\alpha$?`,
        answer: 0.8,
        tolerance: 0.001,
        hint: m`$\cos^2\alpha=1-0.36$`,
        explain: m`$\cos\alpha=\sqrt{0.64}=0.8$`,
      },
    },
    {
      id: 'sum',
      emoji: '➕',
      title: 'סכום והפרש זוויות',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'ארבע הזהויות',
          md: m`$\sin(A\pm B)=\sin A\cos B\pm\cos A\sin B$

$\cos(A\pm B)=\cos A\cos B\mp\sin A\sin B$`,
        },
        {
          type: 'card',
          tone: 'why',
          title: 'צריך לזכור את כולן?',
          md: m`לא! מוכיחים **אחת** ($\cos(A-B)$), ואת השאר מקבלים ממנה בעזרת $\sin(-x)=-\sin x$ ו-$\sin x=\cos(90°-x)$.`,
        },
        {
          type: 'steps',
          title: m`$\sin75°$ בלי מחשבון`,
          steps: [
            { math: m`\sin(${c(VIOLET, '45°+30°')})`, note: 'מפרקים לזוויות מוכרות.' },
            { math: m`\frac{\sqrt2}{2}\cdot\frac{\sqrt3}{2}+\frac{\sqrt2}{2}\cdot\frac12`, note: 'הזהות.' },
            { math: m`${c(GREEN, '\\frac{\\sqrt6+\\sqrt2}{4}')}\approx0.966`, note: 'בדקו במחשבון!' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהו $\cos(90°-x)$?`,
        options: [m`$\cos x$`, m`$\sin x$`, m`$-\sin x$`, m`$-\cos x$`],
        answer: 1,
        hint: m`$\cos90°\cos x+\sin90°\sin x$`,
        explain: m`$0\cdot\cos x+1\cdot\sin x=\sin x$`,
      },
    },
    {
      id: 'double',
      emoji: '✌️',
      title: 'זווית כפולה',
      blocks: [
        {
          type: 'unitcircle',
          mode: 'double',
          angle: 30,
          caption: m`הצהוב הוא $2\alpha$. בדקו שתמיד $\sin2\alpha=2\sin\alpha\cos\alpha$:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: m`מ-$A=B$ בזהות הסכום`,
          md: m`$\sin2A=2\sin A\cos A$

$\cos2A=\cos^2A-\sin^2A=2\cos^2A-1=1-2\sin^2A$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$\sin A=0.6$, $\cos A=0.8$. כמה זה $\sin2A$?`,
        answer: 0.96,
        tolerance: 0.001,
        hint: m`$2\cdot0.6\cdot0.8$`,
        explain: m`$\sin2A=0.96$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: גוף במרחב',
      blocks: [
        {
          type: 'steps',
          title: 'בתיבה, האלכסון של הבסיס 8 ס"מ, והאלכסון המרחבי יוצר איתו זווית של 30°. מה גובה התיבה?',
          steps: [
            { math: m`\tan30°=\frac{h}{8}`, note: 'משולש ישר-זווית: אלכסון הבסיס, הגובה, והאלכסון המרחבי.' },
            { math: m`h=8\tan30°=\frac{8}{\sqrt3}\approx${c(GREEN, '4.62')}`, note: 'טריגונומטריה פשוטה — במרחב.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ס"מ',
        prompt: 'בחרוט ישר, קו היוצר באורך 10 ס"מ יוצר זווית של 60° עם הבסיס. מה רדיוס הבסיס?',
        answer: 5,
        hint: m`$r=10\cos60°$`,
        explain: m`$10\cdot0.5=5$ ס"מ.`,
      },
    },
  ],
};
