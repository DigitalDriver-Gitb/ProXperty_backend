import mongoose from "mongoose";

const Advertise_schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    // rquired: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Advertise_model = mongoose.model("Advertise_with_us", Advertise_schema);
export default Advertise_model;

