import { m } from './tex.js';

export default {
  id: 'g10u5-circle-theorems',
  topicId: 'g10-u5-circle-theorems',
  grade: 10,
  units: 5,
  emoji: '⭕',
  title: 'המעגל: זוויות, מיתרים ומשיקים',
  subtitle: 'זווית מרכזית והיקפית, מרובע חסום ומשיקים',
  sections: [
    {
      id: 'inscribed',
      emoji: '📐',
      title: 'זווית היקפית',
      blocks: [
        {
          type: 'circletheorems',
          mode: 'inscribed',
          caption: 'הזיזו את הנקודה על המעגל — הזווית ההיקפית לא משתנה:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'חצי מהמרכזית',
          md: m`זווית היקפית $=\frac12$ הזווית המרכזית הנשענת על אותה קשת. על קוטר — $90°$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '°',
        prompt: m`זווית מרכזית $110°$. מה הזווית ההיקפית על אותה קשת?`,
        answer: 55,
        hint: 'חצי.',
        explain: m`$55°$`,
      },
    },
    {
      id: 'cyclic',
      emoji: '🔷',
      title: 'מרובע חסום',
      blocks: [
        {
          type: 'tangents',
          mode: 'cyclic',
          caption: 'מרובע שכל קודקודיו על המעגל:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'זוויות נגדיות',
          md: m`במרובע חסום במעגל: כל שתי זוויות נגדיות משלימות ל-$180°$.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: '°',
        prompt: m`במרובע חסום $\angle A=75°$. מה $\angle C$ (הנגדית)?`,
        answer: 105,
        hint: m`$180-75$`,
        explain: m`$105°$`,
      },
    },
    {
      id: 'tangent',
      emoji: '🏆',
      title: 'שלב הבוס: משיקים',
      blocks: [
        {
          type: 'tangents',
          mode: 'tangents',
          caption: 'שני משיקים מנקודה חיצונית:',
        },
        {
          type: 'card',
          tone: 'key',
          title: 'שתי תכונות',
          md: m`משיק $\perp$ רדיוס בנקודת ההשקה. שני משיקים מאותה נקודה — **שווים** באורכם.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`רדיוס $5$, והנקודה החיצונית במרחק $13$ מהמרכז. מה אורך המשיק?`,
        answer: 12,
        hint: m`פיתגורס: $13^2-5^2$`,
        explain: m`$\sqrt{144}=12$`,
      },
    },
  ],
};
