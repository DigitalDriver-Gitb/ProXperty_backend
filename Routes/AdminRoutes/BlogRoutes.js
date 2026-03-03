import express from "express";
import { CreateBlog, GetBlog, GetBlogByPlaceTags, deleteBlogs } from "../../Controller/Admin/Blog/BlogController.js";
// Blog

const BlogRouter = express.Router();
BlogRouter.get("/getblog", GetBlog);
BlogRouter.post("/createblog", CreateBlog);
BlogRouter.get("/getblog/:placeTags", GetBlogByPlaceTags);
BlogRouter.post("/deleteblog/:id", deleteBlogs);
export default BlogRouter;