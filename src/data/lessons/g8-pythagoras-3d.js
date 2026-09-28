import { c, GREEN, m, VIOLET } from './tex.js';

// תיבה עם אלכסון הבסיס (סגול, מקווקו) ואלכסון מרחבי (אדום)
const BOX_SVG = `<div class='diagram-box'><svg viewBox='0 0 240 170' width='240' xmlns='http://www.w3.org/2000/svg' style='direction:ltr'>
<polygon points='30,140 170,140 210,105 70,105' fill='rgba(124,77,204,0.08)' stroke='#0d6e6e' stroke-width='2'/>
<line x1='30' y1='140' x2='30' y2='50' stroke='#0d6e6e' stroke-width='2'/>
<line x1='170' y1='140' x2='170' y2='50' stroke='#0d6e6e' stroke-width='2'/>
<line x1='210' y1='105' x2='210' y2='15' stroke='#0d6e6e' stroke-width='2'/>
<line x1='70' y1='105' x2='70' y2='15' stroke='#0d6e6e' stroke-width='1.5' stroke-dasharray='4 3'/>
<polygon points='30,50 170,50 210,15 70,15' fill='none' stroke='#0d6e6e' stroke-width='2'/>
<line x1='30' y1='140' x2='210' y2='105' stroke='#7c4dcc' stroke-width='2.5' stroke-dasharray='6 4'/>
<line x1='30' y1='140' x2='210' y2='15' stroke='#c45c48' stroke-width='3'/>
<text x='100' y='158' text-anchor='middle' font-size='12' fill='#1a2b3c'>a</text>
<text x='197' y='130' font-size='12' fill='#1a2b3c'>b</text>
<text x='218' y='65' font-size='12' fill='#1a2b3c'>h</text>
<text x='130' y='135' font-size='11' font-weight='700' fill='#7c4dcc'>d</text>
<text x='120' y='66' font-size='11' font-weight='700' fill='#c45c48'>D</text>
</svg></div>`;

export default {
  id: 'g8-pythagoras-3d',
  topicId: 'g8-pythagoras-3d',
  grade: 8,
  emoji: '📦',
  title: 'פיתגורס במרחב — תיבה',
  subtitle: 'אלכסון פאה ואלכסון מרחבי: פיתגורס פעמיים',
  sections: [
    {
      id: 'face',
      emoji: '▭',
      title: 'אלכסון של פאה',
      blocks: [
        {
          type: 'text',
          md: m`לתיבה 3 מידות: **אורך** $a$, **רוחב** $b$, **גובה** $h$.

כל פאה היא **מלבן**, והאלכסון שלו יוצר עם שתי צלעות **משולש ישר-זווית**. אז — פיתגורס רגיל!`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'אלכסון פאה',
          md: m`$$d=\sqrt{a^2+b^2}$$
(שתיים מתוך שלוש המידות)`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'd =',
        prompt: 'בסיס של תיבה הוא מלבן 6×8. מה אורך אלכסון הבסיס?',
        answer: 10,
        hint: m`$\sqrt{6^2+8^2}$`,
        explain: m`$\sqrt{36+64}=\sqrt{100}=10$`,
      },
    },
    {
      id: 'space',
      emoji: '🚀',
      title: 'האלכסון המרחבי',
      blocks: [
        {
          type: 'text',
          md: m`**האלכסון המרחבי** $D$ חוצה את **פנים** התיבה — מפינה תחתונה לפינה העליונה הנגדית.

${BOX_SVG}`,
        },
        {
          type: 'steps',
          title: 'פיתגורס פעמיים — תיבה 3×4×12',
          steps: [
            { math: m`d=\sqrt{3^2+4^2}=${c(VIOLET, '5')}`, note: 'פעם 1: אלכסון הבסיס (סגול).' },
            { math: m`D=\sqrt{${c(VIOLET, '5')}^2+12^2}`, note: m`פעם 2: משולש ישר-זווית חדש — $d$ ניצב אחד, הגובה ניצב שני.` },
            { math: m`D=\sqrt{25+144}=\sqrt{169}=${c(GREEN, '13')}`, note: 'האלכסון המרחבי (אדום).' },
          ],
        },
        {
          type: 'card',
          tone: 'key',
          title: 'קיצור דרך',
          md: m`$$D=\sqrt{a^2+b^2+h^2}$$
כל שלוש המידות, ישר בנוסחה אחת.`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'D =',
        prompt: 'מה האלכסון המרחבי של תיבה 2×3×6?',
        answer: 7,
        hint: m`$\sqrt{2^2+3^2+6^2}=\sqrt{4+9+36}$`,
        explain: m`$\sqrt{49}=7$`,
      },
    },
    {
      id: 'cube',
      emoji: '🏆',
      title: 'שלב הבוס: קובייה',
      blocks: [
        {
          type: 'card',
          tone: 'tip',
          title: 'שימו לב',
          md: m`האלכסון המרחבי **תמיד ארוך** מכל אלכסון פאה — הוא משתמש בכל שלוש המידות.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'מה האלכסון המרחבי של קובייה שמקצועה 2?',
        options: [m`$\sqrt{8}$`, m`$\sqrt{12}$`, m`$6$`, m`$4$`],
        answer: 1,
        hint: m`בקובייה כל המידות שוות: $\sqrt{2^2+2^2+2^2}$.`,
        explain: m`$\sqrt{4+4+4}=\sqrt{12}\approx3.46$`,
      },
    },
  ],
};
