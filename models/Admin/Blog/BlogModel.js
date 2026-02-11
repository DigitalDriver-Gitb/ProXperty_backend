// models/AdminUser.js
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {type:String,required:true},
    subheading: {type:String,required:true},
    image: {type:String,required:true},
    type: {type:String,required:true},
    totalreadtime: {type:String,required:true},
    content: {type:String,required:true},
    author: {type:String,required:true},
    city: {type:String,required:true},
    tags: {type:[String],required:true},
    category: {type:String,required:true},
    createdAt: Date,
    updatedAt: Date,        
}, { timestamps: true });

// Check if model exists before compiling it
const modelName = 'Blog';
const BlogModel = mongoose.models[modelName] || 
                               mongoose.model(modelName, blogSchema);

export default BlogModel;
