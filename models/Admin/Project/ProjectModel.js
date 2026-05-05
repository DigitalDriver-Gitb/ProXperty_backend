import mongoose from "mongoose";
import slugify from "../../../utils/slugify.js";

const bhk_Schema = new mongoose.Schema({
  bhk_type: {
    type: String, //1/2/3bhk
  },
  price: {
    type: String,
  },
  bhk_Area: {
    type: String,
  },
  bhk_Image:{type:String},
  bhk_slug: { type: String, index: true }
});

const highlight_Schema = new mongoose.Schema({
  highlight_Point: {
    type: String,
  },
});

const projectConnectivitySchema = new mongoose.Schema({
  connectivity: {
    type: String,
    required:true,
  },
  type:{type:String,required:true},
  distance:{type:String,required:true}
});

const Rera_Schema = new mongoose.Schema({
  reraNo: {
    type: String,
  },
  // qrImage: {
  //   type: String,
  // },
});

const projectSchema = new mongoose.Schema(
  {
    projectName: { type: String, required: true },
    state: { type: String,required:true },
    country: { type: String, default: "India",required:true },
    city: { type: String,required:true },
    location: { type: String, required: true },
    sublocation: { type: String, required: true },
    project_discription: { type: String,required:true },
    AboutDeveloper: { type: String,required:true },
    builderName: { type: String,required:true },
    meta_title: { type: String,required:true },
    meta_description: { type: String,required:true },
    project_url: { type: String },
    frontImage:{type:String,required:true},
    logo:{type:String},
    thumbnailImage:{type:String,required:true},
    citySlug: { type: String, index: true },
    projectSlug: { type: String, index: true },
    locationSlug: { type: String, index: true },
    typeSlug: { type: String, index: true },
    sublocationSlug: { type: String, index: true },
    project_locationImage:{type:String,required:true},
    highlightImage:{type:String},
    projectMaster_plan:{type:String,required:true},
    project_Brochure:{type:String},
    maxPrice:{type:Number,required:true},
    minPrice:{type:Number,required:true},
    paymentPlan:{type:String,required:true},
    possessionDate:{type:Date,required:true},
    mobileNumber:{type:Number,required:true},
    whatsappNumber:{type:Number,required:true},
    launchingDate:{type:Date,required:true},
    projectreraNo:{type:String},
    reraDetails: [Rera_Schema],
    totalLandArea:{type:Number,required:true},
    totalUnit:{type:Number,required:true},
    towerNumber:{type:Number},
    project_Status:{type:String,required:true},
    luxury:{type:String,required:true},
    spotlight:{type:String},
    type:{type:[String]},
    Amenities: [String],
    projectBgContent: { type: String},
    builderlogo : { type: String},
    BhK_Details: [bhk_Schema],
    ProjectConnectivity:[projectConnectivitySchema],
    highlight: [{
    highlight_Point: {
      type: String,
      required: true
    }
  }],
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
    // floorPlanImages: [{
    //   url: {
    //     type: String,
    //     required: true
    //   }
    // }],
    
    // project_Connectivity: [String],
    // project_Education: [String],
    // project_Business: [String],
    // project_Entertainment: [String],
  },
  { timestamps: true }
);

projectSchema.index({ citySlug: 1 });
projectSchema.index({ projectSlug: 1 });
projectSchema.index({ "BhK_Details.bhk_slug": 1 });

projectSchema.pre("save", function (next) {
  // city slug
  this.citySlug = slugify(this.city);

  // project slug (optional but useful)
  this.projectSlug = slugify(
    `${this.projectName} ${this.location} ${this.city}`
  );
  this.locationSlug = slugify(this.location);
  this.typeSlug = slugify(this.type);
  this.sublocationSlug = slugify(this.sublocation);

  // bhk slug
  if (this.BhK_Details && this.BhK_Details.length > 0) {
    this.BhK_Details = this.BhK_Details.map((b) => ({
      ...b._doc,
      bhk_slug: slugify(b.bhk_type),
    }));
  }

  next();
});
export default mongoose.model("Project", projectSchema);
