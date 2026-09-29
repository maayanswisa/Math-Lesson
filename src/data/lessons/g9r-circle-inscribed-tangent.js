const TANGENT_SVG = `<div class='diagram-box'><svg viewBox='0 0 260 190' width='260' xmlns='http://www.w3.org/2000/svg' style='direction:ltr'><circle cx='90' cy='95' r='60' fill='rgba(13,110,110,0.06)' stroke='#0d6e6e' stroke-width='2.5'/><circle cx='90' cy='95' r='3.5' fill='#1a2b3c'/><circle cx='240' cy='95' r='4' fill='#c45c48'/><line x1='240' y1='95' x2='114' y2='40' stroke='#c45c48' stroke-width='2.5'/><line x1='240' y1='95' x2='114' y2='150' stroke='#c45c48' stroke-width='2.5'/><line x1='90' y1='95' x2='114' y2='40' stroke='#7c4dcc' stroke-width='2'/><line x1='90' y1='95' x2='114' y2='150' stroke='#7c4dcc' stroke-width='2'/><text x='250' y='90' font-size='12' font-weight='700' fill='#c45c48'>P</text><text x='180' y='60' font-size='11' font-weight='700' fill='#c45c48'>=</text><text x='180' y='138' font-size='11' font-weight='700' fill='#c45c48'>=</text></svg></div>`;

export default {
  id: 'g9r-circle-inscribed-tangent',
  topicId: 'g9r-circle-inscribed-tangent',
  grade: 9,
  emoji: '🎯',
  title: 'זווית היקפית ומשיק',
  subtitle: 'היקפית = חצי מרכזית, זווית על קוטר, ותכונות המשיק',
  sections: [
    {
      id: 'inscribed',
      emoji: '✨',
      title: 'הזווית ההיקפית',
      blocks: [
        {
          type: 'text',
          md: '**זווית היקפית** — הקודקוד שלה **על המעגל**, וצלעותיה מיתרים.',
        },
        {
          type: 'circletheorems',
          mode: 'inscribed',
          caption: 'הזיזו את P לאורך המעגל — מה קורה לזווית ההיקפית?',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'משפט הזווית ההיקפית',
          md: 'זווית היקפית = **חצי** מהזווית המרכזית שנשענת על אותה קשת. לכן כל ההיקפיות על אותה קשת **שוות**.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '°',
        prompt: 'זווית מרכזית 110°. מה הזווית ההיקפית שנשענת על אותה קשת?',
        answer: 55,
        hint: 'חצי.',
        explain: '110° ÷ 2 = 55°.',
      },
    },
    {
      id: 'diameter',
      emoji: '📐',
      title: 'זווית על קוטר',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'תמיד 90°',
          md: 'זווית היקפית שנשענת על **קוטר** היא **ישרה**: הזווית המרכזית על קוטר היא 180°, וחציה 90°. (נסו בכלי למעלה: "גודל הקשת" על 180)',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'משולש חסום במעגל, ואחת הצלעות שלו היא קוטר. מה נכון?',
        options: ['הוא שווה-צלעות', 'הוא ישר-זווית', 'הוא קהה-זווית', 'אין מספיק מידע'],
        answer: 1,
        hint: 'הזווית שמול הקוטר נשענת עליו.',
        explain: 'הזווית שמול הקוטר היא זווית היקפית על קוטר — 90°.',
      },
    },
    {
      id: 'tangent',
      emoji: '🏆',
      title: 'שלב הבוס: משיק',
      blocks: [
        {
          type: 'text',
          md: `**משיק** — ישר שנוגע במעגל בנקודה **אחת** בלבד.

${TANGENT_SVG}`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שתי תכונות',
          md: '**המשיק מאונך לרדיוס** בנקודת ההשקה.\n\n**שני משיקים מנקודה חיצונית** (P) — **שווים** באורכם.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'מנקודה P יוצאים שני משיקים למעגל. אחד מהם באורך 12. מה אורך השני?',
        answer: 12,
        hint: 'שני משיקים מאותה נקודה חיצונית...',
        explain: 'שני משיקים מאותה נקודה חיצונית שווים: 12.',
      },
    },
  ],
};
