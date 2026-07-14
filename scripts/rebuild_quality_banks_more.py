# -*- coding: utf-8 -*-
"""Extra generators + main() for rebuild_quality_banks."""
from __future__ import annotations

import json
import random
from pathlib import Path

# Re-import shared pieces by duplicating minimal deps from parent when run as module
# Parent imports: from rebuild_quality_banks_more import *
# So this module needs the helpers that parent defines - circular!
# Instead: parent should not import at import time. We'll fix parent to define all here.

import quality_common as R

ROOT = Path(__file__).resolve().parents[1]


def gen_measure(topic, n, start):
    items = [
        (1, "\u05db\u05de\u05d4 \u05e1\"\u05de \u05d1\u05de\u05d8\u05e8?", 100, [10, 1000, 50], "100."),
        (2, "\u05db\u05de\u05d4 \u05de\"\u05de \u05d1\u05e1\"\u05de?", 10, [100, 1, 1000], "10."),
        (2, "%s: 30 \u05e1\"\u05de \u05d0\u05d5 2 \u05de\u05d8\u05e8?" % R.H_BIG, "2 \u05de\u05d8\u05e8", ["30 \u05e1\"\u05de", R.H_EQ, "1 \u05de\u05d8\u05e8"], "200>30."),
        (3, "5 \u05de\u05d8\u05e8 = \u05db\u05de\u05d4 \u05e1\"\u05de?", 500, [50, 5, 5000], "500."),
        (2, "40 \u05e1\"\u05de = \u05db\u05de\u05d4 \u05de\u05d8\u05e8?", "$0.4$", ["$4$", "$40$", "$0.04$"], "0.4."),
        (3, "\u05d4\u05e4\u05e8\u05e9 12 \u05e1\"\u05de \u05d5-8 \u05e1\"\u05de:", "4 \u05e1\"\u05de", ["20", "96", "2"], "4."),
        (2, "\u05d9\u05d7\u05d9\u05d3\u05ea \u05d0\u05d5\u05e8\u05da:", "\u05e1\"\u05de/\u05de\u05d8\u05e8", ["\u05e7\"\u05d2", "\u05dc\u05d9\u05d8\u05e8", "\u05de\u05e2\u05dc\u05d4"], "len."),
        (1, "%s: 9 \u05e1\"\u05de \u05d0\u05d5 15 \u05e1\"\u05de?" % R.H_BIG, "15 \u05e1\"\u05de", ["9 \u05e1\"\u05de", R.H_EQ, "12"], "15."),
        (3, "2 \u05de + 30 \u05e1\"\u05de = \u05e1\"\u05de?", 230, [50, 2300, 32], "230."),
        (2, "1/2 \u05de\u05d8\u05e8 = \u05e1\"\u05de?", 50, [5, 500, 25], "50."),
        (3, "\u05e7\u05d5 7 \u05e1\"\u05de + 3 \u05e1\"\u05de:", "10 \u05e1\"\u05de", ["4", "21", "3"], "10."),
        (4, "1 \u05e7\"\u05de = \u05de\u05d8\u05e8?", 1000, [100, 10, 10000], "1000."),
        (2, "\u05d9\u05d7\u05d9\u05d3\u05ea \u05de\u05e9\u05e7\u05dc:", "\u05e7\"\u05d2", ["\u05e1\"\u05de", "\u05dc\u05d9\u05d8\u05e8", "\u05de\u05e2\u05dc\u05d4"], "kg."),
        (3, "\u05d4\u05d9\u05e7\u05e3 \u05e8\u05d9\u05d1\u05d5\u05e2 1\u05de\u05d7\u05d9 1\u05de:", "4 \u05de", ["1", "2", "100 \u05e1\"\u05de"], "4."),
        (2, "250 \u05de\"\u05de = \u05e1\"\u05de?", 25, [2.5, 250, 2500], "25."),
        (3, "%s: 80\u05e1\"\u05de \u05d0\u05d5 1\u05de?" % R.H_BIG, "1 \u05de", ["80 \u05e1\"\u05de", R.H_EQ, "0.8"], "100>80."),
        (1, "\u05e1\u05e8\u05d2\u05dc \u05de\u05d3\u05d9\u05d3:", "\u05d0\u05d5\u05e8\u05da", ["\u05e9\u05d8\u05d7", "\u05e0\u05e4\u05d7", "\u05de\u05e1\u05d4"], "len."),
        (4, "3.5 \u05de = \u05e1\"\u05de?", 350, [35, 3500, 3.5], "350."),
        (2, "\u05d4\u05ea\u05d7\u05dc\u05ea \u05de\u05d3\u05d9\u05d3\u05d4:", "$0$", ["$1$", "$-1$", "$100$"], "0."),
        (3, "\u05de\u05d4\u05e4\u05e8\u05e9 5\u05e1\"\u05de \u05dc-20\u05e1\"\u05de?", "15 \u05e1\"\u05de", ["25", "4", "100"], "15."),
    ]
    return R.pack(topic, start, items, n)


def gen_area(topic, n, start, vol=False):
    items = []
    for a in range(2, 12):
        for b in range(2, 10):
            items.append((2, "%s \u05de\u05dc\u05d1\u05df $%d\\times %d$:" % (R.H_AREA, a, b), a * b, R.near(a * b), "S=ab."))
            items.append((2, "%s \u05de\u05dc\u05d1\u05df $%d\\times %d$:" % (R.H_PER, a, b), 2 * (a + b), R.near(2 * (a + b)), "P."))
            items.append((2, "%s \u05e8\u05d9\u05d1\u05d5\u05e2 \u05e6\u05dc\u05e2 $%d$:" % (R.H_PER, a), 4 * a, R.near(4 * a), "4a."))
            items.append((3, "%s \u05e8\u05d9\u05d1\u05d5\u05e2 \u05e6\u05dc\u05e2 $%d$:" % (R.H_AREA, a), a * a, R.near(a * a), "a^2."))
            if vol:
                c = random.randint(2, 6)
                items.append((4, "\u05e0\u05e4\u05d7 \u05ea\u05d9\u05d1\u05d4 $%d\\times %d\\times %d$:" % (a, b, c), a * b * c, R.near(a * b * c), "V."))
    items.append((3, "%s \u05de\u05e9\u05d5\u05dc\u05e9 \u05d9\u05e9\u05e8-\u05d6\u05d5\u05d5\u05d9\u05ea \u05d1\u05e1\u05d9\u05e1 6 \u05d2\u05d5\u05d1\u05d4 4:" % R.H_AREA, 12, [10, 24, 8], "12."))
    return R.pack(topic, start, items, n)


def gen_stats(topic, n, start, prob=False):
    items = []
    for _ in range(50):
        vals = sorted(random.sample(range(2, 30), 5))
        if sum(vals) % 5 == 0:
            m = sum(vals) // 5
            items.append((2, "%s %s?" % (R.H_MEAN, ", ".join("$%d$" % v for v in vals)), m, R.near(m), "mean."))
        items.append((3, "\u05d7\u05e6\u05d9\u05d5\u05df \u05e9\u05dc %s?" % ", ".join("$%d$" % v for v in vals), vals[2], R.near(vals[2]), "median."))
    items += [
        (1, "\u05d0\u05d3\u05d5\u05de\u05d9\u05dd 4, \u05d1\u05e0\u05d5\u05ea 6. \u05e1\u05d4\"\u05db?", 10, [4, 6, 2], "10."),
        (2, "\u05e9\u05db\u05d9\u05d7 \u05d1-3,7,7,2:", 7, [3, 2, 19], "7."),
    ]
    if prob:
        items += [
            (3, "\u05e7\u05d5\u05d1\u05d9\u05d4: P(\u05e2\u05ea\u05e7)?", "$\\frac{1}{6}$", ["$\\frac{1}{2}$", "$1$", "$\\frac{1}{3}$"], "1/6."),
            (3, "\u05de\u05d8\u05d1\u05e2: P(\u05e2\u05e5)?", "$\\frac{1}{2}$", ["$\\frac{1}{3}$", "$1$", "$0$"], "1/2."),
            (4, "\u05e9\u05e7 3 \u05d0\u05d3\u05d5\u05de\u05d9\u05dd, 2 \u05d1\u05e0\u05d5\u05ea. P(\u05d1\u05ea)?", "$\\frac{2}{5}$", ["$\\frac{3}{5}$", "$\\frac{2}{3}$", "$1$"], "2/5."),
            (2, "\u05e1\u05db\u05d5\u05dd \u05db\u05dc \u05d4\u05d4\u05e1\u05ea\u05d1\u05e8\u05d5\u05d9\u05d5\u05ea:", "$1$", ["$0$", "$\\frac{1}{2}$", "$100$"], "1."),
            (4, "2 \u05e7\u05d5\u05d1\u05d9\u05d5\u05ea. P(\u05e9\u05e0\u05d9 \u05e2\u05ea\u05e7\u05d9\u05dd) \u05d1\"\u05ea?", "$\\frac{1}{36}$", ["$\\frac{1}{6}$", "$\\frac{1}{12}$", "$\\frac{2}{6}$"], "1/36."),
        ]
    return R.pack(topic, start, items, n)


