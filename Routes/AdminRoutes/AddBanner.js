import express from "express";
import {
    createBannerImage,
    getAllBannerImage
} from "../../Controller/Admin/MainBanner/BannerController.js";

const AmenitiesRouter = express.Router();

AmenitiesRouter.post("/", createBannerImage);
AmenitiesRouter.get("/", getAllBannerImage);

export default AmenitiesRouter;
