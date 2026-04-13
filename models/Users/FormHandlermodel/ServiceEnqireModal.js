import mongoose from "mongoose";

const Service_Enquire = new mongoose.Schema({
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
  serviceName:{
    type : String,
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
const ServiceEnquireModel = mongoose.model("ServiceEnquire", Service_Enquire);
export default ServiceEnquireModel;

