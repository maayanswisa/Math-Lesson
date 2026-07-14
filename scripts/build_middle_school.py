# -*- coding: utf-8 -*-

"""Build middle-school curriculum + starter questions (UTF-8)."""

from pathlib import Path

import json

import re



ROOT = Path(__file__).resolve().parents[1]





def u(s: str) -> str:

    # Only decode \uXXXX; leave LaTeX backslashes alone

    return re.sub(r"\\u([0-9a-fA-F]{4})", lambda m: chr(int(m.group(1), 16)), s)





# Topics: (id, grade, track|None, cluster, title, description, sort)

# track: None for grades 7-8; 'regular'/'reduced' for grade 9

RAW_TOPICS = [

    # ---- Grade 7 ----

    ("g7-signed", 7, None, "\\u05ea\\u05d7\\u05d5\\u05dd \\u05de\\u05e1\\u05e4\\u05e8\\u05d9",

     "\\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd \\u05de\\u05db\\u05d5\\u05d5\\u05e0\\u05d9\\u05dd \\u05d5\\u05e4\\u05e2\\u05d5\\u05dc\\u05d5\\u05ea",

     "\\u05e6\\u05d9\\u05e8 \\u05d4\\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd, \\u05d7\\u05d9\\u05d1\\u05d5\\u05e8 \\u05d5\\u05db\\u05e4\\u05dc \\u05e9\\u05dc \\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd \\u05e9\\u05dc\\u05d9\\u05dc\\u05d9\\u05d9\\u05dd", 1),

    ("g7-order-powers", 7, None, "\\u05ea\\u05d7\\u05d5\\u05dd \\u05de\\u05e1\\u05e4\\u05e8\\u05d9",

     "\\u05e1\\u05d3\\u05e8 \\u05e4\\u05e2\\u05d5\\u05dc\\u05d5\\u05ea \\u05d5\\u05d7\\u05d6\\u05e7\\u05d5\\u05ea",

     "\\u05e1\\u05d3\\u05e8 \\u05e4\\u05e2\\u05d5\\u05dc\\u05d5\\u05ea \\u05d4\\u05d7\\u05e9\\u05d1\\u05d5\\u05df \\u05d5\\u05d7\\u05d6\\u05e7\\u05d5\\u05ea \\u05e9\\u05dc \\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd \\u05de\\u05db\\u05d5\\u05d5\\u05e0\\u05d9\\u05dd", 2),

    ("g7-algebra-expr", 7, None, "\\u05d0\\u05dc\\u05d2\\u05d1\\u05e8\\u05d4",

     "\\u05de\\u05e9\\u05ea\\u05e0\\u05d9\\u05dd \\u05d5\\u05d1\\u05d9\\u05d8\\u05d5\\u05d9\\u05d9\\u05dd \\u05d0\\u05dc\\u05d2\\u05d1\\u05e8\\u05d9\\u05d9\\u05dd",

     "\\u05ea\\u05d1\\u05e0\\u05d9\\u05d5\\u05ea, \\u05d4\\u05e6\\u05d1\\u05d4, \\u05db\\u05d9\\u05e0\\u05d5\\u05e1 \\u05d0\\u05d9\\u05d1\\u05e8\\u05d9\\u05dd \\u05d3\\u05d5\\u05de\\u05d9\\u05dd \\u05d5\\u05d4\\u05e9\\u05de\\u05d8\\u05ea \\u05e1\\u05d5\\u05d2\\u05e8\\u05d9\\u05d9\\u05dd", 3),

    ("g7-equations", 7, None, "\\u05d0\\u05dc\\u05d2\\u05d1\\u05e8\\u05d4",

     "\\u05de\\u05e9\\u05d5\\u05d5\\u05d0\\u05d5\\u05ea \\u05de\\u05de\\u05e2\\u05dc\\u05d4 \\u05e8\\u05d0\\u05e9\\u05d5\\u05e0\\u05d4",

     "\\u05e4\\u05ea\\u05e8\\u05d5\\u05df \\u05de\\u05e9\\u05d5\\u05d5\\u05d0\\u05d5\\u05ea \\u05d5\\u05e9\\u05d0\\u05dc\\u05d5\\u05ea \\u05de\\u05d9\\u05dc\\u05d5\\u05dc\\u05d9\\u05d5\\u05ea \\u05e4\\u05e9\\u05d5\\u05d8\\u05d5\\u05ea", 4),

    ("g7-functions-intro", 7, None, "\\u05d0\\u05dc\\u05d2\\u05d1\\u05e8\\u05d4",

     "\\u05de\\u05d1\\u05d5\\u05d0 \\u05dc\\u05e4\\u05d5\\u05e0\\u05e7\\u05e6\\u05d9\\u05d5\\u05ea",

     "\\u05de\\u05d4\\u05d9 \\u05e4\\u05d5\\u05e0\\u05e7\\u05e6\\u05d9\\u05d4, \\u05d9\\u05d9\\u05e6\\u05d5\\u05d2\\u05d9\\u05dd \\u05d5\\u05e7\\u05e8\\u05d9\\u05d0\\u05ea \\u05d2\\u05e8\\u05e4\\u05d9\\u05dd \\u05e4\\u05e9\\u05d5\\u05d8\\u05d9\\u05dd", 5),

    ("g7-coordinates", 7, None, "\\u05d2\\u05d0\\u05d5\\u05de\\u05d8\\u05e8\\u05d9\\u05d4",

     "\\u05de\\u05e2\\u05e8\\u05db\\u05ea \\u05e6\\u05d9\\u05e8\\u05d9\\u05dd",

     "\\u05e0\\u05e7\\u05d5\\u05d3\\u05d5\\u05ea \\u05d1\\u05de\\u05d9\\u05e9\\u05d5\\u05e8, \\u05e8\\u05d1\\u05e2\\u05d9\\u05dd \\u05d5\\u05e6\\u05d9\\u05d5\\u05e8 \\u05e0\\u05e7\\u05d5\\u05d3\\u05d5\\u05ea \\u05e4\\u05e9\\u05d5\\u05d8\\u05d5\\u05ea", 6),

    ("g7-angles-triangles", 7, None, "\\u05d2\\u05d0\\u05d5\\u05de\\u05d8\\u05e8\\u05d9\\u05d4",

     "\\u05d6\\u05d5\\u05d5\\u05d9\\u05d5\\u05ea \\u05d5\\u05de\\u05e9\\u05d5\\u05dc\\u05e9\\u05d9\\u05dd",

     "\\u05d6\\u05d5\\u05d5\\u05d9\\u05d5\\u05ea \\u05e6\\u05de\\u05d5\\u05d3\\u05d5\\u05ea/\\u05e7\\u05d5\\u05d3\\u05e7\\u05d5\\u05d3\\u05d9\\u05d5\\u05ea, \\u05e1\\u05db\\u05d5\\u05dd \\u05d6\\u05d5\\u05d5\\u05d9\\u05d5\\u05ea \\u05d1\\u05de\\u05e9\\u05d5\\u05dc\\u05e9", 7),

    ("g7-area-perimeter", 7, None, "\\u05d2\\u05d0\\u05d5\\u05de\\u05d8\\u05e8\\u05d9\\u05d4",

     "\\u05e9\\u05d8\\u05d7\\u05d9\\u05dd \\u05d5\\u05d4\\u05d9\\u05e7\\u05e4\\u05d9\\u05dd",

     "\\u05de\\u05dc\\u05d1\\u05df, \\u05de\\u05e9\\u05d5\\u05dc\\u05e9, \\u05de\\u05e7\\u05d1\\u05d9\\u05dc\\u05d9\\u05ea, \\u05d8\\u05e8\\u05e4\\u05d6 \\u05d5\\u05de\\u05e2\\u05d2\\u05dc", 8),



    # ---- Grade 8 ----

    ("g8-linear-fn", 8, None, "\\u05d0\\u05dc\\u05d2\\u05d1\\u05e8\\u05d4",

     "\\u05e4\\u05d5\\u05e0\\u05e7\\u05e6\\u05d9\\u05d4 \\u05e7\\u05d5\\u05d5\\u05d9\\u05ea",

     "\\u05e9\\u05d9\\u05e4\\u05d5\\u05e2, \\u05d7\\u05d9\\u05ea\\u05d5\\u05da \\u05e2\\u05dd \\u05d4\\u05e6\\u05d9\\u05e8\\u05d9\\u05dd \\u05d5\\u05d9\\u05d9\\u05e6\\u05d5\\u05d2\\u05d9\\u05dd \\u05e9\\u05dc $y=mx+b$", 1),

    ("g8-equations-system", 8, None, "\\u05d0\\u05dc\\u05d2\\u05d1\\u05e8\\u05d4",

     "\\u05de\\u05e9\\u05d5\\u05d5\\u05d0\\u05d5\\u05ea \\u05d5\\u05de\\u05e2\\u05e8\\u05db\\u05ea \\u05de\\u05e9\\u05d5\\u05d5\\u05d0\\u05d5\\u05ea",

     "\\u05de\\u05e9\\u05d5\\u05d5\\u05d0\\u05d5\\u05ea \\u05e2\\u05dd \\u05de\\u05db\\u05e0\\u05d9\\u05dd \\u05d5\\u05e9\\u05ea\\u05d9 \\u05de\\u05e9\\u05d5\\u05d5\\u05d0\\u05d5\\u05ea \\u05e2\\u05dd \\u05e9\\u05e0\\u05d9 \\u05e0\\u05e2\\u05dc\\u05de\\u05d9\\u05dd", 2),

    ("g8-factoring", 8, None, "\\u05d0\\u05dc\\u05d2\\u05d1\\u05e8\\u05d4",

     "\\u05e4\\u05d9\\u05e8\\u05d5\\u05e7 \\u05dc\\u05d2\\u05d5\\u05e8\\u05de\\u05d9\\u05dd",

     "\\u05d4\\u05d5\\u05e6\\u05d0\\u05ea \\u05d2\\u05d5\\u05e8\\u05dd \\u05de\\u05e9\\u05d5\\u05ea\\u05e3 \\u05d5\\u05e4\\u05d9\\u05e8\\u05d5\\u05e7 \\u05d1\\u05e1\\u05d9\\u05e1\\u05d9", 3),

    ("g8-percent", 8, None, "\\u05ea\\u05d7\\u05d5\\u05dd \\u05de\\u05e1\\u05e4\\u05e8\\u05d9",

     "\\u05d0\\u05d7\\u05d5\\u05d6\\u05d9\\u05dd",

     "\\u05d7\\u05d9\\u05e9\\u05d5\\u05d1\\u05d9 \\u05d0\\u05d7\\u05d5\\u05d6\\u05d9\\u05dd, \\u05d4\\u05e0\\u05d7\\u05d5\\u05ea \\u05d5\\u05d4\\u05e1\\u05e4\\u05d5\\u05ea \\u05d1\\u05d4\\u05e7\\u05e9\\u05e8 \\u05de\\u05e6\\u05d9\\u05d0\\u05d5\\u05ea\\u05d9", 4),

    ("g8-stats-prob", 8, None, "\\u05ea\\u05d7\\u05d5\\u05dd \\u05de\\u05e1\\u05e4\\u05e8\\u05d9",

     "\\u05e1\\u05d8\\u05d8\\u05d9\\u05e1\\u05d8\\u05d9\\u05e7\\u05d4 \\u05d5\\u05d4\\u05e1\\u05ea\\u05d1\\u05e8\\u05d5\\u05ea",

     "\\u05de\\u05d3\\u05d3\\u05d9 \\u05de\\u05e8\\u05db\\u05d6, \\u05d8\\u05d1\\u05dc\\u05d0\\u05d5\\u05ea \\u05e9\\u05db\\u05d9\\u05d7\\u05d5\\u05ea \\u05d5\\u05d4\\u05e1\\u05ea\\u05d1\\u05e8\\u05d5\\u05ea \\u05d1\\u05e1\\u05d9\\u05e1\\u05d9\\u05ea", 5),

    ("g8-congruence", 8, None, "\\u05d2\\u05d0\\u05d5\\u05de\\u05d8\\u05e8\\u05d9\\u05d4",

     "\\u05d7\\u05e4\\u05d9\\u05e4\\u05ea \\u05de\\u05e9\\u05d5\\u05dc\\u05e9\\u05d9\\u05dd",

     "\\u05de\\u05e9\\u05e4\\u05d8\\u05d9 \\u05d7\\u05e4\\u05d9\\u05e4\\u05d4 \\u05d5\\u05d4\\u05ea\\u05d7\\u05dc\\u05ea \\u05d4\\u05d5\\u05db\\u05d7\\u05d4 \\u05d2\\u05d0\\u05d5\\u05de\\u05d8\\u05e8\\u05d9\\u05ea", 6),

    ("g8-similarity", 8, None, "\\u05d2\\u05d0\\u05d5\\u05de\\u05d8\\u05e8\\u05d9\\u05d4",

     "\\u05d3\\u05de\\u05d9\\u05d5\\u05df \\u05de\\u05e9\\u05d5\\u05dc\\u05e9\\u05d9\\u05dd",

     "\\u05d9\\u05d7\\u05e1 \\u05d3\\u05de\\u05d9\\u05d5\\u05df, \\u05d6\\u05d5\\u05d5\\u05d9\\u05d5\\u05ea \\u05e9\\u05d5\\u05d5\\u05d5\\u05ea \\u05d5\\u05d9\\u05d9\\u05e9\\u05d5\\u05de\\u05d9\\u05dd", 7),

    ("g8-pythagoras", 8, None, "\\u05d2\\u05d0\\u05d5\\u05de\\u05d8\\u05e8\\u05d9\\u05d4",

     "\\u05de\\u05e9\\u05e4\\u05d8 \\u05e4\\u05d9\\u05ea\\u05d2\\u05d5\\u05e8\\u05e1",

     "\\u05de\\u05e9\\u05d5\\u05dc\\u05e9 \\u05d9\\u05e9\\u05e8-\\u05d6\\u05d5\\u05d5\\u05d9\\u05ea, \\u05d7\\u05d9\\u05e9\\u05d5\\u05d1 \\u05e6\\u05dc\\u05e2\\u05d5\\u05ea \\u05d5\\u05e9\\u05d8\\u05d7\\u05d9\\u05dd", 8),

    ("g8-circle", 8, None, "\\u05d2\\u05d0\\u05d5\\u05de\\u05d8\\u05e8\\u05d9\\u05d4",

     "\\u05d4\\u05de\\u05e2\\u05d2\\u05dc \\u05d5\\u05d4\\u05e2\\u05d9\\u05d2\\u05d5\\u05dc",

     "\\u05e8\\u05d3\\u05d9\\u05d5\\u05e1, \\u05e7\\u05d8\\u05e8, \\u05d4\\u05d9\\u05e7\\u05e3 \\u05d5\\u05e9\\u05d8\\u05d7", 9),



    # ---- Grade 9 regular ----

    ("g9r-powers", 9, "regular", "\\u05d0\\u05dc\\u05d2\\u05d1\\u05e8\\u05d4",

     "\\u05d7\\u05d5\\u05e7\\u05d9 \\u05d7\\u05d6\\u05e7\\u05d5\\u05ea \\u05d5\\u05db\\u05ea\\u05d9\\u05d1 \\u05de\\u05d3\\u05e2\\u05d9",

     "\\u05d7\\u05d5\\u05e7\\u05d9 \\u05d7\\u05d6\\u05e7\\u05d5\\u05ea \\u05d5\\u05db\\u05ea\\u05d9\\u05d1\\u05d4 \\u05de\\u05d3\\u05e2\\u05d9\\u05ea \\u05e9\\u05dc \\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd", 1),

    ("g9r-factor-expand", 9, "regular", "\\u05d0\\u05dc\\u05d2\\u05d1\\u05e8\\u05d4",

     "\\u05e0\\u05d5\\u05e1\\u05d7\\u05d0\\u05d5\\u05ea \\u05d4\\u05db\\u05e4\\u05dc \\u05d4\\u05de\\u05e7\\u05d5\\u05e6\\u05e8 \\u05d5\\u05e4\\u05d9\\u05e8\\u05d5\\u05e7",

     "\\u05e0\\u05d5\\u05e1\\u05d7\\u05d0\\u05d5\\u05ea \\u05db\\u05e4\\u05dc \\u05de\\u05e7\\u05d5\\u05e6\\u05e8, \\u05d8\\u05e8\\u05d9\\u05e0\\u05d5\\u05dd \\u05d5\\u05e6\\u05de\\u05e6\\u05d5\\u05dd \\u05e9\\u05d1\\u05e8\\u05d9\\u05dd", 2),

    ("g9r-quad-eq", 9, "regular", "\\u05d0\\u05dc\\u05d2\\u05d1\\u05e8\\u05d4",

     "\\u05de\\u05e9\\u05d5\\u05d5\\u05d0\\u05d5\\u05ea \\u05e8\\u05d9\\u05d1\\u05d5\\u05e2\\u05d9\\u05d5\\u05ea",

     "\\u05e4\\u05ea\\u05e8\\u05d5\\u05df \\u05de\\u05e9\\u05d5\\u05d5\\u05d0\\u05d5\\u05ea \\u05e8\\u05d9\\u05d1\\u05d5\\u05e2\\u05d9\\u05d5\\u05ea \\u05d5\\u05de\\u05e2\\u05e8\\u05db\\u05d5\\u05ea \\u05de\\u05e9\\u05d5\\u05d5\\u05d0\\u05d5\\u05ea", 3),

    ("g9r-quadratic-fn", 9, "regular", "\\u05e4\\u05d5\\u05e0\\u05e7\\u05e6\\u05d9\\u05d5\\u05ea",

     "\\u05d4\\u05e4\\u05d5\\u05e0\\u05e7\\u05e6\\u05d9\\u05d4 \\u05d4\\u05e8\\u05d9\\u05d1\\u05d5\\u05e2\\u05d9\\u05ea",

     "\\u05e4\\u05e8\\u05d1\\u05d5\\u05dc\\u05d4, \\u05e7\\u05d5\\u05d3\\u05e7\\u05d5\\u05d3, \\u05d9\\u05d9\\u05e6\\u05d5\\u05d2 \\u05e1\\u05d8\\u05e0\\u05d3\\u05e8\\u05d8\\u05d9/\\u05e7\\u05d5\\u05d3\\u05e7\\u05d5\\u05d3\\u05d9 \\u05d5\\u05d7\\u05e7\\u05d9\\u05e8\\u05d4", 4),

    ("g9r-inequalities", 9, "regular", "\\u05d0\\u05dc\\u05d2\\u05d1\\u05e8\\u05d4",

     "\\u05d0\\u05d9-\\u05e9\\u05d5\\u05d5\\u05d9\\u05d5\\u05e0\\u05d5\\u05ea",

     "\\u05d0\\u05d9-\\u05e9\\u05d5\\u05d5\\u05d9\\u05d5\\u05e0\\u05d5\\u05ea \\u05dc\\u05d9\\u05e0\\u05d0\\u05e8\\u05d9\\u05d9\\u05dd \\u05d5\\u05e8\\u05d9\\u05d1\\u05d5\\u05e2\\u05d9\\u05d9\\u05dd \\u05d1\\u05e1\\u05d9\\u05e1\\u05d9\\u05d9\\u05dd", 5),

    ("g9r-geometry", 9, "regular", "\\u05d2\\u05d0\\u05d5\\u05de\\u05d8\\u05e8\\u05d9\\u05d4",

     "\\u05d2\\u05d0\\u05d5\\u05de\\u05d8\\u05e8\\u05d9\\u05d4 \\u2014 \\u05de\\u05e8\\u05d5\\u05d1\\u05e2\\u05d9\\u05dd \\u05d5\\u05de\\u05e9\\u05d5\\u05dc\\u05e9\\u05d9\\u05dd",

     "\\u05de\\u05e7\\u05d1\\u05d9\\u05dc\\u05d9\\u05ea, \\u05de\\u05dc\\u05d1\\u05df, \\u05e8\\u05d9\\u05d1\\u05d5\\u05e2, \\u05d8\\u05e8\\u05e4\\u05d6, \\u05e7\\u05d8\\u05e2 \\u05d0\\u05de\\u05e6\\u05e2\\u05d9\\u05dd \\u05d5\\u05e4\\u05d9\\u05ea\\u05d2\\u05d5\\u05e8\\u05e1", 6),

    ("g9r-probability", 9, "regular", "\\u05ea\\u05d7\\u05d5\\u05dd \\u05de\\u05e1\\u05e4\\u05e8\\u05d9",

     "\\u05d4\\u05e1\\u05ea\\u05d1\\u05e8\\u05d5\\u05ea",

     "\\u05de\\u05d0\\u05d5\\u05e8\\u05e2\\u05d5\\u05ea, \\u05de\\u05e8\\u05d7\\u05d1 \\u05de\\u05d3\\u05d2\\u05de\\u05d9 \\u05d5\\u05d4\\u05e1\\u05ea\\u05d1\\u05e8\\u05d5\\u05ea \\u05e7\\u05dc\\u05d0\\u05e1\\u05d9\\u05ea", 7),



    # ---- Grade 9 reduced ----

    ("g9x-linear", 9, "reduced", "\\u05e4\\u05d5\\u05e0\\u05e7\\u05e6\\u05d9\\u05d5\\u05ea",

     "\\u05e4\\u05d5\\u05e0\\u05e7\\u05e6\\u05d9\\u05d4 \\u05e7\\u05d5\\u05d5\\u05d9\\u05ea",

     "\\u05d2\\u05e8\\u05e3, \\u05e9\\u05d9\\u05e4\\u05d5\\u05e2 \\u05d5\\u05d9\\u05d9\\u05e9\\u05d5\\u05de\\u05d9\\u05dd \\u05de\\u05e6\\u05d9\\u05d0\\u05d5\\u05ea\\u05d9\\u05d9\\u05dd (\\u05e8\\u05de\\u05d4 \\u05de\\u05e6\\u05d5\\u05de\\u05e6\\u05de\\u05ea)", 1),

    ("g9x-quadratic", 9, "reduced", "\\u05e4\\u05d5\\u05e0\\u05e7\\u05e6\\u05d9\\u05d5\\u05ea",

     "\\u05e4\\u05d5\\u05e0\\u05e7\\u05e6\\u05d9\\u05d4 \\u05e8\\u05d9\\u05d1\\u05d5\\u05e2\\u05d9\\u05ea \\u2014 \\u05d1\\u05e1\\u05d9\\u05e1",

     "\\u05d4\\u05db\\u05e8\\u05ea \\u05d4\\u05e4\\u05e8\\u05d1\\u05d5\\u05dc\\u05d4, \\u05e7\\u05d5\\u05d3\\u05e7\\u05d5\\u05d3 \\u05d5\\u05d7\\u05d9\\u05ea\\u05d5\\u05db\\u05d9\\u05dd \\u05e2\\u05dd \\u05d4\\u05e6\\u05d9\\u05e8\\u05d9\\u05dd", 2),

    ("g9x-equations", 9, "reduced", "\\u05d0\\u05dc\\u05d2\\u05d1\\u05e8\\u05d4",

     "\\u05de\\u05e9\\u05d5\\u05d5\\u05d0\\u05d5\\u05ea \\u05de\\u05de\\u05e2\\u05dc\\u05d4 \\u05e8\\u05d0\\u05e9\\u05d5\\u05e0\\u05d4",

     "\\u05e4\\u05ea\\u05e8\\u05d5\\u05df \\u05de\\u05e9\\u05d5\\u05d5\\u05d0\\u05d5\\u05ea \\u05d5\\u05e9\\u05d0\\u05dc\\u05d5\\u05ea \\u05de\\u05d9\\u05dc\\u05d5\\u05dc\\u05d9\\u05d5\\u05ea \\u05d1\\u05e1\\u05d9\\u05e1\\u05d9\\u05d5\\u05ea", 3),

    ("g9x-geo", 9, "reduced", "\\u05d2\\u05d0\\u05d5\\u05de\\u05d8\\u05e8\\u05d9\\u05d4",

     "\\u05d2\\u05d0\\u05d5\\u05de\\u05d8\\u05e8\\u05d9\\u05d4 \\u05d1\\u05e1\\u05d9\\u05e1\\u05d9\\u05ea",

     "\\u05e9\\u05d8\\u05d7\\u05d9\\u05dd, \\u05d4\\u05d9\\u05e7\\u05e4\\u05d9\\u05dd \\u05d5\\u05de\\u05e9\\u05e4\\u05d8 \\u05e4\\u05d9\\u05ea\\u05d2\\u05d5\\u05e8\\u05e1 \\u05d1\\u05e8\\u05de\\u05ea \\u05e1\\u05d9\\u05d1\\u05d5\\u05db\\u05d9\\u05d5\\u05ea \\u05de\\u05d5\\u05e4\\u05d7\\u05ea\\u05ea", 4),

    ("g9x-percent-prob", 9, "reduced", "\\u05ea\\u05d7\\u05d5\\u05dd \\u05de\\u05e1\\u05e4\\u05e8\\u05d9",

     "\\u05d0\\u05d7\\u05d5\\u05d6\\u05d9\\u05dd \\u05d5\\u05d4\\u05e1\\u05ea\\u05d1\\u05e8\\u05d5\\u05ea",

     "\\u05d7\\u05d9\\u05e9\\u05d5\\u05d1\\u05d9 \\u05d0\\u05d7\\u05d5\\u05d6\\u05d9\\u05dd \\u05d5\\u05d4\\u05e1\\u05ea\\u05d1\\u05e8\\u05d5\\u05ea \\u05d1\\u05e1\\u05d9\\u05e1\\u05d9\\u05ea", 5),

]



