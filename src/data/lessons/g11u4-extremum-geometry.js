import { c, GREEN, m } from './tex.js';

export default {
  id: 'g11u4-extremum-geometry',
  topicId: 'g11-u4-extremum-geometry',
  grade: 11,
  units: 4,
  emoji: '📐',
  title: 'בעיות קיצון גאומטריות',
  subtitle: 'דמיון משולשים, פיתגורס ומעגל — כדי לבטא הכל במשתנה אחד',
  sections: [
    {
      id: 'similarity',
      emoji: '🔺',
      title: 'מלבן חסום במשולש — דמיון',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'המשולש הקטן דומה לגדול',
          md: m`מלבן שבסיסו על בסיס המשולש (בסיס $a$, גובה $h$). אם גובה המלבן $y$ ורוחבו $w$, אז מעליו נשאר משולש קטן בגובה $h-y$, **דומה** למשולש כולו:

$$\frac{w}{a}=\frac{h-y}{h}\ \Rightarrow\ w=a\cdot\frac{h-y}{h}$$`,
        },
        {
          type: 'steps',
          title: 'משולש עם בסיס 12 וגובה 8',
          steps: [
            { math: m`w=12\cdot\frac{8-y}{8}=1.5(8-y)`, note: 'הרוחב מתוך הדמיון.' },
            { math: m`S(y)=y\cdot1.5(8-y)=12y-1.5y^2`, note: 'שטח המלבן.' },
            { math: m`S'(y)=12-3y=0\ \Rightarrow\ y=4`, note: 'חצי מגובה המשולש!' },
            { math: m`S(4)=${c(GREEN, '24')}`, note: 'בדיוק חצי משטח המשולש (48).' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'שטח =',
        prompt: m`במשולש עם בסיס $10$ וגובה $6$ חוסמים מלבן שבסיסו על בסיס המשולש. מהו השטח המקסימלי של המלבן?`,
        answer: 15,
        hint: 'המקסימום — חצי משטח המשולש.',
        explain: m`$w=10\cdot\frac{6-y}{6}$, $S=\frac{10}{6}y(6-y)$, מקסימום ב-$y=3$: $S=\frac{10}{6}\cdot9=15$.`,
      },
    },
    {
      id: 'pythagoras',
      emoji: '📏',
      title: 'פיתגורס',
      blocks: [
        {
          type: 'steps',
          title: 'משולש ישר-זווית עם יתר 10: מתי השטח מקסימלי?',
          steps: [
            { math: m`x,\ \sqrt{100-x^2}`, note: 'הניצבים, לפי פיתגורס.' },
            { math: m`S=\frac12x\sqrt{100-x^2}`, note: 'השטח כפונקציה של x.' },
            { math: m`S^2=\frac14x^2(100-x^2)\ \Rightarrow\ x^2=50`, note: 'נוח לגזור את ריבוע השטח (אותו מקסימום).' },
            { math: m`S=\frac12\cdot50=${c(GREEN, '25')}`, note: 'משולש ישר-זווית שווה-שוקיים.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'שטח =',
        prompt: m`מלבן חסום במעגל שרדיוסו $5$ (האלכסון הוא קוטר). מהו השטח המקסימלי של המלבן?`,
        answer: 50,
        hint: m`צלעות $x$ ו-$\sqrt{100-x^2}$. המקסימום — ריבוע.`,
        explain: m`$S^2=x^2(100-x^2)$, מקסימום ב-$x^2=50$: $S=\sqrt{50}\cdot\sqrt{50}=50$.`,
      },
    },
    {
      id: 'circle',
      emoji: '⭕',
      title: 'גזרה של מעגל',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'היקף ושטח של גזרה',
          md: m`גזרה ברדיוס $r$ עם קשת באורך $L$: ההיקף $2r+L$, והשטח $\frac{rL}{2}$.`,
        },
        {
          type: 'steps',
          title: 'גזרה שהיקפה 20 — מתי השטח מקסימלי?',
          steps: [
            { math: m`L=20-2r`, note: 'מתוך ההיקף.' },
            { math: m`S(r)=\frac{r(20-2r)}{2}=10r-r^2`, note: 'שטח כפונקציה של r.' },
            { math: m`S'(r)=10-2r=0\ \Rightarrow\ r=5,\ S=${c(GREEN, '25')}`, note: 'מקסימום.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'שטח =',
        prompt: m`היקף גזרה של מעגל הוא $16$. מהו השטח המקסימלי של הגזרה?`,
        answer: 16,
        hint: m`$S(r)=\frac{r(16-2r)}{2}=8r-r^2$`,
        explain: m`$S'=8-2r=0\Rightarrow r=4$, ו-$S=32-16=16$.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: מלבן בחצי מעגל',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'קודקודים על חצי מעגל',
          md: m`חצי מעגל $y=\sqrt{R^2-x^2}$. מלבן שבסיסו על ציר $x$ (מ-$-x$ עד $x$) ושני קודקודיו העליונים על הקשת: רוחב $2x$, גובה $\sqrt{R^2-x^2}$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'שטח =',
        prompt: m`מלבן חסום בחצי מעגל שרדיוסו $4$ כמתואר. מהו השטח המקסימלי של המלבן?`,
        answer: 16,
        hint: m`$S=2x\sqrt{16-x^2}$; גוזרים את $S^2=4x^2(16-x^2)$.`,
        explain: m`$S^2=64x^2-4x^4$, נגזרת $128x-16x^3=0\Rightarrow x^2=8$. $S=2\sqrt8\cdot\sqrt8=16$.`,
      },
    },
  ],
};
