import PhoneBanner from "../../../models/Admin/MainBanner/PhoneBannerModel.js";

import express from "express";

const router = express.Router();

export const createPhoneBannerImage = async (req, res) => {
  try {
    const { image } = req.body;

    const banner = await PhoneBanner.findOneAndUpdate(
      {},
      {
        image,
        updatedAt: new Date()
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
      }
    );

    return res.status(200).json({
      success: true,
      data: banner
    });

  } catch (error) {
    console.error("CreatePhoneBannerImage Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllPhoneBannerImage = async(req,res) =>{
  try {
      const BannerImage = await PhoneBanner.find({});
        res.status(200).json({
          success:true,
          data:BannerImage
        })
  } catch (error) {
    console.error("getAllPhoneBannerImage Error:",error);
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}
