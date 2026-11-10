import re
import json

with open("/tmp/didm-media-coverage.html", "r", encoding="utf-8") as f:
    html = f.read()

# Let's inspect paragraphs and content between main headings
# Cut from "Delhi Institute of Digital Marketing - DIDM Media Coverage" to footer "Trending Blog"
start_idx = html.find("Delhi Institute of")
end_idx = html.find("Trending Blog")
if start_idx != -1 and end_idx != -1:
    main_body = html[start_idx:end_idx]
else:
    main_body = html

# Search for external links (e.g. news articles, publications)
external_links = re.findall(r'<a[^>]+href=["\x27](https?://(?!www\.didm\.in)[^"\x27]+)["\x27][^>]*>(.*?)</a>', main_body, re.IGNORECASE | re.DOTALL)
print("EXTERNAL LINKS IN MAIN CONTENT:")
for href, txt in external_links:
    clean_txt = re.sub(r'<[^>]+>', '', txt).strip()
    print(f" - [{clean_txt}] -> {href}")

# Search for internal links to news-and-events or articles
news_links = re.findall(r'<a[^>]+href=["\x27](https?://www\.didm\.in/news-and-events/[^"\x27]+)["\x27][^>]*>(.*?)</a>', main_body, re.IGNORECASE | re.DOTALL)
print("\nNEWS-AND-EVENTS LINKS IN MAIN CONTENT:")
for href, txt in news_links:
    clean_txt = re.sub(r'<[^>]+>', '', txt).strip()
    print(f" - [{clean_txt}] -> {href}")

# Search for all image tags in main_body
body_imgs = re.findall(r'<img[^>]+src=["\x27]([^"\x27]+)["\x27][^>]*alt=["\x27]([^"\x27]*)["\x27]', main_body, re.IGNORECASE)
print(f"\nIMAGES IN MAIN CONTENT ({len(body_imgs)}):")
for src, alt in body_imgs:
    print(f" - {src} (alt: {alt})")


