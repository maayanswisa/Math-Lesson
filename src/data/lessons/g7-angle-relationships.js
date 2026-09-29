import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g7-angle-relationships',
  topicId: 'g7-angle-relationships',
  grade: 7,
  emoji: '✂️',
  title: 'חוצה זווית, זוויות צמודות וקודקודיות',
  subtitle: 'מה קורה כשישרים נחתכים — ואיך מחשבים זוויות בלי למדוד',
  sections: [
    {
      id: 'add',
      emoji: '➕',
      title: 'חיבור זוויות וחוצה זווית',
      blocks: [
        {
          type: 'text',
          md: m`קרן שיוצאת מהקודקוד ועוברת **בתוך** זווית מחלקת אותה לשתיים — והסכום שלהן הוא הזווית כולה: $30°+45°=75°$.`,
        },
        {
          type: 'crossing',
          bisector: true,
          angle: 80,
          caption: m`הקו הצהוב הוא **חוצה הזווית** של $\alpha$ — הוא מחלק אותה לשתי זוויות שוות. שנו את $\alpha$:`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '°',
        prompt: 'חוצה זווית חילק זווית לשתי זוויות של 35° כל אחת. מה גודל הזווית כולה?',
        answer: 70,
        hint: 'חוצה מחלק לשני חלקים שווים.',
        explain: m`$35°+35°=70°$`,
      },
    },
    {
      id: 'pairs',
      emoji: '✖️',
      title: 'צמודות וקודקודיות',
      blocks: [
        {
          type: 'crossing',
          angle: 60,
          caption: 'שני ישרים נחתכים ויוצרים ארבע זוויות. שנו את הזווית — מה נשאר תמיד נכון?',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שני זוגות, שני כללים',
          md: m`**צמודות** — זו ליד זו, ויחד יוצרות קו ישר: הסכום $180°$.

**קודקודיות** — זו **מול** זו: הן **שוות**.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '°',
        prompt: 'שני ישרים נחתכים. אחת הזוויות היא 110°. מה גודל הזווית הצמודה לה?',
        answer: 70,
        hint: m`צמודות — סכום $180°$.`,
        explain: m`$180°-110°=70°$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: כל ארבע הזוויות',
      blocks: [
        {
          type: 'steps',
          title: 'שני ישרים נחתכים, ואחת הזוויות 40°. מה כל הזוויות?',
          steps: [
            { math: m`${c(VIOLET, '40°')}`, note: 'הנתונה.' },
            { math: m`180°-40°=${c(GREEN, '140°')}`, note: 'הצמודה לה.' },
            { math: m`${c(VIOLET, '40°')},\ ${c(GREEN, '140°')}`, note: 'שתי האחרות — קודקודיות לאלה, ולכן שוות להן.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'x =',
        prompt: m`שני ישרים נחתכים. זווית אחת היא $3x$, והזווית שמולה (הקודקודית) היא $x+50°$. מה $x$?`,
        answer: 25,
        hint: m`קודקודיות שוות: $3x=x+50$.`,
        explain: m`$2x=50$, ולכן $x=25°$ (והזוויות $75°$).`,
      },
    },
  ],
};
