import mongoose from "mongoose";
import slugify from "../utils/slugify.js";
import Project from "../models/Admin/Project/ProjectModel.js";

await mongoose.connect(process.env.MONGO_URI);

console.log("DB connected");
console.log("DB:", mongoose.connection.name);
console.log("Collection:", Project.collection.name);

const projects = await Project.find();

for (let project of projects) {
  project.citySlug = slugify(project.city);
  project.locationSlug = slugify(project.location);
  project.typeSlug = slugify(project.type);
  project.sublocationSlug = slugify(project.sublocation);
  project.projectSlug = slugify(
    `${project.projectName} ${project.location} ${project.city}`
  );

  project.BhK_Details = (project.BhK_Details || []).map((b) => ({
    ...b,
    bhk_slug: slugify(b.bhk_type),
  }));

  await project.save();

  console.log(`✅ Saved: ${project.projectName}`);
}
const test = await Project.findOne();

console.log("Sample document:", {
  city: test.city,
  citySlug: test.citySlug,
  projectSlug: test.projectSlug,
  BhK: test.BhK_Details?.[0]
});

console.log("🎉 All done");
process.exit();