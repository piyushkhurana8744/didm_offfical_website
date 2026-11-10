import re
import json

with open("/tmp/didm-media-coverage.html", "r", encoding="utf-8") as f:
    html = f.read()

# Let us split the page into the main award sections
# We noticed headings:
# 1. Trending News
# 2. Noida Education Conclave Award 2026
# 3. For the third time, DIDM has won the ASSOCHAM Award! (9th MSME Excellence Award)
# 4. DIDM receives the eminent Fair Business Practices Award by ASSOCHAM (8th MSME Excellence Awards)
# 5. DIDM receives the International Fame Awards 2021 (IFA Awards)
# 6. DIDM receives the WASME SME Excellence Awards 2021 (WASME SME EXCELLENCE Awards)
# 7. DIDM receives the Most Promising Brand Award by ASSOCHAM (6th SMEs Excellence Awards 2018)
# 8. OTHER AWARDS & RECOGNITIONS

# Let us extract blocks of text around these headings
keywords = [
    "Trending News",
    "Noida Education Conclave Award",
    "For the third time, DIDM has won the ASSOCHAM Award",
    "DIDM receives the eminent Fair Business Practices Award",
    "DIDM receives the International Fame Awards 2021",
    "DIDM receives the WASME SME Excellence Awards 2021",
    "DIDM receives the Most Promising Brand Award by ASSOCHAM",
    "OTHER AWARDS & RECOGNITIONS",
    "Trending Blog"
]

indices = []
for kw in keywords:
    pos = html.find(kw)
    if pos != -1:
        indices.append((pos, kw))

indices.sort()

sections_extracted = []
for i in range(len(indices)):
    start_pos, kw = indices[i]
    end_pos = indices[i+1][0] if i+1 < len(indices) else len(html)
    chunk = html[start_pos:end_pos]
    
    # Extract text, p, h2, h3, img, a
    p_tags = [re.sub(r'<[^>]+>', ' ', p).strip() for p in re.findall(r'<p[^>]*>(.*?)</p>', chunk, re.DOTALL)]
    h_tags = [re.sub(r'<[^>]+>', ' ', h).strip() for h in re.findall(r'<h[1-4][^>]*>(.*?)</h[1-4]>', chunk, re.DOTALL)]
    chunk_imgs = re.findall(r'src=["\x27]([^"\x27]+)["\x27]', chunk)
    img_urls = [u for u in chunk_imgs if any(ext in u.lower() for ext in ['.jpg', '.jpeg', '.png', '.webp'])]
    chunk_links = []
    for href, text in re.findall(r'<a[^>]+href=["\x27]([^"\x27]+)["\x27][^>]*>(.*?)</a>', chunk, re.DOTALL):
        chunk_links.append({"href": href, "text": re.sub(r'<[^>]+>', ' ', text).strip()})
        
    sections_extracted.append({
        "section": kw,
        "headings": h_tags,
        "paragraphs": [p for p in p_tags if p],
        "images": img_urls,
        "links": chunk_links
    })

with open("/tmp/parsed_media_sections.json", "w", encoding="utf-8") as out:
    json.dump(sections_extracted, out, indent=2)

print(f"Extracted {len(sections_extracted)} sections.")
for s in sections_extracted:
    print(f"\n=== {s['section']} ===")
    print("Headings:", s['headings'])
    print("Paragraphs count:", len(s['paragraphs']))
    for p in s['paragraphs'][:3]:
        print("  P:", p[:120], "...")
    print("Images count:", len(s['images']))
    for im in s['images']:
        print("  Img:", im)
    print("Links count:", len(s['links']))
    for l in s['links']:
        print("  Link:", l['text'][:60], "->", l['href'])

