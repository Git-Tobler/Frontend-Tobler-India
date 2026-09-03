import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { load } from 'cheerio';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.Cloudinary_API_KEY,
  api_secret: process.env.Cloudinary_API_SECRET,
});

const WEBSITE_URL = 'https://www.tobler-in.com';
const resourcesPath = path.join(__dirname, '../src/data/resources.js');
const resources = { images: [], videos: [], documents: [], pdfs: [] };
const visited = new Set();
const queue = [WEBSITE_URL];

console.log('🚀 Starting resource scrape from', WEBSITE_URL);

async function fetchPage(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    return await res.text();
  } catch (err) {
    console.error(`❌ Failed to fetch ${url}:`, err.message);
    return null;
  }
}

async function uploadToCloudinary(url, type) {
  try {
    const resourceType = type === 'videos' ? 'video' : type === 'pdfs' ? 'raw' : 'image';
    const result = await cloudinary.uploader.upload(url, {
      resource_type: resourceType,
      folder: 'tobler-resources',
    });
    return result.secure_url;
  } catch (err) {
    console.warn(`⚠️ Skipped ${url.split('/').pop()}`);
    return null;
  }
}

async function scrapeResources() {
  while (queue.length > 0) {
    const url = queue.shift();
    if (visited.has(url)) continue;
    visited.add(url);

    const html = await fetchPage(url);
    if (!html) continue;

    const $ = load(html);

    // Extract images
    $('img').each((_, el) => {
      const src = $(el).attr('src');
      if (src && !src.startsWith('data:')) {
        const fullUrl = new URL(src, WEBSITE_URL).href;
        if (!resources.images.includes(fullUrl)) resources.images.push(fullUrl);
      }
    });

    // Extract videos
    $('video source, iframe').each((_, el) => {
      const src = $(el).attr('src');
      if (src) {
        const fullUrl = new URL(src, WEBSITE_URL).href;
        if (!resources.videos.includes(fullUrl)) resources.videos.push(fullUrl);
      }
    });

    // Extract PDFs and documents
    $('a[href*=".pdf"], a[href*=".doc"], a[href*=".xlsx"]').each((_, el) => {
      const href = $(el).attr('href');
      if (href) {
        const fullUrl = new URL(href, WEBSITE_URL).href;
        if (href.endsWith('.pdf')) {
          if (!resources.pdfs.includes(fullUrl)) resources.pdfs.push(fullUrl);
        } else {
          if (!resources.documents.includes(fullUrl)) resources.documents.push(fullUrl);
        }
      }
    });

    // Queue internal links
    $('a[href]').each((_, el) => {
      const href = $(el).attr('href');
      if (href && href.startsWith('/')) {
        const fullUrl = new URL(href, WEBSITE_URL).href;
        if (!visited.has(fullUrl) && queue.length < 50) queue.push(fullUrl);
      }
    });
  }

  console.log(`\n📊 Found ${resources.images.length} images, ${resources.videos.length} videos, ${resources.documents.length} documents, ${resources.pdfs.length} PDFs`);

  // Upload to Cloudinary
  console.log('\n⬆️ Uploading to Cloudinary...');
  const uploaded = {};

  for (const [type, urls] of Object.entries(resources)) {
    uploaded[type] = [];
    for (const url of urls.slice(0, 50)) { // Limit to 50 per type
      const cloudUrl = await uploadToCloudinary(url, type === 'videos' ? 'video' : 'image');
      if (cloudUrl) {
        uploaded[type].push(cloudUrl);
        console.log(`✅ ${type}: ${cloudUrl.split('/').pop()}`);
      }
    }
  }

  // Save to resources file
  await fs.writeFile(
    resourcesPath,
    `export const resources = ${JSON.stringify(uploaded, null, 2)};`
  );
  console.log(`\n✨ Resources saved to src/data/resources.js`);
}

scrapeResources().catch(console.error);
