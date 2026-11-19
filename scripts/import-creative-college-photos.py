"""Cache the already-approved DIDM seminar photographs without altering pixels."""
import concurrent.futures
import hashlib
import json
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'apps/web/public/images/didm/colleges/sessions'
DEST.mkdir(parents=True, exist_ok=True)
SOURCE = ROOT / 'apps/web/src/data/didm-college-sessions.json'
MANIFEST = ROOT / 'apps/web/src/data/creative-college-photos.json'
urls = sorted({url for row in json.loads(SOURCE.read_text()) for url in row['images']})

def download(url):
    parsed = urlparse(url)
    if parsed.scheme != 'https' or parsed.netloc != 'www.didm.in' or not parsed.path.startswith('/assets/uploads/gallery/'):
        raise ValueError('Unexpected source host/path')
    name = hashlib.sha256(url.encode()).hexdigest()[:16] + Path(parsed.path).suffix.lower()
    target = DEST / name
    if not target.exists():
        with urlopen(Request(url, headers={'User-Agent':'Mozilla/5.0 DIDM local asset import'}), timeout=25) as response:
            if not response.headers.get('Content-Type', '').startswith('image/'):
                raise ValueError('Source did not return an image')
            data = response.read()
        target.write_bytes(data)
    return url, '/images/didm/colleges/sessions/' + name

results = {}
failures = []
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
    pending = {pool.submit(download, url): url for url in urls}
    for count, future in enumerate(concurrent.futures.as_completed(pending), 1):
        try:
            original, local = future.result()
            results[original] = local
        except Exception as error:
            failures.append({'url': pending[future], 'error': str(error)})
        if count % 25 == 0:
            print(f'{count}/{len(urls)} processed; {len(failures)} errors', flush=True)
MANIFEST.write_text(json.dumps(results, indent=2) + '\n')
(ROOT / 'docs/audit_screenshots/creative/college-asset-import.json').write_text(json.dumps({'total': len(urls), 'imported': len(results), 'failures': failures}, indent=2) + '\n')
print(json.dumps({'total':len(urls),'imported':len(results),'failures':failures[:3]}), flush=True)
if failures:
    raise SystemExit(1)
