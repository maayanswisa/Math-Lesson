import { c, GREEN, m, RED, VIOLET } from './tex.js';

export default {
  id: 'g11u5-second-derivative',
  topicId: 'g11-u5-second-derivative',
  grade: 11,
  units: 5,
  emoji: '〰️',
  title: 'הנגזרת השנייה, קעירות ונקודות פיתול',
  subtitle: 'קצב השינוי של קצב השינוי',
  sections: [
    {
      id: 'concavity',
      emoji: '🥣',
      title: 'קעירות',
      blocks: [
        {
          type: 'text',
          md: m`$f''$ היא הנגזרת של $f'$ — היא אומרת אם **השיפוע עצמו** עולה או יורד.`,
        },
        {
          type: 'tangent',
          fn: 'cubic',
          concavity: true,
          x: -1.6,
          caption: m`הזיזו את הנקודה ועקבו אחרי המשיק: בכחול השיפוע **גדל**, באדום הוא **קטן**.`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'הכלל',
          md: m`$f''>0$ ← $f'$ עולה ← קעורה **כלפי מעלה** $\cup$

$f''<0$ ← $f'$ יורדת ← קעורה **כלפי מטה** $\cap$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`$f(x)=x^3-3x$. באיזה תחום היא קעורה כלפי מעלה?`,
        options: [m`$x>0$`, m`$x<0$`, m`$-1<x<1$`, 'בכל מקום'],
        answer: 0,
        hint: m`$f''(x)=6x$`,
        explain: m`$6x>0\iff x>0$`,
      },
    },
    {
      id: 'inflection',
      emoji: '🔀',
      title: 'נקודת פיתול',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'איפה הקעירות מתחלפת',
          md: m`**חשודות**: איפה ש-$f''=0$ (או לא מוגדרת).

**בודקים**: שהסימן של $f''$ באמת **מתחלף** שם. ($x^4$: $f''(0)=0$ — אבל אין שם פיתול!)`,
        },
        {
          type: 'steps',
          title: m`$f(x)=x^3-6x^2+5$`,
          steps: [
            { math: m`f'=3x^2-12x,\quad f''=6x-12`, note: 'גוזרים פעמיים.' },
            { math: m`6x-12=0\ \Rightarrow\ x=${c(VIOLET, '2')}`, note: 'נקודה חשודה.' },
            { math: m`f''(1)=${c(RED, '-6')},\ f''(3)=${c(GREEN, '6')}`, note: m`הסימן מתחלף ← פיתול ב-$(2,-11)$.` },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'x =',
        prompt: m`מה ה-$x$ של נקודת הפיתול של $f(x)=x^3+3x^2-9x$?`,
        answer: -1,
        hint: m`$f''=6x+6$`,
        explain: m`$6x+6=0\Rightarrow x=-1$, והסימן מתחלף שם.`,
      },
    },
    {
      id: 'test',
      emoji: '🧪',
      title: 'מבחן הנגזרת השנייה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: m`כש-$f'(x_0)=0$`,
          md: m`$f''(x_0)>0$ ← **מינימום** (תחתית של $\cup$)

$f''(x_0)<0$ ← **מקסימום** (פסגה של $\cap$)

$f''(x_0)=0$ ← **לא ניתן להסיק** — חוזרים לטבלת סימנים.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`$f'(2)=0$ ו-$f''(2)=-5$. מה יש ב-$x=2$?`,
        options: ['מינימום', 'מקסימום', 'נקודת פיתול', 'אי אפשר לדעת'],
        answer: 1,
        hint: 'קעורה כלפי מטה בנקודה עם משיק אופקי.',
        explain: m`$f''<0$ — קעורה כלפי מטה, ולכן מקסימום.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: מיקום, מהירות, תאוצה',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'בפיזיקה',
          md: m`$s(t)$ — מיקום · $s'(t)$ — **מהירות** · $s''(t)$ — **תאוצה**`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`מיקום גוף: $s(t)=t^3-6t^2+20t$. מה התאוצה ברגע $t=4$?`,
        answer: 12,
        hint: m`$s''(t)=6t-12$`,
        explain: m`$s''(4)=24-12=12$`,
      },
    },
  ],
};
