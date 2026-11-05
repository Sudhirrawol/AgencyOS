import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    const mongo_uri = process.env.MONGO_URI;
    if (!mongo_uri) {
      throw new Error("MONGO_URI is missing");
    }
    await mongoose.connect(mongo_uri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default connectDB;