def gen_percent(topic, n, start, ratio=False, prob=False):
    items = []
    for pct, whole in [(10, 80), (25, 40), (50, 60), (20, 150), (5, 200), (15, 80), (30, 90), (40, 50), (75, 80), (12, 100), (60, 50), (8, 50)]:
        ans = whole * pct // 100
        items.append((3, "%s $%d\\%%$ \u05de-$%d$?" % (R.H_WHAT, pct, whole), ans, R.near(ans), "pct."))
    items += [
        (2, "%s $50\\%%$ \u05de-$40$?" % R.H_WHAT, 20, [10, 25, 30], "20."),
        (3, "20 \u05de\u05ea\u05d5\u05da 100 \u05d1\u05d0%:", "$20\\%$", ["$2\\%$", "$25\\%$", "$80\\%$"], "20%."),
        (4, "\u05de\u05d7\u05d9\u05e8 80, \u05d4\u05e0\u05d7\u05d4 25%. \u05de\u05d7\u05d9\u05e8 \u05d7\u05d3\u05e9?", 60, [20, 75, 55], "60."),
        (4, "\u05e8\u05d9\u05d1\u05d9\u05ea 5% \u05e2\u05dc 200:", 10, [5, 15, 20], "10."),
        (2, "1/4 \u05d1\u05d0%:", "$25\\%$", ["$10\\%$", "$40\\%$", "$4\\%$"], "25%."),
    ]
    if ratio:
        items += [
            (2, "\u05d9\u05d7\u05e1 2:4 \u05e4\u05e9\u05d5\u05d8:", "$1:2$", ["$2:8$", "$4:2$", "$1:4$"], "1:2."),
            (3, "\u05d1\u05d9\u05d7\u05e1 3:5, \u05d7\u05dc\u05e7 1 \u05de\u05ea\u05d5\u05da 8:", 3, [5, 8, 2], "3."),
            (3, "\u05d9\u05d7\u05e1 1:10. \u05db\u05de\u05d4 \u05e9\u05e7\u05dc\u05d9\u05dd \u05dc-3 \u05e9\u05e7\u05dc?", 30, [10, 13, 7], "30."),
            (4, "\u05d2\u05d3\u05dc 20% \u05dc-120. \u05de\u05e7\u05d5\u05e8\u05d9?", 100, [96, 140, 80], "100."),
        ]
        for a, b, s in [(2, 3, 4), (1, 4, 5), (3, 2, 6), (5, 1, 3)]:
            items.append((3, "\u05d9\u05d7\u05e1 $%d:%d$ \u05db\u05e4\u05d5\u05dc %d:" % (a, b, s), "$%d:%d$" % (a * s, b * s), ["$%d:%d$" % (a + s, b), "$%d:%d$" % (a, b * s), "$%d:%d$" % (s, s)], "scale."))
    if prob:
        items += [
            (3, "P(\u05e2\u05ea\u05e7 \u05d1\u05e7\u05d5\u05d1\u05d9\u05d4)?", "$\\frac{1}{6}$", ["$\\frac{1}{2}$", "$1$", "0"], "1/6."),
            (3, "P(\u05e2\u05e5 \u05d1\u05de\u05d8\u05d1\u05e2)?", "$\\frac{1}{2}$", ["$1$", "$0$", "$\\frac{1}{3}$"], "1/2."),
        ]
    return R.pack(topic, start, items, n)


def gen_number_sets(topic, n, start):
    items = [
        (2, "\u05de\u05e1\u05e4\u05e8 \u05e9\u05dc\u05dd:", "$-3$", ["$\\sqrt{2}$", "$\\pi$", "$0.101001...$"], "Z."),
        (2, "\u05e8\u05e6\u05d9\u05d5\u05e0\u05dc\u05d9:", "$\\frac{2}{3}$", ["$\\sqrt{2}$", "$\\pi$", "$\\sqrt{3}$"], "Q."),
        (3, "\u05d0\u05d9\u05e8\u05e6\u05d9\u05d5\u05e0\u05dc\u05d9:", "$\\sqrt{2}$", ["$0.5$", "$-4$", "$\\frac{7}{2}$"], "irr."),
        (1, "0 \u05e9\u05d9\u05d9\u05da \u05dc:", "\u05e9\u05dc\u05de\u05d9\u05dd", ["\u05e8\u05e7 \u05d8\u05d1\u05e2\u05d9\u05d9\u05dd \u05d7\u05d9\u05d5\u05d1\u05d9\u05d9\u05dd", "\u05e8\u05e7 \u05d0\u05d9\u05e8\u05e6.", "\u05dc\u05d0 \u05e9\u05d9\u05d9\u05da"], "Z."),
        (2, "\u05db\u05dc \u05e9\u05dc\u05dd \u05d4\u05d5\u05d0 \u05d2\u05dd:", "\u05e8\u05e6\u05d9\u05d5\u05e0\u05dc\u05d9", ["\u05d0\u05d9\u05e8\u05e6.", "\u05de\u05e8\u05db\u05d1", "\u05e8\u05e7 \u05d7\u05d9\u05d5\u05d1\u05d9"], "Z in Q."),
        (3, "\u05d8\u05d1\u05e2\u05d9 \u05d7\u05d9\u05d5\u05d1\u05d9:", "$7$", ["$-2$", "$0.5$", "$-3/4$"], "N."),
        (2, "-6/3 =", "$-2$", ["$2$", "$-6$", "$3$"], "-2."),
        (4, "%s: -2 \u05d0\u05d5 -5?" % R.H_BIG, "$-2$", ["$-5$", R.H_EQ, "$0$"], "-2."),
        (3, "pi \u05d4\u05d5\u05d0:", "\u05d0\u05d9\u05e8\u05e6\u05d9\u05d5\u05e0\u05dc\u05d9", ["\u05e8\u05e6\u05d9\u05d5\u05e0\u05dc\u05d9", "\u05e9\u05dc\u05dd", "\u05de\u05e8\u05db\u05d1"], "irr."),
        (2, "\u05e9\u05d9\u05d9\u05da \u05dc-N?", "$5$", ["$0$", "$-1$", "$1/2$"], "5."),
        (3, "-4/2 \u05e9\u05d9\u05d9\u05da \u05dc:", "Z \u05d5-Q", ["\u05e8\u05e7 \u05d0\u05d9\u05e8\u05e6.", "\u05e8\u05e7 N", "\u05d0\u05e3"], "Z."),
        (1, "\u05d4\u05e7\u05d1\u05d5\u05e6\u05d4 \u05d4\u05e8\u05d7\u05d1\u05d4:", "R", ["Z", "Q", "N"], "R."),
        (4, "\u05dc\u05d0 \u05e9\u05dc\u05dd:", "$0.5$", ["$-3$", "$0$", "$10$"], "0.5."),
        (2, "sqrt(9)=", "$3$", ["$\\sqrt{3}$", "$-3$", "$9$"], "3."),
        (3, "\u05de\u05e8\u05db\u05d1:", "$a+bi$", ["$a/b$", "$\\sqrt{a}$", "$a^b$"], "complex."),
        (2, "-7+7=", "$0$", ["$-14$", "$14$", "$-1$"], "0."),
        (4, "22/7 \u05d4\u05d5\u05d0:", "\u05e8\u05e6\u05d9\u05d5\u05e0\u05dc\u05d9", ["\u05d0\u05d9\u05e8\u05e6. \u05d1\u05d3\u05d9\u05d5\u05e7", "\u05e9\u05dc\u05dd \u05e9\u05dc\u05d9\u05dc\u05d9", "\u05de\u05e8\u05db\u05d1"], "Q."),
        (1, "1 \u05d4\u05d5\u05d0:", "N,Z,Q", ["\u05e8\u05e7 \u05d0\u05d9\u05e8\u05e6.", "\u05de\u05e8\u05db\u05d1", "\u05dc\u05d0"], "all."),
        (3, "\u05e0\u05db\u05d5\u05df:", "$-4+4=0$", ["$2+2=5$", "$\\sqrt{2}\\in Q$", "$\\pi=22/7$ exact"], "true."),
        (2, "Z =", "$\\{\\ldots,-1,0,1,\\ldots\\}$", ["$\\{1,2,3\\ldots\\}$", "$\\{0,1,2\\ldots\\}$", "$R$"], "Z."),
    ]
    return R.pack(topic, start, items, n)