# Sample questions for new topics (subset - at least 1 each)

RAW_QUESTIONS = [

    ("q-g7-signed-1", "g7-signed", 1,

     "\\u05de\\u05d4\\u05d5 $(-5)+(+8)$?", ["$3$", "$-3$", "$13$", "$-13$"], 0,

     "$-5+8=3$."),

    ("q-g7-order-1", "g7-order-powers", 1,

     "\\u05de\\u05d4\\u05d5 $2+3\\cdot 4$?", ["$14$", "$20$", "$24$", "$9$"], 0,

     "\\u05e1\\u05d3\\u05e8 \\u05e4\\u05e2\\u05d5\\u05dc\\u05d5\\u05ea: \\u05db\\u05e4\\u05dc \\u05dc\\u05e4\\u05e0\\u05d9 \\u05d7\\u05d9\\u05d1\\u05d5\\u05e8 \\u2014 $2+12=14$."),

    ("q-g7-expr-1", "g7-algebra-expr", 2,

     "\\u05d0\\u05dd $a=3$, \\u05de\\u05d4\\u05d5 $2a+5$?", ["$11$", "$8$", "$6$", "$16$"], 0,

     "$2\\cdot 3+5=11$."),

    ("q-g7-eq-1", "g7-equations", 2,

     "\\u05e4\\u05ea\\u05e8\\u05d5 \\u05d0\\u05ea $x+7=12$.", ["$x=5$", "$x=19$", "$x=-5$", "$x=7$"], 0,

     "$x=12-7=5$."),

    ("q-g7-fn-1", "g7-functions-intro", 2,

     "\\u05d1\\u05d8\\u05d1\\u05dc\\u05d4: $x=1\\Rightarrow y=4$, $x=2\\Rightarrow y=7$. \\u05d0\\u05d9\\u05d6\\u05d4 \\u05db\\u05dc\\u05dc \\u05dc\\u05d9\\u05e0\\u05d0\\u05e8\\u05d9 \\u05de\\u05ea\\u05d0\\u05d9\\u05dd?",

     ["$y=3x+1$", "$y=x+3$", "$y=4x$", "$y=2x+1$"], 0,

     "\\u05e9\\u05d9\\u05e4\\u05d5\\u05e2 $(7-4)/(2-1)=3$, \\u05d5\\u05db\\u05e9 $x=1$ \\u05de\\u05ea\\u05e7\\u05d1\\u05dc $4$: $y=3x+1$."),

    ("q-g7-coord-1", "g7-coordinates", 1,

     "\\u05d1\\u05d0\\u05d9\\u05d6\\u05d4 \\u05e8\\u05d1\\u05e2 \\u05e0\\u05de\\u05e6\\u05d0\\u05ea \\u05d4\\u05e0\\u05e7\\u05d5\\u05d3\\u05d4 $(3,-2)$?",

     ["\\u05e8\\u05d1\\u05e2 4", "\\u05e8\\u05d1\\u05e2 1", "\\u05e8\\u05d1\\u05e2 2", "\\u05e8\\u05d1\\u05e2 3"], 0,

     "$x>0$, $y<0$ \\u2014 \\u05e8\\u05d1\\u05e2 \\u05e8\\u05d1\\u05d9\\u05e2\\u05d9."),

    ("q-g7-ang-1", "g7-angles-triangles", 2,

     "\\u05d1\\u05de\\u05e9\\u05d5\\u05dc\\u05e9 \\u05e9\\u05ea\\u05d9 \\u05d6\\u05d5\\u05d5\\u05d9\\u05d5\\u05ea \\u05d4\\u05df $40^\\circ$ \\u05d5-$70^\\circ$. \\u05d4\\u05d6\\u05d5\\u05d5\\u05d9\\u05ea \\u05d4\\u05e9\\u05dc\\u05d9\\u05e9\\u05d9\\u05ea:",

     ["$70^\\circ$", "$40^\\circ$", "$110^\\circ$", "$180^\\circ$"], 0,

     "$180-40-70=70$."),

    ("q-g7-area-1", "g7-area-perimeter", 1,

     "\\u05e9\\u05d8\\u05d7 \\u05de\\u05dc\\u05d1\\u05df $6\\times 4$ \\u05d4\\u05d5\\u05d0:",

     ["$24$", "$20$", "$10$", "$12$"], 0,

     "$6\\cdot 4=24$."),



    ("q-g8-lin-1", "g8-linear-fn", 2,

     "\\u05de\\u05d4\\u05d5 \\u05d4\\u05e9\\u05d9\\u05e4\\u05d5\\u05e2 \\u05e9\\u05dc $y=2x-5$?",

     ["$2$", "$-5$", "$5$", "$-2$"], 0,

     "\\u05d1\\u05e6\\u05d5\\u05e8\\u05d4 $y=mx+b$ \\u05d4\\u05e9\\u05d9\\u05e4\\u05d5\\u05e2 \\u05d4\\u05d5\\u05d0 $m=2$."),

    ("q-g8-sys-1", "g8-equations-system", 3,

     "\\u05e4\\u05ea\\u05e8\\u05d5: $\\begin{cases}x+y=5\\\\x-y=1\\end{cases}$",

     ["$x=3,y=2$", "$x=2,y=3$", "$x=5,y=0$", "$x=4,y=1$"], 0,

     "\\u05d7\\u05d9\\u05d1\\u05d5\\u05e8: $2x=6\\Rightarrow x=3$, \\u05d0\\u05d6 $y=2$."),

    ("q-g8-fac-1", "g8-factoring", 2,

     "\\u05e4\\u05e8\\u05e7\\u05d5 \\u05dc\\u05d2\\u05d5\\u05e8\\u05de\\u05d9\\u05dd: $6x+9$",

     ["$3(2x+3)$", "$6(x+9)$", "$2(3x+9)$", "$x(6+9)$"], 0,

     "\\u05d2\\u05d5\\u05e8\\u05dd \\u05de\\u05e9\\u05d5\\u05ea\\u05e3 $3$: $3(2x+3)$."),

    ("q-g8-pct-1", "g8-percent", 2,

     "\\u05de\\u05d4\\u05d5 $20\\%$ \\u05de\\u05ea\\u05d5\\u05da $150$?",

     ["$30$", "$20$", "$15$", "$50$"], 0,

     "$0.2\\cdot 150=30$."),

    ("q-g8-stat-1", "g8-stats-prob", 2,

     "\\u05d4\\u05de\\u05de\\u05d5\\u05e6\\u05e2 \\u05e9\\u05dc $2,4,6$ \\u05d4\\u05d5\\u05d0:",

     ["$4$", "$3$", "$6$", "$12$"], 0,

     "$(2+4+6)/3=4$."),

    ("q-g8-cong-1", "g8-congruence", 2,

     "\\u05d0\\u05dd \\u05e9\\u05ea\\u05d9 \\u05de\\u05e9\\u05d5\\u05dc\\u05e9\\u05d9\\u05dd \\u05d7\\u05d5\\u05e4\\u05e4\\u05d9\\u05dd, \\u05d0\\u05d6:",

     ["\\u05db\\u05dc \\u05d4\\u05e6\\u05dc\\u05e2\\u05d5\\u05ea \\u05d5\\u05d4\\u05d6\\u05d5\\u05d5\\u05d9\\u05d5\\u05ea \\u05d4\\u05de\\u05ea\\u05d0\\u05d9\\u05de\\u05d5\\u05ea \\u05e9\\u05d5\\u05d5\\u05d5\\u05ea",

      "\\u05e8\\u05e7 \\u05d4\\u05d6\\u05d5\\u05d5\\u05d9\\u05d5\\u05ea \\u05e9\\u05d5\\u05d5\\u05d5\\u05ea",

      "\\u05e8\\u05e7 \\u05d4\\u05e9\\u05d8\\u05d7\\u05d9\\u05dd \\u05e9\\u05d5\\u05d5\\u05d9\\u05dd",

      "\\u05d0\\u05d9\\u05df \\u05e7\\u05e9\\u05e8"], 0,

     "\\u05d1\\u05d7\\u05e4\\u05d9\\u05e4\\u05d4 \\u05db\\u05dc \\u05d4\\u05d0\\u05d9\\u05d1\\u05e8\\u05d9\\u05dd \\u05d4\\u05de\\u05ea\\u05d0\\u05d9\\u05de\\u05d9\\u05dd \\u05e9\\u05d5\\u05d5\\u05d9\\u05dd."),

    ("q-g8-sim-1", "g8-similarity", 3,

     "\\u05d1\\u05d3\\u05de\\u05d9\\u05d5\\u05df \\u05d1\\u05d9\\u05d7\\u05e1 $1:2$, \\u05d0\\u05dd \\u05e6\\u05dc\\u05e2 \\u05d1\\u05e7\\u05d8\\u05df \\u05d4\\u05d9\\u05d0 $5$, \\u05d4\\u05e6\\u05dc\\u05e2 \\u05d4\\u05de\\u05ea\\u05d0\\u05d9\\u05de\\u05d4 \\u05d1\\u05d2\\u05d3\\u05d5\\u05dc:",

     ["$10$", "$5$", "$2.5$", "$7$"], 0,

     "$5\\cdot 2=10$."),

    ("q-g8-py-1", "g8-pythagoras", 2,

     "\\u05d1\\u05de\\u05e9\\u05d5\\u05dc\\u05e9 \\u05d9\\u05e9\\u05e8-\\u05d6\\u05d5\\u05d5\\u05d9\\u05ea \\u05e2\\u05dd \\u05e0\\u05d9\\u05e6\\u05d1\\u05d5\\u05ea $3$ \\u05d5-$4$, \\u05d4\\u05d9\\u05ea\\u05e8 \\u05d4\\u05d5\\u05d0:",

     ["$5$", "$7$", "$12$", "$6$"], 0,

     "$\\sqrt{3^{2}+4^{2}}=5$."),

    ("q-g8-circ-1", "g8-circle", 2,

     "\\u05d4\\u05d9\\u05e7\\u05e3 \\u05de\\u05e2\\u05d2\\u05dc \\u05e2\\u05dd \\u05e8\\u05d3\\u05d9\\u05d5\\u05e1 $5$ (\\u05d4\\u05e9\\u05ea\\u05de\\u05e9\\u05d5 $\\pi$):",

     ["$10\\pi$", "$25\\pi$", "$5\\pi$", "$15\\pi$"], 0,

     "$2\\pi r=10\\pi$."),



    ("q-g9r-pow-1", "g9r-powers", 2,

     "\\u05e4\\u05e9\\u05d8\\u05d5: $a^{3}\\cdot a^{2}$",

     ["$a^{5}$", "$a^{6}$", "$a$", "$2a^{5}$"], 0,

     "$a^{m}\\cdot a^{n}=a^{m+n}$."),

    ("q-g9r-fac-1", "g9r-factor-expand", 3,

     "\\u05e4\\u05ea\\u05d7\\u05d5: $(x+3)(x-3)$",

     ["$x^{2}-9$", "$x^{2}+9$", "$x^{2}-6x+9$", "$x^{2}+6x-9$"], 0,

     "\\u05d4\\u05e4\\u05e8\\u05e9 \\u05e8\\u05d9\\u05d1\\u05d5\\u05e2\\u05d9\\u05dd: $x^{2}-9$."),

    ("q-g9r-eq-1", "g9r-quad-eq", 3,

     "\\u05e4\\u05ea\\u05e8\\u05d5: $x^{2}-5x+6=0$",

     ["$x=2$ \\u05d0\\u05d5 $x=3$", "$x=1$ \\u05d0\\u05d5 $x=6$", "$x=-2$ \\u05d0\\u05d5 $x=-3$", "$x=0$"], 0,

     "$(x-2)(x-3)=0$."),

    ("q-g9r-fn-1", "g9r-quadratic-fn", 3,

     "\\u05dc\\u05e4\\u05d5\\u05e0\\u05e7\\u05e6\\u05d9\\u05d4 $y=x^{2}-4$, \\u05e0\\u05e7\\u05d5\\u05d3\\u05d5\\u05ea \\u05d4\\u05d7\\u05d9\\u05ea\\u05d5\\u05da \\u05e2\\u05dd \\u05e6\\u05d9\\u05e8 $x$:",

     ["$(\\pm 2,0)$", "$(0,\\pm 2)$", "$(4,0)$", "$(0,-4)$"], 0,

     "$x^{2}-4=0\\Rightarrow x=\\pm 2$."),

    ("q-g9r-ineq-1", "g9r-inequalities", 2,

     "\\u05e4\\u05ea\\u05e8\\u05d5: $2x>8$",

     ["$x>4$", "$x<4$", "$x>16$", "$x>2$"], 0,

     "$x>4$."),

    ("q-g9r-geo-1", "g9r-geometry", 3,

     "\\u05d1\\u05de\\u05e7\\u05d1\\u05d9\\u05dc\\u05d9\\u05ea, \\u05d6\\u05d5\\u05d5\\u05d9\\u05d5\\u05ea \\u05e0\\u05d2\\u05d3\\u05d9\\u05d5\\u05ea:",

     ["\\u05e9\\u05d5\\u05d5\\u05ea \\u05d5\\u05e1\\u05db\\u05d5\\u05de\\u05df $180^\\circ$",

      "\\u05ea\\u05de\\u05d9\\u05d3 \\u05e9\\u05d5\\u05d5\\u05ea",

      "\\u05e1\\u05db\\u05d5\\u05de\\u05df $90^\\circ$",

      "\\u05d0\\u05d9\\u05e0\\u05df \\u05e9\\u05d5\\u05d5\\u05ea"], 0,

     "\\u05d1\\u05de\\u05e7\\u05d1\\u05d9\\u05dc\\u05d9\\u05ea \\u05d6\\u05d5\\u05d5\\u05d9\\u05d5\\u05ea \\u05e0\\u05d2\\u05d3\\u05d9\\u05d5\\u05ea \\u05de\\u05e9????? \\u05dc\\u05be$180^\\circ$."),

    ("q-g9r-prob-1", "g9r-probability", 2,

     "\\u05e7\\u05d5\\u05d1\\u05d9\\u05d9\\u05d4 \\u05d4\\u05d5\\u05d2\\u05e0\\u05ea: $P(\\text{\\u05d6\\u05d5\\u05d2\\u05d9})$?",

     ["$1/2$", "$1/3$", "$1/6$", "$2/3$"], 0,

     "$\\{2,4,6\\}/6=1/2$."),



    ("q-g9x-lin-1", "g9x-linear", 2,

     "\\u05d1$y=x+2$, \\u05db\\u05e9 $x=3$ \\u05de\\u05d4\\u05d5 $y$?",

     ["$5$", "$3$", "$6$", "$1$"], 0,

     "$3+2=5$."),

    ("q-g9x-quad-1", "g9x-quadratic", 2,

     "\\u05dc$y=x^{2}$, \\u05d4\\u05e7\\u05d5\\u05d3\\u05e7\\u05d5\\u05d3 \\u05d4\\u05d5\\u05d0:",

     ["$(0,0)$", "$(1,1)$", "$(0,1)$", "$(2,0)$"], 0,

     "\\u05de\\u05d9\\u05e0\\u05d9\\u05de\\u05d5\\u05dd \\u05d1\\u05e8\\u05d0\\u05e9\\u05d9\\u05ea \\u05d4\\u05e6\\u05d9\\u05e8\\u05d9\\u05dd."),

    ("q-g9x-eq-1", "g9x-equations", 1,

     "\\u05e4\\u05ea\\u05e8\\u05d5: $3x=12$",

     ["$x=4$", "$x=3$", "$x=9$", "$x=15$"], 0,

     "$x=4$."),

    ("q-g9x-geo-1", "g9x-geo", 2,

     "\\u05d4\\u05d9\\u05e7\\u05e3 \\u05e8\\u05d9\\u05d1\\u05d5\\u05e2 \\u05e2\\u05dd \\u05e6\\u05dc\\u05e2 $5$:",

     ["$20$", "$25$", "$10$", "$15$"], 0,

     "$4\\cdot 5=20$."),

    ("q-g9x-pp-1", "g9x-percent-prob", 2,

     "\\u05de\\u05d4\\u05d5 $50\\%$ \\u05de\\u05ea\\u05d5\\u05da $80$?",

     ["$40$", "$50$", "$30$", "$160$"], 0,

     "$0.5\\cdot 80=40$."),

]





