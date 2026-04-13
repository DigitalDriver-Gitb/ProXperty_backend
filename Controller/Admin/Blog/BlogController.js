import Blog from "../../../models/Admin/Blog/BlogModel.js";

export const CreateBlog = async (req,res) =>{
    try {
        const {title,image,type,paragraph1,paragraph2,paragraph3,author,city,tags,totalreadtime,subheading,category,placestags} = req.body;
        if(!title || !paragraph1 || !author || !city || !tags || !totalreadtime || !subheading || !category || !image || !type){
            return res.status(400).json({
                success:false,
                message:"Title, paragraph1, author, city, tags, totalreadtime, subheading, category, image and type are required"
            })
        }

        const newBlog = new Blog({
            title,
            image,
            type,
            paragraph1,
            paragraph2,
            paragraph3,
            author,
            city,
            tags,
            totalreadtime,
            subheading,
            category,
            placestags,
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

export const GetBlogByPlaceTags = async (req, res) => {
    try {
        const { placeTags } = req.params;

        if (!placeTags) {
            return res.status(400).json({
                success: false,
                message: "Place tag is required"
            });
        }

        const blogs = await Blog.find({
            placestags: { $in: [placeTags] }
        });

        return res.status(200).json({
            success: true,
            data: blogs
        });

    } catch (error) {
        console.error("GetBlogByPlaceTags Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteBlogs = async (req,res) =>{
    try {
        const {id} = req.params;
        const deletedBlog = await Blog.findByIdAndDelete(id);
        return res.status(200).json({
            success:true,
            data:deletedBlog,
            message:"Blog deleted successfully"
        })
    } catch (error) {
        console.error("deleteBlogs Error:",error);
        res.status(500).json({
            success:false,
            message:"Blog deleted failed"
        })
    }
}

export const getBlogsById = async(req,res) =>{
    try {
        const {id} = req.params;
        console.log(id,"id");
        const blog = await Blog.findById(id);
        return res.status(200).json({
            success:true,
            data:blog
        })
    } catch (error) {
        console.error("getBlogsById Error:",error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}