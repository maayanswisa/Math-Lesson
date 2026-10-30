import { c, GREEN, m, SKY, VIOLET } from './tex.js';

/** משולש ABC עם DE מקביל ל-BC: AD = 4, DB = 2, DE = 6. */
const PARALLEL = `<div class='diagram-box'><svg viewBox='0 0 240 170' width='240' xmlns='http://www.w3.org/2000/svg' style='direction:ltr'><polygon points='120,14 24,150 216,150' fill='rgba(13,110,110,0.08)' stroke='#0d6e6e' stroke-width='2.2'/><polygon points='120,14 56,104.7 184,104.7' fill='rgba(124,77,204,0.14)' stroke='none'/><line x1='56' y1='104.7' x2='184' y2='104.7' stroke='#7c4dcc' stroke-width='2.4'/><text x='120' y='9' text-anchor='middle' font-size='13' font-weight='700' font-style='italic' fill='#1a2b3c'>A</text><text x='14' y='160' font-size='13' font-weight='700' font-style='italic' fill='#1a2b3c'>B</text><text x='220' y='160' font-size='13' font-weight='700' font-style='italic' fill='#1a2b3c'>C</text><text x='42' y='104' font-size='13' font-weight='700' font-style='italic' fill='#7c4dcc'>D</text><text x='190' y='104' font-size='13' font-weight='700' font-style='italic' fill='#7c4dcc'>E</text><text x='76' y='58' font-size='12' font-weight='700' fill='#1a2b3c'>4</text><text x='30' y='132' font-size='12' font-weight='700' fill='#1a2b3c'>2</text><text x='120' y='99' text-anchor='middle' font-size='12' font-weight='700' fill='#7c4dcc'>6</text><text x='120' y='166' text-anchor='middle' font-size='12' font-weight='700' fill='#1a2b3c'>?</text></svg></div>`;

