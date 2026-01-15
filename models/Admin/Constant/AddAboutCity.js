import mongoose from "mongoose";

const aboutCitySchema = new mongoose.Schema(
  {
    cityName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    //   required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const AboutCity = mongoose.model("AboutCity", aboutCitySchema);
export default AboutCity;
