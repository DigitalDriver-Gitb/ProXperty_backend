import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async() => {
  return mongoose
    .connect(process.env.MONGO_URI)
    .then((connectionsDetails) => {
      console.log("Database Connected");
      console.log(
        "cluster name: ",
        connectionsDetails.connection.host,
        "DB Name:",
        connectionsDetails.connection.name,
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connectDb;

