# -*- coding: utf-8 -*-
"""Build elementary (grades 1-6) curriculum + questions."""
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]


def u(s: str) -> str:
    return re.sub(r"\\u([0-9a-fA-F]{4})", lambda m: chr(int(m.group(1), 16)), s)


# (id, grade, cluster, title, description, sort)
# Based on MoE Yesodi curriculum (mavo1.pdf / tzeyune derek)
TOPICS = [
    # Grade 1
    ("g1-count-20", 1, "\\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd \\u05d5\\u05e4\\u05e2\\u05d5\\u05dc\\u05d5\\u05ea",
     "\\u05e1\\u05e4\\u05d9\\u05e8\\u05d4 \\u05d5\\u05de\\u05e0\\u05d9\\u05d9\\u05d4 \\u05e2\\u05d3 20",
     "\\u05d4\\u05db\\u05e8\\u05ea \\u05d4\\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd 1\\u201320, \\u05e1\\u05e4\\u05d9\\u05e8\\u05d4, \\u05de\\u05e0\\u05d9\\u05d9\\u05d4 \\u05d5\\u05d4\\u05e9\\u05d5\\u05d5\\u05d0\\u05d4", 1),
    ("g1-numbers-100", 1, "\\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd \\u05d5\\u05e4\\u05e2\\u05d5\\u05dc\\u05d5\\u05ea",
     "\\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd \\u05e2\\u05d3 100 \\u05d5\\u05de\\u05d1\\u05e0\\u05d4 \\u05e2\\u05e9\\u05e8\\u05d5\\u05e0\\u05d9",
     "\\u05e7\\u05e8\\u05d9\\u05d0\\u05d4 \\u05d5\\u05db\\u05ea\\u05d9\\u05d1\\u05d4, \\u05d4\\u05de\\u05e1\\u05e4\\u05e8 0, \\u05e2\\u05e9\\u05e8\\u05d5\\u05ea \\u05d5\\u05d9\\u05e9\\u05e8 \\u05d4\\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd", 2),
    ("g1-add-sub-20", 1, "\\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd \\u05d5\\u05e4\\u05e2\\u05d5\\u05dc\\u05d5\\u05ea",
     "\\u05d7\\u05d9\\u05d1\\u05d5\\u05e8 \\u05d5\\u05d7\\u05d9\\u05e1\\u05d5\\u05e8 \\u05e2\\u05d3 20",
     "\\u05e4\\u05e2\\u05d5\\u05dc\\u05d5\\u05ea \\u05d1\\u05e1\\u05d9\\u05e1\\u05d9\\u05d5\\u05ea, \\u05e1\\u05d9\\u05de\\u05df \\u05d4\\u05e9\\u05d5\\u05d5\\u05d9\\u05d5\\u05df \\u05d5\\u05e9\\u05d0\\u05dc\\u05d5\\u05ea \\u05de\\u05d9\\u05dc\\u05d5\\u05dc\\u05d9\\u05d5\\u05ea \\u05e7\\u05e6\\u05e8\\u05d5\\u05ea", 3),
    ("g1-shapes", 1, "\\u05d2\\u05d0\\u05d5\\u05de\\u05d8\\u05e8\\u05d9\\u05d4 \\u05d5\\u05de\\u05d3\\u05d9\\u05d3\\u05d5\\u05ea",
     "\\u05e6\\u05d5\\u05e8\\u05d5\\u05ea \\u05d2\\u05d0\\u05d5\\u05de\\u05d8\\u05e8\\u05d9\\u05d5\\u05ea",
     "\\u05de\\u05e9\\u05d5\\u05dc\\u05e9, \\u05e8\\u05d9\\u05d1\\u05d5\\u05e2, \\u05de\\u05dc\\u05d1\\u05df, \\u05e2\\u05d9\\u05d2\\u05d5\\u05dc \\u05d5\\u05d6\\u05d9\\u05d4\\u05d5\\u05d9 \\u05e6\\u05d5\\u05e8\\u05d5\\u05ea", 4),
    ("g1-measure", 1, "\\u05d2\\u05d0\\u05d5\\u05de\\u05d8\\u05e8\\u05d9\\u05d4 \\u05d5\\u05de\\u05d3\\u05d9\\u05d3\\u05d5\\u05ea",
     "\\u05de\\u05d3\\u05d9\\u05d3\\u05ea \\u05d0\\u05d5\\u05e8\\u05da \\u05d1\\u05e1\\u05d9\\u05e1\\u05d9\\u05ea",
     "\\u05d4\\u05e9\\u05d5\\u05d5\\u05d0\\u05ea \\u05d0\\u05d5\\u05e8\\u05db\\u05d9\\u05dd \\u05d5\\u05de\\u05d3\\u05d9\\u05d3\\u05d4 \\u05d1\\u05d9\\u05d7\\u05d9\\u05d3\\u05d5\\u05ea \\u05e9\\u05e8\\u05d9\\u05e8\\u05d5\\u05ea\\u05d9\\u05d5\\u05ea", 5),

    # Grade 2
    ("g2-numbers-1000", 2, "\\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd \\u05d5\\u05e4\\u05e2\\u05d5\\u05dc\\u05d5\\u05ea",
     "\\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd \\u05e2\\u05d3 1,000",
     "\\u05e7\\u05e8\\u05d9\\u05d0\\u05d4 \\u05d5\\u05db\\u05ea\\u05d9\\u05d1\\u05d4, \\u05de\\u05d1\\u05e0\\u05d4 \\u05e2\\u05e9\\u05e8\\u05d5\\u05e0\\u05d9, \\u05d6\\u05d5\\u05d2\\u05d9/\\u05d0\\u05d9-\\u05d6\\u05d5\\u05d2\\u05d9", 1),
    ("g2-add-sub-100", 2, "\\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd \\u05d5\\u05e4\\u05e2\\u05d5\\u05dc\\u05d5\\u05ea",
     "\\u05d7\\u05d9\\u05d1\\u05d5\\u05e8 \\u05d5\\u05d7\\u05d9\\u05e1\\u05d5\\u05e8 \\u05e2\\u05d3 100",
     "\\u05d7\\u05d9\\u05d1\\u05d5\\u05e8 \\u05d5\\u05d7\\u05d9\\u05e1\\u05d5\\u05e8 \\u05e2\\u05e9\\u05e8\\u05d5\\u05ea \\u05e9\\u05dc\\u05de\\u05d5\\u05ea \\u05d5\\u05e2\\u05d3 100", 2),
    ("g2-mul-div-intro", 2, "\\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd \\u05d5\\u05e4\\u05e2\\u05d5\\u05dc\\u05d5\\u05ea",
     "\\u05db\\u05e4\\u05dc \\u05d5\\u05d7\\u05d9\\u05dc\\u05d5\\u05e7 \\u2014 \\u05de\\u05d1\\u05d5\\u05d0",
     "\\u05de\\u05e9\\u05de\\u05e2\\u05d5\\u05ea \\u05d4\\u05e4\\u05e2\\u05d5\\u05dc\\u05d5\\u05ea \\u05d5\\u05db\\u05e4\\u05dc/\\u05d7\\u05d9\\u05dc\\u05d5\\u05e7 \\u05e2\\u05d3 20", 3),
    ("g2-fractions-half", 2, "\\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd \\u05d5\\u05e4\\u05e2\\u05d5\\u05dc\\u05d5\\u05ea",
     "\\u05e9\\u05d1\\u05e8\\u05d9\\u05dd \\u2014 \\u05d7\\u05e6\\u05d9 \\u05d5\\u05e8\\u05d1\\u05e2",
     "\\u05d4\\u05db\\u05e8\\u05ea \\u05d4\\u05e9\\u05d1\\u05e8\\u05d9\\u05dd $\\frac{1}{2}$ \\u05d5-$\\frac{1}{4}$ \\u05db\\u05d7\\u05dc\\u05e7 \\u05de\\u05d4\\u05e9\\u05dc\\u05dd", 4),
    ("g2-shapes-measure", 2, "\\u05d2\\u05d0\\u05d5\\u05de\\u05d8\\u05e8\\u05d9\\u05d4 \\u05d5\\u05de\\u05d3\\u05d9\\u05d3\\u05d5\\u05ea",
     "\\u05e6\\u05d5\\u05e8\\u05d5\\u05ea, \\u05d2\\u05d5\\u05e4\\u05d9\\u05dd \\u05d5\\u05de\\u05d3\\u05d9\\u05d3\\u05ea \\u05d0\\u05d5\\u05e8\\u05da",
     "\\u05d4\\u05d6\\u05d6\\u05d4/\\u05e9\\u05d9\\u05e7\\u05d5\\u05e3, \\u05de\\u05d3\\u05d9\\u05d3\\u05ea \\u05d0\\u05d5\\u05e8\\u05da \\u05d1\\u05e1\\\"\\u05de, \\u05d4\\u05e9\\u05d5\\u05d5\\u05d0\\u05ea \\u05e9\\u05d8\\u05d7\\u05d9\\u05dd", 5),
    ("g2-data", 2, "\\u05d7\\u05e7\\u05e8 \\u05e0\\u05ea\\u05d5\\u05e0\\u05d9\\u05dd",
     "\\u05d7\\u05e7\\u05e8 \\u05e0\\u05ea\\u05d5\\u05e0\\u05d9\\u05dd \\u05e4\\u05e9\\u05d5\\u05d8",
     "\\u05d0\\u05d9\\u05e1\\u05d5\\u05e3 \\u05d5\\u05d0\\u05e8\\u05d2\\u05d5\\u05df \\u05e0\\u05ea\\u05d5\\u05e0\\u05d9\\u05dd \\u05d1\\u05d8\\u05d1\\u05dc\\u05d0\\u05d5\\u05ea \\u05e4\\u05e9\\u05d5\\u05d8\\u05d5\\u05ea", 6),

    # Grade 3
    ("g3-numbers-10000", 3, "\\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd \\u05d5\\u05e4\\u05e2\\u05d5\\u05dc\\u05d5\\u05ea",
     "\\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd \\u05e2\\u05d3 10,000",
     "\\u05de\\u05d1\\u05e0\\u05d4 \\u05e2\\u05e9\\u05e8\\u05d5\\u05e0\\u05d9, \\u05e2\\u05d9\\u05d2\\u05d5\\u05dc \\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd \\u05d5\\u05d0\\u05d5\\u05de\\u05d3\\u05df", 1),
    ("g3-add-sub-large", 3, "\\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd \\u05d5\\u05e4\\u05e2\\u05d5\\u05dc\\u05d5\\u05ea",
     "\\u05d7\\u05d9\\u05d1\\u05d5\\u05e8 \\u05d5\\u05d7\\u05d9\\u05e1\\u05d5\\u05e8 \\u05e2\\u05d3 10,000",
     "\\u05d0\\u05dc\\u05d2\\u05d5\\u05e8\\u05d9\\u05ea\\u05de\\u05d9\\u05dd \\u05db\\u05ea\\u05d5\\u05d1\\u05d9\\u05d9\\u05dd \\u05d5\\u05e9\\u05d0\\u05dc\\u05d5\\u05ea \\u05de\\u05d9\\u05dc\\u05d5\\u05dc\\u05d9\\u05d5\\u05ea", 2),
    ("g3-mul-div-100", 3, "\\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd \\u05d5\\u05e4\\u05e2\\u05d5\\u05dc\\u05d5\\u05ea",
     "\\u05db\\u05e4\\u05dc \\u05d5\\u05d7\\u05d9\\u05dc\\u05d5\\u05e7 \\u05d1\\u05ea\\u05d7\\u05d5\\u05dd \\u05d4-100",
     "\\u05dc\\u05d5\\u05d7 \\u05d4\\u05db\\u05e4\\u05dc, \\u05db\\u05e4\\u05dc \\u05e2\\u05e9\\u05e8\\u05d5\\u05ea/\\u05de\\u05d0\\u05d5\\u05ea, \\u05e1\\u05d5\\u05d2\\u05e8\\u05d9\\u05d9\\u05dd", 3),
    ("g3-fractions-unit", 3, "\\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd \\u05d5\\u05e4\\u05e2\\u05d5\\u05dc\\u05d5\\u05ea",
     "\\u05e9\\u05d1\\u05e8\\u05d9 \\u05d9\\u05d7\\u05d9\\u05d3\\u05d4",
     "\\u05d4\\u05db\\u05e8\\u05ea $\\frac{1}{2},\\frac{1}{3},\\frac{1}{4},\\frac{1}{5},\\frac{1}{6},\\frac{1}{8},\\frac{1}{10}$ \\u05d5\\u05e1\\u05d3\\u05e8 \\u05d1\\u05d9\\u05e0\\u05d9\\u05d4\\u05dd", 4),
    ("g3-geometry", 3, "\\u05d2\\u05d0\\u05d5\\u05de\\u05d8\\u05e8\\u05d9\\u05d4 \\u05d5\\u05de\\u05d3\\u05d9\\u05d3\\u05d5\\u05ea",
     "\\u05d6\\u05d5\\u05d5\\u05d9\\u05d5\\u05ea, \\u05de\\u05d0\\u05d5\\u05e0\\u05db\\u05d9\\u05dd \\u05d5\\u05de\\u05e7\\u05d1\\u05d9\\u05dc\\u05d9\\u05dd",
     "\\u05d6\\u05d5\\u05d5\\u05d9\\u05d5\\u05ea, \\u05de\\u05e9\\u05d5\\u05dc\\u05e9\\u05d9\\u05dd, \\u05de\\u05e8\\u05d5\\u05d1\\u05e2\\u05d9\\u05dd \\u05d5\\u05de\\u05d3\\u05d9\\u05d3\\u05ea \\u05d0\\u05d5\\u05e8\\u05da", 5),
    ("g3-area", 3, "\\u05d2\\u05d0\\u05d5\\u05de\\u05d8\\u05e8\\u05d9\\u05d4 \\u05d5\\u05de\\u05d3\\u05d9\\u05d3\\u05d5\\u05ea",
     "\\u05e9\\u05d8\\u05d7 \\u05de\\u05dc\\u05d1\\u05df",
     "\\u05d9\\u05d7\\u05d9\\u05d3\\u05d5\\u05ea \\u05e9\\u05d8\\u05d7 \\u05d5\\u05d7\\u05d9\\u05e9\\u05d5\\u05d1 \\u05e9\\u05d8\\u05d7 \\u05de\\u05dc\\u05d1\\u05df", 6),

    # Grade 4
    ("g4-large-numbers", 4, "\\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd \\u05d5\\u05e4\\u05e2\\u05d5\\u05dc\\u05d5\\u05ea",
     "\\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd \\u05d2\\u05d3\\u05d5\\u05dc\\u05d9\\u05dd \\u05d5\\u05e4\\u05e2\\u05d5\\u05dc\\u05d5\\u05ea",
     "\\u05d4\\u05e8\\u05d7\\u05d1\\u05ea \\u05ea\\u05d7\\u05d5\\u05dd \\u05d4\\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd, \\u05db\\u05e4\\u05dc \\u05d5\\u05d7\\u05d9\\u05dc\\u05d5\\u05e7 \\u05de\\u05ea\\u05e7\\u05d3\\u05de\\u05d9\\u05dd", 1),
    ("g4-fractions-ops", 4, "\\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd \\u05d5\\u05e4\\u05e2\\u05d5\\u05dc\\u05d5\\u05ea",
     "\\u05e9\\u05d1\\u05e8\\u05d9\\u05dd \\u05e4\\u05e9\\u05d5\\u05d8\\u05d9\\u05dd \\u2014 \\u05e4\\u05e2\\u05d5\\u05dc\\u05d5\\u05ea",
     "\\u05d7\\u05d9\\u05d1\\u05d5\\u05e8 \\u05d5\\u05d7\\u05d9\\u05e1\\u05d5\\u05e8 \\u05e9\\u05d1\\u05e8\\u05d9\\u05dd \\u05e2\\u05dd \\u05de\\u05db\\u05e0\\u05d9\\u05dd \\u05e7\\u05e8\\u05d5\\u05d1\\u05d9\\u05dd, \\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd \\u05de\\u05e2\\u05d5\\u05e8\\u05d1\\u05d9\\u05dd, \\u05db\\u05e4\\u05dc \\u05e9\\u05dc\\u05dd \\u05d1\\u05e9\\u05d1\\u05e8", 2),
    ("g4-decimals-intro", 4, "\\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd \\u05d5\\u05e4\\u05e2\\u05d5\\u05dc\\u05d5\\u05ea",
     "\\u05e9\\u05d1\\u05e8\\u05d9\\u05dd \\u05e2\\u05e9\\u05e8\\u05d5\\u05e0\\u05d9\\u05d9\\u05dd \\u2014 \\u05de\\u05d1\\u05d5\\u05d0",
     "\\u05d4\\u05db\\u05e8\\u05ea \\u05e9\\u05d1\\u05e8\\u05d9\\u05dd \\u05e2\\u05e9\\u05e8\\u05d5\\u05e0\\u05d9\\u05d9\\u05dd, \\u05d4\\u05e9\\u05d5\\u05d5\\u05d0\\u05d4 \\u05d5\\u05e7\\u05e8\\u05d9\\u05d0\\u05d4 \\u05e2\\u05dc \\u05d9\\u05e9\\u05e8 \\u05d4\\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd", 3),
    ("g4-geometry", 4, "\\u05d2\\u05d0\\u05d5\\u05de\\u05d8\\u05e8\\u05d9\\u05d4 \\u05d5\\u05de\\u05d3\\u05d9\\u05d3\\u05d5\\u05ea",
     "\\u05d0\\u05dc\\u05db\\u05e1\\u05d5\\u05df, \\u05ea\\u05d9\\u05d1\\u05d5\\u05ea \\u05d5\\u05e1\\u05d9\\u05de\\u05d8\\u05e8\\u05d9\\u05d4",
     "\\u05ea\\u05db\\u05d5\\u05e0\\u05d5\\u05ea \\u05de\\u05e6\\u05d5\\u05dc\\u05e2\\u05d9\\u05dd, \\u05e0\\u05d5\\u05e1\\u05d7\\u05d0\\u05d5\\u05ea \\u05e9\\u05d8\\u05d7 \\u05d5\\u05d4\\u05d9\\u05e7\\u05e3, \\u05e0\\u05e4\\u05d7 \\u05ea\\u05d9\\u05d1\\u05d4", 4),
    ("g4-data", 4, "\\u05d7\\u05e7\\u05e8 \\u05e0\\u05ea\\u05d5\\u05e0\\u05d9\\u05dd",
     "\\u05d8\\u05d1\\u05dc\\u05d0\\u05d5\\u05ea \\u05d5\\u05d2\\u05e8\\u05e4\\u05d9\\u05dd",
     "\\u05e7\\u05e8\\u05d9\\u05d0\\u05ea \\u05e0\\u05ea\\u05d5\\u05e0\\u05d9\\u05dd \\u05de\\u05d8\\u05d1\\u05dc\\u05d0\\u05d5\\u05ea \\u05d5\\u05d2\\u05e8\\u05e4\\u05d9 \\u05e2\\u05de\\u05d5\\u05d3\\u05d5\\u05ea", 5),

    # Grade 5
    ("g5-fractions-adv", 5, "\\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd \\u05d5\\u05e4\\u05e2\\u05d5\\u05dc\\u05d5\\u05ea",
     "\\u05e9\\u05d1\\u05e8\\u05d9\\u05dd \\u05e4\\u05e9\\u05d5\\u05d8\\u05d9\\u05dd \\u2014 \\u05d4\\u05e8\\u05d7\\u05d1\\u05d4",
     "\\u05e6\\u05de\\u05e6\\u05d5\\u05dd \\u05d5\\u05d4\\u05e8\\u05d7\\u05d1\\u05d4, \\u05d7\\u05d9\\u05d1\\u05d5\\u05e8 \\u05d5\\u05d7\\u05d9\\u05e1\\u05d5\\u05e8, \\u05e9\\u05d1\\u05e8\\u05d9\\u05dd \\u05d2\\u05d3\\u05d5\\u05dc\\u05d9\\u05dd \\u05de-1", 1),
    ("g5-decimals-ops", 5, "\\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd \\u05d5\\u05e4\\u05e2\\u05d5\\u05dc\\u05d5\\u05ea",
     "\\u05e9\\u05d1\\u05e8\\u05d9\\u05dd \\u05e2\\u05e9\\u05e8\\u05d5\\u05e0\\u05d9\\u05d9\\u05dd \\u2014 \\u05e4\\u05e2\\u05d5\\u05dc\\u05d5\\u05ea",
     "\\u05d7\\u05d9\\u05d1\\u05d5\\u05e8, \\u05d7\\u05d9\\u05e1\\u05d5\\u05e8, \\u05d4\\u05e9\\u05d5\\u05d5\\u05d0\\u05d4, \\u05e2\\u05d9\\u05d2\\u05d5\\u05dc \\u05d5\\u05de\\u05e2\\u05d1\\u05e8 \\u05dc\\u05e9\\u05d1\\u05e8 \\u05e4\\u05e9\\u05d5\\u05d8", 2),
    ("g5-mul-div-adv", 5, "\\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd \\u05d5\\u05e4\\u05e2\\u05d5\\u05dc\\u05d5\\u05ea",
     "\\u05db\\u05e4\\u05dc \\u05d5\\u05d7\\u05d9\\u05dc\\u05d5\\u05e7 \\u05de\\u05ea\\u05e7\\u05d3\\u05de\\u05d9\\u05dd",
     "\\u05db\\u05e4\\u05dc \\u05d5\\u05d7\\u05d9\\u05dc\\u05d5\\u05e7 \\u05d1\\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd \\u05d2\\u05d3\\u05d5\\u05dc\\u05d9\\u05dd \\u05d5\\u05d1\\u05e2\\u05d9\\u05d5\\u05ea \\u05e2\\u05dd \\u05e9\\u05d0\\u05e8\\u05d9\\u05ea", 3),
    ("g5-geometry", 5, "\\u05d2\\u05d0\\u05d5\\u05de\\u05d8\\u05e8\\u05d9\\u05d4 \\u05d5\\u05de\\u05d3\\u05d9\\u05d3\\u05d5\\u05ea",
     "\\u05e9\\u05d8\\u05d7, \\u05d4\\u05d9\\u05e7\\u05e3 \\u05d5\\u05e0\\u05e4\\u05d7",
     "\\u05e0\\u05d5\\u05e1\\u05d7\\u05d0\\u05d5\\u05ea \\u05e9\\u05d8\\u05d7/\\u05d4\\u05d9\\u05e7\\u05e3, \\u05e0\\u05e4\\u05d7 \\u05ea\\u05d9\\u05d1\\u05d4 \\u05d5\\u05e9\\u05d8\\u05d7 \\u05e4\\u05e0\\u05d9\\u05dd", 4),
    ("g5-data", 5, "\\u05d7\\u05e7\\u05e8 \\u05e0\\u05ea\\u05d5\\u05e0\\u05d9\\u05dd",
     "\\u05d7\\u05e7\\u05e8 \\u05e0\\u05ea\\u05d5\\u05e0\\u05d9\\u05dd \\u05d5\\u05de\\u05de\\u05d5\\u05e6\\u05e2",
     "\\u05e4\\u05d9\\u05e8\\u05d5\\u05e9 \\u05e0\\u05ea\\u05d5\\u05e0\\u05d9\\u05dd, \\u05e9\\u05db\\u05d9\\u05d7\\u05d5\\u05d9\\u05d5\\u05ea \\u05d5\\u05de\\u05de\\u05d5\\u05e6\\u05e2", 5),

    # Grade 6
    ("g6-ratio-percent", 6, "\\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd \\u05d5\\u05e4\\u05e2\\u05d5\\u05dc\\u05d5\\u05ea",
     "\\u05d9\\u05d7\\u05e1, \\u05e4\\u05e8\\u05d5\\u05e4\\u05d5\\u05e8\\u05e6\\u05d9\\u05d4 \\u05d5\\u05d0\\u05d7\\u05d5\\u05d6\\u05d9\\u05dd",
     "\\u05d7\\u05e9\\u05d9\\u05d1\\u05d4 \\u05e4\\u05e8\\u05d5\\u05e4\\u05d5\\u05e8\\u05e6\\u05d9\\u05d5\\u05e0\\u05d9\\u05ea, \\u05d0\\u05d7\\u05d5\\u05d6\\u05d9\\u05dd \\u05d5\\u05e7\\u05e9\\u05e8 \\u05dc\\u05e9\\u05d1\\u05e8\\u05d9\\u05dd", 1),
    ("g6-fractions-mul-div", 6, "\\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd \\u05d5\\u05e4\\u05e2\\u05d5\\u05dc\\u05d5\\u05ea",
     "\\u05db\\u05e4\\u05dc \\u05d5\\u05d7\\u05d9\\u05dc\\u05d5\\u05e7 \\u05e9\\u05d1\\u05e8\\u05d9\\u05dd",
     "\\u05db\\u05e4\\u05dc \\u05e9\\u05d1\\u05e8 \\u05d1\\u05e9\\u05d1\\u05e8, \\u05d7\\u05d9\\u05dc\\u05d5\\u05e7 \\u05e9\\u05d1\\u05e8\\u05d9\\u05dd, \\u05e9\\u05d1\\u05e8 \\u05db\\u05de\\u05e0\\u05ea \\u05d7\\u05d9\\u05dc\\u05d5\\u05e7", 2),
    ("g6-decimals-mul-div", 6, "\\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd \\u05d5\\u05e4\\u05e2\\u05d5\\u05dc\\u05d5\\u05ea",
     "\\u05db\\u05e4\\u05dc \\u05d5\\u05d7\\u05d9\\u05dc\\u05d5\\u05e7 \\u05e9\\u05d1\\u05e8\\u05d9\\u05dd \\u05e2\\u05e9\\u05e8\\u05d5\\u05e0\\u05d9\\u05d9\\u05dd",
     "\\u05db\\u05e4\\u05dc/\\u05d7\\u05d9\\u05dc\\u05d5\\u05e7 \\u05d1-10 \\u05d5-100, \\u05db\\u05e4\\u05dc \\u05d5\\u05d7\\u05d9\\u05dc\\u05d5\\u05e7 \\u05e9\\u05d1\\u05e8\\u05d9\\u05dd \\u05e2\\u05e9\\u05e8\\u05d5\\u05e0\\u05d9\\u05d9\\u05dd", 3),
    ("g6-number-sets", 6, "\\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd \\u05d5\\u05e4\\u05e2\\u05d5\\u05dc\\u05d5\\u05ea",
     "\\u05e7\\u05d1\\u05d5\\u05e6\\u05d5\\u05ea \\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd \\u05d5\\u05e1\\u05d3\\u05e8 \\u05e4\\u05e2\\u05d5\\u05dc\\u05d5\\u05ea",
     "\\u05d8\\u05d1\\u05e2\\u05d9\\u05d9\\u05dd, \\u05e9\\u05dc\\u05de\\u05d9\\u05dd \\u05d5\\u05e9\\u05d1\\u05e8\\u05d9\\u05dd; \\u05e1\\u05d3\\u05e8 \\u05e4\\u05e2\\u05d5\\u05dc\\u05d5\\u05ea \\u05d5\\u05e1\\u05d5\\u05d2\\u05e8\\u05d9\\u05d9\\u05dd", 4),
    ("g6-geometry", 6, "\\u05d2\\u05d0\\u05d5\\u05de\\u05d8\\u05e8\\u05d9\\u05d4 \\u05d5\\u05de\\u05d3\\u05d9\\u05d3\\u05d5\\u05ea",
     "\\u05de\\u05e2\\u05d2\\u05dc, \\u05e0\\u05e4\\u05d7 \\u05d5\\u05e9\\u05d8\\u05d7 \\u05e4\\u05e0\\u05d9\\u05dd",
     "\\u05d4\\u05d9\\u05e7\\u05e3 \\u05d5\\u05e9\\u05d8\\u05d7 \\u05e2\\u05d9\\u05d2\\u05d5\\u05dc, \\u05e0\\u05e4\\u05d7\\u05d9 \\u05d2\\u05d5\\u05e4\\u05d9\\u05dd \\u05d5\\u05e9\\u05d8\\u05d7 \\u05e4\\u05e0\\u05d9\\u05dd", 5),
    ("g6-data-prob", 6, "\\u05d7\\u05e7\\u05e8 \\u05e0\\u05ea\\u05d5\\u05e0\\u05d9\\u05dd",
     "\\u05d7\\u05e7\\u05e8 \\u05e0\\u05ea\\u05d5\\u05e0\\u05d9\\u05dd \\u05d5\\u05d4\\u05e1\\u05ea\\u05d1\\u05e8\\u05d5\\u05ea \\u05d1\\u05e1\\u05d9\\u05e1\\u05d9\\u05ea",
     "\\u05e4\\u05d9\\u05e8\\u05d5\\u05e9 \\u05d2\\u05e8\\u05e4\\u05d9\\u05dd \\u05d5\\u05d4\\u05e1\\u05ea\\u05d1\\u05e8\\u05d5\\u05ea \\u05e4\\u05e9\\u05d5\\u05d8\\u05d4 \\u05d1\\u05d4\\u05e7\\u05e9\\u05e8 \\u05d9\\u05d5\\u05de\\u05d9\\u05d5\\u05dd", 6),
]


