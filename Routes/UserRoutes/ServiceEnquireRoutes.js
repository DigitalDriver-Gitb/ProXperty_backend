import express from "express";
import { createServiceEnquiry, getServiceEnquiries, updateServiceEnquiryStatus } from "../../Controller/User/UserRoutes/ServiceEnquireController.js";
import { createInteriorDesigner, getInteriorDesigners, updateInteriorDesignerStatus } from "../../Controller/User/UserRoutes/InteriorDesignerController.js";

const router = express.Router();

router.post("/", createServiceEnquiry);
router.get("/", getServiceEnquiries);
router.post("/update", updateServiceEnquiryStatus);
router.post("/interior-designer", createInteriorDesigner);
router.get("/interior-designer", getInteriorDesigners);
router.post("/interior-designer/update", updateInteriorDesignerStatus);

export default router;