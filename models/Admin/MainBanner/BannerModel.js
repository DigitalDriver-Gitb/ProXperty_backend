import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Banner = mongoose.model("Banner", BannerSchema);

export default Banner;
