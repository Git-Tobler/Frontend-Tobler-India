import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://localhost:5173/manufacturing', { waitUntil: 'networkidle' });

// Scroll to Facility section
await page.evaluate(() => {
  const facility = document.getElementById('facility');
  if (facility) facility.scrollIntoView();
});

await page.waitForTimeout(2000);
await page.screenshot({ path: 'facility-section.png' });
await browser.close();
console.log('Facility section screenshot saved');
