import Amenities from "../../../models/Admin/Constant/AddAmenities.js";
export const createAmenities = async (req, res) => {
  try {
    const { name, icon } = req.body;

    const amenities = new Amenities({
      name,
      icon
    });

    const savedAmenities = await amenities.save();

    res.status(201).json({
      success: true,
      message: "Amenities created successfully",
      amenities: savedAmenities,
    });
  } catch (error) {
    console.error("Error creating builder:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get all amenities
export const getAllAmenities = async (req, res) => {
  try {
    const { q } = req.query;
    const filter = {};
    if (q) filter.name = { $regex: q, $options: "i" };

    const amenities = await Amenities.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: amenities });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching amenities", error });
  }
};

// Get single amenities
export const getAmenitiesById = async (req, res) => {
  try {
    const amenities = await Amenities.findById(req.params.id);
    if (!amenities) {
      return res.status(404).json({ message: "Amenities not found" });
    }
    res.json(amenities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching amenities", error });
  }
};

// Update amenities
export const updateAmenities = async (req, res) => {
  try {
    const amenities = await Amenities.findById(req.params.id);
    if (!amenities) {
      return res.status(404).json({ message: "Amenities not found" });
    }

    const { name, icon } = req.body;

    if (name) amenities.name = name;
    if (icon) amenities.icon = icon;

    const updatedAmenities = await amenities.save();
    res.json(updatedAmenities);
  } catch (error) {
    res.status(500).json({ message: "Error updating amenities", error });
  }
};

// Delete amenities
export const deleteAmenities = async (req, res) => {
  try {
    const amenities = await Amenities.findByIdAndDelete(req.params.id);
    if (!amenities) {
      return res.status(404).json({ message: "Amenities not found" });
    }
    res.json({ message: "Amenities deleted successfully", amenities });
  } catch (error) {
    res.status(500).json({ message: "Error deleting amenities", error });
  }
};