def gen_signed(topic, n, start):
    items = []
    for a in range(-9, 10):
        for b in range(-9, 10):
            if a == 0 and b == 0:
                continue
            items.append((2, "%s $(%+d)+(%+d)$?" % (R.H_WHAT, a, b), a + b, R.near(a + b), "sum."))
            items.append((3, "%s $(%+d)-(%+d)$?" % (R.H_WHAT, a, b), a - b, R.near(a - b), "sub."))
            if abs(a * b) <= 40:
                items.append((3, "%s $(%+d)\\times(%+d)$?" % (R.H_WHAT, a, b), a * b, R.near(a * b), "mul."))
    items += [
        (2, "%s: $-3$ \u05d0\u05d5 $-8$?" % R.H_BIG, "$-3$", ["$-8$", R.H_EQ, "$0$"], "-3."),
        (1, "-$5$ + $5$ =", 0, [-10, 10, 1], "0."),
    ]
    return R.pack(topic, start, items, n)


def gen_order_powers(topic, n, start):
    items = []
    for a, b, c in [(2, 3, 4), (1, 5, 2), (3, 2, 5), (4, 3, 2), (5, 2, 3), (2, 4, 3), (6, 2, 4), (1, 8, 3), (7, 2, 2), (3, 4, 2), (2, 5, 3), (4, 2, 6)]:
        items.append((3, "%s $%d+%d\\times %d$?" % (R.H_WHAT, a, b, c), a + b * c, R.near(a + b * c), "PEMDAS."))
        items.append((3, "%s $(%d+%d)\\times %d$?" % (R.H_WHAT, a, b, c), (a + b) * c, R.near((a + b) * c), "paren."))
    for b in range(2, 10):
        items.append((2, "%s $%d^2$?" % (R.H_WHAT, b), b * b, R.near(b * b), "sq."))
        items.append((3, "%s $%d^3$?" % (R.H_WHAT, b), b ** 3, R.near(b ** 3), "cube."))
    items += [
        (4, "%s $2^3\\times 2^2$?" % R.H_WHAT, 32, [16, 64, 10], "2^5=32."),
        (3, "%s $10^3$?" % R.H_WHAT, 1000, [100, 30, 10000], "1000."),
    ]
    return R.pack(topic, start, items, n)


def gen_algebra_expr(topic, n, start):
    items = []
    for a, b in [(2, 3), (3, 5), (4, 2), (5, 7), (6, 1), (2, 8), (7, 3), (4, 4), (3, 9), (5, 2)]:
        items.append((2, "%s $%dx+%dx$?" % (R.H_WHAT, a, b), "$%dx$" % (a + b), ["$%dx$" % (a * b), "$%d$" % (a + b), "$%dx^2$" % (a + b)], "combine."))
        items.append((3, "%s $%d(x+%d)$?" % (R.H_WHAT, a, b), "$%dx+%d$" % (a, a * b), ["$%dx+%d$" % (a, b), "$x+%d$" % (a * b), "$%dx$" % a], "distrib."))
        items.append((2, "\u05e2\u05e8\u05da $x=%d$ \u05d1-$%dx+%d$:" % (b, a, a), a * b + a, R.near(a * b + a), "eval."))
    for a in range(2, 9):
        items.append((3, "%s $%dx-%dx$?" % (R.H_WHAT, a + 2, a), "$2x$", ["$0$", "$%dx$" % (2 * a + 2), "$x$"], "2x."))
    return R.pack(topic, start, items, n)


def gen_equations(topic, n, start):
    items = []
    for a in range(2, 12):
        for k in range(2, 10):
            b = a * k
            items.append((2, "%s $%dx=%d$. $x$?" % (R.H_SOLVE, a, b), k, R.near(k), "x=b/a."))
            items.append((3, "%s $x+%d=%d$. $x$?" % (R.H_SOLVE, a, b), b - a, R.near(b - a), "sub."))
            items.append((3, "%s $%dx+%d=%d$. $x$?" % (R.H_SOLVE, a, a, b + a), k, R.near(k), "linear."))
    items.append((4, "%s $2x-4=10$. $x$?" % R.H_SOLVE, 7, [3, 5, 14], "7."))
    return R.pack(topic, start, items, n)


def gen_system(topic, n, start):
    items = []
    for x in range(1, 6):
        for y in range(1, 6):
            items.append((3, "\u05de\u05e2\u05e8\u05db\u05ea: $x+y=%d$, $x-y=%d$. $x$?" % (x + y, x - y), x, R.near(x), "x."))
            items.append((3, "\u05de\u05e2\u05e8\u05db\u05ea: $x+y=%d$, $x-y=%d$. $y$?" % (x + y, x - y), y, R.near(y), "y."))
            items.append((4, "$2x+y=%d$, $x+y=%d$. $x$?" % (2 * x + y, x + y), x, R.near(x), "sub."))
    return R.pack(topic, start, items, n)


def gen_factor(topic, n, start):
    items = []
    for a in range(2, 10):
        for b in range(2, 8):
            items.append((3, "%s $%dx+%d$ \u05d2\u05d5\u05e8\u05dd \u05de\u05e9\u05d5\u05ea\u05e3:" % (R.H_WHAT, a * b, a), "$%d(%dx+1)$" % (a, b) if False else "$%d(%dx+1)$" % (a, b), ["$%dx(%d)$" % (a, b), "$%d+%d$" % (a * b, a), "$x+%d$" % a], "factor."))
            # fix: %d(%dx+1) 
    # rewrite cleanly
    items = []
    for a, b in [(2, 3), (3, 4), (4, 5), (5, 2), (6, 3), (2, 7), (3, 5), (4, 2), (5, 6), (2, 8), (3, 7), (4, 6)]:
        items.append((3, "\u05e4\u05e8\u05e7 \u05d2\u05d5\u05e8\u05dd: $%dx+%d$" % (a * b, a), "$%d(%dx+1)$" % (a, b), ["$%dx+%d$" % (a, b), "$%d(x+%d)$" % (a * b, a), "$x(%d+%d)$" % (a, b)], "a(bx? no) a(bx/a + 1)."))
        items.append((2, "\u05e4\u05ea\u05d7: $%d(x+%d)$" % (a, b), "$%dx+%d$" % (a, a * b), ["$%dx+%d$" % (a, b), "$x+%d$" % (a * b), "$%dx$" % a], "expand."))
        items.append((4, "\u05e4\u05e8\u05e7: $x^2-%d$" % (b * b), "$(x-%d)(x+%d)$" % (b, b), ["$(x-%d)^2$" % b, "$x-%d$" % (b * b), "$(x+%d)^2$" % b], "diff sq."))
        items.append((3, "\u05e4\u05ea\u05d7: $(x+%d)^2$" % b, "$x^2+%dx+%d$" % (2 * b, b * b), ["$x^2+%d$" % (b * b), "$x^2+%dx$" % (2 * b), "$x^2-%d$" % (b * b)], "perfect."))
    return R.pack(topic, start, items, n)


def gen_linear_fn(topic, n, start):
    items = []
    for m in range(1, 8):
        for b in range(-5, 6):
            sign = "+%d" % b if b >= 0 else "%d" % b
            items.append((2, "\u05e9\u05d9\u05e4\u05d5\u05e2 $y=%dx%s$:" % (m, sign), m, R.near(m), "slope."))
            items.append((2, "\u05d7\u05d9\u05ea\u05d5\u05da $y$ \u05e9\u05dc $y=%dx%s$:" % (m, sign), b, R.near(b), "intercept."))
            items.append((3, "$f(x)=%dx%s$. $f(2)$?" % (m, sign), m * 2 + b, R.near(m * 2 + b), "eval."))
    items.append((4, "\u05d9\u05e9\u05e8 \u05d3\u05e8\u05da (1,2) \u05d5-(3,6). \u05e9\u05d9\u05e4\u05d5\u05e2?", 2, [1, 3, 4], "2."))
    return R.pack(topic, start, items, n)


def gen_functions(topic, n, start):
    items = []
    for a in range(1, 6):
        items.append((2, "$f(x)=x^2$. $f(%d)$?" % a, a * a, R.near(a * a), "sq."))
        items.append((3, "$f(x)=2x+1$. $f(%d)$?" % a, 2 * a + 1, R.near(2 * a + 1), "lin."))
        items.append((3, "$f(x)=%d^x$. $f(2)$?" % a, a ** 2, R.near(a ** 2), "exp."))
        items.append((4, "\u05ea\u05d7\u05d5\u05dd \u05d4\u05d2\u05d3\u05e8\u05d4 $f(x)=1/(x-%d)$ \u05dc\u05dc\u05d0:" % a, "$x\\neq %d$" % a, ["$x\\neq 0$", "$x>%d$" % a, "\u05d4\u05db\u05dc"], "domain."))
    items += [
        (2, "\u05d0\u05dd $f(x)=x+3$ \u05d0\u05d6 $f(0)$=", 3, [0, 1, -3], "3."),
        (4, "$(f\\circ g)(x)=f(g(x))$. \u05d0\u05dd $g(x)=x+1$, $f(x)=2x$ \u05d0\u05d6 $(f\\circ g)(3)$=", 8, [7, 6, 4], "8."),
    ]
    return R.pack(topic, start, items, n)


