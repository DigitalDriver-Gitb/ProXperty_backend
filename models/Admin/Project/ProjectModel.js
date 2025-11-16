import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    projectName: { type: String, required: true },
    state: { type: String,required:true },
    country: { type: String, default: "India",required:true },
    city: { type: String,required:true },
    location: { type: String, required: true },
    sublocation: { type: String, required: true },
    projectAddress: { type: String,required:true },
    project_discription: { type: String,required:true },
    AboutDeveloper: { type: String,required:true },
    builderName: { type: String,required:true },
    meta_title: { type: String,required:true },
    meta_description: { type: String,required:true },
    project_url: { type: String },
    frontImage:{type:String,required:true},
    logo:{type:String,required:true},
    thumbnailImage:{type:String,required:true},
    project_locationImage:{type:String,required:true},
    highlightImage:{type:String,required:true},
    projectMaster_plan:{type:String,required:true},
    project_Brochure:{type:String,required:true},
    maxPrice:{type:Number,required:true},
    minPrice:{type:Number,required:true},
    paymentPlan:{type:String,required:true},
    possessionDate:{type:Date,required:true},
    mobileNumber:{type:Number,required:true},
    whatsappNumber:{type:Number,required:true},
    launchingDate:{type:Date,required:true},
    projectreraNo:{type:String},
    totalLandArea:{type:Number,required:true},
    totalUnit:{type:Number,required:true},
    towerNumber:{type:Number,required:true},
    project_Status:{type:String,required:true},
    luxury:{type:String,required:true},
    spotlight:{type:String},
    type:{type:String},
    Amenities: [String],
    galleryImages: {
      type: [{
        url: {
          type: String,
          required: true
        },
      }],
      validate: {
        validator: function(v) {
          return v.length >= 3;
        },
        message: 'At least 3 gallery images are required'
      }
    },
    floorPlanImages: [{
      url: {
        type: String,
        required: true
      }
    }],
    
    project_Connectivity: [String],
    project_Education: [String],
    project_Business: [String],
    project_Entertainment: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
