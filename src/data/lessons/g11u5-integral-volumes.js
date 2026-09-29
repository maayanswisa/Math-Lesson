import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g11u5-integral-volumes',
  topicId: 'g11-u5-integral-volumes',
  grade: 11,
  units: 5,
  emoji: '🏺',
  title: 'יישומי האינטגרל: שטחים, נפחים וממוצע',
  subtitle: 'שטח בין גרפים, גוף סיבוב, וערך ממוצע של פונקציה',
  sections: [
    {
      id: 'area',
      emoji: '🟪',
      title: 'שטחים',
      blocks: [
        {
          type: 'integral',
          a: -2,
          b: 4,
          caption: 'תזכורת: אינטגרל נותן שטח "עם סימן". שטח אמיתי — מפצלים בנקודות החיתוך עם הציר:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'בין שני גרפים',
          md: m`$\int_a^b[f(x)-g(x)]\,dx$ — העליון פחות התחתון, בין נקודות החיתוך.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה השטח בין $f(x)=x^2-1$ לציר $x$, בתחום $0\le x\le2$?`,
        answer: 2,
        hint: m`הפונקציה שלילית ב-$[0,1]$ וחיובית ב-$[1,2]$. $F=\frac{x^3}{3}-x$`,
        explain: m`$|F(1)-F(0)|+|F(2)-F(1)|=\frac23+\frac43=2$`,
      },
    },
    {
      id: 'revolution',
      emoji: '🏺',
      title: 'נפח גוף סיבוב',
      blocks: [
        {
          type: 'revolution',
          shape: 'cone',
          caption: 'מסובבים את הגרף סביב ציר x. בחרו צורה:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'הנוסחה',
          md: m`$$V=\pi\int_a^b[f(x)]^2\,dx$$

כל פרוסה דקה היא גליל קטנטן בשטח חתך $\pi f(x)^2$ — והנפח הוא ההצטברות שלהן.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מסובבים את $f(x)=x$ בתחום $0\le x\le3$ סביב ציר $x$. מה הנפח?`,
        options: [m`$3\pi$`, m`$9\pi$`, m`$27\pi$`, m`$\frac{9\pi}{2}$`],
        answer: 1,
        hint: m`$\pi\int_0^3x^2\,dx=\pi\cdot\frac{27}{3}$`,
        explain: m`$9\pi$ — וזו בדיוק נוסחת החרוט $\frac13\pi r^2h=\frac13\pi\cdot9\cdot3$ ✓`,
      },
    },
    {
      id: 'average',
      emoji: '⚖️',
      title: 'ערך ממוצע של פונקציה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'הגובה של מלבן עם אותו שטח',
          md: m`$$\bar f=\frac{1}{b-a}\int_a^b f(x)\,dx$$

הערך הקבוע שהצטברותו על $[a,b]$ שווה לזו של $f$.`,
        },
        {
          type: 'steps',
          title: m`הממוצע של $f(x)=x^2$ ב-$[0,3]$`,
          steps: [
            { math: m`\int_0^3x^2\,dx=${c(VIOLET, '9')}`, note: 'ההצטברות.' },
            { math: m`\frac{9}{3-0}=${c(GREEN, '3')}`, note: 'חלקי רוחב הקטע.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מה הערך הממוצע של $f(x)=2x+1$ בקטע $[1,5]$?`,
        answer: 7,
        hint: m`$\int_1^5(2x+1)dx=[x^2+x]_1^5=30-2$`,
        explain: m`$\frac{28}{4}=7$ (לפונקציה לינארית — זה הערך באמצע, $f(3)=7$).`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: נפח כדור',
      blocks: [
        {
          type: 'revolution',
          shape: 'sphere',
          caption: 'חצי מעגל שמסתובב — כדור:',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מסובבים את $f(x)=\sqrt{R^2-x^2}$ ב-$[-R,R]$. איזו נוסחה יוצאת?`,
        options: [m`$\pi R^2$`, m`$\frac43\pi R^3$`, m`$4\pi R^2$`, m`$2\pi R^3$`],
        answer: 1,
        hint: m`$\pi\int_{-R}^{R}(R^2-x^2)\,dx=\pi\left[R^2x-\frac{x^3}{3}\right]_{-R}^{R}$`,
        explain: m`$\pi\left(2R^3-\frac{2R^3}{3}\right)=\frac43\pi R^3$ — נוסחת נפח הכדור!`,
      },
    },
  ],
};