def gen_quadratic(topic, n, start):
    items = []
    for a in range(1, 6):
        for b in range(1, 6):
            items.append((3, "%s $x^2=%d$. $x$ (\u05d7\u05d9\u05d5\u05d1\u05d9)?" % (R.H_SOLVE, a * a), a, R.near(a), "sqrt."))
            items.append((4, "%s $(x-%d)(x-%d)=0$. \u05e1\u05db\u05d5\u05dd \u05e9\u05e8\u05e9\u05d9\u05dd?" % (R.H_SOLVE, a, b), a + b, R.near(a + b), "sum roots."))
            items.append((4, "%s $(x-%d)(x-%d)=0$. \u05de\u05db\u05e4\u05dc\u05ea \u05e9\u05e8\u05e9\u05d9\u05dd?" % (R.H_SOLVE, a, b), a * b, R.near(a * b), "prod."))
            items.append((3, "\u05e7\u05d5\u05d3\u05e7\u05d5\u05d3 \u05e7\u05e6\u05e0\u05d4 $y=(x-%d)^2+%d$: x=" % (a, b), a, R.near(a), "vertex x."))
    items.append((2, "%s $x^2-9=0$. \u05e9\u05e8\u05e9 \u05d7\u05d9\u05d5\u05d1\u05d9?" % R.H_SOLVE, 3, [9, 0, -3], "3."))
    return R.pack(topic, start, items, n)


def gen_inequality(topic, n, start):
    items = []
    for a in range(2, 10):
        items.append((2, "%s $x+%d>10$. \u05d3\u05d5\u05d2\u05de\u05d4:" % (R.H_SOLVE, a), "$x>%d$" % (10 - a), ["$x<%d$" % (10 - a), "$x=%d$" % (10 - a), "$x>%d$" % (10 + a)], "ineq."))
        items.append((3, "%s $%dx\\leq %d$:" % (R.H_SOLVE, a, a * 3), "$x\\leq 3$", ["$x\\geq 3$", "$x<3$", "$x>3$"], "leq."))
        items.append((3, "%s $-x> %d$:" % (R.H_SOLVE, a), "$x<-%d$" % a, ["$x>-%d$" % a, "$x>%d$" % a, "$x<-%d$" % (-a)], "flip."))
    return R.pack(topic, start, items, n)


def gen_coordinates(topic, n, start):
    items = [
        (1, "\u05e0\u05e7\u05d5\u05d3\u05d4 (3,-2) \u05d1\u05e8\u05d1\u05d9\u05e2:", "IV", ["I", "II", "III"], "IV."),
        (1, "(-3,2) \u05d1\u05e8\u05d1\u05d9\u05e2:", "II", ["I", "III", "IV"], "II."),
        (2, "(-1,-4) \u05d1\u05e8\u05d1\u05d9\u05e2:", "III", ["I", "II", "IV"], "III."),
        (2, "(5,1) \u05d1\u05e8\u05d1\u05d9\u05e2:", "I", ["II", "III", "IV"], "I."),
        (3, "\u05d0\u05de\u05e6\u05e2 (2,4) \u05d5-(6,4). \u05de\u05e8\u05d7\u05e7?", 4, [2, 8, 0], "4."),
        (3, "\u05d0\u05de\u05e6\u05e2 (1,1) \u05d5-(1,5). \u05de\u05e8\u05d7\u05e7?", 4, [1, 5, 0], "4."),
        (4, "\u05de\u05e8\u05d7\u05e7 (0,0) \u05dc-(3,4)?", 5, [7, 12, 1], "5."),
        (3, "\u05d0\u05de\u05e6\u05e2 \u05d0\u05de\u05e6\u05e2 (2,2),(6,6):", "$(4,4)$", ["$(2,6)$", "$(8,8)$", "$(0,0)$"], "mid."),
        (2, "\u05e6\u05d9\u05e8 X \u05d4\u05d5\u05d0:", "\u05d0\u05d5\u05e4\u05e7\u05d9", ["\u05d0\u05e0\u05db\u05d9", "\u05d0\u05dc\u05db\u05e1\u05d5\u05df", "\u05e8\u05d3\u05d9\u05d5\u05e1"], "x."),
        (2, "\u05e0\u05e7\u05d5\u05d3\u05ea \u05d4\u05e8\u05d0\u05e9\u05d9\u05ea:", "$(0,0)$", ["$(1,1)$", "$(1,0)$", "$(0,1)$"], "origin."),
    ]
    for x in range(-3, 4):
        for y in range(-3, 4):
            if x == 0 or y == 0:
                continue
            q = "I" if x > 0 and y > 0 else "II" if x < 0 and y > 0 else "III" if x < 0 and y < 0 else "IV"
            items.append((2, "(%d,%d) \u05e8\u05d1\u05d9\u05e2?" % (x, y), q, [z for z in ["I", "II", "III", "IV"] if z != q], "q."))
    return R.pack(topic, start, items, n)


def gen_angles(topic, n, start):
    items = [
        (2, "\u05e1\u05db\u05d5\u05dd \u05d6\u05d5\u05d5\u05d9\u05d5\u05ea \u05de\u05e9\u05d5\u05dc\u05e9:", "$180^\\circ$", ["$90^\\circ$", "$360^\\circ$", "$100^\\circ$"], "180."),
        (2, "\u05d6\u05d5\u05d5\u05d9\u05ea \u05d9\u05e9\u05e8\u05d4:", "$90^\\circ$", ["$45^\\circ$", "$180^\\circ$", "$60^\\circ$"], "90."),
        (3, "\u05d6\u05d5\u05d5\u05d9\u05d5\u05ea \u05e1\u05de\u05d5\u05db\u05d5\u05ea \u05e2\u05dc \u05d9\u05e9\u05e8:", "$180^\\circ$", ["$90^\\circ$", "$360^\\circ$", "$0$"], "180."),
        (3, "\u05d1\u05de\u05e9\u05d5\u05dc\u05e9: 50, 60, ?:", "$70^\\circ$", ["$80^\\circ$", "$90^\\circ$", "$40^\\circ$"], "70."),
        (2, "\u05d6\u05d5\u05d5\u05d9\u05ea \u05e7\u05d4\u05d4:", "$>90^\\circ$", ["$<90$", "$=90$", "$=180$"], "obtuse."),
        (2, "\u05d6\u05d5\u05d5\u05d9\u05ea \u05d7\u05d3\u05d4:", "$<90^\\circ$", [">90", "=90", "=180"], "acute."),
        (4, "\u05d1\u05de\u05e9\u05d5\u05dc\u05e9 \u05e9\u05d5\u05d5\u05d4-\u05e6\u05dc\u05e2\u05d5\u05ea \u05db\u05dc \u05d6\u05d5\u05d5\u05d9\u05ea:", "$60^\\circ$", ["$90$", "$45$", "$120$"], "60."),
        (3, "\u05e1\u05db\u05d5\u05dd \u05d6\u05d5\u05d5\u05d9\u05d5\u05ea \u05e1\u05d1\u05d9\u05d1 \u05e0\u05e7\u05d5\u05d3\u05d4:", "$360^\\circ$", ["$180$", "$90$", "$270$"], "360."),
        (3, "\u05d6\u05d5\u05d5\u05d9\u05d5\u05ea \u05e0\u05d2\u05d3\u05d9\u05d5\u05ea \u05e2\u05dc \u05d9\u05e9\u05e8\u05d9\u05dd \u05de\u05e7\u05d1\u05d9\u05dc\u05d9\u05dd:", "\u05e9\u05d5\u05d5\u05d5\u05ea", ["\u05de\u05e9\u05dc\u05d9\u05de\u05d5\u05ea", "90", "180"], "equal."),
        (4, "\u05d1\u05de\u05e9\u05d5\u05dc\u05e9: 90, 30, ?:", "$60^\\circ$", ["$45$", "$70$", "$120$"], "60."),
    ]
    for a, b in [(40, 60), (30, 70), (45, 45), (20, 80), (35, 55), (25, 65), (15, 75), (50, 50)]:
        items.append((3, "\u05d6\u05d5\u05d5\u05d9\u05d5\u05ea %d,%d,?" % (a, b), "$%d^\\circ$" % (180 - a - b), ["$%d^\\circ$" % (a + b), "$90^\\circ$", "$%d^\\circ$" % a], "sum."))
    return R.pack(topic, start, items, n)


