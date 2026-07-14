# -*- coding: utf-8 -*-
"""Ensure every curriculum topic has at least 5 MCQ questions in its bank."""
from __future__ import annotations

import json
import random
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
random.seed(42)


def extract_js_array(text: str, start_marker: str) -> list:
    idx = text.find(start_marker)
    if idx < 0:
        raise ValueError(f"marker not found: {start_marker}")
    i = text.find("[", idx)
    depth = 0
    in_str = False
    esc = False
    quote = None
    for j in range(i, len(text)):
        ch = text[j]
        if in_str:
            if esc:
                esc = False
            elif ch == "\\":
                esc = True
            elif ch == quote:
                in_str = False
            continue
        if ch in "'\"":
            in_str = True
            quote = ch
            continue
        if ch == "[":
            depth += 1
        elif ch == "]":
            depth -= 1
            if depth == 0:
                return json.loads(text[i : j + 1])
    raise ValueError("unclosed array")


def topic_ids() -> list[str]:
    ids = []
    el = (ROOT / "src/data/curriculum/elementarySchool.js").read_text(encoding="utf-8")
    ids += re.findall(r'"id": "(g[^"]+)"', el)
    ms = (ROOT / "src/data/curriculum/middleSchool.js").read_text(encoding="utf-8")
    ids += re.findall(r'"id": "(g[^"]+)"', ms)
    hs = (ROOT / "src/data/curriculum/highSchool.js").read_text(encoding="utf-8")
    ids += re.findall(r"id: '(g[^']+)'", hs)
    # unique preserve order
    seen = set()
    out = []
    for t in ids:
        if t not in seen:
            seen.add(t)
            out.append(t)
    return out


def grade_of(tid: str) -> int:
    m = re.match(r"g(\d+)", tid)
    return int(m.group(1)) if m else 7


def bank_for(tid: str) -> str:
    g = grade_of(tid)
    if g <= 6:
        return "elementary"
    if g <= 9:
        return "middle"
    return "high"


def mcq(qid, topic, diff, text, options, correct, expl):
    return {
        "id": qid,
        "topic_id": topic,
        "difficulty": diff,
        "type": "mcq",
        "question_text": text,
        "options": options,
        "correct_index": correct,
        "explanation": expl,
    }


def distractors_num(correct: int | float, n=3):
    vals = set()
    base = int(correct) if float(correct).is_integer() else correct
    while len(vals) < n:
        delta = random.choice([-5, -3, -2, -1, 1, 2, 3, 5, 10, -10])
        cand = base + delta
        if cand != correct and cand not in vals:
            vals.add(cand)
    return list(vals)


def shuffle_options(correct_val, wrong_vals, as_latex=True):
    opts = [correct_val] + wrong_vals
    random.shuffle(opts)
    idx = opts.index(correct_val)

    def fmt(v):
        if isinstance(v, str):
            return v
        if as_latex:
            if isinstance(v, float) and not float(v).is_integer():
                return f"${v}$"
            return f"${int(v) if float(v).is_integer() else v}$"
        return str(v)

    return [fmt(o) for o in opts], idx


