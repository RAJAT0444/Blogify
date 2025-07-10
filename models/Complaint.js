import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  name: String,
  email: String,
  issueType: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Complaint || mongoose.model("Complaint", complaintSchema);
