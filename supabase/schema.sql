-- ============================================================
-- Math Lesson — Supabase / PostgreSQL Schema
-- הרצה ב-SQL Editor של Supabase (פעם אחת)
-- ============================================================

-- הרחבות
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- 1. profiles — פרטי תלמידים (מקושר ל-auth.users של Supabase)
-- ------------------------------------------------------------
-- ב-Supabase לא יוצרים טבלת users נפרדת לאימות.
-- auth.users מנוהלת ע"י Supabase Auth; profiles מחזיקה נתוני אפליקציה.

create table public.profiles (
  id            uuid primary key references auth.users (id) on delete cascade,
  full_name     text not null,
  email         text not null,
  grade         smallint not null check (grade between 1 and 12),
  xp            integer not null default 0 check (xp >= 0),
  level         smallint not null default 1 check (level >= 1),
  hearts        smallint not null default 3 check (hearts between 0 and 5),
  muted_sounds  boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table public.profiles is 'פרופילי תלמידים — מקושר ל-auth.users';
comment on column public.profiles.grade is 'כיתה נוכחית: 1=א׳ … 12=י״ב';

-- ------------------------------------------------------------
-- 2. topics — נושאי לימוד לפי כיתה
-- ------------------------------------------------------------

create table public.topics (
  id            uuid primary key default gen_random_uuid(),
  grade         smallint not null check (grade between 1 and 12),
  -- יחידות לימוד לחט"ע: 3/4/5; ליסודי/חט"ב אפשר NULL
  units         smallint check (units is null or units in (3, 4, 5)),
  cluster       text,                          -- אשכול (בעיקר 3 יח"ל)
  slug          text not null,
  title         text not null,
  description   text,
  sort_order    integer not null default 0,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now(),

  unique (grade, units, slug)
);

create index topics_grade_units_idx on public.topics (grade, units) where is_active;

comment on table public.topics is 'נושאי לימוד מקושרים לשכבת גיל (כיתה)';

-- ------------------------------------------------------------
-- 3. questions — מאגר שאלות רב-ברירה עם תמיכה ב-LaTeX
-- ------------------------------------------------------------

create table public.questions (
  id                uuid primary key default gen_random_uuid(),
  topic_id          uuid not null references public.topics (id) on delete cascade,
  question_text     text not null,          -- Markdown + LaTeX ($...$, $$...$$)
  interaction_type  text not null default 'mcq'
                      check (interaction_type in ('mcq', 'fractionPizza', 'numberLine', 'dragMatch')),
  options           jsonb,                  -- MCQ: מערך אפשרויות; null לסוגים אחרים
  correct_index     smallint check (correct_index is null or correct_index between 0 and 20),
  correct_answer    jsonb,                  -- תשובה לסוגים אינטראקטיביים
  payload           jsonb not null default '{}'::jsonb,
  explanation       text not null,          -- פתרון מפורט (Markdown + LaTeX)
  difficulty        smallint not null default 2 check (difficulty between 1 and 5),
  is_active         boolean not null default true,
  created_at        timestamptz not null default now(),

  constraint questions_options_is_array_or_null
    check (options is null or jsonb_typeof(options) = 'array'),
  constraint questions_mcq_has_options
    check (
      interaction_type <> 'mcq'
      or (options is not null and correct_index is not null)
    )
);

create index questions_topic_id_idx on public.questions (topic_id) where is_active;

comment on column public.questions.options is
  'JSON array באורך 4, למשל: ["$2x$", "$x^2$", "...", "..."]';
comment on column public.questions.correct_index is
  'אינדקס 0-based של התשובה הנכונה בתוך options';

-- ------------------------------------------------------------
-- 4. user_progress — מעקב מבחנים וציונים
-- ------------------------------------------------------------

create table public.user_progress (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.profiles (id) on delete cascade,
  topic_id        uuid not null references public.topics (id) on delete cascade,
  score           numeric(5,2) not null check (score >= 0 and score <= 100),
  total_questions integer not null check (total_questions > 0),
  correct_count   integer not null check (correct_count >= 0),
  -- פירוט תשובות: [{ "question_id": "...", "selected_index": 2, "is_correct": false }, ...]
  answers         jsonb not null default '[]'::jsonb,
  completed_at    timestamptz not null default now(),

  constraint user_progress_correct_lte_total
    check (correct_count <= total_questions)
);

create index user_progress_user_id_idx on public.user_progress (user_id);
create index user_progress_topic_id_idx on public.user_progress (topic_id);
create index user_progress_completed_at_idx on public.user_progress (completed_at desc);

comment on table public.user_progress is 'רשומת מבחן שהושלם — ציון + פירוט תשובות';

-- ------------------------------------------------------------
-- 4c. parent_links — קישור הורה/מורה לתלמיד (לשימוש עתידי עם Auth)
-- ------------------------------------------------------------

create table public.parent_links (
  id              uuid primary key default gen_random_uuid(),
  parent_user_id  uuid not null references public.profiles (id) on delete cascade,
  child_user_id   uuid not null references public.profiles (id) on delete cascade,
  created_at      timestamptz not null default now(),
  unique (parent_user_id, child_user_id)
);

create index parent_links_parent_idx on public.parent_links (parent_user_id);
create index parent_links_child_idx on public.parent_links (child_user_id);

comment on table public.parent_links is 'קישור בין הורה/מורה לבין תלמיד לצורך דשבורד';

-- ------------------------------------------------------------
-- 5. טריגר: יצירת פרופיל אוטומטית בהרשמה
-- ------------------------------------------------------------

create table public.badges (
  id            text primary key,           -- hot_streak / night_owl / geo_perfect
  title         text not null,
  description   text not null,
  created_at    timestamptz not null default now()
);

create table public.user_badges (
  user_id       uuid not null references public.profiles (id) on delete cascade,
  badge_id      text not null references public.badges (id) on delete cascade,
  earned_at     timestamptz not null default now(),
  primary key (user_id, badge_id)
);

create index user_badges_user_id_idx on public.user_badges (user_id);

insert into public.badges (id, title, description) values
  ('hot_streak', 'חם אש', '5 תשובות נכונות ברציפות'),
  ('night_owl', 'ינשוף לילה', 'תרגול אחרי השעה 20:00'),
  ('geo_perfect', 'אלוף הנדסה', 'סיום נושא גאומטריה בציון 100%')
on conflict (id) do nothing;

-- ------------------------------------------------------------
-- 5. טריגר: יצירת פרופיל אוטומטית בהרשמה
-- ------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, grade)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'תלמיד/ה'),
    new.email,
    coalesce((new.raw_user_meta_data->>'grade')::smallint, 1)
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ------------------------------------------------------------
-- 6. טריגר: updated_at לפרופיל
-- ------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

