import ProjectEnquire from "../../../models/Users/FormHandlermodel/ProjectEnquire.js";
export const createProjectEnquiry = async(req,res) =>{
    try{
        const {name,email,mobile} = req.body;
        const enquiry = new ProjectEnquire({
            name,
            email,
            mobile,
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


