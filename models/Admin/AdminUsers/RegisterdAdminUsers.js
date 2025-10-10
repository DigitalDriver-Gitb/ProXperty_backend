// models/AdminUser.js
import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  hasFullAccess: Boolean,
  role: String,
  token: String,
}, { timestamps: true });

// Check if model exists before compiling it
const modelName = 'RegisteredAdminUser';
const RegisterdAdminUserModel = mongoose.models[modelName] || 
                               mongoose.model(modelName, adminUserSchema);

export default RegisterdAdminUserModel;
