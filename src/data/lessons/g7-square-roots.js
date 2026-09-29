import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g7-square-roots',
  topicId: 'g7-square-roots',
  grade: 7,
  emoji: '√',
  title: 'שורשים ריבועיים',
  subtitle: 'הפעולה ההפוכה לריבוע — וקשר לשטח ולנפח',
  sections: [
    {
      id: 'meaning',
      emoji: '🟩',
      title: 'שורש = צלע הריבוע',
      blocks: [
        {
          type: 'text',
          md: m`ריבוע ששטחו $16$ — מה אורך הצלע שלו? מחפשים מספר שכפול עצמו נותן $16$: זה $4$, כי $4^2=16$.

כותבים: $\sqrt{16}=4$ וקוראים "שורש 16".`,
        },
        {
          type: 'rect',
          caption: 'שימו את אותו מספר באורך וברוחב — קיבלתם ריבוע. השטח הוא ריבוע הצלע, והצלע היא שורש השטח:',
          l: 4,
          w: 4,
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'מספרים ריבועיים — כדאי להכיר',
          md: m`$1,\ 4,\ 9,\ 16,\ 25,\ 36,$

$49,\ 64,\ 81,\ 100,\ 121,\ 144$`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $\sqrt{81}$?`,
        answer: 9,
        hint: 'איזה מספר כפול עצמו נותן 81?',
        explain: m`$9\times9=81$, ולכן $\sqrt{81}=9$.`,
      },
    },
    {
      id: 'two',
      emoji: '🪞',
      title: 'שני שורשים — אבל סימן אחד',
      blocks: [
        {
          type: 'text',
          md: m`גם $5^2=25$ וגם $(-5)^2=25$. לכן ל-$25$ יש **שני** שורשים ריבועיים: $5$ ו-$-5$.`,
        },
        {
          type: 'card',
          tone: 'key',
          title: m`הסימן $\sqrt{\ }$`,
          md: m`הסימן $\sqrt{\ }$ מציין תמיד את השורש ה**חיובי**: $\sqrt{25}=5$, לא $-5$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'איזו טענה נכונה?',
        options: [m`$\sqrt{36}=-6$`, m`$\sqrt{36}=6$ וגם $(-6)^2=36$`, m`$\sqrt{36}=18$`, m`ל-$36$ יש רק שורש ריבועי אחד`],
        answer: 1,
        hint: m`$\sqrt{\ }$ נותן את השורש החיובי, אבל גם $-6$ בריבוע נותן 36.`,
        explain: m`$\sqrt{36}=6$. ל-36 שני שורשים ריבועיים: $6$ ו-$-6$.`,
      },
    },
    {
      id: 'estimate',
      emoji: '🎯',
      title: 'אומדן שורש',
      blocks: [
        {
          type: 'steps',
          title: m`בין אילו מספרים שלמים נמצא $\sqrt{50}$?`,
          steps: [
            { math: m`49<50<64`, note: 'מחפשים את המספרים הריבועיים הקרובים.' },
            { math: m`\sqrt{49}<\sqrt{50}<\sqrt{64}`, note: 'לוקחים שורש לכולם.' },
            { math: m`${c(GREEN, '7')}<\sqrt{50}<${c(GREEN, '8')}`, note: 'וקרוב מאוד ל-7, כי 50 קרוב ל-49.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`בין אילו מספרים נמצא $\sqrt{30}$?`,
        options: [m`$4$ ו-$5$`, m`$5$ ו-$6$`, m`$6$ ו-$7$`, m`$15$ ו-$16$`],
        answer: 1,
        hint: 'אילו מספרים ריבועיים קרובים ל-30?',
        explain: m`$25<30<36$, ולכן $5<\sqrt{30}<6$.`,
      },
    },
    {
      id: 'cube',
      emoji: '🧊',
      title: 'שלב הבוס: קובייה',
      blocks: [
        {
          type: 'text',
          md: m`נפח קובייה עם מקצוע $a$ הוא $a\times a\times a=a^3$. כדי למצוא את המקצוע מתוך הנפח, מחפשים מספר שכפול עצמו **שלוש פעמים** נותן את הנפח — זה נקרא **שורש שלישי**.`,
        },
        {
          type: 'box',
          caption: 'כשכל שלוש המידות שוות — זו קובייה. נפח 64 מתקבל ממקצוע 4:',
          l: 4,
          w: 4,
          h: 4,
        },
        {
          type: 'steps',
          title: 'קובייה שנפחה 27 סמ"ק',
          steps: [
            { math: m`a\times a\times a=27`, note: 'מחפשים את המקצוע.' },
            { math: m`${c(VIOLET, '3')}\times3\times3=27`, note: 'מנסים מספרים קטנים.' },
            { math: m`a=${c(GREEN, '3')}`, note: 'המקצוע 3 ס"מ.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ס"מ',
        prompt: 'נפח קובייה הוא 125 סמ"ק. מה אורך המקצוע?',
        answer: 5,
        hint: 'איזה מספר כפול עצמו שלוש פעמים נותן 125?',
        explain: m`$5\times5\times5=125$`,
      },
    },
  ],
};
