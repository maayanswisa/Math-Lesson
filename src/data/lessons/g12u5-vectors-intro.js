import { m } from './tex.js';

export default {
  id: 'g12u5-vectors-intro',
  topicId: 'g12-u5-vectors-intro',
  grade: 12,
  units: 5,
  emoji: '➡️',
  title: 'וקטורים — מבוא',
  subtitle: 'גודל, כיוון, חיבור וכפל בסקלר',
  sections: [
    {
      id: 'define',
      emoji: '🏹',
      title: 'מה זה וקטור',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'גודל וכיוון',
          md: m`וקטור — קטע **מכוון**. שני וקטורים שווים אם יש להם אותו גודל ואותו כיוון — לא משנה איפה הם מתחילים.

$\overrightarrow{BA}=-\overrightarrow{AB}$

$\overrightarrow{AA}=\vec0$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`$ABCD$ מקבילית. איזה וקטור שווה ל-$\overrightarrow{AB}$?`,
        options: [m`$\overrightarrow{DC}$`, m`$\overrightarrow{CD}$`, m`$\overrightarrow{BC}$`, m`$\overrightarrow{AD}$`],
        answer: 0,
        hint: 'צלעות נגדיות, אותו כיוון.',
        explain: m`$AB\parallel DC$, שווים ובאותו כיוון.`,
      },
    },
    {
      id: 'add',
      emoji: '➕',
      title: 'חיבור וכפל בסקלר',
      blocks: [
        {
          type: 'vectors',
          mode: 'add',
          caption: m`חיבור לפי כלל המקבילית (או "ראש לזנב"), וכפל ב-$k$ — מתיחה:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'חוקים',
          md: m`$\vec u+\vec v=\vec v+\vec u$

$(s+t)\vec u=s\vec u+t\vec u$

$t(\vec u+\vec v)=t\vec u+t\vec v$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה $\overrightarrow{AB}+\overrightarrow{BC}+\overrightarrow{CA}$?`,
        options: [m`$\vec0$`, m`$2\overrightarrow{AB}$`, m`$\overrightarrow{AC}$`, m`$3\overrightarrow{AB}$`],
        answer: 0,
        hint: 'חוזרים לנקודת ההתחלה.',
        explain: m`$\overrightarrow{AA}=\vec0$`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: הבעה בעזרת בסיס',
      blocks: [
        {
          type: 'steps',
          title: m`במשולש $ABC$, $M$ אמצע $BC$. $\overrightarrow{AB}=\vec u$, $\overrightarrow{AC}=\vec v$`,
          steps: [
            { math: m`\overrightarrow{BC}=\vec v-\vec u`, note: 'מ-B ל-A ואז ל-C.' },
            { math: m`\overrightarrow{AM}=\vec u+\tfrac12(\vec v-\vec u)`, note: 'עד B ועוד חצי הדרך ל-C.' },
            { math: m`=\tfrac12(\vec u+\vec v)`, note: 'התיכון — ממוצע שני הווקטורים.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`באותו משולש, $G$ מפגש התיכונים. מה $\overrightarrow{AG}$?`,
        options: [m`$\frac13(\vec u+\vec v)$`, m`$\frac12(\vec u+\vec v)$`, m`$\frac23(\vec u+\vec v)$`, m`$\vec u+\vec v$`],
        answer: 0,
        hint: m`$\overrightarrow{AG}=\frac23\overrightarrow{AM}$`,
        explain: m`$\frac23\cdot\frac12(\vec u+\vec v)=\frac13(\vec u+\vec v)$`,
      },
    },
  ],
};
