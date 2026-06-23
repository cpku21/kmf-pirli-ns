import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IPlayerDocument extends Document {
  name: string;
  slug: string;
  number: number;
  position: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward';
  bio: string;
  photo: string;
  birthYear?: number;
  joinedYear?: number;
  isActive: boolean;
  stats: {
    appearances: number;
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
  };
  achievements: string[];
}

const playerSchema = new Schema<IPlayerDocument>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    number: { type: Number, required: true },
    position: {
      type: String,
      enum: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'],
      required: true,
    },
    bio: { type: String, default: '' },
    photo: { type: String, default: '' },
    birthYear: { type: Number },
    joinedYear: { type: Number },
    isActive: { type: Boolean, default: true },
    stats: {
      appearances: { type: Number, default: 0 },
      goals: { type: Number, default: 0 },
      assists: { type: Number, default: 0 },
      yellowCards: { type: Number, default: 0 },
      redCards: { type: Number, default: 0 },
    },
    achievements: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

// Indexes
playerSchema.index({ slug: 1 }, { unique: true });
playerSchema.index({ isActive: 1 });

const Player: Model<IPlayerDocument> = mongoose.models.Player || mongoose.model<IPlayerDocument>('Player', playerSchema);
export default Player as any;
