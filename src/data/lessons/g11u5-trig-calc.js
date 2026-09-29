import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g11u5-trig-calc',
  topicId: 'g11-u5-trig-calc',
  grade: 11,
  units: 5,
  emoji: '📐',
  title: 'חדו״א של פונקציות טריגונומטריות',
  subtitle: 'למה רדיאנים, הנגזרות, והאינטגרלים',
  sections: [
    {
      id: 'limit',
      emoji: '🔍',
      title: 'הגבול החשוב',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'עובדת היסוד',
          md: m`$$\lim_{x\to0}\frac{\sin x}{x}=1$$

**רק ברדיאנים!** במעלות הגבול הוא $\frac{\pi}{180}$ — ולכן בחדו״א עובדים ברדיאנים.`,
        },
        {
          type: 'steps',
          title: 'קרוב לאפס, סינוס ≈ הזווית',
          steps: [
            { math: m`\frac{\sin0.1}{0.1}\approx0.998`, note: 'כמעט 1.' },
            { math: m`\frac{\sin0.01}{0.01}\approx${c(GREEN, '0.99998')}`, note: 'עוד יותר קרוב.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מהו $\lim_{x\to0}\frac{\sin3x}{x}$?`,
        answer: 3,
        hint: m`$\frac{\sin3x}{x}=3\cdot\frac{\sin3x}{3x}$`,
        explain: m`$3\cdot1=3$`,
      },
    },
    {
      id: 'derivatives',
      emoji: '📉',
      title: 'הנגזרות',
      blocks: [
        {
          type: 'tangent',
          fn: 'sin',
          showDeriv: true,
          x: 1,
          caption: m`הזיזו את הנקודה על $\sin x$. שיפוע המשיק — הוא בדיוק הגובה של העקומה הצהובה, $\cos x$:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שלוש נגזרות',
          md: m`$(\sin x)'=\cos x$

$(\cos x)'=-\sin x$

$(\tan x)'=\frac{1}{\cos^2x}$

ועם פנימית לינארית: $\big(\sin(ax+b)\big)'=a\cos(ax+b)$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהי הנגזרת של $f(x)=\sin(3x)\cdot x$?`,
        options: [m`$3\cos(3x)$`, m`$\sin(3x)+3x\cos(3x)$`, m`$3x\cos(3x)$`, m`$\cos(3x)+x\sin(3x)$`],
        answer: 1,
        hint: m`כלל המכפלה, ו-$(\sin3x)'=3\cos3x$.`,
        explain: m`$\sin(3x)\cdot1+x\cdot3\cos(3x)$`,
      },
    },
    {
      id: 'extremum',
      emoji: '⛰️',
      title: 'קיצון — לפעמים בלי גזירה',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'קיצור דרך',
          md: m`$\sin$ מקסימלי ($1$) כשהארגומנט $\frac{\pi}{2}$. למשל, שטח משולש $\frac12ab\sin\gamma$ עם $a,b$ קבועים — מקסימלי כש-$\gamma=90°$. בלי נגזרת!`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`שתי צלעות במשולש הן $6$ ו-$8$. מה השטח המקסימלי האפשרי?`,
        answer: 24,
        hint: m`$\frac12\cdot6\cdot8\cdot\sin\gamma$, ו-$\sin\gamma\le1$.`,
        explain: m`כש-$\gamma=90°$: $\frac12\cdot48=24$.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: אינטגרלים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'הפוך מהנגזרות',
          md: m`$\int\cos x\,dx=\sin x+C$

$\int\sin x\,dx=-\cos x+C$`,
        },
        {
          type: 'steps',
          title: m`השטח מתחת לקשת אחת של $\sin x$`,
          steps: [
            { math: m`\int_0^{\pi}\sin x\,dx=\big[-\cos x\big]_0^{\pi}`, note: 'קדומה.' },
            { math: m`-\cos\pi-(-\cos0)=1+1=${c(GREEN, '2')}`, note: 'שטח של 2 בדיוק!' },
          ],
        },
        {
          type: 'card',
          tone: 'warn',
          title: m`ומ-$0$ עד $2\pi$?`,
          md: m`$\int_0^{2\pi}\sin x\,dx=${c(VIOLET, '0')}$ — הקשת העליונה והתחתונה מבטלות. **השטח** שם הוא $4$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`חשבו $\int_0^{\pi/2}\cos x\,dx$`,
        answer: 1,
        hint: m`$[\sin x]_0^{\pi/2}$`,
        explain: m`$\sin\frac{\pi}{2}-\sin0=1$`,
      },
    },
  ],
};
