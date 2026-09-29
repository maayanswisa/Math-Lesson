import { c, GREEN, m, VIOLET } from './tex.js';

const CONE_SVG = `<div class='diagram-box'><svg viewBox='0 0 200 170' width='200' xmlns='http://www.w3.org/2000/svg' style='direction:ltr'><ellipse cx='100' cy='140' rx='70' ry='16' fill='rgba(13,110,110,0.1)' stroke='#0d6e6e' stroke-width='2.5'/><line x1='30' y1='140' x2='100' y2='20' stroke='#0d6e6e' stroke-width='2.5'/><line x1='170' y1='140' x2='100' y2='20' stroke='#c45c48' stroke-width='3'/><line x1='100' y1='20' x2='100' y2='140' stroke='#7c4dcc' stroke-width='2.5' stroke-dasharray='5 4'/><line x1='100' y1='140' x2='170' y2='140' stroke='#1670b3' stroke-width='2.5'/><rect x='100' y='128' width='12' height='12' fill='none' stroke='#7c4dcc' stroke-width='1.5'/><text x='92' y='85' text-anchor='end' font-size='13' font-weight='700' fill='#7c4dcc'>h</text><text x='142' y='75' font-size='13' font-weight='700' fill='#c45c48'>l</text><text x='135' y='158' text-anchor='middle' font-size='13' font-weight='700' fill='#1670b3'>r</text></svg></div>`;

export default {
  id: 'g9r-solid-cylinder-cone',
  topicId: 'g9r-solid-cylinder-cone',
  grade: 9,
  emoji: '🍦',
  title: 'גליל וחרוט',
  subtitle: 'נפח ושטח פנים — וגובה מול גובה משופע',
  sections: [
    {
      id: 'cylinder',
      emoji: '🥫',
      title: 'גליל = מנסרה עגולה',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'גליל',
          md: m`**נפח** = שטח הבסיס × גובה $=\pi r^2h$

**שטח פנים** = שני עיגולים + מעטפת $=2\pi r^2+2\pi rh$`,
        },
        {
          type: 'card',
          tone: 'why',
          title: 'המעטפת',
          md: m`פורשים אותה — מלבן. רוחבו = היקף הבסיס $2\pi r$, וגובהו $h$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה נפח גליל עם $r=3$ ו-$h=5$?`,
        options: [m`$15\pi$`, m`$30\pi$`, m`$45\pi$`, m`$75\pi$`],
        answer: 2,
        hint: m`$\pi\cdot3^2\cdot5$`,
        explain: m`$9\cdot5\pi=45\pi$`,
      },
    },
    {
      id: 'cone',
      emoji: '🍦',
      title: 'חרוט = פירמידה עגולה',
      blocks: [
        {
          type: 'text',
          md: m`${CONE_SVG}

**הגובה** $h$ (סגול) — מאונך מהפסגה למרכז הבסיס. **הגובה המשופע** $l$ (אדום) — מהפסגה לשפת הבסיס. ביניהם — משולש ישר-זווית!`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'חרוט',
          md: m`**נפח** $=\frac13\pi r^2h$ (שליש גליל) · $l=\sqrt{r^2+h^2}$ · **שטח פנים** $=\pi r^2+\pi rl$`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'l =',
        prompt: m`בחרוט $r=6$ ו-$h=8$. מה הגובה המשופע?`,
        answer: 10,
        hint: m`$\sqrt{36+64}$`,
        explain: m`$\sqrt{100}=10$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: גליל מול חרוט',
      blocks: [
        {
          type: 'steps',
          title: m`חרוט וגליל עם אותו $r=3$ ו-$h=4$`,
          steps: [
            { math: m`V_{\text{cyl}}=\pi\cdot9\cdot4=${c(VIOLET, '36\\pi')}`, note: 'הגליל.' },
            { math: m`V_{\text{cone}}=\frac13\cdot36\pi=${c(GREEN, '12\\pi')}`, note: 'החרוט — בדיוק שליש.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'ממלאים חרוט במים ושופכים לגליל עם אותו בסיס ואותו גובה. כמה חרוטים ימלאו את הגליל?',
        options: ['2', '3', '4', 'חצי'],
        answer: 1,
        hint: 'נפח החרוט הוא איזה חלק מנפח הגליל?',
        explain: 'החרוט שליש מהגליל — צריך 3 חרוטים.',
      },
    },
  ],
};
