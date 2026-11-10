import re

with open("/tmp/didm-media-coverage.html", "r", encoding="utf-8") as f:
    html = f.read()

# Let's extract each award section cleanly
# Find each section by its h2 / h3
pattern = r'(<(?:h2|h3)[^>]*>.*?</(?:h2|h3)>.*?(?=(?:<(?:h2|h3)[^>]*>)|$))'
matches = re.findall(pattern, html, re.DOTALL | re.IGNORECASE)

print(f"Total matching blocks: {len(matches)}")
for i, m in enumerate(matches):
    clean = re.sub(r'<[^>]+>', ' ', m)
    clean = re.sub(r'\s+', ' ', clean).strip()
    if any(k in clean.lower() for k in ["noida", "assocham", "fame", "wasme", "msme", "just dial", "franchise", "economic"]):
        print(f"\n--- BLOCK {i} ---")
        print(clean[:350])
