import ProjectEnquire from "../../../models/Users/FormHandlermodel/ProjectEnquire.js";
export const createProjectEnquiry = async(req,res) =>{
    try{
        const {name,email,mobile,projectName,status} = req.body;
        const enquiry = new ProjectEnquire({
            name,
            email,
            mobile,
            projectName,
            status,
            createdAt: new Date(),
        });
        await enquiry.save();
        res.status(200).json({ success: true, status: 200, message: "Enquiry created successfully", data: enquiry });
    }catch(error){
        res.status(500).json({ success: false, status: 500, message: "Server error", error: error.message });
    }
}

export const getProjectEnquiries = async(_req,res) =>{
    try{
        const enquiries = await ProjectEnquire.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, status: 200, message: "Enquiries fetched successfully", data: enquiries });
    }catch(error){
        res.status(500).json({ success: false, status: 500, message: "Server error", error: error.message });
    }
}

export const updateProjectEnquiryStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Enquiry ID is required",
      });
    }

    const enquiry = await ProjectEnquire.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Enquiry updated successfully",
      data: enquiry,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


