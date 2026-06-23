import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IMatchGoalscorer {
  player: mongoose.Types.ObjectId;
  playerName: string;
  minute: number;
  isOwnGoal: boolean;
}

export interface IMatchDocument extends Document {
  date: Date;
  opponent: string;
  isHome: boolean;
  competition: string;
  season?: mongoose.Types.ObjectId;
  venue: string;
  pirliScore: number | null;
  opponentScore: number | null;
  result: 'W' | 'D' | 'L' | null;
  goalscorers: IMatchGoalscorer[];
  notes?: string;
  gallery: string[];
}

const matchSchema = new Schema<IMatchDocument>(
  {
    date: { type: Date, required: true },
    opponent: { type: String, required: true },
    isHome: { type: Boolean, default: true },
    competition: { type: String, default: 'II Liga Novi Sad' },
    season: { type: Schema.Types.ObjectId, ref: 'Season' },
    venue: { type: String, default: 'SC Hattrick, I teren 5+1' },
    pirliScore: { type: Number, default: null },
    opponentScore: { type: Number, default: null },
    result: { type: String, enum: ['W', 'D', 'L', null], default: null },
    goalscorers: [
      {
        player: { type: Schema.Types.ObjectId, ref: 'Player' },
        playerName: { type: String, required: true },
        minute: { type: Number },
        isOwnGoal: { type: Boolean, default: false },
      },
    ],
    notes: { type: String },
    gallery: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

// Indexes
matchSchema.index({ date: -1 });
matchSchema.index({ result: 1 });
matchSchema.index({ season: 1 });

const Match: Model<IMatchDocument> = mongoose.models.Match || mongoose.model<IMatchDocument>('Match', matchSchema);
export default Match as any;
