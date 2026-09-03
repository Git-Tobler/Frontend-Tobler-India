import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });

// Crop to top-right corner
await page.screenshot({ 
  path: './hero-corner.png',
  clip: { x: 900, y: 0, width: 400, height: 150 }
});
console.log('Corner screenshot saved');

await browser.close();
