import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, MotionConfig } from 'framer-motion';
import { accentFor } from '../lib/palette';
import { allTopics, getTopicById } from '../data/curriculum';
import { TOTAL_QUESTION_COUNT } from '../data/questions';
import { LESSON_TOPIC_IDS } from '../data/lessons';

const GRADE_GROUPS = [
  {
    title: 'יסודי',
    emoji: '🎈',
    grades: [
      { n: 1, label: "א'" },
      { n: 2, label: "ב'" },
      { n: 3, label: "ג'" },
      { n: 4, label: "ד'" },
      { n: 5, label: "ה'" },
      { n: 6, label: "ו'" },
    ],
  },
  {
    title: 'חטיבת ביניים',
    emoji: '🚀',
    grades: [
      { n: 7, label: "ז'" },
      { n: 8, label: "ח'" },
      { n: 9, label: "ט'" },
    ],
  },
  {
    title: 'תיכון',
    emoji: '🎓',
    grades: [
      { n: 10, label: "י'" },
      { n: 11, label: 'י"א' },
      { n: 12, label: 'י"ב' },
    ],
  },
];

const STEPS = [
  { emoji: '🎯', title: 'בוחרים כיתה ונושא', text: 'כל תוכנית הלימודים מכיתה א׳ ועד י״ב, מסודרת לפי נושאים.' },
  { emoji: '📖', title: 'לומדים עם הסבר מלא', text: 'הסבר צעד אחרי צעד, עם המחשות שאפשר לשחק איתן ואתגר קטן בכל שלב.' },
  { emoji: '🏆', title: 'מתרגלים ומתקדמים', text: 'שאלות בקצב שלכם, רמזים כשנתקעים, נקודות XP ומעקב התקדמות.' },
];

// סמלים שמרחפים ברקע הכותרת — קישוט בלבד
const FLOATING = [
  { s: 'π', x: '6%', y: '12%', size: 'text-5xl', d: 0 },
  { s: '√', x: '88%', y: '8%', size: 'text-6xl', d: 0.6 },
  { s: '÷', x: '78%', y: '70%', size: 'text-4xl', d: 1.2 },
  { s: 'x²', x: '14%', y: '72%', size: 'text-4xl', d: 1.8 },
  { s: '∑', x: '48%', y: '4%', size: 'text-3xl', d: 2.4 },
  { s: '%', x: '34%', y: '82%', size: 'text-3xl', d: 3 },
];

const numberFormat = new Intl.NumberFormat('he-IL');

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

/** כיתות שיש בהן לפחות נושא אחד עם הסבר מלא. */
function gradesWithLessons() {
  return new Set(LESSON_TOPIC_IDS.map((id) => getTopicById(id)?.grade).filter(Boolean));
}

