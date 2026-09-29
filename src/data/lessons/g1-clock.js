import { m } from './tex.js';

export default {
  id: 'g1-clock',
  topicId: 'g1-clock',
  grade: 1,
  emoji: '🕐',
  title: 'השעון',
  subtitle: 'קוראים שעות שלמות — ומחשבים כמה זמן עבר',
  sections: [
    {
      id: 'hands',
      emoji: '🕰️',
      title: 'שני מחוגים',
      blocks: [
        {
          type: 'text',
          md: 'למחוג **הקצר** קוראים מחוג השעות — הוא מראה **איזו שעה**. כשהמחוג **הארוך** מצביע על **12** — זו שעה שלמה.',
        },
        {
          type: 'clock',
          time: 3 * 60,
          caption: 'לחצו על "עוד שעה" וראו איך זז המחוג הקצר:',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'המחוג הארוך על 12 והמחוג הקצר על 8. מה השעה?',
        answer: 8,
        hint: 'המחוג הקצר אומר את השעה.',
        explain: 'השעה 8 בדיוק.',
      },
    },
    {
      id: 'duration',
      emoji: '⏳',
      title: 'כמה זמן עבר?',
      blocks: [
        {
          type: 'text',
          md: m`הלכנו לגן השעשועים בשעה **4** וחזרנו בשעה **6**. סופרים: $4\to5\to6$ — עברו **2 שעות**.`,
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        suffix: 'שעות',
        prompt: 'הסרט התחיל בשעה 5 ונגמר בשעה 7. כמה שעות הוא נמשך?',
        answer: 2,
        hint: 'סופרים מ-5 עד 7.',
        explain: 'מ-5 עד 7 — שעתיים.',
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: אחרי 12',
      blocks: [
        {
          type: 'text',
          md: 'אחרי 12 השעון מתחיל שוב מ-1. אם עכשיו השעה 11, בעוד שעתיים תהיה השעה **1**.',
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: 'עכשיו השעה 10. מה תהיה השעה בעוד 3 שעות?',
        answer: 1,
        hint: '11, 12, ...',
        explain: 'אחרי 10 באים 11, 12 ואז 1.',
      },
    },
  ],
};
