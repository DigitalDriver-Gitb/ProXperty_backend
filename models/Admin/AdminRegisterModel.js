import mongoose from "mongoose";

const register_Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    rquired: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8, // Minimum password length
    match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, // Password pattern
  },
  hasfullaccess: {
    type: Boolean,
    required: true,
  },
  role: {
    type: String,
    default: "Admin",
  },
  token: {
    type: String,
    default: "",
  },
});
const registerModel = mongoose.model("RegisteredAdminUser", register_Schema);
export default registerModel;