def gen_arithmetic(topic: str, n: int, grade: int, start_i: int) -> list:
    qs = []
    max_n = {1: 20, 2: 100, 3: 500, 4: 1000, 5: 2000, 6: 5000}.get(grade, 100)
    for k in range(n):
        a = random.randint(1, max(2, max_n // 2))
        b = random.randint(1, max(2, max_n // 2))
        op = random.choice(["+", "-", "*"] if grade >= 2 else ["+", "-"])
        if op == "+":
            ans = a + b
            text = f"\u05db\u05de\u05d4 \u05d6\u05d4 ${a}+{b}$?"
            expl = f"${a}+{b}={ans}$."
        elif op == "-":
            if a < b:
                a, b = b, a
            ans = a - b
            text = f"\u05de\u05d4\u05d5 ${a}-{b}$?"
            expl = f"${a}-{b}={ans}$."
        else:
            a = random.randint(2, 12 if grade < 4 else 20)
            b = random.randint(2, 10)
            ans = a * b
            text = f"\u05de\u05d4\u05d5 ${a}\\times {b}$?"
            expl = f"${a}\\times {b}={ans}$."
        wrong = distractors_num(ans)
        options, ci = shuffle_options(ans, wrong)
        qs.append(
            mcq(
                f"q-auto-{topic}-{start_i + k}",
                topic,
                min(5, 1 + grade // 3),
                text,
                options,
                ci,
                expl,
            )
        )
    return qs


def gen_fractionish(topic: str, n: int, start_i: int) -> list:
    qs = []
    pairs = [(1, 2), (1, 4), (1, 3), (2, 4), (3, 4), (2, 6), (1, 5), (2, 3)]
    for k in range(n):
        num, den = pairs[k % len(pairs)]
        # compare to another
        other = pairs[(k + 3) % len(pairs)]
        # which is larger - compute
        left = num / den
        right = other[0] / other[1]
        if abs(left - right) < 1e-9:
            correct = "\u05e9\u05d5\u05d5\u05d9\u05dd"
            wrongs = [
                f"$\\frac{{{num}}}{{{den}}}$",
                f"$\\frac{{{other[0]}}}{{{other[1]}}}$",
                "$0$",
            ]
            options = [correct] + wrongs
            random.shuffle(options)
            ci = options.index(correct)
            text = (
                f"\u05d4\u05e9\u05d5\u05d5\u05d5 \u05d1\u05d9\u05df "
                f"$\\frac{{{num}}}{{{den}}}$ \u05dc-$\\frac{{{other[0]}}}{{{other[1]}}}$?"
            )
            expl = f"$\\frac{{{num}}}{{{den}}}=\\frac{{{other[0]}}}{{{other[1]}}}$."
        else:
            bigger = f"$\\frac{{{num}}}{{{den}}}$" if left > right else f"$\\frac{{{other[0]}}}{{{other[1]}}}$"
            smaller = f"$\\frac{{{other[0]}}}{{{other[1]}}}$" if left > right else f"$\\frac{{{num}}}{{{den}}}$"
            options = [bigger, smaller, "\u05e9\u05d5\u05d5\u05d9\u05dd", "$1$"]
            # shuffle but track
            correct = bigger
            random.shuffle(options)
            ci = options.index(correct)
            text = (
                f"\u05d0\u05d9\u05d6\u05d4 \u05d2\u05d3\u05d5\u05dc \u05d9\u05d5\u05ea\u05e8: "
                f"$\\frac{{{num}}}{{{den}}}$ \u05d0\u05d5 $\\frac{{{other[0]}}}{{{other[1]}}}$?"
            )
            expl = f"{correct} \u05d2\u05d3\u05d5\u05dc \u05d9\u05d5\u05ea\u05e8."
        qs.append(
            mcq(f"q-auto-{topic}-{start_i + k}", topic, 2, text, options, ci, expl)
        )
    return qs


def gen_percent(topic: str, n: int, start_i: int) -> list:
    qs = []
    for k in range(n):
        pct = random.choice([10, 20, 25, 50, 5, 15])
        whole = random.choice([40, 60, 80, 100, 200])
        ans = whole * pct // 100
        text = f"\u05de\u05d4\u05d5 ${pct}\\%$ \u05de-${whole}$?"
        expl = f"${pct}\\% \\times {whole} = {ans}$."
        options, ci = shuffle_options(ans, distractors_num(ans))
        qs.append(mcq(f"q-auto-{topic}-{start_i + k}", topic, 3, text, options, ci, expl))
    return qs


def gen_geo_basic(topic: str, n: int, start_i: int) -> list:
    qs = []
    templates = [
        (
            "\u05e9\u05d8\u05d7 \u05de\u05dc\u05d1\u05df ${a}\\times {b}$:",
            lambda a, b: a * b,
            "${a}\\cdot {b}={ans}$.",
        ),
        (
            "\u05d4\u05d9\u05e7\u05e3 \u05e8\u05d9\u05d1\u05d5\u05e2 \u05e2\u05dd \u05e6\u05dc\u05e2 ${a}$:",
            lambda a, b: 4 * a,
            "$4\\times {a}={ans}$.",
        ),
        (
            "\u05e0\u05e4\u05d7 \u05ea\u05d9\u05d1\u05d4 ${a}\\times {b}\\times {c}$:",
            lambda a, b, c=None: a * b * (c or 2),
            "${a}\\cdot {b}\\cdot {c}={ans}$.",
        ),
    ]
    for k in range(n):
        a, b, c = random.randint(2, 8), random.randint(2, 8), random.randint(2, 5)
        if k % 3 == 0:
            ans = a * b
            text = f"\u05e9\u05d8\u05d7 \u05de\u05dc\u05d1\u05df ${a}\\times {b}$:"
            expl = f"${a}\\cdot {b}={ans}$."
        elif k % 3 == 1:
            ans = 4 * a
            text = f"\u05d4\u05d9\u05e7\u05e3 \u05e8\u05d9\u05d1\u05d5\u05e2 \u05e2\u05dd \u05e6\u05dc\u05e2 ${a}$:"
            expl = f"$4\\times {a}={ans}$."
        else:
            ans = a * b * c
            text = f"\u05e0\u05e4\u05d7 \u05ea\u05d9\u05d1\u05d4 ${a}\\times {b}\\times {c}$:"
            expl = f"${a}\\cdot {b}\\cdot {c}={ans}$."
        options, ci = shuffle_options(ans, distractors_num(ans))
        qs.append(mcq(f"q-auto-{topic}-{start_i + k}", topic, 2, text, options, ci, expl))
    return qs


def gen_algebra(topic: str, n: int, start_i: int) -> list:
    qs = []
    for k in range(n):
        kind = k % 4
        if kind == 0:
            a, b = random.randint(2, 9), random.randint(1, 15)
            # ax = b
            if b % a == 0:
                ans = b // a
            else:
                b = a * random.randint(2, 8)
                ans = b // a
            text = f"\u05e4\u05ea\u05e8\u05d5 ${a}x={b}$. \u05de\u05d4\u05d5 $x$?"
            expl = f"$x=\\dfrac{{{b}}}{{{a}}}={ans}$."
            options, ci = shuffle_options(ans, distractors_num(ans))
        elif kind == 1:
            m, b = random.randint(1, 5), random.randint(-5, 5)
            text = f"\u05de\u05d4\u05d5 \u05d4\u05e9\u05d9\u05e4\u05d5\u05e2 \u05e9\u05dc $y={m}x{('+'+str(b)) if b>=0 else str(b)}$?"
            expl = f"\u05d4\u05e9\u05d9\u05e4\u05d5\u05e2 \u05d4\u05d5\u05d0 ${m}$."
            options, ci = shuffle_options(m, distractors_num(m))
        elif kind == 2:
            a, b = random.randint(1, 6), random.randint(1, 6)
            ans = a * a + b  # for (x-a) nonsense - simpler: 3^2
            base = random.randint(2, 9)
            ans = base * base
            text = f"\u05de\u05d4\u05d5 ${base}^2$?"
            expl = f"${base}^2={ans}$."
            options, ci = shuffle_options(ans, distractors_num(ans))
        else:
            a, b, c = random.randint(1, 5), random.randint(1, 5), random.randint(1, 10)
            # a+b*c with order
            ans = a + b * c
            text = f"\u05de\u05d4\u05d5 ${a}+{b}\\times {c}$?"
            expl = f"\u05e1\u05d3\u05e8 \u05e4\u05e2\u05d5\u05dc\u05d5\u05ea: ${a}+{b*c}={ans}$."
            options, ci = shuffle_options(ans, distractors_num(ans))
        qs.append(mcq(f"q-auto-{topic}-{start_i + k}", topic, 3, text, options, ci, expl))
    return qs


def gen_stats(topic: str, n: int, start_i: int) -> list:
    qs = []
    for k in range(n):
        vals = sorted(random.sample(range(10, 90), 5))
        mean = sum(vals) // 5
        # force integer mean
        vals[4] = mean * 5 - sum(vals[:4])
        vals = sorted(vals)
        mean = sum(vals) // 5
        text = (
            f"\u05de\u05d4\u05d5 \u05d4\u05de\u05de\u05d5\u05e6\u05e2 \u05e9\u05dc "
            + ", ".join(f"${v}$" for v in vals)
            + "?"
        )
        expl = f"$({ '+'.join(map(str, vals)) })/5={mean}$."
        options, ci = shuffle_options(mean, distractors_num(mean))
        qs.append(mcq(f"q-auto-{topic}-{start_i + k}", topic, 2, text, options, ci, expl))
    return qs


def gen_for_topic(topic: str, need: int, start_i: int) -> list:
    if need <= 0:
        return []
    g = grade_of(topic)
    tid = topic.lower()
    if any(k in tid for k in ["frac", "shavar", "ratio", "percent", "ahuz"]):
        # hebrew topics: fractions keywords in id
        pass
    if "frac" in tid or "percent" in tid or "ratio" in tid:
        return gen_percent(topic, need, start_i) if "percent" in tid or "ratio" in tid else gen_fractionish(topic, need, start_i)
    if any(k in tid for k in ["geo", "shape", "area", "angle", "circle", "trig", "solids", "space", "measure"]):
        return gen_geo_basic(topic, need, start_i)
    if any(k in tid for k in ["stat", "data", "prob", "normal", "regress"]):
        return gen_stats(topic, need, start_i)
    if g <= 6:
        if any(k in tid for k in ["frac", "g2-fractions", "g3-fractions", "g4-fractions", "g5-fractions", "g6-frac"]):
            return gen_fractionish(topic, need, start_i)
        if "percent" in tid or "ratio" in tid or "g6-ratio" in tid:
            return gen_percent(topic, need, start_i)
        if any(k in tid for k in ["shape", "geo", "area", "measure"]):
            return gen_geo_basic(topic, need, start_i)
        if "data" in tid or "prob" in tid:
            return gen_stats(topic, need, start_i)
        return gen_arithmetic(topic, need, g, start_i)
    if g <= 9:
        if any(k in tid for k in ["geo", "angle", "circle", "tri"]):
            return gen_geo_basic(topic, need, start_i)
        if any(k in tid for k in ["stat", "prob", "data"]):
            return gen_stats(topic, need, start_i)
        return gen_algebra(topic, need, start_i)
    # high school
    if any(k in tid for k in ["stat", "prob", "normal", "regress", "science"]):
        return gen_stats(topic, need, start_i)
    if any(k in tid for k in ["geo", "trig", "space", "solids", "circle", "analytic"]):
        return gen_geo_basic(topic, need, start_i)
    if "finance" in tid or "percent" in tid:
        return gen_percent(topic, need, start_i)
    return gen_algebra(topic, need, start_i)


def write_bank(path: Path, export_name: str, questions: list, header_he: str):
    body = (
        f"/** {header_he} */\n\n"
        f"export const {export_name} = "
        + json.dumps(questions, ensure_ascii=False, indent=2)
        + ";\n\n"
    )
    if export_name == "QUESTIONS":
        body += """export function getQuestionsForTopic(topicId) {
  return QUESTIONS.filter((q) => q.topic_id === topicId);
}
"""
    elif export_name == "ELEMENTARY_QUESTIONS":
        body += """export function getElementaryQuestionsForTopic(topicId) {
  return ELEMENTARY_QUESTIONS.filter((q) => q.topic_id === topicId);
}
"""
    elif export_name == "MIDDLE_SCHOOL_QUESTIONS":
        body += """export function getMiddleSchoolQuestionsForTopic(topicId) {
  return MIDDLE_SCHOOL_QUESTIONS.filter((q) => q.topic_id === topicId);
}
"""
    path.write_text(body, encoding="utf-8")
    print("wrote", path.name, len(questions))


def main():
    # Load existing
    el_path = ROOT / "src/data/questions/elementaryQuestions.js"
    ms_path = ROOT / "src/data/questions/middleSchoolQuestions.js"
    hs_path = ROOT / "src/data/questions/highSchoolQuestions.js"
    ix_path = ROOT / "src/data/questions/interactiveQuestions.js"

    el = extract_js_array(el_path.read_text(encoding="utf-8"), "ELEMENTARY_QUESTIONS")
    ms_text = ms_path.read_text(encoding="utf-8")
    if "MIDDLE_SCHOOL_QUESTIONS" in ms_text:
        ms = extract_js_array(ms_text, "MIDDLE_SCHOOL_QUESTIONS")
        ms_export = "MIDDLE_SCHOOL_QUESTIONS"
    else:
        # try other names
        m = re.search(r"export const (\w+) = \[", ms_text)
        ms_export = m.group(1)
        ms = extract_js_array(ms_text, ms_export)

    hs = extract_js_array(hs_path.read_text(encoding="utf-8"), "QUESTIONS")
    ix = extract_js_array(ix_path.read_text(encoding="utf-8"), "INTERACTIVE_QUESTIONS")

    # Ensure type field on existing mcq
    for q in el + ms + hs:
        q.setdefault("type", "mcq")

    by_bank = {"elementary": el, "middle": ms, "high": hs}
    existing_by_topic = defaultdict(list)
    for bank, qs in by_bank.items():
        for q in qs:
            existing_by_topic[q["topic_id"]].append(q)

    ix_count = defaultdict(int)
    for q in ix:
        ix_count[q["topic_id"]] += 1

    topics = topic_ids()
    new_by_bank = {"elementary": [], "middle": [], "high": []}

    for tid in topics:
        bank = bank_for(tid)
        have = list(existing_by_topic.get(tid, []))
        # We want 20 MCQs per topic in the bank; quizzes pick 5 at random.
        TARGET = 20
        need = max(0, TARGET - len(have))
        pads = gen_for_topic(tid, need, start_i=len(have) + 1)
        merged = have + pads
        if len(merged) < TARGET:
            merged += gen_for_topic(tid, TARGET - len(merged), start_i=1000)
        # Cap at TARGET if somehow over (keep earliest unique)
        if len(merged) > TARGET:
            merged = merged[:TARGET]
        new_by_bank[bank].extend(merged)

    write_bank(
        el_path,
        "ELEMENTARY_QUESTIONS",
        new_by_bank["elementary"],
        "\u05e9\u05d0\u05dc\u05d5\u05ea \u05d9\u05e1\u05d5\u05d3\u05d9",
    )
    write_bank(
        ms_path,
        ms_export if ms_export.endswith("QUESTIONS") else "MIDDLE_SCHOOL_QUESTIONS",
        new_by_bank["middle"],
        "\u05e9\u05d0\u05dc\u05d5\u05ea \u05d7\u05d8\"\u05d1",
    )
    write_bank(
        hs_path,
        "QUESTIONS",
        new_by_bank["high"],
        "\u05e9\u05d0\u05dc\u05d5\u05ea \u05d7\u05d8\"\u05e2",
    )

    # Verify combined counts (ix + bank)
    bank_counts = defaultdict(int)
    for qs in new_by_bank.values():
        for q in qs:
            bank_counts[q["topic_id"]] += 1

    under = []
    for tid in topics:
        total = bank_counts[tid]
        if total < 20:
            under.append((tid, total))
    print("topics", len(topics), "under20_bank", under[:10], "count", len(under))
    print(
        "avg bank",
        sum(bank_counts[t] for t in topics) / len(topics),
    )


if __name__ == "__main__":
    main()
