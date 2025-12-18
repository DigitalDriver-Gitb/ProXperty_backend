import express from "express";
import { createProjectEnquiry, getProjectEnquiries } from "../../Controller/User/FormHandler/ProjectEnquire.js";

const router = express.Router();

router.post("/", createProjectEnquiry);
router.get("/", getProjectEnquiries);

export default router;