import Type from "../../../models/Admin/Constant/Addtype.js";

// ✅ Create Type
export const createType = async (req, res) => {
  try {
    const { type_name } = req.body;
    if (!type_name) {
      return res.status(400).json({ success: false, message: "Type name is required" });
    }

    const existingType = await Type.findOne({ type_name });
    if (existingType) {
      return res.status(400).json({ success: false, message: "Type already exists" });
    }

    const newType = new Type({ type_name });
    await newType.save();

    res.status(201).json({
      success: true,
      message: "Type created successfully",
      data: newType,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating type",
      error: error.message,
    });
  }
};

// ✅ Get all Types
export const getTypes = async (req, res) => {
  try {
    const types = await Type.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: types });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching types",
      error: error.message,
    });
  }
};

// ✅ Get single Type
export const getType = async (req, res) => {
  try {
    const type = await Type.findById(req.params.id);
    if (!type)
      return res.status(404).json({ success: false, message: "Type not found" });

    res.status(200).json({ success: true, data: type });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching type",
      error: error.message,
    });
  }
};

// ✅ Update Type
export const updateType = async (req, res) => {
  try {
    const { type_name } = req.body;
    const updatedType = await Type.findByIdAndUpdate(
      req.params.id,
      { type_name },
      { new: true }
    );

    if (!updatedType)
      return res.status(404).json({ success: false, message: "Type not found" });

    res.status(200).json({
      success: true,
      message: "Type updated successfully",
      data: updatedType,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating type",
      error: error.message,
    });
  }
};

// ✅ Delete Type
export const deleteType = async (req, res) => {
  try {
    const deletedType = await Type.findByIdAndDelete(req.params.id);
    if (!deletedType)
      return res.status(404).json({ success: false, message: "Type not found" });

    res.status(200).json({
      success: true,
      message: "Type deleted successfully",
      data: deletedType,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting type",
      error: error.message,
    });
  }
};
