import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.Cloudinary_API_KEY,
  api_secret: process.env.Cloudinary_API_SECRET,
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function verifyResources() {
  console.log('📊 Verifying Cloudinary resources...\n');

  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'tobler-resources',
      max_results: 500,
    });

    const organized = {
      images: [],
      videos: [],
      pdfs: [],
      documents: [],
    };

    const resources = result.resources || [];
    console.log(`✅ Found ${resources.length} total resources\n`);

    for (const resource of resources) {
      const url = resource.secure_url;
      const filename = resource.public_id.split('/').pop().toLowerCase();

      if (resource.resource_type === 'video') {
        organized.videos.push(url);
      } else if (filename.includes('.pdf')) {
        organized.pdfs.push(url);
      } else if (filename.includes('.doc') || filename.includes('.xlsx')) {
        organized.documents.push(url);
      } else {
        organized.images.push(url);
      }
    }

    console.log(`📷 Images: ${organized.images.length}`);
    console.log(`🎬 Videos: ${organized.videos.length}`);
    console.log(`📕 PDFs: ${organized.pdfs.length}`);
    console.log(`📄 Documents: ${organized.documents.length}`);

    // Save organized resources
    const resourcesPath = path.join(__dirname, '../src/data/resources.js');
    await fs.writeFile(
      resourcesPath,
      `export const resources = ${JSON.stringify(organized, null, 2)};\n`
    );

    console.log(`\n✨ Resources organized and saved to src/data/resources.js`);
    console.log(`\n📂 All resources are in: https://res.cloudinary.com/${process.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/tobler-resources/`);
  } catch (err) {
    console.error('Error:', err.error?.message || err.message);
  }
}

verifyResources();
