import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema(
  {
    section: { type: String, required: true, unique: true, index: true },
    data: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export const ContentModel =
  mongoose.models.Content || mongoose.model('Content', ContentSchema);
