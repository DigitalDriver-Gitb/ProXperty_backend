// import mongoose from "mongoose";

// const bhk_Schema = new mongoose.Schema({
//   bhk_type: {
//     type: String, //1/2/3bhk
//   },
//   price: {
//     type: String,
//   },
//   bhk_Area: {
//     type: String,
//   },
// });

// const highlight_Schema = new mongoose.Schema({
//   highlight_Point: {
//     type: String,
//   },
// });

// const about_project_Schema = new mongoose.Schema({
//   about_image: {
//     type: String,
//   },
//   mobile_banner_image: {
//     type: String,
//   },
// });

// const projectSchema = new mongoose.Schema(
//   {
//     project_floorplan_Image: {
//       public_id: {
//         type: String,
//       },
//       url: {
//         type: String,
//       },
//       cdn_url: {
//         type: String,
//       },
//       key: {
//         type: String,
//       },
//       originalname: {
//         type: String,
//       },
//       mimetype: {
//         type: String,
//       },
//       size: {
//         type: Number,
//       },
//       etag: {
//         type: String,
//       },
//     },
//     thumbnailImage: {
//       type: String,
//     },
//     projectImages: [
//       {
//         type: String,
//       },
//     ],
//     frontImage: {
//       type: String,
//     },
//     logo: {
//       type: String,
//     },
//     project_locationImage: {
//       type: String,
//     },
//     state: {
//       type: String,
//       required: true,
//     },
//     projectName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     projectAddress: {
//       type: String,
//       required: true,
//     },
//     project_discripation: {
//       type: String,
//       required: true,
//     },
//     projectRedefine_Connectivity: [
//       {
//         type: String,
//       },
//     ],
//     projectRedefine_Entertainment: [
//       {
//         type: String,
//       },
//     ],
//     projectRedefine_Business: [
//       {
//         type: String,
//       },
//     ],
//     projectRedefine_Education: [
//       {
//         type: String,
//       },
//     ],
//     projectHighlights: [
//       {
//         type: String,
//       },
//     ],
//     projectLocation: {
//       type: {
//         type: String,
//         default: "Point",
//         enum: ["Point"],
//       },
//       coordinates: [Number],
//       address: String,
//       description: String,
//     },
//     meta_description: {
//       type: String,
//     },
//     meta_title: {
//       type: String,
//     },
//     Amenities: [
//       {
//         type: String,
//       },
//     ],
//     projectBgContent: {
//       type: String,
//     },
//     projectReraNo: {
//       type: String,
//     },
//     type: {
//       type: String,
//     },
//     country: {
//       type: String,
//       default: "India",
//     },
//     luxury: {
//       type: String,
//       default: "False",
//     },
//     spotlight: {
//       type: String,
//       default: "False",
//     },
//     city: {
//       type: String,
//     },
//     builderName: {
//       type: String,
//     },
//     paymentPlan: {
//       type: String,
//     },
//     AboutDeveloper: {
//       type: String,
//     },
//     projectOverview: {
//       type: String,
//     },
//     project_Brochure: {
//       public_id: {
//         type: String,
//       },
//       url: {
//         type: String,
//       },
//       cdn_url: {
//         type: String,
//       },
//     },
//     project_Status: {
//       type: String,
//     },
//     schema_type: {
//       type: String,
//       default: "project",
//     },
//     project_url: {
//       type: String,
//     },
//     about_project: [about_project_Schema],
//     BhK_Details: [bhk_Schema],
//     highlight: [highlight_Schema],
//     highlightImage: {
//       public_id: {
//         type: String,
//       },
//       url: {
//         type: String,
//       },
//       cdn_url: {
//         type: String,
//       },
//     },
//     projectMaster_plan: {
//       public_id: {
//         type: String,
//       },
//       url: {
//         type: String,
//       },
//       cdn_url: {
//         type: String,
//       },
//     },
//     projectGallery: [],
//     towerNumber: {
//       type: Number,
//     },
//     totalUnit: {
//       type: Number,
//     },
//     totalLandArea: {
//       type: Number,
//     },
//     launchingDate: {
//       type: Date,
//     },
//     mobileNumber: {
//       type: Number,
//     },
//     possessionDate: {
//       type: Date,
//     },
//     minPrice: {
//       type: Number,
//     },
//     maxPrice: {
//       type: Number,
//     },
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "AdminUser",
//       required: true,
//     },
//     updatedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "AdminUser",
//     },
//   },
//   {
//     timestamps: true,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true },
//   },
// );

