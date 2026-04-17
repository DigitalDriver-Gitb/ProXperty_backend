import express from "express";
import { CreateBlog, GetBlog, GetBlogByPlaceTags, deleteBlogs ,getBlogsById,getBlogBySlug,migrateSlugs} from "../../Controller/Admin/Blog/BlogController.js";
// Blog

const BlogRouter = express.Router();
BlogRouter.get("/getblog", GetBlog);
BlogRouter.get("/getblogbyid/:id",getBlogsById)
BlogRouter.get("/blog/:slug",getBlogBySlug);
BlogRouter.post("/createblog", CreateBlog);
BlogRouter.get("/getblog/:placeTags", GetBlogByPlaceTags);
BlogRouter.post("/deleteblog/:id", deleteBlogs);
BlogRouter.post("/migrate",migrateSlugs);
export default BlogRouter;