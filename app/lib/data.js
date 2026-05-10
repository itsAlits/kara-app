import 'server-only';
import { connectDB } from './mongodb';
import { ContentModel } from './ContentModel';

/**
 * Get all content sections merged into one flat object.
 * Same shape as old content.json so all components keep working.
 */
export async function getContent() {
  try {
    await connectDB();
    const docs = await ContentModel.find({}).lean();
    const result = {};
    for (const doc of docs) {
      result[doc.section] = doc.data;
    }
    return result;
  } catch (err) {
    console.error('[getContent] MongoDB error:', err);
    return {};
  }
}

/**
 * Upsert a single section in MongoDB.
 */
export async function updateContent(section, data) {
  await connectDB();
  await ContentModel.findOneAndUpdate(
    { section },
    { $set: { data } },
    { upsert: true, returnDocument: 'after' }
  );
  return { _meta: { lastModified: new Date().toISOString(), lastModifiedBy: 'admin' } };
}
