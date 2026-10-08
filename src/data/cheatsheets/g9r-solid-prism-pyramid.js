const m = String.raw;

export default {
  topicId: 'g9r-solid-prism-pyramid',
  emoji: '📋',
  title: 'דף עזר: תיבה, מנסרה ופירמידה',
  subtitle: 'נפח ושטח פנים, ופיתגורס במרחב',
  sections: [
    {
      title: 'הנוסחאות',
      emoji: '📦',
      blocks: [
        {
          type: 'table',
          head: ['הגוף', 'נפח', 'שטח פנים'],
          rows: [
            ['תיבה', m`$V=abc$`, m`$S=2(ab+bc+ac)$`],
            ['קובייה', m`$V=a^3$`, m`$S=6a^2$`],
            ['מנסרה', m`$V=S_{\text{base}}\cdot h$`, m`$2S_{\text{base}}+P_{\text{base}}\cdot h$`],
            ['פירמידה', m`$V=\frac13S_{\text{base}}\cdot h$`, 'בסיס + סכום הפאות הצדדיות'],
          ],
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'סימונים',
          md: m`$S_{\text{base}}$ — שטח הבסיס · $P_{\text{base}}$ — היקף הבסיס · $h$ — גובה הגוף.`,
        },
      ],
    },
    {
      title: 'דוגמאות',
      emoji: '✏️',
      blocks: [
        {
          type: 'steps',
          title: 'מנסרה משולשת: בסיס ישר-זווית עם ניצבים 3 ו-4, גובה 10',
          steps: [
            { math: m`S_{\text{base}}=\frac{3\cdot4}{2}=6`, note: 'שטח הבסיס.' },
            { math: m`V=6\cdot10=60`, note: 'הנפח.' },
            { math: m`P_{\text{base}}=3+4+5=12`, note: 'היתר 5 (פיתגורס).' },
            { math: m`S=2\cdot6+12\cdot10=132`, note: 'שטח הפנים.' },
          ],
        },
        {
          type: 'steps',
          title: 'פירמידה ריבועית: צלע בסיס 6, גובה 4',
          steps: [
            { math: m`V=\frac13\cdot36\cdot4=48`, note: 'הנפח.' },
            { math: m`h_s=\sqrt{4^2+3^2}=5`, note: 'גובה הפאה (אפותמה): מהגובה ומחצי צלע הבסיס.' },
            { math: m`S=36+4\cdot\frac{6\cdot5}{2}=96`, note: 'בסיס + 4 משולשים.' },
          ],
        },
      ],
    },
    {
      title: 'פיתגורס במרחב',
      emoji: '📐',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'אלכסון התיבה',
          md: m`$$d=\sqrt{a^2+b^2+c^2}$$

תיבה $3\times4\times12$: $\;d=\sqrt{9+16+144}=13$.`,
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
          md: m`- בפירמידה שוכחים את ה-$\frac13$.
- מבלבלים בין **גובה הפירמידה** לבין **גובה הפאה**.
- יחידות: נפח ביחידות **מעוקבות** (סמ"ק), שטח ב**רבועות** (סמ"ר).`,
        },
      ],
    },
  ],
};
