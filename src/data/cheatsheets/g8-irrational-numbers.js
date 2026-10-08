const m = String.raw;

export default {
  topicId: 'g8-irrational-numbers',
  emoji: '📋',
  title: 'דף עזר: שורש ריבועי ומספרים אי-רציונליים',
  subtitle: 'רציונלי מול אי-רציונלי, שבר מחזורי, ואומדן שורשים',
  sections: [
    {
      title: 'רציונלי מול אי-רציונלי',
      emoji: '🔢',
      blocks: [
        {
          type: 'table',
          stack: 'columns',
          head: ['', 'רציונלי', 'אי-רציונלי'],
          rows: [
            ['הגדרה', m`ניתן לכתוב כ-$\frac ab$ ($a,b$ שלמים, $b\ne0$)`, 'לא ניתן'],
            ['כשבר עשרוני', 'סופי או מחזורי', 'אינסופי ולא מחזורי'],
            ['דוגמאות', m`$5$, $\;-\frac23$, $\;0.75$, $\;0.\overline{3}$, $\;\sqrt{16}$`, m`$\sqrt2$, $\;\sqrt{50}$, $\;\pi$`],
          ],
        },
      ],
    },
    {
      title: 'ריבועים ושורשים',
      emoji: '√',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'ריבועים שלמים',
          md: m`$1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144$

$\sqrt n$ שלם **רק** אם $n$ ריבוע שלם. אחרת — $\sqrt n$ אי-רציונלי.`,
        },
        {
          type: 'steps',
          title: m`אומדן $\sqrt{50}$`,
          steps: [
            { math: m`49<50<64`, note: 'בין אילו ריבועים?' },
            { math: m`7<\sqrt{50}<8`, note: 'השורשים שלהם.' },
            { math: m`\sqrt{50}\approx7.1`, note: '50 קרוב מאוד ל-49.' },
          ],
        },
      ],
    },
    {
      title: 'שבר מחזורי ← שבר פשוט',
      emoji: '🔁',
      blocks: [
        {
          type: 'table',
          head: ['המחזור', 'הכלל', 'דוגמה'],
          rows: [
            ['ספרה אחת', m`הספרה $\div9$`, m`$0.\overline{3}=\frac39=\frac13$`],
            ['שתי ספרות', m`המחזור $\div99$`, m`$0.\overline{12}=\frac{12}{99}=\frac{4}{33}$`],
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
          md: m`- $\sqrt{16}=4$ — **רציונלי**, למרות שיש שורש.
- $\pi\ne3.14$ — $3.14$ הוא רק קירוב.
- $\sqrt{a+b}\ne\sqrt a+\sqrt b$: $\sqrt{9+16}=5$, אבל $\sqrt9+\sqrt{16}=7$.`,
        },
      ],
    },
  ],
};