def q(qid, topic, diff, text, options, correct, expl):
    return {
        "id": qid,
        "topic_id": topic,
        "difficulty": diff,
        "question_text": u(text),
        "options": [u(o) for o in options],
        "correct_index": correct,
        "explanation": u(expl),
    }


QUESTIONS = [
    q("q-g1-c20-1", "g1-count-20", 1, "\\u05db\\u05de\\u05d4 \\u05d6\\u05d4 $7+5$?", ["$12$", "$11$", "$13$", "$10$"], 0, "$7+5=12$."),
    q("q-g1-n100-1", "g1-numbers-100", 1, "\\u05d0\\u05d9\\u05d6\\u05d4 \\u05de\\u05e1\\u05e4\\u05e8 \\u05d2\\u05d3\\u05d5\\u05dc \\u05d9\\u05d5\\u05ea\\u05e8: $45$ \\u05d0\\u05d5 $54$?", ["$54$", "$45$", "\\u05e9\\u05d5\\u05d5\\u05d9\\u05dd", "$40$"], 0, "$54>45$."),
    q("q-g1-as-1", "g1-add-sub-20", 1, "\\u05de\\u05d4\\u05d5 $15-6$?", ["$9$", "$8$", "$10$", "$21$"], 0, "$15-6=9$."),
    q("q-g1-sh-1", "g1-shapes", 1, "\\u05dc\\u05e6\\u05d5\\u05e8\\u05d4 \\u05e2\\u05dd 3 \\u05e6\\u05dc\\u05e2\\u05d5\\u05ea \\u05e7\\u05d5\\u05e8\\u05d0\\u05d9\\u05dd:",
      ["\\u05de\\u05e9\\u05d5\\u05dc\\u05e9", "\\u05e8\\u05d9\\u05d1\\u05d5\\u05e2", "\\u05de\\u05dc\\u05d1\\u05df", "\\u05e2\\u05d9\\u05d2\\u05d5\\u05dc"], 0, "\\u05de\\u05e9\\u05d5\\u05dc\\u05e9 \\u05d9\\u05e9 \\u05dc\\u05d5 3 \\u05e6\\u05dc\\u05e2\\u05d5\\u05ea."),
    q("q-g1-m-1", "g1-measure", 1, "\\u05d0\\u05d9\\u05d6\\u05d4 \\u05d0\\u05e8\\u05d5\\u05da \\u05d9\\u05d5\\u05ea\\u05e8: $3$ \\u05e7\\u05d5\\u05d1\\u05d9\\u05d5\\u05ea \\u05d0\\u05d5 $5$ \\u05e7\\u05d5\\u05d1\\u05d9\\u05d5\\u05ea?",
      ["$5$ \\u05e7\\u05d5\\u05d1\\u05d9\\u05d5\\u05ea", "$3$ \\u05e7\\u05d5\\u05d1\\u05d9\\u05d5\\u05ea", "\\u05e9\\u05d5\\u05d5\\u05d4", "\\u05dc\\u05d0 \\u05e0\\u05d9\\u05ea\\u05df \\u05dc\\u05d3\\u05e2\\u05ea"], 0, "$5>3$."),

    q("q-g2-n-1", "g2-numbers-1000", 1, "\\u05de\\u05d4\\u05d5 $300+40+2$?", ["$342$", "$324$", "$432$", "$302$"], 0, "$300+40+2=342$."),
    q("q-g2-as-1", "g2-add-sub-100", 2, "\\u05de\\u05d4\\u05d5 $48+25$?", ["$73$", "$63$", "$83$", "$70$"], 0, "$48+25=73$."),
    q("q-g2-md-1", "g2-mul-div-intro", 2, "\\u05de\\u05d4\\u05d5 $4\\times 5$?", ["$20$", "$9$", "$15$", "$25$"], 0, "$4\\times 5=20$."),
    q("q-g2-fr-1", "g2-fractions-half", 2, "\\u05d7\\u05e6\\u05d9 \\u05de-$8$ \\u05d4\\u05d5\\u05d0:", ["$4$", "$2$", "$6$", "$3$"], 0, "$8:2=4$."),
    q("q-g2-sm-1", "g2-shapes-measure", 1, "\\u05de\\u05dc\\u05d1\\u05df \\u05d1\\u05d0\\u05d5\\u05e8\\u05da $5$ \\u05e1\\\"\\u05de \\u05d5\\u05e8\\u05d5\\u05d7\\u05d1 $3$ \\u05e1\\\"\\u05de. \\u05d4\\u05d9\\u05e7\\u05e4\\u05d5:",
      ["$16$ \\u05e1\\\"\\u05de", "$15$ \\u05e1\\\"\\u05de", "$8$ \\u05e1\\\"\\u05de", "$20$ \\u05e1\\\"\\u05de"], 0, "$2(5+3)=16$."),
    q("q-g2-d-1", "g2-data", 1, "\\u05d1\\u05d8\\u05d1\\u05dc\\u05d4: \\u05d0\\u05d3\\u05d5\\u05de\\u05d9\\u05dd=$3$, \\u05d1\\u05e0\\u05d5\\u05ea=$5$. \\u05db\\u05de\\u05d4 \\u05d9\\u05dc\\u05d3\\u05d9\\u05dd \\u05d1\\u05e1\\u05d4\\\"\\u05db?",
      ["$8$", "$5$", "$3$", "$2$"], 0, "$3+5=8$."),

    q("q-g3-n-1", "g3-numbers-10000", 2, "\\u05e2\\u05d2\\u05dc \\u05d0\\u05ea $3{,}642$ \\u05dc\\u05e2\\u05e9\\u05e8\\u05d5\\u05ea \\u05d4\\u05e7\\u05e8\\u05d5\\u05d1\\u05d5\\u05ea:",
      ["$3{,}600$", "$3{,}640$", "$3{,}700$", "$4{,}000$"], 0, "$42<50$ \\u05dc\\u05db\\u05df \\u05e2\\u05d2\\u05dc\\u05d9\\u05dd \\u05db\\u05dc\\u05e4\\u05d9 \\u05dc-$3{,}600$."),
    q("q-g3-as-1", "g3-add-sub-large", 2, "\\u05de\\u05d4\\u05d5 $1{,}250+730$?", ["$1{,}980$", "$1{,}880$", "$2{,}000$", "$1{,}950$"], 0, "$1250+730=1980$."),
    q("q-g3-md-1", "g3-mul-div-100", 2, "\\u05de\\u05d4\\u05d5 $7\\times 8$?", ["$56$", "$54$", "$63$", "$48$"], 0, "$7\\times 8=56$."),
    q("q-g3-fr-1", "g3-fractions-unit", 2, "\\u05d0\\u05d9\\u05d6\\u05d4 \\u05e9\\u05d1\\u05e8 \\u05d2\\u05d3\\u05d5\\u05dc \\u05d9\\u05d5\\u05ea\\u05e8: $\\frac{1}{2}$ \\u05d0\\u05d5 $\\frac{1}{5}$?",
      ["$\\frac{1}{2}$", "$\\frac{1}{5}$", "\\u05e9\\u05d5\\u05d5\\u05d9\\u05dd", "$\\frac{1}{10}$"], 0, "\\u05db\\u05db\\u05dc \\u05e9\\u05d4\\u05de\\u05db\\u05e0\\u05d4 \\u05e7\\u05d8\\u05df \\u05d9\\u05d5\\u05ea\\u05e8 \\u2014 \\u05d4\\u05e9\\u05d1\\u05e8 \\u05d2\\u05d3\\u05d5\\u05dc \\u05d9\\u05d5\\u05ea\\u05e8."),
    q("q-g3-geo-1", "g3-geometry", 2, "\\u05d6\\u05d5\\u05d5\\u05d9\\u05ea \\u05d9\\u05e9\\u05e8\\u05d4 \\u05d4\\u05d9\\u05d0:",
      ["$90^\\circ$", "$45^\\circ$", "$180^\\circ$", "$60^\\circ$"], 0, "\\u05d6\\u05d5\\u05d5\\u05d9\\u05ea \\u05d9\\u05e9\\u05e8\\u05d4 = $90^\\circ$."),
    q("q-g3-ar-1", "g3-area", 2, "\\u05e9\\u05d8\\u05d7 \\u05de\\u05dc\\u05d1\\u05df $6\\times 4$:",
      ["$24$", "$20$", "$10$", "$18$"], 0, "$6\\cdot 4=24$."),

    q("q-g4-ln-1", "g4-large-numbers", 2, "\\u05de\\u05d4\\u05d5 $25\\times 4$?", ["$100$", "$50$", "$125$", "$80$"], 0, "$25\\times 4=100$."),
    q("q-g4-fr-1", "g4-fractions-ops", 3, "\\u05de\\u05d4\\u05d5 $\\frac{1}{4}+\\frac{2}{4}$?",
      ["$\\frac{3}{4}$", "$\\frac{3}{8}$", "$\\frac{1}{2}$", "$1$"], 0, "$\\frac{1+2}{4}=\\frac{3}{4}$."),
    q("q-g4-dec-1", "g4-decimals-intro", 2, "\\u05d0\\u05d9\\u05d6\\u05d4 \\u05d2\\u05d3\\u05d5\\u05dc \\u05d9\\u05d5\\u05ea\\u05e8: $0.7$ \\u05d0\\u05d5 $0.35$?",
      ["$0.7$", "$0.35$", "\\u05e9\\u05d5\\u05d5\\u05d9\\u05dd", "$0.03$"], 0, "$0.70>0.35$."),
    q("q-g4-geo-1", "g4-geometry", 2, "\\u05d4\\u05d9\\u05e7\\u05e3 \\u05e8\\u05d9\\u05d1\\u05d5\\u05e2 \\u05e2\\u05dd \\u05e6\\u05dc\\u05e2 $6$:",
      ["$24$", "$36$", "$12$", "$18$"], 0, "$4\\times 6=24$."),
    q("q-g4-da-1", "g4-data", 2, "\\u05d1\\u05d2\\u05e8\\u05e3 \\u05e2\\u05de\\u05d5\\u05d3\\u05d5\\u05ea: \\u05d0=$2$, \\u05d1=$5$, \\u05d2=$3$. \\u05de\\u05d9 \\u05d4\\u05db\\u05d9 \\u05d2\\u05d1\\u05d5\\u05d4?",
      ["\\u05d1", "\\u05d0", "\\u05d2", "\\u05e9\\u05d5\\u05d5\\u05d4"], 0, "$5$ \\u05d4\\u05d5\\u05d0 \\u05d4\\u05d2\\u05d1\\u05d5\\u05d4 \\u05d1\\u05d9\\u05d5\\u05ea\\u05e8."),

    q("q-g5-fr-1", "g5-fractions-adv", 3, "\\u05e6\\u05de\\u05e6\\u05de\\u05d5: $\\frac{6}{8}$",
      ["$\\frac{3}{4}$", "$\\frac{6}{4}$", "$\\frac{2}{8}$", "$\\frac{4}{6}$"], 0, "\\u05d7\\u05d9\\u05dc\\u05d5\\u05e7 \\u05d1-$2$: $\\frac{3}{4}$."),
    q("q-g5-dec-1", "g5-decimals-ops", 3, "\\u05de\\u05d4\\u05d5 $1.5+0.25$?",
      ["$1.75$", "$1.55$", "$1.7$", "$2.5$"], 0, "$1.50+0.25=1.75$."),
    q("q-g5-md-1", "g5-mul-div-adv", 3, "\\u05de\\u05d4\\u05d5 $144:12$?",
      ["$12$", "$10$", "$14$", "$24$"], 0, "$12\\times 12=144$."),
    q("q-g5-geo-1", "g5-geometry", 3, "\\u05e0\\u05e4\\u05d7 \\u05ea\\u05d9\\u05d1\\u05d4 $3\\times 4\\times 5$:",
      ["$60$", "$12$", "$45$", "$30$"], 0, "$3\\cdot 4\\cdot 5=60$."),
    q("q-g5-da-1", "g5-data", 2, "\\u05d4\\u05de\\u05de\\u05d5\\u05e6\\u05e2 \\u05e9\\u05dc $10,20,30$:",
      ["$20$", "$15$", "$30$", "$60$"], 0, "$(10+20+30)/3=20$."),

    q("q-g6-rp-1", "g6-ratio-percent", 3, "\\u05de\\u05d4\\u05d5 $25\\%$ \\u05de-$80$?",
      ["$20$", "$25$", "$40$", "$16$"], 0, "$0.25\\times 80=20$."),
    q("q-g6-fr-1", "g6-fractions-mul-div", 3, "\\u05de\\u05d4\\u05d5 $\\frac{2}{3}\\times\\frac{3}{4}$?",
      ["$\\frac{1}{2}$", "$\\frac{5}{7}$", "$\\frac{6}{12}$", "$\\frac{2}{4}$"], 0, "$\\frac{2\\cdot 3}{3\\cdot 4}=\\frac{6}{12}=\\frac{1}{2}$."),
    q("q-g6-dec-1", "g6-decimals-mul-div", 3, "\\u05de\\u05d4\\u05d5 $0.6\\times 0.5$?",
      ["$0.3$", "$0.11$", "$3$", "$0.03$"], 0, "$0.6\\times 0.5=0.30=0.3$."),
    q("q-g6-ns-1", "g6-number-sets", 2, "\\u05de\\u05d4\\u05d5 $3+(4\\times 2)$?",
      ["$11$", "$14$", "$10$", "$24$"], 0, "\\u05e1\\u05d3\\u05e8 \\u05e4\\u05e2\\u05d5\\u05dc\\u05d5\\u05ea: $3+8=11$."),
    q("q-g6-geo-1", "g6-geometry", 3, "\\u05d4\\u05d9\\u05e7\\u05e3 \\u05e2\\u05d9\\u05d2\\u05d5\\u05dc \\u05e2\\u05dd \\u05e8\\u05d3\\u05d9\\u05d5\\u05e1 $7$ (\\u05d4\\u05e9\\u05ea\\u05de\\u05e9\\u05d5 $\\pi$):",
      ["$14\\pi$", "$49\\pi$", "$7\\pi$", "$21\\pi$"], 0, "$2\\pi r=14\\pi$."),
    q("q-g6-dp-1", "g6-data-prob", 2, "\\u05e7\\u05d5\\u05d1\\u05d9\\u05d9\\u05d4 \\u05d4\\u05d5\\u05d2\\u05e0\\u05ea: $P(6)$?",
      ["$\\dfrac{1}{6}$", "$\\dfrac{1}{2}$", "$\\dfrac{1}{3}$", "$1$"], 0, "\\u05ea\\u05d5\\u05e6\\u05d0\\u05d4 \\u05d0\\u05d7\\u05ea \\u05de\\u05ea\\u05d5\\u05da \\u05e9\\u05e9."),
]


