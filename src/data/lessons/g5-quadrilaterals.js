import { m } from './tex.js';

// משפחת המרובעים: קופסאות בתוך קופסאות
const FAMILY_SVG = `<div class='diagram-box'><svg viewBox='0 0 300 170' width='300' xmlns='http://www.w3.org/2000/svg' style='direction:rtl'><rect x='5' y='5' width='290' height='160' rx='12' fill='rgba(74,93,115,0.05)' stroke='#4a5d73' stroke-width='1.5'/><text x='285' y='24' font-size='13' font-weight='700' fill='#4a5d73'>מרובעים</text><rect x='95' y='35' width='190' height='122' rx='10' fill='rgba(13,110,110,0.08)' stroke='#0d6e6e' stroke-width='1.5'/><text x='275' y='54' font-size='12' font-weight='700' fill='#0a5555'>מקביליות</text><rect x='175' y='64' width='100' height='84' rx='8' fill='rgba(196,92,72,0.1)' stroke='#c45c48' stroke-width='1.5'/><text x='265' y='82' font-size='11' font-weight='700' fill='#a13a2a'>מלבנים</text><rect x='105' y='64' width='100' height='84' rx='8' fill='rgba(124,77,204,0.1)' stroke='#7c4dcc' stroke-width='1.5'/><text x='120' y='82' font-size='11' font-weight='700' fill='#5f38a3' text-anchor='start' direction='rtl'>מעוינים</text><rect x='178' y='95' width='24' height='45' fill='rgba(226,160,32,0.35)' stroke='#b97e12' stroke-width='1.5'/><text x='190' y='122' font-size='10' font-weight='700' fill='#1a2b3c' text-anchor='middle'>ריבוע</text><text x='50' y='80' font-size='12' font-weight='700' fill='#1a2b3c' text-anchor='middle'>טרפז</text><polygon points='25,110 75,110 65,90 35,90' fill='none' stroke='#1a2b3c' stroke-width='1.5'/><text x='50' y='132' font-size='12' font-weight='700' fill='#1a2b3c' text-anchor='middle'>דלתון</text><polygon points='50,138 62,148 50,162 38,148' fill='none' stroke='#1a2b3c' stroke-width='1.5'/></svg></div>`;

export default {
  id: 'g5-quadrilaterals',
  topicId: 'g5-quadrilaterals',
  grade: 5,
  emoji: '🔲',
  title: 'מרובעים — סוגים ותכונות',
  subtitle: 'משפחת המרובעים: מי שייך למי, ומה מיוחד באלכסונים',
  sections: [
    {
      id: 'family',
      emoji: '👨‍👩‍👧',
      title: 'משפחת המרובעים',
      blocks: [
        {
          type: 'text',
          md: m`כל צורה עם 4 צלעות היא **מרובע**. בתוך המשפחה יש "משפחות קטנות":

${FAMILY_SVG}`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'מי זה מי',
          md: `**מקבילית** — 2 זוגות צלעות מקבילות

**מלבן** — מקבילית עם 4 זוויות ישרות

**מעוין** — מקבילית עם 4 צלעות שוות

**ריבוע** — גם מלבן וגם מעוין!

**טרפז** — רק זוג **אחד** של צלעות מקבילות

**דלתון** — 2 זוגות צלעות **סמוכות** שוות (כמו עפיפון 🪁)`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'איזה משפט נכון?',
        options: ['כל מלבן הוא ריבוע', 'כל ריבוע הוא מלבן', 'כל מקבילית היא מעוין', 'כל טרפז הוא מקבילית'],
        answer: 1,
        hint: 'לריבוע יש 4 זוויות ישרות?',
        explain: 'לריבוע 4 זוויות ישרות — ולכן הוא מלבן. אבל לא כל מלבן הוא ריבוע (הצלעות לא חייבות להיות שוות).',
      },
    },
    {
      id: 'diagonals',
      emoji: '✖️',
      title: 'האלכסונים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'כל משפחה מקבלת עוד תכונה',
          md: `**מקבילית** — האלכסונים **חוצים זה את זה** (נפגשים באמצע של שניהם).

**מלבן** — חוצים, וגם **שווים באורכם**.

**מעוין** — חוצים, וגם **מאונכים** (זווית ישרה ביניהם).

**ריבוע** — **הכול ביחד**: חוצים, שווים ומאונכים.`,
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'דלתון',
          md: 'אלכסון אחד (ציר הסימטריה) חוצה את השני **בזווית ישרה**.',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'במרובע, האלכסונים חוצים זה את זה ושווים באורכם, אבל לא מאונכים. מה המרובע?',
        options: ['מעוין', 'מלבן', 'ריבוע', 'טרפז'],
        answer: 1,
        hint: 'שווים = מלבן. מאונכים = מעוין.',
        explain: 'אלכסונים שווים וחוצים — מלבן. (אם היו גם מאונכים — ריבוע)',
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: מי אני?',
      blocks: [
        {
          type: 'text',
          md: '"יש לי 4 צלעות שוות, אבל הזוויות שלי לא ישרות." → **מעוין** (לא ריבוע!)',
        },
      ],
      challenge: {
        type: 'choice',
        prompt: '"יש לי בדיוק זוג אחד של צלעות מקבילות." מי אני?',
        options: ['מקבילית', 'דלתון', 'טרפז', 'מלבן'],
        answer: 2,
        hint: 'למקבילית ולמלבן יש שני זוגות.',
        explain: 'זוג אחד בלבד של צלעות מקבילות — טרפז.',
      },
    },
  ],
};
