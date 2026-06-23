import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IGalleryDocument extends Document {
  url: string;
  caption?: string;
  category: 'matches' | 'training' | 'celebrations' | 'team';
  season?: mongoose.Types.ObjectId;
  match?: mongoose.Types.ObjectId;
  uploadedAt: Date;
}

const gallerySchema = new Schema<IGalleryDocument>(
  {
    url: { type: String, required: true },
    caption: { type: String },
    category: {
      type: String,
      enum: ['matches', 'training', 'celebrations', 'team'],
      required: true,
    },
    season: { type: Schema.Types.ObjectId, ref: 'Season' },
    match: { type: Schema.Types.ObjectId, ref: 'Match' },
  },
  {
    timestamps: { createdAt: 'uploadedAt', updatedAt: 'updatedAt' },
  }
);

const Gallery: Model<IGalleryDocument> = mongoose.models.Gallery || mongoose.model<IGalleryDocument>('Gallery', gallerySchema);
export default Gallery as any;