def main():
    topics = []
    for tid, grade, cluster, title, desc, order in TOPICS:
        topics.append({
            "id": tid,
            "grade": grade,
            "units": None,
            "track": None,
            "cluster": u(cluster),
            "title": u(title),
            "description": u(desc),
            "sortOrder": order,
        })

    out_topics = ROOT / "src/data/curriculum/elementarySchool.js"
    body = "export const ELEMENTARY_TOPICS = " + json.dumps(topics, ensure_ascii=False, indent=2) + ";\n\n"
    body += """export function getElementaryTopics(grade) {
  const g = Number(grade);
  return ELEMENTARY_TOPICS.filter((t) => t.grade === g).sort((a, b) => a.sortOrder - b.sortOrder);
}
"""
    header = u("/** \\u05ea\\u05d5\\u05db\\u05e0\\u05d9\\u05ea \\u05dc\\u05d9\\u05de\\u05d5\\u05d3\\u05d9\\u05dd \\u2014 \\u05d9\\u05e1\\u05d5\\u05d3\\u05d9 \\u05d0'\\u2013\\u05d5' (\\u05de\\u05e9\\u05e8\\u05d3 \\u05d4\\u05d7\\u05d9\\u05e0\\u05d5\\u05da) */\n\n")
    out_topics.write_text(header + body, encoding="utf-8")

    out_q = ROOT / "src/data/questions/elementaryQuestions.js"
    qbody = "export const ELEMENTARY_QUESTIONS = " + json.dumps(QUESTIONS, ensure_ascii=False, indent=2) + ";\n\n"
    qbody += """export function getElementaryQuestionsForTopic(topicId) {
  return ELEMENTARY_QUESTIONS.filter((q) => q.topic_id === topicId);
}
"""
    out_q.write_text(u("/** \\u05e9\\u05d0\\u05dc\\u05d5\\u05ea \\u05d9\\u05e1\\u05d5\\u05d3\\u05d9 */\n\n") + qbody, encoding="utf-8")

    missing = [t["id"] for t in topics if not any(q["topic_id"] == t["id"] for q in QUESTIONS)]
    print(f"topics={len(topics)} questions={len(QUESTIONS)} missing={missing}")
    for g in range(1, 7):
        n = sum(1 for t in topics if t["grade"] == g)
        print(f"  grade {g}: {n} topics")


if __name__ == "__main__":
    main()
