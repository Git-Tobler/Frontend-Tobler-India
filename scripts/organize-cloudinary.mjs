import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.Cloudinary_API_KEY,
  api_secret: process.env.Cloudinary_API_SECRET,
});

const MAIN_FOLDER = 'Tobler-Resources';
const SUBFOLDERS = {
  Photos: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'],
  Videos: ['mp4', 'webm', 'mov', 'avi'],
  Brochures: ['pdf', 'katalog', 'brochure', 'datasheet'],
  Charts: ['chart', 'graph', 'diagram'],
  Logos: ['logo', 'mark', 'icon'],
};

async function moveResource(fromPath, toPath) {
  try {
    await cloudinary.api.rename(fromPath, toPath);
    console.log(`✅ Moved: ${fromPath.split('/').pop()} → ${toPath.split('/').slice(-2).join('/')}`);
    return true;
  } catch (err) {
    if (err.message?.includes('already exists')) {
      console.log(`⚠️ Already exists: ${toPath}`);
      return true;
    }
    console.error(`❌ Failed: ${fromPath}`, err.message);
    return false;
  }
}

async function getResourceType(filename) {
  const lower = filename.toLowerCase();

  for (const [folder, extensions] of Object.entries(SUBFOLDERS)) {
    if (extensions.some(ext => lower.includes(ext))) {
      return folder;
    }
  }

  return 'Photos'; // default
}

async function organizeAll() {
  try {
    console.log('Config:', {
      cloud: process.env.VITE_CLOUDINARY_CLOUD_NAME?.substring(0, 3),
      api_key: process.env.Cloudinary_API_KEY ? '***' : 'MISSING',
      api_secret: process.env.Cloudinary_API_SECRET ? '***' : 'MISSING',
    });

    console.log(`🔍 Fetching resources from tobler-resources...`);
    let nextCursor = null;
    let totalMoved = 0;

    do {
      const options = {
        type: 'upload',
        prefix: 'tobler-resources',
        max_results: 500,
      };
      if (nextCursor) options.next_cursor = nextCursor;

      const result = await cloudinary.api.resources(options);
      const resources = result.resources || [];

      console.log(`\n📦 Processing ${resources.length} resources (cursor: ${nextCursor || 'none'})...`);

      for (const resource of resources) {
        const filename = resource.public_id.split('/').pop();
        const folder = await getResourceType(filename);
        const newPath = `${MAIN_FOLDER}/${folder}/${filename}`;

        if (resource.public_id !== newPath) {
          await moveResource(resource.public_id, newPath);
          totalMoved++;
        }
      }

      nextCursor = result.next_cursor;
    } while (nextCursor);

    console.log(`\n✨ Moved ${totalMoved} resources to proper folders!`);
    await listStructure();
  } catch (err) {
    console.error('Error:', err.message || err);
    console.error('Full:', err);
  }
}

async function listStructure() {
  console.log(`\n📂 Final Structure:`);
  try {
    const folders = [
      MAIN_FOLDER,
      ...Object.keys(SUBFOLDERS).map(f => `${MAIN_FOLDER}/${f}`),
    ];

    for (const folder of folders) {
      try {
        const result = await cloudinary.api.resources({
          type: 'upload',
          prefix: folder,
          max_results: 500,
        });
        const count = result.resources?.length || 0;
        console.log(`\n${folder}: ${count} items`);
        result.resources?.slice(0, 3).forEach(r => {
          console.log(`  • ${r.public_id.split('/').pop()}`);
        });
        if (count > 3) console.log(`  ... and ${count - 3} more`);
      } catch (err) {
        // folder might be empty
      }
    }
  } catch (err) {
    console.error('Error listing:', err.message);
  }
}

organizeAll().catch(console.error);
