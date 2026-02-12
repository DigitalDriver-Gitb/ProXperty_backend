import Banner from "../../../models/Admin/MainBanner/BannerModel.js";

import express from "express";

const router = express.Router();

export const createBannerImage = async (req, res) => {
  try {
    const { image } = req.body;

    const banner = await Banner.findOneAndUpdate(
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
    console.error("CreateBannerImage Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllBannerImage = async(req,res) =>{
  try {
      const BannerImage = await Banner.find({});
        res.status(200).json({
          success:true,
          data:BannerImage
        })
  } catch (error) {
    console.error("getAllBannerImage Error:",error);
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}
