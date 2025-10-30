import mongoose from "mongoose";

const countrySchema = new mongoose.Schema(
  {
    country_name: {
      type: String,
      required: true,
      trim: true,
    },
    state_name: {
      type: String,
      required: true,
      trim: true,
    },
    city_name: {
      type: String,
      required: true,
      trim: true,
    },
    location_name: {
      type: String,
      required: true,
      trim: true,
    },
    sub_location_name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Country = mongoose.model("Country", countrySchema);
export default Country;
