import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g11u5-integral',
  topicId: 'g11-u5-integral',
  grade: 11,
  units: 5,
  emoji: '∫',
  title: 'פונקציית הצטברות והמשפט היסודי',
  subtitle: 'מקצב שינוי לכמות שהצטברה — ולמה אינטגרל הפוך לנגזרת',
  sections: [
    {
      id: 'constant',
      emoji: '🚰',
      title: 'קצב קבוע',
      blocks: [
        {
          type: 'text',
          md: m`ברז ממלא $5$ ליטר בדקה, במשך $6$ דקות. כמה מים הצטברו? $5\cdot6=30$ ליטר.

בגרף של הקצב (קו אופקי בגובה $5$) — זה בדיוק **שטח המלבן** שמתחת לגרף.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'ק"מ',
        prompt: 'מכונית נסעה 2 שעות ב-60 קמ"ש, ואחר כך שעה ב-90 קמ"ש. כמה ק"מ הצטברו?',
        answer: 210,
        hint: 'שני מלבנים: קצב × זמן בכל אחד.',
        explain: m`$60\cdot2+90\cdot1=210$`,
      },
    },
    {
      id: 'riemann',
      emoji: '▦',
      title: 'קירוב במלבנים',
      blocks: [
        {
          type: 'riemann',
          caption: 'כשהקצב משתנה — מחלקים לקטעים קטנים, ובכל קטע מניחים שהקצב כמעט קבוע. הוסיפו מלבנים:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'פונקציית ההצטברות',
          md: m`$$F_a(x)=\int_a^x f(u)\,du$$

הגבול של סכומי המלבנים — כמה הצטבר מ-$a$ עד $x$. ובפרט $F_a(a)=0$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'מה קורה לסכום המלבנים כשמגדילים מאוד את מספרם?',
        options: ['הוא גדל בלי גבול', 'הוא מתקרב לשטח המדויק מתחת לגרף', 'הוא יורד לאפס', 'הוא לא משתנה'],
        answer: 1,
        hint: 'הסתכלו על "הפער" בכלי.',
        explain: 'המלבנים נעשים דקים והקירוב משתפר — הגבול הוא האינטגרל.',
      },
    },
    {
      id: 'ftc',
      emoji: '✨',
      title: 'המשפט היסודי',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שיא הפרק',
          md: m`$$F_a'(x)=f(x)$$

הקצב שבו ההצטברות גדלה ב-$x$ — הוא בדיוק הגובה $f(x)$. לכן **אינטגרציה היא הפעולה ההפוכה לגזירה**, ו:

$$\int_a^b f(x)\,dx=F(b)-F(a)\quad(F'=f)$$`,
        },
        {
          type: 'card',
          tone: 'why',
          title: 'למה זה נכון?',
          md: m`מזיזים את $x$ קצת ימינה, ב-$h$. ההצטברות גדלה בפס צר ברוחב $h$ ובגובה בערך $f(x)$ — כלומר בכ-$f(x)\cdot h$. חלקי $h$: $f(x)$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$F(x)=\int_1^x(3u^2+1)\,du$. כמה זה $F'(2)$?`,
        answer: 13,
        hint: 'המשפט היסודי — לא צריך לחשב אינטגרל!',
        explain: m`$F'(x)=3x^2+1$, ולכן $F'(2)=13$.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: קדומות',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'טבלה קטנה',
          md: m`$\int x^n\,dx=\frac{x^{n+1}}{n+1}+C$

$\int\frac{1}{x^2}\,dx=-\frac1x+C$

$\int\frac{1}{\sqrt x}\,dx=2\sqrt x+C$

ופנימית לינארית: $\int(ax+b)^n\,dx=\frac{(ax+b)^{n+1}}{a(n+1)}+C$`,
        },
        {
          type: 'steps',
          title: m`$\int_0^1(2x+1)^3\,dx$`,
          steps: [
            { math: m`F(x)=\frac{(2x+1)^4}{${c(VIOLET, '2')}\cdot4}=\frac{(2x+1)^4}{8}`, note: 'מחלקים גם ב-a=2 (הנגזרת הפנימית).' },
            { math: m`F(1)-F(0)=\frac{81}{8}-\frac18=${c(GREEN, '10')}`, note: 'המשפט היסודי.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`חשבו $\int_1^4\frac{1}{\sqrt x}\,dx$`,
        answer: 2,
        hint: m`$F(x)=2\sqrt x$`,
        explain: m`$2\sqrt4-2\sqrt1=4-2=2$`,
      },
    },
  ],
};
