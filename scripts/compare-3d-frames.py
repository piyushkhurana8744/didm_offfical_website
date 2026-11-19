"""Compare only rendered scene regions, excluding captions and all surrounding UI."""
from pathlib import Path
from PIL import Image, ImageChops, ImageStat
import json
root=Path('docs/audit_screenshots/3d/visibility')
results=[]
for first in sorted(root.glob('*/*-frame-1.png')):
    second=Path(str(first).replace('-frame-1.png','-frame-2.png'))
    if not second.exists(): continue
    a=Image.open(first).convert('RGB');b=Image.open(second).convert('RGB')
    # Crop away the Canvas border and bottom HTML caption and floating chat launcher.
    region=(12,12,a.width-12,a.height-90)
    a=a.crop(region);b=b.crop(region);diff=ImageChops.difference(a,b)
    pixels=list(diff.getdata());changed=sum(max(px)>5 for px in pixels)
    results.append({'scene':first.stem.replace('-frame-1',''),'mode':first.parent.name,
                    'region':region,'mean_rgb_absolute_delta':ImageStat.Stat(diff).mean,
                    'pixels_changed_over_5':changed,'changed_percent':100*changed/len(pixels)})
(root/'frame-comparisons.json').write_text(json.dumps(results,indent=2))
print(f'Compared {len(results)} scene pairs; all have changing pixels: {all(x["pixels_changed_over_5"]>0 for x in results)}')
