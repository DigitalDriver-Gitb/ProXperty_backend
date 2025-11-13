import Builder from "../../../models/Admin/Constant/AddBuilder.js";

// Create builder
// export const createBuilder = async (req, res) => {
//   try {
//     const { name, description, builder_logo } = req.body;

//     const newBuilder = new Builder({
//       name,
//       description,
//       builder_logo, // store the image link (URL)
//     });

//     await newBuilder.save();
//     res.status(201).json(newBuilder);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error creating builder", error });
//   }
// };

export const createBuilder = async (req, res) => {
  try {
    const { name, description, builder_logo, country, state, cities } = req.body;

    const builder = new Builder({
      name,
      description,
      builder_logo,
      country,
      state,
      cities,
    });

    const savedBuilder = await builder.save();

    res.status(201).json({
      success: true,
      message: "Builder created successfully",
      builder: savedBuilder,
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

// Get all builders
export const getBuilders = async (req, res) => {
  try {
    const { q, city } = req.query;
    const filter = {};
    if (q) filter.name = { $regex: q, $options: "i" };
    if (city) filter.cities = city;

    const builders = await Builder.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: builders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching builders", error });
  }
};

// Get single builder
export const getBuilder = async (req, res) => {
  try {
    const builder = await Builder.findById(req.params.id);
    if (!builder) {
      return res.status(404).json({ message: "Builder not found" });
    }
    res.json(builder);
  } catch (error) {
    res.status(500).json({ message: "Error fetching builder", error });
  }
};

// Update builder
export const updateBuilder = async (req, res) => {
  try {
    const builder = await Builder.findById(req.params.id);
    if (!builder) {
      return res.status(404).json({ message: "Builder not found" });
    }

    const { name, description, builder_logo, country, state, cities } = req.body;

    if (name) builder.name = name;
    if (description) builder.description = description;
    if (builder_logo) builder.builder_logo = builder_logo;
    if (country) builder.country = country;
    if (state) builder.state = state;
    if (cities) builder.cities = cities;

    const updatedBuilder = await builder.save();
    res.json(updatedBuilder);
  } catch (error) {
    res.status(500).json({ message: "Error updating builder", error });
  }
};

// Delete builder
export const deleteBuilder = async (req, res) => {
  try {
    const builder = await Builder.findByIdAndDelete(req.params.id);
    if (!builder) {
      return res.status(404).json({ message: "Builder not found" });
    }
    res.json({ message: "Builder deleted successfully", builder });
  } catch (error) {
    res.status(500).json({ message: "Error deleting builder", error });
  }
};
