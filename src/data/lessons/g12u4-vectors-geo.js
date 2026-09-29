import { m } from './tex.js';

export default {
  id: 'g12u4-vectors-geo',
  topicId: 'g12-u4-vectors-geo',
  grade: 12,
  units: 4,
  emoji: '➡️',
  title: 'וקטורים בגישה גאומטרית',
  subtitle: 'גודל וכיוון, חיבור, כפל בסקלר וצירוף לינארי',
  sections: [
    {
      id: 'what',
      emoji: '🏹',
      title: 'מהו וקטור?',
      blocks: [
        {
          type: 'text',
          md: m`**וקטור** הוא חץ: יש לו **גודל** (אורך) ו**כיוון**. שני וקטורים שווים אם יש להם אותו גודל ואותו כיוון — **לא משנה איפה הם מתחילים**.

$\overrightarrow{BA}=-\overrightarrow{AB}$ — אותו אורך, כיוון הפוך.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`במקבילית $ABCD$, איזה וקטור שווה ל-$\overrightarrow{AB}$?`,
        options: [m`$\overrightarrow{CD}$`, m`$\overrightarrow{DC}$`, m`$\overrightarrow{BC}$`, m`$\overrightarrow{BA}$`],
        answer: 1,
        hint: 'צלעות נגדיות — ובאותו כיוון.',
        explain: m`$DC$ מקביל ושווה ל-$AB$, ובאותו כיוון. ($\overrightarrow{CD}$ — בכיוון ההפוך.)`,
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
          caption: m`$\vec u+\vec v$ — שמים את הזנב של אחד בראש של השני (כלל המקבילית). נסו גם את $k$:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שני כללים',
          md: m`**חיבור**: $\overrightarrow{AB}+\overrightarrow{BC}=\overrightarrow{AC}$ ("כלל המשולש")

**כפל בסקלר** $k\vec u$: אורך פי $|k|$; כיוון זהה אם $k>0$, הפוך אם $k<0$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`כמה זה $\overrightarrow{AB}+\overrightarrow{BC}+\overrightarrow{CA}$?`,
        options: [m`$\overrightarrow{AC}$`, m`$2\overrightarrow{AB}$`, m`$\vec 0$`, m`$\overrightarrow{CA}$`],
        answer: 2,
        hint: 'מתחילים ב-A... ואיפה מסיימים?',
        explain: m`יוצאים מ-$A$ וחוזרים ל-$A$ — וקטור האפס.`,
      },
    },
    {
      id: 'collinear',
      emoji: '📏',
      title: 'קולינאריות',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'על אותו ישר (או מקבילים)',
          md: m`$\vec u$ ו-$\vec v$ **קולינאריים** $\iff$ $\vec u=k\vec v$ עבור מספר $k$.

שימוש: להוכיח ששלוש נקודות על ישר אחד — מראים ש-$\overrightarrow{AB}=k\overrightarrow{AC}$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`$M$ אמצע $AB$. מה נכון?`,
        options: [m`$\overrightarrow{AM}=2\overrightarrow{AB}$`, m`$\overrightarrow{AM}=\frac12\overrightarrow{AB}$`, m`$\overrightarrow{AM}=\overrightarrow{BM}$`, m`$\overrightarrow{AM}=-\frac12\overrightarrow{AB}$`],
        answer: 1,
        hint: 'חצי מהדרך, באותו כיוון.',
        explain: m`$\overrightarrow{AM}=\frac12\overrightarrow{AB}$ (ו-$\overrightarrow{BM}=-\frac12\overrightarrow{AB}$).`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: צירוף לינארי',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'בסיס',
          md: m`במישור — כל וקטור הוא צירוף **יחיד** של שני וקטורים לא-קולינאריים: $\vec w=\alpha\vec u+\beta\vec v$.

במרחב — צריך **שלושה** וקטורים שאינם באותו מישור.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`במקבילית $ABCD$ נסמן $\overrightarrow{AB}=\vec u$, $\overrightarrow{AD}=\vec v$. מהו $\overrightarrow{BD}$?`,
        options: [m`$\vec u+\vec v$`, m`$\vec v-\vec u$`, m`$\vec u-\vec v$`, m`$-\vec u-\vec v$`],
        answer: 1,
        hint: m`$\overrightarrow{BD}=\overrightarrow{BA}+\overrightarrow{AD}$`,
        explain: m`$-\vec u+\vec v=\vec v-\vec u$`,
      },
    },
  ],
};
