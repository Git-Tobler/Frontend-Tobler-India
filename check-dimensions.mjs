import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });

const info = await page.evaluate(() => {
  const img = document.querySelector('img[alt="Swiss Engineer"]');
  if (!img) return null;
  
  const rect = img.getBoundingClientRect();
  const style = window.getComputedStyle(img);
  
  return {
    boundingRect: {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      visible: rect.width > 0 && rect.height > 0
    },
    computed: {
      zIndex: style.zIndex,
      position: style.position,
      visibility: style.visibility,
      opacity: style.opacity,
      width: style.width,
      height: style.height,
      display: style.display,
      maxWidth: style.maxWidth
    }
  };
});

if (info) {
  console.log('Image dimensions:', JSON.stringify(info, null, 2));
} else {
  console.log('Image not found');
}

await browser.close();
