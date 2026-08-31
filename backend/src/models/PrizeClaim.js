import mongoose from "mongoose";
const schema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  giveawayId: String,
  prizeId: String,
  claimType: { type: String, enum: ["physical","gift_card","digital"] },
  status: { type: String, enum: ["NOT_SUBMITTED","SUBMITTED","PROCESSING","COMPLETED","EXPIRED"], default: "NOT_SUBMITTED" },
  details: mongoose.Schema.Types.Mixed,
  submittedAt: Date,
  deadline: Date
});
schema.index({ userId: 1, giveawayId: 1, prizeId: 1 }, { unique: true });
export default mongoose.model("PrizeClaim", schema);
