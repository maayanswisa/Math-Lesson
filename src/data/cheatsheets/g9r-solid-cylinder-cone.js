const m = String.raw;

export default {
  topicId: 'g9r-solid-cylinder-cone',
  emoji: '📋',
  title: 'דף עזר: גליל וחרוט',
  subtitle: 'נפח ושטח פנים, וקו היוצר של החרוט',
  sections: [
    {
      title: 'הנוסחאות',
      emoji: '🥫',
      blocks: [
        {
          type: 'table',
          head: ['', 'גליל', 'חרוט'],
          rows: [
            ['נפח', m`$V=\pi r^2h$`, m`$V=\frac13\pi r^2h$`],
            ['מעטפת', m`$2\pi rh$`, m`$\pi r\ell$`],
            ['שטח פנים', m`$2\pi r^2+2\pi rh$`, m`$\pi r^2+\pi r\ell$`],
            ['קו יוצר', '—', m`$\ell=\sqrt{r^2+h^2}$`],
          ],
          stack: 'columns',
        },
        {
          type: 'card',
          tone: 'why',
          title: 'מאיפה המעטפת של הגליל?',
          md: m`פורשים אותה למלבן: אורכו היקף הבסיס $2\pi r$ ורוחבו הגובה $h$.`,
        },
      ],
    },
    {
      title: 'דוגמאות',
      emoji: '✏️',
      blocks: [
        {
          type: 'steps',
          title: m`גליל: $r=3$, $h=10$`,
          steps: [
            { math: m`V=\pi\cdot9\cdot10=90\pi\approx282.7`, note: 'הנפח.' },
            { math: m`S=2\pi\cdot9+2\pi\cdot3\cdot10=78\pi`, note: 'שני בסיסים + מעטפת.' },
          ],
        },
        {
          type: 'steps',
          title: m`חרוט: $r=6$, $h=8$`,
          steps: [
            { math: m`\ell=\sqrt{36+64}=10`, note: 'קו היוצר (פיתגורס).' },
            { math: m`V=\frac13\pi\cdot36\cdot8=96\pi`, note: 'הנפח.' },
            { math: m`S=36\pi+60\pi=96\pi`, note: 'בסיס + מעטפת.' },
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
          md: m`- נתון **קוטר**? מחלקים ב-$2$ לפני שמציבים.
- בחרוט — המעטפת עם $\ell$ (קו יוצר), הנפח עם $h$ (גובה).
- כוס / צינור פתוח — בלי אחד הבסיסים (או שניהם).`,
        },
      ],
    },
  ],
};
