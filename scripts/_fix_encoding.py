from pathlib import Path
p = Path("scripts/build_middle_school.py")
raw = p.read_bytes()
text = raw.decode("utf-8", errors="replace")
text = text.replace("\ufffd", "-")
p.write_text(text, encoding="utf-8")
print("rewrote", p, "ok")
