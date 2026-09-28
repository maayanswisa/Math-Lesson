import { m } from './tex.js';

const KINDS_SVG = `<div class='diagram-box'><svg viewBox='0 0 300 115' width='300' xmlns='http://www.w3.org/2000/svg' style='direction:ltr'><polygon points='20,95 90,95 55,20' fill='rgba(13,110,110,0.08)' stroke='#0d6e6e' stroke-width='2.5'/><line x1='55' y1='95' x2='55' y2='20' stroke='#c45c48' stroke-width='2' stroke-dasharray='4'/><text x='55' y='110' text-anchor='middle' font-size='11' fill='#1a2b3c'>חד-זווית</text><polygon points='130,95 200,95 130,20' fill='rgba(13,110,110,0.08)' stroke='#0d6e6e' stroke-width='2.5'/><line x1='130' y1='95' x2='130' y2='20' stroke='#c45c48' stroke-width='3'/><rect x='130' y='83' width='12' height='12' fill='none' stroke='#0d6e6e'/><text x='165' y='110' text-anchor='middle' font-size='11' fill='#1a2b3c'>ישר-זווית</text><line x1='225' y1='95' x2='250' y2='95' stroke='#1670b3' stroke-width='1.5' stroke-dasharray='4'/><polygon points='250,95 295,95 225,30' fill='rgba(13,110,110,0.08)' stroke='#0d6e6e' stroke-width='2.5'/><line x1='225' y1='95' x2='225' y2='30' stroke='#c45c48' stroke-width='2' stroke-dasharray='4'/><text x='262' y='110' text-anchor='middle' font-size='11' fill='#1a2b3c'>קהה-זווית</text></svg></div>`;

export default {
  id: 'g5-triangle-height',
  topicId: 'g5-triangle-height',
  grade: 5,
  emoji: '📐',
  title: 'גובה של משולש',
  subtitle: 'מה זה גובה, סוגי משולשים לפי זוויות, וגובה שנופל בחוץ',
  sections: [
    {
      id: 'what',
      emoji: '📏',
      title: 'מה זה גובה?',
      blocks: [
        {
          type: 'text',
          md: m`**גובה** = קו ישר מ**קודקוד** אל הצלע שמולו (הבסיס), שפוגש אותה ב**זווית ישרה** ($90°$).

כמו למדוד את הגובה שלכם: עומדים **ישר**, לא באלכסון!`,
        },
        {
          type: 'shape',
          shape: 'triangle',
          caption: 'הקו האדום המקווקו הוא הגובה. הזיזו את הקודקוד:',
          base: 6,
          height: 4,
          shift: 2,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'באיזו זווית פוגש הגובה את הבסיס?',
        options: ['45°', '90°', '180°', 'תלוי במשולש'],
        answer: 1,
        hint: 'הגובה תמיד "עומד ישר".',
        explain: 'הגובה תמיד מאונך לבסיס — זווית של 90°.',
      },
    },
    {
      id: 'kinds',
      emoji: '🔺',
      title: 'שלושה סוגי משולשים',
      blocks: [
        {
          type: 'text',
          md: m`${KINDS_SVG}

- **חד-זווית** — כל הזוויות קטנות מ-$90°$. הגובה **בפנים**.
- **ישר-זווית** — זווית אחת של $90°$. **צלע** היא הגובה!
- **קהה-זווית** — זווית אחת גדולה מ-$90°$. גובה יכול ליפול **בחוץ**.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'במשולש יש זווית של 120°. איזה משולש זה?',
        options: ['חד-זווית', 'ישר-זווית', 'קהה-זווית', 'שווה-צלעות'],
        answer: 2,
        hint: '120° גדול מ-90°.',
        explain: 'זווית גדולה מ-90° נקראת קהה — משולש קהה-זווית.',
      },
    },
    {
      id: 'outside',
      emoji: '🏆',
      title: 'שלב הבוס: גובה בחוץ',
      blocks: [
        {
          type: 'text',
          md: 'במשולש קהה-זווית, הגובה לפעמים לא פוגש את הבסיס עצמו. אז **מאריכים את הבסיס** — והגובה פוגש את ההמשך.',
        },
        {
          type: 'shape',
          shape: 'triangle',
          caption: 'הזיזו את הקודקוד מעבר לקצה הבסיס:',
          base: 5,
          height: 4,
          shift: 7,
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'שלושה גבהים',
          md: 'כל צלע יכולה להיות בסיס — ולכן לכל משולש יש **3 גבהים**.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'כמה גבהים יש לכל משולש?',
        answer: 3,
        hint: 'גובה אחד לכל צלע.',
        explain: '3 צלעות — 3 גבהים.',
      },
    },
  ],
};
