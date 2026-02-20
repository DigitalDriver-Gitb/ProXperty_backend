import express from "express";
import {
    createPhoneBannerImage,
    getAllPhoneBannerImage
} from "../../Controller/Admin/MainBanner/PhoneBannerController.js";

const PhoneBannerRouter = express.Router();

PhoneBannerRouter.post("/", createPhoneBannerImage);
PhoneBannerRouter.get("/", getAllPhoneBannerImage);

export default PhoneBannerRouter;
