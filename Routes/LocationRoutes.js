import express from "express";
import {
  getCountries,
  addCountry,
  getStates,
  addState,
  getCities,
  addCity,
  getLocations,
  addLocation,
  getSublocations,
  addSublocation,
} from "../Controller/Admin/Constant/locationController.js";

const router = express.Router();

// Country
router.get("/countries", getCountries);
router.post("/countries", addCountry);

// State
router.get("/states", getStates);
router.post("/states", addState);

// City
router.get("/cities", getCities);
router.post("/cities", addCity);

// Location
router.get("/locations", getLocations);
router.post("/locations", addLocation);

// Sublocation
router.get("/sublocations", getSublocations);
router.post("/sublocations", addSublocation);

export default router;
