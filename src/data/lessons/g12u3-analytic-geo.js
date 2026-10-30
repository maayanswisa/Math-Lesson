import { c, GREEN, m, SKY, VIOLET } from './tex.js';

export default {
  id: 'g12u3-analytic-geo',
  topicId: 'g12-u3-analytic-geo',
  grade: 12,
  units: 3,
  emoji: '📍',
  title: 'גאומטריה אנליטית — ישר',
  subtitle: 'מרחק, אמצע קטע, שיפוע, משוואת ישר, מקבילים, ניצבים ושטחים',
  sections: [
    {
      id: 'distance',
      emoji: '📏',
      title: 'מרחק בין שתי נקודות',
      blocks: [
        {
          type: 'coords',
          distance: true,
          x: 4,
          y: 3,
          x2: -2,
          y2: -1,
          caption: 'הזיזו את הנקודות. המרחק ביניהן הוא היתר במשולש ישר-זווית:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'נוסחת המרחק',
          md: m`$$d=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$$

זה משפט פיתגורס: ההפרש ב-$x$ וההפרש ב-$y$ הם הניצבים, והמרחק הוא היתר.`,
        },
        {
          type: 'steps',
          title: m`המרחק בין $A(1,2)$ לבין $B(7,10)$`,
          steps: [
            { math: m`7-1=6\qquad10-2=8`, note: 'ההפרשים.' },
            { math: m`d=\sqrt{6^2+8^2}=\sqrt{100}=${c(GREEN, '10')}`, note: 'משפט פיתגורס.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'd =',
        suffix: 'ק"מ',
        prompt: m`במפה (בק"מ): הבית בנקודה $(1,1)$ ובית הספר בנקודה $(4,5)$. מה המרחק באוויר?`,
        answer: 5,
        hint: m`$\sqrt{3^2+4^2}$`,
        explain: m`$\sqrt{9+16}=\sqrt{25}=5$ ק"מ`,
      },
    },
    {
      id: 'midpoint',
      emoji: '🎯',
      title: 'אמצע קטע',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'ממוצע של השיעורים',
          md: m`$$M=\left(\frac{x_1+x_2}{2},\ \frac{y_1+y_2}{2}\right)$$

שיעור $x$ של האמצע הוא הממוצע של שיעורי ה-$x$, ושיעור $y$ — הממוצע של שיעורי ה-$y$.`,
        },
        {
          type: 'steps',
          title: m`נתון $A(2,5)$, ו-$M(4,1)$ הוא אמצע הקטע $AB$. מצאו את $B$.`,
          steps: [
            { math: m`\frac{2+x}{2}=4\ \Rightarrow\ x=${c(SKY, '6')}`, note: 'משוואה לשיעור x.' },
            { math: m`\frac{5+y}{2}=1\ \Rightarrow\ y=${c(SKY, '-3')}`, note: 'משוואה לשיעור y.' },
            { math: m`B(6,-3)`, note: 'בדיקה: מ-A ל-M זזים 2 ימינה ו-4 למטה, וגם מ-M ל-B.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהו אמצע הקטע שבין $(-2,7)$ לבין $(6,3)$?`,
        options: [m`$(2,5)$`, m`$(4,10)$`, m`$(4,5)$`, m`$(2,2)$`],
        answer: 0,
        hint: 'ממוצע של שיעורי x, וממוצע של שיעורי y.',
        explain: m`$\frac{-2+6}{2}=2$ וגם $\frac{7+3}{2}=5$`,
      },
    },
    {
      id: 'slope',
      emoji: '⛷️',
      title: 'שיפוע',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'כמה עולים בכל צעד ימינה',
          md: m`$$m=\frac{y_2-y_1}{x_2-x_1}$$

- $m$ חיובי — הישר **עולה**. $m$ שלילי — **יורד**.
- $m=0$ — ישר **אופקי**.
- ישר **אנכי** — אין לו שיפוע (מחלקים באפס).`,
        },
        {
          type: 'line',
          lines: [{ m: 0.5, b: 1 }],
          points: [
            { x: 2, y: 2, label: '(2,2)' },
            { x: 4, y: 3, label: '(4,3)' },
          ],
          caption: m`ישר דרך $(2,2)$ ו-$(4,3)$: עולים $1$ בכל $2$ צעדים ימינה — שיפוע $\frac12$`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'm =',
        prompt: m`מה השיפוע של הישר שעובר דרך $(1,2)$ ודרך $(3,8)$?`,
        answer: 3,
        hint: m`$\frac{8-2}{3-1}$`,
        explain: m`$\frac{6}{2}=3$`,
      },
    },
    {
      id: 'equation',
      emoji: '✏️',
      title: 'משוואת הישר',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שתי צורות',
          md: m`$$y=mx+b$$

$m$ — השיפוע, $b$ — נקודת החיתוך עם ציר $y$.

ישר עם שיפוע $m$ שעובר דרך הנקודה $(x_1,y_1)$:

$$y-y_1=m(x-x_1)$$`,
        },
        {
          type: 'steps',
          title: m`משוואת הישר שעובר דרך $(2,2)$ ודרך $(4,3)$`,
          steps: [
            { math: m`m=\frac{3-2}{4-2}=\frac12`, note: 'קודם השיפוע.' },
            { math: m`y-2=\tfrac12(x-2)`, note: 'נקודה ושיפוע.' },
            { math: m`y=${c(GREEN, '\\tfrac12x+1')}`, note: 'פותחים סוגריים ומסדרים.' },
          ],
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'האם נקודה נמצאת על הישר?',
          md: m`מציבים את שיעורי הנקודה במשוואה. אם מתקבל שוויון — הנקודה על הישר.

הנקודה $(6,4)$ על $y=\tfrac12x+1$? $\tfrac12\cdot6+1=4$ ✓`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהי משוואת הישר שעובר דרך $(0,3)$ ודרך $(2,7)$?`,
        options: [m`$y=2x+3$`, m`$y=3x+2$`, m`$y=2x+7$`, m`$y=\frac12x+3$`],
        answer: 0,
        hint: m`$m=\frac{7-3}{2-0}$. הנקודה $(0,3)$ על ציר $y$.`,
        explain: m`$m=2$ ונקודת החיתוך עם ציר $y$ היא $3$: $y=2x+3$`,
      },
    },
    {
      id: 'parallel',
      emoji: '🛤️',
      title: 'מקבילים וניצבים',
      blocks: [
        {
          type: 'line',
          lines: [
            { m: 2, b: -1 },
            { m: -0.5, b: 4 },
          ],
          showIntersection: true,
          caption: m`שיפועים $2$ ו-$-\frac12$. המכפלה שלהם $-1$ — הישרים ניצבים:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'הכלל',
          md: m`- ישרים **מקבילים** — שיפועים שווים: $m_1=m_2$
- ישרים **ניצבים** — מכפלת השיפועים $-1$: $m_1\cdot m_2=-1$

שיפוע הניצב: הופכים את השבר ומחליפים סימן. ל-$3$ ← $-\frac13$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`כביש חדש צריך להיות ניצב לכביש $y=3x-2$ ולעבור בנקודה $(3,0)$. מהי משוואתו?`,
        options: [m`$y=-\frac13x+1$`, m`$y=3x-9$`, m`$y=-3x+9$`, m`$y=\frac13x-1$`],
        answer: 0,
        hint: m`שיפוע הניצב: $-\frac13$`,
        explain: m`$y-0=-\frac13(x-3)$, כלומר $y=-\frac13x+1$`,
      },
    },
    {
      id: 'intersection',
      emoji: '✖️',
      title: 'נקודות חיתוך',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שלושה סוגים',
          md: m`- **עם ציר $y$** — מציבים $x=0$.
- **עם ציר $x$** — מציבים $y=0$.
- **של שני ישרים** — משווים את שני ה-$y$ ופותרים.`,
        },
        {
          type: 'steps',
          title: m`החיתוך של $y=2x-1$ עם $y=-x+5$`,
          steps: [
            { math: m`2x-1=-x+5`, note: 'משווים.' },
            { math: m`3x=6\ \Rightarrow\ x=${c(VIOLET, '2')}`, note: '' },
            { math: m`y=2\cdot2-1=${c(VIOLET, '3')}`, note: m`נקודת החיתוך: $(2,3)$` },
          ],
        },
        {
          type: 'line',
          lines: [
            { m: 2, b: -1 },
            { m: -1, b: 5 },
          ],
          showIntersection: true,
          caption: m`$y=2x-1$ ו-$y=-x+5$ נחתכים ב-$(2,3)$:`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`היכן הישר $y=-2x+6$ חותך את ציר $x$?`,
        options: [m`$(3,0)$`, m`$(0,6)$`, m`$(-3,0)$`, m`$(6,0)$`],
        answer: 0,
        hint: m`על ציר $x$ — $y=0$.`,
        explain: m`$0=-2x+6$, ולכן $x=3$: הנקודה $(3,0)$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: שטח במערכת צירים',
      blocks: [
        {
          type: 'text',
          md: m`הישר $y=-2x+8$ והצירים יוצרים משולש. מה השטח שלו? משולש שצלעותיו על הצירים הוא **ישר-זווית** — הצירים ניצבים זה לזה, ולכן הניצבים הם קטעים על הצירים.`,
        },
        {
          type: 'steps',
          title: m`השטח של המשולש שבין $y=-2x+8$ לבין הצירים`,
          steps: [
            { math: m`x=0\ \Rightarrow\ y=8`, note: m`חיתוך עם ציר $y$: $(0,8)$` },
            { math: m`y=0\ \Rightarrow\ x=4`, note: m`חיתוך עם ציר $x$: $(4,0)$` },
            { math: m`S=\frac{4\cdot8}{2}=${c(GREEN, '16')}`, note: 'מכפלת הניצבים חלקי 2.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'S =',
        prompt: m`מה השטח של המשולש שהישר $y=-3x+6$ יוצר עם הצירים?`,
        answer: 6,
        hint: m`חיתוך עם ציר $y$: $(0,6)$. חיתוך עם ציר $x$: $(2,0)$`,
        explain: m`$\frac{2\cdot6}{2}=6$`,
      },
    },
  ],
};
