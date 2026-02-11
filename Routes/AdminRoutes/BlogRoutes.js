import express from "express";
import { CreateBlog, GetBlog } from "../../Controller/Admin/Blog/BlogController.js";
// Blog

const BlogRouter = express.Router();
BlogRouter.get("/getblog", GetBlog);
BlogRouter.post("/createblog", CreateBlog);

export default BlogRouter;