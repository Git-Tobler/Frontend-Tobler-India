import { chromium } from 'playwright';

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
await page.goto('http://localhost:5173/manufacturing', { waitUntil: 'networkidle' });

// Scroll to Facility section and down to show capabilities + video
await page.evaluate(() => {
  const facility = document.getElementById('facility');
  if (facility) {
    facility.scrollIntoView();
    window.scrollBy(0, 400);
  }
});

await page.waitForTimeout(1500);
await page.screenshot({ path: 'facility-full.png' });
await browser.close();
console.log('Full Facility section screenshot saved');