// // Index for geospatial queries
// projectSchema.index({ "projectLocation": "2dsphere" });

// // Text index for search
// projectSchema.index(
//   {
//     projectName: "text",
//     projectAddress: "text",
//     project_discripation: "text",
//     type: "text",
//     city: "text",
//     state: "text",
//     builderName: "text",
//     project_Status: "text",
//   },
//   {
//     weights: {
//       projectName: 6,
//       projectAddress: 3,
//       project_discripation: 2,
//       type: 3,
//       city: 2,
//       state: 2,
//       project_Status: 3,
//       builderName: 1,
//     },
//   },
// );

// // Virtual for project URL
// projectSchema.virtual("url").get(function () {
//   return `/projects/${this._id}`;
// });

// const ProjectModel = mongoose.model("projectData", projectSchema);

// export default ProjectModel;

// import mongoose from "mongoose";

// const ProjectSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//     },
//     imageUrl: {
//       type: String, // 🔥 Only store the URL here
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// const ProjectModel = mongoose.model("MainProject", ProjectSchema);

// export default ProjectModel;


import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    projectName: { type: String, required: true },
    state: { type: String, },
    country: { type: String, default: "India" },
    projectAddress: { type: String, },
    project_discription: { type: String, },
    AboutDeveloper: { type: String },
    builderName: { type: String },
    meta_title: { type: String },
    meta_description: { type: String },
    city: { type: String },
    project_url: { type: String },
    frontImage:{type:String},
    logo:{type:String},
    thumbnailImage:{type:String},
    project_locationImage:{type:String},
    highlightImage:{type:String},
    projectMaster_plan:{type:String},
    project_Brochure:{type:String},
    maxPrice:{type:Number},
    minPrice:{type:Number},
    paymentPlan:{type:String},
    possessionDate:{type:Date},
    mobileNumber:{type:Number},
    launchingDate:{type:Date},
    projectreraNo:{type:String},
    totalLandArea:{type:Number},
    totalUnit:{type:Number},
    towerNumber:{type:Number},
    projectOverview:{type:String},
    project_Status:{type:String},
    luxury:{type:String},
    spotlight:{type:String},
    type:{type:String},
    galleryImages: {
      type: [{
        url: {
          type: String,
          required: true
        },
        // You can add more fields to each gallery image if needed in the future
        // e.g., caption: { type: String },
        //      isFeatured: { type: Boolean, default: false }
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
    }]
    
    // projectRedefine_Connectivity: [String],
    // projectRedefine_Education: [String],
    // projectRedefine_Business: [String],
    // projectRedefine_Entertainment: [String],
    // Amenities: [String],

    // luxury: { type: String, default: "False" },
    // spotlight: { type: String, default: "False" },
    // paymentPlan: { type: String },

    // meta_title: { type: String },
    // meta_description: { type: String },
    // projectBgContent: { type: String },
    // projectReraNo: { type: String },
    // type: { type: String },
    // city: { type: String },
    // projectOverview: { type: String },
    // project_url: { type: String },
    // project_Status: { type: String },

    // totalLandArea: { type: Number },
    // totalUnit: { type: Number },
    // towerNumber: { type: Number },
    // mobileNumber: { type: Number },
    // possessionDate: { type: Date },
    // minPrice: { type: Number },
    // maxPrice: { type: Number },
    // launchingDate: { type: Date },

    // // Image URLs only
    // thumbnailImage: { type: String },
    // frontImage: { type: String },
    // logo: { type: String },
    // project_locationImage: { type: String },
    // highlightImage: { type: String },
    // projectMaster_plan: { type: String },
    // projectImages: [String],

    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "AdminUser"
    // }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
