# -*- coding: utf-8 -*-
"""Write interactive questions bank."""
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]


def U(s: str) -> str:
    out = []
    i = 0
    while i < len(s):
        if s[i : i + 2] == "\\u" and i + 6 <= len(s):
            hexpart = s[i + 2 : i + 6]
            if all(c in "0123456789abcdefABCDEF" for c in hexpart):
                out.append(chr(int(hexpart, 16)))
                i += 6
                continue
        out.append(s[i])
        i += 1
    return "".join(out)


questions = [
    {
        "id": "q-int-pizza-half",
        "topic_id": "g2-fractions-half",
        "difficulty": 1,
        "type": "fractionPizza",
        "question_text": U("\\u05e6\\u05d1\\u05e2\\u05d5 **\\u05d7\\u05e6\\u05d9** \\u05de\\u05d4\\u05e4\\u05d9\\u05e6\\u05d4 \\u2014 \\u05db\\u05de\\u05d4 \\u05e4\\u05e8\\u05d5\\u05e1\\u05d5\\u05ea?"),
        "payload": {"slices": 4, "correctFilled": 2},
        "correctAnswer": "2/4",
        "explanation": U("\\u05d7\\u05e6\\u05d9 \\u05de-4 \\u05e4\\u05e8\\u05d5\\u05e1\\u05d5\\u05ea \\u05d4\\u05d5\\u05d0 2 \\u05e4\\u05e8\\u05d5\\u05e1\\u05d5\\u05ea ($\\\\frac{2}{4}=\\\\frac{1}{2}$)."),
    },
    {
        "id": "q-int-pizza-quarter",
        "topic_id": "g2-fractions-half",
        "difficulty": 1,
        "type": "fractionPizza",
        "question_text": U("\\u05e6\\u05d1\\u05e2\\u05d5 **\\u05e8\\u05d1\\u05e2** \\u05de\\u05d4\\u05e2\\u05d9\\u05d2\\u05d5\\u05dc."),
        "payload": {"slices": 4, "correctFilled": 1},
        "correctAnswer": "1/4",
        "explanation": U("\\u05e8\\u05d1\\u05e2 \\u05de-4 \\u05e4\\u05e8\\u05d5\\u05e1\\u05d5\\u05ea \\u05d4\\u05d5\\u05d0 \\u05e4\\u05e8\\u05d5\\u05e1\\u05d4 \\u05d0\\u05d7\\u05ea."),
    },
    {
        "id": "q-int-line-15",
        "topic_id": "g4-decimals-intro",
        "difficulty": 2,
        "type": "numberLine",
        "question_text": U("\\u05e1\\u05de\\u05e0\\u05d5 \\u05e2\\u05dc \\u05d4\\u05e6\\u05d9\\u05e8 \\u05d0\\u05ea \\u05d4\\u05de\\u05e1\\u05e4\\u05e8 $1.5$"),
        "payload": {"min": 0, "max": 3, "step": 0.5, "target": 1.5, "tolerance": 0.01},
        "correctAnswer": 1.5,
        "explanation": U("$1.5$ \\u05e0\\u05de\\u05e6\\u05d0 \\u05d1\\u05d0\\u05de\\u05e6\\u05e2 \\u05d1\\u05d9\\u05df $1$ \\u05dc-$2$."),
    },
    {
        "id": "q-int-line-7",
        "topic_id": "g1-numbers-100",
        "difficulty": 1,
        "type": "numberLine",
        "question_text": U("\\u05e1\\u05de\\u05e0\\u05d5 \\u05d0\\u05ea \\u05d4\\u05de\\u05e1\\u05e4\\u05e8 $7$ \\u05e2\\u05dc \\u05e6\\u05d9\\u05e8 \\u05d4\\u05de\\u05e1\\u05e4\\u05e8\\u05d9\\u05dd."),
        "payload": {"min": 0, "max": 10, "step": 1, "target": 7, "tolerance": 0.01},
        "correctAnswer": 7,
        "explanation": U("\\u05e1\\u05d5\\u05e4\\u05e8\\u05d9\\u05dd \\u05de-0 \\u05e2\\u05d3 7."),
    },
    {
        "id": "q-int-drag-mul",
        "topic_id": "g2-mul-div-intro",
        "difficulty": 2,
        "type": "dragMatch",
        "question_text": U("\\u05d2\\u05e8\\u05e8\\u05d5 \\u05db\\u05dc \\u05ea\\u05e8\\u05d2\\u05d9\\u05dc \\u05dc\\u05ea\\u05d5\\u05e6\\u05d0\\u05d4 \\u05d4\\u05e0\\u05db\\u05d5\\u05e0\\u05d4."),
        "payload": {
            "mode": "match",
            "items": [
                {"id": "a", "label": "$5\\times 6$"},
                {"id": "b", "label": "$3\\times 4$"},
                {"id": "c", "label": "$2\\times 7$"},
            ],
            "bins": [
                {"id": "30", "label": "$30$"},
                {"id": "12", "label": "$12$"},
                {"id": "14", "label": "$14$"},
            ],
            "solution": {"a": "30", "b": "12", "c": "14"},
        },
        "correctAnswer": True,
        "explanation": "$5\\times 6=30$, $3\\times 4=12$, $2\\times 7=14$.",
    },
    {
        "id": "q-int-drag-even",
        "topic_id": "g2-numbers-1000",
        "difficulty": 1,
        "type": "dragMatch",
        "question_text": U("\\u05de\\u05d9\\u05d9\\u05e0\\u05d5: \\u05d6\\u05d5\\u05d2\\u05d9\\u05d9\\u05dd \\u05d5\\u05d0\\u05d9-\\u05d6\\u05d5\\u05d2\\u05d9\\u05d9\\u05dd."),
        "payload": {
            "mode": "sort",
            "items": [
                {"id": "n2", "label": "$2$"},
                {"id": "n5", "label": "$5$"},
                {"id": "n8", "label": "$8$"},
                {"id": "n9", "label": "$9$"},
            ],
            "bins": [
                {"id": "even", "label": U("\\u05d6\\u05d5\\u05d2\\u05d9\\u05d9\\u05dd")},
                {"id": "odd", "label": U("\\u05d0\\u05d9-\\u05d6\\u05d5\\u05d2\\u05d9\\u05d9\\u05dd")},
            ],
            "solution": {"n2": "even", "n5": "odd", "n8": "even", "n9": "odd"},
        },
        "correctAnswer": True,
        "explanation": U("\\u05d6\\u05d5\\u05d2\\u05d9 \\u05de\\u05ea\\u05d7\\u05dc\\u05e7 \\u05d1-2 \\u05d1\\u05dc\\u05d9 \\u05e9\\u05d0\\u05e8\\u05d9\\u05ea: 2 \\u05d5-8. \\u05d0\\u05d9-\\u05d6\\u05d5\\u05d2\\u05d9: 5 \\u05d5-9."),
    },
    {
        "id": "q-int-unit-frac",
        "topic_id": "g3-fractions-unit",
        "difficulty": 2,
        "type": "fractionPizza",
        "question_text": U("\\u05e6\\u05d1\\u05e2\\u05d5 \\u05e9\\u05dc\\u05d9\\u05e9 \\u05de\\u05d4\\u05e2\\u05d9\\u05d2\\u05d5\\u05dc ($\\\\frac{1}{3}$)."),
        "payload": {"slices": 6, "correctFilled": 2},
        "correctAnswer": "2/6",
        "explanation": U("$\\\\frac{1}{3}=\\\\frac{2}{6}$ \\u2014 \\u05e9\\u05ea\\u05d9 \\u05e4\\u05e8\\u05d5\\u05e1\\u05d5\\u05ea \\u05de\\u05ea\\u05d5\\u05da \\u05e9\\u05e9."),
    },
]

body = (
    U("/** \\u05e9\\u05d0\\u05dc\\u05d5\\u05ea \\u05d0\\u05d9\\u05e0\\u05d8\\u05e8\\u05d0\\u05e7\\u05d8\\u05d9\\u05d1\\u05d9\\u05d5\\u05ea */\n\n")
    + "export const INTERACTIVE_QUESTIONS = "
    + json.dumps(questions, ensure_ascii=False, indent=2)
    + ";\n\n"
    + """export function getInteractiveQuestionsForTopic(topicId) {
  return INTERACTIVE_QUESTIONS.filter((q) => q.topic_id === topicId);
}
"""
)

out = ROOT / "src/data/questions/interactiveQuestions.js"
out.write_text(body, encoding="utf-8")
assert "???" in body or "\u05d7\u05e6\u05d9" in questions[0]["question_text"]
print("questions", len(questions), "ok", "???" in out.read_text(encoding="utf-8"))
