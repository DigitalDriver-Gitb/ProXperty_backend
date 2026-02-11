import Blog from "../../../models/Admin/Blog/BlogModel.js";

export const CreateBlog = async (req,res) =>{
    try {
        const {title,image,type,content,author,city,tags,totalreadtime,subheading,category} = req.body;
        if(!title || !content || !author || !city || !tags || !totalreadtime || !subheading || !category || !image || !type){
            return res.status(400).json({
                success:false,
                message:"Title, content, author, city, tags, totalreadtime, subheading, category, image and type are required"
            })
        }

        const newBlog = new Blog({
            title,
            image,
            type,
            content,
            author,
            city,
            tags,
            totalreadtime,
            subheading,
            category,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        await newBlog.save();
        return res.status(201).json({
            success:true,
            data:newBlog
        })
    } catch (error) {
        console.error("CreateBlog Error:",error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


export const GetBlog = async (req,res) =>{
    try {
        const blogs = await Blog.find({});
        res.status(200).json({
            success:true,
            data:blogs
        })
    } catch (error) {
        console.error("GetBlog Error:",error);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}