
import Project from "../../../models/Admin/Project/ProjectModel.js";
import mongoose from "mongoose";
const toArray = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return val.split(",").map((item) => item.trim());
};

// Create Project
export const createProject = async (req, res) => {
  try {
    const { 
      projectName,
       state,
        country,
        city,
        location,
        sublocation,
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
              builderlogo,
              projectBgContent,
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
      builderlogo,
      projectBgContent,
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

// Get  Project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

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
}

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

export const getProjectByUrl = async (req, res) => {
  try{
    const { project_url } = req.params;
    console.log("Looking for project with URL:", project_url);
    const project = await Project.findOne({ project_url});
    console.log("Query result:", project);
    console.log("Project URL from DB:", project?.project_url);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json({ success: true, data: project });
    console.log("Project found:", JSON.stringify(project, null, 2));
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

// Update Project
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

// Delete Project
export const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Project not found" });
    res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Insert BHK
export const bhk_insert = async (req, res) => {
    try {
      // console.log("hello")
      if (req.body) {
        const id = req.params.id;
        if (id) {
          const { bhk_type, price, bhk_Area } = req.body;
          if (bhk_type && price && bhk_Area) {
            const data = {
              bhk_type: bhk_type,
              price: price,
              bhk_Area: bhk_Area,
            };
            const dataPushed = await Project.findOneAndUpdate(
              { _id: id },
              { $push: { BhK_Details: data } },
              { new: true },
            );

            await dataPushed.save();

            return res.status(200).json({
              status: 200,
              message: "data pushed successfully !",
              data: dataPushed
            });
          } else {
            return res.status(403).json({
              message: "check your input field ! ",
            });
          }
        } else {
          return res.status(403).json({
            message: "check id !",
          });
        }
      } else {
        return res.status(403).json({
          message: "check your field ! ",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Inetrnal server error !",
      });
    }
  };
// project bhk detail view
export const bhk_view = async (req, res) => {
    try {
      //console.log("chcoSJ")
      const id = req.params.id;
      // console.log(id)
      if (id) {
        const data = await Project.findById({ _id: id });
        // console.log(data)
        if (data) {
          return res.status(200).json({
            message: "data get successfully",
            data: data.BhK_Details,
          });
        } else {
          return res.status(200).json({
            message: "data not found ",
          });
        }
      } else {
        return res.status(404).json({
          message: "check url id ",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error !",
      });
    }
  };

//project bhk edit data get
export const bhk_edit = async (req, res) => {
    try {
      const id = req.params.id;
      if (id) {
        const data = await Project.findOne(
          { "BhK_Details._id": id },
          {
            BhK_Details: {
              $elemMatch: {
                _id: id,
              },
            },
          },
        );

        if (data) {
          return res.status(200).json({
            message: "data get successfully !",
            data,
          });
        } else {
          return res.status(200).json({
            message: "data not found !",
          });
        }
      } else {
        return res.status(404).json({
          message: "check your id !",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error ! ",
      });
    }
  };

//project bhk update
export const bhk_update = async (req, res) => {
    // console.log("hello")
    try {
      const { bhk_type, price, bhk_Area } = req.body;
      const id = req.params.id;
      const update = {
        bhk_type: bhk_type,
        price: price,
        bhk_Area: bhk_Area,
      };
      if (update) {
        const data = await Project.findOneAndUpdate(
          { "BhK_Details._id": id },
          { $set: { "BhK_Details.$": update } },
          { new: true }
        );
        if (data) {
          return res.status(200).json({
            message: "data update successfully  !",
          });
        } else {
          return res.status(200).json({
            message: "data not found !",
          });
        }
      } else {
        return res.status(200).json({
          message: "check field !",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error ! ",
      });
    }
  };

//project bhk delete
export const bhk_delete = async (req, res) => {
    try {
        const projectId = req.params.id; // This is the project ID from the URL
        const { bhkId } = req.body; // This is the BHK ID from the request body

        if (!mongoose.Types.ObjectId.isValid(projectId) || !mongoose.Types.ObjectId.isValid(bhkId)) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid ID format" 
            });
        }

        const result = await Project.updateOne(
            { _id: projectId, "BhK_Details._id": bhkId },
            { $pull: { BhK_Details: { _id: bhkId } } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ 
                success: false,
                message: "Project or BHK entry not found" 
            });
        }

        return res.status(200).json({
            success: true,
            message: "BHK entry deleted successfully"
        });

    } catch (error) {
        console.error("Error in bhk_delete:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

export const rera_insert = async (req, res) => {
    try {
      // console.log("hello")
      if (req.body) {
        const id = req.params.id;
        if (id) {
          const { reraNo, qrImage } = req.body;
          if (reraNo && qrImage) {
            const data = {
              reraNo: reraNo,
              qrImage: qrImage,
            };
            const dataPushed = await Project.findOneAndUpdate(
              { _id: id },
              { $push: { reraDetails: data } },
              { new: true },
            );

            await dataPushed.save();

            return res.status(200).json({
              status: 200,
              message: "data pushed successfully !",
              data: dataPushed
            });
          } else {
            return res.status(403).json({
              message: "check your input field ! ",
            });
          }
        } else {
          return res.status(403).json({
            message: "check id !",
          });
        }
      } else {
        return res.status(403).json({
          message: "check your field ! ",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Inetrnal server error !",
      });
    }
};

export const rera_view = async (req, res) => {
    try {
      //console.log("chcoSJ")
      const id = req.params.id;
      // console.log(id)
      if (id) {
        const data = await Project.findById({ _id: id });
        // console.log(data)
        if (data) {
          return res.status(200).json({
            message: "data get successfully",
            data: data.reraDetails,
          });
        } else {
          return res.status(200).json({
            message: "data not found ",
          });
        }
      } else {
        return res.status(404).json({
          message: "check url id ",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error !",
      });
    }
  };

//project bhk edit data get
export const rera_edit = async (req, res) => {
    try {
      const id = req.params.id;
      if (id) {
        const data = await Project.findOne(
          { "reraDetails._id": id },
          {
            reraDetails: {
              $elemMatch: {
                _id: id,
              },
            },
          },
        );

        if (data) {
          return res.status(200).json({
            message: "data get successfully !",
            data,
          });
        } else {
          return res.status(200).json({
            message: "data not found !",
          });
        }
      } else {
        return res.status(404).json({
          message: "check your id !",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error ! ",
      });
    }
  };

//project rera update
export const rera_update = async (req, res) => {
    // console.log("hello")
    try {
      const { reraNo, qrImage } = req.body;
      const id = req.params.id;
      const update = {
        reraNo: reraNo,
        qrImage: qrImage,
      };
      if (update) {
        const data = await Project.findOneAndUpdate(
          { "reraDetails._id": id },
          { $set: { "reraDetails.$": update } },
          { new: true }
        );
        if (data) {
          return res.status(200).json({
            message: "data update successfully  !",
          });
        } else {
          return res.status(200).json({
            message: "data not found !",
          });
        }
      } else {
        return res.status(200).json({
          message: "check field !",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error ! ",
      });
    }
  };

//project rera delete
export const rera_delete = async (req, res) => {
    try {
        const projectId = req.params.id; // This is the project ID from the URL
        const { reraId } = req.body; // This is the RERA ID from the request body

        if (!mongoose.Types.ObjectId.isValid(projectId) || !mongoose.Types.ObjectId.isValid(reraId)) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid ID format" 
            });
        }

        const result = await Project.updateOne(
            { _id: projectId, "reraDetails._id": reraId },
            { $pull: { reraDetails: { _id: reraId } } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ 
                success: false,
                message: "Project or RERA entry not found" 
            });
        }

        return res.status(200).json({
            success: true,
            message: "RERA entry deleted successfully"
        });

    } catch (error) {
        console.error("Error in rera_delete:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

export const highlightPoint = async (req, res) => {
    try {
      const id = req.params.id;
      const highlight_Point = req.body.highlight_Point;
      // console.log(highlight_Point,id);
      if (highlight_Point) {
        const data = {
          highlight_Point: highlight_Point,
        };
        const dataPushed = await Project.findOneAndUpdate(
          { _id: id },
          { $push: { highlight: data } },
          { new: true },
        );

        await dataPushed.save();

        return res.status(200).json({
          message: "data pushed successfully !",
        });
      } else {
        return res.status(200).json({
          message: "check input box",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({});
    }
};
export const highlightPoint_view = async (req, res) => {
  try {
    const id = req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID format"
      });
    }

    const project = await Project.findById(id).select('highlight');
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data: project.highlight || []
    });

  } catch (error) {
    console.error("Error in highlightPoint_view:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};
  export const highlightedit = async (req, res) => {
    // console.log("hello")
    try {
      const id = req.params.id;
      // console.log(id)
      if (isValidObjectId(id)) {
        const data = await Project.findOne(
          { "highlight._id": id },
          {
            highlight: {
              $elemMatch: {
                _id: id,
              },
            },
          },
        );
        return res.status(200).json({
          message: "data get Successfully ! ",
          data,
        });
      } else {
        return res.status(200).json({
          message: "check Your Id ",
        });
      }
    } catch (error) { 
      console.error("Error in highlightedit:", error);
      return res.status(500).json({
        message: "Internal server error ! ",
        error: error.message
      });
    }
  };
  export const highlightupdate = async (req, res) => {
    // console.log("hello")
    try {
      //  console.log(req.params.id)
      const id = req.params.id;
      const highlight_Point = req.body.highlight_Point;
      if (isValidObjectId(id)) {
        const data = await Project.findOneAndUpdate(
          { "highlight._id": id },
          {
            $set: {
              "highlight.$.highlight_Point": highlight_Point,
            },
          },
          { new: true },
        );
        return res.status(200).json({
          message: "data update successfully !",
          data,
        });
      } else {
        return res.status(200).json({
          error: "check your field !",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
export const highlightdelete = async (req, res) => {
  try {
    const highlightId = req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(highlightId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid highlight ID format"
      });
    }

    const project = await Project.findOneAndUpdate(
      { "highlight._id": highlightId },
      { 
        $pull: { 
          highlight: { _id: highlightId } 
        } 
      },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Highlight point not found or already deleted"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Highlight point deleted successfully",
      data: project.highlight
    });

  } catch (error) {
    console.error("Error in highlightdelete:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};