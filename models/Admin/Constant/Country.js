import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
  },
});

// ✅ Prevent OverwriteModelError
const Country =
  mongoose.models.Country || mongoose.model("Country", countrySchema);

export default Country;
