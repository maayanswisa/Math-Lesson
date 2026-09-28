import { m } from './tex.js';

const MIDSEG = `<div class='diagram-box'><svg viewBox='0 0 240 140' width='240' xmlns='http://www.w3.org/2000/svg' style='direction:ltr'><polygon points='20,120 220,120 90,20' fill='rgba(13,110,110,0.08)' stroke='#0d6e6e' stroke-width='2.5'/><line x1='55' y1='70' x2='155' y2='70' stroke='#c45c48' stroke-width='3.5'/><circle cx='55' cy='70' r='4' fill='#c45c48'/><circle cx='155' cy='70' r='4' fill='#c45c48'/><text x='105' y='64' text-anchor='middle' font-size='12' font-weight='700' fill='#c45c48'>5</text><text x='120' y='136' text-anchor='middle' font-size='12' font-weight='700' fill='#0d6e6e'>10</text></svg></div>`;

export default {
  id: 'g9r-geometry',
  topicId: 'g9r-geometry',
  grade: 9,
  emoji: '🔷',
  title: 'גאומטריה — מרובעים ומשולשים',
  subtitle: 'משפחת המרובעים, האלכסונים, קטע אמצעים ופיתגורס',
  sections: [
    {
      id: 'family',
      emoji: '👨‍👩‍👧',
      title: 'משפחת המרובעים והאלכסונים',
      blocks: [
        {
          type: 'text',
          md: 'כל **ריבוע** הוא גם **מלבן** וגם **מעוין**; כל מלבן ומעוין הם **מקביליות**. ככל שיורדים במשפחה — מתווספות תכונות לאלכסונים:',
        },
        {
          type: 'quad',
          caption: 'בחרו מרובע וראו מה נכון באלכסונים שלו:',
          shape: 'parallelogram',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'באיזה מרובע האלכסונים חוצים זה את זה, שווים, ומאונכים?',
        options: ['מקבילית', 'מלבן', 'מעוין', 'ריבוע'],
        answer: 3,
        hint: 'שווים — כמו מלבן. מאונכים — כמו מעוין.',
        explain: 'ריבוע הוא גם מלבן וגם מעוין — יש לו את כל התכונות.',
      },
    },
    {
      id: 'midsegment',
      emoji: '✂️',
      title: 'קטע אמצעים במשולש',
      blocks: [
        {
          type: 'text',
          md: `**קטע אמצעים** מחבר את האמצעים של שתי צלעות במשולש. הוא:

- **מקביל** לצלע השלישית
- **שווה למחצית** ממנה

${MIDSEG}`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'במשולש, צלע אחת 18 ס"מ. מה אורך קטע האמצעים המקביל לה?',
        answer: 9,
        hint: 'מחצית.',
        explain: '18 ÷ 2 = 9 ס"מ.',
      },
    },
    {
      id: 'pythagoras',
      emoji: '🏆',
      title: 'שלב הבוס: פיתגורס במלבן',
      blocks: [
        {
          type: 'text',
          md: m`האלכסון מחלק את המלבן לשני משולשים **ישרי-זווית**. לכן אורך האלכסון: $d=\sqrt{a^2+b^2}$.`,
        },
        {
          type: 'pythagoras',
          caption: 'צלעות המלבן הן הניצבים, והאלכסון הוא היתר:',
          a: 6,
          b: 8,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'מלבן 5 על 12. מה אורך האלכסון?',
        answer: 13,
        hint: m`$\sqrt{25+144}$`,
        explain: m`$\sqrt{169}=13$`,
      },
    },
  ],
};
