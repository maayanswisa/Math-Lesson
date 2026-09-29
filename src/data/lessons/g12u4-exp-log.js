import { c, GREEN, m, VIOLET } from './tex.js';

export default {
  id: 'g12u4-exp-log',
  topicId: 'g12-u4-exp-log',
  grade: 12,
  units: 4,
  emoji: 'ℯ',
  title: 'חדו״א של e ושל ln',
  subtitle: 'הפונקציה שהיא הנגזרת של עצמה, והלוגריתם הטבעי',
  sections: [
    {
      id: 'e',
      emoji: '✨',
      title: 'המספר e',
      blocks: [
        {
          type: 'tangent',
          fn: 'exp',
          showDeriv: true,
          x: 0,
          caption: m`$f(x)=e^x$ והנגזרת שלה (צהוב) — **אותה עקומה בדיוק!** בכל נקודה השיפוע שווה לגובה:`,
        },
        {
          type: 'card',
          tone: 'key',
          title: m`$e\approx2.718$`,
          md: m`$(e^x)'=e^x$ · עם פנימית: $\left(e^{f(x)}\right)'=f'(x)\cdot e^{f(x)}$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהי הנגזרת של $f(x)=e^{3x^2}$?`,
        options: [m`$e^{3x^2}$`, m`$6x\,e^{3x^2}$`, m`$3x^2e^{3x^2-1}$`, m`$6x$`],
        answer: 1,
        hint: m`הנגזרת הפנימית של $3x^2$ היא $6x$.`,
        explain: m`$6x\cdot e^{3x^2}$`,
      },
    },
    {
      id: 'ln',
      emoji: '🔍',
      title: 'הלוגריתם הטבעי',
      blocks: [
        {
          type: 'tangent',
          fn: 'ln',
          showDeriv: true,
          x: 1,
          caption: m`$\ln x=\log_e x$. שימו לב: השיפוע של $\ln x$ בכל נקודה הוא $\frac1x$ (צהוב):`,
        },
        {
          type: 'card',
          tone: 'key',
          title: 'הנגזרות',
          md: m`$(\ln x)'=\frac1x$

$\left(\ln f(x)\right)'=\frac{f'(x)}{f(x)}$ · תחום: $x>0$`,
        },
      ],
      challenge: {
        type: 'choice',
        prompt: m`מהי הנגזרת של $f(x)=\ln(x^2+1)$?`,
        options: [m`$\frac{1}{x^2+1}$`, m`$\frac{2x}{x^2+1}$`, m`$2x\ln(x^2+1)$`, m`$\frac{2}{x}$`],
        answer: 1,
        hint: m`$\frac{f'}{f}$`,
        explain: m`$\frac{2x}{x^2+1}$`,
      },
    },
    {
      id: 'investigate',
      emoji: '🔬',
      title: 'חקירת פונקציה',
      blocks: [
        {
          type: 'tangent',
          fn: 'xexp',
          x: 0,
          caption: m`$f(x)=xe^{-x}$: חפשו את המקסימום:`,
        },
        {
          type: 'steps',
          title: m`$f(x)=xe^{-x}$`,
          steps: [
            { math: m`f'=e^{-x}-xe^{-x}=${c(VIOLET, '(1-x)')}e^{-x}`, note: m`כלל המכפלה. $e^{-x}>0$ תמיד — הסימן נקבע לפי $1-x$.` },
            { math: m`x=1:\ f(1)=\frac1e\approx${c(GREEN, '0.37')}`, note: 'מקסימום.' },
            { math: m`x\to\infty:\ f\to0`, note: m`$e^{-x}$ דועכת מהר יותר ממה ש-$x$ גדל — אסימפטוטה $y=0$.` },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: 'x =',
        prompt: m`באיזה $x$ יש קיצון ל-$f(x)=x-\ln x$?`,
        answer: 1,
        hint: m`$f'=1-\frac1x$`,
        explain: m`$1-\frac1x=0\Rightarrow x=1$ (מינימום).`,
      },
    },
    {
      id: 'boss',
      emoji: '🏆',
      title: 'שלב הבוס: אינטגרלים',
      blocks: [
        {
          type: 'card',
          tone: 'key',
          title: 'הפוך מהנגזרות',
          md: m`$\int e^{ax+b}\,dx=\frac1a e^{ax+b}+C$

$\int\frac1x\,dx=\ln|x|+C$`,
        },
        {
          type: 'steps',
          title: m`$\int_1^e\frac{2}{x}\,dx$`,
          steps: [
            { math: m`2\ln|x|\Big|_1^e`, note: 'קדומה.' },
            { math: m`2\ln e-2\ln1=2-0=${c(GREEN, '2')}`, note: m`$\ln e=1$, $\ln1=0$.` },
          ],
        },
      ],
      challenge: {
        type: 'number',
        label: '',
        prompt: m`חשבו $\int_0^1 e^{2x}\,dx$ (בקירוב, $e^2\approx7.39$)`,
        answer: 3.19,
        tolerance: 0.02,
        hint: m`$\frac12e^{2x}\Big|_0^1$`,
        explain: m`$\frac{e^2-1}{2}\approx\frac{6.39}{2}\approx3.19$`,
      },
    },
  ],
};
