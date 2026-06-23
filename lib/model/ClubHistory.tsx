import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IClubHistoryDocument extends Document {
  year: number;
  title: string;
  description: string;
  type: 'founding' | 'achievement' | 'milestone' | 'season' | 'other';
  image?: string;
  order: number;
}

const clubHistorySchema = new Schema<IClubHistoryDocument>(
  {
    year: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: {
      type: String,
      enum: ['founding', 'achievement', 'milestone', 'season', 'other'],
      required: true,
    },
    image: { type: String },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

clubHistorySchema.index({ year: 1 });
clubHistorySchema.index({ order: 1 });

const ClubHistory: Model<IClubHistoryDocument> = mongoose.models.ClubHistory || mongoose.model<IClubHistoryDocument>('ClubHistory', clubHistorySchema);
export default ClubHistory as any;
