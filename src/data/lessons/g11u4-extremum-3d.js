import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g11u4-extremum-3d',
  topicId: 'g11-u4-extremum-3d',
  grade: 11,
  units: 4,
  emoji: '📦',
  title: 'בעיות ערך קיצון — כולל תיבה',
  subtitle: 'מקסימום ומינימום בבעיות מהחיים, במישור ובמרחב',
  sections: [
    {
      id: 'recipe',
      emoji: '📋',
      title: 'המתכון',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'חמישה צעדים',
          md: m`**1.** מגדירים משתנה $x$.

**2.** כותבים את הגודל שרוצים למקסם/למזער **כפונקציה של $x$ בלבד** (משתמשים באילוץ כדי להיפטר ממשתנים נוספים).

**3.** קובעים **תחום** הגיוני (אורכים חיוביים!).

**4.** גוזרים ומשווים ל-$0$.

**5.** בודקים את סוג הקיצון — **ובתחום סגור גם את הקצוות**.`,
        },
        {
          type: 'steps',
          title: 'סכום שני מספרים חיוביים 20. מתי המכפלה שלהם מקסימלית?',
          steps: [
            { math: m`x,\ 20-x`, note: 'משתנה, ומהאילוץ — המספר השני.' },
            { math: m`P(x)=x(20-x)=20x-x^2`, note: 'הגודל כפונקציה של x.' },
            { math: m`P'(x)=20-2x=0\ \Rightarrow\ x=${c(GREEN, '10')}`, note: 'גוזרים.' },
            { math: m`P''=-2<0`, note: 'מקסימום. שני המספרים 10, והמכפלה 100.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'מלבן שהיקפו 40 ס"מ. מה השטח המקסימלי שלו (בסמ"ר)?',
        answer: 100,
        hint: m`צלעות $x$ ו-$20-x$. השטח $x(20-x)$.`,
        explain: m`המקסימום ב-$x=10$ — ריבוע $10\times10=100$ סמ"ר.`,
      },
    },
    {
      id: 'box-formulas',
      emoji: '🧊',
      title: 'תיבה: שלוש נוסחאות',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: m`תיבה $a\times b\times c$ ($c$ = הגובה)`,
          md: m`**נפח**: $V=abc$

**שטח פנים** (6 פאות): $2(ab+ac+bc)$

**שטח מעטפת** (4 פאות צד, בלי בסיסים): $2c(a+b)$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`תיבה עם בסיס $3\times4$ וגובה $5$. מה שטח המעטפת?`,
        answer: 70,
        hint: m`$2c(a+b)=2\cdot5\cdot(3+4)$`,
        explain: m`$10\times7=70$`,
      },
    },
    {
      id: 'open-box',
      emoji: '✂️',
      title: 'תיבה פתוחה מגיליון',
      blocks: [
        {
          type: 'boxopt',
          L: 12,
          caption: 'גיליון 12×12. גוזרים ריבוע בצד x מכל פינה ומקפלים. חפשו את הנפח הגדול ביותר:',
        },
        {
          type: 'steps',
          title: 'ובחשבון',
          steps: [
            { math: m`V(x)=x(12-2x)^2,\quad 0<x<6`, note: m`גובה $x$, בסיס ריבועי $12-2x$. התחום — כדי שכל הממדים חיוביים.` },
            { math: m`V'(x)=(12-2x)(12-6x)`, note: 'גוזרים (כלל המכפלה) ומוציאים גורם משותף.' },
            { math: m`x=${c(GREEN, '2')}\quad ${c(VIOLET, 'x\\neq6')}`, note: m`$x=6$ מחוץ לתחום (אין בסיס).` },
            { math: m`V(2)=2\cdot8^2=${c(GREEN, '128')}`, note: 'הנפח המקסימלי.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'x =',
        prompt: 'מגיליון ריבועי 18×18 גוזרים ריבועים בצד x מהפינות. באיזה x הנפח מקסימלי?',
        answer: 3,
        hint: m`$V=x(18-2x)^2$. בדוגמה עם 12 יצא $\frac{12}{6}$...`,
        explain: m`$V'=(18-2x)(18-6x)=0\Rightarrow x=3$ (ו-$x=9$ מחוץ לתחום).`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: אילוץ נפח',
      blocks: [
        {
          type: 'steps',
          title: 'תיבה עם בסיס ריבועי ונפח 32, פתוחה מלמעלה. מתי שטח הפח מינימלי?',
          steps: [
            { math: m`x^2h=32\ \Rightarrow\ h=\frac{32}{x^2}`, note: 'צלע הבסיס x. מהאילוץ מבטאים את h.' },
            { math: m`S=x^2+4xh=x^2+\frac{128}{x}`, note: 'בסיס + 4 פאות צד (אין מכסה).' },
            { math: m`S'=2x-\frac{128}{x^2}=0\ \Rightarrow\ x^3=64`, note: 'גוזרים.' },
            { math: m`x=${c(GREEN, '4')},\ h=2`, note: 'מינימום (S′ עובר ממינוס לפלוס).' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'מה שטח הפח המינימלי בתיבה הזאת?',
        answer: 48,
        hint: m`$S(4)=4^2+\frac{128}{4}$`,
        explain: m`$16+32=48$`,
      },
    },
  ],
};
