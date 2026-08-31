import mongoose from "mongoose";
const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  giveawayId: { type: String, required: true },
  prizeId: { type: String, required: true },
  status: { type: String, enum: ["WINNER","VOID"], default: "WINNER" }
});
schema.index({ giveawayId: 1, prizeId: 1, userId: 1 }, { unique: true });
export default mongoose.model("GiveawayWinner", schema);
