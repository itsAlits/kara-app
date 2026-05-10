require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const fs = require('fs');

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI || MONGODB_URI.includes('YOUR_PASSWORD')) {
  console.error('ERR: Set MONGODB_URI correctly in .env.local');
  process.exit(1);
}

const Schema = mongoose.Schema;
const ContentSchema = new Schema(
  { section: { type: String, required: true, unique: true }, data: Schema.Types.Mixed },
  { timestamps: true }
);
const Content = mongoose.model('Content', ContentSchema);

mongoose.connect(MONGODB_URI, { bufferCommands: false })
  .then(async () => {
    console.log('Connected to MongoDB!\n');
    const raw = fs.readFileSync('data/content.json', 'utf-8');
    const content = JSON.parse(raw);
    const skip = new Set(['_meta']);
    const sections = Object.keys(content).filter(k => !skip.has(k));
    console.log('Sections to migrate:', sections.join(', '), '\n');
    for (const section of sections) {
      await Content.findOneAndUpdate(
        { section },
        { section, data: content[section] },
        { upsert: true, returnDocument: 'after' }
      );
      console.log('  OK:', section);
    }
    console.log('\nMigration complete!');
    await mongoose.disconnect();
  })
  .catch(err => {
    console.error('FAILED:', err.message);
    process.exit(1);
  });
