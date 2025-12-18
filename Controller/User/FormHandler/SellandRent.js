import express from "express";
import SellandRentEnquiry from "../../../models/Users/FormHandlermodel/SellandRentModal.js";


export const createSellandRentEnquiry = async(req,res) =>{
    try{
        const {name,email,phone,role,intent,city} = req.body;
        const enquiry = new SellandRentEnquiry({
            name,
            email,
            phone,
            role,
            intent,
            city,
            createdAt: new Date(),
        });
        await enquiry.save();
        res.status(200).json({ success: true, status: 200, message: "Enquiry created successfully", data: enquiry });
    }catch(error){
        res.status(500).json({ success: false, status: 500, message: "Server error", error: error.message });
    }
}

export const getSellandRentEnquiry = async(_req,res) =>{
    try{
        const enquiry = await SellandRentEnquiry.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, status: 200, message: "Enquiries fetched successfully", data: enquiry });
    }catch(error){
        res.status(500).json({ success: false, status: 500, message: "Server error", error: error.message });
    }
}



