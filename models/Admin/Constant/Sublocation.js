import mongoose from "mongoose";

const sublocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cityId: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
});

export default mongoose.model("Sublocation", sublocationSchema);
