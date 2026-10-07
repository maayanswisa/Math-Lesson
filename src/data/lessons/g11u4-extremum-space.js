import { c, GREEN, m } from './tex.js';

export default {
  id: 'g11u4-extremum-space',
  topicId: 'g11-u4-extremum-space',
  grade: 11,
  units: 4,
  emoji: '🧊',
  title: 'בעיות קיצון במרחב',
  subtitle: 'תיבה סגורה, אילוץ מקצועות, גליל ופירמידה',
  sections: [
    {
      id: 'closed-box',
      emoji: '📦',
      title: 'תיבה סגורה — שטח פנים מינימלי',
      blocks: [
        {
          type: 'boxopt',
          caption: 'תיבה מגיליון: שנו את גודל הריבוע הנחתך וראו איך הנפח משתנה.',
        },
        {
          type: 'steps',
          title: 'תיבה סגורה עם בסיס ריבועי ונפח 64',
          steps: [
            { math: m`a^2h=64\Rightarrow h=\frac{64}{a^2}`, note: 'מהאילוץ.' },
            { math: m`S=2a^2+4ah=2a^2+\frac{256}{a}`, note: 'שטח הפנים כפונקציה של a.' },
            { math: m`S'=4a-\frac{256}{a^2}=0\Rightarrow a^3=64\Rightarrow a=4`, note: 'גוזרים.' },
            { math: m`h=4,\quad S=${c(GREEN, '96')}`, note: 'קובייה!' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'S =',
        prompt: m`תיבה סגורה עם בסיס ריבועי ונפח $27$. מהו שטח הפנים המינימלי?`,
        answer: 54,
        hint: m`הפתרון — קובייה: $a^3=27$.`,
        explain: m`$S=2a^2+\frac{108}{a}$, $S'=4a-\frac{108}{a^2}=0\Rightarrow a=3$. קובייה עם צלע $3$: $S=6\cdot9=54$.`,
      },
    },
    {
      id: 'edges',
      emoji: '🧵',
      title: 'אילוץ על סכום המקצועות',
      blocks: [
        {
          type: 'steps',
          title: 'תיבה עם בסיס ריבועי, סכום כל המקצועות 48',
          steps: [
            { math: m`8a+4h=48\Rightarrow h=12-2a`, note: '8 מקצועות בבסיסים, 4 גבהים.' },
            { math: m`V=a^2(12-2a)=12a^2-2a^3`, note: 'הנפח, בתחום 0<a<6.' },
            { math: m`V'=24a-6a^2=0\Rightarrow a=4`, note: 'גוזרים.' },
            { math: m`h=4,\quad V=${c(GREEN, '64')}`, note: 'שוב קובייה.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'V =',
        prompt: m`תיבה עם בסיס ריבועי, וסכום כל המקצועות שלה $36$. מהו הנפח המקסימלי?`,
        answer: 27,
        hint: m`$h=9-2a$, $V=a^2(9-2a)$.`,
        explain: m`$V'=18a-6a^2=0\Rightarrow a=3$, $h=3$, $V=27$.`,
      },
    },
    {
      id: 'cylinder',
      emoji: '🥫',
      title: 'גליל',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'נוסחאות הגליל',
          md: m`נפח $\pi r^2h$ · שטח פנים סגור $2\pi r^2+2\pi rh$ · בלי מכסה: $\pi r^2+2\pi rh$`,
        },
        {
          type: 'steps',
          title: m`גליל סגור בנפח $16\pi$ — שטח פנים מינימלי`,
          steps: [
            { math: m`h=\frac{16}{r^2}`, note: 'מהנפח: πr²h = 16π.' },
            { math: m`S=2\pi r^2+\frac{32\pi}{r}`, note: 'שטח הפנים.' },
            { math: m`S'=4\pi r-\frac{32\pi}{r^2}=0\Rightarrow r^3=8\Rightarrow r=2`, note: 'גוזרים.' },
            { math: m`h=4=2r,\quad S=${c(GREEN, '24\\pi')}`, note: 'הגובה שווה לקוטר.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'r =',
        prompt: m`גליל **בלי מכסה** בנפח $8\pi$. באיזה רדיוס שטח הפנים מינימלי?`,
        answer: 2,
        hint: m`$S=\pi r^2+2\pi rh$ עם $h=\frac{8}{r^2}$: $S=\pi r^2+\frac{16\pi}{r}$.`,
        explain: m`$S'=2\pi r-\frac{16\pi}{r^2}=0\Rightarrow r^3=8\Rightarrow r=2$.`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: פירמידה',
      blocks: [
        {
          type: 'steps',
          title: 'פירמידה ריבועית ישרה: צלע הבסיס ועוד הגובה = 12',
          steps: [
            { math: m`h=12-a,\quad V=\frac13a^2(12-a)`, note: 'נפח פירמידה: שליש בסיס כפול גובה.' },
            { math: m`V'=\frac13(24a-3a^2)=0\Rightarrow a=8`, note: 'גוזרים.' },
            { math: m`h=4,\quad V=\frac13\cdot64\cdot4=${c(GREEN, '\\frac{256}{3}')}`, note: '≈ 85.3' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'a =',
        prompt: m`פירמידה ריבועית ישרה שבה צלע הבסיס ועוד הגובה שווים $9$. באיזו צלע בסיס הנפח מקסימלי?`,
        answer: 6,
        hint: m`$V=\frac13a^2(9-a)$`,
        explain: m`$V'=\frac13(18a-3a^2)=0\Rightarrow a=6$ (ואז $h=3$).`,
      },
    },
  ],
};
