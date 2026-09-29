import { m } from './tex.js';

export default {
  id: 'g10u3-science-data',
  topicId: 'g10-u3-science-data',
  grade: 10,
  units: 3,
  emoji: '🌡️',
  title: 'הסקת מסקנות ממידע מדעי-חברתי',
  subtitle: 'גרפים, תחומי עלייה וירידה, ונוסחאות',
  sections: [
    {
      id: 'graph',
      emoji: '📉',
      title: 'קוראים גרף',
      blocks: [
        {
          type: 'parabola',
          mode: 'vertex',
          a: -1,
          p: 1,
          q: 4,
          caption: 'גובה כדור לאורך הזמן. איפה המקסימום? מתי הגרף עולה ומתי יורד?',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'מה מחפשים בגרף',
          md: m`**מקסימום / מינימום** — הנקודה הגבוהה או הנמוכה. **תחום עלייה** — $y$ גדל כש-$x$ גדל. **תחום ירידה** — $y$ קטן.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`בגרף $y=-(x-1)^2+4$ — מתי הגרף עולה?`,
        options: [m`$x<1$`, m`$x>1$`, m`$x<4$`, 'תמיד'],
        answer: 0,
        hint: 'עד הקודקוד — עולה.',
        explain: m`הקודקוד ב-$x=1$; משמאלו הגרף עולה.`,
      },
    },
    {
      id: 'formula',
      emoji: '🔬',
      title: 'שינוי נושא נוסחה',
      blocks: [
        {
          type: 'steps',
          title: m`מעלות פרנהייט: $F=1.8C+32$. מבודדים את $C$:`,
          steps: [
            { math: m`F-32=1.8C`, note: m`מחסירים $32$.` },
            { math: m`C=\frac{F-32}{1.8}`, note: m`מחלקים ב-$1.8$.` },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '°C',
        prompt: m`בניו-יורק $86$ מעלות פרנהייט. כמה זה בצלזיוס?`,
        answer: 30,
        hint: m`$\frac{86-32}{1.8}$`,
        explain: m`$\frac{54}{1.8}=30$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: מסקנה נכונה',
      blocks: [
        {
          type: 'card',
          tone: 'warn',
          title: 'מספר מול אחוז',
          md: m`בעיר א $500$ תאונות מתוך $100{,}000$ תושבים, בעיר ב $300$ מתוך $30{,}000$. בעיר א יותר תאונות — אבל **שיעור** התאונות בעיר ב גבוה יותר ($1\%$ מול $0.5\%$)!`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`בכיתה א $12$ מתוך $30$ בחרו כדורגל, ובכיתה ב $15$ מתוך $50$. איפה הכדורגל פופולרי יותר?`,
        options: [m`בכיתה א ($40\%$)`, m`בכיתה ב ($30\%$)`, 'אותו דבר', 'אי אפשר לדעת'],
        answer: 0,
        hint: 'משווים אחוזים, לא מספרים.',
        explain: m`$\frac{12}{30}=40\%$ מול $\frac{15}{50}=30\%$`,
      },
    },
  ],
};