def gen_congruence(topic, n, start):
    items = [
        (2, "SSS \u05e4\u05e8\u05d5\u05e9\u05d5:", "3 \u05e6\u05dc\u05e2\u05d5\u05ea", ["3 \u05d6\u05d5\u05d5\u05d9\u05d5\u05ea", "\u05e6\u05dc\u05e2-\u05d6\u05d5\u05d5\u05d9\u05ea-\u05e6\u05dc\u05e2", "\u05d4\u05d9\u05e7\u05e3"], "SSS."),
        (2, "SAS:", "\u05e6\u05dc\u05e2-\u05d6\u05d5\u05d5\u05d9\u05ea-\u05e6\u05dc\u05e2", ["SSS", "AAA", "SSA"], "SAS."),
        (2, "ASA:", "\u05d6\u05d5\u05d5\u05d9\u05ea-\u05e6\u05dc\u05e2-\u05d6\u05d5\u05d5\u05d9\u05ea", ["SAS", "SSS", "HL"], "ASA."),
        (3, "\u05de\u05e9\u05d5\u05dc\u05e9\u05d9\u05dd \u05d7\u05d5\u05e4\u05e4\u05d9\u05dd:", "\u05e9\u05d5\u05d5\u05d5\u05d9 \u05e6\u05d5\u05e8\u05d4 \u05d5\u05d2\u05d5\u05d3\u05dc", ["\u05e8\u05e7 \u05d6\u05d5\u05d5\u05d9\u05d5\u05ea", "\u05e8\u05e7 \u05e9\u05d8\u05d7", "\u05d3\u05d5\u05de\u05d4"], "cong."),
        (3, "AAA \u05dc\u05d7\u05d5\u05d3:", "\u05dc\u05d0 \u05de\u05e1\u05e4\u05d9\u05e7 (\u05d3\u05de\u05d9\u05d5\u05df)", ["SSS", "\u05ea\u05de\u05d9\u05d3 \u05d7\u05d5\u05e4\u05e3", "SAS"], "similar not cong."),
        (2, "HL \u05e2\u05d1\u05d5\u05e8:", "\u05de\u05e9\u05d5\u05dc\u05e9\u05d9\u05dd \u05d9\u05e9\u05e8\u05d9-\u05d6\u05d5\u05d5\u05d9\u05ea", ["\u05db\u05dc \u05de\u05e9\u05d5\u05dc\u05e9", "\u05e8\u05d9\u05d1\u05d5\u05e2", "\u05e2\u05d9\u05d2\u05d5\u05dc"], "HL."),
        (4, "\u05d0\u05dd \u05db\u05dc \u05d4\u05e6\u05dc\u05e2\u05d5\u05ea \u05e9\u05d5\u05d5\u05d5\u05ea \u05d1\u05d6\u05d5\u05d2\u05d5\u05ea:", "\u05d7\u05d5\u05e4\u05e4\u05d9\u05dd (SSS)", ["\u05e8\u05e7 \u05d3\u05d5\u05de\u05d9\u05dd", "\u05dc\u05d0 \u05e7\u05e9\u05d5\u05e8", "\u05e9\u05d8\u05d7 \u05e9\u05d5\u05e0\u05d4"], "SSS."),
        (3, "\u05d1\u05d7\u05d5\u05e4\u05e4\u05d5\u05ea, \u05d6\u05d5\u05d5\u05d9\u05d5\u05ea \u05de\u05ea\u05d0\u05d9\u05de\u05d5\u05ea:", "\u05e9\u05d5\u05d5\u05d5\u05ea", ["\u05db\u05e4\u05d5\u05dc\u05d5\u05ea", "\u05de\u05e9\u05dc\u05d9\u05de\u05d5\u05ea", "90"], "eq."),
    ]
    for i in range(12):
        items.append((2 + i % 2, "\u05e7\u05e8\u05d9\u05d8\u05e8\u05d9\u05d5\u05df \u05d7\u05d5\u05e4\u05e4\u05d5\u05ea #%d: \u05d0\u05d9\u05d6\u05d4 \u05de\u05e1\u05e4\u05d9\u05e7?" % (i + 1), ["SSS", "SAS", "ASA", "AAA"][i % 3], [["SSS", "SAS", "ASA", "AAA"][j] for j in range(4) if j != i % 3], "crit."))
    return R.pack(topic, start, items, n)


def gen_similarity(topic, n, start):
    items = [
        (2, "\u05d3\u05de\u05d9\u05d5\u05df: \u05d6\u05d5\u05d5\u05d9\u05d5\u05ea:", "\u05e9\u05d5\u05d5\u05d5\u05ea", ["\u05e6\u05dc\u05e2\u05d5\u05ea \u05e9\u05d5\u05d5\u05d5\u05ea", "\u05e9\u05d8\u05d7 \u05e9\u05d5\u05d5\u05d4", "SSS"], "angles."),
        (3, "\u05d9\u05d7\u05e1 \u05d3\u05de\u05d9\u05d5\u05df 2:1. \u05e6\u05dc\u05e2 6 \u05de\u05ea\u05d0\u05d9\u05de\u05d4 \u05dc:", 3, [2, 12, 4], "3."),
        (3, "\u05d9\u05d7\u05e1 3:1. \u05e9\u05d8\u05d7\u05d9\u05dd \u05d1\u05d9\u05d7\u05e1:", "$9:1$", ["$3:1$", "$6:1$", "$1:3$"], "k^2."),
        (2, "AAA \u05de\u05e1\u05e4\u05d9\u05e7 \u05dc:", "\u05d3\u05de\u05d9\u05d5\u05df", ["\u05d7\u05d5\u05e4\u05e4\u05d5\u05ea", "\u05e9\u05d5\u05d5\u05d9\u05d5\u05df", "\u05de\u05e2\u05d2\u05dc"], "sim."),
        (4, "\u05e6\u05dc\u05e2\u05d5\u05ea 4,6,8 \u05d5-6,9,12. \u05d3\u05d5\u05de\u05d9\u05dd?", "\u05db\u05df (k=1.5)", ["\u05dc\u05d0", "\u05e8\u05e7 \u05d7\u05d5\u05e4\u05e4\u05d9\u05dd", "k=2"], "yes."),
    ]
    for k in [2, 3, 4, 5]:
        items.append((3, "k=%d, \u05e6\u05dc\u05e2 5 \u05d1\u05e7\u05d8\u05df -> \u05d1\u05d2\u05d3\u05d5\u05dc:" % k, 5 * k, R.near(5 * k), "scale."))
        items.append((4, "k=%d, \u05e9\u05d8\u05d7 \u05e7\u05d8\u05df 10 -> \u05d2\u05d3\u05d5\u05dc:" % k, 10 * k * k, R.near(10 * k * k), "area."))
    return R.pack(topic, start, items, n)


def gen_pythagoras(topic, n, start):
    triples = [(3, 4, 5), (5, 12, 13), (6, 8, 10), (7, 24, 25), (8, 15, 17), (9, 12, 15), (9, 40, 41), (20, 21, 29)]
    items = []
    for a, b, c in triples:
        items.append((3, "\u05de\u05e9\u05d5\u05dc\u05e9 \u05d9\u05e9\u05e8: a=%d,b=%d. \u05d9\u05ea\u05e8?" % (a, b), c, R.near(c), "c."))
        items.append((3, "\u05d9\u05ea\u05e8 %d, \u05e0\u05d9\u05e6\u05d1 %d. \u05e0\u05d9\u05e6\u05d1 \u05e9\u05e0\u05d9?" % (c, a), b, R.near(b), "b."))
        items.append((2, "%d^2+%d^2=?" % (a, b), c * c, R.near(c * c), "c2."))
    items += [
        (2, "\u05de\u05e9\u05e4\u05d8 \u05e4\u05d9\u05ea\u05d2\u05d5\u05e8\u05e1:", "$a^2+b^2=c^2$", ["$a+b=c$", "$a^2-b^2=c$", "$ab=c$"], "thm."),
        (4, "\u05d4\u05d0\u05dd 2,3,4 \u05de\u05e9\u05d5\u05dc\u05e9 \u05d9\u05e9\u05e8?", "\u05dc\u05d0", ["\u05db\u05df", "\u05e8\u05e7 \u05d0\u05dd c=5", "\u05ea\u05de\u05d9\u05d3"], "no."),
    ]
    return R.pack(topic, start, items, n)


def gen_circle(topic, n, start):
    items = []
    for r in range(1, 11):
        items.append((2, "\u05e8\u05d3\u05d9\u05d5\u05e1 %d. \u05e7\u05d5\u05d8\u05e8?" % r, 2 * r, R.near(2 * r), "d."))
        items.append((3, "\u05d4\u05d9\u05e7\u05e3 \u05e2\u05d9\u05d2\u05d5\u05dc r=%d (\\pi):" % r, "$%d\\pi$" % (2 * r), ["$%d\\pi$" % r, "$%d\\pi$" % (r * r), "$\\pi$"], "2pi r."))
        items.append((3, "\u05e9\u05d8\u05d7 \u05e2\u05d9\u05d2\u05d5\u05dc r=%d:" % r, "$%d\\pi$" % (r * r), ["$%d\\pi$" % (2 * r), "$%d$" % (r * r), "$2\\pi$"], "pi r2."))
    items += [
        (2, "\u05db\u05dc \u05d4\u05e8\u05d3\u05d9\u05d5\u05e1\u05d9\u05dd \u05d1\u05e2\u05d9\u05d2\u05d5\u05dc:", "\u05e9\u05d5\u05d5\u05d9\u05dd", ["\u05e9\u05d5\u05e0\u05d9\u05dd", "\u05de\u05e7\u05d1\u05d9\u05dc\u05d9\u05dd", "\u05e0\u05d2\u05d3\u05d9\u05dd"], "eq."),
        (4, "\u05d6\u05d5\u05d5\u05d9\u05ea \u05de\u05e8\u05db\u05d6\u05d9\u05ea =", "\u05e4\u05e2\u05de\u05d9\u05d9\u05dd \u05d4\u05e7\u05e9\u05ea \u05d4\u05d4\u05d9\u05e7\u05e4\u05d9\u05ea", ["\u05e9\u05d5\u05d5\u05d4 \u05dc\u05d4\u05d9\u05e7\u05e3", "90", "180"], "central."),
    ]
    return R.pack(topic, start, items, n)


