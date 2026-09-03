import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });
await page.screenshot({ path: './hero-screenshot.png', fullPage: false });
console.log('Screenshot saved to hero-screenshot.png');
await browser.close();
