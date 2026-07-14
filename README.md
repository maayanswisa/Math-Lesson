# Math Lesson

אתר תרגול מתמטיקה לתלמידים מכיתות א׳–י״ב.

## הפעלה מהירה

```bash
npm install
cp .env.example .env   # מילוי כתובת ו-anon key מ-Supabase
npm run dev
```

לאחר מכן הריצו את `supabase/schema.sql` ב-SQL Editor של הפרויקט ב-Supabase.

## מבנה תיקיות

```
Math Lesson/
├── index.html
├── package.json
├── vite.config.js
├── .env.example
├── supabase/
│   └── schema.sql              # טבלאות, FK, RLS, טריגרים
└── src/
    ├── main.jsx
    ├── App.jsx                 # נתיבים (Router)
    ├── index.css               # Tailwind + KaTeX + tokens
    ├── lib/
    │   └── supabase.js         # לקוח Supabase
    ├── data/
    │   └── sample-questions-grade10.json
    ├── components/
    │   ├── ui/
    │   │   └── MathRenderer.jsx    # Markdown + KaTeX
    │   ├── quiz/
    │   │   └── QuizCard.jsx        # ממשק המבחן
    │   ├── auth/                   # (להוסיף) LoginForm, SignupForm
    │   └── topics/                 # (להוסיף) TopicCard
    ├── pages/
    │   ├── HomePage.jsx            # נחיתה + בחירת כיתה
    │   ├── TopicsPage.jsx          # כרטיסיות נושאים
    │   ├── QuizPage.jsx            # עטיפה ל-QuizCard
    │   └── ResultsPage.jsx         # (אופציונלי — כרגע בתוך QuizCard)
    ├── hooks/                      # (להוסיף) useAuth, useQuiz
    └── context/                    # (להוסיף) AuthContext
```

## זרימת מסכים

1. `/` — הסבר + בחירת כיתה א׳–י״ב  
2. `/grade/:grade` — א׳–ח׳ עוברים לנושאים; ט׳ בוחרים רמה; י׳–י״ב בוחרים 3/4/5 יח״ל  
3. `/grade/:grade/topics` (או track/units) — כרטיסיות נושאים  
4. `/quiz/:topicId` — מבחן → סיכום + פתרונות  

## דמו

- יסודי: בית → **א׳** (או ב׳–ו׳) → נושא → מבחן  
- תיכון: בית → **י׳** → יחידות לימוד → נושא
