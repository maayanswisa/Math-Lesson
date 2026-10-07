const m = String.raw;

export default {
  topicId: 'g11-u4-integral-functions',
  emoji: '📋',
  title: 'דף עזר: אינטגרל של פונקציה מורכבת ורציונלית',
  subtitle: 'חזקה של ביטוי קווי, אחד חלקי x בחזקה, ומציאת f לפי f′ ונקודה',
  sections: [
    {
      title: 'הנוסחאות',
      emoji: '🧮',
      blocks: [
        {
          type: 'table',
          head: ['הפונקציה', 'פונקציה קדומה', 'דוגמה'],
          rows: [
            [m`$(ax+b)^n$`, m`$\frac{(ax+b)^{n+1}}{a(n+1)}+C$`, m`$\int(2x+1)^3dx=\frac{(2x+1)^4}{8}+C$`],
            [m`$\frac{1}{x^2}$`, m`$-\frac1x+C$`, m`$\int\frac{6}{x^2}dx=-\frac6x+C$`],
            [m`$\frac{1}{x^n}=x^{-n}$`, m`$\frac{x^{1-n}}{1-n}+C$`, m`$\int\frac{1}{x^3}dx=-\frac{1}{2x^2}+C$`],
            [m`$\frac{1}{(ax+b)^2}$`, m`$-\frac{1}{a(ax+b)}+C$`, m`$\int\frac{dx}{(2x+1)^2}=-\frac{1}{2(2x+1)}+C$`],
          ],
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'לא לשכוח לחלק ב-a',
          md: m`בפונקציה מורכבת מחלקים **גם** בחזקה החדשה **וגם** במקדם של $x$. בדיקה בגזירה: כלל השרשרת מכפיל ב-$a$ — ולכן באינטגרל מחלקים בו.`,
        },
      ],
    },
    {
      title: 'אינטגרל מסוים',
      emoji: '📏',
      blocks: [
        {
          type: 'steps',
          title: m`$\int_0^1(3x+1)^2\,dx$`,
          steps: [
            { math: m`\left[\frac{(3x+1)^3}{9}\right]_0^1`, note: 'קדומה (מחלקים ב-3·3).' },
            { math: m`\frac{64}{9}-\frac19=\frac{63}{9}=7`, note: 'עליון פחות תחתון.' },
          ],
        },
      ],
    },
    {
      title: 'f לפי f′ ונקודה',
      emoji: '📍',
      blocks: [
        {
          type: 'steps',
          title: m`$f'(x)=\frac{6}{(2x-1)^2}$, $\;f(1)=2$`,
          steps: [
            { math: m`f(x)=-\frac{3}{2x-1}+C`, note: 'קדומה.' },
            { math: m`f(1)=-3+C=2\ \Rightarrow\ C=5`, note: 'מציבים.' },
            { math: m`f(x)=-\frac{3}{2x-1}+5`, note: 'הפונקציה.' },
          ],
        },
      ],
    },
    {
      title: 'מלכודות',
      emoji: '⚠️',
      blocks: [
        {
          type: 'card',
          tone: 'warn',
          title: 'טעויות נפוצות',
          md: m`- $\int\frac{1}{x^2}dx\ne\frac{1}{x^3}$ — **מעלים** את החזקה ($-2\to-1$), לא מורידים.
- סימן: $\frac{x^{-1}}{-1}=-\frac1x$ — המינוס חשוב.
- שוכחים לחלק במקדם $a$ בפונקציה מורכבת.
- $\int\frac{1}{x}dx$ — **לא** לפי כלל החזקה (מחלקים ב-$0$!). לא נדרש בתוכנית הזו.`,
        },
      ],
    },
  ],
};