export default {
  id: 'g11u3-space-similarity',
  topicId: 'g11-u3-space-similarity',
  grade: 11,
  units: 3,
  emoji: '📐',
  title: 'דמיון משולשים',
  subtitle: 'אותה צורה, גודל אחר — צלעות, צללים, ישר מקביל, היקף ושטח',
  sections: [
    {
      id: 'what',
      emoji: '🔍',
      title: 'מה זה משולשים דומים?',
      blocks: [
        {
          type: 'similar',
          caption: 'הגדילו את המשולש פי k וספרו כמה משולשים קטנים נכנסים בו:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'משפט דמיון ז.ז',
          md: m`אם **שתי זוויות** במשולש אחד שוות לשתי זוויות במשולש אחר — המשולשים **דומים**.

במשולשים דומים כל הצלעות המתאימות באותו יחס: $k$ — **יחס הדמיון**.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`במשולש אחד זוויות של $50°$ ו-$70°$, ובמשולש אחר זוויות של $70°$ ו-$60°$. האם הם דומים?`,
        options: ['כן — כל הזוויות שוות', 'לא', 'רק אם הצלעות שוות', 'אי אפשר לדעת'],
        answer: 0,
        hint: m`הזווית השלישית: $180°-50°-70°$`,
        explain: m`בראשון הזווית השלישית $60°$ — אותן שלוש זוויות, ולכן דומים.`,
      },
    },
    {
      id: 'sides',
      emoji: '📏',
      title: 'מוצאים צלע',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'צלעות מתאימות',
          md: m`צלעות מתאימות — מול זוויות שוות. כותבים פרופורציה:

$$\frac{a'}{a}=\frac{b'}{b}=\frac{c'}{c}=k$$`,
        },
        {
          type: 'steps',
          title: m`משולש עם צלעות $3$, $4$, $5$. במשולש דומה הצלע שמתאימה ל-$3$ היא $9$.`,
          steps: [
            { math: m`k=\frac93=${c(SKY, '3')}`, note: 'יחס הדמיון.' },
            { math: m`4\cdot3=12\qquad5\cdot3=${c(GREEN, '15')}`, note: 'שתי הצלעות האחרות.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'x =',
        prompt: m`שני משולשים דומים. במשולש הקטן צלעות $4$ ו-$6$. במשולש הגדול הצלע שמתאימה ל-$4$ היא $10$. מה הצלע שמתאימה ל-$6$?`,
        answer: 15,
        hint: m`$k=\frac{10}{4}=2.5$`,
        explain: m`$6\cdot2.5=15$`,
      },
    },
    {
      id: 'shadow',
      emoji: '🌳',
      title: 'צל ועץ',
      blocks: [
        {
          type: 'thales',
          caption: 'קרני השמש מקבילות — העץ והמקל יוצרים עם הצללים שלהם משולשים דומים:',
        },
        {
          type: 'steps',
          title: m`מקל באורך $1.5$ מ' מטיל צל של $2$ מ'. באותו זמן לעץ צל של $12$ מ'. מה גובה העץ?`,
          steps: [
            { math: m`\frac{h}{12}=\frac{1.5}{2}`, note: 'גובה לצל — באותו יחס.' },
            { math: m`h=12\cdot0.75=${c(GREEN, '9')}`, note: 'מטרים.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'מטר =',
        prompt: m`אדם בגובה $1.8$ מ' מטיל צל של $3$ מ'. באותו זמן לבניין צל של $25$ מ'. מה גובה הבניין?`,
        answer: 15,
        hint: m`$\frac{h}{25}=\frac{1.8}{3}$`,
        explain: m`$h=25\cdot0.6=15$ מטר`,
      },
    },
    {
      id: 'parallel',
      emoji: '🛤️',
      title: 'ישר מקביל לצלע',
      blocks: [
        {
          type: 'text',
          md: m`$DE$ מקביל ל-$BC$. המשולש $ADE$ דומה למשולש $ABC$ — הזווית $A$ משותפת, והזוויות ליד $DE$ שוות לזוויות ליד $BC$ (זוויות מתאימות).

${PARALLEL}`,
        },
        {
          type: 'steps',
          title: m`$AD=4$, $DB=2$, $DE=6$. מה אורך $BC$?`,
          steps: [
            { math: m`AB=4+2=${c(SKY, '6')}`, note: 'כל הצלע — לא רק החלק.' },
            { math: m`k=\frac{AB}{AD}=\frac64=1.5`, note: 'יחס הדמיון.' },
            { math: m`BC=6\cdot1.5=${c(GREEN, '9')}`, note: '' },
          ],
        },
        {
          type: 'card',
          tone: 'warn',
          title: 'טעות נפוצה',
          md: m`ביחס משווים את **כל** הצלע $AB$ ל-$AD$ — לא את $DB$ ל-$AD$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: 'BC =',
        prompt: m`$DE$ מקביל ל-$BC$ במשולש $ABC$. $AD=3$, $DB=6$ ו-$DE=5$. מה אורך $BC$?`,
        answer: 15,
        hint: m`$AB=9$, ולכן $k=\frac93=3$`,
        explain: m`$BC=5\cdot3=15$`,
      },
    },
    {
      id: 'perimeter-area',
      emoji: '🟪',
      title: 'היקף ושטח',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: m`$k$ ו-$k^2$`,
          md: m`יחס הדמיון $k$:

- יחס ההיקפים — $k$
- יחס השטחים — $k^2$`,
        },
        {
          type: 'steps',
          title: m`שני משולשים דומים ביחס $1:3$. שטח הקטן $5$ סמ"ר, והיקפו $12$ ס"מ.`,
          steps: [
            { math: m`12\cdot3=${c(VIOLET, '36')}`, note: 'היקף הגדול — פי 3.' },
            { math: m`5\cdot3^2=5\cdot9=${c(GREEN, '45')}`, note: 'שטח הגדול — פי 9.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'שטח =',
        prompt: m`שני משולשים דומים ביחס $2:5$. שטח הקטן $8$ סמ"ר. מה שטח הגדול?`,
        answer: 50,
        hint: m`$k=2.5$, ולכן השטח פי $6.25$.`,
        explain: m`$8\cdot6.25=50$ סמ"ר`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: רוחב של נהר',
      blocks: [
        {
          type: 'text',
          md: m`רוצים למדוד רוחב של נהר בלי לחצות אותו. על הגדה מסמנים שני משולשים דומים: במשולש הקטן — $4$ מ' לאורך הגדה ו-$3$ מ' אל המים. במשולש הגדול — $20$ מ' לאורך הגדה, והצלע המתאימה היא רוחב הנהר.`,
        },
        {
          type: 'steps',
          title: 'פרופורציה',
          steps: [
            { math: m`\frac{x}{3}=\frac{20}{4}`, note: 'רוחב הנהר מתאים ל-3 מ׳.' },
            { math: m`x=3\cdot5=${c(GREEN, '15')}`, note: 'רוחב הנהר: 15 מ׳.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'מטר =',
        prompt: m`מראה מונחת על הרצפה $2$ מ' מאדם שגובה עיניו $1.6$ מ'. האדם רואה במראה את ראש העמוד, והמראה $10$ מ' מהעמוד. מה גובה העמוד?`,
        answer: 8,
        hint: m`משולשים דומים: $\frac{h}{10}=\frac{1.6}{2}$`,
        explain: m`$h=10\cdot0.8=8$ מטר`,
      },
    },
  ],
};
