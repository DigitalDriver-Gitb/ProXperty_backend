import express from "express";
import { 
  createGlobalEnquiry, 
  getGlobalEnquiries, 
  getGlobalEnquiryById, 
  updateGlobalEnquiryStatus, 
  deleteGlobalEnquiry,
  getGlobalEnquiryStats 
} from "../../Controller/User/FormHandler/GlobalEnquiryHandler.js";

const router = express.Router();

// Create a new global enquiry
router.post("/", createGlobalEnquiry);

// Get all global enquiries with optional filtering and pagination
router.get("/", getGlobalEnquiries);

// Get enquiry statistics
router.get("/stats", getGlobalEnquiryStats);

// Get a single global enquiry by ID
router.get("/:id", getGlobalEnquiryById);

// Update global enquiry status
router.patch("/:id/status", updateGlobalEnquiryStatus);

// Delete global enquiry
router.delete("/:id", deleteGlobalEnquiry);

export default router;