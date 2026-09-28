import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g5-fractions-meaning',
  topicId: 'g5-fractions-meaning',
  grade: 5,
  emoji: '🍕',
  title: 'שברים — משמעות וייצוגים',
  subtitle: 'שבר כחילוק, חלק מכמות, מציאת השלם, ומספרים מעורבים',
  sections: [
    {
      id: 'division',
      emoji: '🍕',
      title: 'שבר = חילוק',
      blocks: [
        {
          type: 'text',
          md: m`מחלקים **3 פיצות** בין **4 ילדים** בשווה. כמה מקבל כל אחד?

$3\div4=\frac{3}{4}$ פיצה! **קו השבר הוא סימן חילוק.**`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'מחלקים 2 חפיסות שוקולד בין 5 ילדים בשווה. כמה מקבל כל ילד?',
        options: [m`$\frac{5}{2}$`, m`$\frac{2}{5}$`, m`$\frac{1}{5}$`, m`$\frac{1}{2}$`],
        answer: 1,
        hint: m`$2\div5$`,
        explain: m`$2\div5=\frac25$ חפיסה לכל ילד.`,
      },
    },
    {
      id: 'part-of-amount',
      emoji: '👧',
      title: 'שבר מתוך כמות',
      blocks: [
        {
          type: 'steps',
          title: m`כמה זה $\frac{2}{5}$ מתוך 20 ילדים?`,
          steps: [
            { math: m`20\div${c(VIOLET, '5')}=4`, note: 'מחלקים ל-5 קבוצות שוות (המכנה).' },
            { math: m`4\times${c(VIOLET, '2')}=${c(GREEN, '8')}`, note: 'לוקחים 2 קבוצות (המונה).' },
          ],
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'לזכור',
          md: '**מחלקים במכנה, כופלים במונה.**',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`כמה זה $\frac{3}{4}$ מתוך 24?`,
        answer: 18,
        hint: m`$24\div4=6$, ואז כפול 3.`,
        explain: m`$24\div4=6$, ו-$6\times3=18$.`,
      },
    },
    {
      id: 'find-whole',
      emoji: '🔎',
      title: 'מוצאים את השלם',
      blocks: [
        {
          type: 'text',
          md: 'הפוך: יודעים כמה שווה **החלק**, ורוצים את **הכול**.',
        },
        {
          type: 'steps',
          title: m`$\frac{2}{5}$ מהכיתה הם 8 ילדים. כמה ילדים בכל הכיתה?`,
          steps: [
            { math: m`8\div${c(VIOLET, '2')}=4`, note: m`2 חלקים = 8, אז חלק אחד ($\frac15$) = 4.` },
            { math: m`4\times${c(VIOLET, '5')}=${c(GREEN, '20')}`, note: 'השלם = 5 חלקים.' },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`$\frac{1}{3}$ מהעוגיות הן 7 עוגיות. כמה עוגיות יש בסך הכול?`,
        answer: 21,
        hint: 'שליש = 7. כמה שלישים בשלם?',
        explain: m`$7\times3=21$ עוגיות.`,
      },
    },
    {
      id: 'mixed',
      emoji: '🏆',
      title: 'שלב הבוס: מספרים מעורבים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'שבר מדומה ← מספר מעורב',
          md: m`מחלקים מונה במכנה: **המנה** = שלמים, **השארית** = המונה החדש.

$\frac94$: $9\div4=2$ שארית $1$ ← $2\frac14$`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'מספר מעורב ← שבר מדומה',
          md: m`$2\frac14=\frac{2\times4+1}{4}=\frac94$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`איך כותבים $\frac{11}{3}$ כמספר מעורב?`,
        options: [m`$3\frac{1}{3}$`, m`$3\frac{2}{3}$`, m`$2\frac{2}{3}$`, m`$11\frac{1}{3}$`],
        answer: 1,
        hint: m`$11\div3=?$ ומה השארית?`,
        explain: m`$11\div3=3$ שארית $2$, כלומר $3\frac23$.`,
      },
    },
  ],
};
