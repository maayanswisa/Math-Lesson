# -*- coding: utf-8 -*-
from pathlib import Path

p = Path(__file__).resolve().parents[1] / "src/components/quiz/QuizCard.jsx"
lines = p.read_text(encoding="utf-8").splitlines()
out = []
for line in lines:
    if "MAX_HEARTS" in line and ("\\u05d9" in line or "\u05d9\u05e9" in line or "{`" in line or "{\\`" in line):
        out.append(
            '        <p className="text-[var(--color-slate)]">'
            "\u05d9\u05e9 \u05dc\u05db\u05dd {MAX_HEARTS} \u05dc\u05d1\u05d1\u05d5\u05ea. "
            "\u05db\u05dc \u05d8\u05e2\u05d5\u05ea \u05de\u05d5\u05e8\u05d9\u05d3\u05d4 \u05dc\u05d1. "
            "\u05ea\u05e9\u05d5\u05d1\u05d5\u05ea \u05e0\u05db\u05d5\u05e0\u05d5\u05ea "
            "\u05de\u05e2\u05e0\u05d9\u05e7\u05d5\u05ea XP!</p>"
        )
        continue
    out.append(line)

text = "\n".join(out) + "\n"
p.write_text(text, encoding="utf-8")
t = p.read_text(encoding="utf-8")
print("good ready", "\u05d9\u05e9 \u05dc\u05db\u05dd {MAX_HEARTS}" in t)
print("broken escapes", "\\u05d9\\u05e9" in t)
for i, line in enumerate(t.splitlines(), 1):
    if "MAX_HEARTS" in line and "text-[var(--color-slate)]" in line:
        print(i, line)
