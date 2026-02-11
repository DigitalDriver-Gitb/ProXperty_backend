import express from "express";
import { GetBlog } from "../../Controller/Admin/Blog/BlogController.js";
// Blog

const BlogRouter = express.Router();
BlogRouter.get("/user-getblog", GetBlog);

export default BlogRouter;