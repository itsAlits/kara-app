import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { config } from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.join(__dirname, '..', '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI || MONGODB_URI.includes('YOUR_PASSWORD')) {
  console.error('❌  Set MONGODB_URI correctly in .env.local first!');
  process.exit(1);
}

const ContentSchema = new mongoose.Schema(
  { section: { type: String, required: true, unique: true }, data: mongoose.Schema.Types.Mixed },
  { timestamps: true }
);
const Content = mongoose.models.Content || mongoose.model('Content', ContentSchema);

async function main() {
  console.log('🔌  Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI, { bufferCommands: false });
  console.log('✅  Connected\n');

  const jsonPath = path.join(__dirname, '..', 'data', 'content.json');
  const content = JSON.parse(await readFile(jsonPath, 'utf-8'));
  const SKIP = new Set(['_meta']);
  const sections = Object.keys(content).filter(k => !SKIP.has(k));

  console.log(`📦  Migrating ${sections.length} sections: ${sections.join(', ')}\n`);

  for (const section of sections) {
    await Content.findOneAndUpdate(
      { section },
      { $set: { data: content[section] } },
      { upsert: true, new: true }
    );
    console.log(`  ✔  ${section}`);
  }

  console.log('\n🎉  Done! All data is now in MongoDB.');
  await mongoose.disconnect();
}

main().catch(err => {
  console.error('Migration failed:', err.message);
  process.exit(1);
});
