import mongoose from "mongoose";
const schema = new mongoose.Schema({
  actorId: mongoose.Schema.Types.ObjectId,
  action: String,
  entityType: String,
  entityId: String,
  metadata: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model("AuditLog", schema);
