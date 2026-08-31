import mongoose from "mongoose";
const schema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  giveawayId: String,
  prizeId: String,
  currency: { type: String, enum: ["VEs","SVEs","Tokens"] },
  amount: Number,
  type: { type: String, enum: ["ENTRY","REVERSAL"] },
  status: { type: String, enum: ["PENDING","SUCCESS","FAILED","REVERSED"] },
  balanceBefore: Number,
  balanceAfter: Number,
  transactionId: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model("GiveawayEntryTransaction", schema);