export default function HomePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const topicCount = allTopics().length;
  const lessonGrades = gradesWithLessons();

  const stats = [
    { value: numberFormat.format(topicCount), label: 'נושאים', color: 'var(--color-teal-dark)' },
    { value: numberFormat.format(TOTAL_QUESTION_COUNT), label: 'שאלות', color: 'var(--color-violet)' },
    { value: numberFormat.format(LESSON_TOPIC_IDS.length), label: 'הסברים מלאים', color: 'var(--color-berry)' },
    { value: '12', label: 'כיתות', color: 'var(--color-sunshine-dark)' },
  ];

  let gradeIndex = 0;

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex flex-1 flex-col" dir="rtl">
        <div className="space-y-16">
          {/* כותרת ראשית */}
          <section className="relative overflow-hidden rounded-[2rem] bg-white/70 px-5 py-10 text-center shadow-sm ring-1 ring-black/5 sm:px-10 sm:py-14">
            {FLOATING.map((f) => (
              <motion.span
                key={f.s}
                aria-hidden="true"
                className={`pointer-events-none absolute select-none font-[family-name:var(--font-display)] ${f.size} text-[var(--color-teal)]/10`}
                style={{ left: f.x, top: f.y }}
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: f.d }}
              >
                {f.s}
              </motion.span>
            ))}

            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative inline-block rounded-full bg-[var(--color-teal)]/10 px-4 py-1.5 text-sm font-semibold text-[var(--color-teal-dark)]"
            >
              תרגול מתמטיקה א׳–י״ב 🎯
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative mt-4 font-[family-name:var(--font-display)] text-6xl leading-tight sm:text-7xl lg:text-8xl"
            >
              <span
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, var(--color-teal) 0%, var(--color-sky) 40%, var(--color-violet) 75%, var(--color-berry) 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                מתמטיקל
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative mx-auto mt-4 max-w-xl text-lg leading-relaxed text-[var(--color-slate)] sm:text-xl"
            >
              מתמטיקה שמרגישה כמו משחק: הסברים ברורים, שאלות בקצב שלכם, ותחושת הצלחה עם כל תשובה נכונה.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="relative mt-8 flex flex-wrap justify-center gap-3"
            >
              <a
                href="#grades"
                className="rounded-2xl bg-[var(--color-teal)] px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-[var(--color-teal)]/25 transition hover:-translate-y-0.5 hover:bg-[var(--color-teal-dark)]"
              >
                בחרו כיתה ↓
              </a>
              <Link
                to="/custom-test"
                className="rounded-2xl bg-white px-7 py-3.5 text-base font-bold text-[var(--color-ink)] shadow-sm ring-2 ring-[var(--color-violet)]/30 transition hover:-translate-y-0.5 hover:ring-[var(--color-violet)]/60"
              >
                ✨ מבחן מותאם אישית
              </Link>
            </motion.div>

            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                navigate(query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : '/search');
              }}
              className="relative mx-auto mt-8 flex max-w-xl gap-2"
            >
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="חפשו נושא, למשל: שברים"
                aria-label="חיפוש נושא"
                className="min-w-0 flex-1 rounded-2xl bg-white px-4 py-3 text-base shadow-sm ring-2 ring-[var(--color-teal)]/20 outline-none focus:ring-[var(--color-teal)]/60"
              />
              <button
                type="submit"
                className="shrink-0 rounded-2xl bg-[var(--color-ink)] px-5 py-3 text-base font-bold text-white transition hover:-translate-y-0.5"
              >
                🔍 חיפוש
              </button>
            </form>

            <div className="relative mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 + i * 0.08 }}
                  className="rounded-2xl bg-white px-3 py-3 shadow-sm ring-1 ring-black/5"
                >
                  <span className="block text-2xl font-extrabold" style={{ color: s.color }}>
                    {s.value}
                  </span>
                  <span className="text-xs font-medium text-[var(--color-slate)]">{s.label}</span>
                </motion.div>
              ))}
            </div>
          </section>

          {/* בחירת כיתה, לפי שלב לימודים */}
          <section id="grades" className="scroll-mt-6 space-y-8">
            <motion.h2 {...fadeUp} className="text-center font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
              באיזו כיתה אתם?
            </motion.h2>

            {/* יסודי בשורה מלאה; חטיבה ותיכון (3 כיתות כל אחד) זה לצד זה במסך רחב */}
            <div className="grid gap-8 sm:grid-cols-2 sm:gap-x-6">
              {GRADE_GROUPS.map((group) => (
                <motion.div key={group.title} {...fadeUp} className={group.grades.length > 3 ? 'sm:col-span-2' : ''}>
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-[var(--color-slate)]">
                    <span aria-hidden="true">{group.emoji}</span>
                    {group.title}
                    <span className="h-px flex-1 bg-black/10" />
                  </h3>
                  <div className={`grid grid-cols-3 gap-3 ${group.grades.length > 3 ? 'sm:grid-cols-6' : ''}`}>
                    {group.grades.map((g) => {
                      const accent = accentFor(gradeIndex++);
                      const hasLessons = lessonGrades.has(g.n);
                      return (
                        <motion.div key={g.n} whileHover={{ y: -4 }} whileTap={{ scale: 0.97 }}>
                          <Link
                            to={`/grade/${g.n}`}
                            className="group relative flex flex-col items-center overflow-hidden rounded-2xl bg-white py-5 shadow-sm ring-1 ring-black/5 transition hover:shadow-lg"
                          >
                            <span
                              className="absolute inset-x-0 top-0 h-1.5 transition-all group-hover:h-2"
                              style={{ backgroundColor: accent.solid }}
                            />
                            <span className="text-3xl font-extrabold" style={{ color: accent.text }}>
                              {g.label}
                            </span>
                            <span className="mt-1 text-xs font-medium text-[var(--color-slate)]">כיתה</span>
                            {hasLessons && (
                              <span
                                className="absolute bottom-1.5 start-1.5 text-xs"
                                title="יש בכיתה הזו הסברים מלאים"
                                aria-label="יש הסברים מלאים"
                              >
                                📖
                              </span>
                            )}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* איך זה עובד */}
          <section className="space-y-6">
            <motion.h2 {...fadeUp} className="text-center font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
              איך זה עובד?
            </motion.h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {STEPS.map((step, i) => {
                const accent = accentFor(i + 2);
                return (
                  <motion.div
                    key={step.title}
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: i * 0.12 }}
                    className="rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-black/5"
                  >
                    <span
                      className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-3xl"
                      style={{ backgroundColor: accent.bg }}
                      aria-hidden="true"
                    >
                      {step.emoji}
                    </span>
                    <p className="mt-2 text-xs font-bold" style={{ color: accent.text }}>
                      שלב {i + 1}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-[var(--color-ink)]">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-slate)]">{step.text}</p>
                  </motion.div>
                );
              })}
            </div>
            <div className="flex justify-center">
              <Link
                to="/parent"
                className="rounded-2xl bg-white px-6 py-3 text-sm font-bold text-[var(--color-ink)] shadow-sm ring-2 ring-[var(--color-violet)]/30 transition hover:-translate-y-0.5 hover:ring-[var(--color-violet)]/60"
              >
                📈 ההתקדמות שלי
              </Link>
            </div>
          </section>
        </div>

        <footer className="mx-auto mt-16 w-full max-w-md border-t border-black/5 pt-3 text-center text-xs text-[var(--color-slate)]">
          האתר נבנה על ידי{' '}
          <a
            href="https://build-your-website-maayan.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--color-teal)] hover:underline"
          >
            מעיין · בניית אתרים
          </a>
        </footer>
      </div>
    </MotionConfig>
  );
}
