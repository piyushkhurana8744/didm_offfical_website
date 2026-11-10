import re

with open("/tmp/didm-media-coverage.html", "r", encoding="utf-8") as f:
    html = f.read()

# Find all occurrences of "img" or ".jpg" or ".png" or ".webp"
image_urls = re.findall(r'[\'"]([^\'"]+?\.(?:jpg|jpeg|png|webp|gif))[\'"]', html, re.IGNORECASE)
print(f"Total image URL matches: {len(image_urls)}")
unique_imgs = sorted(list(set(image_urls)))
for u in unique_imgs:
    print(" -", u)