alter table public.profiles enable row level security;
alter table public.topics enable row level security;
alter table public.questions enable row level security;
alter table public.user_progress enable row level security;
alter table public.badges enable row level security;
alter table public.user_badges enable row level security;
alter table public.parent_links enable row level security;

-- ---------- profiles ----------
-- תלמיד רואה ומעדכן רק את הפרופיל שלו
create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- אין INSERT ישיר מהלקוח — נוצר דרך הטריגר בהרשמה
-- אין DELETE לתלמידים

-- ---------- topics ----------
-- כל משתמש מחובר יכול לקרוא נושאים פעילים
create policy "topics_select_active"
  on public.topics for select
  to authenticated
  using (is_active = true);

-- ---------- questions ----------
-- קריאה בלבד לשאלות פעילות (מניעת דליפת תשובות נכונות — ראו הערה למטה)
create policy "questions_select_active"
  on public.questions for select
  to authenticated
  using (is_active = true);

-- הערה אבטחה:
-- בגישה הנוכחית, correct_index ו-explanation נשלחים ללקוח יחד עם השאלה.
-- זה מתאים לאב-טיפוס / תרגול בית.
-- לפרודקשן מומלץ:
--   1) View ציבורי בלי correct_index/explanation לממשק המבחן
--   2) Edge Function / RPC לבדיקת תשובות בצד שרת

-- ---------- user_progress ----------
create policy "progress_select_own"
  on public.user_progress for select
  to authenticated
  using (auth.uid() = user_id);

create policy "progress_insert_own"
  on public.user_progress for insert
  to authenticated
  with check (auth.uid() = user_id);

-- אין UPDATE/DELETE — מבחן שהושלם נשאר כהיסטוריה

-- ---------- badges ----------
create policy "badges_select_all"
  on public.badges for select
  to authenticated
  using (true);

create policy "user_badges_select_own"
  on public.user_badges for select
  to authenticated
  using (auth.uid() = user_id);

create policy "user_badges_insert_own"
  on public.user_badges for insert
  to authenticated
  with check (auth.uid() = user_id);

-- ---------- parent_links ----------
create policy "parent_links_select_own"
  on public.parent_links for select
  to authenticated
  using (auth.uid() = parent_user_id or auth.uid() = child_user_id);

create policy "parent_links_insert_parent"
  on public.parent_links for insert
  to authenticated
  with check (auth.uid() = parent_user_id);

-- ============================================================
-- (אופציונלי) View בטוח יותר — שאלות בלי התשובה הנכונה
-- ============================================================

create or replace view public.questions_for_quiz
with (security_invoker = true)
as
select
  id,
  topic_id,
  question_text,
  interaction_type,
  options,
  payload,
  difficulty
from public.questions
where is_active = true;

grant select on public.questions_for_quiz to authenticated;

-- ============================================================
-- דוגמת Seed — כיתה י׳ / פונקציות ריבועיות (אופציונלי)
-- ============================================================
-- ניתן להריץ אחרי יצירת הטבלאות, או להזין דרך ה-JSON בצד הלקוח.

/*
insert into public.topics (grade, slug, title, description, sort_order)
values (
  10,
  'quadratic-functions',
  'פונקציות ריבועיות',
  'פרבולה, קודקוד, משוואות ריבועיות וייצוגים אלגבריים',
  1
);
*/
