import mongoose from "mongoose";

const PhoneBannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const PhoneBanner = mongoose.model("PhoneBanner", PhoneBannerSchema);

export default PhoneBanner;
