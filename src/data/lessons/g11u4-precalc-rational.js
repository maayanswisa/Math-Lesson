import { c, GREEN, m, RED, VIOLET } from './tex.js';

export default {
  id: 'g11u4-precalc-rational',
  topicId: 'g11-u4-precalc-rational',
  grade: 11,
  units: 4,
  emoji: '🔭',
  title: 'קדם-אנליזה של פונקציה רציונלית',
  subtitle: m`לחקור את $f(x)=\frac{1}{g(x)}$ מתוך הגרף של $g$ — בלי נגזרת`,
  sections: [
    {
      id: 'domain',
      emoji: '🚧',
      title: 'תחום הגדרה ואסימפטוטות מאונכות',
      blocks: [
        {
          type: 'text',
          md: m`אי אפשר לחלק באפס. לכן $f(x)=\frac{1}{g(x)}$ מוגדרת בכל מקום **חוץ מהאפסים של** $g$.

ליד אפס של $g$, המכנה קטנטן — ו-$f$ "מתפוצצת" ל-$\pm\infty$. שם יש **אסימפטוטה מאונכת**.`,
        },
        {
          type: 'reciprocal',
          caption: m`$g$ מקווקו, $f=\frac1g$ בטורקיז. שנו את $q$ — מה קורה לאסימפטוטות כש-$g$ מפסיקה לחתוך את ציר $x$?`,
          a: 1,
          p: 0,
          q: -4,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`איפה האסימפטוטות המאונכות של $f(x)=\frac{1}{x^2-9}$?`,
        options: [m`$x=9$`, m`$x=\pm3$`, m`$x=0$`, 'אין אסימפטוטות'],
        answer: 1,
        hint: m`מתי $x^2-9=0$?`,
        explain: m`$x^2=9$, ולכן $x=\pm3$ — שם המכנה מתאפס.`,
      },
    },
    {
      id: 'sign',
      emoji: '➕',
      title: 'סימן ואפסים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שלוש עובדות',
          md: m`**אין חיתוך עם ציר $x$**: שבר שהמונה שלו $1$ לעולם לא שווה $0$.

**אותו סימן**: $f$ חיובית בדיוק איפה ש-$g$ חיובית, ושלילית איפה ש-$g$ שלילית.

**באינסוף**: אם $g\to\pm\infty$, אז $f\to0$ — אסימפטוטה אופקית $y=0$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`$g(x)=x^2-4$ שלילית בתחום $-2<x<2$. מה נכון לגבי $f=\frac{1}{g}$ בתחום הזה?`,
        options: ['f חיובית', 'f שלילית', 'f מתאפסת', 'f לא מוגדרת'],
        answer: 1,
        hint: m`לסימן של $\frac1g$ ושל $g$ יש קשר פשוט.`,
        explain: m`$f$ ו-$g$ תמיד באותו סימן — ולכן $f$ שלילית שם.`,
      },
    },
    {
      id: 'monotone',
      emoji: '🔃',
      title: 'מונוטוניות הפוכה',
      blocks: [
        {
          type: 'text',
          md: m`כשהמכנה **גדל**, השבר **קטן**. לכן בתחום שבו $g$ עולה (ואינה מתאפסת), $f$ **יורדת** — ולהפך.`,
        },
        {
          type: 'steps',
          title: m`$g(x)=x^2+1$ ← $f(x)=\frac{1}{x^2+1}$`,
          steps: [
            { math: m`g(x)>0`, note: 'ל-g אין אפסים — ל-f אין אסימפטוטה מאונכת, והיא חיובית תמיד.' },
            { math: m`g_{\min}=g(0)=1`, note: 'מינימום של g בקודקוד.' },
            { math: m`f_{\max}=f(0)=${c(GREEN, '1')}`, note: 'ולכן שם מקסימום של f — הפוך!' },
            { math: m`x\to\pm\infty:\ f\to${c(VIOLET, '0')}`, note: 'אסימפטוטה אופקית y=0.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`$g$ יורדת בתחום $x<3$ וחיובית שם. מה עושה $f=\frac{1}{g}$ בתחום הזה?`,
        options: ['עולה', 'יורדת', 'קבועה', 'אי אפשר לדעת'],
        answer: 0,
        hint: 'מכנה קטן — שבר...?',
        explain: 'המכנה קטן, ולכן השבר גדל: f עולה.',
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: סקיצה מלאה',
      blocks: [
        {
          type: 'steps',
          title: m`$f(x)=\frac{1}{(x-1)^2}$`,
          steps: [
            { math: m`x\neq1`, note: 'תחום: g מתאפסת ב-1 — אסימפטוטה מאונכת x=1.' },
            { math: m`f>0`, note: 'g ריבוע — תמיד חיובית (חוץ מ-1), אז גם f.' },
            { math: m`x<1:\ g\searrow\ \Rightarrow\ f\nearrow`, note: 'משמאל ל-1: g יורדת, f עולה.' },
            { math: m`x>1:\ g\nearrow\ \Rightarrow\ f\searrow`, note: 'מימין ל-1: g עולה, f יורדת.' },
            { math: m`y=${c(RED, '0')}`, note: 'באינסוף f שואפת ל-0.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`כמה נקודות חיתוך עם ציר $x$ יש ל-$f(x)=\frac{1}{x^2-5x+6}$?`,
        options: ['0', '1', '2', '3'],
        answer: 0,
        hint: 'מונה 1...',
        explain: m`שבר עם מונה $1$ לעולם אינו $0$ — אין חיתוך עם ציר $x$. (ל-$g$ יש שני אפסים — אבל אצל $f$ אלה **אסימפטוטות**.)`,
      },
    },
  ],
};
