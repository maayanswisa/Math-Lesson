import { m } from './tex.js';

export default {
  id: 'g10u5-trig-plane',
  topicId: 'g10-u5-trig-plane',
  grade: 10,
  units: 5,
  emoji: '🔺',
  title: 'משפט הסינוסים והקוסינוסים',
  subtitle: 'טריגונומטריה בכל משולש — לא רק ישר-זווית',
  sections: [
    {
      id: 'area',
      emoji: '🟩',
      title: 'שטח משולש',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שתי צלעות וזווית ביניהן',
          md: m`$$S=\frac12ab\sin\gamma$$

בהוכחות — ערכים מדויקים: $\sin45°=\frac{\sqrt2}{2}$, לא $0.707$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        tolerance: 0.01,
        prompt: m`צלעות $6$ ו-$8$, זווית $60°$ ביניהן. מה השטח? (בערך)`,
        answer: 20.78,
        hint: m`$\frac12\cdot48\cdot\frac{\sqrt3}{2}=12\sqrt3$`,
        explain: m`$12\sqrt3\approx20.78$`,
      },
    },
    {
      id: 'sines',
      emoji: '📐',
      title: 'משפט הסינוסים',
      blocks: [
        {
          type: 'sinelaw',
          caption: 'צלע חלקי סינוס הזווית שמולה — תמיד אותו מספר (קוטר המעגל החוסם):',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'המשפט',
          md: m`$$\frac{a}{\sin\alpha}=\frac{b}{\sin\beta}=\frac{c}{\sin\gamma}=2R$$
`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$a=10$, $\alpha=30°$. מה רדיוס המעגל החוסם?`,
        answer: 10,
        hint: m`$2R=\frac{10}{0.5}$`,
        explain: m`$2R=20$ ← $R=10$`,
      },
    },
    {
      id: 'cosines',
      emoji: '🏆',
      title: 'שלב הבוס: משפט הקוסינוסים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'פיתגורס המורחב',
          md: m`$$c^2=a^2+b^2-2ab\cos\gamma$$

כש-$\gamma=90°$: $\cos90°=0$ — חוזרים לפיתגורס!`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$a=5$, $b=8$, $\gamma=60°$. מה $c$?`,
        answer: 7,
        hint: m`$25+64-40$`,
        explain: m`$c^2=49$ ← $c=7$`,
      },
    },
  ],
};
