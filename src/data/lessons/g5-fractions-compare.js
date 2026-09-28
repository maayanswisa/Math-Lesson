import { m } from './tex.js';

export default {
  id: 'g5-fractions-compare',
  topicId: 'g5-fractions-compare',
  grade: 5,
  emoji: '⚖️',
  title: 'השוואת שברים',
  subtitle: 'ארבע דרכים לגלות איזה שבר גדול יותר',
  sections: [
    {
      id: 'see',
      emoji: '👀',
      title: 'רואים בעיניים',
      blocks: [
        {
          type: 'fraction',
          mode: 'compare',
          caption: 'שנו את שני השברים — הסימן ביניהם מתעדכן:',
          bars: [
            { n: 2, d: 3 },
            { n: 3, d: 5 },
          ],
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'מונים שווים',
          md: m`אותו מונה? **המכנה הקטן מנצח**: $\frac37>\frac3{10}$ — כי שביעית גדולה מעשירית (חילקו לפחות חלקים).`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'מה גדול יותר?',
        options: [m`$\frac{4}{9}$`, m`$\frac{4}{5}$`, 'הם שווים', 'אי אפשר לדעת'],
        answer: 1,
        hint: 'אותו מונה — בדקו את המכנה.',
        explain: m`אותו מונה, מכנה קטן יותר = חלקים גדולים יותר: $\frac45>\frac49$.`,
      },
    },
    {
      id: 'half-whole',
      emoji: '🌓',
      title: 'השוואה לחצי ולשלם',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'השוואה לחצי',
          md: m`$\frac35$ **יותר** מחצי (חצי מ-5 זה 2.5). $\frac25$ **פחות** מחצי. אז $\frac35>\frac25$.`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'כמה חסר לשלם?',
          md: m`ל-$\frac78$ חסר $\frac18$. ל-$\frac56$ חסר $\frac16$.

$\frac18<\frac16$ — ל-$\frac78$ חסר **פחות**, ולכן $\frac78>\frac56$.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'מה גדול יותר?',
        options: [m`$\frac{9}{10}$`, m`$\frac{4}{5}$`, 'הם שווים', 'אי אפשר לדעת'],
        answer: 0,
        hint: 'כמה חסר לכל אחד כדי להגיע לשלם?',
        explain: m`ל-$\frac9{10}$ חסר $\frac1{10}$, ל-$\frac45$ חסר $\frac15$ (שזה יותר). לכן $\frac9{10}$ גדול יותר.`,
      },
    },
    {
      id: 'common-denominator',
      emoji: '🏆',
      title: 'שלב הבוס: מכנה משותף',
      blocks: [
        {
          type: 'text',
          md: 'הדרך שעובדת **תמיד**: מביאים למכנה משותף, ומשווים מונים.',
        },
        {
          type: 'steps',
          title: m`$\frac{2}{3}$ או $\frac{3}{5}$?`,
          steps: [
            { math: m`\frac23=\frac{10}{15}`, note: 'מרחיבים פי 5.' },
            { math: m`\frac35=\frac{9}{15}`, note: 'מרחיבים פי 3.' },
            { math: m`\frac{10}{15}>\frac{9}{15}\ \Rightarrow\ \frac23>\frac35`, note: 'אותו מכנה — משווים מונים.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: 'מה גדול יותר?',
        options: [m`$\frac{3}{4}$`, m`$\frac{5}{6}$`, 'הם שווים', 'אי אפשר לדעת'],
        answer: 1,
        hint: 'מכנה משותף: 12.',
        explain: m`$\frac34=\frac9{12}$, $\frac56=\frac{10}{12}$. לכן $\frac56$ גדול יותר.`,
      },
    },
  ],
};
