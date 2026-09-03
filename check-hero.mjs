import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });

// Check if the swiss-engineer image exists
const imgElement = await page.$('img[alt="Swiss Engineer"]');
if (imgElement) {
  const src = await imgElement.getAttribute('src');
  const display = await page.evaluate(() => {
    const img = document.querySelector('img[alt="Swiss Engineer"]');
    return img ? window.getComputedStyle(img).display : 'not found';
  });
  
  console.log('✓ Image element found');
  console.log('  src:', src ? src.substring(0, 100) + '...' : 'NULL/EMPTY');
  console.log('  display:', display);
  
  if (!src) {
    console.log('  ⚠ WARNING: src is empty or null!');
  }
} else {
  console.log('✗ Swiss Engineer image element NOT found in DOM');
}

await browser.close();
