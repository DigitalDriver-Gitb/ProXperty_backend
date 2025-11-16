
import Project from "../../../models/Admin/Project/ProjectModel.js";
const toArray = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return val.split(",").map((item) => item.trim());
};

export const createProject = async (req, res) => {
  try {
    const { 
      projectName,
       state,
        country,
        city,
        location,
        sublocation,
         projectAddress,
          project_discription,
           AboutDeveloper,
            builderName ,
             meta_title,
              meta_description,
              project_url,
              frontImage,
              logo,
              thumbnailImage,
              project_locationImage,
              highlightImage,
              projectMaster_plan,
              project_Brochure,
              galleryImages,
              floorPlanImages,
              maxPrice,
              minPrice,
              paymentPlan,
              possessionDate,
              mobileNumber,
              launchingDate,
              projectreraNo,
              totalLandArea,
              totalUnit,
              towerNumber,
              project_Status,
              luxury,
              spotlight,
              type,
              whatsappNumber,
              Amenities,
              project_Connectivity,
              project_Education,
              project_Business,
              project_Entertainment,
             } = req.body;

    if (!projectName || projectName.trim() === "") {
      return res.status(400).json({ message: "Project name is required" });
    }

    const project = new Project({
      projectName: projectName.trim(),
      state,
      country,
      city,
      location,
      sublocation,
      projectAddress,
      project_discription,
      AboutDeveloper,
      builderName,
      meta_title,
      meta_description,
      project_url,
      frontImage,
      logo,
      thumbnailImage,
      project_locationImage,
      highlightImage,
      projectMaster_plan,
      project_Brochure,
      maxPrice,
      minPrice,
      paymentPlan,
      possessionDate,
      mobileNumber,
      launchingDate,
      projectreraNo,
      totalLandArea,
      totalUnit,
      towerNumber,
      project_Status,
      luxury,
      spotlight,
      type,
      whatsappNumber,
      Amenities,
      project_Connectivity,
      project_Education,
      project_Business,
      project_Entertainment,
      galleryImages: Array.isArray(galleryImages)
  ? galleryImages.map(img => (typeof img === 'string' ? { url: img } : { url: img.url || '' }))
  : [],
      floorPlanImages: Array.isArray(floorPlanImages) 
  ? floorPlanImages.map(img => (typeof img === 'string' ? { url: img } : { url: img.url || '' }))
  : [],
    });

    await project.save();
    const savedProject = await Project.findById(project._id);

res.status(201).json({
  success: true,
  message: "Project created successfully",
  project: savedProject
});
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

// Update
export const updateProject = async (req, res) => {
  try {
    const data = req.body;

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      {
        ...data,
        project_Connectivity: data.project_Connectivity?.split(",") || [],
        project_Education: data.project_Education?.split(",") || [],
        project_Business: data.project_Business?.split(",") || [],
        project_Entertainment: data.project_Entertainment?.split(",") || [],
        Amenities: data.Amenities?.split(",") || [],
        projectImages: data.projectImages ? data.projectImages.split(",") : []
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Project not found" });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete
export const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Project not found" });
    res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
