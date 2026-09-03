import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.Cloudinary_API_KEY,
  api_secret: process.env.Cloudinary_API_SECRET,
});

const FOLDERS = ['Photos', 'Videos', 'Brochures', 'Charts', 'Logos'];
const MAIN_FOLDER = 'Tobler-Resources';

async function createFolders() {
  console.log(`📁 Creating folder structure under ${MAIN_FOLDER}...`);
  for (const folder of FOLDERS) {
    const path = `${MAIN_FOLDER}/${folder}`;
    try {
      await cloudinary.api.create_folder(path);
      console.log(`✅ Created: ${path}`);
    } catch (err) {
      if (err.message.includes('already exists')) {
        console.log(`✓ Exists: ${path}`);
      } else {
        console.error(`❌ Error creating ${path}:`, err.message);
      }
    }
  }
}

async function organizeResources() {
  console.log(`\n📊 Organizing resources...`);

  try {
    console.log('Fetching resources from Cloudinary...');
    const resources = await cloudinary.api.resources({
      prefix: 'tobler-resources',
      max_results: 500,
    });

    console.log(`Found ${resources.resources?.length || 0} resources`);
    const organized = { photos: [], videos: [], brochures: [], charts: [], logos: [], other: [] };

    for (const resource of resources.resources) {
      const url = resource.public_id;
      const filename = url.split('/').pop().toLowerCase();

      if (resource.resource_type === 'video') {
        organized.videos.push(url);
      } else if (filename.includes('pdf') || filename.includes('katalog') || filename.includes('brochure')) {
        organized.brochures.push(url);
      } else if (filename.includes('chart') || filename.includes('graph') || filename.includes('diagram')) {
        organized.charts.push(url);
      } else if (filename.includes('logo')) {
        organized.logos.push(url);
      } else if (resource.resource_type === 'image') {
        organized.photos.push(url);
      } else {
        organized.other.push(url);
      }
    }

    console.log('\n📈 Current Resources:');
    console.log(`📷 Photos: ${organized.photos.length}`);
    console.log(`🎬 Videos: ${organized.videos.length}`);
    console.log(`📕 Brochures: ${organized.brochures.length}`);
    console.log(`📊 Charts: ${organized.charts.length}`);
    console.log(`🏷️ Logos: ${organized.logos.length}`);
    console.log(`📦 Other: ${organized.other.length}`);

    // Move resources to proper folders
    console.log(`\n🚀 Moving resources to folders...`);

    for (const [type, urls] of Object.entries(organized)) {
      if (type === 'other') continue;
      const folderMap = {
        photos: 'Photos',
        videos: 'Videos',
        brochures: 'Brochures',
        charts: 'Charts',
        logos: 'Logos',
      };
      const folder = folderMap[type];

      for (const url of urls) {
        try {
          await cloudinary.api.rename(url, `${MAIN_FOLDER}/${folder}/${url.split('/').pop()}`);
        } catch (err) {
          // Already in folder or other error
        }
      }
    }

    console.log(`✅ Organization complete`);
  } catch (err) {
    console.error('❌ Error:', err.message || err);
    console.error('Full error:', err);
  }
}

async function listFolderStructure() {
  console.log(`\n📂 Folder Structure:`);
  try {
    for (const folder of [MAIN_FOLDER, ...FOLDERS.map(f => `${MAIN_FOLDER}/${f}`)]) {
      const resources = await cloudinary.api.resources({
        prefix: folder,
        max_results: 100,
      });
      console.log(`\n${folder}: ${resources.resources.length} items`);
      resources.resources.slice(0, 5).forEach(r => {
        console.log(`  - ${r.public_id.split('/').pop()}`);
      });
      if (resources.resources.length > 5) {
        console.log(`  ... and ${resources.resources.length - 5} more`);
      }
    }
  } catch (err) {
    console.error('Error listing folders:', err.message || err);
  }
}

async function main() {
  await createFolders();
  await organizeResources();
  await listFolderStructure();
  console.log(`\n✨ Cloudinary organization complete!`);
}

main().catch(console.error);
