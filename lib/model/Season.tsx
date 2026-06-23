import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ISeasonDocument extends Document {
  name: string;
  year: number;
  competition: string;
  isActive: boolean;
  finalPosition?: number;
  stats: {
    played: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    points: number;
  };
}

const seasonSchema = new Schema<ISeasonDocument>(
  {
    name: { type: String, required: true },
    year: { type: Number, required: true, unique: true },
    competition: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    finalPosition: { type: Number },
    stats: {
      played: { type: Number, default: 0 },
      wins: { type: Number, default: 0 },
      draws: { type: Number, default: 0 },
      losses: { type: Number, default: 0 },
      goalsFor: { type: Number, default: 0 },
      goalsAgainst: { type: Number, default: 0 },
      points: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

const Season: Model<ISeasonDocument> = mongoose.models.Season || mongoose.model<ISeasonDocument>('Season', seasonSchema);
export default Season as any;
