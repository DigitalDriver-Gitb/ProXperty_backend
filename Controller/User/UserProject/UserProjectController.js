import Project from "../../../models/Admin/Project/ProjectModel.js";
import Builder from "../../../models/Admin/Constant/AddBuilder.js";
export const getProjectByCity = async(req,res) =>{
  try{
    console.log("City param:", req.params.city)
    const { city } = req.params;
    const projects = await Project.find({
      city: { $regex: new RegExp(`^${city}$`, "i") }
    });

    res.status(200).json({ success: true, data: projects });
    console.log("Projects found:", projects.length);
    console.log("Projects:", JSON.stringify(projects, null, 2));
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getProjectBySublocation= async(req,res) =>{
   try{
    console.log("Sublocation param:", req.params.sublocation)
    const { sublocation } = req.params;
    const projects = await Project.find({
      sublocation: { $regex: new RegExp(`^${sublocation}$`, "i") }
    });

    res.status(200).json({ success: true, data: projects });
    console.log("Projects found:", projects.length);
    console.log("Projects:", JSON.stringify(projects, null, 2));

   }catch(error){
    res.status(500).json({ message: "Server error", error: error.message });
   }
};

export const getProjectBySpotlight = async(req,res) =>{
    try{
         const projects = await Project.find({spotlight: "True"});
         res.status(200).json({ success: true, data: projects });
    }catch(error){
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const getProjectByBuilder = async(req,res) =>{
    try{
        const { builderName } = req.params;
        const projects = await Project.find({ builderName: { $regex: new RegExp(`^${builderName}$`, "i") } });
        res.status(200).json({ success: true, data: projects });
        console.log("Projects found:", projects.length);
        console.log("Projects:", JSON.stringify(projects, null, 2));
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getProjectById = async(req,res) =>{
    try{
        const { id } = req.params;
        const project = await Project.findById(id);
        res.status(200).json({ success: true, data: project });
    }catch(error){
        res.status(500).json({ message: "Server error", error: error.message });
    }
}   


export const getProjects = async(req,res) =>{
    try{
        const projects = await Project.find();
        res.status(200).json({ success: true, data: projects });
    }catch(error){
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getProjectByUrl = async(req,res) =>{
    try{
        const { project_url } = req.params;
        const project = await Project.findOne({ project_url });
        res.status(200).json({ success: true, data: project });
    }catch(error){
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getSpotlightProjectByCities = async (req, res) => {
  try {
    const { city } = req.params;

    const projects = await Project.find({
      city: { $regex: new RegExp(`^${city}$`, "i") },
      spotlight: "True"
    });

    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getProjectByType = async (req, res) => {
  try {
    const { city, type } = req.params;

    const projects = await Project.find({
      city: new RegExp(`^${city}$`, "i"),
      type: new RegExp(`^${type}$`, "i")
    });

    return res.status(200).json({ success: true, data: projects });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllBuilders = async (req, res) => {
  try {
    const { q, city } = req.query;
    const filter = {};
    if (q) filter.name = { $regex: q, $options: "i" };
    if (city) filter.cities = city;

    const builders = await Builder.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: builders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching builders", error });
  }
};

export const getBuildersByCity = async (req, res) => {
  try {
    const { city } = req.params;

    const builders = await Builder.find({
      cities: { $regex: `^${city}$`, $options: "i" }
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: builders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching builders by city",
      error: error.message
    });
  }
};