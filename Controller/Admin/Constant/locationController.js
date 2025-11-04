import Country from "../../../models/Admin/Constant/Country.js";
import State from "../../../models/Admin/Constant/State.js";
import City from "../../../models/Admin/Constant/City.js";
import Location from "../../../models/Admin/Constant/Location.js";
import Sublocation from "../../../models/Admin/Constant/Sublocation.js";

// ---------- COUNTRY ----------
export const getCountries = async (req, res) => {
  try {
    const countries = await Country.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: countries });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addCountry = async (req, res) => {
  try {
    console.log('Request body:', req.body); // Add this line
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const exists = await Country.findOne({ name });
    if (exists) return res.status(400).json({ message: "Country already exists" });
    const newCountry = await Country.create({ name });
    res.status(201).json({ success: true, data: newCountry });
  } catch (err) {
    console.error('Error in addCountry:', err); // Add this line
    res.status(500).json({ error: err.message });
  }
};

// ---------- STATE ----------
export const getStates = async (req, res) => {
  try {
    const { countryId } = req.query;
    const states = await State.find({ countryId });
    res.status(200).json({ success: true, data: states });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addState = async (req, res) => {
  try {
    const { name, countryId } = req.body;
    const newState = await State.create({ name, countryId });
    res.status(201).json({ success: true, data: newState });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------- CITY ----------
export const getCities = async (req, res) => {
  try {
    const { stateId } = req.query;
    const cities = await City.find({ stateId });
    res.status(200).json({ success: true, data: cities });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addCity = async (req, res) => {
  try {
    const { name, stateId } = req.body;
    const newCity = await City.create({ name, stateId });
    res.status(201).json({ success: true, data: newCity });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------- LOCATION ----------
export const getLocations = async (req, res) => {
  try {
    const { cityId } = req.query;
    const locations = await Location.find({ cityId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: locations });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addLocation = async (req, res) => {
  try {
    const { name, cityId } = req.body;
    if (!name || !cityId)
      return res.status(400).json({ message: "Name and cityId are required" });

    const newLocation = await Location.create({ name, cityId });
    res.status(201).json({ success: true, data: newLocation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------- SUBLOCATION ----------
export const getSublocations = async (req, res) => {
  try {
    const { locationId } = req.query;
    if (!locationId) {
      return res.status(400).json({ message: "locationId is required as a query parameter" });
    }
    const subs = await Sublocation.find({ locationId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: subs });
  } catch (err) {
    console.error("Error getting sublocations:", err);
    res.status(500).json({ error: err.message });
  }
};

export const addSublocation = async (req, res) => {
  try {
    const { name, locationId } = req.body;
    if (!name || !locationId) {
      return res.status(400).json({ message: "Name and locationId are required" });
    }
    const newSub = await Sublocation.create({ 
      name, 
      locationId: locationId // Map locationId to cityId to match the model
    });
    res.status(201).json({ success: true, data: newSub });
  } catch (err) {
    console.error("Error adding sublocation:", err);
    res.status(500).json({ error: err.message });
  }
};


