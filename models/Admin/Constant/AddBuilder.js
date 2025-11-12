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
    states: {
      type: [String],
      required: true,
      default: [],
      validate: {
        validator: function(v) {
          return v.length > 0;
        },
        message: 'At least one state is required'
      }
    },
    cities: {
      type: [String],
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

const Builder = mongoose.model("Builder", builderSchema);

export default Builder;
