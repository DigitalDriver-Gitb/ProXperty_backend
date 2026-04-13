import express from "express";
import { CreateBlog, GetBlog, GetBlogByPlaceTags, deleteBlogs ,getBlogsById} from "../../Controller/Admin/Blog/BlogController.js";
// Blog

const BlogRouter = express.Router();
BlogRouter.get("/getblog", GetBlog);
BlogRouter.get("/getblogbyid/:id",getBlogsById)
BlogRouter.post("/createblog", CreateBlog);
BlogRouter.get("/getblog/:placeTags", GetBlogByPlaceTags);
BlogRouter.post("/deleteblog/:id", deleteBlogs);
export default BlogRouter;