import { c, GREEN, m, RED, VIOLET } from './tex.js';

export default {
  id: 'g9r-algebraic-fractions',
  topicId: 'g9r-algebraic-fractions',
  grade: 9,
  emoji: '➗',
  title: 'שברים אלגבריים',
  subtitle: 'כפל, חילוק, ומשוואות עם נעלם במכנה — כולל תחום ההגדרה',
  sections: [
    {
      id: 'multiply',
      emoji: '✖️',
      title: 'כפל: קודם מפרקים ומצמצמים',
      blocks: [
        {
          type: 'text',
          md: m`כמו בשברים רגילים — **מונה במונה, מכנה במכנה**. אבל **לפני** שכופלים, מפרקים הכול ומצמצמים. זה חוסך המון.`,
        },
        {
          type: 'steps',
          title: m`$\dfrac{x^2-1}{3x}\cdot\dfrac{6}{x+1}$`,
          steps: [
            { math: m`\frac{(x-1)${c(RED, '(x+1)')}}{3x}\cdot\frac{6}{${c(RED, 'x+1')}}`, note: 'מפרקים את מה שאפשר.' },
            { math: m`\frac{(x-1)\cdot${c(VIOLET, '6')}}{${c(VIOLET, '3')}x}`, note: m`מצמצמים את $(x+1)$.` },
            { math: m`${c(GREEN, '\\frac{2(x-1)}{x}')}`, note: 'מצמצמים 6 עם 3.' },
          ],
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה שווה $\dfrac{x}{4}\cdot\dfrac{8}{x^2}$?`,
        options: [m`$\frac{2}{x}$`, m`$\frac{8x}{4x^2}$`, m`$2x$`, m`$\frac{x}{2}$`],
        answer: 0,
        hint: m`$\frac{8}{4}=2$, ו-$\frac{x}{x^2}=\frac1x$.`,
        explain: m`$\frac{8x}{4x^2}=\frac{2}{x}$`,
      },
    },
    {
      id: 'divide',
      emoji: '🔄',
      title: 'חילוק = כפל בהופכי',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'הכלל',
          md: m`$$\frac AB\div\frac CD=\frac AB\cdot\frac DC$$
הופכים את השבר **השני** — וכופלים.`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מה שווה $\dfrac{x+2}{5}\div\dfrac{x+2}{10}$?`,
        options: [m`$2$`, m`$\frac12$`, m`$\frac{(x+2)^2}{50}$`, m`$x+2$`],
        answer: 0,
        hint: m`$\frac{x+2}{5}\cdot\frac{10}{x+2}$`,
        explain: m`$(x+2)$ מתצמצם, ו-$\frac{10}{5}=2$.`,
      },
    },
    {
      id: 'equation',
      emoji: '🏆',
      title: 'שלב הבוס: נעלם במכנה',
      blocks: [
        {
          type: 'card',
          tone: 'warn',
          title: 'קודם תחום ההגדרה!',
          md: m`אסור לחלק באפס. לכן **לפני** שפותרים, רושמים אילו $x$ אסורים — אלה שמאפסים מכנה.`,
        },
        {
          type: 'steps',
          title: m`פותרים: $\dfrac{3}{x}+\dfrac12=\dfrac5x$`,
          steps: [
            { math: m`x\neq0`, note: 'תחום הגדרה.' },
            { math: m`${c(VIOLET, '2x')}\cdot\frac3x+${c(VIOLET, '2x')}\cdot\frac12=${c(VIOLET, '2x')}\cdot\frac5x`, note: m`כופלים הכול במכנה המשותף $2x$.` },
            { math: m`6+x=10`, note: 'השברים נעלמו.' },
            { math: m`${c(GREEN, 'x=4')}`, note: 'בדיקה: 4 ≠ 0, מותר ✔️' },
          ],
        },
        {
          type: 'card',
          tone: 'tip',
          title: 'פתרון פסול',
          md: m`אם יצא פתרון **שאסור** (מאפס מכנה) — פוסלים אותו. ייתכן שלמשוואה אין פתרון בכלל!`,
        },
      ],
      challenge: {
        type: 'number',
        prompt: m`$\dfrac{6}{x}=\dfrac{2}{x}+1$. מהו $x$?`,
        answer: 4,
        hint: m`כופלים ב-$x$: $6=2+x$.`,
        explain: m`$x=4$, ו-$4\neq0$ — הפתרון תקין.`,
      },
    },
  ],
};
