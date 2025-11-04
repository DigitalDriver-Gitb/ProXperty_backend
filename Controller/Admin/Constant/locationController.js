import Country from "../../../models/Admin/Constant/Country.js";
import State from "../../../models/Admin/Constant/State.js";
import City from "../../../models/Admin/Constant/City.js";
import Sublocation from "../../../models/Admin/Constant/Sublocation.js";

// ---------- COUNTRY ----------
export const getCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addCountry = async (req, res) => {
  try {
    const { name } = req.body;
    const exists = await Country.findOne({ name });
    if (exists) return res.status(400).json({ message: "Country already exists" });
    const newCountry = await Country.create({ name });
    res.status(201).json(newCountry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------- STATE ----------
export const getStates = async (req, res) => {
  try {
    const { countryId } = req.query;
    const states = await State.find({ countryId });
    res.json(states);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addState = async (req, res) => {
  try {
    const { name, countryId } = req.body;
    const newState = await State.create({ name, countryId });
    res.status(201).json(newState);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------- CITY ----------
export const getCities = async (req, res) => {
  try {
    const { stateId } = req.query;
    const cities = await City.find({ stateId });
    res.json(cities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addCity = async (req, res) => {
  try {
    const { name, stateId } = req.body;
    const newCity = await City.create({ name, stateId });
    res.status(201).json(newCity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------- SUBLOCATION ----------
export const getSublocations = async (req, res) => {
  try {
    const { cityId } = req.query;
    const subs = await Sublocation.find({ cityId });
    res.json(subs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addSublocation = async (req, res) => {
  try {
    const { name, cityId } = req.body;
    const newSub = await Sublocation.create({ name, cityId });
    res.status(201).json(newSub);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
