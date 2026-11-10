import re
import json

with open("/tmp/didm-media-coverage.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Images
img_tags = re.findall(r"<img[^>]+>", html, re.IGNORECASE)
images = []
for tag in img_tags:
    src_m = re.search(r'src=["\x27]([^"\x27]+)["\x27]', tag)
    alt_m = re.search(r'alt=["\x27]([^"\x27]*)["\x27]', tag)
    if src_m:
        images.append({"src": src_m.group(1), "alt": alt_m.group(1) if alt_m else ""})

# 2. Links
a_tags = re.findall(r'<a[^>]+href=["\x27]([^"\x27]+)["\x27][^>]*>(.*?)</a>', html, re.IGNORECASE | re.DOTALL)
links = []
for href, text in a_tags:
    clean_text = re.sub(r'<[^>]+>', '', text).strip()
    links.append({"href": href, "text": clean_text})

# 3. Sections extraction
# Let's find sections or headings and their subsequent content
sections = []
parts = re.split(r'<h[1-3][^>]*>', html, flags=re.IGNORECASE)
headers = re.findall(r'<h([1-3])[^>]*>(.*?)</h\1>', html, flags=re.IGNORECASE | re.DOTALL)

print(f"Total images: {len(images)}")
print(f"Total links: {len(links)}")
print(f"Total headers: {len(headers)}")

with open("/tmp/extracted_media_page.json", "w", encoding="utf-8") as out:
    json.dump({
        "images": images,
        "links": links,
        "headers": [(h[0], re.sub(r'<[^>]+>', '', h[1]).strip()) for h in headers]
    }, out, indent=2)

print("Saved extraction summary to /tmp/extracted_media_page.json")

