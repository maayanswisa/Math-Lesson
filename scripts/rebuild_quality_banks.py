# -*- coding: utf-8 -*-
"""Rebuild MCQ banks: keep hand seeds, replace q-auto-* with topic-fit questions."""
from __future__ import annotations

import hashlib
import json
import random
import re
from fractions import Fraction
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TARGET = 20


def extract_js_array(text: str, start_marker: str) -> list:
    idx = text.find(start_marker)
    if idx < 0:
        raise ValueError(start_marker)
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
        if ch in "\"'":
            in_str = True
            quote = ch
            continue
        if ch == "[":
            depth += 1
        elif ch == "]":
            depth -= 1
            if depth == 0:
                return json.loads(text[i : j + 1])
    raise ValueError("unclosed")


def topic_ids() -> list[str]:
    ids = []
    el = (ROOT / "src/data/curriculum/elementarySchool.js").read_text(encoding="utf-8")
    ids += re.findall(r'"id": "(g[^"]+)"', el)
    ms = (ROOT / "src/data/curriculum/middleSchool.js").read_text(encoding="utf-8")
    ids += re.findall(r'"id": "(g[^"]+)"', ms)
    hs = (ROOT / "src/data/curriculum/highSchool.js").read_text(encoding="utf-8")
    ids += re.findall(r"id: '(g[^']+)'", hs)
    seen, out = set(), []
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


def seed_for(topic: str) -> None:
    random.seed(int(hashlib.md5(topic.encode()).hexdigest()[:8], 16))


def fmt(v):
    if isinstance(v, str):
        return v
    if isinstance(v, float) and not float(v).is_integer():
        return "$%s$" % v
    return "$%s$" % int(v)


def near(ans, n=3):
    base = int(ans) if isinstance(ans, (int, float)) else 0
    vals = set()
    for d in [-7, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 7, 8, -8, 10, -10]:
        c = base + d
        if c != ans:
            vals.add(c)
        if len(vals) >= n:
            break
    while len(vals) < n:
        vals.add(base + random.randint(11, 30) * random.choice([-1, 1]))
    return list(vals)[:n]


def shuffle_opts(correct, wrongs):
    raw = [correct] + list(wrongs)
    random.shuffle(raw)
    out = [fmt(o) if not isinstance(o, str) else o for o in raw]
    cf = fmt(correct) if not isinstance(correct, str) else correct
    return out, out.index(cf)


def mcq(qid, topic, diff, text, options, ci, expl):
    return {
        "id": qid,
        "topic_id": topic,
        "difficulty": diff,
        "type": "mcq",
        "question_text": text,
        "options": options,
        "correct_index": ci,
        "explanation": expl,
    }


def pack(topic, start, items, n):
    seen = set()
    out = []
    random.shuffle(items)
    for diff, text, correct, wrongs, expl in items:
        if text in seen:
            continue
        seen.add(text)
        opts, ci = shuffle_opts(correct, wrongs)
        out.append(
            mcq("q-q-%s-%d" % (topic, start + len(out)), topic, diff, text, opts, ci, expl)
        )
        if len(out) >= n:
            break
    return out


# Common Hebrew (unicode escapes)
H_WHAT = "\u05de\u05d4\u05d5"
H_COUNT = "\u05db\u05de\u05d4 \u05d6\u05d4"
H_BIG = "\u05d0\u05d9\u05d6\u05d4 \u05d2\u05d3\u05d5\u05dc"
H_CALC = "\u05d7\u05e9\u05d1\u05d5"
H_SOLVE = "\u05e4\u05ea\u05e8\u05d5"
H_EQ = "\u05e9\u05d5\u05d5\u05d9\u05dd"
H_AREA = "\u05e9\u05d8\u05d7"
H_PER = "\u05d4\u05d9\u05e7\u05e3"
H_MEAN = "\u05de\u05de\u05d5\u05e6\u05e2"