def gen_trig(topic, n, start):
    items = [
        (2, "$\\sin 30^\\circ$=", "$\\frac{1}{2}$", ["$\\frac{\\sqrt{3}}{2}$", "$1$", "$0$"], "1/2."),
        (2, "$\\cos 60^\\circ$=", "$\\frac{1}{2}$", ["$\\frac{\\sqrt{3}}{2}$", "$1$", "$0$"], "1/2."),
        (2, "$\\tan 45^\\circ$=", "$1$", ["$0$", "$\\sqrt{3}$", "$\\frac{1}{2}$"], "1."),
        (3, "$\\sin 90^\\circ$=", "$1$", ["$0$", "$\\frac{1}{2}$", "$-1$"], "1."),
        (3, "$\\cos 0^\\circ$=", "$1$", ["$0$", "$\\frac{1}{2}$", "$-1$"], "1."),
        (3, "$\\sin^2 x+\\cos^2 x$=", "$1$", ["$0$", "$\\sin 2x$", "$x$"], "id."),
        (4, "\u05d1\u05de\u05e9\u05d5\u05dc\u05e9 30-60-90, \u05de\u05d5\u05dc \u05d4-30 \u05d0\u05dd \u05d9\u05ea\u05e8=2:", 1, [2, 3, "$\\sqrt{3}$"], "1."),
        (4, "\u05d1\u05de\u05e9\u05d5\u05dc\u05e9 30-60-90, \u05de\u05d5\u05dc \u05d4-60 \u05d0\u05dd \u05d9\u05ea\u05e8=2:", "$\\sqrt{3}$", ["1", "2", "3"], "sqrt3."),
        (2, "$\\tan x=\\sin x/\\cos x$", "\u05e0\u05db\u05d5\u05df", ["\u05e9\u05d2\u05d5\u05d9", "\u05e8\u05e7 \u05dc-45", "\u05e8\u05e7 \u05dc-30"], "true."),
        (3, "$\\sin 0^\\circ$=", "$0$", ["$1$", "$\\frac{1}{2}$", "$-1$"], "0."),
        (3, "opposite/hypotenuse =", "$\\sin$", ["$\\cos$", "$\\tan$", "$\\cot$"], "sin."),
        (3, "adjacent/hypotenuse =", "$\\cos$", ["$\\sin$", "$\\tan$", "$\\sec$"], "cos."),
        (4, "$\\sin 180^\\circ$=", "$0$", ["$1$", "$-1$", "$\\frac{1}{2}$"], "0."),
        (4, "Law of sines: a/sin A =", "$b/\\sin B$", ["$a/\\sin B$", "$ab$", "$A/B$"], "sines."),
    ]
    for a in [3, 4, 5, 6, 8, 10]:
        items.append((3, "\u05e0\u05d2\u05d3\u05d9 $%d$, \u05d9\u05ea\u05e8 $%d$. $\\sin$?" % (a, 2 * a), "$\\frac{1}{2}$", ["$1$", "$2$", "$\\frac{%d}{%d}$" % (a, a)], "opp/hyp."))
    return R.pack(topic, start, items, n)


def gen_analytic(topic, n, start):
    items = [
        (2, "\u05de\u05e8\u05d7\u05e7 (0,0)-(3,4):", 5, [7, 12, 1], "5."),
        (2, "\u05d0\u05de\u05e6\u05e2 (0,0),(4,6):", "$(2,3)$", ["$(4,6)$", "$(0,0)$", "$(1,1)$"], "mid."),
        (3, "\u05de\u05e2\u05d2\u05dc\u05ea \u05e2\u05d9\u05d2\u05d5\u05dc: $x^2+y^2=r^2$. \u05de\u05e8\u05db\u05d6:", "$(0,0)$", ["$(r,0)$", "$(1,1)$", "$(r,r)$"], "origin."),
        (3, "$x^2+y^2=25$. \u05e8\u05d3\u05d9\u05d5\u05e1:", 5, [25, 10, 12], "5."),
        (4, "\u05e9\u05d9\u05e4\u05d5\u05e2 \u05d9\u05e9\u05e8 (1,2)-(4,8):", 2, [1, 3, 6], "2."),
        (3, "\u05de\u05e9\u05d5\u05d5\u05d0\u05ea \u05d9\u05e9\u05e8 \u05d3\u05e8\u05da (0,1),(0,5):", "$x=0$", ["$y=0$", "$y=1$", "$x=1$"], "x=0."),
        (4, "\u05e4\u05e8\u05d1\u05d5\u05dc\u05d4 $y=x^2$. \u05e7\u05d5\u05d3\u05e7\u05d5\u05d3 \u05e7\u05e6\u05e0\u05d4:", "$(0,0)$", ["$(1,1)$", "$(0,1)$", "$(1,0)$"], "vertex."),
        (2, "\u05d3\u05d9\u05e1\u05ea\u05e0\u05e1 formula:", "$\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$", ["$x+y$", "$|x-y|$", "$xy$"], "dist."),
    ]
    for r in range(1, 8):
        items.append((3, "$x^2+y^2=%d$. r=?" % (r * r), r, R.near(r), "r."))
    return R.pack(topic, start, items, n)


def gen_solids(topic, n, start):
    items = []
    for a, b, c in [(2, 3, 4), (3, 3, 3), (2, 4, 5), (1, 5, 6), (4, 4, 2), (3, 5, 2), (2, 2, 8), (5, 5, 5)]:
        items.append((3, "\u05e0\u05e4\u05d7 \u05ea\u05d9\u05d1\u05d4 %d*%d*%d:" % (a, b, c), a * b * c, R.near(a * b * c), "V."))
        items.append((4, "\u05e9\u05d8\u05d7 \u05e4\u05e0\u05d9\u05dd \u05ea\u05d9\u05d1\u05d4 %dx%dx%d:" % (a, b, c), 2 * (a * b + b * c + a * c), R.near(2 * (a * b + b * c + a * c)), "SA."))
    for r, h in [(2, 5), (3, 4), (1, 10), (4, 3), (5, 2)]:
        items.append((4, "\u05e0\u05e4\u05d7 \u05d2\u05dc\u05d9\u05dc r=%d h=%d (\\pi):" % (r, h), "$%d\\pi$" % (r * r * h), ["$%d\\pi$" % (2 * r * h), "$%d\\pi$" % (r * h), "$\\pi$"], "pi r2 h."))
    items.append((2, "\u05e0\u05e4\u05d7 \u05e7\u05d5\u05d1\u05d9\u05d4 \u05e6\u05dc\u05e2 a:", "$a^3$", ["$a^2$", "$6a^2$", "$4a$"], "a3."))
    return R.pack(topic, start, items, n)


def gen_derivative(topic, n, start):
    items = []
    for n_ in range(1, 8):
        items.append((3, "$(x^{%d})'=$" % n_, "$%dx^{%d}$" % (n_, n_ - 1) if n_ > 1 else "$1$", ["$x^{%d}$" % n_, "$%dx^{%d}$" % (n_, n_ + 1), "$0$"], "power."))
    items += [
        (2, "$(c)'=$", "$0$", ["$c$", "$1$", "$x$"], "0."),
        (2, "$(x)'=$", "$1$", ["$0$", "$x$", "$2x$"], "1."),
        (3, "$(2x^3)'=$", "$6x^2$", ["$2x^2$", "$6x^3$", "$5x^2$"], "6x2."),
        (4, "\u05de\u05e9\u05de\u05e2\u05d5\u05ea \u05d4\u05e0\u05d2\u05d6\u05e8\u05ea:", "\u05e9\u05d9\u05e4\u05d5\u05e2/\u05e7\u05e6\u05d1 \u05d4\u05e9\u05ea\u05e0\u05d5\u05ea", ["\u05e9\u05d8\u05d7", "\u05d0\u05d5\u05e8\u05da", "\u05de\u05de\u05d5\u05e6\u05e2"], "slope."),
        (3, "$(e^x)'=$", "$e^x$", ["$xe^{x-1}$", "$1$", "$0$"], "e^x."),
        (4, "$(\\sin x)'=$", "$\\cos x$", ["$-\\sin x$", "$\\sin x$", "$-\\cos x$"], "cos."),
        (4, "$(\\cos x)'=$", "$-\\sin x$", ["$\\cos x$", "$\\sin x$", "$-\\cos x$"], "-sin."),
    ]
    return R.pack(topic, start, items, n)


