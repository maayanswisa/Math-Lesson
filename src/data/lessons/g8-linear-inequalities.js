import { c, GREEN, m, RED } from './tex.js';

const numberLine = (label, x, filled, dir) => {
  // ציר מספרים קטן: עיגול מלא/ריק בנקודה x (במיקום 150) וחץ לכיוון dir
  const arrow = dir === 'right' ? `<line x1='150' y1='30' x2='270' y2='30' stroke='#2d7a4f' stroke-width='5'/><polygon points='270,22 285,30 270,38' fill='#2d7a4f'/>` : `<line x1='30' y1='30' x2='150' y2='30' stroke='#2d7a4f' stroke-width='5'/><polygon points='30,22 15,30 30,38' fill='#2d7a4f'/>`;
  return `<div class='diagram-box'><svg viewBox='0 0 300 60' width='300' xmlns='http://www.w3.org/2000/svg' style='direction:ltr'><line x1='10' y1='30' x2='290' y2='30' stroke='#1a2b3c' stroke-width='1.5'/>${arrow}<circle cx='150' cy='30' r='8' fill='${filled ? '#2d7a4f' : 'white'}' stroke='#2d7a4f' stroke-width='3'/><text x='150' y='56' text-anchor='middle' font-size='13' fill='#1a2b3c'>${x}</text><text x='150' y='14' text-anchor='middle' font-size='12' font-weight='700' fill='#2d7a4f'>${label}</text></svg></div>`;
};

export default {
  id: 'g8-linear-inequalities',
  topicId: 'g8-linear-inequalities',
  grade: 8,
  emoji: '⚖️',
  title: 'אי-שוויונות ותחומי חיוביות',
  subtitle: 'פתרון אי-שוויון, הצגה על ציר המספרים, ומתי הישר מעל או מתחת לציר',
  sections: [
    {
      id: 'solve',
      emoji: '🔧',
      title: 'פותרים אי-שוויון',
      blocks: [
        {
          type: 'text',
          md: m`פותרים **כמו משוואה** — מבודדים את $x$. ההבדל היחיד:`,
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'כלל הזהב',
          md: m`כופלים או מחלקים ב**מספר שלילי**? **הופכים את כיוון הסימן**.`,
        },
        {
          type: 'steps',
          title: m`פותרים: $5-2x<11$`,
          steps: [
            { math: m`-2x<6`, note: 'מורידים 5 משני הצדדים.' },
            { math: m`x\ ${c(RED, '>')}\ \frac{6}{-2}`, note: m`מחלקים ב-$-2$ — **הופכים** את $<$ ל-$>$!` },
            { math: c(GREEN, 'x>-3'), note: m`בדיקה: $x=0$ → $5<11$ ✔️` },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה הפתרון של $-4x\ge20$?`,
        options: [m`$x\ge-5$`, m`$x\le-5$`, m`$x\ge5$`, m`$x\le5$`],
        answer: 1,
        hint: m`מחלקים ב-$-4$. מה קורה לסימן?`,
        explain: m`$x\le\frac{20}{-4}=-5$ — הכיוון התהפך.`,
      },
    },
    {
      id: 'number-line',
      emoji: '📏',
      title: 'מציירים על ציר המספרים',
      blocks: [
        {
          type: 'text',
          md: m`**עיגול ריק** ○ — המספר **לא** כלול ($<$ או $>$).
**עיגול מלא** ● — המספר **כלול** ($\le$ או $\ge$).

${numberLine('x > 2', 2, false, 'right')}

${numberLine('x ≤ 2', 2, true, 'left')}`,
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'טריק לזכור',
          md: m`הקו שמתחת ל-$\le$ "ממלא" את העיגול.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`איך מציגים את $x\ge-1$ על ציר המספרים?`,
        options: [
          'עיגול ריק על $-1$, חץ ימינה',
          'עיגול מלא על $-1$, חץ ימינה',
          'עיגול מלא על $-1$, חץ שמאלה',
          'עיגול ריק על $-1$, חץ שמאלה',
        ],
        answer: 1,
        hint: m`$\ge$ — המספר כלול. "גדול" — לאיזה כיוון בציר?`,
        explain: m`$\ge$ כולל את $-1$ (עיגול מלא), ו"גדול מ-" הולך ימינה.`,
      },
    },
    {
      id: 'sign',
      emoji: '🟢',
      title: 'מתי הפונקציה חיובית?',
      blocks: [
        {
          type: 'text',
          md: m`**תחום חיוביות** — ערכי $x$ שבהם $y>0$: הגרף **מעל** ציר $x$.
**תחום שליליות** — ערכי $x$ שבהם $y<0$: הגרף **מתחת** לציר $x$.`,
        },
        {
          type: 'line',
          caption: 'שנו את הישר וראו איך התחומים על ציר x משתנים:',
          lines: [{ m: 1, b: -2, editable: true }],
          signOf: 0,
        },
        {
          type: 'steps',
          title: m`תחומי חיוביות של $y=2x-6$`,
          steps: [
            { math: m`2x-6=0\ \Rightarrow\ x=3`, note: m`צעד 1: חיתוך עם ציר $x$ (מציבים $y=0$).` },
            { math: m`m=2>0`, note: 'צעד 2: השיפוע חיובי — הגרף עולה.' },
            { math: m`${c(GREEN, 'x>3')}:\ y>0\quad ${c(RED, 'x<3')}:\ y<0`, note: 'ישר עולה: חיובי מימין לחיתוך, שלילי משמאל.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהו תחום החיוביות של $y=-x+4$?`,
        options: [m`$x>4$`, m`$x<4$`, m`$x>-4$`, m`$x<-4$`],
        answer: 1,
        hint: m`חיתוך עם ציר $x$: $-x+4=0$. השיפוע שלילי — הגרף יורד.`,
        explain: m`החיתוך ב-$x=4$, והישר יורד — מעל הציר משמאל לחיתוך: $x<4$.`,
      },
    },
  ],
};
