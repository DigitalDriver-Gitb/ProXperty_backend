import mongoose from "mongoose";

const typeSchema = new mongoose.Schema(
  {
    type_name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Type = mongoose.model("Type", typeSchema);
export default Type;
