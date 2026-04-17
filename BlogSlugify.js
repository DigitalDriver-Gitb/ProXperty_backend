import mongoose from "mongoose";
import Blog from "./models/Admin/Blog/BlogModel.js" // adjust path if needed

// 🔥 DB Connection (same as your main config)
const MONGO_URI = process.env.MONGO_URI;

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const migrateSlugs = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ DB Connected");

    const blogs = await Blog.find({});
    console.log(`📦 Found ${blogs.length} blogs`);

    for (let blog of blogs) {
      console.log("Processing:", blog.title);

      let baseSlug = generateSlug(blog.title);
      let slug = baseSlug;

      let counter = 1;

      let existing = await Blog.findOne({
        slug,
        _id: { $ne: blog._id }
      });

      while (existing) {
        slug = `${baseSlug}-${counter}`;
        existing = await Blog.findOne({
          slug,
          _id: { $ne: blog._id }
        });
        counter++;
      }

      blog.slug = slug;
      await blog.save();

      console.log(`✅ Updated: ${blog.title} → ${slug}`);
    }

    console.log("🎉 Migration Complete");
    process.exit();

  } catch (error) {
    console.error("❌ Migration Error:", error);
    process.exit(1);
  }
};

migrateSlugs();