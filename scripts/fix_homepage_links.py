# -*- coding: utf-8 -*-
from pathlib import Path

path = Path(__file__).resolve().parents[1] / "src/pages/HomePage.jsx"
text = path.read_text(encoding="utf-8")
old = """        <div className=\"mt-6 flex flex-wrap gap-3\">
          <button
            type=\"button\"
            className=\"rounded-xl bg-[var(--color-teal)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-teal-dark)]\"
          >
            \u05db\u05e0\u05d9\u05e1\u05d4 / \u05d4\u05e8\u05e9\u05de\u05d4
          </button>
          <p className=\"self-center text-sm text-[var(--color-slate)]\">
            (\u05d7\u05d9\u05d1\u05d5\u05e8 \u05dc-Supabase Auth \u2014 \u05d1\u05e9\u05dc\u05d1 \u05d4\u05d1\u05d0)
          </p>
        </div>"""
new = """        <div className=\"mt-6 flex flex-wrap gap-3\">
          <Link
            to=\"/custom-test\"
            className=\"rounded-xl bg-[var(--color-teal)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-teal-dark)]\"
          >
            \u05de\u05d1\u05d7\u05df \u05de\u05d5\u05ea\u05d0\u05dd \u05d0\u05d9\u05e9\u05d9\u05ea
          </Link>
          <Link
            to=\"/parent\"
            className=\"rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-[var(--color-ink)] ring-1 ring-black/10 hover:ring-[var(--color-teal)]/40\"
          >
            \u05dc\u05d4\u05d5\u05e8\u05d9\u05dd \u05d5\u05de\u05d5\u05e8\u05d9\u05dd
          </Link>
        </div>"""
if old not in text:
    # try without escaping - file already has hebrew
    old2 = """        <div className=\"mt-6 flex flex-wrap gap-3\">
          <button
            type=\"button\"
            className=\"rounded-xl bg-[var(--color-teal)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-teal-dark)]\"
          >
            ????? / ?????
          </button>
          <p className=\"self-center text-sm text-[var(--color-slate)]\">
            (????? ?-Supabase Auth — ???? ???)
          </p>
        </div>"""
    if old2 not in text:
        i = text.find("mt-6 flex")
        print("NOT FOUND", repr(text[i : i + 400]))
        raise SystemExit(1)
    text = text.replace(old2, new)
else:
    text = text.replace(old, new)
path.write_text(text, encoding="utf-8")
print("ok", "???? ?????" in path.read_text(encoding="utf-8"))