def main():

    topics = []

    for tid, grade, track, cluster, title, desc, order in RAW_TOPICS:

        topics.append({

            "id": tid,

            "grade": grade,

            "units": None,

            "track": track,

            "cluster": u(cluster),

            "title": u(title),

            "description": u(desc),

            "sortOrder": order,

        })



    # Fix one accidental mixed string in geometry explanation if any

    for t in topics:

        t["description"] = t["description"].replace("???????", "???????")  # noop safety



    questions = []

    for qid, topic, diff, text, opts, correct, expl in RAW_QUESTIONS:

        questions.append({

            "id": qid,

            "topic_id": topic,

            "difficulty": diff,

            "question_text": u(text),

            "options": [u(o) if "\\u" in o or o.startswith("\\u") else o for o in opts],

            # options may already be latex; decode those with unicode escapes

            "correct_index": correct,

            "explanation": u(expl),

        })

    # decode options properly

    for q in questions:

        q["options"] = [u(o) for o in q["options"]]



    # Fix g9r-geometry option with broken Hebrew mixed in

    for q in questions:

        if q["id"] == "q-g9r-geo-1":

            q["options"][0] = u("\\u05e9\\u05d5\\u05d5\\u05ea \\u05d5\\u05e1\\u05db\\u05d5\\u05de\\u05df $180^\\circ$")

            q["explanation"] = u(

                "\\u05d1\\u05de\\u05e7\\u05d1\\u05d9\\u05dc\\u05d9\\u05ea \\u05d6\\u05d5\\u05d5\\u05d9\\u05d5\\u05ea \\u05e0\\u05d2\\u05d3\\u05d9\\u05d5\\u05ea "

                "\\u05e9\\u05d5\\u05d5\\u05ea \\u05d5\\u05e1\\u05db\\u05d5\\u05de\\u05df $180^\\circ$."

            )



    # Write middleSchool.js

    ms_path = ROOT / "src" / "data" / "curriculum" / "middleSchool.js"

    lines = [

        "/** \\u05ea\\u05d5\\u05db\\u05e0\\u05d9\\u05ea \\u05dc\\u05d9\\u05de\\u05d5\\u05d3\\u05d9\\u05dd \\u2014 \\u05d7\\u05d8\\u05d9\\u05d1\\u05ea \\u05d1\\u05d9\\u05e0\\u05d9\\u05d9\\u05dd (\\u05d6'\\u2013\\u05d8') */",

        "",

        "export const MIDDLE_SCHOOL_TOPICS = [",

    ]

    # Better write via json embedding

    body = "export const MIDDLE_SCHOOL_TOPICS = " + json.dumps(topics, ensure_ascii=False, indent=2) + ";\n\n"

    tracks = [

        {"id": "regular", "title": u("\\u05e8\\u05de\\u05d4 \\u05e8\\u05d2\\u05d9\\u05dc\\u05d4"),

         "blurb": u("\\u05d0\\u05dc\\u05d2\\u05d1\\u05e8\\u05d4, \\u05e4\\u05d5\\u05e0\\u05e7\\u05e6\\u05d9\\u05d4 \\u05e8\\u05d9\\u05d1\\u05d5\\u05e2\\u05d9\\u05ea, \\u05d2\\u05d0\\u05d5\\u05de\\u05d8\\u05e8\\u05d9\\u05d4 \\u05d5\\u05d4\\u05e1\\u05ea\\u05d1\\u05e8\\u05d5\\u05ea")},

        {"id": "reduced", "title": u("\\u05e8\\u05de\\u05d4 \\u05de\\u05e6\\u05d5\\u05de\\u05e6\\u05de\\u05ea"),

         "blurb": u("\\u05e4\\u05d5\\u05e0\\u05e7\\u05e6\\u05d9\\u05d4 \\u05e7\\u05d5\\u05d5\\u05d9\\u05ea \\u05d5\\u05e8\\u05d9\\u05d1\\u05d5\\u05e2\\u05d9\\u05ea \\u05d1\\u05e1\\u05d9\\u05e1\\u05d9\\u05ea \\u2014 \\u05dc\\u05e7\\u05e8\\u05d0\\u05ea 3 \\u05d9\\u05d7\\\"\\u05dc")},

    ]

    body += "export const GRADE9_TRACKS = " + json.dumps(tracks, ensure_ascii=False, indent=2) + ";\n\n"

    body += """export function getMiddleSchoolTopics(grade, track = null) {

  const g = Number(grade);

  return MIDDLE_SCHOOL_TOPICS.filter((t) => {

    if (t.grade !== g) return false;

    if (g === 9) return t.track === track;

    return t.track == null;

  }).sort((a, b) => a.sortOrder - b.sortOrder);

}

"""

    header = u("/** \\u05ea\\u05d5\\u05db\\u05e0\\u05d9\\u05ea \\u05dc\\u05d9\\u05de\\u05d5\\u05d3\\u05d9\\u05dd \\u2014 \\u05d7\\u05d8\\\"\\u05d1 \\u05d6'\\u2013\\u05d8' */\n\n")

    ms_path.write_text(header + body, encoding="utf-8")

    print(f"Wrote {ms_path} topics={len(topics)} heb={sum(1 for c in body if chr(0x0590)<=c<=chr(0x05FF))}")



    # Write middle school questions

    q_path = ROOT / "src" / "data" / "questions" / "middleSchoolQuestions.js"

    q_body = "export const MIDDLE_SCHOOL_QUESTIONS = " + json.dumps(questions, ensure_ascii=False, indent=2) + ";\n\n"

    q_body += """export function getMiddleSchoolQuestionsForTopic(topicId) {

  return MIDDLE_SCHOOL_QUESTIONS.filter((q) => q.topic_id === topicId);

}

"""

    q_path.write_text(u("/** \\u05e9\\u05d0\\u05dc\\u05d5\\u05ea \\u05d7\\u05d8\\\"\\u05d1 */\n\n") + q_body, encoding="utf-8")

    print(f"Wrote {q_path} questions={len(questions)}")



    # Verify coverage

    missing = [t["id"] for t in topics if not any(q["topic_id"] == t["id"] for q in questions)]

    print("missing questions for:", missing)





if __name__ == "__main__":

    main()

