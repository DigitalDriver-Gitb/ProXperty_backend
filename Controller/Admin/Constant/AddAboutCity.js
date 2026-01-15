import AboutCity from "../../../models/Admin/Constant/AddAboutCity.js";

export const CreateAboutCity = async (req,res) =>{
    try {
        const {cityName,description,image} = req.body;
        const newAboutCity = new AboutCity({cityName,description,image});
        await newAboutCity.save();
        res.status(201).json({success:true,data:newAboutCity});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:error.message});
    }
}

export const GetAboutCity= async(req,res) =>{
    try {
      const aboutCity = await AboutCity.find();
      res.status(200).json({success:true,data:aboutCity});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:error.message});
    }
}

export const GetAboutCityByName = async (req, res) => {
  try {
    const { cityName } = req.query;

    if (!cityName) {
      return res.status(400).json({
        success: false,
        message: "cityName is required",
      });
    }

    const aboutCity = await AboutCity.findOne({
      cityName: { $regex: `^${cityName}$`, $options: "i" }, // case-insensitive
    });

    if (!aboutCity) {
      return res.status(404).json({
        success: false,
        message: "City not found",
      });
    }

    res.status(200).json({
      success: true,
      data: aboutCity,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

