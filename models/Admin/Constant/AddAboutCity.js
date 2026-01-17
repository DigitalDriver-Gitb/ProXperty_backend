import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false } // prevents auto _id for each FAQ item
);

const aboutCitySchema = new mongoose.Schema(
  {
    cityName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    heading1: {
      type: String,
      trim: true,
    },

    heading2: {
      type: String,
      trim: true,
    },

    image: {
      type: String,
    },

    /* 🔹 HIGHLIGHTS / POINTERS */
    highlights: {
      type: [String], // array → index 0,1,2,3...
      default: [],
    },

    /* 🔹 FAQ SYSTEM */
    faqs: {
      type: [faqSchema], // array of question-answer objects
      default: [],
    },
  },
  { timestamps: true }
);

const AboutCity = mongoose.model("AboutCity", aboutCitySchema);
export default AboutCity;
