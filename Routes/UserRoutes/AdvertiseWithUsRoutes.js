import express from "express";
import { createAdvertisewithUsEnquiry, getAdvertisewithUsEnquiry } from "../../Controller/User/FormHandler/Advertisewithus.js";

const router = express.Router();

router.post("/", createAdvertisewithUsEnquiry);
router.get("/", getAdvertisewithUsEnquiry);

export default router;