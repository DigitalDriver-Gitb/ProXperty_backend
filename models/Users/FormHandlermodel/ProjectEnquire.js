import mongoose from "mongoose";
import { type } from "node:os";

const Project_Enquire = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    // rquired: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  projectName:{
    type : String,
    // required:true
  },
  status:{
    type:String,
    required:true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const ProjectEnquireModel = mongoose.model("ProjectEnquire", Project_Enquire);
export default ProjectEnquireModel;

