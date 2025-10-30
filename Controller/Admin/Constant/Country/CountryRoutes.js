import express from "express";
import {
  createCountry,
  getCountries,
  getCountry,
  updateCountry,
  deleteCountry,
} from "./AddCountry.js";

const CountryRouter = express.Router();

CountryRouter.post("/", createCountry);
CountryRouter.get("/", getCountries);
CountryRouter.get("/:id", getCountry);
CountryRouter.put("/:id", updateCountry);
CountryRouter.delete("/:id", deleteCountry);

export default CountryRouter;
