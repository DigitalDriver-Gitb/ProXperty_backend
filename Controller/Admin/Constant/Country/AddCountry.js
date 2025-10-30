
import Country from "../../../../models/Admin/Constant/AddCountry.js";

// ✅ Create Country
export const createCountry = async (req, res) => {
  try {
    const {
      country_name,
      state_name,
      city_name,
      location_name,
      sub_location_name,
    } = req.body;

    const newCountry = new Country({
      country_name,
      state_name,
      city_name,
      location_name,
      sub_location_name,
    });

    await newCountry.save();
    res.status(201).json({
      success: true,
      message: "Country added successfully",
      data: newCountry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating country",
      error: error.message,
    });
  }
};

// ✅ Get all countries
export const getCountries = async (req, res) => {
  try {
    const countries = await Country.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: countries });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching countries",
      error: error.message,
    });
  }
};

// ✅ Get single country
export const getCountry = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country)
      return res.status(404).json({ success: false, message: "Country not found" });

    res.status(200).json({ success: true, data: country });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching country",
      error: error.message,
    });
  }
};

// ✅ Update country
export const updateCountry = async (req, res) => {
  try {
    const updatedCountry = await Country.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedCountry)
      return res.status(404).json({ success: false, message: "Country not found" });

    res.status(200).json({
      success: true,
      message: "Country updated successfully",
      data: updatedCountry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating country",
      error: error.message,
    });
  }
};

// ✅ Delete country
export const deleteCountry = async (req, res) => {
  try {
    const deletedCountry = await Country.findByIdAndDelete(req.params.id);
    if (!deletedCountry)
      return res.status(404).json({ success: false, message: "Country not found" });

    res.status(200).json({
      success: true,
      message: "Country deleted successfully",
      data: deletedCountry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting country",
      error: error.message,
    });
  }
};
