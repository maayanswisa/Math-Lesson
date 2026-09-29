import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g12u4-dot-product',
  topicId: 'g12-u4-dot-product',
  grade: 12,
  units: 4,
  emoji: '🎯',
  title: 'מכפלה סקלרית',
  subtitle: 'מספר אחד שמספר על הזווית — וניצבות בבדיקה אחת',
  sections: [
    {
      id: 'define',
      emoji: '✨',
      title: 'שתי הגדרות',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'אותו מספר — בשתי דרכים',
          md: m`**גאומטרית**: $\vec u\cdot\vec v=|\vec u||\vec v|\cos\theta$

**אלגברית**: $\vec u\cdot\vec v=u_1v_1+u_2v_2+u_3v_3$`,
        },
        {
          type: 'vectors',
          mode: 'dot',
          u: [3, 1],
          v: [1, 3],
          caption: 'שנו את הוקטורים. מתי המכפלה חיובית, שלילית, או אפס?',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $(2,-1,4)\cdot(3,5,1)$?`,
        answer: 5,
        hint: m`$2\cdot3+(-1)\cdot5+4\cdot1$`,
        explain: m`$6-5+4=5$`,
      },
    },
    {
      id: 'perp',
      emoji: '📐',
      title: 'ניצבות',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'מבחן ניצבות',
          md: m`$$\vec u\perp\vec v\iff\vec u\cdot\vec v=0$$

כי $\cos90°=0$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'k =',
        prompt: m`עבור איזה $k$ הוקטורים $(1,k,2)$ ו-$(4,2,-3)$ ניצבים?`,
        answer: 1,
        hint: m`$4+2k-6=0$`,
        explain: m`$2k=2\Rightarrow k=1$`,
      },
    },
    {
      id: 'angle',
      emoji: '📐',
      title: 'זווית ואורך',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שתי נוסחאות',
          md: m`$\cos\theta=\frac{\vec u\cdot\vec v}{|\vec u||\vec v|}$

$|\vec v|=\sqrt{\vec v\cdot\vec v}$`,
        },
        {
          type: 'steps',
          title: m`הזווית בין $(1,0,1)$ ל-$(0,1,1)$`,
          steps: [
            { math: m`\vec u\cdot\vec v=0+0+1=${c(VIOLET, '1')}`, note: 'מכפלה.' },
            { math: m`|\vec u|=|\vec v|=\sqrt2`, note: 'אורכים.' },
            { math: m`\cos\theta=\frac{1}{2}\ \Rightarrow\ \theta=${c(GREEN, '60°')}`, note: 'זווית.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`$|\vec u|=3$, $|\vec v|=4$, והזווית ביניהם $60°$. כמה זה $\vec u\cdot\vec v$?`,
        options: [m`$12$`, m`$6$`, m`$6\sqrt3$`, m`$7$`],
        answer: 1,
        hint: m`$3\cdot4\cdot\cos60°$`,
        explain: m`$12\cdot\frac12=6$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: פתיחת סוגריים',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'כמו כפל רגיל',
          md: m`$(\vec u+\vec v)^2=|\vec u|^2+2\vec u\cdot\vec v+|\vec v|^2$ — ומשם אפשר למצוא אורכים של אלכסונים בלי קואורדינטות!`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$|\vec u|=2$, $|\vec v|=3$, $\vec u\cdot\vec v=3$. מה $|\vec u+\vec v|$? (בקירוב)`,
        answer: Math.sqrt(19),
        tolerance: 0.02,
        hint: m`$|\vec u+\vec v|^2=4+2\cdot3+9$`,
        explain: m`$\sqrt{19}\approx4.36$`,
      },
    },
  ],
};
