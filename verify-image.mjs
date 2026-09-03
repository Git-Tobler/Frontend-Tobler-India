import { chromium } from 'playwright';
import https from 'https';

const browser = await chromium.launch();
const page = await browser.newPage();

// Intercept network requests to see the image URL and its response
page.on('response', response => {
  if (response.url().includes('swiss-engineer')) {
    console.log('Image URL:', response.url());
    console.log('Status:', response.status());
    console.log('Content-Type:', response.headers()['content-type']);
  }
});

await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });

// Get the actual src
const src = await page.evaluate(() => {
  const img = document.querySelector('img[alt="Swiss Engineer"]');
  return img ? img.src : null;
});

console.log('\nImage src attribute:', src);

// Check if image loaded successfully
const loaded = await page.evaluate(() => {
  const img = document.querySelector('img[alt="Swiss Engineer"]');
  if (!img) return false;
  return img.complete && img.naturalHeight > 0;
});

console.log('Image loaded successfully:', loaded);

// Get natural dimensions
const naturalDims = await page.evaluate(() => {
  const img = document.querySelector('img[alt="Swiss Engineer"]');
  if (!img) return null;
  return {
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight,
    complete: img.complete,
    currentSrc: img.currentSrc
  };
});

console.log('Natural dimensions:', naturalDims);

await browser.close();
