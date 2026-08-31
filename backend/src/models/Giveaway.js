import mongoose from "mongoose";

const prizeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  winnerCount: { type: Number, required: true },
  type: { type: String, enum: ["PHYSICAL","GIFT_CARD","DIGITAL"], required: true },
  claimType: { type: String, required: true },
  entryCurrency: { type: String, enum: ["VEs","SVEs","Tokens"], required: true },
  entryFee: { type: Number, required: true }
}, { _id: false });

const giveawaySchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  title: String,
  slug: { type: String, unique: true },
  description: String,
  status: { type: String, enum: ["UPCOMING","ACTIVE","ENDED","ARCHIVED"], required: true },
  startAt: Date,
  endAt: Date,
  rules: [String],
  eligibility: [String],
  prizes: [prizeSchema]
}, { timestamps: true });

export default mongoose.model("Giveaway", giveawaySchema);