def category(tid: str) -> str:
    t = tid.lower()
    g = grade_of(tid)
    if "complex" in t:
        return "complex"
    if "vector" in t:
        return "vector"
    if "hypothesis" in t:
        return "hypothesis"
    if "integral" in t:
        return "integral"
    if "diff" in t:
        return "derivative"
    if "trig" in t:
        return "trig"
    if "pythag" in t:
        return "pythagoras"
    if "congruence" in t:
        return "congruence"
    if "similarity" in t:
        return "similarity"
    if "circle" in t and "analytic" not in t:
        return "circle"
    if "coord" in t:
        return "coordinates"
    if "angle" in t or "triangle" in t:
        return "angles"
    if "signed" in t:
        return "signed"
    if "inequal" in t:
        return "inequality"
    if "programming" in t:
        return "lp"
    if "quad" in t:
        return "quadratic"
    if "factor" in t or "expand" in t:
        return "factor"
    if "system" in t:
        return "system"
    if "linear-fn" in t or (t.endswith("-linear") or "g9x-linear" in t):
        return "linear_fn"
    if "function" in t or "precalc" in t:
        return "functions"
    if "equation" in t:
        return "equations"
    if "algebra" in t or "expr" in t:
        return "algebra_expr"
    if "order" in t or "power" in t:
        return "order_powers"
    if "exp-log" in t or "growth" in t:
        return "explog"
    if "sequence" in t or "induction" in t:
        return "sequences"
    if "percent" in t and "prob" in t:
        return "percent_prob"
    if "finance" in t or "percent" in t:
        return "percent"
    if "ratio" in t:
        return "ratio_percent"
    if "prob" in t:
        return "prob"
    if "normal" in t or "regress" in t or "stat" in t or "data" in t or "science" in t:
        return "stats"
    if "frac" in t and ("mul" in t or "div" in t):
        return "frac_muldiv"
    if "frac" in t and ("ops" in t or "adv" in t):
        return "frac_ops"
    if "frac" in t or "half" in t:
        return "fractions"
    if "decimal" in t and ("ops" in t or "mul" in t):
        return "decimals_ops"
    if "decimal" in t:
        return "decimals"
    if "mul-div" in t:
        return "muldiv"
    if "add-sub" in t:
        return "addsub"
    if "count" in t:
        return "count"
    if "number-sets" in t:
        return "number_sets"
    if "numbers" in t or "large-number" in t:
        return "place"
    if "shape" in t:
        return "shapes"
    if "measure" in t and g <= 2:
        return "measure"
    if "solids" in t or "space" in t:
        return "solids"
    if "analytic" in t or "hyperbola" in t:
        return "analytic"
    if "area" in t or "perimeter" in t:
        return "area"
    if "poly" in t or "rational-root" in t:
        return "polynomial"
    if "geo" in t:
        return "shapes" if g <= 2 else "area" if g <= 6 else "geo_plane"
    if g <= 6:
        return "addsub"
    if g <= 9:
        return "algebra_expr"
    return "functions"


