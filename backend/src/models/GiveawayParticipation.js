import mongoose from "mongoose";
const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
  giveawayId: { type: String, required: true, index: true },
  prizeId: { type: String, required: true },
  entryCurrency: { type: String, enum: ["VEs","SVEs","Tokens"], required: true },
  entryAmount: { type: Number, required: true },
  deviceHash: String,
  status: { type: String, enum: ["ACTIVE","LOCKED"], default: "ACTIVE" },
  joinedAt: { type: Date, default: Date.now },
  transactionId: String
});
schema.index({ userId: 1, giveawayId: 1 }, { unique: true });
export default mongoose.model("GiveawayParticipation", schema);
