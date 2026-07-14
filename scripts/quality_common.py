# -*- coding: utf-8 -*-
from __future__ import annotations

import hashlib
import random


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
        out.append(mcq("q-q-%s-%d" % (topic, start + len(out)), topic, diff, text, opts, ci, expl))
        if len(out) >= n:
            break
    return out


H_WHAT = "\u05de\u05d4\u05d5"
H_COUNT = "\u05db\u05de\u05d4 \u05d6\u05d4"
H_BIG = "\u05d0\u05d9\u05d6\u05d4 \u05d2\u05d3\u05d5\u05dc"
H_CALC = "\u05d7\u05e9\u05d1\u05d5"
H_SOLVE = "\u05e4\u05ea\u05e8\u05d5"
H_EQ = "\u05e9\u05d5\u05d5\u05d9\u05dd"
H_AREA = "\u05e9\u05d8\u05d7"
H_PER = "\u05d4\u05d9\u05e7\u05e3"
H_MEAN = "\u05de\u05de\u05d5\u05e6\u05e2"
