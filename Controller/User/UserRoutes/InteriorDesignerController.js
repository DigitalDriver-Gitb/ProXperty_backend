import InteriorDesignerModel from "../../../models/Users/FormHandlermodel/InteriorDesignerModal.js";

export const createInteriorDesigner = async(req,res) =>{
    try{
        const {name,email,phone,serviceName,floorPlan,purpose,status} = req.body;
        const enquiry = new InteriorDesignerModel({
            name,
            email,
            phone,
            serviceName,
            floorPlan,
            purpose,
            status,
            createdAt: new Date(),
        });
        await enquiry.save();
        res.status(200).json({ success: true, status: 200, message: "Enquiry created successfully", data: enquiry });
    }catch(error){
        res.status(500).json({ success: false, status: 500, message: "Server error", error: error.message });
    }
}

export const getInteriorDesigners = async(_req,res) =>{
    try{
        const enquiries = await InteriorDesignerModel.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, status: 200, message: "Enquiries fetched successfully", data: enquiries });
    }catch(error){
        res.status(500).json({ success: false, status: 500, message: "Server error", error: error.message });
    }
}


export const updateInteriorDesignerStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Enquiry ID is required",
      });
    }

    const enquiry = await InteriorDesignerModel.findByIdAndUpdate(
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