const m = String.raw;

export default {
  topicId: 'g8-algebra-technique',
  emoji: '📋',
  title: 'דף עזר: פילוג מורחב, פירוק וצמצום',
  subtitle: 'כפל שני סוגריים, משוואה עם גורם משותף, וצמצום שברים אלגבריים',
  sections: [
    {
      title: 'כפל סוגריים',
      emoji: '✖️',
      blocks: [
        {
          type: 'table',
          head: ['הכלל', 'דוגמה'],
          rows: [
            [m`$a(b+c)=ab+ac$`, m`$3(x-4)=3x-12$`],
            [m`$(a+b)(c+d)=ac+ad+bc+bd$`, m`$(x+3)(x-2)=x^2+x-6$`],
            [m`$(a+b)^2=a^2+2ab+b^2$`, m`$(x+5)^2=x^2+10x+25$`],
            [m`$(a-b)^2=a^2-2ab+b^2$`, m`$(x-3)^2=x^2-6x+9$`],
            [m`$(a+b)(a-b)=a^2-b^2$`, m`$(x+4)(x-4)=x^2-16$`],
          ],
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'הטעות הכי נפוצה',
          md: m`$(a+b)^2\ne a^2+b^2$! שוכחים את האיבר האמצעי $2ab$.`,
        },
      ],
    },
    {
      title: 'משוואה עם גורם משותף',
      emoji: '⚖️',
      blocks: [
        {
          type: 'steps',
          title: m`$x^2-5x=0$`,
          steps: [
            { math: m`x(x-5)=0`, note: 'מוציאים x כגורם משותף.' },
            { math: m`x=0\ \lor\ x=5`, note: 'מכפלה שווה 0 ← אחד הגורמים 0 (∨ = "או").' },
          ],
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'לא מחלקים ב-x!',
          md: m`חלוקה ב-$x$ "מעלימה" את הפתרון $x=0$. תמיד מוציאים גורם משותף.`,
        },
      ],
    },
    {
      title: 'צמצום שברים אלגבריים',
      emoji: '✂️',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'מפרקים — ואז מצמצמים',
          md: m`$$\frac{2x+4}{x+2}=\frac{2(x+2)}{x+2}=2\qquad(x\ne-2)$$

מצמצמים רק **גורמים** (מוכפלים), לא מחוברים: $\frac{x+4}{x}\ne4$!`,
        },
      ],
    },
  ],
};