def gen_integral(topic, n, start):
    items = [
        (2, "$\\int x\\,dx=$", "$\\frac{x^2}{2}+C$", ["$x+C$", "$2x+C$", "$x^2+C$"], "x2/2."),
        (3, "$\\int 1\\,dx=$", "$x+C$", ["$1$", "$0$", "$x^2$"], "x."),
        (3, "$\\int x^2\\,dx=$", "$\\frac{x^3}{3}+C$", ["$\\frac{x^2}{2}+C$", "$2x+C$", "$x^3+C$"], "x3/3."),
        (2, "$\\int_0^1 2x\\,dx=$", "$1$", ["$2$", "$0$", "$1/2$"], "1."),
        (4, "\u05d0\u05d9\u05e0\u05d8\u05d2\u05e8\u05dc \u05de\u05d5\u05d2\u05d3\u05e8 \u05de\u05d9\u05d9\u05e6\u05d2:", "\u05e9\u05d8\u05d7 \u05de\u05ea\u05d7\u05ea \u05dc\u05e2\u05e7\u05d5\u05dc", ["\u05e9\u05d9\u05e4\u05d5\u05e2", "\u05e0\u05e7\u05d5\u05d3\u05d4", "\u05d6\u05d5\u05d5\u05d9\u05ea"], "area."),
        (3, "$\\int e^x\\,dx=$", "$e^x+C$", ["$xe^x$", "$1$", "$e^{x+1}$"], "e^x."),
        (4, "$\\int_0^{\\pi/2}\\cos x\\,dx=$", "$1$", ["$0$", "$\\pi/2$", "$-1$"], "1."),
        (3, "$\\int 3x^2\\,dx=$", "$x^3+C$", ["$3x^3+C$", "$6x+C$", "$x^2+C$"], "x3."),
    ]
    for k in range(1, 7):
        items.append((3, "$\\int %dx^{%d}\\,dx$ (till C): \u05de\u05e7\u05d3\u05d9\u05dd" % (k, k), "$x^{%d}$" % (k + 1) if False else "$\\frac{%d}{%d}x^{%d}+C$" % (k, k + 1, k + 1), ["$%dx^{%d}$" % (k, k), "$x+C$", "$0$"], "power int."))
    return R.pack(topic, start, items, n)


def gen_vector(topic, n, start):
    items = []
    for a, b in [(3, 4), (5, 12), (6, 8), (1, 0), (0, 5), (2, 2), (9, 12), (8, 15)]:
        mag = int((a * a + b * b) ** 0.5) if (a * a + b * b) ** 0.5 == int((a * a + b * b) ** 0.5) else None
        if mag:
            items.append((3, "|<%d,%d>|=" % (a, b), mag, R.near(mag), "mag."))
        items.append((2, "<%d,%d>+<%d,%d>=" % (a, b, b, a), "<%d,%d>" % (a + b, b + a), ["<%d,%d>" % (a, b), "<%d,%d>" % (a * b, a * b), "0"], "add."))
    items += [
        (2, "\u05d5\u05e7\u05d8\u05d5\u05e8 \u05d0\u05e4\u05e1:", "$\\langle 0,0\\rangle$", ["$\\langle 1,1\\rangle$", "$\\langle 1,0\\rangle$", "$i$"], "0."),
        (4, "\u05de\u05db\u05e4\u05dc\u05d4 \u05e1\u05e7\u05dc\u05e8\u05d9\u05ea 2*<%d,%d>:" % (3, 4), "$\\langle 6,8\\rangle$", ["$\\langle 5,6\\rangle$", "$\\langle 3,8\\rangle$", "14"], "2v."),
    ]
    return R.pack(topic, start, items, n)


def gen_complex(topic, n, start):
    items = [
        (2, "|3+4i|=", 5, [7, 12, 1], "5."),
        (2, "|5-12i|=", 13, [7, 17, 60], "13."),
        (3, "(2+3i)+(1-5i)=", "$3-2i$", ["$3+8i$", "$1-2i$", "$2+3i$"], "add."),
        (3, "(2+3i)-(1-5i)=", "$1+8i$", ["$1-2i$", "$3-2i$", "$-1$"], "sub."),
        (2, "\u05e6\u05de\u05d5\u05d3 \u05e9\u05dc a+bi:", "$a-bi$", ["$-a+bi$", "$b+ai$", "$|z|$"], "conj."),
        (4, "i^2=", "$-1$", ["$1$", "$0$", "$i$"], "-1."),
        (4, "i^4=", "$1$", ["$-1$", "$i$", "$0$"], "1."),
        (3, "Re(2-5i)=", 2, [-5, 5, 0], "2."),
        (3, "Im(2-5i)=", -5, [5, 2, 0], "-5."),
        (2, "|i|=", 1, [0, -1, 2], "1."),
    ]
    for a, b in [(6, 8), (9, 12), (1, 1), (2, 2), (4, 3), (8, 15)]:
        m = int((a * a + b * b) ** 0.5) if (a * a + b * b) ** 0.5 == int((a * a + b * b) ** 0.5) else None
        if m:
            items.append((3, "|%d+%di|=" % (a, b), m, R.near(m), "mod."))
    return R.pack(topic, start, items, n)


def gen_explog(topic, n, start):
    items = [
        (2, "$\\log_{10} 100$=", 2, [1, 10, 100], "2."),
        (2, "$\\log_2 8$=", 3, [2, 4, 8], "3."),
        (3, "$e^{\\ln 5}$=", 5, [1, 0, "$e$"], "5."),
        (3, "$\\ln e$=", 1, [0, "$e$", "10"], "1."),
        (2, "$a^m a^n=$", "$a^{m+n}$", ["$a^{mn}$", "$a^{m-n}$", "$ma^n$"], "prod."),
        (3, "$(a^m)^n=$", "$a^{mn}$", ["$a^{m+n}$", "$a^{m/n}$", "$na^m$"], "power."),
        (4, "$\\log(ab)=$", "$\\log a+\\log b$", ["$\\log a\\cdot\\log b$", "$\\log(a+b)$", "$\\frac{\\log a}{\\log b}$"], "sum."),
        (3, "\u05e6\u05de\u05d9\u05d7\u05d4 $\\times 2$ \u05db\u05dc \u05e9\u05e2\u05d4: \u05d0\u05d7\u05e8 3 \u05e9\u05e2\u05d5\u05ea \u05de\u05db\u05e4\u05d9\u05dc:", 8, [6, 9, 5], "8."),
        (4, "$2^{x}=8$. $x$=", 3, [2, 4, 8], "3."),
        (2, "$10^{-2}$=", "$0.01$", ["$-20$", "$0.1$", "$-100$"], "0.01."),
    ]
    for k in range(1, 6):
        items.append((3, "$\\log_{10} 10^{%d}$=" % k, k, R.near(k), "k."))
    return R.pack(topic, start, items, n)


def gen_sequences(topic, n, start):
    items = [
        (2, "2,4,6,8,... \u05d4\u05d1\u05d0:", 10, [9, 12, 7], "10."),
        (2, "1,3,5,7,... \u05d4\u05d1\u05d0:", 9, [8, 11, 10], "9."),
        (3, "3,6,12,24,... \u05d4\u05d1\u05d0:", 48, [36, 30, 42], "48."),
        (3, "a_n=2n+1. a_5=", 11, [10, 9, 12], "11."),
        (4, "a_n=n^2. a_4=", 16, [8, 12, 4], "16."),
        (2, "\u05e1\u05d3\u05e8\u05d4 \u05d7\u05e9\u05d1\u05d5\u05e0\u05d9\u05ea: \u05d4\u05e4\u05e8\u05e9:", "\u05e7\u05d1\u05d5\u05e2", ["\u05de\u05db\u05e4\u05dc\u05d4", "\u05e8\u05d9\u05e8\u05d5\u05e2", "0"], "d."),
        (3, "\u05d4\u05e0\u05d3\u05e1\u05d4: \u05d1\u05d5\u05d3\u05e7\u05d9\u05dd \u05e2\u05d1\u05d5\u05e8 n=1 \u05d5\u05e6\u05e2\u05d3:", "n->n+1", ["\u05e8\u05e7 n=1", "\u05e8\u05e7 \u05d2\u05d1\u05d5\u05dc", "\u05dc\u05d0 \u05e6\u05e8\u05d9\u05da"], "ind."),
        (4, "S=1+2+...+n =", "$\\frac{n(n+1)}{2}$", ["$n^2$", "$2n$", "$n!$"], "gauss."),
        (3, "a1=5, d=3. a4=", 14, [11, 12, 15], "14."),
        (4, "geometrical r=2, a1=3. a4=", 24, [12, 18, 48], "24."),
    ]
    for d in range(2, 8):
        items.append((2, "1 \u05d5\u05e7\u05e4\u05d9\u05e6\u05d5\u05ea +%d. \u05d0\u05d7\u05e8\u05d9 1: \u05d4\u05d1\u05d0 \u05d0\u05d7\u05e8\u05d9 4?" % d, 1 + 4 * d, R.near(1 + 4 * d), "arith."))
    return R.pack(topic, start, items, n)


