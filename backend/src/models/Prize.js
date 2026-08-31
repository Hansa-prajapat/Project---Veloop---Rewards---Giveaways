import mongoose from "mongoose";
const schema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: String,
  type: { type: String, enum: ["PHYSICAL","GIFT_CARD","DIGITAL"] },
  winnerCount: Number
});
export default mongoose.model("Prize", schema);
