import { m } from './tex.js';

export default {
  id: 'g10u5-derivative-def',
  topicId: 'g10-u5-derivative-def',
  grade: 10,
  units: 5,
  emoji: '🔬',
  title: 'הנגזרת: מקצב שינוי להגדרה',
  subtitle: 'קצב ממוצע, קצב רגעי והגבול',
  sections: [
    {
      id: 'average',
      emoji: '🚗',
      title: 'קצב שינוי ממוצע',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שיפוע המיתר',
          md: m`$$\frac{\Delta y}{\Delta x}=\frac{f(x_0+h)-f(x_0)}{h}$$

מכונית עברה $120$ ק"מ ב-$2$ שעות — מהירות ממוצעת $60$ קמ"ש. אבל ברגע מסוים המד הראה אולי $90$!`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$f(x)=x^2$. מה קצב השינוי הממוצע בין $x=1$ ל-$x=3$?`,
        answer: 4,
        hint: m`$\frac{9-1}{2}$`,
        explain: m`$4$`,
      },
    },
    {
      id: 'limit',
      emoji: '🔎',
      title: 'מקטינים את h',
      blocks: [
        {
          type: 'secant',
          caption: m`הקטינו את $h$ לאפס — המיתר הופך למשיק:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'ההגדרה',
          md: m`$$f'(x_0)=\lim_{h\to0}\frac{f(x_0+h)-f(x_0)}{h}$$
`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`לפי ההגדרה, מה $\frac{(x+h)^2-x^2}{h}$ אחרי צמצום?`,
        options: [m`$2x+h$`, m`$2x$`, m`$h$`, m`$x^2+h$`],
        answer: 0,
        hint: m`$(x+h)^2=x^2+2xh+h^2$`,
        explain: m`$\frac{2xh+h^2}{h}=2x+h\to2x$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: מהירות רגעית',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'נגזרת המיקום',
          md: m`מיקום $s(t)$ ← **מהירות רגעית** $v(t)=s'(t)$. אבן נופלת: $s(t)=5t^2$ ← $v(t)=10t$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'מ׳/ש׳',
        prompt: m`$s(t)=5t^2$. מה המהירות ברגע $t=3$?`,
        answer: 30,
        hint: m`$10t$`,
        explain: m`$30$ מטר לשנייה.`,
      },
    },
  ],
};