def gen(topic: str, need: int, start: int) -> list:
    if need <= 0:
        return []
    seed_for(topic + ":" + str(start))
    c = category(topic)
    g = grade_of(topic)
    table = {
        "count": lambda: gen_count(topic, need, start),
        "place": lambda: gen_place(topic, need, start, 100 if g <= 2 else (10000 if g >= 4 else 1000)),
        "addsub": lambda: gen_addsub(topic, need, start, 20 if g == 1 else (100 if g == 2 else 10000)),
        "muldiv": lambda: gen_muldiv(topic, need, start, hard=g >= 5),
        "fractions": lambda: gen_fractions(topic, need, start),
        "frac_ops": lambda: gen_frac_ops(topic, need, start),
        "frac_muldiv": lambda: gen_frac_muldiv(topic, need, start),
        "decimals": lambda: gen_decimals(topic, need, start, False),
        "decimals_ops": lambda: gen_decimals(topic, need, start, True),
        "shapes": lambda: gen_shapes(topic, need, start),
        "measure": lambda: gen_measure(topic, need, start),
        "area": lambda: gen_area(topic, need, start, vol=g >= 5),
        "stats": lambda: gen_stats(topic, need, start, prob=False),
        "prob": lambda: gen_stats(topic, need, start, prob=True),
        "percent": lambda: gen_percent(topic, need, start),
        "ratio_percent": lambda: gen_percent(topic, need, start, ratio=True),
        "percent_prob": lambda: gen_percent(topic, need, start, ratio=True, prob=True),
        "number_sets": lambda: gen_number_sets(topic, need, start),
        "signed": lambda: gen_signed(topic, need, start),
        "order_powers": lambda: gen_order_powers(topic, need, start),
        "algebra_expr": lambda: gen_algebra_expr(topic, need, start),
        "equations": lambda: gen_equations(topic, need, start),
        "system": lambda: gen_system(topic, need, start),
        "factor": lambda: gen_factor(topic, need, start),
        "linear_fn": lambda: gen_linear_fn(topic, need, start),
        "functions": lambda: gen_functions(topic, need, start),
        "quadratic": lambda: gen_quadratic(topic, need, start),
        "inequality": lambda: gen_inequality(topic, need, start),
        "coordinates": lambda: gen_coordinates(topic, need, start),
        "angles": lambda: gen_angles(topic, need, start),
        "congruence": lambda: gen_congruence(topic, need, start),
        "similarity": lambda: gen_similarity(topic, need, start),
        "pythagoras": lambda: gen_pythagoras(topic, need, start),
        "circle": lambda: gen_circle(topic, need, start),
        "geo_plane": lambda: gen_angles(topic, need, start),
        "trig": lambda: gen_trig(topic, need, start),
        "analytic": lambda: gen_analytic(topic, need, start),
        "solids": lambda: gen_solids(topic, need, start),
        "derivative": lambda: gen_derivative(topic, need, start),
        "integral": lambda: gen_integral(topic, need, start),
        "vector": lambda: gen_vector(topic, need, start),
        "complex": lambda: gen_complex(topic, need, start),
        "explog": lambda: gen_explog(topic, need, start),
        "sequences": lambda: gen_sequences(topic, need, start),
        "polynomial": lambda: gen_polynomial(topic, need, start),
        "hypothesis": lambda: gen_hypothesis(topic, need, start),
        "lp": lambda: gen_lp(topic, need, start),
    }
    fn = table.get(c) or table["algebra_expr"]
    qs = fn()
    # pad if generator ran short
    guard = 0
    while len(qs) < need and guard < 5:
        guard += 1
        extra = gen_equations(topic, need - len(qs), start + 500 + guard * 50)
        # only use equations pad for algebra-ish; else duplicate-safe addsub/place
        if c in ("shapes", "measure", "trig", "circle", "pythagoras", "congruence", "similarity"):
            extra = gen_area(topic, need - len(qs), start + 700 + guard * 50, vol=False)
        texts = {q["question_text"] for q in qs}
        for q in extra:
            if q["question_text"] not in texts:
                qs.append(q)
                texts.add(q["question_text"])
            if len(qs) >= need:
                break
    return qs[:need]


def gen_count(topic, n, start):
    items = []
    for a in range(1, 15):
        for b in range(1, 15):
            if a + b <= 20:
                items.append((1, "%s $%d+%d$?" % (H_COUNT, a, b), a + b, near(a + b), "$%d+%d=%d$." % (a, b, a + b)))
            if a > b:
                items.append((1, "%s $%d-%d$?" % (H_WHAT, a, b), a - b, near(a - b), "$%d-%d=%d$." % (a, b, a - b)))
    items += [
        (2, "%s: $14$ \u05d0\u05d5 $9$?" % H_BIG, "$14$", ["$9$", H_EQ, "$11$"], "$14>9$."),
        (2, "\u05de\u05d4\u05d5 \u05d4\u05de\u05e1\u05e4\u05e8 \u05d4\u05d1\u05d0 \u05d0\u05d7\u05e8\u05d9 $19$?", 20, [18, 21, 10], "$19+1=20$."),
    ]
    return pack(topic, start, items, n)


