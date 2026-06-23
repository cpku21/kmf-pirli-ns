import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IStandingDocument extends Document {
  season: mongoose.Types.ObjectId;
  position: number;
  team: string;
  isPirli: boolean;
  logo?: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string[];
}

const standingSchema = new Schema<IStandingDocument>(
  {
    season: { type: Schema.Types.ObjectId, ref: 'Season', required: true },
    position: { type: Number, required: true },
    team: { type: String, required: true },
    isPirli: { type: Boolean, default: false },
    logo: { type: String },
    played: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    draws: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    goalsFor: { type: Number, default: 0 },
    goalsAgainst: { type: Number, default: 0 },
    goalDifference: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    form: [{ type: String, enum: ['W', 'D', 'L'] }],
  },
  {
    timestamps: true,
  }
);

// Compound index
standingSchema.index({ season: 1, position: 1 }, { unique: true });

const Standing: Model<IStandingDocument> = mongoose.models.Standing || mongoose.model<IStandingDocument>('Standing', standingSchema);
export default Standing as any;
