import express from "express";
import {
    createBannerImage,
    getAllBannerImage
} from "../../Controller/Admin/MainBanner/BannerController.js";

const BannerRouter = express.Router();

BannerRouter.post("/", createBannerImage);
BannerRouter.get("/", getAllBannerImage);

export default BannerRouter;
