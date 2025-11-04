import mongoose from "mongoose";

const sublocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  locationId: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
}, { timestamps: true });

export default mongoose.model("Sublocation", sublocationSchema);
