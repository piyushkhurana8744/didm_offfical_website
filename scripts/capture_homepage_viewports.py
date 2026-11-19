import asyncio
import os
from playwright.async_api import async_playwright

VIEWPORTS = [
    {"name": "desktop_1920", "width": 1920, "height": 1080},
    {"name": "desktop_1440", "width": 1440, "height": 900},
    {"name": "laptop_1280", "width": 1280, "height": 800},
    {"name": "tablet_768", "width": 768, "height": 1024},
    {"name": "mobile_390", "width": 390, "height": 844},
    {"name": "mobile_375", "width": 375, "height": 812},
]

OUT_DIR = "docs/audit_screenshots/redesign"

async def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        for vp in VIEWPORTS:
            context = await browser.new_context(
                viewport={"width": vp["width"], "height": vp["height"]},
                device_scale_factor=1,
            )
            page = await context.new_page()
            url = "http://localhost:3005/"
            print(f"Loading {url} at {vp['name']} ({vp['width']}x{vp['height']})...")
            try:
                await page.goto(url, wait_until="networkidle", timeout=25000)
                await page.wait_for_timeout(1000)
                
                # Check hero element width vs viewport width
                hero_banner = page.locator("section.relative >> img >> nth=0")
                is_visible = await hero_banner.is_visible()
                bbox = await hero_banner.bounding_box() if is_visible else None
                print(f"Hero Image visible: {is_visible}, Bounding Box: {bbox}")

                filename = f"{OUT_DIR}/homepage_{vp['name']}.png"
                await page.screenshot(path=filename, full_page=True)
                print(f"Saved screenshot: {filename}")
            except Exception as e:
                print(f"Error on {vp['name']}: {e}")
            finally:
                await context.close()
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())

