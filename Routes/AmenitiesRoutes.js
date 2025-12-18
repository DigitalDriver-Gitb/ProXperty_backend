import express from "express";
import {
  createAmenities,
  getAllAmenities,
  getAmenitiesById,
  updateAmenities,
  deleteAmenities,
} from "../Controller/Admin/Constant/AddAmenities.js";

const AmenitiesRouter = express.Router();

AmenitiesRouter.post("/", createAmenities);
AmenitiesRouter.get("/", getAllAmenities);
AmenitiesRouter.get("/:id", getAmenitiesById);
AmenitiesRouter.put("/:id", updateAmenities);
AmenitiesRouter.delete("/:id", deleteAmenities);

export default AmenitiesRouter;
