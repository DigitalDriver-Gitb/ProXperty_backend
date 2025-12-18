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
        res.status(200).json({ success: true, data: "Enquiry created successfully" });
    }catch(error){
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getSellandRentEnquiry = async(req,res) =>{
    try{
        const enquiry = await SellandRentEnquiry.find();
        res.status(200).json({ success: true, data: enquiry });
    }catch(error){
        res.status(500).json({ message: "Server error", error: error.message });
    }
}