def gen_polynomial(topic, n, start):
    items = [
        (2, "\u05e9\u05d5\u05e8\u05e9 $x^2-4=0$:", "$\\pm 2$", ["$4$", "$0$", "$\\pm 4$"], "pm2."),
        (3, "\u05e1\u05db\u05d5\u05dd \u05de\u05e7\u05d3\u05de\u05d9\u05dd $2x^3+x-1$:", 3, [2, 1, 4], "3."),
        (3, "Possible rational root factor 6 over 2 includes:", "$\\pm1,2,3,6,\\frac12,\\frac32$", ["\u05e8\u05e7 1", "\u05e8\u05e7 6", "0"], "RRT."),
        (4, "($x-2$) \u05e9\u05d5\u05e8\u05e9 \u05e9\u05dc p \u05d0\u05dd p(2)=", "$0$", ["$2$", "$1$", "$-2$"], "factor thm."),
        (2, "($x^2+1$) \u05e9\u05d5\u05e8\u05e9\u05d9\u05dd \u05de\u05de\u05e9\u05d9\u05d9\u05dd?", "\u05d0\u05d9\u05df", ["$\\pm1$", "$0$", "$\\pm i$ \u05e8\u05e7"], "none real."),
    ]
    for a in range(1, 6):
        items.append((3, "p(x)=x^2-%d. p(0)=" % (a * a), -a * a, R.near(-a * a), "p0."))
        items.append((3, "\u05e9\u05d5\u05e8\u05e9 x^2=%d (x>0):" % (a * a), a, R.near(a), "a."))
    return R.pack(topic, start, items, n)


def gen_hypothesis(topic, n, start):
    items = [
        (2, "H0 \u05d1\u05d3\u05e8\u05da \u05db\u05dc\u05dc:", "\u05d4\u05e9\u05e2\u05e8\u05ea \u05d0\u05e4\u05e1 / \u05d0\u05d9\u05df \u05d4\u05d1\u05d3\u05dc", ["\u05d4\u05e9\u05e2\u05e8\u05ea \u05d7\u05dc\u05d5\u05e4\u05d9\u05ea", "p=1", "\u05de\u05de\u05d5\u05e6\u05e2"], "null."),
        (3, "p-value \u05e7\u05d8\u05df \u05de-\u05d0\u05dc\u05e4\u05d0:", "\u05d3\u05d5\u05d7\u05d9\u05dd H0", ["\u05de\u05e7\u05d1\u05dc\u05d9\u05dd H0", "\u05dc\u05d0 \u05e7\u05e9\u05d5\u05e8", "p=1"], "reject."),
        (3, "\u05e9\u05d2\u05d9\u05d0\u05d4 \u05de\u05e1\u05d5\u05d2 I:", "\u05d3\u05d7\u05d9\u05d9\u05ea H0 \u05e0\u05db\u05d5\u05e0\u05d4", ["\u05e7\u05d1\u05dc\u05ea H0 \u05e9\u05e7\u05e8", "p=0", "n=0"], "type1."),
        (2, "\u05de\u05d5\u05e6\u05e2 \u05d1\u05d4\u05ea\u05e4\u05dc\u05d2\u05d5\u05ea \u05e0\u05d5\u05e8\u05de\u05dc\u05d9\u05ea:", "\u05d0\u05de\u05e6\u05e2", ["\u05e9\u05db\u05d9\u05d7", "\u05e9\u05d5\u05e0\u05d5\u05ea", "0"], "mean."),
        (4, "z-score =", "$(x-\\mu)/\\sigma$", ["$x\\sigma$", "$\\mu/x$", "$x+\\mu$"], "z."),
        (3, "\u05e8\u05de\u05ea \u05e1\u05de\u05da 95% \u05db\u05d5\u05dc\u05dc\u05ea \u05d0\u05ea:", "\u05d4\u05e4\u05e8\u05de\u05d8\u05e8 \u05d1\u05d4\u05e1\u05ea\u05d1\u05e8\u05d5\u05ea \u05d2\u05d1\u05d5\u05d4\u05d4", ["\u05db\u05dc \u05d4\u05ea\u05e6\u05e4\u05d9\u05d5\u05ea", "p-value", "H1"], "param."),
    ]
    for i in range(14):
        items.append((2 + i % 3, "\u05d1\u05de\u05d1\u05d7\u05df \u05d4\u05e9\u05e2\u05e8\u05d5\u05ea: \u05d0\u05dd p=0.01 \u05d5-alpha=0.05:", "\u05d3\u05d5\u05d7\u05d9\u05dd H0", ["\u05de\u05e7\u05d1\u05dc\u05d9\u05dd H0", "\u05dc\u05d0 \u05e0\u05d9\u05ea\u05df \u05dc\u05d4\u05db\u05e8\u05d9\u05e2", "n=0"], "reject #%d." % i))
    return R.pack(topic, start, items, n)


def gen_lp(topic, n, start):
    items = [
        (2, "\u05ea\u05db\u05e0\u05d5\u05ea \u05dc\u05d9\u05e0\u05d0\u05e8\u05d9: \u05d0\u05d9\u05dc\u05d5\u05e5 \u05d1\u05d3\"\u05db:", "\u05e7\u05d3\u05e7\u05d5\u05d3 \u05d4\u05d0\u05d6\u05d5\u05e8 \u05d4\u05d0\u05e4\u05e9\u05e8\u05d9", ["\u05de\u05e8\u05db\u05d6", "\u05de\u05d7\u05d5\u05e5 \u05dc\u05ea\u05d7\u05d5\u05dd", "\u05d0\u05e4\u05e1"], "vertex."),
        (3, "\u05d0\u05d6\u05d5\u05e8 \u05d0\u05e4\u05e9\u05e8\u05d9:", "\u05de\u05e7\u05d9\u05d9\u05dd \u05d0\u05d9-\u05e9\u05d5\u05d5\u05d9\u05d5\u05e0\u05d9\u05dd", ["\u05db\u05dc R^2", "\u05e8\u05e7 \u05e6\u05d9\u05e8 x", "H0"], "feasible."),
        (2, "max 3x+2y \u05e2\u05dc \u05e7\u05d5\u05d3\u05e7\u05d5\u05d3\u05d5\u05ea (0,0),(4,0),(0,3). \u05de\u05e7\u05e1?", 12, [0, 6, 9], "at (4,0)=12."),
        (4, "\u05d0\u05d9\u05dc\u05d5\u05e5: x>=0,y>=0 \u05d4\u05dd:", "\u05d0\u05d9-\u05e9\u05dc\u05d9\u05dc\u05d9\u05d5\u05ea", ["\u05de\u05e9\u05e4\u05d8", "H1", "\u05e9\u05d8\u05d7"], "nonneg."),
    ]
    for i in range(16):
        items.append((2, "LP \u05e2\u05d5\u05d1\u05d3\u05d4 %d: \u05d4\u05d0\u05dd \u05e0\u05d3\u05e8\u05e9 \u05dc\u05d1\u05d3\u05d5\u05e7 \u05e7\u05d3\u05e7\u05d5\u05d3\u05d9\u05dd?" % (i + 1), "\u05db\u05df", ["\u05dc\u05d0", "\u05e8\u05e7 \u05d0\u05dd n>10", "\u05e8\u05e7 \u05de\u05d9\u05e0"], "yes."))
    return R.pack(topic, start, items, n)


def write_bank(path: Path, export_name: str, questions: list, header_he: str):
    body = (
        "/** %s */\n\nexport const %s = " % (header_he, export_name)
        + json.dumps(questions, ensure_ascii=False, indent=2)
        + ";\n\n"
    )
    if export_name == "QUESTIONS":
        body += "export function getQuestionsForTopic(topicId) {\n  return QUESTIONS.filter((q) => q.topic_id === topicId);\n}\n"
    elif export_name == "ELEMENTARY_QUESTIONS":
        body += "export function getElementaryQuestionsForTopic(topicId) {\n  return ELEMENTARY_QUESTIONS.filter((q) => q.topic_id === topicId);\n}\n"
    elif export_name == "MIDDLE_SCHOOL_QUESTIONS":
        body += "export function getMiddleSchoolQuestionsForTopic(topicId) {\n  return MIDDLE_SCHOOL_QUESTIONS.filter((q) => q.topic_id === topicId);\n}\n"
    path.write_text(body, encoding="utf-8")
    print("wrote", path.name, len(questions))