def gen_place(topic, n, start, mx=100):
    items = []
    pool = list(range(11, min(mx, 5000)))
    for x in random.sample(pool, min(60, len(pool))):
        if x < 100:
            t, o = divmod(x, 10)
            items.append((2, "\u05d1\u05de\u05e1\u05e4\u05e8 $%d$ \u05db\u05de\u05d4 \u05e2\u05e9\u05e8\u05d5\u05ea?" % x, t, near(t), "$%d$." % t))
            items.append((2, "\u05d1\u05de\u05e1\u05e4\u05e8 $%d$ \u05db\u05de\u05d4 \u05d9\u05d7\u05d9\u05d3\u05d5\u05ea?" % x, o, near(o), "$%d$." % o))
        y = x + random.choice([-6, -3, 3, 6])
        if 1 < y < mx and y != x:
            items.append((2, "%s: $%d$ \u05d0\u05d5 $%d$?" % (H_BIG, x, y), fmt(max(x, y)), [fmt(min(x, y)), H_EQ, fmt(abs(x - y))], "max."))
        if x >= 100:
            items.append((3, "\u05d1\u05de\u05e1\u05e4\u05e8 $%d$ \u05db\u05de\u05d4 \u05de\u05d0\u05d5\u05ea?" % x, x // 100, near(x // 100), "hundreds."))
    return pack(topic, start, items, n)


def gen_addsub(topic, n, start, mx=100):
    items = []
    for _ in range(120):
        a = random.randint(1, mx)
        b = random.randint(1, max(1, mx // 2))
        items.append((2, "%s: $%d+%d$." % (H_CALC, a, b), a + b, near(a + b), "$%d+%d=%d$." % (a, b, a + b)))
        if a > b:
            items.append((2, "%s: $%d-%d$." % (H_CALC, a, b), a - b, near(a - b), "$%d-%d=%d$." % (a, b, a - b)))
            items.append((3, "\u05d9\u05e9 $%d$, \u05e0\u05ea\u05e0\u05d5 $%d$. \u05db\u05de\u05d4 \u05e0\u05e9\u05d0\u05e8?" % (a, b), a - b, near(a - b), "sub."))
    return pack(topic, start, items, n)


def gen_muldiv(topic, n, start, hard=False):
    items = []
    lim = 20 if hard else 12
    for a in range(2, lim + 1):
        for b in range(2, 11):
            items.append((2 + int(hard), "%s $%d\\times %d$?" % (H_WHAT, a, b), a * b, near(a * b), "mul."))
            items.append((3, "%s $%d\\div %d$?" % (H_WHAT, a * b, a), b, near(b), "div."))
    return pack(topic, start, items, n)


def gen_fractions(topic, n, start):
    pairs = [(1, 2), (1, 3), (1, 4), (2, 4), (3, 4), (1, 5), (2, 5), (2, 3), (3, 5), (1, 6), (5, 6), (3, 8)]
    items = []
    for num, den in pairs:
        items.append((2, "\u05d0\u05d9\u05d6\u05d4 \u05e9\u05d1\u05e8: %d/%d?" % (num, den), "$\\frac{%d}{%d}$" % (num, den), ["$\\frac{%d}{%d}$" % (den, num), "$%d$" % num, "$\\frac{1}{%d}$" % num], "frac."))
    for i, (a, b) in enumerate(pairs):
        c, d = pairs[(i + 5) % len(pairs)]
        if abs(a / b - c / d) < 1e-9:
            continue
        big = (a, b) if a / b > c / d else (c, d)
        small = (c, d) if a / b > c / d else (a, b)
        items.append((3, "%s: $\\frac{%d}{%d}$ \u05d0\u05d5 $\\frac{%d}{%d}$?" % (H_BIG, a, b, c, d), "$\\frac{%d}{%d}$" % big, ["$\\frac{%d}{%d}$" % small, H_EQ, "$1$"], "compare."))
    items += [
        (1, "%s $\\frac{1}{2}$ \u05de-$10$?" % H_WHAT, 5, [2, 4, 10], "5."),
        (2, "%s $\\frac{1}{4}$ \u05de-$12$?" % H_WHAT, 3, [4, 6, 2], "3."),
        (2, "%s $\\frac{3}{4}$ \u05de-$8$?" % H_WHAT, 6, [3, 4, 7], "6."),
    ]
    return pack(topic, start, items, n)


def gen_frac_ops(topic, n, start):
    items = []
    for den in [2, 3, 4, 5, 6, 8, 10]:
        for x in range(1, den):
            for y in range(1, den):
                ans = Fraction(x + y, den)
                items.append((3, "%s: $\\frac{%d}{%d}+\\frac{%d}{%d}$." % (H_CALC, x, den, y, den), "$\\frac{%d}{%d}$" % (ans.numerator, ans.denominator), ["$%d$" % (x + y), "$\\frac{%d}{%d}$" % (x, y), "$\\frac{%d}{%d}$" % (x + y, den * 2)], "add."))
                if x > y:
                    ans = Fraction(x - y, den)
                    items.append((3, "%s: $\\frac{%d}{%d}-\\frac{%d}{%d}$." % (H_CALC, x, den, y, den), "$\\frac{%d}{%d}$" % (ans.numerator, ans.denominator), ["$%d$" % (x - y), "$\\frac{%d}{%d}$" % (y, den), "$\\frac{%d}{%d}$" % (x, y)], "sub."))
    return pack(topic, start, items, n)


def gen_frac_muldiv(topic, n, start):
    items = []
    combos = [(1, 2, 1, 3), (2, 3, 3, 4), (1, 4, 2, 5), (3, 5, 1, 2), (2, 5, 3, 4), (1, 3, 3, 5), (3, 4, 2, 3), (1, 2, 3, 5), (2, 7, 1, 3), (4, 5, 1, 2), (1, 6, 2, 3), (3, 8, 2, 5), (5, 6, 1, 4), (2, 9, 3, 4)]
    for a, b, c, d in combos:
        ans = Fraction(a, b) * Fraction(c, d)
        items.append((4, "%s: $\\frac{%d}{%d}\\times\\frac{%d}{%d}$." % (H_CALC, a, b, c, d), "$\\frac{%d}{%d}$" % (ans.numerator, ans.denominator), ["$\\frac{%d}{%d}$" % (a * c, b), "$\\frac{%d}{%d}$" % (a, b * d), "$%d$" % (a * c)], "mul."))
        ans = Fraction(a, b) / Fraction(c, d)
        items.append((4, "%s: $\\frac{%d}{%d}\\div\\frac{%d}{%d}$." % (H_CALC, a, b, c, d), "$\\frac{%d}{%d}$" % (ans.numerator, ans.denominator), ["$\\frac{%d}{%d}$" % (a * c, b * d), "$\\frac{%d}{%d}$" % (a, b), "$%d$" % a], "div."))
    return pack(topic, start, items, n)


def gen_decimals(topic, n, start, ops=False):
    vals = [0.1, 0.2, 0.25, 0.3, 0.35, 0.5, 0.7, 0.75, 1.2, 1.5, 2.5, 0.05, 3.6, 4.2, 5.25]
    items = []
    for i, x in enumerate(vals):
        y = vals[(i + 4) % len(vals)]
        if x != y:
            items.append((2, "%s: $%s$ \u05d0\u05d5 $%s$?" % (H_BIG, x, y), fmt(max(x, y)), [fmt(min(x, y)), H_EQ, "$1$"], "cmp."))
    items += [
        (2, "%s $0.5$ \u05db\u05e9\u05d1\u05e8?" % H_WHAT, "$\\frac{1}{2}$", ["$\\frac{1}{5}$", "$5$", "$0.05$"], "1/2."),
        (2, "%s $0.25$ \u05db\u05e9\u05d1\u05e8?" % H_WHAT, "$\\frac{1}{4}$", ["$\\frac{1}{25}$", "$\\frac{2}{5}$", "$\\frac{1}{2}$"], "1/4."),
        (3, "\u05d1\u05de\u05e1\u05e4\u05e8 $0.7$ \u05e1\u05e4\u05e8\u05ea \u05d4\u05e2\u05e9\u05d9\u05e8\u05d9\u05d5\u05ea:", 7, [0, 70, 3], "7."),
    ]
    if ops:
        for a, b in [(1.5, 0.5), (2.3, 1.1), (0.7, 0.2), (3.5, 1.25), (4.0, 0.5), (2.5, 0.5), (5.5, 2.5), (1.2, 0.4), (6.4, 1.6)]:
            items.append((3, "%s: $%s+%s$." % (H_CALC, a, b), round(a + b, 2), [round(a - b, 2), round(a * b, 2), round(a + b + 0.1, 2)], "add."))
            items.append((4, "%s: $%s\\times %s$." % (H_CALC, a, b), round(a * b, 2), [round(a + b, 2), round(a / b, 2), round(a * b + 1, 2)], "mul."))
            if a > b:
                items.append((3, "%s: $%s-%s$." % (H_CALC, a, b), round(a - b, 2), [round(a + b, 2), round(a * b, 2), round(b - a, 2)], "sub."))
    return pack(topic, start, items, n)


def gen_shapes(topic, n, start):
    tri = "\u05de\u05e9\u05d5\u05dc\u05e9"
    sq = "\u05e8\u05d9\u05d1\u05d5\u05e2"
    rect = "\u05de\u05dc\u05d1\u05df"
    circ = "\u05e2\u05d9\u05d2\u05d5\u05dc"
    pent = "\u05de\u05d7\u05d5\u05de\u05e9"
    hx = "\u05de\u05e9\u05d5\u05e9\u05d4"
    items = [
        (1, "\u05dc\u05e6\u05d5\u05e8\u05d4 \u05e2\u05dd 3 \u05e6\u05dc\u05e2\u05d5\u05ea:", tri, [sq, rect, circ], "tri."),
        (1, "\u05e6\u05d5\u05e8\u05d4 \u05e2\u05dd 4 \u05e6\u05dc\u05e2\u05d5\u05ea \u05e9\u05d5\u05d5\u05d5\u05ea:", sq, [tri, circ, pent], "sq."),
        (2, "\u05db\u05de\u05d4 \u05e7\u05d5\u05d3\u05e7\u05d5\u05d3\u05d9\u05dd \u05dc\u05e8\u05d9\u05d1\u05d5\u05e2?", 4, [3, 5, 6], "4."),
        (2, "\u05db\u05de\u05d4 \u05e6\u05dc\u05e2\u05d5\u05ea \u05dc\u05de\u05e9\u05d5\u05dc\u05e9?", 3, [4, 5, 2], "3."),
        (2, "\u05e6\u05d5\u05e8\u05d4 \u05e9\u05d0\u05d9\u05e0\u05d4 \u05de\u05e6\u05d5\u05dc\u05e2:", circ, [tri, sq, rect], "circ."),
        (3, "\u05db\u05de\u05d4 \u05e6\u05dc\u05e2\u05d5\u05ea \u05dc\u05de\u05e9\u05d5\u05e9\u05d4?", 6, [5, 4, 8], "6."),
        (3, "\u05db\u05de\u05d4 \u05e6\u05dc\u05e2\u05d5\u05ea \u05dc\u05de\u05d7\u05d5\u05de\u05e9?", 5, [4, 6, 3], "5."),
        (2, "\u05dc\u05de\u05dc\u05d1\u05df \u05d9\u05e9:", "\u05d6\u05d5\u05d2\u05d5\u05ea \u05e6\u05dc\u05e2\u05d5\u05ea \u05e9\u05d5\u05d5\u05d5\u05ea", ["3 \u05e6\u05dc\u05e2\u05d5\u05ea", circ, "0 \u05e7\u05d5\u05d3\u05e7\u05d5\u05d3\u05d9\u05dd"], "rect."),
        (3, "\u05e1\u05db\u05d5\u05dd \u05d6\u05d5\u05d5\u05d9\u05d5\u05ea \u05d1\u05de\u05e9\u05d5\u05dc\u05e9:", "$180^\\circ$", ["$90^\\circ$", "$360^\\circ$", "$100^\\circ$"], "180."),
        (2, "\u05db\u05de\u05d4 \u05d6\u05d5\u05d5\u05d9\u05d5\u05ea \u05d9\u05e9\u05e8\u05d5\u05ea \u05dc\u05e8\u05d9\u05d1\u05d5\u05e2?", 4, [2, 3, 1], "4."),
        (1, "\u05db\u05de\u05d4 \u05e7\u05d5\u05d3\u05e7\u05d5\u05d3\u05d9\u05dd \u05dc\u05de\u05e9\u05d5\u05dc\u05e9?", 3, [4, 2, 5], "3."),
        (2, "\u05e8\u05d9\u05d1\u05d5\u05e2 \u05d4\u05d5\u05d0 \u05e1\u05d5\u05d2 \u05e9\u05dc:", rect, [tri, circ, pent], "rect."),
        (3, "\u05db\u05de\u05d4 \u05d0\u05dc\u05db\u05e1\u05d5\u05e0\u05d9\u05dd \u05dc\u05e8\u05d9\u05d1\u05d5\u05e2?", 2, [1, 3, 4], "2."),
        (2, "\u05de\u05e6\u05d5\u05dc\u05e2 \u05e2\u05dd 5 \u05e6\u05dc\u05e2\u05d5\u05ea:", pent, [hx, sq, tri], "pent."),
        (2, "\u05e6\u05d5\u05e8\u05d4 \u05e2\u05d2\u05d5\u05dc\u05d4 \u05dc\u05dc\u05d0 \u05e7\u05d5\u05d3\u05e7\u05d5\u05d3\u05d9\u05dd:", circ, [sq, tri, rect], "circ."),
        (1, "\u05db\u05de\u05d4 \u05e6\u05dc\u05e2\u05d5\u05ea \u05dc\u05de\u05dc\u05d1\u05df?", 4, [3, 5, 6], "4."),
        (3, "\u05de\u05e9\u05d5\u05dc\u05e9 \u05e2\u05dd 3 \u05e6\u05dc\u05e2\u05d5\u05ea \u05e9\u05d5\u05d5\u05d5\u05ea:", "\u05e9\u05d5\u05d5\u05d4-\u05e6\u05dc\u05e2\u05d5\u05ea", ["\u05d9\u05e9\u05e8-\u05d6\u05d5\u05d5\u05d9\u05ea", "\u05e7\u05d4\u05d4", sq], "eq."),
        (2, "\u05d0\u05d9\u05d6\u05d4 \u05de\u05e6\u05d5\u05dc\u05e2?", sq, [circ, "\u05e7\u05d5", "\u05db\u05d3\u05d5\u05e8"], "sq."),
        (3, "\u05d1\u05de\u05dc\u05d1\u05df, \u05e6\u05dc\u05e2\u05d5\u05ea \u05e0\u05d2\u05d3\u05d9\u05d5\u05ea:", "\u05e9\u05d5\u05d5\u05d5\u05ea \u05d5\u05de\u05e7\u05d1\u05d9\u05dc\u05d5\u05ea", ["\u05de\u05e9\u05ea\u05e0\u05d5\u05ea", "\u05ea\u05e0\u05d5\u05db\u05d5\u05ea", "\u05dc\u05d0 \u05e7\u05d9\u05d9\u05de\u05d5\u05ea"], "par."),
        (2, "\u05db\u05de\u05d4 \u05e6\u05dc\u05e2\u05d5\u05ea \u05dc\u05e8\u05d9\u05d1\u05d5\u05e2?", 4, [3, 5, 8], "4."),
    ]
    return pack(topic, start, items, n)


# Import remaining generators from companion module (same package file continuation)

from quality_common import pack, near, fmt, seed_for, H_WHAT, H_COUNT, H_BIG, H_CALC, H_SOLVE, H_EQ, H_AREA, H_PER, H_MEAN
from rebuild_quality_banks_more import (
    gen_measure, gen_area, gen_stats, gen_percent, gen_number_sets, gen_signed,
    gen_order_powers, gen_algebra_expr, gen_equations, gen_system, gen_factor,
    gen_linear_fn, gen_functions, gen_quadratic, gen_inequality, gen_coordinates,
    gen_angles, gen_congruence, gen_similarity, gen_pythagoras, gen_circle,
    gen_trig, gen_analytic, gen_solids, gen_derivative, gen_integral, gen_vector,
    gen_complex, gen_explog, gen_sequences, gen_polynomial, gen_hypothesis, gen_lp,
    write_bank,
)

def extract_hand(qs):
    return [q for q in qs if not str(q.get("id", "")).startswith("q-auto-") and not str(q.get("id", "")).startswith("q-q-")]

def build_topic(tid, existing):
    hand = extract_hand(existing)
    # drop old auto/quality gens; keep only true hand seeds (q-g*)
    hand = [q for q in hand if str(q.get("id", "")).startswith("q-g") or (not str(q.get("id","")).startswith("q-q") and not str(q.get("id","")).startswith("q-auto"))]
    hand = [q for q in existing if str(q.get("id", "")).startswith("q-g")]
    seen = {q["question_text"] for q in hand}
    need = TARGET - len(hand)
    gen_qs = gen(tid, max(need, 0), start=1) if need > 0 else []
    out = list(hand)
    for q in gen_qs:
        if q["question_text"] in seen:
            continue
        seen.add(q["question_text"])
        out.append(q)
        if len(out) >= TARGET:
            break
    # if still short, generate more with different start
    guard = 0
    while len(out) < TARGET and guard < 8:
        guard += 1
        more_qs = gen(tid, TARGET - len(out), start=1000 * guard)
        for q in more_qs:
            if q["question_text"] in seen:
                continue
            seen.add(q["question_text"])
            out.append(q)
            if len(out) >= TARGET:
                break
    return out[:TARGET]


def main():
    el_path = ROOT / "src/data/questions/elementaryQuestions.js"
    ms_path = ROOT / "src/data/questions/middleSchoolQuestions.js"
    hs_path = ROOT / "src/data/questions/highSchoolQuestions.js"

    el = extract_js_array(el_path.read_text(encoding="utf-8"), "ELEMENTARY_QUESTIONS")
    ms = extract_js_array(ms_path.read_text(encoding="utf-8"), "MIDDLE_SCHOOL_QUESTIONS")
    hs = extract_js_array(hs_path.read_text(encoding="utf-8"), "QUESTIONS")

    by_topic = {}
    for q in el + ms + hs:
        by_topic.setdefault(q["topic_id"], []).append(q)

    new_by = {"elementary": [], "middle": [], "high": []}
    topics = topic_ids()
    uniq_ratios = []
    samples = {}

    for tid in topics:
        bank = bank_for(tid)
        qs = build_topic(tid, by_topic.get(tid, []))
        new_by[bank].extend(qs)
        texts = [q["question_text"] for q in qs]
        uniq_ratios.append(len(set(texts)) / max(1, len(texts)))
        if tid in ("g1-shapes", "g4-decimals-intro", "g8-pythagoras", "g10-u4-trig", "g12-u5-complex"):
            samples[tid] = qs[:2]

    write_bank(el_path, "ELEMENTARY_QUESTIONS", new_by["elementary"], "שאלות יסודי")
    write_bank(ms_path, "MIDDLE_SCHOOL_QUESTIONS", new_by["middle"], "שאלות חט\"ב")
    write_bank(hs_path, "QUESTIONS", new_by["high"], "שאלות חט\"ע")

    # counts
    from collections import Counter
    for name, qs in new_by.items():
        c = Counter(q["topic_id"] for q in qs)
        under = [t for t, n in c.items() if n < TARGET]
        print(name, "topics", len(c), "under20", len(under), "avg", sum(c.values())/len(c))
    print("avg unique ratio", sum(uniq_ratios)/len(uniq_ratios))
    for tid, qs in samples.items():
        print("SAMPLE", tid)
        for q in qs:
            print(" -", q["question_text"][:80], "|", q["options"][:2])


if __name__ == "__main__":
    main()
