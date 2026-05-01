import Blog from "../../../models/Admin/Blog/BlogModel.js";

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-") // spaces → dash
    .replace(/-+/g, "-"); // remove duplicate dash
};

export const CreateBlog = async (req,res) =>{
    try {
        const {
          title,image,type,paragraph1,paragraph2,paragraph3,
          author,city,tags,totalreadtime,subheading,category,placestags
        } = req.body;

        if(!title || !paragraph1 || !author || !city || !tags || !totalreadtime || !subheading || !category || !image || !type){
            return res.status(400).json({
                success:false,
                message:"Required fields missing"
            })
        }

        // 🔥 generate base slug
        let slug = generateSlug(title);

        // 🔥 ensure uniqueness
        let existing = await Blog.findOne({ slug });
        let counter = 1;

        while (existing) {
            slug = `${generateSlug(title)}-${counter}`;
            existing = await Blog.findOne({ slug });
            counter++;
        }

        const newBlog = new Blog({
            title,
            slug, // ✅ add this
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
        });

    } catch (error) {
        console.error("CreateBlog Error:",error);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};


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

export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: blog
    });

  } catch (error) {
    console.error("getBlogBySlug Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const migrateSlugs = async (req, res) => {
  try {
    const blogs = await Blog.find({});

    for (let blog of blogs) {
      if (!blog.slug) {
        let baseSlug = generateSlug(blog.title);
        let slug = baseSlug;

        let counter = 1;
        let existing = await Blog.findOne({ slug });

        while (
          existing &&
          existing._id.toString() !== blog._id.toString()
        ) {
          slug = `${baseSlug}-${counter}`;
          existing = await Blog.findOne({ slug });
          counter++;
        }

        blog.slug = slug;
        await blog.save();

        console.log(`Updated: ${blog.title} → ${slug}`);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Migration done ✅",
    });

  } catch (error) {
    console.error("Migration error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBlogByCity = async (req, res) => {
  try {
    const { cityName } = req.params;

    // Case-insensitive search for city name
    const blogs = await Blog.find({ 
      city: { $regex: new RegExp(`^${cityName}$`, 'i') }
    });

    return res.status(200).json({
      success: true,
      data: blogs
    });

  } catch (error) {
    console.error("getBlogByCity Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};