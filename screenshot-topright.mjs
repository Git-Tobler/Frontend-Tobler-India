import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });

// Get a larger crop of top-right
await page.screenshot({ 
  path: './hero-topright.png',
  clip: { x: 800, y: 0, width: 500, height: 200 }
});
console.log('Top-right screenshot saved');

await browser.close();
