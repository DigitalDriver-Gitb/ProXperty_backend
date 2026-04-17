import express from "express";
import { createProjectEnquiry, getProjectEnquiries ,updateProjectEnquiryStatus } from "../../Controller/User/FormHandler/ProjectEnquire.js";

const router = express.Router();

router.post("/", createProjectEnquiry);
router.get("/", getProjectEnquiries);
router.post("/update",updateProjectEnquiryStatus);

export default router;