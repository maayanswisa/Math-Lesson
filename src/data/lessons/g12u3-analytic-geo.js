import { m } from './tex.js';

export default {
  id: 'g12u3-analytic-geo',
  topicId: 'g12-u3-analytic-geo',
  grade: 12,
  units: 3,
  emoji: '📍',
  title: 'גאומטריה אנליטית — ישר',
  subtitle: 'מרחק, אמצע, שיפוע, מקבילים וניצבים',
  sections: [
    {
      id: 'distance',
      emoji: '📏',
      title: 'מרחק ואמצע',
      blocks: [
        {
          type: 'coords',
          distance: true,
          x: 4,
          y: 3,
          x2: -2,
          y2: -1,
          caption: 'הזיזו את הנקודות. המרחק — יתר במשולש ישר-זווית:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שתי נוסחאות',
          md: m`$$AB=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$$

$$M=\left(\frac{x_1+x_2}{2},\frac{y_1+y_2}{2}\right)$$
`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ק"מ',
        prompt: m`במפה (ק"מ): בית ב-$(1,1)$ ובית ספר ב-$(4,5)$. מה המרחק באוויר?`,
        answer: 5,
        hint: m`$\sqrt{9+16}$`,
        explain: m`$5$ ק"מ.`,
      },
    },
    {
      id: 'slope',
      emoji: '📈',
      title: 'שיפוע ומשוואה',
      blocks: [
        {
          type: 'line',
          lines: [{ m: 0.5, b: 1 }],
          points: [
            { x: 2, y: 2, label: '(2,2)' },
            { x: 4, y: 3, label: '(4,3)' },
          ],
          caption: m`ישר דרך $(2,2)$ ו-$(4,3)$: שיפוע $\frac{3-2}{4-2}=\frac12$`,
        },
        {
          type: 'steps',
          title: m`משוואת הישר`,
          steps: [
            { math: m`y-2=\tfrac12(x-2)`, note: 'נקודה ושיפוע.' },
            { math: m`y=\tfrac12x+1`, note: 'מסדרים.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהי משוואת הישר דרך $(0,3)$ ו-$(2,7)$?`,
        options: [m`$y=2x+3$`, m`$y=3x+2$`, m`$y=2x+7$`, m`$y=\frac12x+3$`],
        answer: 0,
        hint: m`$m=\frac42$`,
        explain: m`$m=2$, $b=3$.`,
      },
    },
    {
      id: 'perp',
      emoji: '🏆',
      title: 'שלב הבוס: ניצבים',
      blocks: [
        {
          type: 'line',
          lines: [
            { m: 2, b: -1 },
            { m: -0.5, b: 4 },
          ],
          showIntersection: true,
          caption: m`$2\cdot\left(-\frac12\right)=-1$ — הישרים ניצבים:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'הכלל',
          md: m`מקבילים: $m_1=m_2$. ניצבים: $m_1\cdot m_2=-1$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`כביש חדש צריך להיות ניצב לכביש $y=3x-2$ ולעבור ב-$(3,0)$. מה משוואתו?`,
        options: [m`$y=-\frac13x+1$`, m`$y=3x-9$`, m`$y=-3x+9$`, m`$y=\frac13x-1$`],
        answer: 0,
        hint: m`שיפוע $-\frac13$.`,
        explain: m`$y=-\frac13(x-3)=-\frac13x+1$`,
      },
    },
  ],
};
