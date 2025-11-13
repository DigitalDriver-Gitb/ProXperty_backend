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
      required: true,
      trim: true,
    },
    builder_logo: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
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
