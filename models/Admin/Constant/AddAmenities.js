import mongoose from "mongoose";

const AmenitiesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      required: true,
      trim: true,
    },
    Type:{
      type:String,
      required:true,
      trim:true
    }
  },
  { timestamps: true }
);

const Amenities = mongoose.model("Amenities", AmenitiesSchema);

export default Amenities;
