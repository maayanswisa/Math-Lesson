import { m } from './tex.js';

export default {
  id: 'g10u4-analytic-geo',
  topicId: 'g10-u4-analytic-geo',
  grade: 10,
  units: 4,
  emoji: '📍',
  title: 'גאומטריה אנליטית — נקודות וישרים',
  subtitle: 'מרחק, אמצע, שיפוע, מקבילים ומאונכים',
  sections: [
    {
      id: 'distance',
      emoji: '📏',
      title: 'מרחק ואמצע',
      blocks: [
        {
          type: 'coords',
          distance: true,
          x: 2,
          y: 3,
          x2: -2,
          y2: 0,
          caption: 'הזיזו את שתי הנקודות — המרחק הוא יתר במשולש ישר-זווית:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שתי נוסחאות',
          md: m`$$d=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$$

$$M=\left(\frac{x_1+x_2}{2},\frac{y_1+y_2}{2}\right)$$
`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה המרחק בין $(1,2)$ ל-$(7,10)$?`,
        answer: 10,
        hint: m`$\sqrt{36+64}$`,
        explain: m`$\sqrt{100}=10$`,
      },
    },
    {
      id: 'slope',
      emoji: '📈',
      title: 'שיפוע ומשוואת ישר',
      blocks: [
        {
          type: 'steps',
          title: m`הישר דרך $(1,3)$ ו-$(3,7)$`,
          steps: [
            { math: m`m=\frac{7-3}{3-1}=2`, note: 'שיפוע.' },
            { math: m`y-3=2(x-1)`, note: 'נקודה ושיפוע.' },
            { math: m`y=2x+1`, note: 'צורה מפורשת.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהי משוואת הישר דרך $(0,-1)$ ו-$(2,5)$?`,
        options: [m`$y=3x-1$`, m`$y=2x-1$`, m`$y=3x+1$`, m`$y=-3x-1$`],
        answer: 0,
        hint: m`$m=\frac{6}{2}$`,
        explain: m`$m=3$, $b=-1$.`,
      },
    },
    {
      id: 'perp',
      emoji: '🏆',
      title: 'שלב הבוס: מקביל ומאונך',
      blocks: [
        {
          type: 'line',
          lines: [
            { m: 2, b: 1 },
            { m: -0.5, b: 3 },
          ],
          showIntersection: true,
          caption: m`$y=2x+1$ ו-$y=-\frac12x+3$ — מאונכים: $2\cdot\left(-\frac12\right)=-1$`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'הכלל',
          md: m`מקבילים: $m_1=m_2$. מאונכים: $m_1\cdot m_2=-1$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהו שיפוע ישר המאונך ל-$y=\frac23x+5$?`,
        options: [m`$-\frac32$`, m`$\frac32$`, m`$-\frac23$`, m`$5$`],
        answer: 0,
        hint: 'הופכי ונגדי.',
        explain: m`$\frac23\cdot\left(-\frac32\right)=-1$`,
      },
    },
  ],
};
