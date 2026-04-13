import mongoose from "mongoose";
import { type } from "node:os";

const InteriorDesigner = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    // required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  floorPlan:{
    type:String,
    required:true
  },
  purpose:{
    type:String,
    required:true
  },
  status:{
    type:String,
    default:"Unverified"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const InteriorDesignerModel = mongoose.model("InteriorDesigner", InteriorDesigner);
export default InteriorDesignerModel;

