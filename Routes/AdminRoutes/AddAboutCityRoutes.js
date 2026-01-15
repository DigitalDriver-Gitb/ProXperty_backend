import {
  CreateAboutCity,
  GetAboutCity,
  GetAboutCityByName,
} from "../../Controller/Admin/Constant/AddAboutCity.js";

import express from "express";
const AddAboutCityRouter = express.Router();

AddAboutCityRouter.post("/", CreateAboutCity);

// get all (admin use)
AddAboutCityRouter.get("/by-city", GetAboutCityByName);
AddAboutCityRouter.get("/", GetAboutCity);

// get by city name (frontend use)

export default AddAboutCityRouter;
