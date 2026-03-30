import Project from "../../models/Admin/Project/ProjectModel.js";

// ✅ CITY PAGE
export const getCityPage = async (req, res) => {
  try {
    const { city } = req.params;

    const projects = await Project.find({ citySlug: city });

    res.json({
      success: true,
      total: projects.length,
      data: projects
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ CITY + BHK PAGE (MAIN SEO PAGE 🔥)
export const getCityBhkPage = async (req, res) => {
  try {
    const { city, bhk } = req.params;

    const projects = await Project.find({
      citySlug: city,
      "BhK_Details.bhk_slug": bhk
    });

    res.json({
      success: true,
      total: projects.length,
      data: projects
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ PROJECT PAGE
export const getProjectPage = async (req, res) => {
  try {
    const { slug } = req.params;

    const project = await Project.findOne({ projectSlug: slug });

    if (!project) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(project);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ BUILDER PAGE
export const getBuilderPage = async (req, res) => {
  try {
    const { builder } = req.params;

    const projects = await Project.find({
      builderName: new RegExp(`^${builder}$`, "i")
    });

    res.json({
      success: true,
      data: projects
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCityBhkFilterPage = async (req, res) => {
  try {
    const { city, bhk, filter } = req.params;

    let query = {
      citySlug: city,
      "BhK_Details.bhk_slug": bhk,
    };

    // 🔥 PRICE FILTERS
    if (filter === "under-1-cr") {
      query.maxPrice = { $lte: 10000000 };
    }

    if (filter === "under-2-cr") {
      query.maxPrice = { $lte: 20000000 };
    }

    if (filter === "under-50-lakh") {
      query.maxPrice = { $lte: 5000000 };
    }

    // 🔥 STATUS FILTERS
    if (filter === "ready-to-move") {
      query.project_Status = "Ready to Move";
    }

    if (filter === "new-launch") {
      query.project_Status = "New Launch";
    }

    const data = await Project.find(query);

    res.json({
      success: true,
      total: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCityLocationPage = async (req, res) => {
  const { city, location } = req.params;

  const data = await Project.find({
    citySlug: city,
    locationSlug: location,
  });

  res.json({ data });
};

export const getCityLocationBhkPage = async (req, res) => {
  const { city, location, bhk } = req.params;

  const data = await Project.find({
    citySlug: city,
    locationSlug: location,
    "BhK_Details.bhk_slug": bhk,
  });

  res.json({ data });
};

export const getCityLocationBhkFilterPage = async (req, res) => {
  const { city, location, bhk, filter } = req.params;

  let query = {
    citySlug: city,
    locationSlug: location,
    "BhK_Details.bhk_slug": bhk,
  };

  if (filter === "under-1-cr") {
    query.maxPrice = { $lte: 10000000 };
  }

  if (filter === "ready-to-move") {
    query.project_Status = "Ready to Move";
  }

  const data = await Project.find(query);

  res.json({ data });
};

export const getCityTypePage = async (req, res) => {
  const { city, type } = req.params;

  const data = await Project.find({
    citySlug: city,
    typeSlug: type,
  });

  res.json({ data });
};

export const getCityTypeLocationPage = async (req, res) => {
  const { city, type, location } = req.params;

  const data = await Project.find({
    citySlug: city,
    typeSlug: type,
    locationSlug: location,
  });

  res.json({ data });
};

export const getCityTypeLocationBhkPage = async (req, res) => {
  const { city, type, location, bhk } = req.params;

  const data = await Project.find({
    citySlug: city,
    typeSlug: type,
    locationSlug: location,
    "BhK_Details.bhk_slug": bhk,
  });

  res.json({ data });
};

export const getCityTypeLocationBhkFilterPage = async (req, res) => {
  const { city, type, location, bhk, filter } = req.params;

  let query = {
    citySlug: city,
    typeSlug: type,
    locationSlug: location,
    "BhK_Details.bhk_slug": bhk,
  };

  if (filter === "under-1-cr") {
    query.maxPrice = { $lte: 10000000 };
  }

  if (filter === "ready-to-move") {
    query.project_Status = "Ready to Move";
  }

  const data = await Project.find(query);

  res.json({ data });
};

export const getCityTypeLocationSublocationPage = async (req, res) => {
  const { city, type, location, sublocation } = req.params;

  const data = await Project.find({
    citySlug: city,
    typeSlug: type,
    locationSlug: location,
    sublocationSlug: sublocation,
  });

  res.json({ data });
};

export const getCityTypeLocationSublocationBhkPage = async (req, res) => {
  const { city, type, location, sublocation, bhk } = req.params;

  const data = await Project.find({
    citySlug: city,
    typeSlug: type,
    locationSlug: location,
    sublocationSlug: sublocation,
    "BhK_Details.bhk_slug": bhk,
  });

  res.json({ data });
};

export const getFullFilterPage = async (req, res) => {
  const { city, type, location, sublocation, bhk, filter } = req.params;

  let query = {
    citySlug: city,
    typeSlug: type,
    locationSlug: location,
    sublocationSlug: sublocation,
    "BhK_Details.bhk_slug": bhk,
  };

  if (filter === "under-1-cr") {
    query.maxPrice = { $lte: 10000000 };
  }

  if (filter === "ready-to-move") {
    query.project_Status = "Ready to Move";
  }

  const data = await Project.find(query);

  res.json({ data });
};