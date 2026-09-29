import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g12u4-vectors-algebraic',
  topicId: 'g12-u4-vectors-algebraic',
  grade: 12,
  units: 4,
  emoji: '🧮',
  title: 'וקטורים בגישה אלגברית',
  subtitle: 'שלושה צירים, וקטור כשלושה מספרים, ואורך במרחב',
  sections: [
    {
      id: 'axes',
      emoji: '📦',
      title: 'מערכת צירים במרחב',
      blocks: [
        {
          type: 'space',
          mode: 'coords',
          caption: m`$A$ בראשית, והתיבה לאורך הצירים. הקודקוד $C'$ נמצא ב-$(a,b,c)$. שנו מידות וסובבו:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'וקטור בין נקודות',
          md: m`$$\overrightarrow{AB}=(x_2-x_1,\ y_2-y_1,\ z_2-z_1)$$

"הסוף פחות ההתחלה" — בכל רכיב לחוד.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`$A(1,2,3)$ ו-$B(4,0,5)$. מהו $\overrightarrow{AB}$?`,
        options: [m`$(3,-2,2)$`, m`$(-3,2,-2)$`, m`$(5,2,8)$`, m`$(3,2,2)$`],
        answer: 0,
        hint: m`$B-A$ בכל רכיב.`,
        explain: m`$(4-1,\ 0-2,\ 5-3)=(3,-2,2)$`,
      },
    },
    {
      id: 'length',
      emoji: '📏',
      title: 'אורך וקטור',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'פיתגורס — פעמיים',
          md: m`$$|\vec v|=\sqrt{v_1^2+v_2^2+v_3^2}$$`,
        },
        {
          type: 'steps',
          title: m`$|(2,3,6)|$`,
          steps: [
            { math: m`\sqrt{4+9+36}`, note: 'ריבועים.' },
            { math: m`\sqrt{49}=${c(GREEN, '7')}`, note: 'שלם — במקרה!' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה אורך האלכסון של תיבה $2\times4\times4$?`,
        answer: 6,
        hint: m`$\sqrt{4+16+16}$`,
        explain: m`$\sqrt{36}=6$`,
      },
    },
    {
      id: 'ops',
      emoji: '➕',
      title: 'פעולות',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'רכיב-רכיב',
          md: m`$(u_1,u_2,u_3)+(v_1,v_2,v_3)=(u_1+v_1,\ u_2+v_2,\ u_3+v_3)$

$k\cdot(v_1,v_2,v_3)=(kv_1,\ kv_2,\ kv_3)$

**קולינאריים** $\iff$ היחסים שווים: $\frac{u_1}{v_1}=\frac{u_2}{v_2}=\frac{u_3}{v_3}$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`איזה וקטור קולינארי ל-$(2,-1,3)$?`,
        options: [m`$(4,-2,6)$`, m`$(4,2,6)$`, m`$(2,1,3)$`, m`$(1,-1,1)$`],
        answer: 0,
        hint: 'חפשו כפולה של אותו וקטור.',
        explain: m`$(4,-2,6)=2\cdot(2,-1,3)$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: אמצע קטע',
      blocks: [
        {
          type: 'steps',
          title: m`אמצע הקטע בין $A(2,4,-1)$ ל-$B(6,0,5)$`,
          steps: [
            { math: m`M=\left(\frac{2+6}{2},\ \frac{4+0}{2},\ \frac{-1+5}{2}\right)`, note: 'ממוצע בכל רכיב.' },
            { math: m`M=${c(VIOLET, '(4,2,2)')}`, note: 'אמצע הקטע.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`$M(1,1,1)$ אמצע $AB$, ו-$A(0,3,-2)$. מהי $B$?`,
        options: [m`$(2,-1,4)$`, m`$(1,-2,3)$`, m`$(0.5,2,-0.5)$`, m`$(2,1,4)$`],
        answer: 0,
        hint: m`$B=2M-A$`,
        explain: m`$(2-0,\ 2-3,\ 2+2)=(2,-1,4)$`,
      },
    },
  ],
};
