import mongoose from "mongoose";

const builderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    builder_logo: {
      type: String,
      trim: true,
    },
    cities: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Builder = mongoose.model("Builder", builderSchema);

export default Builder;
