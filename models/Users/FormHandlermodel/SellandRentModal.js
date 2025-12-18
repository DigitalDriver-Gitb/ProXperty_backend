import mongoose from "mongoose";

const SellandRent_schema = new mongoose.Schema({
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
  city: {
    type: String,
    required: true,
  },
  intent: {
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
const SellandRent_model = mongoose.model("Sell_and_Rent", SellandRent_schema);
export default SellandRent_model;

