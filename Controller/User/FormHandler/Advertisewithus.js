import express from "express";
import AdvertisewithusEnquiry from "../../../models/Users/FormHandlermodel/AdvertisewithusModel.js";
export const createAdvertisewithUsEnquiry = async(req,res) =>{
    try{
        const {name,email,phone,role} = req.body;
        const enquiry = new AdvertisewithusEnquiry({
            name,
            email,
            phone,
            role,
            createdAt: new Date(),
        });
        await enquiry.save();
        res.status(200).json({ success: true, data: "Enquiry created successfully" });
    }catch(error){
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getAdvertisewithUsEnquiry = async(req,res) =>{
    try{
        const enquiry = await AdvertisewithusEnquiry.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: enquiry });
    }catch(error){
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


