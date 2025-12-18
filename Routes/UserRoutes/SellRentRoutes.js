import express from "express";
import { createSellandRentEnquiry, getSellandRentEnquiry } from "../../Controller/User/FormHandler/SellandRent.js";

const router = express.Router();

router.post("/", createSellandRentEnquiry);
router.get("/", getSellandRentEnquiry);

export default router;