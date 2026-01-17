import AboutCity from "../../../models/Admin/Constant/AddAboutCity.js";

export const CreateAboutCity = async (req, res) => {
  try {
    const {
      cityName,
      heading1,
      heading2,
      image,
      highlights,    // array of strings
      faqs           // array of { question, answer }
    } = req.body;

    if (!cityName) {
      return res.status(400).json({
        success: false,
        message: "City name is required",
      });
    }

    const newAboutCity = new AboutCity({
      cityName,
      heading1,
      heading2,
      image,

      // only add if provided
      ...(Array.isArray(highlights) && { highlights }),
      ...(Array.isArray(faqs) && { faqs }),
    });

    await newAboutCity.save();

    res.status(201).json({
      success: true,
      data: newAboutCity,
    });
  } catch (error) {
    console.error(error);

    // duplicate city error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "City already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const GetAboutCity = async (req, res) => {
  try {
    const aboutCities = await AboutCity.find(
      {},
      {
        cityName: 1,
        heading1: 1,
        heading2: 1,
        highlights: 1,
        faqs: 1,
        image: 1,
        createdAt: 1,
      }
    )
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: aboutCities.length,
      data: aboutCities,
    });
  } catch (error) {
    console.error("GetAboutCity Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const GetAboutCityByName = async (req, res) => {
  try {
    let { cityName } = req.query;

    if (!cityName) {
      return res.status(400).json({
        success: false,
        message: "cityName is required",
      });
    }

    cityName = cityName.trim();

    // escape regex special characters
    const escapeRegex = (text) =>
      text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

    const aboutCity = await AboutCity.findOne(
      {
        cityName: {
          $regex: `^${escapeRegex(cityName)}$`,
          $options: "i",
        },
      },
      {
        cityName: 1,
        heading1: 1,
        heading2: 1,
        highlights: 1,
        faqs: 1,
        image: 1,
        createdAt: 1,
      }
    ).lean();

    if (!aboutCity) {
      return res.status(404).json({
        success: false,
        message: "About city data not found",
      });
    }

    res.status(200).json({
      success: true,
      data: aboutCity,
    });
  } catch (error) {
    console.error("GetAboutCityByName Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

