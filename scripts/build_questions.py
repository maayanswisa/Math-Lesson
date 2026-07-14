# -*- coding: utf-8 -*-

"""Build highSchoolQuestions.js with guaranteed UTF-8 Hebrew."""

from pathlib import Path

import json



# All Hebrew via unicode escapes so this source stays ASCII-safe on any editor

def H(s: str) -> str:

    return s.encode("utf-8").decode("unicode_escape") if "\\u" in s else s



# Helper: decode a string that may contain \uXXXX sequences when written as raw

def u(s: str) -> str:

    return s



questions = [

  {

    "id": "q-g10-u3-sci-1",

    "topic_id": "g10-u3-science-society",

    "difficulty": 2,

    "question_text": u("\u05d1\u05d8\u05d1\u05dc\u05d4 \u05de\u05d5\u05e6\u05d2\u05d5\u05ea \u05e6\u05d9\u05d5\u05e0\u05d9\u05dd \u05e9\u05dc 5 \u05ea\u05dc\u05de\u05d9\u05d3\u05d9\u05dd: $72, 80, 80, 88, 90$. \u05de\u05d4\u05d5 **\u05d4\u05e9\u05db\u05d9\u05d7** (mode)?"),

    "options": ["$80$", "$82$", "$88$", "$72$"],

    "correct_index": 0,

    "explanation": u("\u05d4\u05e9\u05db\u05d9\u05d7 \u05d4\u05d5\u05d0 \u05d4\u05e2\u05e8\u05da \u05e9\u05de\u05d5\u05e4\u05d9\u05e2 \u05d4\u05db\u05d9 \u05d4\u05e8\u05d1\u05d4 \u05e4\u05e2\u05de\u05d9\u05dd. \u05db\u05d0\u05df $80$ \u05de\u05d5\u05e4\u05d9\u05e2 \u05e4\u05e2\u05de\u05d9\u05d9\u05dd \u2014 \u05dc\u05db\u05df \u05d4\u05e9\u05db\u05d9\u05d7 \u05d4\u05d5\u05d0 $80$."),

  },

  {

    "id": "q-g10-u3-sci-2",

    "topic_id": "g10-u3-science-society",

    "difficulty": 2,

    "question_text": u("\u05e7\u05d5\u05d1\u05d9\u05d9\u05d4 \u05d4\u05d5\u05d2\u05e0\u05ea \u05de\u05d5\u05d8\u05dc\u05ea \u05e4\u05e2\u05dd \u05d0\u05d7\u05ea. \u05de\u05d4\u05d9 \u05d4\u05d4\u05e1\u05ea\u05d1\u05e8\u05d5\u05ea \u05dc\u05e7\u05d1\u05dc \u05de\u05e1\u05e4\u05e8 \u05d6\u05d5\u05d2\u05d9?"),

    "options": [r"$\dfrac{1}{2}$", r"$\dfrac{1}{3}$", r"$\dfrac{1}{6}$", r"$\dfrac{2}{3}$"],

    "correct_index": 0,

    "explanation": u("\u05d4\u05ea\u05d5\u05e6\u05d0\u05d5\u05ea \u05d4\u05d6\u05d5\u05d2\u05d9\u05d5\u05ea \u05d4\u05df $\\{2,4,6\\}$ \u2014 \u05e9\u05dc\u05d5\u05e9 \u05de\u05ea\u05d5\u05da \u05e9\u05e9. \u05dc\u05db\u05df $P=\\frac{3}{6}=\\frac{1}{2}$."),

  },

  {

    "id": "q-g10-u3-space-1",

    "topic_id": "g10-u3-space",

    "difficulty": 2,

    "question_text": u("\u05de\u05dc\u05d1\u05df \u05d1\u05d0\u05d5\u05e8\u05da $8$ \u05e1\\\"\u05de \u05d5\u05d1\u05e8\u05d5\u05d7\u05d1 $5$ \u05e1\\\"\u05de. \u05de\u05d4\u05d5 \u05d4\u05d9\u05e7\u05e4\u05d5?"),

    "options": [u("$26$ \u05e1\u05f4\u05de"), u("$40$ \u05e1\u05f4\u05de"), u("$13$ \u05e1\u05f4\u05de"), u("$30$ \u05e1\u05f4\u05de")],

    "correct_index": 0,

    "explanation": u("\u05d4\u05d9\u05e7\u05e3 \u05de\u05dc\u05d1\u05df: $P=2(a+b)=2(8+5)=26$."),

  },

  {

    "id": "q-g10-u3-fin-1",

    "topic_id": "g10-u3-finance",

    "difficulty": 2,

    "question_text": u("\u05de\u05d5\u05e6\u05e8 \u05e2\u05dc\u05d4 $120$ \u05e9\u05f4\u05d7 \u05d5\u05e7\u05d9\u05d1\u05dc \u05d4\u05e0\u05d7\u05d4 \u05e9\u05dc $25\\%$. \u05de\u05d4\u05d5 \u05d4\u05de\u05d7\u05d9\u05e8 \u05d4\u05e1\u05d5\u05e4\u05d9?"),

    "options": [u("$90$ \u05e9\u05f4\u05d7"), u("$95$ \u05e9\u05f4\u05d7"), u("$100$ \u05e9\u05f4\u05d7"), u("$30$ \u05e9\u05f4\u05d7")],

    "correct_index": 0,

    "explanation": u("\u05d4\u05e0\u05d7\u05d4 \u05e9\u05dc $25\\%$ \u05de\u05e9\u05d0\u05d9\u05e8\u05d4 $75\\%$: $120\\cdot 0.75=90$."),

  },

  {

    "id": "q-g11-u3-sci-1",

    "topic_id": "g11-u3-science-exp",

    "difficulty": 3,

    "question_text": u("\u05d0\u05d5\u05db\u05dc\u05d5\u05e1\u05d9\u05d9\u05d4 \u05d2\u05d3\u05dc\u05d4 \u05dc\u05e4\u05d9 $P(t)=100\\cdot 2^{t}$. \u05db\u05de\u05d4 \u05ea\u05d4\u05d9\u05d4 \u05d0\u05d7\u05e8\u05d9 $3$ \u05e9\u05e0\u05d9\u05dd?"),

    "options": ["$800$", "$600$", "$400$", "$200$"],

    "correct_index": 0,

    "explanation": u("$P(3)=100\\cdot 2^{3}=800$."),

  },

  {

    "id": "q-g11-u3-space-1",

    "topic_id": "g11-u3-space",

    "difficulty": 3,

    "question_text": u("\u05d1\u05de\u05e4\u05d4 \u05d1\u05e7\u05e0\u05d4 \u05de\u05d9\u05d3\u05d4 $1:50000$, \u05de\u05e8\u05d7\u05e7 \u05e9\u05dc $4$ \u05e1\u05f4\u05de \u05d1\u05de\u05e4\u05d4 \u05de\u05d9\u05d9\u05e6\u05d2 \u05d1\u05de\u05e6\u05d9\u05d0\u05d5\u05ea:"),

    "options": [u("$2$ \u05e7\u05f4\u05de"), u("$0.2$ \u05e7\u05f4\u05de"), u("$20$ \u05e7\u05f4\u05de"), u("$4$ \u05e7\u05f4\u05de")],

    "correct_index": 0,

    "explanation": u("$4\\cdot 50000=200000$ \u05e1\u05f4\u05de $=2$ \u05e7\u05f4\u05de."),

  },

  {

    "id": "q-g11-u3-fin-1",

    "topic_id": "g11-u3-finance",

    "difficulty": 3,

    "question_text": u("\u05d4\u05e9\u05e7\u05e2\u05d4 \u05e9\u05dc $1000$ \u05e9\u05f4\u05d7 \u05e0\u05d5\u05e9\u05d0\u05ea \u05e8\u05d9\u05d1\u05d9\u05ea \u05d3\u05e8\u05d9\u05d1\u05d9\u05ea \u05e9\u05dc $10\\%$ \u05dc\u05e9\u05e0\u05d4. \u05de\u05d4 \u05d9\u05d4\u05d9\u05d4 \u05d4\u05e1\u05db\u05d5\u05dd \u05d0\u05d7\u05e8\u05d9 $2$ \u05e9\u05e0\u05d9\u05dd?"),

    "options": [u("$1210$ \u05e9\u05f4\u05d7"), u("$1200$ \u05e9\u05f4\u05d7"), u("$1100$ \u05e9\u05f4\u05d7"), u("$1300$ \u05e9\u05f4\u05d7")],

    "correct_index": 0,

    "explanation": u("$1000\\cdot(1.1)^{2}=1210$."),

  },

  {

    "id": "q-g12-u3-norm-1",

    "topic_id": "g12-u3-normal",

    "difficulty": 3,

    "question_text": u("\u05de\u05e9\u05ea\u05e0\u05d4 \u05de\u05e7\u05e8\u05d9 \u05e0\u05d5\u05e8\u05de\u05dc\u05d9 \u05e2\u05dd $\\mu=70$ \u05d5\u05e1\u05d8\u05d9\u05d9\u05ea \u05ea\u05e7\u05df $\\sigma=5$. \u05de\u05d4\u05d5 \u05e6\u05d9\u05d5\u05df \u05d4\u05ea\u05e7\u05df \u05e9\u05dc $x=80$?"),

    "options": ["$z=2$", "$z=1$", "$z=10$", "$z=0.5$"],

    "correct_index": 0,

    "explanation": r"$$z=\frac{x-\mu}{\sigma}=\frac{80-70}{5}=2$$",

  },

  {

    "id": "q-g12-u3-quad-1",

    "topic_id": "g12-u3-quadratic-model",

    "difficulty": 3,

    "question_text": u("\u05d4\u05de\u05d5\u05d3\u05dc $h(t)=-5t^{2}+20t$ \u05de\u05ea\u05d0\u05e8 \u05d2\u05d5\u05d1\u05d4. \u05de\u05d4\u05d5 \u05d4\u05d2\u05d5\u05d1\u05d4 \u05d4\u05de\u05e8\u05d1\u05d9?"),

    "options": [u("$20$ \u05de\u05f3"), u("$15$ \u05de\u05f3"), u("$25$ \u05de\u05f3"), u("$10$ \u05de\u05f3")],

    "correct_index": 0,

    "explanation": u("\u05e7\u05d5\u05d3\u05e7\u05d5\u05d3: $t=-\\frac{b}{2a}=2$, \u05d0\u05d6 $h(2)=20$."),

  },

  {

    "id": "q-g12-u3-lp-1",

    "topic_id": "g12-u3-linear-programming",

    "difficulty": 3,

    "question_text": u("\u05d1\u05ea\u05db\u05e0\u05d5\u05df \u05dc\u05d9\u05e0\u05d0\u05e8\u05d9, \u05e0\u05e7\u05d5\u05d3\u05ea \u05d4\u05d0\u05d5\u05e4\u05d8\u05d9\u05de\u05d5\u05dd \u05e9\u05dc \u05e4\u05d5\u05e0\u05e7\u05e6\u05d9\u05d9\u05ea \u05de\u05d8\u05e8\u05d4 \u05dc\u05d9\u05e0\u05d0\u05e8\u05d9\u05ea \u05d1\u05ea\u05d7\u05d5\u05dd \u05e7\u05de\u05d5\u05e8 \u05e1\u05d5\u05e4\u05d9 \u05de\u05d5\u05e4\u05d9\u05e2\u05d4 \u05ea\u05de\u05d9\u05d3:"),

    "options": [

      u("\u05d1\u05e7\u05d5\u05d3\u05e7\u05d5\u05d3 \u05e9\u05dc \u05ea\u05d7\u05d5\u05dd \u05d4\u05d0\u05d9\u05dc\u05d5\u05e6\u05d9\u05dd"),

      u("\u05e8\u05e7 \u05d1\u05de\u05e8\u05db\u05d6 \u05d4\u05ea\u05d7\u05d5\u05dd"),

      u("\u05e8\u05e7 \u05e2\u05dc \u05e6\u05d9\u05e8 $x$"),

      u("\u05e8\u05e7 \u05de\u05d7\u05d5\u05e5 \u05dc\u05ea\u05d7\u05d5\u05dd"),

    ],

    "correct_index": 0,

    "explanation": u("\u05d1\u05ea\u05db\u05e0\u05d5\u05df \u05dc\u05d9\u05e0\u05d0\u05e8\u05d9 \u05d4\u05d0\u05d5\u05e4\u05d8\u05d9\u05de\u05d5\u05dd \u05de\u05ea\u05e7\u05d1\u05dc \u05d1\u05e7\u05d5\u05d3\u05e7\u05d5\u05d3 \u05e9\u05dc \u05ea\u05d7\u05d5\u05dd \u05d4\u05d0\u05d9\u05dc\u05d5\u05e6\u05d9\u05dd."),

  },

  {

    "id": "q-g12-u3-an-1",

    "topic_id": "g12-u3-analytic-geo",

    "difficulty": 2,

    "question_text": u("\u05de\u05d4\u05d5 \u05d4\u05e9\u05d9\u05e4\u05d5\u05e2 \u05e9\u05dc \u05d4\u05d9\u05e9\u05e8 \u05d4\u05e2\u05d5\u05d1\u05e8 \u05d3\u05e8\u05da $(1,2)$ \u05d5-$(5,10)$?"),

    "options": ["$2$", "$1$", "$4$", r"$\dfrac{1}{2}$"],

    "correct_index": 0,

    "explanation": r"$$m=\frac{10-2}{5-1}=2$$",

  },

  {

    "id": "q-g12-u3-sol-1",

    "topic_id": "g12-u3-solids",

    "difficulty": 2,

    "question_text": u("\u05e0\u05e4\u05d7 \u05e7\u05d5\u05d1\u05d9\u05d9\u05d4 \u05e9\u05d0\u05d5\u05e8\u05da \u05e6\u05dc\u05e2\u05d4 $4$ \u05d4\u05d5\u05d0:"),

    "options": ["$64$", "$16$", "$48$", "$32$"],

    "correct_index": 0,

    "explanation": r"$V=a^{3}=64$.",

  },

  {

    "id": "q-g10-u4-pre-1",

    "topic_id": "g10-u4-precalculus",

    "difficulty": 2,

    "question_text": u("\u05dc\u05e4\u05d5\u05e0\u05e7\u05e6\u05d9\u05d4 $f(x)=x^{2}-4$ \u05e0\u05e7\u05d5\u05d3\u05d5\u05ea \u05d4\u05d7\u05d9\u05ea\u05d5\u05da \u05e2\u05dd \u05e6\u05d9\u05e8 $x$ \u05d4\u05df:"),

    "options": [r"$x=\pm 2$", "$x=4$", r"$x=\pm 4$", "$x=0,4$"],

    "correct_index": 0,

    "explanation": r"$x^{2}-4=0\Rightarrow x=\pm 2$.",

  },

  {

    "id": "q-g10-u4-poly-1",

    "topic_id": "g10-u4-poly-root",

    "difficulty": 3,

    "question_text": u("\u05e0\u05ea\u05d5\u05e0\u05d4 $f(x)=x^{3}-3x$. \u05de\u05d4\u05d9 $f'(x)$?"),

    "options": ["$3x^{2}-3$", "$3x^{2}-3x$", "$x^{2}-3$", "$3x-3$"],

    "correct_index": 0,

    "explanation": r"$f'(x)=3x^{2}-3$.",

  },

  {

    "id": "q-g10-u4-an-1",

    "topic_id": "g10-u4-analytic-geo",

    "difficulty": 2,

    "question_text": u("\u05d4\u05de\u05e8\u05d7\u05e7 \u05d1\u05d9\u05df $(0,0)$ \u05d5-$(3,4)$ \u05d4\u05d5\u05d0:"),

    "options": ["$5$", "$7$", "$12$", r"$\sqrt{7}$"],

    "correct_index": 0,

    "explanation": r"$$d=\sqrt{9+16}=5$$",

  },

  {

    "id": "q-g10-u4-pl-1",

    "topic_id": "g10-u4-plane-geo",

    "difficulty": 3,

    "question_text": u("\u05d1\u05de\u05e9\u05d5\u05dc\u05e9, \u05e7\u05d8\u05e2 \u05d4\u05d0\u05de\u05e6\u05e2\u05d9\u05dd \u05d4\u05de\u05e7\u05d1\u05d9\u05dc \u05dc\u05e6\u05dc\u05e2 \u05d1\u05d0\u05d5\u05e8\u05da $10$ \u05d4\u05d5\u05d0 \u05d1\u05d0\u05d5\u05e8\u05da:"),

    "options": ["$5$", "$10$", "$20$", "$7.5$"],

    "correct_index": 0,

    "explanation": u("\u05de\u05e9\u05e4\u05d8 \u05e7\u05d8\u05e2 \u05d4\u05d0\u05de\u05e6\u05e2\u05d9\u05dd: \u05de\u05d7\u05e6\u05d9\u05ea \u05d4\u05e6\u05dc\u05e2 \u05d4\u05de\u05e7\u05d1\u05d9\u05dc\u05d4 \u2014 $5$."),

  },

  {

    "id": "q-g10-u4-tr-1",

    "topic_id": "g10-u4-trig",

    "difficulty": 2,

    "question_text": u("\u05d1\u05de\u05e9\u05d5\u05dc\u05e9 \u05d9\u05e9\u05e8-\u05d6\u05d5\u05d5\u05d9\u05ea \u05e2\u05dd \u05d6\u05d5\u05d5\u05d9\u05ea $30^\\circ$, \u05d0\u05dd \u05d4\u05d9\u05ea\u05e8 $10$ \u05d0\u05d6 \u05d4\u05e6\u05dc\u05e2 \u05e9\u05de\u05d5\u05dc $30^\\circ$ \u05d4\u05d9\u05d0:"),

    "options": ["$5$", r"$5\sqrt{3}$", "$10$", r"$\dfrac{10}{\sqrt{3}}$"],

    "correct_index": 0,

    "explanation": u("\u05d1\u05de\u05e9\u05d5\u05dc\u05e9 $30^\\circ$-$60^\\circ$-$90^\\circ$: \u05de\u05d5\u05dc $30^\\circ$ \u05d9\u05e9 \u05de\u05d7\u05e6\u05d9\u05ea \u05d4\u05d9\u05ea\u05e8."),

  },

  {

    "id": "q-g10-u4-st-1",

    "topic_id": "g10-u4-stats",

    "difficulty": 2,

    "question_text": u("\u05d4\u05de\u05de\u05d5\u05e6\u05e2 \u05e9\u05dc $4,6,8,10$ \u05d4\u05d5\u05d0:"),

    "options": ["$7$", "$6$", "$8$", "$28$"],

    "correct_index": 0,

    "explanation": r"$\bar{x}=\frac{28}{4}=7$.",

  },

  {

    "id": "q-g11-u4-rat-1",

    "topic_id": "g11-u4-rational-root",

    "difficulty": 4,

    "question_text": u("\u05e0\u05ea\u05d5\u05e0\u05d4 $f(x)=\\dfrac{x^{2}+1}{x}$. \u05de\u05d4\u05d9 $f'(x)$?"),

    "options": [r"$1-\dfrac{1}{x^{2}}$", r"$\dfrac{2x}{x}$", r"$\dfrac{x^{2}-1}{x^{2}}$", "$2x$"],

    "correct_index": 0,

    "explanation": r"$f(x)=x+\frac{1}{x}\Rightarrow f'(x)=1-\frac{1}{x^{2}}$.",

  },

  {

    "id": "q-g11-u4-int-1",

    "topic_id": "g11-u4-integral",

    "difficulty": 3,

    "question_text": u("\u05de\u05d4\u05d5 $\\displaystyle\\int_{0}^{2} 3x^{2}\\,dx$?"),

    "options": ["$8$", "$6$", "$4$", "$12$"],

    "correct_index": 0,

    "explanation": r"$\big[x^{3}\big]_{0}^{2}=8$.",

  },

  {

    "id": "q-g11-u4-circ-1",

    "topic_id": "g11-u4-analytic-circle",

    "difficulty": 3,

    "question_text": u("\u05de\u05e9\u05d5\u05d5\u05d0\u05ea \u05d4\u05de\u05e2\u05d2\u05dc \u05e9\u05de\u05e8\u05db\u05d6\u05d5 $(0,0)$ \u05d5\u05e8\u05d3\u05d9\u05d5\u05e1\u05d5 $5$ \u05d4\u05d9\u05d0:"),

    "options": ["$x^{2}+y^{2}=25$", "$x^{2}+y^{2}=5$", "$(x-5)^{2}+y^{2}=0$", "$x+y=5$"],

    "correct_index": 0,

    "explanation": r"$x^{2}+y^{2}=R^{2}=25$.",

  },

  {

    "id": "q-g11-u4-sine-1",

    "topic_id": "g11-u4-trig-sine",

    "difficulty": 3,

    "question_text": u("\u05d1\u05de\u05e9\u05d5\u05dc\u05e9 $ABC$: $a=10$, $A=30^\\circ$. \u05dc\u05e4\u05d9 \u05de\u05e9\u05e4\u05d8 \u05d4\u05e1\u05d9\u05e0\u05d5\u05e1\u05d9\u05dd, $\\dfrac{a}{\\sin A}=$:"),

    "options": ["$20$", "$10$", r"$5\sqrt{2}$", r"$\dfrac{10}{\sin 45^\circ}$"],

    "correct_index": 0,

    "explanation": r"$\dfrac{10}{\sin 30^\circ}=20$.",

  },

  {

    "id": "q-g11-u4-reg-1",

    "topic_id": "g11-u4-normal-regression",

    "difficulty": 3,

    "question_text": u("\u05d0\u05dd \u05de\u05e7\u05d3\u05dd \u05d4\u05de\u05ea\u05d0\u05dd \u05d4\u05dc\u05d9\u05e0\u05d0\u05e8\u05d9 \u05d4\u05d5\u05d0 $r=1$, \u05de\u05d4 \u05e0\u05d9\u05ea\u05df \u05dc\u05d5\u05de\u05e8?"),

    "options": [

      u("\u05d4\u05e0\u05e7\u05d5\u05d3\u05d5\u05ea \u05e2\u05dc \u05d9\u05e9\u05e8 \u05e2\u05d5\u05dc\u05d4 \u05d1\u05d3\u05d9\u05d5\u05e7"),

      u("\u05d0\u05d9\u05df \u05e7\u05e9\u05e8 \u05db\u05dc\u05dc"),

      u("\u05d4\u05e7\u05e9\u05e8 \u05e8\u05d9\u05d1\u05d5\u05e2\u05d9 \u05de\u05d5\u05e9\u05dc\u05dd"),

      u("\u05d4\u05df \u05e2\u05dc \u05d9\u05e9\u05e8 \u05d9\u05d5\u05e8\u05d3"),

    ],

    "correct_index": 0,

    "explanation": u("$r=\\pm 1$ \u05de\u05e6\u05d9\u05d9\u05df \u05d4\u05ea\u05d0\u05de\u05d4 \u05dc\u05d9\u05e0\u05d0\u05e8\u05d9\u05ea \u05de\u05d5\u05e9\u05dc\u05de\u05ea; \u05e1\u05d9\u05de\u05df \u05d7\u05d9\u05d5\u05d1\u05d9 = \u05e9\u05d9\u05e4\u05d5\u05e2 \u05d7\u05d9\u05d5\u05d1\u05d9."),

  },

  {

    "id": "q-g11-u4-pl-1",

    "topic_id": "g11-u4-plane-circle",

    "difficulty": 3,

    "question_text": u("\u05d6\u05d5\u05d5\u05d9\u05ea \u05d4\u05d9\u05e7\u05e4\u05d9\u05ea \u05d4\u05e0\u05e9\u05e2\u05e0\u05ea \u05e2\u05dc \u05e7\u05e9\u05ea \u05e9\u05dc $80^\\circ$ \u05d4\u05d9\u05d0 \u05d1\u05d2\u05d5\u05d3\u05dc:"),

    "options": [r"$40^\circ$", r"$80^\circ$", r"$160^\circ$", r"$20^\circ$"],

    "correct_index": 0,

    "explanation": u("\u05d6\u05d5\u05d5\u05d9\u05ea \u05d4\u05d9\u05e7\u05e4\u05d9\u05ea = \u05de\u05d7\u05e6\u05d9\u05ea \u05d4\u05e7\u05e9\u05ea: $\\frac{80}{2}=40^\\circ$."),

  },

  {

    "id": "q-g12-u4-exp-1",

    "topic_id": "g12-u4-exp-log",

    "difficulty": 4,

    "question_text": u("\u05de\u05d4\u05d9 \u05d4\u05e0\u05d2\u05d6\u05e8\u05ea \u05e9\u05dc $f(x)=e^{2x}$?"),

    "options": ["$2e^{2x}$", "$e^{2x}$", "$2e^{x}$", r"$\ln(2x)$"],

    "correct_index": 0,

    "explanation": u("\u05db\u05dc\u05dc \u05d4\u05e9\u05e8\u05e9\u05e8\u05ea: $(e^{g})'=e^{g}\\cdot g' \\Rightarrow 2e^{2x}$."),

  },

  {

    "id": "q-g12-u4-seq-1",

    "topic_id": "g12-u4-sequences",

    "difficulty": 3,

    "question_text": u("\u05d1\u05e1\u05d3\u05e8\u05d4 \u05d7\u05e9\u05d1\u05d5\u05e0\u05d9\u05ea $a_1=3$ \u05d5\u05d4\u05e4\u05e8\u05e9 $d=4$. \u05de\u05d4\u05d5 $a_5$?"),

    "options": ["$19$", "$15$", "$23$", "$12$"],

    "correct_index": 0,

    "explanation": r"$a_5=3+4\cdot 4=19$.",

  },

  {

    "id": "q-g12-u4-gd-1",

    "topic_id": "g12-u4-growth-decay",

    "difficulty": 3,

    "question_text": u("\u05db\u05de\u05d5\u05ea \u05d3\u05d5\u05e2\u05db\u05ea \u05dc\u05e4\u05d9 $N(t)=N_0 e^{-kt}$. \u05d0\u05dd $N=\\frac{N_0}{2}$ \u05d0\u05d6:"),

    "options": [r"$kt=\ln 2$", "$kt=2$", r"$k=\frac{1}{2}$", r"$t=e^{k}$"],

    "correct_index": 0,

    "explanation": r"$\frac{1}{2}=e^{-kt}\Rightarrow kt=\ln 2$.",

  },

  {

    "id": "q-g12-u4-vec-1",

    "topic_id": "g12-u4-vectors",

    "difficulty": 3,

    "question_text": u("\u05d0\u05dd $\\vec{u}=(3,4)$, \u05d0\u05d6 $|\\vec{u}|$ \u05e9\u05d5\u05d5\u05d4 \u05dc:"),

    "options": ["$5$", "$7$", "$12$", r"$\sqrt{7}$"],

    "correct_index": 0,

    "explanation": r"$|\vec{u}|=\sqrt{9+16}=5$.",

  },

  {

    "id": "q-g12-u4-hyp-1",

    "topic_id": "g12-u4-hypothesis",

    "difficulty": 3,

    "question_text": u("\u05d1\u05d4\u05e9\u05e2\u05e8\u05ea \u05d0\u05e4\u05e1 $H_0$, \u05e2\u05e8\u05da $p$ \u05e7\u05d8\u05df \u05de\u05d0\u05d5\u05d3 ($0.01$) \u05de\u05e6\u05d1\u05d9\u05e2 \u05e2\u05dc:"),

    "options": [

      u("\u05e8\u05d0\u05d9\u05d5\u05ea \u05e0\u05d2\u05d3 $H_0$ (\u05d3\u05d7\u05d9\u05d9\u05d4 \u05d0\u05e4\u05e9\u05e8\u05d9\u05ea)"),

      u("\u05d0\u05d9\u05e9\u05d5\u05e8 \u05de\u05d5\u05d7\u05dc\u05d8 \u05e9\u05dc $H_0$"),

      u("\u05e9\u05d2\u05d9\u05d0\u05ea \u05d7\u05d9\u05e9\u05d5\u05d1 \u05d1\u05d4\u05db\u05e8\u05d7"),

      u("\u05e9\u05d0\u05d9\u05df \u05e0\u05ea\u05d5\u05e0\u05d9\u05dd \u05d1\u05db\u05dc\u05dc"),

    ],

    "correct_index": 0,

    "explanation": u("\u05e2\u05e8\u05da $p$ \u05e7\u05d8\u05df \u05de\u05e6\u05d1\u05d9\u05e2 \u05e2\u05dc \u05e8\u05d0\u05d9\u05d5\u05ea \u05dc\u05d3\u05d7\u05d9\u05d9\u05ea $H_0$."),

  },

  {

    "id": "q-g10-u5-fn-1",

    "topic_id": "g10-u5-functions",

    "difficulty": 3,

    "question_text": u("\u05d4\u05d2\u05e8\u05e3 \u05e9\u05dc $y=f(x-2)+3$ \u05de\u05ea\u05e7\u05d1\u05dc \u05de-$y=f(x)$ \u05e2\u05dc \u05d9\u05d3\u05d9:"),

    "options": [

      u("\u05d4\u05d6\u05d6\u05d4 \u05d9\u05de\u05d9\u05e0\u05d4 \u05d1-$2$ \u05d5\u05dc\u05de\u05e2\u05dc\u05d4 \u05d1-$3$"),

      u("\u05d4\u05d6\u05d6\u05d4 \u05e9\u05de\u05d0\u05dc\u05d4 \u05d1-$2$ \u05d5\u05dc\u05de\u05e2\u05dc\u05d4 \u05d1-$3$"),

      u("\u05d4\u05d6\u05d6\u05d4 \u05d9\u05de\u05d9\u05e0\u05d4 \u05d1-$3$ \u05d5\u05dc\u05de\u05e2\u05dc\u05d4 \u05d1-$2$"),

      u("\u05e9\u05d9\u05e7\u05d5\u05e3 \u05e1\u05d1\u05d9\u05d1 \u05e6\u05d9\u05e8 $x$"),

    ],

    "correct_index": 0,

    "explanation": u("$f(x-a)$ \u05de\u05d6\u05d9\u05d6 \u05d9\u05de\u05d9\u05e0\u05d4 \u05d1-$a$; $+b$ \u05de\u05d6\u05d9\u05d6 \u05dc\u05de\u05e2\u05dc\u05d4."),

  },

  {

    "id": "q-g10-u5-diff-1",

    "topic_id": "g10-u5-diff-intro",

    "difficulty": 3,

    "question_text": u("\u05e0\u05ea\u05d5\u05e0\u05d4 $f(x)=2x^{2}-8x+5$. \u05e7\u05d5\u05d0\u05d5\u05e8\u05d3\u05d9\u05e0\u05d5\u05ea \u05d4\u05e7\u05d5\u05d3\u05e7\u05d5\u05d3 \u05d4\u05df:"),

    "options": ["$(2,-3)$", "$(-2,3)$", "$(4,5)$", "$(2,5)$"],

    "correct_index": 0,

    "explanation": r"$x_v=-\frac{b}{2a}=2$, $f(2)=-3$.",

  },

  {

    "id": "q-g10-u5-an-1",

    "topic_id": "g10-u5-analytic",

    "difficulty": 3,

    "question_text": u("\u05d4\u05d0\u05dd \u05d4\u05e0\u05e7\u05d5\u05d3\u05d4 $(3,4)$ \u05e0\u05de\u05e6\u05d0\u05ea \u05e2\u05dc \u05d4\u05de\u05e2\u05d2\u05dc $x^{2}+y^{2}=25$?"),

    "options": [u("\u05db\u05df"), u("\u05dc\u05d0"), u("\u05e8\u05e7 \u05d0\u05dd $x>0$"), u("\u05dc\u05d0 \u05e0\u05d9\u05ea\u05df \u05dc\u05d3\u05e2\u05ea")],

    "correct_index": 0,

    "explanation": r"$3^{2}+4^{2}=25$ .",

  },

  {

    "id": "q-g10-u5-pl-1",

    "topic_id": "g10-u5-plane-geo",

    "difficulty": 3,

    "question_text": u("\u05d1\u05de\u05e9\u05d5\u05dc\u05e9 \u05e9\u05d5\u05d5\u05d4-\u05e9\u05d5\u05e7\u05d9\u05d9\u05dd \u05e2\u05dd \u05d6\u05d5\u05d5\u05d9\u05ea \u05e7\u05d5\u05d3\u05e7\u05d5\u05d3 $40^\\circ$, \u05db\u05dc \u05d0\u05d7\u05ea \u05de\u05d6\u05d5\u05d5\u05d9\u05d5\u05ea \u05d4\u05d1\u05e1\u05d9\u05e1 \u05d4\u05d9\u05d0:"),

    "options": [r"$70^\circ$", r"$40^\circ$", r"$140^\circ$", r"$60^\circ$"],

    "correct_index": 0,

    "explanation": r"$(180-40)/2=70^\circ$.",

  },

  {

    "id": "q-g10-u5-tr-1",

    "topic_id": "g10-u5-trig",

    "difficulty": 3,

    "question_text": u("\u05d0\u05dd $\\sin\\theta=\\dfrac{3}{5}$ \u05d5-$\\theta$ \u05d7\u05d3\u05d4, \u05d0\u05d6 $\\cos\\theta=$:"),

    "options": [r"$\dfrac{4}{5}$", r"$\dfrac{3}{4}$", r"$\dfrac{5}{3}$", r"$\dfrac{5}{4}$"],

    "correct_index": 0,

    "explanation": u("\u05e6\u05dc\u05e2 \u05e1\u05de\u05d5\u05db\u05d4 $\\sqrt{25-9}=4$, \u05dc\u05db\u05df $\\cos\\theta=\\frac{4}{5}$."),

  },

  {

    "id": "q-g11-u5-ind-1",

    "topic_id": "g11-u5-sequences-induction",

    "difficulty": 4,

    "question_text": u("\u05e1\u05d3\u05e8\u05d4 \u05d4\u05e0\u05d3\u05e1\u05d9\u05ea \u05e2\u05dd $a_1=2$ \u05d5\u05de\u05e0\u05d4 $q=3$. \u05de\u05d4\u05d5 $a_4$?"),

    "options": ["$54$", "$24$", "$18$", "$81$"],

    "correct_index": 0,

    "explanation": r"$a_4=2\cdot 3^{3}=54$.",

  },

  {

    "id": "q-g11-u5-ind-2",

    "topic_id": "g11-u5-sequences-induction",

    "difficulty": 4,

    "question_text": u("\u05d1\u05d0\u05d9\u05e0\u05d3\u05d5\u05e7\u05e6\u05d9\u05d4 \u05de\u05ea\u05de\u05d8\u05d9\u05ea, \u05d0\u05d7\u05e8\u05d9 \u05d4\u05d5\u05db\u05d7\u05ea \u05d4\u05d1\u05e1\u05d9\u05e1, \u05de\u05d5\u05db\u05d9\u05d7\u05d9\u05dd \u05d0\u05ea:"),

    "options": [

      u("\u05e6\u05e2\u05d3 \u05d4\u05d0\u05d9\u05e0\u05d3\u05d5\u05e7\u05e6\u05d9\u05d4: \u05de-$n=k$ \u05e0\u05d5\u05d1\u05e2 $n=k+1$"),

      u("\u05e8\u05e7 \u05de\u05e7\u05e8\u05d4 $n=100$"),

      u("\u05e8\u05e7 \u05d3\u05d5\u05d2\u05de\u05d4 \u05de\u05e1\u05e4\u05e8\u05d9\u05ea"),

      u("\u05d4\u05e4\u05e8\u05db\u05d4 \u05d1\u05d3\u05d5\u05d2\u05de\u05d4 \u05e0\u05d2\u05d3\u05d9\u05ea"),

    ],

    "correct_index": 0,

    "explanation": u("\u05de\u05d1\u05e0\u05d4 \u05d4\u05d0\u05d9\u05e0\u05d3\u05d5\u05e7\u05e6\u05d9\u05d4: \u05d1\u05e1\u05d9\u05e1 + \u05e6\u05e2\u05d3."),

  },

  {

    "id": "q-g11-u5-diff-1",

    "topic_id": "g11-u5-differential",

    "difficulty": 4,

    "question_text": u("\u05dc\u05e4\u05d5\u05e0\u05e7\u05e6\u05d9\u05d4 $f(x)=\\sqrt{x}$ ($x>0$), \u05d4\u05e0\u05d2\u05d6\u05e8\u05ea \u05d4\u05d9\u05d0:"),

    "options": [r"$\dfrac{1}{2\sqrt{x}}$", r"$\sqrt{x}$", r"$\dfrac{1}{x}$", r"$2\sqrt{x}$"],

    "correct_index": 0,

    "explanation": r"$f'(x)=\frac{1}{2\sqrt{x}}$.",

  },

  {

    "id": "q-g11-u5-int-1",

    "topic_id": "g11-u5-integral",

    "difficulty": 3,

    "question_text": u("\u05d0\u05dd $F'(x)=f(x)$ \u05d5-$F(0)=1$, $F(2)=5$, \u05d0\u05d6 $\\displaystyle\\int_{0}^{2} f(x)\\,dx=$:"),

    "options": ["$4$", "$5$", "$1$", "$6$"],

    "correct_index": 0,

    "explanation": r"$F(2)-F(0)=4$.",

  },

  {

    "id": "q-g11-u5-trig-1",

    "topic_id": "g11-u5-trig-advanced",

    "difficulty": 4,

    "question_text": u("\u05d4\u05d6\u05d4\u05d5\u05ea $\\sin^{2}\\theta+\\cos^{2}\\theta$ \u05e9\u05d5\u05d5\u05d4 \u05dc:"),

    "options": ["$1$", "$0$", r"$\tan^{2}\theta$", "$2$"],

    "correct_index": 0,

    "explanation": r"$\sin^{2}\theta+\cos^{2}\theta=1$.",

  },

  {

    "id": "q-g11-u5-trcalc-1",

    "topic_id": "g11-u5-trig-calc",

    "difficulty": 4,

    "question_text": u("\u05de\u05d4\u05d9 $(\\sin x)'$?"),

    "options": [r"$\cos x$", r"$-\sin x$", r"$-\cos x$", r"$\tan x$"],

    "correct_index": 0,

    "explanation": r"$(\sin x)'=\cos x$.",

  },

  {

    "id": "q-g11-u5-prob-1",

    "topic_id": "g11-u5-probability",

    "difficulty": 3,

    "question_text": u("\u05de\u05d8\u05d9\u05dc\u05d9\u05dd \u05e9\u05ea\u05d9 \u05e7\u05d5\u05d1\u05d9\u05d5\u05ea \u05d4\u05d5\u05d2\u05e0\u05d5\u05ea. \u05d4\u05d4\u05e1\u05ea\u05d1\u05e8\u05d5\u05ea \u05dc\u05e1\u05db\u05d5\u05dd $7$ \u05d4\u05d9\u05d0:"),

    "options": [r"$\dfrac{6}{36}=\dfrac{1}{6}$", r"$\dfrac{1}{12}$", r"$\dfrac{7}{36}$", r"$\dfrac{1}{2}$"],

    "correct_index": 0,

    "explanation": u("\u05d9\u05e9 $6$ \u05ea\u05d5\u05e6\u05d0\u05d5\u05ea \u05de\u05ea\u05d5\u05da $36$: $\\frac{1}{6}$."),

  },

  {

    "id": "q-g12-u5-hyp-1",

    "topic_id": "g12-u5-analytic-hyperbola",

    "difficulty": 4,

    "question_text": u("\u05d4\u05d4\u05d9\u05e4\u05e8\u05d1\u05d5\u05dc\u05d4 $\\dfrac{x^{2}}{9}-\\dfrac{y^{2}}{4}=1$ \u05d7\u05d5\u05e6\u05d4 \u05d0\u05ea \u05e6\u05d9\u05e8 $x$ \u05d1:"),

    "options": [r"$(\pm 3,0)$", r"$(\pm 9,0)$", r"$(0,\pm 2)$", r"$(\pm 2,0)$"],

    "correct_index": 0,

    "explanation": u("\u05e2\u05d1\u05d5\u05e8 $y=0$: $x=\\pm 3$."),

  },

  {

    "id": "q-g12-u5-vec-1",

    "topic_id": "g12-u5-vectors",

    "difficulty": 4,

    "question_text": u("\u05d4\u05de\u05db\u05e4\u05dc\u05d4 \u05d4\u05e1\u05e7\u05dc\u05e8\u05d9\u05ea \u05e2\u05d1\u05d5\u05e8 $\\vec{a}=(1,2,2)$, $\\vec{b}=(2,0,1)$ \u05d4\u05d9\u05d0:"),

    "options": ["$4$", "$5$", "$2$", "$0$"],

    "correct_index": 0,

    "explanation": r"$1\cdot 2+2\cdot 0+2\cdot 1=4$.",

  },

  {

    "id": "q-g12-u5-cpx-1",

    "topic_id": "g12-u5-complex",

    "difficulty": 4,

    "question_text": u("\u05de\u05d4\u05d5 $|3+4i|$?"),

    "options": ["$5$", "$7$", "$12$", r"$\sqrt{7}$"],

    "correct_index": 0,

    "explanation": r"$|a+bi|=\sqrt{a^{2}+b^{2}}=5$.",

  },

  {

    "id": "q-g12-u5-exp-1",

    "topic_id": "g12-u5-exp-log",

    "difficulty": 4,

    "question_text": u("\u05de\u05d4\u05d9 $(\\ln x)'$ \u05e2\u05d1\u05d5\u05e8 $x>0$?"),

    "options": [r"$\dfrac{1}{x}$", r"$\ln x$", r"$e^{x}$", "$x$"],

    "correct_index": 0,

    "explanation": r"$(\ln x)'=\frac{1}{x}$.",

  },

]



root = Path(__file__).resolve().parents[1]

out = root / "src" / "data" / "questions" / "highSchoolQuestions.js"



parts = ["/** \u05de\u05d0\u05d2\u05e8 \u05e9\u05d0\u05dc\u05d5\u05ea \u2014 \u05d7\u05d8\\\"\u05e2 /\u05dc\u05e4\u05d9 topic_id */\n\nexport const QUESTIONS = [\n"]

for i, item in enumerate(questions):

    blob = json.dumps(item, ensure_ascii=False, indent=2)

    indented = "\n".join("  " + line for line in blob.splitlines())

    parts.append(indented)

    parts.append(",\n" if i < len(questions) - 1 else "\n")

parts.append("];\n\nexport function getQuestionsForTopic(topicId) {\n  return QUESTIONS.filter((q) => q.topic_id === topicId);\n}\n")



text = "".join(parts)

# The header used unicode escapes in the source of this py file - decode the comment

text = text.encode("utf-8").decode("utf-8")

out.write_text(text, encoding="utf-8")

heb = sum(1 for c in text if "\u0590" <= c <= "\u05FF")

print(f"Wrote {len(questions)} questions, {heb} Hebrew chars -> {out}")

